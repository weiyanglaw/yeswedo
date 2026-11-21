// v508 大門會開：城堡與四座島的大門，按「進入」時門往外打開、人物轉一圈＋叮咚、走進去。
// 做法：門板原本的形狀不動、不複製（共用同一份形狀資料），開門時用「左右兩半」的方式轉開，
// 平常關著的時候畫面和原本一模一樣，也不多畫任何東西。門口另外加一塊各島顏色的小地墊（形狀共用）。
export function setupDoors(T, { scene, game }) {
  const doors = {};            // isle -> door
  const ISLE = ['#22346B', '#E07B3C', '#2E9B74', '#B0305A', '#6A4FC9'];
  const shared = {};
  const key = (n, f) => shared[n] || (shared[n] = f());

  function topGroup(o) { let q = o; while (q.parent && q.parent !== scene) q = q.parent; return q }

  function build(D) {
    const u = D.userData.wyDoor;
    D.updateWorldMatrix(true, false);
    const pos = new T.Vector3(), quat = new T.Quaternion(), scl = new T.Vector3();
    D.matrixWorld.decompose(pos, quat, scl);
    const W = u.w * scl.x, H = u.h * scl.y;   // 建築有縮放時，門的實際大小跟著縮放
    // 門的座標：原點在門的正中下緣、門面上；x 往右、y 往上、z 朝外
    const off = new T.Vector3(0, u.bottom ? 0 : -H / 2, (u.zf || 0) * scl.z).applyQuaternion(quat);
    const F = new T.Matrix4().compose(pos.clone().add(off), quat, new T.Vector3(1, 1, 1));
    const Fi = F.clone().invert();
    const root = topGroup(D), parts = [], bb = new T.Box3(), m4 = new T.Matrix4();
    root.updateMatrixWorld(true);
    root.traverse(o => {
      if (!o.isMesh || o.isInstancedMesh || !o.geometry || !o.visible) return;
      if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
      bb.copy(o.geometry.boundingBox).applyMatrix4(m4.copy(Fi).multiply(o.matrixWorld));
      const inX = bb.min.x >= -W / 2 - .06 && bb.max.x <= W / 2 + .06, bar = !!u.bars && Math.abs((bb.min.x + bb.max.x) / 2) < .06 && bb.max.x - bb.min.x <= W + .45 && bb.max.y - bb.min.y < .36;
      if ((inX || bar) && bb.min.y >= -.1 && bb.max.y <= H + .14 && bb.min.z >= -.5 && bb.max.z <= .42) parts.push(o);
    });
    if (!parts.includes(D)) parts.push(D);
    // 家庭島：玻璃後面畫的是室內，開門時室內畫面要留著不動，只有門框和玻璃打開
    if (u.see) { const i = parts.indexOf(D); if (i >= 0) parts.splice(i, 1) }
    // 門後面露出的暖光（只在開門時顯示）：位置在門板後面第一個表面前一點點
    // 門的中間如果原本沒有直線（家庭島、企業島），補一條細金線：關著時看得出是兩扇門，打開時每扇都有完整的邊框
    let hasMid = false, goldM = null;
    let mw = .07;
    for (const o of parts) { bb.copy(o.geometry.boundingBox).applyMatrix4(m4.copy(Fi).multiply(o.matrixWorld)); const cx = (bb.min.x + bb.max.x) / 2, w = bb.max.x - bb.min.x, h = bb.max.y - bb.min.y; if (w < .2 && h > H * .6) mw = w;
      if (Math.abs(cx) < .08 && w < .3 && h > H * .6) hasMid = true;
      const c = o.material && o.material.color; if (c && !goldM && w < .2 && c.r > .7 && c.g > .5 && c.b < .6) goldM = o.material }
    if (!hasMid) { if (!goldM) goldM = key('dgold', () => new T.MeshStandardMaterial({ color: '#D9B46A', metalness: .5, roughness: .3 }));
      const mid = new T.Mesh(key('midG', () => new T.BoxGeometry(1, 1, 1)), goldM); mid.matrixAutoUpdate = false;
      mid.matrix.copy(F).multiply(new T.Matrix4().compose(new T.Vector3(0, H / 2, .07), new T.Quaternion(), new T.Vector3(mw, H, .06)));
      mid.matrixWorld.copy(mid.matrix); scene.add(mid); parts.push(mid) }
    // 門後第一個表面：找門框範圍內、不是門板的東西，取最前面那一面，暖光貼在它前面一點點
    let backZ = -.04;
    root.traverse(o => { if (!o.isMesh || o.isInstancedMesh || !o.visible || parts.includes(o) || !o.geometry) return;
      if (!o.geometry.boundingBox) o.geometry.computeBoundingBox(); bb.copy(o.geometry.boundingBox).applyMatrix4(m4.copy(Fi).multiply(o.matrixWorld));
      if (bb.min.x <= -W * .3 && bb.max.x >= W * .3 && bb.min.y <= H * .3 && bb.max.y >= H * .7 && bb.max.z < .05 && bb.max.z > -.7) backZ = Math.max(backZ, bb.max.z + .012) });
    const warmM = key('warm', () => new T.MeshBasicMaterial({ color: '#FFD49A', polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
    let warmG;
    if (u.bottom) { const s = new T.Shape(), a = H - W / 2; s.moveTo(-W / 2, 0); s.lineTo(W / 2, 0); s.lineTo(W / 2, a); s.absarc(0, a, W / 2, 0, Math.PI, false); s.lineTo(-W / 2, 0); warmG = new T.ShapeGeometry(s, 20) }
    else { warmG = new T.PlaneGeometry(W, H); warmG.translate(0, H / 2, 0) }
    const warm = new T.Mesh(warmG, warmM); warm.matrixAutoUpdate = false; warm.matrix.copy(F).multiply(new T.Matrix4().makeTranslation(0, 0, backZ)); warm.visible = false; scene.add(warm);
    // 左右兩扇：鉸鏈在門的兩側，用「剪一半」的方式畫各自那一半（形狀資料共用，不複製）
    const leaves = [];
    for (const s of [-1, 1]) {
      const piv = new T.Group(); piv.matrixAutoUpdate = false; piv.visible = false; scene.add(piv);
      const base = F.clone().multiply(new T.Matrix4().makeTranslation(s * W / 2, 0, 0));
      const baseI = base.clone().invert();
      const local = new T.Plane(new T.Vector3(s < 0 ? -1 : 1, 0, 0), W / 2);   // 只留靠鉸鏈那一半
      const plane = new T.Plane(); const matCache = new Map();
      for (const p of parts) {
        const mats = Array.isArray(p.material) ? p.material : [p.material];
        const cm = mats.map(m => { if (!matCache.has(m)) { const c = m.clone(); c.clippingPlanes = [plane]; c.clipShadows = true; matCache.set(m, c) } return matCache.get(m) });
        const c = new T.Mesh(p.geometry, Array.isArray(p.material) ? cm : cm[0]);
        c.matrixAutoUpdate = false; c.matrix.copy(baseI).multiply(p.matrixWorld); c.castShadow = false; c.receiveShadow = p.receiveShadow;
        c.renderOrder = p.renderOrder; c.frustumCulled = false; piv.add(c);
      }
      if (u.see) { const gm = key('seeGlass', () => new T.MeshPhysicalMaterial({ color: '#FFFFFF', transparent: true, opacity: .18, roughness: .05, depthWrite: false, side: T.DoubleSide }));
        const gp = new T.Mesh(key('seeG', () => new T.PlaneGeometry(1, 1)), gm); gp.matrixAutoUpdate = false; gp.matrix.makeTranslation(-s * W / 4, H / 2, .06).multiply(new T.Matrix4().makeScale(W / 2, H, 1)); piv.add(gp) }
      leaves.push({ piv, base, s, local, plane });
    }
    const d = { isle: u.isle, F, W, H, parts, leaves, warm, u: 0, open: false, backZ, see: !!u.see };
    const center = new T.Vector3(0, 0, 0).applyMatrix4(F); d.center = center;
    d.normal = new T.Vector3(0, 0, 1).transformDirection(F);
    doors[u.isle] = d;
    // 地墊：評估後室外不放（古典門廊配地毯不協調），只保留茶水間室內的
    return d;
  }

  // 門口地墊：奶油色圓毯＋一圈各島顏色的花邊（一次畫完）＋細金線
  function mat(d) {
    const p = new T.Vector3(0, 0, Math.max(2.4, d.W * .6 + 1.6)).applyMatrix4(d.F);
    const rc = new T.Raycaster(new T.Vector3(p.x, p.y + 6, p.z), new T.Vector3(0, -1, 0), 0, 14);
    const ms = []; scene.traverse(o => { if (o.isMesh && !o.isInstancedMesh && o.visible) { let v = true; for (let q = o; q; q = q.parent) if (!q.visible) { v = false; break } if (v) ms.push(o) } }); const hit = rc.intersectObjects(ms, false).find(h => h.face && Math.abs(h.face.normal.y) > .6);
    const y = hit ? hit.point.y : p.y;
    const g = new T.Group(); g.position.set(p.x, y, p.z); g.rotation.y = Math.atan2(d.normal.x, d.normal.z); scene.add(g);
    const cream = key('cream', () => new T.MeshStandardMaterial({ color: '#FFF4E6', roughness: .85, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }));
    const gold = key('gold', () => new T.MeshStandardMaterial({ color: '#E2BE72', metalness: .5, roughness: .3, emissive: '#5a4214', polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }));
    const col = new T.MeshStandardMaterial({ color: ISLE[d.isle] || '#22346B', roughness: .6, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    const R = 1.25;
    const c = new T.Mesh(key('rugG', () => new T.CircleGeometry(1, 36)), cream); c.scale.setScalar(R); c.rotation.x = -Math.PI / 2; c.position.y = .03; g.add(c);
    const r = new T.Mesh(key('ringG', () => new T.RingGeometry(.86, .91, 36)), gold); r.scale.setScalar(R); r.rotation.x = -Math.PI / 2; r.position.y = .034; g.add(r);
    const n = 16, sc = new T.InstancedMesh(key('scG', () => new T.CircleGeometry(.2, 14)), col, n), o = new T.Object3D();
    for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2; o.position.set(Math.cos(a) * R * 1.02, .028, Math.sin(a) * R * 1.02); o.rotation.set(-Math.PI / 2, 0, 0); o.updateMatrix(); sc.setMatrixAt(k, o.matrix) }
    g.add(sc);
    d.mat = g;
  }

  function setOpen(d, u) {
    d.u = u; const on = u > .002;
    if (on !== d.open) { d.open = on; for (const p of d.parts) p.visible = !on; d.warm.visible = on && !d.see; for (const L of d.leaves) L.piv.visible = on }
    if (!on) return;
    const ang = u * 1.2;
    for (const L of d.leaves) {
      // 往外打開（朝玩家這側），門板看得見；左扇繞 y 負向、右扇正向
      L.piv.matrix.copy(L.base).multiply(new T.Matrix4().makeRotationY(L.s < 0 ? -ang : ang));
      L.piv.matrixWorld.copy(L.piv.matrix);
      for (const c of L.piv.children) c.matrixWorld.multiplyMatrices(L.piv.matrixWorld, c.matrix);
      L.plane.copy(L.local).applyMatrix4(L.piv.matrixWorld);
    }
  }

  function scan() {
    scene.traverse(o => { if (o.isMesh && o.userData && o.userData.wyDoor && !doors[o.userData.wyDoor.isle]) { try { build(o) } catch (e) { console.error('door', e) } } });
    return Object.keys(doors).length;
  }

  // 進門動畫：門打開 → 人物面向門、轉一圈＋叮咚 → 往前走兩步 → 進去
  let busy = false;
  function enterSeq(i, done) {
    const d = doors[i], A = game.actor && game.actor();
    if (busy) return;
    if (!d || !A || Math.hypot(A.position.x - d.center.x, A.position.z - d.center.z) > 9) { done(); return }   // 從遠處點建築：直接進去
    busy = true; window.__wyDoorBusy = true;
    const p0 = A.position.clone(), face = Math.atan2(d.center.x - p0.x, d.center.z - p0.z);
    let r0 = A.rotation.y; const dr = Math.atan2(Math.sin(face - r0), Math.cos(face - r0));
    const fwd = new T.Vector3(d.center.x - p0.x, 0, d.center.z - p0.z); const dist = fwd.length(); fwd.normalize();
    const walk = Math.max(0, Math.min(2.2, dist - 1.2));
    const t0 = performance.now(); let spun = false;
    const step = () => {
      const t = (performance.now() - t0) / 1000, sm = v => v * v * (3 - 2 * v), cl = v => Math.max(0, Math.min(1, v));
      setOpen(d, sm(cl(t / .6)));
      if (t < .45) A.rotation.y = r0 + dr * sm(cl(t / .4));
      else if (t < 1.15) { if (!spun) { spun = true; try { window.wyVoice ? window.wyVoice('yes') : (window.wySfx && window.wySfx('ding')) } catch (e) { } } A.rotation.y = face + sm(cl((t - .45) / .7)) * Math.PI * 2 }
      else { A.rotation.y = face; const k = sm(cl((t - 1.15) / .6)); A.position.set(p0.x + fwd.x * walk * k, A.position.y, p0.z + fwd.z * walk * k) }
      if (t < 1.8) requestAnimationFrame(step);
      else { busy = false; window.__wyDoorBusy = false; done(); setTimeout(() => { A.rotation.y = face; setOpen(d, 0) }, 1600) }
    };
    requestAnimationFrame(step);
  }

  // v508 訴訟島中央大旗：旗桿底下加金色底座，看起來穩穩立在屋頂上
  function flagBase() { let F = null; scene.traverse(o => { if (o.name === 'WEIYANG_LITIGATION_FLAG') F = o }); if (!F || F.userData.wyBase) return; F.userData.wyBase = true;
    const pole = F.children.find(c => c.geometry && c.geometry.type === 'CylinderGeometry'); if (!pole) return; F.updateMatrixWorld(true);
    const pp = pole.getWorldPosition(new T.Vector3()), ph = pole.geometry.parameters.height, bottom = pp.y - ph / 2;
    const ms = []; scene.traverse(o => { if (o.isMesh && !o.isInstancedMesh) { const m = o.material; if (!m || Array.isArray(m) || m.visible === false || (m.transparent && m.opacity < .05)) return; let v = true; for (let q = o; q; q = q.parent) if (!q.visible || q === F) { v = false; break } if (v) ms.push(o) } });
    // 旗桿原本立在後面那棟（已拿掉）的屋頂上 → 移到主建築中央頂樓的正中間
    const rc = new T.Raycaster(); rc.far = 40; const S = [];
    for (let z = pp.z - 2; z <= pp.z + 8; z += .2) { rc.set(new T.Vector3(pp.x, 40, z), new T.Vector3(0, -1, 0)); const h = rc.intersectObjects(ms, false)[0]; S.push([z, h ? +h.point.y.toFixed(2) : -1e9]) }
    // 找「一整片平的屋頂」（至少 1 公尺寬）裡最高的那片，避開圓徽這種薄薄的東西
    let best = null; for (let a = 0; a < S.length;) { let b2 = a; while (b2 + 1 < S.length && Math.abs(S[b2 + 1][1] - S[a][1]) <= .05) b2++; if (b2 - a >= 5 && S[a][1] > -1e8 && (!best || S[a][1] > best[0])) best = [S[a][1], S[a][0], S[b2][0]]; a = b2 + 1 }
    let top = null, z0 = null, z1 = null; if (best) { top = best[0]; z0 = best[1]; z1 = best[2] }
    if (z0 === null) { window.__wyFlagFix = 'nobest'; return } const y = top, zc = (z0 + z1) / 2;
    F.position.y += y - bottom - .05; F.position.z += zc - pp.z; F.matrixAutoUpdate = true; F.updateMatrix(); F.updateMatrixWorld(true); pp.z = zc; window.__wyFlagFix = [y, zc];
    const gm = new T.MeshStandardMaterial({ color: '#E2BE72', metalness: .6, roughness: .25, emissive: '#5a4214', emissiveIntensity: .3 });
    const b1 = new T.Mesh(new T.CylinderGeometry(.55, .7, .3, 24), gm); b1.position.set(pp.x, y + .15, pp.z); scene.add(b1);
    const b2 = new T.Mesh(new T.CylinderGeometry(.32, .42, .35, 20), gm); b2.position.set(pp.x, y + .47, pp.z); scene.add(b2);
    const b3 = new T.Mesh(new T.TorusGeometry(.2, .06, 8, 20), gm); b3.rotation.x = Math.PI / 2; b3.position.set(pp.x, y + .68, pp.z); scene.add(b3) }
  try { flagBase() } catch (e) { }
  const orig = game.enter;
  game.enter = i => enterSeq(i, () => orig(i));
  // 建築是陸續載入的：每 2 秒找一次門，五扇都找到就停
  let tries = 0; const iv = setInterval(() => { const n = scan(); if (n >= 5 || ++tries > 40) clearInterval(iv) }, 2000);
  window.wyDoors = { doors, setOpen, scan };
  return { doors };
}
