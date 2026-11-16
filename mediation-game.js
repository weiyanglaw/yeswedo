// 德威陽｜有法度 — 訴訟島「皇家調解廳」（2026-11-15 第五版）
// 三個分頁自由探索：調解桌上有誰／什麼時候能調解／三種訴訟都能談嗎。點開即看，沒有對錯。
// 全域只暴露 window.wyMediationOpen；CSS 全部限定在 #wyMediation 內。
(function(){
 const OR='#e8803f',GOLD='#c99a4b';
 const LINE='LINE：@wylaw　｜　官網：weiandyang.com';
 // [標題, 內容(HTML), 德威陽怎麼幫您]
 const SEATS={
  mediator:['調解委員','中立第三人，不判對錯，負責整理爭點、提出方案。法院由調解委員或法官主持，區公所由調解委員會主持。',
   '整理雙方爭點與手上證據，預想委員可能提出的方案方向，事先擬定可以接受的底線。'],
  other:['對方','其實也想早點結束，但第一個開價，通常對自己最有利。',
   '分析對方開價背後的考量與壓力，評估還有多少讓步空間，再安排還價與分期的順序。'],
  you:['你','最後決定簽不簽的人。法院調解成立，效力等同確定判決，簽了就很難反悔。',
   '說明簽下之後的效力與後果，逐條確認每個條件，讓每個決定都在您看懂之後才落筆。'],
  wy:['德威陽律師','坐在你旁邊：估算判決結果、把條款寫到能強制執行、評估撤回告訴的時機，並代為表達立場。',
   '陪同出席調解，現場估算判決可能結果，同步檢查每一條條款寫不寫得到、執行不執行得了。']
 };
 const TIMES={
  pre:['起訴前','可到區公所調解委員會（免費）或法院調解。車禍、醫療、勞資、多數家事事件，起訴前原則上須先經法院調解。',
   '評估先調解或直接起訴的時間與費用差異，事先準備調解要用的事實整理與證據清單。'],
  mid:['訴訟中','第一審中雙方合意即可移付調解，法官也可隨時試行和解；成立後可聲請退還裁判費三分之二。',
   '依照訴訟進度評估移付調解的時機，計算可退的裁判費，並比較繼續審理的風險與成本。'],
  end:['判決確定前','判決未確定前，仍可和解或調解，成立後案件當場終結，不必再等下一審。',
   '分析判決理由與上訴的勝算，評估是否在下一審之前談和，擬定和解條款與履行方式。']
 };
 const WHY='<b>為什麼打到一半還能談？</b>判決要等、要花錢、還能上訴；談成了，當下就結束。';
 const DOORS={
  civil:['民事','起訴前到判決確定前，都能調解或和解；成立後效力等同確定判決，對方不履行可直接聲請強制執行。',
   '檢視請求項目與金額的計算基礎，擬定調解方案，並把付款期限與違約後果寫進條款。'],
  criminal:['刑事','告訴乃論案件，調解成立並撤回告訴即終結；非告訴乃論案件，和解賠償可能影響緩起訴與量刑。法院也可移付調解或轉介修復式司法。',
   '評估案件是否告訴乃論、撤回告訴的時機，以及和解對偵查與量刑可能帶來的影響。'],
  admin:['行政','2023 年 8 月起行政訴訟引進調解，須先起訴，且限可處分、無礙公益的事項；和解則隨時可以試行。',
   '審閱處分書與訴願決定，評估可以調解的範圍，規劃與機關協商的方向與底線。']
 };
 const TABS=[['seat','調解桌上有誰'],['time','什麼時候能調'],['door','三種訴訟都能談嗎']];
 let box,view,tab='seat',pick={};
 function css(){return '<style>'+
  '#wyMediation{position:fixed;z-index:131;left:50%;top:50%;transform:translate(-50%,-50%);width:min(94vw,440px);max-height:95dvh;overflow:auto;background:#fff5e5;border:3px solid #d6a65e;border-radius:18px;box-shadow:0 14px 44px #0007;color:#442a22;font-size:13.5px;line-height:1.5;display:none;font-family:-apple-system,BlinkMacSystemFont,"PingFang TC","Noto Sans TC",sans-serif;-webkit-overflow-scrolling:touch}'+
  '#wyMediation *{box-sizing:border-box}'+
  '#wyMediation .md-brand{display:flex;align-items:center;gap:10px;padding:6px 10px;background:#fffaf1;border-bottom:1px solid #ecd3a8}'+
  '#wyMediation .md-brand img{width:34px;height:34px;object-fit:contain;flex:none;background:#fff;border:2px solid #d3aa67;border-radius:9px}'+
  '#wyMediation .md-brand div{flex:1}#wyMediation .md-brand b{display:block;font-size:15px;color:#3c2a20}#wyMediation .md-brand small{display:block;font-size:10.5px;color:#9a7d56;letter-spacing:.2px}'+
  '#wyMediation .md-x{border:0;background:none;font-size:22px;color:#8a6040;padding:0 4px;cursor:pointer}'+
  '#wyMediation .md-title{background:'+OR+';color:#fff;padding:6px 12px;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}#wyMediation .md-title h1{margin:0;font-size:18px;letter-spacing:2px}#wyMediation .md-title p{margin:0;font-size:11.5px}'+
  '#wyMediation .md-tabs{display:flex;gap:4px;padding:6px 8px 0}'+
  '#wyMediation .md-tabs button{flex:1;border:1.5px solid #e2c393;background:#fff;border-radius:10px 10px 0 0;border-bottom:0;padding:6px 2px;font-size:12.5px;font-weight:800;color:#8a6040;cursor:pointer;line-height:1.25}'+
  '#wyMediation .md-tabs button.on{background:'+OR+';border-color:'+OR+';color:#fff}'+
  '#wyMediation .md-body{padding:8px 10px 10px;border-top:3px solid '+OR+';margin:0 8px;background:#fffdf8;border-radius:0 0 12px 12px}'+
  '#wyMediation .md-h{font-size:15.5px;font-weight:800;margin:0 0 6px}'+
  '#wyMediation .md-room{position:relative;width:100%;aspect-ratio:400/200;margin:0 0 6px;border-radius:14px;box-shadow:inset 0 0 0 1px #E2CBA4}'+'#wyMediation .md-seat{position:absolute;transform:translate(-50%,-50%);border:0;background:none;padding:0;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:0;transition:transform .2s}'+'#wyMediation .md-face{width:54px;height:54px;border-radius:50%;padding:3px;background:linear-gradient(135deg,#F6DE9C,#C99A4B 45%,#F3D58B 70%,#A9772E);box-shadow:0 4px 10px #5a351766;display:block;animation:mdGlow 1.8s ease-in-out infinite}'+'#wyMediation .md-face img{width:100%;height:100%;border-radius:50%;background:radial-gradient(circle at 50% 35%,#FFF8EC,#F3DDBE);border:2px solid #FFFDF7;display:block;object-fit:cover}'+'#wyMediation .md-seat em{font-style:normal;margin-top:-6px;background:#FFFDF7;border:1.5px solid #C99A4B;color:#5a3517;border-radius:10px;padding:1px 9px;font-size:12px;font-weight:800;white-space:nowrap;box-shadow:0 2px 4px #0002;position:relative}'+'#wyMediation .md-seat.wy em{background:#1A2B4C;border-color:#C99A4B;color:#F3D9A4}'+'#wyMediation .md-seat.seen .md-face{animation:none}'+'#wyMediation .md-seat.on{transform:translate(-50%,-50%) scale(1.08);z-index:2}'+'#wyMediation .md-seat.on .md-face{animation:none;box-shadow:0 0 0 4px #FFFDF7,0 0 0 7px #E8803F,0 6px 14px #5a351766}'+'#wyMediation .md-seat.on em{background:#E8803F;border-color:#E8803F;color:#fff}'+'@keyframes mdGlow{50%{box-shadow:0 0 0 5px #F3D58B88,0 4px 10px #5a351766}}'+
  '#wyMediation .md-room svg{position:absolute;inset:0;width:100%;height:100%;border-radius:14px}'+
  '#wyMediation .md-pin{position:absolute;transform:translate(-50%,-50%);border:2px solid '+GOLD+';background:#fff;border-radius:22px;padding:5px 11px;font-size:13.5px;font-weight:800;color:#442a22;cursor:pointer;white-space:nowrap;box-shadow:0 3px 8px #0001;animation:mdPulse 1.6s ease-in-out infinite}'+
  '#wyMediation .md-pin.seen{animation:none;background:#fff1e2}'+
  '#wyMediation .md-pin.on{background:'+OR+';border-color:'+OR+';color:#fff;animation:none}'+
  '#wyMediation .md-pin.wy{border-color:#1A2B4C}#wyMediation .md-pin.wy.on{background:#1A2B4C;border-color:#1A2B4C;color:#F3D9A4}'+
  '@keyframes mdPulse{50%{box-shadow:0 0 0 6px #e8803f2a}}'+
  '#wyMediation .md-line{position:relative;display:flex;justify-content:space-between;margin:6px 2px 8px}'+
  '#wyMediation .md-line:before{content:"";position:absolute;left:12%;right:12%;top:50%;height:4px;margin-top:-2px;background:linear-gradient(90deg,#f3c79c,'+OR+');border-radius:2px}'+
  '#wyMediation .md-line .md-pin{position:relative;transform:none;z-index:1}'+
  '#wyMediation .md-doors{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:2px 0 8px}'+
  '#wyMediation .md-door{border:2px solid '+GOLD+';background:linear-gradient(#fff,#fbecd8);border-radius:40px 40px 8px 8px;padding:14px 0 9px;font-size:16px;font-weight:800;color:#442a22;cursor:pointer;animation:mdPulse 1.6s ease-in-out infinite}'+
  '#wyMediation .md-door.seen{animation:none}#wyMediation .md-door.on{background:'+OR+';border-color:'+OR+';color:#fff;animation:none}'+
  '#wyMediation .md-why{font-size:12px;color:#7a5236;background:#fff3e3;border-radius:9px;padding:7px 9px;margin-bottom:6px}'+
  '#wyMediation .md-info{background:#fffaf1;border:1px solid #ecd3a8;border-radius:10px;padding:7px 10px;font-size:13px;animation:mdIn .3s}'+
  '#wyMediation .md-info>b{color:#b35a22;display:block;font-size:14.5px}'+
  '#wyMediation .md-info ul{margin:3px 0 0;padding-left:18px}#wyMediation .md-info li{margin:1px 0}'+
  '#wyMediation .md-done{margin-top:8px;background:linear-gradient(135deg,#B85A22,#8A3D10);color:#FCE6CC;border-radius:12px;padding:8px 11px;font-size:13px;line-height:1.6;box-shadow:inset 0 0 0 1.5px #E7C27E}#wyMediation .md-done b{display:block;font-size:15.5px;color:#fff;margin-bottom:2px}'+
  '#wyMediation .md-hint{color:#9a7d56;font-size:13px;text-align:center;padding:14px 0}'+
  '#wyMediation .md-wy{margin-top:6px;background:#FDE3C8;border:1px solid #E9B98A;border-left:5px solid #C6A25D;border-radius:10px;padding:9px 10px;color:#5A3216;font-weight:600;font-size:13px;line-height:1.5;animation:mdIn .35s}'+
  '#wyMediation .md-wy>b{display:block;font-size:16px;font-weight:800;margin-bottom:3px;color:#8A3D10}'+
  '#wyMediation .md-wy:after{content:"'+LINE+'";display:block;margin-top:5px;padding-top:4px;border-top:1px dashed currentColor;font-size:13px;font-weight:700;color:#8A3D10}'+
  '#wyMediation .md-foot{display:flex;gap:8px;padding:8px}'+
  '#wyMediation .md-foot button{flex:1;border:1px solid #c69554;border-radius:9px;background:#fff1da;color:#583b26;padding:9px;font-size:14px;font-weight:700;cursor:pointer}'+
  '#wyMediation .md-foot button.go{background:'+OR+';border-color:'+OR+';color:#fff}'+
  '#wyMediation .md-note{font-size:10px;color:#9a7d56;text-align:center;padding:0 8px 7px}'+
  '@keyframes mdIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}'+
  '</style>'}

 let SUF={};
 function pickLook(){
  const r=()=>Math.random()<.5;let you=r()?'M':'';
  try{const pf=JSON.parse(localStorage.getItem('weiyangVisitorProfile')||'null');if(pf&&pf.gender)you=pf.gender==='male'?'M':''}catch(e){}
  SUF={mediator:r()?'F':'',other:r()?'F':'',you};
 }
 const NAMES={mediator:'調解委員',other:'對方',you:'你',wy:'德威陽律師'};
 function seatP(k,x,y){return '<button class="md-seat'+(k==='wy'?' wy':'')+'" data-k="'+k+'" style="left:'+x+'%;top:'+y+'%"><span class="md-face"><img src="./seat-'+k+(SUF[k]||'')+'.png" alt=""></span><em>'+NAMES[k]+'</em></button>'}
 const ROOM='<svg viewBox="0 0 400 210" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>'+
  '<radialGradient id="mdFloor" cx="50%" cy="45%" r="65%"><stop offset="0" stop-color="#FBF3E6"/><stop offset=".7" stop-color="#F0DEC2"/><stop offset="1" stop-color="#E2C9A4"/></radialGradient>'+
  '<linearGradient id="mdWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8A4B2A"/><stop offset=".55" stop-color="#6B3519"/><stop offset="1" stop-color="#4E230F"/></linearGradient>'+
  '<linearGradient id="mdGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F6DE9C"/><stop offset=".45" stop-color="#C99A4B"/><stop offset=".7" stop-color="#F3D58B"/><stop offset="1" stop-color="#A9772E"/></linearGradient>'+
  '<radialGradient id="mdFelt" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#2F5C4A"/><stop offset="1" stop-color="#1D3E31"/></radialGradient>'+
  '<filter id="mdSh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#5a3517" flood-opacity=".35"/></filter></defs>'+
  '<rect x="0" y="0" width="400" height="210" rx="14" fill="url(#mdFloor)"/>'+
  '<g opacity=".35" stroke="#D9BE93" stroke-width="1" fill="none"><ellipse cx="200" cy="118" rx="190" ry="88"/><ellipse cx="200" cy="118" rx="172" ry="78"/></g>'+
  '<g filter="url(#mdSh)"><ellipse cx="200" cy="120" rx="150" ry="58" fill="url(#mdWood)"/></g>'+
  '<ellipse cx="200" cy="114" rx="150" ry="56" fill="url(#mdWood)"/>'+
  '<ellipse cx="200" cy="114" rx="146" ry="53" fill="none" stroke="url(#mdGold)" stroke-width="3"/>'+
  '<ellipse cx="200" cy="114" rx="122" ry="40" fill="url(#mdFelt)" stroke="url(#mdGold)" stroke-width="1.6"/>'+
  '<ellipse cx="200" cy="114" rx="114" ry="35" fill="none" stroke="#C99A4B" stroke-opacity=".45" stroke-dasharray="2 4"/>'+
  '<g transform="translate(200 112)" fill="url(#mdGold)" stroke="#8a6424" stroke-width=".6"><rect x="-1.6" y="-17" width="3.2" height="27"/><circle cx="0" cy="-18.5" r="2.6"/><rect x="-24" y="-14" width="48" height="2.6" rx="1.3"/><path d="M-21 -11.5 l-7 12 a7 3 0 0 0 14 0z"/><path d="M21 -11.5 l-7 12 a7 3 0 0 0 14 0z"/><path d="M-9 10 h18 l3 4 h-24z"/></g>'+
  '<g transform="translate(118 122) rotate(-12)"><rect x="-13" y="-9" width="26" height="18" rx="1.5" fill="#FFFDF7" stroke="#d9c3a0"/><path d="M-8 -3h16M-8 1h16M-8 5h10" stroke="#c9b48e" stroke-width="1.2"/></g>'+
  '<g transform="translate(282 122) rotate(10)"><rect x="-13" y="-9" width="26" height="18" rx="1.5" fill="#FFFDF7" stroke="#d9c3a0"/><path d="M-8 -3h16M-8 1h16M-8 5h10" stroke="#c9b48e" stroke-width="1.2"/></g>'+
  '<g transform="translate(150 140) rotate(-6)"><rect x="-16" y="-9" width="32" height="18" rx="1.5" fill="#FFFDF7" stroke="#d9c3a0"/><path d="M-11 -3h22M-11 1h22M-11 5h14" stroke="#c9b48e" stroke-width="1.2"/><path d="M8 6 l14 -10" stroke="#1A2B4C" stroke-width="2.4" stroke-linecap="round"/><path d="M21 -5 l3 -2" stroke="#C99A4B" stroke-width="2.4" stroke-linecap="round"/></g>'+
  '<g transform="translate(250 92)"><ellipse cx="0" cy="3" rx="8" ry="3" fill="#00000022"/><path d="M-6 -6 h12 v8 a6 3 0 0 1 -12 0z" fill="#FFFDF7" stroke="#C99A4B"/><ellipse cx="0" cy="-6" rx="6" ry="2.2" fill="#E8DCC6" stroke="#C99A4B"/></g>'+
  '</svg>';
 function card(d){return '<div class="md-info"><b>'+d[0]+'</b>'+d[1]+'</div><div class="md-wy"><b>德威陽怎麼幫您？</b>'+d[2]+'</div>'}
 function pin(k,label,x,y,cls){return '<button class="md-pin'+(cls?' '+cls:'')+'" data-k="'+k+'"'+(x!=null?' style="left:'+x+'%;top:'+y+'%"':'')+'>'+label+'</button>'}
 const seen={seat:new Set(),time:new Set(),door:new Set()};
 function render(){
  box.querySelectorAll('.md-tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));
  const k=pick[tab];let h='';
  if(tab==='seat'){
   h='<div class="md-room">'+ROOM+
    seatP('mediator',50,21)+seatP('you',12,55)+seatP('other',88,55)+seatP('wy',31,79)+'</div>'+
    (k?card(SEATS[k]):'<div class="md-hint">點桌邊的人物，看看每個人在做什麼</div>');
  }else if(tab==='time'){
   h='<div class="md-h">什麼時候可以調解？</div><div class="md-why">'+WHY+'</div><div class="md-line">'+pin('pre','起訴前')+pin('mid','訴訟中')+pin('end','判決確定前')+'</div>'+
    (k?card(TIMES[k]):'<div class="md-hint">點時間軸上的時間點</div>');
  }else{
   h='<div class="md-h">民事、刑事、行政，都能談嗎？</div><div class="md-doors">'+['civil','criminal','admin'].map(d=>'<button class="md-door" data-k="'+d+'">'+DOORS[d][0]+'</button>').join('')+'</div>'+
    (k?card(DOORS[k]):'<div class="md-hint">點一扇門，看看各自怎麼談</div>');
  }
  if(Object.keys(seen).every(t=>seen[t].size>0))h+='<div class="md-done"><b>談得攏，才是真的有法度</b>法院調解成立，與確定判決有同一效力。條件怎麼談、怎麼寫進調解筆錄，交給德威陽把關。</div>';
  view.innerHTML=h;
  view.querySelectorAll('[data-k]').forEach(b=>{const kk=b.dataset.k;b.classList.toggle('seen',seen[tab].has(kk));b.classList.toggle('on',kk===k);b.onclick=()=>{pick[tab]=kk;seen[tab].add(kk);render()}});
  const i=TABS.findIndex(t=>t[0]===tab);
  box.querySelector('#mdPrev').style.visibility=i>0?'visible':'hidden';
  const nx=box.querySelector('#mdNext');nx.textContent=i<TABS.length-1?'下一頁':'返回法院';
 }
 function build(){
  box=document.createElement('div');box.id='wyMediation';
  box.innerHTML=css()+'<div class="md-brand"><img alt="德威陽國際法律事務所" src="./office-logo-transparent.png"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div><button class="md-x" data-close="1" aria-label="關閉">×</button></div>'+
   '<div class="md-title"><h1>皇家調解廳</h1><p>訴訟島｜不一定要判出輸贏，也能把事情解決</p></div>'+
   '<div class="md-tabs">'+TABS.map(t=>'<button data-t="'+t[0]+'">'+t[1]+'</button>').join('')+'</div><div class="md-body" id="mdView"></div>'+
   '<div class="md-foot"><button id="mdPrev">上一頁</button><button id="mdNext" class="go"></button></div>'+
   '<div class="md-note">一般法律資訊，個案仍須依具體事實與最新法令評估。</div>';
  document.body.appendChild(box);view=box.querySelector('#mdView');
  box.querySelectorAll('.md-tabs button').forEach(b=>b.onclick=()=>{tab=b.dataset.t;render()});
  box.querySelector('#mdPrev').onclick=()=>{const i=TABS.findIndex(t=>t[0]===tab);if(i>0){tab=TABS[i-1][0];render()}};
  box.querySelector('#mdNext').onclick=()=>{const i=TABS.findIndex(t=>t[0]===tab);if(i<TABS.length-1){tab=TABS[i+1][0];render()}else box.style.display='none'};
  box.addEventListener('click',e=>{if(e.target.closest('[data-close]'))box.style.display='none'});
 }
 window.wyMediationOpen=function(){if(!box)build();tab='seat';pick={};pickLook();box.style.display='block';render();const old=document.getElementById('wyLitigationInfo433');if(old)old.style.display='none'};
})();
