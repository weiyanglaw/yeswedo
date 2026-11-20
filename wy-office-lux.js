import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
// v503 2F 辦公室家具頂級版（依使用者參考圖）：白色大理石桌面、深藍櫃體＋金邊、白色高背皮椅＋金色星形椅腳、
// 金色盆栽、深藍金色書櫃、電競雙曲面螢幕＋發光主機（穩定不閃）。
// 位置、名牌、點擊區（officeZone）照舊；所有人改成背對鏡頭、面向後方牆工作（椅子在 +Z、螢幕面向 +Z）。
// 會議室、屏風、牆面、地板只換材質顏色（深藍、金、大理石），位置與走道不變。
export function applyOfficeLux(ctx) {
  const { THREE: T, root, register } = ctx;
  // ---------- 1) 隱藏舊家具（工作區），保留名牌、人物、印表機與乖乖、牆面與地板 ----------
  const keep = o => o.isSprite || (o.userData && (o.userData.chibi || o.userData.wyMeetingPlaque));
  const inPrinter = (x, z) => x > 2.4 && x < 5.0 && z > 7.0 && z < 9.3;
  root.updateMatrixWorld(true);
  const bb = new T.Box3(), cen = new T.Vector3(), sz = new T.Vector3();
  const hideList = [];
  for (const ch of root.children) {
    if (keep(ch)) continue;
    let skip = false; ch.traverse(o => { if (o.userData && o.userData.chibi) skip = true }); if (skip) continue;
    bb.setFromObject(ch); if (!isFinite(bb.min.x)) continue; bb.getCenter(cen); bb.getSize(sz);
    if (sz.x > 12 || sz.z > 12) continue;                       // 地板、大牆
    if (cen.z < -9.6 && cen.x < -2.9 && cen.x > -13.0 && cen.y > .3 && cen.y < 6.9 && sz.x < 4.0) { hideList.push(ch); continue } // 主管區後牆舊掛畫、獎狀、舊嵌板與柱子（改成新書櫃與牆板） // 主管區後牆舊掛畫、獎狀（改成新牆板）
    if (cen.x < -12.95 || cen.z < -10.15) continue;            // 貼左牆、後牆的裝飾
    if (cen.x > 7.0 || cen.z > 13.2 || cen.y > 6.2) continue;  // 工作區以外
    if (inPrinter(cen.x, cen.z)) continue;
    hideList.push(ch);
  }
  for (const o of hideList) o.visible = false;
  // 地板細格線（看起來像髒線）
  root.traverse(o => { if (o.isMesh && o.material && o.material.color && o.material.color.getHexString() === 'e1d8ca') o.visible = false });

  // ---------- 2) 材質 ----------
  const tex = (w, h, f) => { const c = document.createElement('canvas'); c.width = w; c.height = h; f(c.getContext('2d'), w, h); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 8; return t };
  let sd = 2503; const rr = () => ((sd = Math.imul(sd ^ sd >>> 15, 1 | sd) + 0x6D2B79F5 | 0, ((sd ^ sd >>> 14) >>> 0) / 4294967296));
  const marbleTex = tex(512, 512, (g, S) => { g.fillStyle = '#FFFFFF'; g.fillRect(0, 0, S, S); for (let i = 0; i < 18; i++) { const x = rr() * S, y = rr() * S, r = 60 + rr() * 140, gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(228,224,218,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2) }
    g.strokeStyle = 'rgba(176,170,164,.45)'; g.lineCap = 'round'; for (let k = 0; k < 4; k++) { let x = rr() * S, y = rr() * S, a = rr() * 6.28; g.lineWidth = 1 + rr() * 1.5; g.beginPath(); g.moveTo(x, y); for (let j = 0; j < 40; j++) { a += (rr() - .5) * .3; x += Math.cos(a) * 10; y += Math.sin(a) * 10; g.lineTo(x, y) } g.stroke() } });
  const M = (c, o = {}) => new T.MeshStandardMaterial({ color: c, roughness: .45, ...o });
  const marble = M('#FFFDF8', { map: marbleTex, roughness: .22 });
  const navy2 = M('#9ED9CF', { roughness: .4, side: T.DoubleSide }); // 屏風：淺湖水綠（使用者：不要暗色、不要白色）
  const navy = M('#1D2C52', { roughness: .38, metalness: .1 }), navyD = M('#16213F', { roughness: .4 });
  const gold = M('#E4B95A', { metalness: .75, roughness: .25, emissive: '#4a3208', emissiveIntensity: .25 });
  const leather = M('#F4EDE2', { roughness: .5 }), leatherD = M('#E3D7C5', { roughness: .55 });
  const black = M('#1C1E26', { roughness: .45 }), dark = M('#2A2D38', { roughness: .4 });
  const leaf = M('#3F9A4A', { roughness: .6 }), leaf2 = M('#5DB45A', { roughness: .6 }), bloom = M('#FBF8EE', { roughness: .6 });
  const scrTex = tex(256, 160, (g, W, H) => { const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#1B3D6E'); gr.addColorStop(1, '#2C6AA8'); g.fillStyle = gr; g.fillRect(0, 0, W, H); g.fillStyle = 'rgba(255,255,255,.85)'; g.fillRect(16, 18, 120, 10); g.fillStyle = 'rgba(190,220,255,.6)'; for (let i = 0; i < 5; i++) g.fillRect(16, 42 + i * 18, 80 + (i % 3) * 40, 7); g.fillStyle = '#F2C66B'; g.fillRect(170, 40, 66, 66) });
  const gameTex = tex(512, 256, (g, W, H) => { g.fillStyle = '#120A2E'; g.fillRect(0, 0, W, H); for (const [c, y, a] of [['#7C4DFF', 140, .9], ['#3FA9FF', 110, .8], ['#FF6EC7', 170, .7], ['#FFFFFF', 128, .9]]) { g.strokeStyle = c; g.globalAlpha = a; g.lineWidth = c === '#FFFFFF' ? 3 : 10; g.beginPath(); g.moveTo(0, y + 40); g.bezierCurveTo(W * .3, y - 60, W * .6, y + 60, W, y - 40); g.stroke() } g.globalAlpha = 1 });
  const screenM = new T.MeshBasicMaterial({ map: scrTex }), gameM = new T.MeshBasicMaterial({ map: gameTex });
  const rgbM = new T.MeshBasicMaterial({ color: '#B36BFF' }), rgbM2 = new T.MeshBasicMaterial({ color: '#E0B3FF' });

  const G = new T.Group(); G.name = 'wyOfficeLux'; root.add(G);
  let TARGET = G;
  const add = (geo, m, x, y, z, p = TARGET) => { const o = new T.Mesh(geo, m); o.position.set(x, y, z); p.add(o); return o };
  // 動森風：家具方塊圓角（可愛又高級）；薄金線、牆板維持直角
  const RB = (w, h, d) => { const mn = Math.min(w, h, d); return mn < .07 ? new T.BoxGeometry(w, h, d) : new RoundedBoxGeometry(w, h, d, 3, Math.min(.14, mn * .35)) };
  const box = (x, y, z, w, h, d, m, p) => add(RB(w, h, d), m, x, y, z, p);
  const cyl = (x, y, z, a, b, h, m, s = 24, p) => add(new T.CylinderGeometry(a, b, h, s), m, x, y, z, p);
  const sph = (x, y, z, r, m, p) => add(new T.SphereGeometry(r, 14, 10), m, x, y, z, p);
  const reg = (o, zone) => { if (zone != null && register) register(o, zone); return o };

  // ---------- 3) 家具 ----------
  // 白色高背皮椅（面向 -Z，椅背在 +Z 側，鏡頭看到椅背）；exec = 主管款更高
  // 豪華動森風共用：暖光燈帶、地面光暈、圓形絨毯
  const ledM = new T.MeshBasicMaterial({ color: '#FFD98A' });
  const haloTex = tex(256, 256, (g, S) => { const gr = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2); gr.addColorStop(0, 'rgba(255,214,140,.75)'); gr.addColorStop(1, 'rgba(255,214,140,0)'); g.fillStyle = gr; g.fillRect(0, 0, S, S) });
  const haloM = new T.MeshBasicMaterial({ map: haloTex, transparent: true, depthWrite: false, blending: T.AdditiveBlending, opacity: .55 });
  function halo(x, z, w, d) { const o = add(new T.PlaneGeometry(w, d), haloM, x, .09, z); o.rotation.x = -Math.PI / 2; return o }
  function plush(x, z, r, col, sx = 1) { const g0 = TARGET; const pg = new T.Group(); pg.position.set(x, 0, z); pg.scale.x = sx; g0.add(pg); TARGET = pg; x = 0; z = 0; cyl(x, .04, z, r + .12, r + .12, .05, gold, 48); cyl(x, .07, z, r, r, .06, M(col, { roughness: .95 }), 48); cyl(x, .106, z, r * .72, r * .72, .02, M('#FFF6E4', { roughness: .95 }), 48); cyl(x, .118, z, r * .68, r * .68, .02, M(col, { roughness: .95 }), 48); /* v507：圓毯內圈上緣錯開桌腳金底座 0.11，避免閃 */ TARGET = g0 }
  // 絨面高背椅（主題色），金色五爪椅腳；面向 -Z（建好後整組旋轉成面向鏡頭）
  function chair(x, z, exec = false, p = TARGET, col = '#F4EDE2') {
    const g = new T.Group(); g.position.set(x, 0, z); g.scale.setScalar(exec ? 1.3 : 1.2); p.add(g);
    const vel = M(col, { roughness: .7 }), velD = M(col, { roughness: .8, emissive: col, emissiveIntensity: .05 });
    for (let k = 0; k < 5; k++) { const a = k * Math.PI * 2 / 5; const arm = box(Math.sin(a) * .34, .12, Math.cos(a) * .34, .11, .08, .72, gold, g); arm.rotation.y = a; sph(Math.sin(a) * .7, .08, Math.cos(a) * .7, .08, gold, g) }
    cyl(0, .38, 0, .08, .08, .5, gold, 12, g);
    box(0, .72, 0, 1.08, .3, 1.0, vel, g);
    const bh = exec ? 2.1 : 1.5, bw = exec ? 1.2 : 1.02;
    box(0, .85 + bh / 2, .46, bw, bh, .3, vel, g); box(0, .85 + bh / 2, .62, bw + .08, bh + .08, .06, gold, g);
    for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) sph(-.3 + j * .3, 1.2 + i * (bh - .5) / 2, .3, .045, gold, g);
    if (exec) { const cr = box(0, .85 + bh + .1, .46, bw * .7, .18, .3, gold, g); sph(0, .85 + bh + .28, .46, .1, gold, g) }
    for (const s2 of [-1, 1]) { box(s2 * .6, 1.05, .05, .16, .2, .85, velD, g); box(s2 * .6, .9, -.3, .08, .3, .08, gold, g) }
    return g;
  }
  // 豪華辦公桌：主題色亮面桌面＋粗金邊＋寶石色桌身＋大金徽＋桌下暖光燈帶；人坐在 +Z 側（建好後整組旋轉）
  function desk(x, z, w, d, zone, exec = false, th = { top: '#FFFDF8', body: '#1D2C52', seat: '#F4EDE2', rug: '#EFE6D6' }) {
    const topM = M(th.top, { roughness: .16, metalness: .05 }), bodyM = M(th.body, { roughness: .3, metalness: .08 });
    if (th.rug) plush(x, z + .55, Math.max(w, d + 1.6) * .6, th.rug);
    halo(x, z, w + 2.2, d + 2.2);
    const top = reg(box(x, 1.14, z, w, .16, d, topM), zone);
    box(x, 1.04, z, w + .12, .1, d + .12, gold); box(x, .97, z, w - .1, .04, d - .1, ledM);
    // 面向鏡頭那一面（旋轉後）：整片寶石色面板＋金框＋大金徽
    box(x, .52, z - d / 2 + .12, w - .1, .94, .2, bodyM);
    box(x, .52, z - d / 2 + .01, w - .3, .78, .04, gold); box(x, .52, z - d / 2 - .01, w - .45, .66, .04, bodyM);
    const md = add(new T.CylinderGeometry(.3, .3, .06, 32), gold, x, .55, z - d / 2 - .04); md.rotation.x = Math.PI / 2;
    const md2 = add(new T.TorusGeometry(.36, .04, 8, 32), gold, x, .55, z - d / 2 - .04);
    // 兩側寶石色櫃身（圓角大塊）、金色腳座
    for (const s2 of [-1, 1]) { box(x + s2 * (w / 2 - .45), .52, z, .85, .94, d - .15, bodyM); box(x + s2 * (w / 2 - .45), .06, z, .95, .1, d - .05, gold); box(x + s2 * (w / 2 - .45), .55, z + d / 2 - .04, .5, .07, .05, gold) }
    // 螢幕（坐的人看得到）
    const mx = x + (exec ? .6 : .35);
    reg(box(mx, 1.88, z - .25, 1.3, .82, .1, M('#1C1E26')), zone);
    const sc = add(new T.PlaneGeometry(1.18, .7), screenM, mx, 1.88, z - .195); reg(sc, zone);
    box(mx, 1.38, z - .3, .1, .32, .1, gold); box(mx, 1.24, z - .3, .5, .04, .3, gold);
    box(mx, 1.245, z + .25, .9, .04, .32, M('#2B2F3A'));
    // 金色檯燈（暖光燈罩，穩定不閃）
    const lx = x + w / 2 - .4; cyl(lx, 1.25, z - .35, .18, .2, .06, gold, 20); cyl(lx, 1.6, z - .35, .035, .035, .7, gold, 10); cyl(lx, 2.0, z - .35, .28, .18, .3, new T.MeshBasicMaterial({ color: '#FFE7B0' }), 24);
    // 桌上一盆繽紛小花
    cyl(x - w / 2 + .5, 1.32, z - .45, .16, .12, .26, gold, 16); for (let q = 0; q < 7; q++) sph(x - w / 2 + .5 + Math.cos(q * .9) * .12, 1.52 + (q % 2) * .07, z - .45 + Math.sin(q * .9) * .12, .09, FLW[q % FLW.length]);
    if (exec) { box(x - .9, 1.24, z - .45, 1.0, .06, .34, gold) }
    // L 型側桌（在座位旁，朝牆延伸）；老闆桌更長
    const L = exec ? 2.6 : 2.3, rx = x - w / 2 + .55, rz = z + d / 2 + L / 2 - .08; // L 型側桌放在鏡頭看得到的那一側
    reg(box(rx, 1.14, rz, 1.1, .16, L, topM), zone); box(rx, 1.04, rz, 1.22, .1, L + .06, gold); box(rx, .97, rz, 1.0, .04, L - .1, ledM);
    box(rx, .52, rz, 1.0, .94, L - .1, bodyM); box(rx, .06, rz, 1.1, .1, L, gold);
    for (const yy of [.3, .62]) box(rx - .52, yy, rz, .04, .06, L * .6, gold);
    const md3 = add(new T.CylinderGeometry(.22, .22, .05, 28), gold, rx - .53, .55, rz); md3.rotation.z = Math.PI / 2;
    if (exec) { cyl(rx, 1.36, rz + .5, .2, .16, .3, M('#FFFFFF', { roughness: .3 }), 16); for (let q = 0; q < 7; q++) sph(rx + Math.cos(q * .9) * .13, 1.58 + (q % 2) * .06, rz + .5 + Math.sin(q * .9) * .13, .1, FLW[(q + 2) % FLW.length]); box(rx, 1.26, rz - .5, .5, .08, .36, M('#F6EFE2')) }
    chair(mx, z + d / 2 + (exec ? 1.05 : .95), exec, TARGET, th.seat);
  }

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
  function plant(x, z, s = 1) { return cutePlant(x, 0, z, s, TARGET) }
  // 深藍金色書櫃（貼後牆，暖光層板）
  function bookcase(x, z, w) { // 立體大書櫃：下半部門片矮櫃＋上半部開放書架＋兩側深藍立柱＋金色皇冠飾頂（貼牆，深度 1）
    const D = 1.0, H = 5.6, back = z - D / 2;
    box(x, H / 2, back + .06, w, H, .12, navy);
    for (const s2 of [-1, 1]) { box(x + s2 * (w / 2 - .15), H / 2, z + .05, .42, H, D + .1, navy); box(x + s2 * (w / 2 - .15), H - .2, z + .1, .5, .3, D + .2, gold); box(x + s2 * (w / 2 - .15), .15, z + .1, .5, .3, D + .2, gold) }
    // 下半部矮櫃（門片＋金把手）＋大理石檯面
    box(x, .8, z, w - .5, 1.6, D, navy); box(x, 1.66, z + .04, w - .3, .12, D + .14, marble); box(x, 1.6, z + .04, w - .3, .05, D + .16, gold);
    const nd = Math.max(3, Math.round((w - .5) / 1.3)); for (let k = 0; k < nd; k++) { const dx = x - (w - .5) / 2 + (k + .5) * (w - .5) / nd; box(dx, .8, z + D / 2 + .02, (w - .5) / nd - .14, 1.3, .05, M('#24376A', { roughness: .35 })); box(dx, .8, z + D / 2 + .05, (w - .5) / nd - .34, 1.1, .02, gold); sph(dx + ((k % 2) ? -.2 : .2), .85, z + D / 2 + .1, .06, gold) }
    // 上半部開放書架：暖光背板、三層彩色書＋金色擺飾
    const warm = new T.MeshBasicMaterial({ color: '#FFE2A8' }); const BK = ['#F3E7CF', '#D9C3A0', '#2E4A78', '#8C2F3A', '#F6EFE2', '#3E6B55'].map(c => M(c, { roughness: .6 }));
    box(x, 3.5, back + .13, w - .7, 3.3, .02, warm);
    for (let i = 0; i < 3; i++) { const y = 1.75 + i * 1.15; box(x, y + 1.1, z - .05, w - .6, .08, D - .1, gold);
      const NB = Math.round(w * 2.6); for (let k = 0; k < NB; k++) { const bx = x - w / 2 + .5 + k * (w - 1.0) / NB; if ((k + i * 3) % 7 === 3) { cyl(bx, y + .3, z, .14, .18, .55, gold, 14); sph(bx, y + .68, z, .14, gold) } else box(bx, y + .42, z - .05, .24, .7 + (k % 3) * .12, .55, BK[(k + i * 2) % BK.length]) } }
    // 金色皇冠飾頂＋中央徽章
    box(x, H + .12, z + .05, w + .3, .24, D + .3, gold); box(x, H + .32, z + .05, w - .4, .16, D + .1, navy);
    const cr = add(new T.CylinderGeometry(.55, .55, .14, 40), gold, x, H + .85, z + .2); cr.rotation.x = Math.PI / 2; { const lt = new T.TextureLoader().load('office-logo-transparent.png'); lt.colorSpace = T.SRGBColorSpace; add(new T.CircleGeometry(.5, 40), new T.MeshBasicMaterial({ color: '#FFF8EC' }), x, H + .85, z + .28); add(new T.CircleGeometry(.47, 40), new T.MeshBasicMaterial({ map: lt, transparent: true }), x, H + .85, z + .29) } // 書櫃頂端圓徽放事務所 Logo const cr2 = add(new T.TorusGeometry(.62, .06, 8, 40), gold, x, H + .85, z + .2);
    for (let k = 0; k < 7; k++) { const a = Math.PI * (k / 6); sph(x + Math.cos(a) * .85, H + .5 + Math.sin(a) * .35, z + .2, .1, gold) }
  }
  // 主管區地毯（米白＋深藍邊＋金線）
  function rug(x, z, w, d) {
    box(x, .03, z, w, .03, d, M('#1F2F57', { roughness: .9 })); box(x, .05, z, w - .5, .03, d - .5, M('#EFE6D6', { roughness: .9 }));
    for (const [ww, dd] of [[w - .3, d - .3], [w - 1.0, d - 1.0]]) { box(x, .07, z - dd / 2, ww, .01, .06, gold); box(x, .07, z + dd / 2, ww, .01, .06, gold); box(x - ww / 2, .07, z, .06, .01, dd, gold); box(x + ww / 2, .07, z, .06, .01, dd, gold) }
  }
  // 電競工作站：深藍大理石長桌＋金邊、每人雙曲面螢幕、兩端發光主機＋喇叭、中間耳機架、黑金電競椅
  function gameStation(x, z, w, seats) {
    const nm = M('#EBD6A8', { roughness: .2, metalness: .1 }); // 電競桌：淡薰衣草紫亮面桌面（跟奶油色地板、牆面分得開，呼應主機紫光）
    const gb = M('#34497F', { roughness: .32, metalness: .1 }); // 桌身：明亮的寶石藍，不用暗深藍
    plush(x, z + .6, 2.9, '#E4D6BC', 1.75); halo(x, z, w + 2.4, 4.2);
    const top = reg(box(x, 1.14, z, w, .16, 2.0, nm), 7); box(x, 1.04, z, w + .12, .1, 2.12, gold); box(x, .97, z, w - .1, .04, 1.9, new T.MeshBasicMaterial({ color: '#FFD98A' }));
    box(x, .55, z - .9, w - .1, 1.0, .16, gb); box(x, .9, z - .99, w - .4, .04, .03, gold); box(x, .2, z - .99, w - .4, .04, .03, gold);
    for (const s of [-1, 1]) { box(x + s * (w / 2 - .5), .55, z, .9, 1.0, 1.9, gb); box(x + s * (w / 2 - .5), .55, z + .96, .7, .8, .02, gold) }
    for (const [sx, zone] of seats) {
      for (const s of [-1, 1]) { const g = new T.Group(); g.position.set(sx + s * .78, 1.95, z - .35); g.rotation.y = s * .18; TARGET.add(g);
        const b = reg(box(0, 0, 0, 1.55, .92, .07, black, g), zone); const scr = add(new T.PlaneGeometry(1.45, .82), gameM, 0, 0, .04, g); reg(scr, zone); }
      /* 螢幕底座、鍵盤、滑鼠墊：桌面上緣 y=1.22，全部放在桌面「上面」，不跟桌面同高（避免閃） */
      box(sx, 1.42, z - .4, .12, .4, .12, gold); box(sx, 1.255, z - .4, .7, .05, .35, gold);
      box(sx, 1.25, z + .3, 1.1, .045, .35, M('#2B2F3A')); box(sx + .8, 1.235, z + .3, .5, .02, .4, M('#3A2F55'));
      // v507 高級賽車款電競椅（面向 -Z）：五爪金腳＋黑輪、包覆坐墊、高椅背兩側翼、頭枕、腰枕、扶手；黑色皮革＋紫色飾條＋金邊
      const g = new T.Group(); g.position.set(sx, 0, z + 1.75); TARGET.add(g);
      const lea = M('#24242E', { roughness: .38 }), pur = M('#8A5CF0', { roughness: .35 }), purL = M('#B48CFF', { roughness: .4 }), wheel = M('#15151B', { roughness: .5 });
      const P = (geo, m, x, y, zz, rx = 0) => { const o = new T.Mesh(geo, m); o.position.set(x, y, zz); o.rotation.x = rx; g.add(o); return o };
      for (let k = 0; k < 5; k++) { const a = k * Math.PI * 2 / 5; const arm = box(Math.sin(a) * .3, .16, Math.cos(a) * .3, .1, .07, .62, gold, g); arm.rotation.y = a; P(new T.SphereGeometry(.07, 12, 10), wheel, Math.sin(a) * .58, .07, Math.cos(a) * .58) }
      P(new T.CylinderGeometry(.09, .09, .14, 16), gold, 0, .22, 0); P(new T.CylinderGeometry(.055, .055, .36, 14), M('#D8DCE2', { metalness: .7, roughness: .25 }), 0, .45, 0);
      // 坐墊：中間黑皮＋兩側紫色隆起包覆
      P(new RoundedBoxGeometry(1.0, .2, .95, 3, .07), gold, 0, .66, 0);
      P(new RoundedBoxGeometry(.62, .2, .88, 3, .08), lea, 0, .82, 0);
      for (const e of [-1, 1]) P(new RoundedBoxGeometry(.2, .28, .9, 3, .09), pur, e * .4, .86, 0);
      // 椅背：高、上寬下窄（兩片側翼）＋中間黑皮＋紫色細條＋金邊
      const bz = .42;
      P(new RoundedBoxGeometry(.96, 1.9, .2, 3, .09), gold, 0, 1.92, bz + .03);
      P(new RoundedBoxGeometry(.6, 1.78, .22, 3, .1), lea, 0, 1.9, bz - .02);
      for (const e of [-1, 1]) { const w = P(new RoundedBoxGeometry(.22, 1.5, .3, 3, .1), pur, e * .38, 1.82, bz - .06); w.rotation.y = -e * .25; w.rotation.z = e * .05 }
      for (const e of [-1, 1]) P(new T.BoxGeometry(.04, 1.5, .02), purL, e * .17, 1.85, bz - .14);
      // 頭枕＋腰枕（圓胖靠枕）
      P(new RoundedBoxGeometry(.5, .26, .16, 3, .08), purL, 0, 2.62, bz - .16);
      P(new RoundedBoxGeometry(.5, .24, .16, 3, .08), purL, 0, 1.28, bz - .16);
      // 扶手：金柱＋黑色軟墊
      for (const e of [-1, 1]) { P(new T.BoxGeometry(.08, .42, .08), gold, e * .56, 1.02, .05); P(new RoundedBoxGeometry(.16, .08, .5, 2, .03), lea, e * .56, 1.25, .05) }
    }
    // 兩端發光主機＋喇叭
    for (const s of [-1, 1]) { const px = x + s * (w / 2 - .45);
      box(px, 1.75, z - .3, .7, 1.2, .8, black); for (const yy of [1.45, 1.95]) { const r = add(new T.TorusGeometry(.2, .035, 8, 32), rgbM, px, yy, z + .11); add(new T.CircleGeometry(.1, 20), rgbM2, px, yy, z + .115) }
      box(px, 2.37, z - .3, .72, .04, .82, M('#6A3FB8')); }
    // 中間耳機架
    const hx = x + (seats.length > 1 ? (seats[0][0] + seats[1][0]) / 2 - x : 0);
    box(hx, 1.25, z - .1, .3, .05, .3, gold); box(hx, 1.55, z - .1, .05, .7, .05, gold); add(new T.TorusGeometry(.2, .05, 8, 24, Math.PI), black, hx, 1.75, z - .1);
  }

  // 深藍牆板＋金框米白嵌板＋金色壁燈（貼牆，穩定暖光）
  const ivory = M('#FBF4E6', { roughness: .4 }), lampM = new T.MeshBasicMaterial({ color: '#FFE9B8' });
  function wallBay(cx, cz, w, h, axis) { // axis 'z' = 後牆（面向 +Z），'x' = 左牆（面向 +X）
    const P = (u, y, n, ww, hh, dd, m) => axis === 'z' ? box(cx + u, y, cz + n, ww, hh, dd, m) : box(cz + n, y, cx + u, dd, hh, ww, m);
    P(0, h / 2, 0, w, h, .12, navy);
    P(0, h * .52, .08, w * .62, h * .66, .05, ivory);
    for (const [uu, ww] of [[0, w * .62 + .1]]) { P(uu, h * .52 + h * .33, .1, ww, .06, .05, gold); P(uu, h * .52 - h * .33, .1, ww, .06, .05, gold) }
    for (const s2 of [-1, 1]) P(s2 * (w * .31 + .02), h * .52, .1, .06, h * .66 + .06, .05, gold);
    P(0, .25, .08, w, .5, .06, gold);
  }
  function sconce(cx, cz, y, axis) { const n = .2; const P = (u, yy, nn, ww, hh, dd, m) => axis === 'z' ? box(cx + u, yy, cz + nn, ww, hh, dd, m) : box(cz + nn, yy, cx + u, dd, hh, ww, m);
    P(0, y, .06, .22, .7, .08, gold); P(0, y + .05, n, .16, .5, .16, lampM); P(0, y + .35, n, .24, .06, .24, gold); P(0, y - .25, n, .24, .06, .24, gold) }
  for (const z of [-8.6, -2.0, 5.0, 12.0]) sconce(z, -12.98, 4.4, 'x');
  // 使用者確認：大家面對鏡頭工作、背對後方 Logo 牆 → 每組工作站以自身中心旋轉 180°
  const facing = (cx, cz, build) => { const P2 = new T.Group(); G.add(P2); TARGET = P2; build(); TARGET = G; P2.rotation.y = Math.PI; P2.position.set(2 * cx, 0, 2 * cz) };
  // 林律師專屬主管桌：弧形正面＋大 Logo 金徽、酒紅皮革桌面嵌金邊、四角金色雕花柱腳、一對金檯燈、金色名牌、皇家翼式大椅
  function execDesk(x, z) {
    const W = 8.6, D = 2.9, navyL = M('#7F9CC4', { roughness: .28, metalness: .05 }), leatherR = M('#F6F0E6', { roughness: .5 }) /* 林律師桌：象牙白漆面＋焦糖皮革嵌面＋金，質感不暗 */, front = z - D / 2;
    halo(x, z, W + 3, D + 3.5);
    // 桌身（深 D）與弧形正面
    box(x, .58, z + .1, W - .6, 1.05, D - .4, navyL);
    const bow = new T.Mesh(new T.CylinderGeometry(W / 2 - .3, W / 2 - .3, 1.05, 48, 1, false, Math.PI / 2, Math.PI), navyL); bow.scale.z = .22; bow.position.set(x, .58, front + .2); TARGET.add(bow);
    const bowG = new T.Mesh(new T.TorusGeometry(W / 2 - .28, .06, 8, 48, Math.PI), gold); bowG.rotation.x = Math.PI / 2; bowG.scale.y = .22; bowG.position.set(x, 1.1, front + .2); bowG.rotation.z = Math.PI; TARGET.add(bowG);
    const bowB = bowG.clone(); bowB.position.y = .1; TARGET.add(bowB);
    for (const k of [-3, -2, -1, 1, 2, 3]) { const a = Math.PI / 2 + Math.PI * (k + 4) / 8; const px = x + Math.cos(Math.PI - (k + 4) / 8 * Math.PI) * (W / 2 - .28), pz = front + .2 - Math.sin((k + 4) / 8 * Math.PI) * (W / 2 - .28) * .22; box(px, .6, pz, .1, .95, .1, gold) }
    // 大 Logo 金徽
    const md = new T.Mesh(new T.CylinderGeometry(.55, .55, .1, 40), gold); md.rotation.x = Math.PI / 2; md.position.set(x, .62, front - .76); TARGET.add(md);
    const lt = new T.TextureLoader().load('office-logo-transparent.png'); lt.colorSpace = T.SRGBColorSpace;
    const lf = new T.Mesh(new T.CircleGeometry(.47, 40), new T.MeshBasicMaterial({ color: '#FFF8EC' })); lf.rotation.y = Math.PI; lf.position.set(x, .62, front - .82); TARGET.add(lf);
    const ll = new T.Mesh(new T.CircleGeometry(.44, 40), new T.MeshBasicMaterial({ map: lt, transparent: true })); ll.rotation.y = Math.PI; ll.position.set(x, .62, front - .83); TARGET.add(ll);
    const mr = new T.Mesh(new T.TorusGeometry(.6, .05, 8, 40), gold); mr.position.set(x, .62, front - .8); TARGET.add(mr);
    // 桌面：金框＋酒紅皮革嵌面（含弧形前緣）
    const topF = reg(box(x, 1.18, z + .1, W - .4, .16, D - .2, navyL), 5);
    const tb = new T.Mesh(new T.CylinderGeometry(W / 2 - .1, W / 2 - .1, .16, 48, 1, false, Math.PI / 2, Math.PI), navyL); tb.scale.z = .24; tb.position.set(x, 1.18, front + .2); TARGET.add(tb); reg(tb, 5);
    box(x, 1.27, z + .1, W - .9, .03, D - .7, leatherR); box(x, 1.265, z + .1, W - .7, .02, D - .5, gold);
    box(x, 1.08, z + .1, W - .2, .06, D, gold);
    // 四角金色雕花柱腳
    for (const [dx, dz] of [[-1, 1], [1, 1]]) { const lx = x + dx * (W / 2 - .45), lz = z + dz * (D / 2 - .2); cyl(lx, .55, lz, .2, .26, 1.1, gold, 16); sph(lx, 1.1, lz, .22, gold); cyl(lx, .06, lz, .32, .32, .12, gold, 16) }
    for (const dx of [-1, 1]) { const lx = x + dx * (W / 2 - .7), lz = front + .05; cyl(lx, .55, lz, .2, .26, 1.1, gold, 16); sph(lx, 1.1, lz, .22, gold); cyl(lx, .06, lz, .32, .32, .12, gold, 16) }
    // 螢幕（面向座位）
    const mx = x - 1.6; reg(box(mx, 1.95, z - .1, 1.5, .9, .1, M('#1C1E26')), 5); const sc = add(new T.PlaneGeometry(1.38, .78), screenM, mx, 1.95, z - .045); reg(sc, 5);
    box(mx, 1.45, z - .15, .1, .32, .1, gold); box(mx, 1.31, z - .15, .55, .04, .32, gold); box(mx, 1.31, z + .45, 1.0, .04, .34, M('#2B2F3A'));
    // 一對金色檯燈（暖光燈罩）
    for (const dx of [-1, 1]) { const lx = x + dx * (W / 2 - 1.0), lz = z - .4; cyl(lx, 1.32, lz, .22, .26, .08, gold, 20); cyl(lx, 1.75, lz, .04, .04, .8, gold, 10); cyl(lx, 2.25, lz, .36, .22, .4, new T.MeshBasicMaterial({ color: '#FFE7B0' }), 24); add(new T.TorusGeometry(.36, .03, 6, 24), gold, lx, 2.05, lz).rotation.x = Math.PI / 2 }
    // 金色名牌（面向鏡頭）
    const nc = document.createElement('canvas'); nc.width = 512; nc.height = 128; const ng = nc.getContext('2d'); ng.fillStyle = '#1F3263'; ng.fillRect(0, 0, 512, 128); ng.strokeStyle = '#F2C86A'; ng.lineWidth = 10; ng.strokeRect(6, 6, 500, 116); ng.fillStyle = '#F7D98C'; ng.font = '900 66px "Noto Sans TC",sans-serif'; ng.textAlign = 'center'; ng.textBaseline = 'middle'; ng.fillText('林柏均 律師', 256, 68);
    const nt = new T.CanvasTexture(nc); nt.colorSpace = T.SRGBColorSpace; box(x + 1.0, 1.36, front + .55, 1.7, .4, .14, gold); const np = new T.Mesh(new T.PlaneGeometry(1.6, .4), new T.MeshBasicMaterial({ map: nt })); np.rotation.y = Math.PI; np.position.set(x + 1.0, 1.4, front + .47); np.rotation.x = 0; TARGET.add(np);
    // 皮革文件盒
    box(x + 2.6, 1.34, z + .2, .9, .12, .65, leatherR); box(x + 2.6, 1.41, z + .2, .92, .03, .67, gold);
    // L 型側桌（同款皮革加金邊）
    const L = 3.6, RW = 1.6, rx = x + W / 2 - RW / 2 - .1, rz = z + D / 2 + L / 2 - .1;
    reg(box(rx, 1.18, rz, RW, .16, L, navyL), 5); box(rx, 1.27, rz, RW - .4, .03, L - .4, leatherR); box(rx, 1.265, rz, RW - .25, .02, L - .25, gold); box(rx, 1.08, rz, RW + .12, .06, L + .06, gold);
    box(rx, .58, rz, RW - .2, 1.05, L - .2, navyL); cyl(rx + RW / 2 - .2, .55, rz + L / 2 - .2, .18, .24, 1.1, gold, 16); sph(rx + RW / 2 - .2, 1.1, rz + L / 2 - .2, .2, gold);
    cyl(rx, 1.42, rz + .9, .2, .16, .3, M('#FFFFFF', { roughness: .3 }), 16); for (let q = 0; q < 7; q++) sph(rx + Math.cos(q * .9) * .13, 1.64 + (q % 2) * .06, rz + .9 + Math.sin(q * .9) * .13, .1, FLW[(q + 2) % FLW.length]);
    // 皇家翼式大椅
    const cg = new T.Group(); cg.position.set(mx + .3, 0, z + D / 2 + 1.2); cg.scale.setScalar(1.35); TARGET.add(cg);
    const velR = M('#8DA8CF', { roughness: .6 });
    for (let k = 0; k < 5; k++) { const a = k * Math.PI * 2 / 5; const arm = box(Math.sin(a) * .36, .12, Math.cos(a) * .36, .12, .08, .74, gold, cg); arm.rotation.y = a; sph(Math.sin(a) * .72, .08, Math.cos(a) * .72, .09, gold, cg) }
    cyl(0, .4, 0, .09, .09, .5, gold, 12, cg); box(0, .75, 0, 1.15, .32, 1.05, velR, cg);
    box(0, 1.95, .5, 1.25, 2.3, .32, velR, cg); box(0, 1.95, .68, 1.38, 2.42, .08, gold, cg);
    for (const s2 of [-1, 1]) { const wg = box(s2 * .66, 1.95, .28, .22, 1.8, .55, velR, cg); wg.rotation.y = s2 * .35; box(s2 * .65, 1.1, .02, .2, .24, .95, velR, cg) }
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) sph(-.35 + j * .35, 1.3 + i * .55, .34, .05, gold, cg);
    box(0, 3.22, .5, .9, .2, .34, gold, cg); for (let k = 0; k < 5; k++) { const sp = new T.Mesh(new T.ConeGeometry(.08, .28, 8), gold); sp.position.set(-.36 + k * .18, 3.44, .5); cg.add(sp); sph(-.36 + k * .18, 3.6, .5, .05, gold, cg) }
  }
  // 牆面（使用者確認的建議）：上半段霧粉杏、下半段霧藍護牆板＋金線框、金色踢腳；Logo 牆維持深藍金；左牆三扇沖繩海景拱窗；牆頂暖光燈帶
  // 牆面（使用者參考圖）：直紋胡桃木牆板＋細金線、鼠尾草綠大理石重點牆（金條分隔）、素面鼠尾草綠過渡板、金色踢腳與牆頂暖光；Logo 牆維持深藍
  const woodTex = tex(256, 512, (g, W2, H2) => { g.fillStyle = '#A8723F'; g.fillRect(0, 0, W2, H2); for (let x = 0; x < W2; x += 2) { g.fillStyle = `rgba(${90 + rr() * 40},${50 + rr() * 25},${20 + rr() * 15},${.12 + rr() * .2})`; g.fillRect(x, 0, 1 + rr() * 2, H2) } for (let k = 0; k < 12; k++) { g.strokeStyle = 'rgba(120,70,30,.25)'; g.lineWidth = 1 + rr() * 2; const x0 = rr() * W2; g.beginPath(); for (let y = 0; y <= H2; y += 16) g.lineTo(x0 + Math.sin(y * .02 + k) * 6, y); g.stroke() } });
  const sageTex = tex(512, 768, (g, W2, H2) => { g.fillStyle = '#93B2A1'; g.fillRect(0, 0, W2, H2); for (let i = 0; i < 20; i++) { const x = rr() * W2, y = rr() * H2, r = 80 + rr() * 160, gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(190,214,200,.35)'); gr.addColorStop(1, 'rgba(190,214,200,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2) }
    g.lineCap = 'round'; for (let k = 0; k < 6; k++) { let x = rr() * W2, y = H2, a = -Math.PI / 2 - .7 + rr() * .3; const pts = [[x, y]]; for (let j = 0; j < 60; j++) { a += (rr() - .5) * .25; x += Math.cos(a) * 16; y += Math.sin(a) * 16; pts.push([x, y]) } for (const [lw, al] of [[10, .12], [2.2, .75]]) { g.strokeStyle = `rgba(245,248,240,${al})`; g.lineWidth = lw; g.beginPath(); pts.forEach(([px, py], i) => i ? g.lineTo(px, py) : g.moveTo(px, py)); g.stroke() } } });
  const woodM = M('#FFFFFF', { map: woodTex, roughness: .5 }), sageM = M('#8FAE9D', { roughness: .5 }), marbleS = M('#FFFFFF', { map: sageTex, roughness: .22 }), coveM = new T.MeshBasicMaterial({ color: '#FFE3A6' });
  const WH = 7.5;
  function panel(axis, u, w, n, m) { const o = axis === 'z' ? box(u, WH / 2 + .1, n, w, WH, .1, m) : box(n, WH / 2 + .1, u, .1, WH, w, m); return o }
  function strip(axis, u, n, h = WH) { return axis === 'z' ? box(u, h / 2 + .1, n + .06, .09, h, .06, gold) : box(n + .06, h / 2 + .1, u, .06, h, .09, gold) }
  function band(axis, a0, a1, n, y, h, m, dn = .07) { const c = (a0 + a1) / 2, L = a1 - a0; return axis === 'z' ? box(c, y, n + dn, L, h, .1, m) : box(n + dn, y, c, .1, h, L, m) }
  function woodRun(axis, a0, a1, n) { const k = Math.max(1, Math.round((a1 - a0) / 2.2)); for (let i = 0; i < k; i++) { const u = a0 + (i + .5) * (a1 - a0) / k; panel(axis, u, (a1 - a0) / k, n, woodM); if (i) strip(axis, a0 + i * (a1 - a0) / k, n) } }
  function feature(axis, a0, a1, n) { // [綠素面][大理石 ×3][綠素面]，金條分隔
    const L = a1 - a0, side = Math.min(1.6, L * .16), mk = 3, mw = (L - side * 2) / mk;
    panel(axis, a0 + side / 2, side, n, sageM); panel(axis, a1 - side / 2, side, n, sageM); strip(axis, a0, n); strip(axis, a1, n); strip(axis, a0 + side, n); strip(axis, a1 - side, n);
    for (let i = 0; i < mk; i++) { const u = a0 + side + (i + .5) * mw; const p2 = panel(axis, u, mw - .04, n, marbleS); if (i) strip(axis, a0 + side + i * mw, n) }
  }
  for (const ch of root.children) { if (ch === G || ch.isSprite || !ch.visible) continue; bb.setFromObject(ch); if (!isFinite(bb.min.x)) continue; bb.getCenter(cen); bb.getSize(sz);
    if (cen.z < -9.0 && cen.x > -3.8 && cen.x < 13.0 && sz.x < 4.2 && sz.z < 1.5 && cen.y > .3 && cen.y < 7.4) ch.visible = false;   // 後牆舊柱子、舊嵌板
    if (cen.x < -12.6 && cen.x > -13.6 && sz.x < .8 && sz.z < 6 && cen.y > .6 && cen.y < 7.2 && cen.z > -10.4 && cen.z < 15.4) ch.visible = false } // 左牆舊框飾
  // 後牆：書櫃後方木牆、書櫃到 Logo 牆之間綠色大理石重點牆
  woodRun('z', -13.1, -3.3, -10.48); feature('z', -3.3, 9.6, -10.48);
  band('z', -13.1, 9.6, -10.48, .14, .28, gold); band('z', -13.1, 9.6, -10.48, WH + .12, .14, gold); band('z', -13.1, 9.6, -10.48, WH - .05, .1, coveM, .1);
  // 左牆：木牆＋金線（拱窗前後），踢腳與牆頂收邊
  woodRun('x', -10.5, 15.55, -13.05); woodRun('x', 19.05, 21.9, -13.05);
  for (const [a0, a1] of [[-10.5, 15.55], [19.05, 21.9]]) { band('x', a0, a1, -13.05, .14, .28, gold); band('x', a0, a1, -13.05, WH + .12, .14, gold); band('x', a0, a1, -13.05, WH - .05, .1, coveM, .1) }
  // 左牆沖繩海景拱窗
  const seaTex = tex(256, 384, (g, W2, H2) => { let gr = g.createLinearGradient(0, 0, 0, H2 * .55); gr.addColorStop(0, '#7EC8F2'); gr.addColorStop(1, '#CDEBFA'); g.fillStyle = gr; g.fillRect(0, 0, W2, H2 * .55); gr = g.createLinearGradient(0, H2 * .55, 0, H2); gr.addColorStop(0, '#25B5C9'); gr.addColorStop(.6, '#5FD6D2'); gr.addColorStop(1, '#F3E3B9'); g.fillStyle = gr; g.fillRect(0, H2 * .55, W2, H2 * .45);
    g.fillStyle = '#FFFFFF'; for (const [x, y, r] of [[60, 70, 22], [85, 62, 28], [115, 72, 20], [190, 110, 16], [210, 104, 20]]) { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill() } g.fillStyle = 'rgba(255,255,255,.6)'; for (let i = 0; i < 8; i++) g.fillRect(20 + i * 28, 230 + (i % 3) * 14, 22, 3) });
  for (const zc of [-5.6, 1.6, 8.6]) {
    const wg = new T.Group(); wg.position.set(-12.96, 0, zc); wg.rotation.y = Math.PI / 2; TARGET.add(wg);
    const ws = new T.Shape(); ws.moveTo(-1.4, 2.8); ws.lineTo(1.4, 2.8); ws.lineTo(1.4, 5.6); ws.absarc(0, 5.6, 1.4, 0, Math.PI, false); ws.closePath();
    const gl = new T.Mesh(new T.ShapeGeometry(ws, 24), new T.MeshBasicMaterial({ map: seaTex })); gl.position.z = .05; wg.add(gl);
    const uv = gl.geometry.attributes.uv; for (let i = 0; i < uv.count; i++) { const px = gl.geometry.attributes.position.getX(i), py = gl.geometry.attributes.position.getY(i); uv.setXY(i, (px + 1.4) / 2.8, (py - 2.8) / 4.2) }
    const fr = []; for (let i = 0; i <= 40; i++) { const a = Math.PI * i / 40; fr.push(new T.Vector3(Math.cos(a) * 1.45, 5.6 + Math.sin(a) * 1.45, .1)) } wg.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(fr), 60, .1, 8, false), gold));
    for (const sx of [-1.45, 1.45]) { const b2 = new T.Mesh(new T.BoxGeometry(.2, 2.85, .2), gold); b2.position.set(sx, 4.2, .1); wg.add(b2) }
    const sill = new T.Mesh(new RoundedBoxGeometry(3.4, .18, .45, 3, .06), gold); sill.position.set(0, 2.75, .2); wg.add(sill);
    const mul = new T.Mesh(new T.BoxGeometry(.08, 4.2, .12), gold); mul.position.set(0, 4.9, .12); wg.add(mul); const mh = new T.Mesh(new T.BoxGeometry(2.8, .08, .12), gold); mh.position.set(0, 4.4, .12); wg.add(mh);
  }
  // ---------- 4) 擺放（座標沿用舊工作區）----------
  rug(-7.9, -5.6, 12.2, 8.6);
  bookcase(-8.4, -10.0, 7.4);
  facing(-7.9, -3.4, () => execDesk(-7.9, -3.4)); // 林律師專屬主管桌（跟員工明顯不同）
  facing(-8.0, 3.3, () => desk(-8.0, 3.3, 5.0, 2.1, 6, false, { top: '#F2D2CC', body: '#B46E78', seat: '#D68C96', rug: '#EED7D0' })); // 夢奇奇：粉色系
  facing(3.4, 3.3, () => desk(3.4, 3.3, 5.0, 2.1, 8, false, { top: '#D6E5D4', body: '#5C8B75', seat: '#7FAE95', rug: '#DCE7D9' })); // 薪水掌門人：翡翠綠系
  facing(-2.2, 10.9, () => gameStation(-2.2, 10.9, 8.6, [[0.2, 7], [-4.6, 3]]));
  for (const [x, z, s] of [[-12.2, -8.6, 1], [-3.3, -9.3, 1.1], [-12.2, 1.0, 1.05], [-12.2, 8.2, 1.1], [6.2, -9.3, 1]]) plant(x, z, s);

  // ---------- 5) 會議室、屏風、牆面、地板：只換顏色材質 ----------
  const MAP = { '648f84': navy, '8b6687': navy, '657f9d': navy, '3e7d86': gold, '956c4f': gold, '54616b': gold, 'c5a46e': gold, 'c9a36b': gold, '76513b': marble, 'e7dac5': leather, '365b7b': navy, 'fff0d2': gold, '344e70': navy, '527d73': navy, 'bc9560': gold, 'b99660': gold, 'd7b377': gold, 'e4d6c3': leather, '345779': navy, '193b59': navy, '243d58': navy, 'a9c8b5': navy2 };
  // 會議室配色（使用者：不要暗、不要跟地板牆面一樣、不要灰白）：大會議室寶石藍椅＋淡天空藍桌面；小會議室玫瑰粉椅＋淡蜜桃桌面
  const mtgChairL = M('#34497F', { roughness: .45 }), mtgTopL = M('#D2E2D3', { roughness: .2 }), mtgChairS = M('#D68C96', { roughness: .45 }), mtgTopS = M('#F0D3CB', { roughness: .2 });
  const remap = () => root.traverse(o => { if (!o.isMesh || !o.visible || G === o.parent || hideList.includes(o)) return; const m = o.material; if (!m || Array.isArray(m) || !m.color || m.transparent) return; const k = m.color.getHexString(); const pg = o.parent; if (pg && pg !== root && pg.isGroup && pg.children.length === 8 && pg.children.every(c => c.geometry && c.geometry.type === 'BoxGeometry') && (k === '344e70' || k === '3e7d86')) { o.material = k === '344e70' ? mtgChairL : mtgChairS; return } if (k === '76513b') { o.material = o.position.z < 3.6 ? mtgTopL : mtgTopS; return } if (MAP[k]) o.material = MAP[k] }); // 會議椅改白皮
  remap(); setTimeout(remap, 0); setTimeout(remap, 2500); // 會議室與屏風有部分在之後才建立
  // 地板：淡暖白大理石大方磚（拋光，接縫極淡）
  // 地板：暖灰褐拋光大理石大板（使用者參考圖）；白紋又長又柔、數量少，不用灰黑鋸齒線
  const floorTex = tex(1024, 1024, (g, S) => { const Wr = fn => { for (const ox of [-S, 0, S]) for (const oy of [-S, 0, S]) { g.save(); g.translate(ox, oy); fn(); g.restore() } };
    g.fillStyle = '#F6E0C2'; g.fillRect(0, 0, S, S); /* 更淺的蜜沙色（使用者 19:24 要再淺）；原淺蜜沙色大理石：比上一版亮，帶一點暖蜜色，不灰不白不奶茶 */
    
    /* 地板雲霧（灰灰髒髒）已拿掉：使用者 21:06 */
    g.lineCap = 'round'; for (let k = 0; k < 3; k++) { let x = rr() * S, y = rr() * S, a = -.45 + rr() * .3, da = 0; const pts = [[x, y]]; for (let j = 0; j < 110; j++) { da += (rr() - .5) * .05; da *= .9; a += da; x += Math.cos(a) * 15; y += Math.sin(a) * 15; pts.push([x, y]) }
      Wr(() => { for (const [lw, al] of [[14, .1], [2.6, .7], [1, .9]]) { g.strokeStyle = `rgba(255,248,236,${al})`; g.lineWidth = lw; g.beginPath(); pts.forEach(([px, py], i) => i ? g.lineTo(px, py) : g.moveTo(px, py)); g.stroke() } }) }
    g.fillStyle = 'rgba(90,70,52,.25)'; for (const q of [0, 512]) { g.fillRect(q, 0, 2, S); g.fillRect(0, q, S, 2) } });
  floorTex.wrapS = floorTex.wrapT = T.RepeatWrapping;
  root.traverse(o => { if (!o.isMesh || !o.material || !o.material.color) return; if (o.material.color.getHexString() !== 'eaddcb') return; const p = o.geometry.parameters || {}; if ((p.width || 0) < 20) return;
    const t = floorTex.clone(); t.needsUpdate = true; t.repeat.set(p.width / 16, p.depth / 16); o.material = new T.MeshStandardMaterial({ color: '#FFFFFF', map: t, roughness: .22 }) });
  // ---------- 7) 屏風：依使用者參考圖改成「金色直條格柵＋香檳玻璃」弧形屏風（位置、弧度不變）----------
  setTimeout(() => {
    const sg = M('#F6D27A', { metalness: .35, roughness: .28, emissive: '#7a5512', emissiveIntensity: .38 });
    let body = null; root.traverse(o => { if (!body && o.isMesh && o.geometry && o.geometry.type === 'BufferGeometry' && o.material === navy2) body = o }); if (!body) return;
    if (body.parent && body.parent !== root) body.parent.traverse(o => { if (o.isMesh) o.visible = false }); body.visible = false; // 舊屏風（本體、波浪飾條）全部隱藏
    const prof = t => { const z = -9.95 + (16.6 + 9.95) * t; const tu = Math.max(0, Math.min(1, (z - 12.6) / 4)); const e = tu * tu * (3 - 2 * tu); return [17.15 + .88 * e, z] };
    const H = 5.4, N = 240, pos = [], idx = [];
    for (let i = 0; i <= N; i++) { const [x, z] = prof(i / N); pos.push(x, .25, z, x, H, z) }
    for (let i = 0; i < N; i++) { const j = i * 2; idx.push(j, j + 2, j + 1, j + 1, j + 2, j + 3) }
    const gg = new T.BufferGeometry(); gg.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); gg.setIndex(idx); gg.computeVertexNormals();
    const glassM = new T.MeshStandardMaterial({ color: '#F6E7C4', transparent: true, opacity: .32, roughness: .08, metalness: .1, side: T.DoubleSide, depthWrite: false });
    const sc = new T.Group(); sc.name = 'wyGoldScreen'; root.add(sc); sc.add(new T.Mesh(gg, glassM));
    const finG = new T.BoxGeometry(.075, H - .3, .16), fins = Math.round((16.6 + 9.95) / .34);
    for (let i = 0; i <= fins; i++) { const t = i / fins, [x, z] = prof(t), [x2, z2] = prof(Math.min(1, t + .01)); const f = new T.Mesh(finG, sg); f.position.set(x, (H + .25) / 2 + .05, z); f.rotation.y = Math.atan2(x2 - x, z2 - z) + Math.PI / 2; sc.add(f) }
    const rail = (y, r) => { const pts = []; for (let i = 0; i <= 90; i++) { const [x, z] = prof(i / 90); pts.push(new T.Vector3(x, y, z)) } const m = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 270, r, 10, false), sg); sc.add(m) };
    rail(H + .05, .14); rail(H - .25, .05); rail(.22, .18); rail(.55, .05);
    for (const t of [0, 1]) { const [x, z] = prof(t); const cap = new T.Mesh(new RoundedBoxGeometry(.4, H + .3, .4, 3, .1), sg); cap.position.set(x, (H + .3) / 2, z); sc.add(cap) }
    root.traverse(o => { if (o.isMesh && o.geometry && o.geometry.type === 'CylinderGeometry' && Math.abs(o.geometry.parameters.height - 4.88) < .01) o.visible = false }); // 舊的四根直飾條
  }, 2600);
  // ---------- 8) 會議室桌椅重做（動森風豪華）：大會議室跑道形大桌＋寶石藍圓鼓沙發椅；小會議室大圓桌＋玫瑰粉圓鼓沙發椅 ----------
  function tubChair(x, z, ry, col, p) {
    const g = new T.Group(); g.position.set(x, 0, z); g.rotation.y = ry; g.scale.setScalar(1.15); p.add(g);
    const vel = M(col, { roughness: .65 }), velL = M(col, { roughness: .7, emissive: col, emissiveIntensity: .06 });
    for (const [lx, lz] of [[-.38, -.32], [.38, -.32], [-.38, .32], [.38, .32]]) { const lg = new T.Mesh(new T.CylinderGeometry(.05, .035, .42, 10), gold); lg.position.set(lx, .21, lz); g.add(lg) }
    const seat = new T.Mesh(new RoundedBoxGeometry(1.05, .38, 1.0, 4, .17), vel); seat.position.set(0, .6, 0); g.add(seat);
    const cush = new T.Mesh(new RoundedBoxGeometry(.9, .16, .8, 3, .08), velL); cush.position.set(0, .85, -.06); g.add(cush);
    /* v507：椅背原本是單面半圓殼，從內側看會變透明（像鏤空）；改成雙面＋內層軟墊，前後看都是完整椅背 */
    const velD = M(col, { roughness: .65, side: T.DoubleSide }), padM = M(col, { roughness: .75, emissive: col, emissiveIntensity: .08, side: T.DoubleSide });
    const back = new T.Mesh(new T.CylinderGeometry(.58, .58, .85, 32, 1, false, Math.PI / 2, Math.PI), velD); back.scale.z = .55; back.position.set(0, 1.2, .2); g.add(back);
    const pad = new T.Mesh(new T.CylinderGeometry(.53, .53, .8, 32, 1, false, Math.PI / 2, Math.PI), padM); pad.scale.z = .5; pad.position.set(0, 1.2, .2); g.add(pad);
    const capS = new T.Shape(); capS.absarc(0, 0, .6, 0, Math.PI, false); capS.absarc(0, 0, .51, Math.PI, 0, true);
    const cap = new T.Mesh(new T.ShapeGeometry(capS, 24), velD); cap.rotation.x = -Math.PI / 2; cap.scale.y = .55; cap.position.set(0, 1.625, .2); g.add(cap);
    const pip = new T.Mesh(new T.TorusGeometry(.58, .05, 8, 32, Math.PI), gold); pip.scale.y = .55; pip.rotation.x = -Math.PI / 2; pip.position.set(0, 1.63, .2); g.add(pip);
    const band = new T.Mesh(new T.TorusGeometry(.58, .03, 6, 32, Math.PI), gold); band.scale.y = .55; band.rotation.x = -Math.PI / 2; band.position.set(0, .8, .2); g.add(band);
    return g;
  }
  function centerpiece(x, y, z, p, s2 = 1) { const v = new T.Mesh(new T.CylinderGeometry(.22 * s2, .3 * s2, .45 * s2, 20), gold); v.position.set(x, y + .22 * s2, z); p.add(v); for (let q = 0; q < 11; q++) { const a = q * 2.4, r = (.12 + (q % 3) * .1) * s2; const f = new T.Mesh(new T.SphereGeometry(.13 * s2, 12, 10), FLW[q % FLW.length]); f.position.set(x + Math.cos(a) * r, y + (.6 + (q % 2) * .1) * s2, z + Math.sin(a) * r); p.add(f) } for (let q = 0; q < 5; q++) { const lf = new T.Mesh(new T.SphereGeometry(.14 * s2, 10, 8), LV[q % 2]); lf.position.set(x + Math.cos(q * 1.26) * .32 * s2, y + .5 * s2, z + Math.sin(q * 1.26) * .32 * s2); lf.scale.y = .5; p.add(lf) } }
  setTimeout(() => {
    const rooms = [{ x0: 20.8, x1: 33.08, z0: -10.0, z1: 3.6, large: true }, { x0: 20.8, x1: 33.08, z0: 3.6, z1: 15.4, large: false }];
    root.updateMatrixWorld(true);
    for (const R of rooms) {
      for (const ch of root.children) { if (ch === G || ch.isSprite || (ch.userData && (ch.userData.wyMeetingPlaque || ch.userData.wyVideoRoom))) continue; bb.setFromObject(ch); if (!isFinite(bb.min.x)) continue; bb.getCenter(cen); bb.getSize(sz);
        if (cen.x > R.x0 + .7 && cen.x < R.x1 - .7 && cen.z > R.z0 + .9 && cen.z < R.z1 - .9 && cen.y < 1.7 && sz.y < 2.2) { let t = false; ch.traverse(o => { if (o.material && o.material.transparent) t = true }); if (!t) ch.visible = false } }
      const cx = (R.x0 + R.x1) / 2, cz = (R.z0 + R.z1) / 2, MG = new T.Group(); G.add(MG);
      if (R.large) {
        const topM = M('#D2E2D3', { roughness: .16 }), baseM = M('#34497F', { roughness: .3 });
        const L = 7.6, W = 3.2, sh = new T.Shape(); sh.moveTo(-W / 2, -L / 2 + W / 2); sh.absarc(0, -L / 2 + W / 2, W / 2, Math.PI, 0, false); sh.lineTo(W / 2, L / 2 - W / 2); sh.absarc(0, L / 2 - W / 2, W / 2, 0, Math.PI, false); sh.closePath();
        const ex = (h, b2) => new T.ExtrudeGeometry(sh, { depth: h, bevelEnabled: true, bevelThickness: b2, bevelSize: b2, bevelSegments: 3, curveSegments: 32 });
        const tp = new T.Mesh(ex(.16, .06), topM); tp.rotation.x = -Math.PI / 2; tp.position.set(cx, 1.2, cz); MG.add(tp);
        const rim = new T.Mesh(ex(.08, .05), gold); rim.rotation.x = -Math.PI / 2; rim.scale.set(1.04, 1.02, 1); rim.position.set(cx, 1.13, cz); MG.add(rim);
        for (const dz of [-2.1, 2.1]) { const d1 = new T.Mesh(new T.CylinderGeometry(.55, .75, 1.0, 32), baseM); d1.position.set(cx, .55, cz + dz); MG.add(d1); for (const yy of [.12, 1.02]) { const r1 = new T.Mesh(new T.TorusGeometry(yy < .5 ? .76 : .56, .05, 8, 32), gold); r1.rotation.x = Math.PI / 2; r1.position.set(cx, yy, cz + dz); MG.add(r1) } const ft = new T.Mesh(new T.CylinderGeometry(.85, .85, .08, 32), gold); ft.position.set(cx, .04, cz + dz); MG.add(ft) }
        centerpiece(cx, 1.42, cz, MG, 1.3);
        for (const dz of [-2.85, -.95, .95, 2.85]) { tubChair(cx - 2.55, cz + dz, -Math.PI / 2, '#34497F', MG); tubChair(cx + 2.55, cz + dz, Math.PI / 2, '#34497F', MG) }
        tubChair(cx, cz - 5.0, Math.PI, '#34497F', MG); tubChair(cx, cz + 5.0, 0, '#34497F', MG);
      } else {
        const topM = M('#F0D3CB', { roughness: .16 });
        const tp = new T.Mesh(new T.CylinderGeometry(2.0, 2.0, .2, 64), topM); tp.position.set(cx + .4, 1.25, cz); MG.add(tp);
        const rim = new T.Mesh(new T.TorusGeometry(2.0, .08, 10, 64), gold); rim.rotation.x = Math.PI / 2; rim.position.set(cx + .4, 1.2, cz); MG.add(rim);
        const st = new T.Mesh(new T.CylinderGeometry(.22, .3, .9, 20), gold); st.position.set(cx + .4, .65, cz); MG.add(st);
        const ft = new T.Mesh(new T.CylinderGeometry(.35, 1.1, .3, 32), gold); ft.position.set(cx + .4, .15, cz); MG.add(ft);
        centerpiece(cx + .4, 1.35, cz, MG, 1.15);
        for (let k = 0; k < 5; k++) { const a = Math.PI + (k + 1) / 6 * Math.PI * 2 - Math.PI; const ang = -Math.PI * .65 + k * (Math.PI * 1.3 / 4); const x = cx + .4 + Math.cos(ang) * 3.1, z = cz + Math.sin(ang) * 3.1; tubChair(x, z, Math.atan2(-(cx + .4 - x), -(cz - z)), '#D68C96', MG) }
      }
    }
  }, 2700);
  // ---------- 6) 乖乖升級：圓鼓鼓綠色包裝＋大眼笑臉＋小金冠＋彩色乖乖散落（一眼就認得是乖乖）----------
  root.traverse(o => { if (!o.isGroup || o.userData.wyKuaiDone) return; const face = o.children.find(c => c.isMesh && c.geometry.type === 'PlaneGeometry' && c.material.map); if (!face || Math.abs(o.position.x - 3.65) > .5 || Math.abs(o.position.z - 7.98) > .6) return;
    o.userData.wyKuaiDone = 1;
    for (const c of o.children) if (c !== face) c.visible = false;
    const green = M('#22C24A', { roughness: .35 }), seal = M('#B8F59A', { roughness: .4 });
    const body = new T.Mesh(new RoundedBoxGeometry(2.05, 2.05, .7, 5, .3), green); body.position.y = .97; body.scale.z = 1.0; o.add(body);
    for (const yy of [1.98, -.04]) { const sl = new T.Mesh(new RoundedBoxGeometry(2.0, .16, .5, 3, .07), seal); sl.position.y = yy; o.add(sl); for (let k = 0; k < 9; k++) { const t = new T.Mesh(new T.BoxGeometry(.05, .14, .52), M('#8EE07A')); t.position.set(-.85 + k * .21, yy, 0); o.add(t) } }
    face.position.z = .356;
    const white = new T.MeshBasicMaterial({ color: '#FFFFFF' }), blk = new T.MeshBasicMaterial({ color: '#1B1B1B' }), blush = new T.MeshBasicMaterial({ color: '#FF8FB0' });
    for (const sx of [-.42, .42]) { const e = new T.Mesh(new T.SphereGeometry(.2, 18, 14), white); e.position.set(sx, 1.68, .36); e.scale.z = .45; o.add(e); const pu = new T.Mesh(new T.SphereGeometry(.12, 16, 12), blk); pu.position.set(sx + .02, 1.66, .43); pu.scale.z = .4; o.add(pu); const hl = new T.Mesh(new T.SphereGeometry(.04, 10, 8), white); hl.position.set(sx + .06, 1.71, .48); o.add(hl);
      const b2 = new T.Mesh(new T.CircleGeometry(.13, 20), blush); b2.position.set(sx * 1.75, 1.5, .37); o.add(b2) }
    const sm = new T.Mesh(new T.TorusGeometry(.14, .03, 8, 20, Math.PI), blk); sm.rotation.z = Math.PI; sm.position.set(0, 1.55, .38); o.add(sm);
    const crown = new T.Group(); crown.position.set(0, 2.1, 0); o.add(crown); const cb = new T.Mesh(new T.CylinderGeometry(.32, .28, .2, 20), gold); cb.position.y = .1; crown.add(cb);
    for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; const sp = new T.Mesh(new T.ConeGeometry(.08, .22, 8), gold); sp.position.set(Math.cos(a) * .27, .3, Math.sin(a) * .27); crown.add(sp); const jw = new T.Mesh(new T.SphereGeometry(.045, 8, 6), new T.MeshBasicMaterial({ color: ['#FF4F7B', '#4FB3FF', '#FFD23F', '#B46BFF', '#3FD08A'][k] })); jw.position.set(Math.cos(a) * .27, .44, Math.sin(a) * .27); crown.add(jw) }
    const CAN = ['#FFD23F', '#FF7FA8', '#6FC8FF', '#B784F5', '#7AD86A', '#FF9A4A'].map(c => M(c, { roughness: .45 }));
    for (let k = 0; k < 14; k++) { const a = k * 2.3, r = 1.15 + (k % 3) * .12; const cc = new T.Mesh(new T.TorusGeometry(.07, .035, 6, 12, Math.PI * 1.4), CAN[k % CAN.length]); cc.position.set(Math.cos(a) * r, -.08 + (k % 2) * .03, Math.sin(a) * r * .55); cc.rotation.set(k, k * .7, 0); o.add(cc) }
  });
  return G;
}
