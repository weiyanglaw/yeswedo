// 新城堡外型（依使用者參考圖）：中央圓頂＋皇冠、三角門楣、雙大柱夾 Logo 布幔、深藏青金框大門、象牙白石塊牆、金框拱窗＋花箱陽台、四座尖頂塔樓、盆栽、白色大理石廣場
export function setupCastleTop(T,R,api={}){
 const g=new T.Group();g.name='wyCastleTop';R.add(g);let RG=null;
 const MC=new Map();const M=(c,o={})=>{const k=c+JSON.stringify(o);if(!MC.has(k))MC.set(k,new T.MeshStandardMaterial({color:c,roughness:.55,...o}));return MC.get(k)};
 const GOLD=M('#F5C24E',{metalness:.7,roughness:.22,emissive:'#6A4408',emissiveIntensity:.38}),IVORY=M('#FBE9C8',{roughness:.42}),NAVY=M('#1E3263',{roughness:.35,metalness:.1}),NAVY2=M('#273F80',{roughness:.3,metalness:.2});
 const add=(geo,m,x,y,z,p=g)=>{const o=new T.Mesh(geo,m);o.position.set(x,y,z);p.add(o);return o};
 const box=(w,h,d,m,x,y,z,p)=>add(new T.BoxGeometry(w,h,d),m,x,y,z,p);
 const cyl=(a,b,h,m,x,y,z,s=24,p)=>add(new T.CylinderGeometry(a,b,h,s),m,x,y,z,p);
 const sph=(r,m,x,y,z,p,s=16)=>add(new T.SphereGeometry(r,s,Math.max(8,s*.7|0)),m,x,y,z,p);
 const tor=(r,t,m,x,y,z,arc=Math.PI*2,p)=>add(new T.TorusGeometry(r,t,8,40,arc),m,x,y,z,p);
 const ctex=(w,h,fn)=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;fn(cv.getContext('2d'),w,h);const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t};
 // 量測：前庭地面高度
 let top=R;while(top.parent)top=top.parent;R.updateMatrixWorld(true);const inv=new T.Matrix4().copy(R.matrixWorld).invert();const rc=new T.Raycaster();rc.camera=new T.PerspectiveCamera();
 const cast=(o,d)=>{const O=new T.Vector3(...o).applyMatrix4(R.matrixWorld),D=new T.Vector3(...d).transformDirection(R.matrixWorld);rc.set(O,D);let hs=[];try{hs=rc.intersectObject(top,true)}catch(e){}return hs.filter(h=>h.object.visible&&!h.object.isSprite&&!(h.object.material&&h.object.material.transparent))};
 const gh=cast([0,30,9],[0,-1,0]);const GY=gh.length?gh[0].point.clone().applyMatrix4(inv).y:1.59;
 // 原本的城堡（含之前加的裝飾）：預覽時切換
 const Y0=GY;const orig=R.children.filter(c=>c!==g);
 const isProtected=o=>{for(let a=o;a;a=a.parent){if(a===g||(a.userData&&(a.userData.wyMainFountain||a.userData.chibi||a.userData.wyActor))||a.name==='wyFest2')return true}return false};
 const hideOld=()=>{orig.forEach(o=>o.visible=false);top.updateMatrixWorld(true);top.traverse(o=>{if(!(o.isMesh||o.isInstancedMesh)||!o.visible||isProtected(o))return;let a=o;while(a){if(a===R)return;a=a.parent}const bb=new T.Box3().setFromObject(o);if(bb.isEmpty())return;const c=bb.getCenter(new T.Vector3()).applyMatrix4(inv);const sz=bb.getSize(new T.Vector3());if(Math.abs(c.x)<10.5&&c.z>-6.4&&c.z<4.8&&c.y>Y0+.8&&Math.max(sz.x,sz.y,sz.z)<14)o.visible=false})};
 window.__ctopMeasure={GY,n:0};
 // 貼圖
 const stone=(rx,ry)=>{const t=ctex(512,512,(c)=>{c.fillStyle='#EED5A8';c.fillRect(0,0,512,512);const bh=64,cols=['#F5DDB0','#EDCF9C','#F2D6A6','#E6C48E','#F7E2BA'];for(let r=0;r<8;r++)for(let k=-1;k<5;k++){const x=k*128+(r%2)*64;c.fillStyle=cols[(r*3+k+5)%5];c.fillRect(x+3,r*bh+3,122,bh-6);const gr=c.createLinearGradient(0,r*bh,0,r*bh+bh);gr.addColorStop(0,'rgba(255,255,255,.35)');gr.addColorStop(1,'rgba(160,120,70,.12)');c.fillStyle=gr;c.fillRect(x+3,r*bh+3,122,bh-6)}c.strokeStyle='#B98E52';c.lineWidth=6;for(let r=0;r<8;r++){const y=r*bh;c.beginPath();c.moveTo(0,y);c.lineTo(512,y);c.stroke();for(let k=0;k<5;k++){const x=(k*128+(r%2)*64)%512;c.beginPath();c.moveTo(x,y);c.lineTo(x,y+bh);c.stroke()}}});t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(rx,ry);return new T.MeshStandardMaterial({map:t,roughness:.75})};
 const mkWin=(aspect)=>ctex(256,384,(c)=>{const gr=c.createLinearGradient(0,0,0,384);gr.addColorStop(0,'#FFE7B0');gr.addColorStop(.55,'#F6CB7A');gr.addColorStop(1,'#D9A653');c.fillStyle=gr;c.fillRect(0,0,256,384);c.strokeStyle='#9C7230';c.lineWidth=9;const spring=384*(1/(2*aspect));c.beginPath();c.moveTo(128,spring);c.lineTo(128,384);c.stroke();for(const t of[.45,.72]){const y=spring+(384-spring)*t;c.beginPath();c.moveTo(0,y);c.lineTo(256,y);c.stroke()}c.beginPath();c.moveTo(0,spring);c.lineTo(256,spring);c.stroke();for(const a of[-.6,-.25,.25,.6]){c.beginPath();c.moveTo(128,spring);c.lineTo(128+Math.sin(a)*140,spring-Math.cos(a)*140);c.stroke()}c.beginPath();c.arc(128,spring,40,Math.PI,0);c.stroke()});const WINC=new Map();
 const winMat=(w,h)=>{const k=(h/w).toFixed(2);if(!WINC.has(k)){const t=mkWin(h/w);t.flipY=false;WINC.set(k,new T.MeshStandardMaterial({map:t,emissive:'#FFD08A',emissiveMap:t,emissiveIntensity:.6,roughness:.35}))}return WINC.get(k)};
 const archWin=(p,x,y,z,w,h,ry=0)=>{const s=new T.Shape();s.moveTo(-w/2,0);s.lineTo(w/2,0);s.lineTo(w/2,h-w/2);s.absarc(0,h-w/2,w/2,0,Math.PI,false);s.lineTo(-w/2,0);const geo=new T.ShapeGeometry(s,20);const uv=geo.attributes.uv,pos=geo.attributes.position;for(let i=0;i<uv.count;i++)uv.setXY(i,(pos.getX(i)+w/2)/w,1-pos.getY(i)/h);
  const wg=new T.Group();wg.position.set(x,y,z);wg.rotation.y=ry;p.add(wg);add(geo,winMat(w,h),0,0,.02,wg);box(.12,h-w/2,.12,GOLD,-w/2-.04,(h-w/2)/2,.06,wg);box(.12,h-w/2,.12,GOLD,w/2+.04,(h-w/2)/2,.06,wg);tor(w/2+.04,.07,GOLD,0,h-w/2,.06,Math.PI,wg);box(w+.3,.14,.3,IVORY,0,-.05,.12,wg);box(.22,.32,.16,GOLD,0,h+.06,.1,wg);return wg};
 const balcony=(p,x,y,z,w)=>{box(w,.14,.75,IVORY,x,y,z+.3);{const sm=new T.Mesh(new T.PlaneGeometry(w,.3),new T.MeshBasicMaterial({color:'#6B4E2A',transparent:true,opacity:.2,depthWrite:false}));sm.position.set(x,y-.2,z+.04);p.add(sm)}for(let k=0;k<=Math.round(w/.22);k++)cyl(.04,.05,.4,IVORY,x-w/2+k*(w/Math.round(w/.22)),y+.27,z+.62,6,p);box(w,.09,.12,GOLD,x,y+.5,z+.64);
  box(w-.2,.28,.36,M('#7A5A3A'),x,y+.21,z+.25);const fl=['#FF5C9A','#FF9CC2','#FFFFFF','#FF3D7F','#FFC1D8'];for(let k=0;k<Math.round(w/.2);k++)sph(.24,M(fl[k%5],{roughness:.7}),x-w/2+.2+k*.2,y+.55+(k%2)*.08,z+.26+(k%3-1)*.08,p,8);
  for(let k=0;k<Math.round(w/.3);k++)sph(.11,M('#5DA567'),x-w/2+.25+k*.3,y+.36,z+.36,p,8)};
 const FH=3.3,ZF=3.0;

 const roofT=ctex(512,512,(c)=>{c.fillStyle='#22397A';c.fillRect(0,0,512,512);for(let r=0;r<16;r++)for(let k=0;k<16;k++){const x=k*32+(r%2)*16,y=r*32;c.fillStyle=(r+k)%3?'#2E4C96':'#203874';c.beginPath();c.arc(x+16,y,16,0,Math.PI);c.fill();c.strokeStyle='#22376E';c.lineWidth=2;c.beginPath();c.arc(x+16,y,16,0,Math.PI);c.stroke()}
  c.strokeStyle='#EDBF5E';c.lineWidth=6;for(let k=0;k<8;k++){c.beginPath();c.moveTo(k*64+32,0);c.lineTo(k*64+32,512);c.stroke()}});roofT.wrapS=roofT.wrapT=T.RepeatWrapping;roofT.repeat.set(1,1);
 const ROOF=new T.MeshStandardMaterial({map:roofT,roughness:.45,metalness:.1});
 // 主體
 const WM=stone(3,2.4);box(13.2,FH*3+.4,6.5,WM,0,Y0+(FH*3+.4)/2,ZF-3.25);
 for(let f=1;f<=3;f++)box(13.4,.18,.2,f===3?GOLD:IVORY,0,Y0+f*FH,ZF+.08);box(13.6,.35,6.8,IVORY,0,Y0+FH*3+.45,ZF-3.25);box(13.7,.1,6.9,GOLD,0,Y0+FH*3+.66,ZF-3.25);
 const SH=new T.MeshBasicMaterial({color:'#6B4E2A',transparent:true,opacity:.18,depthWrite:false});for(let f=1;f<=3;f++){const m=new T.Mesh(new T.PlaneGeometry(13.2,.35),SH);m.position.set(0,Y0+f*FH-.28,ZF+.03);g.add(m)}
 for(const sx of[-1,1]){box(.12,FH*3,.12,GOLD,sx*6.62,Y0+FH*1.5,ZF+.02);box(.1,FH*3+.6,.1,GOLD,sx*2.32,Y0+(FH*3+.6)/2,ZF+.75)}
 // 側邊窗＋陽台
 for(const sx of[-1,1])for(let f=0;f<3;f++){const x=sx*4.2,y=Y0+f*FH+.42;archWin(g,x,y,ZF+.02,1.9,2.55);balcony(g,x,y-.14,ZF,2.6)}
 // 中央突出段：大柱＋布幔＋門楣
 const BX=2.15,BZ=ZF+.7;box(4.6,FH*3+.6,1.4,stone(1.2,2.4),0,Y0+(FH*3+.6)/2,ZF+.05);
 for(const sx of[-1,1]){const x=sx*BX;cyl(.42,.46,FH*3-1.1,IVORY,x,Y0+1.1+(FH*3-1.1)/2,BZ,24);box(1.1,1.1,1.1,IVORY,x,Y0+.55,BZ);box(1.15,.08,1.15,GOLD,x,Y0+1.12,BZ);
  const cap=cyl(.6,.42,.45,GOLD,x,Y0+FH*3-.02,BZ,24);box(1.2,.18,1.2,GOLD,x,Y0+FH*3+.25,BZ)}
 box(5.4,.45,1.4,IVORY,0,Y0+FH*3+.5,BZ-.1);box(5.5,.1,1.45,GOLD,0,Y0+FH*3+.75,BZ-.1);
 {const s=new T.Shape();s.moveTo(-2.75,0);s.lineTo(2.75,0);s.lineTo(0,1.55);s.lineTo(-2.75,0);const pg=new T.ExtrudeGeometry(s,{depth:1.2,bevelEnabled:false});const pd=add(pg,IVORY,0,Y0+FH*3+.8,BZ-.75);
  const o=new T.Shape();o.moveTo(-2.85,0);o.lineTo(2.85,0);o.lineTo(0,1.65);o.lineTo(-2.85,0);const h=new T.Path();h.moveTo(-2.5,.12);h.lineTo(2.5,.12);h.lineTo(0,1.42);h.lineTo(-2.5,.12);o.holes.push(h);add(new T.ExtrudeGeometry(o,{depth:.1,bevelEnabled:false}),GOLD,0,Y0+FH*3+.78,BZ+.47)}
 // 布幔（燕尾）：用正式 Logo（含 WEIYANG），大而清楚
 const LOGOIMG=new Image();LOGOIMG.src='weiyang-logo-tight-v102.png';const onLogo=[];LOGOIMG.onload=()=>onLogo.forEach(f=>f());
 {const bt=ctex(512,1024,(c)=>{});const draw=()=>{const c=bt.image.getContext('2d');c.clearRect(0,0,512,1024);c.fillStyle='#24386A';c.beginPath();c.moveTo(0,0);c.lineTo(512,0);c.lineTo(512,900);c.lineTo(256,1010);c.lineTo(0,900);c.closePath();c.fill();
   c.strokeStyle='#EDBF5E';c.lineWidth=14;c.beginPath();c.moveTo(14,0);c.lineTo(14,893);c.lineTo(256,994);c.lineTo(498,893);c.lineTo(498,0);c.stroke();
   if(LOGOIMG.complete&&LOGOIMG.naturalWidth){const w=430,h=w*LOGOIMG.naturalHeight/LOGOIMG.naturalWidth;c.drawImage(LOGOIMG,256-w/2,140,w,h)}bt.needsUpdate=true};draw();onLogo.push(draw);
  const bm=new T.MeshStandardMaterial({map:bt,transparent:true,alphaTest:.3,roughness:.6,emissive:'#3A2A10',emissiveMap:bt,emissiveIntensity:.25});const bn=add(new T.PlaneGeometry(2.6,5.1),bm,0,Y0+7.35,BZ+.25);box(3.0,.12,.12,GOLD,0,Y0+9.93,BZ+.27);for(const sx of[-1,1])sph(.13,GOLD,sx*1.55,Y0+9.93,BZ+.27)}
 // 正式 Logo 貼圖（大門金章、門楣徽飾用）
 const logoTex=ctex(512,512,()=>{});const drawLT=()=>{const c=logoTex.image.getContext('2d');c.clearRect(0,0,512,512);c.fillStyle='#24386A';c.beginPath();c.arc(256,256,256,0,7);c.fill();if(LOGOIMG.complete&&LOGOIMG.naturalWidth){const h=440,w=h*LOGOIMG.naturalWidth/LOGOIMG.naturalHeight;c.drawImage(LOGOIMG,256-w/2,256-h/2,w,h)}logoTex.needsUpdate=true};drawLT();onLogo.push(drawLT);
 const LOGOM=new T.MeshStandardMaterial({map:logoTex,roughness:.4,emissive:'#3A2A10',emissiveMap:logoTex,emissiveIntensity:.4});
 // 大門：照參考圖——拱形深藏青雙開門＋金拱框＋兩枚 Logo 金章＋長金門把＋下半部金線框＋成對小圓柱＋金門楣＋半圓台階
 {const dz=BZ-.05,W=2.3,H=2.1,DY=Y0+.6;
  const arch=(w,h)=>{const sh=new T.Shape();sh.moveTo(-w/2,0);sh.lineTo(w/2,0);sh.lineTo(w/2,h);sh.absarc(0,h,w/2,0,Math.PI,false);sh.lineTo(-w/2,0);return sh};
  add(new T.ExtrudeGeometry(arch(W+.5,H),{depth:.28,bevelEnabled:false}),GOLD,0,DY,dz-.2);
  {const dm=add(new T.ExtrudeGeometry(arch(W,H),{depth:.32,bevelEnabled:false}),NAVY,0,DY,dz-.18);if(dm&&dm.userData)dm.userData.wyDoor={w:W,h:H+W/2,isle:0,bottom:true,zf:.32}}
  const fr=add(new T.TorusGeometry(W/2+.1,.07,8,40,Math.PI),GOLD,0,DY+H,dz+.16);box(.14,H,.14,GOLD,-(W/2+.1),DY+H/2,dz+.16);box(.14,H,.14,GOLD,(W/2+.1),DY+H/2,dz+.16);
  box(.07,H+W/2-.08,.1,GOLD,0,DY+(H+W/2)/2,dz+.16);
  const lt=new T.TextureLoader().load('office-logo-transparent.png');lt.colorSpace=T.SRGBColorSpace;
  for(const sx of[-1,1]){const mx=sx*W/4;tor(.43,.07,GOLD,mx,DY+H+.05,dz+.17);add(new T.CircleGeometry(.4,40),LOGOM,mx,DY+H+.05,dz+.18);
   box(.08,1.0,.1,GOLD,sx*.13,DY+1.25,dz+.2);sph(.07,GOLD,sx*.13,DY+1.77,dz+.2,g,8);sph(.07,GOLD,sx*.13,DY+.73,dz+.2,g,8);
   const px=sx*W/4,py=DY+.55,pw=W/2-.36,ph=.65;box(pw,.05,.06,GOLD,px,py-ph/2,dz+.16);box(pw,.05,.06,GOLD,px,py+ph/2,dz+.16);box(.05,ph,.06,GOLD,px-pw/2,py,dz+.16);box(.05,ph,.06,GOLD,px+pw/2,py,dz+.16)}
  for(const sx of[-1,1])for(const off of[.5,.95]){const x=sx*(W/2+off);cyl(.15,.15,H+W/2-.1,IVORY,x,DY+(H+W/2-.1)/2,dz+.25,16);cyl(.22,.17,.2,GOLD,x,DY+H+W/2-.05,dz+.25,16);cyl(.2,.2,.14,GOLD,x,DY+.07,dz+.25,16)}
  const TOP=DY+H+W/2+.05;box(W+2.6,.26,.65,IVORY,0,TOP+.13,dz+.2);box(W+2.7,.08,.7,GOLD,0,TOP+.3,dz+.2);
  {const s2=new T.Shape();s2.moveTo(-1.95,0);s2.lineTo(1.95,0);s2.lineTo(0,.65);s2.lineTo(-1.95,0);add(new T.ExtrudeGeometry(s2,{depth:.55,bevelEnabled:false}),IVORY,0,TOP+.34,dz-.08);
   const o=new T.Shape();o.moveTo(-2.05,0);o.lineTo(2.05,0);o.lineTo(0,.72);o.lineTo(-2.05,0);const h=new T.Path();h.moveTo(-1.72,.09);h.lineTo(1.72,.09);h.lineTo(0,.55);h.lineTo(-1.72,.09);o.holes.push(h);add(new T.ExtrudeGeometry(o,{depth:.08,bevelEnabled:false}),GOLD,0,TOP+.32,dz+.48);
   tor(.16,.05,GOLD,0,TOP+.62,dz+.5);sph(.09,GOLD,0,TOP+.62,dz+.5,g,10)}
  const RISER=M('#D9BE8E',{roughness:.55}),TREAD=M('#FFF8EC',{roughness:.3}),SGOLD=new T.MeshStandardMaterial({color:'#F6C760',emissive:'#FFC24A',emissiveIntensity:.85,metalness:.5,roughness:.25});[[5.6,.24],[4.75,.48],[3.9,.72]].forEach(([r,h])=>{const st=new T.Mesh(new T.CylinderGeometry(r,r,h,56,1,true,-Math.PI/2,Math.PI),RISER);st.position.set(0,Y0+h/2,dz+.25);g.add(st);const tp=new T.Mesh(new T.CircleGeometry(r,56,0,Math.PI),TREAD);tp.rotation.x=-Math.PI/2;tp.rotation.z=Math.PI;tp.position.set(0,Y0+h,dz+.25);g.add(tp);const rim=new T.Mesh(new T.TorusGeometry(r,.09,8,64,Math.PI),SGOLD);rim.rotation.x=-Math.PI/2;rim.position.set(0,Y0+h,dz+.25);g.add(rim);const rl=new T.Mesh(new T.TorusGeometry(r+.02,.05,6,64,Math.PI),SGOLD);rl.rotation.x=-Math.PI/2;rl.position.set(0,Y0+h-.18,dz+.25);g.add(rl);const hl=new T.Mesh(new T.RingGeometry(r-.25,r+.3,64,1,Math.PI,Math.PI),new T.MeshBasicMaterial({color:'#FFD98A',transparent:true,opacity:.28,depthWrite:false,blending:T.AdditiveBlending}));hl.rotation.x=-Math.PI/2;hl.position.set(0,Y0+h+.015,dz+.25);g.add(hl)});
  window.__doorTop=TOP}
 // 立面補強：壁柱、窗上金徽、齒狀線腳、門楣徽飾、牆腳花台、塔前盆栽、大門壁燈
 for(const sx of[-1,1]){for(const px of[2.95,5.45]){const x=sx*px;box(.38,FH*3-.1,.22,IVORY,x,Y0+(FH*3-.1)/2,ZF+.12);for(let f=1;f<=3;f++){box(.5,.16,.3,GOLD,x,Y0+f*FH-.2,ZF+.16)}}
  {const f=2,x=sx*4.2,y=Y0+f*FH+.42+2.55+.32;tor(.2,.05,GOLD,x,y,ZF+.14);sph(.09,GOLD,x,y,ZF+.16,g,10)}
  const pz=ZF+.55;box(2.9,.5,.6,IVORY,sx*4.2,Y0+.25,pz);box(2.95,.06,.65,GOLD,sx*4.2,Y0+.52,pz);const fl=['#FF5C9A','#FF9CC2','#FFFFFF','#FF3D7F','#FFC1D8'];for(let k=0;k<12;k++)sph(.2,M(fl[k%5],{roughness:.7}),sx*4.2-1.3+k*.24,Y0+.68+(k%2)*.06,pz+((k%3)-1)*.12,g,8);
  box(.85,.6,.85,IVORY,sx*7.7,Y0+.3,ZF+1.1);box(.9,.06,.9,GOLD,sx*7.7,Y0+.62,ZF+1.1);sph(.6,M('#4E9A5C',{roughness:.8}),sx*7.7,Y0+1.2,ZF+1.1,g,16);
  const sc=new T.Group();sc.position.set(sx*2.95,Y0+2.7,BZ+.3);g.add(sc);box(.12,.5,.12,GOLD,0,-.2,0,sc);cyl(.18,.12,.42,new T.MeshStandardMaterial({color:'#FFF1CF',emissive:'#FFD58A',emissiveIntensity:.9}),0,.2,.1,12,sc);cyl(.22,.08,.16,GOLD,0,.48,.1,12,sc)}
 for(let k=0;k<44;k++)box(.14,.16,.16,IVORY,-6.45+k*.3,Y0+FH*3+.18,ZF+.12);
 {const py=Y0+FH*3+.8+.6;tor(.52,.08,GOLD,0,py,BZ+.5);add(new T.CircleGeometry(.48,40),LOGOM,0,py,BZ+.52);
  for(const sx of[-1,1])for(let k=0;k<5;k++){const lf=new T.Mesh(new T.SphereGeometry(.09,8,6),GOLD);lf.scale.set(1,2.2,.5);lf.position.set(sx*(.66+k*.22),py-.1+k*.02*(k%2?1:-1),BZ+.5);lf.rotation.z=sx*(1.1+k*.1);g.add(lf)}}
 // 中央鼓座＋圓頂＋皇冠
 {const DY=Y0+FH*3+.8,DZc=ZF-3.0;cyl(2.75,2.75,2.8,IVORY,0,DY+1.4,DZc,40);const n=12;for(let k=0;k<n;k++){const a=k/n*Math.PI*2;const x=Math.sin(a)*2.85,z=DZc+Math.cos(a)*2.85;cyl(.15,.15,2.5,IVORY,x,DY+1.35,z,10);
   if(k%2===0&&Math.cos(a)>-.2)archWin(g,Math.sin(a+Math.PI/n)*2.78,DY+.35,DZc+Math.cos(a+Math.PI/n)*2.78,.85,1.85,a+Math.PI/n)}
  cyl(3.05,3.05,.25,IVORY,0,DY+2.9,DZc,40);cyl(3.12,3.12,.08,GOLD,0,DY+3.06,DZc,40);
  const dome=add(new T.SphereGeometry(2.9,40,20,0,Math.PI*2,0,Math.PI/2),NAVY2,0,DY+3.05,DZc);
  for(let k=0;k<8;k++){const rib=new T.Mesh(new T.TorusGeometry(2.92,.06,6,32,Math.PI/2),GOLD);rib.position.set(0,DY+3.05,DZc);rib.rotation.set(0,k/8*Math.PI*2,0);rib.rotateZ(0);const p=new T.Group();p.position.set(0,DY+3.05,DZc);p.rotation.y=k/8*Math.PI;g.add(p);const rr=new T.Mesh(new T.TorusGeometry(2.92,.06,6,40,Math.PI),GOLD);p.add(rr)}
  cyl(.55,.7,.4,GOLD,0,DY+6.05,DZc,16);for(let k=0;k<8;k++){const a=k/8*Math.PI*2;cyl(.04,.12,.5,GOLD,Math.sin(a)*.55,DY+6.45,DZc+Math.cos(a)*.55,6);sph(.08,GOLD,Math.sin(a)*.55,DY+6.72,DZc+Math.cos(a)*.55,g,8)}sph(.18,GOLD,0,DY+6.6,DZc,g,12);
  cyl(.04,.04,2.0,GOLD,0,DY+7.4,DZc,8);sph(.09,GOLD,0,DY+8.45,DZc,g,8)}
 const GLOWS=[];
 // 皇家光暈（柔和、不閃）
 {const gt=ctex(128,128,(c)=>{const r=c.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,'rgba(255,226,150,.9)');r.addColorStop(.4,'rgba(255,210,120,.35)');r.addColorStop(1,'rgba(255,200,110,0)');c.fillStyle=r;c.fillRect(0,0,128,128)});
  const gl=(x,y,z,s)=>{const sp=new T.Sprite(new T.SpriteMaterial({map:gt,transparent:true,depthWrite:false,blending:T.AdditiveBlending,opacity:.75}));GLOWS.push(sp);sp.position.set(x,y,z);sp.scale.set(s,s,1);g.add(sp)};
  const DY=Y0+FH*3+.8;gl(0,DY+6.5,ZF-3.0,2.2);gl(0,Y0+2.6,BZ+.6,4.2);for(const sx of[-1,1]){gl(sx*7.7,Y0+FH*3+1.6,ZF+.4,2.4);gl(sx*4.2,Y0+FH*1.5,ZF+.4,2.2)}}
 // 旗子
 const flagT=ctex(256,160,()=>{});const drawF=()=>{const c=flagT.image.getContext('2d');c.clearRect(0,0,256,160);c.fillStyle='#24386A';c.beginPath();c.moveTo(0,0);c.lineTo(256,0);c.lineTo(220,80);c.lineTo(256,160);c.lineTo(0,160);c.closePath();c.fill();c.strokeStyle='#EDBF5E';c.lineWidth=6;c.strokeRect(4,4,210,152);if(LOGOIMG.complete&&LOGOIMG.naturalWidth){const h=136,w=h*LOGOIMG.naturalWidth/LOGOIMG.naturalHeight;c.drawImage(LOGOIMG,105-w/2,12,w,h)}flagT.needsUpdate=true};drawF();onLogo.push(drawF);
 const flag=(x,y,z,s=1)=>{const f=add(new T.PlaneGeometry(1.5*s,.95*s),new T.MeshStandardMaterial({map:flagT,transparent:true,alphaTest:.3,side:T.DoubleSide}),x+.78*s,y,z);return f};
 flag(0,Y0+FH*3+.8+7.95,ZF-3.0,1.2);
 // 塔樓：前兩座圓塔＋後兩座細塔
 const tower=(x,z,r,h,cone)=>{const tw=new T.Group();tw.position.set(x,Y0,z);g.add(tw);add(new T.CylinderGeometry(r,r,h,32),stone(2,2.4),0,h/2,0,tw);
  for(const y of[h*.33,h*.66])box(.01,.01,.01,IVORY,0,y,0,tw);cyl(r+.12,r+.12,.25,IVORY,0,h+.1,0,32,tw);cyl(r+.16,r+.16,.08,GOLD,0,h+.26,0,32,tw);
  add(new T.ConeGeometry(r+.25,cone,32),ROOF,0,h+.3+cone/2,0,tw);cyl(.18,.28,.3,GOLD,0,h+.3+cone*.82,0,16,tw);cyl(r+.27,r+.27,.1,GOLD,0,h+.35,0,32,tw);cyl(.05,.05,1.6,GOLD,0,h+.3+cone+.6,0,8,tw);sph(.12,GOLD,0,h+.3+cone+.1,0,tw,10);
  flag(x,Y0+h+.3+cone+1.05,z,.9);
  for(let f=0;f<3;f++)archWin(tw,0,.5+f*FH,r+.01,.85,2.35,0);for(const y of[FH,FH*2])cyl(r+.08,r+.08,.14,GOLD,0,y-.12,0,32,tw);
  for(let k=0;k<12;k++){const a=k/12*Math.PI*2;const arc=new T.Mesh(new T.TorusGeometry(.16,.04,6,12,Math.PI),IVORY);arc.position.set(Math.sin(a)*(r+.06),h-.25,Math.cos(a)*(r+.06));arc.rotation.y=a;tw.add(arc)}return tw};
 for(const sx of[-1,1]){tower(sx*7.7,ZF-1.2,1.55,FH*3+1.3,4.2);tower(sx*5.6,ZF-4.6,1.1,FH*3+2.6,3.4)}
 // 門口盆栽與尖塔綠樹
 for(const sx of[-1,1]){const x=sx*3.3,z=ZF+1.3;box(.9,.7,.9,IVORY,x,Y0+.35,z);box(.95,.06,.95,GOLD,x,Y0+.72,z);sph(.68,M('#5DA567',{roughness:.8}),x,Y0+1.35,z,g,16);
  const cx=sx*9.6,cz=ZF+1.1;box(.8,.55,.8,IVORY,cx,Y0+.28,cz);add(new T.ConeGeometry(.6,1.9,16),M('#4E9A5C',{roughness:.8}),cx,Y0+1.5,cz)}
 // v503 白色拋光石材廣場（比照醫療島：不畫細紋與格線，手機上不會像髒污）；高級感改由大面積拼花：噴水池外圈淡灰藍星形花瓣＋香檳金環帶、廣場外緣灰藍石材邊帶
 {const FX=.5,FZ=(api.fountainZ||16.2)-(ZF+9),PR=12.6,S=2048,K=S/(PR*2);
  const t=ctex(S,S,(c)=>{const cx=S/2,cy=S/2,P=(x,z)=>[cx+x*K,cy+z*K],arc=(x,z,r)=>{const[a,b]=P(x,z);c.beginPath();c.arc(a,b,r*K,0,Math.PI*2)};
   c.fillStyle='#FFFEFB';c.fillRect(0,0,S,S);
   // 極淡的石材雲霧（只有深淺，沒有線條）
   let sd=503;const rr=()=>((sd=Math.imul(sd^sd>>>15,1|sd)+0x6D2B79F5|0,((sd^sd>>>14)>>>0)/4294967296));
   for(let i=0;i<40;i++){const x=rr()*S,y=rr()*S,r=120+rr()*320,gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,rr()<.5?'rgba(236,238,242,.35)':'rgba(246,240,230,.35)');gr.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)}
   // 外緣：淡灰藍石材邊帶＋內側香檳金細環
   const BL='#AFC3DC',BL2='#D5E0EE',CH='#E2C489';
   arc(0,0,12.45);c.fillStyle=BL2;c.fill();arc(0,0,11.5);c.fillStyle='#FFFEFB';c.fill();
   arc(0,0,11.5);c.save();c.clip();for(let i=0;i<30;i++){const x=rr()*S,y=rr()*S,r=120+rr()*320,gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,rr()<.5?'rgba(236,238,242,.32)':'rgba(246,240,230,.32)');gr.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=gr;c.fillRect(x-r,y-r,r*2,r*2)}c.restore();
   c.lineWidth=.14*K;c.strokeStyle=CH;arc(0,0,11.2);c.stroke();
   // 噴水池拼花：灰藍十六瓣星＋香檳金環帶
   const[fx,fy]=P(FX,FZ);const star=(n,ri,ro,rot,col)=>{c.beginPath();for(let i=0;i<n*2;i++){const r=(i%2?ri:ro)*K,a=rot+i*Math.PI/n;const x=fx+Math.cos(a)*r,y=fy+Math.sin(a)*r;i?c.lineTo(x,y):c.moveTo(x,y)}c.closePath();c.fillStyle=col;c.fill()};
   c.lineWidth=.2*K;c.strokeStyle=CH;arc(FX,FZ,6.75);c.stroke();
   star(16,4.9,6.4,-Math.PI/2+Math.PI/16,BL2);star(16,4.9,6.4,-Math.PI/2,BL);
   c.fillStyle=CH;arc(FX,FZ,5.05);c.fill();c.fillStyle='#F8F0DE';arc(FX,FZ,4.75);c.fill();
  });
  t.anisotropy=8;const pl=add(new T.CircleGeometry(PR,96),new T.MeshPhysicalMaterial({map:t,roughness:.3,metalness:0,clearcoat:.5,clearcoatRoughness:.2,emissive:'#FFF6EC',emissiveMap:t,emissiveIntensity:.03}),0,Y0+.015,ZF+9);pl.rotation.x=-Math.PI/2;
  RG=new T.MeshStandardMaterial({color:'#F3C45E',emissive:'#FFC85A',emissiveIntensity:.7,metalness:.5,roughness:.25});const ring=(r,w,x,z,p=g)=>{const m=new T.Mesh(new T.RingGeometry(r-w,r,96),RG);const gl=new T.Mesh(new T.RingGeometry(r-w-.25,r+.25,96),new T.MeshBasicMaterial({color:'#FFD98A',transparent:true,opacity:.22,depthWrite:false,blending:T.AdditiveBlending}));gl.rotation.x=-Math.PI/2;gl.position.set(x,Y0+.025,z);p.add(gl);m.rotation.x=-Math.PI/2;m.position.set(x,Y0+.03,z);p.add(m);return m};
  ring(12.6,.22,0,ZF+9);
  const fr=new T.Group();g.add(fr);fr.position.set(.5,0,api.fountainZ||16.2);ring(4.6,.2,0,0,fr);}
 hideOld();
 // 走路：半圓台階的高度（人物走上去平順升高）
 const SC={x:0,z:BZ-.05+.25};const STEPS=[[5.6,.24],[4.75,.48],[3.9,.72]];
 if(api.addSurface)api.addSurface((x,z)=>{const p=new T.Vector3(x,0,z).applyMatrix4(inv);if(p.z<SC.z-.05)return null;const d=Math.hypot(p.x-SC.x,p.z-SC.z);let h=null;for(const [r,hh] of STEPS)if(d<=r)h=hh;return h==null?null:new T.Vector3(0,Y0+h,0).applyMatrix4(R.matrixWorld).y});
 // 碰撞：新城堡的外框
 if(api.setSolids)api.setSolids([{shape:'box',x:0,z:-.25,hx:6.75,hz:3.35},{shape:'box',x:0,z:3.45,hx:2.75,hz:.5},{shape:'circle',x:-7.7,z:1.8,r:1.75},{shape:'circle',x:7.7,z:1.8,r:1.75},{shape:'circle',x:-5.6,z:-1.6,r:1.3},{shape:'circle',x:5.6,z:-1.6,r:1.3},{shape:'circle',x:-3.3,z:4.3,r:.6},{shape:'circle',x:3.3,z:4.3,r:.6},{shape:'circle',x:-9.6,z:4.1,r:.55},{shape:'circle',x:9.6,z:4.1,r:.55},{shape:'circle',x:-5.9,z:7.9,r:.5},{shape:'circle',x:5.9,z:7.9,r:.5},{shape:'circle',x:-7.7,z:4.1,r:.5},{shape:'circle',x:7.7,z:4.1,r:.5},{shape:'box',x:-4.2,z:3.55,hx:1.5,hz:.35},{shape:'box',x:4.2,z:3.55,hx:1.5,hz:.35},{shape:'circle',x:.5,z:api.fountainZ||16.2,r:3.4}/* v510：可以走到池邊（池邊半徑 3.75） *//* v503 新噴水池含四座花台 */]);
 // 晚上：窗戶暖光、皇家光暈、地面金環發亮（穩定、不閃）
 const winMats=[...WINC.values()];let lv=-1;
 return function tick(){let ph='day';try{ph=window.wySky.phase()}catch(e){}const t=ph==='night'?1:ph==='dusk'?.6:0;if(Math.abs(t-lv)<.01)return;lv=t;
  for(const m of winMats)m.emissiveIntensity=.45+.8*t;for(const sp of GLOWS)sp.material.opacity=.25+.6*t;if(RG)RG.emissiveIntensity=.5+.6*t;}}

