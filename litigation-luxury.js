// v460 訴訟島內裝質感升級（2026-11-14）
// 原則：家具、位置、走道、顏色全部不變；只把材質改為石材紋、木紋烤漆、絨布、拋光金屬，並加柔和陰影。
// 左前方正義女神像改為新雕塑（justice.js），位置與高度對齊原雕像，互動區域維持 'usa'。
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {createJustice} from './justice.js?v=460';
export function applyLitigationLuxury(root,THREE,renderer,scene,interior){
 /* ---------- 頂級版：程式繪製材質（非圖片、非 AI） ---------- */
 const pmrem=new THREE.PMREMGenerator(renderer);
 const envTex=pmrem.fromScene(new RoomEnvironment(),.04).texture;pmrem.dispose();
 function rnd(seed){let s=seed;return()=>((s=Math.imul(s^s>>>15,1|s)+0x6D2B79F5|0,((s^s>>>14)>>>0)/4294967296))}
 function canvasTex(draw,size=1024,repeat=1){const c=document.createElement('canvas');c.width=c.height=size;draw(c.getContext('2d'),size);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeat,repeat);t.anisotropy=8;return t}
 function marble(base,veins,seed,veinAlpha=.35){return canvasTex((g,S)=>{const r=rnd(seed);g.fillStyle=base;g.fillRect(0,0,S,S);
  for(let i=0;i<2600;i++){g.fillStyle=`rgba(255,255,255,${r()*.05})`;g.fillRect(r()*S,r()*S,2+r()*30,2+r()*30)}
  for(let k=0;k<14;k++){let x=r()*S,y=r()*S,a=r()*Math.PI*2;g.strokeStyle=veins[k%veins.length];g.globalAlpha=veinAlpha*(.35+r()*.65);g.lineWidth=.6+r()*2.6;g.beginPath();g.moveTo(x,y);
   for(let j=0;j<60;j++){a+=(r()-.5)*.5;x+=Math.cos(a)*16;y+=Math.sin(a)*16;g.lineTo(x,y)}g.stroke();
   g.globalAlpha=veinAlpha*.25;g.lineWidth=6+r()*10;g.stroke()}
  g.globalAlpha=1})}
 function wood(base,dark,seed){return canvasTex((g,S)=>{const r=rnd(seed);g.fillStyle=base;g.fillRect(0,0,S,S);
  for(let x=0;x<S;x+=2){const w=Math.sin(x*.045+r()*.4)*.5+.5;g.fillStyle=dark;g.globalAlpha=.08+w*.22*r();g.fillRect(x,0,1+r()*2,S)}
  for(let k=0;k<26;k++){g.globalAlpha=.12+r()*.18;g.strokeStyle=dark;g.lineWidth=1+r()*3;const x0=r()*S;g.beginPath();for(let y=0;y<=S;y+=16){g.lineTo(x0+Math.sin(y*.012+k)*14,y)}g.stroke()}
  g.globalAlpha=1})}
 function velvetTex(base,seed){return canvasTex((g,S)=>{const r=rnd(seed);g.fillStyle=base;g.fillRect(0,0,S,S);for(let i=0;i<9000;i++){g.fillStyle=`rgba(0,0,0,${r()*.08})`;g.fillRect(r()*S,r()*S,2,2)}},512)}
 
 /* 紋理全部為白底淺紋，與原本顏色相乘，所以顏色維持不變，只增加質感 */
 const T={
  marble:marble('#ffffff',['#e4e1dc','#ece4d6'],11,.4),
  floor:marble('#ffffff',['#dedad3','#e9dfcd'],19,.45),
  wood:wood('#ffffff','#ddd0c4',71),
  velvet:velvetTex('#ffffff',97)
 };
 const cache=new Map();
 function upgrade(m,isFloor){
  const id=m.uuid+(isFloor?'f':'');if(cache.has(id))return cache.get(id);
  const c=m.color.clone(),hsl={};c.getHSL(hsl);const hx='#'+c.getHexString().toUpperCase();
  const VEL=['#F5B6AD','#EBA17C','#995B57'],WOOD=['#F29A64','#DA8247','#BC683F','#C58B68','#263B57'],STONE=['#F9E4C2','#F8DFC0','#F5D6A9','#EAC69B'],METAL=['#E8BA60','#D3AE68','#B78A48','#81603B','#D6AA65'];
  const kind=METAL.includes(hx)||m.metalness>.3?'metal':isFloor?'floor':VEL.includes(hx)?'velvet':STONE.includes(hx)?'stone':WOOD.includes(hx)?'wood':hsl.l>.72?'stone':'wood';
  const base={color:c,envMap:envTex};let n;
  if(kind==='metal'){ // 金色金屬：保持原色，改為拋光金屬並有真實反射
   n=new THREE.MeshPhysicalMaterial({...base,metalness:Math.max(m.metalness,.6),roughness:.42,envMapIntensity:.45});
  }else if(kind==='floor'){ // 地坪：原色大理石紋＋亮面
   n=new THREE.MeshPhysicalMaterial({...base,map:T.floor,roughness:.45,clearcoat:.25,clearcoatRoughness:.45,envMapIntensity:.15});
  }else if(kind==='stone'){ // 牆面與象牙色檯面：原色石材紋
   n=new THREE.MeshPhysicalMaterial({...base,map:T.marble,roughness:.6,clearcoat:.12,clearcoatRoughness:.5,envMapIntensity:.1});
  }else if(kind==='velvet'){ // 粉紅、蜜桃色椅面：原色絨布光澤
   n=new THREE.MeshPhysicalMaterial({...base,map:T.velvet,roughness:.85,sheen:.5,sheenRoughness:.6,sheenColor:c.clone().offsetHSL(0,0,.06),envMapIntensity:.08});
  }else{ // 橘色、焦糖色家具：原色木紋＋鋼琴烤漆
   n=new THREE.MeshPhysicalMaterial({...base,map:T.wood,roughness:.55,clearcoat:.3,clearcoatRoughness:.4,envMapIntensity:.12});
  }
  cache.set(id,n);return n;
 }
 const swaps=[];
 root.traverse(o=>{
  if(!o.isMesh||!o.material||Array.isArray(o.material)||!o.material.isMeshStandardMaterial)return; // 官方 Logo 等貼圖保持原樣
  o.geometry.computeBoundingBox();const bb=o.geometry.boundingBox;
  const isFloor=(bb.max.x-bb.min.x)*o.scale.x>18&&(bb.max.z-bb.min.z)*o.scale.z>15&&(bb.max.y-bb.min.y)*o.scale.y<1;
  swaps.push([o,o.material,upgrade(o.material,isFloor)]);
 });
 /* 正義女神像：移除舊雕像，換成新雕塑 */
 let oldStatue=null,best=0;
 for(const o of root.children){if(!o.isGroup)continue;let n=0,usa=false;o.traverse(c=>{if(c.isMesh){n++;if(c.userData.litigationZone==='usa')usa=true}});if(usa&&n>best){best=n;oldStatue=o}}
 const newStatue=createJustice(THREE);
 if(oldStatue){
  newStatue.position.copy(oldStatue.position);newStatue.rotation.copy(oldStatue.rotation);
  const hb=new THREE.Box3().setFromObject(oldStatue),nb=new THREE.Box3().setFromObject(newStatue);
  const k=(hb.max.y-hb.min.y)/(nb.max.y-nb.min.y);if(isFinite(k)&&k>0)newStatue.scale.setScalar(k*1.05);
  const oldMeshes=new Set();oldStatue.traverse(c=>{if(c.isMesh)oldMeshes.add(c)});
  if(interior&&interior.targets){for(let i=interior.targets.length-1;i>=0;i--)if(oldMeshes.has(interior.targets[i]))interior.targets.splice(i,1)}
  root.remove(oldStatue);
 }else newStatue.position.set(-11,1.78,12.3);
 newStatue.traverse(c=>{if(c.isMesh){c.userData.litigationZone='usa';if(interior&&interior.targets)interior.targets.push(c)}});
 root.add(newStatue);
 /* 套用新材質與陰影 */
 root.traverse(o=>{
  if(!o.isMesh||!o.material||Array.isArray(o.material)||!o.material.isMeshStandardMaterial)return; // 官方 Logo 等貼圖保持原樣
  o.geometry.computeBoundingBox();const bb=o.geometry.boundingBox;
  const isFloor=(bb.max.x-bb.min.x)*o.scale.x>18&&(bb.max.z-bb.min.z)*o.scale.z>15&&(bb.max.y-bb.min.y)*o.scale.y<1;
  o.material=upgrade(o.material,isFloor);o.castShadow=true;o.receiveShadow=true;
 });
 /* 沿用原本燈光，只讓主光投下柔和陰影 */
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
 scene.traverse(l=>{if(l.isDirectionalLight){l.castShadow=true;l.shadow.mapSize.set(2048,2048);Object.assign(l.shadow.camera,{left:-24,right:24,top:24,bottom:-24,near:1,far:80});l.shadow.camera.updateProjectionMatrix();l.shadow.bias=-.0004;l.shadow.normalBias=.04;l.shadow.radius=8;}});
 return {version:'v460',statue:newStatue};
}
