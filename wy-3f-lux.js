// v503 3F 頂級版（依使用者參考圖）：
// 一、電梯出口走廊與大門：大理石牆、金色花邊門框＋角花、光澤深藍門、天花板暖光、地面拋光大理石
// 二、林律師辦公室：圓弧淺橡木書牆（讀萬卷書）、霧藍主管桌＋焦糖鑽石紋主管椅＋豆沙粉客椅、
//     （21:05 改為只升級桌椅、地板、牆面；其餘保留原樣）
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
export function apply3FLux(T, ctx) {
  const { root, arrival, mats } = ctx;
  let sd = 3303; const rr = () => ((sd = Math.imul(sd ^ sd >>> 15, 1 | sd) + 0x6D2B79F5 | 0, ((sd ^ sd >>> 14) >>> 0) / 4294967296));
  const tex = (w, h, f) => { const c = document.createElement('canvas'); c.width = w; c.height = h; f(c.getContext('2d'), w, h); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 8; return t };
  const M = (c, o = {}) => new T.MeshStandardMaterial({ color: c, roughness: .45, ...o });
  const gold = M('#EAC66C', { metalness: .35, roughness: .28, emissive: '#7a5512', emissiveIntensity: .42 });
  const RB = (w, h, d, r = .08) => new RoundedBoxGeometry(w, h, d, 3, Math.min(r, Math.min(w, h, d) * .4));
  const add = (geo, m, x, y, z, p) => { const o = new T.Mesh(geo, m); o.position.set(x, y, z); p.add(o); return o };
  const marbleTex = (base, vein) => tex(512, 512, (g, S) => { g.fillStyle = base; g.fillRect(0, 0, S, S); for (let i = 0; i < 14; i++) { const x = rr() * S, y = rr() * S, r = 60 + rr() * 140, gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(255,250,240,.25)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2) }
    g.lineCap = 'round'; for (let k = 0; k < 3; k++) { let x = rr() * S, y = S, a = -Math.PI / 2 - .6 + rr() * .3; const pts = [[x, y]]; for (let j = 0; j < 50; j++) { a += (rr() - .5) * .18; x += Math.cos(a) * 14; y += Math.sin(a) * 14; pts.push([x, y]) } for (const [lw, al] of [[9, .12], [2, .8]]) { g.strokeStyle = vein.replace('A', al); g.lineWidth = lw; g.beginPath(); pts.forEach(([px, py], i) => i ? g.lineTo(px, py) : g.moveTo(px, py)); g.stroke() } } });
  const wallMar = marbleTex('#EAD7C0', 'rgba(255,252,246,A)'); wallMar.wrapS = wallMar.wrapT = T.RepeatWrapping;
  const floorMar = marbleTex('#F4DEC0', 'rgba(255,250,240,A)'); floorMar.wrapS = floorMar.wrapT = T.RepeatWrapping;

  // ================= 一、走廊與大門 =================
  if (mats.ivory) { mats.ivory.map = wallMar; mats.ivory.color.set('#FFFFFF'); mats.ivory.roughness = .25; mats.ivory.emissive = new T.Color('#FFFFFF'); mats.ivory.emissiveMap = wallMar; mats.ivory.emissiveIntensity = .42; mats.ivory.needsUpdate = true }
  for (const m of [mats.gold, mats.brass]) if (m) { m.color.set('#EAC66C'); m.metalness = .35; m.roughness = .26; m.emissive = new T.Color('#7a5512'); m.emissiveIntensity = .45 }
  if (mats.pearl) { mats.pearl.roughness = .12; mats.pearl.metalness = .35; mats.pearl.color.set('#22477A'); mats.pearl.emissive = new T.Color('#0C1E3A'); mats.pearl.emissiveIntensity = .5 }
  arrival.traverse(o => { if (o.isMesh && o.material && o.material.color && o.material.color.getHexString() === 'd8c6ab') { const t = floorMar.clone(); t.needsUpdate = true; t.repeat.set(2.5, 1.3); o.material = M('#FFFFFF', { map: t, roughness: .15 }) } });
  if (arrival.children[0]) arrival.traverse(o => { if (o.isMesh && o.material === mats.warm) o.material = new T.MeshBasicMaterial({ color: '#FFF1D6' }) });
  const A = new T.Group(); arrival.add(A);
  // 門框（使用者：花邊要明顯、不要植物）：門周圍一圈寬金色雕花框＋四角大玫瑰花飾＋門頂金色扇形冠＋Logo、兩側金色壁燈（避開 WELCOME 牌）、門板加亮面；地板維持原本
  const DX = ctx.doorX + .2, DZ = ctx.doorZ, HW = 1.62, TOP = 4.72;
  const fr = (y, z, w, h, d = .16) => add(new T.BoxGeometry(d, h, w), gold, DX, y, z, A);
  for (const s2 of [-1, 1]) { fr(TOP / 2, DZ + s2 * (HW + .17), .34, TOP + .1, .16); fr(TOP / 2, DZ + s2 * (HW + .02), .06, TOP, .22); fr(TOP / 2, DZ + s2 * (HW + .32), .06, TOP + .1, .22);
    for (let k = 0; k < 7; k++) { const b = add(new T.SphereGeometry(.07, 10, 8), gold, DX + .1, .5 + k * .62, DZ + s2 * (HW + .17), A); b.scale.x = .5 } }
  fr(TOP + .12, DZ, 2 * HW + .7, .34); fr(TOP - .04, DZ, 2 * HW + .1, .06, .22); fr(TOP + .28, DZ, 2 * HW + .7, .06, .22);
  for (let k = 0; k < 9; k++) { const b = add(new T.SphereGeometry(.07, 10, 8), gold, DX + .1, TOP + .12, DZ - HW + k * (2 * HW) / 8, A); b.scale.x = .5 }
  for (const s2 of [-1, 1]) for (const y of [.15, TOP + .12]) { const r = add(new T.CylinderGeometry(.24, .24, .1, 20), gold, DX + .1, y, DZ + s2 * (HW + .17), A); r.rotation.z = Math.PI / 2; for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; const p = add(new T.SphereGeometry(.09, 10, 8), gold, DX + .14, y + Math.sin(a) * .2, DZ + s2 * (HW + .17) + Math.cos(a) * .2, A); p.scale.x = .5 } }
  // 門頂扇形冠＋Logo（在天花板下）
  const lt = new T.TextureLoader().load('office-logo-transparent.png'); lt.colorSpace = T.SRGBColorSpace;
  // 門框內側一圈暖光（穩定）
  const glowM = new T.MeshBasicMaterial({ color: '#FFE2A0', transparent: true, opacity: .75 });
  for (const s2 of [-1, 1]) add(new T.BoxGeometry(.04, TOP - .1, .05), glowM, DX + .15, TOP / 2, DZ + s2 * (HW + .07), A); add(new T.BoxGeometry(.04, .05, 2 * HW), glowM, DX + .15, TOP - .02, DZ, A);
  // 兩側金色壁燈
  for (const s2 of [-1, 1]) { const z = DZ + s2 * 1.6, g = new T.Group(); g.position.set(5.3, 3.4, s2 < 0 ? 4.95 : 8.45); /* 避開右牆 WELCOME 牌（x 2.85–4.1） */ A.add(g); add(new T.BoxGeometry(.5, .5, .06), gold, 0, 0, 0, g); add(new T.CylinderGeometry(.16, .22, .45, 16), new T.MeshBasicMaterial({ color: '#FFE7B0' }), 0, .3, s2 < 0 ? .22 : -.22, g); add(new T.TorusGeometry(.22, .03, 6, 20), gold, 0, .08, s2 < 0 ? .22 : -.22, g).rotation.x = Math.PI / 2 }
  // 兩側牆金色花邊框、天花板暖光燈帶
  for (const z of [4.94, 8.46]) { for (const y of [.18, 5.05]) add(new T.BoxGeometry(7.3, .12, .07), gold, 6.17, y, z, A) }
  for (const z of [5.0, 8.4]) add(new T.BoxGeometry(7.3, .08, .3), new T.MeshBasicMaterial({ color: '#FFE7B8' }), 6.17, 5.28, z, A);

  // ================= 二、林律師辦公室（使用者 21:05：只改桌子、椅子、地板、牆面；書櫃、律師袍、沙發、所有互動都保留原樣） =================
  root.updateMatrixWorld(true); const wp = new T.Vector3();
  const hideIf = o => { o.getWorldPosition(wp); const x = wp.x, z = wp.z, y = wp.y;
    if (Math.abs(x) < 3.5 && z > -2.85 && z < -.25 && y < 2.3) return true;              // 原本主管桌與桌上物品
    if (Math.hypot(x, z + 4.0) < 1.15 && y < 3.2) return true;                           // 原本主管椅
    if ((Math.hypot(x + 1.55, z - 1.6) < .95 || Math.hypot(x - 1.55, z - 1.6) < .95) && y < 2.4) return true; // 原本客椅
    return false };
  const hideCh = ch => { ch.visible = false; const L = ctx.contents; if (L) { const ix = L.indexOf(ch); if (ix >= 0) L.splice(ix, 1) } };
  for (const ch of root.children) { if (ch === arrival || ch.isSprite || ch.isLight) continue; if (ch.isMesh) { if (hideIf(ch)) hideCh(ch); continue }
    if (ch.isGroup) { let lbl = false; ch.traverse(o => { if (o.isSprite) lbl = true }); if (!lbl && hideIf(ch)) hideCh(ch) } }
  // 地板：淺色拋光大理石（不加雲霧）
  root.traverse(o => { if (!o.isMesh || !o.material || !o.material.color) return; const k = o.material.color.getHexString();
    if (k === 'c9c1b5') o.visible = false;
    if (k === 'd9d1c4' && (o.geometry.parameters || {}).width === 20) { const t = floorMar.clone(); t.needsUpdate = true; t.repeat.set(4, 3.5); o.material = M('#FFFFFF', { map: t, roughness: .15 }) }
    // 牆面：淡霧藍（不深）
    if (['eadfc9', 'eaddc7'].includes(k) && ((o.geometry.parameters || {}).height || 0) > 5) o.material = M('#DDD2EE', { roughness: .5 }) });
  const O = new T.Group(); O.name = 'wyLinOffice'; root.add(O); O.visible = false; if (ctx.contents) ctx.contents.push(O);
  // 牆面裝潢：金色踢腳、牆頂金色收邊＋暖光燈帶、下半段淺橡木護牆板（不碰窗戶與家具）
  const oak = M('#D9A86C', { roughness: .45 }), coveM = new T.MeshBasicMaterial({ color: '#FFE7B8' });
  for (const sx of [-1, 1]) { const x = sx * 9.76; add(new T.BoxGeometry(.06, 1.6, 17.3), oak, x, .82, 0, O); add(new T.BoxGeometry(.08, .1, 17.3), gold, x - sx * .02, 1.66, 0, O); add(new T.BoxGeometry(.08, .22, 17.3), gold, x - sx * .02, .13, 0, O); add(new T.BoxGeometry(.08, .14, 17.3), gold, x - sx * .02, 6.05, 0, O); add(new T.BoxGeometry(.06, .08, 17.2), coveM, x - sx * .05, 5.92, 0, O) }
  // 林律師主管桌（頂級、比 2 樓大很多）：弧形正面＋霧藍桌身＋粗金框＋焦糖皮革桌面＋金色雕花柱腳＋大 Logo 金徽
  const D = new T.Group(); D.position.set(0, 0, -1.55); O.add(D);
  const W = 9.6, DD = 3.1, body = M('#7F9CC4', { roughness: .26, metalness: .08 }), leather = M('#C9A27A', { roughness: .5 });
  add(RB(W - 1.0, 1.05, DD - .5, .12), body, 0, .6, -.1, D);
  const bow = add(new T.CylinderGeometry(W / 2 - .5, W / 2 - .5, 1.05, 48, 1, false, -Math.PI / 2, Math.PI), body, 0, .6, DD / 2 - .55, D); bow.scale.z = .16;
  const topS = new T.Shape(); topS.moveTo(-W / 2, -DD / 2); topS.lineTo(W / 2, -DD / 2); topS.lineTo(W / 2, DD / 2 - .5); topS.quadraticCurveTo(0, DD / 2 + .55, -W / 2, DD / 2 - .5); topS.closePath();
  const tg = new T.ExtrudeGeometry(topS, { depth: .18, bevelEnabled: true, bevelThickness: .04, bevelSize: .04, bevelSegments: 2 }); tg.rotateX(-Math.PI / 2);
  add(tg, body, 0, 1.13, 0, D); const tr = add(tg.clone(), gold, 0, 1.07, 0, D); tr.scale.set(1.012, 1, 1.03);
  const lg = tg.clone(); const inset = add(lg, leather, 0, 1.3, 0, D); inset.scale.set(.9, .15, .8);
  for (const sx of [-1, 1]) for (const zz of [-DD / 2 + .3, DD / 2 - .5]) { const lx = sx * (W / 2 - .4); add(new T.CylinderGeometry(.24, .32, 1.05, 18), gold, lx, .55, zz, D); add(new T.SphereGeometry(.26, 16, 12), gold, lx, 1.08, zz, D); add(new T.CylinderGeometry(.38, .38, .12, 18), gold, lx, .06, zz, D) }
  for (const x of [-2.6, 2.6]) { const pnl = add(RB(2.0, .7, .05, .03), gold, x, .62, DD / 2 - .02, D); const inn = add(RB(1.85, .58, .05, .03), body, x, .62, DD / 2, D) }
  add(new T.CylinderGeometry(.5, .5, .08, 36), gold, 0, .62, DD / 2 + .02, D).rotation.x = Math.PI / 2;
  add(new T.CircleGeometry(.42, 36), new T.MeshBasicMaterial({ color: '#FFF8EC' }), 0, .62, DD / 2 + .07, D); add(new T.CircleGeometry(.39, 36), new T.MeshBasicMaterial({ map: lt, transparent: true }), 0, .62, DD / 2 + .075, D);
  // 桌上：一對金檯燈、精裝書、文件、筆座、金色名牌
  for (const x of [-3.9, 3.9]) { add(new T.CylinderGeometry(.2, .26, .08, 18), gold, x, 1.4, -.4, D); add(new T.CylinderGeometry(.04, .04, .8, 8), gold, x, 1.8, -.4, D); add(new T.CylinderGeometry(.3, .42, .45, 20), new T.MeshBasicMaterial({ color: '#FFF0CC' }), x, 2.35, -.4, D) }
  const BK = ['#5C7FB0', '#B46E78', '#7FAE95', '#E6C27A'].map(c => M(c, { roughness: .55 })); for (let k = 0; k < 4; k++) add(new T.BoxGeometry(.9, .12, .62), BK[k], 2.6, 1.42 + k * .12, -.5, D);
  add(new T.BoxGeometry(1.0, .03, .7), M('#F7EFE0'), .4, 1.37, .1, D); add(new T.BoxGeometry(1.4, .06, .9), M('#C5CBD0', { metalness: .4, roughness: .3 }), -1.4, 1.39, -.3, D);
  add(new T.CylinderGeometry(.08, .08, .34, 10), gold, 1.4, 1.52, -.6, D);
  { const nc = document.createElement('canvas'); nc.width = 512; nc.height = 128; const ng = nc.getContext('2d'); ng.fillStyle = '#22477A'; ng.fillRect(0, 0, 512, 128); ng.strokeStyle = '#F2C86A'; ng.lineWidth = 10; ng.strokeRect(6, 6, 500, 116); ng.fillStyle = '#F7D98C'; ng.font = '600 64px "Noto Serif TC",serif'; ng.textAlign = 'center'; ng.textBaseline = 'middle'; ng.fillText('林柏均 律師', 256, 68);
    const nt = new T.CanvasTexture(nc); nt.colorSpace = T.SRGBColorSpace; add(new T.BoxGeometry(1.8, .42, .14), gold, -.2, 1.55, DD / 2 - .55, D); add(new T.PlaneGeometry(1.7, .4), new T.MeshBasicMaterial({ map: nt }), -.2, 1.55, DD / 2 - .47, D) }
  // 主管椅：焦糖鑽石紋皮革中背主管椅（使用者：不要擋到後面書牆，但要高級）
  { const c = new T.Group(); c.position.set(0, 0, -4.0); O.add(c); c.scale.setScalar(1.3);
    const car = M('#B98559', { roughness: .5 }), carD = M('#A9744A', { roughness: .55 });
    for (let k = 0; k < 5; k++) { const a = k * Math.PI * 2 / 5; const arm = add(new T.BoxGeometry(.11, .07, .74), gold, Math.sin(a) * .35, .1, Math.cos(a) * .35, c); arm.rotation.y = a; add(new T.SphereGeometry(.07, 8, 6), gold, Math.sin(a) * .7, .07, Math.cos(a) * .7, c) }
    add(new T.CylinderGeometry(.08, .08, .5, 10), gold, 0, .4, 0, c); add(RB(1.1, .32, 1.05, .12), car, 0, .76, 0, c); add(RB(1.2, 1.15, .32, .14), car, 0, 1.5, -.48, c); add(RB(1.32, 1.25, .06, .05), gold, 0, 1.5, -.66, c); const tp = add(new T.CylinderGeometry(.09, .09, 1.24, 16), gold, 0, 2.1, -.48, c); tp.rotation.z = Math.PI / 2;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { add(new T.SphereGeometry(.035, 6, 5), gold, -.34 + i * .34, 1.2 + j * .4, -.31, c); const dm = add(new T.BoxGeometry(.22, .22, .02), carD, -.17 + i * .34 - (j % 2) * .17, 1.4 + j * .4, -.315, c); dm.rotation.z = Math.PI / 4 }
    for (const s2 of [-1, 1]) { add(RB(.2, .3, .95, .06), car, s2 * .64, 1.08, -.05, c); add(new T.BoxGeometry(.06, .3, .06), gold, s2 * .64, .88, .3, c) } }
  // 客椅兩張：豆沙粉絲絨圓背扶手椅（放大、金腳）
  for (const x of [-1.9, 1.9]) { const c = new T.Group(); c.position.set(x, 0, 1.75); c.rotation.y = Math.PI; O.add(c); c.scale.setScalar(1.45); const ro = M('#D68C96', { roughness: .6 }), roD = M('#C97C88', { roughness: .62 });
    for (const [lx, lz] of [[-.38, -.32], [.38, -.32], [-.38, .32], [.38, .32]]) add(new T.CylinderGeometry(.045, .03, .46, 8), gold, lx, .23, lz, c);
    add(RB(1.0, .34, .95, .15), ro, 0, .62, 0, c); add(RB(.86, .14, .78, .07), roD, 0, .85, .04, c);
    const bk = add(new T.CylinderGeometry(.52, .52, .9, 28, 1, false, Math.PI / 2, Math.PI), ro, 0, 1.2, .1, c); bk.scale.z = .7;
    const pip = add(new T.TorusGeometry(.52, .04, 8, 28, Math.PI), gold, 0, 1.65, .1, c); pip.rotation.x = Math.PI / 2; pip.rotation.z = Math.PI; pip.scale.y = .7 }

  // ================= v507 三、老闆休息區：動森風豪華寶石綠沙發＋雙層大理石圓茶几＋圓胖單人椅＋專屬地毯 =================
  // 原本的 L 型沙發在 v503 被上面的 hideIf 誤藏（群組原點落在主管桌範圍）。舊沙發、舊圓桌、舊花紋地毯一律收起，改放這一組。
  { root.updateMatrixWorld(true); const bx = new T.Box3(), cc = new T.Vector3();
    const drop = ch => { ch.visible = false; const L = ctx.contents; if (L) { const ix = L.indexOf(ch); if (ix >= 0) L.splice(ix, 1) } };
    let sofaSign = null, sofaHit = null;
    for (const ch of [...root.children]) { if (ch === O || ch === A || ch === arrival) continue;
      let act = ''; ch.traverse(o => { if (o.userData && o.userData.wy3Action) act = o.userData.wy3Action });
      bx.setFromObject(ch); if (!isFinite(bx.min.x)) continue; bx.getCenter(cc);
      if (act === 'wy260:sofa') { if (ch.isMesh && ch.material && ch.material.map) sofaSign = ch; else if (ch.isMesh && ch.material && ch.material.visible === false) sofaHit = ch; else drop(ch); continue }
      // 舊花紋地毯（薄片，x 4.1–8.6）與兩張舊圓桌（x 5–7.4、z 1.3–2.6、高度 < 1）
      if (ch.isMesh && bx.max.y < .1 && bx.min.x > 3.9 && bx.max.x < 8.8 && bx.min.z > -1 && bx.max.z < 3.2) { drop(ch); continue }
      if (ch.isGroup && bx.max.y < 1.0 && cc.x > 4.9 && cc.x < 7.5 && cc.z > 1.2 && cc.z < 2.7) drop(ch) }
    const LG = new T.Group(); LG.name = 'wyBossLounge'; O.add(LG);
    const emer = M('#2FA37C', { roughness: .62 }), emerD = M('#26906C', { roughness: .66 }), emerL = M('#43B98F', { roughness: .6 });
    const cream = M('#FFF4E2', { roughness: .7 }), rose = M('#F2A7B4', { roughness: .65 });
    // 地毯：只鋪在沙發、茶几、單人椅底下（x 4.5–9.55、z 0.25–3.75），三層高度錯開不閃
    const rug = (w, d, r, y, m) => { const sh = new T.Shape(); const a = -w / 2, b = -d / 2; sh.moveTo(a + r, b); sh.lineTo(-a - r, b); sh.quadraticCurveTo(-a, b, -a, b + r); sh.lineTo(-a, -b - r); sh.quadraticCurveTo(-a, -b, -a - r, -b); sh.lineTo(a + r, -b); sh.quadraticCurveTo(a, -b, a, -b - r); sh.lineTo(a, b + r); sh.quadraticCurveTo(a, b, a + r, b);
      const gq = new T.ExtrudeGeometry(sh, { depth: .02, bevelEnabled: false, curveSegments: 10 }); gq.rotateX(-Math.PI / 2); const o = new T.Mesh(gq, m); o.position.set(7.0, y, 2.0); LG.add(o); return o };
    rug(5.0, 3.5, .5, .012, gold); rug(4.84, 3.34, .45, .034, emerD); rug(4.4, 2.9, .38, .056, cream);
    for (const [dx, dz] of [[-1.7, -1.05], [1.7, -1.05], [-1.7, 1.05], [1.7, 1.05]]) { const f = add(new T.CylinderGeometry(.16, .16, .02, 20), rose, 7.0 + dx, .082, 2.0 + dz, LG) }
    // 三人座寶石綠絨布大沙發：靠右牆、面向房間（-X），圓胖椅背與扶手、金色圓球腳、上緣金邊
    const S = new T.Group(); S.position.set(8.75, 0, 2.0); S.rotation.y = Math.PI / 2; LG.add(S);
    for (const [lx, lz] of [[-1.55, -.5], [1.55, -.5], [-1.55, .45], [1.55, .45]]) { add(new T.SphereGeometry(.13, 16, 12), gold, lx, .13, lz, S) }
    add(RB(3.5, .42, 1.25, .18), emer, 0, .46, 0, S);
    for (let k = -1; k <= 1; k++) add(RB(1.02, .2, 1.0, .09), emerL, k * 1.04, .76, -.05, S);
    add(RB(3.5, 1.0, .42, .2), emer, 0, 1.12, .5, S); add(new T.CylinderGeometry(.06, .06, 3.3, 14), gold, 0, 1.64, .52, S).rotation.z = Math.PI / 2;
    for (const e of [-1, 1]) { add(RB(.42, .8, 1.28, .2), emer, e * 1.86, .78, .02, S); add(new T.CylinderGeometry(.22, .22, 1.24, 24), emerL, e * 1.86, 1.2, .02, S).rotation.x = Math.PI / 2;
      for (const zz of [-.62, .64]) add(new T.CircleGeometry(.2, 24), gold, e * 1.86, 1.2, zz, S).rotation.y = zz < 0 ? Math.PI : 0 }
    // 圓抱枕：中間繡德威陽 Logo，兩側粉色、奶油色
    const pil = (x, m, logo) => { const pg = new T.Group(); pg.position.set(x, 1.08, .18); pg.rotation.x = -.18; S.add(pg); const pm = new T.Mesh(new T.SphereGeometry(.33, 24, 16), m); pm.scale.set(1, 1, .42); pg.add(pm);
      if (logo) { const lm = new T.Mesh(new T.CircleGeometry(.2, 32), new T.MeshBasicMaterial({ map: lt, transparent: true })); lm.position.set(0, 0, -.145); lm.rotation.y = Math.PI; pg.add(lm); add(new T.TorusGeometry(.22, .02, 8, 32), gold, 0, 0, -.14, pg) } };
    pil(-1.1, rose, false); pil(0, cream, true); pil(1.1, rose, false);
    // 單人沙發（跟大沙發同一款：方圓椅身、兩邊圓筒扶手、金球腳、上緣金邊、一顆小抱枕），在茶几另一側面向大沙發
    const C = new T.Group(); C.position.set(5.3, 0, 2.0); C.rotation.y = -Math.PI / 2; LG.add(C);
    for (const [lx, lz] of [[-.62, -.5], [.62, -.5], [-.62, .45], [.62, .45]]) add(new T.SphereGeometry(.12, 16, 12), gold, lx, .12, lz, C);
    add(RB(1.5, .42, 1.2, .18), emer, 0, .45, 0, C);
    add(RB(1.0, .2, .98, .09), emerL, 0, .75, -.06, C);
    add(RB(1.5, .95, .4, .2), emer, 0, 1.1, .48, C); add(new T.CylinderGeometry(.055, .055, 1.36, 14), gold, 0, 1.6, .5, C).rotation.z = Math.PI / 2;
    for (const e of [-1, 1]) { add(RB(.36, .75, 1.22, .18), emer, e * .62, .76, .0, C); add(new T.CylinderGeometry(.2, .2, 1.18, 24), emerL, e * .62, 1.16, .0, C).rotation.x = Math.PI / 2;
      for (const zz of [-.6, .6]) add(new T.CircleGeometry(.18, 24), gold, e * .62, 1.16, zz, C).rotation.y = zz < 0 ? Math.PI : 0 }
    { const pm = add(new T.SphereGeometry(.26, 22, 14), rose, 0, 1.05, .2, C); pm.scale.set(1, 1, .42); pm.rotation.x = -.18 }
    // 雙層大理石圓茶几：大的在中間、小的靠單人椅；金框、金腳，上面一盆圓球花
    const tbl = (x, z, r, h) => { const tg = new T.Group(); tg.position.set(x, 0, z); LG.add(tg); add(new T.CylinderGeometry(r, r, .1, 40), cream, 0, h, 0, tg); add(new T.TorusGeometry(r, .04, 8, 40), gold, 0, h - .03, 0, tg).rotation.x = Math.PI / 2;
      add(new T.CylinderGeometry(.08, .12, h - .12, 14), gold, 0, (h - .12) / 2 + .08, 0, tg); add(new T.CylinderGeometry(r * .55, r * .6, .08, 28), gold, 0, .1, 0, tg); return tg };
    tbl(7.05, 2.0, .78, .62); tbl(6.1, 3.05, .42, .5);
    { const vp = new T.Group(); vp.position.set(7.05, .67, 2.0); LG.add(vp); add(new T.CylinderGeometry(.16, .12, .22, 18), gold, 0, .11, 0, vp);
      const FL = ['#FF7FA8', '#FFC940', '#B784F5', '#FF8F5A', '#6FC8FF'].map(c => M(c, { roughness: .55 })); for (let q = 0; q < 9; q++) { const a = q * 2.4, r = .06 + (q % 3) * .07; add(new T.SphereGeometry(.1, 12, 10), FL[q % 5], Math.cos(a) * r, .3 + (q % 2) * .06, Math.sin(a) * r, vp) } }
    // 點擊範圍與名牌跟著新沙發
    if (sofaHit) { sofaHit.geometry.dispose(); sofaHit.geometry = new T.BoxGeometry(1.4, 1.6, 3.8); sofaHit.position.set(8.7, .8, 2.0); sofaHit.rotation.set(0, 0, 0) }
    if (sofaSign) sofaSign.position.set(8.7, 2.6, 2.0);
    LG.traverse(o => { if (o.isMesh) o.userData.wy3Action = 'wy260:sofa' });
    if (ctx.targets) LG.traverse(o => { if (o.isMesh) ctx.targets.push(o) }); }
  return { A, O };
}
