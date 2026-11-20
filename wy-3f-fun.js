// 3F 林律師辦公室：沙發「跟老闆談加薪」＋書櫃「15秒找書大挑戰」
// 用法：import {openRaise,openBooks} from './wy-3f-fun.js';
const LINE='LINE：@wylaw　｜　官網：weiandyang.com';
const LOGO='./office-logo-transparent.png';
const LIN='./full-wyF.png';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

// ---------- 15秒找書 ----------
// [書名, 客戶煩惱, 書背顏色]
const BOOKS=[
 ['跨國契約','國外廠商一直不付貨款','#2f7de1'],['公司治理','股東意見不合，董事會開不下去','#7a4fc4'],
 ['勞動權益','公司突然要我簽離職同意書','#e0702f'],['家事親權','離婚後孩子要跟誰住','#c43a5c'],
 ['醫療爭議','手術後的狀況跟醫師說的不一樣','#22a06b'],['商標保護','我的品牌名稱被別人拿去用','#d4a017'],
 ['刑事偵查','收到警察局寄來的通知書','#3c4a8f'],['租賃押金','房東不退押金','#1aa3a3'],
 ['行政救濟','收到機關的處分覺得不合理','#8a5a2b'],['車禍求償','車禍後對方不肯賠','#e05a8a'],
 ['企業併購','有人想買下我的公司','#4a8f3c'],['個資保護','客戶資料不小心外流','#b04ac4']
];
const BOOK_END=[
 [6,'書櫃達人','手速和判斷力都一流，林律師的書櫃交給你管理也放心。','研讀相關資料，評估最適合的處理方向。'],
 [3,'找書高手','對問題很有感覺，再快一點就能挑戰書櫃達人。','分析爭議重點，規劃後續處理步驟。'],
 [0,'書櫃新手','這座書櫃確實很大，林律師自己找書有時也要想一下。','比對相關資料，擬定合適的因應方案。']
];
let bs={timer:null,left:15,found:0,target:null,order:[],busy:false};

let box;
const CSS=`
#wy3F{position:fixed;inset:0;z-index:130;display:none;align-items:center;justify-content:center;padding:12px;background:#0b1f2fcc;font-family:system-ui,'Noto Sans TC',sans-serif;-webkit-user-select:none;user-select:none}
#wy3F .c{width:min(94vw,420px);max-height:92dvh;overflow:auto;background:#fff;border:2px solid #d3aa67;border-radius:18px;box-shadow:0 18px 55px #0008;box-sizing:border-box}
#wy3F .br{display:flex;align-items:center;gap:10px;padding:8px 12px;background:#fff;border-bottom:1px solid #ecd3a8;position:sticky;top:0;z-index:3}
#wy3F .br img{width:34px;height:34px;object-fit:contain;flex:none;background:#fff;border:2px solid #d3aa67;border-radius:9px}
#wy3F .br div{flex:1}#wy3F .br b{display:block;font-size:15px;color:#1f3b2f}#wy3F .br small{display:block;font-size:10.5px;color:#a07d45}
#wy3F .x{border:0;background:#e9f3ee;color:#1f5a43;font-size:20px;width:36px;height:36px;border-radius:10px;font-weight:700}
#wy3F .bd{padding:12px 14px 14px}
#wy3F h3{margin:2px 0 4px;font:800 21px 'Noto Serif TC','Songti TC','PMingLiU',serif;color:#1f5a43;text-align:center}
#wy3F .sub{text-align:center;font-size:13px;color:#6a7d74;margin:0 0 10px}
#wy3F .wy{margin-top:10px;background:#FDE3C8;border:1px solid #E9B98A;border-left:5px solid #C6A25D;border-radius:10px;padding:9px 10px;color:#5A3216;font-weight:600;font-size:13px;line-height:1.5}
#wy3F .wy>b{display:block;font-size:16px;font-weight:800;margin-bottom:3px;color:#8A3D10}
#wy3F .wy:after{content:"${LINE}";display:block;margin-top:5px;padding-top:4px;border-top:1px dashed currentColor;font-size:13px;font-weight:700;color:#8A3D10}
#wy3F .row{display:flex;gap:9px;margin-top:11px}
#wy3F .row button{flex:1;min-width:0;padding:12px 6px;border-radius:11px;font-weight:800;font-size:15px;border:1.5px solid #c6a25d;touch-action:manipulation}
#wy3F .a{background:#1f6b4f;color:#fff3d6}#wy3F .b{background:#fff;color:#1f5a43}
/* 談加薪 */
#wy3F .meter{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:800;color:#1f5a43;margin:2px 0 10px}
#wy3F .meter i{flex:1;height:12px;border-radius:7px;background:#e3f1ea;overflow:hidden;border:1px solid #bfdccd}
#wy3F .meter i u{display:block;height:100%;background:linear-gradient(90deg,#f3c64f,#e8913a);border-radius:7px;transition:width .6s cubic-bezier(.3,1.4,.5,1)}
#wy3F .rd{display:flex;justify-content:center;gap:6px;margin-bottom:8px}#wy3F .rd s{width:26px;height:6px;border-radius:3px;background:#d9e9e1;text-decoration:none}#wy3F .rd s.on{background:#1f6b4f}
#wy3F .boss{display:flex;gap:10px;align-items:flex-start;margin:4px 0 10px}
#wy3F .face{flex:none;width:52px;height:52px;border-radius:50%;background:#1f6b4f;color:#f3d48c;display:flex;align-items:center;justify-content:center;font:900 16px 'Noto Serif TC',serif;border:3px solid #c6a25d}
#wy3F .bub{position:relative;flex:1;background:#eef7f2;border:1.5px solid #9fd2b9;border-radius:14px;padding:10px 12px;font-size:15px;line-height:1.6;color:#17402f;font-weight:600;min-height:44px}
#wy3F .bub b{display:block;font-size:12px;color:#2e8a62;margin-bottom:2px}
#wy3F .bub.pop{animation:wyPop .45s cubic-bezier(.3,1.5,.5,1)}
@keyframes wyPop{0%{transform:scale(.8);opacity:0}100%{transform:none;opacity:1}}
#wy3F .q{font-weight:800;color:#8a6a2e;font-size:14px;margin:6px 0}
#wy3F .cards{display:grid;gap:8px}
#wy3F .cards button{padding:13px 12px;border-radius:13px;border:2px solid #c6a25d;background:linear-gradient(#fff,#fff8e8);color:#1f3b2f;font-size:15.5px;font-weight:800;text-align:left;box-shadow:0 3px 0 #c6a25d;touch-action:manipulation;transition:transform .15s}
#wy3F .cards button:active{transform:translateY(2px);box-shadow:0 1px 0 #c6a25d}
#wy3F .cards button.out{animation:wyOut .4s forwards}
@keyframes wyOut{to{transform:translateY(-30px) rotate(-4deg);opacity:0}}
#wy3F .end{text-align:center;background:linear-gradient(#fff8e1,#fff);border:2px solid #f0c95a;border-radius:14px;padding:12px;margin:4px 0}
#wy3F .end b{display:block;font:900 22px 'Noto Serif TC',serif;color:#b0782a;margin-bottom:4px}
#wy3F .end p{margin:0;font-size:14.5px;line-height:1.65;color:#3a3a2c}
/* 找書 */
#wy3F .hud{display:flex;justify-content:space-between;align-items:center;margin:0 0 8px}
#wy3F .time{font:900 22px system-ui;color:#e0503f;min-width:58px}
#wy3F .tbar{flex:1;height:10px;margin:0 10px;border-radius:6px;background:#fde3d6;overflow:hidden}#wy3F .tbar u{display:block;height:100%;background:#e0503f;transition:width 1s linear}
#wy3F .got{font-weight:800;color:#1f5a43;font-size:13px}
#wy3F .ask{background:#eef7f2;border:1.5px solid #9fd2b9;border-radius:12px;padding:9px 11px;margin-bottom:10px;font-size:15.5px;font-weight:800;color:#17402f;line-height:1.5}
#wy3F .ask small{display:block;font-size:11.5px;color:#2e8a62;font-weight:800;margin-bottom:2px}
#wy3F .ask.pop{animation:wyPop .35s ease-out}
#wy3F .shelf{background:#1f6b4f;border:4px solid #c6a25d;border-radius:12px;padding:8px 8px 0}
#wy3F .tier{display:flex;gap:5px;align-items:flex-end;justify-content:center;height:128px;border-bottom:8px solid #c6a25d;margin-bottom:8px}
#wy3F .bk{flex:1;max-width:44px;border:0;border-radius:5px 5px 2px 2px;color:#fff;font:800 14px/1.15 'Noto Serif TC',serif;writing-mode:vertical-rl;text-orientation:upright;letter-spacing:1px;padding:8px 0;box-shadow:inset -4px 0 0 #0002,inset 0 6px 0 #fff3;touch-action:manipulation;display:flex;align-items:center;justify-content:center}
#wy3F .bk.no{animation:wyShake .35s}#wy3F .bk.yes{animation:wyYes .5s forwards}
@keyframes wyShake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
@keyframes wyYes{50%{transform:translateY(-22px) scale(1.08)}100%{transform:translateY(0)}}
#wy3F .plq{margin:-2px auto 8px;width:max-content;max-width:100%;padding:4px 14px;border-radius:6px;background:linear-gradient(#f6dc93,#c9a14e);color:#4a3410;font:800 13px 'Noto Serif TC',serif;letter-spacing:1px;box-shadow:0 2px 0 #8a6a2e}
#wy3F .lib{font:800 15.5px/1.7 'Noto Serif TC',serif!important;color:#1f5a43!important;background:#eef7f2;border:1.5px solid #9fd2b9;border-radius:12px;padding:10px}
#wy3F .lin{margin-top:8px;background:#eef7f2;border:1.5px solid #9fd2b9;border-radius:12px;padding:9px 11px;font-size:14.5px;line-height:1.6;color:#17402f;font-weight:600}#wy3F .lin b{display:block;font-size:12px;color:#2e8a62}
#wy3F .sbox{position:relative;border:3px solid #c6a25d;border-radius:14px;overflow:hidden;touch-action:none;cursor:pointer}#wy3F .sbox canvas{display:block;width:100%;height:auto}
#wy3F .sbub{position:absolute;right:8px;top:8px;max-width:58%;background:#fff;border:1.5px solid #9fd2b9;border-radius:12px;padding:6px 10px;font-size:13.5px;font-weight:700;color:#17402f;line-height:1.45;box-shadow:0 3px 8px #0002}#wy3F .sbub b{display:block;font-size:11px;color:#2e8a62}#wy3F .sbub.pop{animation:wyPop .4s cubic-bezier(.3,1.5,.5,1)}
#wy3F .stap{position:absolute;left:10px;top:12px;text-align:left;font-size:12.5px;font-weight:800;color:#1f5a43;opacity:.75}
#wy3F .av{display:block;object-fit:contain;transform-origin:50% 90%;transform:rotate(calc(var(--look,0deg)*-1))}
#wy3F .av.hero{width:96px;height:96px;margin:0 auto 4px}
#wy3F .av.sm{width:58px;height:58px;flex:none}
#wy3F .av.nod{animation:avNod .5s ease}#wy3F .av.tilt{animation:avTilt .6s ease}#wy3F .av.shake{animation:avShake .4s ease}
@keyframes avNod{0%,100%{translate:0 0}40%{translate:0 -12px}70%{translate:0 2px}}
@keyframes avTilt{0%,100%{rotate:0deg}40%{rotate:-12deg}}
@keyframes avShake{25%{rotate:-8deg}75%{rotate:8deg}}
#wy3F .slin{position:absolute;left:4px;bottom:4px;width:27%;display:flex;flex-direction:column;align-items:flex-start;pointer-events:none}
#wy3F .slin .av{width:100%;height:auto}
#wy3F .slin .sbub{position:relative;right:auto;top:auto;max-width:none;width:118%;box-sizing:border-box;margin-bottom:4px;font-size:12.5px;padding:5px 8px}
#wy3F .brow{display:flex;gap:8px;align-items:center;margin-bottom:10px}#wy3F .brow .ask{flex:1;margin:0}
#wy3F .row2{display:flex;gap:9px;align-items:center}
#wy3F .start{text-align:center;padding:6px 0}
#wy3F .start p{font-size:14.5px;line-height:1.7;color:#2d3b36;margin:6px 0 10px}
#wy3F .big{width:100%;padding:15px;border-radius:13px;border:2px solid #c6a25d;background:#1f6b4f;color:#fff3d6;font-size:18px;font-weight:900;box-shadow:0 4px 0 #c6a25d}
`;
function ensure(){
 if(box)return;const st=document.createElement('style');st.textContent=CSS;document.head.append(st);
 box=document.createElement('div');box.id='wy3F';document.body.append(box);
 box.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const a=b.dataset.a;
  if(a==='close'){stopBooks();stopStack();box.style.display='none'}
  else if(a==='raise')openRaise();else if(a==='sgo')sgo();
  else if(a==='books')openBooks();else if(a==='go')startBooks();else if(a==='bk')bookTap(+b.dataset.i,b);});
}
function shell(title,sub,inner,foot=''){
 box.innerHTML=`<div class="c"><div class="br"><img alt="德威陽國際法律事務所" src="${LOGO}"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div><button class="x" data-a="close" aria-label="關閉">×</button></div><div class="bd"><h3>${title}</h3>${sub?`<p class="sub">${sub}</p>`:''}${inner}${foot}</div></div>`;
 box.style.display='flex';
}

export function openRaise(){
 ensure();stopStack();
 shell('疊出你的加薪籌碼','',
  `<div class="start"><img class="av hero" src="${LIN}" alt="林律師"><p class="lib">想跟老闆談加薪？<br>先把你的成果一塊一塊疊起來。</p><p>籌碼會左右移動，點一下畫面就放下。<br>對得越準，疊得越高。</p><button class="big" data-a="sgo">開始疊籌碼</button></div>`);
}
const CHIPS=[['結案感謝信','#2f7de1'],['新證照','#7a4fc4'],['加班紀錄','#e0702f'],['客戶續約','#c43a5c'],['帶新人','#22a06b'],['跨國會議','#d4a017'],['準時交件','#1aa3a3'],['好評回饋','#e05a8a'],['專案提案','#4a8f3c'],['研習證書','#3c4a8f']];
const LIN_SAY=['嗯，我在看。','嗯，先從這個開始。','嗯，有在準備喔。','這個我記得。','不錯喔，繼續。','看來你有備而來。','這些成果我都有印象。','嗯，我坐直一點聽。','這疊得很有說服力。','客戶也有提到你。','好，我認真了。','你什麼時候做了這麼多？','這個高度不簡單。','好，我們來談條件吧。','再上去，我要抬頭看了。','等等，我拿筆記一下。','這疊下去，我很難說不。','薪水掌門人，麻煩先來一下。','這高度，我得好好考慮了。'];
const LIN_MORE=['你是來談加薪，還是來蓋大樓？','這已經超過我的視線了。','我開始擔心天花板了。','好好好，我懂你的意思了。','這要不要拍照存證一下？'];
const STACK_END=[
 [18,'老闆當場點頭','實績一塊塊疊得又高又穩，林律師說：下個月起調整。','規劃談判策略，擬定調薪與勞動條件的書面約定。'],
 [10,'考核時優先談','林律師說：成果很扎實，把這些整理成一頁，考核時我們好好談。','評估勞動契約內容，盤點可以協商的條件。'],
 [0,'老闆先請你喝咖啡','林律師說：先別急，把成果再累積一點，我們下次再談。','審閱聘僱與調薪約定，比對雙方權利義務。']
];
let ss=null;
function stopStack(){if(ss){ss.dead=true;cancelAnimationFrame(ss.raf);ss=null}}
function sgo(){
 stopStack();
 shell('疊出你的加薪籌碼','',`<div class="hud"><span class="got" id="sH">疊了 0 層</span></div>
  <div class="sbox"><canvas id="sC" width="720" height="760"></canvas><div class="stap">點一下放下籌碼</div><div class="slin"><div class="sbub" id="sB"><b>林律師</b>嗯，我在看。</div><img class="av" id="sL" src="${LIN}" alt="林律師"></div></div>`);
 const cv=box.querySelector('#sC'),g=cv.getContext('2d');
 const W=720,BH=72,base={x:250,w:400};
 ss={tags:[],g,cv,stack:[{x:base.x,w:base.w,c:'#1f6b4f',t:'林律師的辦公桌',y:0}],cur:null,dir:1,speed:6,cam:0,camT:0,falls:[],dead:false,over:false,n:0};
 const spawn=()=>{const top=ss.stack[ss.stack.length-1],ch=CHIPS[ss.n%CHIPS.length];ss.cur={x:ss.dir>0?0:W-top.w,w:top.w,c:ch[1],t:ch[0],y:ss.stack.length};ss.speed=Math.min(18,6+ss.n*.75)};
 spawn();
 const drop=()=>{if(!ss||ss.over||!ss.cur)return;const top=ss.stack[ss.stack.length-1],c=ss.cur;
  const L=Math.max(c.x,top.x),R=Math.min(c.x+c.w,top.x+top.w);
  if(R-L<=8){ss.falls.push({x:c.x,w:c.w,c:c.c,y:c.y,vy:0,t:c.t});ss.cur=null;ss.over=true;setTimeout(()=>ss&&stackEnd(),900);return}
  let perfect=false;if(Math.abs(c.x-top.x)<6){c.x=top.x;perfect=true}else{
   const cutX=c.x<top.x?c.x:R,cutW=c.w-(R-L);ss.falls.push({x:cutX,w:cutW,c:c.c,y:c.y,vy:0,t:''});c.x=L;c.w=R-L}
  ss.stack.push(c);ss.n++;ss.cur=null;
  box.querySelector('#sH').textContent='疊了 '+ss.n+' 層';
  const say=ss.n<LIN_SAY.length?LIN_SAY[ss.n]:LIN_MORE[(ss.n-LIN_SAY.length)%LIN_MORE.length],bub=box.querySelector('#sB');if(bub){bub.innerHTML='<b>林律師</b>'+say;bub.classList.remove('pop');void bub.offsetWidth;bub.classList.add('pop')}
  linAnim(box.querySelector('#sL'),perfect?'nod':'tilt');ss.tags.push({x:c.x+c.w/2,y:c.y,t:perfect?'很紮實！':'差一點',c:perfect?'#e8913a':'#6a7d74',a:1});
  const av=box.querySelector('#sL');if(av)av.style.setProperty('--look',Math.min(14,ss.n*.8)+'deg');
  ss.dir*=-1;ss.camT=Math.max(0,ss.stack.length-6)*BH;spawn()};
 cv.parentElement.addEventListener('pointerdown',e=>{e.preventDefault();drop()});
 const draw=()=>{if(!ss||ss.dead)return;
  if(ss.cur){ss.cur.x+=ss.speed*ss.dir;const top=ss.stack[ss.stack.length-1];if(ss.cur.x>W-ss.cur.w){ss.cur.x=W-ss.cur.w;ss.dir=-1}if(ss.cur.x<0){ss.cur.x=0;ss.dir=1}}
  ss.cam+=(ss.camT-ss.cam)*.12;
  g.clearRect(0,0,W,760);
  const sky=g.createLinearGradient(0,0,0,760);sky.addColorStop(0,'#d9f1ff');sky.addColorStop(1,'#f3fbf7');g.fillStyle=sky;g.fillRect(0,0,W,760);
  const Y=i=>760-40-(i+1)*BH+ss.cam;
  const block=(b,y,alpha=1)=>{g.globalAlpha=alpha;const r=14;g.fillStyle='#0002';rr(g,b.x+4,y+6,b.w,BH-6,r);g.fill();g.fillStyle=b.c;rr(g,b.x,y,b.w,BH-6,r);g.fill();g.fillStyle='#ffffff40';rr(g,b.x+6,y+5,Math.max(0,b.w-12),12,6);g.fill();
   if(b.t&&b.w>70){g.fillStyle='#fff';g.font='bold 30px "Noto Sans TC",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(b.t,b.x+b.w/2,y+BH/2-2,b.w-16)}g.globalAlpha=1};
  // 桌腳
  const by=Y(0);g.fillStyle='#c6a25d';g.fillRect(base.x+30,by+BH-6,22,760);g.fillRect(base.x+base.w-52,by+BH-6,22,760);
  ss.stack.forEach((b,i)=>block(b,Y(i)));
  if(ss.cur)block(ss.cur,Y(ss.cur.y));
  ss.falls.forEach(f=>{f.vy+=1.2;f.dy=(f.dy||0)+f.vy;block(f,Y(f.y)+f.dy,Math.max(0,1-f.dy/500))});
  ss.falls=ss.falls.filter(f=>f.dy<700);
  ss.tags.forEach(t=>{t.a-=.018;t.dy=(t.dy||0)+1.2;g.globalAlpha=Math.max(0,t.a);g.fillStyle=t.c;g.font='900 34px "Noto Sans TC",sans-serif';g.textAlign='center';g.fillText(t.t,t.x,Y(t.y)-14-t.dy);g.globalAlpha=1});ss.tags=ss.tags.filter(t=>t.a>0);
  ss.raf=requestAnimationFrame(draw)};
 draw();
}
function linAnim(el,k){if(!el)return;el.classList.remove('nod','tilt','shake');void el.offsetWidth;el.classList.add(k)}
function rr(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function stackEnd(){
 const n=ss.n;stopStack();const e=STACK_END.find(x=>n>=x[0]);
 shell('疊出你的加薪籌碼','',`<div class="end"><img class="av hero" src="${LIN}" alt="林律師"><b>${e[1]}</b><p>你疊了 ${n} 層成果。${esc(e[2])}</p></div><div class="wy"><b>德威陽怎麼幫您？</b>${e[3]}</div>`,
  `<div class="row"><button class="a" data-a="sgo">再疊一次</button><button class="b" data-a="close">回到辦公室</button></div>`);
}

export function openBooks(){
 ensure();stopBooks();stopStack();
 shell('15秒找書大挑戰','',
  `<div class="start"><img class="av hero" src="${LIN}" alt="林律師"><p class="lib">林律師的私人書櫃，藏書近千本，<br>從法律、國際商務到管理與人文。</p><p>上方會出現客戶的煩惱，<br>請在 15 秒內點出對應的那本書。</p><button class="big" data-a="go">開始找書</button></div>`);
}
function stopBooks(){if(bs.timer){clearInterval(bs.timer);bs.timer=null}}
function startBooks(){
 stopBooks();bs={timer:null,left:15,found:0,target:null,order:shuffle(BOOKS.map((_,i)=>i)),busy:false,last:-1};
 newTarget();drawBooks();
 bs.timer=setInterval(()=>{bs.left--;const t=box.querySelector('.time'),u=box.querySelector('.tbar u');if(t)t.textContent=bs.left+' 秒';if(u)u.style.width=(bs.left/15*100)+'%';if(bs.left<=0){stopBooks();booksEnd()}},1000);
}
function newTarget(){let t;do{t=Math.floor(Math.random()*BOOKS.length)}while(t===bs.last);bs.last=t;bs.target=t}
function drawBooks(){
 const o=bs.order,tier=k=>`<div class="tier">${o.slice(k*6,k*6+6).map(i=>`<button class="bk" data-a="bk" data-i="${i}" style="background:${BOOKS[i][2]};height:${100+((i*37)%24)}px">${BOOKS[i][0]}</button>`).join('')}</div>`;
 shell('15秒找書大挑戰','',
  `<div class="hud"><span class="time">${bs.left} 秒</span><span class="tbar"><u style="width:${bs.left/15*100}%"></u></span><span class="got">已找到 ${bs.found} 本</span></div>
  <div class="brow"><img class="av sm" id="bL" src="${LIN}" alt="林律師"><div class="ask pop"><small>林律師：幫我找一下，客戶在問</small>${esc(BOOKS[bs.target][1])}</div></div>
  <div class="shelf"><div class="plq">林柏均律師藏書　近千冊</div>${tier(0)}${tier(1)}</div>`);
}
function bookTap(i,btn){
 if(bs.busy||!bs.timer)return;
 if(i!==bs.target){btn.classList.remove('no');void btn.offsetWidth;btn.classList.add('no');linAnim(box.querySelector('#bL'),'shake');return}
 bs.busy=true;bs.found++;btn.classList.add('yes');linAnim(box.querySelector('#bL'),'nod');
 setTimeout(()=>{bs.busy=false;if(!bs.timer)return;newTarget();bs.order=shuffle(bs.order);drawBooks()},420);
}
function booksEnd(){
 const e=BOOK_END.find(x=>bs.found>=x[0]);
 shell('15秒找書大挑戰','',`<div class="end"><b>${e[1]}</b><p>這次找到 ${bs.found} 本。${esc(e[2])}</p></div><div class="lin row2"><img class="av sm" src="${LIN}" alt="林律師"><div><b>林律師</b>這座書櫃有近千本書，每一本都是處理案件時的底氣。</div></div><div class="wy"><b>德威陽怎麼幫您？</b>${e[3]}</div>`,
  `<div class="row"><button class="a" data-a="go">再挑戰一次</button><button class="b" data-a="close">回到辦公室</button></div>`);
}
