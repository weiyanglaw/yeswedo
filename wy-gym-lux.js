// v508 3F 健身房（照陳老闆兩張參考圖）：金框玻璃房、上方深藍招牌只放事務所 Logo、地板沿用 3F 原本地板、器材區鋪綠色運動地墊。
// 器材：帶螢幕跑步機、啞鈴架（每層大數字牌）、飛輪、可調式訓練椅、龍門架、WEIYANG 健身球、紫色瑜珈墊＋Logo、壺鈴、滾筒、小啞鈴、金框鏡牆、發財樹。
// 原本的玻璃牆、金框、玻璃門、點擊遊戲選單照舊；舊器材、舊深灰地板、舊綠色小招牌收起。所有光穩定不閃，上下面都錯開高度不重疊。
export function applyGymLux(T, ctx) {
  const gym = ctx.gym; if (!gym || gym.userData.wyLux) return; gym.userData.wyLux = 1;
  const targets = ctx.targets || [];
  // 收起舊東西：深灰地板兩層、舊器材、舊伸展墊、舊綠色招牌與文字
  const keepGlass = m => m.material && m.material.transparent && m.material.opacity < .3;
  for (const ch of [...gym.children]) {
    const m = ch.isMesh ? ch.material : null; const hex = m && m.color ? m.color.getHex() : -1;
    if (ch.isGroup) { let glassDoor = false; ch.traverse(o => { if (o.isMesh && keepGlass(o)) glassDoor = true }); if (!glassDoor) ch.visible = false; continue }
    if (!ch.isMesh) continue;
    if (keepGlass(ch)) continue;
    if (m && m.visible === false) continue; // 點擊範圍
    if (hex === 0x41474b || hex === 0x4b5254 || hex === 0x36796a || hex === 0x165747) { ch.visible = false; continue }
    if (m && m.map) { ch.visible = false; continue } // 舊文字招牌
  }

  // v508 健身房往鏡頭方向加大：前牆從 z 7.00 推到 8.55（貼近 3F 地板邊 8.75），側牆跟著拉長
  const EXT = 1.55;
  for (const ch of gym.children) { if (!ch.isMesh || !ch.geometry || !ch.geometry.parameters) continue; const P = ch.geometry.parameters, z = ch.position.z;
    if (Math.abs(z - 7.0) < .05) { ch.position.z += EXT; continue }
    if (Math.abs(z - 4.43) < .05 && P.depth > 5) { ch.scale.z = (P.depth + EXT) / P.depth; ch.position.z += EXT / 2; continue }
    if (Math.abs(z - 5.975) < .05 && Math.abs(P.depth - 2.05) < .05) { ch.scale.z = (P.depth + EXT) / P.depth; ch.position.z += EXT / 2 } }
  const G = new T.Group(); G.name = 'wyGymLux'; gym.add(G);
  const M = (c, o = {}) => new T.MeshStandardMaterial({ color: c, roughness: .5, ...o });
  const gold = M('#F0CF84', { metalness: .55, roughness: .25, emissive: '#8a6a2a', emissiveIntensity: .25 });
  const dark = M('#3B404B', { roughness: .45 }), dark2 = M('#2E323B', { roughness: .5 }), silver = M('#C9CED6', { metalness: .45, roughness: .3 });
  const rubber = M('#26292F', { roughness: .8 }), purple = M('#8E6BD8', { roughness: .55 }), purpleL = M('#A98BEB', { roughness: .6 });
  let CUR = G;
  const add = (geo, m, x, y, z, p = CUR) => { const o = new T.Mesh(geo, m); o.position.set(x, y, z); p.add(o); return o };
  const box = (x, y, z, w, h, d, m, p = CUR) => add(new T.BoxGeometry(w, h, d), m, x, y, z, p);
  const rod = (a, b, r, m, p = CUR) => { const av = new T.Vector3(...a), bv = new T.Vector3(...b), v = bv.clone().sub(av); const o = new T.Mesh(new T.CylinderGeometry(r, r, v.length(), 14), m); o.position.copy(av.add(bv).multiplyScalar(.5)); o.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), v.normalize()); p.add(o); return o };
  const grp = (x, z, ry = 0) => { const g = new T.Group(); g.position.set(x, 0, z); g.rotation.y = ry; G.add(g); CUR = g; return g };
  const canvasTex = (w, h, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); draw(g, w, h); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; return { t, g, c } };
  const logoImg = new Image(); const logoUsers = []; logoImg.onload = () => logoUsers.forEach(f => f()); logoImg.src = 'office-logo-transparent.png';
  // ── 綠色運動地墊（只鋪器材區，比 3F 地板高一點，不重疊閃爍）
  { const sh = new T.Shape(), w = 4.2, d = 4.9 + EXT, r = .3, a = -w / 2, b = -d / 2; sh.moveTo(a + r, b); sh.lineTo(-a - r, b); sh.quadraticCurveTo(-a, b, -a, b + r); sh.lineTo(-a, -b - r); sh.quadraticCurveTo(-a, -b, -a - r, -b); sh.lineTo(a + r, -b); sh.quadraticCurveTo(a, -b, a, -b - r); sh.lineTo(a, b + r); sh.quadraticCurveTo(a, b, a + r, b);
    const gq = new T.ExtrudeGeometry(sh, { depth: .03, bevelEnabled: false }); gq.rotateX(-Math.PI / 2); add(gq, M('#4FB98A', { roughness: .85 }), -7.39, .012, 4.43 + EXT / 2);
    const gq2 = new T.ExtrudeGeometry(sh, { depth: .012, bevelEnabled: false }); gq2.rotateX(-Math.PI / 2); const lineM = M('#E9D08C', { roughness: .6 }); const ln = add(gq2, lineM, -7.39, .004, 4.43 + EXT / 2); ln.scale.set(1.025, 1, 1.02) }
  // ── 上方深藍招牌：只放事務所 Logo（大圓徽＋金框）
  { const S = new T.Group(); S.position.set(-5.06, 5.05, 4.43); S.rotation.y = Math.PI / 2; G.add(S);
    box(0, 0, -.04, 2.7, 1.05, .1, gold, S); box(0, 0, .02, 2.56, .92, .06, M('#1F2E5C', { roughness: .4 }), S);
    const L = canvasTex(1024, 360, (g, W, H) => { g.fillStyle = '#1F2E5C'; g.fillRect(0, 0, W, H) });
    const draw = () => { const g = L.g; g.fillStyle = '#1F2E5C'; g.fillRect(0, 0, 1024, 360); g.strokeStyle = '#EFCB7E'; g.lineWidth = 6; g.strokeRect(14, 14, 996, 332); g.drawImage(logoImg, 512 - 160, 20, 320, 320); L.t.needsUpdate = true };
    logoUsers.push(draw); add(new T.PlaneGeometry(2.5, .88), new T.MeshBasicMaterial({ map: L.t }), 0, 0, .056, S) }
  // ── 金框鏡牆（後牆）
  { const W = new T.Group(); W.position.set(-9.52, 0, 4.43 + EXT / 2); W.rotation.y = Math.PI / 2; G.add(W);
    box(0, 2.2, 0, 4.6 + EXT, 3.0, .05, gold, W); box(0, 2.2, .03, 4.44 + EXT, 2.84, .03, M('#DDEAF2', { metalness: .6, roughness: .08, emissive: '#9fb6c6', emissiveIntensity: .25 }), W);
    for (const x of [-1.5, -.5, .5, 1.5]) box(x, 2.2, .05, .04, 2.84, .02, gold, W) }
  // ── 跑步機（帶螢幕，Logo 字樣），靠前側玻璃，跑帶朝房間
  { const g = grp(-7.75, 2.65, 0);
    box(0, .22, 0, 2.3, .28, .95, dark); box(0, .37, 0, 2.05, .03, .72, rubber); box(.2, .26, 0, 2.1, .2, 1.0, silver).scale.set(1, .5, 1);
    box(1.12, .32, 0, .14, .32, .98, dark2); box(-1.08, .3, 0, .2, .36, 1.0, dark2);
    for (const z of [-.42, .42]) { rod([-1.0, .35, z], [-1.25, 1.75, z * .9], .06, silver); rod([-1.25, 1.55, z * .9], [-.55, 1.55, z * 1.05], .045, dark) }
    const con = new T.Group(); con.position.set(-1.28, 1.95, 0); con.rotation.z = -.35; g.add(con); box(0, 0, 0, .14, .62, 1.02, dark2, con);
    const s = canvasTex(512, 300, (c, W, H) => { const gr = c.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#9FD3F5'); gr.addColorStop(.55, '#CFEAF8'); gr.addColorStop(.56, '#6FBF7E'); gr.addColorStop(1, '#4E9A5C'); c.fillStyle = gr; c.fillRect(0, 0, W, H); c.fillStyle = '#8C8F96'; c.beginPath(); c.moveTo(210, 168); c.lineTo(302, 168); c.lineTo(420, 300); c.lineTo(92, 300); c.fill(); c.fillStyle = '#F6DC9A'; c.fillRect(250, 190, 12, 26); c.fillRect(248, 240, 16, 34); c.fillStyle = '#1F2E5C'; c.fillRect(0, 0, W, 52); c.fillStyle = '#F2D28A'; c.font = '700 34px Georgia,serif'; c.textAlign = 'center'; c.fillText('WEIYANG', W / 2, 38) });
    const sc = add(new T.PlaneGeometry(.9, .52), new T.MeshBasicMaterial({ map: s.t }), .075, 0, 0, con); sc.rotation.y = Math.PI / 2;
    box(-1.14, 1.62, 0, .12, .1, .5, M('#E5484D'), g) }
  // ── 啞鈴架（四層，每層一面大數字牌）
  { const g = grp(-9.05, 4.95, Math.PI / 2);
    for (const e of [-1, 1]) { rod([e * .85, .05, -.35], [e * .85, 1.55, .0], .05, dark); rod([e * .85, .05, .35], [e * .85, 1.55, .0], .05, dark) }
    const shelf = [[.35, '10'], [.7, '8'], [1.03, '6'], [1.33, '4']];
    shelf.forEach(([y, n], i) => { box(0, y, (i - 1.5) * -.09, 1.72, .05, .38, dark2, g);
      for (let k = 0; k < 4; k++) { const x = -.6 + k * .4, r = .1 + (3 - i) * .012; const db = new T.Group(); db.position.set(x, y + r + .03, (i - 1.5) * -.09); g.add(db); rod([0, 0, -.18], [0, 0, .18], .03, silver, db);
        for (const z of [-.17, .17]) { const h = add(new T.CylinderGeometry(r, r, .12, 6), rubber, 0, 0, z, db); h.rotation.x = Math.PI / 2 } }
      const lab = canvasTex(160, 90, (c, W, H) => { c.fillStyle = '#F0CF84'; c.fillRect(0, 0, W, H); c.fillStyle = '#1F2E5C'; c.font = '800 58px Georgia,serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(n, W / 2 - 14, H / 2 + 2); c.font = '700 30px Georgia,serif'; c.fillText('kg', W - 34, H / 2 + 12) });
      add(new T.PlaneGeometry(.34, .19), new T.MeshBasicMaterial({ map: lab.t }), .98, y, (i - 1.5) * -.09 + .2, g).rotation.y = .5 }) }
  // ── 飛輪單車（黑銀＋金色飛輪，WEIYANG），面向後牆鏡子
  { const g = grp(-7.45, 4.95, Math.PI);
    box(0, .06, 0, .5, .08, 1.3, dark2); box(0, .06, -.6, .9, .1, .12, dark2); box(0, .06, .6, .9, .1, .12, dark2);
    rod([0, .1, .45], [0, 1.0, .05], .07, silver); rod([0, .1, -.5], [0, 1.05, -.4], .07, dark);
    const fw = add(new T.CylinderGeometry(.36, .36, .12, 32), dark2, 0, .55, -.45); fw.rotation.z = Math.PI / 2; const fr = add(new T.TorusGeometry(.32, .04, 10, 32), gold, .07, .55, -.45); fr.rotation.y = Math.PI / 2;
    box(0, .55, -.2, .16, .5, .5, dark).rotation.x = .3;
    rod([0, 1.0, .05], [0, 1.22, .12], .04, silver); box(0, 1.25, .14, .24, .08, .34, rubber);
    rod([0, 1.05, -.4], [0, 1.45, -.52], .045, silver); rod([-.26, 1.47, -.55], [.26, 1.47, -.55], .035, rubber);
    box(0, 1.6, -.5, .34, .22, .05, dark2).rotation.x = -.4 }
  // ── 可調式訓練椅
  { const g = grp(-6.1, 7.35, 0);
    box(0, .06, 0, .14, .08, 1.5, silver); box(0, .06, .62, .6, .08, .12, silver); box(0, .06, -.62, .6, .08, .12, silver);
    rod([0, .1, .2], [0, .48, .2], .05, silver); rod([0, .1, -.3], [0, .48, -.3], .05, silver);
    box(0, .56, .32, .42, .12, .62, rubber); const bk = box(0, .78, -.36, .42, .12, .92, rubber); bk.rotation.x = -.42;
    const lt = canvasTex(256, 64, (c, W, H) => { c.fillStyle = '#F2D28A'; c.font = '700 40px Georgia,serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('WEIYANG', W / 2, H / 2) });
    const lp = add(new T.PlaneGeometry(.36, .09), new T.MeshBasicMaterial({ map: lt.t, transparent: true }), 0, .85, -.45, g); lp.rotation.x = -Math.PI / 2 + .42 }
  // ── 龍門架（後角落）
  { const g = grp(-8.75, 7.4, Math.PI / 2);
    for (const x of [-.78, .78]) { box(x, 1.3, 0, .14, 2.6, .14, silver); box(x, .05, 0, .3, .1, .9, dark2); for (let i = 0; i < 8; i++) box(x, .25 + i * .1, -.18, .26, .08, .2, dark) }
    box(0, 2.62, 0, 1.7, .14, .14, silver); box(0, 1.9, 0, 1.5, .06, .06, dark); rod([-.4, 1.6, .15], [.4, 1.6, .15], .03, dark2) }
  // ── WEIYANG 健身球
  CUR = G; { const ballT = canvasTex(512, 256, (c, W, H) => { c.fillStyle = '#C4C8CE'; c.fillRect(0, 0, W, H); c.fillStyle = '#5B6270'; c.font = '700 44px Georgia,serif'; c.textAlign = 'center'; c.fillText('WEIYANG', W * .25, H * .55); c.fillText('WEIYANG', W * .75, H * .55) });
    add(new T.SphereGeometry(.42, 32, 22), new T.MeshStandardMaterial({ map: ballT.t, metalness: .35, roughness: .3 }), -6.75, .47, 2.3) }
  // ── 紫色瑜珈墊＋Logo、壺鈴、滾筒、小啞鈴
  { const g = grp(-6.25, 4.9, 0);
    box(0, .055, 0, .7, .02, 1.7, purple, g);
    const lm = canvasTex(256, 256, (c, W, H) => { c.clearRect(0, 0, W, H) }); const drawL = () => { lm.g.clearRect(0, 0, 256, 256); lm.g.drawImage(logoImg, 28, 28, 200, 200); lm.t.needsUpdate = true }; logoUsers.push(drawL);
    const lg = add(new T.PlaneGeometry(.42, .42), new T.MeshBasicMaterial({ map: lm.t, transparent: true, opacity: .9 }), 0, .067, .45, g); lg.rotation.x = -Math.PI / 2;
    const roll = add(new T.CylinderGeometry(.14, .14, .62, 22), purpleL, 0, .2, -.95, g); roll.rotation.z = Math.PI / 2;
    add(new T.SphereGeometry(.17, 20, 14), purple, .48, .2, -.55, g); const hd = add(new T.TorusGeometry(.1, .035, 10, 20, Math.PI), purple, .48, .35, -.55, g);
    for (const dz of [-.12, .12]) { const db = new T.Group(); db.position.set(.5, .1, .25 + dz); g.add(db); rod([0, 0, -.12], [0, 0, .12], .025, purpleL, db); for (const z of [-.1, .1]) { const h = add(new T.CylinderGeometry(.06, .06, .07, 6), purple, 0, 0, z, db); h.rotation.x = Math.PI / 2 } } }
  // ── 發財樹（金色圓筒盆，圓球樹冠，不用尖葉）
  for (const [x, z] of [[-9.15, 2.3], [-5.62, 2.3], [-5.62, 8.15], [-9.15, 8.15]]) { const g = grp(x, z, 0);
    add(new T.CylinderGeometry(.3, .26, .65, 24), gold, 0, .33, 0, g); add(new T.CylinderGeometry(.05, .07, .7, 8), M('#8a6a45'), 0, .95, 0, g);
    for (const [dx, dy, dz, r] of [[0, 1.55, 0, .36], [.22, 1.38, .1, .26], [-.22, 1.42, -.08, .26], [0, 1.85, -.05, .24]]) add(new T.SphereGeometry(r, 16, 12), M('#4E9A5C', { roughness: .8 }), dx, dy, dz, g) }

  // ── v508 豪華外框：原本金框換亮金；每面玻璃加細金分隔線＋上下兩條暖光燈條（固定亮度，不閃）；屋頂暖光燈盒；角柱加細金線
  { const goldB = new T.MeshStandardMaterial({ color: '#F4D48E', metalness: .6, roughness: .22, emissive: '#9a7230', emissiveIntensity: .35 });
    gym.traverse(o => { if (o.isMesh && o.material && o.material.color && o.material.color.getHex() === 0xc9a66b) o.material = goldB });
    const glow = new T.MeshBasicMaterial({ color: '#FFE3A6' }), glowS = new T.MeshBasicMaterial({ color: '#FFF4D6' });
    const X0 = -9.61, X1 = -5.17, Z0 = 1.86, Z1 = 7.0 + EXT, cx = (X0 + X1) / 2, cz = (Z0 + Z1) / 2, W = X1 - X0, D = Z1 - Z0;
    gym.traverse(o => { if (o.isMesh && o.parent && o.parent !== gym && o.parent !== G && o.geometry && o.geometry.parameters && Math.abs((o.geometry.parameters.depth || 0) - .6) < .01 && Math.abs((o.geometry.parameters.width || 0) - .055) < .01) { o.visible = false; const p = o.parent; for (const [y, h] of [[.18, .06], [4.32, .06], [2.25, .04]]) { const e = new T.Mesh(new T.BoxGeometry(.06, h, .6), goldB); e.position.set(.01, y, 0); p.add(e) } for (const z of [-.29, .29]) { const e = new T.Mesh(new T.BoxGeometry(.06, 4.2, .04), goldB); e.position.set(.01, 2.25, z); p.add(e) } } });
    CUR = G;
    // 上下燈條：在金框內側 6 公分，不貼在玻璃面上
    for (const y of [.15, 4.36]) { /* v508：下燈條移到腰板下方，不再跟腰板疊在同一面（之前會閃） */ for (const z of [Z0 + .07, Z1 - .07]) box(cx, y, z, W - .14, .07, .05, glow); box(X0 + .07, y, cz, .05, .07, D - .14, glow); for (const [a, b] of [[Z0 + .07, 3.0], [4.85, Z1 - .07]]) box(X1 - .07, y, (a + b) / 2, .05, .07, b - a, glow) }
    // 腰線、上緣細金線（每面兩條）
    for (const y of [1.25, 3.55]) { for (const z of [Z0 + .035, Z1 - .035]) box(cx, y, z, W, .03, .025, goldB); box(X0 + .035, y, cz, .025, .03, D, goldB) }
    // 每面直向細金分隔線
    for (let k = 1; k < 4; k++) { const x = X0 + W * k / 4; for (const z of [Z0 + .04, Z1 - .04]) box(x, 2.3, z, .03, 4.3, .025, goldB) }
    for (let k = 1; k < 4; k++) { const z = Z0 + D * k / 4; box(X0 + .04, 2.3, z, .025, 4.3, .03, goldB) }
    // 角柱旁再加細線＋柱頂小金球
    for (const x of [X0, X1]) for (const z of [Z0, Z1]) { for (const d of [-.09, .09]) box(x + d, 2.3, z, .02, 4.4, .02, goldB); add(new T.SphereGeometry(.11, 16, 12), goldB, x, 4.68, z) }
    // 屋頂：金框暖光燈盒（比玻璃頂高一點，不重疊）
    /* 屋頂改成鏤空金框＋燈條，不擋住從上面看進去 */ for (const z of [Z0 + .25, Z1 - .25]) { box(cx, 4.6, z, W - .3, .06, .14, goldB); box(cx, 4.56, z, W - .5, .02, .05, glowS) } for (const x of [X0 + .25, X1 - .25]) { box(x, 4.6, cz, .14, .06, D - .3, goldB); box(x, 4.56, cz, .05, .02, D - .5, glowS) }
    // 地面：玻璃房外圍一圈金色踢腳＋暖光
    for (const z of [Z0 - .05, Z1 + .05]) box(cx, .06, z, W + .2, .12, .05, goldB); box(X0 - .05, .06, cz, .05, .12, D + .2, goldB);
    // 內部：後牆兩側金框暖光燈柱
    for (const z of [Z0 + .4, Z1 - .4]) { box(X0 + .12, 2.2, z, .08, 3.0, .12, goldB); box(X0 + .17, 2.2, z, .02, 2.8, .06, glow) } }

  // ── v508 正式大門＋細節：入口粗金框與門楣、金框細格雙開玻璃門（微開）、門口 WEIYANG 地墊；玻璃下半段方格金腰板；角柱改凹槽金柱＋柱頭柱座
  { const goldB = new T.MeshStandardMaterial({ color: '#F4D48E', metalness: .6, roughness: .22, emissive: '#9a7230', emissiveIntensity: .35 });
    const goldD = new T.MeshStandardMaterial({ color: '#D9B46A', metalness: .55, roughness: .3, emissive: '#7a5a20', emissiveIntensity: .25 });
    const glassM = new T.MeshPhysicalMaterial({ color: '#DDEFEA', transparent: true, opacity: .16, roughness: .05, depthWrite: false, side: T.DoubleSide });
    const X0 = -9.61, X1 = -5.17, Z0 = 1.86, Z1 = 7.0 + EXT, zA = 3.55, zB = 4.95, zc = (zA + zB) / 2;
    // 舊的斜開玻璃門整組收起
    for (const ch of gym.children) if (ch.isGroup && ch !== G && Math.abs(ch.position.x - X1) < .05) ch.visible = false;
    CUR = G;
    // 入口門框：兩側粗金柱＋門楣（招牌掛在門楣上）
    for (const z of [zA, zB]) { box(X1, 2.2, z, .2, 4.4, .2, goldB); box(X1, .12, z, .3, .24, .3, goldD); box(X1, 4.3, z, .3, .16, .3, goldD) }
    box(X1, 4.42, zc, .24, .22, zB - zA + .2, goldB); box(X1 + .13, 4.42, zc, .02, .06, zB - zA - .1, new T.MeshBasicMaterial({ color: '#FFE3A6' }));
    // 雙開玻璃門：金框＋兩條橫格＋直把手，微微往外打開
    for (const [hz, sgn] of [[zA + .1, 1], [zB - .1, -1]]) { const D = new T.Group(); D.position.set(X1, 0, hz); D.rotation.y = sgn * -.38; G.add(D);
      const w = (zB - zA) / 2 - .12, mz = sgn * w / 2;
      const pane = new T.Mesh(new T.BoxGeometry(.03, 3.9, w), glassM); pane.position.set(0, 2.15, mz); pane.renderOrder = 2; D.add(pane);
      for (const [y, h] of [[.22, .1], [4.08, .1], [1.3, .05], [3.0, .05]]) box(0, y, mz, .06, h, w, goldB, D);
      for (const z of [0, sgn * w]) box(0, 2.15, z, .06, 3.96, .06, goldB, D);
      rod([.09, 1.5, sgn * (w - .14)], [.09, 2.7, sgn * (w - .14)], .03, goldB, D); rod([-.09, 1.5, sgn * (w - .14)], [-.09, 2.7, sgn * (w - .14)], .03, goldB, D) }
    CUR = G;
    // 門口地墊（深藍金邊＋WEIYANG），放在玻璃房外面，比地板高一點
    { const mt = canvasTex(512, 256, (c, W, H) => { c.fillStyle = '#1F2E5C'; c.fillRect(0, 0, W, H); c.strokeStyle = '#EFCB7E'; c.lineWidth = 12; c.strokeRect(10, 10, W - 20, H - 20); c.fillStyle = '#F2D28A'; c.font = '700 74px Georgia,serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('WEIYANG', W / 2, H / 2 + 4) });
      const m = add(new T.PlaneGeometry(1.5, .75), new T.MeshStandardMaterial({ map: mt.t, roughness: .8 }), X1 + .62, .018, zc); m.rotation.x = -Math.PI / 2; m.rotation.z = Math.PI / 2 }
    // 玻璃下半段：方格金腰板（在玻璃內側 5 公分，不貼玻璃）
    const kick = canvasTex(512, 128, (c, W, H) => { c.fillStyle = '#E9CB86'; c.fillRect(0, 0, W, H); c.strokeStyle = '#B88E45'; c.lineWidth = 6; for (let x = 0; x < W; x += 64) { c.strokeRect(x + 6, 10, 52, H - 20) } c.fillStyle = 'rgba(255,255,255,.35)'; for (let x = 0; x < W; x += 64) c.fillRect(x + 14, 18, 36, 8) });
    kick.t.wrapS = T.RepeatWrapping;
    const kp = (x, z, len, ry) => { const t = kick.t.clone(); t.needsUpdate = true; t.repeat.set(Math.max(1, Math.round(len / 1.1)), 1); t.wrapS = T.RepeatWrapping; const o = add(new T.BoxGeometry(len, .78, .03), new T.MeshStandardMaterial({ map: t, metalness: .35, roughness: .35 }), x, .6, z); o.rotation.y = ry; box(x, 1.02, z, ry ? .05 : len, .05, ry ? len : .05, goldB) };
    kp((X0 + X1) / 2, Z0 + .06, X1 - X0 - .3, 0); kp((X0 + X1) / 2, Z1 - .06, X1 - X0 - .3, 0);
    kp(X0 + .06, (Z0 + Z1) / 2, Z1 - Z0 - .3, Math.PI / 2);
    kp(X1 - .06, (Z0 + zA) / 2, zA - Z0 - .3, Math.PI / 2); kp(X1 - .06, (zB + Z1) / 2, Z1 - zB - .3, Math.PI / 2);
    // 角柱：凹槽金柱（八條細槽）＋柱頭柱座
    for (const x of [X0, X1]) for (const z of [Z0, Z1]) { add(new T.CylinderGeometry(.13, .13, 4.2, 24), goldB, x, 2.3, z);
      for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; box(x + Math.cos(a) * .135, 2.3, z + Math.sin(a) * .135, .03, 3.9, .03, goldD) }
      for (const y of [.2, 4.4]) { add(new T.CylinderGeometry(.2, .2, .14, 24), goldD, x, y, z); add(new T.TorusGeometry(.17, .03, 8, 24), goldB, x, y + (y < 1 ? .12 : -.12), z).rotation.x = Math.PI / 2 } } }

  // ── v508 金色改成反光金屬（跟電梯、島上屋頂一樣：亮面塗層＋環境反光），不會越做越暗
  { const envT = (() => { const c = document.createElement('canvas'); c.width = 512; c.height = 256; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#FFFFFF'); gr.addColorStop(.45, '#FFF2D8'); gr.addColorStop(.55, '#D8B57E'); gr.addColorStop(1, '#9A7A48'); g.fillStyle = gr; g.fillRect(0, 0, 512, 256); g.fillStyle = 'rgba(255,255,255,.95)'; for (let k = 0; k < 6; k++) g.fillRect(k * 86 + 20, 20, 26, 90); const t = new T.CanvasTexture(c); t.mapping = T.EquirectangularReflectionMapping; t.colorSpace = T.SRGBColorSpace; return t })();
    const goldP = new T.MeshPhysicalMaterial({ color: '#F6D693', metalness: .75, roughness: .14, clearcoat: 1, clearcoatRoughness: .05, emissive: '#A27A36', emissiveIntensity: .32, envMap: envT, envMapIntensity: 1.35 });
    const isGold = m => m && m.isMeshStandardMaterial && !m.map && m.color && (() => { const h = m.color.getHSL({}); return h.h > .08 && h.h < .14 && h.s > .45 && h.l > .45 })();
    gym.traverse(o => { if (o.isMesh && isGold(o.material)) o.material = goldP }) }
  CUR = G;
  // 全部新器材都是同一個健身房遊戲入口
  G.traverse(o => { if (o.isMesh) { o.userData.wy3Action = 'fitness'; targets.push(o) } });
  return G;
}
