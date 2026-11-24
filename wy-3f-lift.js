// 3F 健身房「專業的重量」：照箭頭方向快速滑動，林律師舉起槓鈴；每舉一次加一片寫著資歷的槓片（15 秒）
// 全站唯一的「滑動方向」玩法；不打分數，只給稱號＋最佳紀錄（公斤）；德威陽框＋分享卡
// 用法：import {openLift} from './wy-3f-lift.js';
const LINE = 'LINE @wylaw ｜ weiandyang.com';
const LOGO = './office-logo-transparent.png', LIN = './full-wyF.png';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pickI = (n, last) => { let i; do { i = Math.floor(Math.random() * n) } while (i === last && n > 1); return i };
let ac = null;
function au() { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); return ac } catch (e) { return null } }
function note(f, t = 0, d = .12, v = .05, type = 'triangle') { const a = au(); if (!a) return; const o = a.createOscillator(), g = a.createGain(), n = a.currentTime + t; o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0, n); g.gain.linearRampToValueAtTime(v, n + .01); g.gain.exponentialRampToValueAtTime(.0005, n + d); o.connect(g).connect(a.destination); o.start(n); o.stop(n + d + .05) }

const PLATES = [['台美雙律師', '#1f3b57'], ['前上市公司法務長', '#7a1f2b'], ['中英日三語', '#1f6b4f'], ['優秀公益律師', '#b0782a'], ['政府法律顧問', '#3a3f8a'], ['美國法律碩士', '#5a2d6e'], ['企業法律講師', '#2b5f7a'], ['24小時都在工作', '#8a3d10']];
const PLATE_INFO = { '台美雙律師': '台灣與美國紐約州律師資格', '前上市公司法務長': '曾任上市公司法務長', '中英日三語': '中文、英文、日文溝通', '優秀公益律師': '2026 台北律師公會優秀公益律師', '政府法律顧問': '政府機關與工會法律顧問', '美國法律碩士': '美國法律、管理會計雙碩士', '企業法律講師': '企業與職訓機構法律講師', '24小時都在工作': '台北、紐約時差都顧到' };
const CHEER = [['夢奇奇', '又加一片！'], ['哈姆太郎', '好重的資歷！'], ['薪水掌門人', '這些都是真的經歷！'], ['夢奇奇', '槓鈴快放不下了！'], ['哈姆太郎', '專業的重量！'], ['薪水掌門人', '槓片預算我來出！']];
const HELP = [
  '德威陽審閱英文合約與跨國交易文件，逐條標出風險。林柏均律師具台灣與美國紐約州律師資格。',
  '德威陽審閱公司契約與治理文件，從經營角度評估風險。林柏均律師曾任上市公司法務長。',
  '德威陽以中英日三語溝通跨國案件，減少翻譯落差。林柏均律師具美國法律事務所工作經歷。',
  '德威陽出席民事、家事各類開庭，完整陳述每項主張。林柏均律師獲選 2026 台北律師公會優秀公益律師。',
  '德威陽擔任政府機關與工會法律顧問，處理多元法律問題。林柏均律師具豐富顧問經驗。',
  '德威陽規劃企業勞資、股東與合約制度。林柏均律師曾任上市公司法務長，實務經驗貼近公司需求。',
  '德威陽陪同警詢與偵查程序，現場確認每一句筆錄。林柏均律師處理刑事案件，重視每個程序細節。',
  '德威陽配合美國時差安排視訊會議，即時回覆跨國客戶。林柏均律師具台美雙執照，兩地程序都熟悉。'
];
let lastH = -1;
const ROT = { U: 0, R: 90, D: 180, L: 270 };
const arw = d => `<svg viewBox="0 0 24 24" width="24" height="24" style="transform:rotate(${ROT[d]}deg)"><path d="M12 3 L21 13 H15.5 V21 H8.5 V13 H3 Z" fill="currentColor"/></svg>`;
const LIMIT = 15, KEY = 'wy3LiftBest';

const CSS = `
#wy3L{position:fixed;inset:0;z-index:134;display:none;align-items:center;justify-content:center;padding:10px;background:radial-gradient(circle at 50% 30%,#1f6b4fdd,#0b241bf0);font-family:system-ui,'Noto Sans TC',sans-serif;-webkit-user-select:none;user-select:none;touch-action:none}
#wy3L .c{position:relative;width:min(97vw,440px);margin-top:56px;background:#fff;border:3px solid #d9b25f;border-radius:22px;box-shadow:0 0 0 6px #f3d48c55,0 20px 60px #0009;box-sizing:border-box;max-height:calc(100vh - 70px);overflow:auto}
#wy3L .br{display:flex;align-items:center;gap:9px;padding:7px 10px;border-bottom:1px solid #ecd3a8}
#wy3L .br img{width:32px;height:32px;object-fit:contain;border:2px solid #d3aa67;border-radius:9px}
#wy3L .br div{flex:1;min-width:0;padding-right:84px}#wy3L .br b{display:block;font-size:15.5px;color:#1f3b2f}#wy3L .br small{font-size:10px;color:#a07d45}
#wy3L .peek{position:fixed;width:108px;height:108px;object-fit:contain;z-index:5;transform-origin:50% 95%;filter:drop-shadow(0 4px 6px #0005);transition:transform .3s;pointer-events:none}
#wy3L .peek.nod{animation:lNod .45s ease}#wy3L .peek.shake{animation:lShake .4s ease}#wy3L .peek.yay{animation:lYay .8s ease 2}
@keyframes lNod{40%{transform:translateY(-12px)}}@keyframes lShake{25%{transform:rotate(-10deg)}75%{transform:rotate(10deg)}}@keyframes lYay{30%{transform:translateY(-20px) rotate(-8deg)}60%{transform:translateY(0) rotate(8deg)}}
#wy3L .x{position:fixed;border:0;background:#e9f3ee;color:#1f5a43;font-size:20px;width:34px;height:34px;border-radius:10px;font-weight:700;box-shadow:0 2px 6px #0004;z-index:6}
#wy3L .bd{padding:8px 11px 11px}
#wy3L h3{margin:2px 0 6px;text-align:center;font:900 24px 'Noto Serif TC','Songti TC',serif;color:#1f5a43}
#wy3L .say{background:#eef7f2;border:2px solid #9fd2b9;border-radius:14px;padding:7px 11px;font-size:16px;font-weight:700;color:#17402f;line-height:1.45;margin:8px 0 0;min-height:46px;box-sizing:border-box}
#wy3L .say b{display:block;font-size:12.5px;color:#2e8a62}
#wy3L .say.pop{animation:lPop .35s cubic-bezier(.3,1.5,.5,1)}@keyframes lPop{0%{transform:scale(.9);opacity:.3}100%{transform:none;opacity:1}}
#wy3L .wy{margin-top:9px;background:#FDE3C8;border:2px solid #E9B98A;border-left:6px solid #C6A25D;border-radius:12px;padding:10px 12px;color:#5A3216;font-weight:700;font-size:15.5px;line-height:1.5}
#wy3L .wy>b{display:block;font-size:19px;font-weight:900;margin-bottom:3px;color:#8A3D10}
#wy3L .wy:after{content:"${LINE}";display:block;margin-top:4px;padding-top:4px;border-top:1px dashed currentColor;font-size:15px;font-weight:800;color:#8A3D10}
#wy3L .big{width:100%;padding:13px;border-radius:14px;border:2px solid #c6a25d;background:#1f6b4f;color:#fff3d6;font-size:20px;font-weight:900;box-shadow:0 4px 0 #c6a25d;margin-top:8px}
#wy3L .row3{display:flex;gap:8px;margin-top:8px}#wy3L .row3 button{flex:1;padding:11px 6px;border-radius:12px;font-weight:900;font-size:15.5px;border:1.5px solid #c6a25d;background:#fff;color:#1f5a43}
#wy3L .end{text-align:center;background:linear-gradient(#fff8e1,#fff);border:2px solid #f0c95a;border-radius:14px;padding:8px 10px}
#wy3L .end b{display:block;font:900 26px 'Noto Serif TC',serif;color:#b0782a;margin-bottom:2px}
#wy3L .end p{margin:0;font-size:15.5px;line-height:1.55;color:#3a3a2c;font-weight:700}
#wy3L .rec{display:inline-block;margin-top:5px;padding:3px 12px;border-radius:999px;background:#e0503f;color:#fff;font:900 15px system-ui;animation:lPop .5s cubic-bezier(.3,1.6,.5,1)}
#wy3L .start{text-align:center;padding:6px 4px}#wy3L .start p{font-size:16.5px;font-weight:700;color:#2c4a3e;line-height:1.6;margin:6px 0}
#wy3L .demo{display:flex;justify-content:center;gap:8px;margin:6px 0}#wy3L .demo i{width:40px;height:40px;border-radius:10px;background:#1f3b57;color:#f6dc9a;font:900 26px system-ui;font-style:normal;display:flex;align-items:center;justify-content:center;border:2px solid #e0b64e}

#wy3L .gym{position:relative;height:400px;border-radius:16px;overflow:hidden;border:3px solid #c9963c;background:linear-gradient(#e9eef2 0 64%,#b98a5c 64% 100%);touch-action:none;cursor:grab}
#wy3L .gym:before{content:"";position:absolute;left:8%;right:8%;top:70px;height:150px;border-radius:8px;background:linear-gradient(120deg,#ffffff88,#cfd9e388 40%,#ffffff55);border:4px solid #c9963c55}
#wy3L .gym .floor{position:absolute;left:0;right:0;bottom:0;height:36%;background:repeating-linear-gradient(90deg,#b98a5c 0 46px,#a97a4e 46px 48px)}
#wy3L .mat{position:absolute;left:50%;bottom:22px;width:240px;height:30px;margin-left:-120px;border-radius:50%;background:#1f3b2f55}
#wy3L .plate{position:absolute;left:50%;top:10px;transform:translateX(-50%);height:52px;padding:0 10px;min-width:200px;box-sizing:border-box;white-space:nowrap;border-radius:12px;background:linear-gradient(#fff3c8,#e0b64e 55%,#c9963c);border:2px solid #8a5a14;box-shadow:0 3px 0 #0003,inset 0 1px 0 #fff;z-index:20;display:flex;align-items:center;justify-content:center;gap:6px;pointer-events:none}
#wy3L .plate.gold{background:linear-gradient(#fff,#ffe48a 50%,#f3c64f);box-shadow:0 0 22px #f3c64f,0 3px 0 #0003}
#wy3L .plate i{width:38px;height:38px;border-radius:9px;background:#1f3b57;color:#f6dc9a;font:900 26px system-ui;font-style:normal;display:flex;align-items:center;justify-content:center;transition:transform .12s,background .12s}
#wy3L .plate i.ok{background:#2e8a62;color:#fff;transform:scale(.88)}
#wy3L .plate i.cur{box-shadow:0 0 0 3px #fff,0 0 10px #f3c64f}
#wy3L .plate.bad{animation:bad .35s ease}@keyframes bad{25%{transform:translateX(calc(-50% - 8px))}75%{transform:translateX(calc(-50% + 8px))}}
#wy3L .tm{position:absolute;left:12px;top:70px;font:900 18px system-ui;color:#5a3a10;z-index:6}
#wy3L .kg{position:absolute;right:12px;top:70px;font:900 16px 'Noto Serif TC',serif;color:#1f3b2f;z-index:6;background:#fffc;padding:2px 8px;border-radius:8px;border:2px solid #e0b64e}
#wy3L .lin{position:absolute;left:50%;bottom:22px;width:150px;height:150px;margin-left:-75px;object-fit:contain;z-index:3;transform-origin:50% 100%;transition:transform .2s}
#wy3L .lin.strain{animation:strain .2s linear infinite}@keyframes strain{50%{transform:translateX(2px)}}
#wy3L .lin.wob{animation:wob .4s ease}@keyframes wob{25%{transform:rotate(-7deg)}75%{transform:rotate(7deg)}}
#wy3L .bb{position:absolute;left:50%;bottom:84px;width:0;height:0;z-index:4;transition:transform .32s cubic-bezier(.3,1.3,.5,1)}
#wy3L .bb.up{transform:translateY(-118px)}
#wy3L .bb .bar{position:absolute;left:-172px;width:344px;top:-5px;height:10px;border-radius:5px;background:linear-gradient(#f4f4f4,#8b8f96);box-shadow:0 2px 0 #0003}
#wy3L .bb .pl{position:absolute;top:-52px;width:15px;height:104px;border-radius:6px;border:2px solid #0004;box-sizing:border-box;color:#fff3d6;writing-mode:vertical-rl;font:900 10.5px/1 'Noto Serif TC',serif;display:flex;align-items:center;justify-content:center;letter-spacing:-.5px;box-shadow:inset 0 0 0 2px #fff3;animation:plIn .35s cubic-bezier(.3,1.6,.5,1)}
#wy3L .bb .pl.g{background:linear-gradient(#fff3c8,#d9a84e)!important;color:#5a3a10;box-shadow:0 0 12px #f3c64f}
@keyframes plIn{0%{transform:scale(.2) translateY(-60px);opacity:0}100%{transform:none;opacity:1}}
#wy3L .boom{position:absolute;left:50%;bottom:190px;z-index:8;transform:translateX(-50%);font:900 34px 'Noto Serif TC',serif;color:#d2443f;text-shadow:0 2px 0 #fff,0 0 12px #fff;pointer-events:none;white-space:nowrap;animation:bm .8s ease forwards}
@keyframes bm{0%{opacity:0;transform:translateX(-50%) scale(.4)}25%{opacity:1;transform:translateX(-50%) scale(1.2)}80%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(-40px)}}
#wy3L .gym.shk{animation:shk .25s linear}@keyframes shk{25%{transform:translateY(4px)}75%{transform:translateY(-3px)}}
#wy3L .spk{position:absolute;width:10px;height:10px;border-radius:50%;background:#ffe48a;box-shadow:0 0 8px #f3c64f;z-index:7;pointer-events:none;animation:spk .7s ease-out forwards}
@keyframes spk{to{transform:translate(var(--dx),var(--dy)) scale(.3);opacity:0}}
#wy3L .bub{position:absolute;right:10px;top:150px;max-width:126px;padding:6px 9px;border-radius:12px;background:#fff;border:2px solid #9fd2b9;font:900 14px/1.4 system-ui;color:#17402f;z-index:9;animation:lPop .35s cubic-bezier(.3,1.5,.5,1)}
#wy3L .bub small{display:block;font:800 11px system-ui;color:#2e8a62}
#wy3L .tbar{position:absolute;left:12px;right:12px;bottom:8px;height:8px;border-radius:5px;background:#fff5;overflow:hidden;z-index:20}#wy3L .tbar u{display:block;height:100%;background:linear-gradient(90deg,#f3c64f,#e8913a);width:100%}
#wy3L .hint{position:absolute;left:0;right:0;top:104px;text-align:center;font:900 16px system-ui;color:#1f3b2f;z-index:6;pointer-events:none}
#wy3L .plate i.cur{animation:cur .8s ease-in-out infinite}@keyframes cur{50%{transform:scale(1.15)}}
#wy3L .word{position:absolute;left:50%;top:102px;transform:translateX(-50%);white-space:nowrap;text-align:center;z-index:21;pointer-events:none;font:900 20px 'Noto Serif TC',serif;color:#c43a5c;background:#fffe;border:2px solid #f0b5c4;border-radius:12px;padding:3px 12px}#wy3L .word:empty{display:none}#wy3L .word small{display:block;font:800 12px system-ui;color:#6a5a3a}
#wy3L .hand{position:absolute;left:50%;top:230px;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:#fff;border:4px solid #e0b64e;box-shadow:0 0 16px #f3c64f;z-index:22;pointer-events:none;animation:hand 1.1s ease-in-out infinite}
#wy3L .hand:after{content:"";position:absolute;inset:10px;border-radius:50%;background:#e0b64e}
@keyframes hand{0%{transform:translate(0,0);opacity:0}15%{opacity:1}75%{transform:translate(var(--hx),var(--hy));opacity:1}100%{transform:translate(var(--hx),var(--hy));opacity:0}}
#wy3L .cards{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:7px}
#wy3L .cards div{border-radius:10px;padding:5px 8px;color:#fff3d6;text-align:left}
#wy3L .cards div.no{filter:grayscale(1) opacity(.4)}
#wy3L .cards b{display:block;font:900 15px 'Noto Serif TC',serif}#wy3L .cards small{font:800 11.5px system-ui;color:#ffe9b0}
`;
let box = null, raf = 0, timers = [];
const T = (f, ms) => timers.push(setTimeout(f, ms));
function ensure() {
  if (box) return; const st = document.createElement('style'); st.textContent = CSS; document.head.append(st);
  box = document.createElement('div'); box.id = 'wy3L'; document.body.append(box);
  box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const a = b.dataset.a; if (a === 'close') close(); else if (a === 'go') play(); else if (a === 'again') openLift(); else if (a === 'share') share() });
  addEventListener('resize', place); addEventListener('keydown', key);
}
function stopAll() { cancelAnimationFrame(raf); timers.forEach(clearTimeout); timers = [] }
function close() { stopAll(); S = null; box.style.display = 'none'; box.innerHTML = '' }
function shell(title, inner) {
  box.innerHTML = `<div class="c"><div class="br"><img alt="德威陽國際法律事務所" src="${LOGO}"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div></div><div class="bd"><h3>${title}</h3>${inner}</div></div><img class="peek" id="lLin" alt="林律師" src="${LIN}"><button class="x" data-a="close" aria-label="關閉">×</button>`;
  box.style.display = 'flex'; place();
}
function place() { if (!box || box.style.display === 'none') return; const c = box.querySelector('.c'); if (!c) return; const r = c.getBoundingClientRect(); const p = box.querySelector('#lLin'), x = box.querySelector('.x'); if (p) { p.style.left = (r.right - 102) + 'px'; p.style.top = (r.top - 74) + 'px' } if (x) { x.style.left = (r.left + 8) + 'px'; x.style.top = (r.top - 46) + 'px' } }
const lin = k => { const e = box.querySelector('#lLin'); if (!e) return; e.classList.remove('nod', 'shake', 'yay'); void e.offsetWidth; e.classList.add(k) };
const say = (who, t) => { const e = box.querySelector('#lSay'); if (!e) return; e.innerHTML = `<b>${esc(who)}</b>${esc(t)}`; e.classList.remove('pop'); void e.offsetWidth; e.classList.add('pop') };
const best = () => { try { return +localStorage.getItem(KEY) || 0 } catch (e) { return 0 } };

let S = null, R = null;
export function openLift() {
  ensure(); stopAll(); const B = best();
  shell('專業的重量', `<div class="start"><img src="${LIN}" alt="林律師" style="width:110px;height:110px;object-fit:contain"><p>林律師的每一項資歷，<br>都是一片實打實的槓片。</p><p><b style="color:#b0782a">照箭頭的方向快速滑動</b>，<br>全部滑對就舉起來，再加一片！</p><div class="demo"><i>${arw('U')}</i><i>${arw('L')}</i><i>${arw('U')}</i></div>${B ? `<p style="color:#1f6b4f">你的最佳紀錄：${B} 公斤</p>` : ''}<button class="big" data-a="go">開始舉重</button></div>
  <div class="say" id="lSay"><b>哈姆太郎</b>15 秒內，看你能幫林律師疊上多少資歷！</div>`);
}
function play() {
  stopAll();
  shell('專業的重量', `<div class="gym" id="lg"><div class="floor"></div><div class="plate" id="lpl"></div><div class="tm" id="ltm">${LIMIT.toFixed(1)}</div><div class="kg" id="lkg">20 公斤</div><div class="mat"></div><img class="lin" id="lbody" src="${LIN}" alt="林律師"><div class="bb" id="lbb"><div class="bar"></div></div><div class="word" id="lw"></div><div class="hand" id="lhand"></div><div class="hint" id="lh"></div><div class="tbar"><u id="ltb"></u></div></div>
  <div class="say" id="lSay"><b>林律師</b>看金牌上的箭頭，手指在畫面上照著方向滑！</div>`);
  S = { started: false, t0: 0, done: false, lifts: 0, plates: [], seq: [], pos: 0, gold: false, busy: false, sx: null, sy: null };
  newSeq();
  const g = box.querySelector('#lg');
  g.addEventListener('pointerdown', e => { e.preventDefault(); au(); S.sx = e.clientX; S.sy = e.clientY; try { g.setPointerCapture(e.pointerId) } catch (x) { } });
  g.addEventListener('pointermove', e => { if (S.sx == null) return; const dx = e.clientX - S.sx, dy = e.clientY - S.sy; if (Math.hypot(dx, dy) < 26) return; const d = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : (dy > 0 ? 'D' : 'U'); S.sx = e.clientX; S.sy = e.clientY; input(d) });
  const end = () => { if (S) S.sx = null }; g.addEventListener('pointerup', end); g.addEventListener('pointercancel', end);
  const loop = now => { if (!S || S.done) return; if (S.started) { const left = Math.max(0, LIMIT - (now - S.t0) / 1000); const tm = box.querySelector('#ltm'); if (tm) tm.textContent = left.toFixed(1); const tb = box.querySelector('#ltb'); if (tb) tb.style.width = (left / LIMIT * 100) + '%'; if (left <= 0) { finish(); return } } raf = requestAnimationFrame(loop) };
  raf = requestAnimationFrame(loop);
}
function key(e) { if (!S || S.done || !box || box.style.display === 'none') return; const m = { ArrowUp: 'U', ArrowDown: 'D', ArrowLeft: 'L', ArrowRight: 'R' }[e.key]; if (m) { e.preventDefault(); au(); input(m) } }
function newSeq() {
  const n = S.lifts < 2 ? 2 : S.lifts < 4 ? 3 : 4; const ds = ['U', 'D', 'L', 'R']; S.seq = []; for (let i = 0; i < n; i++) { let d; do { d = ds[Math.floor(Math.random() * 4)] } while (i && d === S.seq[i - 1] && Math.random() < .6); S.seq.push(d) } if (S.seq[n - 1] !== 'U' && Math.random() < .6) S.seq[n - 1] = 'U';
  S.pos = 0; S.gold = S.lifts >= 2 && Math.random() < .18; drawSeq();
}
const WORD = { U: '往上滑', D: '往下滑', L: '往左滑', R: '往右滑' }, HV = { U: [0, -90], D: [0, 90], L: [-90, 0], R: [90, 0] };
function drawSeq() { const p = box.querySelector('#lpl'); if (!p) return; const cd = S.seq[S.pos];
  const w = box.querySelector('#lw'); if (w) w.innerHTML = cd ? '手指' + WORD[cd] + (S.lifts ? '' : '<small>第一次是教學，不計時</small>') : '';
  const hd = box.querySelector('#lhand'); if (hd) { if (S.lifts === 0 && cd) { hd.style.display = 'block'; hd.style.setProperty('--hx', HV[cd][0] + 'px'); hd.style.setProperty('--hy', HV[cd][1] + 'px'); hd.style.animation = 'none'; void hd.offsetWidth; hd.style.animation = '' } else hd.style.display = 'none' } p.classList.toggle('gold', S.gold); p.innerHTML = S.seq.map((d, i) => `<i data-d="${d}" class="${i < S.pos ? 'ok' : i === S.pos ? 'cur' : ''}">${arw(d)}</i>`).join('') }
function input(d) {
  if (!S || S.done || S.busy) return;
  if (d === S.seq[S.pos]) { S.pos++; note(520 + S.pos * 140, 0, .07, .05, 'square'); drawSeq(); const b = box.querySelector('#lbody'); if (b) b.classList.add('strain'); if (S.pos >= S.seq.length) lift() }
  else { S.pos = 0; drawSeq(); const p = box.querySelector('#lpl'); p.classList.remove('bad'); void p.offsetWidth; p.classList.add('bad'); const b = box.querySelector('#lbody'); b.classList.remove('strain', 'wob'); void b.offsetWidth; b.classList.add('wob'); note(180, 0, .15, .05, 'sawtooth'); say('林律師', '方向錯了，重新來！'); lin('shake') }
}
function addPlate(gold) {
  const i = S.plates.length; const bb = box.querySelector('#lbb'); if (!bb) return;
  if (i < PLATES.length) { S.plates.push(PLATES[i][0]);
    [-1, 1].forEach(sd => { const el = document.createElement('div'); el.className = 'pl' + (gold ? ' g' : ''); el.style.background = PLATES[i][1]; el.style.left = (sd < 0 ? -(44 + i * 15.5) - 15 : 44 + i * 15.5) + 'px'; el.textContent = PLATES[i][0].replace('24小時都在工作', '24小時工作'); bb.append(el) });
  } else { S.plates.push('加碼'); bb.querySelectorAll('.pl').forEach(el => el.classList.add('g')) }
}
function kg() { return 20 + S.plates.length * 20 }
function lift() {
  S.busy = true; const b = box.querySelector('#lbody'); b.classList.remove('strain'); const bb = box.querySelector('#lbb'), g = box.querySelector('#lg');
  bb.classList.add('up'); lin('yay'); [523, 659, 784, 1047].forEach((f, i) => note(f, i * .05, .14, .06));
  T(() => {
    bb.classList.remove('up'); g.classList.remove('shk'); void g.offsetWidth; g.classList.add('shk'); note(90, 0, .25, .09, 'sine'); note(60, .02, .3, .08, 'square');
    const gold = S.gold; S.lifts++; if (!S.started) { S.started = true; S.t0 = performance.now(); say('林律師', '學會了！現在開始計時 15 秒！') } addPlate(gold); if (gold) addPlate(true);
    const bm = document.createElement('div'); bm.className = 'boom'; bm.textContent = gold ? '金色加倍！' : '碰！'; g.append(bm); T(() => bm.remove(), 820);
    for (let k = 0; k < 10; k++) { const s = document.createElement('div'); s.className = 'spk'; s.style.left = (g.clientWidth / 2) + 'px'; s.style.bottom = '84px'; s.style.setProperty('--dx', (Math.random() * 240 - 120) + 'px'); s.style.setProperty('--dy', (-40 - Math.random() * 90) + 'px'); g.append(s); T(() => s.remove(), 720) }
    const kgEl = box.querySelector('#lkg'); if (kgEl) kgEl.textContent = kg() + ' 公斤';
    const last = S.plates[S.plates.length - 1]; const ch = CHEER[S.lifts % CHEER.length];
    g.querySelectorAll('.bub').forEach(e => e.remove()); const bu = document.createElement('div'); bu.className = 'bub'; bu.innerHTML = `<small>${esc(ch[0])}</small>${esc(ch[1])}`; g.append(bu); T(() => bu.remove(), 1300);
    if (S.lifts === 1) { } else if (PLATE_INFO[last]) say('林律師', `加上「${last}」，${PLATE_INFO[last]}。`); else say('林律師', '再加碼，越來越有份量！');
    S.busy = false; if (!S.done) newSeq();
  }, 340);
}
function finish() {
  S.done = true; cancelAnimationFrame(raf); const w = kg(), B = best(), isRec = w > B; if (isRec) { try { localStorage.setItem(KEY, String(w)) } catch (e) { } }
  R = { w, plates: S.plates.filter(p => PLATE_INFO[p]), isRec, B };
  say('林律師', '每一片都是實打實的經歷。'); lin('nod');
  T(() => {
    const n = S.plates.length; const title = n >= 8 ? '專業重量級' : n >= 5 ? '資歷舉重手' : n >= 2 ? '熱身完成' : '先從空槓開始';
    const rec = !n ? '' : isRec ? '<span class="rec">新紀錄！</span>' : `<span class="rec" style="background:#1f6b4f">最佳紀錄 ${B} 公斤</span>`;
    shell('專業的重量', `<div class="end"><b>${title}</b><p>林律師舉起了 <b style="color:#b0782a;display:inline;font-size:20px">${w} 公斤</b> 的專業</p>${rec}</div>
    <div class="cards">${PLATES.map(p => `<div class="${R.plates.includes(p[0]) ? '' : 'no'}" style="background:${p[1]}"><b>${esc(p[0])}</b><small>${esc(PLATE_INFO[p[0]])}</small></div>`).join('')}</div>
    <button class="big" data-a="again">再舉一次</button>
    <div class="wy"><b>德威陽怎麼幫您？</b>${esc(HELP[lastH = pickI(HELP.length, lastH)])}</div>
    <div class="row3"><button data-a="share">分享成績卡</button><button data-a="close">回辦公室</button></div>
    <div class="say" id="lSay"><b>林律師</b>每一片都是實打實的經歷。</div>`); lin(n >= 5 ? 'yay' : 'nod')
  }, 1100);
}
async function share() {
  const c = document.createElement('canvas'); c.width = 900; c.height = 900; const g = c.getContext('2d');
  const gr = g.createRadialGradient(450, 380, 60, 450, 450, 640); gr.addColorStop(0, '#2a8a63'); gr.addColorStop(1, '#0f3d2b'); g.fillStyle = gr; g.fillRect(0, 0, 900, 900); g.strokeStyle = '#e0b64e'; g.lineWidth = 16; g.strokeRect(24, 24, 852, 852);
  const img = src => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src });
  const [lg, ln] = await Promise.all([img(LOGO), img(LIN)]);
  g.fillStyle = '#fff'; g.beginPath(); g.arc(160, 150, 80, 0, 7); g.fill(); if (lg) g.drawImage(lg, 95, 85, 130, 130); if (ln) g.drawImage(ln, 600, 60, 240, 277);
  g.textAlign = 'center'; g.fillStyle = '#f6dc9a'; g.font = '900 64px "Noto Serif TC",serif'; g.fillText('專業的重量', 450, 410);
  g.font = '900 120px Georgia,serif'; g.fillText((R ? R.w : 20) + ' 公斤', 450, 560);
  g.fillStyle = '#fff3d6'; g.font = '800 38px system-ui'; g.fillText('你能幫德威陽的林柏均律師舉起更多資歷嗎？', 450, 640, 800);
  g.fillStyle = '#e0b64e'; g.font = '800 30px system-ui'; g.fillText('林柏均律師｜台美雙執照｜前上市公司法務長｜中英日三語', 450, 710, 800);
  g.fillStyle = '#fff3d6'; g.font = '800 38px system-ui'; g.fillText('德威陽國際法律事務所', 450, 800); g.font = '700 30px system-ui'; g.fillText(LINE, 450, 845);
  const url = c.toDataURL('image/jpeg', .9);
  try { const b = await (await fetch(url)).blob(); const f = new File([b], '德威陽專業的重量.jpg', { type: 'image/jpeg' }); if (navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: '德威陽｜專業的重量', text: '我在德威陽 3D 探索島幫林柏均律師舉起專業的重量！ https://weiyanglaw.github.io/yeswedo/' }); return } } catch (e) { if (e && e.name === 'AbortError') return }
  const a = document.createElement('a'); a.href = url; a.download = '德威陽專業的重量.jpg'; document.body.append(a); a.click(); a.remove();
}
