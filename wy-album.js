// v507 拍照＋紀念相簿：五座島相機各開一個合照小遊戲（photo/<島>/index.html，iframe 全螢幕），
// 拍好的照片自動收進「紀念相簿」（存在這支手機的瀏覽器裡）；五座島都拍到就出現「德威陽紀念套組」。知識島那格先空著。
const KEY = 'wy507Album';
const ISL = [['castle', '德威陽城堡', '#1E2A4F'], ['lit', '訴訟法律島', '#5A3420'], ['med', '醫療法律島', '#1F4A33'], ['fam', '家庭生活島', '#7E1E2A'], ['biz', '企業商務島', '#3E2160']];
const LINE = 'LINE：@wylaw　｜　官網：weiandyang.com';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch (e) { return {} } };
const store = a => { try { localStorage.setItem(KEY, JSON.stringify(a)); return true } catch (e) { return false } };
let frame, box;
const css = `
#wyPF{position:fixed;inset:0;z-index:140;display:none;background:#0b1725}
#wyPF iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
#wyAB{position:fixed;inset:0;z-index:141;display:none;align-items:center;justify-content:center;padding:12px;background:#0b1f2fcc;font-family:system-ui,'Noto Sans TC',sans-serif}
#wyAB .c{width:min(94vw,430px);max-height:92dvh;overflow:auto;background:#fff;border:2px solid #d3aa67;border-radius:18px;box-shadow:0 18px 55px #0008;box-sizing:border-box}
#wyAB .br{display:flex;align-items:center;gap:10px;padding:8px 12px;border-bottom:1px solid #ecd3a8;position:sticky;top:0;background:#fff;z-index:2}
#wyAB .br img{width:34px;height:34px;object-fit:contain;border:2px solid #d3aa67;border-radius:9px}
#wyAB .br div{flex:1}#wyAB .br b{display:block;font-size:15px;color:#1f3b2f}#wyAB .br small{font-size:10.5px;color:#a07d45}
#wyAB .x{border:0;background:#e9f3ee;color:#1f5a43;font-size:20px;width:36px;height:36px;border-radius:10px;font-weight:700}
#wyAB .bd{padding:12px 14px 14px}
#wyAB h3{margin:2px 0 4px;font:800 21px 'Noto Serif TC','Songti TC',serif;color:#1f5a43;text-align:center}
#wyAB .sub{text-align:center;font-size:13px;color:#6a7d74;margin:0 0 10px}
#wyAB .g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
#wyAB .s{border-radius:12px;overflow:hidden;border:2px solid #e6c27a;background:#f2f7f4;aspect-ratio:4/3;position:relative;display:flex;align-items:center;justify-content:center;text-align:center;padding:0}
#wyAB .s img{width:100%;height:100%;object-fit:cover;display:block}
#wyAB .s span{position:absolute;left:0;right:0;bottom:0;background:#000a;color:#fff;font-size:12.5px;font-weight:800;padding:4px}
#wyAB .s.e{border-style:dashed;color:#6a7d74;font-size:13px;font-weight:700;line-height:1.5}
#wyAB .big{width:100%;border-radius:12px;display:block;border:2px solid #e6c27a}
#wyAB .row{display:flex;gap:9px;margin-top:11px;flex-wrap:wrap}
#wyAB .row button{flex:1;min-width:30%;padding:12px 6px;border-radius:11px;font-weight:800;font-size:15px;border:1.5px solid #c6a25d}
#wyAB .a{background:#1f6b4f;color:#fff3d6}#wyAB .b{background:#fff;color:#1f5a43}
#wyAB .set{margin-top:10px;width:100%;padding:14px;border-radius:13px;border:2px solid #c6a25d;background:linear-gradient(#f6dc93,#d9a84e);color:#4a2e08;font-size:17px;font-weight:900}
#wyAB .wy{margin-top:10px;background:#FDE3C8;border:1px solid #E9B98A;border-left:5px solid #C6A25D;border-radius:10px;padding:9px 10px;color:#5A3216;font-weight:600;font-size:13px;line-height:1.5}
#wyAB .wy>b{display:block;font-size:16px;font-weight:800;margin-bottom:3px;color:#8A3D10}
#wyAB .wy:after{content:"${LINE}";display:block;margin-top:5px;padding-top:4px;border-top:1px dashed currentColor;font-size:13px;font-weight:700;color:#8A3D10}
#wyAB .toast{text-align:center;font-size:13px;color:#2e8a62;font-weight:800;min-height:18px;margin-top:6px}
`;
function ensure() {
  if (box) return;
  const st = document.createElement('style'); st.textContent = css; document.head.append(st);
  frame = document.createElement('div'); frame.id = 'wyPF'; document.body.append(frame);
  box = document.createElement('div'); box.id = 'wyAB'; document.body.append(box);
  box.addEventListener('click', e => { const b = e.target.closest('button,[data-k]'); if (!b) return; const a = b.dataset.a;
    if (a === 'close') box.style.display = 'none'; else if (a === 'grid') openAlbum(); else if (a === 'set') openSet();
    else if (a === 'save') save(); else if (a === 'share') share(); else if (b.dataset.k) openOne(b.dataset.k); });
  addEventListener('message', e => { const d = e.data; if (!d || !d.wy507) return;
    if (d.t === 'close') closePhoto();
    if (d.t === 'photo' && d.src) shrink(d.src).then(src => { const A = load(); const first = !A[ISL[d.k][0]]; A[ISL[d.k][0]] = src; if (!store(A)) { delete A.set; store(A) } if (first && ISL.every(i => A[i[0]])) setTimeout(() => { closePhoto(); openSet() }, 1800) }); });
}
function shrink(src) { return new Promise(r => { const im = new Image(); im.onload = () => { const s = Math.min(1, 1000 / im.width); const c = document.createElement('canvas'); c.width = im.width * s | 0; c.height = im.height * s | 0; c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); r(c.toDataURL('image/jpeg', .82)) }; im.onerror = () => r(src); im.src = src }) }
export function openPhoto(i) { ensure(); const k = ISL[i] && ISL[i][0]; if (!k) return; frame.innerHTML = '<iframe allow="web-share" src="./photo/' + k + '/index.html?v=507"></iframe>'; frame.style.display = 'block'; try { window.wySfx && window.wySfx('open') } catch (e) { } }
function closePhoto() { if (!frame) return; frame.style.display = 'none'; frame.innerHTML = '' }
function shell(title, sub, inner) {
  box.innerHTML = `<div class="c"><div class="br"><img alt="德威陽國際法律事務所" src="./office-logo-transparent.png"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div><button class="x" data-a="close" aria-label="關閉">×</button></div><div class="bd"><h3>${title}</h3>${sub ? `<p class="sub">${sub}</p>` : ''}${inner}</div></div>`;
  box.style.display = 'flex';
}
let cur = null;
export function openAlbum() {
  ensure(); const A = load(); const all = ISL.every(i => A[i[0]]);
  shell('我的紀念相簿', '走到每座島的相機旁邊，就能拍一張紀念照',
    `<div class="g">${ISL.map(([k, n]) => A[k] ? `<div class="s" data-k="${k}"><img src="${A[k]}" alt="${n}"><span>${n}</span></div>` : `<div class="s e">${n}<br>還沒拍</div>`).join('')}<div class="s e">法律知識島<br>敬請期待</div></div>
    ${all ? '<button class="set" data-a="set">打開德威陽紀念套組</button>' : '<p class="sub" style="margin-top:10px">五座島都拍到，就會出現「德威陽紀念套組」</p>'}`);
}
function openOne(k) { const A = load(), n = ISL.find(i => i[0] === k)[1]; cur = { url: A[k], name: '德威陽紀念照-' + n + '.jpg' };
  shell(n, '', `<img class="big" src="${A[k]}" alt="${n}"><div class="row"><button class="a" data-a="save">存到手機</button><button class="a" data-a="share">分享</button><button class="b" data-a="grid">回相簿</button></div><div class="toast" id="wyABt"></div>`) }
function openSet() {
  ensure(); const A = load(); if (!ISL.every(i => A[i[0]])) return openAlbum();
  const W = 1200, H = 1500, c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  g.fillStyle = '#FFFBF2'; g.fillRect(0, 0, W, H); g.fillStyle = '#1F2E5C'; g.fillRect(0, 0, W, 190); g.strokeStyle = '#E6C27A'; g.lineWidth = 10; g.strokeRect(18, 18, W - 36, H - 36);
  g.fillStyle = '#F6DC9A'; g.textAlign = 'center'; g.font = '900 72px "Noto Serif TC",serif'; g.fillText('德威陽紀念套組', W / 2, 105); g.font = '700 30px Georgia,serif'; g.fillText('WEIYANG 3D LAW ISLANDS', W / 2, 158);
  const ims = ISL.map(i => { const im = new Image(); im.src = A[i[0]]; return im });
  const logo = new Image(); logo.src = './office-logo-transparent.png';
  const draw = () => {
    const cells = [[60, 230], [620, 230], [60, 620], [620, 620], [340, 1010]], cw = 520, ch = 360;
    cells.forEach(([x, y], k) => { const im = ims[k]; g.save(); g.beginPath(); g.roundRect(x, y, cw, ch, 22); g.clip(); const s = Math.max(cw / im.width, ch / im.height); g.drawImage(im, x + (cw - im.width * s) / 2, y + (ch - im.height * s) / 2, im.width * s, im.height * s); g.restore(); g.strokeStyle = '#E6C27A'; g.lineWidth = 6; g.beginPath(); g.roundRect(x, y, cw, ch, 22); g.stroke();
      g.fillStyle = ISL[k][2]; g.beginPath(); g.roundRect(x + 16, y + ch - 58, 200, 44, 12); g.fill(); g.fillStyle = '#F6DC9A'; g.font = '800 26px "Noto Sans TC",sans-serif'; g.textAlign = 'center'; g.fillText(ISL[k][1], x + 116, y + ch - 28) });
    if (logo.naturalWidth) g.drawImage(logo, 80, 1060, 200, 200);
    g.fillStyle = '#1F2E5C'; g.textAlign = 'center'; g.font = '800 34px "Noto Sans TC",sans-serif'; g.fillText('德威陽國際法律事務所', W / 2, 1420); g.font = '700 28px "Noto Sans TC",sans-serif'; g.fillText(LINE, W / 2, 1462);
    const url = c.toDataURL('image/jpeg', .86); cur = { url, name: '德威陽紀念套組.jpg' };
    shell('德威陽紀念套組', '五座島的紀念照都收集齊了！', `<img class="big" src="${url}" alt="德威陽紀念套組"><div class="row"><button class="a" data-a="save">存到手機</button><button class="a" data-a="share">分享</button><button class="b" data-a="grid">回相簿</button></div><div class="toast" id="wyABt"></div><div class="wy"><b>德威陽怎麼幫您？</b>評估您的法律需求，規劃適合的處理方向。</div>`);
  };
  let n = 0; const done = () => { if (++n >= 6) draw() }; [...ims, logo].forEach(im => im.complete ? done() : (im.onload = im.onerror = done));
}
function toast(t) { const e = box.querySelector('#wyABt'); if (e) e.textContent = t }
function save() { if (!cur) return; const a = document.createElement('a'); a.href = cur.url; a.download = cur.name; document.body.append(a); a.click(); a.remove(); toast('已存到手機') }
async function share() { if (!cur) return; try { const b = await (await fetch(cur.url)).blob(); const f = new File([b], cur.name, { type: b.type || 'image/jpeg' }); if (navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: '德威陽紀念照', text: '德威陽國際法律事務所　LINE：@wylaw' }); return } } catch (e) { if (e && e.name === 'AbortError') return } save(); toast('這支手機不支援直接分享，已先存到手機') }
