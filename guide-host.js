// 德威陽｜有法度 — 各島指南介紹人（v482）
// 指南第一次跳出（或按指南按鈕再打開）時，介紹人從指南框後面偷偷探頭、跳出來揮手，雲朵講一句宣傳台詞（名字在雲朵裡）。
// 律師資格一律寫林律師個人；健保只寫「經驗豐富」；不寫律師費。
const NAMEC=['#1A2B4C','#A8476F','#2B6A8A','#8A5A12'];
const NAMES=['林律師','夢奇奇飼養者','哈姆太郎','薪水掌門人'];
export const WY_HOST_LINES={
 lit:['咦？林律師是台灣律師，也是紐約州律師？對！','跨國官司兩邊跑？林律師看得懂兩國規則。','收到英文律師函別慌，先拍照傳 LINE @wylaw。','美國客戶、台灣工廠，合約兩邊都要顧到。','中文、英文、日文，三種語言都能談案子！','美國法院來信？期限很短，先問清楚再回。','哇，海外投資、跨國併購，也是德威陽的日常。','台美兩邊的法律差在哪？問林律師最快。','出國做生意前，合約先讓律師看一眼。','跨國糾紛不用分頭找，德威陽一次處理。','英文合約、日文契約，原文直接看，不用等翻譯。','外國當事人來台灣打官司，中英日都能直接溝通。'],
 med:['醫療糾紛先別急著吵，病歷先申請、先整理。','手術結果不如預期，不一定是疏失，要看過程和證據。','醫療鑑定怎麼送、問什麼問題，影響很大。','醫藥費、看護費、薪資損失，每一筆都要留單據。','和解金額怎麼算？損失清單先列清楚再談。','醫療爭議也能先調解，不一定要直接上法院。','病歷有沒有被改過？時間紀錄會說話。','醫療院所遇到病人申訴，也需要專業的法律意見。','健保案件，林律師經驗豐富。','賠償算清楚，心裡才踏實。LINE @wylaw 先問問。','外籍人士在台灣就醫發生爭議，英文、日文都能直接談。'],
 fam:['離婚協議跟軟體一樣，條款沒寫到就會出 bug。','孩子跟誰住、怎麼探視，協議要寫到可以執行。','扶養費幾號付、付多少，寫清楚就少吵一半。','夫妻財產要分，先把雙方的財產清單備份好。','遺囑格式不對可能無效，寫之前先問律師。','遇到家暴，保護令可以先聲請，安全最重要。','繼承前先查債務，拋棄繼承有期限。','家事調解，可以讓談判少一點情緒。','對話紀錄、轉帳截圖，在家事案件裡也是證據。','家裡的事不好開口？LINE @wylaw 私訊就好。','跨國婚姻、外籍配偶的離婚與扶養，英文、日文都能溝通。','在國外的家人要辦繼承？英文、日文文件直接處理。'],
 biz:['林律師當過上市公司法務長，合約裡的數字都看得懂。','契約到期、續約、終止，日期跟條件都要盯緊。','合約簽下去之前修，比打官司之後補省事多了。','公司治理、股東會、董事會，程序走對才安心。','常年法律顧問，就像公司的法務部門外包。','付款條件、違約金、驗收標準，三個地方最常出事。','打官司也要算成本：值不值得告，先評估再決定。','員工離職、資遣、競業，勞資問題先問清楚。','營業秘密沒做保護措施，出事時很難主張。','林律師有美國法律、管理會計雙碩士，法律和數字一起看。','日本客戶、美國客戶，用他們的語言談合約。','跨國會議，中文、英文、日文都能上場。','原始碼、客戶名單、製程參數，都是營業秘密。','商標先註冊再上市，不然品牌可能被別人搶走。']
};
export const WY_INDUSTRY_LINES={
 '法律／司法':'跨國案件、美國訴訟需要合作？林律師具備紐約州律師資格。',
 '醫療／照護':'醫病爭議、病歷調閱、醫療糾紛調解，德威陽處理過。',
 '科技／半導體／資訊':'營業秘密、跨國技術授權，英文、日文原文直接看。',
 '製造／工業':'OEM／ODM 合約、供應鏈違約、產品責任，簽約前先看過。',
 '金融／保險／會計':'法遵、契約審閱、跨國交易，數字和法律一起看。',
 '商業／貿易／企業經營':'常年法律顧問、跨國貿易合約，中英日三語都能處理。',
 '教育／研究':'校園爭議、研究成果歸屬、聘約問題，先問清楚權益。',
 '公務／軍警消':'行政處分、懲處申訴、職務上的法律問題，可以先諮詢。',
 '不動產／營建':'買賣、租賃、工程款、鄰損糾紛，合約與證據先整理。',
 '餐飲／旅宿／觀光':'外國旅客的消費爭議，英文、日文都能溝通。',
 '零售／電商／服務業':'消費糾紛、平台規範、品牌商標，一站處理。',
 '設計／媒體／行銷':'著作權、肖像權、合作合約，作品要先保護好。',
 '運輸／物流':'貨損、運送契約、跨國運輸責任，條款決定誰賠。',
 '學生':'租屋、打工、消費糾紛，先知道自己的權益。',
 '家管／退休':'繼承、遺囑、家事安排，越早規劃越安心。',
 '自由工作者／自營業':'接案合約、收款糾紛、著作權，合約是最好的保障。'
};
const GENERIC='有任何法律問題，都可以先 LINE @wylaw 問問看。';
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
 function init(){if(renderer)return;renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));renderer.setSize(150,165);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0,0);
  scene=new THREE.Scene();scene.add(new THREE.HemisphereLight(0xfff4ee,0xd9c4b8,1.6));const d=new THREE.DirectionalLight(0xffeedd,2.2);d.position.set(2,4,3);scene.add(d);const f=new THREE.DirectionalLight(0xffe8e0,.6);f.position.set(-3,2,2);scene.add(f);
  cam=new THREE.PerspectiveCamera(24,150/165,.1,50);cam.position.set(0,1.0,7.0);cam.lookAt(0,.95,0);host.querySelector('.fig').appendChild(renderer.domElement)}
 function loop(now){if(!running)return;requestAnimationFrame(loop);if(!chibi)return;const g=chibi.group;
  if(state==='talk'){g.rotation.y+=((0.35)-g.rotation.y)*0.05;const k=(now-lastBeat)/1000;if(k>4.5){lastBeat=now;g.userData.alt=!g.userData.alt;if(g.userData.alt)chibi.wave();else g.userData.jump=now}
   if(g.userData.jump){const jt=(now-g.userData.jump)/450;if(jt>=1){g.userData.jump=0;g.position.y=0}else g.position.y=Math.sin(jt*Math.PI)*0.35}}
  else if(state==='leave'){g.rotation.y+=(0-g.rotation.y)*0.12}
  chibi.tick(now);renderer.render(scene,cam)}
 function clear(){timers.forEach(clearTimeout);timers=[]}
 function show(cfg){init();clear();active=cfg;const el=cfg.el;let r=el.getBoundingClientRect();if(r.width<10)return;
  if(r.top<172){const room=window.innerHeight-182;if(r.height>room){el.style.maxHeight=room+'px';el.style.overflowY='auto'}r=el.getBoundingClientRect();if(r.top<172){el.style.top='calc(50% + '+Math.ceil(172-r.top)+'px)';r=el.getBoundingClientRect()}}
  const z=parseInt(getComputedStyle(el).zIndex)||95;host.style.zIndex=z-1;cloud.style.zIndex=z+1;
  host.style.left=(r.left+14)+'px';host.style.top=(r.top-163)+'px';cloud.style.left=Math.min(r.left+150,window.innerWidth-200)+'px';cloud.style.top=(r.top-162)+'px';
  host.className='wyGH';host.style.display='block';cloud.style.display='block';cloud.classList.remove('on');
  if(curHost!==cfg.host){if(chibi)scene.remove(chibi.group);chibi=buildChibi(THREE,{...STAFF[cfg.host]});scene.add(chibi.group);curHost=cfg.host}
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
