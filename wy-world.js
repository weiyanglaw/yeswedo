// 德威陽｜有法度 v488 — 島上氛圍：天空依台灣時間變化（白天／黃昏／夜晚，可手動切換）、星星月亮、夜燈、
// 飄雲、花瓣與光點、走路小灰塵、點家具小彈跳。只加東西、不改原本模型與互動。
export function setupWorld(T, c){
 const {scene,renderer,camera,hemi,sun}=c;
 const base={bg:new T.Color(scene.background||'#c8eafb'),fog:scene.fog?scene.fog.color.clone():null,hI:hemi.intensity,hC:hemi.color.clone(),hG:hemi.groundColor.clone(),sI:sun.intensity,sC:sun.color.clone()};
 const P={
  day:{bg:'#c8eafb',fog:'#c8eafb',h:1,hc:'#ffffff',s:1,sc:'#ffffff',stars:0,glow:0,cloud:'#ffffff',mote:0},
  dusk:{bg:'#f6c9a6',fog:'#f3c3a8',h:.82,hc:'#ffe2c8',s:.75,sc:'#ffb37a',stars:.25,glow:.55,cloud:'#ffe0d0',mote:.5},
  night:{bg:'#14233f',fog:'#14233f',h:.42,hc:'#9fb4e8',s:.28,sc:'#9fb7ff',stars:1,glow:1,cloud:'#5d6f9a',mote:1}};
 let mode='auto';try{mode=localStorage.getItem('wy-sky')||'auto'}catch(e){}
 function taipeiHour(){try{const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Taipei',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());const h=+p.find(x=>x.type==='hour').value,m=+p.find(x=>x.type==='minute').value;return (h%24)+m/60}catch(e){const d=new Date();return d.getHours()+d.getMinutes()/60}}
 function phaseNow(){if(mode==='day')return 'day';if(mode==='night')return 'night';const h=taipeiHour();if(h>=6&&h<16.5)return 'day';if(h>=16.5&&h<18.5)return 'dusk';if(h>=5.3&&h<6)return 'dusk';return 'night'}

 /* 星星 */
 const sg=new T.BufferGeometry();const N=700,pos=new Float32Array(N*3);for(let i=0;i<N;i++){const u=Math.random()*Math.PI*2,v=Math.random()*.42+.06,r=420;pos[i*3]=Math.cos(u)*Math.cos(v)*r;pos[i*3+1]=Math.sin(v)*r+40;pos[i*3+2]=Math.sin(u)*Math.cos(v)*r}
 sg.setAttribute('position',new T.BufferAttribute(pos,3));
 const dot=(()=>{const cv=document.createElement('canvas');cv.width=cv.height=64;const x=cv.getContext('2d');const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(255,240,200,.9)');g.addColorStop(1,'rgba(255,240,200,0)');x.fillStyle=g;x.fillRect(0,0,64,64);const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t})();
 const stars=new T.Points(sg,new T.PointsMaterial({size:3.2,map:dot,transparent:true,depthWrite:false,opacity:0,color:'#fff7e0',sizeAttenuation:true,fog:false}));stars.renderOrder=-1;scene.add(stars);
 /* 月亮 */
 const moonTex=(()=>{const cv=document.createElement('canvas');cv.width=cv.height=256;const x=cv.getContext('2d');const g=x.createRadialGradient(128,128,40,128,128,128);g.addColorStop(0,'rgba(255,248,220,.55)');g.addColorStop(1,'rgba(255,248,220,0)');x.fillStyle=g;x.fillRect(0,0,256,256);x.fillStyle='#FFF6D8';x.beginPath();x.arc(128,128,48,0,7);x.fill();x.fillStyle='rgba(225,210,170,.5)';[[112,116,9],[142,140,7],[124,150,5]].forEach(([a,b,r])=>{x.beginPath();x.arc(a,b,r,0,7);x.fill()});const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t})();
 const moon=new T.Sprite(new T.SpriteMaterial({map:moonTex,transparent:true,depthWrite:false,fog:false,opacity:0}));moon.scale.set(70,70,1);moon.position.set(-160,190,-300);scene.add(moon);

 /* 夜燈：原本會發光的材質（路燈燈泡等）夜晚加亮；窗戶玻璃夜晚透出暖光 */
 const glowMats=new Map(),winMats=new Map();
 const _gb=new T.Box3();
 let winClone=null;
 function collectGlow(){scene.traverse(o=>{if(!o.isMesh||!o.material)return;
  /* 城堡窗戶玻璃與屋頂共用同一個材質：窗戶另外複製一份材質，夜晚才能單獨亮燈 */
  if(!Array.isArray(o.material)&&o.material.color&&o.material.color.getHexString()==='557895'&&!/Cone|Cylinder|Lathe/.test(o.geometry.type)){if(!winClone){winClone=o.material.clone();winMats.set(winClone,{e:winClone.emissive.clone(),i:winClone.emissiveIntensity||1})}o.material=winClone;return}
const ms=Array.isArray(o.material)?o.material:[o.material];let size=-1;for(const m of ms){if(!m||!m.emissive||glowMats.has(m)||winMats.has(m))continue;
   const e=m.emissive;if(e.r+e.g+e.b>.15&&(m.emissiveIntensity||1)>0){glowMats.set(m,m.emissiveIntensity||1);continue}
   const col=m.color;if(!col)continue;const lum=.3*col.r+.59*col.g+.11*col.b;if(!(col.b>col.r+.06&&col.g>col.r&&lum>.55))continue;
   if(size<0){_gb.setFromObject(o);size=Math.max(_gb.max.x-_gb.min.x,_gb.max.y-_gb.min.y,_gb.max.z-_gb.min.z)}if(size<2.6)winMats.set(m,{e:m.emissive.clone(),i:m.emissiveIntensity||1})}})}
 const warm=new T.Color('#ffcf7a');

 /* 飄雲 */
 const cloudTex=(()=>{const cv=document.createElement('canvas');cv.width=256;cv.height=128;const x=cv.getContext('2d');x.fillStyle='#fff';[[70,78,40],[118,62,52],[170,76,40],[120,86,46],[200,88,26],[44,92,24]].forEach(([a,b,r])=>{x.beginPath();x.arc(a,b,r,0,7);x.fill()});const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t})();
 const clouds=[];for(let i=0;i<9;i++){const s=new T.Sprite(new T.SpriteMaterial({map:cloudTex,transparent:true,depthWrite:false,opacity:.85,fog:false}));const k=24+Math.random()*22;s.scale.set(k,k/2,1);const a=i/9*Math.PI*2+Math.random()*.4,r=90+Math.random()*80;s.position.set(Math.cos(a)*r,42+Math.random()*30,Math.sin(a)*r-20);s.userData.sp=.6+Math.random()*.8;clouds.push(s);scene.add(s)}

 /* 花瓣（白天）與光點（夜晚） */
 const M=140,mp=new Float32Array(M*3),mv=[];for(let i=0;i<M;i++){mp[i*3]=(Math.random()-.5)*70;mp[i*3+1]=2+Math.random()*18;mp[i*3+2]=(Math.random()-.5)*70;mv.push([(Math.random()-.5)*.6,-.25-Math.random()*.35,(Math.random()-.5)*.6,Math.random()*6.28])}
 const mg=new T.BufferGeometry();mg.setAttribute('position',new T.BufferAttribute(mp,3));
 const petalTex=(()=>{const cv=document.createElement('canvas');cv.width=cv.height=64;const x=cv.getContext('2d');x.translate(32,32);x.rotate(.6);x.fillStyle='#F7B6C8';x.beginPath();x.ellipse(0,0,13,22,0,0,7);x.fill();x.fillStyle='#FCD9E3';x.beginPath();x.ellipse(-3,-4,5,10,0,0,7);x.fill();const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t})();
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


 /* ---------- v489 節日裝飾（春節、西洋情人節、端午、七夕、中秋、聖誕） ---------- */
 const FEST_TABLE={cny:{2026:'2026-02-17',2027:'2027-02-06',2028:'2028-01-26',2029:'2029-02-13',2030:'2030-02-03'},duan:{2026:'2026-06-19',2027:'2027-06-09',2028:'2028-05-28'},qixi:{2026:'2026-08-19',2027:'2027-08-08',2028:'2028-08-26',2029:'2029-08-16',2030:'2030-08-05'},moon:{2026:'2026-09-25',2027:'2027-09-15',2028:'2028-10-03'}};
 const LUNAR={cny:[1,1],duan:[5,5],qixi:[7,7],moon:[8,15]};
 const WIN={cny:[-7,14],duan:[-5,1],qixi:[-3,1],moon:[-7,2]};
 const GREET={cny:'新春快樂',val:'情人節快樂',duan:'端午節安康',qixi:'七夕快樂',moon:'中秋節快樂',xmas:'Merry Christmas'};
 function tpDate(){const p=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());return new Date(p+'T12:00:00+08:00')}
 function lunarFind(key,year){/* 表裡沒有的年份，用瀏覽器農曆換算 */try{const f=new Intl.DateTimeFormat('en-u-ca-chinese',{month:'numeric',day:'numeric',timeZone:'Asia/Taipei'});const [lm,ld]=LUNAR[key];let d=new Date(year+'-01-01T12:00:00+08:00');for(let i=0;i<400;i++){const ps=f.formatToParts(d);const m=ps.find(x=>x.type==='month').value,dd=+ps.find(x=>x.type==='day').value;if(String(+m)===m&&+m===lm&&dd===ld&&d.getFullYear()===year)return d;d=new Date(d.getTime()+864e5)}}catch(e){}return null}
 function festDay(key,year){const t=FEST_TABLE[key]&&FEST_TABLE[key][year];return t?new Date(t+'T12:00:00+08:00'):lunarFind(key,year)}
 function currentFest(){let q='';try{q=(new URLSearchParams(location.search).get('fest')||'').toLowerCase()}catch(e){}if(GREET[q])return q;
  const now=tpDate(),y=now.getFullYear(),md=(now.getMonth()+1)*100+now.getDate();
  if(md>=1215&&md<=1226)return 'xmas';if(md>=210&&md<=215)return 'val';
  for(const k of ['cny','duan','qixi','moon'])for(const yy of [y,y+1]){const d=festDay(k,yy);if(!d)continue;const diff=Math.round((now-d)/864e5);if(diff>=WIN[k][0]&&diff<=WIN[k][1])return k}
  return ''}
 const fest=currentFest();window.wyFest=fest;window.wyFestGreeting=fest?GREET[fest]:'';
 const festGroup=new T.Group();festGroup.name='wyFest';scene.add(festGroup);const fireworks=[];let fwT=1.5;const hearts=[];
 const PLAZA=[[-7.5,13],[8,13.9],[-12.1,7],[12.1,7],[-3.4,12.6]];
 const ISLE=[[1,7.7,2.1],[1,-2.1,7.7],[2,2.6,9.7],[2,-5.5,9.5],[3,2.1,7.7],[3,-7.7,2.1],[4,-2.5,4.3],[4,1.6,5.8]];
 const spots=()=>[...PLAZA.map(([x,z])=>[x,z]),...ISLE.map(([i,x,z])=>[c.xy[i][0]+x,c.xy[i][1]+z])];
 const gy=(x,z)=>{try{return c.groundY?c.groundY(x,z):0}catch(e){return 0}};
 const std=(col,o={})=>new T.MeshStandardMaterial({color:col,roughness:.5,...o});
 function lanternPost(x,z,col){const g=new T.Group();g.position.set(x,gy(x,z),z);
  const gold=std('#E2B867',{metalness:.7,roughness:.3});const pole=new T.Mesh(new T.CylinderGeometry(.08,.1,3.4,10),gold);pole.position.y=1.7;g.add(pole);
  const arm=new T.Mesh(new T.CylinderGeometry(.05,.05,1,8),gold);arm.rotation.z=Math.PI/2;arm.position.set(.45,3.35,0);g.add(arm);
  const L=new T.Group();L.position.set(.9,2.75,0);g.add(L);const body=new T.Mesh(new T.SphereGeometry(.42,20,16),std(col,{emissive:col,emissiveIntensity:.55}));body.scale.set(1,1.15,1);L.add(body);glowMats.set(body.material,.55);
  for(const yy of [.46,-.46]){const cap=new T.Mesh(new T.CylinderGeometry(.2,.24,.12,14),gold);cap.position.y=yy;L.add(cap)}
  const ts=new T.Mesh(new T.CylinderGeometry(.03,.06,.5,6),std('#F2C14E'));ts.position.y=-.75;L.add(ts);L.userData.sw=Math.random()*6;g.userData.L=L;festGroup.add(g);try{c.addSolid&&c.addSolid(x,z,.3,.3)}catch(e){}return g}
 function heartShape(){const h=new T.Shape();h.moveTo(0,-.5);h.bezierCurveTo(-.9,.05,-.55,.75,0,.38);h.bezierCurveTo(.55,.75,.9,.05,0,-.5);return h}
 function heartBalloon(x,z,col){const g=new T.Group();const y0=gy(x,z);g.position.set(x,y0,z);const geo=new T.ExtrudeGeometry(heartShape(),{depth:.28,bevelEnabled:true,bevelThickness:.12,bevelSize:.1,bevelSegments:4});geo.center();
  const m=new T.Mesh(geo,std(col,{emissive:col,emissiveIntensity:.25,roughness:.3}));m.scale.setScalar(1.25);m.position.y=4.2;g.add(m);
  const str=new T.Mesh(new T.CylinderGeometry(.015,.015,3.6,4),std('#ffffff'));str.position.y=1.9;g.add(str);g.userData.m=m;g.userData.ph=Math.random()*6;hearts.push(g);festGroup.add(g);return g}
 function table(x,z){const g=new T.Group();g.position.set(x,gy(x,z),z);const top=new T.Mesh(new T.CylinderGeometry(1.3,1.3,.14,28),std('#C9653A'));top.position.y=1;g.add(top);const cl=new T.Mesh(new T.CylinderGeometry(1.34,1.34,.1,28),std('#F7E3C8'));cl.position.y=1.08;g.add(cl);const leg=new T.Mesh(new T.CylinderGeometry(.14,.2,1,10),std('#8A3F1A'));leg.position.y=.5;g.add(leg);festGroup.add(g);try{c.addSolid&&c.addSolid(x,z,1.2,1.2)}catch(e){}return g}
 function zongzi(){const m=new T.Mesh(new T.TetrahedronGeometry(.36),std('#5E9E4A',{roughness:.7}));m.rotation.set(.6,.3,.2);const b=new T.Mesh(new T.TorusGeometry(.2,.03,6,16),std('#E8D27A'));m.add(b);return m}
 function burst(){const n=70,pos=new Float32Array(n*3),vel=[];const cx=(Math.random()-.5)*60,cy=60+Math.random()*25,cz=-20+(Math.random()-.5)*30;for(let i=0;i<n;i++){pos[i*3]=cx;pos[i*3+1]=cy;pos[i*3+2]=cz;const u=Math.random()*Math.PI*2,v=Math.acos(2*Math.random()-1),sp=11+Math.random()*5;vel.push([Math.sin(v)*Math.cos(u)*sp,Math.cos(v)*sp,Math.sin(v)*Math.sin(u)*sp])}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));const cols=['#FFD36E','#FF6B6B','#FFF3C4','#FF9A3C'];const p=new T.Points(g,new T.PointsMaterial({size:2.4,map:dot,transparent:true,depthWrite:false,blending:T.AdditiveBlending,color:cols[Math.floor(Math.random()*cols.length)],fog:false}));p.userData={vel,t:0};scene.add(p);fireworks.push(p);try{window.wySfx&&!c.inside()&&Math.random()<.5&&window.wySfx('tap')}catch(e){}}
 let snow=false;
 function buildFest(){if(!fest)return;const S=spots();
  if(fest==='cny'){S.forEach(([x,z])=>lanternPost(x,z,'#E23B2E'))}
  if(fest==='moon'){S.forEach(([x,z],i)=>lanternPost(x,z,i%2?'#F2B33D':'#F7D46A'));const t=table(-11.3,6.5);
   for(let i=0;i<4;i++){const y=new T.Mesh(new T.SphereGeometry(.34,18,14),std('#B9D46A'));y.position.set(-.6+i*.4,1.45,-.3+(i%2)*.5);t.add(y)}for(let i=0;i<3;i++){const mc=new T.Mesh(new T.CylinderGeometry(.3,.3,.16,20),std('#D9A04E'));mc.position.set(.5,1.22+i*.17,.35);t.add(mc)}}
  if(fest==='duan'){S.forEach(([x,z],i)=>lanternPost(x,z,['#E23B2E','#3FA36B','#F2C14E','#3B7DD8'][i%4]));const t=table(-11.3,6.5);for(let i=0;i<6;i++){const zz=zongzi();zz.position.set(-.6+(i%3)*.6,1.45+Math.floor(i/3)*.4,-.2+Math.floor(i/3)*.3);t.add(zz)}}
  if(fest==='val'||fest==='qixi'){S.forEach(([x,z],i)=>heartBalloon(x,z,i%2?'#F26D8E':'#E23B5E'))}
  if(fest==='xmas'){const xmasTree=(x,z,sc)=>{const g=new T.Group();g.position.set(x,gy(x,z),z);const trunk=new T.Mesh(new T.CylinderGeometry(.3,.4,1,10),std('#7A4A2A'));trunk.position.y=.5;g.add(trunk);
   [[2.2,2.2,1.6],[1.7,1.9,2.9],[1.15,1.6,4.0]].forEach(([r,h,y])=>{const cn=new T.Mesh(new T.ConeGeometry(r,h,24),std('#2F7A4A',{roughness:.7}));cn.position.y=y;g.add(cn)});
   const orn=['#E23B2E','#F2C14E','#3B7DD8','#FFFFFF'];for(let i=0;i<16;i++){const a=i*2.4,y=1.2+i*.2,r=2.0-i*.11;const b=new T.Mesh(new T.SphereGeometry(.14,10,8),std(orn[i%4],{emissive:orn[i%4],emissiveIntensity:.4,metalness:.3}));b.position.set(Math.cos(a)*r,y,Math.sin(a)*r);g.add(b);glowMats.set(b.material,.4)}
   const star=new T.Mesh(new T.OctahedronGeometry(.42),std('#FFD36E',{emissive:'#FFD36E',emissiveIntensity:.9,metalness:.5}));star.position.y=5.0;g.add(star);glowMats.set(star.material,.9);g.userData.star=star;festGroup.add(g);try{c.addSolid&&c.addSolid(x,z,1.9*sc,1.9*sc)}catch(e){}
   const gifts=[['#E23B2E',-1.6,1.4],['#3B7DD8',1.5,1.6],['#F2C14E',-.4,2.2]];for(const [col,dx,dz] of gifts){const bx=new T.Mesh(new T.BoxGeometry(.7,.6,.7),std(col));bx.position.set(dx,.3,dz);g.add(bx);const rb=new T.Mesh(new T.BoxGeometry(.72,.62,.14),std('#FFFFFF'));rb.position.copy(bx.position);g.add(rb)}
   g.scale.setScalar(sc);return g};xmasTree(-7.5,13,1);ISLE.filter((_,i)=>i%2===0).forEach(([i,x,z])=>xmasTree(c.xy[i][0]+x,c.xy[i][1]+z,.62));
   snow=true;motes.userData.snow=1;motes.material.map=dot;motes.material.size=.85;motes.material.color.set('#ffffff');motes.material.blending=T.NormalBlending;motes.material.opacity=.95;motes.material.needsUpdate=true}
 }
 setTimeout(()=>{try{buildFest()}catch(e){console.error('fest',e)}},1500);
 function festTick(dt,now){if(!fest)return;const inside=c.inside&&c.inside();festGroup.visible=!inside;
  for(const g of festGroup.children){if(g.userData.L){const L=g.userData.L;L.userData.sw+=dt*1.4;L.rotation.z=Math.sin(L.userData.sw)*.06}if(g.userData.star)g.userData.star.rotation.y+=dt*1.2}
  for(const h of hearts){h.userData.ph+=dt;h.userData.m.position.y=4.2+Math.sin(h.userData.ph*1.3)*.18;h.userData.m.rotation.y=Math.sin(h.userData.ph*.7)*.4}
  if(fest==='moon'){moon.visible=true;moon.material.opacity=Math.max(moon.material.opacity,.92);moon.scale.set(110,110,1)}
  if(fest==='cny'&&!inside&&cur!=='day'){fwT-=dt;if(fwT<=0){fwT=1.6+Math.random()*1.6;burst()}}
  for(let i=fireworks.length-1;i>=0;i--){const p=fireworks[i],u=p.userData;u.t+=dt;const a=p.geometry.attributes.position.array;for(let k=0;k<u.vel.length;k++){const v=u.vel[k];v[1]-=6*dt;v[0]*=.985;v[1]*=.985;v[2]*=.985;a[k*3]+=v[0]*dt;a[k*3+1]+=v[1]*dt;a[k*3+2]+=v[2]*dt}p.geometry.attributes.position.needsUpdate=true;p.material.opacity=Math.max(0,1-u.t/1.8);if(u.t>1.8){scene.remove(p);p.geometry.dispose();p.material.dispose();fireworks.splice(i,1)}}}

 /* ---------- v489 流暢度：依實際幀率自動調整解析度 ---------- */
 const prCap=Math.min(window.devicePixelRatio||1,2),prMin=Math.min(prCap,1.25);let prNow=renderer.getPixelRatio(),pfN=0,pfT=performance.now(),pfGood=0;
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
  if(a&&!inside){if(lastA){const sp=Math.hypot(ax-lastA[0],az-lastA[1])/Math.max(dt,.001);dustCd-=dt;if(sp>2.2&&dustCd<=0){dustCd=.14;const s=dust[di++%dust.length];s.visible=true;s.userData.t=0;s.position.set(ax+(Math.random()-.5)*.4,a.position.y+.25,az+(Math.random()-.5)*.4)}}lastA=[ax,az]}
  for(const s of dust){if(!s.visible)continue;s.userData.t+=dt;const t=s.userData.t/.55;if(t>=1){s.visible=false;continue}const k=.5+t*1.1;s.scale.set(k,k,1);s.position.y+=dt*.6;s.material.opacity=.75*(1-t)}
  /* 家具彈跳 */
  for(let i=hops.length-1;i>=0;i--){const o=hops[i],h=o.userData.wyHop,t=(now-h.t0)/380;if(t>=1){o.position.y=h.y;delete o.userData.wyHop;hops.splice(i,1);continue}o.position.y=h.y+Math.sin(t*Math.PI)*.22*(1-t*.3)}
 }
 requestAnimationFrame(tick);
 window.wySky={get mode(){return mode},set(m){mode=m;try{localStorage.setItem('wy-sky',m)}catch(e){}goTo(phaseNow(),false)},phase:()=>cur};
}
