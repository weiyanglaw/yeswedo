// v511 預覽：商務島室內（紫色系、未來科技感、動森可愛；不寫 AI 字樣）
// 只有一張 256×256 小壁紙圖；水晶、地球、飛機全用形狀做；動畫只在畫面看得到房間時才動
export function apply(T, scene) {
  if (!scene || scene.userData.wyCozy) return; scene.userData.wyCozy = 1;
  const root = new T.Group(); root.name = 'wyBizFuture'; scene.add(root);
  const M = (c, r = .7, m = 0, e, ei = .9) => { const o = new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m }); if (e) { o.emissive = new T.Color(e); o.emissiveIntensity = ei } return o };
  const add = (g, m, x, y, z, p = root) => { const o = new T.Mesh(g, m); o.position.set(x, y, z); p.add(o); return o };
  const gold = M('#D8B46A', .35, .5), lilac = M('#B9A3E3', .6), deep = M('#6E57B5', .55, .1), glow = M('#C9B6FF', .4, 0, '#9C7CFF', 1.2), cyan = M('#BFEFFF', .4, 0, '#7FD8FF', 1);
  const bb = new T.Box3(), c = new T.Vector3(), s = new T.Vector3(), hsl = {}; const walls = [];
  scene.traverse(o => {
    if (!o.isMesh || o.parent?.name === 'wyBizFuture') return; const m = o.material; if (!m || Array.isArray(m)) return;
    bb.setFromObject(o); bb.getSize(s);
    if (s.y > 3.5 && Math.min(s.x, s.z) < .7 && Math.max(s.x, s.z) > 5 && !m.transparent && !m.map && m.color) { m.color.getHSL(hsl, T.SRGBColorSpace); if (hsl.l > .7) walls.push(o) }
  });
  const R = new T.Box3(); for (const w of walls) R.union(bb.setFromObject(w)); const cx = (R.min.x + R.max.x) / 2, Z0 = R.min.z;
  // 壁紙：淡薰衣草底＋細細的電路線與發光小節點（未來科技感，但淺色）
  const wc = document.createElement('canvas'); wc.width = wc.height = 256; const g = wc.getContext('2d');
  const bg = g.createLinearGradient(0, 0, 0, 256); bg.addColorStop(0, '#EEE8FB'); bg.addColorStop(1, '#E4DBF7'); g.fillStyle = bg; g.fillRect(0, 0, 256, 256);
  g.strokeStyle = 'rgba(140,110,220,.38)'; g.lineWidth = 2; g.lineCap = 'round';
  const paths = [[[0, 40], [70, 40], [95, 65], [180, 65]], [[256, 40], [215, 40], [180, 65]], [[30, 256], [30, 170], [60, 140], [130, 140]], [[130, 140], [160, 110], [256, 110]], [[0, 210], [90, 210], [120, 240], [256, 240]], [[200, 0], [200, 30], [215, 40]], [[160, 256], [160, 200], [190, 170], [256, 170]]];
  for (const p of paths) { g.beginPath(); g.moveTo(...p[0]); for (const q of p.slice(1)) g.lineTo(...q); g.stroke() }
  for (const [x, y] of [[180, 65], [130, 140], [30, 170], [90, 210], [215, 40], [190, 170], [70, 40]]) { const rg = g.createRadialGradient(x, y, 0, x, y, 9); rg.addColorStop(0, 'rgba(190,160,255,1)'); rg.addColorStop(1, 'rgba(190,160,255,0)'); g.fillStyle = rg; g.beginPath(); g.arc(x, y, 9, 0, 7); g.fill(); g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(x, y, 2.6, 0, 7); g.fill() }
  const wt = new T.CanvasTexture(wc); wt.colorSpace = T.SRGBColorSpace; wt.wrapS = wt.wrapT = T.RepeatWrapping;
  for (const w of walls) { bb.setFromObject(w); bb.getSize(s); const [ra, rb] = [Math.max(s.x, s.z) / 3, s.y / 3]; const gq = w.geometry.clone(), uv = gq.attributes.uv; if (uv) { for (let q = 0; q < uv.count; q++) uv.setXY(q, uv.getX(q) * ra, uv.getY(q) * rb) } w.geometry = gq; const t = wt; /* 共用同一張壁紙圖，用 UV 重複，省記憶體 */ w.material = new T.MeshStandardMaterial({ map: t, roughness: .85 }) }
  // 白色家具改成丁香紫、淡紫、薰衣草、香芋（全部留在紫色系，不要太多白）
  const PAL = ['#D9CCF5', '#C9B8EE', '#E6DDF8', '#BFAEE8', '#EADCF2'].map(x => new T.Color(x)); let pi = 0; const done = new Map();
  scene.traverse(o => {
    if (!o.isMesh || walls.includes(o) || o.parent?.name === 'wyBizFuture') return; const m = o.material; if (!m || Array.isArray(m) || m.map || !m.color || m.transparent) return;
    bb.setFromObject(o); bb.getSize(s); if (s.y < .3 && (s.x > 15 || s.z > 15)) return;
    m.color.getHSL(hsl, T.SRGBColorSpace); if (hsl.l < .84) return;
    if (!done.has(m)) { const n = m.clone(); n.color.copy(PAL[pi++ % PAL.length]); done.set(m, n) } o.material = done.get(m);
  });
  // 牆腳一圈紫色發光線條（像科技展間的燈帶）
  for (const w of walls) { bb.setFromObject(w); bb.getSize(s); bb.getCenter(c); const along = s.x > s.z; const st = add(new T.BoxGeometry(along ? s.x * .96 : .06, .06, along ? .06 : s.z * .96), glow, c.x + (along ? 0 : (c.x < cx ? .35 : -.35)), .35, c.z + (along ? .35 : 0)) }
  const anim = [];
  const pedestal = (x, z) => { add(new T.CylinderGeometry(.95, 1.1, .5, 40), deep, x, .25, z); add(new T.CylinderGeometry(1.0, 1.0, .06, 40), gold, x, .52, z); const ring = add(new T.TorusGeometry(.85, .045, 8, 48), glow, x, .58, z); ring.rotation.x = Math.PI / 2; return ring };
  // 1. 會旋轉的全像水晶（左前方）
  { const x = cx - 4.6, z = Z0 + 10.8; pedestal(x, z);
    const cry = add(new T.OctahedronGeometry(.75, 0), new T.MeshStandardMaterial({ color: '#CDB8FF', emissive: '#8F6BFF', emissiveIntensity: .55, roughness: .15, metalness: .1, transparent: true, opacity: .82, flatShading: true }), x, 2.0, z); cry.scale.set(.85, 1.35, .85);
    const halo = add(new T.TorusGeometry(1.05, .03, 6, 48), cyan, x, 2.0, z); halo.rotation.x = Math.PI / 2.4;
    const beams = add(new T.CylinderGeometry(.55, .85, 1.2, 24, 1, true), new T.MeshBasicMaterial({ color: '#B79CFF', transparent: true, opacity: .16, side: T.DoubleSide, depthWrite: false }), x, 1.2, z);
    anim.push(t => { cry.rotation.y = t * .9; cry.position.y = 2.0 + Math.sin(t * 1.6) * .12; halo.rotation.z = t * .6 }) }
  // 2. 發光地球＋小飛機繞著飛（右前方）
  { const x = cx + 4.6, z = Z0 + 10.8; pedestal(x, z); const G = new T.Group(); G.position.set(x, 2.05, z); root.add(G);
    const earth = add(new T.SphereGeometry(.85, 32, 20), M('#B7D8FF', .45, .05, '#6FA8FF', .35), 0, 0, 0, G);
    const landM = M('#9FE0B8', .6, 0, '#5CC98C', .3); for (const [la, lo, r] of [[.5, .3, .32], [-.2, 1.4, .26], [.3, 2.6, .3], [-.5, 3.8, .22], [.1, 5.0, .28]]) { const l = add(new T.SphereGeometry(r, 14, 8), landM, Math.cos(la) * Math.cos(lo) * .78, Math.sin(la) * .78, Math.cos(la) * Math.sin(lo) * .78, earth); l.scale.set(1, .55, 1); l.lookAt(0, 0, 0) }
    for (const k of [0, 1]) { const ln = add(new T.TorusGeometry(.9 + k * .02, .012, 6, 60), cyan, 0, 0, 0, G); ln.rotation.x = Math.PI / 2 + (k ? .9 : 0) }
    // 動森風胖胖小飛機：放大、金邊、螺旋槳會轉、繞地球飛時會上下起伏和左右傾斜
    const orbit = new T.Group(); orbit.rotation.z = .25; G.add(orbit); const plane = new T.Group(); plane.position.set(1.75, 0, 0); plane.scale.setScalar(1.55); orbit.add(plane); const bank = new T.Group(); plane.add(bank);
    const cream = M('#FFF7EC', .45), vio = M('#8E6FD8', .45, .1), gld = M('#E0B65E', .28, .65), win = M('#BFE6FF', .2, 0, '#9BD6FF', .5);
    // 機身細長（像客機），主翼長而平，尾翼清楚：一看就是飛機
    const body = add(new T.CapsuleGeometry(.1, .62, 10, 20), cream, 0, 0, 0, bank); body.rotation.x = Math.PI / 2;
    const nose = add(new T.SphereGeometry(.1, 16, 12), vio, 0, 0, .4, bank); nose.scale.set(1, 1, 1.25);
    const stripe = add(new T.CylinderGeometry(.102, .102, .62, 24, 1, true), M('#B9A3E3', .5), 0, -.035, 0, bank); stripe.rotation.x = Math.PI / 2; stripe.scale.set(1, .35, 1);
    for (const z of [.22, -.22]) add(new T.TorusGeometry(.102, .012, 6, 24), gld, 0, 0, z, bank);
    for (const z of [.27, .15, .03, -.09, -.21]) for (const sd of [-1, 1]) { const w = add(new T.SphereGeometry(.026, 8, 6), win, sd * .095, .035, z, bank); w.scale.set(.4, 1, 1) }
    const cock = add(new T.SphereGeometry(.07, 12, 8), win, 0, .06, .33, bank); cock.scale.set(1, .6, 1.3);
    for (const sd of [-1, 1]) { // 主翼：長、平、往後掠，翼前緣金邊、翼尖金色
      const wg = add(new T.BoxGeometry(.62, .035, .2), vio, sd * .38, -.02, .03, bank); wg.rotation.y = sd * .18;
      const le = add(new T.CylinderGeometry(.02, .02, .62, 8), gld, sd * .38, -.02, .135, bank); le.rotation.z = Math.PI / 2; le.rotation.y = sd * .18;
      add(new T.SphereGeometry(.045, 10, 8), gld, sd * .69, -.02, -.02, bank).scale.set(.8, .8, 2.2);
      const eng = add(new T.CapsuleGeometry(.045, .12, 6, 12), cream, sd * .3, -.09, .07, bank); eng.rotation.x = Math.PI / 2; add(new T.TorusGeometry(.046, .01, 6, 16), gld, sd * .3, -.09, .16, bank) }
    for (const sd of [-1, 1]) { const tw = add(new T.BoxGeometry(.26, .025, .11), vio, sd * .15, .01, -.36, bank); tw.rotation.y = sd * .2 }
    const fin = add(new T.BoxGeometry(.025, .2, .15), vio, 0, .12, -.36, bank); fin.rotation.x = -.35; add(new T.BoxGeometry(.03, .03, .15), gld, 0, .215, -.4, bank).rotation.x = -.35;
    const prop = new T.Group(); prop.position.set(0, 0, .53); bank.add(prop); add(new T.SphereGeometry(.035, 10, 8), gld, 0, 0, 0, prop); for (const k of [0, 1]) { const bl = add(new T.CapsuleGeometry(.02, .16, 4, 8), gld, 0, 0, 0, prop); bl.rotation.z = k * Math.PI / 2 }
    const trail = add(new T.TorusGeometry(1.75, .02, 4, 70, 1.3), M('#FFFFFF', .5, 0, '#E9DDFF', 1.1), 0, 0, 0, orbit); trail.rotation.x = Math.PI / 2;
    anim.push(t => { earth.rotation.y = t * .35; orbit.rotation.y = -t * .7; prop.rotation.z = t * 22; plane.position.y = Math.sin(t * 2.1) * .18; bank.rotation.z = Math.sin(t * 1.3) * .35; bank.rotation.x = Math.cos(t * 2.1) * .12 }) }
  const t0 = performance.now(); const probe = add(new T.SphereGeometry(.001, 3, 2), new T.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }), 0, 0, 0); probe.frustumCulled = false;
  probe.onBeforeRender = () => { const t = (performance.now() - t0) / 1000; for (const f of anim) f(t) };
  return root;
}
