// v466 四座主題島外觀精修（2026-11-14 第二輪，依林律師回饋）
// 原則：不改任何原有顏色、位置、旗幟與 Logo；不加階梯、不疊高、不發光、不用透明玻璃；只用該島原本的主題色。
//  訴訟島（已核可，再加高級）：①白色屋頂砂色屋面＋金褐簷口 ②中央德威陽 Logo 圓牌（放大、深底）
//                               ③四根大柱加金色柱頭環、柱腳環 ④大門與兩翼藍色窗加金色窗框與橫楣
//                               ⑤圓角亭藍窗金框 ⑥前廣場地面赤陶大圓環＋金色內圈
//  醫療島（重做，撤掉墨綠）：①兩座玻璃圓塔加兩道香檳金樓層環 ②主樓正面大門兩側加珍珠白基座＋香檳金收邊（大門前淨空）③正面轉角香檳金角柱 ④步道兩側金色鑲邊
//  企業島（已核可，再加高級）：①塔頂金色收頂線 ②門面金帶 ③Logo 招牌加金框 ④兩側大樓加深金色基座 ⑤主塔與入口量體轉角金線
//  家庭島（第四輪）：只保留酒紅大屋頂的金色山牆鑲邊、屋簷金線、屋脊金頂；＋正面轉角金色角柱＋玫瑰飾帶上緣金線；圓窗、塔頂金環、頂飾、塔窗全部拿掉

export function applyExteriorLuxury(root,THREE,renderer,kind){
 const adds=[],hidden=[];
 const hex=m=>m&&m.color?'#'+m.color.getHexString().toUpperCase():'';
 const meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o)});
 const findMat=h=>{for(const o of meshes)if(hex(o.material)===h)return o.material;return null};
 const std=(c,metal=0,rough=.6)=>new THREE.MeshStandardMaterial({color:c,metalness:metal,roughness:rough});
 const put=(parent,geo,mat,x,y,z)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.userData={...parent.userData,wyExtLux:true};parent.add(o);adds.push(o);return o};
 const near=(o,x,y,z,e=.02)=>Math.abs(o.position.x-x)<e&&Math.abs(o.position.y-y)<e&&Math.abs(o.position.z-z)<e;
 const isBox=(o,w,h,d)=>{if(o.geometry.type!=='BoxGeometry')return false;const p=o.geometry.parameters;return Math.abs(p.width-w)<.01&&Math.abs(p.height-h)<.01&&Math.abs(p.depth-d)<.01};
 const isCyl=(o,rt,rb,h)=>{if(o.geometry.type!=='CylinderGeometry')return false;const p=o.geometry.parameters;return Math.abs(p.radiusTop-rt)<.01&&Math.abs(p.radiusBottom-rb)<.01&&Math.abs(p.height-h)<.01};
 const ring=(parent,r,t,mat,x,y,z,seg=48)=>{const o=put(parent,new THREE.TorusGeometry(r,t,10,seg),mat,x,y,z);o.rotation.x=Math.PI/2;return o};
 // 貼在方塊正面的內框（不超出原本外緣）＋可選橫楣
 const faceFrame=(o,t,dep,mat,transom)=>{const p=o.geometry.parameters,z=p.depth/2+dep/2;
  put(o,new THREE.BoxGeometry(p.width,t,dep),mat,0,p.height/2-t/2,z);
  put(o,new THREE.BoxGeometry(p.width,t,dep),mat,0,-p.height/2+t/2,z);
  put(o,new THREE.BoxGeometry(t,p.height-2*t,dep),mat,p.width/2-t/2,0,z);
  put(o,new THREE.BoxGeometry(t,p.height-2*t,dep),mat,-p.width/2+t/2,0,z);
  if(transom!=null)put(o,new THREE.BoxGeometry(p.width-2*t,t*.8,dep),mat,0,transom,z)};
 // 方塊外圍四邊收邊
 const edgeFrame=(o,t,h,mat)=>{const p=o.geometry.parameters;
  put(o,new THREE.BoxGeometry(p.width+2*t,h,t),mat,0,0,p.depth/2+t/2);put(o,new THREE.BoxGeometry(p.width+2*t,h,t),mat,0,0,-p.depth/2-t/2);
  put(o,new THREE.BoxGeometry(t,h,p.depth),mat,p.width/2+t/2,0,0);put(o,new THREE.BoxGeometry(t,h,p.depth),mat,-p.width/2-t/2,0,0)};

 if(kind==='litigation'){
  const sand=findMat('#F5D9B7')||std('#f5d9b7'),gold=findMat('#D2A66D')||std('#d2a66d',.22,.5),terra=findMat('#C66C42')||std('#c66c42');
  // ① 白色屋頂：砂色屋面＋金褐色簷口線
  for(const o of meshes){
   if(hex(o.material)!=='#FFFDF5'||o.geometry.type!=='BoxGeometry')continue;
   const p=o.geometry.parameters;if(p.height>.35||p.width<3||p.width>18.5)continue;
   put(o,new THREE.BoxGeometry(p.width-.7,.05,p.depth-.7),sand,0,p.height/2+.035,0);
   edgeFrame(o,.09,p.height+.06,gold);
  }
  // ② 中央圓形裝飾 → 德威陽 Logo 金框圓牌
  for(const o of meshes){
   if((o.geometry.type==='SphereGeometry'&&near(o,0,13.62,5.19))||(o.geometry.type==='TorusGeometry'&&near(o,0,13.62,5.44))){o.visible=false;hidden.push(o)}
  }
  const host=meshes.find(o=>near(o,0,13.62,5.19))?.parent||root;
  // 圓牌放大：深赤陶底（比原赤陶深，金色 Logo 才跳得出來）、金色粗框、Logo 原圖放大近一倍
  const deep=findMat('#A66D52')||std('#a66d52'),C=[0,14.0,5.3];
  const disc=put(host,new THREE.CylinderGeometry(1.95,1.95,.2,64),deep,...C);disc.rotation.x=Math.PI/2;
  put(host,new THREE.TorusGeometry(1.95,.17,12,64),gold,C[0],C[1],5.42);
  put(host,new THREE.TorusGeometry(1.62,.05,8,64),gold,C[0],C[1],5.41);
  const tex=new THREE.TextureLoader().load('office-logo-transparent.png');tex.colorSpace=THREE.SRGBColorSpace;
  put(host,new THREE.PlaneGeometry(4.2,4.2),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}),C[0],C[1],5.47);
  // ③ 四根大柱：金色柱頭環（雙環）＋柱腳環
  for(const o of meshes){
   if(!isCyl(o,.48,.56,10.45))continue;
   ring(o,.53,.09,gold,0,4.62,0,32);ring(o,.52,.06,gold,0,4.92,0,32);
   ring(o,.62,.1,gold,0,-4.82,0,32);
  }
  // ④ 藍色大門與兩翼拱窗：金色窗框＋上方橫楣（像古典銅門）
  for(const o of meshes){
   if(hex(o.material)!=='#83B5C0')continue;
   if(isBox(o,6.5,8.75,.12))faceFrame(o,.2,.08,gold,2.35);
   else if(isBox(o,1.8,5.25,.16))faceFrame(o,.13,.08,gold,1.35);
   else if(isBox(o,.8,5.2,.25))faceFrame(o,.1,.06,gold,1.4);   // ⑤ 兩側圓角亭的藍窗也加金框
  }
  // ⑥ 前廣場地面：赤陶色大圓環鑲嵌＋金色內圈（平貼地面，略高於地面避免閃爍）
  const flat=(r,t,mat,sz)=>{const o=ring(root,r,t,mat,0,.16,4.5,96);o.scale.z=sz;return o};
  flat(7.6,.34,terra,.14);flat(6.95,.1,gold,.4);
 }

 if(kind==='medical'){
  const gold=findMat('#DAC08A')||std('#dac08a',.42,.3),pearl=findMat('#FFFBF4')||std('#fffbf4',.07,.38);
  // ① 兩座玻璃圓塔：兩道香檳金樓層環（把塔身分成三段，像高級玻璃圓廳）
  for(const s of [-1,1])for(const y of [3.55,6.85])ring(root,3.15,.13,gold,s*9.15,y,-2.1,64);
  // ② 主樓基座：珍珠白基座＋香檳金收邊；正面只做大門兩側，大門前完全淨空
  const base=(w,d,x,z)=>{put(root,new THREE.BoxGeometry(w,.62,d),pearl,x,.66,z);put(root,new THREE.BoxGeometry(w+.06,.1,d+.06),gold,x,1.0,z)};
  for(const s of [-1,1]){
   base(4.9,.3,s*6.42,4.18);               // 正面：大門兩側（x 3.97～8.87）
   base(.3,3.05,s*8.9,2.52);                // 側面前段（圓塔前方）
   put(root,new THREE.BoxGeometry(.34,7.6,.34),gold,s*8.75,4.15,4.05); // ③ 主樓正面兩側轉角金色角柱
  }
  // ④ 前方步道兩側金色鑲邊（極低，不成台階）
  for(const s of [-1,1])put(root,new THREE.BoxGeometry(.22,.08,12),gold,s*4.2,.45,10.2);
 }

 if(kind==='business'){
  const gold=findMat('#D5B779')||std('#d5b779',.32,.5),darkGold=findMat('#A98557')||std('#a98557',.28,.68);
  // ① 塔頂金色收頂線：主塔頂冠底層、兩座副樓屋頂
  for(const o of meshes){
   if(isBox(o,7.65,.55,6.45))edgeFrame(o,.14,.34,gold);
   if(o.geometry.type==='BoxGeometry'&&Math.abs(o.geometry.parameters.height-.44)<.01&&Math.abs(o.geometry.parameters.depth-5.9)<.01)edgeFrame(o,.13,.3,gold);
  }
  // ② 入口深藍門面上方的金色飾帶
  const door=meshes.find(o=>isBox(o,9.9,3.32,.18));
  if(door)put(door,new THREE.BoxGeometry(10.2,.26,.16),gold,0,1.55,.16);
  // ③ Logo 招牌加金框
  const sign=meshes.find(o=>isBox(o,5.3,3.9,.25));
  if(sign)faceFrame(sign,.18,.1,gold,null);
  // ④ 兩側大樓加深金色基座（只在副樓，不在入口前）
  for(const o of meshes){
   if(o.geometry.type!=='BoxGeometry')continue;const p=o.geometry.parameters;
   if(Math.abs(p.depth-5.55)>.01||p.height<8)continue;
   put(o,new THREE.BoxGeometry(p.width+.24,.6,p.depth+.24),darkGold,0,-p.height/2+.2,0);
  }
  // ⑤ 主塔正面兩側轉角金線（裝飾藝術風格，從頂冠一路到底）＋入口量體正面轉角金柱
  for(const s of [-1,1]){
   put(root,new THREE.BoxGeometry(.24,17.5,.24),gold,s*3.6,9.2,-1.75);
   put(root,new THREE.BoxGeometry(.3,4.4,.3),gold,s*5.9,2.58,3.4);
  }
 }

 if(kind==='family'){
  const trim=findMat('#D6B77D')||std('#d6b77d',.32,.68),lux=findMat('#E8C78B')||trim,glass=findMat('#BBDCE7')||std('#bbdce7'),ivory=findMat('#F7EBDD')||std('#f7ebdd');
  // ① 酒紅大屋頂：金色山牆鑲邊、屋簷金線、屋脊金頂（金色壓在酒紅上，遠看最明顯）
  const eave=11.58,peak=15.55,half=5.32,zF=5.2,zB=-6.3;
  const len=Math.hypot(half,peak-eave)+.3,ang=Math.atan2(peak-eave,half);
  for(const [z,dz] of [[zF,.13],[zB,-.13]])for(const s of [-1,1]){
   const b=put(root,new THREE.BoxGeometry(len,.3,.26),lux,s*(half/2)+s*.07*Math.sin(ang),(eave+peak)/2+.07*Math.cos(ang),z+dz);
   b.rotation.z=-s*ang;
  }
  for(const s of [-1,1])put(root,new THREE.BoxGeometry(.28,.28,zF-zB+.5),lux,s*(half+.06),eave,(zF+zB)/2);
  put(root,new THREE.BoxGeometry(.4,.3,zF-zB+.5),lux,0,peak+.08,(zF+zB)/2);
  // ② 主屋正面兩側轉角金色角柱，從地面到屋簷
  for(const s of [-1,1])put(root,new THREE.BoxGeometry(.34,10,.34),lux,s*8.5,5,4);
  // ③ 屋頂下方玫瑰色飾帶上緣加金線，跟屋頂金邊連成一圈
  put(root,new THREE.BoxGeometry(19.1,.16,.12),lux,0,11.24,5.04);
 }
 return {swaps:[],adds,hidden};
}
