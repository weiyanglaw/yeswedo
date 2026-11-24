// 德威陽｜有法度 — 訴訟島「收狀處｜一狀在手，法度我有！」（2026-11-15 第一版）
// 點書狀 → 蓋收文章 → 小卡：用途、遞到哪裡、期限提醒、德威陽怎麼幫您。沒有對錯。
// 全域只暴露 window.wyFilingOpen；CSS 全部限定在 #wyFiling 內。
(function(){
 const OR='#e8803f';
 const LINE='LINE：@wylaw　｜　官網：weiandyang.com';
 const DOCS=[
  ['起訴狀','民事','向法院提起民事訴訟，寫明請求什麼、為什麼。','有管轄權的法院','請求有時效，超過就可能要不回來。例如被侵權求償：從知道受損、知道對方是誰起 2 年內。','盤點請求項目與證據，計算金額與時效，擬定起訴狀，讓法官一讀就抓到爭點。'],
  ['答辯狀','民事','被告回應對方的主張，提出反駁與證據。','審理案件的法院','依法院通知，在開庭前提出，拖延可能錯失說明機會。','逐段審閱對方起訴狀，整理反駁理由與證據，擬定答辯狀並規劃開庭說明順序。'],
  ['上訴狀','民刑事','不服判決，請上級法院重新審理。','原判決法院','收到判決後 20 天內（民事、刑事相同），逾期判決就確定，不能再爭。','分析判決理由的瑕疵，評估上訴範圍與成本，在期限內擬定上訴理由。'],
  ['告訴狀','刑事','被害人向檢察官表示要追究對方刑事責任。','地檢署或警察機關','普通傷害、毀損這類須由被害人提告的罪，從知道對方是誰起 6 個月內，逾期就不能再告。','整理事實經過與證據，評估罪名與告訴時機，擬定告訴狀並陪同製作筆錄。'],
  ['再議聲請狀','刑事','告訴人不服不起訴處分，請上級檢察機關再審查。','原檢察官所屬地檢署','收到不起訴處分書後 10 天內，逾期不起訴就確定。','審閱不起訴處分書，找出偵查遺漏的事實與證據，在期限內擬定再議理由。'],
  ['訴願書','行政','不服政府機關的處分，請上級機關撤銷或變更。','原處分機關','收到處分書的隔天起 30 天內，逾期處分就確定。','審閱處分書與適用規定，評估違法或不當之處，擬定訴願書並規劃後續行政訴訟。']
 ];
 const SIT=["想跟對方要錢、要東西", "收到法院寄來的起訴狀", "判決結果不服", "被騙、被打，想追究", "提告後檢察官不起訴", "不服政府的罰單或處分"];
 let box,pick=-1,seen=new Set();
 function css(){return '<style>'+
  '#wyFiling{position:fixed;z-index:131;left:50%;top:50%;transform:translate(-50%,-50%);width:min(94vw,430px);max-height:95dvh;overflow:auto;background:#fff5e5;border:3px solid #d6a65e;border-radius:18px;box-shadow:0 14px 44px #0007;color:#442a22;font-size:15.5px;line-height:1.5;display:none;font-family:-apple-system,BlinkMacSystemFont,"PingFang TC","Noto Sans TC",sans-serif;-webkit-overflow-scrolling:touch}'+
  '#wyFiling *{box-sizing:border-box}'+
  '#wyFiling .fi-brand{display:flex;align-items:center;gap:10px;padding:6px 10px;background:#fffaf1;border-bottom:1px solid #ecd3a8}'+
  '#wyFiling .fi-brand img{width:34px;height:34px;object-fit:contain;flex:none;background:#fff;border:2px solid #d3aa67;border-radius:9px}'+
  '#wyFiling .fi-brand div{flex:1}#wyFiling .fi-brand b{display:block;font-size:17px;color:#3c2a20}#wyFiling .fi-brand small{display:block;font-size:11.5px;color:#9a7d56}'+
  '#wyFiling .fi-x{border:0;background:none;font-size:24px;color:#8a6040;padding:0 4px;cursor:pointer}'+
  '#wyFiling .fi-title{background:'+OR+';color:#fff;padding:6px 12px;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}#wyFiling .fi-title h1{margin:0;font-size:20px;letter-spacing:1px}#wyFiling .fi-title p{margin:0;font-size:12.5px}'+
  '#wyFiling .fi-body{padding:10px}'+
  '#wyFiling .fi-intro{font-size:14.5px;color:#5a3a22;background:#fffaf1;border:1px solid #ecd3a8;border-radius:10px;padding:6px 9px;margin-bottom:8px;line-height:1.5}'+
  '#wyFiling .fi-desk{background:linear-gradient(#8A4B2A,#5E2C14);border-radius:14px;padding:10px 8px 12px;box-shadow:inset 0 0 0 2px #C99A4B,0 6px 14px #3a22104d}'+
  '#wyFiling .fi-hint{color:#F3D9A4;font-size:14px;text-align:center;margin-bottom:7px}'+
  '#wyFiling .fi-docs{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}'+
  '#wyFiling .fi-doc{position:relative;border:0;background:linear-gradient(#FFFDF7,#F3E7D2);border-radius:4px 14px 4px 4px;padding:8px 6px 10px 5px;min-height:64px;display:flex;align-items:center;justify-content:center;text-align:center;cursor:pointer;box-shadow:0 3px 0 #00000040;color:#3c2a20;transition:transform .15s}'+
  '#wyFiling .fi-doc:active{transform:translateY(2px)}'+
  '#wyFiling .fi-doc b{display:block;font-size:15px;font-weight:800;line-height:1.35;letter-spacing:-.4px}'+
  '#wyFiling .fi-doc small{display:block;font-size:12.5px;color:#b35a22;font-weight:800;margin-top:3px}'+
  '#wyFiling .fi-doc i{position:absolute;inset:3px 3px auto auto;width:9px;height:9px;border-radius:50%;background:#e8803f;animation:fiPulse 1.4s infinite}'+
  '#wyFiling .fi-doc.seen i{display:none}'+
  '#wyFiling .fi-doc.on{outline:3px solid #F3D58B}'+
  '#wyFiling .fi-stamp{position:absolute;right:-9px;bottom:-11px;width:30px;height:30px;border:2px solid #B23A3A;border-radius:50%;color:#B23A3A;font-size:10.5px;font-weight:900;display:grid;place-items:center;transform:rotate(-14deg);opacity:.95;background:#FFF5DC}'+
  '#wyFiling .fi-stamp img{width:20px;height:20px;object-fit:contain}'+
  '#wyFiling .fi-stamp.hit{animation:fiStamp .45s cubic-bezier(.2,1.6,.5,1)}'+
  '@keyframes fiStamp{0%{transform:rotate(-14deg) scale(2.4);opacity:0}100%{transform:rotate(-14deg) scale(1);opacity:.95}}'+
  '@keyframes fiPulse{50%{box-shadow:0 0 0 5px #e8803f33}}'+
  '#wyFiling .fi-card{margin-top:9px;background:#fffdf8;border:1px solid #ecd3a8;border-radius:12px;padding:8px 11px;animation:fiIn .3s}'+
  '#wyFiling .fi-card h3{margin:0 0 3px;font-size:18.5px;color:#b35a22}#wyFiling .fi-card h3 span{font-size:12px;color:#fff;background:#1A2B4C;border-radius:8px;padding:1px 7px;margin-left:6px;vertical-align:2px}'+
  '#wyFiling .fi-card p{margin:2px 0;font-size:15px}#wyFiling .fi-card p b{color:#8a6040;margin-right:4px}'+
  '#wyFiling .fi-due{display:inline-block;margin-top:3px!important;background:#FFF0E0;border:1px solid #F0C9A0;color:#9A4A1C;border-radius:8px;padding:2px 8px;font-size:14px!important;font-weight:700}'+
  '#wyFiling .fi-done{margin-top:7px;background:linear-gradient(135deg,#1A2B4C,#22385F);color:#F3D9A4;border-radius:12px;padding:7px 11px;font-size:15px;box-shadow:inset 0 0 0 1.5px #C99A4B;animation:fiIn .4s}#wyFiling .fi-done b{display:block;font-size:18px;color:#fff;margin-bottom:2px}'+
  '#wyFiling .fi-doc-name{color:#7a5236}#wyFiling .fi-doc-name b{color:#1A2B4C;font-size:16px}'+
  '#wyFiling .fi-hintcard{margin-top:9px;color:#9a7d56;font-size:15px;text-align:center;padding:14px 0}'+
  '#wyFiling .fi-wy{margin-top:8px;background:#FDE3C8;border:1px solid #E9B98A;border-left:5px solid #C6A25D;border-radius:10px;padding:9px 10px;color:#5A3216;font-weight:600;font-size:15px;line-height:1.5;animation:fiIn .35s}'+
  '#wyFiling .fi-wy>b{display:block;font-size:18.5px;font-weight:800;margin-bottom:3px;color:#8A3D10}'+
  '#wyFiling .fi-wy:after{content:"'+LINE+'";display:block;margin-top:5px;padding-top:4px;border-top:1px dashed currentColor;white-space:nowrap;font-size:13px;font-weight:700;color:#8A3D10}'+
  '#wyFiling .fi-small{font-size:11px;color:#9a7d56;text-align:center;padding:0 8px 7px}'+
  '@keyframes fiIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}'+
  '</style>'}
 function render(stamp){
  const docs=box.querySelector('#fiDocs');
  docs.innerHTML=DOCS.map((d,i)=>'<button type="button" class="fi-doc'+(seen.has(i)?' seen':'')+(i===pick?' on':'')+'" data-i="'+i+'"><i></i><b>'+SIT[i]+'</b>'+(seen.has(i)?'<span class="fi-stamp'+(stamp&&i===pick?' hit':'')+'">收文</span>':'')+'</button>').join('');
  docs.querySelectorAll('.fi-doc').forEach(b=>b.onclick=()=>{pick=Number(b.dataset.i);seen.add(pick);render(true)});
  const c=box.querySelector('#fiCard');
  if(pick<0){c.innerHTML='<div class="fi-hintcard">點一個狀況，看看該遞哪一份書狀</div>';return}
  const d=DOCS[pick];
  c.innerHTML='<div class="fi-card"><h3>'+SIT[pick]+'</h3><p class="fi-doc-name">要遞的書狀　<b>'+d[0]+'</b></p><p class="fi-due">期限｜'+d[4]+'</p></div><div class="fi-wy"><b>德威陽怎麼幫您？</b>'+d[5]+'</div>'+(seen.size===DOCS.length?'<div class="fi-done"><b>書狀一遞出，就收不回來</b>期限只有一次，主張寫錯難以補救，證據漏列可能再也提不出來。每一份書狀，交給德威陽把關。</div>':'');
 }
 function build(){
  box=document.createElement('div');box.id='wyFiling';
  box.innerHTML=css()+'<div class="fi-brand"><img alt="德威陽國際法律事務所" src="./office-logo-transparent.png"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div><button class="fi-x" data-close="1" aria-label="關閉">×</button></div>'+
   '<div class="fi-title"><h1>一狀在手，法度我有！</h1><p>訴訟島｜收狀處</p></div>'+
   '<div class="fi-body"><div class="fi-intro">書狀是向法院、檢察署或機關表達主張的正式文件，名稱各有用途，遞錯或逾期都可能影響權益。</div><div class="fi-desk"><div class="fi-hint">收狀窗口｜你遇到哪一種狀況？</div><div class="fi-docs" id="fiDocs"></div></div><div id="fiCard"></div></div>'+
   '<div class="fi-small">期限依案件類型與送達情形可能不同，個案仍須評估。</div>';
  document.body.appendChild(box);
  box.addEventListener('click',e=>{if(e.target.closest('[data-close]'))box.style.display='none'});
 }
 window.wyFilingOpen=function(){if(!box)build();pick=-1;seen=new Set();box.style.display='block';render(false);const old=document.getElementById('wyLitigationInfo433');if(old)old.style.display='none'};
})();
