// 德威陽｜有法度 — 訴訟島 正義女神像「兩條路：美國陪審團／台灣國民法官」（2026-11-15 試玩第五版）
// 美國路：抽一件跨國案件 → 陪審席體驗（問證人、評議、全體一致、決定賠償）→ 德威陽怎麼幫您。
// 台灣路：簡短體驗國民法官在做什麼。沒有對錯。全域只暴露 window.wyJusticeOpen；CSS 限定在 #wyJustice 內。
(function(){
 const OR='#e8803f';
 const LINE='LINE：@wylaw　｜　官網：weiandyang.com';
 const CASES=[
  ['跨國供貨合約','美國客戶主張台灣供應商延遲交貨，造成停產損失，求償數百萬美元。','審閱跨國供貨合約與往來紀錄，整理交期與損失爭點，規劃陪審團聽得懂的證據呈現。'],
  ['營業秘密','美國公司指控前員工把技術資料帶到台灣公司，要求賠償並禁止使用。','盤點技術資料來源與研發紀錄，釐清秘密性與取得方式，擬定跨國答辯與證據策略。'],
  ['產品責任','台灣製造的零件裝進美國產品，使用者受傷後，連同台灣廠商一起提告。','檢視設計、製造與警示說明，釐清供應鏈責任分配，評估保險與和解空間。'],
  ['品牌商標','美國代理商合約結束後，仍以台灣品牌名稱繼續販售，雙方都說自己有權使用。','審閱授權合約與商標註冊紀錄，評估在美國的權利基礎，規劃停止使用與求償策略。'],
  ['投資爭議','美國投資人控告台灣新創公司的董事，主張募資時隱瞞重要資訊。','審閱募資文件與董事會紀錄，評估揭露義務與責任範圍，規劃答辯與協商方向。'],
  ['海外分公司勞資','台灣企業在美國分公司的前員工，主張被不當解僱並提告。','審閱聘僱文件與人事紀錄，對照當地勞動法規，規劃答辯並檢視公司內部制度。']
 ];
 const US_MSG=['你收到陪審員傳票，被選進這件案子的陪審團。','你和其他民眾一起坐進陪審席。陪審團負責認定事實，決定誰有理。','想問證人？陪審員多半不能當庭開口，有些法院可以寫紙條交給法官決定。','評議投票：還有 1 票不同意……還不能做出裁決！','再討論一次後全員同意。聯邦法院原則上要全體一致，才能做出裁決。','民事案件裡，陪審團通常連賠多少錢都一起決定。'];
 const US_BTN=['坐進陪審席','舉手問證人','進入評議投票','再討論一次','決定賠償金額'];
 const TW_CASES=[
  ['酒駕致死','駕駛酒後開車撞死行人，檢察官起訴，案件由國民法官法庭審理。','審閱卷證與鑑定報告，釐清酒測與肇事因果，規劃交互詰問與量刑辯論。'],
  ['貪污','公務員被控收受廠商財物，最輕本刑十年以上，適用國民法官審判。','整理金流與公文往來，分析職務關聯與對價，擬定辯護方向與證據說明。'],
  ['傷害致死','一場衝突後被害人不治，檢察官以傷害致人於死起訴。','還原衝突經過與醫療紀錄，釐清行為與死亡的因果關係，規劃量刑主張。']
 ];
 const TW_MSG=['台灣沒有陪審團，這類重大刑案會從一般民眾中抽出 6 位國民法官。','你和另外 5 位民眾，跟 3 位法官坐在同一排審判席。','國民法官可以直接開口問證人、被告。','評議時和法官一起投票，還要一起決定判多重。'];
 const TW_BTN=['走上審判席','舉手問證人','進入評議'];
 let box,stage='intro',st=0,cs=-1,bag=[],tcs=-1,tbag=[],it=0;
 const INTRO=[['mq','咦？訴訟島怎麼會有美國的陪審團？'],['wy','因為我是台灣律師，也是美國紐約州律師。'],['mq','所以美國的法庭，林律師也很熟！']];
 function css(){return '<style>'+
 '#wyJustice{position:fixed;z-index:131;left:50%;top:50%;transform:translate(-50%,-50%);width:min(94vw,430px);max-height:95dvh;overflow:auto;background:#fff5e5;border:3px solid #d6a65e;border-radius:18px;box-shadow:0 14px 44px #0007;color:#442a22;display:none;font-family:-apple-system,BlinkMacSystemFont,"PingFang TC","Noto Sans TC",sans-serif;-webkit-overflow-scrolling:touch}'+
 '#wyJustice *{box-sizing:border-box}'+
 '#wyJustice .j-brand{display:flex;align-items:center;gap:10px;padding:6px 10px;background:#fffaf1;border-bottom:1px solid #ecd3a8}'+
 '#wyJustice .j-brand img{width:34px;height:34px;object-fit:contain;flex:none;background:#fff;border:2px solid #d3aa67;border-radius:9px}'+
 '#wyJustice .j-brand div{flex:1}#wyJustice .j-brand b{display:block;font-size:17px;color:#3c2a20}#wyJustice .j-brand small{display:block;font-size:11.5px;color:#9a7d56}'+
 '#wyJustice .j-x{border:0;background:none;font-size:24px;color:#8a6040;padding:0 4px;cursor:pointer}'+
 '#wyJustice .j-title{background:'+OR+';color:#fff;padding:6px 12px;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}#wyJustice .j-title h1{margin:0;font-size:20px;letter-spacing:1px}#wyJustice .j-title p{margin:0;font-size:12.5px}'+
 '#wyJustice .j-body{padding:10px}'+
 '#wyJustice .j-env{position:relative;display:block;width:100%;border:0;cursor:pointer;background:linear-gradient(#FFFDF7,#F3E7D2);border-radius:10px;padding:26px 14px 18px;box-shadow:0 4px 0 #00000026,inset 0 0 0 1.5px #d6a65e;font:inherit;color:#3c2a20;overflow:hidden}'+
 '#wyJustice .j-env:before{content:"";position:absolute;left:0;right:0;top:0;height:46px;background:linear-gradient(160deg,transparent 49%,#EBD9B8 50%) left/50% 100% no-repeat,linear-gradient(200deg,transparent 49%,#EBD9B8 50%) right/50% 100% no-repeat}'+
 '#wyJustice .j-seal{position:relative;width:46px;height:46px;margin:0 auto 8px;border-radius:50%;background:#B23A3A;color:#FFE9C9;display:grid;place-items:center;font-weight:900;font-size:14px;box-shadow:0 2px 0 #7a2020}'+
 '#wyJustice .j-env b{position:relative;display:block;font-size:19px}#wyJustice .j-env small{position:relative;display:block;margin-top:3px;font-size:14.5px;color:#9a6a3a}'+
 '#wyJustice .j-env i{position:relative;display:inline-block;margin-top:9px;font-style:normal;font-size:15px;font-weight:800;color:#fff;background:'+OR+';border-radius:999px;padding:5px 14px;animation:jPulse 1.4s infinite}'+
 '#wyJustice .j-letter{background:#FFFDF8;border:1px solid #ecd3a8;border-radius:12px;padding:10px 12px;font-size:15.5px;line-height:1.65;animation:jIn .35s}'+
 '#wyJustice .j-letter b{color:#b35a22;font-size:18px;display:block;margin-bottom:2px}'+
 '#wyJustice .j-letter .us{margin-top:6px;font-size:14.5px;color:#6a4a2a;background:#FFF0E0;border-radius:8px;padding:5px 8px}'+
 '#wyJustice .j-desk{margin-top:9px;background:linear-gradient(#8A4B2A,#5E2C14);border-radius:14px;padding:9px 8px 11px;box-shadow:inset 0 0 0 2px #C99A4B,0 6px 14px #3a22104d}'+
 '#wyJustice .j-hint{color:#F3D9A4;font-size:14px;text-align:center;margin-bottom:7px}'+
 '#wyJustice .j-qs{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}'+
 '#wyJustice .j-q{position:relative;border:0;background:linear-gradient(#FFFDF7,#F3E7D2);border-radius:4px 14px 4px 4px;padding:8px 8px 10px;min-height:58px;display:flex;align-items:center;justify-content:center;text-align:center;cursor:pointer;box-shadow:0 3px 0 #00000040;color:#3c2a20;font:inherit;font-size:15.5px;font-weight:800;line-height:1.35}'+
 '#wyJustice .j-q:after{content:"";position:absolute;inset:3px 3px auto auto;width:9px;height:9px;border-radius:50%;background:'+OR+';animation:jPulse 1.4s infinite}'+
 '#wyJustice .j-q.seen:after{display:none}#wyJustice .j-q.on{outline:3px solid #F3D58B}'+
 '#wyJustice .j-card{margin-top:9px;background:#fffdf8;border:1px solid #ecd3a8;border-radius:12px;padding:9px 11px;animation:jIn .3s}'+
 '#wyJustice .j-card h3{margin:0 0 4px;font-size:18.5px;color:#b35a22}#wyJustice .j-one{margin:0;font-size:17px;font-weight:700;line-height:1.55;color:#3c2a20}'+
 '#wyJustice .j-row{display:flex;gap:7px;align-items:flex-start;margin-top:5px;font-size:15.5px;line-height:1.6}'+
 '#wyJustice .j-row span{flex:none;font-size:12px;font-weight:900;border-radius:7px;padding:2px 6px;margin-top:2px}'+
 '#wyJustice .j-row .tw{background:'+OR+';color:#fff}#wyJustice .j-row .usl{background:#F3E2C6;color:#7a5236}'+
 '#wyJustice .j-row.u{color:#6a5442;font-size:15px}'+
 '#wyJustice .j-wy{margin-top:8px;background:#FDE3C8;border:1px solid #E9B98A;border-left:5px solid #C6A25D;border-radius:10px;padding:9px 10px;color:#5A3216;font-weight:600;font-size:15px;line-height:1.5;animation:jIn .35s}'+
 '#wyJustice .j-wy>b{display:block;font-size:18.5px;font-weight:800;margin-bottom:3px;color:#8A3D10}'+
 '#wyJustice .j-wy:after{content:"'+LINE+'";display:block;margin-top:5px;padding-top:4px;border-top:1px dashed currentColor;white-space:nowrap;font-size:13px;font-weight:700;color:#8A3D10}'+
 '#wyJustice .jb-tabs{display:flex;gap:6px;margin-bottom:8px}#wyJustice .jb-tabs button{flex:1;border:1.5px solid #e8803f;background:#fff;color:#b35a22;border-radius:10px;padding:7px 0;font:inherit;font-size:15.5px;font-weight:800;cursor:pointer}#wyJustice .jb-tabs button.on{background:#e8803f;color:#fff}'+
 '#wyJustice .jb-box{background:linear-gradient(#8A4B2A,#5E2C14);border-radius:12px;padding:8px 10px 10px;box-shadow:inset 0 0 0 2px #C99A4B}'+
 '#wyJustice .jb-lab{color:#F3D9A4;font-size:12px;text-align:center;letter-spacing:2px;margin:2px 0 5px}'+
 '#wyJustice .jb-grid{display:grid;gap:6px;justify-content:center}#wyJustice .jb-grid.us{grid-template-columns:repeat(6,34px)}#wyJustice .jb-grid.j3{grid-template-columns:repeat(3,38px);margin-bottom:4px}#wyJustice .jb-grid.c6{grid-template-columns:repeat(6,34px)}'+
 '#wyJustice .jb-s{width:34px;height:34px;border-radius:50%;background:#F3E3C6;border:2px solid #C99A4B;display:grid;place-items:center;overflow:hidden;transition:background .3s}'+
 '#wyJustice .jb-s.judge{width:38px;height:38px;background:#2B2B3A;border-color:#E2C27E}'+
 '#wyJustice .jb-s img{width:100%;height:100%;object-fit:cover}#wyJustice .jb-s.me{border-color:#FFD27A;box-shadow:0 0 0 2px #FFD27A}'+
 '#wyJustice .jb-s.yes{background:#7CC28A;animation:jIn .3s both}#wyJustice .jb-s.no{background:#E07A6A;animation:jIn .3s both}#wyJustice .jb-s.judge.yes{background:#4E8A5E}'+
 '#wyJustice .jb-msg{margin:9px 2px 6px;font-size:17px;font-weight:700;line-height:1.55;color:#3c2a20;min-height:46px}'+
 '#wyJustice .jb-go{display:block;width:100%;border:0;border-radius:11px;padding:10px;font:inherit;font-size:17px;font-weight:800;color:#fff;background:#e8803f;cursor:pointer;box-shadow:0 3px 0 #b35a22}#wyJustice .jb-go.alt{background:#fff;color:#b35a22;border:1.5px solid #e8803f;box-shadow:none}'+
 '#wyJustice .js-t{font-size:15px;border:1px solid #ecd3a8;border-radius:10px;overflow:hidden}#wyJustice .js-h,#wyJustice .js-r{display:grid;grid-template-columns:72px 1fr 1fr}#wyJustice .js-h span{background:#e8803f;color:#fff;font-weight:800;padding:5px 6px;font-size:14.5px}#wyJustice .js-r span{padding:6px;border-top:1px solid #f1e1c4;line-height:1.45}#wyJustice .js-r span:first-child{font-weight:800;color:#b35a22;background:#FFF5E8}#wyJustice .jb h3{text-align:center}'+
 '#wyJustice .jr-ask{text-align:center;font-weight:800;color:#5a3a22;margin:2px 0 9px;font-size:16.5px}'+
 '#wyJustice .jr-door{position:relative;display:block;width:100%;margin-bottom:9px;border:0;border-radius:14px;padding:16px 14px 14px 70px;text-align:left;cursor:pointer;font:inherit;color:#fff;background:linear-gradient(#8A4B2A,#5E2C14);box-shadow:inset 0 0 0 2px #C99A4B,0 4px 0 #00000033}'+
 '#wyJustice .jr-door.us{background:linear-gradient(135deg,#E8803F,#B85A22);padding-top:20px;padding-bottom:18px}'+
 '#wyJustice .jr-door b{display:block;font-size:20px}#wyJustice .jr-door small{display:block;font-size:14.5px;opacity:.95;margin-top:2px}'+
 '#wyJustice .jr-flag{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;background:#FFF5E5;color:#B23A3A;display:grid;place-items:center;font-weight:900;font-size:15px;box-shadow:inset 0 0 0 2px #E2C27E}'+
 '#wyJustice .jr-deck{position:relative;height:96px;margin:6px 0}#wyJustice .jr-deck span{position:absolute;left:50%;top:6px;width:72px;height:88px;margin-left:-36px;border-radius:8px;background:linear-gradient(#FFFDF7,#F3E7D2);box-shadow:0 3px 0 #00000030,inset 0 0 0 2px #d6a65e;transform:rotate(var(--r))}'+
 '#wyJustice .jr-deck span:last-child:after{content:"CASE";position:absolute;inset:0;display:grid;place-items:center;font-weight:900;color:#b35a22;letter-spacing:2px}'+
 '#wyJustice .jr-case{background:#FFFDF8;border:1px solid #ecd3a8;border-left:5px solid #e8803f;border-radius:10px;padding:8px 10px;font-size:16px;line-height:1.6;font-weight:600;margin-bottom:8px;animation:jIn .35s}#wyJustice .jr-case small{display:block;color:#b35a22;font-weight:900;font-size:14.5px;letter-spacing:1px}'+
 '#wyJustice .jr-more{display:flex;gap:8px;margin-top:9px}#wyJustice .jr-more .jb-go{flex:1;font-size:16px}'+
 '#wyJustice .jb h3{text-align:center}'+
 '#wyJustice .ji-stage{min-height:250px;padding:4px 0}'+
 '#wyJustice .ji-l{display:flex;align-items:flex-end;gap:8px;margin-bottom:10px;animation:jiPop .55s cubic-bezier(.2,1.5,.4,1) both}'+
 '#wyJustice .ji-l.r{flex-direction:row-reverse;animation-name:jiPopR}'+
 '#wyJustice .ji-l img{width:78px;height:78px;object-fit:cover;object-position:50% 22%;border-radius:50%;background:#FFE9CF;border:3px solid #E2C27E;flex:none;box-shadow:0 4px 10px #0002;animation:jiBob 2.2s ease-in-out infinite}'+
 '#wyJustice .ji-b{position:relative;background:#fff;border:1.5px solid #ecd3a8;border-radius:14px;padding:8px 11px;font-size:17px;font-weight:700;line-height:1.5;color:#3c2a20;box-shadow:0 2px 0 #0000000f}'+
 '#wyJustice .ji-b small{display:block;font-size:12.5px;color:#b35a22;font-weight:900;letter-spacing:1px}'+
 '#wyJustice .ji-l.r .ji-b{background:#FFF1E2;border-color:#E9B98A}'+
 '#wyJustice .ji-skip{display:block;margin:8px auto 0;border:0;background:none;color:#9a7d56;font:inherit;font-size:14.5px;text-decoration:underline;cursor:pointer}'+
 '@keyframes jiPop{0%{opacity:0;transform:translate(-40px,30px) scale(.6)}100%{opacity:1;transform:none}}'+
 '@keyframes jiPopR{0%{opacity:0;transform:translate(40px,30px) scale(.6)}100%{opacity:1;transform:none}}'+
 '@keyframes jiBob{50%{transform:translateY(-4px)}}'+
 '#wyJustice .jc-stage{position:relative;height:300px;border-radius:14px;overflow:hidden;background:radial-gradient(ellipse at 50% 20%,#FFF3DF,#F4D7AE 60%,#E8B884);box-shadow:inset 0 0 0 2px #d6a65e;cursor:pointer}'+
 '#wyJustice .jc-stage:before{content:"";position:absolute;left:50%;top:0;width:160px;height:100%;transform:translateX(-50%);background:linear-gradient(#fff8,transparent 70%);clip-path:polygon(35% 0,65% 0,100% 100%,0 100%);opacity:.6}'+
 '#wyJustice .jc-floor{position:absolute;left:0;right:0;bottom:0;height:70px;background:linear-gradient(#B9773F,#8A4B2A);box-shadow:inset 0 3px 0 #D9A25E}'+
 '#wyJustice .jc-ch{position:absolute;bottom:22px;width:46%;opacity:0;transition:transform .6s cubic-bezier(.2,1.5,.4,1),opacity .3s}'+
 '#wyJustice .jc-ch img{display:block;width:100%;max-height:170px;object-fit:contain;object-position:bottom;filter:drop-shadow(0 6px 5px #0003)}'+
 '#wyJustice .jc-ch.mq{left:2%;transform:translate(-120%,0)}#wyJustice .jc-ch.wy{right:2%;transform:translate(120%,0)}'+
 '#wyJustice .jc-ch.in{opacity:1;transform:none}'+
 '#wyJustice .jc-ch.mq.in{animation:jcJump .6s cubic-bezier(.3,1.6,.5,1)}#wyJustice .jc-ch.mq.hop img{animation:jcHop .5s ease 2}'+
 '#wyJustice .jc-ch.in img{animation:jcIdle 2.4s ease-in-out infinite}'+
 '#wyJustice .jc-bub{position:absolute;bottom:100%;left:8%;width:178px;margin-bottom:-6px;background:#fff;border:2px solid #3c2a20;border-radius:16px;padding:7px 10px;font-size:16px;font-weight:800;line-height:1.45;color:#3c2a20;box-shadow:3px 3px 0 #3c2a2033;opacity:0;transform:scale(.4) translateY(10px);transform-origin:20% 100%;transition:all .35s cubic-bezier(.2,1.6,.5,1);pointer-events:none}'+
 '#wyJustice .jc-bub:after{content:"";position:absolute;left:24px;bottom:-10px;width:14px;height:14px;background:#fff;border-right:2px solid #3c2a20;border-bottom:2px solid #3c2a20;transform:rotate(45deg)}'+
 '#wyJustice .jc-bub.r{left:auto;right:4%;transform-origin:80% 100%;background:#FFF1E2}#wyJustice .jc-bub.r:after{left:auto;right:28px;background:#FFF1E2}'+
 '#wyJustice .jc-bub.on{opacity:1;transform:none}'+
 '#wyJustice .jc-next{position:relative;padding:9px 10px 11px!important;font-size:19px!important;letter-spacing:2px;background:linear-gradient(#F0954F,#C9652A)!important;box-shadow:inset 0 0 0 2px #F3D58B,0 4px 0 #8A3D10!important}#wyJustice .jc-en{display:block;font-size:11.5px;letter-spacing:4px;color:#FFE7B8;margin-bottom:1px}'+
 '#wyJustice .jc-next{margin-top:9px;opacity:0;transform:translateY(6px);transition:all .3s;pointer-events:none}#wyJustice .jc-next.on{opacity:1;transform:none;pointer-events:auto}'+
 '@keyframes jcJump{0%{transform:translate(-120%,0)}60%{transform:translate(0,-40px)}100%{transform:none}}'+
 '@keyframes jcHop{50%{transform:translateY(-18px)}}'+
 '@keyframes jcIdle{50%{transform:translateY(-3px)}}'+
 '#wyJustice .j-hintcard{margin-top:9px;color:#9a7d56;font-size:15px;text-align:center;padding:12px 0}'+
 '#wyJustice .j-done{margin-top:8px;background:linear-gradient(135deg,#B85A22,#8A3D10);color:#FCE6CC;border-radius:12px;padding:8px 11px;font-size:15px;line-height:1.6;box-shadow:inset 0 0 0 1.5px #E7C27E;animation:jIn .4s}#wyJustice .j-done b{display:block;font-size:18px;color:#fff;margin-bottom:2px}'+
 '#wyJustice .j-small{font-size:11px;color:#9a7d56;text-align:center;padding:0 8px 7px}'+
 '@keyframes jPulse{50%{box-shadow:0 0 0 5px #e8803f33}}'+
 '@keyframes jIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}'+
 '</style>'}
 const $=s=>box.querySelector(s);
 const av=()=>'<img src="'+((window.wyAvatarProfile&&window.wyAvatarProfile.gender==='male')?'./seat-youM.png':'./seat-you.png')+'" alt="">';
 function usSeats(){const sit=st>=1,vote=st>=3;let h='<div class="jb-box"><div class="jb-lab">陪審席</div><div class="jb-grid us">';for(let i=0;i<12;i++){const me=i===5&&sit;const ok=vote&&(i!==9||st>=4);h+='<span class="jb-s'+(me?' me':'')+(vote?(ok?' yes':' no'):'')+'" style="animation-delay:'+(i*.05)+'s">'+(me?av():'')+'</span>'}return h+'</div></div>'}
 function twSeats(){const sit=st>=1,vote=st>=3;let h='<div class="jb-box"><div class="jb-lab">法官</div><div class="jb-grid j3">';for(let i=0;i<3;i++)h+='<span class="jb-s judge'+(vote&&i<2?' yes':'')+'"></span>';h+='</div><div class="jb-lab">國民法官</div><div class="jb-grid c6">';for(let i=0;i<6;i++){const me=i===2&&sit;h+='<span class="jb-s'+(me?' me':'')+(vote&&i<4?' yes':'')+'">'+(me?av():'')+'</span>'}return h+'</div></div>'}
 function tdraw(){if(!tbag.length)tbag=[...TW_CASES.keys()].sort(()=>Math.random()-.5);return tbag.shift()}
 function draw(){if(!bag.length)bag=[...CASES.keys()].sort(()=>Math.random()-.5);return bag.shift()}
 function render(){
  const b=$('#jBody');
  if(stage==='intro'){b.innerHTML='<div class="jc-stage" data-act="iskip"><div class="jc-floor"></div>'+
   '<div class="jc-ch mq"><div class="jc-bub" id="jcB0">咦？訴訟島怎麼會有<br>美國的陪審團？</div><div class="jc-bub" id="jcB2">所以美國的法庭，<br>林律師也很熟！</div><img src="./full-mqF.png" alt="夢奇奇飼養者"></div>'+
   '<div class="jc-ch wy"><div class="jc-bub r" id="jcB1">因為我是台灣律師，<br>也是美國紐約州律師。</div><img src="./full-wyF.png" alt="林律師"></div></div>'+
   '<button class="jb-go jc-next" data-act="home"><span class="jc-en">ALL RISE</span>全體起立，開庭！</button><button class="ji-skip" data-act="home">略過</button>';playIntro();return}
  if(stage==='home'){b.innerHTML='<div class="jr-ask">正義女神前有兩條路，你想走哪一條？</div>'+
   '<button class="jr-door us" data-act="us"><span class="jr-flag">U.S.</span><b>美國陪審團</b><small>抽一件跨國案件，坐上陪審席</small></button>'+
   '<button class="jr-door tw" data-act="tw"><span class="jr-flag">TW</span><b>台灣國民法官</b><small>抽一件重大刑案，看看國民法官在做什麼</small></button>';return}
  if(stage==='draw'){b.innerHTML='<div class="j-card jb"><h3>美國｜抽一件案子</h3><div class="jr-deck">'+[0,1,2].map(i=>'<span style="--r:'+(i*6-6)+'deg"></span>').join('')+'</div><p class="jb-msg" style="text-align:center">陪審員不能挑案子，抽到哪件審哪件。</p><button class="jb-go" data-act="pick">抽一件案子</button></div>';return}
  if(stage==='us'){const c=CASES[cs];const btn=st<5?US_BTN[st]:null;
   b.innerHTML='<div class="jr-case"><small>本案｜'+c[0]+'</small>'+c[1]+'</div><div class="j-card jb">'+usSeats()+'<p class="jb-msg">'+US_MSG[st]+'</p>'+
   (btn?'<button class="jb-go" data-act="go">'+btn+'</button>':'')+'</div>'+
   (st>=5?'<div class="j-wy"><b>德威陽怎麼幫您？</b>'+c[2]+'</div><div class="j-done"><b>在美國打官司，要說服的是陪審團</b>答辯期限、證據、作證規則都和台灣不同。林律師具備台灣與美國紐約州律師資格，兩邊的規則都熟悉。</div><div class="jr-more"><button class="jb-go alt" data-act="again">再抽一件</button><button class="jb-go alt" data-act="home">回到兩條路</button></div>':'');return}
  if(stage==='twdraw'){b.innerHTML='<div class="j-card jb"><h3>台灣｜抽一件案子</h3><div class="jr-deck">'+[0,1,2].map(i=>'<span style="--r:'+(i*6-6)+'deg"></span>').join('')+'</div><p class="jb-msg" style="text-align:center">國民法官審的是重大刑案，抽到哪件審哪件。</p><button class="jb-go" data-act="tpick">抽一件案子</button></div>';return}
  if(stage==='tw'){const c=TW_CASES[tcs];const btn=st<3?TW_BTN[st]:null;
   b.innerHTML='<div class="jr-case"><small>本案｜'+c[0]+'</small>'+c[1]+'</div><div class="j-card jb">'+twSeats()+'<p class="jb-msg">'+TW_MSG[st]+'</p>'+(btn?'<button class="jb-go" data-act="go">'+btn+'</button>':'')+'</div>'+
   (st>=3?'<div class="j-wy"><b>德威陽怎麼幫您？</b>'+c[2]+'</div><div class="jr-more"><button class="jb-go" data-act="us">換走美國陪審團</button><button class="jb-go alt" data-act="home">回到兩條路</button></div>':'');return}
 }
 let jcT=[];
 function playIntro(){jcT.forEach(clearTimeout);jcT=[];const st=box.querySelector('.jc-stage');if(!st)return;
  const q=x=>box.querySelector(x),add=(t,f)=>jcT.push(setTimeout(f,t));
  add(100,()=>q('.jc-ch.mq').classList.add('in'));
  add(700,()=>q('#jcB0').classList.add('on'));
  add(2300,()=>{q('#jcB0').classList.remove('on');q('.jc-ch.wy').classList.add('in')});
  add(2900,()=>q('#jcB1').classList.add('on'));
  add(5000,()=>{q('#jcB1').classList.remove('on');q('.jc-ch.mq').classList.add('hop')});
  add(5300,()=>q('#jcB2').classList.add('on'));
  add(6300,()=>q('.jc-next').classList.add('on'));
 }
 function skipIntro(){jcT.forEach(clearTimeout);jcT=[];const q=x=>box.querySelector(x);if(!q('.jc-stage'))return;q('.jc-ch.mq').classList.add('in');q('.jc-ch.wy').classList.add('in');['#jcB0','#jcB1'].forEach(x=>q(x).classList.remove('on'));q('#jcB2').classList.add('on');q('.jc-next').classList.add('on')}
 function build(){
  box=document.createElement('div');box.id='wyJustice';
  box.innerHTML=css()+'<style>#wyJustice .j-title{background:none!important;border:0!important;box-shadow:none!important;padding:0 16px 4px!important;margin:0!important}#wyJustice .j-title p{background:none!important;color:#9A6B3A!important;font-size:14.5px!important;margin:0!important;padding:0!important}</style>'+'<div class="j-brand"><img alt="德威陽國際法律事務所" src="./office-logo-transparent.png"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div><button class="j-x" data-close="1" aria-label="關閉">×</button></div>'+
   '<div class="j-title"><h1>正義女神的兩條路</h1><p>訴訟島｜美國訴訟入門</p></div><div class="j-body" id="jBody"></div><div class="j-small">制度說明為一般性介紹，美國各州規定不盡相同，個案仍須評估。</div>';
  document.body.appendChild(box);
  box.addEventListener('click',e=>{
   if(e.target.closest('[data-close]')){box.style.display='none';return}
   const a=e.target.closest('[data-act]');if(!a)return;const k=a.dataset.act;if(k!=='iskip'){jcT.forEach(clearTimeout);jcT=[]}
   if(k==='iskip'){skipIntro();return}
   if(k==='us'){stage='draw'}
   else if(k==='pick'||k==='again'){cs=draw();stage='us';st=0}
   else if(k==='tw'){stage='twdraw'}
   else if(k==='tpick'){tcs=tdraw();stage='tw';st=0}
   else if(k==='inext')it++;
   else if(k==='go')st++;
   else if(k==='home')stage='home';
   render();if(k!=='go')box.scrollTop=0;else{const w=box.querySelector('.j-wy');if(w)w.scrollIntoView({block:'nearest',behavior:'smooth'})}
  });
 }
 window.wyJusticeOpen=function(){if(!box)build();stage='intro';it=0;st=0;box.style.display='block';render();const old=document.getElementById('wyLitigationInfo433');if(old)old.style.display='none'};
})();
