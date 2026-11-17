// 德威陽｜有法度 v499 天空：德威陽小飛艇（常駐）、白天隨機驚喜（熱氣球、飛機拉布條、彩虹、風箏、紙飛機）、夜晚流星
// 同一時間最多一樣驚喜；夏天熱氣球與風箏出現機率較高。
export function setupSky(T, c, api){
 const scene=c.scene;const root=new T.Group();root.name='wySky';scene.add(root);
 const MC=new Map();const M=(col,o)=>{const k=col+(o?JSON.stringify(o):'');if(!MC.has(k))MC.set(k,new T.MeshStandardMaterial({color:col,roughness:.5,...(o||{})}));return MC.get(k)};
 const sph=(r,m,sx=1,sy=1,sz=1,s=24)=>{const o=new T.Mesh(new T.SphereGeometry(r,s,Math.max(8,s*.7|0)),typeof m==='string'?M(m):m);o.scale.set(sx,sy,sz);return o};
 const cyl=(a,b,h,m,s=16)=>new T.Mesh(new T.CylinderGeometry(a,b,h,s),typeof m==='string'?M(m):m);
 const ctex=(w,h,fn)=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;fn(cv.getContext('2d'),w,h);const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t};
 const GOLD=M('#F2C14E',{metalness:.4,roughness:.3});const OX=0,OZ=-50;
 const summer=window.wySeason==='summer';
 const ban2=(geo,mat)=>{const g=new T.Group();const a=new T.Mesh(geo,mat);const b=new T.Mesh(geo,mat);b.rotation.y=Math.PI;b.position.z=-.02;g.add(a,b);return g};
 // ---------- 常駐：德威陽小飛艇 ----------
 const banner=ctex(1024,128,(x,w,h)=>{x.fillStyle='#FFFFFF';x.fillRect(0,0,w,h);x.strokeStyle='#F2C14E';x.lineWidth=10;x.strokeRect(5,5,w-10,h-10);x.fillStyle='#1F3460';x.font='bold 64px "Noto Sans TC","PingFang TC",sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('有法度 YES, WE DO!',w/2,h/2+4)});
 const blimp=new T.Group();root.add(blimp);{const body=sph(3,'#1F3460',1,1,1.9);blimp.add(body);const band=new T.Mesh(new T.TorusGeometry(3.02,.12,8,40),GOLD);blimp.add(band);
  const lg=ctex(256,256,(x,w,h)=>{x.fillStyle='#F2C14E';x.beginPath();x.arc(128,128,124,0,7);x.fill();x.fillStyle='#1F3460';x.font='bold 120px Georgia,serif';x.textAlign='center';x.textBaseline='middle';x.fillText('WY',128,140)});
  for(const e of[-1,1]){const l=new T.Mesh(new T.CircleGeometry(1.4,32),new T.MeshStandardMaterial({map:lg,roughness:.4}));l.position.set(e*3.01,0,1);l.rotation.y=e*Math.PI/2;blimp.add(l)}
  for(const [rx,rz] of[[0,1],[1,0],[0,-1],[-1,0]]){const fin=new T.Mesh(new T.BoxGeometry(rx?2.2:.15,rz?2.2:.15,1.6),GOLD);fin.position.set(rx*1.0,rz*1.0,-5.4);blimp.add(fin)}
  const gond=new T.Mesh(new T.BoxGeometry(1.2,.7,2.4),M('#FFFFFF'));gond.position.set(0,-3.2,0);blimp.add(gond);const prop=new T.Group();prop.position.set(0,0,-6.1);blimp.add(prop);for(let k=0;k<3;k++){const b=new T.Mesh(new T.BoxGeometry(.18,1.6,.06),M('#333333'));b.rotation.z=k*Math.PI/1.5;prop.add(b)}blimp.userData.prop=prop;
  const bnG=new T.PlaneGeometry(14,1.75,16,1);const bn=ban2(bnG,new T.MeshStandardMaterial({map:banner,roughness:.6}));bn.position.set(0,-4.6,-12);bn.rotation.y=Math.PI/2;blimp.add(bn);blimp.userData.bn={geometry:bnG};const rope=cyl(.03,.03,6,'#888888',4);rope.rotation.x=Math.PI/2.4;rope.position.set(0,-4.1,-7.5);blimp.add(rope)}
 const bnPos=blimp.userData.bn.geometry.attributes.position,bnBase=bnPos.array.slice();
 // ---------- 隨機驚喜 ----------
 const balloonTex=c2=>ctex(64,128,(x,w,h)=>{const cols=c2;for(let k=0;k<8;k++){x.fillStyle=cols[k%cols.length];x.fillRect(k*w/8,0,w/8+1,h)}});
 function mkBalloon(cols,logo){const g=new T.Group();const env=new T.Mesh(new T.SphereGeometry(3,24,18),new T.MeshStandardMaterial({map:balloonTex(cols),roughness:.5}));env.scale.y=1.15;env.position.y=4;g.add(env);if(logo){const lg=ctex(128,128,(x)=>{x.fillStyle='#1F3460';x.beginPath();x.arc(64,64,60,0,7);x.fill();x.fillStyle='#F2C14E';x.font='bold 54px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText('WY',64,70)});const l=new T.Mesh(new T.CircleGeometry(1.3,24),new T.MeshStandardMaterial({map:lg}));l.position.set(0,4,3.02);g.add(l)}
  const bask=new T.Mesh(new T.BoxGeometry(1.1,.8,1.1),M('#B07A4A'));bask.position.y=-.4;g.add(bask);for(const [x,z] of[[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5]]){const r=cyl(.02,.02,1.8,'#7A5A3A',4);r.position.set(x,.6,z);g.add(r)}return g}
 function mkPlane(){const g=new T.Group();const body=sph(.9,'#FFFFFF',1,.8,2.6);g.add(body);const wing=new T.Mesh(new T.BoxGeometry(7,.18,1.2),M('#E23B2E'));wing.position.set(0,0,.3);g.add(wing);const tail=new T.Mesh(new T.BoxGeometry(2.4,.14,.7),M('#E23B2E'));tail.position.set(0,.2,-2.1);g.add(tail);const fin=new T.Mesh(new T.BoxGeometry(.14,1,.8),M('#1F3460'));fin.position.set(0,.6,-2.1);g.add(fin);const prop=new T.Mesh(new T.BoxGeometry(1.6,.12,.05),M('#333'));prop.position.z=2.4;g.add(prop);g.userData.prop=prop;
  const bt=ctex(1024,128,(x,w,h)=>{x.fillStyle='#FFF6D8';x.fillRect(0,0,w,h);x.strokeStyle='#E23B2E';x.lineWidth=8;x.strokeRect(4,4,w-8,h-8);x.fillStyle='#1F3460';x.font='bold 66px "Noto Sans TC",sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('德威陽 有法度',w/2,h/2+4)});const bG=new T.PlaneGeometry(12,1.6,16,1);const bn=ban2(bG,new T.MeshStandardMaterial({map:bt}));bn.position.set(0,0,-9.5);bn.rotation.y=Math.PI/2;g.add(bn);g.userData.bn={geometry:bG};return g}
 function mkKite(col){const g=new T.Group();g.scale.setScalar(1.5);const sh=new T.Shape();sh.moveTo(0,1.6);sh.lineTo(1.1,0);sh.lineTo(0,-1.9);sh.lineTo(-1.1,0);sh.closePath();const k=new T.Mesh(new T.ShapeGeometry(sh),M(col,{side:T.DoubleSide}));g.add(k);const x2=new T.Mesh(new T.BoxGeometry(2.2,.06,.06),M('#7A5A3A'));g.add(x2);const tails=[];for(let i=0;i<6;i++){const b=new T.Mesh(new T.PlaneGeometry(.35,.25),M(['#F2C14E','#1F3460','#FFFFFF'][i%3],{side:T.DoubleSide}));b.position.y=-2.2-i*.55;g.add(b);tails.push(b)}g.userData.tails=tails;return g}
 function mkPaper(){const g=new T.Group();const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute([0,0,2.4, -1.6,.1,-1.4, 0,-.3,-1.2, 0,0,2.4, 1.6,.1,-1.4, 0,-.3,-1.2],3));geo.computeVertexNormals();g.add(new T.Mesh(geo,M('#FFFFFF',{side:T.DoubleSide})));const st=new T.Mesh(new T.BoxGeometry(.08,.1,3.2),M('#3B7DD8'));st.position.set(0,-.1,.4);g.add(st);g.scale.setScalar(1.8);return g}
 function mkRainbow(){const g=new T.Group();const cols=['#FF6B6B','#FFA94D','#FFE066','#8CE99A','#74C0FC','#B197FC'];cols.forEach((cl,i)=>{const r=new T.Mesh(new T.TorusGeometry(70-i*2.2,1.1,8,64,Math.PI),new T.MeshBasicMaterial({color:cl,transparent:true,opacity:0,depthWrite:false,fog:false}));g.add(r)});g.position.set(OX,-8,OZ-90);return g}
 let ev=null,evCd=40;const kinds=()=>{const base=['balloon','plane','rainbow','kite','paper'];return summer?base.concat(['balloon','kite']):base};
 function startEvent(k0){const k=k0||kinds()[Math.floor(Math.random()*kinds().length)];const g=new T.Group();root.add(g);const e={k,g,t:0,dur:40,items:[]};
  if(k==='balloon'){const sets=[[['#FFB3C6','#FFFFFF'],0],[['#BDE7FF','#FFFFFF'],1],[['#FFE08A','#FFFFFF'],0]];sets.forEach(([cl,lg],i)=>{const b=mkBalloon(cl,!!lg);b.userData.o=[i*16-16,30+i*4,-30-i*12];g.add(b);e.items.push(b)});e.dur=50}
  else if(k==='plane'){const p=mkPlane();g.add(p);e.items.push(p);e.dur=26}
  else if(k==='rainbow'){const r=mkRainbow();g.add(r);e.items.push(r);e.dur=32}
  else if(k==='kite'){for(let i=0;i<3;i++){const kt=mkKite(['#E23B2E','#3B7DD8','#F2C14E'][i]);kt.userData.o=[-22+i*20,26+i*3,30];g.add(kt);e.items.push(kt)}e.dur=45}
  else if(k==='paper'){const p=mkPaper();g.add(p);e.items.push(p);e.dur=22}
  ev=e}
 function endEvent(){root.remove(ev.g);ev.g.traverse(o=>{if(o.geometry)o.geometry.dispose()});ev=null;evCd=(summer?40:60)+Math.random()*40}
 // ---------- 夜晚流星 ----------
 const meteorM=new T.MeshBasicMaterial({color:'#FFF6D8',transparent:true,opacity:0,fog:false,depthWrite:false,blending:T.AdditiveBlending});const meteor=new T.Mesh(new T.CylinderGeometry(.05,.5,26,6),meteorM);root.add(meteor);let mCd=12,mT=-1,mFrom=new T.Vector3(),mDir=new T.Vector3();
 let tt=0;
 window.__wySky={start:k=>{if(ev)endEvent();startEvent(k);ev.t=ev.dur*.45},meteor:()=>{mCd=0},blimp,cur:()=>ev,meteorMesh:meteor};
 return function tick(dt){tt+=dt;const ins=c.inside&&c.inside();root.visible=!ins;if(ins)return;const ph=api.phase();const t=tt;
  // 飛艇
  {const a=t*.035;blimp.position.set(OX+Math.cos(a)*95,40+Math.sin(t*.4)*1.5,OZ+Math.sin(a)*70);blimp.rotation.y=-a;blimp.rotation.z=Math.sin(t*.4)*.03;blimp.userData.prop.rotation.z+=dt*8;for(let i=0;i<bnPos.count;i++){const xx=bnBase[i*3];bnPos.setZ(i,Math.sin(t*3+xx*.6)*.25)}bnPos.needsUpdate=true}
  // 白天驚喜
  if(ph!=='night'){if(!ev){evCd-=dt;if(evCd<=0)startEvent()}}
  if(ev){ev.t+=dt;const u=ev.t/ev.dur;const k=ev.k;
   if(k==='balloon')ev.items.forEach((b,i)=>{const o=b.userData.o;b.position.set(o[0]-60+u*130,o[1]+Math.sin(t*.5+i)*1.5,o[2]+OZ*0)});
   else if(k==='plane'){const p=ev.items[0];const a=-1+u*2;p.position.set(a*120,36,OZ-10+Math.sin(u*3)*10);p.rotation.y=Math.PI/2;p.userData.prop.rotation.z+=dt*25;const bp=p.userData.bn.geometry.attributes.position;for(let i=0;i<bp.count;i++)bp.setZ(i,Math.sin(t*5+bp.getX(i)*.7)*.3);bp.needsUpdate=true}
   else if(k==='rainbow'){const r=ev.items[0];const op=Math.min(1,Math.min(ev.t/4,(ev.dur-ev.t)/4))*.55;r.children.forEach(m=>m.material.opacity=Math.max(0,op))}
   else if(k==='kite')ev.items.forEach((kt,i)=>{const o=kt.userData.o;kt.position.set(o[0]+Math.sin(t*.4+i)*4,o[1]+Math.sin(t*.9+i)*2,o[2]);kt.rotation.z=Math.sin(t*1.3+i)*.3;kt.userData.tails.forEach((b,j)=>{b.position.x=Math.sin(t*3-j*.6)*.35*j})});
   else if(k==='paper'){const p=ev.items[0];const a=u*Math.PI*2;p.position.set(Math.cos(a)*30,22+Math.sin(a*2)*3,3.5+Math.sin(a)*24);p.rotation.y=-a;p.rotation.z=Math.sin(a*2)*.3}
   if(ev.t>=ev.dur)endEvent()}
  // 流星
  if(ph==='night'){if(mT<0){mCd-=dt;if(mCd<=0){mT=0;mCd=18+Math.random()*25;mFrom.set(-80+Math.random()*160,95+Math.random()*25,-220-Math.random()*60);mDir.set(.6+Math.random()*.4,-.45,.1).normalize()}}}
  if(mT>=0){mT+=dt;const p=mFrom.clone().addScaledVector(mDir,mT*90);meteor.position.copy(p);meteor.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),mDir.clone().negate());meteorM.opacity=Math.max(0,1-mT/1.1)*.9;if(mT>1.1){mT=-1;meteorM.opacity=0}}
 };
}
