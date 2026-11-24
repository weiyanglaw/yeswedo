// 德威陽｜有法度 — 各島指南介紹人（v482）
// 指南第一次跳出（或按指南按鈕再打開）時，介紹人從指南框後面偷偷探頭、跳出來揮手，雲朵講一句宣傳台詞（名字在雲朵裡）。
// 律師資格一律寫林律師個人；健保只寫「經驗豐富」；不寫律師費。
const NAMEC=['#1A2B4C','#A8476F','#2B6A8A','#8A5A12'];
const NAMES=['林律師','夢奇奇飼養者','哈姆太郎','薪水掌門人'];
export const WY_HOST_LINES={
 lit:['咦？林律師是台灣律師，也是紐約州律師？對！','跨國官司兩邊跑？林律師看得懂兩國規則。','收到英文律師函別慌，先拍照傳德威陽 LINE @wylaw。','美國客戶、台灣工廠，德威陽兩邊的合約都顧到。','中文、英文、日文，林律師三種語言都能談案子！','美國法院來信？期限很短，先問清楚再回。','哇，海外投資、跨國併購，也是德威陽的日常。','台美兩邊的法律差在哪？問林律師最快。','出國做生意前，合約先讓德威陽看一眼。','跨國糾紛不用分頭找，德威陽一次處理。','英文合約、日文契約，林律師直接看原文，不用等翻譯。','外國當事人來台灣打官司，林律師中英日都能直接溝通。'],
 med:['醫療糾紛先別急著吵，病歷先申請、先整理。','手術結果不如預期，不一定是疏失，要看過程和證據。','醫療鑑定怎麼送、問什麼問題，影響很大。','醫藥費、看護費、薪資損失，每一筆都要留單據。','和解金額怎麼算？損失清單先列清楚再談。','醫療爭議也能先調解，不一定要直接上法院。','病歷有沒有被改過？時間紀錄會說話。','醫療院所遇到病人申訴，也需要專業的法律意見。','健保案件，林律師經驗豐富。','賠償算清楚，心裡才踏實。歡迎 LINE @wylaw 聯繫我們。','外籍人士在台灣就醫發生爭議，英文、日文都能直接談。'],
 fam:['離婚協議跟軟體一樣，條款沒寫到就會出 bug。','孩子跟誰住、怎麼探視，協議要寫到可以執行。','扶養費幾號付、付多少，寫清楚就少吵一半。','夫妻財產要分，先把雙方的財產清單備份好。','遺囑格式不對可能無效，寫之前先問律師。','遇到家暴，保護令可以先聲請，安全最重要。','繼承前先查債務，拋棄繼承有期限。','家事調解，可以讓談判少一點情緒。','對話紀錄、轉帳截圖，在家事案件裡也是證據。','家裡的事不好開口？LINE @wylaw 私訊就好。','跨國婚姻、外籍配偶的離婚與扶養，英文、日文都能溝通。','在國外的家人要辦繼承？英文、日文文件直接處理。'],
 biz:['林律師當過上市公司法務長，合約裡的數字都看得懂。','契約到期、續約、終止，日期跟條件都要盯緊。','合約簽下去之前修，比打官司之後補省事多了。','公司治理、股東會、董事會，程序走對才安心。','常年法律顧問，就像公司的法務部門外包。','付款條件、違約金、驗收標準，三個地方最常出事。','打官司也要算成本：值不值得告，先評估再決定。','員工離職、資遣、競業，勞資問題先問清楚。','營業秘密沒做保護措施，出事時很難主張。','林律師有美國法律、管理會計雙碩士，法律和數字一起看。','日本客戶、美國客戶，用他們的語言談合約。','跨國會議，中文、英文、日文都能上場。','原始碼、客戶名單、製程參數，都是營業秘密。','商標先註冊再上市，不然品牌可能被別人搶走。']
};
export const WY_INDUSTRY_LINES={
 '法律／司法':'跨國案件、美國訴訟需要合作？林律師具備紐約州律師資格。',
 '醫療／照護':'醫病爭議、病歷調閱、醫療糾紛調解，德威陽處理過。',
 '科技／半導體／資訊':'營業秘密、跨國技術授權，林律師英文、日文原文直接看。',
 '製造／工業':'OEM／ODM 合約、供應鏈違約、產品責任，德威陽簽約前先看過。',
 '金融／保險／會計':'法遵、契約審閱、跨國交易，林律師數字和法律一起看。',
 '商業／貿易／企業經營':'德威陽常年法律顧問、跨國貿易合約，林律師中英日三語都能處理。',
 '教育／研究':'校園爭議、研究成果歸屬、聘約問題，先問清楚權益。',
 '公務／軍警消':'行政處分、懲處申訴、職務上的法律問題，可以先諮詢。',
 '不動產／營建':'買賣、租賃、工程款、鄰損糾紛，合約與證據先整理。',
 '餐飲／旅宿／觀光':'外國旅客的消費爭議，林律師英文、日文都能溝通。',
 '零售／電商／服務業':'消費糾紛、平台規範、品牌商標，德威陽一站處理。',
 '設計／媒體／行銷':'著作權、肖像權、合作合約，作品要先保護好。',
 '運輸／物流':'貨損、運送契約、跨國運輸責任，條款決定誰賠。',
 '學生':'租屋、打工、消費糾紛，先知道自己的權益。',
 '家管／退休':'繼承、遺囑、家事安排，越早規劃越安心。',
 '自由工作者／自營業':'接案合約、收款糾紛、著作權，合約是最好的保障。'
};
const GENERIC='有任何法律問題，歡迎 LINE @wylaw 與德威陽聯繫。';
export function setupGuideHosts(THREE,buildChibi,STAFF,list){
 const css=document.createElement('style');css.textContent=`
 .wyGH{position:fixed;width:150px;height:165px;pointer-events:none;overflow:hidden;display:none}
 .wyGH .fig{position:absolute;left:0;top:0;width:150px;height:165px;transform:translateY(170px);transition:transform .45s cubic-bezier(.3,1.5,.5,1)}
 .wyGH canvas{width:150px!important;height:165px!important;display:block}
 .wyGH.peek .fig{transform:translateY(62px) rotate(-12deg);transition-duration:.35s}
 .wyGH.peek2 .fig{transform:translateY(58px) rotate(10deg);transition-duration:.3s}
 .wyGH.duck .fig{transform:translateY(110px)}
 .wyGH.up .fig{transform:translateY(0)}
 .wyGH.out .fig{transform:translateY(170px);transition:transform .45s ease-in}
 .wyGHCloud{position:fixed;max-width:188px;padding:9px 13px;background:#fff;border-radius:24px;font:800 14px/1.45 -apple-system,BlinkMacSystemFont,"PingFang TC","Noto Sans TC",sans-serif;color:#3c2a20;filter:drop-shadow(0 3px 0 #0000001a) drop-shadow(0 6px 10px #0002);opacity:0;transform:scale(.3);transform-origin:0% 100%;transition:all .4s cubic-bezier(.2,1.6,.5,1);pointer-events:none;display:none}
 .wyGHCloud:before,.wyGHCloud:after{content:"";position:absolute;background:#fff;border-radius:50%}
 .wyGHCloud:before{width:34px;height:34px;left:16px;top:-12px;box-shadow:30px -4px 0 4px #fff,64px 2px 0 -2px #fff}
 .wyGHCloud:after{width:12px;height:12px;left:-10px;bottom:-4px;box-shadow:-12px 10px 0 -3px #fff}
 .wyGHCloud small{position:relative;display:block;font-size:11.5px;font-weight:900;letter-spacing:1px}
 .wyGHCloud span{position:relative;display:block}
 .wyGHCloud.on{opacity:1;transform:scale(1)}`;document.head.appendChild(css);
 const host=document.createElement('div');host.className='wyGH';host.innerHTML='<div class="fig"></div>';document.body.appendChild(host);
 const cloud=document.createElement('div');cloud.className='wyGHCloud';cloud.innerHTML='<small></small><span></span>';document.body.appendChild(cloud);
 let renderer=null,scene=null,cam=null,chibi=null,curHost=-1,timers=[],running=false,state='hide',lastBeat=0,active=null,industryShown=false;
 const bags={};
 function pick(k){if(!bags[k]||!bags[k].length)bags[k]=[...WY_HOST_LINES[k]].sort(()=>Math.random()-.5);return bags[k].shift()}
 function init(){if(renderer)return;renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});if(window.__wyMFGuard)window.__wyMFGuard(renderer);else(window.__wyMFReg=window.__wyMFReg||[]).push(renderer);renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));renderer.setSize(150,165);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0,0);
  scene=new THREE.Scene();scene.add(new THREE.HemisphereLight(0xfff4ee,0xd9c4b8,1.6));const d=new THREE.DirectionalLight(0xffeedd,2.2);d.position.set(2,4,3);scene.add(d);const f=new THREE.DirectionalLight(0xffe8e0,.6);f.position.set(-3,2,2);scene.add(f);
  cam=new THREE.PerspectiveCamera(24,150/165,.1,50);cam.position.set(0,1.0,7.0);cam.lookAt(0,.95,0);host.querySelector('.fig').appendChild(renderer.domElement)}
 function loop(now){if(!running)return;requestAnimationFrame(loop);if(!chibi)return;const g=chibi.group;
  if(state==='talk'){g.rotation.y+=((0.35)-g.rotation.y)*0.05;const k=(now-lastBeat)/1000;if(k>4.5){lastBeat=now;g.userData.alt=!g.userData.alt;if(g.userData.alt)chibi.wave();else g.userData.jump=now}
   if(g.userData.jump){const jt=(now-g.userData.jump)/450;if(jt>=1){g.userData.jump=0;g.position.y=0}else g.position.y=Math.sin(jt*Math.PI)*0.35}}
  else if(state==='leave'){g.rotation.y+=(0-g.rotation.y)*0.12}
  chibi.tick(now);renderer.render(scene,cam)}
 function clear(){timers.forEach(clearTimeout);timers=[]}
 /* v514 不卡頓：第一次進館時才建立小畫面與人物會停頓約 1 秒，改成載入時先在背景建好，之後重複使用 */
 const chibiCache={};function getChibi(h){return chibiCache[h]||(chibiCache[h]=buildChibi(THREE,{...STAFF[h]}))}
 window.wyGuideWarm=()=>{try{init();for(const h of [1,2,3]){const c=getChibi(h);scene.add(c.group);renderer.setSize(150,165,false);renderer.render(scene,cam);scene.remove(c.group)}}catch(e){console.error('guide warm',e)}};
 function show(cfg){init();clear();active=cfg;const el=cfg.el;let r=el.getBoundingClientRect();if(r.width<10)return;
  if(r.top<190){const room=window.innerHeight-198;if(r.height>room){el.style.setProperty('max-height',room+'px','important');el.style.overflowY='auto'}r=el.getBoundingClientRect();if(r.top<190){el.style.setProperty('top','calc(50% + '+Math.ceil(190-r.top)+'px)','important');r=el.getBoundingClientRect()}}
  const z=parseInt(getComputedStyle(el).zIndex)||95;host.style.zIndex=z-1;cloud.style.zIndex=z+1;
  host.style.left=(r.left+14)+'px';host.style.top=(r.top-163)+'px';cloud.style.left=Math.min(r.left+150,window.innerWidth-200)+'px';cloud.style.top=(r.top-162)+'px';
  host.className='wyGH';host.style.display='block';cloud.style.display='block';cloud.classList.remove('on');
  if(curHost!==cfg.host){if(chibi)scene.remove(chibi.group);chibi=getChibi(cfg.host);scene.add(chibi.group);curHost=cfg.host}
  chibi.group.rotation.y=0;chibi.group.position.y=0;
  let line=pick(cfg.key);const ind=(window.wyAvatarProfile&&window.wyAvatarProfile.industry)||'';
  if(!industryShown&&ind){industryShown=true;line=WY_INDUSTRY_LINES[ind]||GENERIC}
  cloud.querySelector('small').textContent=NAMES[cfg.host];cloud.querySelector('small').style.color=NAMEC[cfg.host];cloud.querySelector('span').textContent=line;
  if(!running){running=true;requestAnimationFrame(loop)}state='hide';
  const at=(ms,f)=>timers.push(setTimeout(f,ms));
  at(400,()=>host.classList.add('peek'));
  at(900,()=>{host.classList.remove('peek');host.classList.add('peek2')});
  at(1350,()=>{host.classList.remove('peek2');host.classList.add('duck')});
  at(1650,()=>{host.classList.remove('duck');host.classList.add('up');state='talk';lastBeat=performance.now()+600;chibi.wave()});
  at(2050,()=>cloud.classList.add('on'));
 }
 function hide(){if(!active)return;clear();active=null;state='leave';if(chibi)chibi.wave();cloud.classList.remove('on');host.classList.remove('peek','peek2','duck','up');host.classList.add('out');
  timers.push(setTimeout(()=>{host.style.display='none';cloud.style.display='none';running=false},650))}
 for(const cfg of list){if(!cfg.el)continue;let vis=false;
  const check=()=>{const v=cfg.el.style.display!=='none'&&cfg.el.isConnected&&getComputedStyle(cfg.el).display!=='none';if(v&&!vis){vis=true;requestAnimationFrame(()=>show(cfg))}else if(!v&&vis){vis=false;if(active===cfg)hide()}};
  new MutationObserver(check).observe(cfg.el,{attributes:true,attributeFilter:['style','class']});}
 window.addEventListener('resize',()=>{if(active){const r=active.el.getBoundingClientRect();host.style.left=(r.left+14)+'px';host.style.top=(r.top-163)+'px';cloud.style.left=Math.min(r.left+150,window.innerWidth-200)+'px';cloud.style.top=(r.top-162)+'px'}});
 window.wyGuideHostHide=hide;
}

// v483: 角落小人物（主動提醒 LINE、離開館揮手）。從畫面左下角探頭，雲朵附「LINE 聯繫我們」按鈕。
const ROOM={1:{key:'lit',host:1},2:{key:'med',host:3},3:{key:'fam',host:2},4:{key:'biz',host:3}};
export const WY_REMIND={lit:['要打官司還是先調解？德威陽 LINE 先評估。','美國的官司，林律師具備紐約州律師資格，LINE 先聊。','跨國訴訟，林律師中英日三語都能直接談。'],med:['醫療爭議越早整理病歷越有利，LINE 先約諮詢。','健保案件，經驗豐富。LINE 先約諮詢。','外籍病患與家屬，中英日三語都能直接談。'],fam:['離婚、扶養、遺囑的安排，LINE 先約個諮詢。','跨國婚姻與海外財產，中英日三語都能直接談。'],biz:['合約審閱、公司治理、營業秘密，LINE 聊聊您的公司。','英文、日文合約，林律師可以直接審閱。','跨國合作，中英日三語都能直接談。']};
export const WY_LEAVE={lit:['法院的事，德威陽天天在跑。','台灣、美國的官司，下次一起看。'],med:['醫療糾紛，有專業的人陪著談。','中英日三語，隨時等您回來。'],fam:['家裡的事，也能好好處理。','跨國的家事，也能好好處理。'],biz:['生意的事，合約先顧好。','English、日本語的合約，也交給德威陽。']};
const wyPick=a=>Array.isArray(a)?a[Math.floor(Math.random()*a.length)]:a;
export function setupCornerHost(THREE,buildChibi,STAFF){
 const css=document.createElement('style');css.textContent=`
 .wyCH{position:fixed;left:6px;bottom:0;z-index:140;width:130px;height:150px;pointer-events:none;overflow:hidden;display:none}
 .wyCH .fig{position:absolute;left:0;top:0;width:130px;height:150px;transform:translateY(155px);transition:transform .45s cubic-bezier(.3,1.5,.5,1)}
 .wyCH canvas{width:130px!important;height:150px!important;display:block}
 .wyCH.peek .fig{transform:translateY(60px) rotate(-10deg);transition-duration:.35s}
 .wyCH.up .fig{transform:translateY(8px)}
 .wyCH.out .fig{transform:translateY(155px);transition:transform .4s ease-in}
 .wyCHCloud{position:fixed;left:128px;bottom:96px;z-index:141;max-width:210px;padding:9px 13px 10px;background:#fff;border-radius:22px;font:800 14px/1.45 -apple-system,BlinkMacSystemFont,"PingFang TC","Noto Sans TC",sans-serif;color:#3c2a20;filter:drop-shadow(0 3px 0 #0000001a) drop-shadow(0 6px 10px #0003);opacity:0;transform:scale(.3);transform-origin:0% 100%;transition:all .4s cubic-bezier(.2,1.6,.5,1);display:none}
 .wyCHCloud:after{content:"";position:absolute;width:12px;height:12px;left:-9px;bottom:6px;background:#fff;border-radius:50%;box-shadow:-11px 9px 0 -3px #fff}
 .wyCHCloud small{display:block;font-size:11.5px;font-weight:900;letter-spacing:1px}
 .wyCHCloud a{display:inline-block;margin-top:6px;padding:5px 11px;border-radius:999px;background:#06C755;color:#fff;font-size:12.5px;font-weight:800;text-decoration:none}
 .wyCHCloud .x{position:absolute;right:7px;top:4px;border:0;background:none;font-size:15px;color:#9a8466;cursor:pointer}
 .wyCHCloud.on{opacity:1;transform:scale(1)}
 .wyCH.nod canvas{animation:wyCHnod .38s ease-in-out 3}
 .wyCH.tilt canvas{animation:wyCHtilt .7s ease-in-out 2;transform-origin:50% 90%}
 .wyCH.jump canvas{animation:wyCHjump .42s ease-out 3}
 @keyframes wyCHnod{0%,100%{transform:none}50%{transform:translateY(7px)}}
 @keyframes wyCHtilt{0%,100%{transform:none}30%{transform:rotate(-9deg)}70%{transform:rotate(7deg)}}
 @keyframes wyCHjump{0%,100%{transform:none}45%{transform:translateY(-16px)}}`;document.head.appendChild(css);
 const host=document.createElement('div');host.className='wyCH';host.innerHTML='<div class="fig"></div>';document.body.appendChild(host);
 const cloud=document.createElement('div');cloud.className='wyCHCloud';cloud.innerHTML='<button class="x" aria-label="關閉">×</button><small></small><span></span><br><a href="https://line.me/R/ti/p/@wylaw" target="_blank" rel="noopener">LINE 聯繫我們</a>';document.body.appendChild(cloud);
 let r=null,sc=null,cam=null,ch=null,cur=-1,timers=[],run=false;
 function init(){if(r)return;r=new THREE.WebGLRenderer({antialias:true,alpha:true});if(window.__wyMFGuard)window.__wyMFGuard(r);else(window.__wyMFReg=window.__wyMFReg||[]).push(r);r.setPixelRatio(Math.min(2,window.devicePixelRatio||1));r.setSize(130,150);r.outputColorSpace=THREE.SRGBColorSpace;r.setClearColor(0,0);
  sc=new THREE.Scene();sc.add(new THREE.HemisphereLight(0xfff4ee,0xd9c4b8,1.6));const d=new THREE.DirectionalLight(0xffeedd,2.2);d.position.set(2,4,3);sc.add(d);
  cam=new THREE.PerspectiveCamera(24,130/150,.1,50);cam.position.set(0,1.0,7.0);cam.lookAt(0,.95,0);host.querySelector('.fig').appendChild(r.domElement)}
 function loop(now){if(!run)return;requestAnimationFrame(loop);if(ch){ch.group.rotation.y+=(0.3-ch.group.rotation.y)*.05;ch.tick(now);r.render(sc,cam)}}
 function clear(){timers.forEach(clearTimeout);timers=[]}
 function hide(){clear();cloud.classList.remove('on');host.classList.remove('peek','up');host.classList.add('out');timers.push(setTimeout(()=>{host.style.display='none';cloud.style.display='none';run=false},500))}
 cloud.querySelector('.x').onclick=hide;
 function say(room,text,ms){const R=ROOM[room];if(!R)return;init();clear();
  if(cur!==R.host){if(ch)sc.remove(ch.group);ch=buildChibi(THREE,{...STAFF[R.host]});sc.add(ch.group);cur=R.host}
  cloud.querySelector('small').textContent=NAMES[R.host];cloud.querySelector('small').style.color=NAMEC[R.host];cloud.querySelector('span').textContent=text;
  host.className='wyCH';host.style.display='block';cloud.style.display='block';cloud.classList.remove('on');if(!run){run=true;requestAnimationFrame(loop)}
  const at=(t,f)=>timers.push(setTimeout(f,t));at(60,()=>host.classList.add('peek'));at(450,()=>{host.classList.remove('peek');host.classList.add('up');ch.wave()});at(750,()=>cloud.classList.add('on'));if(ms)at(ms,hide);}
 function sayHost(hostIdx,text,ms){init();clear();if(cur!==hostIdx){if(ch)sc.remove(ch.group);ch=buildChibi(THREE,{...STAFF[hostIdx]});sc.add(ch.group);cur=hostIdx}
  cloud.querySelector('small').textContent=NAMES[hostIdx];cloud.querySelector('small').style.color=NAMEC[hostIdx];cloud.querySelector('span').textContent=text;
  host.className='wyCH';host.style.display='block';cloud.style.display='block';cloud.classList.remove('on');if(!run){run=true;requestAnimationFrame(loop)}
  const at=(t,f)=>timers.push(setTimeout(f,t));at(60,()=>host.classList.add('peek'));at(450,()=>{host.classList.remove('peek');host.classList.add('up');ch.wave()});at(750,()=>cloud.classList.add('on'));if(ms)at(ms,hide)}
 window.wyCornerSay=(hostIdx,text,ms)=>sayHost(hostIdx,text,ms);
 window.wyCornerRemind=room=>{const R=ROOM[room];if(R)say(room,wyPick(WY_REMIND[R.key]),0)};
 window.wyCornerLeave=room=>{const R=ROOM[room];if(R)say(room,wyPick(WY_LEAVE[R.key]),3200)};
 window.wyCornerHide=hide;
 // v484：不出雲朵的短暫探頭（「德威陽怎麼幫您？」框、結尾慶祝），動作輪流：揮手、點頭、歪頭
 let pk=0,busy=0;
 function peek(room,kind,ms){const R=ROOM[room];if(!R)return;if(cloud.classList.contains('on'))return;if(kind!=='cheer'&&Date.now()<busy)return;if(kind==='cheer')busy=Date.now()+(ms||1500);init();clear();
  if(cur!==R.host){if(ch)sc.remove(ch.group);ch=buildChibi(THREE,{...STAFF[R.host]});sc.add(ch.group);cur=R.host}
  host.className='wyCH';host.style.display='block';cloud.style.display='none';if(!run){run=true;requestAnimationFrame(loop)}
  const at=(t,f)=>timers.push(setTimeout(f,t));at(40,()=>host.classList.add('peek'));
  at(380,()=>{host.classList.remove('peek');host.classList.add('up');if(kind==='cheer'){host.classList.add('jump');ch.wave()}else{const k=pk++%3;if(k===0)ch.wave();else host.classList.add(k===1?'nod':'tilt')}});
  at(ms||1500,hide)}
 window.wyCornerPeek=room=>peek(room,'point',1500);
 window.wyCornerCheer=room=>peek(room,'cheer',1900);
 const WY_OUT={1:'逛了好幾座島，打官司的事歡迎 LINE 聯繫我們。',2:'逛了好幾座島，醫療爭議歡迎 LINE 聯繫我們。',3:'逛了好幾座島，家裡的事歡迎 LINE 聯繫我們。',4:'逛了好幾座島，公司的事歡迎 LINE 聯繫我們。'};
 window.wyCornerOutdoor=room=>{if(ROOM[room])say(room,WY_OUT[room],0)};
 // 同一次進館玩到第三個互動、關掉之後，主動提醒一次。
 const IDS=['wyMediation','wyFee','wyFiling','wyBench','wyJusticeLink','wyJustice','wyRC','wyMedicalExperience','wyFamilyExperience','wy410BusinessPanel'];
 let count=0,shown=false,lastRoom=0,openNow=new Set();
 const tick=()=>{const room=window.wyActiveRoom||0;if(room!==lastRoom){lastRoom=room;count=0;shown=false;openNow.clear()}if(!room)return;
  for(const id of IDS){const e=document.getElementById(id);const v=!!e&&e.style.display!=='none'&&getComputedStyle(e).display!=='none';if(v&&!openNow.has(id)){openNow.add(id);count++}else if(!v&&openNow.has(id)){openNow.delete(id);if(count>=3&&!shown&&!openNow.size){shown=true;setTimeout(()=>{if((window.wyActiveRoom||0)===room)window.wyCornerRemind(room)},600)}}}};
 setInterval(tick,400);
}

// v483: 接待櫃檯說話人物頭像（各人物頭部快照，第一次開啟接待櫃檯時產生）
export function setupHeads(THREE,buildChibi,STAFF){
 const NAMES=['林律師','夢奇奇飼養者','哈姆太郎','薪水掌門人'];let cache=null;
 setTimeout(()=>{try{window.wyGetHeads()}catch(e){}},7000);

 // v491/v492：貼紙式頭像（正面、拍大一點，馬尾與包子頭完整露出）；另有揮手兩格
 const stickerCache={};
 function renderStickers(wave){const key=wave?'w':'n';if(stickerCache[key])return stickerCache[key];const out={};stickerCache[key]=out;
  try{const S=128,r=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});if(window.__wyMFGuard)window.__wyMFGuard(r);else(window.__wyMFReg=window.__wyMFReg||[]).push(r);r.setPixelRatio(2);r.setSize(S,S);r.outputColorSpace=THREE.SRGBColorSpace;r.setClearColor(0,0);
   const sc=new THREE.Scene();sc.add(new THREE.HemisphereLight(0xfff4ee,0xd9c4b8,1.7));const d=new THREE.DirectionalLight(0xffeedd,2.2);d.position.set(2,4,4);sc.add(d);const cam=new THREE.PerspectiveCamera(22,1,.1,50);
   const snap=()=>{const cv=document.createElement('canvas');cv.width=cv.height=S*2;const g=cv.getContext('2d');for(let a=0;a<16;a++){g.save();g.translate(Math.cos(a/16*Math.PI*2)*6,Math.sin(a/16*Math.PI*2)*6);g.drawImage(r.domElement,0,0);g.restore()}
    g.globalCompositeOperation='source-in';g.fillStyle='#fff';g.fillRect(0,0,S*2,S*2);g.globalCompositeOperation='source-over';g.drawImage(r.domElement,0,0);return cv.toDataURL('image/png')};
   NAMES.forEach((n,i)=>{const c=buildChibi(THREE,{...STAFF[i]});sc.add(c.group);c.group.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(c.group);const h=b.max.y-b.min.y,cy=b.max.y-h*.40;
    cam.position.set(0,cy,h*(wave?3.4:3.1));cam.lookAt(0,cy,0);
    if(!wave){r.render(sc,cam);out[n]=snap()}
    else{const fr=[];let sh=null;c.group.traverse(o=>{if(!sh&&o.type==='Group'&&Math.abs(o.position.y-.57)<.01&&o.position.x>.15)sh=o});try{c.tick(100)}catch(e){}if(sh){sh.scale.setScalar(1.55)}for(const a of [.8,1.2]){if(sh)sh.rotation.z=a;c.group.updateMatrixWorld(true);r.render(sc,cam);fr.push(snap())}out[n]=fr}
    sc.remove(c.group)});
   r.dispose();r.forceContextLoss&&r.forceContextLoss()}catch(e){console.error('stickers',e)}return out}
 window.wyGetStickers=()=>renderStickers(false);
 window.wyGetWaveStickers=()=>renderStickers(true);
 window.wyGetHeads=function(){if(cache)return cache;cache={};
  try{const S=96,r=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});if(window.__wyMFGuard)window.__wyMFGuard(r);else(window.__wyMFReg=window.__wyMFReg||[]).push(r);r.setPixelRatio(2);r.setSize(S,S);r.outputColorSpace=THREE.SRGBColorSpace;r.setClearColor(0,0);
   const sc=new THREE.Scene();sc.add(new THREE.HemisphereLight(0xfff4ee,0xd9c4b8,1.7));const d=new THREE.DirectionalLight(0xffeedd,2.2);d.position.set(2,4,4);sc.add(d);
   const cam=new THREE.PerspectiveCamera(22,1,.1,50);
   NAMES.forEach((n,i)=>{const c=buildChibi(THREE,{...STAFF[i]});sc.add(c.group);c.group.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(c.group);const h=b.max.y-b.min.y,cy=b.max.y-h*.47;
    cam.position.set(0,cy,h*1.95);cam.lookAt(0,cy,0);r.render(sc,cam);cache[n]=r.domElement.toDataURL('image/png');sc.remove(c.group)});
   r.dispose();r.forceContextLoss&&r.forceContextLoss();}catch(e){console.error('heads',e)}
  return cache};
 // v484：人物趣味對話視窗（醫療薪水掌門人、家庭哈姆太郎、企業薪水掌門人）標題旁加頭像
 const st=document.createElement('style');st.textContent='.wyStaffHead{display:block;width:46px;height:46px;border-radius:50%;background:#fff center/112% no-repeat;border:2.5px solid var(--c);margin:2px 0 6px;animation:wyHeadPop .35s cubic-bezier(.3,1.6,.5,1) both}@keyframes wyHeadPop{0%{transform:translateY(10px) scale(.4);opacity:0}100%{transform:none;opacity:1}}';document.head.appendChild(st);
 const C={'林律師':'#1A2B4C','夢奇奇飼養者':'#A8476F','哈姆太郎':'#2B6A8A','薪水掌門人':'#8A5A12'};
 const put=(anchor,name)=>{if(!anchor||anchor.offsetParent===null)return;const prev=anchor.previousElementSibling;if(prev&&prev.classList.contains('wyStaffHead'))return;const H=window.wyGetHeads();if(!H[name])return;const i=document.createElement('i');i.className='wyStaffHead';i.style.setProperty('--c',C[name]);i.style.backgroundImage='url('+H[name]+')';anchor.parentNode.insertBefore(i,anchor)};
 const drop=sel=>{for(const e of document.querySelectorAll(sel))e.remove()};
 setInterval(()=>{try{
  const m=document.getElementById('wyMedicalExperience');if(m){if(m.classList.contains('wyStaffCompact')&&getComputedStyle(m).display!=='none')put(document.getElementById('wyMedTitle'),'薪水掌門人');else drop('#wyMedicalExperience .wyStaffHead')}
  const f=document.getElementById('wyFamilyExperience');if(f){if(f.classList.contains('wyStaffCompact')&&getComputedStyle(f).display!=='none')put(document.getElementById('wyFamilyTitle'),'哈姆太郎');else drop('#wyFamilyExperience .wyStaffHead')}
  const b=document.querySelector('.wy420StaffTalk');if(b)put(b,'薪水掌門人');
 }catch(e){}},400);
}

// v483: 「德威陽怎麼幫您？」框第一次出現時，金色箭頭指向並微微發光（每題一次，約 2 秒）
export function setupServicePointer(){
 if(window.__wySP)return;window.__wySP=1;
 const st=document.createElement('style');st.textContent='@keyframes wySPglow{0%,100%{box-shadow:0 0 0 0 #C6A25D00}40%{box-shadow:0 0 0 4px #C6A25D88,0 0 16px #C6A25Daa}}@keyframes wySPbob{0%,100%{transform:translateX(6px)}50%{transform:translateX(-2px)}}.wySPon{animation:wySPglow .9s ease-in-out 2!important}.wySParrow{display:inline-block!important;vertical-align:middle;margin:0 0 2px 8px!important;width:0!important;height:0!important;padding:0!important;border-top:9px solid transparent;border-bottom:9px solid transparent;border-right:13px solid #C6A25D;filter:drop-shadow(0 1px 1px #0004);animation:wySPbob .45s ease-in-out 4;pointer-events:none;z-index:5;transition:opacity .3s}';document.head.appendChild(st);
 const seen=new Set();
 setInterval(()=>{for(const t of document.querySelectorAll('b,strong')){const s=t.textContent.trim();if(!s.startsWith('德威陽怎麼幫您'))continue;const box=t.parentElement;if(!box||box.offsetParent===null)continue;const key=box.textContent.trim().slice(0,80);if(seen.has(key)||box.__wySP)continue;if(!box.__wySPc){box.__wySPc=1;continue}seen.add(key);box.__wySP=1;
  const rm=window.wyActiveRoom||0;let a=null;if(rm>=1&&rm<=4&&window.wyCornerPeek){window.wyCornerPeek(rm)}else{a=document.createElement('span');a.className='wySParrow';t.appendChild(a)}box.classList.add('wySPon');
  setTimeout(()=>{if(a)a.style.opacity='0'},1900);setTimeout(()=>{if(a)a.remove();box.classList.remove('wySPon')},2300)}},450);
}

// v483: 遊戲結尾小慶祝（收狀處全部看完、正義女神走完、VIP 會客室第一次作答）：金色彩紙約 1.3 秒
export function setupCelebrate(){
 if(window.__wyCel)return;window.__wyCel=1;const done=new Set();
 function burst(el){const r=el.getBoundingClientRect();const L=document.createElement('div');L.style.cssText='position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:400;overflow:hidden';document.body.appendChild(L);
  const C=['#C6A25D','#E8803F','#F3D9A4','#1A2B4C','#B85A22','#fff'],cx=r.left+r.width/2,cy=r.top+Math.min(30,r.height/2);
  for(let k=0;k<34;k++){const p=document.createElement('i');const w=5+Math.random()*5;p.style.cssText='position:absolute;left:'+cx+'px;top:'+cy+'px;width:'+w+'px;height:'+(w*1.6)+'px;background:'+C[k%C.length]+';border-radius:1.5px;box-shadow:0 0 0 .5px #0001';L.appendChild(p);
   const a=(Math.random()*Math.PI)+Math.PI,v=90+Math.random()*150,dx=Math.cos(a)*v*(1.3),dy=Math.sin(a)*v;
   p.animate([{transform:'translate(-50%,-50%) rotate(0)',opacity:1},{transform:'translate('+(dx*.7)+'px,'+(dy)+'px) rotate('+(Math.random()*360)+'deg)',opacity:1,offset:.45},{transform:'translate('+dx+'px,'+(dy+190)+'px) rotate('+(Math.random()*720)+'deg)',opacity:0}],{duration:1300+Math.random()*300,easing:'cubic-bezier(.2,.7,.4,1)',fill:'forwards'})}
  el.animate([{transform:'scale(1)'},{transform:'scale(1.035)'},{transform:'scale(1)'}],{duration:450,easing:'ease-out'});
  try{window.wySfx&&window.wySfx('done')}catch(e){}setTimeout(()=>L.remove(),1800);const rm=window.wyActiveRoom||0;if(rm>=1&&rm<=4&&window.wyCornerCheer)setTimeout(()=>window.wyCornerCheer(rm),250)}
 setInterval(()=>{
  for(const sel of ['.j-done','.fi-done','.md-done']){const e=document.querySelector(sel);if(e&&e.offsetParent!==null&&!done.has(sel)){done.add(sel);burst(e)}}
  if(!done.has('vip')){for(const o of document.querySelectorAll('.wy416Overline')){if(o.textContent.indexOf('VIP會客室')<0||o.offsetParent===null)continue;const s=o.parentElement&&o.parentElement.parentElement&&o.parentElement.parentElement.querySelector('.wy414Service');if(s&&s.offsetParent!==null){done.add('vip');burst(s)}}}
 },400);
}
