import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
// v503 2F 茶水間頂級版（依使用者參考圖）：大理石吧台＋深藍金邊、白色高腳椅、雙咖啡機、甜點架、水果盤、
// 左牆深藍金色層架＋金色茶罐、三門飲料冰箱、靠窗粉色沙發、兩組半圓卡座、按摩椅包廂、綠色沙發，
// 左前方改成一組粉色半開放式沙發（使用者指定）。燈光穩定不閃。
// 互動（咖啡、冰箱、零食、按摩椅、粉色／綠色沙發）照舊，名牌與點擊範圍跟著新位置移動。
export function applyLoungeLux(ctx) {
  const { THREE: T, root, X0, targets } = ctx;
  // ---------- 1) 隱藏舊家具（保留牆、窗、出口、名牌、點擊框、燈光）----------
  root.updateMatrixWorld(true);
  const bb = new T.Box3(), cen = new T.Vector3(), sz = new T.Vector3(), hidden = [];
  for (const ch of root.children) {
    if (ch.isLight) continue;
    if (ch.userData && ch.userData.wy337) continue;       // 名牌、點擊框
    bb.setFromObject(ch); if (!isFinite(bb.min.x)) continue; bb.getCenter(cen); bb.getSize(sz);
    const lx = cen.x - X0;
    if (cen.z < -10.1 || lx < -12.95 || lx > 12.95 || cen.y > 5.8) continue; // 牆面、窗戶、飾條
    ch.visible = false; hidden.push(ch);
  }
  // 舊家具的點擊目標移除（新家具重新登記）
  for (let i = targets.length - 1; i >= 0; i--) { const o = targets[i]; let h = false; for (let q = o; q; q = q.parent) if (hidden.includes(q)) h = true; if (h && o.geometry && o.geometry.type !== 'PlaneGeometry') targets.splice(i, 1) }
  // v508：被新家具取代、永遠不會再顯示的舊家具，直接從場景移除，釋放記憶體（畫面不變）
  for (const ch of hidden) { if (ch.parent) ch.parent.remove(ch); }

  // ---------- 2) 材質 ----------
  const tex = (w, h, f) => { const c = document.createElement('canvas'); c.width = w; c.height = h; f(c.getContext('2d'), w, h); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 8; return t };
  let sd = 3503; const rr = () => ((sd = Math.imul(sd ^ sd >>> 15, 1 | sd) + 0x6D2B79F5 | 0, ((sd ^ sd >>> 14) >>> 0) / 4294967296));
  const marbleTex = tex(512, 512, (g, S) => { g.fillStyle = '#FFFFFF'; g.fillRect(0, 0, S, S); for (let i = 0; i < 18; i++) { const x = rr() * S, y = rr() * S, r = 60 + rr() * 140, gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(228,224,218,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2) }
    g.strokeStyle = 'rgba(176,170,164,.4)'; g.lineCap = 'round'; for (let k = 0; k < 4; k++) { let x = rr() * S, y = rr() * S, a = rr() * 6.28; g.lineWidth = 1 + rr() * 1.5; g.beginPath(); g.moveTo(x, y); for (let j = 0; j < 40; j++) { a += (rr() - .5) * .3; x += Math.cos(a) * 10; y += Math.sin(a) * 10; g.lineTo(x, y) } g.stroke() } });
  const M = (c, o = {}) => new T.MeshStandardMaterial({ color: c, roughness: .45, ...o });
  const marble = M('#FFFDF8', { map: marbleTex, roughness: .22 });
  const navy = M('#1D2C52', { roughness: .36, metalness: .1 }), navyD = M('#2A2F3D', { roughness: .4 });
  const gold = M('#E4B95A', { metalness: .75, roughness: .25, emissive: '#4a3208', emissiveIntensity: .25 });
  const beige = M('#EBD9C0', { roughness: .55 }), cream = M('#F7EEE1', { roughness: .5 });
  const pink = M('#F2B8C2', { roughness: .6 }), pinkD = M('#E8A3B0', { roughness: .6 }), green = M('#5E7F6A', { roughness: .6 }), greenD = M('#4F6E5B', { roughness: .6 });
  const pillowW = M('#F6EADB', { roughness: .65 }), pillowS = M('#B9C7B0', { roughness: .65 });
  const leaf = M('#3F9A4A', { roughness: .6 }), leaf2 = M('#5DB45A', { roughness: .6 }), bloom = M('#FBF8EE', { roughness: .6 }), bloomP = M('#F7C6D3', { roughness: .6 });
  const glow = new T.MeshBasicMaterial({ color: '#FFE3AE' }), glass = new T.MeshStandardMaterial({ color: '#E6F6FB', transparent: true, opacity: .18, roughness: .05, depthWrite: false });
  const rugM = M('#EADBC4', { roughness: .9 });

  const G = new T.Group(); G.name = 'wyLoungeLux'; root.add(G);
  const add = (geo, m, x, y, z, p = G) => { const o = new T.Mesh(geo, m); o.position.set(x, y, z); p.add(o); return o };
  const grp = (x, z, ry = 0) => { const g = new T.Group(); g.position.set(X0 + x, 0, z); g.rotation.y = ry; G.add(g); return g };
  // 動森風：方塊一律圓角（可愛又高級）；很薄的金線維持直角
  const RB = (w, h, d) => { const mn = Math.min(w, h, d); return mn < .07 ? new T.BoxGeometry(w, h, d) : new RoundedBoxGeometry(w, h, d, 3, Math.min(.16, mn * .38)) };
  const box = (g, x, y, z, w, h, d, m) => add(RB(w, h, d), m, x, y, z, g);
  const cyl = (g, x, y, z, a, b, h, m, s = 32) => add(new T.CylinderGeometry(a, b, h, s), m, x, y, z, g);
  const sph = (g, x, y, z, r, m) => add(new T.SphereGeometry(r, 14, 10), m, x, y, z, g);
  const reg = (g, key) => { g.traverse(o => { if (o.isMesh) { o.userData.wy337 = key; targets.push(o) } }) };

  // 動森風可愛植物：發財樹（圓葉一團團）與繽紛圓球花叢，輪流擺放；花盆金色
  let plantN = 0;
  const FLW = ['#FF7FA8', '#FFC940', '#B784F5', '#FF8F5A', '#FF6FB0', '#6FC8FF'].map(c => new T.MeshStandardMaterial({ color: c, roughness: .55 }));
  const LV = [new T.MeshStandardMaterial({ color: '#4FB25A', roughness: .6 }), new T.MeshStandardMaterial({ color: '#7ACB5E', roughness: .6 })];
  const TRK = new T.MeshStandardMaterial({ color: '#B98955', roughness: .7 }), CTR = new T.MeshStandardMaterial({ color: '#FFF6D8', roughness: .5 });
  function cutePlant(px, py, pz, s, parent) {
    const g = new T.Group(); g.position.set(px, py, pz); parent.add(g);
    const P = (geo, m, x, y, z) => { const o = new T.Mesh(geo, m); o.position.set(x * s, y * s, z * s); o.scale.setScalar(s); g.add(o); return o };
    P(new T.CylinderGeometry(.46, .34, .9, 28), gold, 0, .45, 0); P(new T.TorusGeometry(.46, .06, 8, 28), gold, 0, .9, 0).rotation.x = Math.PI / 2; P(new T.CylinderGeometry(.42, .42, .06, 24), new T.MeshStandardMaterial({ color: '#7A5434' }), 0, .88, 0);
    if (plantN++ % 2 === 0) { // 發財樹
      for (let k = 0; k < 3; k++) { const t = P(new T.CylinderGeometry(.06, .09, 1.5, 8), TRK, Math.cos(k * 2.1) * .06, 1.6, Math.sin(k * 2.1) * .06); t.rotation.z = (k - 1) * .12 }
      for (const [x, y, z, r] of [[0, 2.65, 0, .55], [-.45, 2.35, .1, .42], [.45, 2.4, -.1, .44], [.1, 2.3, .45, .4], [-.1, 2.45, -.45, .4], [0, 3.05, .05, .38]]) P(new T.SphereGeometry(r, 16, 12), LV[(x > 0) | 0], x, y, z);
    } else { // 繽紛花叢
      for (let k = 0; k < 7; k++) { const a = k * .9; P(new T.SphereGeometry(.34, 14, 10), LV[k % 2], Math.cos(a) * .3, 1.25 + (k % 3) * .12, Math.sin(a) * .3) }
      for (let k = 0; k < 9; k++) { const a = k * 2.4, r = .18 + (k % 3) * .14; const c = FLW[k % FLW.length]; const f = new T.Group(); f.position.set(Math.cos(a) * r * s, (1.45 + (k % 3) * .2) * s, Math.sin(a) * r * s); g.add(f);
        for (let j = 0; j < 5; j++) { const b = j * 1.2566; const pt = new T.Mesh(new T.SphereGeometry(.1 * s, 10, 8), c); pt.position.set(Math.cos(b) * .1 * s, .03 * s, Math.sin(b) * .1 * s); f.add(pt) }
        const ct = new T.Mesh(new T.SphereGeometry(.07 * s, 10, 8), CTR); ct.position.y = .06 * s; f.add(ct) }
    }
    return g;
  }
  const plant = (x, z, s = 1) => cutePlant(X0 + x, 0, z, s, G);
  const vase = (g, x, y, z, s = 1, m = bloom) => { cyl(g, x, y + .2 * s, z, .16 * s, .22 * s, .4 * s, gold, 16); for (let q = 0; q < 9; q++) { const a = q * 2.4, r = .1 + (q % 3) * .07; sph(g, x + Math.cos(a) * r * s, y + (.55 + (q % 2) * .1) * s, z + Math.sin(a) * r * s, .12 * s, m) } };
  const rug = (x, z, w, d) => { // v514 動森風橢圓地毯：每層頂面高度至少差 0.02，不會閃爍
    const g = grp(x, z), sx = w / 2, sz = d / 2, rugP = M('#F6B8C6', { roughness: .95 }), rugC = M('#FFF3E2', { roughness: .95 }), rugG = M('#F3D27A', { roughness: .8 });
    const disc = (r, h, y, m, seg = 48) => { const o = add(new T.CylinderGeometry(r, r, h, seg), m, 0, y, 0, g); o.scale.set(sx, 1, sz); return o };
    disc(1, .04, .02, rugP);                       // 粉紅外圈（頂面 .04）
    for (let k = 0; k < 28; k++) { const a2 = k / 28 * Math.PI * 2; const o = add(new T.CylinderGeometry(.22, .22, .04, 14), rugP, Math.cos(a2) * sx, .02, Math.sin(a2) * sz, g) } // 波浪花邊
    disc(.8, .03, .055, rugC);                     // 奶油內圈（頂面 .07）
    for (let k = 0; k < 12; k++) { const a2 = k / 12 * Math.PI * 2; add(new T.CylinderGeometry(.1, .1, .02, 12), rugG, Math.cos(a2) * sx * .66, .08, Math.sin(a2) * sz * .66, g) } // 金色小圓點（頂面 .09）
    return g };
  const coffeeTable = (x, z) => { const g = grp(x, z); cyl(g, 0, .45, 0, .18, .25, .8, gold, 16); cyl(g, 0, .9, 0, 1.0, 1.0, .08, gold, 40); cyl(g, 0, .95, 0, .95, .95, .05, marble, 40); vase(g, 0, .98, 0, .8); box(g, .45, 1.0, .25, .5, .06, .36, M('#C7D7C4')); return g };
  // 環形扇區（θ：x=sinθ、z=cosθ；開口置中在 +Z）
  const sector = (g, rIn, rOut, h, y0, start, open, m) => { const sh = new T.Shape(), N = 40; for (let i = 0; i <= N; i++) { const t = start + open * i / N; const p = [Math.sin(t) * rOut, -Math.cos(t) * rOut]; i ? sh.lineTo(...p) : sh.moveTo(...p) } for (let i = N; i >= 0; i--) { const t = start + open * i / N; sh.lineTo(Math.sin(t) * rIn, -Math.cos(t) * rIn) } const o = add(new T.ExtrudeGeometry(sh, { depth: h, bevelEnabled: true, bevelThickness: .08, bevelSize: .08, bevelSegments: 3 }), m, 0, y0, 0, g); o.rotation.x = -Math.PI / 2; return o };
  const arcTube = (g, r, y, start, open, t, m) => { const pts = []; for (let i = 0; i <= 48; i++) { const a = start + open * i / 48; pts.push(new T.Vector3(Math.sin(a) * r, y, Math.cos(a) * r)) } return add(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 96, t, 8, false), m, 0, 0, 0, g) };
  // 沙發：面向 +Z（local），寬 w
  function sofa(x, z, ry, w, body, bodyD, key) {
    const g = grp(x, z, ry);
    box(g, 0, .25, 0, w, .3, 1.7, gold); box(g, 0, .55, 0, w - .05, .5, 1.65, body);
    box(g, 0, 1.35, -.65, w, 1.3, .45, body);
    for (const s of [-1, 1]) box(g, s * (w / 2 - .22), .95, 0, .45, .85, 1.65, bodyD);
    const n = Math.max(2, Math.round(w / 1.5)); for (let i = 0; i < n; i++) { const xx = (i - (n - 1) / 2) * (w - .6) / n; box(g, xx, .88, .1, (w - .7) / n - .06, .22, 1.2, body); const p = add(new RoundedBoxGeometry(.7, .6, .22, 3, .1), i % 2 ? pillowS : pillowW, xx, 1.3, -.32, g); p.rotation.x = -.2 }
    if (key) reg(g, key); return g;
  }
  // 半圓卡座（local：開口朝 +Z）＋中間圓桌
  function booth(x, z, ry, r, body, ribs, open = Math.PI * 1.15) {
    const g = grp(x, z, ry), start = (Math.PI * 2 - open) / 2;
    sector(g, r - .85, r, .55, .2, start, open, body); sector(g, r - .85, r, .2, 0, start, open, gold);
    const ribM = ribs.clone(); ribM.side = T.DoubleSide;
    const back = add(new T.CylinderGeometry(r + .05, r + .05, 1.6, 48, 1, true, start, open), ribM, 0, .95, 0, g);
    for (let k = 0; k <= 14; k++) { const a = start + k / 14 * open; add(new T.CylinderGeometry(.07, .07, 1.5, 8), ribs, Math.sin(a) * (r + .1), .95, Math.cos(a) * (r + .1), g) }
    arcTube(g, r + .1, 1.76, start, open, .06, gold);
    for (let k = 0; k < 4; k++) { const a = start + (k + .5) / 4 * open; const p = add(new RoundedBoxGeometry(.75, .6, .22, 3, .1), k % 2 ? pillowS : pillowW, Math.sin(a) * (r - .3), 1.05, Math.cos(a) * (r - .3), g); p.rotation.y = a }
    cyl(g, 0, .45, 0, .14, .3, .8, gold, 16); cyl(g, 0, .9, 0, .75, .75, .06, gold, 40); cyl(g, 0, .94, 0, .7, .7, .05, marble, 40); vase(g, 0, .97, 0, .8);
    return g;
  }

  // ---------- 3) 擺放 ----------
  // 左牆後段：深藍金色層架（金色茶罐）＋下櫃
  { const g = grp(-12.75, -8.4, Math.PI / 2);
    box(g, 0, .7, 0, 3.6, 1.4, .9, navy); box(g, 0, 1.45, 0, 3.7, .1, 1.0, marble); for (const s of [-1, 0, 1]) { box(g, s * 1.2, .7, .46, .02, 1.1, .02, gold); box(g, s * 1.2 + .3, .95, .48, .25, .04, .04, gold) }
    for (const y of [2.6, 3.6]) { box(g, 0, y, -.15, 3.2, .1, .55, navy); box(g, 0, y - .07, -.15, 3.2, .03, .55, gold); for (let k = 0; k < 6; k++) { const xx = -1.35 + k * .54; cyl(g, xx, y + .3, -.15, .17, .17, .45, k % 3 === 2 ? M('#F3EBDD') : gold, 20); cyl(g, xx, y + .55, -.15, .12, .12, .08, gold, 16) } }
    box(g, 0, 3.1, -.42, 3.4, 2.2, .06, glow); box(g, 0, 4.25, -.15, 3.4, .1, .6, gold);
    for (let k = 0; k < 3; k++) { const pg = new T.Group(); pg.position.set(-1.2 + k * 1.2, 1.5, 0); g.add(pg); cyl(pg, 0, .2, 0, .14, .18, .35, gold, 16); sph(pg, 0, .5, 0, .28, leaf2) } }
  // 左牆中段：三門發光飲料冰箱（冰箱互動）
  const fridge = grp(-12.6, -4.4, Math.PI / 2);
  // 飲料櫃（不是書櫃）：香檳金外框、亮白冷光內裝、透明玻璃門，裡面一排排彩色飲料瓶
  const BOT = ['#FF5A7A', '#FFC531', '#34C27A', '#FF8A2A', '#4AA8FF', '#B66BFF', '#FF6FB5'].map(c => M(c, { roughness: .25 }));
  const capM = M('#FFFFFF', { roughness: .3 }), coolM = new T.MeshBasicMaterial({ color: '#F4FBFF' }), frameM = M('#F3E9D8', { roughness: .3 });
  const cooler = (g, doors, H) => {
    const W = doors * 1.3;
    box(g, 0, H / 2, -.5, W + .3, H + .2, .1, frameM); for (const s4 of [-1, 1]) box(g, s4 * (W / 2 + .1), H / 2, 0, .12, H + .2, 1.05, frameM); for (let d = 1; d < doors; d++) box(g, -W / 2 + d * 1.3, H / 2, .05, .1, H, .95, frameM); box(g, 0, H + .15, 0, W + .36, .12, 1.15, gold); box(g, 0, .05, 0, W + .36, .1, 1.15, gold);
    box(g, 0, H - .25, .53, W, .32, .04, M('#1D2C52')); box(g, 0, H - .25, .555, W - .3, .08, .02, gold);
    for (let d = 0; d < doors; d++) { const dx = -W / 2 + .65 + d * 1.3;
      box(g, dx, (H - .5) / 2 + .15, -.42, 1.16, H - .65, .04, coolM); for (const s3 of [-1, 1]) box(g, dx + s3 * .57, (H - .5) / 2 + .15, .05, .03, H - .65, .9, coolM);
      for (let j = 0; j < 6; j++) { const y = .35 + j * (H - .9) / 6; box(g, dx, y, .15, 1.12, .03, .6, M('#DDE6EC'));
        for (let k = 0; k < 4; k++) { const bm = BOT[(j * 2 + k + d * 3) % BOT.length], bx = dx - .39 + k * .26; cyl(g, bx, y + .22, .3, .095, .095, .38, bm, 12); cyl(g, bx, y + .45, .3, .05, .07, .1, bm, 10); cyl(g, bx, y + .52, .3, .045, .045, .05, capM, 8) } }
      box(g, dx, (H - .5) / 2 + .15, .5, 1.16, H - .65, .03, glass);
      for (const s2 of [-1, 1]) box(g, dx + s2 * .6, (H - .5) / 2 + .15, .52, .06, H - .6, .06, gold);
      box(g, dx + .45, (H - .5) / 2 + .15, .58, .06, 1.2, .08, gold) }
  };
  // v514 陳老闆 11-22：冰箱移到左牆前段（原粉色半開放沙發位置），做大、往前凸、豪華又可愛的動森風復古大冰箱
  fridge.position.set(X0 - 11.8, 0, 4.4); fridge.scale.setScalar(1.25); // v515 再放大 1.25 倍（背面仍貼牆）
  { const g = fridge, W = 3.0, H = 4.7, D = 2.0, zf = D / 2;
    const pearl = M('#FFF3E0', { roughness: .28, metalness: .08 }), navyP = M('#1D2C52', { roughness: .3, metalness: .15 });
    const RBb = (w, h, d, r) => new RoundedBoxGeometry(w, h, d, 6, r);
    add(RBb(W, H - .5, D, .5), pearl, 0, .35 + (H - .5) / 2, 0, g);                       // 圓胖機身
    add(RBb(W + .2, .36, D + .2, .16), gold, 0, .3, 0, g);                                  // 金色底座
    for (const [fx, fz] of [[-1.15, -.7], [1.15, -.7], [-1.15, .7], [1.15, .7]]) cyl(g, fx, .1, fz, .16, .2, .22, gold, 20); // 圓金腳
    const top = H - .15;
    add(RBb(W + .16, .3, D + .16, .14), gold, 0, top, 0, g);                                // 頂部金飾條
    add(RBb(1.3, .9, .5, .2), pearl, 0, top + .55, zf - .4, g); // 頂上徽章座（圓胖奶油色）
    { const t = add(new T.TorusGeometry(.48, .08, 12, 40), gold, 0, top + .6, zf - .02, g); }
    add(new T.CylinderGeometry(.44, .44, .1, 40), navyP, 0, top + .6, zf - .06, g).rotation.x = Math.PI / 2;  // 深藍徽章
    add(new T.CylinderGeometry(.2, .2, .08, 5), gold, 0, top + .6, zf + .01, g).rotation.x = Math.PI / 2;     // 金星
    sph(g, -1.0, top + .32, zf - .3, .13, gold); sph(g, 1.0, top + .32, zf - .3, .13, gold);
    // 上下兩扇門：上冷凍小門＋下大門（中間金腰帶）
    const yMid = 3.25;
    add(RBb(W + .1, .18, D + .12, .08), gold, 0, yMid, 0, g);
    add(RBb(W - .36, top - yMid - .5, .12, .1), pearl, 0, (top + yMid) / 2 - .05, zf + .02, g);
    add(RBb(W - .36, yMid - .95, .12, .1), pearl, 0, (yMid + .7) / 2, zf + .02, g);
    // 大門圓角玻璃窗：冷光內裝＋三層彩色飲料
    const wy = 1.95, wh = 1.75, ww = 1.9;
    add(RBb(ww + .24, wh + .24, .1, .14), gold, -.12, wy, zf + .07, g);
    add(RBb(ww, wh, .08, .1), coolM, -.12, wy, zf + .1, g);
    for (let j = 0; j < 3; j++) { const y = wy - wh / 2 + .2 + j * .55; box(g, -.12, y - .05, zf + .14, ww - .1, .04, .05, gold);
      for (let k = 0; k < 5; k++) { const bm = BOT[(j * 2 + k) % BOT.length], bx = -.12 - .72 + k * .36; cyl(g, bx, y + .17, zf + .17, .1, .1, .32, bm, 14); cyl(g, bx, y + .37, zf + .17, .05, .075, .1, bm, 10); sph(g, bx, y + .44, zf + .17, .055, capM) } }
    add(RBb(ww, wh, .03, .1), glass, -.12, wy, zf + .25, g);
    // 胖胖金把手（上下門各一）
    const cap = (h, y) => { const o = add(new T.CapsuleGeometry(.09, h, 8, 16), gold, 1.13, y, zf + .32, g); for (const yy of [y - h / 2, y + h / 2]) cyl(g, 1.13, yy, zf + .18, .05, .05, .26, gold, 10).rotation.x = Math.PI / 2; return o };
    cap(1.5, wy); cap(.55, (top + yMid) / 2 - .05);
    // 上門深藍小牌＋金線
    add(RBb(1.5, .38, .05, .1), navyP, -.2, (top + yMid) / 2 - .05, zf + .1, g); box(g, -.2, (top + yMid) / 2 - .05, zf + .135, 1.2, .05, .02, gold);
    // 側面金色直條＋可愛腮紅小圓（動森風）
    for (const s4 of [-1, 1]) add(RBb(.08, H - 1.0, .08, .03), gold, s4 * (W / 2 + .01), (H - .5) / 2 + .35, zf - .35, g);
    // v515 更豪華：上門金框、四角金飾、把手水晶頭、頂上金珠花邊與兩側小皇冠、窗內暖光燈條
    const yT = (top + yMid) / 2 - .05, crys = M('#E8F6FF', { roughness: .05, metalness: .1, transparent: true, opacity: .85, emissive: '#BFE6FF', emissiveIntensity: .35 });
    for (const [fx, fy] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) { box(g, fx * (W / 2 - .3), yT + fy * .5, zf + .1, .5, .06, .03, gold); box(g, fx * (W / 2 - .55), yT + fy * .25, zf + .1, .06, .5, .03, gold) }
    for (const yy of [wy + .75 + .09, wy - .75 - .09, (top + yMid) / 2 + .25 + .03, (top + yMid) / 2 - .25 - .1]) sph(g, 1.13, yy, zf + .33, .12, crys);
    for (let k = 0; k < 11; k++) sph(g, -1.4 + k * .28, top + .17, zf + .02, .07, gold);
    for (const s4 of [-1, 1]) { cyl(g, s4 * 1.05, top + .33, zf - .3, .16, .2, .14, gold, 16); for (let k = 0; k < 5; k++) { const a3 = k / 5 * Math.PI * 2; sph(g, s4 * 1.05 + Math.cos(a3) * .13, top + .46, zf - .3 + Math.sin(a3) * .13, .045, gold) } sph(g, s4 * 1.05, top + .5, zf - .3, .07, crys) }
    add(RBb(ww - .2, .06, .04, .02), M('#FFF6D8', { emissive: '#FFE7A8', emissiveIntensity: 1.1 }), -.12, wy + wh / 2 - .08, zf + .16, g);
  }
  reg(fridge, 'fridge');
  plant(-12.4, -1.5, 1.05); plant(-12.4, -10.0, 1.0);
  // 中央大理石吧台（深藍直紋櫃身＋金邊）＋白色高腳椅
  const bar = grp(-1.5, -2.6);
  { const L = 10.4, D = 2.7;
    const shape = new T.Shape(); const hw = L / 2, hd = D / 2; shape.moveTo(-hw + hd, -hd); shape.lineTo(hw - hd, -hd); shape.absarc(hw - hd, 0, hd, -Math.PI / 2, Math.PI / 2); shape.lineTo(-hw + hd, hd); shape.absarc(-hw + hd, 0, hd, Math.PI / 2, Math.PI * 1.5);
    const body = add(new T.ExtrudeGeometry(shape, { depth: 1.35, bevelEnabled: false, curveSegments: 24 }), navy, 0, .1, 0, bar); body.rotation.x = -Math.PI / 2; body.position.y = .1;
    const top = add(new T.ExtrudeGeometry(shape, { depth: .14, bevelEnabled: false, curveSegments: 24 }), marble, 0, 1.45, 0, bar); top.rotation.x = -Math.PI / 2; top.scale.set(1.04, 1.12, 1);
    const tr = add(new T.ExtrudeGeometry(shape, { depth: .06, bevelEnabled: false, curveSegments: 24 }), gold, 0, 1.4, 0, bar); tr.rotation.x = -Math.PI / 2; tr.scale.set(1.045, 1.13, 1);
    const bt = add(new T.ExtrudeGeometry(shape, { depth: .1, bevelEnabled: false, curveSegments: 24 }), gold, 0, 0, 0, bar); bt.rotation.x = -Math.PI / 2; bt.scale.set(1.01, 1.03, 1);
    for (let k = 0; k < 19; k++) box(bar, -4.05 + k * .45, .78, hd + .01, .05, 1.2, .03, gold); for (let k = 0; k < 9; k++) { const cc = [M('#FF7FA8'), M('#FFC940'), M('#6FC8FF'), M('#B784F5')][k % 4]; add(new T.SphereGeometry(.09, 12, 10), cc, -3.6 + k * .9, 1.25, hd + .06, bar) }
    box(bar, 0, .14, hd + .05, L - 2.1, .05, .05, glow);
    for (let k = 0; k < 5; k++) { const sx = -3.6 + k * 1.8; const st = new T.Group(); st.position.set(sx, 0, hd + .9); bar.add(st);
      cyl(st, 0, .03, 0, .35, .35, .06, gold, 24); for (let q = 0; q < 4; q++) { const a = q * Math.PI / 2 + Math.PI / 4; const lg = add(new T.CylinderGeometry(.035, .035, 1.25, 8), gold, Math.cos(a) * .25, .65, Math.sin(a) * .25, st); lg.rotation.z = Math.cos(a) * .12; lg.rotation.x = -Math.sin(a) * .12 }
      cyl(st, 0, .6, 0, .3, .3, .03, gold, 24); cyl(st, 0, 1.3, 0, .42, .38, .2, cream, 24); const bk = add(new T.CylinderGeometry(.44, .44, .55, 24, 1, true, Math.PI * 1.25 + Math.PI, Math.PI * .5), cream, 0, 1.68, 0, st); bk.material = cream.clone(); bk.material.side = T.DoubleSide; }
  }
  // 吧台上：雙咖啡機（咖啡互動）、甜點架、水果盤（零食互動）、大花束
  const espresso = new T.Group(); espresso.position.set(-3.9, 1.6, -.4); bar.add(espresso);
  for (const s of [-.55, .55]) { box(espresso, s, .55, 0, .95, 1.1, .85, M('#E9EAEC', { metalness: .3, roughness: .3 })); box(espresso, s, .6, .43, .7, .45, .03, navyD); cyl(espresso, s, 1.35, -.1, .22, .16, .5, M('#3A3D45'), 16); box(espresso, s, .1, .5, .7, .08, .35, M('#BFC3C9')); cyl(espresso, s, .22, .5, .1, .08, .18, cream, 12) }
  reg(espresso, 'coffee');
  const pastry = new T.Group(); pastry.position.set(-1.9, 1.6, .2); bar.add(pastry);
  for (const dx of [-.55, .55]) { cyl(pastry, dx, .45, 0, .04, .04, .9, gold, 8); for (const [y, r] of [[.1, .5], [.5, .38], [.85, .26]]) { cyl(pastry, dx, y, 0, r, r, .04, cream, 24); for (let k = 0; k < 5; k++) { const a = k * 1.26; sph(pastry, dx + Math.cos(a) * r * .6, y + .08, Math.sin(a) * r * .6, .09, [M('#E9B46A'), M('#F28CA8'), M('#C98A4B')][k % 3]) } } const dome = add(new T.SphereGeometry(.5, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), glass, dx, .08, 0, pastry); }
  const snacks = new T.Group(); snacks.position.set(1.0, 1.6, .1); bar.add(snacks);
  // 零食區（使用者：更鮮豔、更豐富、更明顯）：大水果盤、馬卡龍塔、甜甜圈、草莓蛋糕、三罐彩色糖果
  const C = c => M(c, { roughness: .4 });
  cyl(snacks, -1.1, .15, .2, .62, .42, .3, gold, 28); for (let k = 0; k < 10; k++) { const a = k * .63; sph(snacks, -1.1 + Math.cos(a) * .3, .38 + (k % 3) * .08, .2 + Math.sin(a) * .3, .16, [C('#E8342A'), C('#FFB300'), C('#8CCB3C'), C('#FF7A1A'), C('#7B3FA0')][k % 5]) }
  cyl(snacks, 0, .05, -.3, .5, .5, .06, gold, 24); for (let i = 0; i < 6; i++) { const r = .42 - i * .065; for (let k = 0; k < Math.max(1, Math.round(r * 18)); k++) { const a = k / Math.max(1, Math.round(r * 18)) * Math.PI * 2; const m = add(new T.CylinderGeometry(.08, .08, .08, 12), [C('#FF8FB3'), C('#FFE07A'), C('#9FE0C0'), C('#C9A6FF'), C('#FFB38A'), C('#8FD3FF')][(i + k) % 6], Math.cos(a) * r, .12 + i * .13, -.3 + Math.sin(a) * r, snacks) } }
  cyl(snacks, 1.05, .04, .25, .55, .55, .05, M('#FFFFFF'), 28); for (let k = 0; k < 5; k++) { const a = k * 1.26; const d = add(new T.TorusGeometry(.13, .07, 10, 18), C('#E7B36A'), 1.05 + Math.cos(a) * .3, .13, .25 + Math.sin(a) * .3, snacks); d.rotation.x = Math.PI / 2; const ic = add(new T.TorusGeometry(.13, .055, 10, 18), [C('#FF6FA5'), C('#6B3A2A'), C('#FFFFFF'), C('#7FD3FF'), C('#FFD23F')][k], 1.05 + Math.cos(a) * .3, .17, .25 + Math.sin(a) * .3, snacks); ic.rotation.x = Math.PI / 2 }
  cyl(snacks, 2.15, .04, -.1, .5, .5, .05, gold, 28); cyl(snacks, 2.15, .25, -.1, .4, .4, .35, C('#FFFFFF'), 28); cyl(snacks, 2.15, .55, -.1, .3, .3, .28, C('#FFB3C8'), 28); for (let k = 0; k < 8; k++) { const a = k * .785; sph(snacks, 2.15 + Math.cos(a) * .3, .46, -.1 + Math.sin(a) * .3, .07, C('#E8242E')) } sph(snacks, 2.15, .78, -.1, .09, C('#E8242E'));
  for (let j = 0; j < 3; j++) { const jx = .3 + j * .55, jz = .55; cyl(snacks, jx, .3, jz, .22, .22, .55, glass, 20); for (let k = 0; k < 9; k++) sph(snacks, jx + Math.cos(k * 2.3) * .1, .1 + (k % 4) * .1, jz + Math.sin(k * 2.3) * .1, .07, [C('#FF4F7B'), C('#FFD23F'), C('#3FD08A'), C('#4FB3FF'), C('#B46BFF')][(k + j) % 5]); cyl(snacks, jx, .62, jz, .24, .24, .08, gold, 20) }
  reg(snacks, 'snacks');
  vase(bar, 4.4, 1.6, 0, 1.5);
  // 靠窗粉色沙發（粉色沙發互動）＋茶几
  sofa(-6.0, -9.0, 0, 4.6, pink, pinkD, 'pink'); rug(-6.0, -7.4, 6.0, 3.6); coffeeTable(-6.0, -6.9);
  plant(-2.6, -9.8, 1.0);
  // 靠窗兩組半圓卡座（深藍直紋背板）
  booth(2.6, -7.7, 0, 1.9, beige, M('#D9C2A2', { roughness: .5 }));
  booth(7.6, -7.7, 0, 1.9, beige, M('#D9C2A2', { roughness: .5 }));
  // 右後角單門冰箱＋盆栽
  { const g = grp(12.5, -5.2, -Math.PI / 2); cooler(g, 1, 4.4) }
  plant(12.3, -9.6, 1.05); plant(12.3, -2.8, 1.0);
  // 右前方綠色沙發（綠色沙發互動）＋地毯茶几
  // v514：右前方綠色沙發組（沙發、地毯、茶几）拿掉，八卦改到窗邊粉色沙發
  // 左前方：粉色半開放式沙發（使用者指定，取代花台卡座）
  // v514：左前方粉色半開放沙發拿掉，改放大冰箱
  plant(-12.4, 8.6, 1.05);
  // 前方中間：兩座按摩椅包廂（開口朝鏡頭）
  function pod(x, z, key, shellC, chairC, innerC) {
    const g = grp(x, z, 0), r = 1.75, open = Math.PI * 1.3, start = (Math.PI * 2 - open) / 2;
    const shellM = M(shellC, { roughness: .32 }); const sh = add(new T.CylinderGeometry(r, r, 3.0, 48, 1, true, start, open), shellM, 0, 1.6, 0, g); sh.material = shellM.clone(); sh.material.side = T.DoubleSide;
    for (let k = 0; k <= 16; k++) { const a = start + k / 16 * open; add(new T.BoxGeometry(.06, 2.9, .06), gold, Math.sin(a) * (r + .03), 1.6, Math.cos(a) * (r + .03), g) }
    const inner = add(new T.CylinderGeometry(r - .06, r - .06, 2.9, 48, 1, true, start, open), M(innerC, { side: T.BackSide }), 0, 1.6, 0, g);
    arcTube(g, r + .02, .12, start, open, .08, gold);
    // 頂端花冠（沿用原本設計，花更大、金色花心、更高級）
    const fc = [M('#FFF4E6'), M('#F1A9C0'), M('#E4C9F5'), M('#FFD2BF'), M('#FFFFFF')], heartM = gold, lfM = M('#5E9C6E', { roughness: .6 }), petalG = new T.SphereGeometry(.16, 10, 8), leafG = new T.SphereGeometry(.2, 8, 6);
    for (let i = 0; i < 26; i++) { const a = start + open * i / 25; const f = new T.Group(); f.position.set(Math.sin(a) * (r + .06), 3.3 + (i % 3) * .06, Math.cos(a) * (r + .06)); f.rotation.y = a; g.add(f);
      for (const d of [-1, 1]) { const l = add(leafG, lfM, d * .32, -.1, -.02, f); l.scale.set(1.2, .45, .5) }
      for (let j = 0; j < 5; j++) { const b = j * Math.PI * 2 / 5; const pt = add(petalG, fc[i % fc.length], Math.cos(b) * .19, Math.sin(b) * .17, 0, f); pt.scale.set(1.05, .85, .5) }
      add(new T.SphereGeometry(.08, 10, 8), heartM, 0, 0, .06, f) }
    arcTube(g, r, 3.12, start, open, .07, gold);
    add(new T.CircleGeometry(r, 48), rugM, 0, .02, 0, g).rotation.x = -Math.PI / 2;
    // 按摩椅（面向 +Z）
    const c = new T.Group(); c.position.set(0, 0, -.1); g.add(c);
    const chM = M(chairC, { roughness: .45 }); box(c, 0, .3, 0, 1.1, .5, 1.8, gold); box(c, 0, .75, .1, 1.0, .35, 1.1, chM); const bk = box(c, 0, 1.5, -.55, 1.0, 1.6, .35, chM); bk.rotation.x = -.25; box(c, 0, 2.35, -.75, .9, .4, .4, cream);
    for (const s of [-1, 1]) { box(c, s * .58, 1.0, 0, .2, .55, 1.3, chM); box(c, s * .58, 1.3, 0, .22, .06, 1.3, gold) }
    const leg = box(c, 0, .45, .95, .8, .3, .8, chM); leg.rotation.x = .6;
    const tb = grp(x + 1.0, z - .7); cyl(tb, 0, .4, 0, .06, .18, .8, gold, 12); cyl(tb, 0, .82, 0, .32, .32, .05, gold, 24); vase(tb, 0, .85, 0, .6);
    plant(x - 1.05, z - .6, .75);
    reg(g, key); return g;
  }
  pod(-3.6, 7.2, 'spaA', '#E8849F', '#FBE3EA', '#FFE9EF'); pod(1.3, 7.2, 'spaB', '#5DB894', '#E3F4EA', '#EAF7EF'); // 使用者指定：按摩椅包廂用鮮豔色（玫瑰紅、翡翠綠）＋花冠

  // ---------- 4) 名牌與點擊框跟著新位置 ----------
  const NEW = { coffee: [-5.4, 4.4, -3.0], fridge: [-10.5, 7.7, 4.4], snacks: [-.5, 4.2, -2.4], spaA: [-3.6, 4.4, 7.2], spaB: [1.3, 4.4, 7.2], pink: [-6.0, 3.9, -9.0], mint: [7.6, 3.9, 1.6] };
  root.traverse(o => { const k0 = o.userData && o.userData.wy337; if (k0 === 'mint' && o.isMesh) { o.visible = false; const ti = targets.indexOf(o); if (ti >= 0) targets.splice(ti, 1); return } });
  root.traverse(o => { const k = o.userData && o.userData.wy337; if (!k || !NEW[k] || !o.isMesh) return; if (o.geometry.type === 'PlaneGeometry') { o.position.set(X0 + NEW[k][0], NEW[k][1], NEW[k][2]) } else if (o.material && o.material.visible === false) { o.position.set(X0 + NEW[k][0], 1.25, NEW[k][2]) } });
  // 牆面（使用者參考圖）：淺橡木直條板＋細金線、米色大理石窄板、霧藍素面板、霧藍大理石重點牆（金條分隔）、金色踢腳＋牆頂暖光
  { const room0 = ctx.room || root.parent;
    const oakTex = tex(256, 512, (g, W2, H2) => { g.fillStyle = '#C9965E'; g.fillRect(0, 0, W2, H2); for (let x = 0; x < W2; x += 2) { g.fillStyle = `rgba(${130 + rr() * 40},${85 + rr() * 25},${40 + rr() * 15},${.1 + rr() * .18})`; g.fillRect(x, 0, 1 + rr() * 2, H2) } for (let k = 0; k < 4; k++) { g.fillStyle = 'rgba(110,70,35,.35)'; g.fillRect(k * W2 / 4, 0, 3, H2) } });
    const mTex = (base, vein, hl) => tex(512, 768, (g, W2, H2) => { g.fillStyle = base; g.fillRect(0, 0, W2, H2); for (let i = 0; i < 20; i++) { const x = rr() * W2, y = rr() * H2, r = 80 + rr() * 160, gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, hl); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2) }
      g.lineCap = 'round'; for (let k = 0; k < 5; k++) { let x = rr() * W2, y = H2, a = -Math.PI / 2 - .75 + rr() * .3; const pts = [[x, y]]; for (let j = 0; j < 60; j++) { a += (rr() - .5) * .22; x += Math.cos(a) * 16; y += Math.sin(a) * 16; pts.push([x, y]) } for (const [lw, al] of [[10, .12], [2.2, .8]]) { g.strokeStyle = vein.replace('A', al); g.lineWidth = lw; g.beginPath(); pts.forEach(([px, py], i) => i ? g.lineTo(px, py) : g.moveTo(px, py)); g.stroke() } } });
    const oakM = M('#FFFFFF', { map: oakTex, roughness: .5 }), blueM = M('#7F9CB8', { roughness: .45 }), blueMarble = M('#FFFFFF', { map: mTex('#9DB6CC', 'rgba(244,248,252,A)', 'rgba(200,218,232,.4)'), roughness: .22 }), beigeMarble = M('#FFFFFF', { map: mTex('#E6D3C2', 'rgba(255,250,244,A)', 'rgba(245,232,220,.4)'), roughness: .25 }), coveM = new T.MeshBasicMaterial({ color: '#FFE3A6' });
    for (const m of [oakM, blueMarble, beigeMarble]) { m.emissive = new T.Color('#FFFFFF'); m.emissiveMap = m.map; m.emissiveIntensity = .28 } blueM.emissive = new T.Color('#7F9CB8'); blueM.emissiveIntensity = .3; // 側牆受光較少，補一點亮度讓顏色看得出來
    const WH = 6.25, W0 = new T.Group(); room0.add(W0);
    const P = (axis, u, w, n, m, y = WH / 2 + .1, h = WH) => { const o = new T.Mesh(new T.BoxGeometry(axis === 'z' ? w : .08, h, axis === 'z' ? .08 : w), m); o.position.set(axis === 'z' ? X0 + u : X0 + n, y, axis === 'z' ? n : u); W0.add(o); return o };
    const gS = (axis, u, n) => P(axis, u, .09, n + (axis === 'z' ? .06 : (n < 0 ? .06 : -.06)), gold);
    const bandL = (axis, a0, a1, n, y, h, m) => P(axis, (a0 + a1) / 2, a1 - a0, n + (axis === 'z' ? .07 : (n < 0 ? .07 : -.07)), m, y, h);
    const oakRun = (axis, a0, a1, n) => { const k = Math.max(1, Math.round((a1 - a0) / 1.6)); for (let i = 0; i < k; i++) { P(axis, a0 + (i + .5) * (a1 - a0) / k, (a1 - a0) / k, n, oakM); if (i) gS(axis, a0 + i * (a1 - a0) / k, n) } };
    function featureWall(axis, a0, a1, n) { // [橡木][米大理石][霧藍][藍大理石×3][霧藍][米大理石][橡木]
      const L = a1 - a0, oak = L * .14, bm = L * .08, bl = L * .08, mid = L - 2 * (oak + bm + bl); let u = a0;
      const seg = (w, f) => { f(u, u + w); u += w; gS(axis, u, n) };
      gS(axis, a0, n); seg(oak, (p, q) => oakRun(axis, p, q, n)); seg(bm, (p, q) => P(axis, (p + q) / 2, q - p, n, beigeMarble)); seg(bl, (p, q) => P(axis, (p + q) / 2, q - p, n, blueM));
      for (let i = 0; i < 3; i++) seg(mid / 3, (p, q) => P(axis, (p + q) / 2, q - p - .03, n, blueMarble));
      seg(bl, (p, q) => P(axis, (p + q) / 2, q - p, n, blueM)); seg(bm, (p, q) => P(axis, (p + q) / 2, q - p, n, beigeMarble)); seg(oak, (p, q) => oakRun(axis, p, q, n));
      bandL(axis, a0, a1, n, .16, .3, gold); bandL(axis, a0, a1, n, WH + .12, .14, gold); bandL(axis, a0, a1, n, WH - .05, .1, coveM) }
    // 左牆：完整參考圖設計
    featureWall('x', -10.85, 10.85, -13.28);
    // 後牆：保留五扇海景窗，窗外側兩端與窗頂以上改橡木＋金線
    oakRun('z', -13.3, -11.5, -10.8); oakRun('z', 11.6, 13.3, -10.8); P('z', 0, 26.6, -10.8, oakM, 6.2, .5);
    bandL('z', -13.3, 13.3, -10.8, .16, .3, gold); bandL('z', -13.3, 13.3, -10.8, WH + .12, .14, gold);
    // 右牆（出口所在）：出口兩側橡木＋米色大理石
    oakRun('x', -10.85, -2.0, 13.28); P('x', -1.0, 2.0, 13.28, beigeMarble); gS('x', -2.0, 13.28); gS('x', 0, 13.28); oakRun('x', 0, 5.0, 13.28); oakRun('x', 9.0, 10.85, 13.28);
    for (const [a0, a1] of [[-10.85, 5.0], [9.0, 10.85]]) { bandL('x', a0, a1, 13.28, .16, .3, gold); bandL('x', a0, a1, 13.28, WH + .12, .14, gold) }
  }
  // 地板：淡暖白大理石大方磚（同 2F 辦公室），去掉細格線
  const room = ctx.room || root.parent;
  const floorTex = tex(1024, 1024, (g, S) => { const Wr = fn => { for (const ox of [-S, 0, S]) for (const oy of [-S, 0, S]) { g.save(); g.translate(ox, oy); fn(); g.restore() } };
    g.fillStyle = '#E8CFB3'; g.fillRect(0, 0, S, S);
    /* 地板雲霧（灰灰髒髒）已拿掉：使用者 21:06 */
    g.lineCap = 'round'; for (let k = 0; k < 3; k++) { let x = rr() * S, y = rr() * S, a = -.45 + rr() * .3, da = 0; const pts = [[x, y]]; for (let j = 0; j < 110; j++) { da += (rr() - .5) * .05; da *= .9; a += da; x += Math.cos(a) * 15; y += Math.sin(a) * 15; pts.push([x, y]) }
      Wr(() => { for (const [lw, al] of [[14, .1], [2.6, .7], [1, .9]]) { g.strokeStyle = `rgba(255,248,238,${al})`; g.lineWidth = lw; g.beginPath(); pts.forEach(([px, py], i) => i ? g.lineTo(px, py) : g.moveTo(px, py)); g.stroke() } }) }
     });
  floorTex.wrapS = floorTex.wrapT = T.RepeatWrapping;
  if (room) room.traverse(o => { if (!o.isMesh || !o.material || !o.material.color) return; const k = o.material.color.getHexString(); if (k === 'e1d8ca') { o.visible = false; return } if (k !== 'eaddcb') return; const p = o.geometry.parameters || {}; if ((p.width || 0) < 20) return; const t = floorTex.clone(); t.needsUpdate = true; t.repeat.set(p.width / 16, p.depth / 16); o.material = new T.MeshStandardMaterial({ color: '#FFFFFF', map: t, roughness: .22 }) });
  return G;
}
