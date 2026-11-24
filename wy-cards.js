// v509 開場卡（各島一開始的介紹）統一新樣式（陳老闆 2026-11-21 定案）
// 胖胖圓角、奶油白厚外圈、金框、珍珠奶油底；頂上 Logo 金章；右上整顆太陽會發光；兩側胖麥穗；小太陽開頭；胖金色按鈕
// 只換外觀，原本的按鈕（含點擊功能）原封不動搬進新外框
const GOLD = 'linear-gradient(#FFEFB8,#E9C46A 35%,#C08A2E 70%,#F3D27A)';
const SUB = '台灣律師｜美國律師｜前上市公司法務長';
const CASTLE_POINTS = [['拉花有法度', '咖啡洩漏天機'], ['頭條有法度', '德威陽又上新聞啦'], ['印表機叛亂中', '乖乖快來救駕'], ['開講有法度', '老闆開講誰敢睡'], ['合約有法度', '蓋章也要有節奏'], ['行程有法度', '追得到林律師嗎'], ['續杯有法度', '咖啡機先投降'], ['加薪有法度', '疊到老闆心跳加速']];/* 陳老闆 11-21 10:48 定稿 */
const sunIcon = s => `<svg width="${s}" height="${s}" viewBox="-14 -14 28 28" style="flex:none">${Array.from({ length: 8 }, (_, k) => `<path d="M0 -8 Q2 -11 0 -13 Q-2 -11 0 -8Z" fill="#FFB53A" transform="rotate(${k * 45})"/>`).join('')}<circle r="6.5" fill="#FFC94A" stroke="#D88A1A" stroke-width="1"/></svg>`;
const bigSun = `<div class="wyc-glow"></div><svg class="wyc-sun" width="70" height="70" viewBox="-30 -30 60 60">${Array.from({ length: 12 }, (_, k) => `<path d="M0 -15 Q4.5 -21 0 -27 Q-4.5 -21 0 -15Z" fill="#FFB53A" transform="rotate(${k * 30})"/>`).join('')}<circle r="14" fill="#FFC94A" stroke="#D88A1A" stroke-width="1.4"/><ellipse cx="-4" cy="-6" rx="5" ry="2.4" fill="#fff" opacity=".6"/></svg>`;
const GR = 'M0,-8 C3.4,-5 3.6,2.5 0,6.5 C-3.6,2.5 -3.4,-5 0,-8Z';
function wheat(H) {
  const P = []; for (let k = 0; k <= 100; k++) { const t = k / 100; P.push([30 - 22 * Math.sin(t * Math.PI * .9), H - 8 - (H - 30) * t]); }
  let s = `<path d="M${P.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L')}" stroke="#C9963C" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
  for (let i = 3; i < P.length - 3; i += 7) {
    const [x, y] = P[i], [x2, y2] = P[i + 2]; const d = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI; const sc = 1.7 - .5 * (i / P.length);
    for (const side of [1, -1]) { const a = d + side * 32, ar = a * Math.PI / 180; const gx = x + 6.5 * sc * Math.cos(ar), gy = y + 6.5 * sc * Math.sin(ar);
      s += `<path d="${GR}" fill="url(#wycg)" stroke="#A47729" stroke-width=".5" transform="translate(${gx.toFixed(1)} ${gy.toFixed(1)}) rotate(${(a + 90).toFixed(0)}) scale(${sc.toFixed(2)})"/>`; }
  }
  const [x, y] = P[P.length - 1], [x2, y2] = P[P.length - 4]; const d = Math.atan2(y - y2, x - x2) * 180 / Math.PI;
  s += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(d + 90).toFixed(0)})"><path d="${GR}" fill="url(#wycg)" stroke="#A47729" stroke-width=".5" transform="scale(.85)"/><line x1="0" y1="-6" x2="-3.5" y2="-17" stroke="#C9963C" stroke-width=".7"/><line x1="0" y1="-6" x2="0" y2="-17" stroke="#C9963C" stroke-width=".7"/><line x1="0" y1="-6" x2="3.5" y2="-17" stroke="#C9963C" stroke-width=".7"/></g>`;
  return `<svg width="40" height="${H}" viewBox="0 0 40 ${H}" style="overflow:visible"><defs><linearGradient id="wycg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF1C2"/><stop offset=".5" stop-color="#E7BF66"/><stop offset="1" stop-color="#B98A34"/></linearGradient></defs>${s}</svg>`;
}
let styled = false;
function css() {
  if (styled) return; styled = true;
  const st = document.createElement('style');
  st.textContent = `
.wyc{background:transparent!important;border:0!important;box-shadow:none!important;padding:52px 30px 14px!important;overflow:visible!important;max-height:none!important;width:min(92vw,380px)!important;font:15px/1.6 "PingFang TC","Noto Sans TC",system-ui,sans-serif!important;color:#5A3D14!important}
.wyc-out{position:relative;padding:8px;border-radius:40px;background:#FFFDF7;box-shadow:0 8px 22px rgba(20,12,0,.45)}
.wyc-gold{padding:6px;border-radius:33px;background:${GOLD}}
.wyc-in{border-radius:28px;background:linear-gradient(#FFFBF2,#F6E7C9);padding:46px 16px 16px;box-shadow:inset 0 3px 0 rgba(255,255,255,.8);}
.wyc-crest{position:absolute;left:50%;top:-42px;transform:translateX(-50%);width:84px;height:84px;border-radius:50%;background:#FFFDF7;box-shadow:0 4px 10px rgba(42,26,5,.35);display:flex;align-items:center;justify-content:center;z-index:3}
.wyc-crest>div{width:74px;height:74px;border-radius:50%;background:${GOLD};display:flex;align-items:center;justify-content:center}
.wyc-crest>div>div{width:60px;height:60px;border-radius:50%;background:radial-gradient(circle at 38% 30%,#FFF8E6,#E8CF98);display:flex;align-items:center;justify-content:center}
.wyc-crest img{width:46px;height:46px;object-fit:contain;filter:brightness(.72) saturate(1.2)}
.wyc-glow{position:absolute;right:-48px;top:-52px;width:136px;height:136px;border-radius:50%;background:radial-gradient(circle,rgba(255,220,120,.85) 0%,rgba(255,205,95,.4) 38%,rgba(255,200,90,0) 70%);z-index:4;pointer-events:none}
.wyc-sun{position:absolute;right:-16px;top:-20px;z-index:5;filter:drop-shadow(0 2px 2px rgba(106,58,0,.35));pointer-events:none}
.wyc-wl,.wyc-wr{position:absolute;bottom:-4px;z-index:4;pointer-events:none}.wyc-wl{left:-30px}.wyc-wr{right:-30px;transform:scaleX(-1)}
.wyc h3{margin:0!important;text-align:center;font-size:22px!important;line-height:1.35;font-weight:900;letter-spacing:1px;color:#6B3E12!important}
.wyc-sub{text-align:center;font-size:13px;color:#8A6424;margin-top:4px}
.wyc-dots{display:flex;justify-content:center;gap:6px;margin:12px 0 4px}.wyc-dots span{width:8px;height:8px;border-radius:50%;background:#E0B45A}
.wyc-row{white-space:nowrap;display:flex;gap:7px;align-items:flex-start;margin:var(--wyc-gap,9px) 0;font-weight:700;font-size:var(--wyc-fs,14.5px);line-height:1.45}.wyc-row svg{margin-top:2px}.wyc-row b{color:#6B3E12}
.wyc button.wyc-go{display:block;margin:16px auto 0!important;width:186px!important;padding:11px 0!important;border-radius:30px!important;border:0!important;font-size:18px!important;font-weight:900!important;color:#5A3D14!important;background:${GOLD}!important;box-shadow:inset 0 0 0 3px #FFF3C8,0 4px 0 #A97C2E,0 6px 8px rgba(42,26,5,.3)!important;cursor:pointer}
.wyc .wyc-keep{margin-top:8px}`;
  document.head.append(st);
}
// el：原本的介紹卡；opt.points：要換的重點（城堡用新三點）；其他島保留原本內容只換外觀
export function restyle(el, opt = {}) {
  if (!el || el.dataset.wyc) return; el.dataset.wyc = '1'; css();
  const h3 = el.querySelector('h3'); const title = h3 ? h3.textContent.replace(/！$/, '') : '歡迎光臨';
  const btn = el.querySelector('button');
  // 陳老闆 11-21：每座島同一格式——一行一個互動名稱，不寫說明、不寫「點擊」
  const SHORT = {"迎賓沙發": "有點法律背景", "迎賓茶點區": "咖啡有點法律味", "半圓形玻璃電梯": "選一二三樓", "二樓影印機": "綠色乖乖對話", "二樓員工": "員工專屬對話", "三樓豪華大門": "老闆今天在嗎", "趣味接待櫃檯": "日常趣味對話", "一狀在手法度我有": "書狀與期限", "有法度也要有額度": "裁判費試算", "一槌定案看你法度": "抽一個案件", "一路連連有法度": "審級怎麼走", "談得攏最有法度": "調解與和解", "美國法庭有法度": "陪審與國民法官", "醫療糾紛協商": "調解與和解", "病歷證據探索": "病歷核對整理", "病歷證據有法度": "病歷與證據", "第一時間有法度": "事發當下的應對", "醫療調解有法度": "醫療爭議調解", "X光醫療鑑定": "鑑定與證明", "心電圖事件回放": "事件情境問答", "薪水掌門人": "人物專屬互動", "婚姻家事": "離婚法律問題", "親權扶養": "親權與扶養費", "遺囑繼承": "遺囑與遺產分配", "家事保護": "家暴與保護令", "家庭會議": "家事法律諮詢", "哈姆太郎": "人物專屬互動", "公司治理": "董事會與股東", "國際商務": "跨國交易與OEM", "商業爭議": "履約與付款爭議", "勞資管理": "聘僱與勞動權益", "智慧財產": "商標著作營業秘密", "企業法遵": "個資內控與危機", "VIP 會客室": "貴賓難題第一步"};/* 陳老闆 11-21：說明縮短成一行，意思不變 */
  const esc = t => t.replace(/[&<>]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch]));
  const rows = opt.points ? opt.points.map(([a, b]) => ({ html: '<b>' + esc(a) + '</b>：' + esc(b) })) : [...el.querySelectorAll('p')].map(p => { const all = p.textContent.replace(/點擊/g, '').trim(); const m = all.match(/^([^：:]+)[：:]\s*(.*)$/); if (!m) return { html: esc(all.replace(/。$/, '')) }; const nm = m[1].trim(); return { html: '<b>' + esc(nm) + '</b>：' + esc(SHORT[nm] || m[2].replace(/。$/, '').trim()) }; }).filter(r => r.html);
  const keep = [...el.children].filter(n => n !== h3 && n !== btn && n.tagName !== 'P' && !(n.tagName === 'DIV' && /WEI &amp; YANG|德威陽國際法律事務所/.test(n.innerHTML)));
  el.classList.add('wyc'); el.innerHTML = '';
  const out = document.createElement('div'); out.className = 'wyc-out';
  out.innerHTML = `<div class="wyc-gold"><div class="wyc-in"><h3></h3><div class="wyc-sub">${SUB}</div><div class="wyc-dots">${'<span></span>'.repeat(5)}</div><div class="wyc-rows"></div><div class="wyc-keep"></div></div></div>
<div class="wyc-crest"><div><div><img src="office-logo-transparent.png" alt="德威陽 Logo"></div></div></div>${bigSun}<div class="wyc-wl">${wheat(220)}</div><div class="wyc-wr">${wheat(220)}</div>`;
  out.querySelector('h3').textContent = title;
  const R = out.querySelector('.wyc-rows');
  rows.forEach(r => { const d = document.createElement('div'); d.className = 'wyc-row'; d.innerHTML = sunIcon(20) + '<span></span>'; d.querySelector('span').innerHTML = r.html; R.append(d); });
  const K = out.querySelector('.wyc-keep'); keep.forEach(n => K.append(n));
  if (btn) { btn.classList.add('wyc-go'); out.querySelector('.wyc-in').append(btn); }
  el.append(out);
  // 舊樣式用 #id!important 寫死顏色，這裡用行內 !important 蓋過去
  const imp = (n, o) => { if (n) for (const k in o) n.style.setProperty(k, o[k], 'important'); };
  imp(el, { background: 'transparent', border: '0', 'box-shadow': 'none', padding: '52px 30px 14px', overflow: 'visible', 'max-height': 'none', width: 'min(92vw,380px)', color: '#5A3D14' });
  imp(out.querySelector('h3'), { color: '#6B3E12', 'border-bottom': '0', 'padding-bottom': '0', 'font-size': '19.5px', 'line-height': '1.35', margin: '0', 'text-align': 'center', 'font-weight': '900', 'white-space': 'nowrap', 'letter-spacing': '.5px' });
  out.querySelectorAll('.wyc-row, .wyc-row span, .wyc-keep, .wyc-keep *').forEach(n => imp(n, { color: '#5A3D14' }));
  out.querySelectorAll('.wyc-row b, .wyc-row strong').forEach(n => imp(n, { color: '#8A4A12', background: 'transparent' }));
  // 一頁看完：重點多的島，字和行距自動縮小（內容不刪）
  // 每座島卡片一樣大：重點區固定高度（最多 7 行），字級一樣
  el.style.setProperty('--wyc-fs', '14px'); el.style.setProperty('--wyc-gap', '6px'); R.style.minHeight = (8 * 27) + 'px';
  imp(el, { top: '50%', 'max-height': 'none' });
  if (btn) imp(btn, { display: 'block', margin: '16px auto 0', width: '186px', padding: '11px 0', 'border-radius': '30px', border: '0', 'font-size': '18px', 'font-weight': '900', color: '#5A3D14', background: GOLD, 'box-shadow': 'inset 0 0 0 3px #FFF3C8,0 4px 0 #A97C2E,0 6px 8px rgba(42,26,5,.3)', float: 'none', position: 'static' });
}
export const CASTLE = CASTLE_POINTS;
