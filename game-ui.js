// 德威陽｜有法度 v485 — 遊戲介面（島上名牌、選單、搖桿、情境按鈕、四館名牌、轉場、音效）
// 只改外觀與排列；原本按鈕的功能全部沿用（新按鈕一律轉按原本的按鈕或呼叫原本的函式）。
// 城堡室內維持原本介面（城堡之後大改版）。
(function(){
 const $=id=>document.getElementById(id);
 const F='"Huninn","PingFang TC","Noto Sans TC",sans-serif';
 const THEME={0:['#2E4A7A','#1A2B4C','#0E1A31'],1:['#E07A3A','#B4511C','#7A3410'],2:['#2F8A6A','#1B6149','#0C3A2B'],3:['#B44A6A','#85304B','#5A1C30'],4:['#7A55A8','#553878','#2E1D45'],5:['#3E9A8A','#2A7468','#164840']};
 const OUT_HINT={0:'往大門走就能進入',1:'往大門走就能進入',2:'往大門走就能進入',3:'往大門走就能進入',4:'往大門走就能進入',5:'島上走走看看'};
 const SLOGAN={1:'打官司也要有法度',2:'病歷在手有法度',3:'家和萬事有法度',4:'生意做大有法度'};
 const IC={
  menu:'<svg viewBox="0 0 24 24" stroke="#fff" stroke-width="2.8" stroke-linecap="round" fill="none"><path d="M5 7h14M5 12h14M5 17h14"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"><path d="M4 5.5C6 4.5 9 4.5 12 6c3-1.5 6-1.5 8-.5V19c-2-1-5-1-8 .5-3-1.5-6-1.5-8-.5z"/><path d="M12 6v13.5"/></svg>',
  door:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><path d="M14 4H6v16h8M10 12h10M17 9l3 3-3 3"/></svg>'};

 /* ---------- 樣式 ---------- */
 const css=document.createElement('style');css.id='wyGameUI';css.textContent=`
 .gu{font-family:${F};-webkit-user-select:none;user-select:none}
 .guBadge{position:fixed;z-index:60;top:calc(12px + env(safe-area-inset-top,0px));left:12px;display:flex;align-items:center;transition:opacity .3s,transform .3s;pointer-events:none}
 .guEm{position:relative;z-index:2;flex:none;width:52px;height:52px;border-radius:50%;background:#fff;border:3px solid #fff;box-shadow:0 0 0 3px #D9B56A,0 5px 0 3px var(--d),0 9px 14px #0004;display:grid;place-items:center}
 .guEm img{width:41px;height:41px;object-fit:contain}
 .guTab{position:relative;overflow:hidden;margin-left:-13px;padding:6px 15px 6px 20px;border-radius:0 15px 15px 0;background:linear-gradient(180deg,var(--c1),var(--c2));color:#fff;box-shadow:inset 0 2px 0 #ffffff40,0 4px 0 var(--d),0 8px 12px #0003;border:2px solid #fff;white-space:nowrap;max-width:calc(100vw - 150px)}
 .guTab b{display:block;font-size:16px;font-weight:400;letter-spacing:2px;line-height:1.2;text-shadow:0 2px 0 #0003}
 .guTab span{display:block;font-size:11px;color:#FFE7B0;letter-spacing:1.2px;margin-top:1px;overflow:hidden;text-overflow:ellipsis}
 .guShine:after{content:"";position:absolute;top:-20%;bottom:-20%;width:30%;left:-40%;background:linear-gradient(100deg,transparent,#fff9 45%,#fff 50%,#fff9 55%,transparent);transform:skewX(-18deg);animation:guShine .9s ease-out forwards}
 @keyframes guShine{to{left:130%}}
 .guFlip{animation:guFlip .6s cubic-bezier(.3,1.4,.5,1)}
 @keyframes guFlip{0%{transform:perspective(400px) rotateX(0)}45%{transform:perspective(400px) rotateX(90deg)}55%{transform:perspective(400px) rotateX(-90deg)}100%{transform:perspective(400px) rotateX(0)}}
 .guPop{animation:guPop .6s cubic-bezier(.3,1.6,.5,1)}
 @keyframes guPop{0%{transform:scale(.55) rotate(-20deg)}100%{transform:none}}
 .guTR{position:fixed;z-index:60;top:calc(14px + env(safe-area-inset-top,0px));right:12px;display:flex;gap:10px;transition:opacity .3s}
 .guRB{text-align:center;cursor:pointer;-webkit-tap-highlight-color:transparent}
 .guRnd{width:48px;height:48px;border-radius:50%;border:3px solid #fff;display:grid;place-items:center;box-shadow:0 0 0 2px #D9B56A,0 5px 0 2px var(--d),0 9px 14px #0003;background:linear-gradient(180deg,var(--c1),var(--c2));transition:transform .1s,box-shadow .1s}
 .guRnd svg{width:22px;height:22px}
 .guLbl{display:inline-block;margin-top:8px;padding:1px 7px;border-radius:99px;background:#1A2B4Cd9;border:1px solid #D9B56A;font-size:11px;color:#FFE7B0;letter-spacing:1px;white-space:nowrap}
 .guRB.down .guRnd{transform:translateY(4px);box-shadow:0 0 0 2px #D9B56A,0 1px 0 2px var(--d),0 4px 8px #0003}
 .guMenu{position:fixed;z-index:200;inset:0;background:#0E1A3166;display:none;justify-content:flex-end;align-items:flex-start;padding:calc(84px + env(safe-area-inset-top,0px)) 12px 0}
 .guMenu.on{display:flex}
 .guCard{width:min(250px,80vw);padding:10px;border-radius:20px;background:#FFFBF2;border:3px solid #fff;box-shadow:0 0 0 3px #D9B56A,0 6px 0 3px #B88A3E,0 16px 28px #0006;animation:guCardIn .3s cubic-bezier(.3,1.5,.5,1)}
 @keyframes guCardIn{0%{transform:scale(.75);opacity:0}100%{transform:none;opacity:1}}
 .guMi{display:flex;align-items:center;gap:8px;padding:9px 11px;margin:5px 0;border-radius:13px;background:#F4ECDD;box-shadow:0 3px 0 #D9C9A8;color:#1A2B4C;text-decoration:none;cursor:pointer}
 .guMi b{flex:1;font-size:15px;font-weight:400;letter-spacing:1px}
 .guMi small{font-size:11.5px;color:#8A6A34}
 .guMi.line{background:linear-gradient(180deg,#22D46B,#06B04A);box-shadow:0 3px 0 #04843a}.guMi.line b,.guMi.line small{color:#fff}
 .guMi.down{transform:translateY(2px);box-shadow:0 1px 0 #D9C9A8}
 .guSeg{display:flex;border-radius:10px;overflow:hidden;border:1.5px solid #D9B56A}
 .guSeg span{padding:3px 9px;font-size:12px;color:#8A6A34;background:#fff}
 .guSeg span.on{background:linear-gradient(180deg,#FFE7A8,#D9A84E);color:#4A2E08}
 .guHelp{display:none;margin:2px 4px 6px;padding:8px 10px;border-radius:11px;background:#fff;font-size:12.5px;line-height:1.7;color:#4a3f35}
 .guHelp.on{display:block}
 .guToast{position:fixed;z-index:55;left:50%;top:calc(86px + env(safe-area-inset-top,0px));transform:translateX(-50%);white-space:nowrap;padding:7px 17px;border-radius:99px;background:#FFFBF2;border:3px solid #fff;box-shadow:0 0 0 2px #D9B56A,0 4px 0 2px #B88A3E,0 10px 16px #0003;font-size:13.5px;color:var(--d);letter-spacing:1px;transition:opacity .5s,transform .5s;pointer-events:none}
 .guToast.gone{opacity:0;transform:translate(-50%,-10px)}
 .guRipple{position:fixed;z-index:30;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;border:3px solid #FFE29A;box-shadow:0 0 10px #FFD36E;pointer-events:none;animation:guRip .6s ease-out forwards}
 @keyframes guRip{0%{transform:scale(.4);opacity:1}100%{transform:scale(3.2);opacity:0}}
 .guIris{position:fixed;z-index:500;left:50%;top:50%;width:0;height:0;border-radius:50%;pointer-events:none;display:none}
 .guIris i{position:absolute;left:50%;top:50%;width:var(--s);height:var(--s);transform:translate(-50%,-50%);border-radius:50%;box-shadow:0 0 0 250vmax #1A2B4C}
 .guIris img{position:absolute;left:50%;top:50%;width:84px;height:84px;margin:-42px;border-radius:50%;background:#fff;padding:8px;box-shadow:0 0 0 4px #D9B56A;opacity:0;transform:scale(.4);transition:opacity .18s,transform .3s cubic-bezier(.3,1.6,.5,1)}
 .guIris.logo img{opacity:1;transform:none}
 /* 原本的島上元件：收起或換裝 */
 body.gu-out #top,body.gu-out #hud,body.gu-out #hint,body.gu-out #wyEntryGuide,body.gu-out #wyGestures{display:none!important}
 body.gu-out #wyDoorPrompt{opacity:0!important;pointer-events:none!important}
 body.gu-play #joy{left:22px!important;bottom:calc(28px + env(safe-area-inset-bottom,0px))!important;width:118px!important;height:118px!important;background:radial-gradient(circle,#1A2B4C55,#1A2B4Ccc 72%)!important;border:3px solid #fff!important;box-shadow:0 0 0 2.5px #D9B56A,0 5px 0 2.5px #0E1A31,0 10px 16px #0004!important}
 body.gu-play #joy:before{content:"";position:absolute;inset:12px;border-radius:50%;border:1.5px dashed #D9B56A88;pointer-events:none}
 body.gu-play #knob{width:52px!important;height:52px!important;background:radial-gradient(circle at 40% 30%,#FFF4D2,#F2CF7E 45%,#C9963F)!important;border:3px solid #fff;box-shadow:0 0 0 2px #B88A3E,0 4px 0 2px #8A6224,0 8px 12px #0004!important}
 body.gu-play #controls{right:16px!important;bottom:calc(26px + env(safe-area-inset-bottom,0px))!important;width:150px;height:140px;flex-direction:row!important}
 body.gu-play #controls button{position:absolute;padding:0!important;font-family:${F}!important;font-weight:400!important;cursor:pointer;transition:transform .1s,box-shadow .1s,filter .3s,opacity .3s}
 body.gu-play #interact{right:0;top:0;width:86px;height:86px;border-radius:50%!important;border:4px solid #fff!important;background:radial-gradient(circle at 40% 30%,#FFF4D2,#F2CF7E 45%,#C9963F)!important;box-shadow:0 0 0 3px #B88A3E,0 7px 0 3px #8A6224,0 14px 20px #0004!important;color:#4A2E08!important;font-size:19px!important;letter-spacing:3px}
 body.gu-play #interact.glow{animation:guBreathe 2.2s ease-in-out infinite}
 body.gu-play #interact.dim{filter:grayscale(.6) brightness(.95);opacity:.6;animation:none}
 @keyframes guBreathe{0%,100%{filter:drop-shadow(0 0 0 #FFE29A00)}50%{filter:drop-shadow(0 0 12px #FFE29Aee)}}
 body.gu-play #home{left:0;bottom:0;width:60px;height:60px;border-radius:50%!important;border:3px solid #fff!important;background:linear-gradient(180deg,#2E4A7A,#1A2B4C)!important;box-shadow:0 0 0 2px #B88A3E,0 5px 0 2px #0E1A31,0 10px 14px #0004!important;color:#FFE7B0!important;font-size:12.5px!important}
 body.gu-play #interact.down{transform:translateY(6px);box-shadow:0 0 0 3px #B88A3E,0 1px 0 3px #8A6224,0 6px 10px #0004!important}
 body.gu-play #home.down{transform:translateY(4px);box-shadow:0 0 0 2px #B88A3E,0 1px 0 2px #0E1A31,0 5px 8px #0004!important}
 body.gu-play #wyWalkUI{left:22px!important;bottom:calc(28px + env(safe-area-inset-bottom,0px))!important;width:118px!important;height:118px!important}
 body.gu-play #wyJoyBase{width:118px!important;height:118px!important;box-sizing:border-box;background:radial-gradient(circle,#1A2B4C55,#1A2B4Ccc 72%)!important;border:3px solid #fff!important;box-shadow:0 0 0 2.5px #D9B56A,0 5px 0 2.5px #0E1A31,0 10px 16px #0004!important}
 body.gu-play #wyJoyBase:before{content:"";position:absolute;inset:10px;border-radius:50%;border:1.5px dashed #D9B56A88;pointer-events:none}
 body.gu-play #wyJoyKnob{left:30px!important;top:30px!important;width:52px!important;height:52px!important;background:radial-gradient(circle at 40% 30%,#FFF4D2,#F2CF7E 45%,#C9963F)!important;border:3px solid #fff!important;box-shadow:0 0 0 2px #B88A3E,0 4px 0 2px #8A6224,0 8px 12px #0004!important}
 /* 四館：原本的標題列與按鈕收起 */
 body.gu-room #officeUI>div:first-child,body.gu-room #wyV151Controls,body.gu-room #hint{visibility:hidden!important}
 body.gu-room #officeUI span{visibility:hidden}
 /* 指南打開時，名牌與按鈕讓位 */
 .guSnd{position:fixed;z-index:60;top:calc(98px + env(safe-area-inset-top,0px));right:18px;width:42px;height:42px;border-radius:50%;border:2.5px solid #D9B56A;background:#1A2B4C;display:grid;place-items:center;box-shadow:0 4px 0 #0E1A31,0 6px 14px #0005;transition:opacity .3s,transform .15s;-webkit-tap-highlight-color:transparent}
 .guSnd:active{transform:translateY(3px);box-shadow:0 1px 0 #0E1A31}
 .guSnd svg{width:22px;height:22px}
 .guSnd.off{background:#5B6577;border-color:#9AA3B2}
 body.gu-guide .guSnd,body.wy-opening .guSnd{opacity:0!important;pointer-events:none!important}
 body.gu-guide .guBadge,body.gu-guide .guTR,body.gu-guide .guToast{opacity:0!important;pointer-events:none!important}
 /* 島上時左下角人物從搖桿上方探頭 */
 body.gu-out .wyCH{bottom:150px!important}
 body.gu-out .wyCHCloud{bottom:246px!important}
 /* 圓體字 */
 .wyGHCloud,.wyCHCloud,#wyRC .rc-band b,#wyRC .rc-n,.wy175Guide h3,#wyMedicalGuide h3,#wyFamilyGuide h3,#wyMainGuide h3{font-family:${F}!important;font-weight:400!important}
 @media (max-height:760px){.wy175Guide,#wyMedicalGuide,#wyFamilyGuide,#wyMainGuide{padding:15px 18px 13px!important}.wy175Guide p,#wyMedicalGuide p,#wyFamilyGuide p,#wyMainGuide p{margin:0 0 7px!important}.wy175Guide h3,#wyMedicalGuide h3,#wyFamilyGuide h3,#wyMainGuide h3{margin:8px 0 9px!important}.wy175Guide button,#wyMedicalGuide button,#wyFamilyGuide button,#wyMainGuide button{margin-top:10px!important;min-height:42px!important}}
 
 /* v515 右上按鈕：動森風圓胖泡泡，小一點、排一直排貼右邊，不擋畫面 */
 .gu.guTR{flex-direction:column!important;align-items:flex-end!important;gap:10px!important;right:8px!important}
 .guTR .guRB{display:flex;flex-direction:column;align-items:center}
 .guTR .guRB .guRnd{width:40px!important;height:40px!important;border-width:2.5px!important}
 .guTR .guRB .guRnd svg{width:19px!important;height:19px!important}
 .guTR .guRB .guLbl{position:relative;z-index:2;font-size:10px!important;padding:0 6px!important;margin-top:6px!important;line-height:1.5!important}
 .guTR .guRB:active .guRnd{transform:scale(.9) translateY(2px)}
 .guTR .guSW .guSnd{position:static!important;width:40px!important;height:40px!important;border-width:2.5px!important;margin:0!important;right:auto!important;top:auto!important}
 .guTR .guSW .guSnd svg{width:19px!important;height:19px!important}
 .gu.guToast{top:auto!important;bottom:calc(150px + env(safe-area-inset-bottom,0px))!important}

 /* v516 陳老闆定案（推薦一）：左上返回鍵＋右上一顆選單（可愛手機面板），右邊不再一排按鈕 */
 .guSW{display:none!important}
 .gu.guSnd{display:none!important}
 .guCard .guMi b{white-space:nowrap}
 .gu.guBack{position:fixed;z-index:61;left:calc(12px + env(safe-area-inset-left,0px));top:calc(96px + env(safe-area-inset-top,0px));display:none;flex-direction:column;align-items:center;cursor:pointer;-webkit-tap-highlight-color:transparent}
 .guBack.on{display:flex}
 .guBack i{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:#1A2B4C;border:2.5px solid #fff;box-shadow:0 0 0 2px #E9C46A,0 3px 0 2px #0E1A31,0 6px 10px #0003;transition:transform .1s}
 .guBack:active i{transform:scale(.9) translateY(2px)}
 .guBack i svg{width:20px;height:20px}
 .guBack span{margin-top:6px;font-size:10px;line-height:1.5;padding:0 6px;border-radius:99px;background:#1A2B4Cd9;border:1px solid #D9B56A;color:#FFE7B0;letter-spacing:1px;white-space:nowrap}
 .guTiles{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:2px 0 8px}
 .guTile{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 0 6px;border-radius:14px;background:#F4ECDD;box-shadow:0 3px 0 #D9C9A8;cursor:pointer;font-size:11.5px;color:#4A3420;letter-spacing:.5px}
 .guTile i{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;border:2px solid #fff;box-shadow:0 0 0 1.5px #D9B56A}
 .guTile i svg{width:18px;height:18px}
 .guTile.off{opacity:.45;pointer-events:none}
 .guTile:active{transform:translateY(2px);box-shadow:0 1px 0 #D9C9A8}
 .guStamps{display:flex;align-items:center;gap:6px;padding:8px 10px;margin:0 0 6px;border-radius:13px;background:#FFF3D6;border:1.5px dashed #D9B56A;font-size:12.5px;color:#6B4A1E}
 .guStamps b{flex:1;font-weight:700;letter-spacing:1px}
 .guStamps em{font-style:normal;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font-size:10px;color:#fff;border:2px dashed #CBB89A;background:transparent;color:#B9A787}
 .guStamps em.on{border:2px solid #fff;box-shadow:0 0 0 1.5px #D9B56A;color:#fff}
 .guCard>.guMi[data-m="sound"],.guCard>.guMi[data-m="photo"],.guCard>.guMi[data-m="letter"]{display:none!important}
`;document.head.appendChild(css);


 /* ---------- v487 載入畫面品牌動畫 ---------- */
 (function(){
  const st=document.createElement('style');st.textContent=`
  #guSplash{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:radial-gradient(120% 80% at 50% 38%,#2E4A7A 0%,#1A2B4C 55%,#0E1A31 100%);font-family:${F};color:#FFF3D6;overflow:hidden;transition:opacity .6s,transform .6s}
  #guSplash.out{opacity:0;transform:scale(1.06);pointer-events:none}
  #guSplash .sp{position:absolute;width:6px;height:6px;border-radius:50%;background:#FFE7A8;box-shadow:0 0 10px #FFD36E;opacity:0;animation:guTw 2.6s ease-in-out infinite}
  @keyframes guTw{0%,100%{opacity:0;transform:scale(.4)}50%{opacity:.9;transform:scale(1)}}
  #guSplash .lg{width:118px;height:118px;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 0 0 5px #D9B56A,0 0 0 9px #ffffff22,0 12px 40px #0008;animation:guLg .9s cubic-bezier(.3,1.6,.5,1) both}
  #guSplash .lg img{width:92px;height:92px;object-fit:contain}
  @keyframes guLg{0%{transform:scale(.2) rotate(-30deg);opacity:0}100%{transform:none;opacity:1}}
  #guSplash .fm{font-size:13px;letter-spacing:4px;color:#E9C989;opacity:0;animation:guUp .6s .5s both}
  #guSplash .tt{position:relative;overflow:hidden;padding:7px 26px;border-radius:999px;background:linear-gradient(180deg,#FFE7A8,#D9A84E);color:#4A2E08;font-size:21px;letter-spacing:3px;box-shadow:0 0 0 3px #fff,0 6px 0 3px #8A6224,0 12px 22px #0006;opacity:0;animation:guUp .6s .75s both}
  #guSplash .tt:after{content:"";position:absolute;top:-20%;bottom:-20%;width:30%;left:-40%;background:linear-gradient(100deg,transparent,#fffa 50%,transparent);transform:skewX(-18deg);animation:guShine 1s 1.3s ease-out forwards}
  @keyframes guUp{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:none}}
  #guSplash .hd{display:flex;gap:4px;margin-top:8px;min-height:90px}
  #guSplash .hd div{width:72px;text-align:center;opacity:0;transform:translateY(16px) scale(.5)}
  #guSplash .hd div.on{animation:guHd .5s cubic-bezier(.3,1.6,.5,1) forwards}
  @keyframes guHd{100%{opacity:1;transform:none}}
  #guSplash .hd i{display:block;width:70px;height:70px;margin:0 auto;background:center/contain no-repeat;filter:drop-shadow(0 4px 6px #0006)}
  #guSplash .hd span{display:block;margin-top:5px;font-size:10px;color:#FFE7B0;white-space:nowrap;letter-spacing:.5px}
  #guSplash .bar{width:min(230px,62vw);height:10px;border-radius:99px;background:#ffffff1f;border:1.5px solid #D9B56A88;overflow:hidden;margin-top:6px}
  #guSplash .bar b{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#D9A84E,#FFE7A8);transition:width .4s}
  #guSplash .tip{font-size:11.5px;color:#C9D4EA;letter-spacing:1px}
  #guSplash .hd div{transition:filter .3s}#guSplash .hd div.on i{transition:transform .3s cubic-bezier(.3,1.6,.5,1)}
  #guSplash .hd.talking div.on:not(.talk){filter:brightness(.62) saturate(.8)}
  #guSplash .hd div.talk i{transform:translateY(-6px) scale(1.14)}
  #guSplash .hd div.talk span{color:#FFE7A8;font-weight:700}
  #guSplash .say{position:relative;min-height:38px;max-width:min(300px,84vw);padding:8px 16px;border-radius:16px;background:#FFF8EC;color:#1A2B4C;font-size:14px;font-weight:700;letter-spacing:1px;box-shadow:0 0 0 2.5px #D9B56A,0 8px 18px #0006;display:flex;align-items:center;justify-content:center;white-space:nowrap;opacity:0;transition:opacity .25s}
  #guSplash .say.on{opacity:1}
  #guSplash .say:before{content:"";position:absolute;top:-9px;left:var(--ax,50%);margin-left:-9px;border:9px solid transparent;border-top:0;border-bottom-color:#D9B56A}
  #guSplash .say:after{content:"";position:absolute;top:-6px;left:var(--ax,50%);margin-left:-7px;border:7px solid transparent;border-top:0;border-bottom-color:#FFF8EC}
  #guSplash .say b{display:inline-block;transition:opacity .2s}
  #guSplash .say2{display:flex;flex-direction:column;align-items:center;gap:6px;min-height:132px;margin-top:2px}
  #guSplash .say2 .ln{display:flex;align-items:center;gap:7px;padding:5px 13px 5px 6px;border-radius:999px;background:#FFF8EC;color:#1A2B4C;font-size:14px;font-weight:700;letter-spacing:.5px;white-space:nowrap;box-shadow:0 0 0 2px #E9C46A,0 4px 10px #0004;opacity:0;transform:translateY(8px) scale(.85);transition:opacity .25s,transform .35s cubic-bezier(.3,1.6,.5,1)}
  #guSplash .say2 .ln.on{opacity:1;transform:none}
  #guSplash .say2 .ln em{font-style:normal;font-size:11px;color:#FFF3D6;padding:2px 8px;border-radius:999px;letter-spacing:1px}
  /* v522 陳老闆定稿：一次一顆泡泡，在講話的人頭下彈出；奶油底深藍圓邊細金線、左上插畫太陽、右下葉片形雙層閃光 */
  #guSplash .say3{position:relative;height:74px;margin-top:4px}
  #guSplash .say3 .w{position:absolute;top:16px;left:0;transform:scale(0)}
  #guSplash .say3 .w.go{animation:guSq .5s cubic-bezier(.3,1.6,.5,1) forwards}
  @keyframes guSq{0%{transform:scale(0)}45%{transform:scale(1.14,.86)}70%{transform:scale(.95,1.06)}100%{transform:scale(1)}}
  #guSplash .say3 .bb{position:relative;z-index:2;white-space:nowrap;font-size:15px;font-weight:800;letter-spacing:.5px;color:#1A2B4C;background:#FFF8EC;border:3.5px solid #1A2B4C;border-radius:22px;padding:9px 17px;box-shadow:0 6px 14px #0005}
  #guSplash .say3 .bb:after{content:"";position:absolute;inset:4px;border:1.5px solid #E9C46A;border-radius:16px;pointer-events:none}
  #guSplash .say3 .sun{position:absolute;left:-19px;top:-21px;width:38px;height:38px;z-index:3;animation:guSw 2.4s ease-in-out infinite}
  @keyframes guSw{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}
  #guSplash .say3 .fan{position:absolute;right:-1px;bottom:-1px;width:0;height:0;z-index:3}
  #guSplash .say3 .fan svg{position:absolute;left:0;top:-4px;height:8px;transform-origin:-5px 4px;transform:rotate(var(--a)) translateX(5px) scale(0)}
  #guSplash .say3 .w.go .fan svg{animation:guPp .4s cubic-bezier(.3,1.8,.5,1) var(--d) forwards,guTk 1.3s ease-in-out calc(var(--d) + .4s) infinite}
  @keyframes guPp{to{transform:rotate(var(--a)) translateX(5px) scale(1)}}
  @keyframes guTk{0%,100%{transform:rotate(var(--a)) translateX(5px) scale(1)}50%{transform:rotate(var(--a)) translateX(7px) scale(.82)}}
  @media (prefers-reduced-motion:reduce){#guSplash .say3 .sun,#guSplash .say3 .w.go .fan svg{animation:none}#guSplash .say3 .fan svg{transform:rotate(var(--a)) translateX(5px)}}`;
  document.head.appendChild(st);
  const sp=document.createElement('div');sp.id='guSplash';
  let stars='';for(let i=0;i<22;i++)stars+='<i class="sp" style="left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;animation-delay:'+(Math.random()*2.6).toFixed(2)+'s"></i>';
  const NM=['林律師','夢奇奇飼養者','哈姆太郎','薪水掌門人'],KEY=['林律師','夢奇奇飼養者','哈姆太郎','薪水掌門人'];
  sp.innerHTML=stars+'<div class="lg"><img src="office-logo-transparent.png" alt="德威陽"></div><div class="fm">德威陽國際法律事務所</div><div class="tt">YES, WE DO! 有法度</div><div class="hd">'+NM.map(n=>'<div><i></i><span>'+n+'</span></div>').join('')+'</div><div class="say"><b></b></div><div class="bar"><b></b></div><div class="tip">準備法律探索島中…</div>';
  document.body.appendChild(sp);
  /* v490：移除開頁瞬間就顯示的靜態遮罩，改由動畫載入畫面接手 */
  requestAnimationFrame(()=>{const pre=document.getElementById('guPre');if(pre)pre.remove()});
  const t0=performance.now();let prog=0,done=false,headsOn=false;const bar=sp.querySelector('.bar b');
  const step=setInterval(()=>{if(done)return;prog=Math.min(88,prog+(88-prog)*.06+.4);bar.style.width=prog+'%';
   if(!headsOn&&(window.wyGetStickers||window.wyGetHeads)){headsOn=true;let H={};try{H=window.wyGetStickers?window.wyGetStickers():window.wyGetHeads()}catch(e){}const ds=sp.querySelectorAll('.hd div');ds.forEach((d,i)=>{const img=H[KEY[i]];if(img)d.querySelector('i').style.backgroundImage='url('+img+')';setTimeout(()=>d.classList.add('on'),i*180)})
    /* v514 陪選預覽：四位成員輪流說一句，介紹等一下要做什麼（不延長載入時間，載完就照常進下一步） */
    /* v522 陳老闆定稿：一次一顆泡泡，輪到誰就在誰頭下彈出，每人約 0.9 秒，四句約 3.6 秒（這段時間手機在後面準備島） */
    {const SAY=[[0,'歡迎來到有法度！'],[1,'入島登記，交給我！'],[2,'乖乖放好，馬上開島！'],[3,'燈全開了，電費我算。']];const hd=sp.querySelector('.hd');const box=sp.querySelector('.say');box.className='say3';
     /* v522 定稿：插畫太陽（沒有臉）＋右下三片葉片形雙層閃光；純 SVG／CSS，不用圖片 */
     const SUN='<svg class="sun" viewBox="0 0 48 48" aria-hidden="true"><g fill="#E9C46A" stroke="#1A2B4C" stroke-width="1.8" stroke-linejoin="round">'+[0,90,180,270].map(a=>'<path transform="rotate('+a+' 24 24)" d="M24 1.8C26.4 5.4 26.4 8.2 24 10.4C21.6 8.2 21.6 5.4 24 1.8Z"/>').join('')+[45,135,225,315].map(a=>'<path transform="rotate('+a+' 24 24)" d="M24 5.2C25.9 7.8 25.9 9.8 24 11.4C22.1 9.8 22.1 7.8 24 5.2Z"/>').join('')+'</g><circle cx="24.6" cy="24.8" r="10.6" fill="#1A2B4C"/><circle cx="24" cy="24" r="10.2" fill="#E9C46A" stroke="#1A2B4C" stroke-width="1.6"/><path d="M18.2 21.2A7 7 0 0 1 22.4 17.6" stroke="#FFF6D6" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="17.6" cy="24.6" r="1.1" fill="#FFF6D6"/></svg>';
     const LEAF=(a,l,d)=>'<svg viewBox="0 0 20 8" style="--a:'+a+'deg;--d:'+d+'s;width:'+l+'px" aria-hidden="true"><path d="M1.2 4C5 .6 13 .4 18.8 4C13 7.6 5 7.4 1.2 4Z" fill="#E9C46A" stroke="#1A2B4C" stroke-width="1.6" stroke-linejoin="round"/></svg>';
     box.innerHTML='<div class="w">'+SUN+'<div class="bb"></div><div class="fan">'+LEAF(-12,15,.35)+LEAF(38,19,.42)+LEAF(88,14,.49)+'</div></div>';
     const w=box.querySelector('.w'),bb=box.querySelector('.bb');let k=0;
     const next=()=>{if(!sp.isConnected)return;if(k>=SAY.length){setTimeout(()=>{window.__guSayDone=1},350);return}const [n,t]=SAY[k++];ds.forEach(d=>d.classList.remove('talk'));ds[n].classList.add('talk');hd.classList.add('talking');
      box.style.width=hd.offsetWidth+'px';w.classList.remove('go');bb.textContent=t;const W=hd.offsetWidth,hb=hd.getBoundingClientRect(),db=ds[n].getBoundingClientRect(),x=db.left+db.width/2-hb.left,bw=bb.offsetWidth;const l=Math.max(18,Math.min(W-bw-22,x-bw/2));
      w.style.left=l+'px';w.style.transformOrigin=Math.max(10,Math.min(bw-10,x-l))+'px 0';void w.offsetWidth;w.classList.add('go');setTimeout(next,900)};
     setTimeout(next,4*180+300)}}
   const cr=document.getElementById('creator');const ready=!!window.__wyGame||(cr&&cr.style.display&&cr.style.display!=='none');
   if(ready&&headsOn&&window.__guSayDone&&!window.__guHold){/* v516：載入畫面不等；每次都有選角和律師函，島在這段時間整理，蓋章後才起飛 */done=true;bar.style.width='100%';setTimeout(()=>{sp.classList.add('out');setTimeout(()=>{sp.remove();clearInterval(step)},650)},950)}
   if(performance.now()-t0>20000&&!done&&!window.__guHold){done=true;sp.classList.add('out');setTimeout(()=>{sp.remove();clearInterval(step)},650)}},120);
 })();
 /* ---------- 元件 ---------- */
 const badge=document.createElement('div');badge.className='gu guBadge';badge.style.display='none';
 badge.innerHTML='<div class="guEm"><img src="office-logo-transparent.png" alt="德威陽"></div><div class="guTab"><b></b><span></span></div>';
 const tr=document.createElement('div');tr.className='gu guTR';tr.style.display='none';
 /* v492：音效開關獨立成一顆按鈕，放在選單下方，一眼找得到 */
 const snd=document.createElement('button');snd.type='button';snd.className='gu guSnd';snd.style.display='none';snd.setAttribute('aria-label','音效開關');
 const menu=document.createElement('div');menu.className='gu guMenu';
 menu.innerHTML='<div class="guCard">'+
  '<div class="guMi" data-m="view"><b>視角</b><div class="guSeg"><span data-v="overview">俯瞰</span><span data-v="follow">跟隨</span></div></div>'+
  '<div class="guMi" data-m="sky"><b>天空</b><div class="guSeg"><span data-k="auto">自動</span><span data-k="day">白天</span><span data-k="night">夜晚</span></div></div>'+
  '<div class="guMi" data-m="help"><b>操作說明</b><small>搖桿、點地面、縮放</small></div>'+
  '<div class="guHelp">用左下搖桿，或手指點地面，人物就會走過去。<br>一指拖曳旋轉視角，兩指張合縮放。<br>走到大門前，按金色按鈕就能進館。</div>'+
  '<a class="guMi" href="guide.html"><b>文字版導覽</b><small>一頁看懂德威陽</small></a>'+
  '<a class="guMi line" href="https://line.me/R/ti/p/@wylaw" target="_blank" rel="noopener"><b>LINE 諮詢</b><small>@wylaw</small></a>'+
  '<div class="guMi" data-m="photo" style="background:linear-gradient(180deg,#FFE7A8,#D9A84E);box-shadow:0 3px 0 #8A6224"><b style="color:#4A2E08">跟成員合照</b><small style="color:#6a4a14">存下來分享</small></div>'+
  '<div class="guMi" data-m="album"><b>紀念相簿</b><small>各島拍過的紀念照</small></div>'+
  '<div class="guMi" data-m="sound"><b>音效</b><div class="guSeg"><span data-s="on">開</span><span data-s="off">關</span></div></div>'+
  '<div class="guMi" data-m="home"><b>回城堡</b><small>回到德威陽城堡</small></div></div>';
 const toast=document.createElement('div');toast.className='gu guToast gone';toast.textContent='搖桿走動　點標示互動';
 const iris=document.createElement('div');iris.className='guIris';iris.innerHTML='<i></i><img src="office-logo-transparent.png" alt="">';
 const back=document.createElement('div');back.className='gu guBack';back.innerHTML='<i><svg viewBox="0 0 24 24" fill="none" stroke="#FFE7B0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5 8 12l6.5 6.5"/></svg></i><span>回島上</span>';
 const ICO={guide:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"><path d="M4 5.5C6 4.5 9 4.5 12 6c3-1.5 6-1.5 8-.5V19c-2-1-5-1-8 .5C9 18 6 18 4 19z"/><path d="M12 6v13.5"/></svg>',snd:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z" fill="#fff"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>',sndOff:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z" fill="#fff"/><path d="M16 9l6 6M22 9l-6 6"/></svg>',cam:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"><path d="M4 8h3.5L9 6h6l1.5 2H20v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',letter:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg>'};
 const tiles=document.createElement('div');tiles.className='guTiles';tiles.innerHTML='<div class="guTile" data-t="guide"><i style="background:#2F8A6A">'+ICO.guide+'</i>指南</div><div class="guTile" data-t="sound"><i style="background:#1A2B4C">'+ICO.snd+'</i>音效</div><div class="guTile" data-t="photo"><i style="background:#D9A84E">'+ICO.cam+'</i>合照</div><div class="guTile" data-t="letter"><i style="background:#C8693A">'+ICO.letter+'</i>律師函</div>';
 const stamps=document.createElement('div');stamps.className='guStamps';
 const ISL=[[1,'訴','#E8803F'],[2,'醫','#3FA57F'],[3,'家','#D46F84'],[4,'企','#8E72C8']];
 const visited=()=>{try{return JSON.parse(localStorage.getItem('wy-isles')||'[]')}catch(e){return[]}};
 function syncTiles(){const V=visited();const n=ISL.filter(x=>V.includes(x[0])).length;stamps.innerHTML='<b>'+(n>=4?'四島制霸！':'島嶼集章 '+n+'／4')+'</b>'+ISL.map(([k,t,c])=>V.includes(k)?'<em class="on" style="background:'+c+'">'+t+'</em>':'<em>'+t+'</em>').join('');
  tiles.querySelector('[data-t="guide"]').classList.toggle('off',!(curRoom>=1&&curRoom<=4));const st=tiles.querySelector('[data-t="sound"]');st.querySelector('i').innerHTML=soundOn?ICO.snd:ICO.sndOff;st.querySelector('i').style.background=soundOn?'#1A2B4C':'#8A93A6';st.lastChild.textContent=soundOn?'音效 開':'音效 關'}
 {const card=menu.querySelector('.guCard');card.prepend(stamps);card.prepend(tiles)}
 tiles.addEventListener('click',e=>{const t=e.target.closest('.guTile');if(!t)return;e.stopPropagation();press(t);const k=t.dataset.t;
  if(k==='sound'){soundOn=!soundOn;try{localStorage.setItem('wy-sound',soundOn?'on':'off')}catch(err){}syncSnd();syncMenu();syncTiles();if(soundOn)window.wySfx('tap');return}
  window.wySfx('tap');menu.classList.remove('on');
  if(k==='guide'){const g=G();g&&g.openGuide(curRoom)}else if(k==='photo'){takePhoto()}else if(k==='letter'){try{window.wyOpening&&window.wyOpening.openLetter()}catch(err){}}});
 back.addEventListener('click',()=>{window.wySfx('tap');if(back.dataset.act==='leave'){const g=G();if(g)window.wyIris(()=>g.leave())}else if(back.dataset.act==='leaveCastle'){if(window.wyLeaveCastle){if(g0()===1)window.wyIris(()=>window.wyLeaveCastle());else window.wyLeaveCastle()}}});
 document.body.append(badge,tr,snd,menu,toast,iris,back);
 const tab=badge.querySelector('.guTab'),em=badge.querySelector('.guEm');

 /* ---------- 音效（超可愛版，即時合成） ---------- */
 let AC=null,soundOn=true;try{soundOn=localStorage.getItem('wy-sound')!=='off'}catch(e){}
 const SND_ON='<svg viewBox="0 0 24 24" fill="none" stroke="#FFE7B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z" fill="#FFE7B0"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
 const SND_OFF='<svg viewBox="0 0 24 24" fill="none" stroke="#E7EAF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z" fill="#E7EAF0"/><path d="M16 9l6 6M22 9l-6 6"/></svg>';
 function syncSnd(){snd.innerHTML=soundOn?SND_ON:SND_OFF;snd.classList.toggle('off',!soundOn);snd.setAttribute('aria-pressed',String(soundOn))}
 snd.addEventListener('click',e=>{e.stopPropagation();soundOn=!soundOn;try{localStorage.setItem('wy-sound',soundOn?'on':'off')}catch(err){}syncSnd();try{syncMenu()}catch(err){}if(soundOn)window.wySfx('tap')});syncSnd();
 const ac=()=>{if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}return AC};
 const env=(g,t,a,v,d)=>{g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0006,t+d)};
 function squeak(f,at,vol=.15,dur=.13){const a=ac();if(!a)return;const t=a.currentTime+at;const o=a.createOscillator(),g=a.createGain(),v=a.createOscillator(),vg=a.createGain();o.type='sine';o.frequency.setValueAtTime(f*.8,t);o.frequency.exponentialRampToValueAtTime(f*1.5,t+dur*.45);o.frequency.exponentialRampToValueAtTime(f*1.15,t+dur);v.frequency.value=34;vg.gain.value=f*.04;v.connect(vg);vg.connect(o.frequency);env(g,t,.005,vol,dur);o.connect(g);g.connect(a.destination);o.start(t);v.start(t);o.stop(t+dur+.03);v.stop(t+dur+.03)}
 function puyo(at,vol=.17){const a=ac();if(!a)return;const t=a.currentTime+at;const o=a.createOscillator(),g=a.createGain(),f=a.createBiquadFilter();o.type='triangle';o.frequency.setValueAtTime(620,t);o.frequency.exponentialRampToValueAtTime(260,t+.07);o.frequency.exponentialRampToValueAtTime(900,t+.2);f.type='lowpass';f.frequency.setValueAtTime(900,t);f.frequency.exponentialRampToValueAtTime(3200,t+.2);f.Q.value=8;env(g,t,.01,vol,.26);o.connect(f);f.connect(g);g.connect(a.destination);o.start(t);o.stop(t+.3)}
 function mbox(fr,at,vol=.12,dur=.7){const a=ac();if(!a)return;const t=a.currentTime+at;[[1,1],[3.01,.35],[5.4,.12]].forEach(([m,w])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=fr*m;env(g,t,.003,vol*w,dur/(m>1?2.2:1));o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+dur+.05)})}
 function sparkle(at,n=6,vol=.05){for(let i=0;i<n;i++)mbox(2000+Math.random()*2600,at+i*.045+Math.random()*.02,vol,.25)}
 function babble(at,base=520,n=4,vol=.1){const a=ac();if(!a)return;for(let i=0;i<n;i++){const t=a.currentTime+at+i*.075,f0=base*(1+((i*7)%5)*.12)*(.9+Math.random()*.25);const o=a.createOscillator(),g=a.createGain(),bp=a.createBiquadFilter();o.type='square';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f0*1.25,t+.05);bp.type='bandpass';bp.frequency.value=1400+Math.random()*900;bp.Q.value=5;env(g,t,.004,vol,.065);o.connect(bp);bp.connect(g);g.connect(a.destination);o.start(t);o.stop(t+.08)}}
 const SFX={
  tap(){squeak(1100,0,.12,.11)},
  flip(){puyo(0,.14);sparkle(.14,3,.035)},
  shine(){[1047,1319,1568,2093].forEach((f,i)=>mbox(f,i*.07,.1,.6));sparkle(.3,6,.04)},
  pop(){babble(0,560,4,.08);squeak(1300,.33,.1,.14)},
  open(){squeak(900,0,.1,.09);squeak(1250,.08,.1,.1);mbox(1568,.17,.08,.5)},
  ding(){mbox(1319,0,.28,.55);mbox(1047,.24,.4,.55);sparkle(.1,4,.03)},
  spin(){[784,988,1175,1568].forEach((f,i)=>squeak(f,i*.09,.09,.11));sparkle(.36,5,.04);mbox(2093,.42,.1,.45)},
  done(){[1047,1319,1568,2093,1568,2093,2637].forEach((f,i)=>mbox(f,i*.085,.1,.55));sparkle(.62,8,.045);squeak(1500,.62,.1,.15)}};
 let lastSfx={};
 window.wySfx=k=>{if(!soundOn||!SFX[k])return;const now=performance.now();if(lastSfx[k]&&now-lastSfx[k]<120)return;lastSfx[k]=now;try{const a=ac();if(a&&a.state==='suspended')a.resume();SFX[k]()}catch(e){}};
 document.addEventListener('pointerdown',()=>{const a=AC;if(a&&a.state==='suspended')a.resume()},{passive:true});
 /* v508 聲音設計（陳老闆定案）：
    大門＝陳老闆本人錄的「Yes, we do!」（全站唯一真人聲）
    電梯到站＝「Yes, we do」節奏的音樂盒旋律（有回音、悠揚）
    四位成員說話＝音樂盒音色但乾淨、短、沒回音，每人三個音、各有個性 */
 const VO={},VURL={yes:'yes-we-do.wav?v=510'};
 const wavBuf=(a,ab)=>{const dv=new DataView(ab);let p=12,off=0,len=0,rate=22050;while(p<dv.byteLength-8){const id=String.fromCharCode(dv.getUint8(p),dv.getUint8(p+1),dv.getUint8(p+2),dv.getUint8(p+3)),sz=dv.getUint32(p+4,true);if(id==='fmt ')rate=dv.getUint32(p+12,true);if(id==='data'){off=p+8;len=sz;break}p+=8+sz}const n=len>>1,b=a.createBuffer(1,n,rate),ch=b.getChannelData(0);for(let i=0;i<n;i++)ch[i]=dv.getInt16(off+i*2,true)/32768;return b};
 const voLoad=k=>{if(VO[k])return VO[k].p;const a=ac();if(!a)return Promise.reject();VO[k]={p:fetch(VURL[k]).then(r=>r.arrayBuffer()).then(ab=>(VO[k].buf=wavBuf(a,ab)))};return VO[k].p};
 window.wyVoice=k=>{if(!soundOn||!VURL[k])return;try{const a=ac();if(!a)return;if(a.state==='suspended')a.resume();const play=buf=>{const s=a.createBufferSource();s.buffer=buf;const g=a.createGain();g.gain.value=1;s.connect(g);g.connect(a.destination);s.start()};if(VO[k]&&VO[k].buf)play(VO[k].buf);else voLoad(k).then(play).catch(()=>{})}catch(e){}};
 document.addEventListener('pointerdown',()=>{try{voLoad('yes').catch(()=>{})}catch(e){}},{once:true,passive:true});
 let REV=null;const rev=()=>{const a=ac();if(REV)return REV;const len=Math.floor(a.sampleRate*1.6),b=a.createBuffer(2,len,a.sampleRate);for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3.2)}const cv=a.createConvolver();cv.buffer=b;const w=a.createGain();w.gain.value=.22;cv.connect(w);w.connect(a.destination);REV=cv;return cv};
 const partials=(f,t0,vol,dur,P,wet)=>{const a=ac(),t=a.currentTime+t0,out=a.createGain();out.gain.value=vol;out.connect(a.destination);if(wet)out.connect(rev());P.forEach(([r,amp,dk])=>{if(f*r>15000)return;const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*r;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(amp,t+.003);g.gain.exponentialRampToValueAtTime(.0001,t+dur*dk);o.connect(g);g.connect(out);o.start(t);o.stop(t+dur+.1)})};
 const mbx=(f,t0,vol,dur)=>partials(f,t0,vol,dur,[[1,1,1],[3.98,.25,.35],[2,.2,.6],[6.1,.06,.15]],true);
 const mbxDry=(f,t0,vol,dur)=>partials(f,t0,vol,dur,[[1,1,1],[3.98,.3,.25],[2,.15,.5]],false);
 const bell=(f,t0,vol,dur)=>partials(f,t0,vol,dur,[[1,1,1],[2,.45,.7],[3.01,.18,.45],[4.17,.08,.3],[5.43,.05,.22]],true);
 window.wyChime=()=>{if(!soundOn)return;try{const a=ac();if(!a)return;if(a.state==='suspended')a.resume();mbx(1175,0,.12,.9);mbx(1319,.17,.12,.9);mbx(1568,.42,.14,1.8);bell(784,.42,.05,2.2);for(let i=0;i<6;i++)mbx(2637+i*300,.62+i*.035,.025,.4)}catch(e){}};
 const MBV={
  lin:{root:587,vol:.1,len:.7,st:[[1,0],[1.26,.2],[1,.42]],q:[[1,0],[1.122,.2],[1.335,.42]],ex:[[1,0],[1.26,.2],[1.5,.42]]},
  mq:{root:1568,vol:.05,len:.38,st:[[1,0],[1.26,.12],[1.122,.25]],q:[[1,0],[1.122,.12],[1.335,.25]],ex:[[1.26,0],[1.5,.12],[2,.25]]},
  pay:{root:1047,vol:.065,len:.4,st:[[1,0],[1,.14],[.891,.28]],q:[[1,0],[1,.14],[1.122,.28]],ex:[[1.122,0],[1.122,.14],[1.335,.28]]},
  ham:{root:880,vol:.075,len:.32,st:[[1,0],[1.5,.17],[1.26,.27]],q:[[1,0],[1.26,.17],[1.682,.27]],ex:[[1.335,0],[1,.17],[2,.27]]}};
 const whoKey=n=>{n=String(n||'');if(/林|律師/.test(n))return 'lin';if(/夢奇奇|飼養/.test(n))return 'mq';if(/薪水|掌門/.test(n))return 'pay';if(/哈姆/.test(n))return 'ham';return null};
 let lastSpeak=0;
 window.wySpeak=(who,text)=>{if(!soundOn)return;const k=MBV[who]?who:whoKey(who);if(!k)return;const now=performance.now();if(now-lastSpeak<250)return;lastSpeak=now;try{const a=ac();if(!a)return;if(a.state==='suspended')a.resume();const M=MBV[k],t=String(text||''),q=/[？?]\s*$/.test(t),ex=/[！!]/.test(t);M[q?'q':ex?'ex':'st'].forEach(([r,tt])=>mbxDry(M.root*r,tt,M.vol,M.len))}catch(e){}};

 /* ---------- 狀態 ---------- */
 const G=()=>window.__wyGame;
 let started=false;{const se=$('startExplore');if(se)se.addEventListener('click',()=>{started=true;try{const a=ac();a&&a.resume()}catch(e){}})}
 let atDoor=-1,introUntil=0;
 let playing=false,mode='',area=-1,curRoom=0,toastT=0,firstShown=false;
 function paint(c,t1,t2){badge.style.setProperty('--c1',c[0]);badge.style.setProperty('--c2',c[1]);badge.style.setProperty('--d',c[2]);tab.querySelector('b').textContent=t1;tab.querySelector('span').textContent=t2;toast.style.setProperty('--d',c[2])}
 function shine(){tab.classList.remove('guShine');void tab.offsetWidth;tab.classList.add('guShine')}
 function flipTo(c,t1,t2,sound=true){tab.classList.remove('guFlip');void tab.offsetWidth;tab.classList.add('guFlip');setTimeout(()=>paint(c,t1,t2),300);setTimeout(shine,420);if(sound)window.wySfx('flip')}
 function rbtn(ic,lb,c,act){return '<div class="guRB" data-act="'+act+'" style="--c1:'+c[0]+';--c2:'+c[1]+';--d:'+c[2]+'"><div class="guRnd">'+IC[ic]+'</div><span class="guLbl">'+lb+'</span></div>'}
 function setOut(){mode='out';snd.style.display='grid';document.body.classList.add('gu-out');document.body.classList.remove('gu-room');badge.style.display='flex';tr.style.display='flex';tr.innerHTML=rbtn('menu','選單',THEME[0],'menu');back.classList.remove('on');toast.classList.add('gone')}
 function setRoom(i){mode='room';snd.style.display='grid';curRoom=i;document.body.classList.remove('gu-out');document.body.classList.add('gu-room');badge.style.display='flex';tr.style.display='flex';
  const c=THEME[i];tr.innerHTML='';tr.style.display='none';back.dataset.act='leave';back.classList.add('on');try{const V=JSON.parse(localStorage.getItem('wy-isles')||'[]');if(!V.includes(i)){V.push(i);localStorage.setItem('wy-isles',JSON.stringify(V))}}catch(e){}
  flipTo(c,['','訴訟法律島','醫療法律島','家庭生活島','企業商務島'][i],SLOGAN[i]);
  clearTimeout(toastT);toast.textContent='搖桿走動　點標示互動';toast.classList.remove('gone');toastT=setTimeout(()=>toast.classList.add('gone'),3500)}
 window.wyOpenPhoneMenu=()=>{syncMenu();syncTiles();menu.classList.add('on')};const g0=()=>{try{const g=G();return g&&g.floor?g.floor():1}catch(e){return 1}};
 /* v515 陳老闆：城堡也有「回島上」，按鈕全島統一（一直排、貼右邊、音效在最下面） */
 function setCastle(){mode='castle';document.body.classList.remove('gu-out','gu-room');badge.style.display='none';tr.style.display='none';tr.innerHTML='';back.dataset.act='leaveCastle';back.classList.add('on');toast.classList.add('gone')}
 function addSnd(){let w=tr.querySelector('.guSW');if(!w){w=document.createElement('div');w.className='guRB guSW';w.innerHTML='<span class="guLbl">音效</span>'}w.prepend(snd);tr.append(w)}
 function setHidden(){mode='hidden';back.classList.remove('on');snd.style.display='none';document.body.classList.remove('gu-out','gu-room');badge.style.display='none';tr.style.display='none';toast.classList.add('gone');menu.classList.remove('on')}

 /* ---------- 轉場（圓圈收合，中心停一下 Logo） ---------- */
 let irisBusy=false;
 window.wyIris=function(cb){if(irisBusy||!playing){return cb()}irisBusy=true;const R=Math.hypot(innerWidth,innerHeight)*1.1;const ring=iris.querySelector('i');
  iris.style.display='block';iris.classList.remove('logo');ring.style.transition='none';ring.style.setProperty('--s',R+'px');void ring.offsetWidth;
  ring.style.transition='width .38s cubic-bezier(.6,0,.9,.5),height .38s cubic-bezier(.6,0,.9,.5)';ring.style.setProperty('--s','0px');window.wySfx('shine');
  setTimeout(()=>{iris.classList.add('logo');let r;try{r=cb()}catch(e){console.error(e)}
   setTimeout(()=>{iris.classList.remove('logo');ring.style.transition='width .45s cubic-bezier(.2,.6,.3,1),height .45s cubic-bezier(.2,.6,.3,1)';ring.style.setProperty('--s',R+'px');
    setTimeout(()=>{iris.style.display='none';irisBusy=false},470)},360)},400)};

 /* ---------- 按鈕與選單 ---------- */
 function press(el){el.classList.add('down');setTimeout(()=>el.classList.remove('down'),140)}
 tr.addEventListener('click',e=>{const b=e.target.closest('.guRB');if(!b)return;press(b);window.wySfx('tap');const a=b.dataset.act;
  if(a==='menu'){syncMenu();syncTiles();setTimeout(()=>menu.classList.add('on'),90)}
  else if(a==='guide'){const g=G();g&&g.openGuide(curRoom)}
  else if(a==='leave'){const g=G();if(g)window.wyIris(()=>g.leave())}
  else if(a==='leaveCastle'){if(window.wyLeaveCastle){if(g0()===1)window.wyIris(()=>window.wyLeaveCastle());else window.wyLeaveCastle()}}});
 function syncMenu(){const ov=window.__wyGame&&window.__wyGame.overview?window.__wyGame.overview():true;menu.querySelectorAll('[data-v]').forEach(s=>s.classList.toggle('on',(s.dataset.v==='overview')===!!ov));menu.querySelectorAll('[data-s]').forEach(s=>s.classList.toggle('on',(s.dataset.s==='on')===soundOn));const sk=window.wySky?window.wySky.mode:'auto';menu.querySelectorAll('[data-k]').forEach(s=>s.classList.toggle('on',s.dataset.k===sk))}
 menu.addEventListener('click',e=>{if(e.target===menu){menu.classList.remove('on');return}
  const mi=e.target.closest('.guMi');if(!mi)return;press(mi);window.wySfx('tap');const m=mi.dataset.m;
  if(m==='view'){const v=e.target.closest('[data-v]');const id=v?v.dataset.v:(menu.querySelector('[data-v="overview"]').classList.contains('on')?'follow':'overview');const b=$(id);if(b)b.click();setTimeout(syncMenu,60)}
  else if(m==='sky'){const k=e.target.closest('[data-k]');if(k&&window.wySky){window.wySky.set(k.dataset.k);syncMenu()}}
  else if(m==='help'){menu.querySelector('.guHelp').classList.toggle('on')}
  else if(m==='sound'){const s=e.target.closest('[data-s]');soundOn=s?s.dataset.s==='on':!soundOn;try{localStorage.setItem('wy-sound',soundOn?'on':'off')}catch(err){}syncMenu();syncSnd();if(soundOn)window.wySfx('tap')}
  else if(m==='home'){menu.classList.remove('on');const h=$('home');if(h)h.click()}
  else if(m==='photo'){menu.classList.remove('on');takePhoto()}
  else if(m==='album'){menu.classList.remove('on');try{window.wyOpenAlbum&&window.wyOpenAlbum()}catch(err){}}});
 /* 主按鈕：大門前改為「進入」 */
 document.addEventListener('click',e=>{const it=e.target.closest&&e.target.closest('#interact');if(!it||!playing)return;press(it);window.wySfx('tap');
  if(mode==='out'&&atDoor>=0){e.stopImmediatePropagation();e.preventDefault();const g=G();g&&g.enter(atDoor)}
  else if(mode==='out'&&window.wyNearAction){e.stopImmediatePropagation();e.preventDefault();try{window.wyNearAction.fn()}catch(err){}}},true);
 document.addEventListener('click',e=>{const h=e.target.closest&&e.target.closest('#home');if(h&&playing){press(h);window.wySfx('tap')}},true);
 /* 原本的「返回探索島」也套轉場 */
 document.addEventListener('click',e=>{const x=e.target.closest&&e.target.closest('#officeExit');if(!x||!playing||x.dataset.guPass)return;e.stopImmediatePropagation();e.preventDefault();window.wyIris(()=>{x.dataset.guPass='1';x.click();delete x.dataset.guPass})},true);
 /* 點地面的金色漣漪 */
 let pd=null;document.addEventListener('pointerdown',e=>{if(mode!=='out'||e.target.tagName!=='CANVAS')return;pd={x:e.clientX,y:e.clientY,t:performance.now()}},{passive:true});
 document.addEventListener('pointerup',e=>{if(!pd||mode!=='out'||e.target.tagName!=='CANVAS'){pd=null;return}if(Math.hypot(e.clientX-pd.x,e.clientY-pd.y)<8&&performance.now()-pd.t<300){const r=document.createElement('div');r.className='guRipple';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';document.body.appendChild(r);setTimeout(()=>r.remove(),650)}pd=null},{passive:true});


 /* ---------- v487 合照 ---------- */
 const phCss=document.createElement('style');phCss.textContent=`
 #guPhoto{position:fixed;inset:0;z-index:600;background:#0E1A31e6;display:none;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:16px;font-family:${F}}
 #guPhoto.on{display:flex}
 #guPhoto img{max-width:min(92vw,430px);max-height:68dvh;border-radius:14px;box-shadow:0 0 0 3px #D9B56A,0 16px 36px #0008;-webkit-touch-callout:default;user-select:auto;animation:guCardIn .45s cubic-bezier(.3,1.5,.5,1)}
 #guPhoto .ph{color:#FFE7B0;font-size:13.5px;letter-spacing:1px;text-align:center}
 #guPhoto .bt{display:flex;gap:10px}
 #guPhoto button{border:3px solid #fff;border-radius:14px;padding:10px 18px;font-family:${F};font-size:15px;cursor:pointer}
 #guPhoto .again{background:linear-gradient(180deg,#FFE7A8,#D9A84E);color:#4A2E08;box-shadow:0 0 0 2px #B88A3E,0 4px 0 2px #8A6224}
 #guPhoto .close{background:linear-gradient(180deg,#2E4A7A,#1A2B4C);color:#FFE7B0;box-shadow:0 0 0 2px #B88A3E,0 4px 0 2px #0E1A31}
 #guPhoto .flash{position:fixed;inset:0;background:#fff;opacity:0;pointer-events:none}
 #guPhoto .flash.go{animation:guFlash .5s ease-out}
 @keyframes guFlash{0%{opacity:.95}100%{opacity:0}}
 #guPhoto .wait{color:#FFE7B0;font-size:15px}`;document.head.appendChild(phCss);
 const ph=document.createElement('div');ph.id='guPhoto';ph.innerHTML='<div class="wait">拍照中…</div><img alt="德威陽合照" style="display:none"><div class="ph" style="display:none">長按照片可以儲存，或分享到 LINE、IG</div><div class="bt"><button class="again">再拍一張</button><button class="close">回到島上</button></div><div class="flash"></div>';document.body.appendChild(ph);
 ph.querySelector('.close').onclick=()=>{window.wySfx('tap');ph.classList.remove('on')};
 ph.querySelector('.again').onclick=()=>{window.wySfx('tap');takePhoto()};
 function rr(x,a,b,w,h,r){x.beginPath();x.roundRect(a,b,w,h,r)}
 async function compose(shotUrl){try{await document.fonts.load('64px "Huninn"')}catch(e){}
  const FN='"Huninn","PingFang TC","Noto Sans TC",sans-serif';const c=document.createElement('canvas');c.width=1080;c.height=1350;const x=c.getContext('2d');
  const img=u=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=u});
  const [shot,logo]=await Promise.all([img(shotUrl),img('office-logo-transparent.png')]);
  x.fillStyle='#FFFBF2';x.fillRect(0,0,1080,1350);x.lineWidth=10;x.strokeStyle='#D9B56A';x.strokeRect(18,18,1044,1314);x.lineWidth=3;x.strokeRect(34,34,1012,1282);
  /* 照片區 */
  x.save();rr(x,60,60,960,826,40);x.clip();const g=x.createLinearGradient(0,60,0,886);g.addColorStop(0,'#BFE3FA');g.addColorStop(.62,'#EAF6FD');g.addColorStop(1,'#FFF1DC');x.fillStyle=g;x.fillRect(60,60,960,826);
  for(let i=0;i<26;i++){const px=80+Math.random()*920,py=80+Math.random()*420,r=2+Math.random()*4;x.fillStyle='rgba(255,231,168,'+(.35+Math.random()*.5)+')';x.beginPath();x.arc(px,py,r,0,7);x.fill()}
  x.fillStyle='rgba(255,255,255,.75)';[[190,210,70],[260,190,90],[330,215,62],[760,170,64],[830,150,84],[900,178,58]].forEach(([a,b,r])=>{x.beginPath();x.arc(a,b,r,0,7);x.fill()});
  if(shot)x.drawImage(shot,60+(960-shot.width*.96)/2,96,shot.width*.96,shot.height*.96);x.restore();
  x.lineWidth=6;x.strokeStyle='#fff';rr(x,60,60,960,826,40);x.stroke();
  /* 左上名牌 */
  x.fillStyle='#1A2B4C';rr(x,86,86,330,74,37);x.fill();x.strokeStyle='#D9B56A';x.lineWidth=4;x.stroke();x.fillStyle='#fff';x.beginPath();x.arc(123,123,30,0,7);x.fill();if(logo)x.drawImage(logo,99,99,48,48);
  x.fillStyle='#FFE7B0';x.font='34px '+FN;x.textBaseline='middle';x.fillText('德威陽｜有法度',166,124);
  /* 文字 */
  x.textAlign='center';x.textBaseline='alphabetic';x.fillStyle='#1A2B4C';x.font='70px '+FN;x.fillText('我在德威陽，有法度！',540,990);
  x.fillStyle='#9A6A22';x.font='38px '+FN;x.fillText('台灣・美國紐約州律師｜中英日三語',540,1052);
  x.fillStyle='#5d5045';x.font='32px '+FN;x.fillText('Google 搜尋「德威陽 有法度」　#德威陽有法度',540,1108);
  /* 底部 */
  const by=1150;const bg=x.createLinearGradient(0,by,0,by+150);bg.addColorStop(0,'#2E4A7A');bg.addColorStop(1,'#1A2B4C');x.fillStyle=bg;rr(x,60,by,960,140,30);x.fill();x.strokeStyle='#D9B56A';x.lineWidth=4;x.stroke();
  x.fillStyle='#fff';x.beginPath();x.arc(140,by+70,46,0,7);x.fill();if(logo)x.drawImage(logo,104,by+34,72,72);
  x.textAlign='left';x.fillStyle='#FFF3D6';x.font='40px '+FN;x.fillText('德威陽國際法律事務所',212,by+62);
  x.fillStyle='#E9C989';x.font='30px '+FN;x.fillText('LINE @wylaw　｜　weiandyang.com',212,by+110);
  return c.toDataURL('image/jpeg',.92)}
 let shooting=false;
 async function takePhoto(){if(shooting)return;shooting=true;ph.classList.add('on');const im=ph.querySelector('img'),wt=ph.querySelector('.wait'),tip=ph.querySelector('.ph');im.style.display='none';tip.style.display='none';wt.style.display='block';
  try{const shot=window.wyPhotoShot?await window.wyPhotoShot():'';const url=await compose(shot);im.src=url;im.style.display='block';tip.style.display='block';wt.style.display='none';const fl=ph.querySelector('.flash');fl.classList.remove('go');void fl.offsetWidth;fl.classList.add('go');window.wySfx('done')}
  catch(e){console.error(e);wt.textContent='拍照失敗，請再試一次'}shooting=false}
 /* ---------- 每 0.3 秒同步狀態 ---------- */
 const POP=['wyMediation','wyFee','wyFiling','wyBench','wyJusticeLink','wyJustice','wyRC','wyMedicalExperience','wyFamilyExperience','wy410BusinessPanel','wyInfo','dialog','wyLitigationInfo433'];
 const popVis={};let ghVis=false,chVis=false;
 const vis=el=>!!el&&el.style.display!=='none'&&getComputedStyle(el).display!=='none';
 function tick(){const g=G();if(!g)return;
  if(!playing){if(started){playing=true;document.body.classList.add('gu-play')}else return}
  const inside=g.inside(),room=g.room();
  if(!inside){if(mode!=='out'){setOut();area=-1}
   var a=g.actor();if(a){let best=-1,bd=1e9;g.xy.forEach(([x,z],i)=>{const d=Math.hypot(a.position.x-x,a.position.z-z);if(d<(i===0?24:19)&&d<bd){bd=d;best=i}});
    if(best>=0&&best!==area){const firstTime=area===-1&&!firstShown;area=best;
     if(firstTime){firstShown=true;introUntil=performance.now()+2400;em.classList.remove('guPop');void em.offsetWidth;em.classList.add('guPop');paint(THEME[0],'德威陽｜有法度',window.wyFestGreeting?('YES, WE DO!　'+window.wyFestGreeting):'YES, WE DO!');setTimeout(shine,350);window.wySfx('shine');
      setTimeout(()=>{if(mode==='out')flipTo(THEME[area],g.names[area],OUT_HINT[area])},1900)}
     else flipTo(THEME[best],g.names[best],OUT_HINT[best])}}
   const it=$('interact');atDoor=-1;if(a&&area>=0&&area<=4){const [x,z]=g.xy[area];/* v497：要真的走到大門前約 5 步才切換 */const DZ=area===0?7:8.5;if(Math.hypot(a.position.x-x,a.position.z-(z+DZ))<6)atDoor=area}const dp=$('wyDoorPrompt');if(dp&&dp.style.display!=='none'&&atDoor<0)atDoor=2;
   const NA=atDoor<0?window.wyNearAction:null;/* v498：節慶互動（例如春節求籤）也用金色按鈕 */
   if(it){const lb=atDoor>=0?'進入':NA?NA.label:'介紹';if(it.textContent!==lb)it.textContent=lb;it.classList.toggle('glow',atDoor>=0||!!NA);it.classList.remove('dim')}
   if(performance.now()<introUntil){}else if(NA&&area>=0){const s=tab.querySelector('span');if(s.textContent!==NA.hint)s.textContent=NA.hint}
   else if(atDoor>=0&&area>=0){const s=tab.querySelector('span');if(s.textContent!=='按金色按鈕進入參觀')s.textContent='按金色按鈕進入參觀'}
   else if(area>=0){const s=tab.querySelector('span');if(s.textContent==='按金色按鈕進入參觀'||/^按金色按鈕(?!進入)/.test(s.textContent))s.textContent=OUT_HINT[area]}}
  else if(room>=1&&room<=4){if(mode!=='room'||curRoom!==room)setRoom(room)}
  else{if(window.wyCastleCanLeave&&window.wyCastleCanLeave()){if(mode!=='castle')setCastle()}else if(mode!=='hidden')setHidden();const it=$('interact'),f=g.floor();if(it){const lb=f===3?'互動':'交談';if(it.textContent!==lb)it.textContent=lb;it.classList.toggle('dim',f===3);it.classList.remove('glow')}}
  /* 指南打開時讓位 */
  const guideOpen=[...document.querySelectorAll('.wy175Guide,#wyMedicalGuide,#wyFamilyGuide,#wyMainGuide')].some(vis);document.body.classList.toggle('gu-guide',guideOpen);
  /* 左下角人物出現時，下方提示先讓開 */
  const ch=document.querySelector('.wyCH');const chOn=!!ch&&ch.style.display==='block';if(chOn&&!toast.classList.contains('gone'))toast.classList.add('gone');
  /* 音效：視窗打開、人物探頭 */
  for(const id of POP){const v=vis($(id));if(v&&!popVis[id])window.wySfx('open');popVis[id]=v}
  const gh=document.querySelector('.wyGH');const ghOn=!!gh&&gh.style.display==='block';if(ghOn&&!ghVis)window.wySfx('pop');ghVis=ghOn;
  if(chOn&&!chVis)window.wySfx('pop');chVis=chOn;
 }
 setInterval(tick,300);
})();
