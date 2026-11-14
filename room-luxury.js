// v463 醫療／企業／家庭 主題館內裝質感升級（2026-11-14）
// 原則與訴訟島相同：家具、位置、走道、顏色全部不變，只把材質改為石材紋、木紋、布料光澤、緞面金屬，並加柔和陰影。
// 不處理：人物（userData.label）、貼圖招牌與螢幕（有 map）、玻璃（透明）、發光物、植物（綠色系）。
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

let shared=null;
function setup(THREE,renderer){
 if(shared)return shared;
 const pmrem=new THREE.PMREMGenerator(renderer);
 const envTex=pmrem.fromScene(new RoomEnvironment(),.04).texture;pmrem.dispose();
 const rnd=seed=>{let s=seed;return()=>((s=Math.imul(s^s>>>15,1|s)+0x6D2B79F5|0,((s^s>>>14)>>>0)/4294967296))};
 const tex=(draw,size=1024)=>{const c=document.createElement('canvas');c.width=c.height=size;draw(c.getContext('2d'),size);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;return t};
 const marble=(veins,seed,alpha)=>tex((g,S)=>{const r=rnd(seed);g.fillStyle='#fff';g.fillRect(0,0,S,S);
  for(let k=0;k<14;k++){let x=r()*S,y=r()*S,a=r()*Math.PI*2;g.strokeStyle=veins[k%veins.length];g.globalAlpha=alpha*(.35+r()*.65);g.lineWidth=.6+r()*2.6;g.beginPath();g.moveTo(x,y);
   for(let j=0;j<60;j++){a+=(r()-.5)*.5;x+=Math.cos(a)*16;y+=Math.sin(a)*16;g.lineTo(x,y)}g.stroke();g.globalAlpha=alpha*.25;g.lineWidth=6+r()*10;g.stroke()}g.globalAlpha=1});
 const wood=(dark,seed)=>tex((g,S)=>{const r=rnd(seed);g.fillStyle='#fff';g.fillRect(0,0,S,S);
  for(let x=0;x<S;x+=2){const w=Math.sin(x*.045+r()*.4)*.5+.5;g.fillStyle=dark;g.globalAlpha=.08+w*.22*r();g.fillRect(x,0,1+r()*2,S)}
  for(let k=0;k<26;k++){g.globalAlpha=.12+r()*.18;g.strokeStyle=dark;g.lineWidth=1+r()*3;const x0=r()*S;g.beginPath();for(let y=0;y<=S;y+=16)g.lineTo(x0+Math.sin(y*.012+k)*14,y);g.stroke()}g.globalAlpha=1});
 const fabric=seed=>tex((g,S)=>{const r=rnd(seed);g.fillStyle='#fff';g.fillRect(0,0,S,S);for(let i=0;i<9000;i++){g.fillStyle=`rgba(0,0,0,${r()*.07})`;g.fillRect(r()*S,r()*S,2,2)}},512);
 shared={envTex,T:{stone:marble(['#e4e1dc','#ece4d6'],11,.4),floor:marble(['#dedad3','#e9dfcd'],19,.45),wood:wood('#ddd0c4',71),fabric:fabric(97)},cache:new Map()};
 return shared;
}
function classify(m,isFloor,furn){
 if(m.metalness>.3)return 'metal';
 if(isFloor)return 'floor';
 const hsl={};m.color.getHSL(hsl);
 if(hsl.h>.2&&hsl.h<.45&&hsl.s>.15)return 'plant';
 if(hsl.l>.8)return furn?'enamel':'stone';
 if(hsl.h>=.02&&hsl.h<=.13&&hsl.s>.2&&hsl.l<.6)return 'wood';
 if(hsl.s>.18&&hsl.l>=.3)return 'fabric';
 return 'lacquer';
}
function upgrade(THREE,S,m,isFloor,furn){
 const id=m.uuid+(isFloor?'f':'')+(furn?'u':'');if(S.cache.has(id))return S.cache.get(id);
 const kind=classify(m,isFloor,furn);let n=null;
 const base={color:m.color.clone(),envMap:S.envTex,side:m.side};
 if(kind==='metal')n=new THREE.MeshPhysicalMaterial({...base,metalness:Math.max(m.metalness,.6),roughness:.42,envMapIntensity:.45});
 else if(kind==='floor')n=new THREE.MeshPhysicalMaterial({...base,map:S.T.floor,roughness:.45,clearcoat:.25,clearcoatRoughness:.45,envMapIntensity:.15});
 else if(kind==='stone')n=new THREE.MeshPhysicalMaterial({...base,map:S.T.stone,roughness:.6,clearcoat:.12,clearcoatRoughness:.5,envMapIntensity:.1});
 else if(kind==='wood')n=new THREE.MeshPhysicalMaterial({...base,map:S.T.wood,roughness:.48,clearcoat:furn?.5:.3,clearcoatRoughness:.28,envMapIntensity:.2});
 else if(kind==='enamel')n=new THREE.MeshPhysicalMaterial({...base,roughness:.42,clearcoat:.5,clearcoatRoughness:.25,envMapIntensity:.18}); // 白色櫃體：細緻烤漆
 else if(kind==='fabric')n=new THREE.MeshPhysicalMaterial({...base,map:S.T.fabric,roughness:.85,sheen:furn?.7:.5,sheenRoughness:.5,sheenColor:m.color.clone().offsetHSL(0,0,.06),envMapIntensity:.08});
 else if(kind==='lacquer')n=new THREE.MeshPhysicalMaterial({...base,roughness:.45,clearcoat:furn?.5:.3,clearcoatRoughness:.28,envMapIntensity:.18});
 S.cache.set(id,n);return n;
}
function skip(o){
 for(let p=o;p;p=p.parent){if(p.userData&&(p.userData.label||p.userData.wyNoLux))return true}
 const m=o.material;
 return !m||Array.isArray(m)||!m.isMeshStandardMaterial||m.map||m.transparent||m.opacity<1||(m.emissive&&m.emissive.getHex()!==0&&m.emissiveIntensity>0);
}

/* 遠看也看得出來的高級細節：沿用房間原有的金色做頂緣金邊、櫃門鑲板線、深色踢腳。 */
function roomGold(THREE,scene){
 const count=new Map();
 scene.traverse(o=>{const m=o.material;if(o.isMesh&&m&&!Array.isArray(m)&&m.isMeshStandardMaterial&&m.metalness>.3&&!m.map){const h=m.color.getHex();count.set(h,(count.get(h)||0)+1)}});
 let best=0xC9A66B,n=0;for(const [h,c] of count)if(c>n){n=c;best=h}
 return best;
}
function trimFor(THREE,S,o,p,gold){
 const w=p.width,h=p.height,d=p.depth,parts=[],dark=[];
 const bar=(bw,bh,bd,x,y,z,list)=>{const g=new THREE.BoxGeometry(bw,bh,bd);g.translate(x,y,z);list.push(g)};
 const t=Math.min(.04,Math.max(.018,Math.min(w,d)*.05));
 // 頂緣金邊
 const ty=h/2-t/2;
 bar(w+t,t,t,0,ty,d/2,parts);bar(w+t,t,t,0,ty,-d/2,parts);bar(t,t,d+t,w/2,ty,0,parts);bar(t,t,d+t,-w/2,ty,0,parts);
 if(h>.6){
  // 深色踢腳
  const by=-h/2+.05;
  bar(w+t*.6,.1,t*.8,0,by,d/2,dark);bar(w+t*.6,.1,t*.8,0,by,-d/2,dark);bar(t*.8,.1,d+t*.6,w/2,by,0,dark);bar(t*.8,.1,d+t*.6,-w/2,by,0,dark);
  // 櫃門鑲板線（四個立面，各一個內框）
  const lt=Math.min(.025,t*.7),ph=h*.62,py=.02;
  for(const [fw,fz,rot] of [[w,d/2,0],[w,-d/2,0],[d,w/2,1],[d,-w/2,1]]){
   if(fw<.45)continue;const pw=fw*.78,off=lt/2+.004;
   const add=(bw,bh,x,y)=>{const g=new THREE.BoxGeometry(bw,bh,lt);if(rot){g.rotateY(Math.PI/2);g.translate(fz+Math.sign(fz)*off,y,x)}else g.translate(x,y,fz+Math.sign(fz)*off);parts.push(g)};
   add(pw,lt,0,py+ph/2);add(pw,lt,0,py-ph/2);add(lt,ph,-pw/2,py);add(lt,ph,pw/2,py);
  }
 }
 const grp=new THREE.Group();grp.userData.wyLux=true;
 const mk=(list,mat)=>{if(!list.length)return;const m=new THREE.Mesh(mergeGeometries(list),mat);m.castShadow=true;m.userData={...o.userData,wyLux:true};grp.add(m)};
 if(!S.goldMat||S.goldHex!==gold){S.goldHex=gold;S.goldMat=new THREE.MeshPhysicalMaterial({color:gold,metalness:.75,roughness:.32,envMap:S.envTex,envMapIntensity:.6})}
 mk(parts,S.goldMat);
 mk(dark,new THREE.MeshPhysicalMaterial({color:o.material.color.clone().offsetHSL(0,0,-.18),roughness:.6,envMap:S.envTex,envMapIntensity:.1}));
 o.add(grp);return grp;
}
// 套用（可重複呼叫，只處理尚未升級的物件）。回傳可還原的紀錄，供預覽頁切換原版。
export function applyRoomLuxury(scene,THREE,renderer){
 const S=setup(THREE,renderer);const swaps=[];if(!S.geo)S.geo=new Map();const gold=roomGold(THREE,scene);
 const wb=new THREE.Box3(),size=new THREE.Vector3();
 scene.traverse(o=>{
  if(!o.isMesh||o.userData.wyLux||skip(o))return;
  o.geometry.computeBoundingBox();const bb=o.geometry.boundingBox,sc=new THREE.Vector3();o.getWorldScale(sc);
  const isFloor=(bb.max.x-bb.min.x)*sc.x>16&&(bb.max.z-bb.min.z)*sc.z>12&&(bb.max.y-bb.min.y)*sc.y<1;
  wb.setFromObject(o);wb.getSize(size);const furn=!isFloor&&Math.max(size.x,size.y,size.z)<8;
  const n=upgrade(THREE,S,o.material,isFloor,furn);if(!n)return;
  // 家具的方形零件改為圓角（尺寸、位置完全相同，只把銳利直角修成精緻倒角）
  let g0=o.geometry,g1=g0;
  if(furn&&g0.type==='BoxGeometry'){
   const p=g0.parameters,k=g0.uuid;
   if(!S.geo.has(k)){const mn=Math.min(p.width,p.height,p.depth);S.geo.set(k,mn>.04?new RoundedBoxGeometry(p.width,p.height,p.depth,3,Math.min(.07,mn*.2)):g0)}
   g1=S.geo.get(k);
  }
  let tr=null;
  if(furn&&g0.type==='BoxGeometry'&&n){const p=g0.parameters,hsl={};o.material.color.getHSL(hsl);
   const big=Math.max(p.width,p.depth)>.6&&p.width*p.height*p.depth>.12&&o.material.metalness<=.3;
   if(big&&!(hsl.h>.2&&hsl.h<.45&&hsl.s>.15))tr=trimFor(THREE,S,o,p,gold);}
  swaps.push([o,o.material,n,g0,g1,tr]);o.material=n;o.geometry=g1;o.userData.wyLux=true;o.castShadow=true;o.receiveShadow=true;
 });
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
 scene.traverse(l=>{if(l.isDirectionalLight&&!l.castShadow){l.castShadow=true;l.shadow.mapSize.set(2048,2048);Object.assign(l.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:120});l.shadow.camera.updateProjectionMatrix();l.shadow.bias=-.0004;l.shadow.normalBias=.04;l.shadow.radius=8}});
 return swaps;
}
