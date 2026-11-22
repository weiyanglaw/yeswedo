// v492 開場：白雲 → 有法度律師函 → 訪客蓋事務所印章 → 雲散開、群島出現 → 鏡頭落到人物背後
export function setupOpening(T, c){
 const F='Huninn,"PingFang TC","Noto Sans TC",sans-serif',S='"Noto Serif TC","Songti TC",serif';
 const st=document.createElement('style');st.textContent=`
 body.wy-opening #joy,body.wy-opening #interact,body.wy-opening #home,body.wy-opening .gu,body.wy-opening #wyWalkUI,body.wy-opening #where,body.wy-opening #wyGestures,body.wy-opening a[href*="guide.html"]{visibility:hidden!important}
 #wyOp{position:fixed;inset:0;z-index:2147482000;font-family:${F};color:#1A2B4C;overflow:hidden;-webkit-tap-highlight-color:transparent}
 #wyOp .sky{position:absolute;inset:0;background:linear-gradient(180deg,#BFE3FF,#EAF6FF 60%,#FFF4E6);transition:opacity 1.2s}
 #wyOp .cl{position:absolute;border-radius:50%;background:radial-gradient(closest-side,#fff 60%,#ffffffd8 76%,#fff0);transition:transform 1.5s cubic-bezier(.5,0,.3,1),opacity 1.5s}
 #wyOp .letter{position:absolute;left:50%;top:50%;width:min(350px,90vw);transform:translate(-50%,-50%);background:#FFF8EC;border-radius:18px;padding:16px 15px 14px;box-shadow:0 0 0 3px #D9B56A,0 0 0 7px #ffffffaa,0 18px 40px #1A2B4C55;animation:wyOpIn .8s cubic-bezier(.3,1.5,.5,1) .5s both;transition:transform .9s cubic-bezier(.6,0,.3,1),opacity .9s}
 @keyframes wyOpIn{0%{transform:translate(-50%,-160%) rotate(-8deg);opacity:0}100%{transform:translate(-50%,-50%);opacity:1}}
 #wyOp .letter.shk{animation:wyOpShk .35s}
 @keyframes wyOpShk{0%,100%{transform:translate(-50%,-50%)}25%{transform:translate(calc(-50% - 4px),calc(-50% + 3px)) rotate(-.6deg)}50%{transform:translate(calc(-50% + 4px),calc(-50% - 2px)) rotate(.5deg)}}
 #wyOp .letter.away{transform:translate(40vw,-62vh) scale(.08) rotate(20deg);opacity:0}
 #wyOp .fun{position:absolute;top:11px;right:11px;background:#F26D8E;color:#fff;font-size:11px;padding:2px 9px;border-radius:999px;letter-spacing:2px}
 #wyOp .hd{display:flex;align-items:center;gap:9px;border-bottom:2px solid #D9B56A;padding-bottom:8px;margin-bottom:8px}
 #wyOp .hd img{width:38px;height:38px}#wyOp .hd b{display:block;font-family:${S};font-size:19px;letter-spacing:3px}#wyOp .hd small{font-size:10.5px;color:#8A6224;letter-spacing:2px}
 #wyOp .row{font-size:13.5px;line-height:1.7}#wyOp .k{display:inline-block;min-width:4.2em;color:#8A6224}#wyOp .who{color:#C8342B;font-size:15px}
 #wyOp ol{margin:2px 0 0;padding-left:1.5em;font-size:13px;line-height:1.65}
 #wyOp .sig{position:relative;display:flex;align-items:flex-end;margin-top:8px;min-height:84px}
 #wyOp .sig .lin{display:flex;align-items:center;gap:5px;font-size:12px}#wyOp .sig .lin img{width:48px;height:48px}#wyOp .sig .date{font-size:11px;color:#777}
 #wyOp .slot{position:absolute;right:2px;bottom:2px;width:78px;height:78px;border:2px dashed #C8342B66;border-radius:8px;display:grid;place-items:center;color:#C8342B99;font-size:11px}
 #wyOp .seal{position:absolute;right:2px;bottom:2px;width:78px;height:78px;border:4px solid #C8342B;border-radius:10px;color:#C8342B;display:grid;grid-template-columns:1fr 1fr;place-items:center;font-family:${S};font-weight:900;font-size:23px;line-height:1;padding:3px;background:#C8342B0c;opacity:0;transform:scale(3) rotate(-24deg)}
 #wyOp .seal.down{animation:wyOpStamp .42s cubic-bezier(.5,0,.75,0) forwards}
 @keyframes wyOpStamp{0%{opacity:0;transform:scale(3) rotate(-24deg)}70%{opacity:1;transform:scale(.92) rotate(-8deg)}100%{opacity:.92;transform:scale(1) rotate(-8deg)}}
 #wyOp .sign{font-family:${S};font-size:20px;color:#233a6a;display:inline-block;clip-path:inset(0 100% 0 0);transition:clip-path 1s ease-out}#wyOp .sign.on{clip-path:inset(0)}
 #wyOp .ln{display:inline-block;min-width:8.5em;border-bottom:1.5px solid #8A6224;padding:0 4px}
 #wyOp .foot{margin-top:8px;font-size:10px;color:#999;text-align:center}
 #wyOp .go{position:absolute;left:50%;bottom:calc(9% + env(safe-area-inset-bottom));transform:translateX(-50%);border:none;border-radius:999px;padding:13px 26px;font:inherit;font-size:17px;letter-spacing:2px;white-space:nowrap;background:linear-gradient(180deg,#FFE7A8,#D9A84E);color:#4A2E08;box-shadow:0 0 0 3px #fff,0 6px 0 3px #8A6224,0 12px 22px #0004;animation:wyOpBtn .5s 1.2s both;transition:opacity .4s}
 #wyOp .go.nudge{animation:wyOpNudge 1s infinite}
 @keyframes wyOpBtn{0%{opacity:0;transform:translate(-50%,20px)}100%{opacity:1;transform:translateX(-50%)}}
 @keyframes wyOpNudge{0%,100%{transform:translateX(-50%) scale(1);box-shadow:0 0 0 3px #fff,0 6px 0 3px #8A6224,0 0 0 0 #FFE7A8}50%{transform:translateX(-50%) scale(1.08);box-shadow:0 0 0 3px #fff,0 6px 0 3px #8A6224,0 0 26px 8px #FFE7A8}}
 #wyOp .point{position:absolute;left:50%;bottom:calc(9% + 62px + env(safe-area-inset-bottom));width:64px;height:64px;margin-left:-150px;opacity:0;transition:opacity .4s}
 #wyOp .point.on{opacity:1;animation:wyOpPt .8s infinite}
 @keyframes wyOpPt{50%{transform:translate(10px,8px)}}
 #wyOp .point img{width:64px;height:64px;filter:drop-shadow(0 3px 4px #0004)}
 #wyOp .point i{position:absolute;right:-16px;bottom:2px;width:0;height:0;border:9px solid transparent;border-left:14px solid #D9A84E}
 #wyOp .sw{position:absolute;left:50%;top:calc(10px + env(safe-area-inset-top));transform:translateX(-50%);border:1.5px solid #D9B56A;background:#1A2B4Ccc;color:#FFE7B0;border-radius:999px;padding:6px 14px;font:inherit;font-size:12.5px;white-space:nowrap}
 #wyOp .skip{position:absolute;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));border:none;background:#1A2B4C88;color:#fff;border-radius:999px;padding:6px 13px;font:inherit;font-size:12.5px}
 #wyOp .yes{position:absolute;z-index:3;left:50%;top:30%;transform:translate(-50%,-50%) scale(.2);opacity:0;pointer-events:none}
 #wyOp .yes b{display:block;padding:10px 26px;border-radius:999px;background:linear-gradient(180deg,#FFE7A8,#D9A84E);color:#4A2E08;font-size:27px;letter-spacing:3px;box-shadow:0 0 0 4px #fff,0 7px 0 4px #8A6224;white-space:nowrap}
 #wyOp .yes.go2{animation:wyOpYes 1.8s cubic-bezier(.3,1.6,.5,1) forwards}
 @keyframes wyOpYes{0%{opacity:0;transform:translate(-50%,-50%) scale(.2)}22%{opacity:1;transform:translate(-50%,-50%) scale(1.1)}32%{transform:translate(-50%,-50%) scale(1)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-90%)}}
 #wyOp .heads{position:absolute;left:50%;width:min(350px,90vw);transform:translateX(-50%);height:124px;display:flex;justify-content:space-evenly;align-items:flex-end;pointer-events:none;overflow:hidden;z-index:1}
 #wyOp .letter{z-index:2}
 #wyOp .heads img{width:86px;height:86px;filter:drop-shadow(0 3px 4px #0004);transform:translateY(100px);transform-origin:50% 100%}
 #wyOp .heads img.on{animation:wyOpPeek 1.5s cubic-bezier(.3,1.4,.5,1) forwards}
 @keyframes wyOpPeek{0%{transform:translateY(100px)}28%{transform:translateY(-34px)}40%{transform:translateY(2px) scale(1.06,.94)}50%{transform:translateY(-2px)}60%{transform:translateY(-2px) rotate(-9deg)}70%{transform:translateY(-2px) rotate(9deg)}80%{transform:translateY(-2px) rotate(-5deg)}90%,100%{transform:translateY(-2px) rotate(0)}}
 #wyOp .heads.out,#wyOp .hands.out{transition:opacity .4s;opacity:0}
 #wyOp .hands{position:absolute;left:50%;width:min(350px,90vw);transform:translateX(-50%);height:20px;pointer-events:none;z-index:3}
 #wyOp .hands i{position:absolute;top:-9px;width:19px;height:17px;border-radius:50% 50% 45% 45%;border:2px solid #fff;box-shadow:0 2px 3px #0003;opacity:0;transform:translateY(-14px) scale(.4)}
 #wyOp .hands i.on{animation:wyOpHand .35s cubic-bezier(.3,1.7,.5,1) forwards}
 @keyframes wyOpHand{100%{opacity:1;transform:none}}
 #wyOp .go.gone{display:none!important}
 .wyOpCf{position:fixed;width:9px;height:14px;top:-20px;z-index:2147482100;pointer-events:none;border-radius:2px}
 #wyLetterView{position:fixed;inset:0;z-index:2147482500;background:#0b1424d9;display:none;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:16px;font-family:${F}}
 #wyLetterView img{max-width:100%;max-height:76vh;border-radius:12px;box-shadow:0 10px 40px #000}
 #wyLetterView p{color:#fff;margin:0;font-size:14px}#wyLetterView button{border:2px solid #D9B56A;background:#1A2B4C;color:#FFE7B0;border-radius:999px;padding:9px 22px;font:inherit}`;
 document.head.appendChild(st);
 const LOGO='office-logo-transparent.png';
 const kind='letter';
 const today=()=>{const d=new Date();return (d.getFullYear()-1911)+' 年 '+(d.getMonth()+1)+' 月 '+d.getDate()+' 日'};
 const esc=s=>String(s).replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
 const name=()=>{const iv=document.getElementById('visitorName');if(iv&&iv.value.trim())return iv.value.trim();try{return (JSON.parse(localStorage.getItem('weiyangVisitorProfile')||'{}').name)||'法律探險家'}catch(e){return '法律探險家'}};
 const heads=()=>{let H={};try{H=window.wyGetStickers?window.wyGetStickers():(window.wyGetHeads?window.wyGetHeads():{})}catch(e){}return ['林律師','夢奇奇飼養者','哈姆太郎','薪水掌門人'].map(n=>H[n]||'')};
 let AC=null;function thud(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(localStorage.getItem('wy-sound')==='off')return;const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.connect(g);g.connect(AC.destination);o.type='sine';o.frequency.setValueAtTime(180,t);o.frequency.exponentialRampToValueAtTime(55,t+.25);g.gain.setValueAtTime(.7,t);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.start(t);o.stop(t+.32)}catch(e){}}
 const sfx=k=>{try{window.wySfx&&window.wySfx(k)}catch(e){}};
 function confetti(){const cols=['#FFD36E','#F26D8E','#7FC8F8','#B8E986','#FFFFFF','#D9A84E'];for(let i=0;i<70;i++){const d=document.createElement('div');d.className='wyOpCf';d.style.left=Math.random()*100+'vw';d.style.background=cols[i%cols.length];document.body.appendChild(d);const dx=(Math.random()-.5)*160,rot=Math.random()*720;d.animate([{transform:'translate(0,0) rotate(0)'},{transform:`translate(${dx}px,${innerHeight+60}px) rotate(${rot}deg)`}],{duration:1400+Math.random()*1200,delay:Math.random()*250,easing:'cubic-bezier(.2,.6,.4,1)'}).onfinish=()=>d.remove()}}
 function letterHTML(H){const n=esc(name());const seal='<div class="seal"><span>德</span><span>威</span><span>陽</span><span>印</span></div>';
  if(kind==='letter')return `<span class="fun">趣味</span><div class="hd"><img src="${LOGO}" alt=""><div><b>有法度律師函</b><small>德威陽國際法律事務所</small></div></div>
   <div class="row"><span class="k">受文者</span><span class="who">${n}</span> 台端</div><div class="row"><span class="k">主旨</span>通知台端已正式成為有法度島民，請查照。</div>
   <ol><li>經查台端品味出眾、眼光獨到，完全符合入島資格。</li><li>自即日起，台端得自由探索訴訟、醫療、家庭、企業四座島嶼；如有法律問題，歡迎透過 LINE @wylaw 與本所聯繫。</li><li>台端如繼續保持有法度，本所將不另行通知，特此函告。</li></ol>
   <div class="sig"><div><div class="lin">${H[0]?`<img src="${H[0]}" alt="">`:''}德威陽國際法律事務所<br>林律師</div><div class="date">中華民國 ${today()}</div></div><div class="slot">蓋章處</div>${seal}</div><div class="foot">本函為網站遊戲趣味內容，不具任何法律效力</div>`;
  return ''}
 // 鏡頭路徑：雲上 → 俯衝群島 → 人物背後
 let path=null;
 function camTick(now){if(!path)return;const k=Math.max(0,Math.min(1,(now-path.t0)/path.dur));const e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;
  const cam=c.camera,orb=c.orbit;cam.position.copy(path.cp.getPoint(e));orb.target.copy(path.ct.getPoint(e));cam.lookAt(orb.target);
  if(k>=1){path=null;try{orb.update()}catch(err){}c.follow();done()}else requestAnimationFrame(camTick)}
 function flyDown(){const a=c.actor().position,V=(x,y,z)=>new T.Vector3(x,y,z);
  const cp=new T.CatmullRomCurve3([V(0,165,140),V(0,120,95),V(-6,48,62),V(a.x+14,20,a.z+30),V(a.x+6,11,a.z+19)],false,'centripetal');
  const ct=new T.CatmullRomCurve3([V(0,0,-56),V(0,0,-56),V(0,2,-30),V(a.x,2,a.z),V(a.x,a.y+1.3,a.z)],false,'centripetal');
  path={cp,ct,t0:performance.now(),dur:5200};try{window.wyFieldPlay&&window.wyFieldPlay()}catch(e){}requestAnimationFrame(camTick)}
 let ov=null,stamped=false,nudgeT=0;
 function done(){window.wyOpeningOn=false;document.body.classList.remove('wy-opening');if(ov){ov.remove();ov=null}clearTimeout(nudgeT);try{localStorage.setItem('wy-opened','1')}catch(e){}addMenu()}
 function skip(){if(path){path.dur=1;return}if(ov){ov.remove();ov=null}window.wyOpeningOn=false;document.body.classList.remove('wy-opening');const a=c.actor().position;c.camera.position.set(a.x+6,11,a.z+19);c.orbit.target.set(a.x,a.y+1.3,a.z);try{c.orbit.update()}catch(e){}c.follow();done()}
 function stamp(){if(stamped)return;stamped=true;clearTimeout(nudgeT);const L=ov.querySelector('.letter'),s=L.querySelector('.seal');L.querySelector('.slot').style.opacity=0;s.classList.add('down');ov.querySelector('.point').classList.remove('on');const go=ov.querySelector('.go');go.classList.add('gone');
  setTimeout(()=>{thud();sfx('done');L.classList.add('shk');confetti();
   const hd=ov.querySelector('.heads');const rc=L.getBoundingClientRect();hd.style.top=(rc.top-116)+'px';ov.querySelector('.yes').style.top=Math.max(44,rc.top-150)+'px';let WV={};try{WV=window.wyGetWaveStickers?window.wyGetWaveStickers():{}}catch(e){}const NM=['林律師','夢奇奇飼養者','哈姆太郎','薪水掌門人'];
   heads().forEach((src,i)=>{if(!src)return;const im=document.createElement('img');im.src=src;hd.appendChild(im);const fr=WV[NM[i]]||null;
    setTimeout(()=>{im.classList.add('on');sfx('pop');if(fr&&fr[0]){let k=0;setTimeout(()=>{im.src=fr[0];const iv=setInterval(()=>{if(!ov){clearInterval(iv);return}k++;im.src=fr[k%2]},190);setTimeout(()=>clearInterval(iv),1900)},420)}},250+i*180)});setTimeout(()=>ov&&ov.querySelector('.yes').classList.add('go2'),900);
   setTimeout(()=>{L.classList.add('away');sfx('flip');
    ov.querySelectorAll('.cl').forEach(el=>{const dx=+el.dataset.dx,dy=+el.dataset.dy;el.style.transform=`translate(${dx}vw,${dy}vh) scale(1.6)`;el.style.opacity='0'});ov.querySelector('.sky').style.opacity='0';hd.classList.add('out');flyDown()},2200)},330)}
 function play(){if(ov)return;window.wyOpeningOn=true;document.body.classList.add('wy-opening');ov=document.createElement('div');ov.id='wyOp';
  let cl='';const B=[[-8,8,120,-60,-30],[46,4,130,40,-40],[100,14,120,70,-30],[-4,44,140,-70,0],[56,40,150,0,-70],[104,52,130,70,10],[6,84,140,-60,40],[60,92,150,10,70],[100,88,120,70,40],[30,24,110,-20,-60],[76,70,120,50,50],[20,64,120,-50,30]];
  B.forEach(([x,y,sz,dx,dy])=>{cl+=`<div class="cl" data-dx="${dx}" data-dy="${dy}" style="left:${x}%;top:${y}%;width:${sz*2.6}px;height:${sz*1.9}px;margin:-${sz*.95}px 0 0 -${sz*1.3}px"></div>`});
  const H=heads();
  ov.innerHTML=`<div class="sky"></div>${cl}<div class="letter">${letterHTML(H)}</div><div class="yes"><b>YES, WE DO!</b></div><div class="heads"></div>
   <div class="point">${H[0]?`<img src="${H[0]}" alt="">`:''}<i></i></div><button class="go" type="button">${kind==='letter'?'點一下　蓋上事務所印章':'點一下　簽上您的名字'}</button><button class="skip" type="button">跳過 ›</button>`;
  document.body.appendChild(ov);
  const a=c.actor().position;c.camera.position.set(0,165,140);c.orbit.target.set(0,0,-56);try{c.orbit.update()}catch(e){}
  let signed=kind==='letter';const go=ov.querySelector('.go');
  const arm=()=>{clearTimeout(nudgeT);nudgeT=setTimeout(()=>{if(stamped||!ov)return;go.classList.add('nudge');ov.querySelector('.point').classList.add('on')},3000)};arm();
  go.onclick=()=>{go.classList.remove('nudge');ov.querySelector('.point').classList.remove('on');if(!signed){signed=true;sfx('tap');ov.querySelector('.sign').classList.add('on');go.textContent='請林律師　蓋上事務所印章';arm();return}stamp()};
  ov.querySelector('.skip').onclick=skip;
}
 // 選單：我的律師函（存圖分享）
 function addMenu(){const card=document.querySelector('.guMenu .guCard');if(!card||card.querySelector('[data-m="letter"]'))return;const it=document.createElement('div');it.className='guMi';it.dataset.m='letter';it.innerHTML=`<b>我的律師函</b><small>存圖分享</small>`;it.onclick=e=>{e.stopPropagation();openLetter()};card.insertBefore(it,card.children[1]||null)}
 function load(src){return new Promise(r=>{if(!src)return r(null);const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src})}
 async function openLetter(){let v=document.getElementById('wyLetterView');if(!v){v=document.createElement('div');v.id='wyLetterView';v.innerHTML='<img alt="分享圖"><p>長按圖片即可儲存或分享</p><button type="button">回到島上</button>';document.body.appendChild(v);v.querySelector('button').onclick=()=>v.style.display='none'}
  const W=1080,H=1350,cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');
  const bg=g.createRadialGradient(540,400,50,540,500,900);bg.addColorStop(0,'#2E4A7A');bg.addColorStop(1,'#0E1A31');g.fillStyle=bg;g.fillRect(0,0,W,H);
  const rr=(x,y,w,h,r)=>{g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()};
  g.fillStyle='#D9B56A';rr(54,54,972,1060,40);g.fill();g.fillStyle='#FFF8EC';rr(64,64,952,1040,34);g.fill();
  const HS=heads();const [logo,...hs]=await Promise.all([load(LOGO),...HS.map(load)]);
  if(logo)g.drawImage(logo,104,100,110,110);g.textBaseline='middle';g.fillStyle='#1A2B4C';g.font='900 60px '+S;g.fillText('有法度律師函',236,140);
  g.fillStyle='#8A6224';g.font='30px '+F;g.fillText('德威陽國際法律事務所',238,196);g.fillStyle='#F26D8E';rr(860,96,120,52,26);g.fill();g.fillStyle='#fff';g.textAlign='center';g.fillText('趣味',920,123);g.textAlign='left';
  g.fillStyle='#D9B56A';g.fillRect(104,240,872,5);
  let y=310;const n=name();const ln=(k,v,col)=>{g.fillStyle='#8A6224';g.font='36px '+F;g.fillText(k,110,y);g.fillStyle=col||'#1A2B4C';g.fillText(v,290,y);y+=72};
  const wrap=(t,x,mw,lh)=>{let s='';for(const ch of t){if(g.measureText(s+ch).width>mw){g.fillText(s,x,y);y+=lh;s=ch}else s+=ch}if(s){g.fillText(s,x,y);y+=lh}};
  if(kind==='letter'){ln('受文者',n+'　台端','#C8342B');g.fillStyle='#8A6224';g.font='36px '+F;g.fillText('主旨',110,y);g.fillStyle='#1A2B4C';wrap('通知台端已正式成為有法度島民，請查照。',290,690,58);y+=14;g.font='34px '+F;['一、經查台端品味出眾、眼光獨到，完全符合入島資格。','二、如有法律問題，歡迎透過 LINE @wylaw 與本所聯繫。','三、台端如繼續保持有法度，本所將不另行通知。'].forEach(t=>{wrap(t,110,860,56);y+=8})}

  const hy=Math.min(Math.max(y+10,600),660);hs.forEach((im,i)=>{if(im)g.drawImage(im,170+i*190,hy,150,150)});g.fillStyle='#8A6224';g.font='28px '+F;g.textAlign='center';g.fillText('四位成員歡迎您入島',540,hy+178);g.textAlign='left';
  if(hs[0])g.drawImage(hs[0],104,880,150,150);g.fillStyle='#1A2B4C';g.font='34px '+F;g.fillText('德威陽國際法律事務所',266,930);g.fillText('林律師',266,980);g.fillStyle='#888';g.font='28px '+F;g.fillText('中華民國 '+today(),266,1030);
  g.save();g.translate(860,960);g.rotate(-8*Math.PI/180);g.globalAlpha=.9;g.strokeStyle='#C8342B';g.lineWidth=10;rr(-95,-95,190,190,20);g.stroke();g.fillStyle='#C8342B';g.font='900 66px '+S;g.textAlign='center';[['德',-42,-40],['威',42,-40],['陽',-42,44],['印',42,44]].forEach(([ch,x,yy])=>g.fillText(ch,x,yy));g.restore();
  g.textAlign='center';g.fillStyle='#aaa';g.font='24px '+F;g.fillText('本函為網站遊戲趣味內容，不具任何法律效力',540,1080);
  g.fillStyle='#FFE7B0';g.font='40px '+F;g.fillText('我在德威陽，有法度！',540,1172);g.fillStyle='#C9D4EA';g.font='28px '+F;g.fillText('LINE @wylaw　｜　Google 搜尋「德威陽 有法度」',540,1236);g.fillStyle='#D9B56A';g.font='24px '+F;g.fillText('weiandyang.com',540,1288);
  v.querySelector('img').src=cv.toDataURL('image/jpeg',.9);v.style.display='flex';try{document.querySelector('.guMenu')?.classList.remove('on')}catch(e){}}
 window.wyOpening={play,skip,openLetter};
 const btn=document.getElementById('startExplore');
 if(btn)btn.addEventListener('click',()=>{if(btn.disabled)return;
  let seen=false;try{/* v510 陳老闆：律師函開場每次進站都播（可按「跳過」）；只有測試程式會略過 */seen=localStorage.getItem('wy-test-skip')==='1'}catch(e){}
  if(seen){setTimeout(addMenu,30);return}
  play();setTimeout(()=>{if(!document.getElementById('creator')?.classList.contains('finished')){if(ov){ov.remove();ov=null}document.body.classList.remove('wy-opening');return}const cam=c.camera;cam.position.set(0,165,140);c.orbit.target.set(0,0,-56);try{c.orbit.update()}catch(e){}},30)},true);
}
