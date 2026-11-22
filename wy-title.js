/* v509 上方標題 A2（亮色金線牌）：城堡 1F/2F/3F 與五座島同款、各島換底色。
   只蓋在原本的標題文字上（原標題隱藏不刪），文字由原標題自動換算。 */
const COLOR = { castle: '#3F63B5', lit: '#EF9B6B', med: '#5CBF9B', fam: '#D46F84', biz: '#9A80D0', know: '#3C93B6' };
const ISLE = { '訴訟法律島': 'lit', '醫療法律島': 'med', '家庭生活島': 'fam', '企業商務島': 'biz', '法律知識島': 'know' };
const mix = (h, t, f) => { const n = i => parseInt(h.slice(i, i + 2), 16); const c = [n(1), n(3), n(5)].map(v => Math.round(t ? v + (255 - v) * f : v * f)); return '#' + c.map(v => v.toString(16).padStart(2, '0')).join(''); };
const css = `
@font-face{font-family:"WYSerifB";src:url(wy-serif-b.woff?v=510) format("woff");font-weight:900;font-display:swap}
@font-face{font-family:"WYSerifS";src:url(wy-serif-s.woff?v=510) format("woff");font-weight:600;font-display:swap}
#wyTitleA2{position:fixed;z-index:66;left:calc(12px + env(safe-area-inset-left,0px));top:calc(24px + env(safe-area-inset-top,0px));width:min(300px,calc(100vw - 86px));height:62px;pointer-events:none;display:none}
#wyTitleA2 .pl{position:absolute;inset:0;border-radius:16px;box-shadow:0 5px 0 var(--d),0 9px 16px #0003,inset 0 1px 0 #ffffff66;background:linear-gradient(180deg,var(--l),var(--c) 60%,var(--m))}
#wyTitleA2 .f1{position:absolute;inset:4px;border-radius:12px;border:1.3px solid #f3d58a}
#wyTitleA2 .f2{position:absolute;inset:7px;border-radius:9px;border:.7px solid #fff3c8aa}
#wyTitleA2 .cn{position:absolute;width:15px;height:15px}
#wyTitleA2 .t{position:absolute;left:10px;right:10px;top:17px;text-align:center;font:900 18px/1 "WYSerifB","Noto Serif TC","Songti TC",serif;letter-spacing:1.5px;color:#fffaf0;text-shadow:0 2px 0 var(--s);white-space:nowrap;overflow:hidden}
#wyTitleA2 .t b{font-size:13.5px;color:#ffe7a0;margin-right:6px;font-weight:900}
#wyTitleA2 .s{position:absolute;left:0;right:0;bottom:10px;text-align:center;font:600 8px/1 "WYSerifS","Noto Serif TC",serif;letter-spacing:2.2px;color:#fff0c8;white-space:nowrap}
#wyTitleA2 .lg{position:absolute;left:50%;top:-15px;margin-left:-15px;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fffdf6,#f3e2b8);border:1.5px solid #c9963c;box-shadow:0 0 0 2px #fff8e6,0 0 0 3px #d9b46a,0 3px 6px #0003;display:grid;place-items:center}
#wyTitleA2 .lg img{width:22px;height:auto}
#wyTitleA2 .sun{position:absolute;right:-8px;top:-10px;width:24px;height:24px}
#wyTitleA2.night .sun .d{display:none}#wyTitleA2:not(.night) .sun .n{display:none}
#officeUI>div:first-child>strong.wyA2Hidden{visibility:hidden!important}
#wyV151Controls.wyMenuized{display:none!important}
body.wyA2On .gu.guBadge{display:none!important}
body.wyA2On .gu.guTR{top:calc(90px + env(safe-area-inset-top,0px))!important}
body.wyA2On .gu.guSnd{top:calc(170px + env(safe-area-inset-top,0px))!important}
#wyMenuBtn{position:fixed;z-index:67;right:calc(12px + env(safe-area-inset-right,0px));top:calc(28px + env(safe-area-inset-top,0px));width:48px;height:48px;border-radius:50%;border:0;padding:0;background:linear-gradient(#FFEFB8,#E9C46A 35%,#C08A2E 70%,#F3D27A);box-shadow:0 3px 6px rgba(42,26,5,.35);display:none;cursor:pointer}
#wyMenuBtn i{position:absolute;left:4px;top:4px;width:40px;height:40px;border-radius:50%;background:#FFF8EA}
#wyMenuBtn i::before{content:"";position:absolute;left:11px;right:11px;top:19px;height:2.6px;border-radius:2px;background:#8A6424;box-shadow:0 -7px 0 #8A6424,0 7px 0 #8A6424}
#wyMenuPanel{position:fixed;z-index:68;right:calc(12px + env(safe-area-inset-right,0px));top:calc(84px + env(safe-area-inset-top,0px));min-width:180px;border:6px solid transparent;border-radius:22px;background:linear-gradient(#FFFBF2,#FFFBF2) padding-box,linear-gradient(#FFEFB8,#E9C46A 35%,#C08A2E 70%,#F3D27A) border-box;box-shadow:inset 0 0 0 1.5px #8A6424,0 8px 20px rgba(20,12,0,.4);padding:6px;display:none}
#wyMenuPanel button{display:block;width:100%;text-align:left;border:0;background:none;padding:13px 14px;font:900 16px/1.2 'PingFang TC','Noto Sans TC',system-ui;color:#4A3420;border-bottom:1.5px dashed #E2C88C;cursor:pointer}
#wyMenuPanel button:last-child{border-bottom:0}
#wyLiftFab{position:fixed;z-index:58;right:calc(14px + env(safe-area-inset-right,0px));bottom:calc(150px + env(safe-area-inset-bottom,0px));width:68px;height:68px;border-radius:50%;border:0;padding:0;background:linear-gradient(#FFEFB8,#E9C46A 35%,#C08A2E 70%,#F3D27A);box-shadow:0 4px 0 #A47729,0 8px 14px rgba(0,0,0,.3);display:none;cursor:pointer}
#wyLiftFab i{position:absolute;left:5px;top:5px;width:58px;height:58px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFF8EA,#F3E2B8);display:flex;flex-direction:column;align-items:center;justify-content:center;font:900 14px/1.1 'PingFang TC','Noto Sans TC',system-ui;color:#8A6424;font-style:normal}
#wyLiftFab i b{font-size:15px;letter-spacing:-1px;color:#1A2C66}

`;
const corner = r => `<svg class="cn" style="${r}" viewBox="0 0 16 16"><path d="M1 15 V5 H5 V1 H15" fill="none" stroke="#f3d58a" stroke-width="1.2"/><path d="M4 15 V8 H8 V4 H15" fill="none" stroke="#fff3c8" stroke-width=".8" opacity=".7"/></svg>`;
const sun = `<svg class="sun" viewBox="-30 -30 60 60"><g class="d"><g fill="#FFB53A">${Array.from({ length: 8 }, (_, k) => `<path d="M0 -15 Q4.5 -21 0 -27 Q-4.5 -21 0 -15Z" transform="rotate(${k * 45})"/>`).join('')}</g><circle r="14" fill="#FFC94A" stroke="#D88A1A" stroke-width="1.4"/></g><g class="n"><path d="M8 -20 A21 21 0 1 0 8 20 A16 16 0 1 1 8 -20Z" fill="#FFE7A0" stroke="#D8A848" stroke-width="1.6"/></g></svg>`;
function parse(txt) {
  txt = (txt || '').trim(); let m;
  if ((m = txt.match(/^德威陽｜([123]F)\s*(.+)$/))) return { fl: m[1], t: m[2], k: 'castle' };
  if (/^歡迎光臨/.test(txt)) return { fl: '1F', t: txt.replace(/^歡迎光臨，?/, '歡迎光臨・'), k: 'castle' };
  if ((m = txt.match(/^(.+?)｜3D 主題館$/))) return { fl: '', t: m[1], k: ISLE[m[1]] || 'castle' };
  return { fl: '', t: '德威陽事務所', k: 'castle' };
}
export function install() {
  if (document.getElementById('wyTitleA2')) return;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  const el = document.createElement('div'); el.id = 'wyTitleA2';
  el.innerHTML = `<div class="pl"><div class="f1"></div><div class="f2"></div>${corner('left:5px;top:5px')}${corner('right:5px;top:5px;transform:scaleX(-1)')}${corner('left:5px;bottom:5px;transform:scaleY(-1)')}${corner('right:5px;bottom:5px;transform:scale(-1,-1)')}<div class="t"></div><div class="s">WEI &amp; YANG ・ 德威陽國際法律事務所</div></div><div class="lg"><img src="wy-title-logo.png?v=510" alt=""></div>${sun}`;
  document.body.appendChild(el);
  const ui = document.getElementById('officeUI'); const strong = ui && ui.querySelector('strong'); if (!strong) return;
  strong.classList.add('wyA2Hidden');
  // 右上選單鈕＋右下電梯鈕：沿用原本按鈕與功能，只換擺放（原按鈕藏起來、點選單項目就是點原按鈕）
  const ctl = document.getElementById('wyV151Controls');
  const mb = document.createElement('button'); mb.id = 'wyMenuBtn'; mb.type = 'button'; mb.setAttribute('aria-label', '選單'); mb.innerHTML = '<i></i>';
  const mp = document.createElement('div'); mp.id = 'wyMenuPanel';
  const fab = document.createElement('button'); fab.id = 'wyLiftFab'; fab.type = 'button'; fab.setAttribute('aria-label', '電梯｜選擇樓層'); fab.innerHTML = '<i><b>▲▼</b>電梯</i>';
  document.body.append(mb, mp, fab);
  const shown = b => b && b.style.display !== 'none' && getComputedStyle(b).display !== 'none';
  const items = () => ctl ? [...ctl.querySelectorAll('button')].filter(b => b.id !== 'wyFloorButton' && shown(b)) : [];
  const closeMenu = () => { mp.style.display = 'none'; };
  mb.onclick = e => { e.stopPropagation(); if (mp.style.display === 'block') return closeMenu(); mp.replaceChildren(); for (const b of items()) { const it = document.createElement('button'); it.type = 'button'; it.textContent = b.textContent.trim(); it.onclick = ev => { ev.stopPropagation(); closeMenu(); b.click(); }; mp.append(it); } mp.style.display = 'block'; };
  document.addEventListener('pointerdown', e => { if (!mp.contains(e.target) && e.target !== mb) closeMenu(); });
  fab.onclick = e => { e.stopPropagation(); const f = document.getElementById('wyFloorButton'); f && f.click(); };
  const syncCtl = () => {
    const show = ui.style.display !== 'none' && getComputedStyle(ui).display !== 'none';
    if (ctl) { ctl.classList.add('wyMenuized'); ctl.style.setProperty('display', 'none', 'important'); }
    mb.style.display = show ? 'block' : 'none'; if (!show) closeMenu();
    const f = document.getElementById('wyFloorButton');
    const inCastle = parse(strong.textContent).k === 'castle' && !/主題館/.test(strong.textContent);
    fab.style.display = show && inCastle && f && f.style.display !== 'none' ? 'block' : 'none';
  };

  let last = '';
  const sync = () => {
    const show = ui.style.display !== 'none' && getComputedStyle(ui).display !== 'none';
    el.style.display = show ? 'block' : 'none'; document.body.classList.toggle('wyA2On', show); if (!show) return;
    /* v509：搭電梯時上方樓層名牌先收起來，只留「電梯上升中 1F → 2F」，兩個不會疊在一起 */
    { const rs = document.getElementById('wyRideShade'); el.style.visibility = rs && rs.style.display !== 'none' ? 'hidden' : ''; }
    const key = strong.textContent; /* v513：標題一律太陽，不判斷白天晚上（陳老闆 11-22） */ if (key === last) return; last = key;
    const p = parse(strong.textContent), c = COLOR[p.k];
    el.style.setProperty('--c', c); el.style.setProperty('--l', mix(c, 1, .28)); el.style.setProperty('--m', mix(c, 0, .88)); el.style.setProperty('--d', mix(c, 0, .6)); el.style.setProperty('--s', mix(c, 0, .55));
    const t = el.querySelector('.t'); t.innerHTML = (p.fl ? `<b>${p.fl}</b>` : '') + p.t;
    t.style.fontSize = (p.t.length > 9 ? 15.5 : 18) + 'px';
    el.classList.remove('night');
  };
  new MutationObserver(() => { sync(); syncCtl(); }).observe(ui, { attributes: true, attributeFilter: ['style'], subtree: true, childList: true, characterData: true });
  { const rs = document.getElementById('wyRideShade'); if (rs) new MutationObserver(() => sync()).observe(rs, { attributes: true, attributeFilter: ['style'] }); }
  setInterval(() => { sync(); syncCtl(); }, 700); sync(); syncCtl();
}
