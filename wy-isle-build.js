// v505 四島新建築（照陳老闆專案檔四張參考圖，用程式重蓋）
// 原本建築的網格只把材質設為不可見（點擊、碰撞照舊），新建築加在同一個群組裡，點新建築一樣會進館。
// 手機看不清細節：大塊造型、粗金邊、大色塊；光穩定不閃。
const logoTex = (T, col = '#F3D58E') => { const c = document.createElement('canvas'); c.width = c.height = 512; const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; const im = new Image();
  im.onload = () => { const g = c.getContext('2d'); g.clearRect(0, 0, 512, 512); const s = Math.min(512 / im.width, 512 / im.height); const w = im.width * s, h = im.height * s; g.drawImage(im, (512 - w) / 2, (512 - h) / 2, w, h); g.globalCompositeOperation = 'source-in'; g.fillStyle = col; g.fillRect(0, 0, 512, 512); t.needsUpdate = true }; im.src = 'office-logo-transparent.png'; return t };
function kit(T, P) {
  const M = (c, o = {}) => new T.MeshStandardMaterial(Object.assign({ color: c, roughness: .45 }, o));
  const add = (geo, mat, x, y, z, p = P) => { const m = new T.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; p.add(m); return m };
  const box = (w, h, d, mat, x, y, z, p) => add(new T.BoxGeometry(w, h, d), mat, x, y, z, p);
  const cyl = (r, h, mat, x, y, z, p, seg = 40, r2) => add(new T.CylinderGeometry(r, r2 == null ? r : r2, h, seg), mat, x, y, z, p);
  const gold = new T.MeshStandardMaterial({ color: '#F0CF86', metalness: .45, roughness: .25, emissive: '#7a5a1c', emissiveIntensity: .25 });
  const text = (lines, w, h, bg, fg, font) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); if (bg) { g.fillStyle = bg; g.fillRect(0, 0, w, h) } g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = font; lines.forEach((l, i) => g.fillText(l, w / 2, h * (i + 1) / (lines.length + 1))); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t };
  // 正式 Logo 圓徽：金框＋色底＋Logo＋WEIYANG
  const medal = (r, bgCol, x, y, z, p = P, rotY = 0) => { const g = new T.Group(); g.position.set(x, y, z); g.rotation.y = rotY; p.add(g);
    const rim = new T.Mesh(new T.CylinderGeometry(r + .22, r + .22, .22, 56), gold); rim.rotation.x = Math.PI / 2; g.add(rim);
    const face = new T.Mesh(new T.CircleGeometry(r, 56), new T.MeshStandardMaterial({ color: bgCol, roughness: .4 })); face.position.z = .12; g.add(face);
    const lg = new T.Mesh(new T.PlaneGeometry(r * 2.15, r * 2.15), new T.MeshBasicMaterial({ map: logoTex(T), transparent: true, depthWrite: false })); lg.position.set(0, 0, .13); g.add(lg);
    /* 正式 Logo 圖本身已含 WEIYANG 字，不再另外加字 */
    return g };
  const flag = (col, x, y, z, p = P) => { cyl(.07, 4.2, gold, x, y + 2.1, z, p, 10); add(new T.SphereGeometry(.16, 12, 8), gold, x, y + 4.3, z, p);
    const c = document.createElement('canvas'); c.width = 384; c.height = 256; const g = c.getContext('2d'); g.fillStyle = col; g.fillRect(0, 0, 384, 256); const im = new Image(); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace;
    im.onload = () => { g.drawImage(im, 132, 34, 120, 120); g.fillStyle = '#F6DC9A'; g.font = '700 40px Georgia,serif'; g.textAlign = 'center'; g.fillText('WEIYANG', 192, 205); t.needsUpdate = true }; im.src = 'office-logo-transparent.png';
    const f = add(new T.PlaneGeometry(2.1, 1.4), new T.MeshStandardMaterial({ map: t, side: T.DoubleSide, roughness: .6 }), x + 1.1, y + 3.55, z, p); return f };
  // 繽紛圓球繡球花盆
  const hydrangea = (x, z, cols, s = 1, potCol = '#FBF4E8', p = P, y0 = .35) => { const g = new T.Group(); g.position.set(x, y0, z); g.scale.setScalar(s); p.add(g);
    cyl(1.25, .85, M(potCol, { roughness: .35 }), 0, .43, 0, g, 32, .95); const rimm = cyl(1.32, .14, gold, 0, .88, 0, g, 32);
    const pts = [[0, 0], [.6, .2], [-.55, .3], [.2, -.6], [-.3, -.5], [.55, -.45], [-.65, -.2], [.05, .62]];
    pts.forEach(([a, b], i) => { const sp = add(new T.SphereGeometry(.42, 14, 10), M(cols[i % cols.length], { roughness: .7 }), a, 1.2 + (i === 0 ? .25 : 0), b, g) }); return g };
  const topiary = (x, z, s = 1, p = P, y0 = .35) => { const g = new T.Group(); g.position.set(x, y0, z); g.scale.setScalar(s); p.add(g); cyl(.12, .9, M('#8a6a45'), 0, .45, 0, g, 8); add(new T.SphereGeometry(.75, 16, 12), M('#3f9a4e', { roughness: .8 }), 0, 1.3, 0, g); add(new T.SphereGeometry(.5, 14, 10), M('#4cab5b', { roughness: .8 }), 0, 2.15, 0, g); return g };
  return { M, add, box, cyl, gold, medal, flag, hydrangea, topiary, text };
}
// 原本建築隱藏（材質不可見，保留點擊與碰撞）
function hideOld(target) { target.traverse(o => { if (o.isMesh || o.isSprite) { const ms = Array.isArray(o.material) ? o.material : [o.material]; o.material = Array.isArray(o.material) ? ms.map(m => { const c = m.clone(); c.visible = false; return c }) : (() => { const c = o.material.clone(); c.visible = false; return c })() } }) }

// ── 醫療法律島：綠色玻璃大圓頂＋兩座小圓頂塔＋米白石柱門廊＋深綠 WEIYANG 圓徽＋繡球花盆 ──
export function buildMedicalNew(T, target) {
  hideOld(target);
  const P = new T.Group(); P.name = 'wyMedicalNew'; target.add(P);
  const { M, add, box, cyl, gold, medal, flag, hydrangea, topiary } = kit(T, P);
  const ivory = M('#FFF7EA', { roughness: .4 }), ivory2 = M('#F6EBD8', { roughness: .45 });
  const marble = new T.MeshPhysicalMaterial({ color: '#FBF3E7', roughness: .18, clearcoat: .6 });
  // 透亮翡翠玻璃圓頂（不透明、不會閃）：上深下亮的漸層＋內透暖光＋強反光
  const jadeTex = (() => { const c = document.createElement('canvas'); c.width = 64; c.height = 256; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#9FF0C8'); gr.addColorStop(.35, '#3DBE86'); gr.addColorStop(1, '#1C8A5C'); g.fillStyle = gr; g.fillRect(0, 0, 64, 256); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t })();
  const jade = new T.MeshPhysicalMaterial({ color: '#FFFFFF', map: jadeTex, roughness: .05, metalness: .05, clearcoat: 1, clearcoatRoughness: .03, emissive: '#FFFFFF', emissiveMap: jadeTex, emissiveIntensity: .28, sheen: .4, sheenColor: '#CFFFE6' });
  const jadeD = M('#1E6448', { roughness: .3 });
  const winG = new T.MeshPhysicalMaterial({ color: '#7FC9A0', roughness: .1, metalness: .1, clearcoat: 1, emissive: '#2c6b48', emissiveIntensity: .35 });
  // 大理石圓台＋金邊
  cyl(15.2, .36, marble, 0, .18, 0); const rim = add(new T.TorusGeometry(15.2, .12, 10, 120), gold, 0, .34, 0); rim.rotation.x = Math.PI / 2;
  // 主體：米白石牆、上下金線腳
  box(17, 7.2, 10.5, ivory, 0, .36 + 3.6, -2.2);
  box(17.6, .45, 11.1, ivory2, 0, 7.75, -2.2); box(17.7, .14, 11.2, gold, 0, 8.02, -2.2); box(17.4, .3, 10.9, ivory2, 0, .5, -2.2);
  // 正面拱窗（綠玻璃＋金框），左右各兩扇
  const archWin = (x, y, z, w = 1.6, h = 3.4, p = P) => { const g = new T.Group(); g.position.set(x, y, z); p.add(g);
    box(w, h - w / 2, .14, winG, 0, 0, 0, g); const top = add(new T.CylinderGeometry(w / 2, w / 2, .14, 24, 1, false, 0, Math.PI), winG, 0, (h - w / 2) / 2, 0, g); top.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    box(w + .3, .2, .3, gold, 0, -(h - w / 2) / 2 - .1, .05, g); for (const s of [-1, 1]) box(.18, h - w / 2, .26, gold, s * (w / 2 + .05), 0, .05, g);
    const arc = add(new T.TorusGeometry(w / 2 + .05, .1, 8, 24, Math.PI), gold, 0, (h - w / 2) / 2, .08, g);
    box(.08, h - w / 2, .2, gold, 0, 0, .06, g); box(.32, .42, .3, gold, 0, (h - w / 2) / 2 + w / 2 + .12, .1, g); return g };
  for (const x of [-7.4, -5.4, 5.4, 7.4]) archWin(x, 4.2, 3.08);
  // 門廊：四根米白圓柱＋金柱頭柱腳、門楣、深綠 WEIYANG 圓徽
  for (const x of [-3.6, -1.6, 1.6, 3.6]) { cyl(.42, 5.8, ivory, x, .36 + 2.9, 4.6, P, 24); cyl(.62, .35, gold, x, .55, 4.6, P, 24); cyl(.6, .4, gold, x, 6.25, 4.6, P, 24); box(1.2, .2, 1.2, ivory2, x, 6.55, 4.6) }
  box(9, .9, 2.2, ivory, 0, 7.05, 4.1); box(9.3, .16, 2.4, gold, 0, 7.55, 4.1); box(9.1, .14, 2.3, gold, 0, 6.6, 4.1);
  // 圓徽底座弧牆
  box(6.0, 1.8, .6, ivory, 0, 8.3, 4.1); box(6.2, .14, .7, gold, 0, 9.22, 4.1);
  medal(2.25, '#1E6448', 0, 9.6, 4.5);
  // 大門：金框玻璃雙開門
  box(4.2, 4.4, .16, new T.MeshPhysicalMaterial({ color: '#E8D6A6', roughness: .1, metalness: .3, clearcoat: 1, emissive: '#8a6a2a', emissiveIntensity: .35 }), 0, .36 + 2.2, 3.1).userData.wyDoor = { w: 4.2, h: 4.4, isle: 2, bars: true };
  for (const x of [-2.15, 0, 2.15]) box(.18, 4.5, .3, gold, x, .36 + 2.25, 3.2); box(4.5, .2, .3, gold, 0, .36 + 4.45, 3.2); box(4.5, .16, .3, gold, 0, .36 + 2.4, 3.2);
  // 台階
  for (let k = 0; k < 3; k++) box(9.6 - k * .6, .16, 1.2 - k * .3, marble, 0, .36 + .08 + k * .16, 6.4 - k * .35);
  // 中央鼓座＋綠色玻璃大圓頂＋金肋＋頂燈亭＋旗
  const DZ = -2.2;
  cyl(5.6, 2.6, ivory, 0, 8.1 + 1.3, DZ, P, 48); cyl(5.85, .3, gold, 0, 8.15, DZ, P, 48); cyl(5.9, .35, ivory2, 0, 10.55, DZ, P, 48); cyl(5.95, .12, gold, 0, 10.75, DZ, P, 48);
  for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; const w = box(.9, 1.5, .1, winG, Math.sin(a) * 5.62, 9.4, DZ + Math.cos(a) * 5.62); w.rotation.y = a }
  add(new T.SphereGeometry(5.7, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), jade, 0, 10.8, DZ);
  for (let k = 0; k < 16; k++) { const rb = add(new T.TorusGeometry(5.82, .11, 8, 40, Math.PI / 2), gold, 0, 10.8, DZ); rb.rotation.set(0, k / 16 * Math.PI * 2, Math.PI / 2) }
  for (const [r, y] of [[5.55, 12.5], [5.05, 13.65], [4.1, 14.75], [3.0, 15.6]]) { const t = add(new T.TorusGeometry(r, .1, 8, 64), gold, 0, y, DZ); t.rotation.x = Math.PI / 2 }
  cyl(1.0, 1.1, ivory, 0, 16.9, DZ, P, 24); add(new T.SphereGeometry(1.05, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), jade, 0, 17.45, DZ); cyl(.12, .9, gold, 0, 18.3, DZ, P, 10); add(new T.SphereGeometry(.28, 14, 10), gold, 0, 18.85, DZ);
  flag('#1E6448', 0, 18.9, DZ);
  // 兩側：圓塔＋綠色小圓頂＋金尖頂
  for (const s of [-1, 1]) {
    const x = s * 9.15, z = -2.1;
    cyl(3.05, 8.6, ivory, x, .36 + 4.3, z, P, 40); cyl(3.25, .35, ivory2, x, 9.1, z, P, 40); cyl(3.3, .14, gold, x, 9.33, z, P, 40); cyl(3.1, .3, gold, x, .55, z, P, 40);
    for (let k = -1; k <= 1; k++) { const a = k * .62; const w = archWin(x + Math.sin(a) * 3.08, 4.6, z + Math.cos(a) * 3.08, 1.3, 3.6); w.rotation.y = a }
    for (const [a] of [[-1.25], [1.25]]) { const pl = cyl(.24, 8.4, ivory2, x + Math.sin(a) * 3.1, .36 + 4.2, z + Math.cos(a) * 3.1, P, 12) }
    cyl(2.7, 1.0, ivory, x, 9.9, z, P, 36); add(new T.SphereGeometry(2.75, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2), jade, x, 10.4, z);
    for (let k = 0; k < 8; k++) { const rb = add(new T.TorusGeometry(2.86, .09, 8, 30, Math.PI / 2), gold, x, 10.4, z); rb.rotation.set(0, k / 8 * Math.PI * 2, Math.PI / 2) }
    cyl(.1, 1.0, gold, x, 13.6, z, P, 10); add(new T.SphereGeometry(.32, 14, 10), gold, x, 13.25, z); add(new T.ConeGeometry(.18, .7, 12), gold, x, 14.3, z);
  }
  /* v507 豐富細節（大線條、不透明、不會閃） */
  // 主牆頂：米白欄杆＋金色瓶飾
  { const z = 3.18, y = 8.3; box(17.2, .14, .26, ivory2, 0, y + .62, z); for (let k = 0; k <= 34; k++) { const x = -8.5 + k * .5; if (Math.abs(x) < 4.8) continue; cyl(.07, .5, ivory, x, y + .3, z, P, 8) } for (const x of [-8.4, -6.4, -4.9, 4.9, 6.4, 8.4]) { cyl(.18, .3, ivory2, x, y + .85, z, P, 12); add(new T.SphereGeometry(.2, 12, 8), gold, x, y + 1.15, z) } }
  // 正面米白壁柱，把牆分格
  for (const x of [-8.45, -6.4, -4.35, 4.35, 6.4, 8.45]) { box(.42, 6.8, .24, ivory2, x, .36 + 3.6, 3.14); box(.55, .22, .3, gold, x, 7.2, 3.16); box(.55, .22, .3, gold, x, .7, 3.16) }
  // 圓柱直條紋＋門楣齒狀線腳
  for (const x of [-3.6, -1.6, 1.6, 3.6]) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; box(.05, 5.2, .05, ivory2, x + Math.sin(a) * .42, .36 + 2.9, 4.6 + Math.cos(a) * .42) }
  for (let k = 0; k < 28; k++) box(.18, .2, .16, ivory, -4.2 + k * .31, 6.53, 5.22);
  // 鼓座：窗間小柱＋上下金線
  for (let k = 0; k < 16; k++) { const a = (k + .5) / 16 * Math.PI * 2; cyl(.13, 2.2, ivory2, Math.sin(a) * 5.68, 9.4, DZ + Math.cos(a) * 5.68, P, 10) }
  cyl(5.72, .1, gold, 0, 8.55, DZ, P, 48); cyl(5.72, .1, gold, 0, 10.3, DZ, P, 48);
  // 兩側塔：塔身金腰線兩道
  for (const s2 of [-1, 1]) for (const y of [3.0, 7.0]) cyl(3.12, .12, gold, s2 * 9.15, y, -2.1, P, 40);
  // 繡球花盆（紫、藍、白、粉）＋綠籬＋小圓樹
  hydrangea(-5.6, 7.6, ['#B79BE0', '#8FB5EE', '#FFFFFF', '#F2B9D6', '#9C86D8']);
  hydrangea(5.6, 7.6, ['#8FB5EE', '#B79BE0', '#F2B9D6', '#FFFFFF', '#7FA6E8']);
  for (const s of [-1, 1]) { const hg = box(6.2, .9, 1.0, M('#3f9a4e', { roughness: .85 }), s * 10.4, .8, 5.4); const hg2 = box(1.0, .9, 5, M('#3f9a4e', { roughness: .85 }), s * 13.2, .8, 3); topiary(s * 8.2, 7.2, 1.1); topiary(s * 12.6, 7.5, .95) }
  return P;
}

// 共用：拱窗、圓台
function archWinK(K, T, P, mat, x, y, z, w = 1.6, h = 3.4, rotY = 0) { const { add, box, gold } = K; const g = new T.Group(); g.position.set(x, y, z); g.rotation.y = rotY; P.add(g);
  box(w, h - w / 2, .14, mat, 0, 0, 0, g); const top = add(new T.CylinderGeometry(w / 2, w / 2, .14, 24, 1, false, 0, Math.PI), mat, 0, (h - w / 2) / 2, 0, g); top.rotation.set(Math.PI / 2, 0, Math.PI / 2);
  box(w + .3, .2, .3, gold, 0, -(h - w / 2) / 2 - .1, .05, g); for (const s of [-1, 1]) box(.16, h - w / 2, .24, gold, s * (w / 2 + .05), 0, .05, g);
  add(new T.TorusGeometry(w / 2 + .05, .09, 8, 24, Math.PI), gold, 0, (h - w / 2) / 2, .08, g); box(.07, h - w / 2, .2, gold, 0, 0, .06, g); return g }
function plinth(K, T, r, mat, y = .3) { const { cyl, add, gold } = K; cyl(r, y, mat, 0, y / 2, 0); const t = add(new T.TorusGeometry(r, .12, 10, 120), gold, 0, y, 0); t.rotation.x = Math.PI / 2 }
function palm(K, T, x, z, s = 1, y0 = .3) { const { add, M } = K; const g = new T.Group(); g.position.set(x, y0, z); g.scale.setScalar(s); K.add(new T.CylinderGeometry(.22, .3, 4.2, 10), M('#9a7048'), 0, 2.1, 0, g).rotation.z = .08;
  for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2; const lf = add(new T.SphereGeometry(1, 12, 6), M('#3fae5a', { roughness: .7 }), Math.sin(a) * 1.1, 4.3, Math.cos(a) * 1.1, g); lf.scale.set(.45, .12, 1.4); lf.rotation.y = a; lf.rotation.x = .35 } return g }

// ── 訴訟法律島（v506 逐項照參考圖重做）：一層樓、橫向很寬的橘色建築，米白分層女兒牆；中央深色玻璃大門＋左右各一對白色直條紋大柱；
//    大柱外側橘色圓鼓（三道細長窗）；兩翼橘牆金框拱窗、圓弧轉角；屋頂中央米白頂樓＋立起來的橘色 WEIYANG 大圓徽；屋頂綠植；
//    右後方獨立米白殿堂：綠色大圓頂＋兩座小綠圓頂＋橘色圓徽、綠色小旗；左前高旗桿橘色大旗；半圓金邊台階、弧形花圃金邊、棕櫚樹、金色花盆
export function buildLitigationNew(T, target) {
  hideOld(target); const P = new T.Group(); P.name = 'wyLitNew'; target.add(P); const K = kit(T, P); const { M, add, box, cyl, gold, medal, flag, topiary } = K;
  const orange = M('#EF8B4F', { roughness: .45 }), ivory = M('#FFF5E6', { roughness: .4 }), ivory2 = M('#F6E4CB', { roughness: .45 });
  const marble = new T.MeshPhysicalMaterial({ color: '#F5E7D4', roughness: .2, clearcoat: .6 });
  const glass = new T.MeshPhysicalMaterial({ color: '#3E5C7C', roughness: .06, metalness: .25, clearcoat: 1, emissive: '#1d3048', emissiveIntensity: .45 });
  const slit = new T.MeshPhysicalMaterial({ color: '#5F86AE', roughness: .08, clearcoat: 1, emissive: '#2a4466', emissiveIntensity: .5 });
  const jade = new T.MeshPhysicalMaterial({ color: '#4FAE96', roughness: .12, clearcoat: 1, clearcoatRoughness: .06, emissive: '#1d5a4a', emissiveIntensity: .35 });
  const green = M('#3f9a4e', { roughness: .85 });
  plinth(K, T, 15.5, marble);
  const Y0 = .3, H = 8.6, FZ = 2.4, W = 24; /* v507 調高到跟原本一樣高（原本大柱約 8.4） */
  // 主體：橘牆、圓弧轉角、米白線腳與分層女兒牆
  box(W - 3, H, 8, orange, 0, Y0 + H / 2, FZ - 4); for (const s of [-1, 1]) { cyl(1.5, H, orange, s * (W / 2 - 1.5), Y0 + H / 2, FZ - 1.5, P, 32); box(3, H, 5, orange, s * (W / 2 - 1.5), Y0 + H / 2, FZ - 4.5); cyl(1.62, .45, ivory, s * (W / 2 - 1.5), Y0 + H + .2, FZ - 1.5, P, 32) }
  /* v508 屋頂改回亮面反光（陳老闆：之前屋頂是亮亮的） */ const roofG = new T.MeshPhysicalMaterial({ color: '#FFF3E0', roughness: .14, metalness: .08, clearcoat: 1, clearcoatRoughness: .05, emissive: '#3a2a14', emissiveIntensity: .12 });
  box(W - 2.6, .45, 8.4, roofG, 0, Y0 + H + .2, FZ - 4); box(W - 2.5, .1, 8.5, gold, 0, Y0 + H + .45, FZ - 4); box(W - 2.6, .35, 8.4, ivory2, 0, Y0 + .17, FZ - 4);
  box(W - 5, .8, 7, roofG, 0, Y0 + H + .85, FZ - 4.3); box(W - 4.9, .1, 7.1, gold, 0, Y0 + H + 1.28, FZ - 4.3);
  // v508 陳老闆：屋頂綠植拿掉
  // 中央頂樓＋立起的橘色大圓徽
  box(9, 1.6, 4.5, roofG, 0, Y0 + H + 2.0, FZ - 2.8); box(9.2, .12, 4.7, gold, 0, Y0 + H + 2.85, FZ - 2.8); for (let k = 0; k < 10; k++) box(.25, .3, .25, gold, -4.2 + k * .93, Y0 + H + 1.2, FZ - .5);
  medal(1.75, '#E2703A', 0, Y0 + H + 2.6, FZ - .3);
  /* v507 正面線條（照參考圖：Logo 兩旁女兒牆多層線腳，粗線條、左右對稱） */
  { const zf = FZ + .03; // 主簷下：金線＋齒狀線腳
    box(W - 3.2, .1, .1, gold, 0, Y0 + H - .45, zf + .05); for (let k = 0; k < 52; k++) { const x = -(W - 3.6) / 2 + k * (W - 3.6) / 51; if (Math.abs(x) < 2.4) continue; box(.18, .2, .16, ivory, x, Y0 + H - .22, zf + .08) }
    // 女兒牆兩層：米白帶＋金線（正面）
    for (const [y, w] of [[Y0 + H + .42, W - 2.7], [Y0 + H + .62, W - 2.7], [Y0 + H + 1.32, W - 5.0]]) box(w, .08, .1, gold, 0, y, (y > Y0 + H + 1 ? FZ - .78 : zf + .2));
    for (const s2 of [-1, 1]) { // Logo 兩旁：分格米白面板＋金框、小金柱頭
      for (let k = 0; k < 3; k++) { const x = s2 * (3.0 + k * 1.55); box(1.25, .55, .06, ivory2, x, Y0 + H + .87, FZ - .76); box(1.35, .06, .08, gold, x, Y0 + H + 1.17, FZ - .74); box(1.35, .06, .08, gold, x, Y0 + H + .58, FZ - .74) }
      for (let k = 0; k < 4; k++) { const x = s2 * (2.25 + k * 1.55); box(.16, .7, .14, gold, x, Y0 + H + .87, FZ - .72); add(new T.SphereGeometry(.13, 10, 8), gold, x, Y0 + H + 1.38, FZ - .74) }
      // 中央頂樓兩側：橫向金線三道
      for (const y of [Y0 + H + 1.55, Y0 + H + 2.0, Y0 + H + 2.45]) box(2.0, .07, .08, gold, s2 * 3.4, y, FZ - .53) }
    // 大門上方門楣：金線兩道
    box(6.2, .08, .1, gold, 0, Y0 + H - .05, FZ + .92); box(6.2, .08, .1, gold, 0, Y0 + H - .38, FZ + .92) }
  // 中央大門：深色玻璃＋金框
  { const DW = 3.6, DH = 6.8; box(DW, DH, .2, glass, 0, Y0 + DH / 2, FZ + .05).userData.wyDoor = { w: DW, h: DH, isle: 1, bars: true }; for (const x of [-DW / 2, 0, DW / 2]) box(.16, DH + .1, .3, gold, x, Y0 + DH / 2, FZ + .14); for (const y of [.05, DH * .55, DH]) box(DW + .2, .14, .3, gold, 0, Y0 + y, FZ + .14); for (const x of [-DW / 4, DW / 4]) box(.06, DH, .2, gold, x, Y0 + DH / 2, FZ + .12) }
  box(6, .9, 1.2, ivory, 0, Y0 + H - .45, FZ + .3);
  // 左右各一對白色直條紋大柱
  for (const s of [-1, 1]) for (const dx of [2.85, 3.85]) { const x = s * dx; cyl(.4, H - .6, ivory, x, Y0 + (H - .6) / 2 + .25, FZ + 1.0, P, 24);
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; box(.06, H - .9, .06, ivory2, x + Math.sin(a) * .4, Y0 + (H - .6) / 2 + .25, FZ + 1.0 + Math.cos(a) * .4) }
    cyl(.58, .42, gold, x, Y0 + .26, FZ + 1.0, P, 24); /* v508：柱座頂面原本跟最上面台階同高會閃，墊高 1 公分 */ cyl(.58, .45, gold, x, Y0 + H - .3, FZ + 1.0, P, 24) }
  // 大柱外側：橘色圓鼓＋三道細長窗
  for (const s of [-1, 1]) { const x = s * 6.0, z = FZ + .3; cyl(1.6, H - .3, orange, x, Y0 + (H - .3) / 2, z, P, 36); cyl(1.75, .45, ivory, x, Y0 + H - .15, z, P, 36); cyl(1.77, .12, gold, x, Y0 + H + .1, z, P, 36); /* v508：金環原本跟米白圓環一樣粗、側面重疊會閃，加粗 2 公分 */ cyl(1.72, .35, ivory, x, Y0 + .17, z, P, 36); cyl(1.68, .1, gold, x, Y0 + 2.8, z, P, 36);
    for (let k = -1; k <= 1; k++) { const a = k * .55; const w = box(.42, 4.2, .1, slit, x + Math.sin(a) * 1.61, Y0 + 5.4, z + Math.cos(a) * 1.61); w.rotation.y = a; const f = box(.56, 4.35, .05, gold, x + Math.sin(a) * 1.6, Y0 + 5.4, z + Math.cos(a) * 1.6); f.rotation.y = a;
      const w2 = box(.42, 1.8, .1, slit, x + Math.sin(a) * 1.61, Y0 + 1.5, z + Math.cos(a) * 1.61); w2.rotation.y = a } }
  // 兩翼金框拱窗
  for (const x of [-9.0, -10.7, 9.0, 10.7]) { const w = archWinK(K, T, P, glass, x, Y0 + 3.9, FZ + .02, 1.3, 5.6); }
  for (const s of [-1, 1]) { const w = archWinK(K, T, P, glass, s * (W / 2 - .2), Y0 + 3.9, FZ - 2.3, 1.2, 5.4, s * Math.PI / 2) }
  // v508 陳老闆：拿掉右後方的綠色圓頂殿堂（看起來像多一棟醫療島）；只保留原本的高度設定
  { const DY = 3.4; P.userData.dy = DY }
  // 左前高旗桿：橘色大旗
  // v508 陳老闆：屋頂左邊的小旗拿掉（保留中央大旗）
  // 半圓金邊台階
  for (let k = 0; k < 3; k++) { add(new T.CylinderGeometry(5.4 - k * .8, 5.4 - k * .8, .15, 64, 1, false, -Math.PI / 2, Math.PI), marble, 0, Y0 + .075 + k * .15, FZ + .4); const e = add(new T.TorusGeometry(5.4 - k * .8, .05, 6, 64, Math.PI), gold, 0, Y0 + .15 + k * .15, FZ + .4); e.rotation.x = -Math.PI / 2 }
  // 弧形花圃（綠籬＋花＋金邊）
  { const R = 10.5; for (let k = 0; k < 15; k++) { const a = -Math.PI * .42 + k / 14 * Math.PI * .84; const x = Math.sin(a) * R, z = FZ + 1 + Math.cos(a) * R * .55; if (Math.abs(x) < 3.2) continue; add(new T.SphereGeometry(.55, 10, 8), green, x, Y0 + .45, z); if (k % 2) add(new T.SphereGeometry(.28, 10, 8), M(['#F49AB6', '#F7B27A', '#FFFFFF', '#E86A8F'][k % 4], { roughness: .7 }), x + .2, Y0 + .95, z + .2) }
    const cu = add(new T.TorusGeometry(R, .1, 8, 80, Math.PI * .84), gold, 0, Y0 + .2, FZ + 1); cu.rotation.set(-Math.PI / 2, 0, Math.PI * .08); cu.scale.set(1, .55, 1) }
  // 棕櫚樹、金色花盆
  const palmT = (x, z, s = 1) => { const g = new T.Group(); g.position.set(x, Y0, z); g.scale.setScalar(s); P.add(g); for (let k = 0; k < 5; k++) add(new T.CylinderGeometry(.24 - k * .02, .27 - k * .02, .95, 10), M('#A27A50'), Math.sin(k * .3) * .15, .48 + k * .9, 0, g);
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; const lf = add(new T.ConeGeometry(.55, 2.6, 4), M('#43B05C', { roughness: .7 }), Math.sin(a) * 1.1, 4.6, Math.cos(a) * 1.1, g); lf.rotation.set(Math.cos(a) * 1.25, 0, -Math.sin(a) * 1.25) } };
  palmT(-12.4, FZ + .5, 1.0); palmT(12.4, FZ + .5, 1.0); palmT(3.6, FZ + 7.0, .9);
  { const g = new T.Group(); g.position.set(-1.2, Y0, FZ + 8.6); P.add(g); cyl(.95, .7, gold, 0, .35, 0, g, 28, .75); for (let k = 0; k < 9; k++) add(new T.SphereGeometry(.28, 10, 8), M(['#F49AB6', '#FFFFFF', '#F7B27A', '#E86A8F', '#B79BE0'][k % 5], { roughness: .7 }), Math.cos(k) * .55, .9 + (k % 2) * .15, Math.sin(k) * .55, g) }
  return P;
}

// ── 家庭生活島（v506 逐項照參考圖重做）：寬、左右對稱的兩層洋房；酒紅分段四坡屋頂＋中央大山牆（圓徽＋WEIYANG）＋兩座老虎窗；
//    一樓整排落地大窗（看得到亮燈的客廳）、二樓中央大窗＋兩側大拱窗配花台；中央小山牆門廊＋雙柱；兩條酒紅垂掛旗；紫旗與酒紅旗；
//    方形米白花台＋紅玫瑰、綠籬、小圓樹；右側粉紅櫻花樹；大理石圓台
function roomTex(T, kind = 0) { const c = document.createElement('canvas'); c.width = 256; c.height = 256; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#FFE6B8'); gr.addColorStop(1, '#F2C98A'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
  g.fillStyle = '#E9B97A'; g.fillRect(0, 196, 256, 60);
  if (kind === 0) { g.fillStyle = '#F7EBDD'; g.beginPath(); g.roundRect(40, 150, 176, 56, 14); g.fill(); g.fillStyle = '#EAD9C6'; g.beginPath(); g.roundRect(40, 128, 176, 34, 12); g.fill(); g.fillStyle = '#B9C7E6'; g.fillRect(70, 140, 30, 20); g.fillRect(156, 140, 30, 20) }
  if (kind === 1) { g.fillStyle = '#F7EBDD'; g.beginPath(); g.roundRect(30, 150, 90, 56, 12); g.fill(); g.fillStyle = '#7C5A43'; g.fillRect(140, 176, 80, 10); g.fillRect(150, 186, 8, 20); g.fillRect(202, 186, 8, 20) }
  g.fillStyle = '#FFF7E0'; g.beginPath(); g.moveTo(200, 70); g.lineTo(236, 70); g.lineTo(244, 104); g.lineTo(192, 104); g.closePath(); g.fill(); g.fillStyle = '#8A6A4A'; g.fillRect(216, 104, 4, 90);
  g.fillStyle = '#C79A5B'; g.fillRect(70, 40, 80, 60); g.fillStyle = '#9FB7D9'; g.fillRect(78, 48, 64, 44);
  const rg = g.createRadialGradient(218, 88, 0, 218, 88, 90); rg.addColorStop(0, 'rgba(255,240,190,.9)'); rg.addColorStop(1, 'rgba(255,240,190,0)'); g.fillStyle = rg; g.fillRect(0, 0, 256, 256);
  const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t }
function hipRoof(T, w, d, h, ridgeRatio = 1) { const r = Math.max(0, (w - d) / 2) * ridgeRatio; const hw = w / 2, hd = d / 2;
  const V = [-hw, 0, -hd, hw, 0, -hd, hw, 0, hd, -hw, 0, hd, -r, h, 0, r, h, 0];
  const I = [3, 2, 5, 3, 5, 4, 1, 0, 4, 1, 4, 5, 2, 1, 5, 0, 3, 4];
  const UV = []; for (let k = 0; k < V.length; k += 3) UV.push(V[k] / w + .5, V[k + 1] / h);
  const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(V, 3)); g.setAttribute('uv', new T.Float32BufferAttribute(UV, 2)); g.setIndex(I); const ng = g.toNonIndexed(); ng.computeVertexNormals(); return ng }
export function buildFamilyNew(T, target) {
  hideOld(target); const P = new T.Group(); P.name = 'wyFamNew'; target.add(P); const K = kit(T, P); const { M, add, box, cyl, gold, medal, flag, topiary } = K;
  const ivory = M('#FFF6EA', { roughness: .4 }), ivory2 = M('#F3E3CD', { roughness: .45 }), wine = M('#8C2A44', { roughness: .42 }), wineD = M('#6E1F36', { roughness: .45 });
  // v507 屋頂瓦片線條：一排一排橫向瓦片（深淺酒紅＋深色分隔線），手機上看得到的大線條
  const tileT = (() => { const c = document.createElement('canvas'); c.width = 64; c.height = 512; const g = c.getContext('2d'); const N = 8; for (let i = 0; i < N; i++) { const y0 = i * 512 / N, h = 512 / N; const gr = g.createLinearGradient(0, y0, 0, y0 + h); gr.addColorStop(0, '#9A3450'); gr.addColorStop(.8, '#86283F'); gr.addColorStop(1, '#6A1C31'); g.fillStyle = gr; g.fillRect(0, y0, 64, h); g.fillStyle = '#521426'; g.fillRect(0, y0 + h - 7, 64, 7); g.fillStyle = 'rgba(255,220,200,.25)'; g.fillRect(0, y0, 64, 4) } const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.wrapS = t.wrapT = T.RepeatWrapping; return t })();
  const roofM = new T.MeshStandardMaterial({ color: '#FFFFFF', map: tileT, roughness: .5, side: T.DoubleSide });
  const marble = new T.MeshPhysicalMaterial({ color: '#FAF1E6', roughness: .2, clearcoat: .6 });
  const room = [roomTex(T, 0), roomTex(T, 1)].map(t => new T.MeshBasicMaterial({ map: t }));
  plinth(K, T, 15, marble);
  const W = 25, FZ = 3.0, Y0 = .3, H1 = 5.4, H2 = 5.0, /* v507 調高到跟原本一樣高 */ Y1 = Y0 + H1, Y2 = Y1 + H2;
  // 牆體
  box(W, H1, 9, ivory, 0, Y0 + H1 / 2, FZ - 4.5); box(W - .6, H2, 8.4, ivory, 0, Y1 + H2 / 2, FZ - 4.6);
  box(W + .5, .4, 9.5, ivory2, 0, Y1, FZ - 4.5); box(W + .55, .1, 9.55, gold, 0, Y1 + .22, FZ - 4.5); box(W + .2, .45, 9.0, ivory2, 0, Y2 + .1, FZ - 4.6); box(W + .25, .1, 9.05, gold, 0, Y2 + .35, FZ - 4.6);
  box(W + .4, .35, 9.4, ivory2, 0, Y0 + .17, FZ - 4.5);
  // 窗：暖光室內畫面＋米白框＋金線
  const win = (x, y, w, h, z, kind = 0, arch = false) => { const g = new T.Group(); g.position.set(x, y, z); P.add(g);
    box(w + .5, h + .5, .3, ivory2, 0, 0, -.05, g); const pane = box(w, h, .06, room[kind], 0, 0, .1, g);
    if (arch) { const a = add(new T.CircleGeometry(w / 2, 32, 0, Math.PI), room[kind], 0, h / 2, .11, g); add(new T.TorusGeometry(w / 2 + .1, .12, 8, 32, Math.PI), ivory2, 0, h / 2, .14, g); add(new T.TorusGeometry(w / 2 - .05, .05, 6, 32, Math.PI), gold, 0, h / 2, .16, g) }
    for (const s of [-1, 1]) box(.08, h, .08, gold, s * w / 2, 0, .15, g); box(w, .08, .08, gold, 0, h / 2, .15, g); box(w, .08, .08, gold, 0, -h / 2, .15, g);
    const n = Math.max(1, Math.round(w / 1.3)); for (let k = 1; k < n; k++) box(.06, h, .06, gold, -w / 2 + k * w / n, 0, .15, g); box(w, .06, .06, gold, 0, h * .18, .15, g); return g };
  // 壁柱（米白）與酒紅牆板
  for (const x of [-12.35, -9.3, -5.9, 5.9, 9.3, 12.35]) { box(.7, H1 + H2, .5, ivory, x, Y0 + (H1 + H2) / 2, FZ + .1); box(.9, .25, .6, gold, x, Y0 + .3, FZ + .12) }
  for (const s of [-1, 1]) { box(2.6, H1 - .4, .1, wine, s * 7.45, Y0 + H1 / 2, FZ + .02); box(2.6, H2 - .5, .1, wine, s * 7.45, Y1 + H2 / 2, FZ + .01); win(s * 7.45, Y1 + 1.85, 2.0, 2.4, FZ + .04, 1, true); box(2.2, H1 - .4, .1, wine, s * 11.1, Y0 + H1 / 2, FZ + .02) }
  // 一樓：落地大窗（看得到客廳）
  for (const s of [-1, 1]) { win(s * 11.1, Y0 + 1.95, 1.8, 3.2, FZ + .02, 1); win(s * 7.45, Y0 + 1.95, 2.0, 3.3, FZ + .05, 0); win(s * 3.9, Y0 + 1.95, 2.6, 3.4, FZ + .02, s > 0 ? 1 : 0) }
  // 二樓：中央大窗＋兩側大拱窗（花台）＋外側窗
  win(0, Y1 + 1.75, 5.4, 2.4, FZ + .02, 0);
  for (const s of [-1, 1]) { const ax = s * 3.9; win(ax, Y1 + 1.5, 2.6, 2.2, FZ + .02, 0, true);
    box(2.9, .5, .7, ivory2, ax, Y1 + .45, FZ + .4); box(3.0, .08, .75, gold, ax, Y1 + .72, FZ + .4); for (let k = 0; k < 7; k++) add(new T.SphereGeometry(.3, 12, 8), M(['#D9264E', '#F07A9A', '#C81E46', '#FF9FB8'][k % 4], { roughness: .7 }), ax - 1.2 + k * .4, Y1 + 1.0 + (k % 2) * .12, FZ + .45);
    for (let k = 0; k < 4; k++) add(new T.SphereGeometry(.28, 10, 8), M('#4E9A5C', { roughness: .8 }), ax - 1.05 + k * .7, Y1 + .78, FZ + .62);
    win(s * 11.1, Y1 + 1.8, 1.7, 2.4, FZ + .02, 1) }
  // 酒紅分段四坡屋頂
  const RY = Y2 + .32; const main = add(hipRoof(T, 13.2, 9.6, 5.9, .3), roofM, 0, RY, FZ - 4.6); for (const s of [-1, 1]) { add(hipRoof(T, 7.4, 9.0, 4.3, .3), roofM, s * 9.0, RY, FZ - 4.6) }
  box(1.3, .14, .14, gold, 0, RY + 5.9, FZ - 4.6); /* v507 屋頂收尖、不再平平的；屋頂尖加金色尖飾 */ for (const x of [-.55, .55]) { cyl(.07, .9, gold, x, RY + 6.35, FZ - 4.6, P, 8); add(new T.SphereGeometry(.16, 10, 8), gold, x, RY + 6.85, FZ - 4.6) } for (const s2 of [-1, 1]) { cyl(.06, .7, gold, s2 * 9.0, RY + 4.6, FZ - 4.6, P, 8); add(new T.SphereGeometry(.13, 10, 8), gold, s2 * 9.0, RY + 5.0, FZ - 4.6) }
  // 屋簷：米白飾帶＋金線（三段屋頂的底邊都包一圈），屋脊金線
  for (const [x, w, d] of [[0, 13.2, 9.6], [-9.0, 7.4, 9.0], [9.0, 7.4, 9.0]]) { box(w + .3, .32, .18, ivory, x, RY + .1, FZ - 4.6 + d / 2 + .05); box(w + .32, .08, .2, gold, x, RY + .3, FZ - 4.6 + d / 2 + .06); for (const sx of [-1, 1]) { box(.18, .32, d + .3, ivory, x + sx * (w / 2 + .05), RY + .1, FZ - 4.6) } }
  for (const s2 of [-1, 1]) 
  // 中央大山牆：酒紅三角＋米白框＋圓徽＋WEIYANG
  { const GW = 9.4, GH = 5.6, gz = FZ + .35; const tri = new T.Shape(); tri.moveTo(-GW / 2, 0); tri.lineTo(GW / 2, 0); tri.lineTo(0, GH); tri.closePath();
    add(new T.ExtrudeGeometry(tri, { depth: 1.0, bevelEnabled: false }), wine, 0, RY - .05, gz - 1.0);
    const fr = new T.Shape(); fr.moveTo(-GW / 2 - .45, -.2); fr.lineTo(GW / 2 + .45, -.2); fr.lineTo(0, GH + .35); fr.closePath(); const hole = new T.Path(); hole.moveTo(-GW / 2 + .3, .15); hole.lineTo(GW / 2 - .3, .15); hole.lineTo(0, GH - .35); hole.closePath(); fr.holes.push(hole);
    add(new T.ExtrudeGeometry(fr, { depth: .3, bevelEnabled: false }), ivory, 0, RY - .05, gz + .02);
    const fr2 = new T.Shape(); fr2.moveTo(-GW / 2 + .3, .15); fr2.lineTo(GW / 2 - .3, .15); fr2.lineTo(0, GH - .35); fr2.closePath(); const h2 = new T.Path(); h2.moveTo(-GW / 2 + .5, .27); h2.lineTo(GW / 2 - .5, .27); h2.lineTo(0, GH - .58); h2.closePath(); fr2.holes.push(h2);
    add(new T.ExtrudeGeometry(fr2, { depth: .06, bevelEnabled: false }), gold, 0, RY - .05, gz + .04);
    medal(1.15, '#8C2A44', 0, RY + 2.5, gz + .16);
    const wt = K.text(['WEIYANG'], 512, 128, null, '#F6DC9A', '700 86px Georgia,serif'); add(new T.PlaneGeometry(3.4, .85), new T.MeshBasicMaterial({ map: wt, transparent: true, depthWrite: false }), 0, RY + .6, gz + .14);
    // 山牆兩側斜屋面
    for (const sgn of [-1, 1]) { const sl = box(GW / 2 * 1.25, .2, 2.6, roofM, sgn * GW / 4, RY + GH / 2, gz - 1.0); sl.rotation.z = -sgn * Math.atan2(GH, GW / 2) } }
  // 老虎窗
  for (const s of [-1, 1]) { const dx = s * 6.2, dz = FZ - 1.6, dy = RY + 1.1; box(2.0, 1.9, 1.6, ivory, dx, dy + .6, dz); const wq = win(dx, dy + .6, 1.0, 1.0, dz + .82, 0); wq.scale.setScalar(1);
    const dr = add(hipRoof(T, 2.4, 2.0, 1.0, 0), roofM, dx, dy + 1.55, dz); }
  // 外側一樓遮雨小屋簷
  /* v507 外側小屋簷會擋到垂掛旗，拿掉 */
  // 門廊：雙柱＋小山牆＋玻璃大門
  { const pz = FZ + 2.0; for (const x of [-2.25, 2.25]) { cyl(.36, H1 - .2, ivory, x, Y0 + (H1 - .2) / 2, pz, P, 20); cyl(.5, .3, gold, x, Y0 + .2, pz, P, 20); cyl(.5, .3, gold, x, Y1 - .3, pz, P, 20) }
    box(5.6, .5, 2.6, ivory, 0, Y1 + .05, pz - .9); box(5.7, .1, 2.7, gold, 0, Y1 + .32, pz - .9);
    const pr = new T.Shape(); pr.moveTo(-3.1, 0); pr.lineTo(3.1, 0); pr.lineTo(0, 1.3); pr.closePath(); add(new T.ExtrudeGeometry(pr, { depth: 2.8, bevelEnabled: false }), roofM, 0, Y1 + .35, pz - 2.25);
    const pf = new T.Shape(); pf.moveTo(-2.7, .12); pf.lineTo(2.7, .12); pf.lineTo(0, 1.05); pf.closePath(); add(new T.ExtrudeGeometry(pf, { depth: .08, bevelEnabled: false }), ivory, 0, Y1 + .35, pz + .58);
    /* v507 門口小屋頂：兩道金色斜邊線＋米白屋簷帶＋中央小金徽（線條克制，不亂） */ for (const e of [-1, 1]) { const rk = box(3.4, .14, .16, gold, e * 1.55, Y1 + .35 + .66, pz + .68); rk.rotation.z = -e * Math.atan2(1.3, 3.1) } box(6.3, .22, .2, ivory, 0, Y1 + .3, pz + .62); box(6.3, .07, .22, gold, 0, Y1 + .43, pz + .63); { const md = add(new T.TorusGeometry(.22, .05, 8, 24), gold, 0, Y1 + .8, pz + .7); add(new T.CircleGeometry(.2, 20), M('#8C2A44'), 0, Y1 + .8, pz + .69) }
    const door = win(0, Y0 + 1.95, 3.4, 3.6, FZ + .06, 0); door.children[1].userData.wyDoor = { w: 3.4, h: 3.6, isle: 3, see: true }; /* v508：門中間加了一條中線，原有兩條直線平均排到左右兩扇的正中間，四格一樣寬 */ for (const c of door.children) { const q = c.geometry && c.geometry.parameters; if (q && Math.abs(q.width - .06) < .001 && Math.abs(q.height - 3.6) < .001 && Math.abs(c.position.x) > .01) c.position.x = Math.sign(c.position.x) * 3.4 / 4 } for (let k = 0; k < 3; k++) box(5.2 - k * .5, .15, 1.0 - k * .25, marble, 0, Y0 + .075 + k * .15, pz + 1.8 - k * .3) }
  // 酒紅垂掛旗
  for (const s of [-1, 1]) { const x = s * 9.3; const c = document.createElement('canvas'); c.width = 256; c.height = 640; const g = c.getContext('2d'); const draw = im => { g.clearRect(0, 0, 256, 640); g.fillStyle = '#8C2A44'; g.beginPath(); g.moveTo(0, 0); g.lineTo(256, 0); g.lineTo(256, 540); g.lineTo(128, 640); g.lineTo(0, 540); g.closePath(); g.fill(); g.strokeStyle = '#F0CF86'; g.lineWidth = 14; g.beginPath(); g.moveTo(14, 0); g.lineTo(14, 534); g.lineTo(128, 624); g.lineTo(242, 534); g.lineTo(242, 0); g.stroke();
      if (im) { const cc = document.createElement('canvas'); cc.width = cc.height = 300; const gg = cc.getContext('2d'); gg.drawImage(im, 0, 0, 300, 300); gg.globalCompositeOperation = 'source-in'; gg.fillStyle = '#F6DC9A'; gg.fillRect(0, 0, 300, 300); g.drawImage(cc, -22, 70) } t.needsUpdate = true };
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; draw(null); const im = new Image(); im.onload = () => draw(im); im.src = 'office-logo-transparent.png';
    add(new T.PlaneGeometry(1.85, 4.6), new T.MeshStandardMaterial({ map: t, transparent: true, roughness: .6 }), x, Y1 + .3, FZ + .6); box(2.15, .14, .14, gold, x, Y1 + 2.6, FZ + .62); for (const e of [-1, 1]) add(new T.SphereGeometry(.12, 10, 8), gold, x + e * 1.1, Y1 + 2.6, FZ + .62) }
  // 屋頂旗
  flag('#8E44AD', 3.4, RY + 3.2, FZ - 6.5); flag('#8C2A44', 6.6, RY + 2.2, FZ - 5.5);
  // 前庭：方形米白花台＋紅玫瑰、綠籬、小圓樹、櫻花樹
  const planter = (x, z) => { box(2.2, 1.0, 2.2, ivory2, x, Y0 + .5, z); box(2.3, .1, 2.3, gold, x, Y0 + 1.02, z); for (let k = 0; k < 9; k++) add(new T.SphereGeometry(.34, 12, 8), M(['#D9264E', '#C81E46', '#F07A9A', '#FF9FB8'][k % 4], { roughness: .7 }), x - .7 + (k % 3) * .7, Y0 + 1.3 + (k % 2) * .15, z - .7 + Math.floor(k / 3) * .7) };
  for (const x of [-4.4, 4.4, -10.4, 10.4]) planter(x, FZ + 3.4);
  for (const s of [-1, 1]) { box(4.2, .8, .9, M('#3f9a4e', { roughness: .85 }), s * 7.4, Y0 + .4, FZ + 3.6); topiary(s * 6.6, FZ + 1.4, 1.0) }
  { const g = new T.Group(); g.position.set(15.0, Y0, FZ + 3.2); P.add(g); /* v509：櫻花樹往外移，不再插進房子 */ add(new T.CylinderGeometry(.28, .42, 3.4, 10), M('#7a5638'), 0, 1.7, 0, g);
    for (const [a, b, c, r, k] of [[0, 4.4, 0, 1.9, 0], [1.3, 3.9, .5, 1.4, 1], [-1.2, 4.0, -.3, 1.4, 2], [.3, 5.4, -.6, 1.3, 1], [-.5, 3.6, 1.1, 1.1, 0], [.9, 4.9, .9, 1.0, 2]]) add(new T.SphereGeometry(r, 16, 12), M(['#F6B3CC', '#F29BBE', '#FAC8DA'][k], { roughness: .8 }), a, b, c, g) }
  return P;
}

// ── 企業商務島（v506 逐項照參考圖重做）：中央細高玻璃塔（倒角）＋兩側較矮、往後退的大樓；深紫直柱夾亮燈辦公室玻璃、金框格密；
//    塔頂停機坪＋紫色直升機；塔身中段深藍 WEIYANG 招牌；一樓米白柱廊＋陽台欄杆＋暖光玻璃大門；右側高旗桿紫旗；
//    兩座大型紫粉繡球圓花台（金邊）；圓球樹、棕櫚樹、燈柱
function officeTex(T) { const c = document.createElement('canvas'); c.width = 256; c.height = 256; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#9A7AD8'); gr.addColorStop(1, '#6E4FB4'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
  g.fillStyle = '#FFE7B0'; g.fillRect(16, 22, 224, 18); g.fillStyle = '#5A3F9A'; g.fillRect(0, 196, 256, 60);
  g.fillStyle = '#F1DDFF'; g.beginPath(); g.roundRect(30, 150, 110, 46, 10); g.fill(); g.fillStyle = '#4C3388'; g.fillRect(170, 120, 60, 76); g.fillStyle = '#FFE7B0'; g.fillRect(180, 130, 40, 10);
  const rg = g.createRadialGradient(128, 60, 0, 128, 60, 140); rg.addColorStop(0, 'rgba(255,245,220,.8)'); rg.addColorStop(1, 'rgba(255,245,220,0)'); g.fillStyle = rg; g.fillRect(0, 0, 256, 256);
  const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t }
export function buildBusinessNew(T, target) {
  hideOld(target); const P = new T.Group(); P.name = 'wyBizNew'; target.add(P); const K = kit(T, P); const { M, add, box, cyl, gold, medal, flag, hydrangea, topiary } = K;
  const ivory = M('#FFF7EC', { roughness: .4 }), ivory2 = M('#F2E6D8', { roughness: .45 }), purple = M('#4A3383', { roughness: .35 }), purpleD = M('#33245E', { roughness: .4 });
  const roomM = new T.MeshBasicMaterial({ map: officeTex(T) });
  const marble = new T.MeshPhysicalMaterial({ color: '#F7F0F6', roughness: .2, clearcoat: .6 });
  plinth(K, T, 15, marble);
  const Y0 = .3, FZ = 1.2;
  // 一棟大樓的正面：深紫直柱＋亮燈辦公室＋密金框
  const facade = (x, z, w, h, y0, cols, rows, depth) => { box(w, h, depth, purple, x, y0 + h / 2, z - depth / 2);
    const cw = w / cols; for (let i = 0; i < cols; i++) { const px = x - w / 2 + cw * (i + .5); box(cw * .72, h - .4, .08, roomM, px, y0 + h / 2, z + .02) }
    for (let i = 0; i <= cols; i++) box(.22, h, .3, i % 2 ? purpleD : purple, x - w / 2 + i * cw, y0 + h / 2, z + .1);
    for (let i = 0; i <= cols; i++) box(.07, h, .08, gold, x - w / 2 + i * cw, y0 + h / 2, z + .27);
    for (let r = 0; r <= rows; r++) box(w, .08, .1, gold, x, y0 + r * h / rows, z + .2);
    box(w + .5, .5, depth + .5, purpleD, x, y0 + h + .25, z - depth / 2); box(w + .6, .12, depth + .6, gold, x, y0 + h + .52, z - depth / 2); box(w + .2, .25, depth + .2, ivory2, x, y0 + h + .7, z - depth / 2) };
  // v507 每層樓天花板的暖黃燈帶（像參考圖窗裡的黃光線條），穩定不閃
  const lampM = new T.MeshBasicMaterial({ color: '#FFD98A' });
  // 兩側較矮大樓（往後退、四角倒角）＋每層燈帶＋屋頂女兒牆與金柱頭
  for (const s of [-1, 1]) { const bx = s * 7.6, bz = FZ - 2.2, by = Y0 + 3.4, bh = 9.2; facade(bx, bz, 5.6, bh, by, 3, 3, 6); /* v510 陳老闆：兩側大樓下半部後面是空的（看得到穿透），補上一樓實心牆，正面柱廊不動 */ box(5.5, 3.4, 5.2, purpleD, bx, Y0 + 1.7, bz - 3.4);
    for (let r = 0; r < 3; r++) box(5.3, .1, .12, lampM, bx, by + (r + 1) * bh / 3 - .28, bz + .16);
    for (const sx of [-1, 1]) { const c = box(1.1, bh, 1.1, purple, bx + sx * 2.8, by + bh / 2, bz - .45); c.rotation.y = Math.PI / 4; box(.07, bh, .08, gold, bx + sx * 3.2, by + bh / 2, bz - .1) }
    const ty = by + bh + .95; box(6.0, .5, .25, ivory, bx, ty, bz + .1); box(6.1, .08, .3, gold, bx, ty + .28, bz + .1); for (const sx of [-1, 1]) { box(.35, .8, .35, ivory, bx + sx * 2.9, ty + .2, bz + .1); add(new T.SphereGeometry(.2, 12, 8), gold, bx + sx * 2.9, ty + .75, bz + .1) } }
  // 中央八角玻璃塔（平面朝前）：亮燈辦公室、頂點金柱、每層金環＋暖黃燈帶
  { const TZ = FZ - 2.6, TR = 3.5, TH = 13.8, ty = Y0 + 3.4, FL = 6; const A = Math.PI / 8;
    const core = add(new T.CylinderGeometry(TR, TR, TH, 8), purple, 0, ty + TH / 2, TZ); core.rotation.y = A;
    const ap = TR * Math.cos(Math.PI / 8), fw = 2 * TR * Math.sin(Math.PI / 8);
    for (let k = -3; k <= 3; k++) { const a = k * Math.PI / 4; const nx = Math.sin(a), nz = Math.cos(a);
      const g = new T.Group(); g.position.set(nx * (ap + .03), 0, TZ + nz * (ap + .03)); g.rotation.y = a; P.add(g);
      box(fw * .78, TH - .4, .05, roomM, 0, ty + TH / 2, 0, g); for (let r = 0; r < FL; r++) box(fw * .8, .1, .08, lampM, 0, ty + (r + 1) * TH / FL - .3, .04, g);
      box(.06, TH - .4, .08, gold, 0, ty + TH / 2, .06, g) }
    for (let k = 0; k < 8; k++) { const a = A + k * Math.PI / 4; box(.28, TH, .28, purpleD, Math.sin(a) * TR, ty + TH / 2, TZ + Math.cos(a) * TR); box(.09, TH, .09, gold, Math.sin(a) * (TR + .14), ty + TH / 2, TZ + Math.cos(a) * (TR + .14)) }
    for (let r = 0; r <= FL; r++) { const rg = add(new T.CylinderGeometry(TR + .12, TR + .12, .1, 8, 1, true), gold, 0, ty + r * TH / FL, TZ); rg.rotation.y = A }
    // 塔頂：三層往上收的八角冠頂（每層金邊）＋停機坪
    let cy = ty + TH; for (const [r, h, m] of [[TR + .35, .6, purpleD], [TR - .1, .5, ivory], [TR - .4, .45, purpleD]]) { const t = add(new T.CylinderGeometry(r, r + .1, h, 8), m, 0, cy + h / 2, TZ); t.rotation.y = A; const e = add(new T.CylinderGeometry(r + .14, r + .14, .1, 8), gold, 0, cy + h, TZ); e.rotation.y = A; cy += h }
    const padM = cyl(TR - .5, .25, purple, 0, cy + .12, TZ, P, 40); padM.name = 'wyBizPad'; const hr = add(new T.TorusGeometry(TR - .8, .1, 8, 60), gold, 0, cy + .27, TZ); hr.rotation.x = Math.PI / 2;
    const hc = document.createElement('canvas'); hc.width = hc.height = 256; const hg = hc.getContext('2d'); hg.strokeStyle = '#F6DC9A'; hg.lineWidth = 14; hg.beginPath(); hg.arc(128, 128, 100, 0, 7); hg.stroke(); hg.fillStyle = '#F6DC9A'; hg.font = '700 140px Georgia,serif'; hg.textAlign = 'center'; hg.textBaseline = 'middle'; hg.fillText('H', 128, 136); const ht = new T.CanvasTexture(hc); ht.colorSpace = T.SRGBColorSpace;
    const hp = add(new T.PlaneGeometry(4.4, 4.4), new T.MeshBasicMaterial({ map: ht, transparent: true, depthWrite: false }), 0, cy + .26, TZ); hp.rotation.x = -Math.PI / 2;
    /* 直升機改用上一版的精緻直升機（在 cleanupIsleLux 搬過來） */
    // 塔身中段：放大的深藍 WEIYANG 招牌（米白框＋粗金邊）
    const sz = TZ + ap + .25, sy = ty + 2.6; box(6.4, 3.6, .5, ivory, 0, sy, sz); box(5.9, 3.1, .1, M('#1F2B5C', { roughness: .4 }), 0, sy, sz + .27);
    for (const yy of [1.6, -1.6]) box(6.1, .16, .14, gold, 0, sy + yy, sz + .3); for (const xx of [-3.0, 3.0]) box(.16, 3.3, .14, gold, xx, sy, sz + .3);
    medal(1.25, '#1F2B5C', 0, sy, sz + .36) }
  // 一樓：米白柱廊＋陽台欄杆＋暖光玻璃大門
  { const pz = FZ + 2.2; box(16, 3.4, 4.2, ivory, 0, Y0 + 1.7, FZ - .2); box(16.4, .35, 4.6, ivory2, 0, Y0 + 3.55, FZ - .2); box(16.5, .1, 4.7, gold, 0, Y0 + 3.76, FZ - .2);
    box(9.6, .5, 2.4, ivory, 0, Y0 + 3.6, pz - .3); for (let k = 0; k <= 18; k++) cyl(.06, .6, ivory, -4.5 + k * .5, Y0 + 4.15, pz + .8, P, 8); box(9.4, .1, .14, gold, 0, Y0 + 4.48, pz + .8);
    for (const x of [-4.2, -2.6, 2.6, 4.2]) { cyl(.36, 3.4, ivory, x, Y0 + 1.7, pz + .4, P, 20); cyl(.5, .3, gold, x, Y0 + .15, pz + .4, P, 20); cyl(.5, .3, gold, x, Y0 + 3.3, pz + .4, P, 20) }
    const warm = new T.MeshPhysicalMaterial({ color: '#F6DEAA', roughness: .1, clearcoat: 1, emissive: '#D69A44', emissiveIntensity: .6 });
    box(4.2, 2.9, .12, warm, 0, Y0 + 1.45, FZ + 1.92).userData.wyDoor = { w: 4.2, h: 2.9, isle: 4 }; for (const x of [-2.1, -1.05, 1.05, 2.1]) box(.12, 3.0, .2, gold, x, Y0 + 1.5, FZ + 2.0); /* v508：配合中線，直線改成平均四格 */ box(4.4, .14, .2, gold, 0, Y0 + 2.95, FZ + 2.0);
    for (const s of [-1, 1]) { box(2.2, 2.6, .1, roomM, s * 6.4, Y0 + 1.6, FZ + 1.92); box(2.4, .1, .14, gold, s * 6.4, Y0 + 2.95, FZ + 1.98) }
    for (let k = 0; k < 3; k++) box(6.4 - k * .5, .15, 1.1 - k * .25, marble, 0, Y0 + .075 + k * .15, pz + 1.6 - k * .3) }
  // 右側高旗桿＋紫旗
  { const fx = 4.6, fz = FZ - 4.5; cyl(.09, 8, gold, fx, Y0 + 13 + 4, fz, P, 10); add(new T.SphereGeometry(.2, 12, 8), gold, fx, Y0 + 21.1, fz); const f = flag('#6A3FB0', fx, Y0 + 17.0, fz); }
  // 大型紫粉繡球圓花台、圓球樹、棕櫚樹
  for (const s of [-1, 1]) { const g = hydrangea(s * 5.8, FZ + 6.0, ['#9B6FE0', '#E58AD6', '#B79BE0', '#F2B9D6', '#7E5BD0'], 1.35, '#4A3383');
    topiary(s * 10.6, FZ + 2.2, 1.35); topiary(s * 9.8, FZ + 6.8, 1.15); }
  const palmT = (x, z, s = 1) => { const g = new T.Group(); g.position.set(x, Y0, z); g.scale.setScalar(s); P.add(g); for (let k = 0; k < 5; k++) add(new T.CylinderGeometry(.24 - k * .02, .27 - k * .02, .95, 10), M('#A27A50'), Math.sin(k * .3) * .15, .48 + k * .9, 0, g);
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; const lf = add(new T.ConeGeometry(.55, 2.6, 4), M('#43B05C', { roughness: .7 }), Math.sin(a) * 1.1, 4.6, Math.cos(a) * 1.1, g); lf.rotation.set(Math.cos(a) * 1.25, 0, -Math.sin(a) * 1.25) } };
  palmT(-12.8, FZ - 1.5, 1.05); palmT(12.8, FZ - 1.5, 1.05);
  return P;
}

// 新建築上線後，把 v499 島嶼升級裡「貼著舊建築」的裝飾藏起來（花箱、拱門、柱飾、屋頂欄杆、舊停機坪、燈帶），島上其他東西不動
export function cleanupIsleLux(T, scene, xy, which = [1, 2, 3, 4]) {
  const Z = { 1: [11, -8, 10], 2: [12, -10, 8], 3: [8, -10, 14], 4: [10, -8, 14] };
  const root = scene.getObjectByName('wyIsleLux'); if (!root) return -1; root.updateMatrixWorld(true); const v = new T.Vector3(); let n = 0;
  const visit = o => { if (o.children.length && o.position.length() < 1 && !o.isMesh) { o.children.slice().forEach(visit); return }
    o.getWorldPosition(v); for (const i of which) { const [hx, z0, z1] = Z[i]; const dx = v.x - xy[i][0], dz = v.z - xy[i][1]; if (Math.abs(dx) < hx && dz > z0 && dz < z1) { o.visible = false; n++; break } } };
  /* v507 企業島：沿用上一版精緻直升機（玻璃座艙、旋翼會轉），搬到新塔頂停機坪；舊停機坪本身藏起來 */
  const oh = root.getObjectByName('wyOldHeli'); const nb = scene.getObjectByName('wyBizNew');
  if (oh && nb && which.includes(4)) { const pad = nb.getObjectByName('wyBizPad'); if (pad) { const v2 = new T.Vector3(); pad.updateMatrixWorld(true); pad.getWorldPosition(v2); oh.position.set(v2.x, v2.y + .05, v2.z) } oh.children.forEach(ch => { if (ch.isMesh) ch.visible = false }); oh.userData.keep = 1 }
  root.children.slice().forEach(o => { if (!o.userData.keep) visit(o) }); return n;
}
