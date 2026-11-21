// 3F 林律師辦公室：螢幕「2026 優秀公益律師」影片視窗＋律師袍「法庭時裝秀」
// 用法：import {openVideo,openGowns} from './wy-3f-media.js';
const LINE = 'LINE @wylaw ｜ weiandyang.com';
const LOGO = './office-logo-transparent.png', LIN = './full-wyF.png', VIDEO = './lin-lawyer.mp4';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const CARDS = [['優秀公益律師', '2026 台北律師公會'], ['台灣＋紐約州律師', '美國法律、管理會計雙碩士'], ['前上市公司法務長', '企業與跨國商務經驗'], ['政府機關法律顧問', '警政署、健保署、北市、新北市']];
// [身分, 鑲邊, 顏色, 說明]
const GOWNS = [['法官', '藍邊', '#2f74c0', '象徵青天'], ['檢察官', '紫邊', '#8a3f9c', '正式是紫紅色'], ['律師', '白邊', '#ffffff', '林律師穿這件'], ['公設辯護人', '綠邊', '#2e9a63', '為被告辯護'], ['書記官', '黑邊', '#3a3f45', '負責法庭紀錄'], ['公證人', '紅邊', '#d2443f', '主持公證結婚']];
const HELP_V = ['審閱跨國買賣契約，標出付款與交貨風險。台美雙律師，熟悉兩地交易習慣。', '擬定股東協議與公司規章。前上市公司法務長，懂經營的實際需要。', '評估勞資爭議，排出協商與訴訟的順序。勞資兩端都熟悉，判斷更全面。', '盤點離婚與親權爭點，規劃孩子的照顧安排。重視溝通，也重視證據。', '規劃跨國合作的契約架構。法律與管理會計雙碩士，兼顧法律與商業。', '評估醫療爭議的處理方向。熟悉醫療糾紛的程序與實務。', '判讀法院與機關文書，盤點期限與對策。多個政府機關法律顧問經驗。', '規劃企業常年法律顧問，定期檢視合約。把風險處理在發生之前。', '擬定保密與競業條款，守住公司的關鍵資訊。企業實務經驗，條款寫得到位。', '比對不動產交易文件，盤點產權與付款風險。簽約前多看一步，交易更安心。'];
const HELP_G = ['規劃整體訴訟策略。每次出庭前的準備，都親自掌握。', '整理證據與爭點，擬定書狀架構。把複雜事實寫成清楚主張。', '規劃交互詰問重點。法庭上的每個問題，都先推演過。', '評估和解與調解時機。打官司，不一定只有判決一條路。', '檢視判決理由，評估上訴可行性。判決之後，仍有檢視空間。', '規劃偵查階段應對，陪同到場應訊。第一次應訊，更能從容。', '盤點求償依據，擬定求償範圍。金額有依據，主張才站得住。', '規劃訴願與行政訴訟程序。熟悉公部門程序，檢視更到位。', '分析收到的起訴狀，擬定答辯方向。先看懂對方要什麼，再決定怎麼回應。', '評估證人與證物的份量，安排舉證順序。證據放對位置，說服力更完整。'];
let lastV = -1, lastG = -1;
const pickH = (arr, last) => { let i; do { i = Math.floor(Math.random() * arr.length) } while (i === last && arr.length > 1); return i };
let box, ac;
function tone(f, t = 0, d = .12, v = .08) { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const o = ac.createOscillator(), g = ac.createGain(), n = ac.currentTime + t; o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0, n); g.gain.linearRampToValueAtTime(v, n + .015); g.gain.exponentialRampToValueAtTime(.0005, n + d); o.connect(g).connect(ac.destination); o.start(n); o.stop(n + d + .05) } catch (e) { } }
const fanfare = () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .1, .22, .07));
const ding = () => { tone(1568, 0, .16, .05); tone(2093, .05, .2, .035) };
const CSS = `
#wy3M{position:fixed;inset:0;z-index:132;display:none;align-items:center;justify-content:center;padding:10px;background:radial-gradient(circle at 50% 30%,#1f6b4fdd,#0b241bf0);font-family:system-ui,'Noto Sans TC',sans-serif;overflow:hidden;-webkit-user-select:none;user-select:none}
#wy3M .stars{position:absolute;inset:0;pointer-events:none;overflow:hidden}
#wy3M .stars i{position:absolute;top:-20px;width:10px;height:10px;background:#f3d48c;clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%);opacity:.75;animation:wyStar linear infinite}
@keyframes wyStar{to{transform:translateY(110vh) rotate(160deg)}}
#wy3M .cur{position:absolute;top:0;bottom:0;width:52%;background:repeating-linear-gradient(90deg,#1a7a55 0 22px,#156748 22px 44px);box-shadow:inset 0 -20px 40px #0004;z-index:3;transition:transform .9s cubic-bezier(.6,.05,.3,1);pointer-events:none}
#wy3M .cur.l{left:0;border-radius:0 0 46px 0}#wy3M .cur.r{right:0;border-radius:0 0 0 46px}
#wy3M.open .cur.l{transform:translateX(-102%)}#wy3M.open .cur.r{transform:translateX(102%)}
#wy3M .c{position:relative;z-index:2;width:min(97vw,440px);max-height:calc(96dvh - 60px);overflow:visible;background:#fff;border:3px solid #d9b25f;border-radius:22px;box-shadow:0 0 0 6px #f3d48c55,0 20px 60px #0009;box-sizing:border-box}
#wy3M .br{display:flex;align-items:center;gap:9px;padding:7px 10px;border-bottom:1px solid #ecd3a8}
#wy3M .br .lg{width:32px;height:32px;object-fit:contain;border:2px solid #d3aa67;border-radius:9px}
#wy3M .br div{flex:1;min-width:0;padding-right:84px}#wy3M .br b{display:block;font-size:15.5px;color:#1f3b2f}#wy3M .br small{font-size:10px;color:#a07d45}
#wy3M .peek{position:absolute;right:-6px;top:-74px;width:108px;height:108px;object-fit:contain;z-index:5;transform-origin:50% 95%;transform:translateY(60px) scale(.4);opacity:0;transition:all .6s cubic-bezier(.3,1.6,.5,1) .7s;filter:drop-shadow(0 4px 6px #0005)}
#wy3M.open .peek{transform:none;opacity:1;animation:wyWave 1s ease 1.4s 2}
#wy3M .c{margin-top:60px}
@keyframes wyWave{25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}
#wy3M .x{position:absolute;left:8px;top:-46px;box-shadow:0 2px 6px #0004;border:0;background:#e9f3ee;color:#1f5a43;font-size:20px;width:34px;height:34px;border-radius:10px;font-weight:700}
#wy3M .bd{padding:8px 10px 10px}
#wy3M .rib{position:relative;margin:2px 14px 8px;background:linear-gradient(#f8e3a6,#d9a84e);color:#3d2808;text-align:center;font:900 17.5px/1.25 'Noto Serif TC','Songti TC',serif;padding:7px 8px;border-radius:8px;box-shadow:0 3px 0 #a87b2c}
#wy3M .rib:before,#wy3M .rib:after{content:"";position:absolute;top:8px;width:18px;height:100%;background:#c99436;z-index:-1}
#wy3M .rib:before{left:-12px;clip-path:polygon(0 0,100% 0,100% 100%,0 100%,40% 50%)}#wy3M .rib:after{right:-12px;clip-path:polygon(0 0,100% 0,60% 50%,100% 100%,0 100%)}
#wy3M .row{display:flex;gap:8px;align-items:stretch}
#wy3M .vid{flex:0 0 53%;border-radius:16px;padding:4px;background:linear-gradient(145deg,#f8e3a6,#c9963c);box-shadow:0 0 16px #f3d48c88;transition:box-shadow .5s}
#wy3M .vid video{display:block;width:100%;aspect-ratio:9/16;object-fit:cover;border-radius:12px;background:#000}
#wy3M .cards{flex:1;display:grid;grid-template-rows:repeat(4,1fr);gap:7px;min-width:0}#wy3M .cd b,#wy3M .cd small{overflow:hidden;text-overflow:clip}
#wy3M .cd{background:#fff;border:2px solid #e2c27e;border-radius:13px;padding:5px 7px;display:flex;flex-direction:column;justify-content:center;opacity:0;transform:translateY(16px) scale(.9);transition:all .45s cubic-bezier(.3,1.5,.5,1);box-shadow:0 3px 0 #ecd6a4}
#wy3M .cd.on{opacity:1;transform:none}
#wy3M .cd b{white-space:nowrap;font:900 16px/1.28 'Noto Serif TC','Songti TC',serif;color:#1f5a43}
#wy3M .cd small{font-size:12.5px;color:#7a6440;margin-top:3px;line-height:1.35;font-weight:700}
#wy3M .wy{margin-top:9px;background:#FDE3C8;border:1px solid #E9B98A;border-left:6px solid #C6A25D;border-radius:12px;padding:10px 12px;color:#5A3216;font-weight:700;font-size:15.5px;line-height:1.5;transition:box-shadow .6s}
#wy3M .wy.glow{box-shadow:0 0 0 4px #f3d48c,0 0 22px #f3c64faa}
#wy3M .wy>b{display:block;font-size:19px;font-weight:900;margin-bottom:3px;color:#8A3D10}
#wy3M .wy:after{content:"${LINE}";display:block;margin-top:4px;padding-top:4px;border-top:1px dashed currentColor;font-size:15px;font-weight:800;color:#8A3D10}
#wy3M .btns{display:flex;gap:8px;margin-top:9px}
#wy3M .btns button{flex:1;padding:12px 6px;border-radius:12px;font-weight:900;font-size:17px;border:1.5px solid #c6a25d;touch-action:manipulation}
#wy3M .a{background:#1f6b4f;color:#fff3d6;box-shadow:0 3px 0 #c6a25d}#wy3M .b{background:#fff;color:#1f5a43}
/* 法庭時裝秀 */
#wy3M h3{margin:2px 0 2px;text-align:center;font:900 25px 'Noto Serif TC',serif;color:#1f5a43}
#wy3M .sub{text-align:center;font-size:15px;font-weight:700;color:#4c6a5e;margin:0 0 8px}
#wy3M .gg{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
#wy3M .gw{perspective:600px;border:0;background:none;padding:0;touch-action:manipulation}
#wy3M .gw .in{position:relative;height:132px;transition:transform .55s cubic-bezier(.3,1.3,.5,1);transform-style:preserve-3d}
#wy3M .gw.f .in{transform:rotateY(180deg)}
#wy3M .gw .fa,#wy3M .gw .ba{position:absolute;inset:0;border-radius:14px;backface-visibility:hidden;-webkit-backface-visibility:hidden;border:2px solid #e2c27e;display:flex;flex-direction:column;align-items:center;justify-content:center}
#wy3M .gw .fa{background:linear-gradient(#f4fbf7,#e3f3ea)}
#wy3M .gw .fa svg{width:76px;height:84px}
#wy3M .gw .fa span{font:900 15px system-ui;color:#2e8a62;margin-top:2px}
#wy3M .gw .ba{transform:rotateY(180deg);background:#fff;padding:6px;text-align:center}
#wy3M .gw .ba b{font:900 20px 'Noto Serif TC',serif;color:#1f3b2f}
#wy3M .gw .ba i{font-style:normal;font:900 14px system-ui;margin:2px 0 3px;padding:1px 8px;border-radius:999px;color:#fff}
#wy3M .gw .ba small{font-size:13px;font-weight:700;line-height:1.35;color:#4c5a54}
#wy3M .gw.me .ba{border-color:#d9a84e;box-shadow:0 0 0 3px #f3d48c}
#wy3M .say{display:flex;align-items:center;gap:8px;margin:8px 0 0;min-height:52px}
#wy3M .say img{width:74px;height:74px;object-fit:contain;flex:none}
#wy3M .say div{flex:1;background:#eef7f2;border:1.5px solid #9fd2b9;border-radius:14px;padding:8px 11px;font-size:16px;font-weight:700;color:#17402f;line-height:1.45}
#wy3M .say div.pop{animation:wyPopM .4s cubic-bezier(.3,1.5,.5,1)}
@keyframes wyPopM{0%{transform:scale(.85);opacity:0}100%{transform:none;opacity:1}}
#wy3M .fun{margin:7px 0 0;font-size:14px;font-weight:700;color:#6b5a3a;background:#fff8e6;border:1px dashed #e2c27e;border-radius:10px;padding:6px 9px;line-height:1.5}
`;
function ensure() {
  if (box) return; const st = document.createElement('style'); st.textContent = CSS; document.head.append(st);
  box = document.createElement('div'); box.id = 'wy3M'; document.body.append(box);
  box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const a = b.dataset.a;
    if (a === 'close') close(); else if (a === 'again') { const v = box.querySelector('video'); if (v) { v.currentTime = 0; v.play().catch(() => { }) } box.querySelector('.wy').classList.remove('glow') } else if (a === 'gown') flip(+b.dataset.i, b) });
}
function close() { const v = box.querySelector('video'); if (v) v.pause(); box.classList.remove('open'); box.style.display = 'none'; box.innerHTML = '' }
function frame(inner) {
  const stars = Array.from({ length: 14 }, (_, i) => `<i style="left:${(i * 7.3 + 3) % 100}%;animation-duration:${9 + (i * 37 % 7)}s;animation-delay:-${i * 1.3}s;transform:scale(${.6 + (i % 4) * .2})"></i>`).join('');
  box.innerHTML = `<div class="stars">${stars}</div><div class="cur l"></div><div class="cur r"></div><div class="c"><div class="br"><img class="lg" alt="德威陽國際法律事務所" src="${LOGO}"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div></div><img class="peek" alt="林律師" src="${LIN}"><button class="x" data-a="close" aria-label="關閉">×</button><div class="bd">${inner}</div></div>`;
  box.classList.remove('open'); box.style.display = 'flex'; box.offsetWidth; requestAnimationFrame(() => box.classList.add('open')); fanfare();
}
export function openVideo() {
  ensure();
  frame(`<div class="rib">2026 台北律師公會　優秀公益律師</div>
  <div class="row"><div class="vid"><video src="${VIDEO}" playsinline controls preload="auto"></video></div>
  <div class="cards">${CARDS.map(c => `<div class="cd"><b>${esc(c[0])}</b><small>${esc(c[1])}</small></div>`).join('')}</div></div>
  <div class="wy"><b>德威陽怎麼幫您？</b>${esc(HELP_V[lastV = pickH(HELP_V, lastV)])}</div>
  <div class="btns"><button class="a" data-a="again">再看一次</button><button class="b" data-a="close">回到辦公室</button></div>`);
  const v = box.querySelector('video');
  v.addEventListener('ended', () => box.querySelector('.wy').classList.add('glow'));
  setTimeout(() => v.play().catch(() => { }), 900);
  box.querySelectorAll('.cd').forEach((c, i) => setTimeout(() => { c.classList.add('on'); ding() }, 1100 + i * 380));
}
function gownSvg(color) { return `<svg viewBox="0 0 100 110" aria-hidden="true"><path d="M34 10 L18 18 L3 48 L20 57 L27 45 L24 101 Q50 108 76 101 L73 45 L80 57 L97 48 L82 18 L66 10 L59 18 L41 18Z" fill="#24282d" stroke="#101418" stroke-width="2" stroke-linejoin="round"/><path d="M34 10 L43 28 L50 35 L57 28 L66 10 M43 28 L45 100 M57 28 L55 100 M9 46 L22 52 M78 52 L91 46" fill="none" stroke="${color}" stroke-width="6" stroke-linejoin="round"/></svg>` }
let flipped = new Set();
export function openGowns() {
  ensure(); flipped = new Set();
  frame(`<h3>法庭時裝秀</h3><p class="sub">法袍都是黑色，看鑲邊就知道是誰。點點看！</p>
  <div class="gg">${GOWNS.map((g, i) => `<button class="gw${g[0] === '律師' ? ' me' : ''}" data-a="gown" data-i="${i}"><div class="in"><div class="fa">${gownSvg(g[2])}<span>${g[1]}</span></div><div class="ba"><b>${g[0]}</b><i style="background:${g[2] === '#ffffff' ? '#9aa5ad' : g[2]}">${g[1]}</i><small>${g[3]}</small></div></div></button>`).join('')}</div>
  <div class="say"><div><b style="display:block;font-size:13px;color:#2e8a62">林律師</b><span id="wy3Msay">六件法袍裡，有一件是我每次出庭都會穿的，猜猜看是哪一件？</span></div></div>
  <p class="fun">律師界流傳律師袍不能洗，怕把好運洗掉。這只是趣味習俗，林律師的律師袍會定期清潔。</p>
  <div class="wy"><b>德威陽怎麼幫您？</b>${esc(HELP_G[lastG = pickH(HELP_G, lastG)])}</div>
  <div class="btns"><button class="b" data-a="close">回到辦公室</button></div>`);
}
function flip(i, b) {
  if (b.classList.contains('f')) return; b.classList.add('f'); flipped.add(i); tone(988, 0, .12, .05); tone(1319, .06, .16, .04);
  const g = GOWNS[i], s = box.querySelector('#wy3Msay');
  const t = g[0] === '律師' ? '答對了！我穿的就是這件白邊律師袍。' : flipped.size === GOWNS.length ? '六件都認識了，下次去法院一眼就看得出來！' : `這件是${g[0]}的法袍，再找找我的那件？`;
  s.textContent = t; s.classList.remove('pop'); void s.offsetWidth; s.classList.add('pop');
}
