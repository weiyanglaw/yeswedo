// v507 島名立牌＋相機（21:26 定稿，照陳老闆參考圖）：城堡＋四島，各島整支換成島色；相機旁走近浮出「拍照」
// setupSignCams(T,{scene,groups,xy,center,groundY,walkAllowed,addSolid,actor,inside,onPhoto})
export function setupSignCams(T,O){
const env=(()=>{const c=document.createElement('canvas');c.width=512;c.height=256;const g=c.getContext('2d');const gr=g.createLinearGradient(0,0,0,256);gr.addColorStop(0,'#FFFFFF');gr.addColorStop(.45,'#FFF2D8');gr.addColorStop(.55,'#D8B57E');gr.addColorStop(1,'#9A7A48');g.fillStyle=gr;g.fillRect(0,0,512,256);g.fillStyle='rgba(255,255,255,.95)';for(let k=0;k<6;k++)g.fillRect(k*86+20,20,26,90);const t=new T.CanvasTexture(c);t.mapping=T.EquirectangularReflectionMapping;t.colorSpace=T.SRGBColorSpace;return t})();
const gold=new T.MeshPhysicalMaterial({color:'#F6D693',metalness:.78,roughness:.14,clearcoat:1,clearcoatRoughness:.05,emissive:'#A27A36',emissiveIntensity:.28,envMap:env,envMapIntensity:1.4});
const ISL=[['城堡','#1E2A4F','castle'],['訴訟島','#5A3420','scale'],['醫療島','#1F4A33','med'],['家庭島','#7E1E2A','home'],['企業島','#3E2160','biz']];
const logo=new Image();logo.src='./office-logo-transparent.png';const onLogo=[];logo.onload=()=>onLogo.forEach(f=>f());
const add=(p,geo,m,x=0,y=0,z=0)=>{const o=new T.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;p.add(o);return o};
const RB=(w,h,d,r,bev=.04)=>{const s=new T.Shape(),a=-w/2,b=-h/2;s.moveTo(a+r,b);s.lineTo(-a-r,b);s.quadraticCurveTo(-a,b,-a,b+r);s.lineTo(-a,-b-r);s.quadraticCurveTo(-a,-b,-a-r,-b);s.lineTo(a+r,-b);s.quadraticCurveTo(a,-b,a,-b-r);s.lineTo(a,b+r);s.quadraticCurveTo(a,b,a+r,b);const g=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelThickness:bev,bevelSize:bev,bevelSegments:3,curveSegments:8});g.translate(0,0,-d/2);return g};
// 立牌外形：下方圓角、上方兩段弧形拱頂（像圖上的牌子）
function signShape(w,h,inset=0){const s=new T.Shape(),a=-w/2+inset,b=-w/2,top=h/2-inset,bot=-h/2+inset,r=.18-inset*.5;
 s.moveTo(a+r,bot);s.lineTo(-a-r,bot);s.quadraticCurveTo(-a,bot,-a,bot+r);s.lineTo(-a,top-.55);
 s.quadraticCurveTo(-a,top-.3,-a-.2,top-.22);s.quadraticCurveTo(0+.05,top+.02,0,top);s.quadraticCurveTo(-.05,top+.02,a+.2,top-.22);s.quadraticCurveTo(a,top-.3,a,top-.55);
 s.lineTo(a,bot+r);s.quadraticCurveTo(a,bot,a+r,bot);return s}
function drawIcon(g,kind,cx,cy,s){g.fillStyle='#F2D28A';g.strokeStyle='#F2D28A';g.lineJoin='round';g.lineCap='round';
 if(kind==='castle'){g.fillRect(cx-70*s,cy-10*s,140*s,70*s);for(const x of[-70,-24,24])g.fillRect(cx+(x)*s,cy-40*s,46*s,32*s);g.fillRect(cx-18*s,cy-70*s,36*s,62*s);for(const x of[-60,-40,-20,0,20,40]){}g.beginPath();g.moveTo(cx-22*s,cy-70*s);g.lineTo(cx,cy-100*s);g.lineTo(cx+22*s,cy-70*s);g.fill();g.lineWidth=4*s;g.beginPath();g.moveTo(cx,cy-100*s);g.lineTo(cx,cy-128*s);g.stroke();g.beginPath();g.moveTo(cx,cy-128*s);g.lineTo(cx+26*s,cy-119*s);g.lineTo(cx,cy-110*s);g.fill();g.fillStyle=g.__bg;g.beginPath();g.moveTo(cx-14*s,cy+60*s);g.lineTo(cx-14*s,cy+26*s);g.arc(cx,cy+26*s,14*s,Math.PI,0);g.lineTo(cx+14*s,cy+60*s);g.fill()}
 if(kind==='scale'){g.lineWidth=8*s;g.beginPath();g.moveTo(cx,cy-80*s);g.lineTo(cx,cy+52*s);g.moveTo(cx-78*s,cy-56*s);g.lineTo(cx+78*s,cy-56*s);g.stroke();g.beginPath();g.arc(cx,cy-86*s,11*s,0,7);g.fill();g.fillRect(cx-44*s,cy+50*s,88*s,14*s);g.lineWidth=3*s;
  for(const e of[-1,1]){const x=cx+e*72*s;g.beginPath();g.moveTo(x,cy-56*s);g.lineTo(x-28*s,cy+6*s);g.moveTo(x,cy-56*s);g.lineTo(x+28*s,cy+6*s);g.stroke();g.beginPath();g.moveTo(x-34*s,cy+6*s);g.quadraticCurveTo(x,cy+34*s,x+34*s,cy+6*s);g.closePath();g.fill()}}
 if(kind==='med'){g.beginPath();g.roundRect(cx-70*s,cy-46*s,140*s,104*s,14*s);g.fill();g.lineWidth=10*s;g.beginPath();g.roundRect(cx-28*s,cy-72*s,56*s,34*s,10*s);g.stroke();g.fillStyle=g.__bg;g.fillRect(cx-12*s,cy-28*s,24*s,72*s);g.fillRect(cx-36*s,cy-4*s,72*s,24*s)}
 if(kind==='home'){g.lineWidth=10*s;g.beginPath();g.moveTo(cx-80*s,cy-6*s);g.lineTo(cx,cy-78*s);g.lineTo(cx+80*s,cy-6*s);g.stroke();g.beginPath();g.moveTo(cx-58*s,cy-12*s);g.lineTo(cx-58*s,cy+58*s);g.lineTo(cx+58*s,cy+58*s);g.lineTo(cx+58*s,cy-12*s);g.stroke();
  g.beginPath();const hy=cy-30*s;g.moveTo(cx,hy+12*s);g.bezierCurveTo(cx-20*s,hy-6*s,cx-10*s,hy-22*s,cx,hy-10*s);g.bezierCurveTo(cx+10*s,hy-22*s,cx+20*s,hy-6*s,cx,hy+12*s);g.fill();
  for(const [x,r,h] of[[-22,13,38],[22,11,32]]){g.beginPath();g.arc(cx+x*s,cy+(10-(h-32))*s,r*s,0,7);g.fill();g.beginPath();g.roundRect(cx+(x-r-4)*s,cy+(26-(h-32))*s,(2*r+8)*s,(h)*s,8*s);g.fill()}}
 if(kind==='biz'){g.fillRect(cx-46*s,cy-80*s,62*s,142*s);g.fillRect(cx+18*s,cy-34*s,40*s,96*s);g.fillRect(cx-70*s,cy+56*s,140*s,8*s);g.fillStyle=g.__bg;for(let r=0;r<5;r++)for(let c=0;c<2;c++)g.fillRect(cx+(-36+c*26)*s,cy+(-68+r*24)*s,16*s,14*s);for(let r=0;r<3;r++)g.fillRect(cx+30*s,cy+(-22+r*24)*s,16*s,14*s)}}
function buildSign(i){const [name,col,kind]=ISL[i];const G=new T.Group();
 const colM=new T.MeshStandardMaterial({color:col,roughness:.35});
 // 圓形底座：兩層，下層主色、上層金
 add(G,new T.CylinderGeometry(.78,.82,.16,48),colM,0,.08,0);add(G,new T.CylinderGeometry(.72,.74,.05,48),gold,0,.185,0);
 add(G,new T.CylinderGeometry(.34,.48,.22,40),gold,0,.32,0);add(G,new T.CylinderGeometry(.18,.24,.14,32),gold,0,.5,0);
 // 單根金柱＋金箍
 add(G,new T.CylinderGeometry(.075,.085,1.9,24),gold,0,1.45,0);for(const y of[.75,2.25])add(G,new T.CylinderGeometry(.12,.12,.08,24),gold,0,y,0);
 // 牌子：金框外形＋主色牌面
 const W=1.45,H=2.9,cy=3.85;
 const gF=new T.ExtrudeGeometry(signShape(W,H),{depth:.12,bevelEnabled:true,bevelThickness:.03,bevelSize:.03,bevelSegments:3,curveSegments:16});gF.translate(0,0,-.06);add(G,gF,gold,0,cy,0);
 const inner=signShape(W,H,.09);const gP=new T.ExtrudeGeometry(inner,{depth:.26,bevelEnabled:false,curveSegments:16});gP.translate(0,0,-.13);
 // 牌面貼圖（圖示＋島名＋分隔線＋斜金線）
 const c=document.createElement('canvas');c.width=512;c.height=1024;const g=c.getContext('2d');g.__bg=col;
 g.fillStyle=col;g.fillRect(0,0,512,1024);
 const gr=g.createLinearGradient(0,0,512,1024);gr.addColorStop(0,'rgba(255,255,255,.08)');gr.addColorStop(1,'rgba(0,0,0,.12)');g.fillStyle=gr;g.fillRect(0,0,512,1024);
 drawIcon(g,kind,256,300,1.25);
 g.fillStyle='#F2D28A';g.textAlign='center';g.textBaseline='middle';g.font='900 '+(name.length>2?132:150)+'px "Noto Serif TC","Noto Serif CJK TC",serif';g.fillText(name,256,520);
 g.fillRect(120,612,272,4);g.beginPath();g.moveTo(256,600);g.lineTo(268,614);g.lineTo(256,628);g.lineTo(244,614);g.fill();
 g.lineWidth=16;g.strokeStyle='#F2D28A';g.beginPath();g.moveTo(-10,930);g.quadraticCurveTo(260,880,530,760);g.stroke();g.lineWidth=5;g.beginPath();g.moveTo(-10,965);g.quadraticCurveTo(260,915,530,800);g.stroke();
 const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=8;
 const uvFix=geo=>{geo.computeBoundingBox();const b=geo.boundingBox,p=geo.attributes.position,uv=geo.attributes.uv;for(let k=0;k<p.count;k++)uv.setXY(k,(p.getX(k)-b.min.x)/(b.max.x-b.min.x),(p.getY(k)-b.min.y)/(b.max.y-b.min.y));uv.needsUpdate=true};
 uvFix(gP);const panel=add(G,gP,[new T.MeshStandardMaterial({map:tex,roughness:.35}),colM],0,cy,0);
 return G}
function buildCam(i){const [,col]=ISL[i];const body=new T.MeshStandardMaterial({color:col,roughness:.42});const G=new T.Group();
 // 三腳架：主色腳＋金箍＋金腳尖
 for(let k=0;k<3;k++){const a=k*Math.PI*2/3+Math.PI/2;const top=new T.Vector3(0,2.25,0),bot=new T.Vector3(Math.cos(a)*.9,0,Math.sin(a)*.9);const v=top.clone().sub(bot),len=v.length(),q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),v.clone().normalize());
  const L=new T.Group();L.position.copy(bot);L.quaternion.copy(q);G.add(L);add(L,new T.CylinderGeometry(.075,.09,len,16),body,0,len/2,0);for(const f of[.12,.42,.72])add(L,new T.CylinderGeometry(.1,.1,.12,16),gold,0,len*f,0);add(L,new T.ConeGeometry(.08,.16,16),gold,0,-.04,0).rotation.x=Math.PI}
 add(G,new T.CylinderGeometry(.26,.3,.18,28),gold,0,2.3,0);add(G,new T.CylinderGeometry(.1,.1,.3,16),gold,0,2.5,0);
 const C=new T.Group();C.position.y=3.15;C.rotation.y=.28;G.add(C);
 add(C,RB(1.35,1.05,.85,.14),body,0,0,0);
 for(const y of[-.47,.47])add(C,RB(1.42,.08,.92,.03,.015),gold,0,y,0);
 for(const x of[-.66,.66])add(C,new T.BoxGeometry(.06,1.0,.95),gold,x,0,0);
 // 上方觀景窗（有小鏡片）
 add(C,RB(.8,.36,.6,.1),body,-.02,.72,0);add(C,RB(.86,.06,.64,.02,.01),gold,-.02,.55,0);
 add(C,new T.CylinderGeometry(.13,.13,.08,28),gold,.05,.72,.34).rotation.x=Math.PI/2;add(C,new T.CircleGeometry(.1,28),new T.MeshPhysicalMaterial({color:'#24324A',roughness:.05,clearcoat:1,envMap:env}),.05,.72,.385);
 // 大鏡頭：多層金環
 const Lz=.43;add(C,new T.CylinderGeometry(.44,.44,.08,48),gold,.27,-.02,Lz+.02).rotation.x=Math.PI/2;
 add(C,new T.CylinderGeometry(.37,.41,.4,48),new T.MeshStandardMaterial({color:'#15161C',roughness:.35}),.27,-.02,Lz+.24).rotation.x=Math.PI/2;
 for(const [z,r] of[[.1,.42],[.32,.4],[.46,.37]])add(C,new T.TorusGeometry(r,.035,12,48),gold,.27,-.02,Lz+z);
 add(C,new T.CircleGeometry(.29,48),new T.MeshPhysicalMaterial({color:'#1C2A44',metalness:.3,roughness:.03,clearcoat:1,envMap:env,envMapIntensity:2}),.27,-.02,Lz+.45);
 add(C,new T.CircleGeometry(.13,32),new T.MeshBasicMaterial({color:'#6E8CC0',transparent:true,opacity:.55}),.17,.06,Lz+.452);
 // 側面 Logo 金圓牌（真正的事務所 Logo）
 { const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;const d=()=>{g.fillStyle='#FFF8EA';g.beginPath();g.arc(128,128,124,0,7);g.fill();if(logo.naturalWidth)g.drawImage(logo,30,26,196,196);t.needsUpdate=true};d();onLogo.push(d);
   const m=add(C,new T.CircleGeometry(.21,40),new T.MeshBasicMaterial({map:t}),-.43,.05,.5);add(C,new T.TorusGeometry(.22,.03,10,40),gold,-.43,.05,.5) }
 // 右側小旋鈕
 add(C,new T.CylinderGeometry(.08,.08,.12,20),gold,.6,.42,.15);
 return G}
function bubbleSprite(){const c=document.createElement('canvas');c.width=360;c.height=200;const g=c.getContext('2d');g.fillStyle='#F6D693';g.strokeStyle='#1F2E5C';g.lineWidth=10;g.beginPath();g.roundRect(10,10,340,140,60);g.fill();g.stroke();g.beginPath();g.moveTo(150,148);g.lineTo(180,192);g.lineTo(210,148);g.closePath();g.fill();g.stroke();g.fillStyle='#F6D693';g.fillRect(146,138,68,16);
 g.fillStyle='#1F2E5C';g.font='900 78px "Noto Sans TC","Noto Sans CJK TC",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('拍照',180,84);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;const s=new T.Sprite(new T.SpriteMaterial({map:t,depthTest:false}));s.scale.set(1.3,.72,1);s.renderOrder=10;return s}

 const ORDER=[0,1,2,3,4];// 0 城堡、1 訴訟、2 醫療、3 家庭、4 企業（與網站 groups 相同）
 const sets=[];
 O.scene.updateMatrixWorld(true);const OB=[];O.scene.traverse(o=>{if(!o.isMesh||o.isSprite)return;for(let q=o;q;q=q.parent)if(q.visible===false)return;if(!o.geometry.boundingBox)o.geometry.computeBoundingBox();const bb=o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld);const sx=bb.max.x-bb.min.x,sy=bb.max.y-bb.min.y,sz=bb.max.z-bb.min.z;if(!isFinite(sx)||sy<.3||Math.max(sx,sz)>14)return;OB.push(bb)});
 const clear=(x,z)=>{const gy=O.groundY(x,z);for(const b of OB){if(b.max.y<gy+.3||b.min.y>gy+6)continue;const cx=Math.max(b.min.x,Math.min(x,b.max.x)),cz=Math.max(b.min.z,Math.min(z,b.max.z));if(Math.hypot(cx-x,cz-z)<2.7)return false}return true};
 const free=(x,z)=>{if(O.groundY(x,z)<.5)return false;for(const [dx,dz] of [[0,0],[1.1,0],[-1.1,0],[0,1.1],[0,-1.1],[-2.3,0],[2.3,0],[0,2.3],[0,-2.3]])if(!O.walkAllowed(x+dx,z+dz))return false;return clear(x,z)};
 for(const i of ORDER){
  const g=O.groups()[i];if(!g)continue;const wp=new T.Vector3();g.getWorldPosition(wp);
  let best=null;
  if(i===0){// 城堡：廣場入口旁（訪客一出發就看得到）
   for(const [x,z] of [[-8.5,20.5],[8.5,20.5],[-9,19.5],[-7.5,21],[-11,20],[11,20],[-6,20],[6,20],[-10,21.5],[10,21.5]]){if(free(x,z)){best={x,z,face:Math.atan2(0-x*0,30-z)};break}}
  }else{
   const toC=new T.Vector3(O.center.x-wp.x,0,O.center.z-wp.z).normalize();const base=Math.atan2(toC.x,toC.z);
   outer:for(const r of [11.5,12.5,10.5,13.5,9.5,8.5,14.5])for(const da of [.42,-.42,.62,-.62,.25,-.25,.85,-.85,1.1,-1.1,1.4,-1.4,1.8,-1.8]){const a=base+da,x=wp.x+Math.sin(a)*r,z=wp.z+Math.cos(a)*r;if(free(x,z)){best={x,z,face:Math.atan2(O.center.x-x,O.center.z-z)};break outer}}
  }
  if(!best)continue;
  const grp=new T.Group();const y=O.groundY(best.x,best.z)-.12;grp.position.set(best.x,y,best.z);grp.rotation.y=best.face;grp.scale.setScalar(1.15);
  const sg=buildSign(i);sg.position.x=.85;const cm=buildCam(i);cm.position.x=-.95;cm.scale.setScalar(1.18);grp.add(sg,cm);
  const b=bubbleSprite();b.position.set(-.95,4.95,0);b.visible=false;grp.add(b);
  O.scene.add(grp);
  try{O.addSolid(best.x,best.z,1.9,.75)}catch(e){}
  const hit=new T.Mesh(new T.BoxGeometry(1.8,4.6,1.6),new T.MeshBasicMaterial({visible:false}));hit.position.set(-.95,2.3,0);grp.add(hit);hit.userData.wyPhoto=i;b.userData.wyPhoto=i;
  sets.push({i,grp,b,hit,cm});
 }
 const targets=sets.flatMap(s=>[s.hit,s.b]);
 let t=0;
 function tick(dt){t+=dt;let io=false;try{io=O.inside()}catch(e){}if(io)return;const a=O.actor();if(!a)return;
  for(const s of sets){const wp=new T.Vector3();s.cm.getWorldPosition(wp);const near=Math.hypot(a.position.x-wp.x,a.position.z-wp.z)<5.2;s.b.visible=near;if(near)s.b.position.y=4.95+Math.sin(t*2.4)*.07}}
 return {tick,targets,sets};
}
