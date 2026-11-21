// 3F 林律師辦公室：大書桌「用印節奏大師」（節奏）＋卷宗櫃「證據拼圖」（拖動拼圖）
// 用法：import {openStamp,openPuzzle} from './wy-3f-play.js';
const LINE = 'LINE @wylaw ｜ weiandyang.com';
const LOGO = './office-logo-transparent.png', LIN = './full-wyF.png', HONOR = './pz-honor.jpg';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pickI = (n, last) => { let i; do { i = Math.floor(Math.random() * n) } while (i === last && n > 1); return i };
const HELP_S = ['擬定委任契約，寫清楚處理範圍與進度回報。每一份文件，都由林柏均律師親自把關。', '擬定存證信函，把主張與期限說清楚。第一封信寫得好，後面就少很多爭議。', '審閱股東會與董事會文件，盤點程序上的風險。前上市公司法務長，熟悉公司治理實務。', '擬定和解書，把付款方式與違約責任寫明白。和解要談得成，也要守得住。', '擬定保密協議，界定資訊範圍與使用限制。企業實務經驗，條款寫得到位。', '審閱租賃契約，比對押金、修繕與提前解約條款。簽名之前，先把風險看清楚。', '擬定授權書與委託文件，確認授權範圍。文件精準，辦事才順。', '審閱跨國代理契約，盤點準據法與爭議處理條款。台美雙律師，熟悉兩地交易習慣。'];
const HELP_P = ['整理散落的對話、匯款與照片，拼出完整的事實經過。證據排對順序，主張才有說服力。', '盤點手上的證據，評估還缺哪一塊。舉證要早準備，開庭才不慌。', '比對各方說法與文件，找出前後不一致的地方。細節裡，常常藏著關鍵。', '保存電子訊息與原始檔案，規劃證據的提出方式。原始資料，比截圖更有份量。', '評估證人與證物的份量，安排舉證順序。證據放對位置，說服力更完整。', '整理就醫、事故與損害資料，擬定求償依據。金額有依據，主張才站得住。', '分析對方提出的證據，規劃反駁重點。看懂對方的牌，才知道怎麼出手。', '盤點合約往來與履約紀錄，評估違約責任。紀錄完整，談判更有底氣。'];
let lastHS = -1, lastHP = -1, box, ac;
function au() { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); return ac } catch (e) { return null } }
function note(f, t, d = .18, v = .07, type = 'triangle') { const a = au(); if (!a) return; const o = a.createOscillator(), g = a.createGain(), n = a.currentTime + Math.max(0, t); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0, n); g.gain.linearRampToValueAtTime(v, n + .012); g.gain.exponentialRampToValueAtTime(.0005, n + d); o.connect(g).connect(a.destination); o.start(n); o.stop(n + d + .05) }
const CSS = `
#wy3P{position:fixed;inset:0;z-index:132;display:none;align-items:center;justify-content:center;padding:10px;background:radial-gradient(circle at 50% 30%,#1f6b4fdd,#0b241bf0);font-family:system-ui,'Noto Sans TC',sans-serif;-webkit-user-select:none;user-select:none;touch-action:none}
#wy3P .c{position:relative;width:min(97vw,440px);margin-top:56px;background:#fff;border:3px solid #d9b25f;border-radius:22px;box-shadow:0 0 0 6px #f3d48c55,0 20px 60px #0009;box-sizing:border-box}
#wy3P .br{display:flex;align-items:center;gap:9px;padding:7px 10px;border-bottom:1px solid #ecd3a8}
#wy3P .br img{width:32px;height:32px;object-fit:contain;border:2px solid #d3aa67;border-radius:9px}
#wy3P .br div{flex:1;min-width:0;padding-right:84px}#wy3P .br b{display:block;font-size:15.5px;color:#1f3b2f}#wy3P .br small{font-size:10px;color:#a07d45}
#wy3P .peek{position:absolute;right:-6px;top:-74px;width:108px;height:108px;object-fit:contain;z-index:5;transform-origin:50% 95%;filter:drop-shadow(0 4px 6px #0005);transition:transform .3s}
#wy3P .peek.nod{animation:pNod .45s ease}#wy3P .peek.shake{animation:pShake .4s ease}#wy3P .peek.yay{animation:pYay .8s ease 2}
@keyframes pNod{40%{transform:translateY(-12px)}}@keyframes pShake{25%{transform:rotate(-10deg)}75%{transform:rotate(10deg)}}@keyframes pYay{30%{transform:translateY(-20px) rotate(-8deg)}60%{transform:translateY(0) rotate(8deg)}}
#wy3P .x{position:absolute;left:8px;top:-46px;box-shadow:0 2px 6px #0004;border:0;background:#e9f3ee;color:#1f5a43;font-size:20px;width:34px;height:34px;border-radius:10px;font-weight:700}
#wy3P .bd{padding:8px 11px 11px}
#wy3P h3{margin:2px 0 2px;text-align:center;font:900 24px 'Noto Serif TC','Songti TC',serif;color:#1f5a43}
#wy3P .sub{text-align:center;font-size:15px;font-weight:700;color:#4c6a5e;margin:0 0 8px;line-height:1.5}
#wy3P .say{background:#eef7f2;border:2px solid #9fd2b9;border-radius:14px;padding:7px 11px;font-size:16px;font-weight:700;color:#17402f;line-height:1.45;margin:8px 0 0;min-height:24px}
#wy3P .say b{display:block;font-size:12.5px;color:#2e8a62}
#wy3P .say.pop{animation:pPop .35s cubic-bezier(.3,1.5,.5,1)}@keyframes pPop{0%{transform:scale(.9);opacity:.3}100%{transform:none;opacity:1}}
#wy3P .wy{margin-top:9px;background:#FDE3C8;border:2px solid #E9B98A;border-left:6px solid #C6A25D;border-radius:12px;padding:10px 12px;color:#5A3216;font-weight:700;font-size:15.5px;line-height:1.5}
#wy3P .wy>b{display:block;font-size:19px;font-weight:900;margin-bottom:3px;color:#8A3D10}
#wy3P .wy:after{content:"${LINE}";display:block;margin-top:4px;padding-top:4px;border-top:1px dashed currentColor;font-size:15px;font-weight:800;color:#8A3D10}
#wy3P .btns{display:flex;gap:8px;margin-top:9px}
#wy3P .btns button,#wy3P .go{flex:1;padding:12px 6px;border-radius:12px;font-weight:900;font-size:17px;border:1.5px solid #c6a25d;touch-action:manipulation}
#wy3P .a,#wy3P .go{background:#1f6b4f;color:#fff3d6;box-shadow:0 3px 0 #c6a25d}#wy3P .b{background:#fff;color:#1f5a43}
#wy3P .go{width:100%;font-size:19px;padding:15px}
#wy3P .end{text-align:center;background:linear-gradient(#fff8e1,#fff);border:2px solid #f0c95a;border-radius:14px;padding:12px;margin:2px 0 0}
#wy3P .end b{display:block;font:900 26px 'Noto Serif TC',serif;color:#b0782a;margin-bottom:4px}
#wy3P .end p{margin:0;font-size:16px;line-height:1.6;color:#3a3a2c;font-weight:700}
/* 用印 */
#wy3P .rh{position:relative;height:250px;border-radius:16px;overflow:hidden;background:linear-gradient(#f4ead2,#e9d7b0);border:3px solid #c9963c;box-shadow:inset 0 -14px 0 #c9963c55}
#wy3P .lane{position:absolute;left:0;right:0;top:92px;height:96px;background:repeating-linear-gradient(90deg,#d9c08a33 0 40px,transparent 40px 80px)}
#wy3P .ring{position:absolute;left:58px;top:84px;width:112px;height:112px;margin-left:-0px;border-radius:50%;border:6px solid #e0b64e;box-shadow:0 0 0 4px #fff8,0 0 20px #f3d48c;box-sizing:border-box}
#wy3P .ring.hit{animation:pRing .25s ease}@keyframes pRing{50%{transform:scale(1.12);border-color:#f7d36a}}
#wy3P .doc{position:absolute;top:96px;width:84px;height:88px;margin-left:-42px;background:#fff;border:2px solid #cdb07a;border-radius:6px;box-shadow:0 4px 0 #0002;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:8px;box-sizing:border-box;font:900 13px/1.25 'Noto Serif TC',serif;color:#1f3b2f;text-align:center}
#wy3P .doc i{display:block;width:60%;height:4px;background:#e2d6bd;border-radius:2px;margin-top:5px}
#wy3P .doc .seal{position:absolute;right:4px;bottom:4px;width:40px;height:40px;border:3px solid #d2443f;border-radius:50%;color:#d2443f;font:900 11px/1.1 'Noto Serif TC',serif;display:flex;align-items:center;justify-content:center;transform:scale(0) rotate(-12deg);opacity:0;background:#fff4f2}
#wy3P .doc.done .seal{transform:scale(1) rotate(-12deg);opacity:.92;transition:transform .18s cubic-bezier(.3,1.8,.5,1)}
#wy3P .doc.miss{opacity:.45}
#wy3P .stamp{position:absolute;left:84px;top:6px;width:60px;height:80px;margin-left:-0px;transition:transform .09s}
#wy3P .stamp.down{transform:translateY(64px)}
#wy3P .stamp b{display:block;width:30px;height:44px;margin:0 auto;background:linear-gradient(90deg,#8a5a2b,#c08850,#8a5a2b);border-radius:10px 10px 4px 4px}
#wy3P .stamp s{display:block;width:56px;height:20px;background:linear-gradient(#e0b64e,#b98a2c);border-radius:6px;text-decoration:none}
#wy3P .stamp u{display:block;width:52px;height:8px;margin:0 auto;background:#d2443f;border-radius:0 0 4px 4px}
#wy3P .judge{position:absolute;left:114px;top:50px;font:900 22px 'Noto Serif TC',serif;color:#d2443f;opacity:0;transform:translateY(6px);pointer-events:none;white-space:nowrap}
#wy3P .judge.on{animation:pJ .6s ease forwards}@keyframes pJ{0%{opacity:0;transform:translateY(8px) scale(.8)}20%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-16px)}}
#wy3P .hud{position:absolute;right:10px;top:8px;font:900 15px system-ui;color:#5a3a10;background:#fff9;padding:3px 9px;border-radius:999px}
#wy3P .bar{position:absolute;left:10px;right:10px;bottom:10px;height:8px;border-radius:5px;background:#fff8;overflow:hidden}#wy3P .bar u{display:block;height:100%;width:0;background:#1f6b4f}
#wy3P .tap{position:absolute;left:0;right:0;bottom:24px;text-align:center;font:900 15px system-ui;color:#5a3a10}
/* 拼圖 */
#wy3P .pz{position:relative;width:min(84vw,330px);aspect-ratio:1;margin:0 auto;border-radius:12px;border:4px solid #c9963c;background:#1f3b2f;display:grid;grid-template-columns:repeat(3,1fr);gap:2px;padding:2px;box-sizing:border-box;box-shadow:0 0 16px #f3d48c88}
#wy3P .pc{background-size:300% 300%;border-radius:6px;touch-action:none;cursor:grab;transition:transform .12s,box-shadow .12s}
#wy3P .pc.sel{transform:scale(.92);box-shadow:0 0 0 3px #f3d48c,0 0 12px #f3d48c}
#wy3P .pc.ok{box-shadow:inset 0 0 0 2px #f3d48c88}
#wy3P .pz.done{gap:0;padding:0}#wy3P .pz.done .pc{border-radius:0;box-shadow:none}
#wy3P .ghost{position:fixed;pointer-events:none;z-index:200;border-radius:6px;background-size:300% 300%;opacity:.92;box-shadow:0 10px 24px #0006;transform:scale(1.06)}
#wy3P .pzt{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 0 7px}
#wy3P .pzt img{width:58px;height:58px;border-radius:8px;border:2px solid #e2c27e;object-fit:cover}
#wy3P .pzt span{flex:1;font:800 14.5px system-ui;color:#4c6a5e;line-height:1.4}
#wy3P .pzt b{font:900 18px system-ui;color:#1f5a43;min-width:52px;text-align:right}
`;
function ensure() {
  if (box) return; const st = document.createElement('style'); st.textContent = CSS; document.head.append(st);
  box = document.createElement('div'); box.id = 'wy3P'; document.body.append(box);
  box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const a = b.dataset.a;
    if (a === 'close') close(); else if (a === 'sgo') stampGo(); else if (a === 'stamp') openStamp(); else if (a === 'pz') openPuzzle(); });
}
function close() { stopAll(); box.style.display = 'none'; box.innerHTML = '' }
function shell(title, sub, inner) {
  box.innerHTML = `<div class="c"><div class="br"><img alt="德威陽國際法律事務所" src="${LOGO}"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div></div><img class="peek" id="pLin" alt="林律師" src="${LIN}"><button class="x" data-a="close" aria-label="關閉">×</button><div class="bd"><h3>${title}</h3>${sub ? `<p class="sub">${sub}</p>` : ''}${inner}</div></div>`;
  box.style.display = 'flex';
}
const lin = k => { const e = box.querySelector('#pLin'); if (!e) return; e.classList.remove('nod', 'shake', 'yay'); void e.offsetWidth; e.classList.add(k) };
const say = t => { const e = box.querySelector('#pSay'); if (!e) return; e.innerHTML = '<b>林律師</b>' + esc(t); e.classList.remove('pop'); void e.offsetWidth; e.classList.add('pop') };
let raf = 0, timers = [];
function stopAll() { cancelAnimationFrame(raf); timers.forEach(clearTimeout); timers = []; if (pz && pz.tick) clearInterval(pz.tick) }

// ---------- 用印節奏大師 ----------
const DOCS = ['委任契約', '存證信函', '股東會議紀錄', '和解書', '保密協議', '租賃契約', '授權書', '跨國代理契約', '勞動契約', '董事會議事錄', '合夥契約', '律師函'];
const BPM = 112, BEAT = 60 / BPM;
// 節拍譜（第幾拍出文件）：前段簡單、後段加快，約 15 秒
const CHART = [2, 4, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26];
const MEL = [784, 659, 784, 880, 784, 659, 587, 659, 784, 659, 784, 988, 880, 784, 659, 587];
let rs = null;
export function openStamp() {
  ensure(); stopAll();
  shell('用印節奏大師', '文件跟著音樂送過來，<br>到金色圈圈時點一下蓋章！', `<div class="say pop" id="pSay"><b>林律師</b>今天桌上的文件有點多，幫我跟著節奏一起蓋章吧！</div><div class="btns" style="margin-top:12px"><button class="go" data-a="sgo">開始用印</button></div>`);
}
function stampGo() {
  stopAll(); const a = au();
  shell('用印節奏大師', '', `<div class="rh" id="rh"><div class="lane"></div><div class="ring" id="ring"></div><div class="stamp" id="stp"><b></b><s></s><u></u></div><div class="judge" id="jd"></div><div class="hud" id="hud">準備</div><div class="bar"><u id="pbar"></u></div><div class="tap">點畫面任何地方蓋章</div></div><div class="say" id="pSay"><b>林律師</b>聽好節奏，三、二、一！</div>`);
  const rh = box.querySelector('#rh'), W = rh.clientWidth, HIT = 114, SPEED = (W + 60 - HIT) / (BEAT * 2.5); // 文件提早 2.5 拍出現，間距不重疊
  const t0 = (a ? a.currentTime : performance.now() / 1000) + .6;
  const now = () => (a ? a.currentTime : performance.now() / 1000) - t0;
  rs = { notes: CHART.map((b, k) => ({ t: b * BEAT, label: DOCS[(k * 5 + Math.floor(Math.random() * DOCS.length)) % DOCS.length], el: null, done: false, res: null })), perfect: 0, good: 0, ok: 0, miss: 0, combo: 0, end: (CHART[CHART.length - 1] + 2) * BEAT };
  // 背景音樂：可愛木琴旋律＋輕低音（動森風）
  if (a) { const total = Math.ceil(rs.end / BEAT) + 1; for (let i = 0; i < total; i++) { const tt = t0 - a.currentTime + i * BEAT; note(MEL[i % MEL.length], tt, .22, .045, 'triangle'); if (i % 2 === 0) note(MEL[i % MEL.length] / 4, tt, .3, .05, 'sine'); if (i % 4 === 3) note(1568, tt + BEAT / 2, .08, .02, 'square') } [0, 1, 2].forEach(k => note(523, t0 - a.currentTime - (3 - k) * BEAT, .1, .04, 'square')) }
  rs.notes.forEach(n => { const d = document.createElement('div'); d.className = 'doc'; d.innerHTML = esc(n.label) + '<i></i><i style="width:45%"></i><div class="seal">德威陽<br>有法度</div>'; d.style.left = (W + 60) + 'px'; rh.append(d); n.el = d });
  const judge = (txt, col) => { const j = box.querySelector('#jd'); j.textContent = txt; j.style.color = col; j.classList.remove('on'); void j.offsetWidth; j.classList.add('on') };
  const hud = () => { box.querySelector('#hud').textContent = rs.combo > 2 ? '連擊 ' + rs.combo : '用印中' };
  const hit = () => {
    const tt = now(), stp = box.querySelector('#stp'); stp.classList.add('down'); timers.push(setTimeout(() => stp && stp.classList.remove('down'), 110));
    let best = null, bd = 9; for (const n of rs.notes) { if (n.done) continue; const d = Math.abs(n.t - tt); if (d < bd) { bd = d; best = n } }
    if (!best || bd > .3) { note(196, 0, .08, .03, 'sine'); rs.combo = 0; judge('太早了', '#6a7d74'); hud(); return }
    if (bd > .14) { if (tt < best.t) { note(196, 0, .08, .03, 'sine'); rs.combo = 0; judge('太早了', '#6a7d74'); hud(); return } }
    best.done = true; best.el.classList.add('done'); box.querySelector('#ring').classList.remove('hit'); void box.offsetWidth; box.querySelector('#ring').classList.add('hit');
    if (bd < .045) { rs.perfect++; rs.combo++; judge('完美！', '#d2443f'); note(1319, 0, .12, .07); note(1760, .04, .14, .05); lin('nod') }
    else if (bd < .09) { rs.good++; rs.combo++; judge('很好', '#c9963c'); note(1175, 0, .12, .06) }
    else { rs.ok++; rs.combo = 0; judge('差一點', '#6a7d74'); note(880, 0, .1, .05) }
    hud(); const lines = { 3: '節奏感不錯喔！', 6: '這速度，可以來事務所上班了。', 10: '蓋得又快又準，文件都整齊了。', 14: '連擊停不下來！' }; if (lines[rs.combo]) say(lines[rs.combo]);
  };
  rh.addEventListener('pointerdown', e => { e.preventDefault(); hit() });
  const loop = () => {
    const tt = now(); const p = Math.max(0, Math.min(1, tt / rs.end)); box.querySelector('#pbar').style.width = (p * 100) + '%';
    if (tt > -.1 && box.querySelector('#hud').textContent === '準備') box.querySelector('#hud').textContent = '用印中';
    for (const n of rs.notes) { const x = HIT + (n.t - tt) * SPEED; n.el.style.left = x + 'px'; if (!n.done && tt - n.t > .14) { n.done = true; n.res = 'miss'; rs.miss++; rs.combo = 0; n.el.classList.add('miss'); lin('shake'); hud() } }
    if (tt > rs.end) { stampEnd(); return } raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
}
function stampEnd() {
  const tot = rs.notes.length, acc = (rs.perfect * 1 + rs.good * .75 + rs.ok * .4) / tot;
  const t = acc >= .85 ? ['用印大師', '每一份文件都蓋得又正又準，林律師說：桌上的文件交給你，我很放心。'] : acc >= .6 ? ['用印好手', '節奏抓得很穩，林律師說：再多練一次，就能挑戰用印大師。'] : ['用印見習生', '文件有點多，林律師說：別急，先聽音樂抓拍子，再來一次。'];
  shell('用印節奏大師', '', `<div class="end"><b>${t[0]}</b><p>完美 ${rs.perfect}　很好 ${rs.good}　差一點 ${rs.ok}<br>${esc(t[1])}</p></div><div class="wy"><b>德威陽怎麼幫您？</b>${esc(HELP_S[lastHS = pickI(HELP_S.length, lastHS)])}</div><div class="btns"><button class="a" data-a="sgo">再蓋一次</button><button class="b" data-a="close">回到辦公室</button></div>`);
  lin(acc >= .5 ? 'yay' : 'nod'); [784, 988, 1175, 1568].forEach((f, i) => note(f, i * .09, .2, .06));
}

// ---------- 證據拼圖 ----------
let pz = null, lastImg = -1;
function makeImgs() {
  const mk = draw => { const c = document.createElement('canvas'); c.width = c.height = 600; draw(c.getContext('2d')); return c.toDataURL('image/jpeg', .9) };
  const logo = new Image(); logo.src = LOGO; const linI = new Image(); linI.src = LIN;
  return new Promise(res => { let n = 0; const ok = () => { if (++n < 2) return;
    const a = mk(g => { const gr = g.createRadialGradient(300, 260, 40, 300, 300, 420); gr.addColorStop(0, '#2a8a63'); gr.addColorStop(1, '#0f3d2b'); g.fillStyle = gr; g.fillRect(0, 0, 600, 600); g.strokeStyle = '#e0b64e'; g.lineWidth = 14; g.strokeRect(22, 22, 556, 556); g.fillStyle = '#fff'; g.beginPath(); g.arc(300, 230, 130, 0, 7); g.fill(); g.drawImage(logo, 185, 115, 230, 230); g.fillStyle = '#f6dc9a'; g.textAlign = 'center'; g.font = '900 48px "Noto Serif TC",serif'; g.fillText('德威陽國際法律事務所', 300, 435); g.font = '900 60px "Noto Serif TC",serif'; g.fillText('YES, WE DO! 有法度', 300, 515) });
    const b = mk(g => { const gr = g.createLinearGradient(0, 0, 0, 600); gr.addColorStop(0, '#fff6dc'); gr.addColorStop(1, '#f3d48c'); g.fillStyle = gr; g.fillRect(0, 0, 600, 600); g.fillStyle = '#1f6b4f'; g.fillRect(0, 430, 600, 170); g.drawImage(linI, 150, 40, 300, 346); g.fillStyle = '#fff3d6'; g.textAlign = 'center'; g.font = '900 54px "Noto Serif TC",serif'; g.fillText('林柏均律師', 300, 500); g.font = '800 34px system-ui'; g.fillText('台灣律師｜美國紐約州律師', 300, 556) });
    res([HONOR, a, b]) }; logo.onload = logo.onerror = ok; linI.onload = linI.onerror = ok });
}
let IMGS = null;
const PZ_DONE = ['拼好了！這張是林柏均律師榮獲 2026 台北律師公會優秀公益律師的畫面。', '拼好了！德威陽國際法律事務所，有法度。', '拼好了！林柏均律師，同時具備台灣與美國紐約州律師資格。'];
export async function openPuzzle() {
  ensure(); stopAll(); if (!IMGS) IMGS = await makeImgs();
  const k = lastImg = pickI(IMGS.length, lastImg), src = IMGS[k];
  let order; do { order = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - .5) } while (order.filter((v, i) => v === i).length > 2);
  shell('證據拼圖', '卷宗櫃裡的照片被撕成九塊，<br>拖動交換，把它拼回去！', `<div class="pzt"><img src="${src}" alt="完成圖"><span>右邊小圖是完成的樣子</span><b id="pzT">0 秒</b></div><div class="pz" id="pz">${order.map((p, i) => `<div class="pc" data-i="${i}"></div>`).join('')}</div><div class="say" id="pSay"><b>林律師</b>證據要一塊塊拼起來，事實才會完整。</div>`);
  pz = { order, src, k, sec: 0, done: false }; draw();
  pz.tick = setInterval(() => { if (pz.done) return; pz.sec++; const t = box.querySelector('#pzT'); if (t) t.textContent = pz.sec + ' 秒' }, 1000);
  const grid = box.querySelector('#pz'); let drag = null;
  grid.addEventListener('pointerdown', e => { const c = e.target.closest('.pc'); if (!c || pz.done) return; e.preventDefault(); const i = +c.dataset.i; const r = c.getBoundingClientRect();
    const g = document.createElement('div'); g.className = 'ghost'; g.style.width = r.width + 'px'; g.style.height = r.height + 'px'; g.style.backgroundImage = c.style.backgroundImage; g.style.backgroundPosition = c.style.backgroundPosition; document.body.append(g);
    drag = { i, g, w: r.width, h: r.height }; c.classList.add('sel'); move(e); note(988, 0, .06, .04) });
  const move = e => { if (!drag) return; drag.g.style.left = (e.clientX - drag.w / 2) + 'px'; drag.g.style.top = (e.clientY - drag.h / 2) + 'px' };
  addEventListener('pointermove', move);
  const up = e => { if (!drag) return; const g = drag.g; g.remove(); const tgt = document.elementFromPoint(e.clientX, e.clientY); const c = tgt && tgt.closest && tgt.closest('#wy3P .pc'); const from = drag.i; box.querySelectorAll('.pc').forEach(x => x.classList.remove('sel')); drag = null;
    if (!c) return; const to = +c.dataset.i; if (to === from) return; [pz.order[from], pz.order[to]] = [pz.order[to], pz.order[from]]; draw(); note(1175, 0, .08, .05);
    if (pz.order[to] === to) { lin('nod'); note(1568, .05, .1, .04) }
    if (pz.order.every((v, i) => v === i)) pzEnd() };
  addEventListener('pointerup', up); addEventListener('pointercancel', up);
}
function draw() { box.querySelectorAll('#wy3P .pc').forEach((c, i) => { const p = pz.order[i]; c.style.backgroundImage = `url(${pz.src})`; c.style.backgroundPosition = `${(p % 3) * 50}% ${Math.floor(p / 3) * 50}%`; c.classList.toggle('ok', p === i) }) }
function pzEnd() {
  pz.done = true; clearInterval(pz.tick); box.querySelector('#pz').classList.add('done'); lin('yay'); [659, 784, 988, 1319].forEach((f, i) => note(f, i * .1, .22, .06));
  timers.push(setTimeout(() => {
    const t = pz.sec <= 20 ? '拼圖高手' : pz.sec <= 40 ? '細心的偵探' : '耐心滿分';
    shell('證據拼圖', '', `<div class="end"><b>${t}</b><p>用了 ${pz.sec} 秒拼完。<br>${esc(PZ_DONE[pz.k])}</p></div><div class="pzt" style="justify-content:center;margin-top:8px"><img src="${pz.src}" alt="" style="width:120px;height:120px"></div><div class="wy"><b>德威陽怎麼幫您？</b>${esc(HELP_P[lastHP = pickI(HELP_P.length, lastHP)])}</div><div class="btns"><button class="a" data-a="pz">再拼一張</button><button class="b" data-a="close">回到辦公室</button></div>`); lin('yay')
  }, 1300));
}
