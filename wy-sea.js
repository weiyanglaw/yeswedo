// 德威陽｜有法度 v494 沖繩海上熱鬧版：翡翠漸層海、白沙灘、椰子樹、扶桑花、城堡島重做（草地＋廣場＋橋頭）、
// 中間的骨牌花田 Logo、可愛的船／海鷗／遊客／攤位、遠方小島。
export function setupSea(T, c){
 const scene=c.scene, xy=c.xy, G=c.groups(), CEN=c.center, SEA=-1.25;
 const MC=new Map();const M=(col,o)=>{const k=col+(o?JSON.stringify(o):'');if(!MC.has(k))MC.set(k,new T.MeshStandardMaterial({color:col,roughness:.62,...(o||{})}));return MC.get(k)};
 const gold=M('#F0C75E',{metalness:.5,roughness:.3}),navy=M('#1F3460',{roughness:.5}),white=M('#FFFFFF');
 const sph=(r,m,sx=1,sy=1,sz=1,seg=16)=>{const o=new T.Mesh(new T.SphereGeometry(r,seg,Math.max(8,seg*.75|0)),typeof m==='string'?M(m):m);o.scale.set(sx,sy,sz);return o};
 const cyl=(rt,rb,h,m,seg=12)=>new T.Mesh(new T.CylinderGeometry(rt,rb,h,seg),typeof m==='string'?M(m):m);
 const root=new T.Group();root.name='wySea';scene.add(root);const movers=[];
 function hibiscus(){const h=new T.Group();const bush=sph(1.15,'#3F9D55',1.2,.7,1.2,12);h.add(bush);const C=['#E8263F','#FF5E8A','#FF9A3C'];for(let f=0;f<4;f++){const fl=new T.Group();const col=C[f%3];for(let p=0;p<5;p++){const pt=sph(.42,col,1,.22,.62,10);const a=p/5*Math.PI*2;pt.position.set(Math.cos(a)*.42,0,Math.sin(a)*.42);pt.rotation.y=-a;pt.rotation.z=.25;fl.add(pt)}const cen=sph(.12,'#FFF2B0',1,1,1,8);fl.add(cen);const sta=cyl(.03,.03,.6,'#F7D046',5);sta.rotation.z=.6;sta.position.set(.18,.22,0);fl.add(sta);const ang=f/4*Math.PI*2;fl.position.set(Math.cos(ang)*.85,.62,Math.sin(ang)*.85);fl.rotation.set(-.5*Math.sin(ang),0,.5*Math.cos(ang));h.add(fl)}h.scale.setScalar(1.25);return h}
 const CC={x:0,z:3.5,r:23.6};window.wyCenterXZ={x:CEN.x,z:CEN.z,r:CEN.r};   // 新的城堡島
 const isles=[{x:CC.x,z:CC.z,r:CC.r},...xy.slice(1).map(([x,z])=>({x,z,r:17.2})),{x:CEN.x,z:CEN.z,r:CEN.r}];
 // ---------- 1) 拿掉浮空底座，島的側邊改成沙岸 ----------
 G.forEach((g,i)=>g.traverse(o=>{if(!o.isMesh)return;const p=o.geometry.parameters||{},t=o.geometry.type;
  if(t==='ConeGeometry'&&p.height===19)o.visible=false;
  if(t==='CylinderGeometry'&&p.height===6&&(p.radiusTop===17||p.radiusTop===21)){if(i===0)o.visible=false;else{o.material=M('#F3E6C8');}}
  if(i>0&&o.parent===g&&t==='SphereGeometry'&&Math.abs((p.radius||0)-.45)<.01){o.material=M(['#FFB3CB','#FFFFFF','#FFF1D6','#F6D27A'][Math.floor(Math.random()*4)])}}));
 // 四座主題島：島面外圈改成草地，側面砂岩加金色腰線（跟城堡島同一套）
 {const g5=new T.Mesh(new T.CircleGeometry(17.25,72),M('#9FDB82'));g5.rotation.x=-Math.PI/2;g5.position.set(xy[5][0],.04,xy[5][1]);root.add(g5);const b5=new T.Mesh(new T.TorusGeometry(17.05,.15,6,96),gold);b5.rotation.x=Math.PI/2;b5.position.set(xy[5][0],-.9,xy[5][1]);root.add(b5)}
 for(let i=1;i<=4;i++){const g=G[i];let topY=.12;try{const rc=new T.Raycaster(new T.Vector3(xy[i][0]+16.4,40,xy[i][1]),new T.Vector3(0,-1,0));const ms=[];g.traverse(o=>{if(o.isMesh&&o.visible)ms.push(o)});const h=rc.intersectObjects(ms,false)[0];if(h)topY=h.point.y}catch(e){}
  const ringG=new T.Mesh(new T.RingGeometry(14,17.25,72),M('#9FDB82',{side:T.DoubleSide}));ringG.rotation.x=-Math.PI/2;ringG.position.set(xy[i][0],topY+.03,xy[i][1]);root.add(ringG);
  const bd=new T.Mesh(new T.TorusGeometry(17.05,.15,6,96),gold);bd.rotation.x=Math.PI/2;bd.position.set(xy[i][0],-.9,xy[i][1]);root.add(bd)}
 // ---------- 2) 城堡島重做 ----------
 const hideC=[];G[0].traverse(o=>{if(!o.isMesh)return;const p=o.geometry.parameters||{},t=o.geometry.type;
  if(t==='CylinderGeometry'&&(p.radiusTop===11.4||(p.radiusTop===1&&p.height===.18)||p.radiusTop===5.1))hideC.push(o);
  if(t==='TorusGeometry'&&(Math.abs(p.radius-20.8)<.01||Math.abs(p.radius-11.9)<.01))hideC.push(o);
  if(o.parent===G[0]&&(t==='SphereGeometry'||(t==='CylinderGeometry'&&p.radiusTop<.2))&&o.position.length()>18)hideC.push(o)});
 hideC.forEach(o=>o.visible=false);
 G[0].traverse(o=>{if(o.type==='Group'&&o.children.some(k=>k.geometry&&k.geometry.type==='PlaneGeometry'&&k.material&&k.material.map)&&Math.abs(o.position.y-1.56)<.05)o.visible=false});
 const blob=(r,n,amp,seed)=>{const pts=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2;const k=r+Math.sin(a*3+seed)*amp+Math.sin(a*7+seed*2)*amp*.5;pts.push(new T.Vector2(Math.cos(a)*k,Math.sin(a)*k))}return new T.Shape(pts)};
 const ext=(shape,depth,mat,y,x,z)=>{const geo=new T.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelThickness:.4,bevelSize:.5,bevelSegments:3,curveSegments:20});geo.rotateX(Math.PI/2);const m=new T.Mesh(geo,mat);m.position.set(x,y,z);root.add(m);return m};
 ext(blob(CC.r,96,.8,1),.6,M('#9FDB82'),1.05,CC.x,CC.z);
 ext(blob(CC.r-.3,96,.75,1),2.2,M('#F3E6C8'),.35,CC.x,CC.z);
 const band=new T.Mesh(new T.TorusGeometry(CC.r+.1,.16,6,120),gold);band.rotation.x=Math.PI/2;band.position.set(CC.x,.25,CC.z);root.add(band);
 const plaza=cyl(12.6,12.6,.12,'#F6EBD6',64);plaza.position.set(0,1.53,9);root.add(plaza);
 const pe=new T.Mesh(new T.TorusGeometry(12.6,.16,8,96),gold);pe.rotation.x=Math.PI/2;pe.position.set(0,1.6,9);root.add(pe);
 for(let i=0;i<6;i++){const st=cyl(1.15,1.15,.12,'#F2E4C8',20);st.position.set(Math.sin(i*.7)*1,1.53,22.3+i*1.55);root.add(st)}
 const lamp=(x,z)=>{const l=new T.Group();l.position.set(x,1.55,z);const p=cyl(.14,.2,3.4,navy,10);p.position.y=1.7;l.add(p);const h=cyl(.45,.35,.7,M('#FFF4D2',{emissive:'#FFD98A',emissiveIntensity:.6}),8);h.position.y=3.65;l.add(h);const top=new T.Mesh(new T.ConeGeometry(.6,.5,8),navy);top.position.y=4.2;l.add(top);const tip=sph(.14,gold);tip.position.y=4.5;l.add(tip);root.add(l);c.addSolid&&c.addSolid(x,z,.3,.3)};
 [[-10.2,17.8],[10.2,17.8],[-12.6,3],[12.6,3]].forEach(([x,z])=>lamp(x,z));
 [[-16.8,13.5],[16.8,13.5],[-18.5,1],[18.5,1]].forEach(([x,z])=>{const hb=hibiscus();hb.position.set(x,1.9,z);root.add(hb);c.addSolid&&c.addSolid(x,z,1.2,1.2)});
 const bench=(x,z,ry)=>{const b=new T.Group();b.position.set(x,1.55,z);b.rotation.y=ry;const seat=new T.Mesh(new T.BoxGeometry(2.6,.18,.8),M('#C98F5A'));seat.position.y=.7;b.add(seat);const back=new T.Mesh(new T.BoxGeometry(2.6,.7,.12),M('#C98F5A'));back.position.set(0,1.15,-.35);b.add(back);for(const s of [-1,1]){const lg=new T.Mesh(new T.BoxGeometry(.14,.7,.7),navy);lg.position.set(s*1.1,.35,0);b.add(lg)}root.add(b);c.addSolid&&c.addSolid(x,z,ry?0.5:1.4,ry?1.4:0.5)};
 bench(-13.6,10,Math.PI/2);bench(13.6,10,-Math.PI/2);
 const tree=(x,z,s=1)=>{const t=new T.Group();t.position.set(x,1.5,z);t.scale.setScalar(s);const tr=cyl(.35,.5,2.4,'#9B6B43',10);tr.position.y=1.2;t.add(tr);const c1=sph(2.1,'#57A863',1,1.1,1,20);c1.position.y=3.6;t.add(c1);const c2=sph(1.5,'#67B970');c2.position.set(.9,4.6,.6);t.add(c2);
  for(let k=0;k<5;k++){const f=sph(.26,k%2?'#FFC4D6':'#FFFFFF',1,1,1,10);const a=k*1.4;f.position.set(Math.cos(a)*1.95,3.5+Math.sin(k)*.6,Math.sin(a)*1.95);t.add(f)}root.add(t);c.addSolid&&c.addSolid(x,z,.6*s,.6*s)};
 [[25,19],[45,19.5],[135,19.5],[155,19],[70,20.5],[110,20.5]].forEach(([deg,r],i)=>{const a=deg*Math.PI/180;tree(CC.x+Math.cos(a)*r,CC.z+Math.sin(a)*r,.85+(i%3)*.1)});
 const bed=(x,z)=>{const cols=['#FFB3CB','#FFFFFF','#FFF1D6','#F6D27A'];for(let k=0;k<9;k++){const a=k*2.4,r=.4+k*.18;const fl=sph(.32,cols[k%4],1,1,1,10);fl.position.set(x+Math.cos(a)*r,1.95,z+Math.sin(a)*r);root.add(fl);const lf=sph(.38,'#4FA54E',1,.5,1,8);lf.position.set(x+Math.cos(a)*r,1.7,z+Math.sin(a)*r);root.add(lf)}};
 [[-15.5,17],[15.5,17],[-6.5,24],[6.5,24]].forEach(([x,z])=>bed(x,z));
 for(let i=0;i<30;i++){const a=Math.PI*.12+i/29*Math.PI*.76;const r=CC.r-.6;const x=CC.x+Math.cos(a)*r,z=CC.z+Math.sin(a)*r;if(Math.abs(x)<3.5)continue;const ps=cyl(.13,.13,1.0,navy,8);ps.position.set(x,2.05,z);root.add(ps);const cp=sph(.2,gold,1,1,1,8);cp.position.set(x,2.62,z);root.add(cp)}
 // ---------- v497 噴水池升級：三層大理石水盤＋旋轉發光的金色 Logo 圓徽（占地不變，不擋大門）----------
 (()=>{let F=null;G[0].traverse(o=>{if(!F&&o.type==='Group'&&Math.abs(o.position.x-.5)<.05&&Math.abs(o.position.z-9.8)<.05)F=o});if(!F)return;F.userData.wyMainFountain=1;F.position.z=13.3;/* v501：噴水池往前移，不擋城堡大門 */
  F.traverse(o=>{if(o.isMesh&&o.geometry.type==='SphereGeometry'&&(o.geometry.parameters.radius||0)>1.5)o.visible=false});
  const marble=M('#FBF6EE',{roughness:.28}),goldM=M('#E9C46A',{metalness:.6,roughness:.25}),water=new T.MeshPhysicalMaterial({color:0x6FD3F2,transparent:true,opacity:.85,roughness:.08});
  const tag=o=>{o.userData.wyFtn=1;F.add(o);return o};
  const ped1=tag(cyl(.75,1.0,1.5,marble,32));ped1.position.y=2.3;
  const b2=tag(new T.Mesh(new T.CylinderGeometry(2.7,1.3,.55,48),marble));b2.position.y=3.2;const w2=tag(cyl(2.5,2.5,.06,water,48));w2.position.y=3.46;const r2=tag(new T.Mesh(new T.TorusGeometry(2.7,.12,10,64),goldM));r2.rotation.x=Math.PI/2;r2.position.y=3.48;
  const ped2=tag(cyl(.5,.7,1.2,marble,28));ped2.position.y=4.05;
  const b3=tag(new T.Mesh(new T.CylinderGeometry(1.7,.85,.45,40),marble));b3.position.y=4.75;const w3=tag(cyl(1.55,1.55,.05,water,40));w3.position.y=4.96;const r3=tag(new T.Mesh(new T.TorusGeometry(1.7,.1,10,48),goldM));r3.rotation.x=Math.PI/2;r3.position.y=4.98;
  const ped3=tag(cyl(.32,.42,.9,goldM,24));ped3.position.y=5.4;
  const med=new T.Group();med.userData.wyFtn=1;med.userData.wyTopMedal=1;med.position.y=6.95;F.add(med);
  const disc=new T.Mesh(new T.CylinderGeometry(1.25,1.25,.22,48),new T.MeshStandardMaterial({color:'#F0C75E',metalness:.65,roughness:.22,emissive:'#6b4d10',emissiveIntensity:.35}));disc.rotation.x=Math.PI/2;med.add(disc);
  const rimM=new T.Mesh(new T.TorusGeometry(1.25,.09,10,48),goldM);med.add(rimM);
  try{const tex=new T.TextureLoader().load('office-logo-transparent.png');tex.colorSpace=T.SRGBColorSpace;for(const sd of [1,-1]){const face=new T.Mesh(new T.CircleGeometry(1.05,40),new T.MeshBasicMaterial({color:'#FFF8EC'}));face.position.z=sd*.115;if(sd<0)face.rotation.y=Math.PI;med.add(face);const lg=new T.Mesh(new T.CircleGeometry(.98,40),new T.MeshBasicMaterial({map:tex,transparent:true}));lg.position.z=sd*.12;if(sd<0)lg.rotation.y=Math.PI;med.add(lg)}}catch(e){}
  // 水簾：上兩層水盤邊緣流下的細水柱
  const jm=new T.MeshBasicMaterial({color:0xC9F6FF,transparent:true,opacity:.6,depthWrite:false});const curtains=[];
  for(const [R,y0,h,n] of [[2.55,3.45,2.0,22],[1.6,4.95,1.45,14]])for(let k=0;k<n;k++){const a=k/n*Math.PI*2;const j=new T.Mesh(new T.CylinderGeometry(.05,.07,h,6),jm);j.position.set(Math.cos(a)*R,y0-h/2,Math.sin(a)*R);j.userData.wyFtn=1;F.add(j);curtains.push(j)}
  movers.push((t,dt)=>{med.rotation.y=Math.sin(t*.5)*.7;jm.opacity=.5+.06*Math.sin(t*1.2);let ph='day';try{ph=window.wySky.phase()}catch(e){}disc.material.emissiveIntensity=ph==='night'?.9:.35});
 })();
 // ---------- 3) 橋頭：石板平台＋兩根深藍金燈柱 ----------
 (window.wyLinks||[]).forEach(L=>{[L.pts[0],L.pts[L.pts.length-1]].forEach((p,j)=>{const q=j?L.pts[L.pts.length-2]:L.pts[1];const ang=Math.atan2(q[0]-p[0],q[2]-p[2]);const head=new T.Group();head.position.set(p[0],p[1]+.86,p[2]);head.rotation.y=ang;root.add(head);
  {const hb=hibiscus();hb.scale.multiplyScalar(.8);hb.position.set((j?-1:1)*7.4,-.7,j?1.6:-1.6);head.add(hb)}
  for(const s of [-1,1]){const pl=new T.Group();pl.position.set(s*5.3,-.3,0);head.add(pl);const pp=cyl(.22,.3,3.8,navy,12);pp.position.y=1.9;pl.add(pp);const rg=new T.Mesh(new T.TorusGeometry(.32,.08,6,16),gold);rg.rotation.x=Math.PI/2;rg.position.y=2.9;pl.add(rg);
   const lt=sph(.55,M('#FFF4D2',{emissive:'#FFD98A',emissiveIntensity:.7}),1,1,1,14);lt.position.y=4.2;pl.add(lt);const cp=new T.Mesh(new T.ConeGeometry(.5,.45,10),navy);cp.position.y=4.85;pl.add(cp)}})});
 // ---------- 4) 中間的骨牌花田 Logo 島 ----------
 const CG=new T.Group();CG.position.set(CEN.x,0,CEN.z);CG.userData.dyn=1;root.add(CG);
 const cTop=cyl(CEN.r,CEN.r-.4,1.2,'#9FDB82',64);cTop.position.y=CEN.top-.6;CG.add(cTop);const cSide=cyl(CEN.r-.3,CEN.r-.6,2.6,'#F3E6C8',64);cSide.position.y=-.7;CG.add(cSide);
 const cRim=new T.Mesh(new T.TorusGeometry(CEN.r-.05,.18,6,96),gold);cRim.rotation.x=Math.PI/2;cRim.position.y=CEN.top+.02;CG.add(cRim);
 let fieldSet=null;
 (async()=>{try{const img=await new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src='ground-logo-cropped.png'});
  const CROP=.8,GW=74,GH=Math.round(91*CROP);const cv=document.createElement('canvas');cv.width=GW;cv.height=GH;const cx=cv.getContext('2d');cx.drawImage(img,0,0,img.width,img.height*CROP,0,0,GW,GH);const px=cx.getImageData(0,0,GW,GH).data;
  // v498：徽章縮小往上移，下方用花排出 WEIYANG（深藍字）
  const RR=CEN.r-2.2,EH=17.2,H=EH,W=EH*GW/GH,sx=W/GW,sz=H/GH,EZ=-RR+H/2+.2;const cells=[];const occ=new Set();
  for(let j=0;j<GH;j++)for(let i=0;i<GW;i++){const x=-W/2+(i+.5)*sx,z=EZ-H/2+(j+.5)*sz;if(x*x+z*z>RR*RR)continue;const k=(j*GW+i)*4;const on=px[k+3]>100&&(px[k]+px[k+1]+px[k+2])<640;cells.push({x,z,on,ph:Math.random()*6});occ.add(Math.round(x/sx)+','+Math.round(z/sz))}
  {const TW=72,TH=12;const tc=document.createElement('canvas');tc.width=TW;tc.height=TH;const tx=tc.getContext('2d');tx.fillStyle='#000';tx.font='bold 12px Arial,Helvetica,sans-serif';tx.textAlign='center';tx.textBaseline='middle';tx.fillText('WEIYANG',TW/2,TH/2+1);const tp=tx.getImageData(0,0,TW,TH).data;
   const tsx=sx,tsz=sz,TZ=EZ+H/2+1.3+TH*tsz/2;for(let j=0;j<TH;j++)for(let i=0;i<TW;i++){const x=-TW*tsx/2+(i+.5)*tsx,z=TZ-TH*tsz/2+(j+.5)*tsz;if(x*x+z*z>RR*RR)continue;const k=(j*TW+i)*4;const on=tp[k+3]>110;cells.push({x,z,on,txt:1,ph:Math.random()*6})}
   // 其餘空白處補白花，花田維持滿版
   for(let z=-RR;z<=RR;z+=sz)for(let x=-RR;x<=RR;x+=sx){if(x*x+z*z>RR*RR)continue;const inE=Math.abs(x)<=W/2&&z>=EZ-H/2&&z<=EZ+H/2;const inT=Math.abs(x)<=TW*tsx/2&&Math.abs(z-TZ)<=TH*tsz/2;if(inE||inT)continue;cells.push({x,z,on:false,ph:Math.random()*6})}}
  const N=cells.length;const stemGeo=new T.CylinderGeometry(.03,.04,.85,5);stemGeo.translate(0,.42,0);const headGeo=new T.SphereGeometry(.17,8,6);headGeo.translate(0,.95,0);
  const stems=new T.InstancedMesh(stemGeo,M('#5E9E4A'),N),heads=new T.InstancedMesh(headGeo,new T.MeshStandardMaterial({color:'#ffffff',roughness:.6}),N);stems.position.y=CEN.top;heads.position.y=CEN.top;CG.add(stems,heads);
  const cIdle=new T.Color('#FFFFFF'),cOn=new T.Color('#F5BE3C'),cTxt=new T.Color('#1F3A75'),cOff=new T.Color('#FFF7F2');const m=new T.Matrix4(),q=new T.Quaternion(),e=new T.Euler(),v=new T.Vector3(),s=new T.Vector3(1,1,1),col=new T.Color();
  // 風吹花浪：每 9 秒一陣風，花浪從左後方往右前方滾過
  const WIND=(x,z,t)=>{const c2=t%9;if(c2>4.5)return 0;const fr=-RR-4+c2/4.5*(2*RR+8);const d=(x*.8+z*.6)-fr;return .42*Math.exp(-d*d/5)+.18*Math.exp(-(d+3.5)*(d+3.5)/4)};
  fieldSet=(tt,t)=>{for(let k=0;k<N;k++){const p=cells[k];let f;if(tt<6){const front=-W/2-1.5+(tt-.3)/1.8*(W+3);f=Math.min(1,Math.max(0,(front-p.x)/1.4))}else{const front=-W/2-1.5+(tt-6)/1.8*(W+3);f=1-Math.min(1,Math.max(0,(front-p.x)/1.4))}
    const wv=WIND(p.x,p.z,t);e.set(wv*.35,0,-(f*1.32+(Math.sin(t*2+p.ph)*.05+wv)*(1-f*.6)));q.setFromEuler(e);v.set(p.x-Math.sin(f*1.32)*.95,0,p.z);/* v500：花倒下時往右偏的量補回來，Logo 置中 */m.compose(v,q,s);stems.setMatrixAt(k,m);heads.setMatrixAt(k,m);col.copy(p.idle||cIdle).lerp(p.on?(p.txt?cTxt:cOn):(p.off||cOff),Math.min(1,f*1.6));heads.setColorAt(k,col)}
   stems.instanceMatrix.needsUpdate=true;heads.instanceMatrix.needsUpdate=true;heads.instanceColor.needsUpdate=true};
  // v499 節慶花田換色：春節紅金、情人節粉紅、端午綠、七夕紫、中秋金黃、聖誕紅綠
  {let tries=0;const pal=()=>{const F=window.wyFest;if(F===undefined){if(tries++<80)setTimeout(pal,250);return}const k=['cny','val','moon','xmas','qixi','duan'].find(q=>F.split(',').includes(q));if(!k)return;
   const P={cny:[['#E23B2E','#FF6B5A','#F2C14E'],'#FFF1D6'],val:[['#FF8FB8','#FFB3CF','#FF5C8D'],'#FFF0F5'],moon:[['#F5C542','#FFD86E','#FFE9A8'],'#FFF8E6'],xmas:[['#D7261E','#2F8F4E','#FFFFFF'],'#F2FFF4'],qixi:[['#B79CF2','#D7B8FF','#8E7CE0'],'#F6F0FF'],duan:[['#6FBF5B','#4E9A3A','#F2C14E'],'#F2FFE8']}[k];
   cells.forEach((p,i)=>{p.idle=new T.Color(P[0][Math.abs(i*7+Math.floor(p.x*3))%P[0].length]);p.off=new T.Color(P[1])});fieldSet(0,0)};pal()}
  fieldSet(0,0);window.wyFieldGroup=CG;window.__wyFieldSet=tt=>fieldSet(tt,0)}catch(err){console.error('field',err)}})();
 let fieldT=-1,fieldNext=40;window.wyFieldPlay=()=>{if(fieldT<0)fieldT=0};
 let windAcc=0;movers.push((t,dt)=>{if(!fieldSet)return;if(fieldT>=0){fieldT+=dt;fieldSet(fieldT,t);if(fieldT>8.8){fieldT=-1;fieldSet(0,t)}}else{fieldNext-=dt;if(fieldNext<=0){fieldNext=150;fieldT=0}else{windAcc+=dt;if(windAcc>.05){windAcc=0;fieldSet(0,t)}}}});
 try{const el=c.renderer.domElement,rc=new T.Raycaster(),vv=new T.Vector2();el.addEventListener('pointerdown',ev=>{if(c.inside&&c.inside())return;const r=el.getBoundingClientRect();vv.set(((ev.clientX-r.left)/r.width)*2-1,-((ev.clientY-r.top)/r.height)*2+1);rc.setFromCamera(vv,c.camera);if(rc.intersectObject(CG,true).length)window.wyFieldPlay()})}catch(e){}
 // ---------- 5) 沙灘、浪花、椰子樹、扶桑花 ----------
 const palm=()=>{const p=new T.Group();const lean=(Math.random()-.5)*.4;const tr=cyl(.22,.38,5.2,'#B98A5E',8);tr.position.y=2.6;tr.rotation.z=lean;p.add(tr);for(let l=0;l<7;l++){const lf=sph(1,'#4FB46A',2.3,.18,.7,10);const la=l/7*Math.PI*2;lf.position.set(Math.cos(la)*1.6+lean*-2.6,5.2,Math.sin(la)*1.6);lf.rotation.y=-la;lf.rotation.z=-.35;p.add(lf)}for(let k=0;k<3;k++){const co=sph(.3,'#8A6A3A',1,1,1,8);co.position.set(lean*-2.6+Math.cos(k*2)*.4,4.9,Math.sin(k*2)*.4);p.add(co)}return p};

 const linkDirs=isles.map(()=>[]);(window.wyLinks||[]).forEach(L=>{const ends=[L.pts[0],L.pts[L.pts.length-1]];ends.forEach(p=>{isles.forEach((I,k)=>{if(Math.hypot(p[0]-I.x,p[2]-I.z)<I.r+3)linkDirs[k].push(Math.atan2(p[2]-I.z,p[0]-I.x))})})});
 const freeAng=(k,a)=>linkDirs[k].every(b=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)))>.42);
 const centers=[];
 isles.forEach((I,k)=>{centers.push([I.x,I.z,I.r]);
  const sand=cyl(I.r+2.2,I.r+6.5,1.6,'#FBF1DC',72);sand.position.set(I.x,SEA+.25,I.z);root.add(sand);
  const foam=new T.Mesh(new T.TorusGeometry(I.r+6.3,.35,6,96),new T.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.75}));foam.rotation.x=Math.PI/2;foam.position.set(I.x,SEA+.05,I.z);foam.userData.dyn=1;root.add(foam);const ph=k;movers.push(t=>{foam.material.opacity=.55+.25*Math.sin(t*1.6+ph)});
  const n=k===0?10:6;for(let j=0;j<n;j++){const a=j/n*Math.PI*2+.3;if(!freeAng(k,a))continue;if(k===0&&Math.sin(a)>.45&&Math.abs(Math.cos(a))<.55)continue;const pr=I.r+3.4;
   const p=palm();p.position.set(I.x+Math.cos(a)*pr,SEA+1.05,I.z+Math.sin(a)*pr);root.add(p);const h=hibiscus();h.position.set(I.x+Math.cos(a+.3)*(I.r+2.6),SEA+1.1,I.z+Math.sin(a+.3)*(I.r+2.6));root.add(h)}});
 // ---------- 6) 海 ----------
 const uni={uT:{value:0},uDim:{value:1},uC:{value:centers.map(v=>new T.Vector3(v[0],v[1],v[2]))}};const NC=centers.length;
 const sea=new T.Mesh(new T.PlaneGeometry(1600,1600,1,1),new T.ShaderMaterial({uniforms:uni,
  vertexShader:'varying vec3 vW;void main(){vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
  fragmentShader:`uniform float uT;uniform float uDim;uniform vec3 uC[${NC}];varying vec3 vW;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  void main(){float d=1e5;for(int i=0;i<${NC};i++){d=min(d,length(vW.xz-uC[i].xy)-uC[i].z);}
   vec3 c=mix(vec3(.42,.93,.86),vec3(.13,.74,.86),smoothstep(4.,16.,d));c=mix(c,vec3(.07,.42,.74),smoothstep(16.,50.,d));c=mix(c,vec3(.10,.33,.62),smoothstep(120.,300.,length(vW.xz-vec2(0.,-50.))));
   vec2 q=vW.xz*.5;vec2 g=floor(q);vec2 f=fract(q)-.5;float s=h(g+floor(uT*1.2));float sp=step(.975,s)*smoothstep(.16,.02,length(f*vec2(1.,2.2)))*(.6+.4*sin(uT*5.+s*40.));
   c+=vec3(sp*.55)+.04*sin(vW.x*.25+uT*1.2)*sin(vW.z*.22+uT);c=mix(c*vec3(.55,.62,.85),c,uDim);gl_FragColor=vec4(c,1.);}`}));
 sea.rotation.x=-Math.PI/2;sea.position.y=SEA;sea.userData.dyn=1;root.add(sea);let dimNow=1;movers.push((t,dt)=>{uni.uT.value=t;let ph='day';try{ph=window.wySky.phase()}catch(e){}const want=ph==='night'?0:ph==='dusk'?.55:1;dimNow+=(want-dimNow)*Math.min(1,dt*1.5);uni.uDim.value=dimNow});
 // ---------- 7) 熱鬧：遠方小島、雲層、船、海鷗、沙灘、攤位、彩旗、遊客 ----------
 const OX=0,OZ=-50;
 const houseCols=[['#FFFFFF','#E86A5A'],['#FFF4E0','#3F78C2'],['#FFE6EE','#F29A6B'],['#F3F8FF','#1F3460']];
 const mini=(x,z,s,i)=>{const g=new T.Group();g.position.set(x,SEA,z);g.scale.setScalar(s);const sd=cyl(13,15,1.2,'#FBF1DC',32);sd.position.y=.2;g.add(sd);const hill=sph(11,'#8FD07A',1,.42,1,18);hill.position.y=.6;g.add(hill);
  for(let k=0;k<4;k++){const a=k*1.6+i;const h=new T.Group();h.position.set(Math.cos(a)*6,3.6,Math.sin(a)*6);const [w,r]=houseCols[(k+i)%4];const b=new T.Mesh(new T.BoxGeometry(3.2,2.6,3),M(w));b.position.y=1.3;h.add(b);const rf=new T.Mesh(new T.CylinderGeometry(.01,2.5,1.8,4),M(r));rf.rotation.y=Math.PI/4;rf.position.y=3.5;h.add(rf);g.add(h)}
  for(let k=0;k<3;k++){const a=k*2.1+i+.8;const p=palm();p.position.set(Math.cos(a)*10,.8,Math.sin(a)*10);g.add(p)}
  if(i%3===0){const lh=new T.Group();lh.position.set(-8,.8,4);for(let k=0;k<4;k++){const cc=cyl(1.1-k*.12,1.2-k*.12,1.8,k%2?'#E86A5A':'#FFFFFF',14);cc.position.y=.9+k*1.8;lh.add(cc)}const lp=sph(.9,M('#FFF2B0',{emissive:'#FFD98A',emissiveIntensity:.9}));lp.position.y=8;lh.add(lp);const cap=new T.Mesh(new T.ConeGeometry(1,1,14),navy);cap.position.y=9;lh.add(cap);g.add(lh)}root.add(g)};
 for(let i=0;i<11;i++){const a=i/11*Math.PI*2+.2;const Rr=200+(i%3)*24;mini(OX+Math.cos(a)*Rr,OZ+Math.sin(a)*Rr,.9+(i%2)*.4,i)}
 for(let i=0;i<26;i++){const a=i/26*Math.PI*2;const cl=sph(26+(i%4)*6,M('#FFFFFF',{roughness:1,transparent:true,opacity:.92}),1.6,.55,1,14);cl.position.set(OX+Math.cos(a)*360,8+(i%3)*5,OZ+Math.sin(a)*360);root.add(cl)}
 // v498 帆船：平常遊艇型（藍金條紋帆）＋德威陽品牌帆（深藍底金色 WY）；春節換紅色中式帆、聖誕換紅綠帆
 const ctex=(w,h,fn)=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;fn(cv.getContext('2d'),w,h);const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t};
 const sailTex={
  stripe:ctex(256,256,(x,w,h)=>{x.fillStyle='#FFFFFF';x.fillRect(0,0,w,h);[['#1F3A75',.62],['#F0C75E',.7],['#1F3A75',.76]].forEach(([c2,y])=>{x.fillStyle=c2;x.fillRect(0,h*y,w,h*.05)})}),
  brand:null,
  cny:ctex(256,256,(x,w,h)=>{x.fillStyle='#D7261E';x.fillRect(0,0,w,h);x.fillStyle='#8A1A14';for(let k=1;k<6;k++)x.fillRect(0,h*k/6-3,w,6);x.fillStyle='#F2C14E';x.beginPath();x.arc(w/2,h*.45,46,0,7);x.fill();x.fillStyle='#D7261E';x.font='bold 64px "Noto Serif TC","PMingLiU",serif';x.textAlign='center';x.textBaseline='middle';x.fillText('福',w/2,h*.46)}),
  xmas:ctex(256,256,(x,w,h)=>{for(let k=0;k<8;k++){x.fillStyle=k%2?'#2F8F4E':'#D7261E';x.fillRect(0,k*h/8,w,h/8)}x.fillStyle='#FFFFFF';for(let k=0;k<14;k++){x.beginPath();x.arc((k*67)%w,(k*41)%h,5,0,7);x.fill()}})};
 sailTex.brand=/* v500：品牌帆改正式 Logo */(()=>{const cv=document.createElement('canvas');cv.width=cv.height=256;const x=cv.getContext('2d');x.fillStyle='#1F3A75';x.fillRect(0,0,256,256);x.strokeStyle='#F0C75E';x.lineWidth=8;x.strokeRect(10,10,236,236); const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;const im=new Image();im.onload=()=>{x.drawImage(im,8,14,240,240);t.needsUpdate=true};im.src='./office-logo-transparent.png';return t})();
 try{const li=new Image();li.onload=()=>{const t=sailTex.brand;const cv=t.image;const x=cv.getContext('2d');x.fillStyle='#1F3A75';x.fillRect(14,14,cv.width-28,cv.height-28);const sc=Math.min(118/li.width,118/li.height);const lw=li.width*sc,lh=li.height*sc;x.drawImage(li,cv.width*.33-lw/2,cv.height*.64-lh/2,lw,lh);const d=x.getImageData(0,0,cv.width,cv.height);for(let i=0;i<d.data.length;i+=4){const r=d.data[i],g=d.data[i+1],b=d.data[i+2];if(r<90&&g<90&&b<120&&!(Math.abs(r-31)<8&&Math.abs(g-58)<8&&Math.abs(b-117)<8)){d.data[i]=240;d.data[i+1]=199;d.data[i+2]=94}}x.putImageData(d,0,0);t.needsUpdate=true};li.src='office-logo-transparent.png'}catch(e){}
 const triGeo=(w,h,curve)=>{const g=new T.BufferGeometry();const N=8,pos=[],uv=[],idx=[];for(let j=0;j<=N;j++)for(let i=0;i<=N;i++){const v=j/N,u=i/N*(1-v);const bul=Math.sin(Math.PI*u/(1-v+1e-6)*(1-v))*curve*(1-v);pos.push(bul,v*h,u*w);uv.push(u/(1-v+1e-6)*(1-v)+.0,v)}for(let j=0;j<N;j++)for(let i=0;i<N;i++){const a=j*(N+1)+i,b=a+1,c2=a+N+1,d=c2+1;idx.push(a,c2,b,b,c2,d)}g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g};
 const sails=[];const boat=(kind)=>{const g=new T.Group();
  const hull=new T.Mesh(new T.SphereGeometry(1,24,12,0,Math.PI*2,Math.PI/2,Math.PI/2),M('#FFFFFF',{roughness:.35}));hull.scale.set(1.25,.9,3.4);hull.position.y=.65;g.add(hull);
  const bow=new T.Mesh(new T.ConeGeometry(.9,1.6,16,1,false,0,Math.PI*2),M('#FFFFFF',{roughness:.35}));bow.rotation.x=Math.PI/2;bow.scale.set(1.3,1,.62);bow.position.set(0,.55,3.6);g.add(bow);
  const stripe=new T.Mesh(new T.TorusGeometry(1,.06,6,40),M('#1F3A75'));stripe.rotation.x=Math.PI/2;stripe.scale.set(1.26,3.42,1);stripe.position.y=.5;g.add(stripe);
  const deck=cyl(1,1,.12,'#C89B6A',24);deck.scale.set(1.18,1,3.3);deck.position.y=.66;g.add(deck);const rail=new T.Mesh(new T.TorusGeometry(1,.03,6,40),M('#F0C75E',{metalness:.4,roughness:.3}));rail.rotation.x=Math.PI/2;rail.scale.set(1.2,3.32,1);rail.position.y=.95;g.add(rail);
  const cab=new T.Mesh(new T.BoxGeometry(1.3,.7,1.6),M('#FFFFFF',{roughness:.4}));cab.position.set(0,1.05,-1.2);g.add(cab);const win=new T.Mesh(new T.BoxGeometry(1.32,.22,1.2),M('#1F3A75',{roughness:.2}));win.position.set(0,1.12,-1.1);g.add(win);
  const mast=cyl(.07,.09,6.4,'#E8E2D6',8);mast.position.set(0,3.8,.4);g.add(mast);const boom=cyl(.05,.05,3.6,'#C8C2B6',6);boom.rotation.x=Math.PI/2;boom.position.set(0,1.45,-1.3);g.add(boom);
  const main=new T.Mesh(triGeo(3.4,5.6,.35),new T.MeshStandardMaterial({map:kind==='brand'?sailTex.brand:sailTex.stripe,side:T.DoubleSide,roughness:.6}));main.rotation.y=Math.PI;main.position.set(.06,1.5,.3);g.add(main);
  const jib=new T.Mesh(triGeo(2.5,5.0,.25),new T.MeshStandardMaterial({map:sailTex.stripe,side:T.DoubleSide,roughness:.6}));jib.position.set(.04,1.3,.5);g.add(jib);
  const fl=new T.Mesh(new T.PlaneGeometry(.9,.5),M('#F0C75E',{side:T.DoubleSide}));fl.position.set(0,7.1,-.05);fl.rotation.y=Math.PI/2;g.add(fl);
  const wake=new T.Group();for(let k=0;k<7;k++){const f=sph(.5+k*.12,M('#FFFFFF',{transparent:true,opacity:.75-k*.09,roughness:1}),1.4,.12,1,10);f.position.set(0,.05,-3.6-k*.9);f.userData.k=k;wake.add(f)}g.add(wake);
  // v499 春節中式帆：長方形竹條帆，正中大金色福字圓牌，兩面都是正字
  const junk=new T.Group();junk.visible=false;junk.position.set(0,1.6,-1.0);g.add(junk);if(!sailTex.junk)sailTex.junk=ctex(256,320,(x,w,h)=>{x.fillStyle='#D7261E';x.fillRect(0,0,w,h);x.fillStyle='#8A1A14';for(let k=1;k<7;k++)x.fillRect(0,h*k/7-3,w,6);x.fillStyle='#F2C14E';x.beginPath();x.arc(w/2,h*.48,84,0,7);x.fill();x.strokeStyle='#8A1A14';x.lineWidth=6;x.stroke();x.fillStyle='#C8161E';x.font='bold 116px "Noto Serif TC","PMingLiU",serif';x.textAlign='center';x.textBaseline='middle';x.fillText('福',w/2,h*.5)});
  for(const side of[1,-1]){const pl=new T.Mesh(new T.PlaneGeometry(3.6,4.6),new T.MeshStandardMaterial({map:sailTex.junk,roughness:.6}));pl.position.set(side*.04,2.5,0);pl.rotation.y=side>0?Math.PI/2:-Math.PI/2;junk.add(pl)}
  for(let k=0;k<=7;k++){const bt=new T.Mesh(new T.CylinderGeometry(.04,.04,3.8,6),M('#8A5A36'));bt.rotation.x=Math.PI/2;bt.position.set(0,.2+k*4.6/7,0);junk.add(bt)}
  sails.push({main,jib,kind,fl,junk});g.userData.wake=wake;g.userData.fl=fl;return g};
 ['stripe','brand','stripe','brand','stripe'].forEach((kind,i)=>{const b=boat(kind);b.scale.setScalar(1.25);b.userData.dyn=1;root.add(b);const Rx=96+i*9,Rz=118+i*9,ph=i*1.25,sp=.022+i*.003;movers.push(t=>{const a=ph+t*sp;b.position.set(OX+Math.cos(a)*Rx,SEA+Math.sin(t*1.6+i)*.15,OZ+Math.sin(a)*Rz);b.rotation.y=-a;b.rotation.z=Math.sin(t*1.3+i)*.05;b.userData.fl.rotation.x=Math.sin(t*6+i)*.25;b.userData.wake.children.forEach(f=>{const s2=1+.08*Math.sin(t*3+f.userData.k);f.scale.x=1.4*s2})})});
 // 節慶換帆：等 wy-fest 決定今天的節日後套用
 {let done=false;movers.push(()=>{if(done)return;const F=window.wyFest;if(F===undefined)return;done=true;const k=F.includes('cny')?'cny':F.includes('xmas')?'xmas':null;if(!k)return;sails.forEach(sl=>{if(k==='cny'&&sl.junk){sl.main.visible=false;sl.jib.visible=false;sl.junk.visible=true}sl.main.material.map=sailTex[k];sl.main.material.needsUpdate=true;sl.jib.material.map=sailTex[k];sl.jib.material.needsUpdate=true;sl.fl.material=M(k==='cny'?'#D7261E':'#2F8F4E',{side:T.DoubleSide})})})}
 // v499 海鷗：圓滾滾的動森風（高面數、圓弧翅膀、柔和拍動），數量減少當點綴
 for(let i=0;i<6;i++){const g=new T.Group();const W='#FFFFFF';g.add(sph(.6,W,1,.88,1.22,28));const hd=sph(.44,W,1,1,1,28);hd.position.set(0,.38,.62);g.add(hd);const bk=new T.Mesh(new T.SphereGeometry(.13,16,12),M('#F7B733'));bk.scale.set(1,.7,1.8);bk.position.set(0,.32,1.08);g.add(bk);for(const sd of [-1,1]){const ey=sph(.065,'#1A1A1A',1,1,1,12);ey.position.set(sd*.19,.5,.95);g.add(ey);const ck=sph(.07,'#FFB3C6',1,.6,.4,10);ck.position.set(sd*.3,.32,.9);g.add(ck)}const tl=sph(.3,'#F2F5FA',1,.35,1.1,20);tl.position.set(0,.05,-.72);g.add(tl);
  const wl=new T.Group(),wr=new T.Group();for(const [w,sd] of[[wl,-1],[wr,1]]){const wing=sph(.55,'#F4F7FB',1.75,.2,.85,28);wing.position.x=sd*.85;w.add(wing);const tip=sph(.28,'#C9D6E6',1,.2,.7,20);tip.position.x=sd*1.6;w.add(tip);w.position.set(sd*.25,.15,0);g.add(w)}
  g.scale.setScalar(1.35);g.userData.dyn=1;root.add(g);const Rr=44+i*13,ph=i*1.05,hh=19+(i%3)*5;
  movers.push(t=>{const a=ph+t*.14;g.position.set(OX+Math.cos(a)*Rr,hh+Math.sin(t*1.4+i)*.9,OZ+Math.sin(a)*Rr*1.2);g.rotation.y=-a;g.rotation.z=Math.sin(t*1.4+i)*.12;const f=Math.sin(t*4.2+i)*.42;wl.rotation.z=f;wr.rotation.z=-f})}
 const umbrella=(x,z,c1,c2)=>{const g=new T.Group();g.position.set(x,SEA+1.05,z);g.scale.setScalar(1.25);const pole=cyl(.07,.07,3.1,white,8);pole.position.y=1.55;g.add(pole);for(let k=0;k<8;k++){const seg=new T.Mesh(new T.SphereGeometry(2,8,6,k/8*Math.PI*2,Math.PI*2/8,0,Math.PI/2.6),M(k%2?c1:c2,{side:T.DoubleSide}));seg.scale.y=.5;seg.position.y=2.6;g.add(seg)}
  const ln=new T.Mesh(new T.BoxGeometry(1,.16,2.4),white);ln.position.set(1.6,.32,.3);ln.rotation.x=-.15;g.add(ln);const tw=new T.Mesh(new T.BoxGeometry(.9,.04,2),M(c1));tw.position.set(1.6,.43,.3);tw.rotation.x=-.15;g.add(tw);root.add(g)};
 const stall=(x,z,col,label)=>{const g=new T.Group();g.position.set(x,SEA+1.05,z);g.scale.setScalar(1.25);const cnt=new T.Mesh(new T.BoxGeometry(3.4,1.2,1.5),white);cnt.position.y=.6;g.add(cnt);const trim=new T.Mesh(new T.BoxGeometry(3.5,.14,1.6),navy);trim.position.y=1.27;g.add(trim);
  for(let k=0;k<6;k++){const aw=new T.Mesh(new T.CylinderGeometry(.62,.62,.58,14,1,true,0,Math.PI),M(k%2?'#FFFFFF':col,{side:T.DoubleSide}));aw.rotation.z=Math.PI/2;aw.rotation.y=Math.PI/2;aw.position.set(-1.5+k*.6,2.7,.35);g.add(aw)}for(const s of [-1,1]){const p=cyl(.07,.07,1.6,gold,8);p.position.set(s*1.6,1.9,.55);g.add(p)}
  for(let k=0;k<3;k++){const cup=cyl(.18,.13,.4,['#FF8FA3','#FFE27A','#7FD0F2'][k],10);cup.position.set(-.6+k*.6,1.42,.3);g.add(cup);const tp=sph(.2,white,1,1,1,8);tp.position.set(cup.position.x,1.7,.3);g.add(tp)}root.add(g)};
 const ring=(x,z,col)=>{const r=new T.Mesh(new T.TorusGeometry(.75,.3,10,18),M(col));r.rotation.x=Math.PI/2;r.position.set(x,SEA+.12,z);r.userData.dyn=1;root.add(r);movers.push(t=>{r.position.y=SEA+.12+Math.sin(t*2+x)*.12;r.rotation.z=t*.2})};
 // v497：沙灘重新整理（全部沿著城堡島前方的沙灘弧線排，保證都在沙上），不放遊客
 const SR=CC.r+3.7;const onArc=(deg,r=SR)=>{const a=(90+deg)*Math.PI/180;return [CC.x+Math.cos(a)*r,CC.z+Math.sin(a)*r,a]};
 const UC=[['#FF8FA3','#FFFFFF'],['#1F3460','#FFFFFF'],['#FFD36E','#FFFFFF'],['#7FD0F2','#FFFFFF'],['#F0C75E','#1F3460']];
 [-50,-38,-26,26,38,50].forEach((d,k)=>{const [x,z]=onArc(d);umbrella(x,z,...UC[k%5])});
 {const [x1,z1]=onArc(-14,SR-.6),[x2,z2]=onArc(14,SR-.6);stall(x1,z1,'#FF8FA3');stall(x2,z2,'#7FD0F2')}
 [-40,-20,0,20,40].forEach((d,k)=>{const [x,z]=onArc(d,CC.r+8.4);ring(x,z,['#FF8FA3','#FFD36E','#7FD0F2','#B8E986','#F0C75E'][k])});
 {const P=[-58,-46,-34,-22,-10,2,14,26,38,50,58].map(d=>onArc(d,SR-1.2));const bc=['#FF8FA3','#FFD36E','#7FD0F2','#FFFFFF','#1F3460','#F0C75E'];
  const [ax,az]=onArc(-60,SR-1.6),[bx,bz]=onArc(60,SR-1.6);for(const [x,z] of [[ax,az],[bx,bz]]){const pl=cyl(.2,.26,7.6,navy,10);pl.position.set(x,SEA+3.8,z);root.add(pl);const kk=sph(.3,gold,1,1,1,10);kk.position.set(x,SEA+7.7,z);root.add(kk)}
  const N=30;for(let k=0;k<=N;k++){const d=-60+120*k/N;const [x,z]=onArc(d,SR-1.6);const y=SEA+6.5-Math.sin(k/N*Math.PI)*1.2;const f=new T.Mesh(new T.ConeGeometry(.42,.85,3),M(bc[k%6]));f.rotation.x=Math.PI;f.position.set(x,y-.48,z);root.add(f);const bl=sph(.17,M('#FFF4D2',{emissive:'#FFD98A',emissiveIntensity:.9}),1,1,1,8);bl.position.set(x,y,z);root.add(bl)}}
 // 海星（明顯）、小螃蟹、寄居蟹、海龜：每座島沙灘都有
 const starfish=(col)=>{const g=new T.Group();for(let k=0;k<5;k++){const arm=new T.Mesh(new T.ConeGeometry(.32,1.15,8),M(col,{roughness:.55}));arm.rotation.z=-Math.PI/2;arm.rotation.y=k/5*Math.PI*2;arm.position.set(Math.cos(k/5*Math.PI*2)*.5,0,-Math.sin(k/5*Math.PI*2)*.5);arm.scale.y=1;arm.scale.z=.45;g.add(arm)}
  const c0=sph(.42,col,1,.45,1,14);g.add(c0);for(let k=0;k<10;k++){const a=k/10*Math.PI*2;const dt=sph(.06,'#FFF1D6',1,1,1,6);dt.position.set(Math.cos(a)*(.3+(k%2)*.25),.16,Math.sin(a)*(.3+(k%2)*.25));g.add(dt)}g.scale.setScalar(1.3);return g};
 const crab=()=>{const g=new T.Group();const b=sph(.42,'#F05A3C',1.25,.6,1,14);b.position.y=.3;g.add(b);for(const e of [-1,1]){const st=cyl(.04,.04,.3,'#F05A3C',6);st.position.set(e*.18,.62,.18);g.add(st);const ey=sph(.09,'#FFFFFF',1,1,1,8);ey.position.set(e*.18,.8,.2);g.add(ey);const pu=sph(.045,'#1A1A1A',1,1,1,6);pu.position.set(e*.18,.82,.28);g.add(pu);
   const cl=sph(.2,'#F05A3C',1,.7,1.2,10);cl.position.set(e*.62,.35,.32);g.add(cl);for(let k=0;k<3;k++){const lg=cyl(.035,.035,.42,'#D9472C',5);lg.rotation.z=e*1.1;lg.position.set(e*.5,.18,-.2+k*.18);g.add(lg)}}return g};
 const hermit=()=>{const g=new T.Group();const sh=new T.Mesh(new T.ConeGeometry(.42,.9,14),M('#F5D7B2'));sh.rotation.x=-Math.PI/2+.4;sh.position.set(0,.45,-.15);g.add(sh);for(let k=0;k<3;k++){const r=new T.Mesh(new T.TorusGeometry(.3-k*.08,.05,6,16),M('#E3A877'));r.position.set(0,.45+k*.08,-.05-k*.22);g.add(r)}
  const body=sph(.22,'#E86A4A',1,.8,1,10);body.position.set(0,.22,.35);g.add(body);for(const e of [-1,1]){const ey=sph(.07,'#FFFFFF',1,1,1,6);ey.position.set(e*.1,.42,.48);g.add(ey);const pu=sph(.035,'#1A1A1A',1,1,1,6);pu.position.set(e*.1,.43,.54);g.add(pu)}return g};
 const turtle=()=>{const g=new T.Group();const shl=new T.Mesh(new T.SphereGeometry(.9,18,12,0,Math.PI*2,0,Math.PI/2),M('#4FA36A'));shl.scale.set(1,.6,1.15);shl.position.y=.2;g.add(shl);for(let k=0;k<6;k++){const p=sph(.2,'#7CC88A',1,.3,1,8);const a=k/6*Math.PI*2;p.position.set(Math.cos(a)*.48,.62,Math.sin(a)*.55);g.add(p)}
  const hd=sph(.32,'#9AD3A0');hd.position.set(0,.35,1.1);g.add(hd);for(const e of [-1,1]){const ey=sph(.06,'#1A1A1A',1,1,1,6);ey.position.set(e*.15,.45,1.36);g.add(ey);const ck=sph(.06,'#FFB3C6',1,.6,.5,6);ck.position.set(e*.22,.32,1.32);g.add(ck)}
  for(const ex of [-1,1])for(const ez of [-1,1]){const f=sph(.26,'#9AD3A0',1.4,.35,.8,8);f.position.set(ex*.85,.12,ez*.6);f.rotation.y=ex*ez*.5;g.add(f)}return g};
 const SF=['#FF7A4D','#FF8FB0','#F7C548'];
 isles.forEach((I,k)=>{const r=I.r+3.6;const n=k===0?7:4;for(let j=0;j<n;j++){const a=(j/n)*Math.PI*2+.55+k;if(!freeAng(k,a))continue;const sf=starfish(SF[(j+k)%3]);sf.position.set(I.x+Math.cos(a)*r,SEA+1.02,I.z+Math.sin(a)*r);sf.rotation.y=a;sf.userData.dyn=1;root.add(sf);movers.push(t=>{sf.rotation.y=a+Math.sin(t*.4+j)*.25})}
  const a2=.9+k*1.3;if(freeAng(k,a2)){const cb=crab();const r2=I.r+4.2;cb.position.set(I.x+Math.cos(a2)*r2,SEA+1.02,I.z+Math.sin(a2)*r2);cb.userData.dyn=1;root.add(cb);movers.push(t=>{const q=a2+Math.sin(t*.35+k)*.06;cb.position.x=I.x+Math.cos(q)*r2;cb.position.z=I.z+Math.sin(q)*r2;cb.rotation.y=-q;cb.position.y=SEA+1.02+Math.abs(Math.sin(t*8))*.04})}
  const a3=2.4+k*.9;if(freeAng(k,a3)){const hc=hermit();const r3=I.r+3.0;hc.position.set(I.x+Math.cos(a3)*r3,SEA+1.02,I.z+Math.sin(a3)*r3);hc.rotation.y=-a3;root.add(hc)}});
 // 海龜：在城堡島前方的淺灘慢慢游
 for(let k=0;k<3;k++){const tt=turtle();tt.userData.dyn=1;root.add(tt);const ph=k*2.1,Rt=CC.r+11+k*2.5;movers.push(t=>{const a=ph+t*.05;tt.position.set(CC.x+Math.cos(a)*Rt,SEA+.05+Math.sin(t*1.2+k)*.06,CC.z+Math.sin(a)*Rt);tt.rotation.y=-a})}
 // ---------- v501 海洋生物：海豚、鯨魚、熱帶魚、海獅、章魚、貝殼（動作都慢慢的，不閃） ----------
 {const CX=CEN.x,CZ=CEN.z;
  // 貝殼：每座島沙灘上幾顆（不會動，之後一起合併）
  const fanShape=new T.Shape();fanShape.moveTo(0,0);for(let k=0;k<=10;k++){const a=Math.PI*(.12+.76*k/10);const r=k%2?.62:.7;fanShape.lineTo(Math.cos(a)*r,Math.sin(a)*r)}fanShape.lineTo(0,0);
  const fanG=new T.ExtrudeGeometry(fanShape,{depth:.08,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:2});
  const scallop=col=>{const g=new T.Group();const f=new T.Mesh(fanG,M(col,{roughness:.45}));f.rotation.x=-Math.PI/2;f.position.y=.06;g.add(f);for(let k=0;k<5;k++){const rb=cyl(.025,.025,.55,'#FFFFFF',5);const a=Math.PI*(.25+.5*k/4);rb.rotation.z=Math.PI/2;rb.rotation.y=-a+Math.PI/2;rb.position.set(Math.cos(a)*.3,.16,-Math.sin(a)*.3);g.add(rb)}const hinge=sph(.12,col,1.4,.6,.8,10);hinge.position.y=.08;g.add(hinge);g.scale.setScalar(1.25);return g};
  const conch=col=>{const g=new T.Group();const sh=new T.Mesh(new T.ConeGeometry(.42,1.2,12),M(col,{roughness:.45}));sh.rotation.z=Math.PI/2;sh.position.y=.35;g.add(sh);for(let k=0;k<3;k++){const r=new T.Mesh(new T.TorusGeometry(.38-k*.1,.06,6,16),M('#FFF1E0'));r.rotation.y=Math.PI/2;r.position.set(-.2+k*.25,.35,0);g.add(r)}const lip=sph(.3,'#FFB8A8',.6,1,1,10);lip.position.set(-.55,.35,0);g.add(lip);return g};
  const SC=['#FFC2C8','#FFE0B8','#FFFFFF','#F7D6F0','#FFD8A8'];
  isles.forEach((I,k)=>{if(k===6)return;for(let j=0;j<4;j++){const a=j/4*Math.PI*2+.95+k*.7;if(!freeAng(k,a))continue;const o=(j%2?conch:scallop)(SC[(j+k)%5]);const r=I.r+3.1+(j%2)*.5;o.position.set(I.x+Math.cos(a)*r,SEA+1.02,I.z+Math.sin(a)*r);o.rotation.y=-a+j;root.add(o)}});
  // 海豚：在群島外圍的海面跳出水面（三隻一組，不靠近橋）
  const dolphin=()=>{const g=new T.Group();const bc='#7FA9D6';const b=sph(.6,bc,1,.85,2.1,16);g.add(b);const bl=sph(.5,'#F4F8FF',.9,.6,1.7,14);bl.position.set(0,-.18,.1);g.add(bl);const sn=sph(.22,bc,1,.8,1.6,10);sn.position.set(0,-.08,1.45);g.add(sn);
   const fin=new T.Mesh(new T.ConeGeometry(.22,.7,6),M(bc));fin.position.set(0,.6,-.15);fin.rotation.x=-.5;g.add(fin);for(const e of[-1,1]){const fl=sph(.32,bc,1,.18,.6,8);fl.position.set(e*.8,-.62,-1.35);fl.rotation.y=e*.6;g.add(fl);const pf=sph(.22,bc,1,.15,.55,8);pf.position.set(e*.5,-.25,.5);pf.rotation.z=e*.6;g.add(pf);const ey=sph(.07,'#1A1A1A',1,1,1,6);ey.position.set(e*.36,.12,.95);g.add(ey)}
   const tl=cyl(.12,.3,.9,bc,8);tl.rotation.x=Math.PI/2;tl.position.set(0,-.3,-1.35);g.add(tl);g.scale.setScalar(1.15);return g};
  const pods=[57,123,186,243,297,354].map(d=>{const a=d*Math.PI/180;return {x:CX+Math.cos(a)*96,z:CZ+Math.sin(a)*96,dir:a+Math.PI/2}});
  pods.forEach((P,pk)=>{for(let n=0;n<3;n++){const d=dolphin();d.userData.dyn=1;root.add(d);const off=n*1.1+pk*.7,span=7,per=6.5;movers.push(t=>{const u=((t+off*per/3)%per)/per;const air=u<.32;const k=air?u/.32:1;const along=-span/2+span*((t/per+off)%1);
    const dx=Math.cos(P.dir),dz=Math.sin(P.dir);const side=(n-1)*2.2;const x=P.x+dx*along-dz*side,z=P.z+dz*along+dx*side;const y=air?SEA+.2+Math.sin(k*Math.PI)*3.4:SEA-2.6;d.position.set(x,y,z);d.visible=air;
    d.rotation.set(0,Math.atan2(dx,dz),0);d.rotateX(air?-(Math.cos(k*Math.PI))*.9:0)})}});
  // 鯨魚：群島外圍慢慢游，背部浮出水面，噴出穩定的水柱
  {const w=new T.Group();w.userData.dyn=1;const wc='#5E86B8';const body=sph(2.6,wc,1,.62,2.6,20);w.add(body);const belly=sph(2.3,'#E8F1FA',.95,.4,2.3,18);belly.position.y=-.5;w.add(belly);
   for(let k=0;k<6;k++){const gr=cyl(.04,.04,2.2,'#BFD3EA',4);gr.rotation.z=Math.PI/2;gr.position.set(0,-1.1,1.6-k*.35);w.add(gr)}
   const tail=new T.Group();tail.position.set(0,.2,-6.6);w.add(tail);for(const e of[-1,1]){const fl=sph(1.0,wc,1.3,.2,.6,10);fl.position.set(e*1.1,0,-.4);fl.rotation.y=e*.4;tail.add(fl)}const ts=cyl(.5,1.1,2.2,wc,10);ts.rotation.x=Math.PI/2;ts.position.z=.9;tail.add(ts);
   for(const e of[-1,1]){const ey=sph(.16,'#1A1A1A',1,1,1,8);ey.position.set(e*1.9,.1,4.0);w.add(ey);const fin=sph(.7,wc,1.6,.2,.6,10);fin.position.set(e*2.4,-.8,2.2);fin.rotation.z=e*.5;w.add(fin);const ck=sph(.25,'#FFB3C6',1,.5,.6,8);ck.position.set(e*2.0,-.25,3.8);w.add(ck)}
   const spM=new T.MeshStandardMaterial({color:'#DDF3FF',transparent:true,opacity:.75,roughness:.2});const spout=new T.Group();spout.position.set(0,1.5,2.4);w.add(spout);const col=new T.Mesh(new T.CylinderGeometry(.25,.12,3,10),spM);col.position.y=1.5;spout.add(col);const drops=[];for(let k=0;k<10;k++){const dp=new T.Mesh(new T.SphereGeometry(.3,8,6),spM);spout.add(dp);drops.push(dp)}
   w.scale.setScalar(1.25);root.add(w);movers.push(t=>{const a=t*.012+1.2;const R1=118,R2=124;w.position.set(CX+Math.cos(a)*R1,SEA-.75+Math.sin(t*.35)*.35,CZ+Math.sin(a)*R2);w.rotation.y=Math.atan2(-Math.sin(a)*R1,Math.cos(a)*R2);tail.rotation.x=Math.sin(t*.9)*.18;
    drops.forEach((dp,k)=>{const u=((t*.5+k/10)%1);dp.position.set(Math.cos(k*2.4)*u*1.2,3+u*1.4-u*u*2.2,Math.sin(k*2.4)*u*1.2);dp.scale.setScalar(1-u*.6)})})}
  // 熱帶魚：在四座主題島外的淺海，一群一群輪流跳出水面
  const fish=(c1,c2)=>{const g=new T.Group();const b=sph(.32,c1,.55,1,1.2,12);g.add(b);const st=sph(.33,c2,.56,1.01,.25,10);st.position.z=.1;g.add(st);const tl=new T.Mesh(new T.ConeGeometry(.3,.45,4),M(c2));tl.rotation.x=-Math.PI/2;tl.position.z=-.5;tl.scale.x=.3;g.add(tl);for(const e of[-1,1]){const ey=sph(.05,'#1A1A1A',1,1,1,6);ey.position.set(e*.16,.08,.25);g.add(ey)}g.scale.setScalar(1.3);return g};
  const FC=[['#FFD23F','#3B82C4'],['#FF8C42','#FFFFFF'],['#4CC9F0','#FFD23F'],['#F25F8C','#FFE5A8'],['#7BD389','#2E86AB']];
  for(let k=1;k<=4;k++){const I=isles[k];const a0=Math.atan2(I.z-CZ,I.x-CX);for(let n=0;n<6;n++){const f=fish(...FC[(n+k)%5]);f.userData.dyn=1;root.add(f);const a=a0+(n-2.5)*.09,r=I.r+9+(n%2)*1.4;const bx=I.x+Math.cos(a)*r,bz=I.z+Math.sin(a)*r;const off=n*.55+k;
    movers.push(t=>{const per=4.2;const u=((t+off)%per)/per;const air=u<.3;const k2=air?u/.3:0;f.visible=air;if(!air)return;const dx=-Math.sin(a),dz=Math.cos(a);f.position.set(bx+dx*(k2-.5)*2.4,SEA+.1+Math.sin(k2*Math.PI)*1.5,bz+dz*(k2-.5)*2.4);f.rotation.set(0,Math.atan2(dx,dz),0);f.rotateX(-Math.cos(k2*Math.PI)*.8)})}}
  // 海獅：礁石上頂著球，頭慢慢點
  const rock=()=>{const r=new T.Mesh(new T.DodecahedronGeometry(1.6,0),M('#A89A8A',{roughness:.9,flatShading:true}));r.scale.set(1.3,.55,1);return r};
  const seaLion=()=>{const g=new T.Group();const sc='#9C6B48';const b=sph(.75,sc,1,1.3,.9,14);b.position.y=.95;b.rotation.x=-.25;g.add(b);const hd=new T.Group();hd.position.set(0,2.05,.25);g.add(hd);const h=sph(.42,sc,1,.95,1.05,14);hd.add(h);const mz=sph(.24,'#C99A72',1.2,.8,.9,10);mz.position.set(0,-.08,.36);hd.add(mz);const ns=sph(.07,'#2A1A12',1,1,1,6);ns.position.set(0,0,.58);hd.add(ns);
   for(const e of[-1,1]){const ey=sph(.07,'#1A1A1A',1,1,1,6);ey.position.set(e*.18,.14,.33);hd.add(ey);const fl=sph(.32,sc,.4,.2,1,8);fl.position.set(e*.62,.45,.35);fl.rotation.z=e*.6;g.add(fl);for(let k=0;k<2;k++){const wh=cyl(.008,.008,.3,'#FFFFFF',3);wh.rotation.z=Math.PI/2;wh.position.set(e*.32,-.06-k*.06,.45);hd.add(wh)}}
   const ball=new T.Group();ball.position.set(0,.66,.5);hd.add(ball);const bl=sph(.34,'#FF5A5F',1,1,1,14);ball.add(bl);const bs=sph(.345,'#FFFFFF',1,.32,1,14);ball.add(bs);const by=sph(.345,'#3B82C4',.32,1,1,14);ball.add(by);g.userData={hd,ball};return g};
  [[0,1.7],[6,3.6],[3,4.3]].forEach(([k,a],n)=>{const I=isles[k];const r=I.r+(k===6?6:8.5);const x=I.x+Math.cos(a)*r,z=I.z+Math.sin(a)*r;const rk=rock();rk.position.set(x,SEA+.2,z);root.add(rk);const sl=seaLion();sl.userData.dyn=1;sl.position.set(x,SEA+.55,z);sl.rotation.y=Math.atan2(I.x-x,I.z-z)+Math.PI;root.add(sl);
   movers.push(t=>{const hd=sl.userData.hd,bl=sl.userData.ball;hd.rotation.x=Math.sin(t*1.1+n)*.12;hd.rotation.z=Math.sin(t*.7+n)*.08;bl.rotation.y=t*.8;bl.rotation.x=t*.5})});
  // 章魚：在淺水礁石旁探出頭，八隻腳慢慢擺
  const octo=col=>{const g=new T.Group();const hd=sph(.95,col,1,1.15,1,16);hd.position.y=.9;g.add(hd);for(const e of[-1,1]){const ew=sph(.22,'#FFFFFF',1,1,1,8);ew.position.set(e*.38,.75,.78);g.add(ew);const ep=sph(.11,'#1A1A1A',1,1,1,6);ep.position.set(e*.38,.75,.97);g.add(ep);const ck=sph(.14,'#FFB3C6',1,.5,.5,8);ck.position.set(e*.62,.45,.72);g.add(ck)}
   const legs=[];for(let k=0;k<8;k++){const a=k/8*Math.PI*2;const lg=new T.Group();lg.position.set(Math.cos(a)*.75,0,Math.sin(a)*.75);lg.rotation.y=-a;g.add(lg);const tt=new T.Mesh(new T.TorusGeometry(.5,.13,8,14,Math.PI),M(col));tt.position.x=.45;tt.rotation.x=Math.PI/2;lg.add(tt);legs.push(lg)}g.userData.legs=legs;return g};
  [[2,'#F28AB2',5.2],[4,'#FF9F5A',2.0]].forEach(([k,col,a],n)=>{const I=isles[k];const r=I.r+7.2;const x=I.x+Math.cos(a)*r,z=I.z+Math.sin(a)*r;const rk=rock();rk.scale.multiplyScalar(.6);rk.position.set(x+2,SEA+.1,z);root.add(rk);const o=octo(col);o.userData.dyn=1;o.position.set(x,SEA-.1,z);o.rotation.y=Math.atan2(I.x-x,I.z-z)+Math.PI;root.add(o);
   movers.push(t=>{o.position.y=SEA-.1+Math.sin(t*.9+n)*.12;o.userData.legs.forEach((lg,k)=>{lg.rotation.z=Math.sin(t*1.4+k*.8)*.35})})})}
 // ---------- 效能：把不會動的裝飾依材質合併，大幅減少手機要畫的物件數 ----------
 async function freeze(container){try{const U=await import('three/addons/utils/BufferGeometryUtils.js');const roots=Array.isArray(container)?container:[container];const groups=new Map(),drop=[];
  for(const rt of roots){rt.updateMatrixWorld(true);rt.traverse(o=>{if(!o.isMesh||o.isInstancedMesh)return;for(let q=o;q&&q!==rt.parent;q=q.parent){if(q.userData&&q.userData.dyn)return;if(q.visible===false)return}
   const m=o.material;if(Array.isArray(m)||m.isShaderMaterial||m.map||m.transparent)return;const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(o.matrixWorld);
   for(const k of Object.keys(g.attributes))if(!['position','normal'].includes(k))g.deleteAttribute(k);if(!g.attributes.normal)g.computeVertexNormals();
   if(!groups.has(m))groups.set(m,[]);groups.get(m).push(g);drop.push(o)})}
  for(const [m,list] of groups){const merged=U.mergeGeometries(list,false);if(!merged)continue;const mesh=new T.Mesh(merged,m);mesh.matrixAutoUpdate=false;scene.add(mesh);mesh.userData.wyFrozen=1;frozen.push(mesh)}
  drop.forEach(o=>{o.parent&&o.parent.remove(o);o.geometry.dispose()});return drop.length}catch(e){console.error('freeze',e);return 0}}
 const frozen=[];window.wySeaFreeze=()=>freeze(root);
 // ---------- 每格更新 ----------
 setTimeout(()=>{freeze(root);try{const bg=c.bridgeGroups?c.bridgeGroups():[];if(bg.length)freeze(bg)}catch(e){}},300);
 let t=0,last=performance.now();(function tick(){requestAnimationFrame(tick);const now=performance.now();const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;const inside=c.inside&&c.inside();root.visible=!inside;for(const f of frozen)f.visible=!inside;if(inside)return;for(const f of movers){try{f(t,dt)}catch(e){}}})();
window.wySeaReady=true;
 return root}
