// WEIYANG medical island — standalone exterior and interior module.
// All medical geometry and interaction live here; castle.js is untouched.
export function createMedicalExterior(group, THREE){
 const ivory=new THREE.MeshStandardMaterial({color:0xfff9ee,roughness:.62});
 const blue=new THREE.MeshStandardMaterial({color:0x5c9ccf,metalness:.18,roughness:.33});
 const gold=new THREE.MeshStandardMaterial({color:0xd8b16b,metalness:.55,roughness:.3});
 const glass=new THREE.MeshPhysicalMaterial({color:0xbce9f6,transparent:true,opacity:.72,roughness:.13,metalness:.08});
 const pink=new THREE.MeshStandardMaterial({color:0xf6d4e3,roughness:.7});
 const add=(geo,mat,x,y,z,parent=group)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);parent.add(o);return o};
 // Modern high-end healthcare pavilion: rounded glass towers, luminous dome, no pagoda roof.
 const silver=new THREE.MeshStandardMaterial({color:0xf8fcff,roughness:.32,metalness:.12});
 const champagne=new THREE.MeshStandardMaterial({color:0xd9bf91,roughness:.24,metalness:.67});
 const teal=new THREE.MeshStandardMaterial({color:0x52b4c4,emissive:0x174a63,emissiveIntensity:.14,roughness:.25});
 const cylinder=(r,h,x,y,z,mat=glass)=>add(new THREE.CylinderGeometry(r,r,h,48),mat,x,y,z);
 cylinder(15.2,.32,0,.19,0,ivory);
 add(new THREE.BoxGeometry(17.5,7.8,11.7),silver,0,4,-1.8);
 add(new THREE.BoxGeometry(18.4,.23,12.3),champagne,0,8,-1.8);
 // Glass drum and elegant transparent hemispherical dome.
 cylinder(5.9,3.7,0,9.95,-1.8);
 add(new THREE.SphereGeometry(5.9,40,24,0,Math.PI*2,0,Math.PI/2),glass,0,11.75,-1.8);
 cylinder(6.08,.24,0,8.1,-1.8,champagne);
 for(let k=0;k<12;k++){const a=k*Math.PI/6;cylinder(.065,3.8,5.88*Math.sin(a),9.95,-1.8+5.88*Math.cos(a),champagne);}
 // Twin contemporary glazed rotundas, intentionally not historic towers.
 for(const side of [-1,1]){
  cylinder(3.05,10.2,side*9.15,5.3,-2.1);
  cylinder(3.22,.22,side*9.15,10.55,-2.1,champagne);
  for(let k=0;k<10;k++){const a=k*Math.PI/5;cylinder(.06,9.6,side*9.15+3.05*Math.sin(a),5.3,-2.1+3.05*Math.cos(a),champagne);}
  add(new THREE.BoxGeometry(6,.25,4.6),silver,side*8.25,3.1,5.05);
  add(new THREE.BoxGeometry(6,.12,4.6),champagne,side*8.25,3.31,5.05);
 }
 for(const x of [-6.4,-4.1,4.1,6.4]){
  add(new THREE.BoxGeometry(1.75,4.5,.12),glass,x,4.45,4.13);
  add(new THREE.BoxGeometry(.09,4.7,.2),champagne,x-.9,4.45,4.23);
 }
 // Broad glazed doorway, unmistakably accessible from the rainbow bridge.
 const door=add(new THREE.BoxGeometry(5.7,5.45,.2),glass,0,2.85,4.24);
 door.userData.medicalDoor=true;
 for(const x of [-2.9,0,2.9])add(new THREE.BoxGeometry(.12,5.6,.26),champagne,x,2.85,4.4);
 add(new THREE.BoxGeometry(6.1,.17,.33),champagne,0,5.69,4.4);
 const cross=(x,y,z,scale)=>{
  add(new THREE.CircleGeometry(.9*scale,32),glass,x,y,z);
  add(new THREE.BoxGeometry(.29*scale,1.1*scale,.12),teal,x,y,z+.12);
  add(new THREE.BoxGeometry(1.1*scale,.29*scale,.12),teal,x,y,z+.12);
 };
 cross(-5.6,7.15,4.25,.9);cross(5.6,7.15,4.25,.9);
 // Flat, unobstructed pedestrian forecourt, no fence across the approach.
 add(new THREE.BoxGeometry(8.5,.14,12),ivory,0,.35,10.2);
 // The medical forecourt has no posts or railings crossing its approach.
 // v26: A single unmistakable round flower garden on the CENTER of the ivory forecourt.
 // The center of the door (x=0, z=4.24) and its walking aisle stay open.
 // All former crescent/parenthesis-shaped planters are removed.
 const foliage=new THREE.MeshStandardMaterial({color:0x47865d,roughness:.85});
 const soil=new THREE.MeshStandardMaterial({color:0x604a3a,roughness:1});
 const blossom=[0xf6a9c8,0xfff9ee,0xe6a7ca,0xf9dce8,0xf7b7b4].map(color=>new THREE.MeshStandardMaterial({color,roughness:.75}));
 const gardenX=0,gardenZ=12.4,gardenRadius=2.25;
 // Raised round ivory rim, gold lip and green flower-filled planting surface.
 add(new THREE.CylinderGeometry(gardenRadius,gardenRadius+.15,.52,64),ivory,gardenX,.67,gardenZ);
 add(new THREE.CylinderGeometry(gardenRadius-.19,gardenRadius-.19,.06,64),soil,gardenX,.975,gardenZ);
 add(new THREE.TorusGeometry(gardenRadius,.115,12,72),gold,gardenX,.955,gardenZ).rotation.x=Math.PI/2;
 // A dense carpet of roses, not two thin decorative arcs.
 for(let row=-8;row<=8;row++){
  for(let col=-8;col<=8;col++){
   const dx=col*.285+((row&1)? .142:0),dz=row*.285;
   if(dx*dx+dz*dz>2.04*2.04)continue;
   const n=(row+8)*17+col+8;
   const x=gardenX+dx,z=gardenZ+dz;
   add(new THREE.SphereGeometry(.23,9,7),foliage,x,1.13,z);
   add(new THREE.SphereGeometry(.22,12,9),blossom[((n*7)%5+5)%5],x,1.36+(n%3)*.025,z);
  }
 }
 // Original, unchanged WEIYANG image faces the approach (+Z), in front of facade.
 const tex=new THREE.TextureLoader().load('official-logo.png');tex.colorSpace=THREE.SRGBColorSpace;
 const crest=add(new THREE.CircleGeometry(1.78,64),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide,depthTest:false,depthWrite:false}),0,7.3,4.63);
 crest.renderOrder=60;
 const rim=add(new THREE.TorusGeometry(1.87,.10,12,64),gold,0,7.3,4.56);rim.renderOrder=59;
 return {door,crest};
}
export function createMedicalInterior(room,THREE,staffFactory,GLTFLoader){
 const root=room.scene;
 const material=(hex,metalness=0,roughness=.46)=>new THREE.MeshStandardMaterial({color:hex,metalness,roughness});
 const cream=material(0xf7f1e7),stone=material(0xf0e8dc,.10,.27),gold=material(0xc8a66b,.78,.24),navy=material(0x142638,.24,.4),walnut=material(0x5b4138),velvet=material(0x233f60,.12,.65),lightGold=material(0xf3dfb3,.4,.3);
 const glass=new THREE.MeshPhysicalMaterial({color:0xa8dce4,transparent:true,opacity:.37,metalness:.08,roughness:.12,depthWrite:false});
 const add=(geo,mat,x,y,z,parent=root)=>{const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);parent.add(mesh);return mesh};
 const box=(w,h,d,mat,x,y,z)=>add(new THREE.BoxGeometry(w,h,d),mat,x,y,z);
 const cyl=(rt,rb,h,mat,x,y,z)=>add(new THREE.CylinderGeometry(rt,rb,h,40),mat,x,y,z);
 // Purpose-built boutique reception: marble floor, gold inlays and uninterrupted central aisle.
 box(23.6,.1,18.6,stone,0,.02,0);
 // Large inset marble perimeter and champagne-brass border.
 for(const x of [-11.25,11.25])box(.055,.018,17.3,gold,x,.09,0);
 for(const z of [-8.25,8.25])box(22.5,.018,.055,gold,0,.09,z);
 for(const x of [-10.5,-6.5,-2.5,2.5,6.5,10.5])box(.022,.012,18.3,gold,x,.083,0);
 for(const z of [-7,-2,3,8])box(23,.012,.022,gold,0,.086,z);
 box(23.5,.20,.35,navy,0,8.45,-9.05);
 box(23.2,.13,.3,gold,0,8.24,-9.01);
 // Full-height navy identity wall with original logo, well ahead of back wall at z=-9.2.
 box(9.2,7.35,.24,navy,0,4.58,-8.90);
 box(8.82,6.97,.10,gold,0,4.58,-8.70);
 box(8.64,6.79,.11,navy,0,4.58,-8.60);
 const tex=new THREE.TextureLoader().load('office-logo-transparent.png');tex.colorSpace=THREE.SRGBColorSpace;
 const seal=add(new THREE.PlaneGeometry(5.3,5.3),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide,depthWrite:false,depthTest:true}),0,4.85,-8.45);
 seal.renderOrder=15;
 for(const x of [-5.1,5.1]){
  box(.10,6.9,.18,gold,x,4.58,-8.75);
  for(const y of [2.15,4.6,7.05]){
   box(3.7,.09,.18,gold,x<0?-8.0:8.0,y,-8.76);
  }
  if(x<0)box(3.35,5.8,.12,velvet,-8.0,4.65,-8.65);
 }
 // Warm boutique sconces, ceiling coves, and decorative architectural wall ribs.
 for(const x of [-6.2,6.2]){
  box(.24,1.55,.28,gold,x,5.65,-8.35);
  box(.65,.75,.28,lightGold,x,5.65,-8.08);
  const glow=new THREE.PointLight(0xffd9a1,1.25,9);glow.position.set(x,5.7,-7.5);root.add(glow);
 }
 for(const x of [-10.9,10.9]){
  box(.075,7.6,.10,gold,x,4.2,-8.98);
  box(.075,7.6,.10,gold,x,4.2,8.75);
 }
 box(22.9,.12,.14,gold,0,8.35,-8.6); // Back wall cornice only; no front crossbar
 for(const x of [-11.1,11.1])box(.14,.12,17.3,gold,x,8.35,0);
 // Curved marble reception desk; height deliberately below the logo and set forward.
 const desk=new THREE.Group();root.add(desk);desk.position.set(0,0,3.9);
 const front=add(new THREE.CylinderGeometry(3.55,3.45,1.28,64,1,false,0,Math.PI),cream,0,.76,0,desk);
 front.scale.z=.47;
 const top=add(new THREE.CylinderGeometry(3.78,3.78,.13,64,1,false,0,Math.PI),stone,0,1.48,0,desk);top.scale.z=.53;
 const rim=add(new THREE.TorusGeometry(3.61,.045,8,64,Math.PI),gold,0,1.23,0,desk);rim.rotation.x=Math.PI/2;rim.scale.y=.48;
 for(const x of [-2.8,2.8]){
  box(.075,1.0,.075,gold,x,.62,3.4);
 }
 // Boutique details: marble veining, coves, ceiling lines, sconces and wall art.
 const marbleLine=material(0xd5c9bb,.15,.6), warm=new THREE.MeshBasicMaterial({color:0xffedc7});
 for(let k=0;k<13;k++){
  const x=-10.8+k*1.8;
  const vein=box(.018,.009,2.6+(k%3),marbleLine,x,.091,-1.7+(k%4)*1.5);
  vein.rotation.y=.38+(k%3)*.2;
 }
 for(const x of [-10.9,10.9]){
  for(const z of [-7.7,-2.6,2.5,7.6]){
   box(.075,7.5,.09,gold,x,4.45,z);
  }
  box(.17,.16,17.4,gold,x,8.2,0);
  box(.09,.08,16.9,warm,x,8.08,0);
 }
 // Removed overhead transverse bars: they crossed the logo and ECG in mobile view.

 for(const x of [-6.4,6.4]){
  const lamp=box(.12,.85,.2,gold,x,5.35,-8.38);
  box(.20,.50,.22,warm,x,5.35,-8.21);
 }
 // Desk accessories; intentionally small enough not to obscure the WEIYANG wall.
 const laptop=box(.82,.55,.055,navy,-1.2,1.87,3.68);laptop.rotation.x=-.19;
 box(.90,.045,.58,gold,-1.2,1.59,4.03);
 cyl(.16,.13,.27,cream,.25,1.69,3.72);
 box(.75,.10,.46,walnut,1.05,1.60,3.73);
 box(.70,.04,.43,cream,1.05,1.68,3.73);
 cyl(.16,.19,.30,gold,2.0,1.7,3.72);
 for(const x of [-8.2,8.2]){
  const rug=box(4.6,.025,3.5,material(0xece2d4),x,.095,5.5);
  rug.position.y=.10;
  cyl(.13,.13,.37,cream,x+.5,.99,7.0);
  add(new THREE.SphereGeometry(.21,12,10),material(0xc58b9b),x+.5,1.22,7.0);
  box(.45,.055,.32,cream,x-.4,.75,7.0);
  cyl(.10,.10,1.75,gold,x>0?10.7:-10.7,1.15,6.7);
  add(new THREE.SphereGeometry(.35,16,12),warm,x>0?10.7:-10.7,2.05,6.7);
 }
 // Back-wall built-in illuminated bookcase, clear of the central logo.
 const bookGroup=new THREE.Group();root.add(bookGroup);
 const bookX=-8.05;
 for(const y of [1.35,2.65,3.95,5.25,6.55]){
  box(3.55,.11,.62,gold,bookX,y,-7.9);
  for(let k=0;k<11;k++){
   const heights=[.68,.85,.62,.74];
   const m=[navy,velvet,walnut,cream][k%4];
   const book=box(.19,heights[k%4],.39,m,bookX-1.43+k*.28,y+heights[k%4]/2+.07,-7.72);
   if(k===5&&y===3.95){book.userData.medicalAction='books';book.userData.book=true;}
  }
 }
 box(3.85,6.6,.14,walnut,bookX,4.1,-8.15);
 for(const y of [1.35,2.65,3.95,5.25,6.55])box(3.55,.11,.7,gold,bookX,y,-7.77);
 // Two framed artwork panels on side walls, adding depth without extra thematic zones.
 for(const x of [-11.65,11.65]){
  box(.13,2.4,2.3,gold,x,4.3,1.2);
  box(.16,2.17,2.05,navy,x,4.3,1.2);
  const line=box(.18,.08,1.25,lightGold,x+(x>0?-.10:.10),4.2,1.2);line.rotation.x=.32;
 }
 // Boutique office embellishments: warm recessed shelving, brass accents, sculptural wall lights.
 for(const side of [-1,1]){
   const xx=side*11.45;
   for(const zz of [-5.3,-1.7,4.1]){
     box(.10,3.0,1.55,gold,xx,4.4,zz);
     box(.13,2.82,1.37,cream,xx-side*.04,4.4,zz);
     box(.14,.09,1.06,lightGold,xx-side*.12,5.42,zz);
   }
 }
 // Restrained brass wall lights frame the official emblem without covering it.
 for(const x of [-5.5,5.5]){
   box(.16,1.35,.20,gold,x,5.3,-8.40);
   box(.22,.78,.24,lightGold,x,5.3,-8.22);
 }
 // Exactly one person: reuse the main island's actual STAFF generator, not the avatar creator.
 let guide=null;
 if(staffFactory){
  const result=staffFactory({name:'薪水掌門人',kind:'bun',skin:'#f4c9a6',hair:'#503529',top:'#e7a8bf',bottom:'#5b6b85'});
  guide=result.root||result;guide.position.set(4.8,0,4.0);guide.rotation.y=-.35;root.add(guide);
   // Real Three.js geometry (not a flat illustration): tailored staff badge and gold brooch.
   // The existing bun hairstyle and staff click targets are preserved.
   const badge=new THREE.Group();badge.position.set(0,1.08,.355);guide.add(badge);
   const badgeBack=new THREE.Mesh(new THREE.BoxGeometry(.23,.15,.028),gold);badge.add(badgeBack);
   const badgeFace=new THREE.Mesh(new THREE.BoxGeometry(.19,.115,.032),cream);badgeFace.position.z=.017;badge.add(badgeFace);
   const pin=new THREE.Mesh(new THREE.SphereGeometry(.048,12,10),lightGold);pin.position.set(-.18,.15,.04);guide.add(pin);

 }
 // Keep the original interactive chibi staff. No GLB replacement.
 // Boutique seating and calm architectural details. No giant sculptures, no visitors.
 for(const x of [-8.3,8.3]){
  box(3.7,.52,1.75,velvet,x,.59,4.7);
  box(3.7,1.05,.35,velvet,x,1.21,3.94);
  for(const dx of [-1.64,1.64])box(.35,.68,1.75,velvet,x+dx,.92,4.7);
  box(3.9,.09,1.8,gold,x,.25,4.7);
  cyl(.75,.78,.47,walnut,x,.40,7.0);
  cyl(.82,.82,.07,gold,x,.68,7.0);
 }
 for(const x of [-10.2,10.2]){
  cyl(.42,.49,.5,cream,x,.29,-2.0);
  cyl(.055,.055,1.7,gold,x,1.35,-2.0);
  for(let k=0;k<7;k++){
   const a=k*Math.PI*2/7;
   const leaf=add(new THREE.SphereGeometry(.35,12,10),material(0x668c73),x+Math.cos(a)*.45,2.0+(k%3)*.15,-2+Math.sin(a)*.43);
   leaf.scale.set(.7,1.5,.7);
  }
 }
 // Display zones: gold-edged touch panels at accessible height, not covering the emblem.
 const interactionTargets=[];
 const interactionMap=new Map();
 const register=(object,action)=>{object.userData.medicalAction=action;interactionTargets.push(object);interactionMap.set(object.uuid,action);return object};
 const display=(x,z,w,title)=>{
  box(w+0.2,2.35,.18,gold,x,3.15,z);
  box(w,2.17,.20,navy,x,3.15,z+.12);
  const cv=document.createElement('canvas');cv.width=768;cv.height=400;
  const c=cv.getContext('2d');c.fillStyle='#142638';c.fillRect(0,0,768,400);
  c.fillStyle='#e8c78c';c.textAlign='center';c.font='bold 46px sans-serif';c.fillText(title,384,165);
  c.fillStyle='#f8f0e1';c.font='29px sans-serif';c.fillText('輕觸開啟法律探索',384,235);
  const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;
  const panel=add(new THREE.PlaneGeometry(w-.14,2.0),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}),x,3.15,z+.24);
  register(panel,title==='醫療爭議'?'computer':'computer');
 };
 display(-7.7,-8.08,3.3,'醫療爭議'); // The right wall is reserved for one ECG monitor only.
 // ECG screen integrated flush against the rear architectural wall, not floating in space.
 const canvas=document.createElement('canvas');canvas.width=640;canvas.height=256;const ctx=canvas.getContext('2d');
 const waveTex=new THREE.CanvasTexture(canvas);waveTex.colorSpace=THREE.SRGBColorSpace;
 box(4.78,2.56,.14,gold,8.0,4.3,-8.36);
 box(4.62,2.40,.15,navy,8.0,4.3,-8.24);
 const wavePanel=add(new THREE.PlaneGeometry(4.43,2.18),new THREE.MeshBasicMaterial({map:waveTex,side:THREE.DoubleSide}),8,4.3,-7.80);
 register(wavePanel,'ecg');
 // Clickable props and restrained, legible floating hints.
 const deskHit=box(5.9,.25,1.2,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0,1.65,3.9);register(deskHit,'computer');
 const bookHit=box(3.6,5.7,.55,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),-8.05,4.15,-7.55);register(bookHit,'books');
 const logoHit=add(new THREE.PlaneGeometry(5.9,5.9),new THREE.MeshBasicMaterial({transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false}),0,4.85,-8.32);register(logoHit,'logo');
 if(guide){guide.traverse(o=>{if(o.isMesh)register(o,'staff')});}
 const labels=[];
 function hint(text,x,y,z,action){
  const canvas=document.createElement('canvas');canvas.width=480;canvas.height=112;
  const c=canvas.getContext('2d');c.fillStyle=action==='logo'?'rgba(255,250,239,.98)':'rgba(23,42,62,.98)';c.beginPath();c.roundRect(5,5,470,102,36);c.fill();
  c.strokeStyle='#d9b779';c.lineWidth=6;c.stroke();c.fillStyle=action==='logo'?'#21384f':'#fff9ec';c.textAlign='center';c.textBaseline='middle';c.font='bold 39px sans-serif';c.fillText(text,240,56,448);
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:false}));sprite.position.set(x,y,z);sprite.scale.set(2.9,.68,1);sprite.renderOrder=80;sprite.userData.baseY=y;register(sprite,action);root.add(sprite);labels.push(sprite);
 }
 hint('💬 跟我聊聊',5.1,4.0,4.85,'staff');
 hint('📚 點我翻翻',-8.05,7.55,-7.15,'books');
 hint('❤️ 點我看看',8,6.70,-7.60,'ecg');
 hint('✨ 點我探索',0,2.7,5.3,'computer');
 hint('⚖️ 認識德威陽',0,8.10,-6.80,'logo');
 const spike=phase=>{let p=((phase%1)+1)%1;const points=[[0,0],[.16,0],[.21,.05],[.25,0],[.29,-.14],[.315,.84],[.335,-.33],[.38,0],[.53,0],[.62,.21],[.72,0],[1,0]];for(let j=1;j<points.length;j++)if(p<=points[j][0]){const a=points[j-1],b=points[j],r=(p-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*r}return 0};
 let last=0;
 const animation=(time)=>{
  if(guide){guide.position.x=4.8+Math.sin(time*.00045)*.14;guide.rotation.y=-.35+Math.sin(time*.0008)*.08;}
  for(let k=0;k<labels.length;k++)labels[k].position.y=labels[k].userData.baseY+Math.sin(time*.0015+k)*.075;
  if(time-last<55)return;last=time;
  ctx.fillStyle='#071c29';ctx.fillRect(0,0,640,256);
  ctx.strokeStyle='rgba(80,178,151,.16)';ctx.lineWidth=1;
  for(let x=0;x<640;x+=32){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,256);ctx.stroke()}
  for(let y=0;y<256;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(640,y);ctx.stroke()}
  ctx.fillStyle='#b6f3dc';ctx.font='bold 26px sans-serif';ctx.fillText('♥ 72 BPM',20,36);
  ctx.strokeStyle='#67edaf';ctx.lineWidth=3;ctx.beginPath();
  for(let x=0;x<640;x+=2){const y=165-spike(x/185-time*.0002)*74;x===0?ctx.moveTo(x,y):ctx.lineTo(x,y)}ctx.stroke();
  ctx.fillStyle='#a9d9d1';ctx.font='16px sans-serif';ctx.fillText('WEIYANG | 醫療法律探索展示',20,235);waveTex.needsUpdate=true;
 };
 const spot=new THREE.SpotLight(0xffdfab,3.5,18,Math.PI/4,.6);spot.position.set(0,8,0);spot.target.position.set(0,4.7,-8.5);root.add(spot,spot.target);
 for(const x of [-8,8]){const l=new THREE.PointLight(0xffe5c3,1.4,11);l.position.set(x,6.8,-4);root.add(l)}
 return {guide,interactionTargets,interactionMap,animation};
}
export function createMedicalExperience(){
 const scenes={
  staff:{name:'薪水掌門人',icon:'💬',intro:'歡迎來到德威陽！我是薪水掌門人～今天想聊法律，還是偷偷看看辦公室？',options:[
   ['醫療糾紛怎麼辦？','先保存病歷、收據和相關紀錄，別急著下結論。','也可以依日期整理經過，讓律師更容易了解問題。'],
   ['你們律師擅長什麼？','林柏均律師具臺灣及紐約州律師資格，處理商務、訴訟及醫療法律等案件。','想進一步了解？歡迎透過 LINE｜@wylaw 聯繫德威陽。'],
   ['為什麼叫薪水掌門人？','法律問題找律師，薪水問題嘛……先確認老闆有沒有在旁邊！','我最希望大家來這裡，都能帶走一點有用的法律知識。']]},
  books:{name:'法律書櫃',icon:'📚',intro:'書要整理，證據更要整理！發生醫療爭議，你會先做什麼？',options:[
   ['整理病歷和收據','好主意！病歷、同意書及收據，都是釐清事情的重要資料。','檢查報告、對話紀錄，也可以依日期分類保存。'],
   ['先發到網路上','先別急！公開指控可能衍生名譽或個資爭議。','先確認事實、保存資料，再評估適當處理方式。'],
   ['我不知道怎麼開始','就像整理書架，先分類，再按日期排列就好！','可以先寫下事件時間線，必要時請律師協助分析。']]},
  ecg:{name:'心電圖螢幕',icon:'❤️',intro:'嗶、嗶、嗶～心跳要監測，醫療爭議也要看紀錄！',options:[
   ['結果不好就是醫療疏失？','不一定！治療結果不如預期，不代表必然有醫療過失。','仍須評估診療過程、注意義務、損害與因果關係。'],
   ['病歷可以申請嗎？','可以依法申請相關病歷資料，及早保存更安心。','記得確認資料是否完整，再整理檢查與治療經過。']]},
  computer:{name:'接待桌電腦',icon:'💻',intro:'叮！德威陽法律小幫手上線。你想了解哪一件事？',options:[
   ['醫療糾紛一定要提告？','不一定！可先整理資料，評估溝通、調解或法律程序。','律師可以協助檢視證據、法律爭點及處理策略。'],
   ['健保爭議怎麼處理？','先確認通知或行政處分內容，尤其要留意救濟期限。','不同程序期限可能不同，建議儘早確認文件及法定期間。'],
   ['我想找德威陽諮詢','歡迎先說明案件類型，由本所協助安排諮詢。','LINE｜@wylaw　官網｜weiandyang.com']]},
  logo:{name:'WEIYANG 形象牆',icon:'⚖️',intro:'歡迎來到德威陽國際法律事務所！想認識我們的哪一面？',options:[
   ['認識林柏均律師','林律師具臺灣及紐約州律師資格，擁有 Emory LL.M. 與 ULV MBA 學位。','服務領域包含跨國商務、契約、訴訟及醫療法律等。'],
   ['了解法律服務','德威陽提供商務契約、公司治理、智慧財產及民刑事爭議等法律服務。','想進一步了解？LINE｜@wylaw　weiandyang.com']]}
 };
 const el=document.createElement('section');el.id='wyMedicalExperience';
 el.style.cssText='display:none;position:fixed;left:50%;transform:translateX(-50%);bottom:78px;z-index:80;width:min(92vw,440px);background:#fffaf0;color:#20354c;border:2px solid #cfa96c;border-radius:18px;padding:14px;box-shadow:0 14px 36px #14283b66;font:14px/1.6 system-ui,sans-serif;max-height:65dvh;overflow-y:auto';
 el.innerHTML='<div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><b id="wyMedTitle"></b><button id="wyMedClose" type="button" aria-label="關閉">✕</button></div><p id="wyMedText" style="margin:12px 0"></p><div id="wyMedChoices" style="display:grid;gap:7px"></div><small style="display:block;color:#89755b;margin-top:10px">德威陽｜有法度 · 一般法律資訊，個案仍需評估</small>';
 document.body.append(el);
 const title=el.querySelector('#wyMedTitle'),body=el.querySelector('#wyMedText'),choices=el.querySelector('#wyMedChoices');
 el.querySelector('#wyMedClose').onclick=()=>el.style.display='none';
 let current='staff';
 function button(label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.style.cssText='width:100%;text-align:left;background:#f5ebda;border:1px solid #d7bb8b;border-radius:10px;padding:10px 12px;color:#243b52;font-weight:600;cursor:pointer';b.onclick=fn;choices.append(b);}
 function home(){const s=scenes[current];title.textContent=s.icon+' '+s.name;body.textContent=s.intro;choices.replaceChildren();s.options.forEach((o,i)=>button(String.fromCharCode(65+i)+'．'+o[0],()=>answer(i,0)));}
 function answer(i,level){const s=scenes[current],o=s.options[i];body.textContent=o[level+1];choices.replaceChildren();if(level===0)button('✨ 再了解一點',()=>answer(i,1));button('↩ 換一個問題',home);button('✕ 繼續逛辦公室',()=>el.style.display='none');}
 return {show(){el.style.display='none'},open(action='staff'){current=scenes[action]?action:'staff';home();el.style.display='block'},hide(){el.style.display='none'}};
}
