// v514 選角陪選：夢奇奇飼養者拿平板幫訪客「辦入島登記」，完整站在右邊；訪客停手後往前跳一下講一句（陳老闆 11-22 定案）
// 只在選角畫面出現；選完角色就從預覽畫面拿掉。模型和島上同一套造型。
export function setupBuddy(o) {
  const { T, buildChibi, prof, scale, track, scene, camera, canvas, stage } = o;
  const c = buildChibi(T, prof); c.group.scale.setScalar(scale);
  const g = new T.Group(); g.add(c.group); g.userData.wyNoLux = true; track(c, g);
  g.scale.setScalar(.46); g.position.set(1.2, 0, .85); g.rotation.y = -.55; scene.add(g); window.__buddyG = g; // 完整站在訪客右邊
  g.updateMatrixWorld(true); const bb = new T.Box3().setFromObject(g); g.position.y -= bb.min.y; const headY = bb.max.y - bb.min.y;
    const st = document.createElement('style'); st.textContent = `
  #wcBuddy{position:absolute;z-index:3;pointer-events:none;transform:translate(-50%,-100%);background:#FFF8EC;color:#1A2B4C;border-radius:14px;padding:6px 11px;font-size:12.5px;font-weight:700;line-height:1.45;letter-spacing:.5px;text-align:center;white-space:nowrap;box-shadow:0 0 0 2px #E7A8BC,0 6px 14px #8a5a4033;transition:opacity .2s}
  #wyC2 .wcStage .wcTip{right:auto;left:8px}
  #wcBuddy small{display:block;font-size:9.5px;font-weight:600;color:#C06A8A;letter-spacing:1px}
  #wcBuddy:after{content:"";position:absolute;left:50%;bottom:-7px;margin-left:-7px;border:7px solid transparent;border-bottom:0;border-top-color:#FFF8EC;filter:drop-shadow(0 2px 0 #E7A8BC)}
  #wcBuddy.pop{animation:wcBp .35s cubic-bezier(.3,1.7,.5,1)}@keyframes wcBp{0%{transform:translate(-50%,-100%) scale(.6)}100%{transform:translate(-50%,-100%)}}`;
  document.head.appendChild(st);
  const b = document.createElement('div'); b.id = 'wcBuddy'; stage.appendChild(b);
  const LINES = ['這個造型幫您登記好了！', '這套很有精神，記下來！', '這樣很亮眼，登記！', '幫您記在平板上囉！', '想再換也可以喔'];
  let li = -1, tmr = 0;
  // 停手後才反應：往前跳一下、揮手、講一句，講完縮回角落
  const HOME = { x: 1.2, z: .85, s: .46 }, OUT = { x: 1.02, z: 1.05, s: .5 }; let k = 0, kTo = 0, hideT = 0;
  const say = (t, wave = true) => { b.innerHTML = '<small>夢奇奇飼養者</small>' + t; b.style.opacity = 1; b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); if (wave) { c.wave(); c.hop(); kTo = 1 } clearTimeout(hideT); hideT = setTimeout(() => { kTo = 0; b.style.opacity = 0 }, 2600) };
  say('我來幫您辦入島登記！', false); clearTimeout(hideT); hideT = setTimeout(() => { b.style.opacity = 0 }, 3500);
  const panel = document.querySelector('#wyC2 .wcPanel');
  if (panel) panel.addEventListener('click', e => { if (!e.target.closest('button')) return; clearTimeout(tmr); tmr = setTimeout(() => { li = (li + 1 + Math.floor(Math.random() * (LINES.length - 1))) % LINES.length; say(LINES[li]) }, 550) });
  const nm = document.getElementById('visitorName');
  if (nm) nm.addEventListener('input', () => { clearTimeout(tmr); tmr = setTimeout(() => { const raw = nm.value.trim(); if (!raw) return; const ok = window.wyCleanName ? window.wyCleanName(raw) : raw; if (ok !== raw) say('這個名字不太適合喔，<br>換一個好嗎？'); else say(raw.slice(0, 6) + '，幫您寫進律師函！') }, 700) });
  // 必填都完成（開始探索按鈕變可按）時說最後一句，接到律師函
  const sb = document.getElementById('startExplore');
  if (sb) { let was = sb.disabled; new MutationObserver(() => { if (was && !sb.disabled) { clearTimeout(tmr); say('登記完成！<br>林律師要發函給您囉') } was = sb.disabled }).observe(sb, { attributes: true, attributeFilter: ['disabled'] }) }
  const v = new T.Vector3();
  (function loop() {
    if (!g.parent) { b.remove(); return }
    requestAnimationFrame(loop);
    k += (kTo - k) * .14; g.position.x = HOME.x + (OUT.x - HOME.x) * k; g.position.z = HOME.z + (OUT.z - HOME.z) * k; g.scale.setScalar(HOME.s + (OUT.s - HOME.s) * k);
    v.set(g.position.x, g.position.y + headY * 1.02, g.position.z).project(camera);
    const w = canvas.clientWidth, h = canvas.clientHeight; if (!w) return;
    const bw = b.offsetWidth || 120; let x = (v.x * .5 + .5) * w; x = Math.max(bw / 2 + 4, Math.min(w - bw / 2 - 4, x));
    b.style.left = x + 'px'; b.style.top = Math.max(b.offsetHeight + 4, (-v.y * .5 + .5) * h - 4) + 'px';
  })();
  return { remove() {
    scene.remove(g); g.userData.wyDead = true; b.remove();
    // 真正放掉：她自己那套形狀與材質（貼圖可能和別人共用，不碰）；別人也在用的一律跳過
    const used = new Set(); const mark = r => r && r.traverse(x => { if (x.geometry) used.add(x.geometry); (Array.isArray(x.material) ? x.material : [x.material]).forEach(m => m && used.add(m)) });
    try { mark(scene); (window.__wyStaffModels || []).forEach(m => mark(m.root)); mark(o.others && o.others()) } catch (e) { return }
    g.traverse(x => { if (x.geometry && !used.has(x.geometry)) x.geometry.dispose(); (Array.isArray(x.material) ? x.material : [x.material]).forEach(m => { if (m && !used.has(m)) m.dispose() }) });
  } };
}
