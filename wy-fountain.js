// v503 城堡廣場噴水池（依使用者參考圖）：三層奶油大理石花瓣水盤、直條紋石柱＋金環、深藍金邊底座、
// 四座深藍金框白繡球花台、各層邊緣流下的水簾（緩慢流動、不閃爍）、頂端金色太陽光芒＋事務所 Logo。
// 總高度與舊噴水池相同，不擋城堡大門。F 是噴水池群組（原點在地面中心，GY 為地面高度）。
export function buildLuxFountain(T, F, GY, movers) {
  const tag = o => { o.userData.wyFtn = 1; return o };
  const M = (c, o = {}) => new T.MeshStandardMaterial({ color: c, roughness: .35, ...o });
  const cream = M('#F6EBD6', { roughness: .3 }), creamD = M('#EBDCC0', { roughness: .32 });
  const gold = M('#EEC35A', { metalness: .7, roughness: .22, emissive: '#5a3c08', emissiveIntensity: .32 });
  const navy = M('#1F2F5C', { roughness: .32, metalness: .12 });
  const water = new T.MeshPhysicalMaterial({ color: 0x40C6F2, transparent: true, opacity: .82, roughness: .05 });
  const add = (geo, m, x = 0, y = 0, z = 0, p = F) => { const o = tag(new T.Mesh(geo, m)); o.position.set(x, y, z); p.add(o); return o };
  const cyl = (a, b, h, m, y0, s = 48) => add(new T.CylinderGeometry(a, b, h, s), m, 0, GY + y0 + h / 2, 0);
  const ring = (r, t, m, y) => { const o = add(new T.TorusGeometry(r, t, 12, 96), m, 0, GY + y, 0); o.rotation.x = Math.PI / 2; return o };
  const lobes = (r, n, d, steps = 240) => { const p = []; for (let i = 0; i < steps; i++) { const a = i / steps * Math.PI * 2; p.push([Math.cos(a) * (r + d * Math.pow(Math.abs(Math.cos(a * n / 2)), .6)), Math.sin(a) * (r + d * Math.pow(Math.abs(Math.cos(a * n / 2)), .6))]) } return p };
  const tube = (pts, y, t) => add(new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(([x, z]) => new T.Vector3(x, GY + y, z)), true), pts.length * 2, t, 8, true), gold);
  const slab = (pts, y0, h, m) => { const sh = new T.Shape(); pts.forEach(([x, z], i) => i ? sh.lineTo(x, -z) : sh.moveTo(x, -z)); const o = add(new T.ExtrudeGeometry(sh, { depth: h, bevelEnabled: false, curveSegments: 2 }), m, 0, GY + y0, 0); o.rotation.x = -Math.PI / 2; return o };
  // 花瓣紋碗：Lathe 做碗身，外側加一圈凸起花瓣肋
  const bowl = (r0, r1, h, y0, ribs) => {
    const prof = []; for (let i = 0; i <= 12; i++) { const t = i / 12; prof.push(new T.Vector2(r0 + (r1 - r0) * Math.sin(t * Math.PI / 2), h * t)) }
    add(new T.LatheGeometry(prof, 64), cream, 0, GY + y0, 0);
    for (let k = 0; k < ribs; k++) { const a = k / ribs * Math.PI * 2; const rb = add(new T.CapsuleGeometry(h * .2, h * .55, 4, 10), creamD, Math.cos(a) * (r0 + (r1 - r0) * .62), GY + y0 + h * .5, Math.sin(a) * (r0 + (r1 - r0) * .62)); const dir = new T.Vector3(Math.cos(a) * (r1 - r0), h, Math.sin(a) * (r1 - r0)).normalize(); rb.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), dir); rb.scale.set(1, 1, 1) }
  };
  // 直條紋石柱＋上下金環
  const column = (r, y0, h) => {
    cyl(r, r, h, cream, y0, 32);
    for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2; add(new T.CylinderGeometry(r * .16, r * .16, h * .86, 8), creamD, Math.cos(a) * r * .98, GY + y0 + h / 2, Math.sin(a) * r * .98) }
    cyl(r * 1.28, r * 1.28, .12, gold, y0); cyl(r * 1.2, r * 1.2, .08, gold, y0 + .12);
    cyl(r * 1.28, r * 1.28, .12, gold, y0 + h - .12); cyl(r * 1.2, r * 1.2, .08, gold, y0 + h - .2);
  };

  // ---- 底座大池（高約 1.35）----
  cyl(3.75, 3.8, .4, navy, 0, 72); ring(3.77, .07, gold, .4); ring(3.8, .06, gold, .03);
  cyl(3.45, 3.5, .95, cream, .4, 72); ring(3.47, .12, gold, 1.4);
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; add(new T.BoxGeometry(.05, .8, .05), gold, Math.cos(a) * 3.49, GY + .87, Math.sin(a) * 3.49) }
  ring(3.28, .09, navy, 1.37); cyl(3.3, 3.3, .04, water, 1.35, 72);
  // ---- 四座深藍金框花台（白繡球＋綠葉，放四個斜角）----
  const flowerM = M('#FBF8EA', { roughness: .6 }), flowerM2 = M('#EEF3D8', { roughness: .6 }), leafM = M('#4E9A4E', { roughness: .7 });
  for (let k = 0; k < 4; k++) {
    const a = Math.PI / 4 + k * Math.PI / 2, x = Math.cos(a) * 3.85, z = Math.sin(a) * 3.85;
    const pg = tag(new T.Group()); pg.position.set(x, GY, z); pg.rotation.y = -a + Math.PI / 2; F.add(pg);
    add(new T.BoxGeometry(1.9, .7, .8), navy, 0, .35, 0, pg);
    for (const [w, h, d, y] of [[1.98, .07, .88, .7], [1.98, .07, .88, .03]]) add(new T.BoxGeometry(w, h, d), gold, 0, y, 0, pg);
    for (const sx of [-1, 1]) add(new T.BoxGeometry(.07, .7, .88), gold, sx * .96, .35, 0, pg);
    for (let j = 0; j < 7; j++) { const lx = -.75 + j * .25; const lf = add(new T.SphereGeometry(.24, 10, 8), leafM, lx, .82, (j % 2 ? .18 : -.15), pg); lf.scale.set(1, .6, 1) }
    for (let j = 0; j < 4; j++) { const fx = -.6 + j * .4; for (let q = 0; q < 5; q++) { const qa = q * 1.26; add(new T.SphereGeometry(.13, 10, 8), q % 2 ? flowerM : flowerM2, fx + Math.cos(qa) * .11, .98 + (q === 4 ? .08 : 0), Math.sin(qa) * .11 + (j % 2 ? .06 : -.05), pg) } }
  }
  // ---- 第一根石柱、中層花瓣水盤 ----
  column(.62, 1.3, 1.15);
  bowl(.7, 2.25, .62, 2.45, 16);
  const midLobe = lobes(2.25, 10, .28);
  slab(midLobe, 3.0, .16, cream); tube(midLobe, 3.16, .08);
  ring(1.98, .08, navy, 3.19); cyl(2.0, 2.0, .04, water, 3.17, 64);
  // ---- 第二根石柱、頂層水盤 ----
  column(.42, 3.1, .78);
  bowl(.48, 1.45, .48, 3.85, 12);
  ring(1.45, .085, gold, 4.33); cyl(1.36, 1.36, .05, water, 4.27, 48);
  // ---- 太陽光芒 Logo（雙面，面向來客，緩慢輕擺）----
  const med = tag(new T.Group()); med.userData.wyTopMedal = 1; med.position.set(0, GY + 5.35, 0); F.add(med);
  add(new T.CylinderGeometry(.09, .12, .7, 12), gold, 0, GY + 4.55, 0);
  const disc = new T.Mesh(new T.CylinderGeometry(.82, .82, .2, 48), new T.MeshStandardMaterial({ color: '#F0C75E', metalness: .65, roughness: .22, emissive: '#6b4d10', emissiveIntensity: .35 })); disc.rotation.x = Math.PI / 2; med.add(disc);
  const rim = new T.Mesh(new T.TorusGeometry(.82, .08, 10, 64), gold); med.add(rim);
  for (let k = 0; k < 20; k++) { const a = k / 20 * Math.PI * 2, L = k % 2 ? .38 : .62; const ray = new T.Mesh(new T.ConeGeometry(.12, L, 4), gold); ray.scale.z = .35; ray.position.set(Math.cos(a) * (.86 + L / 2), Math.sin(a) * (.86 + L / 2), 0); ray.rotation.z = a - Math.PI / 2; med.add(ray) }
  try { const tex = new T.TextureLoader().load('office-logo-transparent.png'); tex.colorSpace = T.SRGBColorSpace;
    for (const sd of [1, -1]) { const face = new T.Mesh(new T.CircleGeometry(.7, 48), new T.MeshBasicMaterial({ color: '#FFF8EC' })); face.position.z = sd * .105; if (sd < 0) face.rotation.y = Math.PI; med.add(face);
      const lg = new T.Mesh(new T.CircleGeometry(.64, 48), new T.MeshBasicMaterial({ map: tex, transparent: true })); lg.position.z = sd * .11; if (sd < 0) lg.rotation.y = Math.PI; med.add(lg) } } catch (e) { }
  med.traverse(tag);
  // ---- 水簾：中層、頂層邊緣流下的弧形水幕（貼圖往下流動）----
  const wc = document.createElement('canvas'); wc.width = 64; wc.height = 256; const g2 = wc.getContext('2d');
  for (let x = 0; x < 64; x++) { const v = 215 + 40 * Math.abs(Math.sin(x * .7) * Math.cos(x * .23)); g2.fillStyle = `rgba(${v},${245},255,${.55 + .35 * Math.abs(Math.sin(x * .45))})`; g2.fillRect(x, 0, 1, 256) }
  for (let i = 0; i < 40; i++) { g2.fillStyle = 'rgba(255,255,255,.35)'; g2.fillRect(Math.random() * 64, Math.random() * 256, 2, 20 + Math.random() * 40) }
  const wt = new T.CanvasTexture(wc); wt.wrapS = wt.wrapT = T.RepeatWrapping;
  const sheetM = new T.MeshBasicMaterial({ map: wt, transparent: true, opacity: .92, depthWrite: false, side: T.DoubleSide, color: 0xF2FCFF });
  const sheet = (r, top, bot, a, w) => { const h = top - bot; const geo = new T.CylinderGeometry(r + .12, r, h, 10, 1, true, a - w / 2, w); add(geo, sheetM, 0, GY + bot + h / 2, 0) };
  for (let k = 0; k < 6; k++) sheet(2.42, 3.05, 1.3, Math.PI / 6 + k * Math.PI / 3, .55);
  for (let k = 0; k < 5; k++) sheet(1.5, 4.3, 3.16, k * Math.PI * 2 / 5, .6);
  if (movers) movers.push((t) => { wt.offset.y = -(t * .45 % 1); med.rotation.y = Math.sin(t * .4) * .25; let ph = 'day'; try { ph = window.wySky.phase() } catch (e) { } disc.material.emissiveIntensity = ph === 'night' ? .9 : .35 });
  return { med };
}
