import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
// v503 1F 大廳頂級版（依使用者參考圖）：淺蜜沙拋光大理石地板、牆面改成橡木直條板＋米色大理石板＋金條分隔、
// Logo 牆加暖光光暈（穩定不閃）、櫃台玻璃招牌改成金色發光字＋緩慢流動光（不閃爍）、兩側直立招牌同步柔光、
// 會客沙發改寶石藍絲絨、茶几改深綠石面金框。配置、互動、電梯位置都不動。
export function applyLobbyLux(T, root) {
  let sd = 1503; const rr = () => ((sd = Math.imul(sd ^ sd >>> 15, 1 | sd) + 0x6D2B79F5 | 0, ((sd ^ sd >>> 14) >>> 0) / 4294967296));
  const tex = (w, h, f) => { const c = document.createElement('canvas'); c.width = w; c.height = h; f(c.getContext('2d'), w, h); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 8; return t };
  const M = (c, o = {}) => new T.MeshStandardMaterial({ color: c, roughness: .45, ...o });
  const gold = M('#E4B95A', { metalness: .7, roughness: .25, emissive: '#5a3c08', emissiveIntensity: .35 });
  const G = new T.Group(); G.name = 'wyLobbyLux'; root.add(G);
  const box = (x, y, z, w, h, d, m) => { const o = new T.Mesh(new T.BoxGeometry(w, h, d), m); o.position.set(x, y, z); G.add(o); return o };
  root.updateMatrixWorld(true);
  const bb = new T.Box3(), cen = new T.Vector3(), sz = new T.Vector3();
  const hex = o => o.material && !Array.isArray(o.material) && o.material.color ? o.material.color.getHexString() : '';

  // ---------- 地板：淺蜜沙拋光大理石（同 2F），拿掉細格線 ----------
  const floorTex = tex(1024, 1024, (g, S) => { const Wr = fn => { for (const ox of [-S, 0, S]) for (const oy of [-S, 0, S]) { g.save(); g.translate(ox, oy); fn(); g.restore() } };
    g.fillStyle = '#F0D6B4'; g.fillRect(0, 0, S, S);
    /* 地板雲霧（灰灰髒髒）已拿掉：使用者 21:06 */
    g.lineCap = 'round'; for (let k = 0; k < 3; k++) { let x = rr() * S, y = rr() * S, a = -.45 + rr() * .3, da = 0; const pts = [[x, y]]; for (let j = 0; j < 110; j++) { da += (rr() - .5) * .05; da *= .9; a += da; x += Math.cos(a) * 15; y += Math.sin(a) * 15; pts.push([x, y]) }
      Wr(() => { for (const [lw, al] of [[14, .1], [2.6, .7], [1, .9]]) { g.strokeStyle = `rgba(255,248,236,${al})`; g.lineWidth = lw; g.beginPath(); pts.forEach(([px, py], i) => i ? g.lineTo(px, py) : g.moveTo(px, py)); g.stroke() } }) } });
  floorTex.wrapS = floorTex.wrapT = T.RepeatWrapping;
  root.traverse(o => { if (!o.isMesh) return; const k = hex(o); if (k === 'e1d8ca') o.visible = false;
    if (k === 'eaddcb') { const p = o.geometry.parameters || {}; if ((p.width || 0) > 20) { const t = floorTex.clone(); t.needsUpdate = true; t.repeat.set(p.width / 16, p.depth / 16); o.material = new T.MeshStandardMaterial({ color: '#FFFFFF', map: t, roughness: .22 }) } } });

  // ---------- 牆面：舊奶油柱子隱藏，改成橡木直條板＋米色大理石＋金條 ----------
  root.traverse(o => { if (o.isMesh && hex(o) === 'f5e8d6') { const p = o.geometry.parameters || {}; if ((p.height || 0) > 6) o.visible = false } });
  const oakTex = tex(256, 512, (g, W2, H2) => { g.fillStyle = '#C08A52'; g.fillRect(0, 0, W2, H2); for (let x = 0; x < W2; x += 2) { g.fillStyle = `rgba(${120 + rr() * 40},${75 + rr() * 25},${35 + rr() * 15},${.1 + rr() * .18})`; g.fillRect(x, 0, 1 + rr() * 2, H2) } for (let k = 0; k < 5; k++) { g.fillStyle = 'rgba(90,55,25,.45)'; g.fillRect(k * W2 / 5, 0, 4, H2) } });
  const mTex = tex(512, 768, (g, W2, H2) => { g.fillStyle = '#E9D5BF'; g.fillRect(0, 0, W2, H2); for (let i = 0; i < 18; i++) { const x = rr() * W2, y = rr() * H2, r = 80 + rr() * 160, gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(255,246,234,.4)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2) }
    g.lineCap = 'round'; for (let k = 0; k < 4; k++) { let x = rr() * W2, y = H2, a = -Math.PI / 2 - .7 + rr() * .3; const pts = [[x, y]]; for (let j = 0; j < 60; j++) { a += (rr() - .5) * .22; x += Math.cos(a) * 16; y += Math.sin(a) * 16; pts.push([x, y]) } for (const [lw, al] of [[10, .12], [2.2, .8]]) { g.strokeStyle = `rgba(255,252,246,${al})`; g.lineWidth = lw; g.beginPath(); pts.forEach(([px, py], i) => i ? g.lineTo(px, py) : g.moveTo(px, py)); g.stroke() } } });
  const oakM = M('#FFFFFF', { map: oakTex, roughness: .5, emissive: '#FFFFFF', emissiveMap: oakTex, emissiveIntensity: .25 }), marM = M('#FFFFFF', { map: mTex, roughness: .22, emissive: '#FFFFFF', emissiveMap: mTex, emissiveIntensity: .25 }), coveM = new T.MeshBasicMaterial({ color: '#FFE3A6' });
  const H = 6.6, Y = H / 2 + .1;
  const panel = (axis, u, w, n, m) => axis === 'z' ? box(u, Y, n, w, H, .08, m) : box(n, Y, u, .08, H, w, m);
  const strip = (axis, u, n) => axis === 'z' ? box(u, Y, n + .06, .1, H, .06, gold) : box(n + (n < 0 ? .06 : -.06), Y, u, .06, H, .1, gold);
  const oakRun = (axis, a0, a1, n) => { const k = Math.max(1, Math.round((a1 - a0) / 1.4)); for (let i = 0; i < k; i++) { panel(axis, a0 + (i + .5) * (a1 - a0) / k, (a1 - a0) / k, n, oakM); if (i) strip(axis, a0 + i * (a1 - a0) / k, n) } };
  const run = (axis, segs, n) => { for (const [a0, a1, kind] of segs) { strip(axis, a0, n); strip(axis, a1, n); if (kind === 'oak') oakRun(axis, a0, a1, n); else panel(axis, (a0 + a1) / 2, a1 - a0, n, marM) } };
  // 後牆（z=-10.58）：中間 Logo 牆、右側電梯保留
  run('z', [[-13.1, -10.0, 'oak'], [-10.0, -3.9, 'mar'], [3.9, 6.5, 'mar'], [10.3, 13.1, 'oak']], -10.58);
  // 左右牆（x=±13.06）：中段 Logo 牆保留
  for (const n of [-13.06, 13.06]) run('x', [[-10.6, -8.0, 'oak'], [-8.0, -4.7, 'mar'], [1.9, 5.2, 'mar'], [5.2, 10.6, 'oak']], n);
  // 金色踢腳、牆頂收邊、暖光燈帶
  for (const [ax, a0, a1, n] of [['z', -13.1, 13.1, -10.5], ['x', -10.7, 10.7, -12.98], ['x', -10.7, 10.7, 12.98]]) {
    const L = a1 - a0, c = (a0 + a1) / 2;
    for (const [y, h, m] of [[.2, .32, gold], [H + .14, .16, gold], [H - .05, .1, coveM]]) ax === 'z' ? box(c, y, n, L, h, .1, m) : box(n, y, c, .1, h, L, m);
  }

  // ---------- Logo 牆：背後一圈穩定暖光（不閃） ----------
  const haloTex = tex(256, 256, (g, S) => { const gr = g.createRadialGradient(S / 2, S / 2, S * .2, S / 2, S / 2, S / 2); gr.addColorStop(0, 'rgba(255,214,140,.9)'); gr.addColorStop(1, 'rgba(255,214,140,0)'); g.fillStyle = gr; g.fillRect(0, 0, S, S) });
  const haloM = new T.MeshBasicMaterial({ map: haloTex, transparent: true, depthWrite: false, blending: T.AdditiveBlending, opacity: .55 });
  { const h1 = new T.Mesh(new T.PlaneGeometry(10.5, 7.6), haloM); h1.position.set(0, 4.0, -10.45); G.add(h1) }
  for (const s of [-1, 1]) { const h2 = new T.Mesh(new T.PlaneGeometry(9, 7.6), haloM); h2.rotation.y = s < 0 ? Math.PI / 2 : -Math.PI / 2; h2.position.set(s * 12.92, 4.0, -1.4); G.add(h2) }

  // ---------- 櫃台玻璃招牌：金色發光字＋Logo＋緩慢流動光 ----------
  const rec = root.children.find(c => c.isGroup && Math.abs(c.position.z - 3.65) < .01 && Math.abs(c.position.x) < .01);
  const anim = [];
  if (rec) {
    // 舊的玻璃字（3072 寬的畫布貼圖）隱藏
    rec.traverse(o => { if (o.isMesh && o.material && o.material.map && o.material.map.image && o.material.map.image.width >= 1024 && Math.abs(o.position.y - 3.0) < 1.6 && Math.abs(o.position.x) < 4.5) o.visible = false }); // 舊玻璃字與其底板
    let glass = null; rec.traverse(o => { if (!glass && o.isMesh && o.geometry.type === 'CylinderGeometry' && o.material.isMeshPhysicalMaterial && o.geometry.parameters.openEnded) glass = o });
    if (glass) {
      const p = glass.geometry.parameters, R = p.radiusTop - .03;
      const logo = new Image(); logo.src = 'office-logo-transparent.png';
      const signC = document.createElement('canvas'); signC.width = 2048; signC.height = 640; const sg = signC.getContext('2d');
      const draw = () => { sg.clearRect(0, 0, 2048, 640); sg.textAlign = 'center'; sg.textBaseline = 'middle';
        if (logo.complete && logo.naturalWidth) sg.drawImage(logo, 1024 - 105, 18, 210, 210);
        // 精品飯店式招牌：明體／襯線字、中等粗細、香檳金字＋淡白金柔光、字距拉開
        const gl = (txt, y, px, w, fam, sp) => { sg.font = `600 ${px}px ${fam}`; try { sg.letterSpacing = sp + 'px' } catch (e) { } sg.shadowColor = 'rgba(255,240,205,.75)'; sg.shadowBlur = 18; sg.fillStyle = '#F3E2B8'; sg.fillText(txt, 1024, y, w); sg.shadowBlur = 0; const gr2 = sg.createLinearGradient(0, y - px / 2, 0, y + px / 2); gr2.addColorStop(0, '#F7E7BE'); gr2.addColorStop(.55, '#D9B46A'); gr2.addColorStop(1, '#C59A4C'); sg.fillStyle = gr2; sg.fillText(txt, 1024, y, w) };
        const ZH = '"Noto Serif TC","Songti TC","PMingLiU","MingLiU",serif', EN = 'Georgia,"Times New Roman",serif';
        gl('德威陽國際法律事務所', 300, 118, 1800, ZH, 18); gl('WEI & YANG INTERNATIONAL LAW FIRM', 432, 66, 1800, EN, 10); gl('YES, WE DO!', 540, 58, 1000, EN, 14) };
      draw(); logo.onload = () => { draw(); st.needsUpdate = true };
      const st = new T.CanvasTexture(signC); st.colorSpace = T.SRGBColorSpace;
      const geo = new T.CylinderGeometry(R, R, p.height, 96, 1, true, p.thetaStart, p.thetaLength);
      const face = new T.Mesh(geo, new T.MeshBasicMaterial({ map: st, transparent: true, side: T.DoubleSide, depthWrite: false })); face.position.copy(glass.position); face.renderOrder = 4; glass.parent.add(face);
      // 流動光：一條柔和的亮帶由左慢慢掃到右（透明度連續變化，不閃）
      const swC = document.createElement('canvas'); swC.width = 512; swC.height = 8; const sw = swC.getContext('2d'); const gr = sw.createLinearGradient(0, 0, 512, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(.45, 'rgba(255,236,190,0)'); gr.addColorStop(.5, 'rgba(255,244,220,.3)'); gr.addColorStop(.55, 'rgba(255,236,190,0)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); sw.fillStyle = gr; sw.fillRect(0, 0, 512, 8);
      const swT = new T.CanvasTexture(swC); swT.wrapS = T.RepeatWrapping;
      const sweep = new T.Mesh(new T.CylinderGeometry(R - .01, R - .01, p.height, 96, 1, true, p.thetaStart, p.thetaLength), new T.MeshBasicMaterial({ map: swT, transparent: true, side: T.DoubleSide, depthWrite: false, blending: T.AdditiveBlending })); sweep.position.copy(glass.position); sweep.renderOrder = 5; glass.parent.add(sweep);
      anim.push(t => { swT.offset.x = -((t * .12) % 1.6) + .3 });
    }
  }
  // ---------- 兩側直立招牌：金框發光燈箱（柔和呼吸光，週期長、不閃） ----------
  const glowM = new T.MeshBasicMaterial({ map: haloTex, transparent: true, depthWrite: false, blending: T.AdditiveBlending, opacity: .5 });
  root.traverse(o => { if (!o.isMesh || !o.material || !o.material.map || !o.material.map.image) return; const im = o.material.map.image; if (!(im.width && im.height && im.height > im.width)) return;
    const wp = new T.Vector3(); o.getWorldPosition(wp); if (Math.abs(wp.z - 3.6) > 4 || wp.y > 3) return;
    const h = new T.Mesh(new T.PlaneGeometry(2.2, 3.0), glowM); h.position.copy(wp); h.quaternion.copy(o.getWorldQuaternion(new T.Quaternion())); h.translateZ(-.06); h.renderOrder = 2; G.add(h) });
  anim.push(t => { glowM.opacity = .38 + .14 * Math.sin(t * .8) });

  // ---------- 會客沙發：寶石藍絲絨；茶几：深綠石面 ----------
  const sapphire = M('#7E98BE', { roughness: .65 }) /* 霧藍絲絨：跟木牆、米大理石、深藍 Logo 牆同調，不搶色 */, stoneG = M('#C9A45E', { metalness: .5, roughness: .3 });
  root.traverse(o => { if (!o.isMesh || !o.material || Array.isArray(o.material) || !o.material.color) return; for (let q = o; q; q = q.parent) if (q === rec || q === G) return; const wp = new T.Vector3(); o.getWorldPosition(wp); if (wp.x < -5 || wp.x > 10 || wp.z < -7.5 || wp.z > 1.6 || wp.y > 2.6) return;
    const c = o.material.color, r = c.r, g = c.g, b = c.b; if (r >= g && g >= b && r - b > .08 && r > .4 && g > .25 && !(o.material.metalness > .3)) o.material = sapphire;
    else if (o.geometry.type === 'CylinderGeometry' && r > .9 && g > .9 && b > .9 && wp.y > .5 && wp.y < 1.4) o.material = stoneG });

  // ================= 第二輪：照參考圖補齊 =================
  const add = (geo, m, x, y, z, p = G) => { const o = new T.Mesh(geo, m); o.position.set(x, y, z); p.add(o); return o };
  const RB = (w, h, d, r = .08) => { try { return new RoundedBoxGeometry(w, h, d, 3, Math.min(r, Math.min(w, h, d) * .4)) } catch (e) { return new T.BoxGeometry(w, h, d) } };
  const logoT = new T.TextureLoader().load('office-logo-transparent.png'); logoT.colorSpace = T.SRGBColorSpace;
  // ---------- 接待櫃台：米色大理石櫃身＋深墨綠腰帶＋粗金邊＋正面大 Logo＋WEIYANG ----------
  if (rec) {
    rec.traverse(o => { if (o.isMesh && ['68887d', '355650', '829f91', '304e49'].includes(hex(o))) o.visible = false });
    rec.traverse(o => { if (o.isMesh && o.material && o.material.map && o.geometry.type === 'PlaneGeometry' && Math.abs(o.position.z - .955) < .01) o.visible = false }); // 舊小 Logo
    const R0 = 8.8, CZ = .83 - R0, W = 7.35 * 1.5, ARC = 2 * Math.asin(W / (2 * R0)), A0 = -ARC / 2;
    const cylS = (r, h, y, m, seg = 96) => { const o = new T.Mesh(new T.CylinderGeometry(r, r, h, seg, 1, true, A0, ARC), m); o.position.set(0, y, CZ); rec.add(o); return o };
    const marCab = new T.MeshStandardMaterial({ color: '#FFFFFF', map: mTex, roughness: .25, emissive: '#FFFFFF', emissiveMap: mTex, emissiveIntensity: .25, side: T.DoubleSide });
    const greenBand = M('#2F5A4B', { roughness: .4, side: T.DoubleSide }), goldS = gold.clone(); goldS.side = T.DoubleSide;
    cylS(R0 + .02, .78, 1.07, marCab); cylS(R0 + .03, .5, .43, greenBand);
    for (const [y, h, dr] of [[.69, .07, .06], [.17, .08, .06], [1.47, .07, .08], [.05, .1, .08]]) cylS(R0 + dr, h, y, goldS);
    // 正面大 Logo＋WEIYANG（貼在弧面前方）
    const fc = document.createElement('canvas'); fc.width = 1024; fc.height = 256; const fg = fc.getContext('2d');
    const fT = new T.CanvasTexture(fc); fT.colorSpace = T.SRGBColorSpace;
    const drawF = () => { fg.clearRect(0, 0, 1024, 256); if (logoT.image && logoT.image.width) fg.drawImage(logoT.image, 150, 18, 220, 220); fg.font = '600 104px Georgia,"Times New Roman",serif'; try { fg.letterSpacing = '10px' } catch (e) { } fg.textBaseline = 'middle'; const gr2 = fg.createLinearGradient(0, 70, 0, 190); gr2.addColorStop(0, '#F6E2AE'); gr2.addColorStop(1, '#B8893C'); fg.fillStyle = gr2; fg.fillText('WEIYANG', 400, 132, 600); fT.needsUpdate = true };
    drawF(); const li = new Image(); li.src = 'office-logo-transparent.png'; li.onload = () => { logoT.image = li; drawF() };
    const fp = new T.Mesh(new T.PlaneGeometry(3.4, .85), new T.MeshBasicMaterial({ map: fT, transparent: true, depthWrite: false })); fp.position.set(0, 1.07, .9); fp.renderOrder = 14; rec.add(fp);
    // 櫃台後：兩台白色螢幕＋兩張接待椅（面向櫃台內側）
    const monM = M('#F4F6F8', { roughness: .3 }), scrM = new T.MeshBasicMaterial({ color: '#2B5C8E' }), chairM = M('#3E6B5A', { roughness: .55 });
    for (const sx of [-1.7, 1.7]) {
      const g = new T.Group(); g.position.set(sx, 0, -.15); rec.add(g);
      add(RB(1.15, .72, .08, .04), monM, 0, 1.98, 0, g); const sc = add(new T.PlaneGeometry(1.0, .58), scrM, 0, 1.98, -.045, g); sc.rotation.y = Math.PI;
      add(new T.BoxGeometry(.1, .3, .1), gold, 0, 1.6, .02, g); add(new T.BoxGeometry(.45, .04, .28), gold, 0, 1.55, .02, g);
      const c = new T.Group(); c.position.set(sx, 0, -1.25); rec.add(c);
      for (let k = 0; k < 5; k++) { const a = k * Math.PI * 2 / 5; const arm = add(new T.BoxGeometry(.1, .07, .62), gold, Math.sin(a) * .3, .1, Math.cos(a) * .3, c); arm.rotation.y = a }
      add(new T.CylinderGeometry(.07, .07, .5, 10), gold, 0, .4, 0, c); add(RB(1.0, .26, .95, .1), chairM, 0, .75, 0, c); add(RB(1.0, 1.3, .24, .1), chairM, 0, 1.5, -.45, c);
    }
  }
  // ---------- 兩側燈箱：深藍金框＋Logo＋WEIYANG ----------
  root.traverse(o => { if (!o.isMesh || !o.material || !o.material.map || !o.material.map.image) return; const im = o.material.map.image; if (!(im.width && im.height > im.width)) return; const wp = new T.Vector3(); o.getWorldPosition(wp); if (Math.abs(wp.z - 3.6) > 4 || wp.y > 3) return;
    const c = document.createElement('canvas'); c.width = 384; c.height = 576; const g = c.getContext('2d'); const t2 = new T.CanvasTexture(c); t2.colorSpace = T.SRGBColorSpace;
    const dr = () => { const gr2 = g.createLinearGradient(0, 0, 0, 576); gr2.addColorStop(0, '#22396E'); gr2.addColorStop(1, '#172A52'); g.fillStyle = gr2; g.fillRect(0, 0, 384, 576); g.strokeStyle = '#E2B85E'; g.lineWidth = 14; g.strokeRect(14, 14, 356, 548); g.lineWidth = 3; g.strokeRect(34, 34, 316, 508);
      const li2 = logoT.image; if (li2 && li2.width) g.drawImage(li2, 72, 120, 240, 240); g.font = '600 62px Georgia,serif'; g.textAlign = 'center'; g.fillStyle = '#EBC976'; g.fillText('WEIYANG', 192, 440); t2.needsUpdate = true };
    dr(); setTimeout(dr, 1500); setTimeout(dr, 4000); o.material = new T.MeshBasicMaterial({ map: t2 }) });
  // ---------- 豪華沙發：霧藍絲絨、大圓捲扶手、椅背拉扣、金色椅腳、抱枕 ----------
  const velvet = M('#7E98BE', { roughness: .62 }), velvetD = M('#6F89B0', { roughness: .66 }), pillowG = M('#E6C27A', { roughness: .5 }), pillowN = M('#2C4673', { roughness: .55 });
  const sofaGroups = root.children.filter(c => c.isGroup && c.children.length > 8 && c.children.every(k => k.isMesh && k.geometry.type === 'BoxGeometry') && c.children[0].userData.lobbyAction === 'lounge');
  for (const sgp of sofaGroups) {
    let w = 0; for (const k of sgp.children) w = Math.max(w, k.geometry.parameters.width);
    sgp.children.forEach(k => k.visible = false);
    const g = new T.Group(); g.position.copy(sgp.position); g.rotation.copy(sgp.rotation); G.add(g);
    add(RB(w, .34, 1.3, .14), velvet, 0, .58, .03, g);
    for (let i = 0, n = w > 2 ? 3 : 1; i < n; i++) { const sw = (w - .6) / n, xx = -w / 2 + .3 + sw * (i + .5); add(RB(sw - .05, .24, .9, .12), velvetD, xx, .86, .2, g) }
    const back = add(RB(w, 1.0, .34, .16), velvet, 0, 1.15, -.52, g);
    for (let i = 0; i < Math.max(2, Math.round(w * 1.6)); i++) for (let j = 0; j < 2; j++) add(new T.SphereGeometry(.045, 8, 6), gold, -w / 2 + .35 + i * (w - .7) / Math.max(1, Math.round(w * 1.6) - 1), 1.05 + j * .35, -.34, g);
    for (const sx of [-1, 1]) { const arm = add(new T.CylinderGeometry(.26, .26, 1.4, 20), velvet, sx * (w / 2 - .1), .92, .05, g); arm.rotation.x = Math.PI / 2; add(RB(.32, .5, 1.36, .1), velvet, sx * (w / 2 - .1), .62, .05, g);
      for (const lz of [.48, -.48]) { add(new T.CylinderGeometry(.06, .04, .36, 10), gold, sx * (w / 2 - .18), .18, lz, g) } }
    add(new T.BoxGeometry(w - .2, .05, .05), gold, 0, .41, .69, g);
    for (const [xx, m] of (w > 2 ? [[-w * .3, pillowG], [0, pillowN], [w * .3, pillowG]] : [[0, pillowG]])) { const pl = add(RB(.55, .5, .18, .08), m, xx, 1.12, -.25, g); pl.rotation.x = -.18 }
  }
  // ---------- 茶几：大理石桌面＋金腳＋藍色繡球花；拿掉蛋糕塔 ----------
  root.traverse(o => { if (!o.isMesh) return; for (let q = o; q; q = q.parent) if (q === G || q === rec) return; const wp = new T.Vector3(); o.getWorldPosition(wp); if (Math.hypot(wp.x, wp.z + 3.15) < 1.25 && wp.y > .66 && wp.y < 2.6 && !o.isSprite) o.visible = false;
    if (Math.hypot(wp.x, wp.z + 3.15) < .05 && wp.y > .2 && wp.y < .7) o.visible = false });
  { const g = new T.Group(); g.position.set(0, 0, -3.15); G.add(g);
    add(new T.CylinderGeometry(1.05, 1.05, .1, 48), marM, 0, .62, 0, g); add(new T.TorusGeometry(1.06, .05, 8, 48), gold, 0, .62, 0, g).rotation.x = Math.PI / 2;
    for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + Math.PI / 4; const lg = add(new T.CylinderGeometry(.04, .04, .62, 8), gold, Math.cos(a) * .6, .3, Math.sin(a) * .6, g); lg.rotation.z = Math.cos(a) * .3; lg.rotation.x = -Math.sin(a) * .3 }
    add(new T.TorusGeometry(.55, .04, 8, 36), gold, 0, .12, 0, g).rotation.x = Math.PI / 2;
    add(new T.CylinderGeometry(.26, .2, .45, 20), M('#F4F8FB', { roughness: .1, transparent: true, opacity: .55 }), 0, .9, 0, g);
    const HY = ['#7FA6E3', '#9DB9EE', '#6E8FD8', '#B4C8F2'].map(c => M(c, { roughness: .6 }));
    for (let k = 0; k < 14; k++) { const a = k * 2.4, r = (k % 3) * .14; add(new T.SphereGeometry(.17, 12, 10), HY[k % 4], Math.cos(a) * r, 1.28 + (k % 2) * .1 + (k < 3 ? .12 : 0), Math.sin(a) * r, g) }
    for (let k = 0; k < 5; k++) { const lf = add(new T.SphereGeometry(.16, 10, 8), M('#5DA060'), Math.cos(k * 1.26) * .35, 1.15, Math.sin(k * 1.26) * .35, g); lf.scale.y = .45 } }
  // ---------- 地毯：深藍底波斯花紋（米金花邊、角花、中央徽章、流蘇） ----------
  root.traverse(o => { if (o.isMesh && ['d5b783', 'd5b77f', 'd5b780'].includes(hex(o)) && o.position.y < .12 && Math.abs(o.position.z + 3.5) < 3) o.visible = false });
  { const rc = document.createElement('canvas'); rc.width = 1760; rc.height = 1040; const g = rc.getContext('2d'); const W2 = 1760, H2 = 1040;
    g.fillStyle = '#1B2F55'; g.fillRect(0, 0, W2, H2);
    const cream = '#E9D2A0', gd = '#C9A25A', rose = '#A9415A';
    // 外花邊
    g.fillStyle = cream; g.fillRect(40, 40, W2 - 80, 90); g.fillRect(40, H2 - 130, W2 - 80, 90); g.fillRect(40, 40, 90, H2 - 80); g.fillRect(W2 - 130, 40, 90, H2 - 80);
    g.fillStyle = '#1B2F55'; const vine = (x0, y0, x1, y1) => { const n = Math.round(Math.hypot(x1 - x0, y1 - y0) / 70); for (let i = 0; i < n; i++) { const x = x0 + (x1 - x0) * (i + .5) / n, y = y0 + (y1 - y0) * (i + .5) / n; g.beginPath(); g.ellipse(x, y, 22, 22, 0, 0, 7); g.fill(); g.fillStyle = rose; g.beginPath(); g.arc(x, y, 9, 0, 7); g.fill(); g.fillStyle = '#1B2F55' } };
    vine(85, 85, W2 - 85, 85); vine(85, H2 - 85, W2 - 85, H2 - 85); vine(85, 85, 85, H2 - 85); vine(W2 - 85, 85, W2 - 85, H2 - 85);
    g.strokeStyle = gd; g.lineWidth = 8; g.strokeRect(160, 160, W2 - 320, H2 - 320); g.lineWidth = 3; g.strokeRect(185, 185, W2 - 370, H2 - 370);
    // 角花
    for (const [cx, cy, sx, sy] of [[185, 185, 1, 1], [W2 - 185, 185, -1, 1], [185, H2 - 185, 1, -1], [W2 - 185, H2 - 185, -1, -1]]) { g.fillStyle = cream; g.beginPath(); g.moveTo(cx, cy); g.quadraticCurveTo(cx + sx * 220, cy, cx + sx * 260, cy + sy * 40); g.quadraticCurveTo(cx + sx * 120, cy + sy * 60, cx + sx * 40, cy + sy * 260); g.quadraticCurveTo(cx, cy + sy * 220, cx, cy); g.fill(); g.fillStyle = rose; g.beginPath(); g.arc(cx + sx * 70, cy + sy * 70, 18, 0, 7); g.fill() }
    // 中央徽章
    const cx = W2 / 2, cy = H2 / 2; g.fillStyle = cream; g.beginPath(); g.ellipse(cx, cy, 330, 220, 0, 0, 7); g.fill(); g.fillStyle = '#1B2F55'; g.beginPath(); g.ellipse(cx, cy, 290, 185, 0, 0, 7); g.fill();
    g.fillStyle = cream; for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; g.beginPath(); g.ellipse(cx + Math.cos(a) * 200, cy + Math.sin(a) * 125, 34, 20, a, 0, 7); g.fill() }
    g.fillStyle = gd; g.beginPath(); g.ellipse(cx, cy, 120, 80, 0, 0, 7); g.fill(); g.fillStyle = rose; g.beginPath(); g.ellipse(cx, cy, 60, 40, 0, 0, 7); g.fill();
    for (const [dx, dy] of [[-1, 0], [1, 0]]) { g.fillStyle = cream; g.beginPath(); g.moveTo(cx + dx * 330, cy); g.lineTo(cx + dx * 420, cy - 50); g.lineTo(cx + dx * 470, cy); g.lineTo(cx + dx * 420, cy + 50); g.closePath(); g.fill() }
    // 滿版小花
    g.fillStyle = 'rgba(233,210,160,.55)'; for (let i = 0; i < 140; i++) { const x = 220 + rr() * (W2 - 440), y = 220 + rr() * (H2 - 440); if (((x - cx) / 360) ** 2 + ((y - cy) / 250) ** 2 < 1) continue; g.beginPath(); g.arc(x, y, 7 + rr() * 6, 0, 7); g.fill() }
    const rt = new T.CanvasTexture(rc); rt.colorSpace = T.SRGBColorSpace; rt.anisotropy = 8;
    const rug = add(new T.PlaneGeometry(8.8, 5.2), new T.MeshStandardMaterial({ map: rt, roughness: .95 }), 0, .1, -3.5); rug.rotation.x = -Math.PI / 2;
    const fr = M('#E9D2A0', { roughness: .9 }); for (const zz of [-6.15, -.85]) for (let i = 0; i < 44; i++) add(new T.BoxGeometry(.05, .02, .22), fr, -4.3 + i * .2, .085, zz);
  }
  // ---------- 角落植物：金色高花盆的發財樹與花叢 ----------
  { const FLW = ['#FF7FA8', '#FFC940', '#B784F5', '#FF8F5A', '#FF6FB0'].map(c => M(c, { roughness: .55 })), LV = [M('#4FB25A', { roughness: .6 }), M('#7ACB5E', { roughness: .6 })];
    let n = 0; for (const [px, pz] of [[-11.6, -9.3], [5.6, -9.4], [-11.6, 9.0], [11.6, 9.0]]) { const g = new T.Group(); g.position.set(px, 0, pz); g.scale.setScalar(1.25); G.add(g);
      add(new T.CylinderGeometry(.42, .36, 1.5, 28), gold, 0, .75, 0, g); add(new T.TorusGeometry(.42, .05, 8, 28), gold, 0, 1.5, 0, g).rotation.x = Math.PI / 2;
      if (n++ % 2 === 0) { for (let k = 0; k < 3; k++) add(new T.CylinderGeometry(.06, .09, 1.3, 8), M('#B98955'), Math.cos(k * 2.1) * .06, 2.1, Math.sin(k * 2.1) * .06, g); for (const [x, y, z, r] of [[0, 3.1, 0, .55], [-.45, 2.8, .1, .42], [.45, 2.85, -.1, .44], [.1, 2.75, .45, .4], [-.1, 2.9, -.45, .4], [0, 3.5, .05, .38]]) add(new T.SphereGeometry(r, 16, 12), LV[(x > 0) | 0], x, y, z, g) }
      else { for (let k = 0; k < 7; k++) { const a = k * .9; add(new T.SphereGeometry(.34, 14, 10), LV[k % 2], Math.cos(a) * .3, 1.85 + (k % 3) * .12, Math.sin(a) * .3, g) } for (let k = 0; k < 9; k++) { const a = k * 2.4, r = .18 + (k % 3) * .14; add(new T.SphereGeometry(.15, 10, 8), FLW[k % FLW.length], Math.cos(a) * r, 2.1 + (k % 3) * .18, Math.sin(a) * r, g) } } } }

  // 動畫迴圈（只在大廳可見時更新）
  const t0 = performance.now(); const tick = () => { if (root.parent && root.visible) { const t = (performance.now() - t0) / 1000; for (const f of anim) f(t) } requestAnimationFrame(tick) }; tick();
  return G;
}
