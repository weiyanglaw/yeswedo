// 德威陽｜有法度 — 訴訟島「法院收費處｜裁判費」（2026-11-15 第二版）
// 說明裁判費：民事、刑事、行政各要繳多少。
// 民事只列三個常見金額（第一審，114年1月1日起標準）；不另算上訴或合計金額。
// 全域只暴露 window.wyFeeOpen；CSS 全部限定在 #wyFee 內。
(function(){
 const OR='#e8803f';
 const LINE='LINE：@wylaw　｜　官網：weiandyang.com';
 const TABS={
  civil:{name:'民事',lead:'依請求金額計算，第一審：',
   slips:[['10 萬元以下','1,500'],['50 萬元','6,700'],['100 萬元','13,200']],
   lv:'上訴第二審、第三審：第一審的 1.5 倍',
   wy:'估算訴訟標的價額與應繳裁判費，規劃請求項目與金額，起訴前先把成本算清楚。'},
  criminal:{name:'刑事',lead:'刑事案件不收裁判費：',
   slips:[['偵查','免繳'],['審判','免繳'],['上訴','免繳']],
   lv:'第一審到第三審，都不收裁判費',
   wy:'評估提出告訴與附帶請求賠償的時機，整理被害事實與損害項目，一併規劃求償方向。'},
  admin:{name:'行政',lead:'不看金額，按件收費，第一審：',
   slips:[['通常訴訟','4,000'],['簡易訴訟','2,000'],['交通裁決','300']],
   lv:'三級二審。上訴第二審（終審）：第一審的 1.5 倍',
   wy:'確認案件適用的訴訟程序與裁判費，審閱處分與訴願決定，規劃起訴的主張與證據。'}
 };
 const ORDER=['civil','criminal','admin'];
 let box,tab='civil';
 function css(){return '<style>'+
  '#wyFee{position:fixed;z-index:131;left:50%;top:50%;transform:translate(-50%,-50%);width:min(94vw,430px);max-height:95dvh;overflow:auto;background:#fff5e5;border:3px solid #d6a65e;border-radius:18px;box-shadow:0 14px 44px #0007;color:#442a22;font-size:13.5px;line-height:1.5;display:none;font-family:-apple-system,BlinkMacSystemFont,"PingFang TC","Noto Sans TC",sans-serif;-webkit-overflow-scrolling:touch}'+
  '#wyFee *{box-sizing:border-box}'+
  '#wyFee .fe-brand{display:flex;align-items:center;gap:10px;padding:6px 10px;background:#fffaf1;border-bottom:1px solid #ecd3a8}'+
  '#wyFee .fe-brand img{width:34px;height:34px;object-fit:contain;flex:none;background:#fff;border:2px solid #d3aa67;border-radius:9px}'+
  '#wyFee .fe-brand div{flex:1}#wyFee .fe-brand b{display:block;font-size:15px;color:#3c2a20}#wyFee .fe-brand small{display:block;font-size:10.5px;color:#9a7d56}'+
  '#wyFee .fe-x{border:0;background:none;font-size:22px;color:#8a6040;padding:0 4px;cursor:pointer}'+
  '#wyFee .fe-title{background:'+OR+';color:#fff;padding:6px 12px;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}#wyFee .fe-title h1{margin:0;font-size:18px;letter-spacing:2px}#wyFee .fe-title p{margin:0;font-size:11.5px}'+
  '#wyFee .fe-body{padding:10px}'+
  '#wyFee .fe-q{font-size:15.5px;font-weight:900;color:#3c2a20;margin:0 0 6px;text-align:center}'+
  '#wyFee .fe-vs{display:grid;grid-template-columns:1fr;gap:7px;margin-bottom:10px}'+
  '#wyFee .fe-vs div{border-radius:12px;padding:8px 10px;font-size:12.5px;line-height:1.45}'+
  '#wyFee .fe-vs b{display:block;font-size:14.5px;margin-bottom:2px}'+
  '#wyFee .fe-vs .law{background:linear-gradient(160deg,#22324f,#1A2B4C);color:#e9dcc2;box-shadow:inset 0 0 0 1.5px #C99A4B}#wyFee .fe-vs .law b{color:#F3D9A4}'+
  '#wyFee .fe-vs .court{background:linear-gradient(160deg,#fff,#fbecd8);color:#5a3a22;box-shadow:inset 0 0 0 1.5px #C99A4B}#wyFee .fe-vs .court b{color:#b35a22}'+
  '#wyFee .fe-must{margin:6px 0 8px;font-size:12.5px;text-align:center;color:#7a5236;background:#fff3e3;border-radius:9px;padding:6px 8px}'+
  '#wyFee .fe-must b{color:#b35a22}'+
  '#wyFee .fe-tabs{display:flex;gap:4px}'+
  '#wyFee .fe-tabs button{flex:1;border:1.5px solid #e2c393;border-bottom:0;background:#fff;border-radius:10px 10px 0 0;padding:6px 0;font-size:14.5px;font-weight:900;color:#8a6040;cursor:pointer}'+
  '#wyFee .fe-tabs button.on{background:'+OR+';border-color:'+OR+';color:#fff}'+
  '#wyFee .fe-panel{border-top:3px solid '+OR+';background:#fffdf8;border-radius:0 0 12px 12px;padding:8px 9px 9px;animation:feIn .3s}'+
  '#wyFee .fe-lead{font-size:13px;font-weight:700;margin-bottom:6px}'+
  '#wyFee .fe-slips{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}'+
  '#wyFee .fe-slip{position:relative;background:linear-gradient(#fffdf7,#f8ecd6);border:1px solid #d9c3a0;border-top:3px solid #C99A4B;border-radius:6px 6px 9px 9px;padding:7px 4px 8px;text-align:center;box-shadow:0 3px 7px #5a35171f}'+
  '#wyFee .fe-slip small{font-size:11px;color:#7a5236;font-weight:700;line-height:1.3;min-height:28px;display:flex;align-items:center;justify-content:center}'+
  '#wyFee .fe-slip b{display:block;font-size:20px;font-weight:900;color:#b35a22;font-variant-numeric:tabular-nums;line-height:1.2;margin-top:2px}'+
  '#wyFee .fe-slip b.free{color:#2f6b3a;font-size:17px}'+
  '#wyFee .fe-slip em{font-style:normal;font-size:10.5px;color:#9a7d56}'+
  '#wyFee .fe-lv{margin-top:7px;font-size:12.5px;font-weight:700;color:#7a5236;text-align:center;background:#fff3e3;border-radius:8px;padding:5px 8px}'+
  '#wyFee .fe-note{font-size:12px;color:#7a5236;margin-top:6px}'+
  '#wyFee .fe-wy{margin-top:8px;background:#FDE3C8;border:1px solid #E9B98A;border-left:5px solid #C6A25D;border-radius:10px;padding:9px 10px;color:#5A3216;font-weight:600;font-size:13px;line-height:1.5;animation:feIn .35s}'+
  '#wyFee .fe-wy>b{display:block;font-size:16px;font-weight:800;margin-bottom:3px;color:#8A3D10}'+
  '#wyFee .fe-wy:after{content:"'+LINE+'";display:block;margin-top:5px;padding-top:4px;border-top:1px dashed currentColor;font-size:13px;font-weight:700;color:#8A3D10}'+
  '#wyFee .fe-foot{padding:0 10px 8px}#wyFee .fe-foot button{width:100%;border:1px solid #c69554;border-radius:9px;background:#fff1da;color:#583b26;padding:9px;font-size:14px;font-weight:700;cursor:pointer}'+
  '#wyFee .fe-small{font-size:10px;color:#9a7d56;text-align:center;padding:0 8px 7px}'+
  '@keyframes feIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}'+
  '</style>'}
 function render(){
  box.querySelectorAll('.fe-tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));
  const d=TABS[tab];
  const p=box.querySelector('#fePanel');
  p.innerHTML='<div class="fe-lead">'+d.lead+'</div><div class="fe-slips">'+
   d.slips.map(s=>{const free=/免繳/.test(s[1]);return '<div class="fe-slip"><small>'+s[0]+'</small><b'+(free?' class="free"':'')+'>'+s[1]+'</b>'+(free?'':'<em>元</em>')+'</div>'}).join('')+'</div>'+
   '<div class="fe-lv">'+d.lv+'</div>'+
   '<div class="fe-wy"><b>德威陽怎麼幫您？</b>'+d.wy+'</div>';
  p.style.animation='none';void p.offsetWidth;p.style.animation='';
 }
 function build(){
  box=document.createElement('div');box.id='wyFee';
  box.innerHTML=css()+'<div class="fe-brand"><img alt="德威陽國際法律事務所" src="./office-logo-transparent.png"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div><button class="fe-x" data-close="1" aria-label="關閉">×</button></div>'+
   '<div class="fe-title"><h1>有法度，也要有額度？</h1><p>訴訟島｜收費處</p></div>'+
   '<div class="fe-body"><div class="fe-vs"><div class="court"><b>裁判費</b>向法院起訴、上訴時，繳給法院的費用。</div></div>'+
   '<div class="fe-tabs">'+ORDER.map(k=>'<button type="button" data-t="'+k+'">'+TABS[k].name+'</button>').join('')+'</div><div class="fe-panel" id="fePanel"></div></div>'+
   
   '<div class="fe-small">民事以因財產權起訴計算；實際金額以法院核定為準。</div>';
  document.body.appendChild(box);
  box.querySelectorAll('.fe-tabs button').forEach(b=>b.onclick=()=>{tab=b.dataset.t;render()});
  box.addEventListener('click',e=>{if(e.target.closest('[data-close]'))box.style.display='none'});
 }
 window.wyFeeOpen=function(){if(!box)build();tab='civil';box.style.display='block';render();const old=document.getElementById('wyLitigationInfo433');if(old)old.style.display='none'};
})();
