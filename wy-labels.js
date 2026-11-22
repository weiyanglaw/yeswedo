// v509 全站標示統一（陳老闆 2026-11-21 定案）
// 人物名牌：全圓角膠囊、珍珠奶油底、左邊德威陽 Logo 金章、右下金色小太陽、夜晚微亮
// 互動標示：波浪金框、寶石亮色底（跟著地點走）、右下一株金麥穗
// 省記憶體：只畫手機實際看得到的大小（寬 576），不再畫到 2560；Logo 只解一次縮成小圖共用
const W = 576;
const FAM = '"PingFang TC","Noto Sans TC","Noto Sans CJK TC","Microsoft JhengHei",system-ui,sans-serif';
export const PLACE = {
  castle: ['#3F63B5', '#1A2C66'],   // 寶石藍
  lit: ['#EF9B6B', '#B85733'],      // 珊瑚橘
  med: ['#5CBF9B', '#25725A'],      // 翡翠薄荷
  fam: ['#D46F84', '#8A2C46'],      // 玫瑰紅
  biz: ['#9A80D0', '#563C8C'],      // 薰衣草紫
  know: ['#3C93B6', '#17506C'],     // 孔雀藍
};
let logoURL = null, logoWait = [];
function needLogo(cb) {
  if (logoURL) return cb(logoURL);
  logoWait.push(cb);
  if (logoWait.length > 1) return;
  const im = new Image();
  im.onload = () => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d');
    // 只取 Logo 有內容的範圍，縮成 128 小圖（整站共用一份）
    const s = Math.min(im.naturalWidth, im.naturalHeight);
    g.drawImage(im, (im.naturalWidth - s) / 2, (im.naturalHeight - s) / 2, s, s, 4, 4, 120, 120);
    logoURL = c.toDataURL('image/png');
    const q = logoWait; logoWait = []; q.forEach(f => f(logoURL));
  };
  im.onerror = () => { logoURL = ''; const q = logoWait; logoWait = []; q.forEach(f => f('')); };
  im.src = 'office-logo-transparent.png';
}
const DEFS = `<defs>
<linearGradient id="gA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFEFB8"/><stop offset=".35" stop-color="#E9C46A"/><stop offset=".7" stop-color="#C08A2E"/><stop offset="1" stop-color="#F3D27A"/></linearGradient>
<linearGradient id="gB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B98A34"/><stop offset="1" stop-color="#7A5518"/></linearGradient>
<linearGradient id="hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="iv" cx=".38" cy=".3"><stop offset="0" stop-color="#FFF8E6"/><stop offset="1" stop-color="#E8CF98"/></radialGradient>
<radialGradient id="sunG" cx=".38" cy=".32"><stop offset="0" stop-color="#FFF4B8"/><stop offset=".6" stop-color="#FFC94A"/><stop offset="1" stop-color="#F2A324"/></radialGradient>
<linearGradient id="ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB53A"/><stop offset="1" stop-color="#FFE38A"/></linearGradient>
<linearGradient id="grw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF1C2"/><stop offset=".5" stop-color="#E7BF66"/><stop offset="1" stop-color="#B98A34"/></linearGradient>
<filter id="sh" x="-20%" y="-30%" width="140%" height="170%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#2A1A05" flood-opacity=".35"/></filter>
<filter id="dk"><feColorMatrix type="matrix" values=".75 0 0 0 0  0 .62 0 0 0  0 0 .4 0 0  0 0 0 1 0"/></filter>
</defs>`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function fitSize(text, maxW, base) {
  // 中文字約 1 個字寬；英數字約 0.6
  let n = 0; for (const ch of String(text)) n += /[\x00-\xff]/.test(ch) ? .6 : 1.04;
  return Math.max(14, Math.min(base, maxW / Math.max(1, n)));
}
const pillP = (x, y, w, h) => { const r = h / 2; return `M${x + r} ${y} L${x + w - r} ${y} A${r} ${r} 0 0 1 ${x + w - r} ${y + h} L${x + r} ${y + h} A${r} ${r} 0 0 1 ${x + r} ${y}Z`; };
function scalP(x, y, w, h) {
  const n = 9, sw = w / n; let p = `M${x} ${y}`;
  for (let k = 0; k < n; k++) p += ` Q${x + sw * (k + .5)} ${y - 7} ${x + sw * (k + 1)} ${y}`;
  p += ` Q${x + w + 7} ${y + h / 2} ${x + w} ${y + h}`;
  for (let k = 0; k < n; k++) p += ` Q${x + w - sw * (k + .5)} ${y + h + 7} ${x + w - sw * (k + 1)} ${y + h}`;
  return p + ` Q${x - 7} ${y + h / 2} ${x} ${y}Z`;
}
function sun(sx, sy) {
  let rays = ''; for (let k = 0; k < 12; k++) rays += `<path d="M0 -15 Q3.2 -20 0 -24 Q-3.2 -20 0 -15Z" fill="url(#ray)" transform="rotate(${k * 30})"/>`;
  return `<g transform="translate(${sx} ${sy}) scale(1.3)">${rays}<circle r="13" fill="url(#sunG)" stroke="#D88A1A" stroke-width="1.2"/><ellipse cx="-4" cy="-6" rx="4.5" ry="2" fill="#fff" opacity=".55"/></g>`;
}
const GR = 'M0,-8 C3.4,-5 3.6,2.5 0,6.5 C-3.6,2.5 -3.4,-5 0,-8Z';
function sprig(bx, by, ang, length, sc0) {
  const P = []; const ra = ang * Math.PI / 180;
  for (let k = 0; k <= 60; k++) { const t = k / 60; P.push([bx + Math.sin(ra) * t * length + 6 * Math.sin(t * Math.PI * .8) * Math.cos(ra), by - Math.cos(ra) * t * length]); }
  let s = `<path d="M${P.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L')}" stroke="#B8862F" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
  for (let i = 14; i < P.length - 3; i += 6) {
    const [x, y] = P[i], [x2, y2] = P[i + 2]; const d = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI; const sc = sc0 * (1.25 - .35 * i / P.length);
    for (const side of [1, -1]) { const a = d + side * 32, ar = a * Math.PI / 180; const gx = x + 6 * sc * Math.cos(ar), gy = y + 6 * sc * Math.sin(ar);
      s += `<path d="${GR}" fill="url(#grw)" stroke="#9C6F22" stroke-width=".6" transform="translate(${gx.toFixed(1)} ${gy.toFixed(1)}) rotate(${(a + 90).toFixed(0)}) scale(${sc.toFixed(2)})"/>`; }
  }
  const [x, y] = P[P.length - 1], [x2, y2] = P[P.length - 4]; const d = Math.atan2(y - y2, x - x2) * 180 / Math.PI;
  s += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(d + 90).toFixed(0)})"><path d="${GR}" fill="url(#grw)" stroke="#9C6F22" stroke-width=".6" transform="scale(${(sc0 * .9).toFixed(2)})"/><line x1="0" y1="-6" x2="-3" y2="-16" stroke="#C9963C" stroke-width=".8"/><line x1="0" y1="-6" x2="0" y2="-16" stroke="#C9963C" stroke-width=".8"/><line x1="0" y1="-6" x2="3" y2="-16" stroke="#C9963C" stroke-width=".8"/></g>`;
  return s;
}
// 人物名牌（viewBox 330x150 → 畫布 576x262）
function personSVG(name, logo) {
  const x = 60, y = 40, w = 250, h = 64;
  const fs = fitSize(name, 200, 27);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${Math.round(W * 150 / 330)}" viewBox="0 0 330 150">${DEFS}
<linearGradient id="pb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFBF2"/><stop offset="1" stop-color="#F1E2C4"/></linearGradient>
<g filter="url(#sh)"><path d="${pillP(x - 7, y - 7, w + 14, h + 14)}" fill="url(#gB)"/></g>
<path d="${pillP(x - 4, y - 4, w + 8, h + 8)}" fill="url(#gA)"/><path d="${pillP(x, y, w, h)}" fill="#8A6424"/>
<path d="${pillP(x + 2, y + 2, w - 4, h - 4)}" fill="url(#pb)"/><path d="${pillP(x + 10, y + 5, w - 20, h * .42)}" fill="url(#hl)"/>
<text x="${x + w / 2 + 14}" y="${y + h / 2 + fs * .36}" text-anchor="middle" font-size="${fs.toFixed(1)}" font-weight="900" letter-spacing="1" fill="#5A3D14" font-family='${FAM}'>${esc(name)}</text>
${sun(x + w - 2, y + h + 1)}
<g filter="url(#sh)"><circle cx="${x + 6}" cy="${y + h / 2}" r="45" fill="url(#gB)"/></g><circle cx="${x + 6}" cy="${y + h / 2}" r="42" fill="url(#gA)"/><circle cx="${x + 6}" cy="${y + h / 2}" r="36" fill="#8A6424"/><circle cx="${x + 6}" cy="${y + h / 2}" r="34.5" fill="url(#iv)"/>
${logo ? `<image href="${logo}" x="${x + 6 - 27}" y="${y + h / 2 - 27}" width="54" height="54" filter="url(#dk)"/>` : ''}<ellipse cx="${x - 6}" cy="${y + h / 2 - 18}" rx="12" ry="5" fill="#fff" opacity=".7"/></svg>`;
}
// 互動標示（viewBox 300x125 → 畫布 576x240）
function actionSVG(text, place) {
  const [c1, c2] = PLACE[place] || PLACE.castle;
  const x = 30, y = 26, w = 230, h = 60;
  const fs = fitSize(text, 196, 26);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W * 125 / 300}" viewBox="0 0 300 125">${DEFS}
<linearGradient id="pc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
<g filter="url(#sh)"><path d="${scalP(x - 7, y - 7, w + 14, h + 14)}" fill="url(#gB)" stroke="url(#gB)" stroke-width="2" stroke-linejoin="round"/></g>
<path d="${scalP(x - 4, y - 4, w + 8, h + 8)}" fill="url(#gA)"/><path d="${scalP(x, y, w, h)}" fill="#8A6424"/><path d="${scalP(x + 2, y + 2, w - 4, h - 4)}" fill="url(#pc)"/>
<path d="${pillP(x + 14, y + 5, w - 28, h * .38)}" fill="url(#hl)" opacity=".5"/>
<text x="${x + w / 2 - 6}" y="${y + h / 2 + fs * .36}" text-anchor="middle" font-size="${fs.toFixed(1)}" font-weight="900" letter-spacing="1" fill="#FFF3D6" font-family='${FAM}'>${esc(text)}</text>
${sprig(x + w - 8, y + h + 8, 38, 46, 1.3)}</svg>`;
}
function paint(canvas, svg, tex) {
  const img = new Image();
  img.onload = () => { const g = canvas.getContext('2d'); g.clearRect(0, 0, canvas.width, canvas.height); g.drawImage(img, 0, 0, canvas.width, canvas.height); if (tex) tex.needsUpdate = true; };
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
// 回傳 {canvas, aspect, done(tex)}：先給尺寸，圖畫好後自動更新貼圖
export function personCanvas(name, w = W) {
  const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * 150 / 330);
  return { canvas: c, aspect: c.width / c.height, bind(tex) { needLogo(l => paint(c, personSVG(name, l), tex)); } };
}
export function actionCanvas(text, place, w = W) {
  const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * 125 / 300);
  return { canvas: c, aspect: c.width / c.height, bind(tex) { paint(c, actionSVG(text, place), tex); } };
}
// 直接做好 three.js 貼圖
export function personTexture(T, name) { const p = personCanvas(name); const t = new T.CanvasTexture(p.canvas); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; p.bind(t); t.userData = { aspect: p.aspect, wyLabel: 'person', wyText: name }; return t; }
export function actionTexture(T, text, place) { const p = actionCanvas(text, place); const t = new T.CanvasTexture(p.canvas); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; p.bind(t); t.userData = { aspect: p.aspect, wyLabel: 'action' }; return t; }
export const PERSONS = ['林柏均 律師', '夢奇奇飼養者', '薪水掌門人', '哈姆太郎'];

// ---- 全站自動換新（不用改每個舊程式）：舊標示畫字時記下最大那行字，換成新樣式 ----
const EXCLUDE = /^(地檢署|第[一二三]審|\d+F|WEIYANG.*|WEI ?& ?YANG.*|德威陽國際法律事務所|YES, ?WE DO!?|再來一次華麗出場)$/i;
const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
export function classify(text) {
  const t = norm(text); if (!t || EXCLUDE.test(t)) return null;
  const k = t.replace(/\s/g, '');
  // 陳老闆 11-21：桌上、櫃台這些固定標示（就算寫人名）都用互動標示；人物名牌只給會走動的人物
  if (['林柏均律師', '夢奇奇飼養者', '薪水掌門人', '哈姆太郎'].includes(k)) return { type: 'person', text: k === '林柏均律師' ? '林柏均 律師' : k };
  if (/[A-Za-z]{3,}/.test(k)) return null;           // 英文招牌不動
  const n = [...k].length; if (n < 3 || n > 10) return null;
  if (!/[一-鿿]/.test(k)) return null;
  return { type: 'action', text: k };
}
function compose(target, src, aspectSrc) {
  // 牆上平面：保持原本形狀，新標示等比放在中間，旁邊透明
  const g = target.getContext('2d'); g.clearRect(0, 0, target.width, target.height);
  const ta = target.width / target.height; let w, h;
  if (aspectSrc > ta) { w = target.width; h = w / aspectSrc; } else { h = target.height; w = h * aspectSrc; }
  g.drawImage(src, (target.width - w) / 2, (target.height - h) / 2, w, h);
}
export function applyLabels(T, scene, place, opt = {}) {
  const done = new Set(); let n = 0, before = 0, after = 0;
  scene.traverse(o => {
    const m = o.material; if (!m || Array.isArray(m) || !m.map) return;
    const t = m.map, i = t.image; if (!i || !(i instanceof HTMLCanvasElement) || t.userData?.wyLabel) return;
    const ar = i.width / i.height; if (!(o.isSprite || ar >= 2.2)) return;
    const info = i.__wyT; if (!info) return; const c = classify(info.text); if (!c) return;
    // 陳老闆 11-21：掛在人物頭上的才用人物名牌；座位、桌子、牆上（2 樓 officeZone、平面牌）一律用互動標示
    if (c.type === 'person' && (!o.isSprite || o.userData.officeZone != null)) c.type = 'action';
    if (done.has(t)) { if (o.isSprite && t.userData.aspect) o.scale.y = o.scale.x / t.userData.aspect; return; }
    done.add(t); n++; before += i.width * i.height * 4 * 1.33;
    const asp0 = c.type === 'person' ? 330 / 150 : 300 / 125; const cw = Math.round(Math.max(256, Math.min(W, i.width, Math.sqrt(i.width * i.height * asp0))));/* 新圖不超過原本的像素量 */
    const made = c.type === 'person' ? personCanvas(c.text, cw) : actionCanvas(c.text, place, cw);
    const canvas = made.canvas, aspect = made.aspect;
    if (o.isSprite) {
      // 新標示比較高（有 Logo 金章、麥穗），整體縮一點，避免互相擋住
      const k = c.type === 'person' ? .8 : .84; o.scale.x *= k; o.scale.y = o.scale.x / aspect;
    } else {
      // 牆上平面：寬度不變，高度照新標示比例（字一樣大、不會變小）
      o.scale.y *= ar / aspect; m.transparent = true; m.alphaTest = .02; m.needsUpdate = true;
    }
    t.dispose(); t.source = new T.Source(canvas); t.colorSpace = T.SRGBColorSpace; t.generateMipmaps = true; t.minFilter = T.LinearMipmapLinearFilter;
    t.userData = Object.assign(t.userData || {}, { aspect, wyLabel: c.type, wyText: c.text });
    made.bind(t); after += canvas.width * canvas.height * 4 * 1.33;
    if (c.type === 'person') o.userData.wyPersonLabel = true;
  });
  return { n, beforeMB: +(before / 1048576).toFixed(1), afterMB: +(after / 1048576).toFixed(1) };
}
// 夜晚微亮：人物名牌（sprite）亮度隨夜晚調高一點，不閃
export function nightGlow(scene, night) {
  scene.traverse(o => { if (o.userData && o.userData.wyPersonLabel && o.material) { const k = night ? 1.25 : 1; o.material.color.setScalar(k); } });
}

// 四位成員頭上的人物名牌（走動的、建築裡的都掛）；同一個人共用一張圖
const _personTex = new Map();
export function addNameTags(T, models) {
  let n = 0;
  for (const m of models || []) {
    const root = m && m.root; if (!root || root.userData.wyNameTag) continue;
    let has = false; root.traverse(o => { if (o.isSprite && o.material && o.material.map && o.material.map.userData && o.material.map.userData.wyLabel === 'person') has = true; });
    if (has) { root.userData.wyNameTag = true; continue; }
    const raw = (m.def && m.def.name) || root.userData.label || ''; const c = classify(raw); if (!c || c.type !== 'person') continue;
    /* v510：場景裡已經有同名的名牌跟著這個人（不是掛在人物底下的那種），就不再加第二個，避免兩個名牌疊在一起 */
    { let top = root; while (top.parent) top = top.parent; const rp = root.getWorldPosition(new T.Vector3()), wp = new T.Vector3(); let dup = false;
      top.traverse(o => { if (dup || !o.isSprite || !o.material || !o.material.map) return; const u = o.material.map.userData || {}; const tx = u.wyText || ''; if (u.wyLabel !== 'person' || tx !== c.text) return; o.getWorldPosition(wp); if (Math.hypot(wp.x - rp.x, wp.z - rp.z) < 6) dup = true; });
      if (dup) { root.userData.wyNameTag = true; continue; } }
    let tex = _personTex.get(c.text); if (!tex) { tex = personTexture(T, c.text); _personTex.set(c.text, tex); }
    root.updateMatrixWorld(true);
    const bb = new T.Box3().setFromObject(root); const s = root.getWorldScale(new T.Vector3()).x || 1;
    const topLocal = (bb.max.y - root.getWorldPosition(new T.Vector3()).y) / s;
    const spr = new T.Sprite(new T.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
    const w = 2.9 / s; spr.scale.set(w, w / tex.userData.aspect, 1); spr.position.set(0, topLocal + .62 / s, 0); spr.renderOrder = 3;
    spr.userData.wyPersonLabel = true; spr.raycast = () => {};
    root.add(spr); root.userData.wyNameTag = true; n++;
  }
  return n;
}
