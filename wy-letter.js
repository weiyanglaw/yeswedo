// v509 互動視窗統一外框「德威陽信紙」（陳老闆 2026-11-21 定案 E 款，印章改麥穗）
// 只換外框：Logo 信頭＋事務所名、右上島色郵票、奶油信紙、右側一株麥穗、底部署名條、金色圓鈕關閉
// 內容、遊戲、按鈕功能完全不動；大法官席（wyJustice）永遠照定稿，不套用
const GOLD = 'linear-gradient(#FFEFB8,#E9C46A 35%,#C08A2E 70%,#F3D27A)';
const ISLE = {
  lit: ['訴訟島', '#EF9B6B', '#B85733'], med: ['醫療島', '#5CBF9B', '#25725A'], fam: ['家庭島', '#D46F84', '#8A2C46'],
  biz: ['企業島', '#9A80D0', '#563C8C'], know: ['知識島', '#3C93B6', '#1F5F78'], castle: ['事務所', '#3F63B5', '#1A2C66'],
};
// 視窗外層 id → 島
const MAP = { wyBench: 'lit', wyJusticeLink: 'lit', wyJustice: 'lit', 'wy-lit-games': 'lit', wyLitigationInfo433: 'lit', wyFee: 'lit', wyFiling: 'lit', wyMediation: 'lit', wyMedicalExperience: 'med', wyMedRecords: 'med', wyFamPlay: 'fam', wyFamilyExperience: 'fam', wy410BusinessPanel: 'biz', wyRC: null, wy3MovieModal: 'castle', wy317Overlay: 'castle', wyLF: 'castle', wy3M: 'castle', wy3P: 'castle', wy3U: 'castle', wy3B: 'castle', wy3L: 'castle', wy3F: 'castle', wyLobbyDialog: 'castle', wyInfo: null };
const SKIP = new Set([]); /* v515 陳老闆：訴訟島全部用信紙外框，大法官席、正義女神也一樣 */
const GR = 'M0,-8 C3.4,-5 3.6,2.5 0,6.5 C-3.6,2.5 -3.4,-5 0,-8Z';
function wheatSVG() {
  const P = []; for (let k = 0; k <= 50; k++) { const t = k / 50; P.push([10 + 4 * Math.sin(t * 2), 70 - 60 * t]); }
  let s = `<path d="M${P.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L')}" stroke="#C9963C" stroke-width="1.6" fill="none"/>`;
  for (let i = 3; i < P.length - 3; i += 6) { const [x, y] = P[i], [x2, y2] = P[i + 2]; const d = Math.atan2(y2 - y, x2 - x) * 180 / Math.PI; const sc = 1.3 - .35 * i / P.length;
    for (const side of [1, -1]) { const a = d + side * 32, ar = a * Math.PI / 180; s += `<path d="${GR}" fill="url(#wlg)" stroke="#A47729" stroke-width=".5" transform="translate(${(x + 6 * sc * Math.cos(ar)).toFixed(1)} ${(y + 6 * sc * Math.sin(ar)).toFixed(1)}) rotate(${(a + 90).toFixed(0)}) scale(${sc.toFixed(2)})"/>`; } }
  return `<svg width="30" height="80" viewBox="0 0 30 80"><defs><linearGradient id="wlg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF1C2"/><stop offset=".5" stop-color="#E7BF66"/><stop offset="1" stop-color="#B98A34"/></linearGradient></defs>${s}</svg>`;
}
const imp = (n, o) => { if (n) for (const k in o) n.style.setProperty(k, o[k], 'important'); };
function islandNow() { try { const f = window.__wyIsleOf; if (f) return f(); } catch (e) { } return 'castle'; }
function panelOf(shell) {
  // 外層本身就是卡片（不是全螢幕暗底）就直接用；否則找裡面最大的那張卡片
  /* v523 已套過外框就沿用同一張，避免視窗變高後又在內層再套一層 */
  if (shell.dataset.wyLetter) return shell; { const d = shell.querySelector('[data-wy-letter]'); if (d) return d; }
  const r0 = shell.getBoundingClientRect(); if (r0.width < innerWidth * .97 || r0.height < innerHeight * .9) return shell;
  const kids = [...shell.children].filter(n => n.nodeType === 1 && n.tagName !== 'STYLE' && n.tagName !== 'SCRIPT');
  const withBtn = kids.filter(n => n.querySelector('button')); const pool = withBtn.length ? withBtn : kids;
  let best = null, area = 0; for (const n of pool) { const r = n.getBoundingClientRect(); if (r.width * r.height > area) { area = r.width * r.height; best = n; } }
  return area > 200 * 120 ? best : null;
}
function closeBtnOf(panel) {
  const bs = [...panel.querySelectorAll('button')];
  return bs.find(b => /^[×✕x✖]$|關閉|✕/.test(b.textContent.trim()) && b.textContent.trim().length <= 6) || bs.find(b => /(^|[\s_-])(close|x)(\s|$)|Close/.test(b.className + '') && b.textContent.trim().length <= 6);
}
function dress(shell, key) {
  // 照 11-21 定案 E 稿：厚金漸層外框（8px）＋內圈咖啡細線、奶油橫線信紙、信紙內右上大郵票、
  // 信頭＝Logo＋小字事務所名＋島色大標題＋金線、底部署名條、右上框外金圈關閉鈕、右側框外一株麥穗
  const panel = panelOf(shell); if (!panel) return;
  // v511：視窗內容整個重畫時（例如電梯選樓層），信頭和郵票會被清掉，要重新放上
  if (panel.dataset.wyLetter && panel.querySelector(':scope > .wyl-stamp')) {
    /* v515：同一個視窗在不同島重複使用（接待櫃檯），郵票與標題顏色要換成目前這座島 */
    if (!key && shell.dataset.isle && panel.dataset.wylIsle !== shell.dataset.isle) { const I = ISLE[shell.dataset.isle] || ISLE.castle; panel.dataset.wylIsle = shell.dataset.isle; const st = panel.querySelector(':scope > .wyl-stamp'); st.style.background = I[1]; st.style.outlineColor = I[1]; const sp = st.querySelector('span'); if (sp) sp.textContent = I[0]; const hh = panel.querySelector('.wyl-ht h1,.wyl-ht h2,.wyl-ht h3,.wyl-ht h4'); if (hh) hh.style.setProperty('color', I[2], 'important'); }
    return; }
  panel.dataset.wyLetter = '1';
  const isle = ISLE[key || shell.dataset.isle || islandNow()] || ISLE.castle; panel.dataset.wylIsle = shell.dataset.isle || '';
  const wasPos = getComputedStyle(panel).position;
  imp(panel, {
    border: '8px solid transparent', 'border-radius': '30px',
    background: `repeating-linear-gradient(transparent 0 27px,#EAD9B4 27px 28px) padding-box,linear-gradient(#FFFBF2,#FFFBF2) padding-box,${GOLD} border-box`,
    'box-shadow': 'inset 0 0 0 1.5px #8A6424,0 8px 20px rgba(20,12,0,.4)', color: '#4A3420',
    ...(wasPos === 'static' ? { position: 'relative' } : {}),
  });
  // 郵票：信紙裡面右上角
  const stamp = document.createElement('div'); stamp.className = 'wyl-stamp';
  stamp.innerHTML = `<img src="office-logo-transparent.png" alt="" style="width:46px;height:46px;margin:-6px 0 -5px;object-fit:contain;filter:brightness(1.6) saturate(.6)"><span>${isle[0]}</span>`;
  stamp.style.cssText = `position:absolute;right:16px;top:12px;width:60px;height:70px;background:${isle[1]};border:3.5px dotted #FFF8EA;outline:2px solid ${isle[1]};display:flex;flex-direction:column;align-items:center;justify-content:center;color:#FFF3D6;font:900 ${isle[0].length > 3 ? 12 : 14}px/1.15 'PingFang TC','Noto Sans TC',system-ui;transform:rotate(6deg);pointer-events:none;z-index:3;box-shadow:0 2px 4px rgba(0,0,0,.25);text-align:center`;
  // 信頭：Logo＋小字事務所名＋（原本標題改成島色大字）＋金線
  // 面板原本自帶的 Logo 名稱條（Logo＋德威陽國際法律事務所）跟新信頭重複，藏起來
  for (const im of panel.querySelectorAll('img[src*="logo"]')) { let p = im.parentElement; for (let k = 0; k < 3 && p && p !== panel && !/德威陽/.test(p.textContent || ''); k++) p = p.parentElement; if (!p || p === panel || im.closest('.wyl-keep')) continue; const t = (p.textContent || '').trim(); if (!/德威陽/.test(t) || t.length >= 90 || p.querySelectorAll('h1,h2,h3,h4').length) continue;
    if (!p.querySelector('button')) { imp(p, { display: 'none' }); continue; }
    // 名稱條裡放著關閉鈕：只藏 Logo 和字，關閉鈕留著（它會被移到框外）
    for (const c of [...p.children]) if (!c.matches('button') && !c.querySelector('button')) imp(c, { display: 'none' });
    imp(p, { height: '0', 'min-height': '0', padding: '0', margin: '0', border: '0', overflow: 'visible', background: 'none', 'box-shadow': 'none' }); }
  let heading = [...panel.querySelectorAll('h1,h2,h3,h4')].find(h => h.offsetParent && h.textContent.trim().length <= 24);
  if (!heading) { // 沒有標題標籤：找最前面一個粗大短字當標題
    heading = [...panel.querySelectorAll('[id*="Title"],[class*="Title"],[class*="title"]')].find(n => n.offsetParent && !n.closest('button') && n.textContent.trim().length <= 24) || [...panel.querySelectorAll('div,p,strong,b,span')].find(n => { if (!n.offsetParent || n.closest('button,.rib') || n.children.length > 2) return false; const t = n.textContent.trim(); if (!t || t.length > 24 || /德威陽國際法律事務所/.test(t)) return false; const cs = getComputedStyle(n); return parseFloat(cs.fontSize) >= 14 && (parseInt(cs.fontWeight) || 400) >= 700; });
  }
  const head = document.createElement('div'); head.className = 'wyl-head';
  head.style.cssText = 'display:flex;align-items:center;gap:8px;padding-right:88px;text-align:left';
  head.innerHTML = `<img src="office-logo-transparent.png" alt="" style="width:68px;height:68px;margin:-14px;object-fit:contain;flex:none;filter:brightness(.72) saturate(1.2)"><div class="wyl-ht" style="min-width:0;flex:1"><div style="font:800 12px/1.3 'PingFang TC','Noto Sans TC',system-ui;color:#8A6424">德威陽國際法律事務所</div></div>`;
  if (heading) { let anc = heading; while (anc.parentElement && anc.parentElement !== panel) anc = anc.parentElement; anc.before(head); head.querySelector('.wyl-ht').append(heading); imp(heading, { margin: '0', color: isle[2], 'font-size': heading.textContent.trim().length > 10 ? '17px' : '20px', width: 'auto', 'max-width': 'none', display: 'block', 'font-weight': '900', 'line-height': '1.25', 'text-align': 'left', 'font-family': "'PingFang TC','Noto Sans TC',system-ui", padding: '0', 'letter-spacing': '0', 'text-shadow': 'none', background: 'none' }); }
  else { const first = [...panel.children].find(n => n.nodeType === 1 && !n.matches('button,style,script')); first ? first.before(head) : panel.prepend(head); }
  const rule = document.createElement('div'); rule.className = 'wyl-rule';
  rule.style.cssText = `height:3px;background:${GOLD};margin:12px 88px 12px 0;border-radius:2px`;
  head.after(rule); panel.append(stamp);
  // 1F／3F 定稿視窗右上有林律師 Q 版頭探出來：郵票往左讓位、關閉鈕改到左上框外（內容與排版不動）
  const peek = shell.querySelector('img.peek,[id$="Lin"]'); const peekMode = !!peek;
  // 卡片本身沒有左右內距時（1F／3F 定稿卡片），信頭、金線、標題自己留 14px 邊
  const padL = parseFloat(getComputedStyle(panel).paddingLeft) || 0;
  if (padL < 8) { head.style.marginLeft = '14px'; head.style.marginTop = '12px'; rule.style.marginLeft = '14px'; if (heading && !(heading.parentElement && heading.parentElement.classList.contains('wyl-ht'))) imp(heading, { 'padding-left': '14px', 'padding-right': '14px' }); }
  if (peekMode) { stamp.style.right = '96px'; head.style.paddingRight = '170px'; rule.style.marginRight = '0';
    // 標題移到信頭下一行、整行寬，才不會被郵票和 Q 版頭擠到換行
    if (heading && heading.parentElement && heading.parentElement.classList.contains('wyl-ht')) { head.after(heading); imp(heading, { margin: '8px 0 0', 'text-align': 'left', ...(padL < 8 ? { 'padding-left': '14px', 'padding-right': '14px' } : {}) }); } }
  /* v515 陳老闆：標題太長（例如「接待櫃檯｜事務所今天又怎麼了？」）時，標題移到金線下面整行寬，不擠成三行、不被郵票蓋到 */
  if (!peekMode && heading && heading.parentElement && heading.parentElement.classList.contains('wyl-ht') && heading.textContent.trim().length > 6) { rule.after(heading); imp(heading, { margin: '2px 0 10px', 'text-align': 'left', 'font-size': heading.textContent.trim().length > 13 ? '15.5px' : '18px', 'line-height': '1.35', ...(padL < 8 ? { 'padding-left': '14px', 'padding-right': '14px' } : {}) }); const hh = heading; const fixTop = () => { if (!hh.isConnected || !panel.getClientRects().length) return; const pr = panel.getBoundingClientRect(), sr = stamp.getBoundingClientRect(), hr = hh.getBoundingClientRect(); if (sr.height && hr.top < sr.bottom + 4 && hr.right > sr.left - 4) { const cur = parseFloat(hh.style.marginTop) || 2; hh.style.setProperty('margin-top', (cur + sr.bottom + 6 - hr.top) + 'px', 'important'); } }; panel.__wylFix = fixTop; }
  /* v515 陳老闆：郵票不要離標題太近：標題若在郵票旁邊，往下推到郵票下面（包含林律師探頭的 3 樓視窗） */
  if (heading && !panel.__wylFix && !(heading.parentElement && heading.parentElement.classList.contains('wyl-ht'))) { const hh = heading; panel.__wylFix = () => { if (!hh.isConnected || !panel.getClientRects().length) return; const sr = stamp.getBoundingClientRect(), hr = hh.getBoundingClientRect(); if (sr.height && hr.top < sr.bottom + 6 && hr.right > sr.left - 10) { const cur = parseFloat(getComputedStyle(hh).marginTop) || 0; hh.style.setProperty('margin-top', (cur + sr.bottom + 8 - hr.top) + 'px', 'important'); } }; }
  // 底部署名條
  const foot = document.createElement('div'); foot.className = 'wyl-foot';
  foot.textContent = '德威陽國際法律事務所 ・ LINE @wylaw';
  foot.style.cssText = "margin:14px 0 2px;padding:7px 0;border-radius:12px;background:#F3E2B8;text-align:center;font:800 12.5px 'PingFang TC','Noto Sans TC',system-ui;color:#8A6424;letter-spacing:.5px;pointer-events:none";
  panel.append(foot);
  // 關閉鈕與麥穗在框外：用 fixed 跟著卡片走，卡片可以捲動也不會被切掉
  const cb = closeBtnOf(panel) || closeBtnOf(shell);
  if (cb) {
    imp(cb, { position: 'fixed', width: '38px', height: '38px', padding: '0', 'border-radius': '50%', background: GOLD, border: '0', 'box-shadow': '0 3px 6px rgba(42,26,5,.35)', color: 'transparent', 'font-size': '0', 'z-index': '2147483000', overflow: 'hidden', margin: '0', 'min-width': '0', 'min-height': '0' });
    const x = document.createElement('span'); x.textContent = '×';
    x.style.cssText = "position:absolute;left:4px;top:4px;width:30px;height:30px;border-radius:50%;background:#FFF8EA;color:#8A6424;font:900 20px/30px 'PingFang TC','Noto Sans TC',system-ui;text-align:center;pointer-events:none";
    cb.append(x);
  }
  const wheat = document.createElement('div'); wheat.className = 'wyl-wheat'; wheat.innerHTML = wheatSVG();
  wheat.style.cssText = 'position:fixed;width:30px;height:80px;transform:rotate(18deg);pointer-events:none;z-index:2147482999';
  document.body.append(wheat);
  let px = null; /* v515：關閉鈕用「替身」放在最上層，按下去轉給原本的關閉鈕，原本的事件都照常運作 */
  const follow = () => {
    if (!panel.isConnected) { wheat.remove(); if (px) px.remove(); return; }
    const hidden = getComputedStyle(shell).display === 'none' || panel.getClientRects().length === 0;
    wheat.style.display = hidden ? 'none' : 'block'; if (px) px.style.setProperty('visibility', hidden ? 'hidden' : 'visible', 'important');
    if (!hidden) { if (panel.__wylFix) { const f = panel.__wylFix; panel.__wylFix = null; requestAnimationFrame(() => requestAnimationFrame(f)); setTimeout(f, 500); } window.__wylT = performance.now(); document.body.classList.add('wyl-open'); const r = panel.getBoundingClientRect(); /* v522 麥穗收進信紙框內右下角（署名條右端），不被螢幕切掉、不壓按鈕；內容需要捲動時先收起 */wheat.style.left = Math.min(r.right - 48, innerWidth - 48) + 'px'; wheat.style.top = (r.bottom - 92) + 'px'; { let sc = false; for (const e of [panel, shell]) { if (e && e.scrollHeight > e.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(e).overflowY)) sc = true } if (sc) wheat.style.display = 'none'; }
      /* v515 陳老闆：關閉鈕一律放在信紙右上角「框內」、最上層，郵票往左讓位，不再被郵票蓋住或被外層切掉 */
      if (cb) { if (!px) { px = cb.cloneNode(true); px.removeAttribute('id'); px.removeAttribute('onclick'); px.dataset.wylBody = '1'; px.onclick = e => { e.preventDefault(); e.stopPropagation(); const cur = cb.isConnected ? cb : (closeBtnOf(panel) || closeBtnOf(shell)); if (cur) cur.click(); }; document.body.append(px); cb.style.setProperty('display', 'none', 'important'); if (!peekMode) { stamp.style.right = '58px'; const hd = panel.querySelector('.wyl-head'), rl = panel.querySelector('.wyl-rule'); if (hd) hd.style.paddingRight = '138px'; if (rl) rl.style.marginRight = '138px'; } else { head.style.paddingLeft = '44px'; } }
        px.style.setProperty('left', (peekMode ? Math.max(4, r.left + 12) : Math.min(innerWidth - 46, r.right - 52)) + 'px', 'important'); px.style.setProperty('top', Math.max(4, r.top + 12) + 'px', 'important'); } }
    requestAnimationFrame(follow);
  };
  follow();
}
const LCSS = `#wy317Box[data-wy-letter]{width:min(92vw,460px)!important;max-width:none!important}
#wy317Box[data-wy-letter] #wy394VideoNote,#wy317Box[data-wy-letter] #wy319VideoError{color:#8A6424!important;background:none!important;border:0!important;box-shadow:none!important}
#wy317Box[data-wy-letter] #wy317End h2{color:#1A2C66!important}#wy317Box[data-wy-letter] #wy317End p{color:#8A6424!important}
#wy317Box[data-wy-letter] video{width:100%!important;max-height:40dvh!important;object-fit:contain;border:3px solid #d4b26f!important;border-radius:10px!important;background:#000!important;box-sizing:border-box}
#wy317Promo .wy317Spk{display:flex;gap:10px;align-items:center;margin-top:12px;padding:10px;border-radius:14px;background:#FFF3D6;border:1.5px solid #E2C88C;text-align:left}
#wy317Promo .wy317Spk img{width:56px;height:56px;flex:none;border-radius:50%;object-fit:cover;object-position:50% 12%;background:radial-gradient(circle at 35% 30%,#fff,#E8CF98);border:2.5px solid #C9963C}
#wy317Promo .wy317Spk b{display:block;font:900 15px/1.3 'PingFang TC','Noto Sans TC',system-ui;color:#1A2C66}
#wy317Promo .wy317Spk span{display:block;font:700 11.5px/1.45 'PingFang TC','Noto Sans TC',system-ui;color:#8A6424}
#wy317Promo .wy317Btns{display:flex;gap:8px;margin-top:10px}
#wy317Promo .wy317Btns a{flex:1;min-height:46px;border-radius:23px;display:flex;align-items:center;justify-content:center;text-decoration:none;font:900 15px/1 'PingFang TC','Noto Sans TC',system-ui}
#wy317Promo .wy317Line{flex:1.4!important;background:linear-gradient(#5BE08F,#06C755);color:#fff;box-shadow:0 4px 0 #04913f}
#wy317Promo .wy317Invite{background:#FFF8EA;border:2px solid #E2C88C;color:#8A6424}
#wy317Tabs .wy317Tab{flex:1;min-height:46px;border-radius:23px;font:900 15px/1.2 'PingFang TC','Noto Sans TC',system-ui;color:#8A6424;background:#FFF8EA;border:2px solid #E2C88C;cursor:pointer}
#wy317Tabs .wy317Tab.on{background:linear-gradient(#FFEFB8,#E9C46A 50%,#C9963C);color:#4A3420;border-color:#C08A2E;box-shadow:0 4px 0 #A47729}`;
export function setupLetters() {
  try { const st = document.createElement('style'); st.textContent = LCSS; document.head.appendChild(st); } catch (e) { }
  const tick = () => {
    for (const id in MAP) {
      if (SKIP.has(id)) continue; const el = document.getElementById(id); if (!el) continue;
      if (getComputedStyle(el).display === 'none') continue;
      try { dress(el, MAP[id]); } catch (e) { console.error('letter', id, e); }
    }
  };
  // 內容常常整個重畫，用觀察器在畫好時馬上套上外框
  let q = false; const mo = new MutationObserver(() => { if (q) return; q = true; requestAnimationFrame(() => { q = false; tick(); }); }); mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
  tick();
  return { tick };
}

// v510 視窗太高被手機底部切到（例如 3F 公益律師）：自動等比例縮小到整個放得下，按鈕一定看得到；內容、比例、顏色不變
(function fitPanels() {
  const fit = () => {
    const H = (window.visualViewport ? window.visualViewport.height : innerHeight) - 20;
    const list = new Set();
    document.querySelectorAll('.wyl-head').forEach(h => h.parentElement && list.add(h.parentElement));
    document.querySelectorAll('#wy3M .c').forEach(c => list.add(c));
    list.forEach(el => {
      if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') return;
      const z = parseFloat(el.style.zoom) || 1;
      const h = el.getBoundingClientRect().height / z;
      if (!h) return;
      const want = h > H ? Math.max(.6, H / h) : 1;
      if (Math.abs(want - z) > .01) el.style.zoom = want.toFixed(3);
    });
  };
  setInterval(fit, 400); addEventListener('resize', fit);
})();

/* v515 陳老闆：視窗開著時，左下角成員的提醒泡泡先收起來，不蓋住視窗按鈕；視窗關掉再出現 */
(function () { try { const st = document.createElement('style'); st.textContent = 'body.wyl-open .wyCH,body.wyl-open .wyCHCloud{opacity:0!important;pointer-events:none!important;transition:opacity .25s}'; document.head.appendChild(st); } catch (e) { }
  setInterval(() => { if (document.body.classList.contains('wyl-open') && performance.now() - (window.__wylT || 0) > 300) document.body.classList.remove('wyl-open'); }, 250); })();
