// 德威陽｜有法度 v493 節日裝飾：春節（含元宵）、西洋情人節、端午、七夕、中秋、聖誕
// 日期每年自動判斷（台北時間）；預覽：index.html?fest=cny / val / duan / qixi / moon / xmas，可用逗號同時預覽（例如 cny,val），元宵加 &yuan=1。
// 所有裝飾都綁在島嶼、橋、廣場的位置上（xy 與島半徑），之後島嶼重排時會跟著移動。
export function setupFest(T, c, api){
 const scene=c.scene, xy=c.xy, gy=(x,z)=>{try{return c.groundY?c.groundY(x,z):0}catch(e){return 0}};
 const solid=(x,z,hx,hz)=>{try{c.addSolid&&c.addSolid(x,z,hx,hz)}catch(e){}};
 // ---------- 日期 ----------
 const TABLE={cny:{2026:'2026-02-17',2027:'2027-02-06',2028:'2028-01-26',2029:'2029-02-13',2030:'2030-02-03',2031:'2031-01-23'},duan:{2026:'2026-06-19',2027:'2027-06-09',2028:'2028-05-28'},qixi:{2026:'2026-08-19',2027:'2027-08-08',2028:'2028-08-26',2029:'2029-08-16',2030:'2030-08-05'},moon:{2026:'2026-09-25',2027:'2027-09-15',2028:'2028-10-03'}};
 const LUNAR={cny:[1,1],duan:[5,5],qixi:[7,7],moon:[8,15]};
 const WIN={cny:[-8,14],duan:[-7,0],qixi:[-7,0],moon:[-7,0]};   // 節前一週起；春節從除夕前一週到元宵；過節隔天收
 const GREET={cny:'新春快樂',val:'情人節快樂',duan:'端午節安康',qixi:'七夕快樂',moon:'中秋節快樂',xmas:'Merry Christmas'};
 const tpDate=()=>{const p=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());return new Date(p+'T12:00:00+08:00')};
 function lunarFind(key,year){try{const f=new Intl.DateTimeFormat('en-u-ca-chinese',{month:'numeric',day:'numeric',timeZone:'Asia/Taipei'});const [lm,ld]=LUNAR[key];let d=new Date(year+'-01-01T12:00:00+08:00');for(let i=0;i<400;i++){const ps=f.formatToParts(d);const m=ps.find(x=>x.type==='month').value,dd=+ps.find(x=>x.type==='day').value;if(String(+m)===m&&+m===lm&&dd===ld&&d.getFullYear()===year)return d;d=new Date(d.getTime()+864e5)}}catch(e){}return null}
 const festDay=(k,y)=>{const t=TABLE[k]&&TABLE[k][y];return t?new Date(t+'T12:00:00+08:00'):lunarFind(k,y)};
 const ACT=new Set();let yuan=false,cnyYear=0,day214=false;
 let q='',qy='';try{const u=new URLSearchParams(location.search);q=(u.get('fest')||'').toLowerCase();qy=u.get('yuan')||''}catch(e){}
 if(q){q.split(',').forEach(k=>{if(GREET[k])ACT.add(k)});yuan=qy==='1';day214=ACT.has('cny')&&ACT.has('val');cnyYear=new Date().getFullYear()}
 else{const now=tpDate(),y=now.getFullYear(),md=(now.getMonth()+1)*100+now.getDate();
  if(md>=1201&&md<=1226)ACT.add('xmas');if(md>=207&&md<=214){ACT.add('val');if(md===214)day214=true}
  for(const k of ['cny','duan','qixi','moon'])for(const yy of [y,y+1]){const d=festDay(k,yy);if(!d)continue;const diff=Math.round((now-d)/864e5);if(diff>=WIN[k][0]&&diff<=WIN[k][1]){ACT.add(k);if(k==='cny'){cnyYear=yy;yuan=diff>=9}}}}
 const LIST=[...ACT];window.wyFest=LIST.join(',');window.wyFestGreeting=LIST.map(k=>GREET[k]).join('　');
 if(!LIST.length)return null;
 const both=ACT.has('cny')&&ACT.has('val');   // 撞期：春節在廣場與橋，情人節在四座島
 // ---------- 共用 ----------
 const MC=new Map();const M=(col,o)=>{const k=col+(o?JSON.stringify(o):'');if(!MC.has(k))MC.set(k,new T.MeshStandardMaterial({color:col,roughness:.55,...(o||{})}));return MC.get(k)};
 const glowM=(col,i=.7)=>{const m=new T.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:i,roughness:.4});try{api.glow(m,i)}catch(e){}return m};
 const gold=M('#F0C75E',{metalness:.55,roughness:.3}),navy=M('#1F3460');
 const sph=(r,m,sx=1,sy=1,sz=1,seg=16)=>{const o=new T.Mesh(new T.SphereGeometry(r,seg,Math.max(8,seg*.75|0)),m);o.scale.set(sx,sy,sz);return o};
 const cyl=(rt,rb,h,m,seg=12)=>new T.Mesh(new T.CylinderGeometry(rt,rb,h,seg),m);
 const root=new T.Group();root.name='wyFest2';scene.add(root);const movers=[];const nightOnly=[];
 const add=(o,x,z,y)=>{o.position.set(x,y===undefined?gy(x,z):y,z);root.add(o);return o};
 const canvasTex=(w,h,draw)=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;draw(cv.getContext('2d'),w,h);const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t};
 const heartTex=canvasTex(128,128,(g,w,h)=>{g.fillStyle='#fff';g.beginPath();g.moveTo(64,112);g.bezierCurveTo(6,70,10,18,64,40);g.bezierCurveTo(118,18,122,70,64,112);g.fill()});
 const R=i=>i===0?21:17;
 const island=i=>({x:xy[i][0],z:xy[i][1]});
 // 島嶼入口（橋接到島的地方）與橋上取樣點
 const LINKS=()=>window.wyLinks||[];
 // 島嶼入口：這座島某一條橋接上來的地方（v494 起橋改成彎的麥穗弧線，改用 wyLinks）
 function entrance(i){const I=island(i);let best=null;for(const L of LINKS())for(const p of [L.pts[0],L.pts[L.pts.length-1]]){const d=Math.hypot(p[0]-I.x,p[2]-I.z);if(d<R(i)+4&&(!best||d<best.d))best={d,p}}
  let ux,uz;if(best){ux=best.p[0]-I.x;uz=best.p[2]-I.z}else{ux=-I.x;uz=-I.z}const L=Math.hypot(ux,uz)||1;ux/=L;uz/=L;return {x:I.x+ux*(R(i)-2.2),z:I.z+uz*(R(i)-2.2),ux,uz,px:-uz,pz:ux}}
 // 沿著每一條橋取樣（兩側欄杆外）
 function linkPts(L,n,off){const P=L.pts,out=[];const segs=P.length-1;for(let k=0;k<n;k++){const f=(n===1?.5:(k+.5)/n)*segs;const j=Math.min(segs-1,Math.floor(f)),u=f-j;const a=P[j],b=P[j+1];const x=a[0]+(b[0]-a[0])*u,z=a[2]+(b[2]-a[2])*u;const dx=b[0]-a[0],dz=b[2]-a[2],l=Math.hypot(dx,dz)||1;const px=-dz/l,pz=dx/l;const y=gy(x,z);
   for(const s of [-1,1])out.push({x:x+px*off*s,z:z+pz*off*s,y,s,ang:Math.atan2(dx,dz)})}return out}
 function bridgePts(i,n,off){const out=[];for(const L of LINKS())if(L.b===i||(i==='C'&&L.b==='C'))out.push(...linkPts(L,n,off));return out}
 const corners=i=>{const I=island(i);return [{x:I.x-11,z:I.z+7},{x:I.x+11,z:I.z+7}]};
 const PLAZA={L:{x:-8.6,z:14.6},Rt:{x:9.2,z:14.6},F:{x:0,z:20.5}};
 // 噴水池與城堡正面
 let fountain=null;try{c.groups&&c.groups()[0].traverse(o=>{if(!fountain&&o.type==='Group'&&Math.abs(o.position.x-.5)<.05&&Math.abs(o.position.z-9.8)<.05)fountain=o})}catch(e){}
 function castleFrontZ(x,y){try{const rc=new T.Raycaster(new T.Vector3(x,y,40),new T.Vector3(0,0,-1));const ms=[];c.groups()[0].traverse(o=>{if(o.isMesh&&o.visible)ms.push(o)});const h=rc.intersectObjects(ms,false).find(h=>h.point.z<8);return h?h.point.z:4.2}catch(e){return 4.2}}
 // ---------- 小物件 ----------
 function lanternPost(col,big){const g=new T.Group();const H=big?3.4:2.3;const p=cyl(.06,.08,H,gold,8);p.position.y=H/2;g.add(p);const arm=cyl(.04,.04,.7,gold,6);arm.rotation.z=Math.PI/2;arm.position.set(.33,H-.05,0);g.add(arm);
  const L=new T.Group();L.position.set(.62,H-.55,0);g.add(L);const body=sph(.36,glowM(col,.6),1,1.15,1);L.add(body);for(const yy of [.42,-.42]){const cp=cyl(.17,.2,.1,gold,12);cp.position.y=yy;L.add(cp)}
  const ts=cyl(.025,.05,.42,M('#F2C14E'),6);ts.position.y=-.68;L.add(ts);L.userData.sw=Math.random()*6;movers.push((t,dt)=>{L.rotation.z=Math.sin(t*1.4+L.userData.sw)*.07});return g}
 function bridgeLanterns(i,cols,n=5){for(const p of bridgePts(i,n,5.35)){const lp=lanternPost(cols[(p.s>0?0:1)%cols.length]);lp.rotation.y=p.ang+(p.s>0?0:Math.PI)+Math.PI/2;add(lp,p.x,p.z,p.y-.2)}}
 // ---------- 春節 ----------
 function buildCNY(){const red='#E23B2E';
  for(const i of [1,2,3,4,5,'C'])bridgeLanterns(i,[red,red],4);
  [PLAZA.L,PLAZA.Rt].forEach(p=>{add(lanternPost(red,true),p.x,p.z);solid(p.x,p.z,.25,.25)});
  if(!both)for(let i=1;i<=4;i++)corners(i).forEach(p=>{add(lanternPost(red,true),p.x,p.z);solid(p.x,p.z,.25,.25)});
  // 春聯與福字
  const z0=castleFrontZ(-2.4,3.5),z1=castleFrontZ(2.4,3.5),zc=castleFrontZ(0,6);
  const couplet=(txt)=>canvasTex(96,384,(g,w,h)=>{g.fillStyle='#D7261E';g.fillRect(0,0,w,h);g.strokeStyle='#F2C14E';g.lineWidth=6;g.strokeRect(5,5,w-10,h-10);g.fillStyle='#F7D46A';g.font='bold 52px "Noto Serif TC",serif';g.textAlign='center';g.textBaseline='middle';[...txt].forEach((ch,k)=>g.fillText(ch,w/2,30+k*(h-60)/(txt.length-1)))});
  const pl=(tex,w,h)=>new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshStandardMaterial({map:tex,roughness:.7}));
  const L=pl(couplet('德威迎春添福氣'),.62,2.5);add(L,-2.55,z0+.18,3.2);const Rg=pl(couplet('法度相伴樂安康'),.62,2.5);add(Rg,2.55,z1+.18,3.2);
  const top=pl(canvasTex(384,96,(g,w,h)=>{g.fillStyle='#D7261E';g.fillRect(0,0,w,h);g.strokeStyle='#F2C14E';g.lineWidth=6;g.strokeRect(5,5,w-10,h-10);g.fillStyle='#F7D46A';g.font='bold 54px "Noto Serif TC",serif';g.textAlign='center';g.textBaseline='middle';g.fillText('新春有法度',w/2,h/2+2)}),2.6,.65);add(top,0,Math.max(z0,z1)+.2,4.95);
  const fu=pl(canvasTex(160,160,(g,w,h)=>{g.translate(80,80);g.rotate(Math.PI/4);g.fillStyle='#D7261E';g.fillRect(-52,-52,104,104);g.strokeStyle='#F2C14E';g.lineWidth=5;g.strokeRect(-46,-46,92,92);g.rotate(-Math.PI/4);g.fillStyle='#1A1A1A';g.font='bold 70px "Noto Serif TC",serif';g.textAlign='center';g.textBaseline='middle';g.fillText('福',0,4)}),1.1,1.1);add(fu,0,zc+.22,6.1);
  // 三組舞龍舞獅繞著噴水池跑
  const cx=.5,cz=12.6,rx=7.6,rz=5.2;const posOn=a=>({x:cx+Math.cos(a)*rx,z:cz+Math.sin(a)*rz});
  const troupes=[];
  // 舞龍
  const dragon=new T.Group();root.add(dragon);const segs=[];const DN=10;
  for(let k=0;k<DN;k++){const s=new T.Group();const head=k===0;const body=head?sph(.72,M('#F0C75E',{metalness:.3,roughness:.4})):sph(.5-.012*k,M(k%2?'#E23B2E':'#F0C75E',{roughness:.45}),1,1,1.25);s.add(body);
   if(head){const snout=sph(.42,M('#E23B2E'),1,.75,1.1);snout.position.set(0,-.12,.55);s.add(snout);for(const e of [-1,1]){const w=sph(.18,M('#FFFFFF'));w.position.set(e*.3,.25,.5);s.add(w);const pu=sph(.09,M('#1A1A1A'));pu.position.set(e*.3,.25,.66);s.add(pu);const horn=new T.Mesh(new T.ConeGeometry(.1,.55,8),gold);horn.position.set(e*.32,.75,-.1);horn.rotation.z=-e*.35;s.add(horn);const wh=cyl(.02,.02,1,M('#FFFFFF'),5);wh.rotation.z=Math.PI/2+e*.3;wh.position.set(e*.6,-.2,.75);s.add(wh)}
    const ball=sph(.45,glowM('#FFB84D',.6));ball.position.set(0,.4,2.4);ball.userData.pearl=1;s.add(ball);}
   else{for(const e of [-1,1]){const fin=new T.Mesh(new T.ConeGeometry(.12,.38,4),gold);fin.position.set(0,.5,0);s.add(fin);break}}
   const pole=cyl(.04,.04,2.1,M('#8A5A36'),6);pole.position.y=-1.15;s.add(pole);dragon.add(s);segs.push(s)}
  troupes.push({ph:0,sp:.33,upd(a,t,near){segs.forEach((s,k)=>{const aa=a-k*.17;const p=posOn(aa);const nx=posOn(aa+.02);s.position.set(p.x,gy(p.x,p.z)+2.3+Math.sin(t*4-k*.8)*.45,p.z);s.rotation.y=Math.atan2(nx.x-p.x,nx.z-p.z)})}});
  // 舞獅（一紅一黃）
  const lion=(main,accent)=>{const g=new T.Group();const body=sph(.85,M(main),1,.8,1.6);body.position.y=1.05;g.add(body);for(let k=0;k<3;k++){const st=new T.Mesh(new T.TorusGeometry(.78,.06,6,24),M(accent));st.position.set(0,1.05,-.6+k*.55);st.scale.set(1,.85,1);g.add(st)}
   const head=new T.Group();head.position.set(0,1.75,1.25);g.add(head);const hd=sph(.85,M(main));head.add(hd);
   for(let k=0;k<12;k++){const a=k/12*Math.PI*2;const fur=sph(.22,M('#FFFFFF'));fur.position.set(Math.cos(a)*.85,Math.sin(a)*.85,-.05);head.add(fur)}
   for(const e of [-1,1]){const w=sph(.24,M('#FFFFFF'));w.position.set(e*.32,.25,.72);head.add(w);const pu=sph(.12,M('#1A1A1A'));pu.position.set(e*.32,.25,.93);head.add(pu);const lid=sph(.26,M(accent),1,.45,1);lid.position.set(e*.32,.46,.72);head.add(lid);const ear=sph(.18,M(accent),.7,1,.5);ear.position.set(e*.62,.72,.1);head.add(ear)}
   const mouth=sph(.32,M('#C8342B'),1.3,.5,.6);mouth.position.set(0,-.32,.72);head.add(mouth);const horn=sph(.2,gold);horn.position.set(0,.95,.3);head.add(horn);const mir=cyl(.16,.16,.05,M('#E8F4FF',{metalness:.8,roughness:.1}),16);mir.rotation.x=Math.PI/2;mir.position.set(0,.7,.78);head.add(mir);
   const tail=sph(.32,M('#FFFFFF'));tail.position.set(0,1.3,-1.4);g.add(tail);const legs=[];for(const lx of [-.5,.5])for(const lz of [-.9,.9]){const l=cyl(.16,.16,.8,M(accent),8);l.position.set(lx,.4,lz);g.add(l);legs.push(l)}
   if(day214){const hh=new T.Mesh(new T.PlaneGeometry(.9,.9),new T.MeshBasicMaterial({map:heartTex,color:'#FF4F7E',transparent:true,depthWrite:false,side:T.DoubleSide}));hh.position.set(0,1.15,0);head.add(hh)}
   g.userData={head,legs};root.add(g);return g};
  for(const [i,cols] of [[1,['#E23B2E','#F2C14E']],[2,['#F2C14E','#E23B2E']]].map(x=>x)){const L2=lion(...cols);troupes.push({ph:i*2.1,sp:.36,stopT:0,upd(a,t,near,dt){const p=posOn(a),nx=posOn(a+.02);L2.position.set(p.x,gy(p.x,p.z)+(near?0:Math.abs(Math.sin(t*6+i))*.18),p.z);L2.rotation.y=Math.atan2(nx.x-p.x,nx.z-p.z)+(near?Math.sin(t*7)*.25:0);
   L2.userData.head.rotation.y=Math.sin(t*(near?9:3)+i)*(near?.5:.25);L2.userData.head.rotation.x=Math.sin(t*5+i)*.12;L2.userData.legs.forEach((l,k)=>l.position.y=.4+Math.max(0,Math.sin(t*10+k*1.6))*(near?0:.2))}})}
  movers.push((t,dt)=>{const A=c.actor&&c.actor();for(const tr of troupes){let near=false;if(A&&tr.upd){const p=posOn(tr.ph);near=Math.hypot(A.position.x-p.x,A.position.z-p.z)<3.6}if(!near)tr.ph+=tr.sp*dt;tr.upd(tr.ph,t,near,dt)}});
  // 元宵大花燈（生肖）
  if(yuan){const Z='鼠牛虎兔龍蛇馬羊猴雞狗豬'[((cnyYear||new Date().getFullYear())-4)%12];const g=new T.Group();const fr=cyl(.12,.14,5.6,gold);fr.position.y=2.8;g.add(fr);
   const big=sph(2.1,glowM('#E23B2E',.75),1,1.1,1);big.position.y=5.4;g.add(big);for(const yy of [3.05,7.75]){const cp=cyl(.9,1.1,.35,gold,20);cp.position.y=yy;g.add(cp)}
   for(let k=0;k<8;k++){const rib=new T.Mesh(new T.TorusGeometry(2.12,.05,6,40,Math.PI),gold);rib.rotation.y=k/8*Math.PI;rib.rotation.z=Math.PI/2;rib.position.y=5.4;rib.scale.set(1.1,1,1);g.add(rib)}
   const lbl=new T.Mesh(new T.CircleGeometry(1.05,40),new T.MeshBasicMaterial({map:canvasTex(256,256,(x,w,h)=>{x.fillStyle='#FFF4D2';x.beginPath();x.arc(128,128,124,0,7);x.fill();x.strokeStyle='#C9A13B';x.lineWidth=10;x.stroke();x.fillStyle='#C8342B';x.font='bold 150px "Noto Serif TC",serif';x.textAlign='center';x.textBaseline='middle';x.fillText(Z,128,138)})}));lbl.position.set(0,5.4,2.25);g.add(lbl);
   const ts=cyl(.08,.25,1.4,M('#F2C14E'),8);ts.position.y=2.4;g.add(ts);add(g,PLAZA.F.x,PLAZA.F.z+1.2);solid(PLAZA.F.x,PLAZA.F.z+1.2,1.6,1.6)}
  // 夜晚煙火（2/14 撞期時會出現愛心煙火）
  const fws=[];let fwT=1.2;
  function burst(){const n=90,pos=new Float32Array(n*3),vel=[];const cx2=(Math.random()-.5)*70,cy2=58+Math.random()*25,cz2=-25+(Math.random()-.5)*30;const heart=day214&&Math.random()<.5;
   for(let i=0;i<n;i++){pos.set([cx2,cy2,cz2],i*3);let vx,vy,vz;if(heart){const a=i/n*Math.PI*2;vx=16*Math.pow(Math.sin(a),3)*.75;vy=(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))*.75;vz=(Math.random()-.5)*2}else{const u=Math.random()*Math.PI*2,v=Math.acos(2*Math.random()-1),sp=12+Math.random()*6;vx=Math.sin(v)*Math.cos(u)*sp;vy=Math.cos(v)*sp;vz=Math.sin(v)*Math.sin(u)*sp}vel.push([vx,vy,vz])}
   const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));const col=heart?'#FF6F9C':['#FFD36E','#FF6B6B','#FFF3C4','#FF9A3C','#9AD8FF'][Math.floor(Math.random()*5)];
   const p=new T.Points(g,new T.PointsMaterial({size:2.6,map:api.dot,transparent:true,depthWrite:false,blending:T.AdditiveBlending,color:col,fog:false}));p.userData={vel,t:0,heart};scene.add(p);fws.push(p)}
  movers.push((t,dt)=>{const inside=c.inside&&c.inside();if(!inside&&api.phase()!=='day'){fwT-=dt;if(fwT<=0){fwT=1.1+Math.random()*1.3;burst()}}
   for(let i=fws.length-1;i>=0;i--){const p=fws[i],u=p.userData;u.t+=dt;const a=p.geometry.attributes.position.array;for(let k=0;k<u.vel.length;k++){const v=u.vel[k];v[1]-=(u.heart?2.5:6)*dt;const dmp=u.heart?.97:.985;v[0]*=dmp;v[1]*=dmp;v[2]*=dmp;a[k*3]+=v[0]*dt;a[k*3+1]+=v[1]*dt;a[k*3+2]+=v[2]*dt}p.geometry.attributes.position.needsUpdate=true;p.material.opacity=Math.max(0,1-u.t/2);if(u.t>2){scene.remove(p);p.geometry.dispose();p.material.dispose();fws.splice(i,1)}}})}
 // ---------- 西洋情人節 ----------
 function heartBalloon(col,h){const g=new T.Group();const sh=new T.Shape();sh.moveTo(0,-.5);sh.bezierCurveTo(-.9,.05,-.55,.75,0,.38);sh.bezierCurveTo(.55,.75,.9,.05,0,-.5);const geo=new T.ExtrudeGeometry(sh,{depth:.26,bevelEnabled:true,bevelThickness:.12,bevelSize:.1,bevelSegments:4});geo.center();
  const m=new T.Mesh(geo,M(col,{roughness:.25,emissive:col,emissiveIntensity:.15}));m.scale.setScalar(1.15);m.position.y=h;g.add(m);const str=cyl(.012,.012,h-.3,M('#FFFFFF'),4);str.position.y=(h-.3)/2;g.add(str);const ph=Math.random()*6;movers.push(t=>{m.position.y=h+Math.sin(t*1.3+ph)*.16;m.rotation.y=Math.sin(t*.7+ph)*.45});return g}
 function bunch(x,z){const g=new T.Group();[[0,4.3,'#E23B5E'],[.45,3.7,'#F26D8E'],[-.45,3.9,'#FF9EB8']].forEach(([dx,h,col])=>{const b=heartBalloon(col,h);b.position.x=dx;b.rotation.z=dx*.12;g.add(b)});const w=sph(.18,gold);w.position.y=.18;g.add(w);add(g,x,z);return g}
 function buildVal(){
  for(let i=1;i<=4;i++){const e=entrance(i);[-1,1].forEach(s=>bunch(e.x+e.px*5.6*s,e.z+e.pz*5.6*s));corners(i).forEach(p=>bunch(p.x,p.z));const I=island(i);bunch(I.x-12.5,I.z-2);bunch(I.x+12.5,I.z-2)}
  try{api.tintMotes&&api.tintMotes('#FF9EC0')}catch(e){}
  if(both)return;   // 撞期時，廣場和城堡交給春節
  if(fountain){fountain.traverse(o=>{if(!o.isMesh)return;const p=o.geometry.parameters||{};if(o.geometry.type==='SphereGeometry'&&(p.radius||0)>=.9)o.visible=false;const col=o.material&&o.material.color&&o.material.color.getHexString();if(col==='40c6f2'){o.material=o.material.clone();o.material.color.set('#F7A8C8')}})}
  const fp=new T.Vector3(.5,0,9.8);let topY=3.4;try{const bb=new T.Box3().setFromObject(fountain);topY=bb.max.y}catch(e){}
  // 邱比特雕像
  const cup=new T.Group();const marble=M('#FBF7F2',{roughness:.35});const body=sph(.55,marble,1,1.1,.9);body.position.y=.6;cup.add(body);const head=sph(.48,marble);head.position.y=1.45;cup.add(head);
  for(let k=0;k<7;k++){const cu=sph(.16,M('#F2D27A'));const a=k/7*Math.PI*1.2+Math.PI*.4;cu.position.set(Math.cos(a)*.42,1.6+Math.sin(a)*.3,-.08);cup.add(cu)}
  for(const e of [-1,1]){for(let f=0;f<3;f++){const w=sph(.42-f*.08,M(f?'#FFF6DA':'#FFFFFF',{roughness:.35}),.28,1,.62);w.position.set(e*(.62+f*.22),1.15-f*.18,-.3);w.rotation.z=e*(.75+f*.2);cup.add(w)}const ey=sph(.06,M('#3A2A20'));ey.position.set(e*.17,1.5,.43);cup.add(ey);const ch=sph(.08,M('#FFB3C6'));ch.position.set(e*.28,1.38,.38);cup.add(ch)}
  const bow=new T.Mesh(new T.TorusGeometry(.55,.04,6,24,Math.PI),gold);bow.position.set(.55,.9,.35);bow.rotation.z=-Math.PI/2;cup.add(bow);const arrow=cyl(.025,.025,1.1,gold,5);arrow.rotation.x=Math.PI/2;arrow.position.set(.55,.9,.5);cup.add(arrow);
  cup.scale.setScalar(1.15);add(cup,fp.x,fp.z,topY-.25);movers.push(t=>{cup.rotation.y=Math.sin(t*.5)*.35;cup.position.y=topY-.25+Math.sin(t*1.6)*.06});
  // 愛心箭與愛心煙花、水池冒愛心
  const sprites=[];const hs=(col,s)=>{const sp=new T.Sprite(new T.SpriteMaterial({map:heartTex,color:col,transparent:true,depthWrite:false}));sp.scale.set(s,s,1);root.add(sp);return sp};
  let shotT=1.5;movers.push((t,dt)=>{shotT-=dt;if(shotT<=0){shotT=4;const a=hs('#FF4F7E',.9);a.position.set(fp.x+.6,topY+.9,fp.z+.4);sprites.push({s:a,v:new T.Vector3(.4,9,0),life:1.1,shot:1})}
   if(Math.random()<dt*2.2){const b=hs(['#FF9EB8','#FF6F9C','#FFFFFF'][Math.floor(Math.random()*3)],.35+Math.random()*.3);b.position.set(fp.x+(Math.random()-.5)*4,topY-1.4,fp.z+(Math.random()-.5)*4);sprites.push({s:b,v:new T.Vector3(0,1.2+Math.random(),0),life:2.4})}
   for(let i=sprites.length-1;i>=0;i--){const o=sprites[i];o.life-=dt;o.s.position.addScaledVector(o.v,dt);if(o.shot&&o.life<=0){for(let k=0;k<12;k++){const a2=k/12*Math.PI*2;const h2=hs(k%2?'#FF6F9C':'#FFB3C6',.45);h2.position.copy(o.s.position);sprites.push({s:h2,v:new T.Vector3(Math.cos(a2)*4,Math.sin(a2)*4,0),life:1.2})}}
    o.s.material.opacity=Math.min(1,o.life*1.5);if(o.life<=0){root.remove(o.s);o.s.material.dispose();sprites.splice(i,1)}}});
  // 城堡大門玫瑰花拱門
  const zd=castleFrontZ(0,3.2)+2.4;const arch=new T.Group();const vine=new T.Mesh(new T.TorusGeometry(2.6,.16,8,40,Math.PI),M('#3F8F4F'));vine.position.y=2.6;arch.add(vine);for(const e of [-1,1]){const p=cyl(.14,.16,2.6,M('#3F8F4F'),8);p.position.set(e*2.6,1.3,0);arch.add(p)}
  for(let k=0;k<26;k++){const a=k/25*Math.PI;const r=sph(.22,M(k%3===0?'#FFFFFF':k%2?'#E23B5E':'#FF8FB0'));r.position.set(Math.cos(a)*2.6,2.6+Math.sin(a)*2.6,(Math.random()-.5)*.2);arch.add(r)}
  for(let k=0;k<10;k++){for(const e of [-1,1]){const r=sph(.2,M(k%2?'#E23B5E':'#FF8FB0'));r.position.set(e*2.6+(Math.random()-.5)*.2,.3+k*.24,(Math.random()-.5)*.25);arch.add(r)}}
  add(arch,0,zd,1.47)}
 // ---------- 端午 ----------
 let boat=null,boatBoost=0,AC=null;
 function drum(){try{if(localStorage.getItem('wy-sound')==='off')return;AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime;for(const d of [0,.18]){const o=AC.createOscillator(),g=AC.createGain();o.connect(g);g.connect(AC.destination);o.type='sine';o.frequency.setValueAtTime(140,t+d);o.frequency.exponentialRampToValueAtTime(50,t+d+.25);g.gain.setValueAtTime(.6,t+d);g.gain.exponentialRampToValueAtTime(.001,t+d+.3);o.start(t+d);o.stop(t+d+.32)}}catch(e){}}
 function zongzi(){const m=new T.Mesh(new T.TetrahedronGeometry(.28),M('#5E9E4A',{roughness:.7}));m.rotation.set(.6,.3,.2);const b=new T.Mesh(new T.TorusGeometry(.16,.025,6,14),M('#E8D27A'));m.add(b);return m}
 function sachet(col){const g=new T.Group();const b=sph(.2,M(col),1,1.2,.7);g.add(b);const k=sph(.07,gold);k.position.y=.25;g.add(k);const ts=cyl(.02,.05,.3,M('#F2C14E'),6);ts.position.y=-.35;g.add(ts);return g}
 function zongziPost(){const g=new T.Group();const p=cyl(.08,.1,3,navy,10);p.position.y=1.5;g.add(p);const cap=sph(.14,gold);cap.position.y=3.05;g.add(cap);const arm=cyl(.04,.04,.8,gold,6);arm.rotation.z=Math.PI/2;arm.position.set(.38,2.85,0);g.add(arm);
  const str=new T.Group();str.position.set(.75,2.85,0);g.add(str);const line=cyl(.01,.01,1.7,M('#C9A66B'),4);line.position.y=-.85;str.add(line);for(let k=0;k<5;k++){const z=zongzi();z.position.set(0,-.3-k*.33,0);str.add(z)}const sc=sachet('#E23B5E');sc.position.y=-1.95;str.add(sc);const ph=Math.random()*6;movers.push(t=>{str.rotation.z=Math.sin(t*1.3+ph)*.06});return g}
 function mugwort(){const g=new T.Group();for(let k=0;k<7;k++){const l=new T.Mesh(new T.ConeGeometry(.09,1.9,5),M(k%2?'#4E8F3A':'#6BAA4E'));l.position.set((Math.random()-.5)*.18,1,(Math.random()-.5)*.18);l.rotation.z=(Math.random()-.5)*.25;g.add(l)}const rb=new T.Mesh(new T.TorusGeometry(.14,.04,6,14),M('#E23B2E'));rb.rotation.x=Math.PI/2;rb.position.y=.6;g.add(rb);const sc=sachet(['#F2C14E','#3FA36B','#3B7DD8'][Math.floor(Math.random()*3)]);sc.position.set(0,.35,.12);g.add(sc);return g}
 function buildDuan(){
  [PLAZA.L,PLAZA.Rt].forEach(p=>{add(zongziPost(),p.x,p.z);solid(p.x,p.z,.25,.25)});for(let i=1;i<=4;i++)corners(i).forEach(p=>{add(zongziPost(),p.x,p.z);solid(p.x,p.z,.25,.25)});
  for(let i=1;i<=4;i++){const e=entrance(i);[-1,1].forEach(s=>add(mugwort(),e.x+e.px*5.4*s,e.z+e.pz*5.4*s))}
  // 噴水池改成水池
  if(!fountain)return;const fx=.5,fz=9.8;let baseY=1.6;try{fountain.traverse(o=>{if(!o.isMesh)return;const col=o.material&&o.material.color&&o.material.color.getHexString();const p=o.geometry.parameters||{};
   if(col==='40c6f2'||o.geometry.type==='TubeGeometry'||(o.geometry.type==='SphereGeometry'&&(p.radius||0)>=.5)||(o.geometry.type==='CylinderGeometry'&&(p.radiusTop||0)<1.2&&o.position.y>1))o.visible=false});const bb=new T.Box3().setFromObject(fountain);baseY=bb.min.y+.7}catch(e){}
  const pool=new T.Group();const rim=new T.Mesh(new T.TorusGeometry(4.5,.32,10,64),M('#FFF5E4'));rim.rotation.x=Math.PI/2;rim.position.y=.32;pool.add(rim);const rim2=new T.Mesh(new T.TorusGeometry(4.5,.08,6,64),gold);rim2.rotation.x=Math.PI/2;rim2.position.y=.6;pool.add(rim2);
  const water=new T.Mesh(new T.CylinderGeometry(4.45,4.45,.3,64),M('#5FCBEA',{roughness:.12,metalness:.05}));water.position.y=.2;pool.add(water);add(pool,fx,fz,1.45);solid(fx,fz,4.6,4.6);
  for(let k=0;k<6;k++){const lp=new T.Mesh(new T.CylinderGeometry(.42,.42,.05,14),M('#6FBF5B'));const a=k/6*Math.PI*2;lp.position.set(Math.cos(a)*3.6,.37,Math.sin(a)*3.6);pool.add(lp)}
  // 龍舟
  boat=new T.Group();const hull=sph(1,M('#D7261E'),.48,.32,1.75);hull.position.y=.15;boat.add(hull);const stripe=sph(1.01,M('#F0C75E'),.49,.12,1.76);stripe.position.y=.24;boat.add(stripe);
  const dh=new T.Group();dh.position.set(0,.55,1.75);boat.add(dh);dh.add(sph(.32,M('#2F8F4E')));for(const e of [-1,1]){const ey=sph(.08,M('#FFFFFF'));ey.position.set(e*.16,.12,.24);dh.add(ey);const pu=sph(.04,M('#111'));pu.position.set(e*.16,.12,.31);dh.add(pu);const hn=new T.Mesh(new T.ConeGeometry(.05,.3,6),gold);hn.position.set(e*.14,.36,-.05);dh.add(hn)}
  const tail=new T.Mesh(new T.ConeGeometry(.16,.6,8),M('#2F8F4E'));tail.position.set(0,.55,-1.75);tail.rotation.x=-1.1;boat.add(tail);
  const rowers=[];const shirts=['#FFFFFF','#F2C14E','#FFFFFF','#F2C14E'];for(let k=0;k<4;k++){const r=new T.Group();r.position.set(0,.4,.9-k*.55);const b=sph(.14,M(shirts[k]),1,1.2,1);b.position.y=.12;r.add(b);const h=sph(.12,M('#F6D3BC'));h.position.y=.36;r.add(h);const hb=cyl(.13,.13,.05,M('#D7261E'),10);hb.position.y=.43;r.add(hb);
   const pad=cyl(.02,.02,.7,M('#8A5A36'),5);pad.position.set(k%2?.3:-.3,0,0);pad.rotation.z=k%2?-.6:.6;r.add(pad);r.userData.pad=pad;boat.add(r);rowers.push(r)}
  const drm=cyl(.17,.17,.22,M('#C8342B'),12);drm.position.set(0,.5,-1.25);boat.add(drm);const dr=sph(.12,M('#F6D3BC'));dr.position.set(0,.78,-1.45);boat.add(dr);
  boat.scale.setScalar(.95);root.add(boat);let ang=0;
  movers.push((t,dt)=>{boatBoost=Math.max(0,boatBoost-dt);const sp=boatBoost>0?1.15:.42;ang+=sp*dt;const rr=2.75;boat.position.set(fx+Math.cos(ang)*rr,1.45+.36+Math.sin(t*3)*.04,fz+Math.sin(ang)*rr);boat.rotation.y=-ang;boat.rotation.z=Math.sin(t*2.5)*.04;
   const f=boatBoost>0?14:7;rowers.forEach((r,k)=>{r.userData.pad.rotation.x=Math.sin(t*f+k*.4)*.7})});
  try{const el=c.renderer&&c.renderer.domElement;if(el){const rc=new T.Raycaster(),v=new T.Vector2();el.addEventListener('pointerdown',e=>{if(!boat||(c.inside&&c.inside()))return;const r=el.getBoundingClientRect();v.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);rc.setFromCamera(v,c.camera);if(rc.intersectObject(boat,true).length){boatBoost=2.4;drum()}})}}catch(e){}}
 // ---------- 七夕 ----------
 function magpie(){const g=new T.Group();const body=sph(.3,M('#1E2433'),1,.85,1.3);g.add(body);const belly=sph(.24,M('#FFFFFF'),1,.8,1.1);belly.position.set(0,-.06,.05);g.add(belly);const head=sph(.2,M('#1E2433'));head.position.set(0,.18,.32);g.add(head);
  const bk=new T.Mesh(new T.ConeGeometry(.05,.18,6),M('#333'));bk.rotation.x=Math.PI/2;bk.position.set(0,.16,.55);g.add(bk);for(const e of [-1,1]){const ey=sph(.035,M('#FFFFFF'));ey.position.set(e*.09,.24,.47);g.add(ey)}
  const wl=sph(.22,M('#3B6FB8'),.5,.25,1),wr=wl.clone();wl.position.set(-.27,.04,-.02);wr.position.set(.27,.04,-.02);g.add(wl,wr);const tail=sph(.12,M('#1E2433'),.6,.25,2.2);tail.position.set(0,.06,-.55);g.add(tail);g.userData={wl,wr};return g}
 async function buildQixi(){
  const pc=['#8E7CE0','#5DA8F0'];for(const i of [1,2,3,4,5])bridgeLanterns(i,pc,3);[PLAZA.L,PLAZA.Rt].forEach(p=>{add(lanternPost('#8E7CE0',true),p.x,p.z);solid(p.x,p.z,.25,.25)});
  // 鵲橋：通往後方第五座島的那座橋
  const CL=LINKS().find(L=>L.b==='C');const cen=window.wyCenterXZ||{x:0,z:-56,r:15};const I={x:cen.x,z:cen.z},Lq=Math.hypot(I.x,I.z),ux=I.x/Lq,uz=I.z/Lq,px=-uz,pz=ux;const P0=CL?CL.pts[0]:[0,0,-21],P1=CL?CL.pts[CL.pts.length-1]:[0,0,-42];const N=12;
  for(let k=0;k<N;k++){const t=k/(N-1);const cx=P0[0]+(P1[0]-P0[0])*t,cz=P0[2]+(P1[2]-P0[2])*t,y=gy(cx,cz);for(const s of [-1,1]){const m=magpie();m.scale.setScalar(1.3);m.position.set(cx+px*4.82*s,y+1.72,cz+pz*4.82*s);m.rotation.y=Math.atan2(ux,uz)+s*Math.PI/2*0.2+(s>0?Math.PI/2:-Math.PI/2);root.add(m);const ph=Math.random()*6;movers.push(t2=>{m.rotation.x=Math.sin(t2*3+ph)>.92?-.35:0})}}
  for(let k=0;k<12;k++){const m=magpie();m.scale.setScalar(1.5);root.add(m);const ph=k/12*Math.PI*2,rr=6+k%3*2,h=10+k%4*1.6;const mid={x:(P0[0]+P1[0])/2,z:(P0[2]+P1[2])/2};movers.push(t2=>{const a=ph+t2*.5;m.position.set(mid.x+Math.cos(a)*rr+ux*Math.sin(a*.7)*8,h+Math.sin(t2*2+k)*.5,mid.z+Math.sin(a)*rr+uz*Math.sin(a*.7)*8);m.rotation.y=-a;const f=Math.sin(t2*10+k)*.7;m.userData.wl.rotation.z=f;m.userData.wr.rotation.z=-f})}
  // 銀河
  const n=2600,pos=new Float32Array(n*3),col=new Float32Array(n*3);const cA=new T.Color('#FFFFFF'),cB=new T.Color('#9FB8FF'),cC=new T.Color('#D6A8FF');
  for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,w=(Math.random()+Math.random()+Math.random()-1.5)*28;const r=420;let x=Math.cos(a)*r,y=Math.sin(a)*r*.55+150,z=-120+Math.sin(a)*60;y+=w;x+=w*.3;pos.set([x,Math.max(40,y),z],i*3);const cc=[cA,cB,cC][i%3];col.set([cc.r,cc.g,cc.b],i*3)}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));g.setAttribute('color',new T.BufferAttribute(col,3));const mw=new T.Points(g,new T.PointsMaterial({size:2.2,map:api.dot,vertexColors:true,transparent:true,depthWrite:false,blending:T.AdditiveBlending,fog:false,opacity:.0}));scene.add(mw);
  movers.push(()=>{const ph=api.phase();mw.material.opacity=ph==='night'?.95:ph==='dusk'?.45:.0;mw.visible=mw.material.opacity>0});
  // 牛郎、織女（用網站的 Q 版人物系統）
  try{const mod=await import('./chibi-avatar.js?v=477');const A=c.actor&&c.actor();let H=1.6;try{const bb=new T.Box3().setFromObject(A);H=bb.max.y-bb.min.y}catch(e){}
   const mk=(prof,x,z,ry)=>{const ch=mod.buildChibi(T,prof);const bb=new T.Box3().setFromObject(ch.group);const h=bb.max.y-bb.min.y||1;ch.group.scale.multiplyScalar(H/h);const g=new T.Group();g.add(ch.group);g.rotation.y=ry;add(g,x,z);movers.push(t=>{try{ch.tick&&ch.tick(t*1000)}catch(e){}});solid(x,z,.4,.4);return ch};
   const e0={x:P0[0]-ux*2.4,z:P0[2]-uz*2.4},e5={x:P1[0]+ux*2.4,z:P1[2]+uz*2.4};
   const robes=Object.keys(mod.CHIBI_ROBES||{});const of1=robes[0]||'casual',of2=robes[1]||robes[0]||'dress';
   const cowherd=mk({gender:'male',skin:'fair',hair:'short',hairColor:'black',outfit:of1,accessory:'none'},e0.x+px*2.2,e0.z+pz*2.2,Math.atan2(ux,uz));
   const weaver=mk({gender:'female',skin:'light',hair:'buns',hairColor:'black',outfit:of2,accessory:'none'},e5.x-px*2.2,e5.z-pz*2.2,Math.atan2(-ux,-uz));
   let wt=2;movers.push((t,dt)=>{wt-=dt;if(wt<=0){wt=5;try{cowherd.wave();setTimeout(()=>weaver.wave(),700)}catch(e){}}})}catch(e){console.error('qixi chibi',e)}}
 // ---------- 中秋 ----------
 function giftTower(){const g=new T.Group();let logo=null;try{logo=new T.TextureLoader().load('office-logo-transparent.png');logo.colorSpace=T.SRGBColorSpace}catch(e){}
  const box=(w,y,x,z)=>{const b=new T.Mesh(new T.BoxGeometry(w,w*.62,w),[navy,navy,M('#24407A'),navy,navy,navy]);b.position.set(x,y,z);g.add(b);const rb1=new T.Mesh(new T.BoxGeometry(w*1.01,w*.63,w*.14),gold);rb1.position.copy(b.position);g.add(rb1);const rb2=new T.Mesh(new T.BoxGeometry(w*.14,w*.63,w*1.01),gold);rb2.position.copy(b.position);g.add(rb2);
   if(logo){const lg=new T.Mesh(new T.CircleGeometry(w*.22,24),new T.MeshBasicMaterial({map:logo,transparent:true}));lg.position.set(x-w*.27,y,z+w*.51);g.add(lg);const bg=new T.Mesh(new T.CircleGeometry(w*.25,24),M('#FFF8EC'));bg.position.set(x-w*.27,y,z+w*.505);g.add(bg)}};
  const s=1.15;[[-1.25,0],[0,0],[1.25,0]].forEach(([x,z])=>box(s,s*.31,x,z));[[-.62,0],[.62,0]].forEach(([x,z])=>box(s,s*.93,x,z));box(s,s*1.55,0,0);
  const bow=new T.Group();bow.position.y=s*1.95;g.add(bow);for(const e of [-1,1]){const l=new T.Mesh(new T.TorusGeometry(.22,.07,8,16),gold);l.position.x=e*.2;l.rotation.y=Math.PI/2;bow.add(l)}bow.add(sph(.1,gold));return g}
 function mooncake(){const g=new T.Group();const b=cyl(.32,.32,.16,M('#D9A04E'),20);g.add(b);const t=new T.Mesh(new T.TorusGeometry(.2,.03,6,16),M('#B97F35'));t.rotation.x=Math.PI/2;t.position.y=.09;g.add(t);return g}
 function teaSet(){const g=new T.Group();const top=cyl(1.25,1.25,.14,M('#B5703E'),28);top.position.y=.62;g.add(top);const leg=cyl(.18,.25,.6,M('#8A4F28'),10);leg.position.y=.3;g.add(leg);
  for(let k=0;k<3;k++){const a=k/3*Math.PI*2+.5;const cu=cyl(.55,.55,.16,M(['#E9C46A','#F2A7B8','#9FD2E8'][k]),18);cu.position.set(Math.cos(a)*1.9,.08,Math.sin(a)*1.9);g.add(cu)}
  const pot=sph(.26,M('#FFFFFF'));pot.position.set(-.35,.9,0);g.add(pot);const sp=cyl(.03,.05,.3,M('#FFFFFF'),6);sp.rotation.z=-1;sp.position.set(-.08,.95,0);g.add(sp);const lid=sph(.07,navy);lid.position.set(-.35,1.17,0);g.add(lid);
  for(const [x,z] of [[.15,.35],[.15,-.35]]){const cp=cyl(.09,.07,.12,M('#FFFFFF'),10);cp.position.set(x,.75,z);g.add(cp)}
  const plate=cyl(.45,.4,.05,M('#FFFFFF'),20);plate.position.set(.55,.72,0);g.add(plate);for(let k=0;k<3;k++){const m=mooncake();m.position.set(.45+(k%2)*.2,.83+(k>1?.16:0),-.12+k*.12);g.add(m)}
  for(const [x,z] of [[-.75,.55],[-.95,.2]]){const p=sph(.24,M('#C7D96A'));p.position.set(x,.92,z);g.add(p)}return g}
 function bunny(){const g=new T.Group();const w=M('#FFFFFF',{roughness:.7});const b=sph(.5,w,1,1.05,.95);b.position.y=.55;g.add(b);const h=sph(.42,w);h.position.y=1.32;g.add(h);
  for(const e of [-1,1]){const ear=sph(.13,w,1,3.2,.7);ear.position.set(e*.17,1.95,-.02);ear.rotation.z=-e*.12;g.add(ear);const inn=sph(.08,M('#FFB7C9'),1,3,.5);inn.position.set(e*.17,1.95,.06);inn.rotation.z=-e*.12;g.add(inn);const ey=sph(.06,M('#2A1A1A'));ey.position.set(e*.15,1.38,.37);g.add(ey);const ck=sph(.07,M('#FFC4D2'));ck.position.set(e*.25,1.25,.33);g.add(ck)}
  const nose=sph(.04,M('#FF8FA3'));nose.position.set(0,1.28,.42);g.add(nose);
  const sc=new T.Group();sc.position.set(0,.85,.55);g.add(sc);const pole=cyl(.03,.03,.7,gold,6);pole.position.y=.2;sc.add(pole);const beam=cyl(.025,.025,.8,gold,6);beam.rotation.z=Math.PI/2;beam.position.y=.55;sc.add(beam);
  for(const e of [-1,1]){const pan=cyl(.16,.12,.04,gold,14);pan.position.set(e*.4,.3,0);sc.add(pan);const s1=cyl(.006,.006,.25,gold,3);s1.position.set(e*.4,.42,0);sc.add(s1)}
  for(const e of [-1,1]){const paw=sph(.11,w);paw.position.set(e*.2,.85,.5);g.add(paw)}const ft=sph(.18,w,1.2,.6,1.4);ft.position.set(0,.12,.25);g.add(ft);g.userData.sc=sc;return g}
 function buildMoon(){try{api.moon.visible=true;api.moon.material.opacity=Math.max(api.moon.material.opacity,.95);api.moon.scale.set(115,115,1)}catch(e){}
  movers.push(()=>{try{api.moon.visible=true;api.moon.material.opacity=Math.max(api.moon.material.opacity,.92);api.moon.scale.set(115,115,1)}catch(e){}});
  for(const i of [1,2,3,4,5,'C'])bridgeLanterns(i,['#F7C548','#F2A93D'],4);
  const gt=giftTower();add(gt,PLAZA.L.x,PLAZA.L.z);solid(PLAZA.L.x,PLAZA.L.z,1.9,.8);const bn=bunny();bn.rotation.y=-.4;add(bn,PLAZA.Rt.x,PLAZA.Rt.z);solid(PLAZA.Rt.x,PLAZA.Rt.z,.6,.6);
  for(let i=1;i<=4;i++){const [cl,cr]=corners(i);const b=bunny();b.scale.setScalar(1.2);add(b,cl.x,cl.z);solid(cl.x,cl.z,.6,.6);const ts=teaSet();add(ts,cr.x,cr.z);solid(cr.x,cr.z,1.4,1.4);const ph=i;movers.push(t=>{b.userData.sc.rotation.z=Math.sin(t*1.5+ph)*.12})}
  // 成員戴柚子帽
  const hat=()=>{const g=new T.Group();const peel=new T.Mesh(new T.SphereGeometry(.46,20,12,0,Math.PI*2,0,Math.PI/2),M('#D3E06A',{roughness:.7}));g.add(peel);const rimH=new T.Mesh(new T.TorusGeometry(.45,.06,8,24),M('#B8C955'));rimH.rotation.x=Math.PI/2;g.add(rimH);const st=cyl(.03,.04,.16,M('#6B8F3A'),6);st.position.y=.5;g.add(st);const lf=sph(.12,M('#4F9A3E'),1.6,.25,.8);lf.position.set(.14,.55,0);lf.rotation.z=-.3;g.add(lf);return g};
  const putHats=()=>{try{const S=c.staff?c.staff():[];S.forEach(n=>{if(!n||!n.root||n.root.userData.wyHat)return;const bb=new T.Box3().setFromObject(n.root);if(!isFinite(bb.max.y))return;const top=new T.Vector3((bb.min.x+bb.max.x)/2,bb.max.y-.2,(bb.min.z+bb.max.z)/2);const h=hat();const H=bb.max.y-bb.min.y;h.scale.setScalar(H*.36);n.root.worldToLocal(top);const s=n.root.scale.x||1;h.position.copy(top);h.scale.multiplyScalar(1/s);n.root.add(h);n.root.userData.wyHat=h})}catch(e){}};
  setTimeout(putHats,800);setTimeout(putHats,4000)}
 // ---------- 聖誕 ----------
 function xmasTree(s){const g=new T.Group();const tr=cyl(.3,.4,1,M('#7A4A2A'),10);tr.position.y=.5;g.add(tr);[[2.2,2.2,1.6],[1.7,1.9,2.9],[1.15,1.6,4.0]].forEach(([r,h,y])=>{const cn=new T.Mesh(new T.ConeGeometry(r,h,24),M('#2F7A4A',{roughness:.7}));cn.position.y=y;g.add(cn)});
  const orn=['#E23B2E','#F2C14E','#3B7DD8','#FFFFFF'];for(let i=0;i<16;i++){const a=i*2.4,y=1.2+i*.2,r=2.0-i*.11;const b=sph(.14,glowM(orn[i%4],.35));b.position.set(Math.cos(a)*r,y,Math.sin(a)*r);g.add(b)}
  const star=new T.Mesh(new T.OctahedronGeometry(.42),glowM('#FFD36E',.9));star.position.y=5.0;g.add(star);movers.push((t,dt)=>{star.rotation.y+=dt*1.2});
  [['#E23B2E',-1.6,1.4],['#3B7DD8',1.5,1.6],['#F2C14E',-.4,2.2]].forEach(([col,dx,dz])=>{const bx=new T.Mesh(new T.BoxGeometry(.7,.6,.7),M(col));bx.position.set(dx,.3,dz);g.add(bx);const rb=new T.Mesh(new T.BoxGeometry(.72,.62,.14),M('#FFFFFF'));rb.position.copy(bx.position);g.add(rb)});g.scale.setScalar(s);return g}
 function snowman(){const g=new T.Group();const w=M('#FFFFFF',{roughness:.8});const b1=sph(.8,w);b1.position.y=.75;g.add(b1);const b2=sph(.58,w);b2.position.y=1.85;g.add(b2);const hd=sph(.42,w);hd.position.y=2.65;g.add(hd);
  for(const e of [-1,1]){const ey=sph(.05,M('#1A1A1A'));ey.position.set(e*.14,2.72,.38);g.add(ey);const arm=cyl(.035,.035,1,M('#7A4A2A'),5);arm.position.set(e*.75,1.95,0);arm.rotation.z=e*1.0;g.add(arm)}
  const nose=new T.Mesh(new T.ConeGeometry(.07,.36,8),M('#F28C28'));nose.rotation.x=Math.PI/2;nose.position.set(0,2.62,.55);g.add(nose);for(let k=0;k<3;k++){const bt=sph(.06,M('#1A1A1A'));bt.position.set(0,1.7+k*.22,.56);g.add(bt)}
  const hat=cyl(.4,.42,.12,M('#C8342B'),16);hat.position.y=2.98;g.add(hat);const hc=new T.Mesh(new T.ConeGeometry(.36,.7,16),M('#C8342B'));hc.position.y=3.36;hc.rotation.z=-.25;g.add(hc);const pom=sph(.12,w);pom.position.set(.17,3.66,0);g.add(pom);
  const scarf=new T.Mesh(new T.TorusGeometry(.46,.11,8,20),M('#1F3460'));scarf.rotation.x=Math.PI/2;scarf.position.y=2.3;g.add(scarf);const tail=new T.Mesh(new T.BoxGeometry(.2,.6,.08),M('#1F3460'));tail.position.set(.3,1.98,.4);g.add(tail);return g}
 function wreath(r=.7){const g=new T.Group();const rg=new T.Mesh(new T.TorusGeometry(r,r*.28,10,28),M('#2F7A4A',{roughness:.8}));g.add(rg);for(let k=0;k<10;k++){const a=k/10*Math.PI*2;const b=sph(r*.11,M(k%2?'#E23B2E':'#F2C14E'));b.position.set(Math.cos(a)*r,Math.sin(a)*r,r*.22);g.add(b)}
  const bow=new T.Group();bow.position.set(0,-r,r*.25);for(const e of [-1,1]){const l=sph(r*.2,M('#C8342B'),1.3,.8,.5);l.position.x=e*r*.22;bow.add(l)}g.add(bow);return g}
 function candyCane(){const g=new T.Group();const H=1.9;for(let k=0;k<8;k++){const s=cyl(.09,.09,H/8,M(k%2?'#FFFFFF':'#E23B2E'),10);s.position.y=k*H/8+H/16;g.add(s)}const hook=new T.Mesh(new T.TorusGeometry(.28,.09,8,16,Math.PI),M('#E23B2E'));hook.position.set(.28,H,0);g.add(hook);return g}
 function buildXmas(){try{api.setSnow&&api.setSnow()}catch(e){}
  const tp=[{x:-16.5,z:6}];add(xmasTree(1),tp[0].x,tp[0].z);solid(tp[0].x,tp[0].z,1.9,1.9);const sm0=snowman();sm0.rotation.y=-.35;add(sm0,PLAZA.Rt.x+.6,PLAZA.Rt.z+.6);solid(PLAZA.Rt.x+.6,PLAZA.Rt.z+.6,.7,.7);
  for(let i=1;i<=4;i++){const [cl,cr]=corners(i);add(xmasTree(.72),cl.x,cl.z);solid(cl.x,cl.z,1.4,1.4);const sm=snowman();sm.rotation.y=-.3;add(sm,cr.x,cr.z);solid(cr.x,cr.z,.7,.7);
   const e=entrance(i);[-1,1].forEach(s=>{const px=e.x+e.px*5.4*s,pz=e.z+e.pz*5.4*s;const post=new T.Group();const p=cyl(.1,.12,2.6,navy,10);p.position.y=1.3;post.add(p);const cap=sph(.16,gold);cap.position.y=2.68;post.add(cap);const w=wreath(.42);w.position.set(0,2.05,.14);post.add(w);post.rotation.y=Math.atan2(e.ux,e.uz);add(post,px,pz);solid(px,pz,.25,.25)})}
  for(const i of [1,2,3,4,5,'C'])for(const p of bridgePts(i,3,5.35)){const cc=candyCane();cc.rotation.y=p.ang+(p.s>0?Math.PI/2:-Math.PI/2);add(cc,p.x,p.z,p.y-.2)}
  // 城堡大門花圈與外牆燈串
  const zc=castleFrontZ(0,5.5);const wr=wreath(.75);add(wr,0,zc+.25,5.55);
  const bulbs=[];const cols=['#FF5A5A','#FFD36E','#7FD0F2','#B8E986','#FFFFFF'];for(const yy of [7.2,10.2]){for(let k=0;k<=30;k++){const t=k/30;const x=-8+t*16;const z=castleFrontZ(x,yy)+.3;const y=yy-Math.sin(t*Math.PI)*.8;const b=sph(.13,glowM(cols[k%5],.9),1,1,1,8);add(b,x,z,y);bulbs.push(b)}}
  movers.push(t=>{const ph=Math.floor(t*2)%2;bulbs.forEach((b,k)=>{b.material.emissiveIntensity=((k+ph)%2)?1.2:.35})});
  // 地面慢慢積雪
  const frost=[];const fm=new T.MeshBasicMaterial({color:'#FFFFFF',transparent:true,opacity:0,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2});
  for(let i=0;i<=4;i++){const I=island(i);const geo=i===0?new T.RingGeometry(13,22.4,64):new T.RingGeometry(9.5,16.6,48);const f=new T.Mesh(geo,fm);f.rotation.x=-Math.PI/2;if(i===0)add(f,0,3.5,1.66);else add(f,I.x,I.z,(i<=2?.85:0)+.06);frost.push(f)}
  let acc=0;movers.push((t,dt)=>{acc=Math.min(.42,acc+dt*.006);fm.opacity=acc});
  // 夜晚麋鹿雪橇
  const sl=new T.Group();const sled=new T.Mesh(new T.BoxGeometry(1.6,.8,2.4),M('#C8342B'));sled.position.y=.6;sl.add(sled);for(const e of [-1,1]){const rn=new T.Mesh(new T.TorusGeometry(1.2,.06,6,20,Math.PI*.8),gold);rn.position.set(e*.7,.1,0);rn.rotation.y=Math.PI/2;sl.add(rn)}
  const sack=sph(.6,M('#8A5A36'));sack.position.set(0,1.3,-.5);sl.add(sack);
  for(let k=0;k<2;k++){const d=new T.Group();d.position.set(0,.7,3+k*2.1);const db=sph(.45,M('#9A6A43'),.8,.75,1.4);d.add(db);const dh=sph(.3,M('#9A6A43'));dh.position.set(0,.45,.6);d.add(dh);
   for(const e of [-1,1]){const an=cyl(.03,.03,.5,M('#5A3A22'),5);an.position.set(e*.15,.85,.5);an.rotation.z=e*.5;d.add(an);for(let l=0;l<2;l++){const lg=cyl(.06,.06,.6,M('#7A4A2A'),6);lg.position.set(e*.2,-.35,l?.4:-.4);d.add(lg)}}
   if(k===1){const ns=sph(.11,glowM('#FF3B3B',1.2));ns.position.set(0,.42,.9);d.add(ns)}sl.add(d)}
  const trailN=40,tp2=new Float32Array(trailN*3);const tg=new T.BufferGeometry();tg.setAttribute('position',new T.BufferAttribute(tp2,3));const trail=new T.Points(tg,new T.PointsMaterial({size:1.6,map:api.dot,color:'#FFE7A8',transparent:true,depthWrite:false,blending:T.AdditiveBlending,fog:false}));scene.add(trail);
  root.add(sl);let ti=0;movers.push((t,dt)=>{const ph=api.phase();const on=ph!=='day'&&!(c.inside&&c.inside());sl.visible=on;trail.visible=on;if(!on)return;const a=t*.16;sl.position.set(Math.cos(a)*85,52+Math.sin(t*.8)*3,Math.sin(a)*60-20);sl.rotation.y=-a+Math.PI;
   tp2.set([sl.position.x,sl.position.y+.4,sl.position.z],(ti%trailN)*3);ti++;tg.attributes.position.needsUpdate=true})}
 // ---------- 組合 ----------
 const builders={cny:buildCNY,val:buildVal,duan:buildDuan,qixi:buildQixi,moon:buildMoon,xmas:buildXmas};
 setTimeout(()=>{for(const k of LIST){try{const r=builders[k]();if(r&&r.catch)r.catch(e=>console.error('fest '+k,e))}catch(e){console.error('fest '+k,e)}}},1500);
 let tt=0;return function tick(dt){tt+=dt;const inside=c.inside&&c.inside();root.visible=!inside;if(inside)return;for(const f of movers){try{f(tt,dt)}catch(e){}}};
}
