// v511 預覽：醫療島室內（綠色系、清新煥然一新、動森可愛＋先進器材小動畫）
// 不加照片圖檔：只有一張 256×256 小壁紙圖重複貼；器材全部用形狀＋顏色；動畫只在畫面上看得到時才動
export function apply(T, scene) {
  if (!scene || scene.userData.wyCozy) return; scene.userData.wyCozy = 1;
  const root = new T.Group(); root.name = 'wyMedCozy'; scene.add(root);
  const M = (c, r = .8, m = 0, e) => { const o = new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m }); if (e) { o.emissive = new T.Color(e); o.emissiveIntensity = .9 } return o };
  const mint = M('#8FD6BE'), mint2 = M('#BDEBDB'), cream = M('#FFF6E6'), sage = M('#A9CDA0'), butter = M('#F6E2A6'), peach = M('#F6C9A8'),
    gold = M('#D8B46A', .35, .45), steel = M('#DCE8E6', .4, .3), glow = M('#7FF0C8', .5, 0, '#5BE3B0'), red = M('#F28B8B', .6, 0, '#F06A6A'), drip = new T.MeshStandardMaterial({ color: '#CFF3FF', transparent: true, opacity: .75, roughness: .2 });
  const add = (g, m, x, y, z, p = root) => { const o = new T.Mesh(g, m); o.position.set(x, y, z); p.add(o); return o };
  const cap = (r, len, m, x, y, z, axis, p) => { const o = add(new T.CapsuleGeometry(r, len, 8, 18), m, x, y, z, p); if (axis === 'x') o.rotation.z = Math.PI / 2; if (axis === 'z') o.rotation.x = Math.PI / 2; return o };
  const sph = (r, m, x, y, z, p) => add(new T.SphereGeometry(r, 18, 12), m, x, y, z, p);
  const cyl = (rt, rb, h, m, x, y, z, p) => add(new T.CylinderGeometry(rt, rb, h, 28), m, x, y, z, p);
  const bb = new T.Box3(), c = new T.Vector3(), s = new T.Vector3(), hsl = {};
  const walls = [], rugHide = []; let rug = null;
  scene.traverse(o => {
    if (!o.isMesh || (o.parent && o.parent.name === 'wyMedCozy')) return; const m = o.material; if (!m || Array.isArray(m)) return;
    bb.setFromObject(o); bb.getCenter(c); bb.getSize(s);
    if (s.y > 3.5 && Math.min(s.x, s.z) < .7 && Math.max(s.x, s.z) > 3 && !m.transparent && !m.map && m.color) { m.color.getHSL(hsl, T.SRGBColorSpace); if (hsl.l > .72) walls.push(o) }
    if ((o.geometry.type === 'CylinderGeometry' || o.geometry.type === 'TorusGeometry' || o.geometry.type === 'RingGeometry') && s.y < .25 && s.x > 4 && s.x < 9.5 && Math.abs(c.x) < 3) { rugHide.push(o); if (!rug || s.x > rug.r * 2) rug = { x: c.x, z: c.z, r: s.x / 2, y: bb.max.y } }
  });
  // 壁紙：薄荷奶油底＋水彩尤加利葉、小嫩芽，清新、像重新出發（沒有十字、沒有醫院感）
  const wc = document.createElement('canvas'); wc.width = wc.height = 256; const g = wc.getContext('2d');
  const bg = g.createLinearGradient(0, 0, 0, 256); bg.addColorStop(0, '#F1FAF5'); bg.addColorStop(1, '#FBF7EC'); g.fillStyle = bg; g.fillRect(0, 0, 256, 256);
  const leafSprig = (x, y, a, col) => { g.save(); g.translate(x, y); g.rotate(a); g.strokeStyle = '#9CC5A8'; g.lineWidth = 1.6; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -46); g.stroke();
    for (let k = 0; k < 4; k++) { for (const sd of [-1, 1]) { g.fillStyle = col; g.globalAlpha = .85; g.beginPath(); g.ellipse(sd * 7, -8 - k * 11, 6.5, 5, 0, 0, 7); g.fill() } } g.globalAlpha = 1; g.restore() };
  [[40, 90, -.3, '#9FD0B0'], [150, 70, .4, '#CDE8D3'], [215, 180, -.2, '#9FD0B0'], [90, 220, .3, '#CDE8D3'], [10, 200, .1, '#D6EBD9']].forEach(a => leafSprig(...a));
  g.fillStyle = '#F7E6B8'; for (const [x, y] of [[110, 40], [200, 110], [60, 160], [170, 240], [245, 20]]) { g.globalAlpha = .7; g.beginPath(); g.arc(x, y, 3, 0, 7); g.fill() } g.globalAlpha = 1;
  const wt = new T.CanvasTexture(wc); wt.colorSpace = T.SRGBColorSpace; wt.wrapS = wt.wrapT = T.RepeatWrapping;
  for (const w of walls) { bb.setFromObject(w); bb.getSize(s); const [ra, rb] = [Math.max(s.x, s.z) / 2.4, s.y / 2.4]; const gq = w.geometry.clone(), uv = gq.attributes.uv; if (uv) { for (let q = 0; q < uv.count; q++) uv.setXY(q, uv.getX(q) * ra, uv.getY(q) * rb) } w.geometry = gq; const t = wt; /* 共用同一張壁紙圖，用 UV 重複，省記憶體 */ w.material = new T.MeshStandardMaterial({ map: t, roughness: .9 }) }
  // 白色家具改成薄荷、奶油、淺綠、奶油黃（不要太多白）
  const PAL = ['#CDEFE2', '#FFF0D6', '#D7EBCB', '#F6E6B4', '#E6F4EC'].map(x => new T.Color(x)); let pi = 0; const done = new Map();
  scene.traverse(o => {
    if (!o.isMesh || walls.includes(o) || (o.parent && o.parent.name === 'wyMedCozy')) return; const m = o.material; if (!m || Array.isArray(m) || m.map || !m.color || m.transparent) return;
    bb.setFromObject(o); bb.getSize(s); if (s.y < .1 && (s.x > 15 || s.z > 15)) return;
    m.color.getHSL(hsl, T.SRGBColorSpace); if (hsl.l < .86 || (hsl.h > .5 && hsl.h < .7 && hsl.s > .2)) return;
    if (!done.has(m)) { const n = m.clone(); n.color.copy(PAL[pi++ % PAL.length]); done.set(m, n) } o.material = done.get(m);
  });
  const R = new T.Box3(); for (const w of walls) R.union(bb.setFromObject(w)); const cx = rug ? rug.x : (R.min.x + R.max.x) / 2, cz = rug ? rug.z : (R.min.z + R.max.z) / 2;
  const X0 = R.min.x, X1 = R.max.x, Z0 = R.min.z;
  // 中間：原本圓地毯拿掉，改成事務所徽章的稻穗環（上方開口）＋中間一條金色心電圖線＝醫療×德威陽
  if (rug) { const inv = new T.MeshBasicMaterial({ visible: false }); for (const o of rugHide) o.material = inv;
    const Rr = 2.9, yy = .13, grainM = [M('#A9D4B2', .9), M('#D8B46A', .45, .35), M('#C3E2C6', .9)], gg = new T.SphereGeometry(.3, 14, 8);
    for (const sd of [-1, 1]) { // 左右兩道稻穗，從下方往上彎，頂端留開口
      for (let k = 0; k < 15; k++) { const a = -Math.PI / 2 + sd * (.06 + k * .18); const px = rug.x + Math.cos(a) * Rr, pz = rug.z - Math.sin(a) * Rr;
        for (const off of [-1, 1]) { const g = add(gg, grainM[(k + (off > 0 ? 1 : 0)) % 3], px + Math.cos(a) * off * .26, yy, pz - Math.sin(a) * off * .26); g.scale.set(1.25, .08, .62); g.rotation.y = a + sd * off * .55 } }
      const st = add(new T.TorusGeometry(Rr, .05, 6, 60, 15 * .18), M('#B9935A', .5, .3), rug.x, yy, rug.z); st.rotation.x = -Math.PI / 2; st.rotation.z = sd > 0 ? -Math.PI / 2 + .06 : -Math.PI / 2 - .06 - 15 * .18 }
    // 心電圖線（金色細管），橫過環中央
    const ys = [0, 0, .5, -.9, 1.5, -.3, 0, 0], xs = [-2.3, -1.1, -.75, -.4, 0, .35, .7, 2.3];
    const pts = xs.map((x, i) => new T.Vector3(rug.x + x, yy + .03, rug.z - ys[i]));
    for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[i], p1 = pts[i + 1], d = p1.clone().sub(p0), len = d.length(); const seg = add(new T.CylinderGeometry(.07, .07, len, 8), M('#D8B46A', .35, .45), (p0.x + p1.x) / 2, p0.y, (p0.z + p1.z) / 2); seg.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize()); sph(.07, M('#D8B46A', .35, .45), p1.x, p1.y, p1.z) }
    // 檢查角落：圓角長方形薄荷墊（器材底座）
    const mw = 3.4, mh = 5.6, rr = .5, sh = new T.Shape(); sh.moveTo(-mw / 2 + rr, -mh / 2); sh.lineTo(mw / 2 - rr, -mh / 2); sh.quadraticCurveTo(mw / 2, -mh / 2, mw / 2, -mh / 2 + rr); sh.lineTo(mw / 2, mh / 2 - rr); sh.quadraticCurveTo(mw / 2, mh / 2, mw / 2 - rr, mh / 2); sh.lineTo(-mw / 2 + rr, mh / 2); sh.quadraticCurveTo(-mw / 2, mh / 2, -mw / 2, mh / 2 - rr); sh.lineTo(-mw / 2, -mh / 2 + rr); sh.quadraticCurveTo(-mw / 2, -mh / 2, -mw / 2 + rr, -mh / 2);
    const mg = new T.ExtrudeGeometry(sh, { depth: .04, bevelEnabled: true, bevelThickness: .02, bevelSize: .06, bevelSegments: 2 }); mg.rotateX(-Math.PI / 2); add(mg, M('#BDE3CC', .95), cx + 4.7, .1, cz + .4) }
  const anim = [];
  // 先進器材 1：圓胖的 MRI 掃描環＋會慢慢滑進滑出的床（右前方）
  { const G = new T.Group(); G.name = 'wyMRI'; G.userData.medicalAction = 'books'; /* v523 書櫃的互動搬到白色圓環 */G.position.set(cx + 4.7, .06, cz - 2.0); G.rotation.y = 0; G.scale.setScalar(.8); root.add(G);
    const ring = add(new T.TorusGeometry(1.15, .42, 18, 40), cream, 0, 1.55, 0, G); add(new T.TorusGeometry(1.16, .07, 10, 40), glow, 0, 1.55, .43, G);
    cyl(.75, .9, .5, mint, 0, .25, 0, G).scale.set(1.4, 1, .9);
    const bedBase = cap(.22, 2.2, mint, 0, .9, 1.3, 'z', G); bedBase.scale.set(2.2, 1, 1);
    const bed = cap(.16, 1.9, mint2, 0, 1.14, 1.3, 'z', G); bed.scale.set(2.3, 1, 1); anim.push(t => { bed.position.z = 1.3 - (Math.sin(t * .5) * .5 + .5) * 1.1 });
    for (const z of [.4, 2.2]) cyl(.08, .08, .7, steel, 0, .45, z, G) }
  // 先進器材 2：點滴架，點滴一滴一滴落下（沙發旁）
  { const x = cx + 6.4, z = cz - .4; cyl(.05, .05, 2.9, steel, x, 1.45, z); cyl(.45, .45, .08, steel, x, .05, z); cap(.03, .7, steel, x, 2.85, z, 'x');
    const bag = cap(.22, .35, drip, x + .3, 2.45, z); cyl(.012, .012, .9, steel, x + .3, 1.85, z);
    const d = sph(.05, drip, x + .3, 1.4, z); anim.push(t => { const k = (t * .8) % 1; d.position.y = 1.4 - k * .5; d.scale.setScalar(k < .9 ? 1 : 0) }) }
  // 先進器材 3：小推車監測儀，螢幕綠燈一閃一閃（MRI 旁）
  { const x = cx + 3.0, z = cz - .6; for (const [dx, dz] of [[-.35, -.25], [.35, -.25], [-.35, .25], [.35, .25]]) sph(.07, gold, x + dx, .07, z + dz);
    add(new T.BoxGeometry(.95, .08, .75), mint, x, .3, z); cyl(.05, .05, .9, steel, x, .75, z); add(new T.BoxGeometry(.95, .08, .75), mint, x, 1.2, z);
    const scr = add(new T.BoxGeometry(.85, .62, .12), cream, x, 1.62, z); scr.rotation.y = .6;
    const face = add(new T.PlaneGeometry(.7, .48), M('#1F4D45', .6, 0, '#163A33'), x + Math.sin(-.5) * -.07 + .03, 1.62, z + .07); face.rotation.y = .6; face.position.set(x + .05, 1.62, z + .07);
    const led = sph(.06, glow, x + .32, 1.98, z + .05); anim.push(t => { led.visible = (t * 1.6) % 1 < .55 }) }
  // 小盆栽（尤加利）＋圓框
  for (const [x, z] of [[cx - 4.6, cz - 5.2], [cx + 4.4, cz - 5.2]]) { cyl(.42, .32, .7, peach, x, .35, z); for (const [dx, dy] of [[0, 1.3], [.25, 1.6], [-.22, 1.55]]) { const l = sph(.38, sage, x + dx, dy, z); l.scale.set(.8, 1.2, .8) } }
  // 小動畫：只在這個房間被畫的時候才更新
  const t0 = performance.now(); root.onBeforeRender = () => { }; const tick = () => { const t = (performance.now() - t0) / 1000; for (const f of anim) f(t) };
  const probe = add(new T.SphereGeometry(.001, 3, 2), new T.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }), 0, 0, 0); probe.frustumCulled = false; probe.onBeforeRender = tick;
  return root;
}
