// v507 照陳老闆參考圖的頂級圓柱玻璃觀景電梯：香檳金粗方柱＋多圈金環帶、中段弧形深藍招牌（Logo＋德威陽國際法律事務所＋Wei & Yang International Law Firm）、
// 弧形玻璃雙開滑門（跟原本門同步開關）、深藍叫梯面板（上下箭頭＋1/2/3 圓鈕，所在樓層亮）、圓形大理石拼花＋金環、金色圓筒花盆（圓球花，不用尖葉）。
// 後半段埋進牆裡（方案 A），不超出牆。原本電梯外觀隱藏（點擊、門的邏輯照舊）。光都穩定不閃。
export function buildRefLift(T, cabin, floor) {
  const root = cabin.root; if (!root || root.userData.wyRef) return; root.userData.wyRef = 1;
  const hideAll = o => o && o.traverse(q => { if ((q.isMesh || q.isSprite) && q.material) { q.material = Array.isArray(q.material) ? q.material.map(m => { const c = m.clone(); c.visible = false; return c }) : (() => { const c = q.material.clone(); c.visible = false; return c })() } });
  hideAll(root); (cabin.extraHide || []).forEach(hideAll);
  const G = new T.Group(); root.add(G);
  root.updateMatrixWorld(true);
  const dirW = floor === 1 ? new T.Vector3(0, 0, 1) : new T.Vector3(-1, 0, 0);
  const inv = new T.Matrix4().copy(root.matrixWorld).invert(); const dirL = dirW.clone().transformDirection(inv).setY(0).normalize();
  G.rotation.y = Math.atan2(dirL.x, dirL.z);
  const add = (geo, m, x = 0, y = 0, z = 0, p = G) => { const o = new T.Mesh(geo, m); o.position.set(x, y, z); p.add(o); return o };
  /* 反光用的環境貼圖（暖白天花＋亮光條），讓金色在大廳裡也有光澤，不會變暗 */ const envT = (() => { const c = document.createElement('canvas'); c.width = 512; c.height = 256; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#FFFFFF'); gr.addColorStop(.45, '#FFF2D8'); gr.addColorStop(.55, '#C9A876'); gr.addColorStop(1, '#8A6A40'); g.fillStyle = gr; g.fillRect(0, 0, 512, 256); g.fillStyle = 'rgba(255,255,255,.95)'; for (let k = 0; k < 6; k++) g.fillRect(k * 86 + 20, 20, 26, 90); const t = new T.CanvasTexture(c); t.mapping = T.EquirectangularReflectionMapping; t.colorSpace = T.SRGBColorSpace; return t })();
  /* v507 反光金屬（跟島上屋頂一樣的亮面塗層＋金屬光澤） */ const gold = new T.MeshPhysicalMaterial({ color: '#F0D08C', metalness: .75, roughness: .14, clearcoat: 1, clearcoatRoughness: .05, emissive: '#9A7230', emissiveIntensity: .3, envMap: envT, envMapIntensity: 1.3 });
  const goldL = new T.MeshPhysicalMaterial({ color: '#F8E0A8', metalness: .7, roughness: .12, clearcoat: 1, clearcoatRoughness: .04, emissive: '#B08440', emissiveIntensity: .35, envMap: envT, envMapIntensity: 1.4 });
  const navy = new T.MeshStandardMaterial({ color: '#1F2E5C', roughness: .35 });
  const glass = new T.MeshPhysicalMaterial({ color: '#EAF4FA', transparent: true, opacity: .22, roughness: .04, clearcoat: 1, depthWrite: false, side: T.DoubleSide });
  const R = 1.72, H = 6.7, Y = .02;
  // 地面：圓形大理石拼花＋兩圈金環（平貼地面）
  const mt = (() => { const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d'); g.fillStyle = '#F7EFE4'; g.fillRect(0, 0, 512, 512); for (let i = 0; i < 26; i++) { const x = Math.random() * 512, y = Math.random() * 512, r = 60 + Math.random() * 120; const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(225,212,196,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 512, 512) } const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t })();
  const fl = add(new T.CircleGeometry(R + 1.05, 72), new T.MeshStandardMaterial({ map: mt, roughness: .2 }), 0, Y + .012, 0); fl.rotation.x = -Math.PI / 2;
  for (const [r, w] of [[R + 1.05, .14], [R + .55, .1], [R * .55, .08]]) { const g = add(new T.RingGeometry(r - w, r, 72), goldL, 0, Y + .02, 0); g.rotation.x = -Math.PI / 2 }
  // 玻璃圓筒（後半段埋進牆裡）
  add(new T.CylinderGeometry(R, R, H, 48, 1, true), glass, 0, Y + H / 2, 0);
  // 金環帶（v507 細緻版）：每一圈都是「一條主環＋上下兩條細線」，不用粗塊
  const ring = (y, h, r = R + .07, m = goldL) => add(new T.CylinderGeometry(r, r, h, 72, 1, true), m, 0, y, 0);
  const trio = (y, h = .12, r = R + .07) => { ring(y, h, r, gold); ring(y + h / 2 + .06, .025, r + .02); ring(y - h / 2 - .06, .025, r + .02) };
  trio(Y + .3, .16, R + .09); add(new T.CylinderGeometry(R + .09, R + .09, .04, 72), gold, 0, Y + .38, 0);
  trio(Y + 4.12); trio(Y + 5.62); ring(Y + 4.87, 1.35, R + .06, navy);
  trio(Y + H - .2, .16, R + .12); ring(Y + H + .02, .03, R + .2); trio(Y + H + .14, .1, R + .24); add(new T.CylinderGeometry(R + .24, R + .24, .04, 72), gold, 0, Y + H + .21, 0);
  // 金色方柱（細緻版）：細柱＋兩側極細金線，門兩側稍粗
  const posts = [[-.62, .16], [.62, .16], [-1.1, .1], [1.1, .1], [-1.6, .1], [1.6, .1], [-2.15, .1], [2.15, .1], [Math.PI, .1]];
  for (const [a, w] of posts) { const x = Math.sin(a) * (R + .03), z = Math.cos(a) * (R + .03); add(new T.BoxGeometry(w, H, w), gold, x, Y + H / 2, z).rotation.y = a;
    for (const e of [-1, 1]) { const d = e * (w / 2 + .03); add(new T.BoxGeometry(.018, H, .018), goldL, x + Math.cos(a) * d, Y + H / 2, z - Math.sin(a) * d) } }
  // 玻璃分格細線（每格中間一條橫向細金線）
  for (const y of [Y + 2.25, Y + 6.15]) ring(y, .018, R + .015);
  // 內部：廂地板、天花暖光、扶手
  const inF = add(new T.CircleGeometry(R - .05, 48), new T.MeshStandardMaterial({ map: mt, roughness: .2 }), 0, Y + .42, 0); inF.rotation.x = -Math.PI / 2;
  const inR = add(new T.RingGeometry(R * .45, R * .52, 48), goldL, 0, Y + .43, 0); inR.rotation.x = -Math.PI / 2;
  const ceil = add(new T.CircleGeometry(R - .1, 48), new T.MeshBasicMaterial({ color: '#FFE9BE' }), 0, Y + 4.0, 0); ceil.rotation.x = Math.PI / 2;
  const hr = add(new T.TorusGeometry(R - .15, .04, 8, 48, Math.PI * 1.3), gold, 0, Y + 1.4, 0); hr.rotation.set(Math.PI / 2, 0, Math.PI * .85);
  // 弧形深藍招牌：只放一個大大的金色 Logo（電梯在畫面裡很小，字看不到）＋細金框
  { /* v507 畫布比例跟弧形招牌實際寬高一致，Logo 不會被拉長 */ const ARC0 = 1.5, SW = Math.round(300 * (R + .1) * ARC0 / 1.3); const c = document.createElement('canvas'); c.width = SW; c.height = 300; const g = c.getContext('2d'); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace;
    const draw = im => { g.fillStyle = '#1F2E5C'; g.fillRect(0, 0, SW, 300); g.strokeStyle = '#EFCB7E'; g.lineWidth = 4; g.strokeRect(14, 14, SW - 28, 272); g.lineWidth = 1.5; g.strokeRect(24, 24, SW - 48, 252);
      if (im) { const S = 270, cc = document.createElement('canvas'); cc.width = cc.height = S; const gg = cc.getContext('2d'); const k = Math.min(S / im.width, S / im.height); gg.drawImage(im, (S - im.width * k) / 2, (S - im.height * k) / 2, im.width * k, im.height * k); gg.globalCompositeOperation = 'source-in'; gg.fillStyle = '#F2D28A'; gg.fillRect(0, 0, S, S); g.drawImage(cc, SW / 2 - S / 2, 15) } t.needsUpdate = true };
    draw(null); const im = new Image(); im.onload = () => draw(im); im.src = 'office-logo-transparent.png';
    const ARC = 1.5; add(new T.CylinderGeometry(R + .1, R + .1, 1.3, 48, 1, true, -ARC / 2, ARC), new T.MeshBasicMaterial({ map: t }), 0, Y + 4.87, 0) }
  // 樓層顯示：門上方的小深藍圓牌，金色「1F」等
  { const c = document.createElement('canvas'); c.width = c.height = 160; const g = c.getContext('2d'); g.fillStyle = '#1F2E5C'; g.beginPath(); g.arc(80, 80, 76, 0, 7); g.fill(); g.strokeStyle = '#EFCB7E'; g.lineWidth = 5; g.stroke(); g.lineWidth = 1.5; g.beginPath(); g.arc(80, 80, 64, 0, 7); g.stroke();
    g.fillStyle = '#F2D28A'; g.font = '600 64px Georgia,serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(floor + 'F', 80, 84); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace;
    add(new T.CircleGeometry(.24, 32), new T.MeshBasicMaterial({ map: t }), 0, Y + 3.88, R + .13) }
  // 弧形玻璃雙開滑門（金框）：依原本門的開合程度沿弧線滑開
  const doorL = new T.Group(), doorR = new T.Group(); G.add(doorL); G.add(doorR);
  const mkDoor = (grp, a0, a1) => { add(new T.CylinderGeometry(R + .06, R + .06, 3.6, 16, 1, true, a0, a1 - a0), new T.MeshPhysicalMaterial({ color: '#F2E6C8', transparent: true, opacity: .3, roughness: .05, clearcoat: 1, depthWrite: false, side: T.DoubleSide }), 0, Y + 2.25, 0, grp);
    for (const a of [a0, a1]) add(new T.BoxGeometry(.04, 3.6, .05), goldL, Math.sin(a) * (R + .08), Y + 2.25, Math.cos(a) * (R + .08), grp).rotation.y = a;
    for (const y of [Y + .47, Y + 4.03, Y + 1.5]) add(new T.CylinderGeometry(R + .08, R + .08, .035, 16, 1, true, a0, a1 - a0), goldL, 0, y, 0, grp) };
  mkDoor(doorL, -.6, 0); mkDoor(doorR, 0, .6);
  // 叫梯面板：深藍＋金框＋上下箭頭＋1/2/3 圓鈕
  { const a = 1.0, px = Math.sin(a) * (R + .3), pz = Math.cos(a) * (R + .3); const P = new T.Group(); P.position.set(px, Y + 1.9, pz); P.rotation.y = a; G.add(P);
    add(new T.BoxGeometry(.62, 1.7, .12), goldL, 0, 0, 0, P); const c = document.createElement('canvas'); c.width = 160; c.height = 420; const g = c.getContext('2d'); g.fillStyle = '#1F2E5C'; g.fillRect(0, 0, 160, 420); g.fillStyle = '#EFCB7E'; g.strokeStyle = '#EFCB7E'; g.lineWidth = 5;
    g.beginPath(); g.moveTo(80, 18); g.lineTo(96, 42); g.lineTo(64, 42); g.closePath(); g.fill(); g.beginPath(); g.moveTo(80, 402); g.lineTo(96, 378); g.lineTo(64, 378); g.closePath(); g.fill();
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '600 44px Georgia,serif'; [3, 2, 1].forEach((n, i) => { const y = 112 + i * 98; g.beginPath(); g.arc(80, y, 34, 0, 7); if (n === floor) { g.fillStyle = '#EFCB7E'; g.fill(); g.fillStyle = '#1F2E5C' } else { g.stroke(); g.fillStyle = '#EFCB7E' } g.fillText(String(n), 80, y + 2) });
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; add(new T.PlaneGeometry(.5, 1.32), new T.MeshBasicMaterial({ map: t }), 0, 0, .065, P) }
  // 金色圓筒花盆＋發財樹圓球樹冠（不用尖葉）
  for (const s of [-1, 1]) { const g = new T.Group(); g.position.set(s * (R + .9), Y, .75); G.add(g); add(new T.CylinderGeometry(.42, .38, 1.0, 28), gold, 0, .5, 0, g); add(new T.CylinderGeometry(.44, .44, .06, 28), goldL, 0, 1.0, 0, g);
    add(new T.CylinderGeometry(.06, .08, .8, 8), new T.MeshStandardMaterial({ color: '#8a6a45' }), 0, 1.4, 0, g); for (const [x, y, z, r] of [[0, 2.1, 0, .5], [.32, 1.85, .12, .36], [-.3, 1.9, -.1, .36], [0, 2.5, -.1, .32]]) add(new T.SphereGeometry(r, 14, 10), new T.MeshStandardMaterial({ color: '#4E9A5C', roughness: .8 }), x, y, z, g);
    for (let k = 0; k < 4; k++) add(new T.SphereGeometry(.12, 10, 8), new T.MeshStandardMaterial({ color: ['#F4A9BE', '#FFFFFF', '#F7D98A', '#E86A8F'][k], roughness: .7 }), Math.cos(k * 1.6) * .42, 2.0 + (k % 2) * .25, Math.sin(k * 1.6) * .3 + .25, g) }
  // 門開合同步
  const doors = (cabin.doors || []).map(d => d.pivot).filter(Boolean); const base = doors.map(p => ({ x: p.position.x, z: p.position.z, r: p.rotation.y }));
  const openAmt = () => { let m = 0; doors.forEach((p, i) => { m = Math.max(m, Math.abs(p.position.x - base[i].x) + Math.abs(p.position.z - base[i].z) + Math.abs(p.rotation.y - base[i].r)) }); return m < .3 ? 0 : Math.min(1, (m - .3) / .8) };
  const tick = () => { const o = openAmt(); doorL.rotation.y = -o * .62; doorR.rotation.y = o * .62; requestAnimationFrame(tick) }; tick();
  // v507 不漏出牆外：牆的內側面（各樓實測 1F 0.68、2F 1.16、3F 1.64）以後全部切掉，牆面上補一片電梯廂背板
  { const d = ({ 1: .66, 2: 1.14, 3: 1.62 })[floor] || .66; root.updateMatrixWorld(true);
    const cW = new T.Vector3(); root.getWorldPosition(cW); const nW = dirW.clone().normalize();
    const plane = new T.Plane().setFromNormalAndCoplanarPoint(nW, cW.clone().addScaledVector(nW, -d));
    G.traverse(o => { if (!o.isMesh || !o.material) return; const ms = Array.isArray(o.material) ? o.material : [o.material]; ms.forEach(m => { m.clippingPlanes = [plane] }) });
    // 背板：香檳金面板＋深藍細框，中間大 Logo 圓徽；樓層顯示（搭電梯時會跳 2F→3F）放在門的上方內側
    const w = 2 * Math.sqrt(Math.max(.2, R * R - d * d)) + .02, BP = new T.Group(); BP.position.set(0, 0, -d + .03); G.add(BP);
    add(new T.PlaneGeometry(w, H - .5), new T.MeshStandardMaterial({ color: '#F6DFAE', roughness: .35, metalness: .2, emissive: '#8a6a2a', emissiveIntensity: .22 }), 0, Y + (H - .5) / 2 + .42, 0, BP);
    for (const y of [Y + .9, Y + 3.7]) add(new T.BoxGeometry(w, .05, .02), goldL, 0, y, .01, BP);
    { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'); g.fillStyle = '#1F2E5C'; g.beginPath(); g.arc(128, 128, 124, 0, 7); g.fill(); g.strokeStyle = '#EFCB7E'; g.lineWidth = 8; g.stroke();
      const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; const im = new Image(); im.onload = () => { g.drawImage(im, 38, 38, 180, 180); t.needsUpdate = true }; im.src = 'office-logo-transparent.png';
      add(new T.CircleGeometry(Math.min(.62, w * .42), 40), new T.MeshBasicMaterial({ map: t }), 0, Y + 2.35, .02, BP) }
    // 廂內樓層顯示（深藍圓角牌、金色大字＋上下箭頭）
    const dc = document.createElement('canvas'); dc.width = 320; dc.height = 140; const dg = dc.getContext('2d'); const dt = new T.CanvasTexture(dc); dt.colorSpace = T.SRGBColorSpace;
    const show = (txt, arrow) => { dg.clearRect(0, 0, 320, 140); dg.fillStyle = '#1F2E5C'; dg.beginPath(); dg.roundRect(4, 4, 312, 132, 26); dg.fill(); dg.strokeStyle = '#EFCB7E'; dg.lineWidth = 6; dg.stroke();
      dg.fillStyle = '#F2D28A'; dg.textAlign = 'center'; dg.textBaseline = 'middle'; dg.font = '700 84px Georgia,serif'; dg.fillText(txt, arrow ? 190 : 160, 74);
      if (arrow) { dg.beginPath(); if (arrow > 0) { dg.moveTo(62, 40); dg.lineTo(96, 92); dg.lineTo(28, 92) } else { dg.moveTo(62, 100); dg.lineTo(96, 48); dg.lineTo(28, 48) } dg.closePath(); dg.fill() } dt.needsUpdate = true };
    show(floor + 'F', 0);
    const disp = add(new T.PlaneGeometry(.9, .4), new T.MeshBasicMaterial({ map: dt, transparent: true }), 0, Y + 3.55, R - .15); disp.rotation.y = Math.PI;
    G.userData.show = show; G.userData.dirW = nW; G.userData.center = cW; G.userData.backD = d; cabin.lift = G }
  return G;
}
