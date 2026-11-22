import { buildRefLift } from './wy-lift-ref.js?v=510';
// v503 電梯：以原本的電梯為準，只改五樣（陳老闆 2026-11-19）
// 1. 門楣數字改成放大的扇形指針樓層錶（撐滿門楣深藍條、粗金框、粗圓頭指針、大數字）
// 2. 門楣藍燈條改暖金柔光，Logo 金框圓徽放在燈條中間（整個在門楣內）
// 3. 奶油色井壁與電梯廂後板改亮：A 香檳金鏡面／B1 淡玫瑰大理石／B2 淡玫瑰面板加金框
// 4. 叫梯鍵改圓胖金色
// 5. 到站淡入＋叮咚（index.html 的 wyLiftDing）
// 其他（圓形玻璃廂、金色直條、上下金框、扶手、門框、門的開關）全部照原本。所有光穩定不閃。
export function buildFutureLift(T, cabin, floor) {
  if ((window.__wyLiftV || 'R') === 'R') return buildRefLift(T, cabin, floor);
  const root = cabin.root; if (!root || root.userData.wyLux) return; root.userData.wyLux = 1;
  const V = window.__wyLiftV || 'A';
  const parts = [root, ...(cabin.extraHide || [])];
  const champ = new T.MeshStandardMaterial({ color: '#F0D597', metalness: .35, roughness: .28, emissive: '#8a6a2a', emissiveIntensity: .38 });
  const hex = m => m && m.color ? '#' + m.color.getHexString() : '';
  const tex = draw => { const c = document.createElement('canvas'); c.width = 512; c.height = 1024; draw(c.getContext('2d'), 512, 1024); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; return t };
  let wallT = null;
  if (V === 'B1') wallT = tex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#F7DCE0'); gr.addColorStop(.5, '#F2CDD3'); gr.addColorStop(1, '#F6D8DC'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    for (const [x, y, r, a] of [[120, 220, 260, .35], [400, 620, 300, .3], [180, 880, 240, .3], [420, 120, 200, .25]]) { const rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, `rgba(236,180,190,${a})`); rg.addColorStop(1, 'rgba(236,180,190,0)'); g.fillStyle = rg; g.fillRect(0, 0, W, H) }
    g.lineCap = 'round'; g.lineJoin = 'round';
    const vein = (pts, w, col) => { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length - 1; i++) { const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2; g.quadraticCurveTo(pts[i][0], pts[i][1], mx, my) } const l = pts[pts.length - 1]; g.lineTo(l[0], l[1]); g.stroke() };
    vein([[-20, 140], [120, 260], [210, 300], [330, 470], [430, 560], [540, 700]], 16, 'rgba(255,250,250,.7)');
    vein([[-20, 600], [90, 660], [160, 760], [300, 850], [380, 980], [460, 1050]], 11, 'rgba(255,250,250,.6)');
    vein([[260, -20], [300, 90], [420, 180], [540, 260]], 8, 'rgba(255,250,250,.55)');
    vein([[-20, 150], [130, 268], [220, 312], [340, 482], [440, 572], [540, 712]], 3, 'rgba(214,170,92,.75)');
  });
  // v507 三色面板（粉色只當點綴：面板內圈細線＋中央小花）
  const PAL = { S: ['#5C8FE0', '#7FA9EC', '#3F6FC4'], G: ['#F6E2B4', '#FBEFD2', '#E9CC8E'], M: ['#A8E2CC', '#C7EEDF', '#86CFB4'] };
  if (PAL[V]) { const [base, hi, lo] = PAL[V]; wallT = tex((g, W, H) => {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, hi); gr.addColorStop(1, lo); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    const flower = (cx, cy, r) => { g.fillStyle = '#F4A9BE'; for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; g.beginPath(); g.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, r * .8, 0, 7); g.fill() } g.fillStyle = '#F7D98A'; g.beginPath(); g.arc(cx, cy, r * .7, 0, 7); g.fill() };
    const pan = (x, y, w, h) => { g.fillStyle = base; g.beginPath(); g.roundRect(x, y, w, h, 26); g.fill(); const sh = g.createLinearGradient(0, y, 0, y + h); sh.addColorStop(0, 'rgba(255,255,255,.28)'); sh.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = sh; g.fill();
      g.strokeStyle = '#E2BE6E'; g.lineWidth = 16; g.stroke(); g.strokeStyle = '#F4A9BE'; g.lineWidth = 5; g.beginPath(); g.roundRect(x + 18, y + 18, w - 36, h - 36, 16); g.stroke(); flower(x + w / 2, y + h / 2, 18) };
    pan(40, 40, W - 80, 400); pan(40, 484, W - 80, 500) }) }
  if (V === 'B2') wallT = tex((g, W, H) => {
    g.fillStyle = '#F5D5DA'; g.fillRect(0, 0, W, H);
    const rg = g.createLinearGradient(0, 0, 0, H); rg.addColorStop(0, 'rgba(255,240,242,.5)'); rg.addColorStop(1, 'rgba(236,184,194,.35)'); g.fillStyle = rg; g.fillRect(0, 0, W, H);
    const pan = (x, y, w, h) => { g.fillStyle = 'rgba(255,236,239,.55)'; g.beginPath(); g.roundRect(x, y, w, h, 26); g.fill(); g.strokeStyle = '#D9B46A'; g.lineWidth = 12; g.stroke(); g.strokeStyle = 'rgba(255,240,200,.9)'; g.lineWidth = 3; g.beginPath(); g.roundRect(x + 10, y + 10, w - 20, h - 20, 18); g.stroke() };
    pan(44, 44, W - 88, 400); pan(44, 484, W - 88, 496);
  });
  const wallM = (V === 'A') ? new T.MeshStandardMaterial({ color: '#E8C070', metalness: .55, roughness: .16, emissive: '#B4842C', emissiveIntensity: .42 })
    : new T.MeshStandardMaterial({ color: '#FFFFFF', map: wallT, roughness: .25, metalness: .05, emissive: '#FFFFFF', emissiveMap: wallT, emissiveIntensity: .3 });
  const meshes = []; parts.forEach(p => p && p.traverse(o => { if (o.isMesh) meshes.push(o) }));
  let strip = null, digit = null;
  for (const o of meshes) {
    const m = o.material, c = hex(m), g = o.geometry.parameters || {};
    if (c === '#74c8e4') { strip = o; o.material = new T.MeshBasicMaterial({ color: '#F6D893' }) }
    else if (c === '#bdebf7') o.material = new T.MeshBasicMaterial({ color: '#FFF0C8' });
    else if (c === '#ffffff' && o.geometry.type === 'PlaneGeometry' && g.width > 1 && g.width < 1.3) { digit = o; o.material = m.clone(); o.material.visible = false }
    else if (c === '#f6ead7' || c === '#f5e9d5') o.material = wallM;
    else if (c === '#e7c98d' && o.geometry.type === 'CylinderGeometry' && g.radiusTop < .1) { o.material = new T.MeshStandardMaterial({ color: '#F0D394', metalness: .35, roughness: .25, emissive: '#B8862E', emissiveIntensity: .5 }); o.scale.set(1.7, 2.2, 1.7) }
  }
  // Logo 金框圓徽：門楣燈條中間，往上靠，讓出下方的樓層錶
  if (strip) {
    const lt = new T.TextureLoader().load('office-logo-transparent.png'); lt.colorSpace = T.SRGBColorSpace;
    const L = new T.Group(); L.position.copy(strip.position); L.position.y += .1; L.position.z += .07; L.rotation.copy(strip.rotation); strip.parent.add(L);
    const rr = .24;
    L.add(new T.Mesh(new T.CircleGeometry(rr + .05, 48), champ));
    const face = new T.Mesh(new T.CircleGeometry(rr, 48), new T.MeshBasicMaterial({ color: '#1C3358' })); face.position.z = .01; L.add(face);
    const lg = new T.Mesh(new T.CircleGeometry(rr * .92, 48), new T.MeshBasicMaterial({ map: lt, transparent: true, depthWrite: false })); lg.position.z = .02; L.add(lg);
  }
  // 半圓指針樓層錶：撐滿門楣深藍條（寬 1.5、高 .78），粗圓頭金指針，到站慢慢擺到該層
  let needle = null, target = 0, na = 0;
  if (digit) {
    const D = new T.Group(); D.position.copy(digit.position); D.rotation.copy(digit.rotation); D.position.z += .38; D.position.y -= .06; digit.parent.add(D);
    const W = 1.5, Hh = .76, S = 400, cw = Math.round(W * S), ch = Math.round(Hh * S); const c = document.createElement('canvas'); c.width = cw; c.height = ch; const g = c.getContext('2d');
    const cx = cw / 2, cy = ch - 6, R = Math.min(cw / 2 - 4, ch - 10);
    g.fillStyle = '#F4DA9C'; g.beginPath(); g.arc(cx, cy, R, Math.PI, 0); g.closePath(); g.fill();
    g.fillStyle = '#2B4F86'; g.beginPath(); g.arc(cx, cy, R - 24, Math.PI, 0); g.closePath(); g.fill();
    g.fillStyle = '#F4DA9C'; g.fillRect(cx - R, cy - 4, R * 2, 10);
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `700 ${Math.round(R * .38)}px Georgia,serif`;
    const ang = n => Math.PI / 2 + (2 - n) * Math.PI / 3.4;
    [1, 2, 3].forEach(n => { const a = ang(n), rr = R * .66; g.shadowBlur = n === floor ? 16 : 0; g.shadowColor = 'rgba(255,214,120,.9)'; g.fillStyle = n === floor ? '#FFE3A0' : 'rgba(255,227,160,.5)'; g.fillText(String(n), cx + Math.cos(a) * rr, cy - Math.sin(a) * rr) });
    const dt = new T.CanvasTexture(c); dt.colorSpace = T.SRGBColorSpace;
    D.add(new T.Mesh(new T.PlaneGeometry(W, Hh), new T.MeshBasicMaterial({ map: dt, transparent: true })));
    const pivY = -Hh / 2 + 6 / S, Rw = R / S;
    needle = new T.Group(); needle.position.set(0, pivY, .012); D.add(needle);
    const nm = new T.MeshBasicMaterial({ color: '#F6D68C' });
    const len = Rw * .42; const nb = new T.Mesh(new T.BoxGeometry(.08, len, .012), nm); nb.position.y = len / 2; needle.add(nb);
    const tip = new T.Mesh(new T.CircleGeometry(.06, 20), nm); tip.position.y = len; needle.add(tip);
    const hub = new T.Mesh(new T.CircleGeometry(.11, 24), new T.MeshBasicMaterial({ color: '#F4DA9C' })); hub.position.set(0, pivY, .02); D.add(hub);
    target = ang(floor) - Math.PI / 2; na = target + .5;
  }
  const tick = () => { if (needle) { na += (target - na) * .04; needle.rotation.z = na } requestAnimationFrame(tick) };
  tick();
  return root;
}
