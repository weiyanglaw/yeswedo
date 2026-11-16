// 德威陽｜有法度 v494 沖繩海上熱鬧版：翡翠漸層海、白沙灘、椰子樹、扶桑花、城堡島重做（草地＋廣場＋橋頭）、
// 中間的骨牌花田 Logo、可愛的船／海鷗／遊客／攤位、遠方小島。
export function setupSea(T, c){
 const scene=c.scene, xy=c.xy, G=c.groups(), CEN=c.center, SEA=-1.25;
 const MC=new Map();const M=(col,o)=>{const k=col+(o?JSON.stringify(o):'');if(!MC.has(k))MC.set(k,new T.MeshStandardMaterial({color:col,roughness:.62,...(o||{})}));return MC.get(k)};
 const gold=M('#F0C75E',{metalness:.5,roughness:.3}),navy=M('#1F3460',{roughness:.5}),white=M('#FFFFFF');
 const sph=(r,m,sx=1,sy=1,sz=1,seg=16)=>{const o=new T.Mesh(new T.SphereGeometry(r,seg,Math.max(8,seg*.75|0)),typeof m==='string'?M(m):m);o.scale.set(sx,sy,sz);return o};
 const cyl=(rt,rb,h,m,seg=12)=>new T.Mesh(new T.CylinderGeometry(rt,rb,h,seg),typeof m==='string'?M(m):m);
 const root=new T.Group();root.name='wySea';scene.add(root);const movers=[];
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
 const bench=(x,z,ry)=>{const b=new T.Group();b.position.set(x,1.55,z);b.rotation.y=ry;const seat=new T.Mesh(new T.BoxGeometry(2.6,.18,.8),M('#C98F5A'));seat.position.y=.7;b.add(seat);const back=new T.Mesh(new T.BoxGeometry(2.6,.7,.12),M('#C98F5A'));back.position.set(0,1.15,-.35);b.add(back);for(const s of [-1,1]){const lg=new T.Mesh(new T.BoxGeometry(.14,.7,.7),navy);lg.position.set(s*1.1,.35,0);b.add(lg)}root.add(b);c.addSolid&&c.addSolid(x,z,ry?0.5:1.4,ry?1.4:0.5)};
 bench(-13.6,10,Math.PI/2);bench(13.6,10,-Math.PI/2);
 const tree=(x,z,s=1)=>{const t=new T.Group();t.position.set(x,1.5,z);t.scale.setScalar(s);const tr=cyl(.35,.5,2.4,'#9B6B43',10);tr.position.y=1.2;t.add(tr);const c1=sph(2.1,'#57A863',1,1.1,1,20);c1.position.y=3.6;t.add(c1);const c2=sph(1.5,'#67B970');c2.position.set(.9,4.6,.6);t.add(c2);
  for(let k=0;k<5;k++){const f=sph(.26,k%2?'#FFC4D6':'#FFFFFF',1,1,1,10);const a=k*1.4;f.position.set(Math.cos(a)*1.95,3.5+Math.sin(k)*.6,Math.sin(a)*1.95);t.add(f)}root.add(t);c.addSolid&&c.addSolid(x,z,.6*s,.6*s)};
 [[25,19],[45,19.5],[135,19.5],[155,19],[70,20.5],[110,20.5]].forEach(([deg,r],i)=>{const a=deg*Math.PI/180;tree(CC.x+Math.cos(a)*r,CC.z+Math.sin(a)*r,.85+(i%3)*.1)});
 const bed=(x,z)=>{const cols=['#FFB3CB','#FFFFFF','#FFF1D6','#F6D27A'];for(let k=0;k<9;k++){const a=k*2.4,r=.4+k*.18;const fl=sph(.32,cols[k%4],1,1,1,10);fl.position.set(x+Math.cos(a)*r,1.95,z+Math.sin(a)*r);root.add(fl);const lf=sph(.38,'#4FA54E',1,.5,1,8);lf.position.set(x+Math.cos(a)*r,1.7,z+Math.sin(a)*r);root.add(lf)}};
 [[-15.5,17],[15.5,17],[-6.5,24],[6.5,24]].forEach(([x,z])=>bed(x,z));
 for(let i=0;i<30;i++){const a=Math.PI*.12+i/29*Math.PI*.76;const r=CC.r-.6;const x=CC.x+Math.cos(a)*r,z=CC.z+Math.sin(a)*r;if(Math.abs(x)<3.5)continue;const ps=cyl(.13,.13,1.0,navy,8);ps.position.set(x,2.05,z);root.add(ps);const cp=sph(.2,gold,1,1,1,8);cp.position.set(x,2.62,z);root.add(cp)}
 // ---------- 3) 橋頭：石板平台＋兩根深藍金燈柱 ----------
 (window.wyLinks||[]).forEach(L=>{[L.pts[0],L.pts[L.pts.length-1]].forEach((p,j)=>{const q=j?L.pts[L.pts.length-2]:L.pts[1];const ang=Math.atan2(q[0]-p[0],q[2]-p[2]);const head=new T.Group();head.position.set(p[0],p[1]+.86,p[2]);head.rotation.y=ang;root.add(head);
  for(const s of [-1,1]){const pl=new T.Group();pl.position.set(s*5.3,-.3,0);head.add(pl);const pp=cyl(.22,.3,3.8,navy,12);pp.position.y=1.9;pl.add(pp);const rg=new T.Mesh(new T.TorusGeometry(.32,.08,6,16),gold);rg.rotation.x=Math.PI/2;rg.position.y=2.9;pl.add(rg);
   const lt=sph(.55,M('#FFF4D2',{emissive:'#FFD98A',emissiveIntensity:.7}),1,1,1,14);lt.position.y=4.2;pl.add(lt);const cp=new T.Mesh(new T.ConeGeometry(.5,.45,10),navy);cp.position.y=4.85;pl.add(cp)}})});
 // ---------- 4) 中間的骨牌花田 Logo 島 ----------
 const CG=new T.Group();CG.position.set(CEN.x,0,CEN.z);CG.userData.dyn=1;root.add(CG);
 const cTop=cyl(CEN.r,CEN.r-.4,1.2,'#9FDB82',64);cTop.position.y=CEN.top-.6;CG.add(cTop);const cSide=cyl(CEN.r-.3,CEN.r-.6,2.6,'#F3E6C8',64);cSide.position.y=-.7;CG.add(cSide);
 const cRim=new T.Mesh(new T.TorusGeometry(CEN.r-.05,.18,6,96),gold);cRim.rotation.x=Math.PI/2;cRim.position.y=CEN.top+.02;CG.add(cRim);
 let fieldSet=null;
 (async()=>{try{const img=await new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src='ground-logo-cropped.png'});
  const CROP=.8,GW=74,GH=Math.round(91*CROP);const cv=document.createElement('canvas');cv.width=GW;cv.height=GH;const cx=cv.getContext('2d');cx.drawImage(img,0,0,img.width,img.height*CROP,0,0,GW,GH);const px=cx.getImageData(0,0,GW,GH).data;
  const W=(CEN.r-2.2)*2,H=W*GH/GW,sx=W/GW,sz=H/GH;const cells=[];for(let j=0;j<GH;j++)for(let i=0;i<GW;i++){const x=-W/2+(i+.5)*sx,z=-H/2+(j+.5)*sz;if(x*x+z*z>(CEN.r-2.2)**2)continue;const k=(j*GW+i)*4;const on=px[k+3]>100&&(px[k]+px[k+1]+px[k+2])<640;cells.push({x,z,on,ph:Math.random()*6})}
  const N=cells.length;const stemGeo=new T.CylinderGeometry(.03,.04,.85,5);stemGeo.translate(0,.42,0);const headGeo=new T.SphereGeometry(.17,8,6);headGeo.translate(0,.95,0);
  const stems=new T.InstancedMesh(stemGeo,M('#5E9E4A'),N),heads=new T.InstancedMesh(headGeo,new T.MeshStandardMaterial({color:'#ffffff',roughness:.6}),N);stems.position.y=CEN.top;heads.position.y=CEN.top;CG.add(stems,heads);
  const cIdle=new T.Color('#FFFFFF'),cOn=new T.Color('#F5BE3C'),cOff=new T.Color('#FFF7F2');const m=new T.Matrix4(),q=new T.Quaternion(),e=new T.Euler(),v=new T.Vector3(),s=new T.Vector3(1,1,1),col=new T.Color();
  fieldSet=(tt,t)=>{for(let k=0;k<N;k++){const p=cells[k];let f;if(tt<6){const front=-W/2-1.5+(tt-.3)/2.4*(W+3);f=Math.min(1,Math.max(0,(front-p.x)/1.4))}else{const front=-W/2-1.5+(tt-6)/2.4*(W+3);f=1-Math.min(1,Math.max(0,(front-p.x)/1.4))}
    e.set(0,0,-(f*1.32+Math.sin(t*2+p.ph)*.05*(1-f)));q.setFromEuler(e);v.set(p.x,0,p.z);m.compose(v,q,s);stems.setMatrixAt(k,m);heads.setMatrixAt(k,m);col.copy(cIdle).lerp(p.on?cOn:cOff,Math.min(1,f*1.6));heads.setColorAt(k,col)}
   stems.instanceMatrix.needsUpdate=true;heads.instanceMatrix.needsUpdate=true;heads.instanceColor.needsUpdate=true};
  fieldSet(0,0);window.wyFieldGroup=CG;window.__wyFieldSet=tt=>fieldSet(tt,0)}catch(err){console.error('field',err)}})();
 let fieldT=-1,fieldNext=40;window.wyFieldPlay=()=>{if(fieldT<0)fieldT=0};
 movers.push((t,dt)=>{if(!fieldSet)return;if(fieldT>=0){fieldT+=dt;fieldSet(fieldT,t);if(fieldT>8.8){fieldT=-1;fieldSet(0,t)}}else{fieldNext-=dt;if(fieldNext<=0){fieldNext=150;fieldT=0}}});
 try{const el=c.renderer.domElement,rc=new T.Raycaster(),vv=new T.Vector2();el.addEventListener('pointerdown',ev=>{if(c.inside&&c.inside())return;const r=el.getBoundingClientRect();vv.set(((ev.clientX-r.left)/r.width)*2-1,-((ev.clientY-r.top)/r.height)*2+1);rc.setFromCamera(vv,c.camera);if(rc.intersectObject(CG,true).length)window.wyFieldPlay()})}catch(e){}
 // ---------- 5) 沙灘、浪花、椰子樹、扶桑花 ----------
 const palm=()=>{const p=new T.Group();const lean=(Math.random()-.5)*.4;const tr=cyl(.22,.38,5.2,'#B98A5E',8);tr.position.y=2.6;tr.rotation.z=lean;p.add(tr);for(let l=0;l<7;l++){const lf=sph(1,'#4FB46A',2.3,.18,.7,10);const la=l/7*Math.PI*2;lf.position.set(Math.cos(la)*1.6+lean*-2.6,5.2,Math.sin(la)*1.6);lf.rotation.y=-la;lf.rotation.z=-.35;p.add(lf)}for(let k=0;k<3;k++){const co=sph(.3,'#8A6A3A',1,1,1,8);co.position.set(lean*-2.6+Math.cos(k*2)*.4,4.9,Math.sin(k*2)*.4);p.add(co)}return p};
 const hibiscus=()=>{const h=new T.Group();const bush=sph(1.1,'#3F9D55',1,.7,1,12);h.add(bush);for(let f=0;f<5;f++){const fl=sph(.32,f%2?'#FF5E7E':'#FF8FA3',1,1,1,10);fl.position.set(Math.cos(f*1.3)*.85,.45,Math.sin(f*1.3)*.85);h.add(fl)}return h};
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
 const boat=(hull,sail,flag)=>{const g=new T.Group();const h=new T.Mesh(new T.SphereGeometry(1,20,14,0,Math.PI*2,Math.PI/2,Math.PI/2),M(hull));h.scale.set(1.5,1.1,3.2);h.position.y=.6;g.add(h);const deck=cyl(1,1,.2,'#F7E3C2',20);deck.scale.set(1.45,1,3.1);deck.position.y=.62;g.add(deck);
  const mast=cyl(.09,.09,5,'#8A5A36',8);mast.position.y=3.1;g.add(mast);const s=sph(1.6,sail,.28,1.55,1.05);s.position.set(0,3.1,.75);g.add(s);const fl=new T.Mesh(new T.ConeGeometry(.45,1.1,3),M(flag));fl.rotation.z=-Math.PI/2;fl.position.set(.5,5.4,0);g.add(fl);const cab=new T.Mesh(new T.BoxGeometry(1.4,.9,1.2),white);cab.position.set(0,1.1,-1.5);g.add(cab);for(const e of [-1,1]){const ey=sph(.12,'#1A1A1A',1,1.2,1,8);ey.position.set(e*.45,.75,2.95);g.add(ey);const hl=sph(.04,'#FFFFFF',1,1,1,6);hl.position.set(e*.45+.04,.8,3.05);g.add(hl);const ck=sph(.12,'#FFB3C6',1,.6,.5,8);ck.position.set(e*.75,.6,2.8);g.add(ck)}const sm=new T.Mesh(new T.TorusGeometry(.18,.035,6,12,Math.PI),M('#1A1A1A'));sm.rotation.z=Math.PI;sm.position.set(0,.55,3.02);g.add(sm);const lr=new T.Mesh(new T.TorusGeometry(.35,.12,8,16),M('#FF6B6B'));lr.position.set(1.42,.9,-.2);lr.rotation.y=Math.PI/2;g.add(lr);return g};
 [['#FFFFFF','#FFB7CF','#1F3460'],['#1F3460','#FFFFFF','#F0C75E'],['#FFE6A0','#FFFFFF','#E86A5A'],['#7FD0F2','#FFFFFF','#1F3460'],['#FFFFFF','#FFE6A0','#E86A5A']].forEach((cc,i)=>{const b=boat(...cc);b.scale.setScalar(1.4);b.userData.dyn=1;root.add(b);const Rx=96+i*9,Rz=118+i*9,ph=i*1.25,sp=.022+i*.003;movers.push(t=>{const a=ph+t*sp;b.position.set(OX+Math.cos(a)*Rx,SEA+Math.sin(t*1.6+i)*.15,OZ+Math.sin(a)*Rz);b.rotation.y=-a;b.rotation.z=Math.sin(t*1.3+i)*.05})});
 for(let i=0;i<9;i++){const g=new T.Group();g.add(sph(.55,'#FFFFFF',1,.85,1.3,10));const hd=sph(.38,'#FFFFFF',1,1,1,10);hd.position.set(0,.35,.6);g.add(hd);const bk=new T.Mesh(new T.ConeGeometry(.12,.38,8),M('#F7B733'));bk.rotation.x=Math.PI/2;bk.position.set(0,.3,1.02);g.add(bk);for(const s of [-1,1]){const ey=sph(.06,'#1A1A1A',1,1,1,6);ey.position.set(s*.17,.45,.9);g.add(ey)}
  const wl=sph(.5,'#F2F5FA',1.7,.18,.75,10),wr=wl.clone();wl.position.set(-.85,.1,0);wr.position.set(.85,.1,0);g.add(wl,wr);g.scale.setScalar(1.3);g.userData.dyn=1;root.add(g);const Rr=40+i*10,ph=i*.8,hh=18+(i%3)*5;
  movers.push(t=>{const a=ph+t*.16;g.position.set(OX+Math.cos(a)*Rr,hh+Math.sin(t*2+i)*.8,OZ+Math.sin(a)*Rr*1.2);g.rotation.y=-a+Math.PI;const f=Math.sin(t*7+i)*.5;wl.rotation.z=f;wr.rotation.z=-f})}
 const umbrella=(x,z,c1,c2)=>{const g=new T.Group();g.position.set(x,SEA+1.05,z);g.scale.setScalar(1.25);const pole=cyl(.07,.07,3.1,white,8);pole.position.y=1.55;g.add(pole);for(let k=0;k<8;k++){const seg=new T.Mesh(new T.SphereGeometry(2,8,6,k/8*Math.PI*2,Math.PI*2/8,0,Math.PI/2.6),M(k%2?c1:c2,{side:T.DoubleSide}));seg.scale.y=.5;seg.position.y=2.6;g.add(seg)}
  const ln=new T.Mesh(new T.BoxGeometry(1,.16,2.4),white);ln.position.set(1.6,.32,.3);ln.rotation.x=-.15;g.add(ln);const tw=new T.Mesh(new T.BoxGeometry(.9,.04,2),M(c1));tw.position.set(1.6,.43,.3);tw.rotation.x=-.15;g.add(tw);root.add(g)};
 const stall=(x,z,col,label)=>{const g=new T.Group();g.position.set(x,SEA+1.05,z);g.scale.setScalar(1.25);const cnt=new T.Mesh(new T.BoxGeometry(3.4,1.2,1.5),white);cnt.position.y=.6;g.add(cnt);const trim=new T.Mesh(new T.BoxGeometry(3.5,.14,1.6),navy);trim.position.y=1.25;g.add(trim);
  for(let k=0;k<6;k++){const aw=new T.Mesh(new T.CylinderGeometry(.62,.62,.6,14,1,false,0,Math.PI),M(k%2?'#FFFFFF':col));aw.rotation.z=Math.PI/2;aw.rotation.y=Math.PI/2;aw.position.set(-1.5+k*.6,2.7,.35);g.add(aw)}for(const s of [-1,1]){const p=cyl(.07,.07,1.6,gold,8);p.position.set(s*1.6,1.9,.55);g.add(p)}
  const cv=document.createElement('canvas');cv.width=256;cv.height=96;const x2=cv.getContext('2d');x2.fillStyle='#1F3460';x2.fillRect(0,0,256,96);x2.strokeStyle='#F0C75E';x2.lineWidth=8;x2.strokeRect(4,4,248,88);x2.fillStyle='#FFE7B0';x2.font='bold 54px sans-serif';x2.textAlign='center';x2.textBaseline='middle';x2.fillText(label,128,50);const tx=new T.CanvasTexture(cv);tx.colorSpace=T.SRGBColorSpace;
  const sign=new T.Mesh(new T.PlaneGeometry(1.8,.68),new T.MeshBasicMaterial({map:tx}));sign.position.set(0,3.45,.4);g.add(sign);for(let k=0;k<3;k++){const cup=cyl(.18,.13,.4,['#FF8FA3','#FFE27A','#7FD0F2'][k],10);cup.position.set(-.6+k*.6,1.42,.3);g.add(cup);const tp=sph(.2,white,1,1,1,8);tp.position.set(cup.position.x,1.7,.3);g.add(tp)}root.add(g)};
 const ring=(x,z,col)=>{const r=new T.Mesh(new T.TorusGeometry(.75,.3,10,18),M(col));r.rotation.x=Math.PI/2;r.position.set(x,SEA+.12,z);r.userData.dyn=1;root.add(r);movers.push(t=>{r.position.y=SEA+.12+Math.sin(t*2+x)*.12;r.rotation.z=t*.2})};
 const FZ=CC.z+CC.r+3.6;const UC=[['#FF8FA3','#FFFFFF'],['#1F3460','#FFFFFF'],['#FFD36E','#FFFFFF'],['#7FD0F2','#FFFFFF'],['#F0C75E','#1F3460']];
 for(let k=0;k<9;k++){const x=-27+k*6.8;if(Math.abs(x)<5)continue;umbrella(x,FZ-Math.abs(x)*.18+Math.sin(k)*1.1,...UC[k%5])}
 stall(-12,FZ-4.4,'#FF8FA3','刨冰');stall(12,FZ-4.4,'#7FD0F2','果汁');
 for(let k=0;k<6;k++)ring(-22+k*9,FZ+6+(k%2)*2.5,['#FF8FA3','#FFD36E','#7FD0F2','#B8E986','#FFFFFF','#F0C75E'][k]);
 const p0=new T.Vector3(-24,SEA+6.5,FZ-2.4),p1=new T.Vector3(24,SEA+6.5,FZ-2.4);const bc=['#FF8FA3','#FFD36E','#7FD0F2','#FFFFFF','#1F3460','#F0C75E'];
 for(let k=0;k<=26;k++){const t=k/26;const p=p0.clone().lerp(p1,t);p.y-=Math.sin(t*Math.PI)*1.8;const f=new T.Mesh(new T.ConeGeometry(.42,.85,3),M(bc[k%6]));f.rotation.x=Math.PI;f.position.copy(p);f.position.y-=.48;root.add(f);const bl=sph(.17,M('#FFF4D2',{emissive:'#FFD98A',emissiveIntensity:.9}),1,1,1,8);bl.position.copy(p);root.add(bl)}
 for(const x of [-24,24]){const pl=cyl(.2,.26,7.6,navy,10);pl.position.set(x,SEA+3.8,FZ-2.4);root.add(pl);const k=sph(.3,gold,1,1,1,10);k.position.set(x,SEA+7.7,FZ-2.4);root.add(k)}
 (async()=>{try{const mod=await import('./chibi-avatar.js?v=477');const A=c.actor();const ab=new T.Box3().setFromObject(A);const H=ab.max.y-ab.min.y||1.6;
  const hairs=['short','bob','twin','pony','buns','curly'],hc=['black','brown','chestnut','blonde'],sk=['light','fair','tan'],of=['casual','dress','sport','student','casual'];
  const spots=[[-20,FZ+1.2,1],[-13,FZ+2.4,1],[-7,FZ,0],[7,FZ+.6,1],[15,FZ+2.6,1],[21,FZ-.4,0],[-17,FZ-3.4,0],[17,FZ-3.4,0],[-7.5,15,1],[7.5,15.5,0]];
  spots.forEach(([x,z,mv],n)=>{const ch=mod.buildChibi(T,{gender:n%2?'female':'male',skin:sk[n%3],hair:hairs[n%6],hairColor:hc[n%4],outfit:of[n%5],accessory:'none'});const g=new T.Group();g.userData.dyn=1;g.add(ch.group);const bb=new T.Box3().setFromObject(ch.group);ch.group.scale.multiplyScalar(H/((bb.max.y-bb.min.y)||1));
   const y0=z>CC.z+CC.r?SEA+1.05:1.6;g.position.set(x,y0,z);g.rotation.y=(n*1.7)%6.28;root.add(g);movers.push(t=>{if(mv){g.position.x=x+Math.sin(t*.45+n)*2.2;g.rotation.y=Math.cos(t*.45+n)>0?Math.PI/2:-Math.PI/2;g.position.y=y0+Math.abs(Math.sin(t*5+n))*.1}try{ch.tick&&ch.tick(t*1000)}catch(e){}})})}catch(e){console.error('visitors',e)}})();

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
 return root}
