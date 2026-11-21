// v508 島名大立牌（橋上岸處）＋相機（建築前廣場一側）分開擺；v507 島名立牌＋相機（21:26 定稿，照陳老闆參考圖）：城堡＋四島，各島整支換成島色；相機旁走近浮出「拍照」
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
// v508 島名大立牌（陳老闆 11-20 15:11 定案）：正面 Logo＋大字島名＋金色橫條「拍照有法度」與箭頭指向相機；
// 背面大字 LINE @wylaw＋小字事務所名；深藍底香檳金框、圓角胖胖動森風、島主色只用在底邊一條；夜間微亮不閃；牌面略仰
const NAVY='#1E2A4F';let backTex=null;
function rr(g,x,y,w,h,r){g.beginPath();g.roundRect(x,y,w,h,r)}
/* v509（陳老闆 18:09）：立牌底色＝各島主色（跟互動標示同一組寶石亮色），金框、發光金字 */
const SIGNCOL=['#3F63B5','#EF9B6B','#5CBF9B','#D46F84','#9A80D0','#3C93B6'];const shade=(h,k)=>{const n=parseInt(h.slice(1),16);const f=v=>Math.max(0,Math.min(255,Math.round(v*k)));return '#'+[n>>16,(n>>8)&255,n&255].map(v=>f(v).toString(16).padStart(2,'0')).join('')};
function faceBase(g,W,H,col,base){const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,base?shade(base,.92):'#26365F');gr.addColorStop(1,base?shade(base,.62):'#18223F');g.fillStyle=gr;g.fillRect(0,0,W,H);
 g.fillStyle=base?shade(base,.45):col;g.fillRect(0,H-40,W,40);g.fillStyle='#E8C77A';g.fillRect(0,H-44,W,4);
 g.strokeStyle='#E8C77A';g.lineWidth=3;rr(g,16,16,W-32,H-76,22);g.stroke()}
function drawFront(c,name,col,dir,base){const g=c.getContext('2d'),W=c.width,H=c.height;faceBase(g,W,H,col,base);
 if(logo.naturalWidth){g.fillStyle='#FFF8EA';rr(g,W/2-38,26,76,76,16);g.fill();g.drawImage(logo,W/2-33,31,66,66)}
 g.textAlign='center';g.textBaseline='middle';const fs=name.length>=5?96:112;g.font='900 '+fs+'px "Noto Serif TC","Noto Serif CJK TC",serif';{const tg=g.createLinearGradient(0,166-fs/2,0,166+fs/2);tg.addColorStop(0,'#FFF4C2');tg.addColorStop(.5,'#FFD766');tg.addColorStop(1,'#E8A93A');g.save();g.shadowColor='rgba(255,214,110,.95)';g.shadowBlur=22;g.lineJoin='round';g.strokeStyle='#6B4A12';g.lineWidth=8;g.strokeText(name,W/2,166);g.fillStyle=tg;g.fillText(name,W/2,166);g.shadowBlur=10;g.fillText(name,W/2,166);g.restore()}
 const bx=78,by=226,bw=W-156,bh=64;const rg=g.createLinearGradient(0,by,0,by+bh);rg.addColorStop(0,'#F8E3A6');rg.addColorStop(1,'#D9A84E');g.fillStyle=rg;rr(g,bx,by,bw,bh,32);g.fill();
 g.fillStyle='#3D2808';g.font='900 42px "Noto Sans TC","Noto Sans CJK TC",sans-serif';if(!dir){g.fillText('YES, WE DO!',W/2,by+bh/2+2);return}g.fillText('拍照有法度',W/2-dir*26,by+bh/2+2);
 const ax=W/2+dir*128,ay=by+bh/2;g.beginPath();g.moveTo(ax+dir*30,ay);g.lineTo(ax-dir*2,ay-20);g.lineTo(ax-dir*2,ay-8);g.lineTo(ax-dir*24,ay-8);g.lineTo(ax-dir*24,ay+8);g.lineTo(ax-dir*2,ay+8);g.lineTo(ax-dir*2,ay+20);g.closePath();g.fill()}
function drawBack(){const c=document.createElement('canvas');c.width=640;c.height=404;const g=c.getContext('2d'),W=640,H=404;faceBase(g,W,H,'#C9963C');
 g.textAlign='center';g.textBaseline='middle';g.fillStyle='#E8C77A';g.font='900 46px "Noto Sans TC","Noto Sans CJK TC",sans-serif';g.fillText('LINE',W/2,92);
 g.fillStyle='#F6DC9A';g.font='900 112px "Noto Sans TC","Noto Sans CJK TC",sans-serif';g.fillText('@wylaw',W/2,186);
 g.fillStyle='#FFF3D6';g.font='800 36px "Noto Sans TC","Noto Sans CJK TC",sans-serif';g.fillText('德威陽國際法律事務所',W/2,282);return c}
function faceGeo(w,h,r){const s=new T.Shape(),a=-w/2,b=-h/2;s.moveTo(a+r,b);s.lineTo(-a-r,b);s.quadraticCurveTo(-a,b,-a,b+r);s.lineTo(-a,-b-r);s.quadraticCurveTo(-a,-b,-a-r,-b);s.lineTo(a+r,-b);s.quadraticCurveTo(a,-b,a,-b-r);s.lineTo(a,b+r);s.quadraticCurveTo(a,b,a+r,b);const g=new T.ShapeGeometry(s,10);const p=g.attributes.position,uv=g.attributes.uv;for(let k=0;k<p.count;k++)uv.setXY(k,(p.getX(k)+w/2)/w,(p.getY(k)+h/2)/h);return g}
function buildSign(name,col,dir,base){const G=new T.Group();
 const navyM=new T.MeshStandardMaterial({color:base?shade(base,.55):NAVY,roughness:.38});
 for(const x of[-1.22,1.22]){add(G,new T.CylinderGeometry(.42,.48,.22,32),gold,x,.11,0);add(G,new T.CylinderGeometry(.16,.19,4.4,24),navyM,x,2.4,0);for(const y of[.5,3.9])add(G,new T.CylinderGeometry(.21,.21,.1,24),gold,x,y,0)}
 const B=new T.Group();B.position.y=5.05;B.rotation.x=-.12;G.add(B);
 add(B,RB(3.62,2.42,.22,.5,.07),gold,0,0,0);add(B,RB(3.3,2.1,.36,.38,.02),navyM,0,0,0);
 for(const x of[-1.22,1.22])add(B,new T.SphereGeometry(.2,20,14),gold,x,1.25,0);
 const fc=document.createElement('canvas');fc.width=640;fc.height=404;drawFront(fc,name,col,dir,base);
 const ft=new T.CanvasTexture(fc);ft.colorSpace=T.SRGBColorSpace;ft.anisotropy=8;onLogo.push(()=>{drawFront(fc,name,col,dir,base);ft.needsUpdate=true});
 if(!backTex){backTex=new T.CanvasTexture(drawBack());backTex.colorSpace=T.SRGBColorSpace;backTex.anisotropy=8}
 const fg=faceGeo(3.2,2.02,.32);
 const fm=new T.Mesh(fg,new T.MeshStandardMaterial({map:ft,emissive:'#ffffff',emissiveMap:ft,emissiveIntensity:.32,roughness:.4}));fm.position.z=.215;B.add(fm);
 const bm=new T.Mesh(fg,new T.MeshStandardMaterial({map:backTex,emissive:'#ffffff',emissiveMap:backTex,emissiveIntensity:.16,roughness:.4}));bm.position.z=-.215;bm.rotation.y=Math.PI;B.add(bm);
 G.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});return G}
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

 const NAMES=['德威陽城堡','訴訟法律島','醫療法律島','家庭生活島','企業商務島','法律知識島'];const COLS=[ISL[0][1],ISL[1][1],ISL[2][1],ISL[3][1],ISL[4][1],'#1F5A45'];
 const sets=[];
 O.scene.updateMatrixWorld(true);const OB=[];O.scene.traverse(o=>{if(!o.isMesh||o.isSprite)return;for(let q=o;q;q=q.parent)if(q.visible===false)return;if(!o.geometry.boundingBox)o.geometry.computeBoundingBox();const bb=o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld);const sx=bb.max.x-bb.min.x,sy=bb.max.y-bb.min.y,sz=bb.max.z-bb.min.z;if(!isFinite(sx)||sy<.3||Math.max(sx,sz)>14)return;OB.push({bb,o,small:Math.max(sx,sz)<3.6&&sy<8})});
 const FLAT=[];O.scene.traverse(o=>{if(!o.isMesh||o.isSprite)return;for(let q=o;q;q=q.parent)if(q.visible===false)return;const bb=new T.Box3().setFromObject(o);const sx=bb.max.x-bb.min.x,sz=bb.max.z-bb.min.z;if(!isFinite(sx)||Math.max(sx,sz)>3.5||Math.max(sx,sz)<.12)return;FLAT.push({x:(bb.min.x+bb.max.x)/2,z:(bb.min.z+bb.max.z)/2})});
 const lampsXZ=[];O.scene.traverse(o=>{if(o.userData&&o.userData.wyBridgeLamp){const P=o.getWorldPosition(new T.Vector3());lampsXZ.push([P.x,P.z])}});
 const near=(x,z,R)=>{const gy=O.groundY(x,z),out=[];for(const e of OB){const b=e.bb;if(b.max.y<gy+.3||b.min.y>gy+6.5)continue;const cx=Math.max(b.min.x,Math.min(x,b.max.x)),cz=Math.max(b.min.z,Math.min(z,b.max.z));if(Math.hypot(cx-x,cz-z)<R)out.push(e)}return out};
 // 擋到的只有樹、燈、花盆這類小東西時才搬走（建築不動）；樹被拿掉就收起來不畫
 /* v509：立牌一圈 360 度、5.5 公尺內高過牌面的樹都收起來（任何角度看都不會有樹擋或穿插）；矮花盆、路燈留著 */
 const clearTall=(x,z,R,W)=>{const gy=O.groundY(x,z);for(const e of near(x,z,R)){const b=e.bb,w=Math.max(b.max.x-b.min.x,b.max.z-b.min.z);if(e.bb.max.y<gy+1.7)continue;if(!e.small){const cx=(b.min.x+b.max.x)/2,cz=(b.min.z+b.max.z)/2;if(w>9||b.max.y>gy+12||Math.hypot(cx-x,cz-z)>R)continue}let isLamp=false;for(let q=e.o;q;q=q.parent)if(q.userData&&q.userData.wyBridgeLamp){isLamp=true;break}if(isLamp)continue;let t=e.o;while(t.parent&&t.parent.isGroup&&t.parent!==O.scene&&!t.parent.userData.wyIsland&&new T.Box3().setFromObject(t.parent).getSize(new T.Vector3()).length()<9)t=t.parent;if(!freeStanding(t,gy,W))continue;if(!e.small&&!treeLike(t))continue;t.visible=false;t.userData.wySignHide=1}};
 /* 只收「自己站在地上」的樹和擺設；建築上的窗戶、旗子、花台不動 */
 const treeLike=t=>{let ok=false;t.traverse(o=>{if(ok||!o.isMesh)return;const ty=o.geometry&&o.geometry.type||'';const c=o.material&&o.material.color;if(/Sphere|Icosahedron|Dodecahedron|Octahedron/.test(ty)||c&&c.g>c.r*1.05&&c.g>c.b*1.05)ok=true});return ok};
 const freeStanding=(t,gy,W)=>{const b=new T.Box3().setFromObject(t);if(W&&Math.hypot((b.min.x+b.max.x)/2-W.x,(b.min.z+b.max.z)/2-W.z)<10.5)return false;/* 建築前庭左右對稱的擺設不動 */const dx=b.max.x-b.min.x,dz=b.max.z-b.min.z;return b.min.y<gy+.45&&Math.max(dx,dz)<7&&Math.min(dx,dz)>.6};
 /* 立牌、相機的四周 3.2 公尺內，以及正前方（朝全景鏡頭那一側）10 公尺內的樹和擺設收起來；建築、路面不動 */
 const clearFront=(x,z)=>{const gy=O.groundY(x,z);for(const e of OB){const b=e.bb;if(b.max.y<gy+.6)continue;const cx=(b.min.x+b.max.x)/2,cz=(b.min.z+b.max.z)/2,dx=cx-x,dz=cz-z;if(!(Math.hypot(dx,dz)<4||Math.abs(dx)<4.6&&dz>0&&dz<16))continue;let t=e.o,lamp=false;for(let q=t;q;q=q.parent)if(q.userData&&q.userData.wyBridgeLamp)lamp=true;if(lamp)continue;while(t.parent&&t.parent.isGroup&&t.parent!==O.scene&&!t.parent.userData.wyIsland&&new T.Box3().setFromObject(t.parent).getSize(new T.Vector3()).length()<9)t=t.parent;if(!freeStanding(t,gy,null))continue;if(!e.small&&!treeLike(t))continue;t.visible=false;t.userData.wySignHide=1}};
 const clearOK=(x,z,R)=>near(x,z,R).every(e=>e.small);const clearAll=(x,z,R,W)=>{const gy=O.groundY(x,z);for(const e of near(x,z,R)){if(!e.small)continue;/* 大東西（建築）絕對不收 */let t=e.o;while(t.parent&&t.parent.isGroup&&t.parent!==O.scene&&!t.parent.userData.wyIsland&&new T.Box3().setFromObject(t.parent).getSize(new T.Vector3()).length()<9)t=t.parent;if(!freeStanding(t,gy,W))continue;t.visible=false;t.userData.wySignHide=1}};
 const gyOf=(x,z)=>O.groundY(x,z);
 const place=(G,x,z,face)=>{G.position.set(x,gyOf(x,z)-.06,z);G.rotation.y=face;O.scene.add(G)};
 const ring=()=>{const m=new T.Mesh(new T.TorusGeometry(.62,.06,10,48),gold);m.rotation.x=-Math.PI/2;return m};
 for(let i=0;i<6;i++){
  const g=O.groups()[i];if(!g)continue;const wp=new T.Vector3();g.getWorldPosition(wp);
  let S=null,Cm=null,LD={x:0,z:34};
  if(i===0){// 城堡：大立牌在進廣場處草地、相機在噴水池廣場一側，鏡頭朝訪客走來方向
   for(const [x,z] of [[-7.6,18.6],[-8.2,20],[-7.2,17.4],[-8.8,21.4]])if(clearOK(x,z,1.8)){S={x,z,face:Math.atan2(0-x,32-z)};break}if(!S)S={x:-7.6,z:18.6,face:Math.atan2(7.6,13.4)};
   for(const [x,z] of [[6.2,19.6],[-6.2,19.6],[6.8,18.2],[-6.8,18.2],[5.6,21],[-5.6,21]])if(O.walkAllowed(x+0,z+1.6)&&clearOK(x,z,1.4)){Cm={x,z,face:Math.atan2(0-x,30-z)};break}
   if(!Cm)Cm={x:6.2,z:19.6,face:Math.atan2(-6.2,10.4)};
  }else{
   // 訪客走來的橋：訴訟／家庭從城堡來，醫療／企業從訴訟／家庭來（知識島從中間來）
   const xyA=[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];const FROM=[null,[0,0],[-50,-30],[0,0],[50,-30],[O.center.x,O.center.z]][i];
   const ux=FROM[0]-wp.x,uz=FROM[1]-wp.z,ul=Math.hypot(ux,uz)||1;const u={x:ux/ul,z:uz/ul},v={x:-u.z,z:u.x};
   const at=(r,s)=>({x:wp.x+u.x*r+v.x*s,z:wp.z+u.z*r+v.z*s});
   const g0=gyOf(wp.x,wp.z+9);let re=14,lc=0;
   for(let r=8;r<26;r+=.25){let hit=false;for(let s2=-5;s2<=5;s2+=.5){const p=at(r,s2);if(O.walkAllowed(p.x,p.z)&&Math.abs(gyOf(p.x,p.z)-g0)>.25){hit=true;break}}if(hit){re=r;break}}
   {let sm=0,n=0;for(let s2=-7;s2<=7;s2+=.25){const p=at(re+1.2,s2);if(O.walkAllowed(p.x,p.z)&&Math.abs(gyOf(p.x,p.z)-g0)>.25){sm+=s2;n++}}if(n)lc=sm/n}
   const L=at(re,lc),Lout=at(re+9,lc);LD=at(re+3,lc);const faceTo=(p,t)=>Math.atan2(t.x-p.x,t.z-p.z);
   const onIsle=(x,z)=>Math.abs(gyOf(x,z)-g0)<.3&&Math.hypot(x-wp.x,z-wp.z)<re+.5;
   /* v509：立牌放在島邊的斜前方（正面全景看得到、不擋大門），選離上岸處最近的位置 */
   {let best=null;for(const sg2 of[1,-1])for(let an=.7;an<=1.16;an+=.06)for(const rr of[13.2,12.6,12,11.4,10.8]){const x=wp.x+Math.sin(an*sg2)*rr,z=wp.z+Math.cos(an*sg2)*rr;if(!(onIsle(x,z)||Math.abs(gyOf(x,z)-g0)<.7&&O.walkAllowed(x,z))||!clearOK(x,z,1.8))continue;const dd=Math.hypot(x-L.x,z-L.z);if(!best||dd<best.dd)best={x,z,dd}}if(best)S={x:best.x,z:best.z,face:faceTo(best,Lout),side:1}}
   if(!S)outer:for(const side of[1,-1])for(const d of[.8,1.4,2.0,2.8])for(const s of[10.2,9.6,10.8,9.0,8.4,7.6,7.0]){const p=at(re-d,lc+s*side);if(!onIsle(p.x,p.z))continue;if(Math.abs(Math.atan2(p.x-wp.x,p.z-wp.z))<1.05)continue;/* v509：不站在建築正面（全景看過去會擋大門），放在建築側邊 */if(!clearOK(p.x,p.z,1.7))continue;S={x:p.x,z:p.z,face:faceTo(p,Lout),side};break outer}
   if(!S){/* 側邊找位置：建築左右兩側、靠島邊，選離上岸處最近的 */let best=null;for(const sg2 of[1,-1])for(let an=.95;an<=2.3;an+=.1)for(const rr of[12.8,12,11.2,re-1.2,re-2,re-3]){const x=wp.x+Math.sin(an*sg2)*rr,z=wp.z+Math.cos(an*sg2)*rr;if(!(onIsle(x,z)||Math.abs(gyOf(x,z)-g0)<.7&&O.walkAllowed(x,z))||!clearOK(x,z,1.8))continue;const dd=Math.hypot(x-L.x,z-L.z);if(!best||dd<best.dd)best={x,z,dd}}if(best)S={x:best.x,z:best.z,face:faceTo(best,Lout),side:1};else{const p=at(re-2,lc+4);S={x:p.x,z:p.z,face:faceTo(p,Lout),side:1}}}
   if(i<5){// 相機：建築前（南面）廣場一側，不在大門正前方，鏡頭朝訪客上岸處
    const sx=Math.sign(L.x-wp.x)||1;
    /* v509（陳老闆 17:57）：相機放正門前那一區的島邊斜前方，跟立牌一左一右，鏡頭朝前（背對建築、面向走過來的訪客）；旁邊不能有東西、也不擋建築 */
    {const cs=-(Math.sign(S.x-wp.x)||1);let best=null;for(const sd of[cs,-cs])for(let an=.55;an<=1.05;an+=.05)for(const rr of[12.2,11.6,11,10.4]){const x=wp.x+Math.sin(an*sd)*rr,z=wp.z+Math.cos(an*sd)*rr;if(!(onIsle(x,z)||Math.abs(gyOf(x,z)-g0)<.7&&O.walkAllowed(x,z)))continue;if(Math.hypot(x-S.x,z-S.z)<5)continue;const f=Math.atan2(x-wp.x,z-wp.z);const fx=x+Math.sin(f)*1.9,fz=z+Math.cos(f)*1.9;if(!O.walkAllowed(fx,fz))continue;if(near(x,z,2.0).some(e=>e.bb.max.y>O.groundY(x,z)+.5))continue;const sc=(sd===cs?0:100)+Math.abs(an-.8)*10;if(!best||sc<best.sc)best={x,z,f,sc}}if(best)Cm={x:best.x,z:best.z,face:best.f}}
    if(!Cm)    /* v509：先找旁邊完全沒有樹或擺設的位置（不拿掉東西，建築兩側才會對稱），找不到才用原本的方式 */outer2:for(const strict of[1,0])for(const dz of[8.5,9.5,7.5,10.5,11.5])for(const dx of[5.5,6.5,4.6,7.5,3.8])for(const sd of[sx,-sx]){const x=wp.x+dx*sd,z=wp.z+dz;if(!onIsle(x,z))continue;if(Math.hypot(x-S.x,z-S.z)<4.2)continue;const f=faceTo({x,z},L);const fx=x+Math.sin(f)*1.9,fz=z+Math.cos(f)*1.9;if(!O.walkAllowed(fx,fz))continue;if(!clearOK(x,z,1.5))continue;{const tall=near(x,z,2.0).filter(e=>e.bb.max.y>O.groundY(x,z)+.9);if(tall.some(e=>Math.hypot((e.bb.min.x+e.bb.max.x)/2-wp.x,(e.bb.min.z+e.bb.max.z)/2-wp.z)<10.5))continue;if(strict&&tall.length)continue;}Cm={x,z,face:f};break outer2}
    if(!Cm){const x=wp.x+5.5*sx,z=wp.z+8.5;Cm={x,z,face:faceTo({x,z},L)}}}
  }
  /* v509（陳老闆 11-21 18:09～18:15 定案）：立牌在左、相機在右，放在島正面最外圈邊緣（陳老闆圖上圈的位置），
     朝正面全景鏡頭（+z）；不壓橋、不壓任何擺設、不擋建築；正面是橋時才往橋旁邊挪，仍以正面為主 */
  if(i!==5){const R0=i===0?[30,29,28,27,26,25,24,23,22,21,20]:[15.6,15.2,14.8,14.4,14,13.6,13.2,12.8],AN=[];for(let a=.22;a<=(i===0?.55:1.15);a+=.04)AN.push(a);
   const samp=[];for(let k=0;k<32;k++){const a=k/32*Math.PI*2,r=i===0?R0[3]:13.6;samp.push(Math.round(gyOf(wp.x+Math.sin(a)*r,wp.z+Math.cos(a)*r)*10)/10)}
   const cnt={};samp.forEach(v=>cnt[v]=(cnt[v]||0)+1);const g0=+Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0];
   const lev=(x,z)=>Math.abs(gyOf(x,z)-g0)<.18;
   const spot=sd=>{for(const r of R0)for(const a of AN){const an=a*sd,x=wp.x+Math.sin(an)*r,z=wp.z+Math.cos(an)*r;
     if(!lev(x,z)||!lev(wp.x+Math.sin(an)*(r+.9),wp.z+Math.cos(an)*(r+.9)))continue;
     if(![-.13,.13].every(da=>lev(wp.x+Math.sin(an+da)*r,wp.z+Math.cos(an+da)*r)))continue;   // 旁邊不是橋
     if(FLAT.some(f=>Math.hypot(f.x-x,f.z-z)<(i===0?1.1:1.7)))continue;                                      // 不壓任何擺設（含海星、花盆）
     if(lampsXZ.some(l=>Math.hypot(l[0]-x,l[1]-z)<2.2))continue;
     return {x,z,face:0}}return null};
   const ok1=(x,z,an,r)=>lev(x,z)&&lev(wp.x+Math.sin(an)*(r+.9),wp.z+Math.cos(an)*(r+.9))&&!FLAT.some(f=>Math.hypot(f.x-x,f.z-z)<1.1)&&!lampsXZ.some(l=>Math.hypot(l[0]-x,l[1]-z)<2.2);
   let L1=null,R1=null;if(i===0){outerC:for(const r of R0)for(const a of AN){const xl=wp.x-Math.sin(a)*r,xr=wp.x+Math.sin(a)*r,z=wp.z+Math.cos(a)*r;if(ok1(xl,z,-a,r)&&ok1(xr,z,a,r)){L1={x:xl,z,face:0};R1={x:xr,z,face:0};break outerC}}}   // 城堡左右對稱
   if(!L1)L1=spot(-1);if(!R1)R1=spot(1);if(L1)S=L1;else S.face=0;if(i<5){if(R1)Cm=R1;else if(Cm)Cm.face=0}}
  /* v509（陳老闆 20:18 藍圈定案，23:30 換算成座標）：各島立牌左圈、相機右圈，朝正面 */
  {const OV={'-50,-30':{S:[-58.7,-13.1],C:[-39.2,-14.1]},'-42,-82':{C:[-33.2,-63.9]},'50,-30':{S:[42.5,-11.9],C:[60.5,-12.3]},'42,-82':{S:[36.0,-64.2],C:[56.8,-67.8]}};
   const o=OV[Math.round(wp.x)+','+Math.round(wp.z)];
   const inward=(p)=>{let x=p[0],z=p[1];for(let k=0;k<12;k++){const ok=Math.abs(gyOf(x,z)-gyOf(wp.x,wp.z+9))<.5;if(ok)break;const dx=wp.x-x,dz=wp.z-z,l=Math.hypot(dx,dz)||1;x+=dx/l*.4;z+=dz/l*.4}return {x,z,face:0}};
   if(o){if(o.S)S=inward(o.S);if(o.C&&i<5)Cm=inward(o.C)}}
  // 箭頭方向：相機在立牌的哪一邊（從立牌正面看）
  let dir=1;if(Cm){const dx=Cm.x-S.x,dz=Cm.z-S.z;const lx=dx*Math.cos(S.face)-dz*Math.sin(S.face);dir=lx>=0?1:-1}
  const sg=buildSign(NAMES[i],COLS[i],Cm?dir:0,SIGNCOL[i]);sg.scale.setScalar(1.15);place(sg,S.x,S.z,S.face);
  try{for(const sx of[-1.22,1.22]){const c=Math.cos(S.face),sn=Math.sin(S.face);O.addSolid(S.x+sx*1.15*c,S.z-sx*1.15*sn,.4,.4)}}catch(e){}
  if(!Cm){sets.push({i,grp:sg,sign:sg,wp,LD});continue}
  
  const grp=new T.Group();const cm=buildCam(i);cm.scale.setScalar(1.18);grp.add(cm);place(grp,Cm.x,Cm.z,Cm.face);grp.scale.setScalar(1.15);
  const rg=ring();rg.position.set(0,.09,1.9);grp.add(rg);
  const b=bubbleSprite();b.position.set(0,4.95,0);b.visible=false;grp.add(b);
  try{O.addSolid(Cm.x,Cm.z,.9,.9)}catch(e){}
  const hit=new T.Mesh(new T.BoxGeometry(1.8,4.6,1.6),new T.MeshBasicMaterial({visible:false}));hit.position.set(0,2.3,0);grp.add(hit);hit.userData.wyPhoto=i;b.userData.wyPhoto=i;
  sets.push({i,grp,b,hit,cm,sign:sg,wp,LD});
 }
 try{window.wyLight&&window.wyLight.refresh&&window.wyLight.refresh()}catch(e){}
 const targets=sets.filter(s=>s.hit).flatMap(s=>[s.hit,s.b]);
 let t=0;
 function tick(dt){t+=dt;let io=false;try{io=O.inside()}catch(e){}if(io)return;const a=O.actor();if(!a)return;
  for(const s of sets){if(!s.cm)continue;const wp=new T.Vector3();s.cm.getWorldPosition(wp);const near=Math.hypot(a.position.x-wp.x,a.position.z-wp.z)<5.2;s.b.visible=near;if(near)s.b.position.y=4.95+Math.sin(t*2.4)*.07}}
 /* v509（陳老闆 18:14）：360 度看立牌和相機都不能被擋：從 12 個方向往它們看，只收「真的擋到」的樹、小擺設、路燈；建築不動；城堡左右對稱一起收 */
 const occl=()=>{try{const rc=new T.Raycaster(),mir=[];const ALL=new Set();for(const st of sets){st.sign&&st.sign.traverse(o=>ALL.add(o));st.grp&&st.grp.traverse(o=>ALL.add(o))}for(const st of sets){for(const obj of [st.sign,st.grp]){if(!obj)continue;const P=obj.getWorldPosition(new T.Vector3()),gy=O.groundY(P.x,P.z);const mine=new Set();obj.traverse(o=>mine.add(o));
    const cand=[];O.scene.traverse(o=>{if(!o.isMesh||o.isSprite||mine.has(o)||ALL.has(o))return;for(let q=o;q;q=q.parent)if(!q.visible)return;const bb=new T.Box3().setFromObject(o);if(bb.distanceToPoint(P)<13&&Math.max(bb.max.x-bb.min.x,bb.max.z-bb.min.z)<9)cand.push(o)});
    for(let k=0;k<24;k++){const a=(k%12)/12*Math.PI*2,far=k>=12;const eye=new T.Vector3(P.x+Math.sin(a)*(far?20:11),gy+(far?10:4),P.z+Math.cos(a)*(far?20:11));for(const h of [1.6,3.2,5]){const tg=new T.Vector3(P.x,gy+h,P.z),dir=tg.clone().sub(eye),L=dir.length();rc.set(eye,dir.normalize());rc.far=L-.6;
      for(const hit of rc.intersectObjects(cand,false)){if(hit.point.distanceTo(tg)>12)continue;let t=hit.object;while(t.parent&&t.parent.isGroup&&t.parent!==O.scene&&!t.parent.userData.wyIsland&&new T.Box3().setFromObject(t.parent).getSize(new T.Vector3()).length()<9)t=t.parent;
       let lamp=false;for(let q=hit.object;q;q=q.parent)if(q.userData&&q.userData.wyBridgeLamp){lamp=true;t=q;break}
       if(!lamp){const bb=new T.Box3().setFromObject(t),dx=bb.max.x-bb.min.x,dz=bb.max.z-bb.min.z;if(!(bb.min.y<gy+.6&&Math.max(dx,dz)<7&&Math.min(dx,dz)>.3))continue;if(!treeLike(t)&&Math.max(dx,dz)>3.6)continue;if(st.i!==0&&Math.hypot((bb.min.x+bb.max.x)/2-st.wp.x,(bb.min.z+bb.max.z)/2-st.wp.z)<10.5)continue}
       if(t.visible){t.visible=false;t.userData.wySignHide=1;if(st.i===0){const c=new T.Box3().setFromObject(t).getCenter(new T.Vector3());mir.push([-c.x,c.z])}}}}}}}
  /* 正前方（朝全景鏡頭那一側）9 公尺內、左右 3.5 公尺內的樹和路燈也收：從正面看立牌、相機不會被前景擋住 */
  for(const st of sets){if(st.i===5)continue;for(const obj of [st.sign,st.grp]){if(!obj)continue;const P=obj.getWorldPosition(new T.Vector3());O.scene.traverse(o=>{if(!o.isMesh||ALL.has(o))return;for(let q=o;q;q=q.parent)if(!q.visible)return;const bb=new T.Box3().setFromObject(o);const c=bb.getCenter(new T.Vector3());const dz=c.z-P.z,dx=Math.abs(c.x-P.x);if(!(dz>.5&&dz<12&&dx<4)||bb.max.y<P.y+2)return;
   let t=o,lamp=false;for(let q=o;q;q=q.parent)if(q.userData&&q.userData.wyBridgeLamp){lamp=true;t=q;break}if(!lamp){while(t.parent&&t.parent.isGroup&&t.parent!==O.scene&&!t.parent.userData.wyIsland&&new T.Box3().setFromObject(t.parent).getSize(new T.Vector3()).length()<9)t=t.parent;const b2=new T.Box3().setFromObject(t);const trunk=/Cylinder/.test(o.geometry.type)&&(bb.max.y-bb.min.y)>1.5&&Math.max(bb.max.x-bb.min.x,bb.max.z-bb.min.z)<1.2;if(Math.max(b2.max.x-b2.min.x,b2.max.z-b2.min.z)>7||!(treeLike(t)||trunk))return;if(trunk)t=o}
   t.visible=false;t.userData.wySignHide=1;if(st.i===0){const c2=new T.Box3().setFromObject(t).getCenter(new T.Vector3());mir.push([-c2.x,c2.z])}})}}
  if(mir.length)O.scene.traverse(o=>{if(!o.isMesh||!o.visible||ALL.has(o))return;const c=new T.Box3().setFromObject(o).getCenter(new T.Vector3());for(const [mx,mz] of mir)if(Math.hypot(c.x-mx,c.z-mz)<1.2){let t=o;while(t.parent&&t.parent.isGroup&&t.parent!==O.scene&&new T.Box3().setFromObject(t.parent).getSize(new T.Vector3()).length()<9)t=t.parent;let mineT=false;t.traverse(q=>{if(ALL.has(q))mineT=true});if(!mineT&&treeLike(t)){t.visible=false;t.userData.wySignHide=1}}})
 }catch(e){console.error('signcam occl',e)}};
 setTimeout(occl,1500);setTimeout(occl,6000);
return {tick,targets,sets};
}
