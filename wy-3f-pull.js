// 3F 卷宗櫃「用力拉開抽屜」三關闖關（20 秒，計時不中斷）：一關狂點、二關左右交替、三關畫圈轉開金色保險櫃
// 宣傳不再一閃即逝：抽屜正面直接寫服務名稱；過關的服務卡收進畫面上方「已解鎖」列一直留著；結算整理全部卡片＋榮譽卡
// 花招：狂熱時間、林律師飛過來幫忙、轉盤停手會回彈、最佳紀錄、分享成績卡
// 用法：import {openPull} from './wy-3f-pull.js';
const LINE = 'LINE @wylaw ｜ weiandyang.com';
const LOGO = './office-logo-transparent.png', LIN = './full-wyF.png';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pickI = (n, last) => { let i; do { i = Math.floor(Math.random() * n) } while (i === last && n > 1); return i };
const HELP = ['盤點手上的案件資料，排出處理的先後順序。案件再多，也要一件一件掌握。', '整理散落的對話、匯款與照片，拼出完整的事實經過。證據排對順序，主張才有說服力。', '比對各方說法與文件，找出前後不一致的地方。細節裡，常常藏著關鍵。', '保存電子訊息與原始檔案，規劃證據的提出方式。原始資料，比截圖更有份量。', '評估證人與證物的份量，安排舉證順序。證據放對位置，說服力更完整。', '整理就醫、事故與損害資料，擬定求償依據。金額有依據，主張才站得住。', '分析對方提出的證據，規劃反駁重點。看懂對方的牌，才知道怎麼出手。', '盤點合約往來與履約紀錄，評估違約責任。紀錄完整，談判更有底氣。'];
const SVC = { 民事: ['#2f7de1', '借款、租屋、車禍求償'], 刑事: ['#c43a5c', '警詢、偵查到審判全程陪同'], 家事: ['#e0702f', '離婚、親權、扶養與財產'], 企業: ['#7a4fc4', '股東協議、合約審閱、勞資管理'] };
const FILES = { 民事: ['借款糾紛', '租屋押金', '車禍求償', '買賣瑕疵'], 刑事: ['警詢通知', '詐騙告訴', '妨害名譽', '偵查卷宗'], 家事: ['離婚協議', '親權會面', '扶養費', '夫妻財產'], 企業: ['股東協議', '保密協議', '勞動契約', '跨國代理'] };
const HONOR = [['2026 優秀公益律師', '林柏均律師榮獲台北律師公會優秀公益律師。'], ['台灣＋紐約州律師', '林柏均律師同時具備台灣與美國紐約州律師資格。'], ['前上市公司法務長', '林柏均律師曾任上市公司法務長，熟悉企業實務。']];
const PLATE = ['林柏均律師 台美雙執照', '林柏均律師 前上市公司法務長', '林柏均律師 優秀公益律師', '林柏均律師 中英日三語', '德威陽 24 小時都在', '德威陽 LINE @wylaw'];
const SUBL = { 民事: '求償有依據', 刑事: '全程陪同應訊', 家事: '情理證據兼顧', 企業: '前法務長把關' };
const LIMIT = 20, KEY = 'wy3PullBest4', TURNS = 3.6;
let lastH = -1, box, ac, raf = 0, timers = [];
function au() { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); return ac } catch (e) { return null } }
function note(f, t = 0, d = .12, v = .05, type = 'triangle') { const a = au(); if (!a) return; const o = a.createOscillator(), g = a.createGain(), n = a.currentTime + t; o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0, n); g.gain.linearRampToValueAtTime(v, n + .01); g.gain.exponentialRampToValueAtTime(.0005, n + d); o.connect(g).connect(a.destination); o.start(n); o.stop(n + d + .05) }
const best = () => { try { return parseFloat(localStorage.getItem(KEY)) || 0 } catch (e) { return 0 } };
const CSS = `
#wy3U{position:fixed;inset:0;z-index:132;display:none;align-items:center;justify-content:center;padding:10px;background:radial-gradient(circle at 50% 30%,#1f6b4fdd,#0b241bf0);font-family:system-ui,'Noto Sans TC',sans-serif;-webkit-user-select:none;user-select:none;touch-action:none}
#wy3U .c{position:relative;width:min(97vw,440px);margin-top:56px;background:#fff;border:3px solid #d9b25f;border-radius:22px;box-shadow:0 0 0 6px #f3d48c55,0 20px 60px #0009;box-sizing:border-box}
#wy3U .br{display:flex;align-items:center;gap:9px;padding:7px 10px;border-bottom:1px solid #ecd3a8}
#wy3U .br img{width:32px;height:32px;object-fit:contain;border:2px solid #d3aa67;border-radius:9px}
#wy3U .br div{flex:1;min-width:0;padding-right:84px}#wy3U .br b{display:block;font-size:15.5px;color:#1f3b2f}#wy3U .br small{font-size:10px;color:#a07d45}
#wy3U .peek{position:absolute;right:-6px;top:-74px;width:108px;height:108px;object-fit:contain;z-index:5;transform-origin:50% 95%;filter:drop-shadow(0 4px 6px #0005);transition:transform .3s}
#wy3U .peek.nod{animation:pNod .45s ease}#wy3U .peek.shake{animation:pShake .4s ease}#wy3U .peek.yay{animation:pYay .8s ease 2}
@keyframes pNod{40%{transform:translateY(-12px)}}@keyframes pShake{25%{transform:rotate(-10deg)}75%{transform:rotate(10deg)}}@keyframes pYay{30%{transform:translateY(-20px) rotate(-8deg)}60%{transform:translateY(0) rotate(8deg)}}
#wy3U .x{position:absolute;left:8px;top:-46px;box-shadow:0 2px 6px #0004;border:0;background:#e9f3ee;color:#1f5a43;font-size:20px;width:34px;height:34px;border-radius:10px;font-weight:700}
#wy3U .bd{padding:8px 11px 11px}
#wy3U h3{margin:2px 0 2px;text-align:center;font:900 24px 'Noto Serif TC','Songti TC',serif;color:#1f5a43}
#wy3U .sub{text-align:center;font-size:15px;font-weight:700;color:#4c6a5e;margin:0 0 8px;line-height:1.5}
#wy3U .say{background:#eef7f2;border:2px solid #9fd2b9;border-radius:14px;padding:7px 11px;font-size:16px;font-weight:700;color:#17402f;line-height:1.45;margin:8px 0 0;min-height:24px}
#wy3U .say b{display:block;font-size:12.5px;color:#2e8a62}
#wy3U .say.pop{animation:pPop .35s cubic-bezier(.3,1.5,.5,1)}@keyframes pPop{0%{transform:scale(.9);opacity:.3}100%{transform:none;opacity:1}}
#wy3U .wy{margin-top:9px;background:#FDE3C8;border:2px solid #E9B98A;border-left:6px solid #C6A25D;border-radius:12px;padding:10px 12px;color:#5A3216;font-weight:700;font-size:15.5px;line-height:1.5}
#wy3U .wy>b{display:block;font-size:19px;font-weight:900;margin-bottom:3px;color:#8A3D10}
#wy3U .wy:after{content:"${LINE}";display:block;margin-top:4px;padding-top:4px;border-top:1px dashed currentColor;font-size:15px;font-weight:800;color:#8A3D10}
#wy3U .btns{display:flex;gap:8px;margin-top:9px}
#wy3U .btns button,#wy3U .go{flex:1;padding:12px 6px;border-radius:12px;font-weight:900;font-size:17px;border:1.5px solid #c6a25d;touch-action:manipulation}
#wy3U .a,#wy3U .go{background:#1f6b4f;color:#fff3d6;box-shadow:0 3px 0 #c6a25d}#wy3U .b{background:#fff;color:#1f5a43}
#wy3U .go{width:100%;font-size:19px;padding:15px}
#wy3U .end{text-align:center;background:linear-gradient(#fff8e1,#fff);border:2px solid #f0c95a;border-radius:14px;padding:12px;margin:2px 0 0}
#wy3U .end b{display:block;font:900 26px 'Noto Serif TC',serif;color:#b0782a;margin-bottom:4px}
#wy3U .end p{margin:0;font-size:16px;line-height:1.6;color:#3a3a2c;font-weight:700}

#wy3U .stage{position:relative;height:400px;border-radius:16px;overflow:hidden;border:3px solid #c9963c;background:linear-gradient(#f6ecd4,#e8d4a8);touch-action:none;cursor:pointer;transition:box-shadow .3s,background .3s}
#wy3U .stage.fever{box-shadow:inset 0 0 40px #f3c64f;background:linear-gradient(#fff3c8,#f3d48c)}
#wy3U .meter{position:absolute;left:12px;right:12px;top:10px;height:14px;border-radius:8px;background:#fffa;overflow:hidden;border:2px solid #e0b64e;z-index:5}
#wy3U .meter u{display:block;height:100%;width:0;background:linear-gradient(90deg,#f3c64f,#e8913a)}
#wy3U .tm{position:absolute;right:12px;top:30px;font:900 20px system-ui;color:#5a3a10;z-index:5}
#wy3U .lv{position:absolute;left:12px;top:32px;font:900 15px system-ui;color:#1f5a43;z-index:5}
#wy3U .tray{position:absolute;left:10px;right:10px;top:58px;height:30px;display:flex;gap:5px;align-items:center;z-index:5}
#wy3U .tray em{font:800 12px system-ui;color:#6a5a3a;font-style:normal;white-space:nowrap}
#wy3U .tray i{font-style:normal;padding:4px 9px;border-radius:999px;color:#fff;font:900 14px 'Noto Serif TC',serif;box-shadow:0 2px 0 #0002;animation:uIn .5s cubic-bezier(.3,1.6,.5,1)}
@keyframes uIn{0%{transform:scale(.3) translateY(80px);opacity:0}100%{transform:none;opacity:1}}
#wy3U .fv{position:absolute;left:12px;top:31px;font:900 15px 'Noto Serif TC',serif;color:#d2443f;z-index:6;opacity:0;transition:opacity .2s;white-space:nowrap;text-shadow:0 2px 0 #fff}
#wy3U .stage.fever .fv{opacity:1}#wy3U .stage.fever .lv{opacity:0}
#wy3U .cab{position:absolute;left:50%;bottom:22px;width:220px;height:250px;margin-left:-110px;background:#1f6b4f;border:5px solid #e0b64e;border-radius:16px;box-shadow:0 10px 0 #0002}
#wy3U .slot{position:absolute;left:10px;right:10px;height:64px;background:#17533b;border:3px solid #2a8a63;border-radius:9px}
#wy3U .dr{position:absolute;border:4px solid #e0b64e;border-radius:10px;transform-origin:50% 100%;z-index:3;display:flex;align-items:center;justify-content:center;box-sizing:border-box;color:#fff;font:900 30px 'Noto Serif TC',serif;text-shadow:0 2px 0 #0003}
#wy3U .dr.gold{background:linear-gradient(#f8e3a6,#d9a84e);color:#5a3a10;border-color:#fff3c8;box-shadow:0 0 18px #f3c64f;font-size:22px;text-shadow:none}
#wy3U .dial{position:absolute;left:50%;top:290px;width:140px;height:140px;margin:-70px 0 0 -70px;border-radius:50%;background:radial-gradient(circle,#fff6dc 0 40%,#f3d48c 41% 60%,#d9a84e 61%);border:6px solid #fff3c8;box-shadow:0 0 30px #f3c64f,inset 0 -6px 0 #0002;z-index:7}
#wy3U .dial i{position:absolute;left:50%;top:5px;width:16px;height:30px;margin-left:-8px;background:#1f6b4f;border-radius:8px}
#wy3U .dial b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:900 20px 'Noto Serif TC',serif;color:#5a3a10}
#wy3U .plate{position:absolute;left:50%;top:92px;transform:translateX(-50%);min-width:220px;height:32px;padding:0 14px;box-sizing:border-box;border-radius:9px;background:linear-gradient(#fff3c8,#e0b64e 55%,#c9963c);border:2px solid #8a5a14;box-shadow:0 3px 0 #0003,inset 0 1px 0 #fff;z-index:10;overflow:hidden;pointer-events:none;perspective:300px}
#wy3U .plate span{display:flex;height:100%;align-items:center;justify-content:center;font:900 19px 'Noto Serif TC',serif;color:#1f3b2f;white-space:nowrap;letter-spacing:1px}
#wy3U .plate span.in{animation:plIn .35s cubic-bezier(.3,1.4,.5,1)}@keyframes plIn{0%{transform:rotateX(90deg);opacity:0}100%{transform:none;opacity:1}}
#wy3U .plate:after{content:"";position:absolute;top:0;bottom:0;left:-60%;width:40%;background:linear-gradient(90deg,#fff0,#fffc,#fff0);transform:skewX(-20deg)}
#wy3U .plate.sh:after{animation:plSh .7s ease .1s}@keyframes plSh{to{left:130%}}
#wy3U .dr{flex-direction:column;line-height:1.05}#wy3U .dr small{display:block;font:900 14px system-ui;margin-top:4px;opacity:.95;letter-spacing:.5px}
#wy3U .lr{position:absolute;left:8px;right:8px;bottom:8px;display:flex;justify-content:space-between;z-index:8;pointer-events:none}
#wy3U .lr span{width:88px;height:88px;border-radius:50%;background:#1f6b4fdd;border:4px solid #e0b64e;color:#fff3d6;font:900 26px system-ui;display:flex;align-items:center;justify-content:center;transition:transform .08s,background .1s}
#wy3U .lr span.on{transform:scale(.88);background:#e0b64e;color:#1f3b2f}
#wy3U .lr span.next{box-shadow:0 0 0 5px #f3c64f88}
#wy3U .hint{position:absolute;left:0;right:0;bottom:4px;text-align:center;font:900 15px system-ui;color:#5a3a10;z-index:6;pointer-events:none}
#wy3U .fly{position:absolute;z-index:9;padding:4px 7px;border-radius:5px;color:#fff;font:900 13px 'Noto Serif TC',serif;white-space:nowrap;pointer-events:none;box-shadow:0 3px 0 #0003;animation:uFly 1s cubic-bezier(.2,.8,.3,1) forwards}
@keyframes uFly{0%{transform:translate(0,0) rotate(0) scale(.6);opacity:1}100%{transform:translate(var(--dx),var(--dy)) rotate(var(--r)) scale(1);opacity:0}}
#wy3U .boss{position:absolute;top:150px;width:78px;height:78px;z-index:10;animation:uBoss 2.8s linear forwards;cursor:pointer}
#wy3U .boss img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 0 10px #f3c64f)}
@keyframes uBoss{0%{left:-82px;transform:translateY(0)}25%{transform:translateY(-24px)}50%{transform:translateY(0)}75%{transform:translateY(-24px)}100%{left:110%;transform:translateY(0)}}
#wy3U .rec{display:inline-block;margin-top:6px;padding:3px 12px;border-radius:999px;background:#e0503f;color:#fff;font:900 15px system-ui;animation:pPop .5s cubic-bezier(.3,1.6,.5,1)}
#wy3U .end{padding:8px 10px!important}
#wy3U .svcs{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:7px}
#wy3U .svcs div{border-radius:10px;padding:4px 8px;color:#fff;text-align:left}
#wy3U .svcs b{display:inline;font:900 16px 'Noto Serif TC',serif;margin-right:4px}#wy3U .svcs small{font:800 11.5px/1.35 system-ui}
#wy3U .svcs div.no{filter:grayscale(1) opacity(.45)}
#wy3U .goldcard{margin-top:6px;background:linear-gradient(#fff6dc,#f6dc9a);border:3px solid #d9a84e;border-radius:14px;padding:6px 10px;text-align:center;box-shadow:0 0 18px #f3d48c88}
#wy3U .goldcard b{display:block;font:900 16px 'Noto Serif TC',serif;color:#8a5a14}#wy3U .goldcard p{margin:2px 0 0;font:800 13px/1.45 system-ui;color:#4a3410}
#wy3U .big{width:100%;padding:13px;border-radius:14px;border:2px solid #c6a25d;background:#1f6b4f;color:#fff3d6;font-size:20px;font-weight:900;box-shadow:0 4px 0 #c6a25d;margin-top:8px}
#wy3U .row3{display:flex;gap:8px;margin-top:8px}#wy3U .row3 button{flex:1;padding:11px 6px;border-radius:12px;font-weight:900;font-size:15.5px;border:1.5px solid #c6a25d;background:#fff;color:#1f5a43}
`;
function ensure() {
  if (box) return; const st = document.createElement('style'); st.textContent = CSS; document.head.append(st);
  box = document.createElement('div'); box.id = 'wy3U'; document.body.append(box);
  box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const a = b.dataset.a; if (a === 'close') close(); else if (a === 'again') openPull(); else if (a === 'share') share() });
}
function stopAll() { cancelAnimationFrame(raf); timers.forEach(clearTimeout); timers = [] }
function close() { stopAll(); box.style.display = 'none'; box.innerHTML = '' }
function shell(title, inner) {
  box.innerHTML = `<div class="c"><div class="br"><img alt="德威陽國際法律事務所" src="${LOGO}"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div></div><img class="peek" id="uLin" alt="林律師" src="${LIN}"><button class="x" data-a="close" aria-label="關閉">×</button><div class="bd"><h3>${title}</h3>${inner}</div></div>`;
  box.style.display = 'flex';
}
const lin = k => { const e = box.querySelector('#uLin'); if (!e) return; e.classList.remove('nod', 'shake', 'yay'); void e.offsetWidth; e.classList.add(k) };
const say = t => { const e = box.querySelector('#uSay'); if (!e) return; e.innerHTML = '<b>林律師</b>' + esc(t); e.classList.remove('pop'); void e.offsetWidth; e.classList.add('pop') };
let S = null, R = null;
const LV = ['', '第一關　狂點拉開', '第二關　左右交替', '第三關　畫圈轉開'];
export function openPull() {
  ensure(); stopAll(); const B = best();
  shell('用力拉開抽屜', `<div class="stage" id="ust"><div class="meter"><u id="um"></u></div><div class="lv" id="ulv"></div><div class="tm" id="ut">${LIMIT.toFixed(1)}</div><div class="tray" id="utr"><em>已解鎖</em></div><div class="fv">狂熱時間！力道加倍</div><div class="plate" id="upl"><span>台美雙律師</span></div><div id="uscene"></div><div class="hint" id="uh"></div></div>
  <div class="say pop" id="uSay"><b>林律師</b>卷宗櫃有三層卡住了，${LIMIT} 秒內全部幫我打開！${B ? '（你的最佳 ' + B.toFixed(2) + ' 秒）' : ''}</div>`);
  S = { lv: 1, p: 0, started: false, t0: 0, done: false, taps: [], fever: false, boost: 0, side: '', ang: null, rot: 0, lastTurn: 0, bossShown: { 1: false, 2: false }, busy: false, got: [], first: Math.random() < .5 ? '民事' : '刑事' };
  scene(); const stage = box.querySelector('#ust'); let pi = 0;
  const cyc = () => { if (!S || S.done) return; const pl = box.querySelector('#upl'); if (!pl) return; pi = (pi + 1) % PLATE.length; pl.innerHTML = `<span class="in">${PLATE[pi]}</span>`; pl.classList.remove('sh'); void pl.offsetWidth; pl.classList.add('sh'); timers.push(setTimeout(cyc, 2200)) };
  timers.push(setTimeout(cyc, 2200));
  stage.addEventListener('pointerdown', down); stage.addEventListener('pointermove', move); stage.addEventListener('pointerup', () => S.ang = null);
  let last = performance.now();
  const loop = now => { const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (S.started && !S.done) { const el = (now - S.t0) / 1000, left = Math.max(0, LIMIT - el); const tm = box.querySelector('#ut'); if (tm) tm.textContent = left.toFixed(1);
      if (!S.busy) { if (S.lv < 3) S.p = Math.max(0, S.p - dt * .05); else if (now - S.lastTurn > 250) { S.p = Math.max(0, S.p - dt * .22); S.rot -= dt * 3 } }
      S.boost = Math.max(0, S.boost - dt); S.taps = S.taps.filter(t => now - t < 800); const fv = S.lv < 3 && S.taps.length >= 5; if (fv !== S.fever) { S.fever = fv; stage.classList.toggle('fever', fv) }
      if (!S.bossShown[S.lv] && S.lv < 3 && S.p > .3) { S.bossShown[S.lv] = true; boss() }
      if (left <= 0) { finish(false); return } }
    paint(); raf = requestAnimationFrame(loop) };
  raf = requestAnimationFrame(loop);
}
function scene() {
  const sc = box.querySelector('#uscene'), h = box.querySelector('#uh'); box.querySelector('#ulv').textContent = LV[S.lv];
  if (S.lv === 1) { const c = SVC[S.first][0]; sc.innerHTML = `<div class="cab"><div class="slot" style="top:12px"></div><div class="slot" style="top:84px"></div><div class="dr" id="d1" style="left:7px;right:7px;top:156px;height:80px;background:${c}">${S.first}<small>${SUBL[S.first]}</small></div></div>`; h.textContent = '狂點畫面開始！' }
  if (S.lv === 2) { sc.innerHTML = `<div class="cab"><div class="slot" style="top:12px"></div><div class="dr" id="d2a" style="left:7px;width:98px;top:84px;height:80px;background:${SVC.家事[0]}">家事<small>${SUBL.家事}</small></div><div class="dr" id="d2b" style="right:7px;width:98px;top:84px;height:80px;background:${SVC.企業[0]}">企業<small>${SUBL.企業}</small></div><div class="slot" style="top:172px;opacity:.5"></div></div><div class="lr"><span id="bl" class="next">左</span><span id="br" class="next">右</span></div>`; h.textContent = '' }
  if (S.lv === 3) { sc.innerHTML = `<div class="cab"><div class="dr gold" id="d3" style="left:7px;right:7px;top:12px;height:80px;font-size:20px">台美雙律師的榮譽<small style="font-size:13px">轉開就看得到</small></div></div><div class="dial" id="udial"><i></i><b>轉開它</b></div>`; h.textContent = '在轉盤上一直畫圈，停手會轉回去！' }
}
function paint() {
  const um = box.querySelector('#um'); if (!um) return; const p = S.p; um.style.width = ((S.lv - 1 + p) / 3 * 100) + '%';
  const tr = (id, k) => { const d = box.querySelector(id); if (d) d.style.transform = `translateY(${p * k}px) scale(${1 + p * .2})` };
  if (S.lv === 1) tr('#d1', 40); if (S.lv === 2) { tr('#d2a', 34); tr('#d2b', 34) }
  if (S.lv === 3) { const d = box.querySelector('#udial'); if (d) { d.style.transform = `rotate(${S.rot}rad)`; d.querySelector('b').style.transform = `rotate(${-S.rot}rad)` } { const g = box.querySelector('#d3'); if (g) g.style.transform = `scale(${1 + p * .12})` } }
}
function power() { return (S.fever ? 1.5 : 1) * (S.boost > 0 ? 2 : 1) }
function down(e) {
  e.preventDefault(); if (S.done || S.busy || e.target.closest('.boss')) return;
  if (!S.started) { S.started = true; S.t0 = performance.now(); if (S.lv === 1) box.querySelector('#uh').textContent = '' }
  const now = performance.now();
  if (S.lv === 1) { S.taps.push(now); add(1 / 20 * power(), S.first) }
  else if (S.lv === 2) { const r = box.querySelector('#ust').getBoundingClientRect(), side = e.clientX < r.left + r.width / 2 ? 'L' : 'R'; const b = box.querySelector(side === 'L' ? '#bl' : '#br'); b.classList.add('on'); timers.push(setTimeout(() => b.classList.remove('on'), 90));
    if (side === S.side) { note(160, 0, .08, .05, 'sawtooth'); say('卡卡的，兩手都要用！'); lin('shake'); return }
    S.side = side; S.taps.push(now); box.querySelector('#bl').classList.toggle('next', side === 'R'); box.querySelector('#br').classList.toggle('next', side === 'L'); add(1 / 22 * power(), side === 'L' ? '家事' : '企業') }
  else if (S.lv === 3) { S.ang = angle(e) }
}
function angle(e) { const d = box.querySelector('#udial'); if (!d) return null; const r = d.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) }
function move(e) {
  if (S.lv !== 3 || S.done || S.busy || S.ang == null) return; const a = angle(e); if (a == null) return;
  let d = a - S.ang; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; S.ang = a; if (Math.abs(d) < .005) return;
  if (!S.started) { S.started = true; S.t0 = performance.now() }
  S.rot += Math.abs(d); S.lastTurn = performance.now(); S.acc = (S.acc || 0) + Math.abs(d); if (S.acc > .9) { S.acc = 0; note(700 + S.p * 900, 0, .05, .04, 'square') }
  add(Math.abs(d) / (Math.PI * 2 * TURNS));
}
let cheer = -1;
function add(v, cat) {
  S.p = Math.min(1, S.p + v); if (S.lv < 3 && cat && Math.random() < .35) flyOne(FILES[cat][Math.floor(Math.random() * 4)], SVC[cat][0]);
  const c = S.p > .85 ? 3 : S.p > .55 ? 2 : S.p > .25 ? 1 : 0; if (c !== cheer) { cheer = c; say((S.lv === 3 ? ['轉！一直轉！', '別停手，會轉回去！', '快開了！', '最後一圈！'] : ['加油！', '有動了有動了！', '快了快了！', '最後一下！'])[c]); lin('nod') }
  if (S.lv < 3) note(330 + (S.lv - 1) * 200 + S.p * 700, 0, .06, .045, 'square');
  if (S.p >= 1) clear();
}
function boss() {
  const st = box.querySelector('#ust'); const b = document.createElement('div'); b.className = 'boss'; b.innerHTML = `<img src="${LIN}" alt="林律師">`; st.append(b);
  b.addEventListener('pointerdown', e => { e.stopPropagation(); e.preventDefault(); b.remove(); S.boost = 3; say('我也來拉！力道加倍！'); lin('yay'); [988, 1319, 1760].forEach((f, i) => note(f, i * .05, .12, .06)) });
  timers.push(setTimeout(() => b.remove(), 2900));
}
function flyOne(label, col) {
  const st = box.querySelector('#ust'); if (!st) return; const f = document.createElement('div'); f.className = 'fly'; f.textContent = label; f.style.background = col;
  f.style.left = (st.clientWidth / 2 - 30) + 'px'; f.style.top = '230px'; f.style.setProperty('--dx', (Math.random() * 280 - 140) + 'px'); f.style.setProperty('--dy', (-110 - Math.random() * 100) + 'px'); f.style.setProperty('--r', (Math.random() * 60 - 30) + 'deg');
  st.append(f); timers.push(setTimeout(() => f.remove(), 1100));
}
function chip(cat) { const t = box.querySelector('#utr'); if (!t) return; const i = document.createElement('i'); i.textContent = cat; i.style.background = SVC[cat][0]; t.append(i); S.got.push(cat) }
function clear() {
  S.busy = true; cheer = -1; const st = box.querySelector('#ust'); [523, 659, 784, 1047].forEach((f, i) => note(f, i * .05, .16, .06));
  if (S.lv < 3) { const cats = S.lv === 1 ? [S.first] : ['家事', '企業']; cats.forEach((c, k) => timers.push(setTimeout(() => chip(c), 150 + k * 180))); for (let i = 0; i < 8; i++) timers.push(setTimeout(() => { const c = cats[i % cats.length]; flyOne(FILES[c][i % 4], SVC[c][0]) }, i * 40));
    say(S.lv === 1 ? `${S.first}開了！下一層要兩手交替。` : '家事、企業都開了！最後是金色保險櫃。'); lin('yay');
    timers.push(setTimeout(() => { S.lv++; S.p = 0; S.side = ''; S.taps = []; S.fever = false; st.classList.remove('fever'); S.busy = false; scene() }, 650)) }
  else finish(true);
}
function finish(ok) {
  S.done = true; cancelAnimationFrame(raf); const el = S.started ? (performance.now() - S.t0) / 1000 : LIMIT; box.querySelector('#ust').classList.remove('fever');
  if (ok) { say('保險櫃打開了！'); lin('yay'); for (let i = 0; i < 14; i++) timers.push(setTimeout(() => { const c = ['民事', '刑事', '家事', '企業'][i % 4]; flyOne(FILES[c][i % 4], SVC[c][0]) }, i * 45)) } else { say('時間到！差一點點。'); lin('shake'); note(220, 0, .2, .05, 'sine') }
  const B = best(); let rec = '';
  if (ok) { if (!B || el < B) { try { localStorage.setItem(KEY, el.toFixed(2)) } catch (e) { } rec = '<span class="rec">新紀錄！</span>' } else rec = `<span class="rec" style="background:#1f6b4f">離最佳只差 ${(el - B).toFixed(2)} 秒</span>` }
  R = { ok, el, lv: S.lv, got: S.got.slice(), honor: ok ? HONOR[Math.floor(Math.random() * HONOR.length)] : null };
  timers.push(setTimeout(() => {
    const title = !ok ? (S.lv === 3 ? '只差保險櫃' : S.lv === 2 ? '卡在第二關' : '再用力一點') : el <= 10 ? '怪力神助手' : el <= 14 ? '拉抽屜高手' : '順利全開';
    const all = [S.first, '家事', '企業'];
    shell('用力拉開抽屜', `<div class="end"><b>${title}</b><p>${ok ? `用了 ${el.toFixed(2)} 秒，三關全部打開！` : `打到${['', '第一關', '第二關', '第三關'][S.lv]}，再來一次就能全開！`}</p>${rec}</div>
    <div class="svcs">${all.map(c => `<div class="${R.got.includes(c) ? '' : 'no'}" style="background:${SVC[c][0]}"><b>${c}</b><small>${SVC[c][1]}</small></div>`).join('')}<div class="${ok ? '' : 'no'}" style="background:linear-gradient(#d9a84e,#b8862f)"><b>保險櫃</b><small>林柏均律師的榮譽卡</small></div></div>
    ${R.honor ? `<div class="goldcard"><b>榮譽卡｜${esc(R.honor[0])}</b><p>${esc(R.honor[1])}</p></div>` : ''}
    <button class="big" data-a="again">再拉一次</button>
    <div class="wy"><b>德威陽怎麼幫您？</b>${esc(HELP[lastH = pickI(HELP.length, lastH)])}</div>
    <div class="row3"><button data-a="share">分享成績卡</button><button data-a="close">回到辦公室</button></div>`); lin(ok ? 'yay' : 'nod')
  }, ok ? 1300 : 700));
}
async function share() {
  const c = document.createElement('canvas'); c.width = 900; c.height = 900; const g = c.getContext('2d');
  const gr = g.createRadialGradient(450, 380, 60, 450, 450, 640); gr.addColorStop(0, '#2a8a63'); gr.addColorStop(1, '#0f3d2b'); g.fillStyle = gr; g.fillRect(0, 0, 900, 900); g.strokeStyle = '#e0b64e'; g.lineWidth = 16; g.strokeRect(24, 24, 852, 852);
  const img = src => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src });
  const [lg, ln] = await Promise.all([img(LOGO), img(LIN)]);
  g.fillStyle = '#fff'; g.beginPath(); g.arc(160, 150, 80, 0, 7); g.fill(); if (lg) g.drawImage(lg, 95, 85, 130, 130); if (ln) g.drawImage(ln, 600, 60, 240, 277);
  g.fillStyle = '#f6dc9a'; g.textAlign = 'center'; g.font = '900 72px "Noto Serif TC",serif'; g.fillText('用力拉開抽屜', 450, 430);
  g.font = '900 110px Georgia,serif'; g.fillText(R && R.ok ? R.el.toFixed(2) + ' 秒' : '挑戰中', 450, 590);
  g.font = '800 40px system-ui'; g.fillStyle = '#fff3d6'; g.fillText('你能比我更快打開嗎？', 450, 670);
  g.font = '800 38px system-ui'; g.fillText('德威陽國際法律事務所', 450, 780); g.font = '700 32px system-ui'; g.fillText(LINE, 450, 830);
  const url = c.toDataURL('image/jpeg', .9);
  try { const b = await (await fetch(url)).blob(); const f = new File([b], '德威陽成績卡.jpg', { type: 'image/jpeg' }); if (navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: '德威陽｜用力拉開抽屜', text: '我在德威陽 3D 探索島挑戰拉抽屜，你能比我快嗎？ https://weiyanglaw.github.io/yeswedo/' }); return } } catch (e) { if (e && e.name === 'AbortError') return }
  const a = document.createElement('a'); a.href = url; a.download = '德威陽成績卡.jpg'; document.body.append(a); a.click(); a.remove();
}
