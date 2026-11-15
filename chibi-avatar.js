// 德威陽｜有法度 Q 版角色 v2（原創造型）：超大頭、短手短腳、大眼星光、肉肉臉頰。
// buildChibi(THREE, profile) 回傳 { group, update(profile), tick(timeMs), hop() }
export const CHIBI_SKINS = { light:'#FFE3D0', fair:'#F7CFB3', tan:'#E0AA82', deep:'#A0704F' };
export const CHIBI_HAIR_COLORS = { black:'#2B2321', brown:'#6B4430', chestnut:'#A0603A', blonde:'#E8C072', pink:'#EE9DB8' };
export const CHIBI_OUTFITS = {
  // 日常
  office:  { label:'上班族', top:'#2F4A6E', shirt:'#FFFFFF', bottom:'#2B3A55', shoes:'#3A2A24', tie:'#C6A25D' },
  casual:  { label:'休閒',   top:'#86C0EC', bottom:'#4467A0', shoes:'#FFFFFF', pocket:'#FFD25A' },
  student: { label:'學生',   top:'#FFFFFF', bottom:'#2E3F66', shoes:'#2B2321', ribbon:'#E05561' },
  dress:   { label:'洋裝',   dress:'#F5A9C6', shoes:'#FFFFFF', lace:'#FFFFFF' },
  sport:   { label:'運動',   top:'#F0705C', bottom:'#8C93A0', shoes:'#FFFFFF', stripe:'#FFFFFF' },
  // 職業
  doctor:    { label:'醫師',   top:'#9CC9E8', bottom:'#9CC9E8', shoes:'#FFFFFF', coat:'#FFFFFF', stetho:true },
  nurse:     { label:'護理師', top:'#F6C1D1', bottom:'#F6C1D1', shoes:'#FFFFFF', hat:'nurse' },
  engineer:  { label:'工程師', top:'#5B8DB8', bottom:'#3E4B5E', shoes:'#6B4A2E', vest:'#FF8A2A', hat:'hard' },
  chef:      { label:'廚師',   top:'#FFFFFF', bottom:'#2B2B33', shoes:'#2B2321', hat:'chef', scarf:'#E0484E', buttons:'#2B2B33' },
  detective: { label:'偵探',   top:'#6E5A48', bottom:'#4A3E35', shoes:'#3A2A24', coat:'#C49A6C', hat:'detective' },
  // 法袍：底色一律黑色，領、袖、對襟鑲邊（依服制規則的色別）
  judge:      { label:'法官',   robe:'#1F1F26', trim:'#2F6FD0' },
  prosecutor: { label:'檢察官', robe:'#1F1F26', trim:'#7B3FA6' },
  lawyer:     { label:'律師',   robe:'#1F1F26', trim:'#FFFFFF' },
  clerk:      { label:'書記官', robe:'#1F1F26', trim:'#3B3B46', glossTrim:true },
  // 特別
  tux:     { label:'西裝禮服', top:'#1E1E26', shirt:'#FFFFFF', bottom:'#1E1E26', shoes:'#111111', bowtie:'#1E1E26', flower:'#E0484E' },
  gown:    { label:'晚禮服',   gown:'#6C5BD4', shoes:'#E8C072', sash:'#E8C072' },
  qipao:   { label:'旗袍',     qipao:'#D2393F', trim:'#E8C072', shoes:'#2B2321' },
  winter:  { label:'冬季',     top:'#E9A23B', bottom:'#3E4B5E', shoes:'#6B4A2E', puffy:true, scarf:'#D24B4B', hat:'beanie' },
  aloha:   { label:'夏日',     top:'#3BB3A6', bottom:'#E9D9B5', shoes:'#F2C14E', flowers:['#FFE36E','#FF7FA0','#FFFFFF'] },
};
export const CHIBI_OUTFIT_GROUPS = [
  ['日常', ['office','casual','student','dress','sport']],
  ['職業', ['doctor','nurse','engineer','chef','detective']],
  ['法袍', ['judge','prosecutor','lawyer','clerk']],
  ['特別', ['tux','gown','qipao','winter','aloha']],
];
export const CHIBI_CASUAL = CHIBI_OUTFIT_GROUPS[0][1];
export const CHIBI_ROBES = CHIBI_OUTFIT_GROUPS[2][1];
export const CHIBI_HAIRS = { short:'短髮', bob:'鮑伯頭', twin:'雙馬尾', pony:'馬尾', buns:'丸子頭', curly:'捲髮' };
export const CHIBI_ACCESSORIES = { none:'無', glasses:'眼鏡', bow:'蝴蝶結', beret:'貝雷帽', bag:'公事包' };


// ---------- 畫在臉上的五官（插畫風） ----------
const FACE_W = 512, FACE_H = 256, FACE_PHI = 1.9, FACE_T0 = 1.05, FACE_TL = 1.3;
export function drawFace(ctx, o = {}) {
  const { girl = false, expr = 'normal', mouthY = -0.05, f = {} } = o;
  const eye = f.eye || o.eye || '#6B4434';
  const ew = f.eyeW || 1, eh = f.eyeH || 1, lid = f.lid || 0, bt = f.browThick || 0.018, btilt = f.browTilt || 0, by = f.browY || 0, mouthStyle = f.mouth || 'cat', lashes = f.lashes ?? girl;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, FACE_W, FACE_H);
  // 世界座標（頭部正面，Y 向上）→ 畫布
  ctx.setTransform(374, 0, 0, -298, 256, 102);
  const ell = (x, y, rx, ry, fill) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill(); };
  const stroke = (w, c, f) => { ctx.lineWidth = w; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); f(); ctx.stroke(); };
  const ink = '#3A2320';
  // 腮紅：柔和漸層
  for (const s of [-1, 1]) {
    const g = ctx.createRadialGradient(0.4 * s, -0.25, 0, 0.4 * s, -0.25, 0.12);
    g.addColorStop(0, f.blush || (girl ? 'rgba(255,120,150,.75)' : 'rgba(255,135,150,.6)')); g.addColorStop(1, 'rgba(255,140,160,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0.4 * s, -0.25, 0.12, 0.08, 0, 0, Math.PI * 2); ctx.fill();
    if (!f.softBlush) for (const k of [-1, 0, 1]) stroke(0.008, 'rgba(230,90,120,.55)', () => { ctx.moveTo(0.4 * s + k * 0.035 - 0.012, -0.235); ctx.lineTo(0.4 * s + k * 0.035 + 0.008, -0.265); });
  }
  // 眉毛
  for (const s of [-1, 1]) stroke(bt, f.browColor || '#5A3A2E', () => { ctx.moveTo(0.18 * s, 0.1 + by - btilt); ctx.quadraticCurveTo(0.25 * s, 0.13 + by, 0.32 * s, 0.11 + by + btilt); });
  const beanEye = (s) => {        // 黑豆眼：圓圓的黑眼睛＋一顆大亮點
    const x = 0.25 * s, y = -0.12;
    ctx.save(); ctx.translate(x, y); ctx.scale(ew, eh); ctx.translate(-x, -y);
    ell(x, y, 0.07, 0.095, ink); ell(x - 0.022, y + 0.035, 0.026, 0.03, '#FFFFFF'); ell(x + 0.02, y - 0.04, 0.01, 0.01, '#FFFFFF');
    ctx.restore();
  };
  const smileEye = (s) => {       // 彎彎笑眼＋睫毛
    const x = 0.25 * s;
    stroke(0.032, ink, () => { ctx.moveTo(x - 0.11, -0.12); ctx.quadraticCurveTo(x, 0.0, x + 0.11, -0.12); });
    for (const k of [0, 1, 2].slice(0, f.lashCount || 2)) stroke(0.016, ink, () => { const ex = x + 0.1 * s - k * 0.012 * s, ey = -0.1 + k * 0.03; ctx.moveTo(ex, ey); ctx.lineTo(ex + 0.05 * s, ey + 0.02 + k * 0.012); });
  };
  const sleepyEye = (s) => {      // 單眼皮杏仁眼：細長、外眼角微垂、慵懶放鬆
    const x = 0.25 * s, y = -0.11;
    const almond = () => { ctx.beginPath(); ctx.moveTo(x - 0.135 * s, y + 0.01); ctx.quadraticCurveTo(x, y + 0.12, x + 0.13 * s, y - 0.02); ctx.quadraticCurveTo(x + 0.02 * s, y - 0.1, x - 0.135 * s, y + 0.01); ctx.closePath(); };
    almond(); ctx.fillStyle = '#FFFFFF'; ctx.fill();
    ctx.save(); almond(); ctx.clip();
    ell(x + 0.005 * s, y - 0.005, 0.068, 0.085, eye); ell(x + 0.005 * s, y - 0.005, 0.038, 0.05, '#1A0E0C');
    ell(x - 0.02 * s, y + 0.03, 0.018, 0.02, '#FFFFFF');
    ctx.fillStyle = 'rgba(58,35,32,.18)'; ctx.fillRect(x - 0.2, y + 0.03, 0.4, 0.1);   // 上眼瞼陰影
    ctx.restore();
    stroke(0.03, ink, () => { ctx.moveTo(x - 0.14 * s, y + 0.015); ctx.quadraticCurveTo(x, y + 0.125, x + 0.14 * s, y - 0.035); });
    stroke(0.01, 'rgba(58,35,32,.5)', () => { ctx.moveTo(x - 0.1 * s, y - 0.05); ctx.quadraticCurveTo(x + 0.02 * s, y - 0.095, x + 0.12 * s, y - 0.03); });
  };
  const smileOpenEye = (s) => {   // 笑起來的眼睛：下眼瞼往上推，眼睛呈彎月但仍看得到瞳孔
    const x = 0.25 * s, y = -0.1;
    ctx.save(); ctx.translate(x, y); ctx.scale(ew, eh); ctx.translate(-x, -y);
    ell(x, y, 0.118, 0.14, ink);
    const g = ctx.createLinearGradient(0, y + 0.13, 0, y - 0.13); g.addColorStop(0, '#2A1714'); g.addColorStop(0.6, eye); g.addColorStop(1, '#D8A070');
    ell(x, y - 0.004, 0.1, 0.122, g); ell(x, y - 0.01, 0.05, 0.064, '#1E0F0C');
    ell(x - 0.035, y + 0.05, 0.04, 0.045, '#FFFFFF'); ell(x + 0.04, y - 0.03, 0.016, 0.016, 'rgba(255,255,255,.9)');
    // 下眼瞼：膚色彎弧蓋住下半部
    ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, 0.13, 0.155, 0, 0, Math.PI * 2); ctx.clip();
    ctx.beginPath(); ctx.moveTo(x - 0.17, y - 0.2); ctx.lineTo(x - 0.17, y - 0.06); ctx.quadraticCurveTo(x, y + 0.02 - (f.smileLift || 0), x + 0.17, y - 0.06); ctx.lineTo(x + 0.17, y - 0.2); ctx.closePath();
    ctx.fillStyle = o.skin || '#FFE3D0'; ctx.fill(); ctx.restore();
    stroke(0.014, 'rgba(58,35,32,.7)', () => { ctx.moveTo(x - 0.11, y - 0.055); ctx.quadraticCurveTo(x, y + 0.0 - (f.smileLift || 0), x + 0.11, y - 0.055); });
    stroke(0.032, ink, () => { ctx.ellipse(x, y, 0.124, 0.146, 0, Math.PI * 0.1, Math.PI * 0.9); });
    if (f.crease) stroke(0.01, 'rgba(58,35,32,.55)', () => { ctx.ellipse(x, y + 0.012, 0.13, 0.17, 0, Math.PI * 0.18, Math.PI * 0.82); });   // 雙眼皮線
    if (lashes) for (const k of [0, 1]) stroke(0.015, ink, () => { const a = 0.14 + k * 0.15, ex = x + Math.cos(a) * 0.124 * s, ey = y + Math.sin(a) * 0.146; ctx.moveTo(ex, ey); ctx.lineTo(ex + 0.04 * s, ey + 0.03 - k * 0.012); });
    ctx.restore();
  };
  const toyEye = (s) => {        // 精品公仔眼：霧面深色橢圓＋一顆柔光
    const x = 0.25 * s, y = -0.11;
    ctx.save(); ctx.translate(x, y); ctx.scale(ew, eh); ctx.translate(-x, -y);
    const g = ctx.createRadialGradient(x - 0.02, y + 0.03, 0.01, x, y, 0.1); g.addColorStop(0, f.eye || '#5A3A2E'); g.addColorStop(1, '#1E1412');
    ell(x, y, 0.072, 0.092, g); ell(x - 0.024, y + 0.036, 0.022, 0.026, 'rgba(255,255,255,.92)'); ell(x + 0.022, y - 0.035, 0.008, 0.008, 'rgba(255,255,255,.7)');
    ctx.restore();
  };
  const glossEye = (s) => {      // 德威陽漫畫眼：大而亮、深色上眼線、琥珀漸層瞳孔、多重反光
    const x = 0.25 * s, y = -0.1;
    ctx.save(); ctx.translate(x, y); ctx.scale(ew, eh); ctx.translate(-x, -y);
    ell(x, y - 0.005, 0.11, 0.136, '#FFFFFF');
    const g = ctx.createLinearGradient(0, y + 0.13, 0, y - 0.13); g.addColorStop(0, '#2B160F'); g.addColorStop(0.5, f.eye || '#6A3F25'); g.addColorStop(1, '#D9A066');
    ell(x, y - 0.01, 0.104, 0.13, g);
    ctx.globalAlpha = .35; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; stroke(0.004, '#2B160F', () => { ctx.moveTo(x + Math.cos(a) * 0.04, y - 0.012 + Math.sin(a) * 0.05); ctx.lineTo(x + Math.cos(a) * 0.088, y - 0.012 + Math.sin(a) * 0.11); }); } ctx.globalAlpha = 1;
    ell(x, y - 0.012, 0.045, 0.058, '#1A0C08');
    ell(x - 0.04 * s * 0 - 0.035, y + 0.045, 0.04, 0.048, '#FFFFFF'); ell(x + 0.04, y - 0.06, 0.018, 0.018, 'rgba(255,255,255,.95)'); ell(x + 0.01, y + 0.07, 0.01, 0.01, 'rgba(255,255,255,.8)');
    stroke(0.036, '#2A1712', () => { ctx.ellipse(x, y - 0.004, 0.113, 0.14, 0, Math.PI * 0.08, Math.PI * 0.92); });
    stroke(0.008, 'rgba(42,23,18,.3)', () => { ctx.ellipse(x, y + 0.012, 0.122, 0.16, 0, Math.PI * 0.25, Math.PI * 0.75); });
    if (lashes) for (const k of [0, 1]) stroke(0.016, '#2A1712', () => { const a = 0.1 + k * 0.14, ex = x + Math.cos(a) * 0.113 * s, ey = y - 0.004 + Math.sin(a) * 0.14; ctx.moveTo(ex, ey); ctx.lineTo(ex + 0.035 * s, ey + 0.02); });
    stroke(0.008, 'rgba(42,23,18,.45)', () => { ctx.ellipse(x, y, 0.1, 0.13, 0, Math.PI * 1.25, Math.PI * 1.75); });
    ctx.restore();
  };
  const filmEye = (s) => {       // 電影動畫眼：杏仁形眼白＋偏小瞳孔＋自然眼皮
    const x = 0.24 * s, y = -0.1; ctx.save(); ctx.translate(x, y); ctx.scale(1.45, 1.45); ctx.translate(-x, -y);
    const alm = () => { ctx.beginPath(); ctx.moveTo(x - 0.1 * s, y - 0.005); ctx.quadraticCurveTo(x - 0.01 * s, y + 0.085, x + 0.1 * s, y + 0.01); ctx.quadraticCurveTo(x + 0.01 * s, y - 0.075, x - 0.1 * s, y - 0.005); ctx.closePath(); };
    alm(); ctx.fillStyle = '#FBF7F2'; ctx.fill(); ctx.save(); alm(); ctx.clip();
    const g = ctx.createRadialGradient(x, y, 0.005, x, y, 0.06); g.addColorStop(0, '#2A160E'); g.addColorStop(0.45, f.eye || '#7A4A2A'); g.addColorStop(1, '#3A2216');
    ell(x + 0.004 * s, y, 0.056, 0.062, g); ell(x + 0.004 * s, y, 0.024, 0.027, '#140A06'); ell(x - 0.016, y + 0.024, 0.014, 0.016, '#FFFFFF');
    ctx.fillStyle = 'rgba(80,40,30,.18)'; ctx.fillRect(x - 0.2, y + 0.03, 0.4, 0.08); ctx.restore();
    stroke(0.022, '#2A1712', () => { ctx.moveTo(x - 0.105 * s, y - 0.002); ctx.quadraticCurveTo(x - 0.01 * s, y + 0.092, x + 0.108 * s, y + 0.012); });
    stroke(0.008, 'rgba(60,30,20,.45)', () => { ctx.moveTo(x - 0.085 * s, y + 0.05); ctx.quadraticCurveTo(x, y + 0.115, x + 0.09 * s, y + 0.055); });
    ctx.restore();
  };
  const animeEye = (s) => {      // 日系動畫眼：直長瞳孔、上眼線、兩顆大亮點
    const x = 0.25 * s, y = -0.1;
    ell(x, y, 0.11, 0.155, '#FFFFFF');
    const g = ctx.createLinearGradient(0, y + 0.15, 0, y - 0.15); g.addColorStop(0, '#1C0F0B'); g.addColorStop(0.5, f.eye || '#8A5530'); g.addColorStop(1, '#F2C882');
    ell(x, y - 0.008, 0.095, 0.145, g); ell(x, y + 0.01, 0.045, 0.075, '#120806');
    ell(x - 0.035, y + 0.06, 0.032, 0.044, '#FFFFFF'); ell(x + 0.035, y - 0.07, 0.016, 0.016, 'rgba(255,255,255,.9)');
    stroke(0.036, '#1E1210', () => { ctx.ellipse(x, y, 0.112, 0.157, 0, Math.PI * 0.12, Math.PI * 0.88); });
    if (lashes) stroke(0.02, '#1E1210', () => { const ex = x + Math.cos(0.3) * 0.112 * s, ey = y + Math.sin(0.3) * 0.157; ctx.moveTo(ex, ey); ctx.lineTo(ex + 0.04 * s, ey + 0.02); });
    stroke(0.01, 'rgba(30,18,16,.5)', () => { ctx.moveTo(x - 0.06, y - 0.15); ctx.quadraticCurveTo(x, y - 0.162, x + 0.06, y - 0.15); });
  };
  const toy2Eye = (s) => {       // 潮玩眼：大顆亮面黑眼珠＋白色反光＋短睫毛
    const x = 0.25 * s, y = -0.12;
    const g = ctx.createRadialGradient(x - 0.02, y + 0.03, 0.005, x, y, 0.1); g.addColorStop(0, '#4A3530'); g.addColorStop(1, '#120C0B');
    ell(x, y, 0.082, 0.1, g); ell(x - 0.026, y + 0.04, 0.026, 0.03, '#FFFFFF'); ell(x + 0.028, y - 0.04, 0.01, 0.01, 'rgba(255,255,255,.85)');
    if (lashes) for (const k of [0, 1]) stroke(0.014, '#120C0B', () => { const a = 0.35 + k * 0.3, ex = x + Math.cos(a) * 0.082 * s, ey = y + Math.sin(a) * 0.1; ctx.moveTo(ex, ey); ctx.lineTo(ex + 0.03 * s, ey + 0.025); });
  };
  const refEye = (s) => {        // 參考圖眼：中等大小、深棕瞳孔、厚上眼皮、雙眼皮、兩點反光
    const x = 0.25 * s, y = -0.1;
    if (expr === 'wink' && s === 1) return;
    const sh = () => { ctx.beginPath(); ctx.moveTo(x - 0.105 * s, y - 0.01); ctx.bezierCurveTo(x - 0.07 * s, y + 0.1, x + 0.06 * s, y + 0.11, x + 0.11 * s, y + 0.02); ctx.bezierCurveTo(x + 0.08 * s, y - 0.1, x - 0.06 * s, y - 0.11, x - 0.105 * s, y - 0.01); ctx.closePath(); };
    sh(); ctx.fillStyle = '#FBF8F4'; ctx.fill(); ctx.save(); sh(); ctx.clip();
    const g = ctx.createRadialGradient(x, y - 0.02, 0.005, x, y, 0.085); g.addColorStop(0, '#5A3A28'); g.addColorStop(0.7, '#3A2216'); g.addColorStop(1, '#1E110B');
    ell(x, y - 0.005, 0.07, 0.085, g); ell(x, y - 0.005, 0.032, 0.04, '#120906');
    ell(x - 0.028, y + 0.035, 0.022, 0.025, '#FFFFFF'); ell(x + 0.03, y - 0.04, 0.01, 0.01, 'rgba(255,255,255,.85)');
    ctx.fillStyle = 'rgba(60,30,20,.22)'; ctx.fillRect(x - 0.2, y + 0.045, 0.4, 0.08); ctx.restore();
    stroke(0.03, '#1E120D', () => { ctx.moveTo(x - 0.11 * s, y - 0.005); ctx.bezierCurveTo(x - 0.07 * s, y + 0.105, x + 0.06 * s, y + 0.115, x + 0.12 * s, y + 0.025); });
    if (lashes) stroke(0.016, '#1E120D', () => { ctx.moveTo(x + 0.115 * s, y + 0.03); ctx.lineTo(x + 0.15 * s, y + 0.055); ctx.moveTo(x + 0.095 * s, y + 0.06); ctx.lineTo(x + 0.125 * s, y + 0.09); });
    stroke(0.01, 'rgba(70,40,30,.55)', () => { ctx.moveTo(x - 0.085 * s, y + 0.075); ctx.bezierCurveTo(x - 0.04 * s, y + 0.14, x + 0.06 * s, y + 0.14, x + 0.105 * s, y + 0.07); });
    stroke(0.007, 'rgba(70,40,30,.3)', () => { ctx.moveTo(x - 0.07 * s, y - 0.09); ctx.quadraticCurveTo(x, y - 0.115, x + 0.07 * s, y - 0.085); });
  };
  const openEye = (s) => {
    if (f.eyeType === 'ref') return refEye(s);
    if (f.eyeType === 'film') return filmEye(s);
    if (f.eyeType === 'anime') return animeEye(s);
    if (f.eyeType === 'toy2') return toy2Eye(s);
    if (f.eyeType === 'gloss') return glossEye(s);
    if (f.eyeType === 'toy') return toyEye(s);
    if (f.eyeType === 'bean') return beanEye(s);
    if (f.eyeType === 'sleepy') return sleepyEye(s);
    if (f.eyeType === 'smileopen') return smileOpenEye(s);
    if (f.eyeType === 'smiley') return smileEye(s);
    const x = 0.25 * s, y = -0.1;
    ctx.save(); ctx.translate(x, y); ctx.scale(ew, eh); ctx.translate(-x, -y);
    ell(x, y, 0.118, 0.148, ink);
    const g = ctx.createLinearGradient(0, y + 0.13, 0, y - 0.13);
    g.addColorStop(0, '#2A1714'); g.addColorStop(0.55, eye); g.addColorStop(1, '#E3A877');
    ell(x, y - 0.006, 0.1, 0.13, g);
    ell(x, y - 0.01, 0.052, 0.07, '#24120F');
    ell(x - 0.035, y + 0.05, 0.045, 0.052, '#FFFFFF');
    ell(x + 0.045, y - 0.065, 0.022, 0.022, 'rgba(255,255,255,.95)');
    // 小星星
    ctx.save(); ctx.translate(x + 0.055, y + 0.04); ctx.fillStyle = '#FFFFFF'; ctx.beginPath();
    for (let i = 0; i < 8; i++) { const r = i % 2 ? 0.006 : 0.02, a = i * Math.PI / 4; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
    ctx.closePath(); ctx.fill(); ctx.restore();
    stroke(0.03, ink, () => { ctx.ellipse(x, y, 0.125, 0.152, 0, Math.PI * 0.12, Math.PI * 0.88); });     // 上眼線
    if (lashes) for (const k of [0, 1, 2]) stroke(0.016, ink, () => { const a = 0.12 + k * 0.13, ex = x + Math.cos(a) * 0.125 * s, ey = y + Math.sin(a) * 0.152; ctx.moveTo(ex, ey); ctx.lineTo(ex + (0.04 + 0.01 * k) * s, ey + 0.035 - k * 0.012); });
    if (lid > 0) {   // 上眼瞼稍微垂下：穩重或笑瞇瞇的眼神
      ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, 0.135, 0.165, 0, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = o.skin || '#FFE3D0'; ctx.fillRect(x - 0.2, y + 0.165 - lid * 0.33, 0.4, 0.3); ctx.restore();
      stroke(0.03, ink, () => { ctx.moveTo(x - 0.128, y + 0.165 - lid * 0.33 - 0.01); ctx.quadraticCurveTo(x, y + 0.165 - lid * 0.33 + 0.03, x + 0.128, y + 0.165 - lid * 0.33 - 0.01); });
    }
    if (f.crease && f.eyeType !== 'smileopen') stroke(0.011, 'rgba(58,35,32,.6)', () => { ctx.ellipse(x, y + 0.018, 0.132, 0.175, 0, Math.PI * 0.2, Math.PI * 0.8); });   // 雙眼皮線
    if (f.cheekLine) stroke(0.012, 'rgba(58,35,32,.55)', () => { ctx.moveTo(x - 0.08, y - 0.185); ctx.quadraticCurveTo(x, y - 0.155, x + 0.08, y - 0.185); });   // 笑起來的臥蠶
    if (f.eyeType === 'sparkle') { ell(x + 0.03, y + 0.07, 0.016, 0.016, '#FFFFFF'); ell(x - 0.05, y - 0.03, 0.012, 0.012, 'rgba(255,255,255,.9)'); ell(x, y - 0.1, 0.06, 0.02, 'rgba(255,230,200,.35)'); }
    if (f.under) stroke(0.012, 'rgba(58,35,32,.6)', () => { ctx.ellipse(x, y, 0.12, 0.15, 0, Math.PI * 1.15, Math.PI * 1.85); });
    ctx.restore();
  };
  const happyEye = (s) => stroke(0.03, ink, () => { const x = 0.25 * s; ctx.moveTo(x - 0.1, -0.13); ctx.quadraticCurveTo(x, 0.0, x + 0.1, -0.13); });
  const shutEye = (s) => stroke(0.026, ink, () => { const x = 0.25 * s; ctx.moveTo(x - 0.1, -0.09); ctx.quadraticCurveTo(x, -0.15, x + 0.1, -0.09); });
  for (const s of [-1, 1]) {
    ctx.save(); ctx.translate(0.25 * s, -0.1); ctx.scale(1.2, 1.2); ctx.translate(-0.25 * s, 0.1);
    if (expr === 'happy') happyEye(s);
    else if (expr === 'blink') shutEye(s);
    else if (expr === 'wink' && s === 1) happyEye(s);
    else openEye(s);
    ctx.restore();
  }
  ctx.save(); ctx.translate(0, -0.3 + mouthY); ctx.scale(1.3, 1.3); ctx.translate(0, 0.3);
  // 嘴巴
  if (expr === 'happy' || expr === 'wink') {
    ctx.beginPath(); ctx.moveTo(-0.075, -0.27); ctx.quadraticCurveTo(0, -0.27, 0.075, -0.27); ctx.quadraticCurveTo(0.06, -0.4, 0, -0.4); ctx.quadraticCurveTo(-0.06, -0.4, -0.075, -0.27); ctx.closePath();
    ctx.fillStyle = '#B23A48'; ctx.fill(); ell(0, -0.365, 0.04, 0.025, '#FF8FA0');
    stroke(0.012, ink, () => { ctx.moveTo(-0.075, -0.27); ctx.lineTo(0.075, -0.27); });
  } else if (mouthStyle === 'grin') {        // 自信的露齒笑
    ctx.beginPath(); ctx.moveTo(-0.085, -0.27); ctx.quadraticCurveTo(0, -0.3, 0.085, -0.27); ctx.quadraticCurveTo(0.05, -0.37, 0, -0.37); ctx.quadraticCurveTo(-0.05, -0.37, -0.085, -0.27); ctx.closePath();
    ctx.fillStyle = '#A8323F'; ctx.fill();
    ctx.save(); ctx.clip(); ctx.fillStyle = '#FFFFFF'; ctx.fillRect(-0.09, -0.305, 0.18, 0.04); ctx.restore();
    stroke(0.012, ink, () => { ctx.moveTo(-0.09, -0.268); ctx.quadraticCurveTo(0, -0.298, 0.09, -0.268); });
  } else if (mouthStyle === 'comic') {      // 漫畫式開口笑：上排牙＋舌頭
    ctx.beginPath(); ctx.moveTo(-0.085, -0.265); ctx.quadraticCurveTo(0, -0.28, 0.085, -0.265); ctx.quadraticCurveTo(0.07, -0.4, 0, -0.4); ctx.quadraticCurveTo(-0.07, -0.4, -0.085, -0.265); ctx.closePath();
    ctx.fillStyle = '#9E2F3A'; ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = '#FFFFFF'; ctx.fillRect(-0.09, -0.3, 0.18, 0.035); ell(0, -0.385, 0.05, 0.035, '#F07D8E'); ctx.restore();
    stroke(0.012, '#3A2320', () => { ctx.moveTo(-0.085, -0.265); ctx.quadraticCurveTo(0, -0.28, 0.085, -0.265); });
  } else if (mouthStyle === 'open') {        // 開朗大笑
    ctx.beginPath(); ctx.moveTo(-0.07, -0.27); ctx.quadraticCurveTo(0, -0.28, 0.07, -0.27); ctx.quadraticCurveTo(0.065, -0.39, 0, -0.39); ctx.quadraticCurveTo(-0.065, -0.39, -0.07, -0.27); ctx.closePath();
    ctx.fillStyle = '#B23A48'; ctx.fill(); ell(0, -0.355, 0.04, 0.026, '#FF8FA0');
  } else if (mouthStyle === 'fang') {        // 調皮小虎牙
    ctx.beginPath(); ctx.moveTo(-0.075, -0.27); ctx.quadraticCurveTo(0, -0.28, 0.075, -0.27); ctx.quadraticCurveTo(0.06, -0.36, 0, -0.36); ctx.quadraticCurveTo(-0.06, -0.36, -0.075, -0.27); ctx.closePath();
    ctx.fillStyle = '#B23A48'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(0.03, -0.272); ctx.lineTo(0.05, -0.272); ctx.lineTo(0.04, -0.3); ctx.closePath(); ctx.fillStyle = '#FFFFFF'; ctx.fill();
  } else if (mouthStyle === 'smile') {       // 溫柔的弧形微笑
    stroke(0.016, ink, () => { ctx.moveTo(-0.07, -0.28); ctx.quadraticCurveTo(0, -0.34, 0.07, -0.28); });
  } else {
    stroke(0.016, ink, () => { ctx.moveTo(-0.06, -0.28); ctx.quadraticCurveTo(-0.03, -0.32, 0, -0.29); ctx.quadraticCurveTo(0.03, -0.32, 0.06, -0.28); });   // ω 小嘴
  }
  if (f.mole) ell(f.mole[0], f.mole[1], 0.012, 0.012, '#6B4434');
  if (f.freckles) for (const s of [-1, 1]) for (const [dx, dy] of [[0.36, -0.2], [0.41, -0.23], [0.33, -0.25], [0.44, -0.19]]) ell(dx * s, dy - (-0.3 + mouthY) * 0 , 0.008, 0.008, 'rgba(160,90,60,.55)');
  ctx.restore();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

const SHARED_FACES = {};
export function buildChibi(THREE, profile = {}) {
  const root = new THREE.Group();
  const bounce = new THREE.Group(); root.add(bounce);
  const body = new THREE.Group(); bounce.add(body);
  // 卡通三階陰影
  const STYLE = profile.style || 'toy2';
  const SOFT = STYLE === 'toy' || STYLE === 'royal' || STYLE === 'comic' || STYLE === 'film' || STYLE === 'toy2';
  const ANIME = STYLE === 'anime';
  const PREM = !!profile.premium || STYLE === 'toy' || STYLE === 'royal';
  const grad = ANIME ? new THREE.DataTexture(new Uint8Array([170, 170, 170, 255, 255, 255, 255, 255]), 2, 1, THREE.RGBAFormat) : PREM
    ? new THREE.DataTexture(new Uint8Array([150, 150, 150, 255, 196, 196, 196, 255, 232, 232, 232, 255, 255, 255, 255, 255]), 4, 1, THREE.RGBAFormat)
    : new THREE.DataTexture(new Uint8Array([120, 120, 120, 255, 205, 205, 205, 255, 255, 255, 255, 255]), 3, 1, THREE.RGBAFormat);
  grad.minFilter = grad.magFilter = THREE.NearestFilter; grad.needsUpdate = true;
  const mats = new Map();
  const mat = (hex, rough = 0.6, extra = {}) => {
    const k = hex + JSON.stringify(extra);
    const { metalness, ...rest } = extra;
    if (!mats.has(k)) mats.set(k, SOFT ? new THREE.MeshStandardMaterial({ color: hex, roughness: STYLE === 'toy2' ? 0.6 : Math.max(0.42, rough), metalness: metalness || 0, envMapIntensity: STYLE === 'toy2' ? 0.55 : 1, emissive: hex, emissiveIntensity: STYLE === 'film' ? 0.06 : STYLE === 'toy2' ? 0.05 : 0.12, ...rest }) : new THREE.MeshToonMaterial({ color: hex, gradientMap: grad, ...rest }));
    return mats.get(k);
  };
  const lineMat = new THREE.MeshBasicMaterial({ color: ANIME ? '#5A3A30' : PREM ? '#2B2433' : '#4A2C28', side: THREE.BackSide });
  const radiusOf = g => { const p = g.parameters || {}; switch (g.type) {
    case 'SphereGeometry': return p.radius; case 'CapsuleGeometry': return p.radius;
    case 'CylinderGeometry': return Math.max(p.radiusTop, p.radiusBottom); case 'ConeGeometry': return p.radius;
    case 'TorusGeometry': return p.tube * 2; case 'BoxGeometry': return Math.min(p.width, p.height, p.depth); default: return 0; } };
  const mesh = (geo, m, parent, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1, line = true) => {
    const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.scale.set(sx, sy, sz);
    o.castShadow = true; parent.add(o);
    const r = radiusOf(geo);
    if (!SOFT && line && r >= 0.045 && !m.transparent && m.side !== THREE.DoubleSide) {
      const h = new THREE.Mesh(geo, lineMat); h.scale.setScalar(1 + (ANIME ? 0.009 : PREM ? 0.012 : 0.018) / r); o.add(h);
    }
    return o;
  };
  const sph = (r, w = 32, h = 24) => new THREE.SphereGeometry(r, w, h);
  const cap = (r, len) => new THREE.CapsuleGeometry(r, len, 8, 16);
  // 表情貼圖（同樣的臉共用同一組貼圖）
  const faces = SHARED_FACES;
  const hasCanvas = typeof document !== 'undefined';
  function faceTextures(girl, f, skin) {
    const key = (girl ? 'g' : 'b') + JSON.stringify(f || {}) + skin;
    if (faces[key] || !hasCanvas) return faces[key];
    const set = {};
    for (const expr of ['normal', 'blink', 'happy', 'wink']) {
      const c = document.createElement('canvas'); c.width = FACE_W; c.height = FACE_H;
      drawFace(c.getContext('2d'), { girl, expr, f: f || {}, skin });
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; set[expr] = t;
    }
    return faces[key] = set;
  }
  let head = null, faceMat = null, faceSet = null, sway = [], armR = null, armL = null;
  let hopT = -1, waveT = -1, mood = null, moodUntil = 0, nowT = 0;

  function build(p) {
    while (body.children.length) body.remove(body.children[0]);
    sway = [];
    const skin = p.skinHex || CHIBI_SKINS[p.skin] || CHIBI_SKINS.light;
    const hairC = p.hairHex || CHIBI_HAIR_COLORS[p.hairColor] || CHIBI_HAIR_COLORS.brown;
    const fit = p.fit || CHIBI_OUTFITS[p.outfit] || CHIBI_OUTFITS.casual;
    const girl = p.gender === 'female';
    const TOY = STYLE === 'toy2';
    const mSkin = TOY ? new THREE.MeshPhysicalMaterial({ color: new THREE.Color(skin).lerp(new THREE.Color('#F2B9A0'), 0.35), roughness: 0.45, sheen: 1, sheenRoughness: 0.35, sheenColor: '#FF9C8A', clearcoat: 0.18, clearcoatRoughness: 0.45, emissive: '#E8604E', emissiveIntensity: 0.1, envMapIntensity: 0.5 }) : mat(skin);
    let strandTex = null;
    if (TOY && typeof document !== 'undefined') {   // 髮絲線條貼圖：細細深淺不一的梳理紋
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 64; const x = cv.getContext('2d');
      x.fillStyle = '#808080'; x.fillRect(0, 0, 512, 64);
      let sd = 3; const rn = () => (sd = (sd * 9301 + 49297) % 233280) / 233280;
      for (let i = 0; i < 150; i++) { const u = rn() * 512, w = 1 + rn() * 2.4, v = rn() < 0.5 ? 40 + rn() * 50 : 150 + rn() * 90; x.fillStyle = `rgb(${v},${v},${v})`; x.fillRect(u, 0, w, 64); }
      strandTex = new THREE.CanvasTexture(cv); strandTex.wrapS = THREE.RepeatWrapping; strandTex.repeat.set(3, 1);
    }
    const mHair = TOY ? new THREE.MeshPhysicalMaterial({ bumpMap: strandTex, bumpScale: 1.5, color: hairC, roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.35, sheen: 0.4, sheenColor: '#' + new THREE.Color(hairC).offsetHSL(0, 0, 0.25).getHexString(), envMapIntensity: 0.6 }) : SOFT ? mat(hairC, 0.36) : mat(hairC);
    const robe = !!fit.robe;
    const trimM = fit.robe ? mat(fit.trim) : null;
    // ---- 腳（短短的）＋鞋 ----
    const legC = (fit.dress || fit.gown || fit.qipao || fit.skirt) ? (fit.tights || skin) : robe ? '#2B2B33' : fit.bottom;
    for (const s of [-1, 1]) {
      mesh(cap(0.095, 0.04), mat(legC), body, 0.12 * s, 0.17, 0);
      mesh(sph(0.12), mat(fit.shoes || '#2B2321', 0.4), body, 0.12 * s, 0.075, 0.035, 1, 0.62, 1.32);
    }
    // ---- 身體（圓滾滾）----
    if (fit.gown || fit.qipao) {
      const c = fit.gown || fit.qipao;
      mesh(cap(0.22, 0.06), mat(c, 0.5), body, 0, 0.52, 0, 1, 1, 0.92);
      mesh(new THREE.CylinderGeometry(0.22, fit.gown ? 0.4 : 0.25, 0.42, 32), mat(c, 0.5), body, 0, 0.27, 0);
      if (fit.gown) { const sa = mesh(new THREE.TorusGeometry(0.225, 0.03, 8, 32), mat(fit.sash, 0.3, { metalness: 0.3 }), body, 0, 0.47, 0); sa.rotation.x = Math.PI / 2; mesh(sph(0.05), mat(fit.sash, 0.3), body, 0.12, 0.47, 0.19); }
      if (fit.qipao) {
        mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.07, 24), mat(c, 0.5), body, 0, 0.67, 0);                 // 立領
        const nb = mesh(new THREE.TorusGeometry(0.115, 0.014, 6, 24), mat(fit.trim, 0.35), body, 0, 0.705, 0); nb.rotation.x = Math.PI / 2;
        for (const y of [0.6, 0.52]) mesh(sph(0.022), mat(fit.trim, 0.35), body, 0.1, y, 0.19, 1.6, 0.8, 0.6); // 盤扣
        const hem = mesh(new THREE.TorusGeometry(0.25, 0.015, 6, 32), mat(fit.trim, 0.35), body, 0, 0.065, 0); hem.rotation.x = Math.PI / 2;
      }
    } else if (fit.dress) {
      mesh(cap(0.22, 0.06), mat(fit.dress), body, 0, 0.52, 0, 1, 1, 0.92);
      mesh(new THREE.CylinderGeometry(0.21, 0.38, 0.28, 32, 1, true), mat(fit.dress, 0.6, { side: THREE.DoubleSide }), body, 0, 0.33, 0);
      const lace = mesh(new THREE.TorusGeometry(0.375, 0.022, 8, 40), mat(fit.lace), body, 0, 0.195, 0); lace.rotation.x = Math.PI / 2;
      mesh(sph(0.055), mat('#FFFFFF'), body, 0, 0.6, 0.2, 1.6, 0.8, 0.6);   // 胸前小蝴蝶結
    } else if (robe) {
      mesh(new THREE.CylinderGeometry(0.22, 0.34, 0.46, 32), mat(fit.robe, 0.75), body, 0, 0.36, 0);
      mesh(sph(0.23), mat(fit.robe, 0.75), body, 0, 0.6, 0, 1, 0.55, 0.9);
      // 白襯衫領口＋領結（服制規則：制服內穿有領襯衫）
      mesh(new THREE.ConeGeometry(0.085, 0.16, 3), mat('#FFFFFF'), body, 0, 0.6, 0.19, 1, 1, 0.35).rotation.z = Math.PI;
      mesh(sph(0.035), mat('#1F1F26', 0.4), body, 0, 0.635, 0.215, 1.7, 0.8, 0.6);
      // 鑲邊：領口、前襟、下襬
      const collar = mesh(new THREE.TorusGeometry(0.175, 0.05, 10, 40), trimM, body, 0, 0.665, 0.015); collar.rotation.x = Math.PI / 2 - 0.15;
      for (const s of [-1, 1]) { const st = mesh(new THREE.BoxGeometry(0.075, 0.44, 0.025), trimM, body, 0.065 * s, 0.39, 0.265); st.rotation.x = -0.26; }
    } else {
      const puff = fit.puffy ? 1.15 : 1;
      mesh(cap(0.23, 0.08), mat(fit.top, fit.puffy ? 0.85 : 0.6), body, 0, 0.5, 0, puff, puff * 0.98, 0.92 * puff);
      if (fit.puffy) for (const y of [0.42, 0.55]) { const r = mesh(new THREE.TorusGeometry(0.255, 0.02, 6, 32), mat(fit.top, 0.85), body, 0, y, 0); r.rotation.x = Math.PI / 2; r.scale.set(1.04, 0.95, 1); }
      if (fit.skirt) mesh(new THREE.CylinderGeometry(0.23, fit.skirtLong ? 0.32 : 0.33, fit.skirtLong ? 0.28 : 0.2, 32), mat(fit.skirt), body, 0, fit.skirtLong ? 0.25 : 0.29, 0, 1, 1, 0.95);
      else mesh(new THREE.CylinderGeometry(0.235, 0.24, 0.1, 32), mat(fit.bottom), body, 0, 0.32, 0, 1, 1, 0.92);
      if (fit.wide) for (const s of [-1, 1]) mesh(new THREE.CylinderGeometry(0.1, 0.14, 0.2, 20), mat(fit.bottom), body, 0.12 * s, 0.2, 0);   // 寬褲管
      if (fit.jeans) { for (const s of [-1, 1]) mesh(new THREE.BoxGeometry(0.006, 0.12, 0.006), mat('#D9A441'), body, 0.06 * s, 0.24, 0.1, 1, 1, 1, false); mesh(new THREE.BoxGeometry(0.25, 0.012, 0.01), mat('#2C4266'), body, 0, 0.365, 0.215, 1, 1, 1, false); }
      if (fit.shirt) {
        mesh(new THREE.ConeGeometry(0.09, 0.2, 3), mat(fit.shirt), body, 0, 0.6, 0.19, 1, 1, 0.3).rotation.z = Math.PI;
        if (fit.tie) mesh(new THREE.BoxGeometry(0.045, 0.17, 0.02), mat(fit.tie, 0.4), body, 0, 0.54, 0.215);
      }
      if (fit.ribbon) mesh(sph(0.055), mat(fit.ribbon), body, 0, 0.64, 0.19, 1.7, 0.85, 0.6);
      if (fit.pocket) mesh(new THREE.BoxGeometry(0.12, 0.08, 0.02), mat(fit.pocket), body, 0, 0.44, 0.205);
      if (fit.stripe) for (const s of [-1, 1]) mesh(new THREE.BoxGeometry(0.025, 0.26, 0.02), mat(fit.stripe), body, 0.15 * s, 0.5, 0.19);
      if (fit.bowtie) { for (const s of [-1, 1]) { const w = mesh(new THREE.ConeGeometry(0.035, 0.07, 12), mat(fit.bowtie, 0.4), body, 0.035 * s, 0.62, 0.225); w.rotation.z = -Math.PI / 2 * s; } }
      if (fit.flower) mesh(sph(0.03), mat(fit.flower, 0.5), body, -0.13, 0.58, 0.18);
      if (fit.buttons) for (const y of [0.56, 0.48, 0.4]) for (const s of [-1, 1]) mesh(sph(0.016), mat(fit.buttons), body, 0.06 * s, y, 0.215);
      if (fit.flowers) fit.flowers.forEach((c, i) => [[-0.12, 0.55], [0.1, 0.45], [0.02, 0.6], [-0.06, 0.4], [0.14, 0.58]].forEach(([x, y], j) => { if (j % 3 === i) mesh(sph(0.03), mat(c, 0.5), body, x, y, Math.sqrt(Math.max(0, 0.212 * 0.212 - x * x)) + 0.012, 1, 1, 0.4); }));
      if (fit.vest) {
        mesh(cap(0.237, 0.06), mat(fit.vest, 0.55), body, 0, 0.5, 0, 1.02, 0.95, 0.95);
        for (const y of [0.45, 0.55]) { const r = mesh(new THREE.TorusGeometry(0.243, 0.014, 6, 32), mat('#E8E8E8', 0.25), body, 0, y, 0); r.rotation.x = Math.PI / 2; r.scale.set(1.02, 0.95, 1); }
      }
      if (fit.coat) {
        const ct = mesh(new THREE.CylinderGeometry(0.245, 0.32, 0.4, 32, 1, true, 0.35, Math.PI * 2 - 0.7), mat(fit.coat, 0.65, { side: THREE.DoubleSide }), body, 0, 0.36, 0); ct.rotation.y = Math.PI / 2;
        mesh(sph(0.245), mat(fit.coat, 0.65), body, 0, 0.58, -0.02, 1, 0.5, 0.85);
        for (const s of [-1, 1]) { const l = mesh(new THREE.BoxGeometry(0.06, 0.2, 0.02), mat(fit.coat, 0.6), body, 0.08 * s, 0.57, 0.205); l.rotation.z = 0.35 * s; }
      }
      if (fit.lapels) for (const s of [-1, 1]) { const l = mesh(new THREE.BoxGeometry(0.07, 0.2, 0.02), mat(fit.lapels), body, 0.085 * s, 0.56, 0.205); l.rotation.z = 0.4 * s; }
      if (fit.goldButtons) for (const y of [0.47, 0.4]) mesh(sph(0.02), mat('#D4AF5A'), body, 0.05, y, 0.222, 1, 1, 0.5, false);
      if (fit.pin && !PREM) mesh(sph(0.028), mat(fit.pin), body, -0.13, 0.57, 0.2, 1, 1, 0.5, false);
      if (fit.brooch) mesh(sph(0.04), mat(fit.brooch), body, 0.06, 0.6, 0.205, 1.2, 1, 0.5, false);
      if (fit.lanyard) { const ly = mesh(new THREE.TorusGeometry(0.13, 0.01, 6, 24, Math.PI), mat(fit.lanyard), body, 0, 0.58, 0.2); ly.rotation.z = Math.PI; mesh(new THREE.BoxGeometry(0.08, 0.1, 0.015), mat('#FFFFFF'), body, 0, 0.42, 0.23); mesh(new THREE.BoxGeometry(0.05, 0.02, 0.01), mat('#D4AF5A'), body, 0, 0.44, 0.24, 1, 1, 1, false); mesh(new THREE.BoxGeometry(0.05, 0.015, 0.016), mat(fit.lanyard), body, 0, 0.45, 0.24, 1, 1, 1, false); }
      if (fit.knitVest) { mesh(cap(0.236, 0.06), mat(fit.knitVest), body, 0, 0.47, 0, 1.02, 0.85, 0.95); mesh(new THREE.ConeGeometry(0.1, 0.2, 3), mat(fit.top), body, 0, 0.57, 0.205, 1, 1, 0.3).rotation.z = Math.PI; for (const y of [0.5, 0.43]) mesh(sph(0.018), mat('#8A6A4A'), body, 0, y, 0.225, 1, 1, 0.5, false); }
      if (fit.logo) mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.01, 20), mat(fit.logo), body, 0.1, 0.56, 0.2, 1, 1, 1, false).rotation.x = Math.PI / 2 - 0.3;
      if (fit.vest) {}
      if (fit.suitVest) { mesh(new THREE.ConeGeometry(0.11, 0.24, 3), mat(fit.suitVest), body, 0, 0.5, 0.2, 1, 1, 0.3).rotation.z = Math.PI; }
      if (fit.tieStripe) for (const y of [0.57, 0.52, 0.47]) mesh(new THREE.BoxGeometry(0.048, 0.008, 0.01), mat(fit.tieStripe), body, 0, y, 0.228, 1, 1, 1, false).rotation.z = 0.5;
      if (fit.collar) for (const s of [-1, 1]) { const c = mesh(new THREE.ConeGeometry(0.06, 0.09, 3), mat(fit.collar), body, 0.06 * s, 0.63, 0.19, 1, 1, 0.4); c.rotation.z = Math.PI + 0.6 * s; }
      if (fit.stetho) { const st = mesh(new THREE.TorusGeometry(0.12, 0.012, 6, 32, Math.PI), mat('#3A3F4A', 0.4), body, 0, 0.6, 0.2); st.rotation.z = Math.PI; mesh(sph(0.03), mat('#B8BCC4', 0.3, { metalness: 0.5 }), body, 0.05, 0.47, 0.215); }
      if (fit.scarf) { const sc = mesh(new THREE.TorusGeometry(0.15, 0.05, 10, 32), mat(fit.scarf, 0.8), body, 0, 0.65, 0.01); sc.rotation.x = Math.PI / 2; mesh(cap(0.04, 0.12), mat(fit.scarf, 0.8), body, 0.08, 0.53, 0.2); }
    }
    // ---- 手臂（可揮手的關節）----
    const armC = (fit.dress || fit.gown) ? skin : fit.qipao ? fit.qipao : robe ? fit.robe : (fit.coat || fit.top);
    for (const s of [-1, 1]) {
      const sh = new THREE.Group(); sh.position.set(0.19 * s, 0.57, 0); body.add(sh);
      const arm = mesh(cap(0.07, 0.12), mat(armC), sh, 0.07 * s, -0.08, 0); arm.rotation.z = 0.5 * s;
      if (robe) { const cuff = mesh(new THREE.TorusGeometry(0.072, 0.026, 8, 24), trimM, sh, 0.12 * s, -0.155, 0); cuff.rotation.x = Math.PI / 2; cuff.rotation.y = 0.5 * s; }
      mesh(sph(0.075), mSkin, sh, 0.145 * s, -0.195, 0.02);
      sh.rotation.z = 0; if (s > 0) armR = sh; else armL = sh;
      if (p.point && s > 0) sh.userData.rest = 2.2;
    }
    // ---- 頭（超大）＋畫上去的臉 ----
    head = new THREE.Group(); head.position.set(0, 1.12, 0); body.add(head);
    const HSY = p.headSY || 0.95;
    const egg = g => {
      if (p.headShape === 'square') { const a = g.attributes.position; for (let i = 0; i < a.count; i++) { let x = a.getX(i), y = a.getY(i), z = a.getZ(i); const r = Math.hypot(x, y, z) || 1; const n = Math.pow(Math.pow(Math.abs(x/r), 4) + Math.pow(Math.abs(y/r), 4) + Math.pow(Math.abs(z/r), 4), 0.25); const k = 1 / n * 0.92; a.setXYZ(i, x * k, y * k, z * k); } a.needsUpdate = true; g.computeVertexNormals(); }
      if (p.headShape === 'bean') { const a = g.attributes.position, r = g.parameters.radius; for (let i = 0; i < a.count; i++) { const y = a.getY(i); a.setY(i, y * 1.12); if (y > 0) { a.setX(i, a.getX(i) * (1 + 0.08 * y / r)); } } a.needsUpdate = true; g.computeVertexNormals(); }
      if (p.faceShape !== 'egg') return g; const a = g.attributes.position, r = g.parameters.radius;
      for (let i = 0; i < a.count; i++) { const y = a.getY(i); if (y < 0) { const t = Math.pow(-y / r, 1.6), K = p.eggK || 0.3; a.setX(i, a.getX(i) * (1 - K * t)); a.setZ(i, a.getZ(i) * (1 - K * 0.33 * t)); a.setY(i, y * (1 + K * 0.33 * t)); } }
      a.needsUpdate = true; g.computeVertexNormals(); return g; };
    mesh(egg(sph(0.68, 48, 36)), mSkin, head, 0, 0, 0, 1.08, HSY, 1);
    if (p.nose) { const n = mesh(sph(0.045), mat(new THREE.Color(skin).offsetHSL(0, 0.05, -0.04).getStyle()), head, 0, -0.2, 0.655, 1, 0.8, 0.6, false); n.renderOrder = 3; }
    for (const s of [-1, 1]) mesh(sph(0.11), mSkin, head, 0.72 * s, -0.06, 0, 0.45, 1, 0.8);          // 耳朵
    const FD = { film: { eyeType: 'film', mouth: 'smile', softBlush: true, blush: 'rgba(230,120,110,.25)', browThick: 0.028, browY: 0.02 },
                 anime: { eyeType: 'anime', mouth: 'smile', softBlush: true, blush: 'rgba(255,120,140,.45)', browThick: 0.016, browY: 0.06 },
                 toy2: { eyeType: 'toy2', mouth: 'smile', softBlush: true, blush: 'rgba(240,95,95,.6)', browThick: 0.014, browY: 0.07 } }[STYLE];
    const faceP0 = FD ? { ...FD, ...(p.face || {}) } : null;
    const faceP = faceP0 ? faceP0 : STYLE === 'comic' ? { eyeType: 'gloss', mouth: 'comic', softBlush: true, blush: girl ? 'rgba(245,120,140,.45)' : 'rgba(240,130,130,.4)', browThick: 0.02, browY: 0.035, ...(p.face || {}) } : p.face;
    faceSet = faceTextures(girl, faceP, skin);
    if (faceSet) {
      faceMat = SOFT ? new THREE.MeshStandardMaterial({ map: faceSet.normal, transparent: true, alphaTest: 0.04, roughness: 0.6, depthWrite: false }) : new THREE.MeshToonMaterial({ map: faceSet.normal, transparent: true, alphaTest: 0.04, gradientMap: grad, depthWrite: false });
      const fg = egg(new THREE.SphereGeometry(0.684, 48, 32, Math.PI / 2 - FACE_PHI / 2, FACE_PHI, FACE_T0, FACE_TL));
      const f = new THREE.Mesh(fg, faceMat); f.scale.set(1.08, HSY, 1); f.renderOrder = 2; head.add(f);
    }
    // ---- 頭髮 ----
    function strandHair(kind) {
      const V3 = THREE.Vector3, hl = '#' + new THREE.Color(hairC).offsetHSL(0, 0, 0.06).getHexString();
      const st = (th, ph, len, w, sweep, col, R = 0.72) => {
        const n = new V3(Math.sin(th) * Math.sin(ph) * 1.07, Math.cos(th), Math.sin(th) * Math.cos(ph) * 1.03).normalize();
        let d = new V3(Math.cos(th) * Math.sin(ph), -Math.sin(th), Math.cos(th) * Math.cos(ph)).normalize();
        let X = new V3().crossVectors(d, n).normalize();
        d = d.multiplyScalar(Math.cos(sweep)).add(X.clone().multiplyScalar(Math.sin(sweep))).normalize();
        const tip = d.clone().negate(), Xr = new V3().crossVectors(tip, n).normalize();
        const geo = new THREE.SphereGeometry(0.5, 14, 10); { const pa = geo.attributes.position; for (let i = 0; i < pa.count; i++) { const y = pa.getY(i) * 2; if (y < 0) { const f = 1 + y * 0.92; pa.setX(i, pa.getX(i) * f); pa.setZ(i, pa.getZ(i) * f); } } pa.needsUpdate = true; geo.computeVertexNormals(); }
        const o = mesh(geo, mat(col, 0.38), head, 0, 0, 0, 1, 1, 1, false);
        o.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(Xr, tip, n)); o.scale.set(w, len, w * 0.5);
        const c = n.clone().multiplyScalar(R).add(d.clone().multiplyScalar(len * 0.28)); o.position.set(c.x, c.y + 0.02, c.z);
      };
      let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
      if (kind === 'swept') {        // 林律師：往後梳、側分有份量
        for (let i = 0; i < 26; i++) { const ph = -1.5 + rnd() * 3.0, th = 0.2 + rnd() * 0.55; st(th, ph, 0.5 + rnd() * 0.25, 0.12, 0.9 + rnd() * 0.3, rnd() < .4 ? hl : hairC, 0.74); }
        for (let i = 0; i < 9; i++) { const ph = -0.9 + i * 0.2; st(0.62, ph, 0.42, 0.13, -1.1, i % 3 ? hairC : hl, 0.74); }
      } else if (kind === 'messy') { // 哈姆太郎：短髮亂翹
        for (let i = 0; i < 30; i++) { const ph = -1.6 + rnd() * 3.2, th = 0.1 + rnd() * 0.9; st(th, ph, 0.3 + rnd() * 0.2, 0.11, (rnd() - .5) * 1.4, rnd() < .35 ? hl : hairC, 0.74); }
        for (let i = 0; i < 8; i++) st(0.85, -0.8 + i * 0.23, 0.32, 0.11, (rnd() - .5) * 0.6, hairC, 0.73);
      } else {                       // 女生：瀏海一絲一絲
        for (let i = 0; i < 11; i++) st(0.8 + Math.abs(-0.9 + i * 0.18) * 0.1, -0.9 + i * 0.18, 0.5, 0.1, (i - 5) * 0.06, i % 3 ? hairC : hl, 0.73);
        for (let i = 0; i < 18; i++) { const ph = -1.4 + rnd() * 2.8; st(0.3 + rnd() * 0.3, ph, 0.5, 0.13, ph * 0.3, rnd() < .4 ? hl : hairC, 0.74); }
        for (const s2 of [-1, 1]) for (let i = 0; i < 3; i++) st(1.1, (1.25 + i * 0.12) * s2, 0.6, 0.1, 0.1 * s2, hairC, 0.74);
      }
    }
    function swoopLocks() {   // 俐落側分：兩大片往側邊掃的瀏海
      const V3 = THREE.Vector3;
      const big = (th, ph, len, w, sweep) => {
        const n = new V3(Math.sin(th) * Math.sin(ph) * 1.07, Math.cos(th), Math.sin(th) * Math.cos(ph) * 1.03).normalize();
        let d = new V3(Math.cos(th) * Math.sin(ph), -Math.sin(th), Math.cos(th) * Math.cos(ph)).normalize();
        let X = new V3().crossVectors(d, n).normalize();
        d = d.multiplyScalar(Math.cos(sweep)).add(X.clone().multiplyScalar(Math.sin(sweep))).normalize();
        const tip = d.clone().negate(); const Xr = new V3().crossVectors(tip, n).normalize();
        const geo = new THREE.SphereGeometry(0.5, 32, 20); { const pa = geo.attributes.position; for (let i = 0; i < pa.count; i++) { const y = pa.getY(i) * 2; if (y < 0) { const f = 1 + y * 0.6; pa.setX(i, pa.getX(i) * f); pa.setZ(i, pa.getZ(i) * f); } } pa.needsUpdate = true; geo.computeVertexNormals(); }
        const o = mesh(geo, mHair, head, 0, 0, 0, 1, 1, 1, !SOFT);
        o.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(Xr, tip, n)); o.scale.set(w, len, w * 0.35);
        const c = n.clone().multiplyScalar(0.73).add(d.clone().multiplyScalar(len * 0.3)); o.position.set(c.x, c.y + 0.02, c.z);
      };
      big(0.62, -0.45, 0.78, 0.62, -1.15); big(0.78, 0.35, 0.62, 0.5, -1.0); big(1.0, 0.95, 0.5, 0.36, -0.5);
    }
    function comicLocks() {
      const V3 = THREE.Vector3;
      const clump = (th, ph, len, w, sweep, R = 0.7) => {
        const n = new V3(Math.sin(th) * Math.sin(ph) * 1.07, Math.cos(th), Math.sin(th) * Math.cos(ph) * 1.03).normalize();
        let d = new V3(Math.cos(th) * Math.sin(ph), -Math.sin(th), Math.cos(th) * Math.cos(ph)).normalize();
        let X = new V3().crossVectors(d, n).normalize();
        d = d.multiplyScalar(Math.cos(sweep)).add(X.clone().multiplyScalar(Math.sin(sweep))).normalize();
        X = new V3().crossVectors(d, n).normalize();
        const tip = d.clone().negate();   // 錐尖朝下
        const geo = new THREE.SphereGeometry(0.5, 20, 14); { const pa = geo.attributes.position; for (let i = 0; i < pa.count; i++) { const y = pa.getY(i) * 2; if (y < 0) { const f = 1 + y * (p.softBangs ? 0.45 : 0.88); pa.setX(i, pa.getX(i) * f); pa.setZ(i, pa.getZ(i) * f); } } pa.needsUpdate = true; geo.computeVertexNormals(); }  // 水滴形，尖端朝 -Y
        const o = mesh(geo, mHair, head, 0, 0, 0, 1, 1, 1, false);
        const Xr = new V3().crossVectors(tip, n).normalize(); o.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(Xr, tip, n));
        o.scale.set(w, len, w * 0.45);
        const c = n.clone().multiplyScalar(R).add(d.clone().multiplyScalar(len * 0.3)); o.position.set(c.x, c.y + 0.02, c.z);
      };
      const st = p.hair || (girl ? 'twin' : 'short');
      // 瀏海：一束一束、尖端、微微側掃
      const front = [-0.95, -0.62, -0.3, 0.02, 0.33, 0.64, 0.95];
      if (p.softBangs) {
        [-0.85, -0.42, 0.0, 0.42, 0.85].forEach((ph, i) => clump(0.86 + Math.abs(ph) * 0.08, ph, 0.36, 0.3, 0.35, 0.72));
        for (const s2 of [-1, 1]) clump(1.1, 1.38 * s2, girl ? 0.5 : 0.32, 0.2, 0.15 * s2, 0.73);
        return;
      }
      const fr = [-1.0, -0.6, -0.22, 0.16, 0.52, 0.9];
      fr.forEach((ph, i) => clump(0.74 + Math.abs(ph) * 0.1, ph, [0.58, 0.66, 0.62, 0.68, 0.6, 0.52][i], 0.27, -0.28 + ph * 0.12, 0.735));
      [-0.75, 0, 0.75].forEach(ph => clump(0.42, ph, 0.55, 0.32, -0.2 + ph * 0.2, 0.755));
      // 兩側鬢角
      for (const s2 of [-1, 1]) { clump(1.0, 1.3 * s2, girl ? 0.62 : 0.42, 0.18, 0.1 * s2, 0.74); clump(1.1, 1.6 * s2, girl ? 0.66 : 0.38, 0.17, 0, 0.74); }
      // 頭頂蓬鬆

    }
    const capGeo = new THREE.SphereGeometry(0.715, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.52);
    if (p.combBack) {   // 往後梳：髮際線拉高、額頭露出，髮絲從前額往後
      const cg = new THREE.SphereGeometry(0.72, 48, 24, 0, Math.PI * 2, 0, Math.PI * (p.combBack === 'side' ? 0.6 : 0.62));
      const pf = p.puff ? 1 : 0;
      if (pf) {   // 越靠頭頂越蓬，髮際線貼齊皮膚、不會有一塊厚邊
        const pa = cg.attributes.position, TM = Math.PI * 0.62;
        for (let i = 0; i < pa.count; i++) { const x = pa.getX(i), y = pa.getY(i), z = pa.getZ(i), r = Math.hypot(x, y, z); const t = Math.min(1, Math.acos(Math.max(-1, Math.min(1, y / r))) / TM); const k = 1 + 0.2 * (1 - t * t) * (1 - 0.3 * t); pa.setXYZ(i, x * k, y * k, z * k); }
        pa.needsUpdate = true; cg.computeVertexNormals();
      }
      const cb = mesh(cg, mHair, head, 0, 0.03, -0.04, 1.07, 1.02, 1.04); cb.rotation.x = p.combBack === 'side' ? -0.72 : -0.75;
      if (pf) {   // 往後梳但蓬鬆：前額上方與後腦各一團蓬度
        mesh(sph(0.5, 36, 24), mHair, head, 0, 0.42, -0.24, 1.3, 0.95, 1.0, false);
      }
      if (p.wisps) {   // 自然髮際線：太陽穴兩側往下延伸＋幾絲碎髮
        for (const sg of [-1, 1]) {
          const t = mesh(sph(0.2, 24, 16), mHair, head, 0.56 * sg, 0.12, 0.3, 0.45, 1.0, 0.55, false); t.rotation.z = 0.35 * sg;   // 鬢角往下
          for (const [dx, dy, len, rz] of [[0.47, 0.05, 0.22, 0.25], [0.52, -0.06, 0.26, 0.12], [0.38, 0.28, 0.16, 0.5]]) {
            const w = mesh(new THREE.CylinderGeometry(0.006, 0.012, len, 6), mHair, head, dx * sg, dy, 0.48 - Math.abs(dx - 0.45) * 0.4, 1, 1, 1, false);
            w.rotation.set(0.25, 0, rz * sg);
          }
        }
      }
      if (p.frame) {   // 臉旁兩側長髮順順垂到肩膀，背後一片長髮
        for (const sg of [-1, 1]) { const fp = mesh(cap(0.15, 0.5, 24), mHair, head, 0.6 * sg, -0.32, -0.08, 1, 1, 0.75); fp.rotation.z = 0.08 * sg; }
        mesh(sph(0.6, 32, 24), mHair, head, 0, -0.4, -0.42, 1.05, 1.15, 0.45, false);
      }
      if (p.combBack === 'half') {   // 半頭小丸子：前面頭髮往後收到頭頂綁成小包
        mesh(sph(0.17, 24, 18), mHair, head, 0.05, 0.7, -0.22, 1, 0.95, 1);
        mesh(new THREE.TorusGeometry(0.1, 0.03, 8, 20), mat('#E8C9A0', 0.6), head, 0.05, 0.6, -0.2).rotation.x = 1.1;
      }
      if (p.combBack === 'side') {   // 側分：一大片髮片往側邊撥，額頭露出一角
        const sw = mesh(sph(0.34, 32, 20), mHair, head, 0.12, 0.36, 0.5, 1.5, 0.5, 0.62); sw.rotation.set(-0.35, 0, -0.42);
        const sw2 = mesh(sph(0.22, 24, 16), mHair, head, 0.48, 0.12, 0.42, 0.7, 1.2, 0.6); sw2.rotation.z = 0.25;
      }
    } else mesh(capGeo, mHair, head, 0, 0.02, -0.03, 1.07, 1.0, 1.03).rotation.x = -0.45;
    if (p.swoop) { comicLocks.swoop = true; }
    if (p.strands) strandHair(p.strands);
    else if (p.comicHair) comicLocks();
    else if (p.noBangs) { if (p.swoop) swoopLocks(); }
    else if (!['lin', 'ponylong', 'bowl'].includes(p.hair)) for (let i = -2; i <= 2; i++) {               // 瀏海
      const a = i * 0.3;
      mesh(sph(0.17), mHair, head, Math.sin(a) * 0.58, 0.26 - Math.abs(i) * 0.05, Math.cos(a) * 0.55, 1.15, 0.72, 0.55, false);
    }
    // 頭髮亮光（一道一道的高光）
    for (let i = -1; i <= 1; i++) { const sh = mesh(new THREE.TorusGeometry(0.775, 0.016, 6, 30, 0.34), mat('#FFFFFF', 0, { transparent: true, opacity: 0.5 }), head, 0, 0.0, 0); sh.rotation.set(-0.55, i * 0.28, Math.PI / 2 - 0.16); }
    const style = p.hair || (girl ? 'twin' : 'short');
    const backHair = (zs = 0.9) => mesh(sph(0.68), mHair, head, 0, -0.04, -0.17, 1.06, 0.9, zs);
    if (style === 'bob') {
      backHair();
      for (const s of [-1, 1]) mesh(cap(0.19, 0.3), mHair, head, 0.62 * s, -0.26, -0.05, 1, 1, 1.1);
    } else if (style === 'twin') {
      backHair();
      for (const s of [-1, 1]) {
        mesh(sph(0.07), mat('#FF6F8E'), head, 0.55 * s, 0.32, -0.25);
        const pv = new THREE.Group(); pv.position.set(0.6 * s, 0.22, -0.25); head.add(pv); sway.push([pv, s]);
        const t = mesh(cap(0.16, 0.34), mHair, pv, 0.16 * s, -0.3, 0); t.rotation.z = -0.35 * s;
      }
    } else if (style === 'pony') {
      backHair();
      mesh(sph(0.075), mat('#FF6F8E'), head, 0, 0.22, -0.7);
      const pv = new THREE.Group(); pv.position.set(0, 0.18, -0.72); head.add(pv); sway.push([pv, 0]);
      const tail = mesh(cap(0.16, 0.34), mHair, pv, 0, -0.32, -0.1); tail.rotation.x = 0.4;
    } else if (style === 'buns') {
      backHair();
      for (const s of [-1, 1]) mesh(sph(0.22), mHair, head, 0.46 * s, 0.55, -0.08);
    } else if (style === 'curly') {
      backHair();
      for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2; mesh(sph(0.16), mHair, head, Math.cos(a) * 0.67, 0.2 + Math.sin(i * 1.7) * 0.06, Math.sin(a) * 0.58 - 0.08); }
    } else if (style === 'fluffy') {
      mesh(sph(0.68), mHair, head, 0, 0.02, -0.12, 1.07, 0.92, 0.92);
      // 蓬鬆層次：沿著頭頂表面的小髮束
      for (let k = 0; k < 9; k++) {
        const a = -1.1 + k * 0.275, el = 0.75 + Math.sin(k * 1.9) * 0.12;
        const x = Math.sin(a) * Math.cos(el) * 0.74, y = Math.sin(el) * 0.74 - 0.02, z = Math.cos(a) * Math.cos(el) * 0.74 - 0.12;
        const t = mesh(sph(0.17), mHair, head, x * 1.04, y - 0.02, z, 1.3, 0.5, 0.95); t.rotation.z = -x * 0.6; t.rotation.x = -(z) * 0.5;
      }
      // 前額垂下的瀏海（一撮一撮）
      // 圓潤的側分瀏海：一大片斜斜蓋在額頭，旁邊兩片小的
      const fr = mesh(sph(0.3), mHair, head, -0.12, 0.33, 0.48, 1.45, 0.55, 0.55); fr.rotation.z = 0.28;
      mesh(sph(0.2), mHair, head, 0.3, 0.3, 0.5, 1.1, 0.6, 0.55).rotation.z = -0.3;
      for (const s of [-1, 1]) { const c = mesh(cap(0.1, 0.18), mHair, head, 0.62 * s, 0.06, 0.3); c.rotation.z = 0.15 * s; }
    } else if (style === 'lin') {
      // 林律師：頂部有蓬度、前額大片瀏海由左上往右下斜撥、兩側短而俐落
      mesh(sph(0.68), mHair, head, 0, 0.03, -0.12, 1.07, 0.92, 0.92);
      mesh(sph(0.5), mHair, head, -0.05, 0.42, -0.02, 1.32, 0.62, 1.22);                          // 頭頂蓬度
      const sw = mesh(sph(0.34), mHair, head, 0.06, 0.33, 0.44, 1.7, 0.52, 0.62); sw.rotation.z = -0.32;   // 斜撥瀏海
      const tip = mesh(cap(0.12, 0.2), mHair, head, 0.47, 0.18, 0.43, 1, 1, 0.8); tip.rotation.z = 0.55;    // 垂到右額角的髮尾
      const lift = mesh(sph(0.2), mHair, head, -0.38, 0.5, 0.33, 1.3, 0.75, 0.8); lift.rotation.z = 0.35;   // 左側往上翻的髮根
      for (const s of [-1, 1]) mesh(cap(0.1, 0.16), mHair, head, 0.66 * s, 0.1, 0.12, 0.8, 1, 1);           // 兩側鬢角
    } else if (style === 'ponylong') {
      backHair();
      // 有層次的瀏海：細長髮片由中分往兩側撥，帶一點弧度
      // 中分的蓬鬆瀏海：左右兩片大弧度髮片，加兩撮細髮尾
      if (p.combBack) {   // 全部往後梳：額頭露出，髮流往後到馬尾
      } else {
      const L = mesh(sph(0.3), mHair, head, -0.2, 0.31, 0.47, 1.35, 0.56, 0.6); L.rotation.z = 0.38;
      const R = mesh(sph(0.29), mHair, head, 0.21, 0.31, 0.47, 1.3, 0.55, 0.6); R.rotation.z = -0.36;
      for (const s of [-1, 1]) { const w = mesh(new THREE.ConeGeometry(0.07, 0.2, 12), mHair, head, 0.47 * s, 0.13, 0.43); w.rotation.set(-0.3, 0, Math.PI - 0.35 * s); }
      }
      mesh(sph(0.36), mHair, head, 0, 0.5, 0.05, 1.5, 0.55, 1.2);                                // 頭頂蓬鬆
      if (p.combBack !== 'half') {
      // 高馬尾：深藍髮圈綁在右後上方，長髮束順肩垂下，髮尾往外上翹
      const ST = !!p.smoothTail;
      mesh(new THREE.TorusGeometry(0.1, 0.05, 10, 24), mat(p.tie || '#2B3A66'), head, ST ? 0.7 : 0.36, ST ? 0.5 : 0.52, ST ? -0.32 : -0.46).rotation.set(ST ? 0.9 : 0.6, ST ? 0.9 : 0.8, 0);
      if (!ST) mesh(sph(0.19), mHair, head, 0.44, 0.44, -0.42, 1.1, 1.1, 1.1);
      const pv = new THREE.Group(); if (ST) { pv.position.set(0.74, 0.46, -0.3); pv.scale.setScalar(1.3); } else pv.position.set(0.55, 0.3, -0.32); head.add(pv); sway.push([pv, 1]);
      // 長度到肩膀再下來一點，蓬鬆圓潤，髮尾微微往外翹
      const path = [[0.1, -0.08, 0.0, 0.23], [0.2, -0.27, 0.08, 0.26], [0.26, -0.48, 0.15, 0.26], [0.28, -0.67, 0.21, 0.22], [0.34, -0.8, 0.25, 0.17], [0.44, -0.83, 0.26, 0.13], [0.52, -0.78, 0.25, 0.09]];
      if (p.smoothTail) {   // 蓬蓬的一把馬尾：幾束粗粗圓圓的髮束並在一起，往下自然散開
        const lock = (x, y, z, len, w, rz, rx) => {
          const g = new THREE.SphereGeometry(0.5, 28, 20); const pa = g.attributes.position;
          for (let i = 0; i < pa.count; i++) { const yy = pa.getY(i) * 2; const f = yy < 0 ? 1 + yy * 0.55 : 1 - yy * 0.15; pa.setX(i, pa.getX(i) * f); pa.setZ(i, pa.getZ(i) * f); }
          pa.needsUpdate = true; g.computeVertexNormals();
          const o = mesh(g, mHair, pv, x, y, z, w, len, w, false); o.rotation.set(rx, 0, rz); return o;
        };
        lock(0.1, -0.32, 0.0, 0.72, 0.36, 0.18, 0.05);
        lock(0.18, -0.38, 0.1, 0.7, 0.3, 0.06, 0.2);
        lock(0.16, -0.38, -0.12, 0.68, 0.3, 0.1, -0.15);
        lock(0.26, -0.42, 0.0, 0.62, 0.28, -0.08, 0.05);
        lock(0.04, -0.4, 0.04, 0.58, 0.26, 0.3, 0.1);
        mesh(sph(0.2, 28, 20), mHair, pv, 0.06, -0.02, 0, 1.1, 0.9, 1.1, false);
      } else
      path.forEach(([x, y, z, r]) => mesh(sph(r), mHair, pv, x, y, z, 1.05, 1.1, 1));
      // 髮束紋路：幾條細髮絲貼著馬尾，讓馬尾有線條感
      if (!p.smoothTail) for (const k of [-1, 0, 1]) { const st = mesh(cap(0.035, 0.42), mHair, pv, 0.22 + k * 0.08, -0.42, 0.2 + k * 0.04, 1, 1, 1); st.rotation.z = -0.08 + k * 0.06; st.rotation.x = 0.25; }
      }
    } else if (style === 'messybun') {
      backHair();
      // 大顆蓬鬆包頭＋髮圈
      for (const [x, y, z, r] of [[0, 0.82, -0.14, 0.27], [0.18, 0.8, -0.08, 0.2], [-0.18, 0.8, -0.1, 0.2], [0.05, 0.98, -0.12, 0.2], [-0.08, 0.86, 0.04, 0.17], [0.12, 0.88, -0.28, 0.18], [-0.14, 0.9, -0.26, 0.17]]) mesh(sph(r), mHair, head, x, y, z);
      mesh(new THREE.TorusGeometry(0.22, 0.05, 10, 28), mat(p.bunBand || '#E9C9A0'), head, 0, 0.66, -0.12).rotation.x = Math.PI / 2;
    } else if (style === 'bowl') {
      // 齊瀏海香菇頭：頭髮像碗一樣蓋下來，前額一刀剪齊、圓圓的蘑菇形
      mesh(new THREE.SphereGeometry(0.74, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.43), mHair, head, 0, 0.02, 0.0, 1.09, 1.0, 1.0);
      mesh(sph(0.7), mHair, head, 0, -0.04, -0.14, 1.07, 0.92, 0.9);
      for (const s of [-1, 1]) mesh(cap(0.12, 0.2), mHair, head, 0.68 * s, -0.02, 0.05, 0.8, 1, 1);
    } else if (style === 'spiky') {
      mesh(sph(0.68), mHair, head, 0, 0.0, -0.13, 1.05, 0.88, 0.9);
      for (let i = 0; i < 5; i++) { const t = mesh(new THREE.ConeGeometry(0.15, 0.3, 12), mHair, head, -0.34 + i * 0.17, 0.8 - Math.abs(i - 2) * 0.07, -0.08); t.rotation.z = (2 - i) * 0.25; t.rotation.x = -0.2; }
    } else if (style === 'topbun') {
      backHair();
      mesh(sph(0.24), mHair, head, 0, 0.74, -0.12);
      const band = mesh(new THREE.TorusGeometry(0.16, 0.035, 8, 24), mat(p.bunBand || '#F7F1E6'), head, 0, 0.6, -0.1); band.rotation.x = Math.PI / 2;
    } else if (style === 'side') {
      mesh(sph(0.68), mHair, head, 0, 0.0, -0.13, 1.05, 0.9, 0.9);
      mesh(sph(0.3), mHair, head, 0.3, 0.5, 0.25, 1.2, 0.55, 0.8).rotation.z = -0.3;   // 側分瀏海
    } else {
      mesh(sph(0.68), mHair, head, 0, 0.0, -0.13, 1.05, 0.88, 0.9);
    }
    if (!girl && !fit.hat && !p.noAhoge && !p.comicHair && !p.strands && !p.noBangs && style !== 'spiky') { const ah = mesh(sph(0.1), mHair, head, 0.08, 0.74, 0.05, 0.55, 1.5, 0.55); ah.rotation.z = -0.45; sway.push([ah, 9]); }   // 男生：呆毛
    if (girl && !p.noClip && (p.accessory || 'none') !== 'bow' && !fit.hat) {                                                         // 女生：愛心髮夾
      for (const s of [-1, 1]) mesh(sph(0.05), mat('#FF5C84'), head, -0.42 + 0.035 * s, 0.4, 0.5, 1, 1, 1, false);
      mesh(new THREE.ConeGeometry(0.07, 0.08, 16), mat('#FF5C84'), head, -0.42, 0.355, 0.5, 1, 1, 1, false).rotation.z = Math.PI;
    }
    // ---- 耳罩式耳機（戴在頭上）----
    if (fit.headphones) {
      // 高級電競耳機：黑色＋金邊、金色徽章、左側麥克風
      const hm = mat(fit.headphones), gold = mat('#D4AF5A');
      const hb = mesh(new THREE.TorusGeometry(0.69, 0.075, 14, 48, Math.PI), hm, head, 0, -0.02, -0.04); hb.scale.set(1.15, 1.0, 1.2);
      const gs = mesh(new THREE.TorusGeometry(0.69, 0.022, 8, 48, Math.PI), gold, head, 0, -0.02, 0.03, 1.15, 1.0, 1.0, false);
      for (const s of [-1, 1]) {
        const cup = mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.16, 32), hm, head, 0.8 * s, -0.05, 0.0); cup.rotation.z = Math.PI / 2;
        const rim = mesh(new THREE.TorusGeometry(0.205, 0.022, 10, 32), gold, head, 0.885 * s, -0.05, 0.0, 1, 1, 1, false); rim.rotation.y = Math.PI / 2;
        const lg = mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.02, 24), gold, head, 0.89 * s, -0.05, 0.0, 1, 1, 1, false); lg.rotation.z = Math.PI / 2;
        mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.024, 20), hm, head, 0.895 * s, -0.05, 0.0, 1, 1, 1, false).rotation.z = Math.PI / 2;
        const pad = mesh(new THREE.TorusGeometry(0.15, 0.055, 10, 28), mat('#2A2A30'), head, 0.71 * s, -0.05, 0.0); pad.rotation.y = Math.PI / 2;
      }
      const mic = mesh(cap(0.025, 0.42), hm, head, -0.74, -0.32, 0.28); mic.rotation.set(-0.9, 0, 0.35);
      mesh(sph(0.055), hm, head, -0.6, -0.42, 0.5);
      mesh(new THREE.TorusGeometry(0.03, 0.01, 6, 16), gold, head, -0.62, -0.41, 0.53, 1, 1, 1, false);
    }
    // ---- 服裝帽子 ----
    const hat = fit.hat;
    if (hat === 'nurse') {
      mesh(new THREE.BoxGeometry(0.42, 0.13, 0.12), mat('#FFFFFF', 0.5), head, 0, 0.62, 0.22).rotation.x = -0.3;
      mesh(new THREE.BoxGeometry(0.16, 0.03, 0.02), mat('#F28AA8', 0.5), head, 0, 0.64, 0.29).rotation.x = -0.3;
    } else if (hat === 'chef') {
      mesh(new THREE.CylinderGeometry(0.36, 0.38, 0.16, 32), mat('#FFFFFF', 0.7), head, 0, 0.62, -0.03);
      for (const [x, z] of [[0, 0], [-0.17, 0.05], [0.17, 0.05], [0, -0.14]]) mesh(sph(0.23), mat('#FFFFFF', 0.75), head, x, 0.86, z - 0.03);
    } else if (hat === 'hard') {
      mesh(new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), mat('#F6C343', 0.35), head, 0, 0.42, -0.02, 1.15, 0.85, 1.1);
      mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.03, 40), mat('#F6C343', 0.35), head, 0, 0.43, 0.05, 1, 1, 1.05);
      mesh(new THREE.BoxGeometry(0.06, 0.06, 0.6), mat('#E2AE2E', 0.35), head, 0, 0.83, 0);
    } else if (hat === 'detective') {
      mesh(new THREE.SphereGeometry(0.52, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), mat('#8A6A4A', 0.8), head, 0, 0.45, -0.02, 1.15, 0.8, 1.1);
      mesh(new THREE.CylinderGeometry(0.66, 0.66, 0.025, 40), mat('#8A6A4A', 0.8), head, 0, 0.46, 0.04, 1, 1, 1.05);
      const band = mesh(new THREE.TorusGeometry(0.58, 0.03, 6, 40), mat('#4A3626', 0.6), head, 0, 0.5, -0.02); band.rotation.x = Math.PI / 2; band.scale.set(1.04, 1.02, 1);
    } else if (hat === 'beanie') {
      mesh(new THREE.SphereGeometry(0.62, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), mat('#D24B4B', 0.85), head, 0, 0.3, -0.02, 1.1, 0.95, 1.05);
      const rim = mesh(new THREE.TorusGeometry(0.66, 0.06, 8, 40), mat('#F2F2F2', 0.85), head, 0, 0.32, -0.02); rim.rotation.x = Math.PI / 2; rim.scale.set(1.04, 1.02, 1);
      mesh(sph(0.11), mat('#F2F2F2', 0.9), head, 0, 0.92, -0.02);
    }
    // ---- 手上的小物 ----
    if (p.prop === 'calculator') {
      const g = new THREE.Group(); g.position.set(-0.36, 0.33, 0.12); g.rotation.set(-0.5, 0.2, 0.15); body.add(g);
      mesh(new THREE.BoxGeometry(0.16, 0.21, 0.035), mat('#F2D7A6'), g);
      mesh(new THREE.BoxGeometry(0.12, 0.05, 0.01), mat('#9FC7A8'), g, 0, 0.06, 0.02, 1, 1, 1, false);
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) mesh(new THREE.BoxGeometry(0.028, 0.022, 0.01), mat(r === 2 && c === 2 ? '#F28AA8' : '#FFFFFF'), g, -0.04 + c * 0.04, 0.0 - r * 0.035, 0.02, 1, 1, 1, false);
    } else if (p.prop === 'book') {
      const g = new THREE.Group(); g.position.set(-0.36, 0.36, 0.1); g.rotation.set(-0.15, 0.5, 0.25); body.add(g);
      mesh(new THREE.BoxGeometry(0.2, 0.27, 0.06), mat('#1C1A1E'), g);
      if (!PREM) mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.01, 20), mat('#D4AF5A'), g, 0, 0.03, 0.032, 1, 1, 1, false).rotation.x = Math.PI / 2;
      mesh(new THREE.BoxGeometry(0.17, 0.25, 0.05), mat('#F7F1E6'), g, 0.016, 0, 0, 1, 1, 1, false);
      if (PREM && p.logoUrl && THREE.TextureLoader) { const t = new THREE.TextureLoader().load(p.logoUrl); t.colorSpace = THREE.SRGBColorSpace; const lg = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.15), new THREE.MeshBasicMaterial({ map: t, transparent: true })); lg.position.set(0, 0.03, 0.0315); g.add(lg); }
    } else if (p.prop === 'laptop') {
      const g = new THREE.Group(); g.position.set(0, 0.36, 0.3); body.add(g);
      mesh(new THREE.BoxGeometry(0.34, 0.02, 0.22), mat('#C8CCD2'), g);
      const lid = mesh(new THREE.BoxGeometry(0.34, 0.22, 0.02), mat('#C8CCD2'), g, 0, 0.1, 0.11); lid.rotation.x = 0.35;
      mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.005, 16), mat('#D4AF5A'), lid, 0, 0, 0.012, 1, 1, 1, false).rotation.x = Math.PI / 2;
    } else if (p.prop === 'papers') {
      const g = new THREE.Group(); g.position.set(-0.36, 0.34, 0.12); g.rotation.set(-0.3, 0.3, 0.2); body.add(g);
      for (let i = 0; i < 4; i++) mesh(new THREE.BoxGeometry(0.2, 0.26, 0.006), mat(i % 2 ? '#FFFFFF' : '#F4F1EA'), g, i * 0.012, i * 0.01, i * 0.008, 1, 1, 1, i === 0);
    } else if (p.prop === 'tablet') {
      const g = new THREE.Group(); g.position.set(-0.36, 0.34, 0.12); g.rotation.set(-0.4, 0.25, 0.1); body.add(g);
      mesh(new THREE.BoxGeometry(0.2, 0.26, 0.025), mat('#3A3F4A'), g);
      mesh(new THREE.BoxGeometry(0.17, 0.22, 0.01), mat('#8FC4F0'), g, 0, 0, 0.014, 1, 1, 1, false);
    } else if (p.prop === 'teacup') {
      const g = new THREE.Group(); g.position.set(-0.36, 0.33, 0.14); body.add(g);
      mesh(new THREE.CylinderGeometry(0.065, 0.05, 0.08, 20), mat('#FFFFFF'), g);
      mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.01, 20), mat('#C98A54'), g, 0, 0.036, 0, 1, 1, 1, false);
      const h = mesh(new THREE.TorusGeometry(0.03, 0.01, 6, 16), mat('#FFFFFF'), g, -0.07, 0, 0); h.rotation.y = Math.PI / 2;
      mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.012, 24), mat('#F6C1D1'), g, 0, -0.045, 0);
    }
    // ---- 配件 ----
    const acc = (hat && (p.accessory === 'beret')) ? 'none' : (p.accessory || 'none');
    if (acc === 'glasses') {
      for (const s of [-1, 1]) mesh(new THREE.TorusGeometry(0.15, 0.017, 8, 32), mat('#3B2B26', 0.35), head, 0.25 * s, -0.1, 0.67);
      mesh(new THREE.BoxGeometry(0.12, 0.017, 0.017), mat('#3B2B26', 0.35), head, 0, -0.07, 0.69);
    } else if (acc === 'bow') {
      for (const s of [-1, 1]) { const w = mesh(new THREE.ConeGeometry(0.12, 0.22, 16), mat('#E2566F', 0.5), head, 0.34 + 0.11 * s, 0.56, 0.28); w.rotation.z = -Math.PI / 2 * s; }
      mesh(sph(0.055), mat('#C53F57', 0.5), head, 0.34, 0.56, 0.29);
    } else if (acc === 'beret') {
      mesh(sph(0.55), mat('#B23A48', 0.7), head, 0.08, 0.6, -0.02, 1.15, 0.36, 1.1);
      mesh(sph(0.05), mat('#B23A48', 0.7), head, 0.1, 0.8, 0);
    } else if (acc === 'bag') {
      const bag = new THREE.Group(); bag.position.set(0.38, 0.25, 0.08); body.add(bag);
      mesh(new THREE.BoxGeometry(0.24, 0.17, 0.08), mat('#7A4A2A', 0.5), bag);
      mesh(new THREE.TorusGeometry(0.045, 0.013, 8, 16, Math.PI), mat('#4E2F1B', 0.5), bag, 0, 0.085, 0);
      mesh(new THREE.BoxGeometry(0.05, 0.03, 0.09), mat('#C6A25D'), bag, 0, 0.035, 0);
    }
    // ---- 高級版（員工）：成熟比例、德威陽徽章 ----
    if (PREM) {
      const k = p.ratio || 1.22;
      for (const c of [...body.children]) {
        if (c === head) continue;
        c.position.y *= k;
        if (c.isMesh) c.scale.y *= k; else if (c === armL || c === armR) c.scale.y *= 1.12;
      }
      head.position.y = 1.12 * k - (k > 1.05 ? 0.06 : 0); head.scale.setScalar(p.headS || 0.9);
      // 德威陽徽章：金框＋官方 Logo（左胸）
      const badge = new THREE.Group(); badge.position.set(0.118, 0.47 * k, 0.232); badge.rotation.set(-0.06, 0.34, 0); body.add(badge);
      if (p.badge === 'pin') { badge.position.set(0.115, 0.5 * k, 0.228); badge.scale.setScalar(0.62); } else if (p.badge === 'none') badge.visible = false;
      mesh(new THREE.CylinderGeometry(0.112, 0.112, 0.018, 48), mat('#B8893A', 0.3), badge, 0, 0, 0, 1, 1, 1, false).rotation.x = Math.PI / 2;
      mesh(new THREE.TorusGeometry(0.106, 0.012, 10, 48), mat('#F3D88E', 0.3), badge, 0, 0, 0.01, 1, 1, 1, false);
      const face = new THREE.Mesh(new THREE.CircleGeometry(0.096, 48), new THREE.MeshBasicMaterial({ color: '#16284A' })); face.position.z = 0.0105; badge.add(face);
      if (p.logoUrl && THREE.TextureLoader) {
        const tex = new THREE.TextureLoader().load(p.logoUrl); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
        const lg = new THREE.Mesh(new THREE.PlaneGeometry(0.17, 0.17), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
        lg.position.set(0, 0.004, 0.012); badge.add(lg);
      }
    if (STYLE === 'comic') {
      // 漫畫式髮束：一束一束有層次、帶光澤
      const hl = '#' + new THREE.Color(hairC).offsetHSL(0, 0, 0.07).getHexString();
      const V3 = THREE.Vector3, up = new V3();
      const lock = (th, ph, len, w, R, col, sweep = 0) => {
        const n = new V3(Math.sin(th) * Math.sin(ph) * 1.07, Math.cos(th), Math.sin(th) * Math.cos(ph) * 1.03).normalize();
        let d = new V3(Math.cos(th) * Math.sin(ph), -Math.sin(th), Math.cos(th) * Math.cos(ph)).normalize();
        let X = new V3().crossVectors(n, d).normalize();
        d = d.multiplyScalar(Math.cos(sweep)).add(X.clone().multiplyScalar(Math.sin(sweep))).normalize();
        X = new V3().crossVectors(n, d).normalize();
        const o = mesh(new THREE.SphereGeometry(1, 28, 18), mat(col, 0.42), head, n.x * R, n.y * R + 0.02, n.z * R, 1, 1, 1, false);
        o.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(X, n, d)); o.scale.set(w, w * 0.42, len);
      };
      if ((p.hair || '') === 'lin') {
        // 旁分：左邊分線，瀏海往右側大片掃過
        [[0.62, -0.75, 0.44, 0.24, hairC], [0.6, -0.3, 0.46, 0.25, hairC], [0.62, 0.12, 0.44, 0.24, hairC], [0.7, 0.55, 0.38, 0.22, hairC], [0.85, 0.95, 0.3, 0.2, hairC]]
          .forEach(([th, ph, len, w, col]) => lock(th, ph, len, w, 0.7, col, -0.75));
      }
    }
    if (STYLE === 'royal') {
      const k = 1.22, gold = mat('#D4AF5A', 0.35, { metalness: 0.55 });
      // 肩章
      for (const s of [-1, 1]) {
        const ep = mesh(new THREE.CylinderGeometry(0.085, 0.095, 0.035, 24), gold, body, 0.215 * s, 0.6 * k + 0.035, 0.0); ep.rotation.z = -0.45 * s;
        for (let i = 0; i < 5; i++) mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.07, 6), gold, body, 0.27 * s + (i - 2) * 0.012 * s, 0.6 * k - 0.005 - Math.abs(i - 2) * 0.004, (i - 2) * 0.03);
      }
      // 金色滾邊：前襟、下襬
      for (const s of [-1, 1]) { const ed = mesh(new THREE.BoxGeometry(0.014, 0.3, 0.012), gold, body, 0.02 * s, 0.45 * k, 0.22); ed.rotation.x = -0.12; }
      // 短披風（背後）
      const cape = mesh(new THREE.CylinderGeometry(0.26, 0.36, 0.5, 32, 1, true, Math.PI * 0.55, Math.PI * 0.9), mat('#14213A', 0.6, { side: THREE.DoubleSide }), body, 0, 0.47 * k, -0.02); 
      // 斜背金色綬帶
      const sash = mesh(new THREE.BoxGeometry(0.05, 0.5, 0.01), mat('#C9A24D', 0.4, { metalness: 0.4 }), body, -0.02, 0.5 * k, 0.225); sash.rotation.z = -0.62;
    }
    }
    if (!PREM && p.ratio) {
      const k = p.ratio;
      for (const c of [...body.children]) { if (c === head) continue; c.position.y *= k; if (c.isMesh) c.scale.y *= k; else if (c === armL || c === armR) c.scale.y *= 1.1; }
      head.scale.setScalar(p.headS || 0.92); head.position.y = 0.68 * k + 0.6 * (p.headS || 0.92);
    }
    if (p.visitorPass) {   // 德威陽訪客證：深藍掛繩＋Logo 卡片
      const k = p.ratio || 1;
      const ly = mesh(new THREE.TorusGeometry(0.15, 0.011, 8, 32, Math.PI), mat('#1A2B4C', 0.5), body, 0, 0.62 * k, 0.17); ly.rotation.set(-0.35, 0, Math.PI);
      const card = new THREE.Group(); card.position.set(0, 0.43 * k, 0.236); card.rotation.x = -0.08; body.add(card);
      mesh(new THREE.BoxGeometry(0.15, 0.2, 0.012), mat('#FFFDF8', 0.4), card, 0, 0, 0, 1, 1, 1, false);
      mesh(new THREE.BoxGeometry(0.15, 0.045, 0.013), mat('#1A2B4C', 0.5), card, 0, -0.075, 0.001, 1, 1, 1, false);
      mesh(new THREE.BoxGeometry(0.04, 0.02, 0.016), mat('#C9A24D', 0.3, { metalness: 0.6 }), card, 0, 0.1, 0, 1, 1, 1, false);
      if (typeof document !== 'undefined') {
        const cv = document.createElement('canvas'); cv.width = 128; cv.height = 32; const cx = cv.getContext('2d');
        cx.fillStyle = '#F3D9A4'; cx.font = 'bold 22px sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('VISITOR', 64, 17);
        const tt = new THREE.CanvasTexture(cv); tt.colorSpace = THREE.SRGBColorSpace;
        const tp = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.035), new THREE.MeshBasicMaterial({ map: tt, transparent: true })); tp.position.set(0, -0.075, 0.0085); card.add(tp);
      }
      if (p.logoUrl && THREE.TextureLoader) { const tx = new THREE.TextureLoader().load(p.logoUrl); tx.colorSpace = THREE.SRGBColorSpace;
        const lg = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.13), new THREE.MeshBasicMaterial({ map: tx, transparent: true })); lg.position.set(0, 0.022, 0.0075); card.add(lg); }
    }
    if (!PREM && p.badge && p.logoUrl && THREE.TextureLoader) {
      const bd = new THREE.Group(); bd.position.set(0.11, (p.ratio || 1) * 0.5, 0.228); bd.rotation.set(-0.1, 0.35, 0); bd.scale.setScalar(0.62); body.add(bd);
      mesh(new THREE.CylinderGeometry(0.112, 0.112, 0.018, 48), mat('#B8893A', 0.3, { metalness: 0.6 }), bd, 0, 0, 0, 1, 1, 1, false).rotation.x = Math.PI / 2;
      mesh(new THREE.TorusGeometry(0.106, 0.012, 10, 48), mat('#F3D88E', 0.3, { metalness: 0.6 }), bd, 0, 0, 0.01, 1, 1, 1, false);
      const fc = new THREE.Mesh(new THREE.CircleGeometry(0.096, 48), new THREE.MeshBasicMaterial({ color: '#16284A' })); fc.position.z = 0.0105; bd.add(fc);
      const tx = new THREE.TextureLoader().load(p.logoUrl); tx.colorSpace = THREE.SRGBColorSpace;
      const lg = new THREE.Mesh(new THREE.PlaneGeometry(0.17, 0.17), new THREE.MeshBasicMaterial({ map: tx, transparent: true })); lg.position.set(0, 0.004, 0.012); bd.add(lg);
    }
  }

  build(profile);
  const setExpr = e => { if (faceMat && faceSet && faceMat.map !== faceSet[e]) { faceMat.map = faceSet[e]; faceMat.needsUpdate = true; } };
  return {
    group: root,
    update(p) { build(p); },
    hop() { hopT = 0; mood = 'happy'; moodUntil = nowT + 1100; },
    wave() { waveT = 0; mood = 'wink'; moodUntil = nowT + 1400; },
    tick(t) {
      nowT = t;
      const ph = Math.sin(t / 330);
      bounce.position.y = Math.abs(ph) * 0.035;
      bounce.scale.set(1 + 0.025 * (1 - Math.abs(ph)), 1 - 0.03 * (1 - Math.abs(ph)), 1 + 0.025 * (1 - Math.abs(ph)));
      if (head) head.rotation.z = Math.sin(t / 950) * 0.06;
      sway.forEach(([o, s], i) => { if (s === 9) o.rotation.z = -0.45 + Math.sin(t / 260) * 0.25; else if (s === 0) o.rotation.x = Math.sin(t / 400) * 0.15; else o.rotation.z = Math.sin(t / 400 + i) * 0.12 * s; });
      if (armL) armL.rotation.z = -Math.sin(t / 660) * 0.06;
      if (armR) armR.rotation.z = (armR.userData.rest || 0) + Math.sin(t / 660) * 0.06;
      if (waveT >= 0 && armR) {      // 揮手
        waveT += 16; const k = waveT / 1300;
        armR.rotation.z = (k < 0.15 ? k / 0.15 : k > 0.85 ? (1 - k) / 0.15 : 1) * (2.3 + Math.sin(waveT / 70) * 0.35);
        if (k >= 1) { waveT = -1; armR.rotation.z = armR.userData.rest || 0; }
      }
      if (hopT >= 0) {               // 換裝時跳一下、轉一圈
        hopT += 16; const k = Math.min(hopT / 620, 1);
        body.position.y = Math.sin(k * Math.PI) * 0.35; body.rotation.y = k * Math.PI * 2;
        if (armL && armR) { armL.rotation.z = -Math.sin(k * Math.PI) * 1.6; armR.rotation.z = Math.sin(k * Math.PI) * 1.6; }
        if (k >= 1) { hopT = -1; body.position.y = 0; body.rotation.y = 0; }
      }
      // 表情
      if (mood && t < moodUntil) setExpr(mood);
      else { mood = null; setExpr((t % 3600) > 3460 ? 'blink' : 'normal'); }
    },
  };
}
