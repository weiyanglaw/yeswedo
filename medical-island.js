// WEIYANG medical island — standalone exterior and interior module.
// All medical geometry and interaction live here; castle.js is untouched.
export function createMedicalExterior(group, THREE){
 const ivory=new THREE.MeshStandardMaterial({color:0xfff9ee,roughness:.62});
 const blue=new THREE.MeshStandardMaterial({color:0x5c9ccf,metalness:.18,roughness:.33});
 const gold=new THREE.MeshPhysicalMaterial({color:0xfff0cb,metalness:.24,roughness:.15,clearcoat:1,clearcoatRoughness:.07,emissive:0x8c6b37,emissiveIntensity:.12});
 const glass=new THREE.MeshPhysicalMaterial({color:0xc9f1fb,transparent:true,opacity:.91,roughness:.25,metalness:.04,clearcoat:.75,clearcoatRoughness:.1});
 const pink=new THREE.MeshStandardMaterial({color:0xf6d4e3,roughness:.7});
 const add=(geo,mat,x,y,z,parent=group)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);parent.add(o);return o};
 // Modern high-end healthcare pavilion: rounded glass towers, luminous dome, no pagoda roof.
 const silver=new THREE.MeshStandardMaterial({color:0xf8fcff,roughness:.32,metalness:.12});
 const champagne=new THREE.MeshPhysicalMaterial({color:0xffefc9,roughness:.13,metalness:.27,clearcoat:1,clearcoatRoughness:.055,emissive:0x9a7846,emissiveIntensity:.14});
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
  // v31: Removed both projecting side entrance slabs (left and right).
 }
 for(const x of [-6.4,-4.1,4.1,6.4]){
  add(new THREE.BoxGeometry(1.75,4.5,.12),glass,x,4.45,4.13);
  add(new THREE.BoxGeometry(.09,4.7,.2),champagne,x-.9,4.45,4.23);
 }
 // v32: Luxury contemporary medical architecture — facade-only details.
 // These accents stay above ground level, outside the entrance and do not add side platforms.
 const darkBlue=new THREE.MeshStandardMaterial({color:0x183c55,metalness:.38,roughness:.32});
 const pearl=new THREE.MeshStandardMaterial({color:0xfdf8f0,metalness:.18,roughness:.3});
 const led=new THREE.MeshBasicMaterial({color:0xffe6ad});
 // Layered champagne-gold parapet and warm light line make the silhouette more architectural.
 for(const y of [7.77,8.16]){
  add(new THREE.BoxGeometry(18.6,.075,.12),y===7.77?gold:led,0,y,4.09);
  add(new THREE.BoxGeometry(.12,.075,12.3),y===7.77?gold:led,-9.12,y,-1.8);
  add(new THREE.BoxGeometry(.12,.075,12.3),y===7.77?gold:led,9.12,y,-1.8);
 }
 // Vertical bronze fins, flush with the upper front facade and away from the central door/logo.
 for(const side of [-1,1]){
  for(let j=0;j<4;j++){
   const x=side*(6.65+j*.57);
   add(new THREE.BoxGeometry(.075,2.15,.20),champagne,x,6.85,4.22);
  }
  // Elegant navy feature panels above the left/right window bays.
  add(new THREE.BoxGeometry(2.45,.45,.09),darkBlue,side*5.25,7.44,4.20);
  add(new THREE.BoxGeometry(2.22,.045,.12),led,side*5.25,7.13,4.27);
 }
 // A thin floating entry canopy, high above the pedestrian path (no support columns).
 add(new THREE.BoxGeometry(6.95,.17,1.25),pearl,0,6.35,4.83);
 add(new THREE.BoxGeometry(7.15,.075,1.34),champagne,0,6.48,4.83);
 add(new THREE.BoxGeometry(6.35,.045,.09),led,0,6.23,5.47);
 // Additional concentric crown bands and tiny lights on both glazed rotundas.
 for(const side of [-1,1]){
  const cx=side*9.15;
  for(const y of [9.68,10.35]){
   const ring=add(new THREE.TorusGeometry(3.13,.052,8,56),champagne,cx,y,-2.1);
   ring.rotation.x=Math.PI/2;
  }
  for(let k=0;k<8;k++){
   const a=k*Math.PI/4;
   add(new THREE.SphereGeometry(.095,8,6),led,cx+3.12*Math.sin(a),10.15,-2.1+3.12*Math.cos(a));
  }
 }
 // Luminous glass dome ribs and a restrained crown, preserving the original dome geometry.
 add(new THREE.CylinderGeometry(.64,.79,.25,32),champagne,0,17.62,-1.8);
 add(new THREE.SphereGeometry(.23,12,8),led,0,17.88,-1.8);
 // v33: Refined WEIYANG signature facade — intentionally simple low-poly geometry
 // rather than simulated cinematic reflections. These are decorative, not collision objects.
 const warmIvory=new THREE.MeshStandardMaterial({color:0xfff5e6,metalness:.06,roughness:.54});
 const bronze=new THREE.MeshPhysicalMaterial({color:0xffe8bb,metalness:.28,roughness:.16,clearcoat:1,clearcoatRoughness:.07,emissive:0x927044,emissiveIntensity:.12});
 const coolGlass=new THREE.MeshPhysicalMaterial({color:0xb9ecf6,transparent:true,opacity:.86,roughness:.23,metalness:.04,clearcoat:.7,clearcoatRoughness:.09,depthWrite:false});
 const softLight=new THREE.MeshBasicMaterial({color:0xffe5b2});
 // True dome meridians: arched ribs hugging the existing hemisphere, not straight posts.
 for(let k=0;k<12;k++){
  const a=k*Math.PI/6,pts=[];
  for(let j=0;j<=18;j++){
   const t=(j/18)*Math.PI/2;
   pts.push(new THREE.Vector3(5.96*Math.sin(t)*Math.sin(a),11.75+5.96*Math.cos(t),-1.8+5.96*Math.sin(t)*Math.cos(a)));
  }
  const rib=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),24,.075,6,false),bronze);
  group.add(rib);
 }
 // v34: subtle directional highlight along select dome ribs. These thin ivory-gold
 // highlights remain visible on mobile even without an environment reflection map.
 const goldGlint=new THREE.MeshBasicMaterial({color:0xfff5d7,transparent:true,opacity:.65,depthWrite:false});
 for(const k of [1,3,5,7,9,11]){
  const a=k*Math.PI/6,pts=[];
  for(let j=0;j<=18;j++){
   const t=j/18*Math.PI/2;
   pts.push(new THREE.Vector3(5.99*Math.sin(t)*Math.sin(a),11.75+5.99*Math.cos(t),-1.8+5.99*Math.sin(t)*Math.cos(a)));
  }
  group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),24,.018,5,false),goldGlint));
 }
 // v35: stronger, controlled highlight strips that are visible in the existing
 // pastel Three.js renderer even without an HDR environment map. These are
 // thin decorative meshes, not additional obstacles or structural geometry.
 const brightHighlight=new THREE.MeshBasicMaterial({color:0xfff8df,transparent:true,opacity:.88,depthWrite:false,side:THREE.DoubleSide});
 const softHighlight=new THREE.MeshBasicMaterial({color:0xffe6ae,transparent:true,opacity:.52,depthWrite:false,side:THREE.DoubleSide});
 // More prominent glints along the sun-facing half of the dome ribs.
 for(const k of [0,2,4,6,8,10]){
  const a=k*Math.PI/6,pts=[];
  for(let j=0;j<=22;j++){
   const t=j/22*Math.PI/2;
   pts.push(new THREE.Vector3(6.065*Math.sin(t)*Math.sin(a),11.75+6.065*Math.cos(t),-1.8+6.065*Math.sin(t)*Math.cos(a)));
  }
  group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),30,.031,5,false),brightHighlight));
 }
 // Slim reflective vertical edges on the glass towers; no extra platforms.
 for(const side of [-1,1]){
  const cx=side*9.15;
  for(const a of [.42,1.46,2.62]){
   const x=cx+3.085*Math.sin(a),z=-2.1+3.085*Math.cos(a);
   add(new THREE.CylinderGeometry(.025,.025,8.8,7),brightHighlight,x,5.3,z);
  }
  for(const y of [10.59,10.76]){
   const ring=add(new THREE.TorusGeometry(3.23,.036,6,64),brightHighlight,cx,y,-2.1);
   ring.rotation.x=Math.PI/2;
  }
 }
 // A subtle front-facing reflection line on the entrance canopy.
 add(new THREE.BoxGeometry(7.3,.037,.045),brightHighlight,0,6.72,5.56);
 // A pair of broad, translucent vertical reflection panels on the glass drum.
 for(const x of [-2.0,2.0]){
  const pane=add(new THREE.BoxGeometry(.22,2.5,.035),softHighlight,x,9.9,4.02);
  pane.renderOrder=2;
 }
 // Delicate crown rings, horizontal detail at glass dome base.
 for(const [r,y] of [[6.02,11.75],[5.73,12.85]]){
  const ring=add(new THREE.TorusGeometry(r,.075,8,64),champagne,0,y,-1.8);
  ring.rotation.x=Math.PI/2;
 }
 // Layered, well-defined facade with dark inset reveals and ivory/gold trims.
 for(const side of [-1,1]){
  const x=side*7.45;
  add(new THREE.BoxGeometry(2.8,5.2,.15),warmIvory,x,4.85,4.18);
  add(new THREE.BoxGeometry(2.32,4.55,.17),coolGlass,x,4.9,4.30);
  for(const sx of [-1,1])add(new THREE.BoxGeometry(.085,4.65,.18),bronze,x+sx*1.19,4.88,4.43);
  add(new THREE.BoxGeometry(2.6,.12,.18),bronze,x,7.3,4.42);
  add(new THREE.BoxGeometry(2.4,.065,.19),softLight,x,2.65,4.43);
 }
 // Extra fine horizontal rings give the twin towers a finished architectural crown.
 for(const side of [-1,1]){
  const cx=side*9.15;
  const r=add(new THREE.TorusGeometry(3.20,.09,8,64),bronze,cx,10.72,-2.1);
  r.rotation.x=Math.PI/2;
  add(new THREE.CylinderGeometry(2.96,2.96,.11,48),warmIvory,cx,10.78,-2.1);
  add(new THREE.CylinderGeometry(2.55,2.55,.065,48),bronze,cx,10.86,-2.1);
 }
 // A clear floating entry canopy with a subtle inset, no ground-level supports.
 add(new THREE.BoxGeometry(7.65,.11,1.45),warmIvory,0,6.57,4.83);
 add(new THREE.BoxGeometry(7.75,.07,1.53),bronze,0,6.66,4.83);
 add(new THREE.BoxGeometry(6.85,.045,.12),softLight,0,6.43,5.53);
 // Slim fluted pilasters flank the main doorway; keep the 5.7-wide door unobstructed.
 for(const side of [-1,1]){
  for(let j=0;j<3;j++){
   const x=side*(3.25+j*.23);
   add(new THREE.BoxGeometry(.10,4.8,.18),j===0?bronze:champagne,x,3.1,4.52);
  }
  add(new THREE.BoxGeometry(.65,.16,.4),bronze,side*3.5,5.59,4.52);
 }
 // Soft golden detail bands across facade, never across the circular logo.
 for(const x of [-5.2,5.2]){
  add(new THREE.BoxGeometry(2.05,.08,.14),bronze,x,6.25,4.35);
  add(new THREE.BoxGeometry(1.95,.045,.16),softLight,x,6.10,4.37);
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
 const gardenX=7.5,gardenZ=12.4,gardenRadius=2.25;
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
 const logoBacking=add(new THREE.CircleGeometry(1.91,64),new THREE.MeshStandardMaterial({color:'#21483F',roughness:.7,side:THREE.DoubleSide,depthTest:true,depthWrite:true}),0,7.3,5.65);
 const crest=add(new THREE.CircleGeometry(1.73,64),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('office-logo-transparent.png'),transparent:true,side:THREE.DoubleSide,depthTest:true,depthWrite:false}),0,7.3,5.70);
 const rim=add(new THREE.TorusGeometry(1.87,.10,12,64),gold,0,7.3,5.66);
 // All exterior emblems respect building occlusion; never draw on top of other islands.
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
 // v82: circular boutique interior with a front opening, not a rectangular room.
 // The exterior medical pavilion, logo wall, existing people and entrance remain unchanged.
 const roundFloor=cyl(13.35,13.35,.12,material(0xD6D2C8,0,.85),0,.02,0);
 const floorRing=add(new THREE.TorusGeometry(12.45,.085,10,96),gold,0,.09,0);
 floorRing.rotation.x=Math.PI/2;
 // Curved segmented interior perimeter, open toward the entrance at +Z.
 const curvedWall=material(0xE6E7E0,0,.78),curvedGlass=new THREE.MeshPhysicalMaterial({color:0xD6E9E9,transparent:true,opacity:.28,depthWrite:false,side:THREE.DoubleSide});
 for(let k=0;k<42;k++){
  const a0=-Math.PI*.02+k*(Math.PI*1.87/42),a1=-Math.PI*.02+(k+1)*(Math.PI*1.87/42);
  const mid=(a0+a1)/2;
  // Three.js: angle 0 points toward +Z; leave the front-central door approach open.
  const theta=mid+Math.PI*.57;
  const x=12.5*Math.sin(theta),z=12.5*Math.cos(theta);
  if(z>8.8 && Math.abs(x)<9.0)continue; // v85: wider front opening, shorten both transparent glass arcs and gold trim together
  const arcLen=12.5*(a1-a0)+.055;
  const panel=box(arcLen,7.35,.17,curvedGlass,x,4.0,z);panel.rotation.y=theta;
  const foot=box(arcLen,.11,.24,gold,x,.32,z);foot.rotation.y=theta;
  const crown=box(arcLen,.12,.22,gold,x,7.85,z);crown.rotation.y=theta;
 }
 // Round inset medallion and a gentle curved lounge rug.
 const rug=cyl(3.6,3.6,.025,material(0xE6E5DC,0,.9),0,.11,1.2);
 const rugRing=add(new THREE.TorusGeometry(3.58,.055,8,72),gold,0,.14,1.2);rugRing.rotation.x=Math.PI/2;
 // Removed thin floor grid lines: they appeared as dirt at mobile zoom.
 // Retain only the broad outer stone perimeter.
 box(23.5,.20,.35,material(0xD8E8E6),0,8.45,-9.05);
 box(23.2,.13,.3,gold,0,8.24,-9.01);
 // Full-height navy identity wall with original logo, well ahead of back wall at z=-9.2.
 box(9.2,7.35,.24,material(0x214A4B),0,4.58,-8.90);
 box(8.82,6.97,.10,gold,0,4.58,-8.70);
 box(8.64,6.79,.11,material(0x214A4B),0,4.58,-8.60);
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
  const glow=new THREE.PointLight(0xffd9a1,.55,9);glow.position.set(x,5.7,-7.5);root.add(glow);
 }
 for(const x of [-10.9,10.9]){
  box(.075,7.6,.10,gold,x,4.2,-8.98);
  box(.075,7.6,.10,gold,x,4.2,8.75);
 }
 box(22.9,.12,.14,gold,0,8.35,-8.6); // Back wall cornice only; no front crossbar
 // Curved wall cornices replace the former straight side beams.
 // v45: wide, straight medical reception on the right-front side, clear of the entrance aisle.
 // Keep a single solid counter rather than an open semicircle or detached brass rods.
 const desk=new THREE.Group();root.add(desk);desk.position.set(7.1,0,5.75);
 add(new THREE.BoxGeometry(5.45,1.35,1.38),material(0xD8E8E6,0,.78),0,.78,0,desk);
 add(new THREE.BoxGeometry(5.7,.16,1.58),material(0xC9D8D2,0,.64),0,1.52,0,desk);
 add(new THREE.BoxGeometry(4.65,.47,.07),material(0x214A4B,0,.7),0,.85,.73,desk);
 // v42: no isolated gold posts in front of reception desk. 
 // Boutique details: marble veining, coves, ceiling lines, sconces and wall art.
 const marbleLine=material(0xd5c9bb,.15,.6), warm=new THREE.MeshBasicMaterial({color:0xffedc7});
 // v44: no tiny marble veins: they read as dirty streaks at mobile size.
 // The sidewall ribs are now supplied by the circular perimeter above.
 // Removed overhead transverse bars: they crossed the logo and ECG in mobile view.

 for(const x of [-6.4,6.4]){
  const lamp=box(.12,.85,.2,gold,x,5.35,-8.38);
  box(.20,.50,.22,warm,x,5.35,-8.21);
 }
 // Desk accessories; intentionally small enough not to obscure the WEIYANG wall.
 const laptop=box(.82,.55,.055,navy,6.2,1.87,5.55);laptop.rotation.x=-.19;
 box(.90,.045,.58,stone,6.2,1.64,5.9);
 cyl(.16,.13,.27,cream,7.2,1.75,5.55);
 box(.75,.10,.46,walnut,8.15,1.67,5.55);
 box(.70,.04,.43,cream,8.15,1.75,5.55);
 cyl(.16,.19,.30,stone,9.0,1.78,5.55);
 // v45: remove the duplicated front waiting lounge. Left-side case sofa is the sole seating zone.
 // v47: deep architectural bookcase, every shelf visibly full of three-dimensional books.
 const bookGroup=new THREE.Group();root.add(bookGroup);
 const bookX=-8.05;
 // Back, sides and top are BEHIND the book spines in the visitor-facing (+Z) direction.
 box(4.85,7.20,.30,walnut,bookX,4.08,-8.55);
 for(const side of [-1,1])box(.34,7.20,2.10,walnut,bookX+side*2.28,4.08,-7.54);
 box(4.86,.28,2.14,gold,bookX,7.72,-7.52);
 box(4.86,.28,2.14,walnut,bookX,.51,-7.52);
 for(let row=0;row<5;row++){
  const shelfY=1.22+row*1.29;
  box(4.42,.20,1.98,gold,bookX,shelfY,-7.54);
  // 17 tightly packed books per row, with staggered heights and contrasting spines.
  for(let k=0;k<17;k++){
   const palette=[navy,velvet,cream,walnut,material(0x446b70),material(0x9b7850)];
   const bh=.87+((k*3+row)%5)*.055;
   const bx=bookX-1.95+k*.243;
   const book=box(.225,bh,1.12,palette[(k+row)%palette.length],bx,shelfY+.11+bh/2,-6.93);
   if(k===8&&row===2){book.userData.medicalAction='books';book.userData.book=true;}
   // Narrow gold spine stamp, visible from the room.
   box(.12,.035,.018,lightGold,bx,shelfY+.24,-6.36);
  }
 }
 // Raised front corner pillars emphasize thickness without blocking the book rows.
 for(const side of [-1,1])box(.17,7.00,.20,gold,bookX+side*2.15,4.08,-6.49);
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
  guide=result.root||result;guide.position.set(7.2,0,3.55);guide.rotation.y=-.35;root.add(guide);
   // Real Three.js geometry (not a flat illustration): tailored staff badge and gold brooch.
   // The existing bun hairstyle and staff click targets are preserved.
   const badge=new THREE.Group();badge.position.set(0,1.08,.355);guide.add(badge);
   const badgeBack=new THREE.Mesh(new THREE.BoxGeometry(.23,.15,.028),gold);badge.add(badgeBack);
   const badgeFace=new THREE.Mesh(new THREE.BoxGeometry(.19,.115,.032),cream);badgeFace.position.z=.017;badge.add(badgeFace);
   const pin=new THREE.Mesh(new THREE.SphereGeometry(.048,12,10),lightGold);pin.position.set(-.18,.15,.04);guide.add(pin);

 }
 // Keep the original interactive chibi staff. No GLB replacement.
 // v45: one identifiable left-side case sofa and coffee table, leaving the front-left open.
 box(5.0,.73,2.25,material(0xA9C9C7),-7.7,.66,-.35);
 box(5.0,1.46,.56,material(0xA9C9C7),-7.7,1.48,-1.30);
 for(const dx of [-2.24,2.24])box(.48,1.00,2.25,material(0xA9C9C7),-7.7+dx,.92,-.35);
 box(2.85,.18,1.55,stone,-7.7,.86,1.55);
 for(const dx of [-1.08,1.08])for(const dz of [-.52,.52])box(.18,.72,.18,walnut,-7.7+dx,.44,1.55+dz);
 // v46: one substantial consultation chair facing the case sofa, not a waiting area.
 const chairMat=material(0xB7CFC9);
 box(1.65,.65,1.55,chairMat,-3.55,.64,1.20);
 box(1.65,1.36,.38,chairMat,-2.96,1.42,1.20);
 for(const dz of [-.64,.64])box(1.38,.76,.23,chairMat,-3.55,.98,1.20+dz);
 // Contact hotspot is attached to the SINGLE consultation chair, not a screen-top button.
 const contactChairHit=box(1.85,1.9,1.85,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),-3.55,1.20,1.20);
 // Case file: a visible, clickable object on the table.
 const caseFile=box(.95,.10,.67,material(0xE6E0D3),-7.7,.87,1.5);
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
 const allowedMedicalActions=new Set(['mediation','records','forensics','consent','computer']);
 const register=(object,action)=>{if(!allowedMedicalActions.has(action))return object;object.userData.medicalAction=action;interactionTargets.push(object);interactionMap.set(object.uuid,action);return object};
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
 // v47: more dimensional wall-attached medical evidence cabinet with distinct doors and drawers.
 const evidenceBody=box(2.85,1.95,6.65,material(0xB8D1CA,0,.8),9.75,1.20,-1.65);
 const evidenceTop=box(3.03,.20,6.94,stone,9.75,2.25,-1.65);
 // Exposed front-facing (-X) drawer fronts, handles and raised file holders.
 for(const zz of [-3.78,-2.35,-.92,.51]){
  box(.075,1.35,1.30,cream,8.28,1.24,zz);
  box(.095,.085,.56,gold,8.20,1.30,zz);
 }
 for(const zz of [-3.25,-1.65,-.05]){
  box(.32,.98,1.13,cream,9.30,2.83,zz);
  box(.34,.10,.85,navy,9.12,2.89,zz);
  box(.04,.60,.07,gold,9.11,2.55,zz);
 }
 // v73: physical medical-legal investigation station, placed along the right wall.
 // It is a real 3D workstation rather than only a dialog option; central corridor stays clear.
 const labBase=box(1.55,1.38,3.35,stone,9.30,.76,2.05);
 box(1.80,.17,3.55,cream,9.30,1.54,2.05);
 const labPanel=box(.20,2.05,2.95,navy,9.28,2.75,2.05);
 for(const zz of [.98,2.02,3.06]){
   box(.24,.55,.72,cream,9.12,2.80,zz);
   box(.27,.09,.60,gold,8.97,2.72,zz);
 }
 // Four color-coded document trays: case chronology, consent, records and causation.
 for(let j=0;j<4;j++){
   box(.75,.09,.46,j%2?gold:navy,8.72,1.73,1.0+j*.66);
   box(.63,.025,.38,cream,8.72,1.79,1.0+j*.66);
 }
 register(labPanel,'evidence');register(labBase,'evidence');
 // v82: five integrated interactive stations, with non-interactive furniture between them.
 const mint=material(0xA7C6BB),paper=material(0xFFF8E8),teal=material(0x2E6668);
 const exhibit=(x,z,w,d,action)=>{const base=box(w,.86,d,cream,x,.53,z);box(w+.10,.10,d+.10,gold,x,1.01,z);register(base,action);return base;};
 // 1: mediation and medical-dispute scenarios, left-front.
 const round=add(new THREE.CylinderGeometry(1.05,1.05,.14,32),stone,-4.65,1.13,4.45);
 cyl(.15,.22,1.05,gold,-4.65,.57,4.45);register(round,'mediation');
 for(const [x,z] of [[-6.2,4.45],[-3.15,4.45]]){box(.70,.40,.74,mint,x,.44,z);box(.72,.90,.18,teal,x,.98,z+.40);}
 const papers=box(.62,.045,.50,paper,-4.65,1.23,4.45);register(papers,'mediation');
 // 2: records reader integrated with the original evidence cabinet, right wall.
 const fileReader=box(.16,1.20,1.40,teal,8.25,2.80,-3.80);register(fileReader,'records');
 for(let i=0;i<3;i++)box(.18,.12,.94,paper,8.10,3.19-i*.33,-3.80);
 // 3: standards + radiology in one anatomical/imagery display, left rear.
 exhibit(-9.25,-3.95,1.65,2.05,'forensics');
 const anatomy=cyl(.32,.28,1.30,mint,-9.25,1.80,-3.95);register(anatomy,'forensics');
 add(new THREE.SphereGeometry(.29,16,12),paper,-9.25,2.65,-3.95);
 const xray=box(1.72,1.52,.14,navy,-5.0,2.05,-6.12);register(xray,'forensics');
 for(const dx of [-.41,.41])register(box(.55,.93,.02,glass,-5.0+dx,2.10,-6.02),'forensics');
 // 4: consent document + timeline are a single workbench, left side.
 exhibit(-9.45,5.30,2.75,1.24,'consent');
 const consentPaper=box(.84,.055,.65,paper,-9.4,1.12,5.24);register(consentPaper,'consent');
 const pen=box(.06,.06,.62,navy,-8.84,1.16,5.27);register(pen,'consent');
 const timeline=box(1.32,1.55,.14,navy,-10.2,2.07,2.10);register(timeline,'consent');
 for(let i=0;i<4;i++)box(.72,.055,.035,i===2?gold:mint,-10.20,2.55-i*.33,2.21);
 // 5: liability desk with three decision switches, right side.
 const liability=box(.25,1.10,2.60,teal,8.95,2.76,2.05);register(liability,'liability');
 for(const zz of [1.34,2.05,2.76])register(box(.27,.25,.44,gold,8.78,2.81,zz),'liability');
 // Interior styling: low sideboards, books, vases, tall plants, warm lamps and lounge seating.
 const leaf=material(0x52846C),pot=material(0xE4D6BF),rose=material(0xDABBC1),softSeat=material(0xD5E6E0);
 for(const [x,z] of [[-10.3,7.8],[10.4,7.8],[-10.7,-6.4],[10.8,-6.4]]){
  cyl(.48,.36,.72,pot,x,.43,z);cyl(.09,.11,1.35,leaf,x,1.36,z);
  for(let j=0;j<7;j++){const a=j*Math.PI*2/7;const frond=add(new THREE.SphereGeometry(.47,9,7),leaf,x+Math.cos(a)*.42,2.0+(j%3)*.20,z+Math.sin(a)*.42);frond.scale.set(.75,1.3,.75);}
 }
 for(const [x,z] of [[-3.0,-6.8],[3.2,-6.8]]){
  box(2.1,1.05,.78,walnut,x,.55,z);box(2.2,.11,.88,gold,x,1.12,z);
  cyl(.20,.24,.52,pot,x-.55,1.45,z);add(new THREE.SphereGeometry(.32,10,8),rose,x-.55,1.88,z);
  for(let j=0;j<4;j++)box(.18,.48,.42,j%2?navy:mint,x+.15+j*.24,1.42,z);
 }
 for(const [x,z] of [[-6.8,7.6],[5.1,8.0]]){
  box(1.3,.43,1.0,softSeat,x,.52,z);box(1.3,.98,.20,softSeat,x,1.05,z-.42);
  cyl(.12,.18,1.45,gold,x+1.05,.85,z);add(new THREE.SphereGeometry(.38,12,8),lightGold,x+1.05,1.66,z);
 }
 // ECG screen integrated flush against the rear architectural wall, not floating in space.
 const canvas=document.createElement('canvas');canvas.width=640;canvas.height=256;const ctx=canvas.getContext('2d');
 const waveTex=new THREE.CanvasTexture(canvas);waveTex.colorSpace=THREE.SRGBColorSpace;
 box(4.78,2.56,.14,gold,8.0,4.3,-8.36);
 box(4.62,2.40,.15,navy,8.0,4.3,-8.24);
 const wavePanel=add(new THREE.PlaneGeometry(4.43,2.18),new THREE.MeshBasicMaterial({map:waveTex,side:THREE.DoubleSide}),8,4.3,-7.80);
 register(wavePanel,'ecg');
 // Clickable props and restrained, legible floating hints.
 const deskHit=box(6.25,.25,1.85,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),7.1,1.65,5.75);register(deskHit,'computer');
 const bookHit=box(4.45,6.65,.40,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),-8.05,4.1,-6.17);register(bookHit,'books');register(caseFile,'case');register(evidenceBody,'evidence');register(evidenceTop,'evidence');
 const logoHit=add(new THREE.PlaneGeometry(5.9,5.9),new THREE.MeshBasicMaterial({transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false}),0,4.85,-8.32);register(logoHit,'logo');
 if(guide){guide.traverse(o=>{if(o.isMesh)register(o,'staff')});}
 const labels=[];
 function hint(text,x,y,z,action){
  const canvas=document.createElement('canvas');canvas.width=480;canvas.height=112;
  const c=canvas.getContext('2d');c.fillStyle=action==='logo'?'rgba(255,250,239,.98)':'rgba(23,42,62,.98)';c.beginPath();c.roundRect(5,5,470,102,36);c.fill();
  c.strokeStyle='#d9b779';c.lineWidth=6;c.stroke();c.fillStyle=action==='logo'?'#21384f':'#fff9ec';c.textAlign='center';c.textBaseline='middle';c.font='bold 39px sans-serif';c.fillText(text,canvas.width/2,canvas.height/2,448);
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;
  if(!allowedMedicalActions.has(action)&&action!=='staff')return;
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:false}));sprite.center.set(.5,.5);sprite.position.set(x,y,z);sprite.scale.set(4.35,1.02,1);sprite.renderOrder=80;sprite.userData.baseY=y;if(action!=='staff')register(sprite,action);else sprite.userData.medicalAction='staff';root.add(sprite);labels.push(sprite);
 }
 hint('薪水掌門人',7.2,3.95,3.6,'staff');
 hint('😄 奇妙日常',7.1,2.8,6.5,'computer');
 hint('🤝 醫療協商',-7.7,2.25,1.5,'mediation');
 hint('📝 告知時間軸',-9.35,2.6,5.3,'consent');
 hint('🔍 鑑定影像',-9.3,3.5,-3.95,'forensics');
 hint('🗂️ 病歷探索',8.2,4.0,-3.8,'records');
 const spike=phase=>{let p=((phase%1)+1)%1;const points=[[0,0],[.16,0],[.21,.05],[.25,0],[.29,-.14],[.315,.84],[.335,-.33],[.38,0],[.53,0],[.62,.21],[.72,0],[1,0]];for(let j=1;j<points.length;j++)if(p<=points[j][0]){const a=points[j-1],b=points[j],r=(p-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*r}return 0};
 let last=0;
 const animation=(time)=>{
  if(guide){
   // v49: work-motivated routine: reception paperwork -> medical records -> book sorting -> reception.
   // Long pauses at each work station, not aimless constant pacing.
   const workStops=[
    {x:7.2,z:3.55,hold:6,task:'desk'},
    {x:6.0,z:1.2,hold:0},
    {x:6.0,z:-3.2,hold:0},
    {x:7.25,z:-3.3,hold:6,task:'records'},
    {x:5.5,z:-5.3,hold:0},
    {x:0,z:-5.3,hold:0},
    {x:-5.65,z:-5.3,hold:0},
    {x:-6.1,z:-6.05,hold:8,task:'books'},
    {x:-5.65,z:-5.3,hold:0},
    {x:0,z:-5.3,hold:0},
    {x:5.5,z:-5.3,hold:0},
    {x:6.0,z:-3.2,hold:0},
    {x:6.0,z:1.2,hold:0},
    {x:7.2,z:3.55,hold:5,task:'desk'}
   ];
   const legs=[];let duration=0;
   for(let i=0;i<workStops.length;i++){
    const p=workStops[i],next=workStops[i+1];
    if(p.hold){legs.push({a:p,b:p,start:duration,len:p.hold,task:p.task});duration+=p.hold;}
    if(next){const len=Math.hypot(next.x-p.x,next.z-p.z)/1.45;legs.push({a:p,b:next,start:duration,len});duration+=len;}
   }
   const elapsed=(time*.001)%duration;
   const leg=legs.find(l=>elapsed>=l.start&&elapsed<l.start+l.len)||legs[0];
   const u=Math.max(0,Math.min(1,(elapsed-leg.start)/leg.len));
   const moving=leg.a!==leg.b;
   const smooth=u*u*(3-2*u);
   guide.position.set(leg.a.x+(leg.b.x-leg.a.x)*smooth,moving?Math.abs(Math.sin(time*.009))*.025:0,leg.a.z+(leg.b.z-leg.a.z)*smooth);
   if(moving)guide.rotation.y=Math.atan2(leg.b.x-leg.a.x,leg.b.z-leg.a.z);
   else if(leg.task==='books')guide.rotation.y=Math.PI;
   else if(leg.task==='records')guide.rotation.y=Math.PI/2;
   else guide.rotation.y=-.35;
   // Working gestures: slight body lean/arm movements when organizing, never a teleport.
   if(!moving){guide.rotation.z=Math.sin(time*.003)*.028;}
   else guide.rotation.z=0;
   // Keep the staff's visible clickable label close as she moves.
   const staffLabel=labels.find(o=>o.userData.medicalAction==='staff');
   if(staffLabel){staffLabel.position.x=guide.position.x;staffLabel.position.z=guide.position.z+.1;}

  }
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
 const spot=new THREE.SpotLight(0xffdfab,1.6,18,Math.PI/4,.6);spot.position.set(0,8,0);spot.target.position.set(0,4.7,-8.5);root.add(spot,spot.target);
 for(const x of [-8,8]){const l=new THREE.PointLight(0xffe5c3,.65,11);l.position.set(x,6.8,-4);root.add(l)}
 // v41: refined real-time 3D medical-law interior; keep all exhibits and guide interactive.
 const v41Ivory=material(0xfffaf1,.08,.34),v41Brass=material(0xf4d49b,.56,.22),v41Deep=material(0x152a43,.18,.4);
 const v41Glow=new THREE.MeshBasicMaterial({color:0xffedca});
 // Architectural wall framing, kept away from original medical logo and ECG screen.
 for(const x of [-10.65,-6.15,6.15,10.65]){
  box(.07,6.5,.11,v41Brass,x,4.3,-8.92);
  box(1.8,.06,.13,v41Brass,x,7.56,-8.86);
 }
 // No rectangular side-wall panels: circular architecture stays visible.
 // Layered brass and illuminated cornice: no crossbeam across the open-front view.
 box(22.8,.12,.13,v41Brass,0,8.18,-8.63);
 box(22.3,.04,.09,v41Glow,0,8.02,-8.55);
 // The circular crown replaces the former side beams.
 // v44: remove detached gold vertical strips in front of reception. Keep solid curved reception geometry.
 // Gold corner uplights are emissive meshes, not expensive additional realtime lights.
 for(const x of [-10.15,10.15]){
  box(.20,.9,.20,v41Brass,x,1.4,-7.6);
  box(.31,.38,.25,v41Glow,x,1.95,-7.6);
 }
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
  case:{name:'醫療糾紛案例區',icon:'📋',intro:'一位病患在手術後出現併發症，家屬認為醫院一定有錯。你會建議先做什麼？',options:[
   ['A．先申請完整病歷','先保存病歷、檢查報告及同意書，有助於釐清診療過程。','可依時間建立事件紀錄，再由專業人士評估醫療常規、過失與因果關係。'],
   ['B．立刻在網路指控醫師','情緒可以理解，但公開未經查證的指控，可能衍生名譽與個資風險。','建議先保存資料、列出具體疑點，再評估溝通、調解或法律途徑。'],
   ['C．直接要求醫院賠償','提出請求前，應先確認損害、可能的注意義務違反及因果關係。','醫療結果不理想不等於必然有過失；必要時可尋求醫療及法律專業評估。']]},
  evidence:{name:'病歷與證據展示櫃',icon:'📑',intro:'醫療爭議常需要比對多種證據。請選擇想查看的資料：',options:[
   ['病歷與醫囑','病歷可協助確認診斷、用藥、處置及事件時間線。','申請資料時可一併確認護理紀錄、檢查結果及影像是否齊全。'],
   ['手術與治療同意書','同意書有助於了解告知與同意的內容，但簽名不代表醫療機構當然免責。','仍應依個案判斷告知義務、診療處置與實際損害。'],
   ['檢查報告及收據','檢查報告可輔助判讀病況變化，收據可作為部分費用損害的證明。','建議保留原件或完整副本，並依日期整理；個案證據價值仍需具體評估。']]},
  contact:{name:'聯絡我們｜德威陽國際法律事務所',icon:'☎',intro:'歡迎聯絡德威陽國際法律事務所。您可以透過下列方式了解服務或洽詢諮詢安排。',options:[['LINE 官方帳號｜@wylaw','LINE ID：@wylaw，可搜尋官方帳號聯繫。','如需諮詢，建議先整理案件類型、時間及相關文件。'],['官方網站｜weiandyang.com','官方網站：https://weiandyang.com','可查看本所法律服務及相關資訊。'],['Facebook｜weiandyang','Facebook：https://www.facebook.com/weiandyang','可瀏覽本所公開資訊與法律內容。'],['Instagram｜weiyang_ceo','Instagram：https://www.instagram.com/weiyang_ceo/','可瀏覽德威陽公開分享內容。']]},
  logo:{name:'WEIYANG 形象牆' ,icon:'⚖️',intro:'歡迎來到德威陽國際法律事務所！想認識我們的哪一面？',options:[
   ['認識林柏均律師','林律師具臺灣及紐約州律師資格，擁有 Emory LL.M. 與 ULV MBA 學位。','服務領域包含跨國商務、契約、訴訟及醫療法律等。'],
   ['了解法律服務','德威陽提供商務契約、公司治理、智慧財產及民刑事爭議等法律服務。','想進一步了解？LINE｜@wylaw　weiandyang.com']]}
 };
 const ecgTree={
 patient:{title:'病患／家屬',intro:'先確認診療經過、病歷與實際損害，再選擇合適的處理方式。您最想先了解哪一項？',options:[
  {q:'如何申請與整理病歷？',a:'先向醫療機構申請病歷複製本、檢查報告、影像及相關同意書，並保存申請紀錄。',next:[['資料不齊怎麼辦？','逐項列出缺漏資料及日期，向醫療機構確認申請範圍；必要時諮詢專業人員協助。'],['病歷拿到後做什麼？','按日期整理診斷、處置、用藥、檢查與症狀變化，建立客觀時間軸，避免自行改寫原始紀錄。']]},
  {q:'懷疑醫療疏失怎麼判斷？',a:'治療結果不如預期，不等於必然有過失。應評估診療時的醫療常規、注意義務、損害與因果關係。',next:[['需要哪些證據？','保留病歷、檢驗與影像資料、收據、工作損失資料及醫病溝通紀錄；爭點可請專業人士協助分析。'],['可以先與醫院溝通嗎？','可以。建議列出具體疑問、保留書面往來，必要時了解醫療爭議調解程序及其適用條件。']]},
  {q:'賠償、調解與訴訟怎麼選？',a:'可先盤點醫療費、照護支出、工作損失等實際損害，再比較協商、調解及法律程序的時間、證據與成本。',next:[['調解前要準備什麼？','整理事件時間軸、醫療文件、支出證明及希望釐清的爭點，並確認法定程序及時效問題。'],['何時需要律師？','若涉及重大損害、證據爭議或程序期限，可帶齊資料向德威陽預約諮詢，評估個案處理策略。']]}]},
 provider:{title:'醫師／院方',intro:'醫療團隊應優先確保照護與完整紀錄，再評估溝通及爭議處理。您目前關注哪一方面？',options:[
  {q:'如何保存病歷與診療紀錄？',a:'依法完整保存原始病歷、醫囑、同意書、檢驗影像及交班紀錄；如需補充應依規範註明時間與原因，不可倒填或變造。',next:[['內部資料怎麼整理？','依時間順序彙整相關照護流程、交班及溝通紀錄，並注意病人個資與資料存取權限。'],['發現紀錄缺漏呢？','依醫療機構規範處理補記，保留可追溯性；若已發生爭議，應及早尋求法遵或法律協助。']]},
  {q:'如何評估醫療常規與風險？',a:'應根據當時可得資訊、臨床判斷與相關醫療指引，分析診療決策、告知同意及後續照護，而非只以結果倒推。',next:[['要不要做內部檢討？','可以依院內程序進行客觀檢討，保留事實紀錄並釐清改善措施，避免未經查證就下結論。'],['如何準備專業說明？','整理當時的醫療資訊、決策依據、告知內容及時間軸，讓專業與法律團隊分別檢視。']]},
  {q:'病患申訴與調解如何應對？',a:'先保持溝通窗口一致、妥善回應疑問，保護病人隱私並依法配合適用的醫療爭議處理程序。',next:[['回覆時要注意什麼？','以可核實的事實與程序資訊說明，避免情緒性指責或未經授權公開病人資料。'],['什麼時候尋求法律協助？','收到正式申訴、調解通知或訴訟文件時，應確認期限，讓德威陽等專業法律團隊協助盤點風險與答辯資料。']]}]}
 };
 const el=document.createElement('section');el.id='wyMedicalExperience';
 el.style.cssText='display:none;position:fixed;left:50%;transform:translateX(-50%);bottom:78px;z-index:80;width:min(92vw,440px);background:#FFF9F0;color:#28524D;border:2px solid #C5A875;border-radius:18px;padding:14px;box-shadow:0 14px 36px #14283b66;font:14px/1.6 system-ui,sans-serif;max-height:65dvh;overflow-y:auto';
 el.innerHTML='<div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><b id="wyMedTitle"></b><button id="wyMedClose" type="button" aria-label="關閉">✕</button></div><p id="wyMedText" style="margin:12px 0"></p><div id="wyMedChoices" style="display:grid;gap:7px"></div><small style="display:block;color:#89755b;margin-top:10px">德威陽｜有法度 · 一般法律資訊，個案仍需評估</small>';
 document.body.append(el);
 const title=el.querySelector('#wyMedTitle'),body=el.querySelector('#wyMedText'),choices=el.querySelector('#wyMedChoices');
 el.querySelector('#wyMedClose').onclick=()=>el.style.display='none';

 const patientTopics=[['手術後神經損傷','患者術後持續不適，想了解手術風險是否充分告知。'],['急診延誤診斷','家屬質疑急診評估與後續處置是否及時。'],['癌症檢查延誤','檢查結果異常，患者質疑追蹤通知的流程。'],['一場改善生活的手術，卻帶來意外困擾','一名患者接受非緊急性的自費手術後，出現持續不適，影響日常生活，也開始質疑術前風險是否充分告知。'],['麻醉後併發症','患者在麻醉後出現異常，家屬希望釐清監測與應對。'],['產科醫療爭議','生產過程發生緊急狀況，家屬想確認醫療決策。'],['用藥錯誤爭議','患者用藥後出現不良反應，想確認醫囑與給藥紀錄。'],['住院跌倒受傷','患者住院期間跌倒，家屬質疑防護與照護安排。'],['術後感染爭議','術後發生感染，患者想了解感染控制及追蹤措施。'],['病歷記載爭議','患者發現病歷記載與記憶不同，想核對完整資料。']];
 const providerTopics=[['手術風險與求償','患者術後提出求償，院方需要整理告知及診療紀錄。'],['急診分流爭議','家屬質疑候診時間，院方需要釐清分流依據。'],['檢查報告通知爭議','患者稱未收到通知，院方需確認追蹤及聯繫紀錄。'],['醫療契約與效果爭議','患者對自費療程成果不滿，院方需要檢視契約與說明。'],['麻醉監測爭議','家屬質疑監測處置，院方需要核對完整時序。'],['產科緊急處置爭議','緊急處置引發爭議，院方需要整理當時判斷依據。'],['處方與給藥爭議','患者主張用藥受損，院方需要確認醫囑及執行紀錄。'],['住院照護責任','患者住院發生意外，院方需要釐清照護與防護流程。'],['院內感染爭議','患者質疑感染控制，院方需檢視相關措施與紀錄。'],['病歷保存與調閱','病歷完整性受到質疑，院方需確認保存與調閱程序。']];
 const facts=[
 ['知情同意','簽署同意書不代表醫療院所當然免責，仍須依具體情況檢視告知與處置。'],['醫療風險','發生併發症不必然代表醫療疏失，仍要檢視當時的醫療判斷。'],['申請病歷','可依適用規定向醫療機構申請病歷複製本，並確認所需範圍。'],['病歷時間軸','將檢查、診斷、用藥與處置按日期排列，有助於釐清爭點。'],['醫療調解','醫療爭議可以評估適用的調解程序，並事先整理事實與資料。'],['患者隱私','醫療資訊涉及個人隱私，公開或轉傳前應注意合法性。'],['醫療費用','醫療支出應保留收據及明細，以利評估可能的損害。'],['術前說明','非緊急手術也要重視治療目的、替代方案及相關風險說明。'],['醫療紀錄','護理紀錄、醫囑及檢驗資料都可能是釐清爭議的重要線索。'],['醫病溝通','爭議發生時，盡量保留客觀、完整的書面溝通紀錄。']];
 const factTitles=['檢驗報告','醫療影像','麻醉紀錄','急診分流','轉診流程','用藥安全','處方紀錄','護理交班','手術紀錄','術後追蹤','診斷告知','醫療常規','因果關係','損害證明','照護紀錄','院內感染','醫療契約','自費項目','療程期待','告知文件','醫師說明','申訴管道','資料保存','紀錄補記','個資保護','調解準備','訴訟時效','醫療鑑定','醫院回應','專業評估'];
 factTitles.forEach(t=>facts.push([t,'遇到'+t+'相關疑問，應先保存完整資料，依個案事實及適用規範進一步評估。']));
 const detectiveTitles=['消失的30分鐘','交班紀錄疑點','檢驗報告日期','手術同意書版本','麻醉紀錄缺頁','醫囑與給藥時間','急診分流紀錄','護理觀察落差','術後追蹤通知','影像報告差異','感染監測紀錄','轉診交接資訊','住院跌倒紀錄','補記病歷時間','收據與療程紀錄'];
 const ecgTitles=['術後心率逐漸加快','術後疑似出血','胸痛患者病情變化','昏厥患者的心律異常','麻醉期間血氧下降','麻醉恢復期呼吸異常','心房顫動','心跳過慢','危險性心室心律異常','嚴重感染與生命徵象變化','用藥後疑似嚴重過敏','患者突然意識不清','夜間監測警報','急救前後的監測變化','儀器雜訊與真正異常'];
 let factIndex=0,detectiveIndex=0,ecgIndex=0,storyIndex=0,storyRole='patient';
 function storyChoose(){title.textContent='雙人沙發｜醫療故事';body.textContent='從哪個角度聽故事？';choices.replaceChildren();button('患者／家屬',()=>storyShow('patient',0));button('醫療院所',()=>storyShow('provider',0));}
 function storyShow(role,i){storyRole=role;storyIndex=i;const d=(role==='patient'?patientTopics:providerTopics)[i];title.textContent=d[0];body.textContent=d[1];choices.replaceChildren();button('看看德威陽如何協助',()=>{body.textContent=i===3&&role==='patient'?'本所曾處理相關醫療訴訟，協助患者釐清術前告知、醫療處置及損害責任，透過法律程序維護權益。':'德威陽可協助整理相關資料、釐清告知與醫療處置、分析證據及法律責任，並評估溝通、調解或訴訟途徑。';});button('下一個故事',()=>storyShow(role,(i+1)%10));button('返回身分選擇',storyChoose);}
 function bookShow(){const d=facts[factIndex++%facts.length];title.textContent='大書櫃｜'+d[0];body.textContent=d[1];choices.replaceChildren();button('再翻一本',bookShow);}
 function detectiveShow(){const t=detectiveTitles[detectiveIndex++%detectiveTitles.length];title.textContent='醫療偵探｜'+t;body.textContent='調查任務：比較三份紀錄，找出需要進一步核對的線索。';choices.replaceChildren();[['病歷紀錄','先確認診療經過與記載時間。'],['護理紀錄','核對觀察、通知及交班內容。'],['檢查報告','比對檢查時間、結果及後續處置。']].forEach(([a,b])=>button(a,()=>{body.textContent=b;}));button('查看調查結果',()=>{body.textContent='關鍵是比對不同資料的時間、內容與完整性；單一差異不能直接認定疏失，仍須進一步查證。';});button('下一個案件',detectiveShow);}
 function ecgShow(){const t=ecgTitles[ecgIndex++%ecgTitles.length];title.textContent='心電圖監測｜'+t;body.textContent='監測畫面出現變化，什麼時候應提醒醫療團隊評估？';choices.replaceChildren();['發現異常變化時即依臨床情況評估','等到下一次例行巡房','只看單一數字，不確認患者狀況'].forEach((a,i)=>button(a,()=>{body.textContent=i===0?'答對了！應結合病人狀況、監測趨勢與臨床規範及時評估。':'不建議只等待或只看單一數字；應依患者情況與監測趨勢及時評估。';}));button('下一個監測事件',ecgShow);}
 function deskHome(){title.textContent='接待櫃檯｜德威陽';body.textContent='歡迎來到德威陽，想先了解什麼？';choices.replaceChildren();button('患者／家屬法律需求',()=>{body.textContent='可先整理病歷、醫療經過及相關損害資料，再評估法律諮詢。';});button('醫療院所法律需求',()=>{body.textContent='可協助醫療機構檢視診療紀錄、風險、申訴及爭議處理。';});button('諮詢與委任流程',()=>{body.textContent='可先聯繫本所說明案件類型，安排諮詢後再確認委任範圍。';});button('聯絡資訊與複製',contactHome);}
 function contactHome(){title.textContent='德威陽｜聯絡資訊';body.textContent='點擊即可複製聯絡資料。';choices.replaceChildren();[['LINE','@wylaw'],['官網','weiandyang.com'],['Facebook','weiandyang'],['Instagram','weiyang_ceo']].forEach(([k,v])=>button(k+'｜'+v,()=>{navigator.clipboard?.writeText(v);body.textContent='已選取：'+v+'（可複製使用）';}));button('返回接待櫃檯',deskHome);}
 const liabilityState={notice:false,records:false,causation:false};
 const customMedical={
  mediation:['🤝 醫療爭議協商桌','雙方對手術結果有不同看法。先選一個協商步驟。',[
   ['先核對爭議事實','整理診療時間線、病歷與雙方疑問，確認需要釐清的事項。'],
   ['討論調解方案','依醫療爭議處理程序評估調解，記錄雙方提出的條件。'],
   ['協商未成怎麼辦','保留往來紀錄，請專業人士評估後續法律途徑及期限。']]],
  consent:['📝 手術告知展示桌','簽了同意書，醫師就一定免責嗎？',[
   ['看同意書','簽名只是證據之一，仍需確認告知內容及當時情況。'],
   ['看告知過程','比較風險、替代方案與患者提問是否得到適當說明。'],
   ['看事件時間軸','從就診檢查、治療告知到術後追蹤，逐段核對紀錄與時間。']]],
  standards:['🧬 醫療常規展示','人體模型與診療資料，哪個才是判斷醫療責任的依據？',[
   ['診療當時資訊','應考量當時可得的症狀、檢查與臨床資訊。'],
   ['鑑定意見','專業鑑定可協助分析醫療常規，但仍須結合其他證據。'],
   ['結果與過失','治療結果不佳，並不自動等於醫療疏失。']]],
  forensics:['🔍 醫療影像證據中心','三份模擬資料，請選擇你要先比對的線索。',[
   ['影像拍攝時間','確認影像日期與症狀變化，避免把不同時點混在一起。'],
   ['影像報告版本','核對原始影像、報告與補充紀錄是否一致。'],
   ['醫療常規與鑑定','結合當時臨床資訊、影像與鑑定意見，分析注意義務及因果關係。']]],
  timeline:['🕒 醫療事件時間軸','醫療爭議往往發生在不同時間點，先看哪一段？',[
   ['就診與檢查','核對症狀、分流、檢驗時間及相關紀錄。'],
   ['治療與告知','確認治療決策、風險告知與同意過程。'],
   ['術後與追蹤','核對病情變化、醫囑、交班與追蹤安排。']]],
  records:['🗂️ 病歷證據閱覽台','病歷資料不只一張紙，請選擇查看項目。',[
   ['醫囑與護理紀錄','核對給藥、觀察與交班時間，保存完整副本。'],
   ['檢驗與影像','比對報告日期、原始資料與臨床處置。'],
   ['同意書與收據','確認告知文件、支出憑證及事件時間線。']]]
 };
 function customHome(action){const d=customMedical[action];title.textContent=d[0];body.textContent=d[1];choices.replaceChildren();d[2].forEach(([q,a])=>button(q,()=>{body.textContent=a;choices.replaceChildren();button('↩ 查看其他項目',()=>customHome(action));button('✕ 繼續探索',()=>el.style.display='none');}));}
 function liabilityHome(){title.textContent='⚖️ 醫療責任條件分析';choices.replaceChildren();const {notice,records,causation}=liabilityState;
 const notes=[];
 notes.push(notice?'告知：已有告知資料，仍要檢視內容是否充分及是否符合當時情況。':'告知：尚缺告知內容與同意過程資料，不能只憑有無簽名判斷。');
 notes.push(records?'病歷：已有相關紀錄，需核對時間、完整性與實際處置。':'病歷：紀錄仍不完整，宜先依法取得並保存診療、護理與檢驗資料。');
 notes.push(causation?'因果：已有損害與因果資料，仍須專業評估其證明力。':'因果：尚未釐清損害是否與特定診療處置相關，不能直接認定責任。');
 body.textContent='請切換三個條件（已勾選＝有初步資料）：\n\n'+notes.join('\n')+'\n\n以上僅是證據盤點；是否成立責任仍須綜合醫療常規、注意義務、損害與個案證據。';[
 ['notice','告知與同意'],['records','病歷是否完整'],['causation','損害因果關係']].forEach(([key,label])=>button((liabilityState[key]?'☑ ':'□ ')+label,()=>{liabilityState[key]=!liabilityState[key];liabilityHome()}));button('重設條件',()=>{Object.keys(liabilityState).forEach(k=>liabilityState[k]=false);liabilityHome()});button('✕ 繼續探索',()=>el.style.display='none');}

 // v86: exactly five physical interaction entrances, each with twenty short situations.
 const scenarioSets={
 mediation:[
 ['術後效果不如預期，家屬要求賠償。','先確認術前說明','立刻答應賠償','拒絕所有溝通'],
 ['病患說醫師沒有解釋風險。','核對告知紀錄','只看簽名','直接指責病患'],
 ['醫院提出一次性和解金。','核對和解範圍','立刻簽字','先上網公布'],
 ['雙方對診療時間各說各話。','整理時間線','只聽一方','先談金額'],
 ['家屬情緒激動，要求院長出面。','安排溝通窗口','不理會','當場爭吵'],
 ['患者認為醫院拖延回覆。','保存往來紀錄','每日公開指責','放棄詢問'],
 ['雙方願意進行醫療調解。','列出爭議重點','只帶情緒','不帶資料'],
 ['醫院否認處置有問題。','核對醫療資料','認定必然無責','直接定罪'],
 ['患者提出高額賠償請求。','整理損害項目','隨意喊價','不查證據'],
 ['醫師願意解釋但患者不信任。','安排具體問答','拒絕聽取','只談媒體'],
 ['調解時發現病歷缺少一頁。','先確認資料完整','忽略缺頁','直接猜測'],
 ['患者希望院方正式道歉。','釐清訴求與事實','強迫道歉','拒絕談話'],
 ['醫院表示需時間調查。','約定回覆期限','無限等待','立即辱罵'],
 ['雙方爭執術後照護方式。','比對醫囑紀錄','只靠印象','跳過查證'],
 ['患者說醫療費用不合理。','核對收據明細','直接拒付','公開個資'],
 ['家屬和患者意見不同。','確認患者意願','只聽家屬','忽略當事人'],
 ['協商中出現新的檢查資料。','先評估新證據','立即結案','直接忽略'],
 ['院方提議改由第三人協助。','評估調解方式','立即拒絕','只求勝負'],
 ['雙方對醫師承諾有爭議。','查看書面紀錄','只靠傳聞','先決定賠償'],
 ['調解未能達成共識。','保存紀錄評估後續','撕毀文件','放棄期限']
 ],
 records:[
 ['懷疑用錯藥，先找哪份資料？','醫囑與給藥紀錄','只有收據','只看出院單'],
 ['病歷日期與檢驗日期不一致。','比對時間戳記','直接認定造假','忽略差異'],
 ['護理交班記載不清。','查看前後紀錄','只看一行','直接刪除'],
 ['病患說半夜曾呼叫護理師。','核對護理紀錄','只問其他病患','不查證'],
 ['住院用藥劑量疑似不同。','比對醫囑與藥單','只看藥袋顏色','猜測原因'],
 ['手術紀錄缺少附件。','確認資料是否齊全','直接下結論','忽略附件'],
 ['檢查報告有兩個版本。','核對版本日期','隨意選一份','刪除舊版'],
 ['患者說醫師曾口頭承諾。','找對話及病歷記載','只靠猜測','不理會'],
 ['轉院資料缺少檢驗結果。','申請補齊資料','放棄比對','只看收據'],
 ['出院後症狀持續惡化。','整理回診紀錄','只記得感覺','不保存'],
 ['病歷有事後補記內容。','核對補記時間','直接認定違法','一律忽略'],
 ['護理紀錄與醫囑不同。','比對執行時間','只選有利版本','不查證'],
 ['病患懷疑院內跌倒未記錄。','查看照護紀錄','只看照片','直接猜測'],
 ['影像報告找不到原始檔。','確認影像資料','只看摘要','不再詢問'],
 ['同意書日期晚於治療日。','核對實際時間','直接定罪','忽略日期'],
 ['急診分流時間有疑問。','核對到院紀錄','只聽傳聞','猜測時間'],
 ['家屬拍下監測器畫面。','核對正式紀錄','只憑照片','刪除照片'],
 ['診療單寫法難以理解。','請專業人士解讀','自行猜測','忽略術語'],
 ['收據與療程項目不一致。','核對費用明細','只看總額','直接認定詐欺'],
 ['資料太多不知道怎麼整理。','按日期分類','隨機刪除','只留一頁']
 ],
 forensics:[
 ['術後影像出現新的陰影。','比對術前影像','直接認定疏失','只看照片'],
 ['X光片與報告說法不同。','核對原始影像','直接忽略','只選一方'],
 ['病情突然惡化。','查看當時監測','只看最終結果','猜測原因'],
 ['檢查報告晚了一天出來。','核對處置時序','直接認定延誤','忽略時間'],
 ['麻醉期間血氧下降。','比對麻醉紀錄','只看一個數字','不查背景'],
 ['醫師對影像有不同解讀。','評估專業意見','投票決定','直接責怪'],
 ['影像品質不清楚。','確認是否需重拍','隨意判讀','忽略限制'],
 ['術前已有相同異常。','核對前後變化','只看術後','直接定責'],
 ['病患感染指標升高。','結合臨床資料','只看一個數字','直接定罪'],
 ['急診影像顯示疑似骨折。','核對診斷與處置','只看照片','不查時間'],
 ['術後出現神經症狀。','核對診療過程','直接認定醫師錯','只靠猜測'],
 ['醫院提出鑑定意見。','核對鑑定依據','照單全收','全部否定'],
 ['兩次檢查結果不一致。','比對檢查條件','隨意選一份','不查差異'],
 ['患者認為手術位置不對。','核對影像及紀錄','只憑感覺','先定責'],
 ['病歷與影像日期有落差。','確認檢查時間','直接認定造假','忽略日期'],
 ['醫師說異常屬已知風險。','查風險與處置','一律相信','一律否定'],
 ['術後疼痛比預期嚴重。','核對症狀與處置','只憑痛感定責','不查資料'],
 ['影像顯示舊傷與新傷。','辨別傷害時點','全部算新傷','忽略舊傷'],
 ['患者詢問鑑定是否必勝。','說明鑑定限制','保證勝訴','拒絕回答'],
 ['報告結論與症狀不一致。','綜合臨床資訊','只看結論','忽略症狀']
 ],
 consent:[
 ['簽了同意書卻說沒聽懂。','核對說明過程','只看簽名','直接否定'],
 ['手術風險在術後才說明。','核對告知時間','只看結果','忽略時序'],
 ['病患聽不懂醫學術語。','確認理解方式','繼續用術語','直接簽字'],
 ['同意書上缺少日期。','核對簽署時點','直接猜日期','忽略問題'],
 ['家屬代簽手術同意書。','確認代理權限','只看筆跡','一律有效'],
 ['醫師臨時更改治療方案。','確認是否需再告知','不作說明','只問護士'],
 ['患者說沒被告知替代療法。','核對替代方案說明','只看簽名','忽略疑問'],
 ['急診處置時間非常緊迫。','核對緊急情況','一律不必告知','直接停治'],
 ['說明會議沒有書面紀錄。','查其他佐證資料','直接認定無告知','完全忽略'],
 ['同意書內容和實際術式不同。','核對變更原因','只看結果','直接定責'],
 ['患者術前曾提出疑問。','查看回應紀錄','忽略問題','直接猜測'],
 ['告知與簽署相隔很久。','核對是否有變更','只看日期','一律有效'],
 ['家屬說病患當時意識不清。','確認同意能力','只看簽名','直接否定'],
 ['術前檢查發現新風險。','確認追加告知','忽略新資料','只看舊單'],
 ['醫師使用影片進行說明。','確認理解與提問','只看影片','直接免責'],
 ['病患要求第二意見。','說明可行安排','立即拒絕','直接簽字'],
 ['同意書影本字跡模糊。','確認完整文件','猜測文字','忽略內容'],
 ['患者對麻醉風險有疑問。','核對麻醉告知','只談手術','不予理會'],
 ['治療前後的說法不一致。','建立告知時間軸','只聽一方','不查證'],
 ['病患說當時受到催促。','確認簽署情境','只看簽名','直接定責']
 ],
 computer:[
 ['訪客：「這裡能看感冒嗎？」','「我是不是走錯了？」','「那有咖啡嗎？」','「你們會打針嗎？」'],
 ['小編：「咖啡機今天又罷工。」','「請它寫請假單。」','「換一台吧！」','「它有薪水嗎？」'],
 ['員工：「律師說今天準時下班。」','「我先拍照存證！」','「真的嗎？」','「鬧鐘壞了？」'],
 ['訪客：「這裡有掛號機嗎？」','「那我要抽號碼牌。」','「有叫號嗎？」','「我找誰？」'],
 ['小編：「印表機又卡紙了。」','「它想放假吧。」','「先哄哄它。」','「找律師談判！」'],
 ['員工：「有人把茶放進冰箱。」','「這算冷靜處理。」','「我的茶呢？」','「是誰？」'],
 ['訪客：「你們的椅子很舒服。」','「我可以住這嗎？」','「有午睡服務？」','「要收費嗎？」'],
 ['小編：「今天的待辦清單好長。」','「折起來就短了。」','「還有明天啊！」','「先喝茶。」'],
 ['員工：「電腦突然自動更新。」','「它很有上進心。」','「選錯時間了！」','「給它鼓掌？」'],
 ['訪客：「你們這裡好安靜。」','「我可以唱歌嗎？」','「有背景音樂？」','「太安靜了吧！」'],
 ['小編：「誰拿走我的筆？」','「筆去開會了。」','「問問抽屜。」','「它自己走了？」'],
 ['員工：「律師的行程又滿了。」','「行事曆要加班。」','「還有空白嗎？」','「它喘不過氣了。」'],
 ['訪客：「這是醫療島還是咖啡廳？」','「有甜點嗎？」','「菜單在哪？」','「能外帶嗎？」'],
 ['小編：「電梯門又慢慢關上。」','「它在等主角。」','「要配音樂嗎？」','「別演了啦！」'],
 ['員工：「今天有人帶三個便當。」','「那是備援系統。」','「幫我留一個！」','「好有遠見！」'],
 ['訪客：「你們有吉祥物嗎？」','「是那台咖啡機？」','「是律師嗎？」','「可以投票嗎？」'],
 ['小編：「會議室冷氣太冷。」','「企鵝會喜歡。」','「借我外套！」','「這是南極嗎？」'],
 ['員工：「今天電話響不停。」','「它想當歌手。」','「先喝口水。」','「有安可嗎？」'],
 ['訪客：「這裡能充手機嗎？」','「我的電量剩1%。」','「先救手機！」','「有插座嗎？」'],
 ['小編：「今天終於清空信箱。」','「明天它會長回來。」','「值得慶祝！」','「先別刷新！」']
 ]
 };
 const scenarioCursor={mediation:0,records:0,forensics:0,consent:0,computer:0};
 // v87: twenty independent humorous conversations; no fallback repeated dialogue.
 const funnyReplies=[
 ['接待員：「昨天還有人來問能不能洗牙，我們真的不是牙科。」','小編：「咖啡有，咖啡機今天心情比較複雜。」','接待員：「針沒有，倒是有很多迴紋針。」'],
 ['小編：「我幫它填：因咖啡豆意見不合，請假一天。」','員工：「換新機前，先問舊機要不要辦歡送會。」','小編：「沒有薪水，但它比我還會準時休息。」'],
 ['小編：「先拍照，這可能是歷史性的一刻！」','員工：「我已經問了三次，律師都說是真的。」','小編：「鬧鐘沒壞，是大家不敢相信。」'],
 ['接待員：「號碼牌只有一張，上面寫歡迎光臨。」','員工：「有叫號，但通常叫的是我去拿文件。」','接待員：「找陳小姐可以，先別找醫師。」'],
 ['小編：「它去年就想退休了，今天終於提出申請。」','員工：「哄了十分鐘，它只回我一張白紙。」','小編：「律師說這件案子證據很皺。」'],
 ['員工：「茶冷靜了，我的心情還沒有。」','小編：「你的茶正在冷藏區參加冬令營。」','員工：「嫌疑人可能只是想喝冰茶。」'],
 ['接待員：「住下來要先問椅子同不同意。」','員工：「午睡服務沒有，午睡夢想很多。」','接待員：「椅子免費坐，別把它搬回家就好。」'],
 ['小編：「清單折短了，工作卻一件都沒少。」','員工：「明天的清單已經在門口排隊。」','小編：「喝完茶，清單好像又長高了。」'],
 ['員工：「電腦很努力，挑了我最忙的時候進修。」','小編：「它專挑截止日前更新，真有眼光。」','員工：「等它更新完再鼓掌，我現在手忙。」'],
 ['接待員：「可以唱，但隔壁的印表機可能會合音。」','員工：「背景音樂是鍵盤聲與咖啡機嘆氣。」','小編：「太安靜？我可以開啟影印機。」'],
 ['小編：「筆去開會了，還沒送回會議紀錄。」','員工：「抽屜說它沒有藏，是筆自己跑的。」','小編：「它若有腳，請叫它把文件也送了。」'],
 ['員工：「行事曆申請加班費，老闆還在考慮。」','小編：「空白有，在明年的封面上。」','員工：「我替行事曆安排了深呼吸時間。」'],
 ['接待員：「甜點沒有，倒是有一堆甜甜圈狀的資料夾。」','員工：「菜單上只有咖啡與今天的待辦事項。」','接待員：「文件不能外帶當點心喔！」'],
 ['小編：「電梯覺得自己是電影主角。」','員工：「配上交響樂，門會不會關快點？」','小編：「好啦，我先按開門鍵。」'],
 ['員工：「便當是重要的備援系統，還有熱量備份。」','小編：「留可以，但它們已經被主人點名了。」','員工：「有遠見，也有很大的胃口。」'],
 ['小編：「咖啡機表示它不想承擔這個職位。」','員工：「律師太忙，吉祥物得自己開會。」','接待員：「投票箱放這裡，候選人先別跑。」'],
 ['小編：「企鵝來了可能會要求加暖氣。」','員工：「外套在椅背，先跟椅子借。」','小編：「南極沒有，冷氣遙控器倒是失蹤了。」'],
 ['員工：「電話已經唱完三張專輯。」','小編：「先喝水，不然待會連聲音都沙啞。」','員工：「安可沒有，請留到明天再打。」'],
 ['接待員：「1%很緊急，但請先不要把我當充電器。」','員工：「先救手機，然後救找不到線的你。」','接待員：「插座在旁邊，充電線要自備喔。」'],
 ['小編：「信箱有再生能力，清空只是短暫勝利。」','員工：「值得慶祝三秒，然後繼續工作。」','小編：「不要刷新！讓這份寧靜多活一下。」']
 ];
 const areaNames={mediation:'🤝 醫療協商',records:'🗂️ 病歷探索',forensics:'🔍 鑑定影像',consent:'📝 告知時間軸',computer:'😄 奇妙日常'};
 function scenarioHome(action){
  const list=scenarioSets[action],i=scenarioCursor[action]%list.length,item=list[i];
  title.textContent=areaNames[action]+'｜'+String(i+1).padStart(2,'0')+'/20';
  choices.replaceChildren();
  if(action==='computer'){
   body.textContent=item[0]+'\n你要怎麼回話？';
   for(let k=1;k<=3;k++)button(String.fromCharCode(64+k)+'．'+item[k],()=>{
    body.textContent=item[0]+'\n你：「'+item[k]+'」\n'+funnyReplies[i][k-1];
    choices.replaceChildren();button('再選一次',()=>scenarioHome(action));nextScenario(action,i);
   });
  }else if(action==='records'){
   body.textContent=item[0]+'\n請打開資料，找出需要核對的線索。';
   const docs=['📄 醫囑與處置','📋 護理與時間','🧪 檢驗與附件'];const opened=new Set();
   docs.forEach((d,k)=>button(d,()=>{opened.add(k);body.textContent=item[0]+'\n已查看：'+[...opened].map(j=>docs[j]).join('、')+'。\n'+(k===0?'留意醫師指示與實際執行是否相符。':k===1?'比對紀錄時間與交班、通知內容。':'確認檢驗結果、附件版本與資料完整性。');if(opened.size===3){choices.replaceChildren();button('🔎 查看調查結論',()=>showOutcome(action,i,0));}}));
   button('💡 我先提出判斷',()=>showOutcome(action,i,0));
  }else if(action==='forensics'){
   body.textContent=item[0]+'\n先比較影像與診療紀錄，再決定鑑定方向。';
   let viewed=false;button('🖼️ 術前／原始影像',()=>{viewed=true;body.textContent=item[0]+'\n已查看術前資料：注意檢查日期、原始狀況及影像品質。';});
   button('🖼️ 術後／追蹤影像',()=>{viewed=true;body.textContent=item[0]+'\n已查看追蹤資料：比對時間點、變化與當時臨床症狀。';});
   button('🔬 選擇鑑定重點',()=>{body.textContent=item[0]+'\n'+(viewed?'已進行影像比對。':'建議先看原始及追蹤影像。')+'\n請選擇接下來的分析方向。';choices.replaceChildren();for(let k=1;k<=3;k++)button(String.fromCharCode(64+k)+'．'+item[k],()=>showOutcome(action,i,k-1));});
  }else if(action==='consent'){
   body.textContent=item[0]+'\n請依序核對醫療事件。';let step=0;
   const phases=['① 術前說明','② 同意文件','③ 實際處置／追蹤'];
   function phase(){choices.replaceChildren();button(phases[step]+'｜點擊核對',()=>{body.textContent=item[0]+'\n'+phases[step]+'：'+['確認說明風險與替代方案的時間。','核對簽署人、日期及文件內容。','比對實際治療與事後紀錄。'][step];step++;if(step<3)phase();else{choices.replaceChildren();button('📝 查看時間軸結論',()=>showOutcome(action,i,0));}});}
   phase();
  }else{
   body.textContent=item[0]+'\n你會怎麼回應雙方？';
   for(let k=1;k<=3;k++)button(String.fromCharCode(64+k)+'．'+item[k],()=>showOutcome(action,i,k-1));
  }
  button('換一個情境',()=>{scenarioCursor[action]=(i+1)%list.length;scenarioHome(action)});
 }
 function showOutcome(action,i,k){
  const item=scenarioSets[action][i];let feedback;
  if(k===0){feedback='你選擇「'+item[1]+'」。這是較適合先查證的方向。請以本案的「'+item[0]+'」為核心，核對相關紀錄與當時情況，再決定下一步。';}
  else if(k===1){feedback='你選擇「'+item[2]+'」。這可能忽略本案尚待確認的事實。先查證「'+item[0]+'」，避免只憑單一說法下結論。';}
  else{feedback='你選擇「'+item[3]+'」。這無法充分處理「'+item[0]+'」的爭點；應保留證據並依個案情況評估。';}
  body.textContent=item[0]+'\n\n'+feedback+'\n\n提醒：模擬內容不等於個案責任認定。';choices.replaceChildren();
  button('↩ 重玩本題',()=>scenarioHome(action));nextScenario(action,i);
 }
 function nextScenario(action,i){button('下一個情境',()=>{scenarioCursor[action]=(i+1)%scenarioSets[action].length;scenarioHome(action)});button('✕ 繼續探索',()=>el.style.display='none');}
 let current='staff';
 function button(label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.style.cssText='width:100%;text-align:left;background:#F0F3EC;border:1px solid #BAC9B9;border-radius:10px;padding:10px 12px;color:#28524D;font-weight:600;cursor:pointer';b.onclick=fn;choices.append(b);}
 function ecgHome(){title.textContent='❤️ 心電圖螢幕｜醫療法律互動';body.textContent='請選擇您的立場，進入不同的醫療爭議法律情境：';choices.replaceChildren();button('A．病患／家屬',()=>ecgRole('patient'));button('B．醫師／院方',()=>ecgRole('provider'));}
 function ecgRole(role){const t=ecgTree[role];title.textContent='❤️ '+t.title;body.textContent=t.intro;choices.replaceChildren();t.options.forEach((o,i)=>button(String.fromCharCode(65+i)+'．'+o.q,()=>ecgQuestion(role,i)));button('↩ 重新選擇身分',ecgHome);}
 function ecgQuestion(role,i){const t=ecgTree[role],o=t.options[i];title.textContent='❤️ '+t.title+'｜'+o.q;body.textContent=o.a;choices.replaceChildren();o.next.forEach((n,j)=>button(String.fromCharCode(65+j)+'．'+n[0],()=>{body.textContent=n[1];choices.replaceChildren();button('↩ 回到這個問題',()=>ecgQuestion(role,i));button('↩ 回到'+t.title+'選單',()=>ecgRole(role));button('✕ 繼續探索',()=>el.style.display='none')}));button('↩ 回到'+t.title+'選單',()=>ecgRole(role));}
 function home(){if(scenarioSets[current]){scenarioHome(current);return;}if(current==='liability'){liabilityHome();return;}if(customMedical[current]){customHome(current);return;}if(current==='case'){storyChoose();return;}if(current==='books'){bookShow();return;}if(current==='evidence'){detectiveShow();return;}if(current==='computer'){deskHome();return;}if(current==='ecg'){ecgHome();return;}if(current==='contact'){title.textContent='☎ 聯絡我們｜德威陽國際法律事務所';body.textContent='請選擇聯絡方式：';choices.replaceChildren();[['LINE｜@wylaw','https://line.me/R/ti/p/@wylaw'],['官方網站','https://weiandyang.com'],['Facebook','https://www.facebook.com/weiandyang'],['Instagram','https://www.instagram.com/weiyang_ceo/']].forEach(([label,url])=>button(label,()=>window.open(url,'_blank','noopener,noreferrer')));button('複製 LINE ID：@wylaw',()=>{navigator.clipboard?.writeText('@wylaw');body.textContent='LINE ID：@wylaw';});return;}const s=scenes[current];title.textContent=s.icon+' '+s.name;body.textContent=s.intro;choices.replaceChildren();s.options.forEach((o,i)=>button(String.fromCharCode(65+i)+'．'+o[0],()=>answer(i,0)));}
 function answer(i,level){const s=scenes[current],o=s.options[i];body.textContent=o[level+1];choices.replaceChildren();if(level===0)button('✨ 再了解一點',()=>answer(i,1));button('↩ 換一個問題',home);button('✕ 繼續逛辦公室',()=>el.style.display='none');}
 return {show(){el.style.display='none'},open(action='staff'){current=(scenarioSets[action]||scenes[action]||customMedical[action]||action==='liability')?action:'computer';home();el.style.display='block'},hide(){el.style.display='none'}};
}
