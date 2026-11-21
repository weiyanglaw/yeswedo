// 3F 窗邊「律師今天又去哪了？」＋咖啡機「老闆今天第幾杯？」
// 窗邊：望遠鏡追林律師，追得上就一直追、跟丟三次結束；白天到半夜越來越快、分身變多、直飛紐約飛機可補回一次、彩蛋；紀錄最遠追到幾點
// 咖啡機：咖啡機跟得上林律師嗎？按住倒到金線；溢出或來不及會讓咖啡機過熱，過熱就罷工（林律師精神很好，累的是咖啡機）；紀錄咖啡機撐到幾點；每日咖啡籤
// 用法：import {openWindow, openCoffee} from './wy-3f-busy.js';
const LINE = 'LINE @wylaw ｜ weiandyang.com';
const LOGO = './office-logo-transparent.png', LIN = './full-wyF.png';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pickI = (n, last) => { let i; do { i = Math.floor(Math.random() * n) } while (i === last && n > 1); return i };
const dayKey = () => { const d = new Date(); return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate() };
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 } }
function shuffle(a, r) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1));[a[i], a[j]] = [a[j], a[i]] } return a }

let ac = null;
function au() { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); return ac } catch (e) { return null } }
function note(f, t = 0, d = .12, v = .05, type = 'triangle') { const a = au(); if (!a) return; const o = a.createOscillator(), g = a.createGain(), n = a.currentTime + t; o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0, n); g.gain.linearRampToValueAtTime(v, n + .01); g.gain.exponentialRampToValueAtTime(.0005, n + d); o.connect(g).connect(a.destination); o.start(n); o.stop(n + d + .05) }
const chime = () => [784, 988, 1319].forEach((f, i) => note(f, i * .06, .15, .055));

// ---------- 共用宣傳 ----------
const HELP = [
  '陪同警詢與偵查程序，現場確認每一句筆錄。林柏均律師處理刑事案件，重視每個程序細節。',
  '審閱英文合約與跨國交易文件，逐條標出風險。林柏均律師具台灣與美國紐約州律師資格。',
  '配合美國時差安排視訊會議，即時回覆跨國客戶。台美雙律師，兩地程序都熟悉。',
  '以中英日三語溝通跨國案件，減少翻譯落差。林柏均律師具美國法律事務所工作經歷。',
  '出席民事、家事各類開庭，完整陳述每項主張。林柏均律師獲選 2026 台北律師公會優秀公益律師。',
  '審閱公司契約與治理文件，從經營角度評估風險。林柏均律師曾任上市公司法務長。',
  '規劃企業勞資、股東與合約制度。前上市公司法務長的實務經驗，貼近公司需求。',
  '擔任政府機關與工會法律顧問，處理多元法律問題。林柏均律師具豐富顧問經驗。'
];
let lastH = -1;

const CSS = `
#wy3B{position:fixed;inset:0;z-index:133;display:none;align-items:center;justify-content:center;padding:10px;background:radial-gradient(circle at 50% 30%,#1f6b4fdd,#0b241bf0);font-family:system-ui,'Noto Sans TC',sans-serif;-webkit-user-select:none;user-select:none;touch-action:none}
#wy3B .c{position:relative;width:min(97vw,440px);margin-top:56px;background:#fff;border:3px solid #d9b25f;border-radius:22px;box-shadow:0 0 0 6px #f3d48c55,0 20px 60px #0009;box-sizing:border-box;max-height:calc(100vh - 70px);overflow:auto}
#wy3B .br{display:flex;align-items:center;gap:9px;padding:7px 10px;border-bottom:1px solid #ecd3a8}
#wy3B .br img{width:32px;height:32px;object-fit:contain;border:2px solid #d3aa67;border-radius:9px}
#wy3B .br div{flex:1;min-width:0;padding-right:84px}#wy3B .br b{display:block;font-size:15.5px;color:#1f3b2f}#wy3B .br small{font-size:10px;color:#a07d45}
#wy3B .peek{position:fixed;width:108px;height:108px;object-fit:contain;z-index:5;transform-origin:50% 95%;filter:drop-shadow(0 4px 6px #0005);transition:transform .3s;pointer-events:none}
#wy3B .peek.nod{animation:bNod .45s ease}#wy3B .peek.shake{animation:bShake .4s ease}#wy3B .peek.yay{animation:bYay .8s ease 2}
@keyframes bNod{40%{transform:translateY(-12px)}}@keyframes bShake{25%{transform:rotate(-10deg)}75%{transform:rotate(10deg)}}@keyframes bYay{30%{transform:translateY(-20px) rotate(-8deg)}60%{transform:translateY(0) rotate(8deg)}}
#wy3B .x{position:fixed;border:0;background:#e9f3ee;color:#1f5a43;font-size:20px;width:34px;height:34px;border-radius:10px;font-weight:700;box-shadow:0 2px 6px #0004;z-index:6}
#wy3B .bd{padding:8px 11px 11px}
#wy3B h3{margin:2px 0 6px;text-align:center;font:900 24px 'Noto Serif TC','Songti TC',serif;color:#1f5a43}
#wy3B .say{background:#eef7f2;border:2px solid #9fd2b9;border-radius:14px;padding:7px 11px;font-size:16px;font-weight:700;color:#17402f;line-height:1.45;margin:8px 0 0;min-height:46px;box-sizing:border-box}
#wy3B .say b{display:block;font-size:12.5px;color:#2e8a62}
#wy3B .say.pop{animation:bPop .35s cubic-bezier(.3,1.5,.5,1)}@keyframes bPop{0%{transform:scale(.9);opacity:.3}100%{transform:none;opacity:1}}
#wy3B .wy{margin-top:9px;background:#FDE3C8;border:2px solid #E9B98A;border-left:6px solid #C6A25D;border-radius:12px;padding:10px 12px;color:#5A3216;font-weight:700;font-size:15.5px;line-height:1.5}
#wy3B .wy>b{display:block;font-size:19px;font-weight:900;margin-bottom:3px;color:#8A3D10}
#wy3B .wy:after{content:"${LINE}";display:block;margin-top:4px;padding-top:4px;border-top:1px dashed currentColor;font-size:15px;font-weight:800;color:#8A3D10}
#wy3B .big{width:100%;padding:13px;border-radius:14px;border:2px solid #c6a25d;background:#1f6b4f;color:#fff3d6;font-size:20px;font-weight:900;box-shadow:0 4px 0 #c6a25d;margin-top:8px}
#wy3B .row3{display:flex;gap:8px;margin-top:8px}#wy3B .row3 button{flex:1;padding:11px 6px;border-radius:12px;font-weight:900;font-size:15.5px;border:1.5px solid #c6a25d;background:#fff;color:#1f5a43}
#wy3B .end{text-align:center;background:linear-gradient(#fff8e1,#fff);border:2px solid #f0c95a;border-radius:14px;padding:8px 10px}
#wy3B .end b{display:block;font:900 26px 'Noto Serif TC',serif;color:#b0782a;margin-bottom:2px}
#wy3B .end p{margin:0;font-size:15.5px;line-height:1.55;color:#3a3a2c;font-weight:700}
#wy3B .start{text-align:center;padding:6px 4px}#wy3B .start p{font-size:16.5px;font-weight:700;color:#2c4a3e;line-height:1.6;margin:6px 0}
#wy3B .plate{position:absolute;left:50%;top:10px;transform:translateX(-50%);height:32px;padding:0 14px;white-space:nowrap;border-radius:9px;background:linear-gradient(#fff3c8,#e0b64e 55%,#c9963c);border:2px solid #8a5a14;box-shadow:0 3px 0 #0003,inset 0 1px 0 #fff;z-index:20;display:flex;align-items:center;font:900 18px 'Noto Serif TC',serif;color:#1f3b2f;pointer-events:none;overflow:hidden}
#wy3B .plate span.in{animation:plIn .35s cubic-bezier(.3,1.4,.5,1)}@keyframes plIn{0%{transform:rotateX(90deg);opacity:0}100%{transform:none;opacity:1}}
#wy3B .tbar{position:absolute;left:12px;right:12px;bottom:8px;height:8px;border-radius:5px;background:#fff5;overflow:hidden;z-index:20}#wy3B .tbar u{display:block;height:100%;background:linear-gradient(90deg,#f3c64f,#e8913a);width:100%}

/* 窗邊 */
#wy3B .city{position:relative;height:400px;border-radius:16px;overflow:hidden;border:3px solid #c9963c;touch-action:none;cursor:none;transition:background 1.2s}
#wy3B .bld{position:absolute;bottom:0;border-radius:6px 6px 0 0;background:#3b4a63;box-shadow:inset 0 0 0 2px #0002}
#wy3B .bld .wn{position:absolute;width:9px;height:11px;border-radius:2px;background:#cfd8e6;opacity:.25}
#wy3B .bld .wn.on{background:#fff6d0;opacity:.9}
#wy3B .bld em{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);font:900 12px 'Noto Serif TC',serif;color:#fff3d6;font-style:normal;white-space:nowrap;background:#0006;padding:1px 5px;border-radius:5px}
#wy3B .lin{position:absolute;width:52px;height:52px;margin:-26px 0 0 -26px;z-index:3;transition:transform .2s}
#wy3B .lin img{width:100%;height:100%;object-fit:contain}
#wy3B .lin i{position:absolute;right:2px;bottom:6px;width:16px;height:11px;border-radius:3px;background:linear-gradient(#ffe9a6,#d9a84e);border:1.5px solid #8a5a14}
#wy3B .lin.fake img{filter:grayscale(.3) brightness(.95)}
#wy3B .lin.bye{transform:scale(0) rotate(30deg)}
#wy3B .glow{position:absolute;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:7px;background:radial-gradient(#ffe48a,#f3c64f00 70%);z-index:12;pointer-events:none;animation:gl 1.6s ease-in-out infinite}
@keyframes gl{50%{opacity:.35}}
#wy3B .dark{position:absolute;inset:0;z-index:10;pointer-events:none}
#wy3B .scope{position:absolute;width:150px;height:150px;margin:-75px 0 0 -75px;border-radius:50%;border:5px solid #e0b64e;box-shadow:0 0 0 3px #8a5a14,0 0 22px #f3c64f88;z-index:11;pointer-events:none}
#wy3B .scope:before,#wy3B .scope:after{content:"";position:absolute;background:#e0b64e88}#wy3B .scope:before{left:50%;top:8px;bottom:8px;width:2px}#wy3B .scope:after{top:50%;left:8px;right:8px;height:2px}
#wy3B .tag{position:absolute;z-index:15;transform:translate(-50%,-100%);padding:4px 10px;border-radius:9px;background:linear-gradient(#fff3c8,#e0b64e);border:2px solid #8a5a14;font:900 16px 'Noto Serif TC',serif;color:#1f3b2f;white-space:nowrap;pointer-events:none;animation:tg 1.3s ease forwards}
#wy3B .tag small{display:block;font:800 11px system-ui;color:#6a4a10;text-align:center}
@keyframes tg{0%{opacity:0;transform:translate(-50%,-60%) scale(.6)}15%{opacity:1;transform:translate(-50%,-100%) scale(1.08)}25%{transform:translate(-50%,-100%) scale(1)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-140%)}}
#wy3B .fin{position:absolute;inset:0;z-index:30;background:#070d1cf2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;animation:bPop .5s ease}
#wy3B .fin .office{position:relative;width:150px;height:120px;border-radius:10px;background:radial-gradient(circle at 50% 60%,#fff3c8,#f3c64f);border:5px solid #c9963c;box-shadow:0 0 50px #f3c64faa}
#wy3B .fin .office img{position:absolute;left:50%;bottom:4px;width:84px;height:84px;margin-left:-42px;object-fit:contain}
#wy3B .fin .office i{position:absolute;bottom:8px;width:13px;height:16px;border-radius:2px 2px 5px 5px;background:#fff;border:2px solid #8a5a14}
#wy3B .fin .clk{display:flex;gap:8px}#wy3B .fin .clk div{background:#13203a;border:2px solid #e0b64e;border-radius:10px;padding:4px 9px;text-align:center;color:#fff3d6;font:900 18px system-ui}#wy3B .fin .clk small{display:block;font:800 12px system-ui;color:#e0b64e}
#wy3B .fin p{margin:0;color:#fff3d6;font:900 17px 'Noto Serif TC',serif;text-align:center;line-height:1.5}
#wy3B .plan{margin-top:7px;display:grid;grid-template-columns:1fr 1fr;gap:5px}
#wy3B .plan div{border-radius:10px;padding:5px 8px;background:#1f3b57;color:#fff3d6;text-align:left}
#wy3B .plan div.no{filter:grayscale(1) opacity(.45)}
#wy3B .plan b{display:block;font:900 15px 'Noto Serif TC',serif}#wy3B .plan small{font:800 11.5px system-ui;color:#e0b64e}

/* 咖啡機 */
#wy3B .bar{position:relative;height:400px;border-radius:16px;overflow:hidden;border:3px solid #c9963c;background:linear-gradient(#f6ecd4 0 70%,#c49a6c 70% 100%);touch-action:none;cursor:pointer}
#wy3B .mach{position:absolute;left:50%;top:50px;width:124px;height:96px;margin-left:-40px;border-radius:16px 16px 8px 8px;background:linear-gradient(#5b5f66,#2d3036);border:4px solid #e0b64e;box-shadow:0 6px 0 #0003;z-index:3}
#wy3B .mach b{position:absolute;left:0;right:0;top:12px;text-align:center;font:900 15px 'Noto Serif TC',serif;color:#e0b64e;letter-spacing:2px}
#wy3B .mach i{position:absolute;left:50%;bottom:-16px;width:26px;height:18px;margin-left:-13px;background:#2d3036;border:3px solid #e0b64e;border-top:0;border-radius:0 0 6px 6px}
#wy3B .stream{position:absolute;left:50%;top:162px;width:8px;margin-left:18px;background:linear-gradient(#6b3d1f,#4a2810);border-radius:4px;z-index:2;height:0;transition:height .08s}
#wy3B .cup{position:absolute;left:50%;bottom:40px;transform:translateX(calc(-50% + 16px));border:4px solid #fff;border-top:0;border-radius:0 0 18px 18px;background:#ffffff55;overflow:visible;z-index:4;box-shadow:0 6px 0 #0002;transition:width .3s,height .3s}
#wy3B .cup .liq{position:absolute;left:0;right:0;bottom:0;height:0;border-radius:0 0 14px 14px;background:linear-gradient(#a0643a,#5a3216)}
#wy3B .cup .gl{position:absolute;left:-12px;right:-12px;height:4px;background:#f3c64f;box-shadow:0 0 8px #f3c64f;border-radius:2px}
#wy3B .cup .gl:after{content:"金線";position:absolute;right:-34px;top:-9px;font:900 12px system-ui;color:#b0782a}
#wy3B .cup .slv{position:absolute;left:-8px;right:-8px;top:28%;padding:3px 2px;line-height:1.2;background:linear-gradient(#1f6b4f,#17533b);border:2px solid #e0b64e;color:#fff3d6;font:900 14px 'Noto Serif TC',serif;text-align:center;z-index:2;border-radius:4px}
#wy3B .cup .hd{position:absolute;right:-26px;top:22%;width:20px;height:34%;border:4px solid #fff;border-left:0;border-radius:0 14px 14px 0}
#wy3B .cup.spill .liq{animation:sp .6s ease}@keyframes sp{50%{transform:translateY(-4px)}}
#wy3B .drip{position:absolute;z-index:5;width:10px;height:14px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#6b3d1f;animation:dr .7s ease-in forwards}
@keyframes dr{to{transform:translate(var(--dx),70px);opacity:0}}
#wy3B .order{position:absolute;left:8px;top:52px;width:112px;padding:6px 6px;border-radius:6px;background:#fff;border:2px dashed #c9963c;box-shadow:0 3px 0 #0002;z-index:6;text-align:center;transform:rotate(-4deg)}
#wy3B .order b{display:block;font:900 20px system-ui;color:#c43a5c}#wy3B .order span{display:block;font:900 14px/1.35 'Noto Serif TC',serif;color:#1f3b2f}#wy3B .order small{display:block;margin-top:2px;font:800 12px system-ui;color:#8a5a14}
#wy3B .order.pop{animation:oIn .4s cubic-bezier(.3,1.5,.5,1)}@keyframes oIn{0%{transform:rotate(-4deg) translateY(-60px);opacity:0}100%{transform:rotate(-4deg)}}
#wy3B .bub{position:absolute;right:10px;top:52px;max-width:118px;padding:6px 9px;border-radius:12px;background:#fff;border:2px solid #9fd2b9;font:900 14px/1.4 system-ui;color:#17402f;z-index:6;animation:bPop .35s cubic-bezier(.3,1.5,.5,1)}
#wy3B .bub small{display:block;font:800 11px system-ui;color:#2e8a62}
#wy3B .judge{position:absolute;left:24%;top:300px;transform:translateX(-50%);z-index:8;font:900 30px 'Noto Serif TC',serif;color:#d2443f;text-shadow:0 2px 0 #fff,0 0 10px #fff;pointer-events:none;white-space:nowrap;animation:jd .8s ease forwards}
@keyframes jd{0%{opacity:0;transform:translateX(-50%) scale(.5)}20%{opacity:1;transform:translateX(-50%) scale(1.15)}80%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(-20px)}}
#wy3B .hint{position:absolute;left:0;right:0;bottom:22px;text-align:center;font:900 16px system-ui;color:#fff3d6;z-index:6;pointer-events:none;text-shadow:0 1px 2px #0006}
#wy3B .lot{margin-top:7px;background:linear-gradient(#fff6dc,#f6dc9a);border:3px solid #d9a84e;border-radius:14px;padding:9px 12px;box-shadow:0 0 18px #f3d48c88}
#wy3B .lot>b{display:block;text-align:center;font:900 17px 'Noto Serif TC',serif;color:#8a5a14;margin-bottom:5px}
#wy3B .lot p{margin:3px 0;font:800 16px/1.5 system-ui;color:#3a2a10}#wy3B .lot p small{color:#2e8a62;font-weight:900;margin-right:4px}
#wy3B .lot .ft{margin-top:6px;padding-top:5px;border-top:1px dashed #b0782a;text-align:center;font:900 13px system-ui;color:#1f5a43}
#wy3B .lives{position:absolute;right:12px;top:48px;z-index:20;display:flex;gap:4px;pointer-events:none}
#wy3B .lives i{width:20px;height:14px;border-radius:3px;background:linear-gradient(#ffe9a6,#d9a84e);border:2px solid #8a5a14;transition:filter .3s,opacity .3s}#wy3B .lives i.off{filter:grayscale(1);opacity:.35}
#wy3B .plane{position:absolute;top:56px;left:-120px;z-index:16;padding:6px 12px 6px 10px;border-radius:20px 40px 40px 20px;background:linear-gradient(#ffffff,#dfe8f2);border:2px solid #e0b64e;box-shadow:0 0 14px #f3c64f;animation:pl 3s linear forwards;cursor:pointer}
#wy3B .plane b{font:900 14px 'Noto Serif TC',serif;color:#1f3b57;white-space:nowrap}
@keyframes pl{to{left:110%}}
#wy3B .tag.egg{background:linear-gradient(#ffe0ea,#f39ab5);border-color:#c43a5c}
#wy3B .rec{display:inline-block;margin-top:5px;padding:3px 12px;border-radius:999px;background:#e0503f;color:#fff;font:900 15px system-ui;animation:bPop .5s cubic-bezier(.3,1.6,.5,1)}
#wy3B .heat{position:absolute;left:12px;right:12px;bottom:12px;height:10px;border-radius:6px;background:#0006;border:1.5px solid #e0b64e;overflow:hidden}#wy3B .heat u{display:block;height:100%;width:0;background:#f3c64f;transition:background .3s}
#wy3B .heat:before{content:"過熱";position:absolute;left:-1px;top:-17px;font:900 11px system-ui;color:#e0b64e}
#wy3B .mach.hot{animation:hot .18s linear infinite}@keyframes hot{25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}
#wy3B .mach.dead{animation:none;filter:grayscale(.6) brightness(.7)}#wy3B .mach.dead:after{content:"";position:absolute;left:30%;top:-40px;width:50px;height:50px;border-radius:50%;background:#ddd9;filter:blur(6px);animation:smk 1s ease-out infinite}
@keyframes smk{from{transform:translateY(10px) scale(.6);opacity:.9}to{transform:translateY(-30px) scale(1.4);opacity:0}}
#wy3B .order .pt{margin-top:4px;height:6px;border-radius:3px;background:#eee;overflow:hidden}#wy3B .order .pt u{display:block;height:100%;width:100%;background:#2e8a62}
#wy3B .order.sp{border-color:#c43a5c;background:#fff4f0}
#wy3B .cup.gold{border-color:#f3c64f;box-shadow:0 0 18px #f3c64f}
`;
let box = null, raf = 0, timers = [];
function ensure() {
  if (box) return; const st = document.createElement('style'); st.textContent = CSS; document.head.append(st);
  box = document.createElement('div'); box.id = 'wy3B'; document.body.append(box);
  box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const a = b.dataset.a;
    if (a === 'close') close(); else if (a === 'win') openWindow(); else if (a === 'cof') openCoffee(); else if (a === 'go-win') playWindow(); else if (a === 'go-cof') playCoffee(); else if (a === 'share') share() });
  addEventListener('resize', place);
}
function stopAll() { cancelAnimationFrame(raf); timers.forEach(clearTimeout); timers = [] }
function close() { stopAll(); box.style.display = 'none'; box.innerHTML = '' }
const T = (f, ms) => timers.push(setTimeout(f, ms));
function shell(title, inner) {
  box.innerHTML = `<div class="c"><div class="br"><img alt="德威陽國際法律事務所" src="${LOGO}"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div></div><div class="bd"><h3>${title}</h3>${inner}</div></div><img class="peek" id="bLin" alt="林律師" src="${LIN}"><button class="x" data-a="close" aria-label="關閉">×</button>`;
  box.style.display = 'flex'; place();
}
function place() { if (!box || box.style.display === 'none') return; const c = box.querySelector('.c'); if (!c) return; const r = c.getBoundingClientRect(); const p = box.querySelector('#bLin'), x = box.querySelector('.x'); if (p) { p.style.left = (r.right - 102) + 'px'; p.style.top = (r.top - 74) + 'px' } if (x) { x.style.left = (r.left + 8) + 'px'; x.style.top = (r.top - 46) + 'px' } }
const lin = k => { const e = box.querySelector('#bLin'); if (!e) return; e.classList.remove('nod', 'shake', 'yay'); void e.offsetWidth; e.classList.add(k) };
const say = (who, t) => { const e = box.querySelector('#bSay'); if (!e) return; e.innerHTML = `<b>${esc(who)}</b>${esc(t)}`; e.classList.remove('pop'); void e.offsetWidth; e.classList.add('pop') };
const brand = () => `<div class="wy"><b>德威陽怎麼幫您？</b>${esc(HELP[lastH = pickI(HELP.length, lastH)])}</div>`;
let SHARE = null;

// =====================================================================
// 窗邊：律師今天又去哪了？（無限追逐，跟丟三次結束）
// =====================================================================
const DAY = [['地方法院', '地院開庭'], ['地檢署', '陪同應訊'], ['上市公司', '前法務長看合約'], ['講堂', '企業法律授課'], ['律師公會', '公益法律諮詢'], ['家事法庭', '家事調解出庭'], ['市政府', '擔任法律諮詢']];
const NIGHT = [['機場', '飛美國出庭'], ['事務所', '半夜視訊紐約'], ['事務所', '回覆日本客戶'], ['事務所', '英文合約逐條審']];
const EGG = { day: ['便當店', '午餐配合約'], night: ['便利商店', '宵夜配卷宗'] };
const OTHER = ['銀行', '百貨', '飯店', '大樓', '咖啡店', '書店'];
const QUIP = [['夢奇奇', '找到了！他又要出門了。'], ['夢奇奇', '剛剛不是還在法院？'], ['哈姆太郎', '律師是不是會瞬移？'], ['薪水掌門人', '計程車費又要報帳了！'], ['夢奇奇', '他今天到底跑幾個地方？'], ['哈姆太郎', '台灣下班，紐約上班。'], ['薪水掌門人', '時差也算加班嗎？'], ['夢奇奇', '他怎麼越晚越有精神？']];
const FAKEQ = [['夢奇奇', '那是分身！找提金色公事包的！'], ['哈姆太郎', '分身不算，本人有金色公事包！']];
const WKEY = 'wy3WinBest', CKEY = 'wy3CofBest';
const getN = k => { try { return +localStorage.getItem(k) || 0 } catch (e) { return 0 } };
const setN = (k, v) => { try { localStorage.setItem(k, String(v)) } catch (e) { } };
const pad = n => String(n).padStart(2, '0');
const hm = m => { const h = Math.floor(m / 60) % 24, mm = Math.round(m % 60); return pad(h) + ':' + pad(mm) };
const hmLong = m => { const h = Math.floor(m / 60) % 24; return (m >= 24 * 60 && h < 6 ? '凌晨 ' : h >= 18 || m >= 24 * 60 ? '晚上 ' : '') + hm(m) };
const hh = h => pad(((h % 24) + 24) % 24) + ':00';
function skyAt(m) { const h = (m / 60) % 24; return h >= 6 && h < 15 ? ['#9fd3f0', '#cfeaf5'] : h >= 15 && h < 18 ? ['#f4c27a', '#e98a5a'] : h >= 18 && h < 20 ? ['#6a4a7a', '#2a3460'] : ['#0e1430', '#1a2448'] }
const isNight = m => { const h = (m / 60) % 24; return h >= 19 || h < 6 };
let W = null, WR = null;
export function openWindow() {
  ensure(); stopAll(); const B = getN(WKEY);
  shell('律師今天又去哪了？', `<div class="start"><img src="${LIN}" alt="林律師" style="width:110px;height:110px;object-fit:contain"><p>林律師從早忙到半夜，<br>台北開完庭，又要跟紐約開會。</p><p>拖著望遠鏡，<b style="color:#b0782a">點到提金色公事包的林律師</b>，<br>追得上就一直追，跟丟三次就結束！</p>${B ? `<p style="color:#1f6b4f">你最遠追到：${hmLong(B)}</p>` : ''}<button class="big" data-a="go-win">拿起望遠鏡</button></div>
  <div class="say" id="bSay"><b>夢奇奇</b>他越晚越有精神，看你能追到幾點！</div>`);
}
function playWindow() {
  stopAll();
  shell('律師今天又去哪了？', `<div class="city" id="bc"><div class="plate" id="bpl"><span>台北 09:00 ｜ 紐約 20:00</span></div><div class="lives" id="blv"><i></i><i></i><i></i></div><canvas class="dark" id="bdk"></canvas><div class="scope" id="bsc"></div><div class="tbar"><u id="btb"></u></div></div>
  <div class="say" id="bSay"><b>林律師</b>早上 9 點，我先出門了！</div>`);
  const city = box.querySelector('#bc'), wdt = city.clientWidth, H = 400;
  const r = rng(dayKey());
  W = { i: -1, m: 9 * 60, miss: 0, end: false, sx: wdt / 2, sy: 250, busy: false, log: [], day: shuffle(DAY, r), night: shuffle(NIGHT, r), di: 0, ni: 0, slot: -1, plane: null, eggs: 0 };
  const N = 6, bw = Math.floor((wdt - 10) / N) - 6, hs = [220, 170, 250, 190, 235, 160]; W.blds = [];
  for (let k = 0; k < N; k++) {
    const b = document.createElement('div'); b.className = 'bld'; const x = 5 + k * (bw + 6), h = hs[k]; b.style.cssText = `left:${x}px;width:${bw}px;height:${h}px`;
    let wn = ''; for (let yy = 14; yy < h - 44; yy += 22) for (let xx = 8; xx < bw - 12; xx += 17) wn += `<i class="wn${Math.random() < .25 ? ' on' : ''}" style="left:${xx}px;top:${yy}px"></i>`;
    b.innerHTML = wn + `<em></em>`; city.append(b); W.blds.push({ el: b, x, w: bw, h });
  }
  const dk = box.querySelector('#bdk'); dk.width = wdt; dk.height = H; W.dk = dk;
  city.addEventListener('pointerdown', wDown); city.addEventListener('pointermove', e => { const rc = city.getBoundingClientRect(); W.sx = e.clientX - rc.left; W.sy = e.clientY - rc.top });
  wNext();
  const loop = now => { if (!W || W.end) return; const el = (now - W.stopT) / 1000, d = W.dur;
    const tb = box.querySelector('#btb'); if (tb) tb.style.width = Math.max(0, 100 - el / d * 100) + '%';
    wDraw(); if (el >= d && !W.busy) wEscape();
    raf = requestAnimationFrame(loop) };
  raf = requestAnimationFrame(loop);
}
function wDraw() {
  const g = W.dk.getContext('2d'), w = W.dk.width, h = W.dk.height;
  g.clearRect(0, 0, w, h); g.fillStyle = isNight(W.m) ? 'rgba(4,8,20,.86)' : 'rgba(10,20,40,.5)'; g.fillRect(0, 0, w, h);
  g.globalCompositeOperation = 'destination-out'; const rg = g.createRadialGradient(W.sx, W.sy, 60, W.sx, W.sy, 72); rg.addColorStop(0, '#000'); rg.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = rg; g.beginPath(); g.arc(W.sx, W.sy, 72, 0, 7); g.fill(); g.globalCompositeOperation = 'source-over';
  const s = box.querySelector('#bsc'); if (s) { s.style.left = W.sx + 'px'; s.style.top = W.sy + 'px' }
}
function wHide() { box.querySelectorAll('#bc .lin,#bc .glow').forEach(e => { e.classList.add('bye'); T(() => e.remove(), 220) }) }
function wLives() { const l = box.querySelectorAll('#blv i'); l.forEach((e, k) => e.classList.toggle('off', k >= 3 - W.miss)) }
function wNext() {
  W.i++; W.busy = false; if (W.i > 0) W.m += isNight(W.m) ? 60 : 120;
  const night = isNight(W.m); let s;
  if (W.i >= 3 && Math.random() < .1) { const e = night ? EGG.night : EGG.day; s = { place: e[0], tag: e[1], egg: true } }
  else { const e = night ? W.night[W.ni++ % W.night.length] : W.day[W.di++ % W.day.length]; s = { place: e[0], tag: e[1] } }
  let slot; do { slot = Math.floor(Math.random() * 6) } while (slot === W.slot); W.slot = slot; s.slot = slot; s.m = W.m; W.cur = s;
  W.dur = Math.max(1.45, 3.3 - W.i * .15);
  const city = box.querySelector('#bc'), sk = skyAt(W.m); city.style.background = `linear-gradient(${sk[0]},${sk[1]})`;
  box.querySelector('#bpl').innerHTML = `<span class="in">台北 ${hm(W.m)} ｜ 紐約 ${hm(W.m + 11 * 60)}</span>`;
  W.blds.forEach((b, k) => b.el.querySelector('em').textContent = k === slot ? s.place : OTHER[k]);
  const mk = (sl, fake) => { const b = W.blds[sl]; const x = b.x + b.w / 2, y = 400 - b.h + 30 + Math.random() * (b.h - 120);
    const l = document.createElement('div'); l.className = 'lin' + (fake ? ' fake' : ''); l.style.left = x + 'px'; l.style.top = y + 'px'; l.innerHTML = `<img src="${LIN}" alt="">${fake ? '' : '<i></i>'}`; city.append(l);
    const gw = document.createElement('div'); gw.className = 'glow'; gw.style.left = x + 'px'; gw.style.top = y + 'px'; city.append(gw); return l };
  W.real = mk(slot, false); W.fakes = [];
  const nf = W.i < 3 ? 0 : W.i < 6 ? 1 : W.i < 9 ? 2 : 3;
  shuffle([0, 1, 2, 3, 4, 5].filter(k => k !== slot), Math.random).slice(0, nf).forEach(k => W.fakes.push(mk(k, true)));
  if (!W.plane && W.i >= 4 && Math.random() < .3) wPlane();
  if (night && !W.saidNight) { W.saidNight = true; say('林律師', '台灣下班了，換紐約上班！'); lin('nod') }
  W.stopT = performance.now();
}
function wPlane() {
  const city = box.querySelector('#bc'), p = document.createElement('div'); p.className = 'plane'; p.innerHTML = '<b>直飛紐約</b>'; city.append(p); W.plane = p;
  p.addEventListener('pointerdown', e => { e.stopPropagation(); e.preventDefault(); if (W.end) return; p.remove(); W.plane = null; if (W.miss > 0) W.miss--; wLives(); say('林律師', '跟上飛機了！紐約見！'); lin('yay'); [988, 1319, 1760].forEach((f, i) => note(f, i * .05, .12, .06)) });
  T(() => { if (p.isConnected) p.remove(); if (W) W.plane = null }, 3200);
}
function wEscape() {
  W.busy = true; const near = Math.hypot(parseFloat(W.real.style.left) - W.sx, parseFloat(W.real.style.top) - W.sy) < 70;
  W.miss++; wLives(); W.log.push({ ...W.cur, ok: false }); note(240, 0, .15, .04, 'sine');
  say('夢奇奇', near ? '差一點點！他剛好跑掉了！' : '慢了一步，他已經去下一站！'); lin('shake'); wHide();
  if (W.miss >= 3) T(wFinish, 500); else T(wNext, 450);
}
function wDown(e) {
  e.preventDefault(); if (!W || W.end || W.busy) return; au(); const r = box.querySelector('#bc').getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top; W.sx = x; W.sy = y;
  const hit = el => Math.hypot(parseFloat(el.style.left) - x, parseFloat(el.style.top) - y) < 34;
  const fk = W.fakes.find(f => f.isConnected && hit(f)); if (fk && !hit(W.real)) { fk.classList.add('bye'); T(() => fk.remove(), 220); const q = FAKEQ[W.i % 2]; say(q[0], q[1]); lin('shake'); note(200, 0, .1, .05, 'sawtooth'); return }
  if (!hit(W.real)) return;
  W.busy = true; const s = W.cur; W.log.push({ ...s, ok: true }); if (s.egg) W.eggs++; chime(); lin('yay');
  const tg = document.createElement('div'); tg.className = 'tag' + (s.egg ? ' egg' : ''); tg.style.left = Math.min(r.width - 70, Math.max(70, parseFloat(W.real.style.left))) + 'px'; tg.style.top = (parseFloat(W.real.style.top) - 28) + 'px'; tg.innerHTML = `${esc(s.tag)}<small>${hm(s.m)}｜${esc(s.place)}</small>`; box.querySelector('#bc').append(tg); T(() => tg.remove(), 1300);
  if (s.egg) say('哈姆太郎', '抓到了！吃東西也在看文件！'); else { const q = QUIP[W.i % QUIP.length]; say(q[0], q[1]) }
  wHide(); T(wNext, 480);
}
function wFinish() {
  W.end = true; cancelAnimationFrame(raf); const city = box.querySelector('#bc'); if (!city) return; if (W.plane) W.plane.remove();
  const last = W.log.filter(x => x.ok).pop(), reach = last ? last.m : 0;
  const f = document.createElement('div'); f.className = 'fin'; f.innerHTML = `<div class="clk"><div><small>台北</small>${hm(W.m)}</div><div><small>紐約</small>${hm(W.m + 11 * 60)}</div><div><small>東京</small>${hm(W.m + 60)}</div></div><div class="office"><img src="${LIN}" alt=""><i style="left:10px"></i><i style="left:28px"></i><i style="right:12px"></i></div><p>城市的燈一盞一盞熄了，<br>德威陽的燈還亮著。</p>`;
  city.append(f); say('林律師', '台北下班，紐約剛上班。'); lin('nod'); [523, 659, 784].forEach((x, i) => note(x, i * .12, .3, .04, 'sine'));
  const B = getN(WKEY), isRec = reach > B; if (isRec) setN(WKEY, reach);
  WR = { reach, log: W.log.slice(-6), eggs: W.eggs, isRec, B }; SHARE = 'win';
  T(() => {
    const h = (reach / 60);
    const title = h >= 24 ? '跨時區追蹤王' : h >= 19 ? '夜間行程高手' : h >= 15 ? '行程小幫手' : '今天跟丟了';
    const msg = reach ? `你一路追到 <b style="color:#b0782a">${hmLong(reach)}</b><br>林律師還在繼續忙。` : '林律師跑太快了，再來一次一定追得上！';
    const rec = !reach ? '' : isRec ? '<span class="rec">新紀錄！</span>' : `<span class="rec" style="background:#1f6b4f">最遠紀錄 ${hmLong(B)}</span>`;
    shell('律師今天又去哪了？', `<div class="end"><b>${title}</b><p>${msg}</p>${rec}${WR.eggs ? '<p style="color:#c43a5c;margin-top:4px">彩蛋：抓到林律師邊吃邊看文件！</p>' : ''}</div>
    <div class="plan">${WR.log.map(s => `<div class="${s.ok ? '' : 'no'}"><small>${hm(s.m)}　${esc(s.place)}</small><b>${esc(s.tag)}</b></div>`).join('')}</div>
    <button class="big" data-a="cof">下一站：咖啡機</button>
    ${brand()}
    <div class="row3"><button data-a="go-win">再追一次</button><button data-a="share">分享行程卡</button><button data-a="close">回辦公室</button></div>
    <div class="say" id="bSay"><b>夢奇奇</b>明天的行程又不一樣，記得再來追他！</div>`); lin(reach ? 'yay' : 'nod')
  }, 2600);
}

// =====================================================================
// 咖啡機：老闆今天第幾杯？（咖啡機跟得上林律師嗎？過熱就罷工）
// =====================================================================
const REASON = { eve: ['明天的書狀還沒寫完', '三份合約一起審', '準備明天開庭', '整理證據資料'], night: ['半夜要跟紐約開會', '回日本客戶的信', '英文合約逐條審', '紐約客戶剛上班'] };
const SIZE = [['小杯', 74, 92], ['大杯', 86, 112], ['馬克杯', 104, 118], ['保溫瓶', 78, 162], ['超大保溫瓶', 94, 182], ['水桶', 156, 172]];
const SLEEVE = ['台美雙律師', '前上市公司法務長', '中英日三語', '2026 優秀公益律師', '24 小時都在工作', 'LINE @wylaw'];
const GAG = [['薪水掌門人', '咖啡豆預算又超支！'], ['夢奇奇', '這是今天第幾杯？'], ['哈姆太郎', '咖啡機也想要加班費'], ['夢奇奇', '杯子怎麼越來越大？'], ['薪水掌門人', '下一杯請用小杯！'], ['哈姆太郎', '律師越晚越有精神！']];
const LOT = [
  ['夢奇奇', '律師，明天幾點開庭？', '林律師', '還有兩杯咖啡的時間。'],
  ['哈姆太郎', '這份合約有多長？', '林律師', '大概三杯美式。'],
  ['薪水掌門人', '這杯要多大杯？', '林律師', '看合約有幾頁。'],
  ['夢奇奇', '律師你幾點下班？', '林律師', '台灣下班的時候，紐約剛上班。'],
  ['哈姆太郎', '律師你今天幾點收工？', '林律師', '你問台北時間還是紐約時間？'],
  ['薪水掌門人', '時差要怎麼調？', '林律師', '不用調，兩邊都在工作就好。'],
  ['薪水掌門人', '咖啡豆預算怎麼算？', '林律師', '看紐約客戶幾點起床。'],
  ['夢奇奇', '咖啡機怎麼冒煙了？', '哈姆太郎', '它說要請律師幫它談加班費。'],
  ['哈姆太郎', '律師你住台北嗎？', '林律師', '我住在台北和紐約的時差裡。'],
  ['夢奇奇', '日本客戶說辛苦了。', '林律師', '我回：咖啡機比較辛苦。'],
  ['薪水掌門人', '這個月出差幾次？', '林律師', '護照比我的公事包還常用。'],
  ['夢奇奇', '律師要不要休個假？', '林律師', '紐約放假的時候，台灣剛好開庭。']
];
let C = null, CR = null;
export function openCoffee() {
  ensure(); stopAll(); const B = getN(CKEY);
  shell('老闆今天第幾杯？', `<div class="start"><img src="${LIN}" alt="林律師" style="width:110px;height:110px;object-fit:contain"><p>林律師越晚越有精神，<br>台北的案子做完，紐約的又來了。</p><p><b style="color:#b0782a">按住倒咖啡，倒到金線就放開</b>。<br>倒太多或來不及，咖啡機會過熱罷工！</p>${B ? `<p style="color:#1f6b4f">咖啡機最久撐到：${hmLong(B)}</p>` : ''}<button class="big" data-a="go-cof">開始倒咖啡</button></div>
  <div class="say" id="bSay"><b>哈姆太郎</b>看看咖啡機跟不跟得上林律師！</div>`);
}
function playCoffee() {
  stopAll();
  shell('老闆今天第幾杯？', `<div class="bar" id="bb"><div class="plate" id="bpl"><span>台北 18:00 ｜ 紐約 05:00</span></div><div class="mach" id="bmc"><b>德威陽</b><div class="heat"><u id="bht"></u></div><i></i></div><div class="stream" id="bst"></div><div id="bcup"></div><div class="hint" id="bh">按住畫面倒咖啡</div></div>
  <div class="say" id="bSay"><b>林律師</b>晚上才正要開始，來一杯！</div>`);
  C = { m: 18 * 60, heat: 0, fill: 0, hold: false, started: false, end: false, n: 0, busy: false, served: 0 };
  const bar = box.querySelector('#bb');
  bar.addEventListener('pointerdown', e => { e.preventDefault(); if (C.end || C.busy) return; au(); if (!C.started) { C.started = true; box.querySelector('#bh').textContent = '' } C.hold = true });
  const up = () => { if (C.hold) { C.hold = false; cJudge() } }; bar.addEventListener('pointerup', up); bar.addEventListener('pointerleave', up); bar.addEventListener('pointercancel', up);
  cNext(); let last = performance.now(), gl = 0;
  const loop = now => { if (!C || C.end) return; const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (C.started && !C.busy) { C.heat += dt * .02; C.pat -= dt; const pb = box.querySelector('.order u'); if (pb) pb.style.width = Math.max(0, C.pat / C.pat0 * 100) + '%'; if (C.pat <= 0) cLate() }
    if (C.hold && !C.busy) { C.fill += dt * (.62 + Math.min(.4, C.n * .02)); gl += dt; if (gl > .16) { gl = 0; note(150 + C.fill * 160, 0, .07, .03, 'sine') } if (C.fill > 1.02) { C.hold = false; cJudge() } }
    cHeat(); const st = box.querySelector('#bst'), cup = box.querySelector('.cup');
    if (st) { const h = cup ? cup.offsetHeight : 0; st.style.height = C.hold && cup ? Math.max(0, (400 - 40 - h) + h * (1 - Math.min(1, C.fill)) - 162) + 'px' : '0px' }
    const lq = box.querySelector('.cup .liq'); if (lq) lq.style.height = Math.min(100, C.fill * 100) + '%';
    if (C.heat >= 1) { cFinish(); return }
    raf = requestAnimationFrame(loop) };
  raf = requestAnimationFrame(loop);
}
function cHeat() { C.heat = Math.max(0, C.heat); const u = box.querySelector('#bht'); if (u) { u.style.width = Math.min(100, C.heat * 100) + '%'; u.style.background = C.heat > .7 ? '#e0503f' : C.heat > .4 ? '#e8913a' : '#f3c64f' } const mc = box.querySelector('#bmc'); if (mc) mc.classList.toggle('hot', C.heat > .7) }
function cNext() {
  C.n++; C.fill = 0; C.busy = false; const n = C.n;
  C.kind = n >= 4 && Math.random() < .18 ? 'ny' : n >= 3 && Math.random() < .12 ? 'gold' : '';
  const si = C.kind === 'ny' ? 5 : Math.floor(Math.random() * Math.min(5, 1 + Math.floor(n / 2)));
  const [nm, w, h] = SIZE[si]; C.target = .8;
  C.pat0 = C.pat = Math.max(2.3, 5.2 - n * .2) * (C.kind === 'ny' ? 1.25 : 1);
  const rs = C.kind === 'ny' ? '紐約來電！大會議' : C.kind === 'gold' ? '金色咖啡豆，倒剛好會降溫' : (isNight(C.m) ? REASON.night : REASON.eve)[Math.floor(Math.random() * 4)];
  box.querySelector('#bcup').innerHTML = `<div class="cup${C.kind === 'gold' ? ' gold' : ''}" style="width:${w}px;height:${h}px"><div class="liq"></div><div class="gl" style="bottom:${C.target * 100}%"></div><div class="slv">${esc(SLEEVE[(n - 1) % SLEEVE.length])}</div>${nm === '水桶' ? '' : '<div class="hd"></div>'}</div>`;
  const od = box.querySelector('.order'); if (od) od.remove();
  const d = document.createElement('div'); d.className = 'order pop' + (C.kind ? ' sp' : ''); d.innerHTML = `<b>${hm(C.m)}</b><span>${esc(rs)}</span><small>${nm}</small><div class="pt"><u></u></div>`; box.querySelector('#bb').append(d);
  box.querySelector('#bpl').innerHTML = `<span class="in">台北 ${hm(C.m)} ｜ 紐約 ${hm(C.m + 11 * 60)}</span>`;
  if (C.kind === 'ny') { say('林律師', '紐約來電！這杯要大的！'); lin('nod') }
}
function bubble(who, t) { const b = box.querySelector('#bb'); if (!b) return; b.querySelectorAll('.bub').forEach(e => e.remove()); const e = document.createElement('div'); e.className = 'bub'; e.innerHTML = `<small>${esc(who)}</small>${esc(t)}`; b.append(e); T(() => e.remove(), 1400) }
function judge(t, col) { const b = box.querySelector('#bb'); const j = document.createElement('div'); j.className = 'judge'; j.textContent = t; j.style.color = col; b.append(j); T(() => j.remove(), 820) }
function cAdvance() { C.m += 30; T(() => { if (!C.end) cNext() }, 650) }
function cLate() { C.busy = true; C.hold = false; C.heat += .25; judge('來不及！', '#d2443f'); say('薪水掌門人', '律師等不及，自己去倒了！'); note(200, 0, .2, .05, 'sawtooth'); cAdvance() }
function cJudge() {
  if (C.busy || C.end) return; const d = C.fill - C.target;
  if (d < -.12) { if (C.fill > .05) judge('還不夠', '#8a5a14'); return }
  C.busy = true;
  if (d > .12) { C.heat += .28; judge('溢出來了', '#d2443f'); say('林律師', '沒關係，桌上的我也喝。'); lin('shake'); note(180, 0, .25, .05, 'sawtooth');
    const cup = box.querySelector('.cup'); cup.classList.add('spill'); const cr = cup.getBoundingClientRect(), br = box.querySelector('#bb').getBoundingClientRect();
    for (let k = 0; k < 6; k++) { const dp = document.createElement('div'); dp.className = 'drip'; dp.style.left = (cr.left - br.left + (k % 2 ? cr.width : -8)) + 'px'; dp.style.top = (cr.top - br.top + 4) + 'px'; dp.style.setProperty('--dx', (k % 2 ? 1 : -1) * (10 + k * 6) + 'px'); box.querySelector('#bb').append(dp); T(() => dp.remove(), 720) }
  } else { C.served++; const pf = Math.abs(d) <= .05;
    if (C.kind === 'gold' && pf) { C.heat = 0; judge('咖啡機降溫！', '#1f6b4f'); bubble('哈姆太郎', '咖啡機又活過來了！') }
    else { C.heat -= pf ? .12 : .04; judge(pf ? '剛剛好！' : '可以！', pf ? '#1f6b4f' : '#b0782a'); if (C.kind === 'ny') bubble('林律師', '紐約會議，剛好夠。'); else { const g = GAG[C.n % GAG.length]; bubble(g[0], g[1]) } }
    chime(); lin('yay'); say('林律師', pf ? '剛剛好，下一件案子！' : '可以，繼續工作！') }
  cAdvance();
}
function cFinish() {
  if (C.end) return; C.end = true; C.hold = false; cancelAnimationFrame(raf);
  const mc = box.querySelector('#bmc'); if (mc) mc.classList.add('dead'); const st = box.querySelector('#bst'); if (st) st.style.height = '0px';
  bubble('咖啡機', '我要請特休！'); say('林律師', '沒關係，我喝水繼續。'); lin('nod'); [392, 330, 262].forEach((f, i) => note(f, i * .14, .25, .05, 'sine'));
  const reach = C.m, B = getN(CKEY), isRec = reach > B; if (isRec) setN(CKEY, reach);
  const L = LOT[dayKey() % LOT.length]; CR = { reach, L, isRec, B }; SHARE = 'cof';
  T(() => {
    const h = reach / 60; const title = h >= 26 ? '咖啡機鐵人' : h >= 23 ? '咖啡機好夥伴' : '咖啡機見習生';
    const rec = isRec ? '<span class="rec">新紀錄！</span>' : `<span class="rec" style="background:#1f6b4f">最久紀錄 ${hmLong(B)}</span>`;
    shell('老闆今天第幾杯？', `<div class="end"><b>${title}</b><p>咖啡機撐到 <b style="color:#b0782a">${hmLong(reach)}</b> 就罷工了，<br>林律師還在處理紐約的案子。</p>${rec}</div>
    <div class="lot"><b>今日咖啡籤</b><p><small>${esc(L[0])}</small>${esc(L[1])}</p><p><small>${esc(L[2])}</small>${esc(L[3])}</p><div class="ft">台美雙律師｜中英日三語｜24 小時都在工作</div></div>
    <button class="big" data-a="go-cof">再倒一次</button>
    ${brand()}
    <div class="row3"><button data-a="share">分享成績卡</button><button data-a="win">看律師行程</button><button data-a="close">回辦公室</button></div>
    <div class="say" id="bSay"><b>薪水掌門人</b>咖啡籤一天一支，明天再來抽新的！</div>`); lin('yay')
  }, 1500);
}

// ---------- 分享卡 ----------
async function share() {
  const c = document.createElement('canvas'); c.width = 900; c.height = 900; const g = c.getContext('2d');
  const gr = g.createRadialGradient(450, 380, 60, 450, 450, 640); gr.addColorStop(0, SHARE === 'win' ? '#24365f' : '#2a8a63'); gr.addColorStop(1, SHARE === 'win' ? '#0b1126' : '#0f3d2b'); g.fillStyle = gr; g.fillRect(0, 0, 900, 900); g.strokeStyle = '#e0b64e'; g.lineWidth = 16; g.strokeRect(24, 24, 852, 852);
  const img = src => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src });
  const [lg, ln] = await Promise.all([img(LOGO), img(LIN)]);
  g.fillStyle = '#fff'; g.beginPath(); g.arc(160, 150, 80, 0, 7); g.fill(); if (lg) g.drawImage(lg, 95, 85, 130, 130); if (ln) g.drawImage(ln, 600, 60, 240, 277);
  g.textAlign = 'center'; g.fillStyle = '#f6dc9a';
  if (SHARE === 'win' && WR) {
    g.font = '900 60px "Noto Serif TC",serif'; g.fillText('我追著林律師跑到', 450, 420); g.font = '900 104px Georgia,serif'; g.fillText(WR.reach ? hmLong(WR.reach) : '起點', 450, 550, 800);
    g.fillStyle = '#fff3d6'; g.font = '800 40px system-ui'; g.fillText('你追得上他嗎？', 450, 640);
    g.fillStyle = '#e0b64e'; g.font = '800 32px system-ui'; g.fillText('台灣下班，紐約上班｜台美雙律師', 450, 715, 800);
  } else if (CR) {
    g.font = '900 56px "Noto Serif TC",serif'; g.fillText('咖啡機撐到', 450, 400); g.font = '900 100px Georgia,serif'; g.fillText(hmLong(CR.reach), 450, 520, 800);
    g.fillStyle = '#fff3d6'; g.font = '800 38px system-ui'; g.fillText('你的咖啡機跟得上林律師嗎？', 450, 600, 800);
    g.fillStyle = '#f6dc9a'; g.font = '800 30px system-ui'; g.fillText(`今日咖啡籤｜${CR.L[2]}：${CR.L[3]}`, 450, 670, 800);
    g.fillStyle = '#e0b64e'; g.font = '800 30px system-ui'; g.fillText('台美雙律師｜中英日三語｜24 小時都在工作', 450, 725, 800);
  }
  g.fillStyle = '#fff3d6'; g.font = '800 38px system-ui'; g.fillText('德威陽國際法律事務所', 450, 820); g.font = '700 30px system-ui'; g.fillText(LINE, 450, 862);
  const url = c.toDataURL('image/jpeg', .9), name = SHARE === 'win' ? '林律師今日行程.jpg' : '德威陽今日咖啡籤.jpg';
  try { const b = await (await fetch(url)).blob(); const f = new File([b], name, { type: 'image/jpeg' }); if (navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: '德威陽 3D 探索島', text: '林律師今天又去哪了？來德威陽 3D 探索島看看 https://weiyanglaw.github.io/yeswedo/' }); return } } catch (e) { if (e && e.name === 'AbortError') return }
  const a = document.createElement('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
}
