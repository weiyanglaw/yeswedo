// v511 預覽：家庭島室內改成溫馨可愛的動森風（陳老闆 11-22）
// 原則：不加照片圖檔；只有一張 256×256 的小花壁紙圖（重複貼），其餘都是圓滾滾的形狀＋顏色
// 原本家具的點擊範圍保留（只是不畫出來），互動不變
export function cozyFamily(T, scene) {
  if (!scene || scene.userData.wyCozy) return; scene.userData.wyCozy = 1;
  const root = new T.Group(); root.name = 'wyFamCozy'; scene.add(root);
  const M = (c, r = .8, m = 0) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  const berry = M('#C9667A'), cream = M('#FFF4E6'), blush = M('#F6C5CF'), sage = M('#A9CDA0'), mustard = M('#F2C66D'),
    sky = M('#BFDDF0'), oak = M('#C99B6D'), gold = M('#D8B46A', .35, .45), leaf = M('#6FB36A'), leaf2 = M('#8CCB7E'),
    pot = M('#E8A27C'), ginger = M('#F0A35E'), white = M('#FFFDF8'), nose = M('#E46D7A'), dark = M('#4A3A35');
  const add = (g, m, x, y, z, p = root) => { const o = new T.Mesh(g, m); o.position.set(x, y, z); p.add(o); return o };
  const cap = (r, len, m, x, y, z, axis, p) => { const o = add(new T.CapsuleGeometry(r, len, 8, 18), m, x, y, z, p); if (axis === 'x') o.rotation.z = Math.PI / 2; if (axis === 'z') o.rotation.x = Math.PI / 2; return o };
  const sph = (r, m, x, y, z, sx = 1, sy = 1, sz = 1, p) => { const o = add(new T.SphereGeometry(r, 18, 12), m, x, y, z, p); o.scale.set(sx, sy, sz); return o };
  const cyl = (rt, rb, h, m, x, y, z, p) => add(new T.CylinderGeometry(rt, rb, h, 28), m, x, y, z, p);
  const box = (w, h, d, m, x, y, z, p) => add(new T.BoxGeometry(w, h, d), m, x, y, z, p);

  // 舊家具：不畫出來，但點擊範圍保留
  const hide = o => { if (!o.isMesh) return; const f = m => { const c = m.clone(); c.visible = false; return c }; o.material = Array.isArray(o.material) ? o.material.map(f) : f(o.material) };
  const bb = new T.Box3(), c = new T.Vector3(), s = new T.Vector3();
  const walls = [];
  scene.traverse(o => {
    if (!o.isMesh || o.parent === root || (o.parent && o.parent.name === 'wyFamCozy')) return;
    bb.setFromObject(o); bb.getCenter(c); bb.getSize(s);
    if (o.userData.familyAction === 'sofa' && o.geometry.type !== 'CylinderGeometry') hide(o);                 // 舊 L 型沙發
    if ([-8, -6.6, -5.2].some(x => Math.abs(c.x - x) < .12) && c.z > -1.95 && c.z < -1.2 && c.y < 1.45 && s.y < 1.0) hide(o);   // 舊方塊餐椅
    if (o.geometry.type === 'BoxGeometry' && s.y < .12 && s.x > 5 && s.z > 4 && c.x > -6 && c.x < 5 && c.z > -.5 && c.z < 7) hide(o);   // 舊的長方形白地毯
    if (s.y > 4 && Math.min(s.x, s.z) < .7 && Math.max(s.x, s.z) > 8 && (Math.abs(c.z + 9) < .8 || Math.abs(Math.abs(c.x) - 11.8) < .8)) walls.push(o);  // 牆面
  });

  // 白色家具改成溫暖的彩色（白的東西不要太多）：只改沒有貼圖的淺色家具，玻璃、牆、地板不動
  const PAL = ['#F5DFA8', '#F6D3C5', '#CFE3C4', '#F3C1CB', '#E9CFAE'].map(x => new T.Color(x)); let pi = 0; const done = new Map(); const hsl = {};
  scene.traverse(o => {
    if (!o.isMesh || walls.includes(o) || (o.parent && o.parent.name === 'wyFamCozy')) return; const m = o.material; if (!m || Array.isArray(m) || m.map || !m.color || m.visible === false || m.transparent) return;
    bb.setFromObject(o); bb.getSize(s); if (s.y < .1 && (s.x > 15 || s.z > 15)) return;   // 地板
    m.color.getHSL(hsl, T.SRGBColorSpace); if (hsl.l < .86 || (hsl.h > .45 && hsl.h < .7)) return;            // 只動很白、不是藍色玻璃的
    if (!done.has(m)) { const n = m.clone(); n.color.copy(PAL[pi++ % PAL.length]); done.set(m, n) } o.material = done.get(m);
  });
  // 小花壁紙（一張 256 小圖重複貼，約 0.3 MB）
  const wc = document.createElement('canvas'); wc.width = wc.height = 256; const g = wc.getContext('2d');
  g.fillStyle = '#FFF3EA'; g.fillRect(0, 0, 256, 256);
  g.fillStyle = '#FBE3E3'; for (let i = 0; i < 256; i += 32) g.fillRect(i, 0, 12, 256);   // 淡粉直條
  const flower = (x, y, r, col) => { g.fillStyle = col; for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; g.beginPath(); g.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, r * .78, 0, 7); g.fill() } g.fillStyle = '#F7D27A'; g.beginPath(); g.arc(x, y, r * .62, 0, 7); g.fill() };
  const sprig = (x, y) => { g.fillStyle = '#B9D6A8'; g.beginPath(); g.ellipse(x - 6, y + 2, 7, 3.5, -.6, 0, 7); g.fill(); g.beginPath(); g.ellipse(x + 6, y + 2, 7, 3.5, .6, 0, 7); g.fill() };
  [[48, 52, '#F2A7B5'], [176, 116, '#F6C27E'], [96, 196, '#E89BB0'], [224, 236, '#9ECBE8'], [16, 140, '#F6C27E'], [148, 20, '#9ECBE8']].forEach(([x, y, col]) => { sprig(x, y + 12); flower(x, y, 7, col) });
  const wt = new T.CanvasTexture(wc); wt.colorSpace = T.SRGBColorSpace; wt.wrapS = wt.wrapT = T.RepeatWrapping; wt.anisotropy = 4;
  for (const w of walls) {
    bb.setFromObject(w); bb.getSize(s);
    const [ra, rb] = [Math.max(s.x, s.z) / 2.2, s.y / 2.2]; const gq = w.geometry.clone(), uv = gq.attributes.uv; if (uv) { for (let q = 0; q < uv.count; q++) uv.setXY(q, uv.getX(q) * ra, uv.getY(q) * rb) } w.geometry = gq; const t = wt; /* 共用同一張壁紙圖，用 UV 重複，省記憶體 */
    w.material = new T.MeshStandardMaterial({ map: t, roughness: .9 });
  }
  // 牆腳木飾板（溫暖感）
  for (const w of walls) { bb.setFromObject(w); bb.getCenter(c); bb.getSize(s); const alongX = s.x > s.z; const b = box(alongX ? s.x : .1, .7, alongX ? .1 : s.z, oak, c.x + (alongX ? 0 : (c.x > 0 ? -s.x / 2 - .06 : s.x / 2 + .06)), .35, c.z + (alongX ? s.z / 2 + .06 : 0)); b.userData.cozy = 1 }

  // 圓滾滾 L 型沙發（酒紅莓果色為主，坐墊、抱枕多色可愛；位置與原本相同）
  const rose = M('#F3B6C2'), peach = M('#F6C9A8');
  box(6.7, .5, 1.7, berry, -.7, .55, .75); cap(.36, 6.2, berry, -.7, .55, 1.55, 'x');
  [[-2.9, rose], [-.7, peach], [1.5, rose]].forEach(([x, m]) => { const k = cap(.27, 1.55, m, x, 1.0, .85, 'x'); k.scale.set(1, 1, 2.7) });
  cap(.46, 6.2, berry, -.7, 1.45, -.12, 'x');
  [[-2.9, peach], [-.7, rose], [1.5, peach]].forEach(([x, m]) => { const b = cap(.22, 1.35, m, x, 1.35, .28, 'x'); b.scale.set(1, 1.35, 1); b.rotation.x = -.25 });
  box(1.7, .5, 4.3, berry, 3.37, .55, 2.05); cap(.36, 3.9, berry, 2.58, .55, 2.05, 'z');
  [[1.3, peach], [2.9, rose]].forEach(([z, m]) => { const k = cap(.27, 1.3, m, 3.27, 1.0, z, 'z'); k.scale.set(2.7, 1, 1) });
  cap(.46, 4.2, berry, 4.15, 1.45, 2.05, 'z');
  cap(.42, 1.3, berry, -4.15, 1.0, .75, 'z'); cap(.42, 1.3, berry, 3.37, 1.0, 4.3, 'x');
  [[-3.6, .62, mustard], [-1.6, .62, sage], [.5, .62, sky], [3.75, 1.4, mustard], [3.75, 3.3, sage]].forEach(([x, z, m], i) => { const p = cap(.19, .3, m, x, 1.3, z, i < 3 ? 'x' : 'z'); p.scale.set(1, 1.45, .55); p.rotation[i < 3 ? 'x' : 'z'] += i < 3 ? -.3 : .3 });
  for (const [x, z] of [[-3.9, 1.5], [-3.9, 0], [2.6, 0], [4.0, 4.1], [2.8, 4.1]]) sph(.12, gold, x, .16, z, 1, 1.2, 1);

  // 圓形花邊地毯（只留這一塊，原本的長方形白地毯不畫）：奶油底＋彩色花瓣邊＋中間一圈小花
  cyl(3.25, 3.25, .04, M('#FBE9C8'), -.4, .03, 3.15); cyl(2.55, 2.55, .045, M('#F7D4D9'), -.4, .04, 3.15); cyl(1.6, 1.6, .05, M('#FBE9C8'), -.4, .05, 3.15);
  const pet = [berry, mustard, sage, sky, M('#F29A7A')];
  for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; cyl(.34, .34, .035, pet[k % 5], -.4 + Math.cos(a) * 3.25, .028, 3.15 + Math.sin(a) * 3.25) }
  for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; cyl(.2, .2, .03, pet[(k + 2) % 5], -.4 + Math.cos(a) * 2.05, .065, 3.15 + Math.sin(a) * 2.05) }

  // 圓圓的餐椅（取代方塊椅）
  [[-8, blush], [-6.6, sage], [-5.2, mustard]].forEach(([x, m]) => {
    cyl(.07, .07, .62, gold, x, .31, -1.7); sph(.45, m, x, .78, -1.7, 1, .38, 1); cap(.22, .55, m, x, 1.32, -1.32, 'x').scale.set(1, 1.4, .9);
  });

  // 小盆栽（圓圓的樹）
  for (const [x, z] of [[10.4, 2.6], [-10.3, 1.2]]) { cyl(.5, .38, .8, pot, x, .4, z); sph(.75, leaf, x, 1.55, z); sph(.55, leaf2, x + .35, 1.95, z + .15); sph(.5, leaf, x - .3, 2.0, z - .1) }

  // 牆上圓形相框（Logo 兩旁，不放照片）
  for (const [x, m] of [[-4.6, blush], [4.6, sky], [-5.7, mustard], [5.7, sage]]) {
    const y = Math.abs(x) > 5 ? 3.6 : 4.6, r = Math.abs(x) > 5 ? .38 : .55;
    const f = add(new T.TorusGeometry(r, .07, 10, 28), gold, x, y, -8.8); const inner = add(new T.CircleGeometry(r - .02, 28), m, x, y, -8.84);
  }
  return root;
}
