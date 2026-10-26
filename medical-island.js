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
 box(23.6,.1,18.6,material(0xD6D2C8,0,1),0,.02,0);
 // Large inset marble perimeter and champagne-brass border.
 for(const x of [-11.25,11.25])box(.055,.018,17.3,gold,x,.09,0);
 for(const z of [-8.25,8.25])box(22.5,.018,.055,gold,0,.09,z);
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
 for(const x of [-11.1,11.1])box(.14,.12,17.3,gold,x,8.35,0);
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
  c.strokeStyle='#d9b779';c.lineWidth=6;c.stroke();c.fillStyle=action==='logo'?'#21384f':'#fff9ec';c.textAlign='center';c.textBaseline='middle';c.font='bold 39px sans-serif';c.fillText(text,240,56,448);
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:false}));sprite.position.set(x,y,z);sprite.scale.set(4.35,1.02,1);sprite.renderOrder=80;sprite.userData.baseY=y;register(sprite,action);root.add(sprite);labels.push(sprite);
 }
 hint('💬 跟我聊聊',7.2,3.95,3.6,'staff');
 hint('📚 點我翻翻',-8.05,7.95,-6.90,'books');
 hint('❤️ 點我看看',8,6.70,-7.60,'ecg');
 hint('✨ 接待諮詢',7.1,2.8,6.5,'computer');
 hint('📋 醫療糾紛案例',-7.7,2.65,1.5,'case');
 hint('📑 病歷證據',9.7,3.45,-1.65,'evidence');
 hint('⚖️ 認識德威陽',0,8.10,-6.80,'logo');
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
 for(const x of [-10.95,10.95]){
  for(const z of [-6.6,-1.5,3.6,7.3]){
   box(.12,5.3,2.0,v41Brass,x,4.1,z);
   box(.13,5.0,1.78,v41Ivory,x+(x<0?.08:-.08),4.1,z);
  }
 }
 // Layered brass and illuminated cornice: no crossbeam across the open-front view.
 box(22.8,.12,.13,v41Brass,0,8.18,-8.63);
 box(22.3,.04,.09,v41Glow,0,8.02,-8.55);
 for(const x of [-11.08,11.08]){
  box(.13,.13,17.2,v41Brass,x,8.17,0);
  box(.06,.05,16.8,v41Glow,x,8.02,0);
 }
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
 el.style.cssText='display:none;position:fixed;left:50%;transform:translateX(-50%);bottom:78px;z-index:80;width:min(92vw,440px);background:#fffaf0;color:#20354c;border:2px solid #cfa96c;border-radius:18px;padding:14px;box-shadow:0 14px 36px #14283b66;font:14px/1.6 system-ui,sans-serif;max-height:65dvh;overflow-y:auto';
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
 let current='staff';
 function button(label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.style.cssText='width:100%;text-align:left;background:#f5ebda;border:1px solid #d7bb8b;border-radius:10px;padding:10px 12px;color:#243b52;font-weight:600;cursor:pointer';b.onclick=fn;choices.append(b);}
 function ecgHome(){title.textContent='❤️ 心電圖螢幕｜醫療法律互動';body.textContent='請選擇您的立場，進入不同的醫療爭議法律情境：';choices.replaceChildren();button('A．病患／家屬',()=>ecgRole('patient'));button('B．醫師／院方',()=>ecgRole('provider'));}
 function ecgRole(role){const t=ecgTree[role];title.textContent='❤️ '+t.title;body.textContent=t.intro;choices.replaceChildren();t.options.forEach((o,i)=>button(String.fromCharCode(65+i)+'．'+o.q,()=>ecgQuestion(role,i)));button('↩ 重新選擇身分',ecgHome);}
 function ecgQuestion(role,i){const t=ecgTree[role],o=t.options[i];title.textContent='❤️ '+t.title+'｜'+o.q;body.textContent=o.a;choices.replaceChildren();o.next.forEach((n,j)=>button(String.fromCharCode(65+j)+'．'+n[0],()=>{body.textContent=n[1];choices.replaceChildren();button('↩ 回到這個問題',()=>ecgQuestion(role,i));button('↩ 回到'+t.title+'選單',()=>ecgRole(role));button('✕ 繼續探索',()=>el.style.display='none')}));button('↩ 回到'+t.title+'選單',()=>ecgRole(role));}
 function home(){if(current==='case'){storyChoose();return;}if(current==='books'){bookShow();return;}if(current==='evidence'){detectiveShow();return;}if(current==='computer'){deskHome();return;}if(current==='ecg'){ecgShow();return;}if(current==='ecg'){ecgHome();return;}if(current==='contact'){title.textContent='☎ 聯絡我們｜德威陽國際法律事務所';body.textContent='請選擇聯絡方式：';choices.replaceChildren();[['LINE｜@wylaw','https://line.me/R/ti/p/@wylaw'],['官方網站','https://weiandyang.com'],['Facebook','https://www.facebook.com/weiandyang'],['Instagram','https://www.instagram.com/weiyang_ceo/']].forEach(([label,url])=>button(label,()=>window.open(url,'_blank','noopener,noreferrer')));button('複製 LINE ID：@wylaw',()=>{navigator.clipboard?.writeText('@wylaw');body.textContent='LINE ID：@wylaw';});return;}const s=scenes[current];title.textContent=s.icon+' '+s.name;body.textContent=s.intro;choices.replaceChildren();s.options.forEach((o,i)=>button(String.fromCharCode(65+i)+'．'+o[0],()=>answer(i,0)));}
 function answer(i,level){const s=scenes[current],o=s.options[i];body.textContent=o[level+1];choices.replaceChildren();if(level===0)button('✨ 再了解一點',()=>answer(i,1));button('↩ 換一個問題',home);button('✕ 繼續逛辦公室',()=>el.style.display='none');}
 return {show(){el.style.display='none'},open(action='staff'){current=scenes[action]?action:'staff';home();el.style.display='block'},hide(){el.style.display='none'}};
}
