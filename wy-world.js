// 德威陽｜有法度 v488 — 島上氛圍：天空依台灣時間變化（白天／黃昏／夜晚，可手動切換）、星星月亮、夜燈、
// 飄雲、花瓣與光點、走路小灰塵、點家具小彈跳。只加東西、不改原本模型與互動。
export function setupWorld(T, c){
 const {scene,renderer,camera,hemi,sun}=c;
 const base={bg:new T.Color(scene.background||'#c8eafb'),fog:scene.fog?scene.fog.color.clone():null,hI:hemi.intensity,hC:hemi.color.clone(),hG:hemi.groundColor.clone(),sI:sun.intensity,sC:sun.color.clone()};
 const P={
  day:{bg:'#c8eafb',fog:'#c8eafb',h:1,hc:'#ffffff',s:1,sc:'#ffffff',stars:0,glow:0,cloud:'#ffffff',mote:0},
  dusk:{bg:'#f6c9a6',fog:'#f3c3a8',h:.82,hc:'#ffe2c8',s:.75,sc:'#ffb37a',stars:.25,glow:.55,cloud:'#ffe0d0',mote:.5},
  night:{bg:'#34508F',fog:'#34508F',h:1.02,hc:'#e2e8ff',s:.86,sc:'#dbe2ff',stars:1,glow:1,cloud:'#93a2d6',mote:1}};
 let mode='auto';try{mode=localStorage.getItem('wy-sky')||'auto'}catch(e){}
 function taipeiHour(){try{const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Taipei',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());const h=+p.find(x=>x.type==='hour').value,m=+p.find(x=>x.type==='minute').value;return (h%24)+m/60}catch(e){const d=new Date();return d.getHours()+d.getMinutes()/60}}
 function phaseNow(){if(mode==='day')return 'day';if(mode==='night')return 'night';const h=taipeiHour();if(h>=6&&h<16.5)return 'day';if(h>=16.5&&h<18.5)return 'dusk';if(h>=5.3&&h<6)return 'dusk';return 'night'}

 /* 星星 */
 const sg=new T.BufferGeometry();const N=700,pos=new Float32Array(N*3);for(let i=0;i<N;i++){const u=Math.random()*Math.PI*2,v=Math.random()*.42+.06,r=420;pos[i*3]=Math.cos(u)*Math.cos(v)*r;pos[i*3+1]=Math.sin(v)*r+40;pos[i*3+2]=Math.sin(u)*Math.cos(v)*r}
 sg.setAttribute('position',new T.BufferAttribute(pos,3));
 const dot=(()=>{const cv=document.createElement('canvas');cv.width=cv.height=64;const x=cv.getContext('2d');const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(255,240,200,.9)');g.addColorStop(1,'rgba(255,240,200,0)');x.fillStyle=g;x.fillRect(0,0,64,64);const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t})();
 const stars=new T.Points(sg,new T.PointsMaterial({size:3.2,map:dot,transparent:true,depthWrite:false,opacity:0,color:'#fff7e0',sizeAttenuation:true,fog:false}));stars.renderOrder=-1;scene.add(stars);
 /* 月亮 */
 const moonTex=(()=>{const cv=document.createElement('canvas');cv.width=cv.height=256;const x=cv.getContext('2d');const g=x.createRadialGradient(128,128,40,128,128,128);g.addColorStop(0,'rgba(255,248,220,.55)');g.addColorStop(1,'rgba(255,248,220,0)');x.fillStyle=g;x.fillRect(0,0,256,256);x.fillStyle='#FFF6D8';x.beginPath();x.arc(128,128,48,0,7);x.fill();x.fillStyle='rgba(225,210,170,.5)';[[112,116,9],[142,140,7],[124,150,5]].forEach(([a,b,r])=>{x.beginPath();x.arc(a,b,r,0,7);x.fill()});/* v499：月亮依真實農曆日期顯示月相 */try{const f=new Intl.DateTimeFormat('en-u-ca-chinese',{day:'numeric',timeZone:'Asia/Taipei'});const d=parseInt(f.formatToParts(new Date()).find(q=>q.type==='day').value,10);const k=((d-1)%30)/29.5;if(Math.abs(k-.5)>.04){const R=50;const dx=k<.5?-2*R*(k/.5):2*R*((1-k)/.5);x.globalCompositeOperation='destination-out';x.beginPath();x.arc(128+dx,128,R,0,7);x.fill();x.globalCompositeOperation='source-over'}}catch(e){}const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t})();
 const moon=new T.Sprite(new T.SpriteMaterial({map:moonTex,transparent:true,depthWrite:false,fog:false,opacity:0}));moon.scale.set(70,70,1);moon.position.set(-160,190,-300);scene.add(moon);

 /* 夜燈：原本會發光的材質（路燈燈泡等）夜晚加亮；窗戶玻璃夜晚透出暖光 */
 const glowMats=new Map(),winMats=new Map();
 const _gb=new T.Box3();
 let winClone=null;
 function collectGlow(){const bigUse=new Set();scene.traverse(o=>{if(!o.isMesh||!o.material)return;
  /* 城堡窗戶玻璃與屋頂共用同一個材質：窗戶另外複製一份材質，夜晚才能單獨亮燈 */
  if(!Array.isArray(o.material)&&o.material.color&&o.material.color.getHexString()==='557895'&&!/Cone|Cylinder|Lathe/.test(o.geometry.type)){if(!winClone){winClone=o.material.clone();winMats.set(winClone,{e:winClone.emissive.clone(),i:winClone.emissiveIntensity||1})}o.material=winClone;return}
const ms=Array.isArray(o.material)?o.material:[o.material];let size=-1;for(const m of ms){if(!m||!m.emissive||glowMats.has(m))continue;if(winMats.has(m)){if(m===winClone)continue;if(size<0){_gb.setFromObject(o);size=Math.max(_gb.max.x-_gb.min.x,_gb.max.y-_gb.min.y,_gb.max.z-_gb.min.z)}if(size>=2.6)bigUse.add(m);continue}
   const e=m.emissive;if(e.r+e.g+e.b>.15&&(m.emissiveIntensity||1)>0){glowMats.set(m,m.emissiveIntensity||1);continue}
   const col=m.color;if(!col)continue;if(m.transparent||m.opacity<1||m.transmission>0)continue;/* v497：玻璃（例如醫療館圓頂）晚上不要變成暖黃色 */const lum=.3*col.r+.59*col.g+.11*col.b;if(!(col.b>col.r+.06&&col.g>col.r&&lum>.55))continue;
   if(size<0){_gb.setFromObject(o);size=Math.max(_gb.max.x-_gb.min.x,_gb.max.y-_gb.min.y,_gb.max.z-_gb.min.z)}if(size<2.6)winMats.set(m,{e:m.emissive.clone(),i:m.emissiveIntensity||1});else bigUse.add(m)}});for(const m of bigUse)winMats.delete(m)}
 const warm=new T.Color('#ffcf7a');

 /* 飄雲 */
 const cloudTex=(()=>{const cv=document.createElement('canvas');cv.width=256;cv.height=128;const x=cv.getContext('2d');x.fillStyle='#fff';[[70,78,40],[118,62,52],[170,76,40],[120,86,46],[200,88,26],[44,92,24]].forEach(([a,b,r])=>{x.beginPath();x.arc(a,b,r,0,7);x.fill()});const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t})();
 const clouds=[];for(let i=0;i<9;i++){const s=new T.Sprite(new T.SpriteMaterial({map:cloudTex,transparent:true,depthWrite:false,opacity:.85,fog:false}));const k=24+Math.random()*22;s.scale.set(k,k/2,1);/* v497：雲只在遠方高空，不會從鏡頭前穿過 */s.position.set(-220+i*50+Math.random()*20,62+Math.random()*26,-170-Math.random()*130);s.userData.sp=.6+Math.random()*.8;clouds.push(s);scene.add(s)}

 /* 花瓣（白天）與光點（夜晚） */
 const M=140,mp=new Float32Array(M*3),mv=[];for(let i=0;i<M;i++){mp[i*3]=(Math.random()-.5)*70;mp[i*3+1]=2+Math.random()*18;mp[i*3+2]=(Math.random()-.5)*70;mv.push([(Math.random()-.5)*.6,-.25-Math.random()*.35,(Math.random()-.5)*.6,Math.random()*6.28])}
 const mg=new T.BufferGeometry();mg.setAttribute('position',new T.BufferAttribute(mp,3));
 const WY_MONTH=(()=>{try{return +new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Taipei',month:'numeric'}).format(new Date())}catch(e){return new Date().getMonth()+1}})();const WY_SEASON=WY_MONTH>=3&&WY_MONTH<=5?'spring':WY_MONTH>=6&&WY_MONTH<=8?'summer':WY_MONTH>=9&&WY_MONTH<=11?'autumn':'winter';window.wySeason=WY_SEASON;
 /* v499：依真實季節換飄落物：春櫻花、秋楓葉、冬小雪；夏天白天不飄（改多風箏熱氣球） */
 const petalTex=(()=>{const cv=document.createElement('canvas');cv.width=cv.height=64;const x=cv.getContext('2d');x.translate(32,32);x.rotate(.6);
  if(WY_SEASON==='autumn'){x.fillStyle=['#E8692E','#D9482B','#F2A23A'][Math.floor(Math.random()*3)];x.beginPath();for(let k=0;k<10;k++){const a=k/10*Math.PI*2,r=k%2?9:22;x.lineTo(Math.cos(a)*r,Math.sin(a)*r)}x.closePath();x.fill();x.strokeStyle='rgba(120,40,10,.6)';x.lineWidth=2;x.beginPath();x.moveTo(0,0);x.lineTo(0,24);x.stroke()}
  else if(WY_SEASON==='winter'){const g=x.createRadialGradient(0,0,0,0,0,14);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.beginPath();x.arc(0,0,14,0,7);x.fill()}
  else{x.fillStyle='#F7B6C8';x.beginPath();x.ellipse(0,0,13,22,0,0,7);x.fill();x.fillStyle='#FCD9E3';x.beginPath();x.ellipse(-3,-4,5,10,0,0,7);x.fill()}const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t})();
 const motes=new T.Points(mg,new T.PointsMaterial({size:.55,map:petalTex,transparent:true,depthWrite:false,opacity:.9,sizeAttenuation:true}));scene.add(motes);
 let moteNight=false;

 /* 走路小灰塵 */
 const dustTex=(()=>{const cv=document.createElement('canvas');cv.width=cv.height=64;const x=cv.getContext('2d');const g=x.createRadialGradient(32,32,0,32,32,30);g.addColorStop(0,'rgba(255,248,236,.95)');g.addColorStop(1,'rgba(255,248,236,0)');x.fillStyle=g;x.fillRect(0,0,64,64);const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t})();
 const dust=[];for(let i=0;i<14;i++){const s=new T.Sprite(new T.SpriteMaterial({map:dustTex,transparent:true,depthWrite:false,opacity:0}));s.visible=false;s.userData.t=9;dust.push(s);scene.add(s)}
 let dustCd=0,lastA=null,di=0;

 /* 套用天空 */
 let cur=null,target=null,mix=1,from=null,mixT0=0;
 const lerpC=(a,b,t)=>a.clone().lerp(b,t);
 function snapshot(){return {bg:scene.background.clone(),fog:scene.fog?scene.fog.color.clone():null,h:hemi.intensity/base.hI,hc:hemi.color.clone(),s:sun.intensity/base.sI,sc:sun.color.clone(),stars:stars.material.opacity,glow:cur?P[cur].glow:0,cloud:clouds[0].material.color.clone(),mote:moteNight?1:0}}
 function goTo(ph,instant){if(ph===cur&&!instant)return;from=snapshot();target=ph;mix=instant?1:0;mixT0=performance.now();cur=ph;if(instant)apply(1)}
 function apply(t){const p=P[target];const k=t*t*(3-2*t);
  scene.background=lerpC(from.bg,new T.Color(p.bg),k);if(scene.fog)scene.fog.color.copy(lerpC(from.fog||new T.Color(p.fog),new T.Color(p.fog),k));
  hemi.intensity=base.hI*(from.h+(p.h-from.h)*k);hemi.color.copy(lerpC(from.hc,new T.Color(p.hc),k));
  sun.intensity=base.sI*(from.s+(p.s-from.s)*k);sun.color.copy(lerpC(from.sc,new T.Color(p.sc),k));
  stars.material.opacity=from.stars+(p.stars-from.stars)*k;stars.visible=stars.material.opacity>.02;moon.material.opacity=stars.material.opacity;moon.visible=stars.visible;
  const g=from.glow+(p.glow-from.glow)*k;for(const [m,i0] of glowMats)m.emissiveIntensity=i0*(1+g*1.6);
  for(const [m,o] of winMats){m.emissive.copy(o.e).lerp(warm,g*.85);m.emissiveIntensity=Math.max(o.i,g*.9)}
  for(const s of clouds)s.material.color.copy(lerpC(from.cloud,new T.Color(p.cloud),k));
  const night=p.mote>.6;if(snow&&t>=1&&!motes.userData.snow){motes.userData.snow=1;motes.material.map=dot;motes.material.size=.6;motes.material.color.set('#ffffff');motes.material.blending=T.NormalBlending;motes.material.needsUpdate=true}if(!snow&&t>=1&&night!==moteNight){moteNight=night;motes.material.map=night?dot:petalTex;motes.material.size=night?.7:.55;motes.material.blending=night?T.AdditiveBlending:T.NormalBlending;motes.material.needsUpdate=true}}

 /* 點家具小彈跳（四館） */
 const hops=[];
 function hop(objs){const t0=performance.now();for(const o of objs){if(o.userData.wyHop)continue;o.userData.wyHop={t0,y:o.position.y};hops.push(o)}}
 const ray=new T.Raycaster(),ptr=new T.Vector2(),bb=new T.Box3(),bb2=new T.Box3();
 let pdown=null;renderer.domElement.addEventListener('pointerdown',e=>{pdown={x:e.clientX,y:e.clientY}},{passive:true});
 renderer.domElement.addEventListener('pointerup',e=>{if(!pdown||Math.hypot(e.clientX-pdown.x,e.clientY-pdown.y)>8)return;pdown=null;
  const room=c.room&&c.room();if(!(room>=1&&room<=4))return;const r=c.rooms()[room];if(!r)return;
  const tg=[];if(r.litigationInterior&&r.litigationInterior.targets)tg.push(...r.litigationInterior.targets);if(r.medicalRoom&&r.medicalRoom.interactionTargets)tg.push(...r.medicalRoom.interactionTargets);if(r.familyRoom&&r.familyRoom.targets)tg.push(...r.familyRoom.targets);
  if(room===4)r.scene.traverse(o=>{if(o.userData&&(o.userData.businessZone||o.userData.businessAbout))tg.push(o)});
  ptr.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);ray.setFromCamera(ptr,r.camera);const hit=ray.intersectObjects(tg,true)[0];if(!hit)return;
  let o=hit.object;if(o.isSprite)return;const vis=m=>{const ms=Array.isArray(m.material)?m.material:[m.material];return ms.some(x=>x&&x.visible!==false&&!(x.transparent&&x.opacity<.08))};
  if(vis(o)){hop([o.parent&&o.parent!==r.scene&&o.parent.children.length<40?o.parent:o]);return}
  bb.setFromObject(o).expandByScalar(.25);const list=[];r.scene.traverse(m=>{if(!m.isMesh||m===o||list.length>24)return;if(m.userData&&m.userData.chibi)return;for(let q=m;q;q=q.parent){if(q.userData&&q.userData.chibi)return}if(!vis(m))return;bb2.setFromObject(m);if(bb2.isEmpty())return;const cx=(bb2.min.x+bb2.max.x)/2,cy=(bb2.min.y+bb2.max.y)/2,cz=(bb2.min.z+bb2.max.z)/2;if(bb.containsPoint(new T.Vector3(cx,cy,cz))&&(bb2.max.x-bb2.min.x)<6&&(bb2.max.z-bb2.min.z)<6)list.push(m)});hop(list)},{passive:true});


 /* ---------- v493 節日裝飾：主體在 wy-fest.js，這裡只提供天空、月亮、飄落物的控制 ---------- */
 let snow=false;let festTickFn=null;
 const festApi={moon,dot,glow:(m,i)=>glowMats.set(m,i),phase:()=>cur,
  setSnow(){snow=true;motes.userData.snow=1;motes.material.map=dot;motes.material.size=.95;motes.material.color.set('#ffffff');motes.material.blending=T.NormalBlending;motes.material.opacity=.95;motes.material.needsUpdate=true},
  tintMotes(col){motes.userData.tint=col;motes.material.color.set(col);motes.material.needsUpdate=true}};
 import('./wy-fest.js?v=509').then(m=>{try{festTickFn=m.setupFest(T,c,festApi)}catch(e){console.error('fest',e)}}).catch(e=>console.error('fest load',e));
 let skyTickFn=null;import('./wy-sky.js?v=509').then(m=>{try{skyTickFn=m.setupSky(T,c,festApi)}catch(e){console.error('sky',e)}}).catch(e=>console.error('sky load',e));
 let fwTickFn=null;import('./wy-fireworks.js?v=509').then(m=>{try{fwTickFn=m.setupFireworks(T,c,festApi)}catch(e){console.error('fw',e)}}).catch(e=>console.error('fw load',e));
 function festTick(dt,now){if(festTickFn)festTickFn(dt,now);if(fwTickFn)try{fwTickFn(dt)}catch(e){}if(skyTickFn)try{skyTickFn(dt)}catch(e){}if(WY_SEASON==='summer'&&!snow)motes.visible=moteNight}
 /* ---------- v489 流暢度：依實際幀率自動調整解析度 ---------- */
 const prCap=Math.min(window.devicePixelRatio||1,2),prMin=Math.min(prCap,1.75);let prNow=renderer.getPixelRatio(),pfN=0,pfT=performance.now(),pfGood=0;
 window.wyPerf={get pr(){return prNow},fps:0};
 function perfTick(now){if(document.hidden){pfT=now;pfN=0;return}pfN++;const span=now-pfT;if(span<2000)return;const fps=pfN*1000/span;pfN=0;pfT=now;window.wyPerf.fps=Math.round(fps);
  if(fps<40&&prNow>prMin){prNow=Math.max(prMin,+(prNow-.25).toFixed(2));renderer.setPixelRatio(prNow);pfGood=0}
  else if(fps>57){if(++pfGood>=4&&prNow<prCap){prNow=Math.min(prCap,+(prNow+.25).toFixed(2));renderer.setPixelRatio(prNow);pfGood=0}}else pfGood=0}
 /* 每格更新 */
 let started=false,last=performance.now(),checkT=0;
 function tick(){requestAnimationFrame(tick);const now=performance.now();const dt=Math.min(.05,(now-last)/1000);last=now;
  if(!started){started=true;collectGlow();setTimeout(collectGlow,4000);setTimeout(collectGlow,12000);goTo(phaseNow(),true)}
  checkT-=dt;if(checkT<=0){checkT=20;const ph=phaseNow();if(ph!==cur)goTo(ph,false)}
  if(mix<1){mix=Math.min(1,(now-mixT0)/2200);apply(mix)}
  try{festTick(dt,now)}catch(e){}
  try{perfTick(performance.now())}catch(e){}
  const inside=c.inside&&c.inside();
  for(const s of clouds){s.position.x+=s.userData.sp*dt;if(s.position.x>200)s.position.x=-200}
  const a=c.actor&&c.actor();const ax=a?a.position.x:0,az=a?a.position.z:0;
  motes.visible=!inside;if(!inside){const arr=mg.attributes.position.array;for(let i=0;i<M;i++){const v=mv[i];v[3]+=dt;let x=arr[i*3]+(v[0]+Math.sin(v[3])*.4)*dt*(moteNight?.6:1),y=arr[i*3+1]+v[1]*dt*(snow?2.2:(moteNight?.15:1))+(moteNight?Math.sin(v[3]*1.3)*.01:0),z=arr[i*3+2]+(v[2]+Math.cos(v[3]*.8)*.4)*dt*(moteNight?.6:1);
    if(y<.5)y=18;if(y>20)y=2;if(x-ax>35)x-=70;if(x-ax<-35)x+=70;if(z-az>35)z-=70;if(z-az<-35)z+=70;arr[i*3]=x;arr[i*3+1]=y;arr[i*3+2]=z}mg.attributes.position.needsUpdate=true}
  /* 小灰塵 */
  if(a&&!inside){if(lastA){const sp=Math.hypot(ax-lastA[0],az-lastA[1])/Math.max(dt,.001);dustCd-=dt;const autoW=(window.__wyAutoWalking&&window.__wyAutoWalking())||window.__wyDoorBusy;/* v508 灰塵：小一點、淡一點、短一點，自動走路時不出 */if(!autoW&&sp>2.6&&dustCd<=0){dustCd=.22;const s=dust[di++%dust.length];s.visible=true;s.userData.t=0;s.position.set(ax+(Math.random()-.5)*.4,a.position.y+.25,az+(Math.random()-.5)*.4)}}lastA=[ax,az]}
  for(const s of dust){if(!s.visible)continue;s.userData.t+=dt;const t=s.userData.t/.35;if(t>=1){s.visible=false;continue}const k=.28+t*.55;s.scale.set(k,k,1);s.position.y+=dt*.45;s.material.opacity=.38*(1-t)}
  /* 家具彈跳 */
  for(let i=hops.length-1;i>=0;i--){const o=hops[i],h=o.userData.wyHop,t=(now-h.t0)/380;if(t>=1){o.position.y=h.y;delete o.userData.wyHop;hops.splice(i,1);continue}o.position.y=h.y+Math.sin(t*Math.PI)*.22*(1-t*.3)}
 }
 requestAnimationFrame(tick);
 window.wySky={get mode(){return mode},set(m){mode=m;try{localStorage.setItem('wy-sky',m)}catch(e){}goTo(phaseNow(),false)},phase:()=>cur};
}
