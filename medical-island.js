// WEIYANG medical island — standalone exterior and interior module.
// All medical geometry and interaction live here; castle.js is untouched.
export function createMedicalExterior(group, THREE){
 const ivory=new THREE.MeshStandardMaterial({color:0xfff9ee,roughness:.62});
 const blue=new THREE.MeshStandardMaterial({color:0x5c9ccf,metalness:.18,roughness:.33});
 const gold=new THREE.MeshPhysicalMaterial({color:0xfff0cb,metalness:.24,roughness:.15,clearcoat:1,clearcoatRoughness:.07,emissive:0x000000,emissiveIntensity:0});
 const glass=new THREE.MeshPhysicalMaterial({color:0xc9f1fb,transparent:true,opacity:.91,roughness:.25,metalness:.04,clearcoat:.75,clearcoatRoughness:.1});
 const pink=new THREE.MeshStandardMaterial({color:0xf6d4e3,roughness:.7});
 const add=(geo,mat,x,y,z,parent=group)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);parent.add(o);return o};
 // Modern high-end healthcare pavilion: rounded glass towers, luminous dome, no pagoda roof.
 const silver=new THREE.MeshStandardMaterial({color:0xf8fcff,roughness:.32,metalness:.12});
 const champagne=new THREE.MeshPhysicalMaterial({color:0xffefc9,roughness:.13,metalness:.27,clearcoat:1,clearcoatRoughness:.055,emissive:0x000000,emissiveIntensity:0});
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
 const led=new THREE.MeshPhysicalMaterial({color:0xf3dfb2,metalness:.34,roughness:.27,clearcoat:.6});
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
 const bronze=new THREE.MeshPhysicalMaterial({color:0xffe8bb,metalness:.28,roughness:.16,clearcoat:1,clearcoatRoughness:.07,emissive:0x000000,emissiveIntensity:0});
 const coolGlass=new THREE.MeshPhysicalMaterial({color:0xb9ecf6,transparent:true,opacity:.86,roughness:.23,metalness:.04,clearcoat:.7,clearcoatRoughness:.09,depthWrite:false});
 const softLight=new THREE.MeshPhysicalMaterial({color:0xf2e5ca,metalness:.26,roughness:.28,clearcoat:.65});
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
 // v127 luxury upgrade: original dome, towers, entry, flower bed, emblem, and collisions preserved.
 // Non-emissive champagne metal with stable pale edge highlights (no glow or brown wash).
 const v127Gold=new THREE.MeshPhysicalMaterial({color:0xdac08a,metalness:.42,roughness:.23,clearcoat:.75,clearcoatRoughness:.15});
 const v127Bright=new THREE.MeshBasicMaterial({color:0xfff4d9});
 const v127Pearl=new THREE.MeshStandardMaterial({color:0xfffbf4,roughness:.38,metalness:.07});
 const v127Blue=new THREE.MeshStandardMaterial({color:0x2468c9,roughness:.57});
 const v127Ice=new THREE.MeshStandardMaterial({color:0x8bcff6,roughness:.52});
 const v127White=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.57});
 const v127Dark=new THREE.MeshStandardMaterial({color:0x135d74,roughness:.48});
 const v127Ring=(r,t,x,y,z,mat=v127Gold)=>{const m=add(new THREE.TorusGeometry(r,t,12,72),mat,x,y,z);m.rotation.x=Math.PI/2;return m;};
 // Dome: stronger metal meridians laid over existing glass; no dome replacement.
 for(let k=0;k<12;k++){
  const a=k*Math.PI/6,pts=[];
  for(let j=0;j<=24;j++){
   const t=j/24*Math.PI/2;
   pts.push(new THREE.Vector3(6.105*Math.sin(t)*Math.sin(a),11.75+6.105*Math.cos(t),-1.8+6.105*Math.sin(t)*Math.cos(a)));
  }
  group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),36,.104,8,false),v127Gold));
 }
 v127Ring(6.13,.135,0,11.76,-1.8);
 // Clear crown silhouette: five large metal petals, not tiny floral noise.
 add(new THREE.CylinderGeometry(.72,.88,.30,24),v127Gold,0,17.72,-1.8);
 for(let k=0;k<5;k++){
  const a=k*Math.PI*2/5;
  const petal=add(new THREE.ConeGeometry(.26,1.15,4),v127Gold,.47*Math.sin(a),18.25,-1.8+.47*Math.cos(a));
  petal.rotation.y=a;
 }
 add(new THREE.SphereGeometry(.19,12,10),v127Bright,0,18.85,-1.8);
 // Bold upper/lower rotunda collars and pearly pilasters: no new towers.
 for(const side of [-1,1]){
  const cx=side*9.15;
  v127Ring(3.28,.16,cx,10.52,-2.1);
  v127Ring(3.22,.11,cx,9.95,-2.1);
  v127Ring(3.14,.12,cx,.65,-2.1);
  for(const a of [0,.92,1.84,2.76,3.68,4.60,5.52]){
   const x=cx+3.08*Math.sin(a),z=-2.1+3.08*Math.cos(a);
   add(new THREE.CylinderGeometry(.115,.115,8.75,10),v127Pearl,x,5.15,z);
   add(new THREE.CylinderGeometry(.045,.045,8.4,8),v127Gold,x+.105,5.15,z+.03);
  }
 }
 // v128: remove the projecting arch entirely: it crossed the original round WEIYANG emblem in oblique views.
 // Preserve the existing emblem, its gold rim and the original doorway.
 // Add luxury only at the flanks, safely outside the emblem's projected silhouette.
 for(const side of [-1,1]){
  // Decorative facade panels are elevated, outside the walking corridor.
  add(new THREE.BoxGeometry(.28,4.55,.26),v127Pearl,side*3.55,3.20,4.59);
  add(new THREE.BoxGeometry(.095,4.34,.30),v127Gold,side*3.73,3.2,4.62);
  add(new THREE.BoxGeometry(.68,.21,.39),v127Gold,side*3.55,5.52,4.60);
 }
 // Two oversized, high-contrast cobalt/ice-blue flower urns to the SIDES of the entry.
 // No trees, bushes, tiny foliage clumps or additional center obstacles.
 for(const side of [-1,1]){
  const x=side*7.75,z=7.95; // v128: symmetrical front-of-building urns, away from bridge landing and central doorway
  add(new THREE.CylinderGeometry(.94,1.16,.24,28),v127Gold,x,.49,z);
  add(new THREE.CylinderGeometry(.51,.65,.49,28),v127Pearl,x,.80,z);
  add(new THREE.CylinderGeometry(1.43,.77,1.30,36),v127Pearl,x,1.53,z);
  v127Ring(1.43,.12,x,2.20,z);
  add(new THREE.SphereGeometry(1.13,20,12),v127Dark,x,2.38,z);
  for(let k=0;k<9;k++){
   const a=k*Math.PI*2/9,r=k%2?.82:1.02;
   const fx=x+r*Math.cos(a),fz=z+r*Math.sin(a);
   const flowerMat=k%3===0?v127Ice:k%3===1?v127Blue:v127White;
   for(let pet=0;pet<5;pet++){
    const pa=pet*Math.PI*2/5;
    add(new THREE.SphereGeometry(.27,12,10),flowerMat,fx+.23*Math.cos(pa),2.95+(k%2)*.24+.23*Math.sin(pa),fz+.12);
   }
   add(new THREE.SphereGeometry(.115,12,10),v127Gold,fx,2.95+(k%2)*.24,fz+.31);
  }
  add(new THREE.SphereGeometry(.57,14,10),v127Blue,x,3.40,z);
 }
 // v128: extra architectural depth WITHOUT light emission or any arch in front of the crest.
 // Broad polished dome-base collar, double stepped tower crowns and ivory-gold flank accents.
 v127Ring(6.23,.23,0,11.61,-1.8);
 v127Ring(6.23,.085,0,11.86,-1.8,v127Bright);
 for(const side of [-1,1]){
   const cx=side*9.15;
   v127Ring(3.34,.19,cx,10.86,-2.1);
   v127Ring(3.35,.075,cx,11.09,-2.1,v127Bright);
   add(new THREE.BoxGeometry(.45,4.7,.27),v127Pearl,side*5.05,4.2,4.47);
   add(new THREE.BoxGeometry(.13,4.48,.30),v127Gold,side*5.34,4.2,4.49);
 }
 // A rigid, premium green banner mounted at the dome apex, with the ACTUAL supplied logo texture.
 // Fixed flat flag: logo remains undistorted; double-sided for view changes.
 const flagPole=add(new THREE.CylinderGeometry(.075,.085,4.3,12),v127Gold,0,20.20,-1.8);
 add(new THREE.SphereGeometry(.20,12,10),v127Gold,0,22.40,-1.8);
 const flagFrame=add(new THREE.BoxGeometry(4.65,2.72,.09),v127Gold,2.35,21.08,-1.8);
 const flagField=add(new THREE.PlaneGeometry(4.35,2.42),new THREE.MeshBasicMaterial({color:0x087b66,side:THREE.DoubleSide}),2.35,21.08,-1.72);
 const flagLogo=add(new THREE.PlaneGeometry(2.18,2.18),new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('office-logo-transparent.png'),transparent:true,side:THREE.DoubleSide,depthWrite:false}),2.35,21.08,-1.65);
 flagPole.userData.decorative=true;flagFrame.userData.decorative=true;flagField.userData.decorative=true;flagLogo.userData.decorative=true;
 // Non-emissive metallic rim for the existing logo, preserving both logo image meshes.
 add(new THREE.TorusGeometry(2.05,.11,12,64),v127Gold,0,7.3,5.655);
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
  // v130: animated radiology scan displayed on the EXISTING X-ray panel.
  const wyXrayCanvas=document.createElement('canvas');wyXrayCanvas.width=384;wyXrayCanvas.height=320;
  const wyXrayCtx=wyXrayCanvas.getContext('2d');
  const wyXrayTex=new THREE.CanvasTexture(wyXrayCanvas);wyXrayTex.colorSpace=THREE.SRGBColorSpace;
  const wyXrayFace=add(new THREE.PlaneGeometry(1.58,1.35),new THREE.MeshBasicMaterial({map:wyXrayTex,side:THREE.DoubleSide,transparent:false}),-5,2.05,-6.025);
  register(wyXrayFace,'forensics');
  function wyDrawXray(t){
    const c=wyXrayCtx,w=384,h=320;c.fillStyle='#071a2b';c.fillRect(0,0,w,h);
    c.strokeStyle='rgba(75,159,190,.20)';c.lineWidth=1;
    for(let x=0;x<w;x+=24){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}
    for(let y=0;y<h;y+=24){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}
    c.save();c.shadowColor='#a8e9ff';c.shadowBlur=13;c.lineCap='round';
    for(const x of [138,245]){
      c.strokeStyle='rgba(190,235,250,.72)';c.lineWidth=21;c.beginPath();c.moveTo(x,42);c.lineTo(x+6,115);c.lineTo(x-5,165);c.stroke();
      c.strokeStyle='rgba(230,249,255,.92)';c.lineWidth=9;c.beginPath();c.moveTo(x,42);c.lineTo(x+6,115);c.lineTo(x-5,165);c.stroke();
      c.strokeStyle='rgba(195,235,255,.78)';c.lineWidth=10;c.beginPath();c.ellipse(x,173,29,18,0,0,Math.PI*2);c.stroke();
      c.strokeStyle='rgba(195,235,255,.75)';c.lineWidth=18;c.beginPath();c.moveTo(x,194);c.lineTo(x-5,280);c.stroke();
      c.strokeStyle='rgba(235,249,255,.94)';c.lineWidth=7;c.beginPath();c.moveTo(x,194);c.lineTo(x-5,280);c.stroke();
    }
    c.restore();
    const y=(t*.085)%(h+55)-27;const gradient=c.createLinearGradient(0,y-25,0,y+25);
    gradient.addColorStop(0,'rgba(40,218,255,0)');gradient.addColorStop(.5,'rgba(56,224,255,.27)');gradient.addColorStop(1,'rgba(40,218,255,0)');
    c.fillStyle=gradient;c.fillRect(0,y-25,w,50);c.strokeStyle='#5fe8ff';c.lineWidth=2;c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();
    c.fillStyle='#b4f1ff';c.font='bold 17px sans-serif';c.fillText('WEIYANG  X-RAY',14,22);
    c.font='12px sans-serif';c.fillText('醫療鑑定 · 法律探索',14,307);wyXrayTex.needsUpdate=true;
  }
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
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:false}));sprite.center.set(.5,.5);sprite.position.set(x,y,z);sprite.scale.set(4.35,1.02,1);sprite.renderOrder=80;sprite.userData.baseY=y;register(sprite,action);root.add(sprite);labels.push(sprite);
 }
 hint('💬 跟我聊聊',7.2,3.95,3.6,'staff');
 hint('📚 點我翻翻',-8.05,7.95,-6.90,'books');
 hint('❤️ 事件回放',8,6.70,-7.60,'ecg');
 hint('💬 趣味一問一答',7.1,2.8,6.5,'computer');
 hint('📋 醫療糾紛案例',-7.7,2.65,1.5,'case');
 
 
 hint('認識德威陽',0,8.10,-6.80,'logo');
 hint('🤝 糾紛協商',-4.65,2.25,4.45,'mediation');
 hint('📝 告知與時間軸',-9.35,2.6,5.3,'consent');
 hint('🔍 X光醫療鑑定',-9.3,3.5,-3.95,'forensics');
 
 
 hint('🗂️ 病歷證據探索',8.2,4.0,-3.8,'records');
 hint('⚖️ 責任分析',8.9,4.5,2.05,'liability');
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
   wyDrawXray(time);
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

  // v130: 150 dedicated medical interactions; original geometry and unrelated hotspots remain intact.
  const wyZoneData={"mediation":[["45萬元的和解","王先生膝關節手術後仍需復健，醫院否認疏失但提出45萬元和解。未來費用還不確定。","接受45萬元，一次解決","先談目前損失，保留後續協商空間","同意金額，但要求分期付款保障","想早點結束爭議可以理解，但最好先了解復健情況，別急著決定。","可以把已發生與可能新增的費用分開談，並寫清楚協商範圍。","付款方式也重要，應約定各期金額、日期及遲延處理。"],["和解書的那一句","醫院願意賠償，草案卻寫「放棄一切相關請求」。病患還在追蹤治療。","照原文簽署","要求限縮放棄範圍","先請律師看條款","簽署前要了解這句可能涵蓋哪些未來請求。","可以具體列出已解決事項，避免範圍含糊。","帶上病歷及草案一起評估，才能知道條款風險。"],["口頭答應的賠償","協商會上院方說願意負擔復健費，會後卻沒有書面紀錄。","先相信口頭承諾","寄信確認內容","等下次會議再談","口頭承諾日後容易有認知差異，付款條件仍宜確認。","把金額、期間和付款方式寫明，請對方回覆確認。","下次會議前可先整理雙方說法，避免重新談起。"],["醫院只願付醫療費","病患因治療爭議請假三個月，醫院只願補償醫療支出。","接受現有項目","提出薪資損失證明","要求一次提高總額","先確認接受是否代表其餘損害一併結清。","可整理請假、薪資及收入資料，具體說明損失。","總額仍須有計算依據，避免只剩立場拉鋸。"],["家屬與病患意見不同","病患想和解，家屬認為金額太低，雙方在會議前爭執。","由家屬主導","先確認病患意願","暫緩簽署","要先確認誰有權決定及簽署，家屬意見不能直接取代本人。","把本人重視的條件列出來，協商方向會更清楚。","尚未取得共識時先不要匆忙簽字。"],["分期付款的風險","醫院同意賠償80萬元，但希望分八期付清。","同意八期","要求逾期條款","改談一次付款","要確認每期日期與實際支付能力。","可約定逾期處理、剩餘款項及履約保障。","一次付款較單純，但仍要看對方能否接受及履行。"],["保密條款太廣","院方提出保密條款，連向其他醫師詢問後續治療都可能受限制。","照單全收","要求醫療例外","刪除整條","先辨認條款是否妨礙必要醫療、法律諮詢。","可明列就醫、依法申報及專業諮詢等必要例外。","可談刪除，但也應預想對方可能提出的替代條件。"],["醫院要求先撤告","雙方談妥金額，院方要求病患先撤回程序才付款。","先撤回","要求同步履行","先收款再撤回","先撤回可能減少後續談判保障，須確認程序效果。","可以協商付款與撤回的先後或同步安排。","先收款較有保障，但仍須以雙方可執行的條件寫清楚。"],["賠償包含看護嗎","患者出院後需家人照顧，院方認為沒有聘僱看護就不該列入。","不再主張","提出照護明細","折衷談固定金額","先確認實際照護需求與相關證明，不必只看有無聘人。","可整理照護期間、內容及必要性供協商參考。","折衷金額可以談，但須確認是否包含未來照護。"],["復健尚未結束","雙方快談妥，但醫師仍無法確定還要復健多久。","現在結案","先談已發生費用","等治療穩定再談","應先理解結案條款是否會涵蓋後續費用。","可區分確定與未確定損失，討論處理方式。","等待可能有助估算，但要留意權利期限。"],["調解時突然加碼","院方在會議中提出新條件，要求當天簽署。","當場接受","帶回審閱","請對方逐條說明","時間壓力下更要確認新條件是否改變原本約定。","可以要求合理審閱時間，不必當場決定。","逐條確認金額、付款及權利放棄範圍，留下紀錄。"],["只願意道歉","病患希望獲得補償，醫院願道歉卻不談費用。","接受道歉","分開談道歉與金額","要求書面說明","道歉可能有意義，但不等於其他爭議已解決。","可以分別列出希望取得的說明與實際損失。","書面說明有助釐清立場，內容仍須核實。"],["兩家醫院互推責任","病患先後在兩院治療，協商時雙方都說問題出在另一家。","只找第一家談","邀請兩家釐清","先整理轉診資料","單找一家可能漏掉關鍵診療環節。","可分別列出兩院處置及爭議，再評估共同協商可能。","整理轉診時間及資料，有助讓討論聚焦。"],["醫院提議折抵療程","院方不願退款，改提供等值的後續療程。","接受療程","改談現金退款","先確認療程風險","先看療程是否符合實際需要，不宜只比較標價。","可比較契約內容、未完成服務及退款依據。","如仍有醫療疑慮，先確認適切性再決定。"],["診所突然換負責人","談到一半診所換經營者，新窗口說先前承諾不算。","重新談起","拿出往來紀錄","直接要求簽約","要先確認原承諾主體及新窗口權限。","整理信件、訊息與會議紀錄，確認承諾內容。","簽約前要確認真正負擔義務的是誰。"],["保險公司加入協商","醫院說賠償要等責任保險審核，病患擔心拖太久。","等保險結果","要求處理時程","直接與醫院續談","保險審核與當事人權利並非完全相同，須留意期限。","可請對方提供預計回覆日期及聯絡窗口。","可持續釐清院方立場，不必把協商全交給保險公司。"],["和解金匯給誰","院方願付款，但家屬要求匯入自己的帳戶，病患並未明確同意。","照家屬要求","確認病患授權","改由病患收款","未確認受款權限，可能衍生付款爭議。","建議核對本人意思與授權文件。","由有權受領者收款較清楚，帳戶資訊仍須核實。"],["醫院只給總額","院方報出60萬元，卻不願說明包含哪些費用。","接受總額","要求列出項目","自行提出計算表","接受前應確認是否連精神慰撫金等項目都已結清。","列出各項損失與給付範圍，可減少後續爭議。","自行估算有助談判，但應附可查證的資料。"],["會議錄音爭議","雙方對上次協商內容各說各話，這次有人想全程錄音。","不錄音","事先討論紀錄方式","請第三方製作紀錄","不錄音也可要求書面紀錄及會後確認。","錄音涉及情境與法律風險，宜先釐清方式及告知問題。","第三方紀錄可降低歧見，仍應核對內容。"],["醫院要求刪文","院方願提高賠償，但要求病患刪除先前社群貼文。","同意刪文","確認具體範圍","拒絕綁定","先評估貼文內容與承諾的法律效果。","可以明確約定哪些內容及何時處理，避免無限擴張。","拒絕是談判選項，但要留意公開指控本身的風險。"],["協商只有十分鐘","院方安排很短的會議，病患擔心重要問題講不完。","先談金額","先談爭點","要求續會","直接談金額前宜先確認損害與付款範圍。","可預先列三項核心問題，讓會議有效率。","時間不足可請求續會並留下待確認事項。"],["醫院要病患自行估價","院方說「你們開個價」，家屬不知道怎麼算。","憑感覺開價","整理損失明細","先問對方方案","金額最好有支出及損害依據，避免失去協商焦點。","可分類醫療、照護、收入及其他損害，逐項估算。","詢問院方方案可以，但仍要掌握自己的損失資料。"],["院方只願給折價券","自費治療有爭議，診所只願提供下次療程折價。","接受折價","談部分退款","要求說明計算","折價券是否有實際用途，要看是否仍願意接受療程。","可依契約、已提供服務及爭議內容談退款。","先釐清折價金額與使用限制，避免名義補償落空。"],["和解書沒有付款日","雙方同意金額，草案卻只寫「儘速支付」。","先簽再說","補明確日期","要求付款證明","沒有明確期限容易產生履約爭議。","建議寫清付款日期、方式與遲延處理。","付款完成後保存憑證，仍不能替代事前條款。"],["跨縣市調解","病患住南部、醫院在北部，往返調解成本很高。","每次親自到場","詢問遠距可能","委託代理出席","親自參與可直接溝通，但須評估交通與身體負擔。","可向承辦單位確認是否有合法適用的遠距方式。","代理需確認程序規則及授權範圍。"],["院方臨時換代表","調解當天醫院代表說沒有決定賠償金額的權限。","照常談細節","要求確認授權","另約有權人到場","可以先釐清事實，但不宜把未授權承諾當成定案。","請對方確認授權範圍及內部核決流程。","另約會議有助提高效率，也要留意期限。"],["談妥後又反悔","雙方用訊息確認金額，院方隔天表示要重新評估。","直接認定已和解","保存訊息核對","再約一次確認","是否已成立協議須看雙方意思及條件是否確定。","完整保存訊息、附件及時間，方便評估法律效果。","可釐清尚未定案的是哪些條款，不必全部重談。"],["賠償附帶不再就醫","醫院願退款，卻要求病患不得再向院方要求後續診療資料。","接受條件","刪除資料限制","改談合理界線","先確認是否妨礙依法申請病歷及後續醫療需求。","可要求刪除不合理限制，保留合法資料權利。","協商界線時要把可執行範圍寫清楚。"],["調解費用誰出","雙方同意請專業人士協助，但對費用分攤沒有共識。","自己全部負擔","各付一半","請先確認費用","先衡量費用與爭議金額是否相稱。","平均分擔是選項，仍須雙方同意。","先確認費用項目、付款時間及誰負擔。"],["結案前最後確認","病患準備簽和解書，發現姓名、病歷日期與案件編號有錯。","先簽後改","要求修正再簽","拍照留下版本","重要資訊錯誤可能影響履行與爭議範圍。","建議核對當事人、日期、金額及條款後再簽。","保存版本有幫助，但仍要確保正式文本正確。"]],"records":[["消失的護理紀錄","王小姐術後半夜疼痛加劇，家屬說曾通知護理師，但病歷找不到當晚通報紀錄。","直接指控隱瞞","申請完整病歷核對","保存當晚通話訊息","紀錄缺漏不一定代表刻意隱瞞，先查清資料。","可核對護理、醫囑及處置紀錄，找出待釐清時段。","通話時間不等於談話內容，最好搭配其他資料比對。"],["兩份出院摘要不同","病患先後拿到兩份出院摘要，診斷文字不完全相同。","認定有人修改","核對製作日期","詢問更正原因","文字不同不必然不實，須先辨認版本及用途。","可確認製作人、日期與修訂紀錄。","提出具體差異，請院方說明原因並留存回覆。"],["檢驗報告晚了三天","檢驗日期是週一，病患週四才看到報告，懷疑通知延誤。","只看報告日期","查報告完成時間","保存通知紀錄","採檢日與報告完成日可能不同，不能混為一談。","可核對採檢、檢驗完成及醫師閱覽時間。","通知紀錄有助釐清院方何時、如何聯繫。"],["麻醉紀錄少一頁","病患申請病歷，麻醉紀錄頁碼從二跳到四。","直接說被抽頁","列出缺頁申請","比對其他副本","頁碼異常值得查證，但尚不能直接推定造假。","明確指出缺少頁碼與日期，要求確認完整性。","如有先前副本，可核對版本與內容差異。"],["醫囑與給藥時間不符","醫囑顯示晚上八點開立，護理紀錄卻記七點已給藥。","直接判定違規","核對時間來源","查相關交班紀錄","時間矛盾是線索，還要確認系統時間與紀錄方式。","可核對開立、執行及補登時間。","交班內容可協助釐清實際執行情況。"],["手術同意書不是同一版","病患保存的同意書與院方提供版本有不同段落。","公布兩份文件","請院方說明版本","保存原件掃描","公開前須注意個資與未查明的指控風險。","可詢問簽署時使用版本與變更歷程。","原件及完整掃描有助比對簽名、頁碼與內容。"],["影像光碟讀不開","醫院提供的影像光碟無法讀取，病患擔心資料遺失。","直接認定沒影像","要求可讀副本","保存光碟及收據","無法讀取可能是格式問題，先確認原因。","可要求醫院協助提供完整、可讀的影像資料。","保留原光碟與申請紀錄，方便追查交付情況。"],["病歷突然出現補記","爭議發生後，病歷多出一段補充說明，病患感到不安。","認定變造","核對補記標示","比較前後版本","補記不當然違法，須看時間、方式與真實性。","可確認補記者、補記時間及是否可追溯。","完整保存不同版本，具體標出差異。"],["護理紀錄只寫正常","家屬記得病患整晚喊痛，紀錄卻只有「狀況正常」。","直接指控不實","整理具體時間","找其他客觀資料","描述差異需要查證，先不要直接下結論。","可記下當時時段、在場者與通報經過。","醫囑、用藥及通訊資料可能協助交叉核對。"],["病歷申請範圍不清","病患只申請「病歷」，收到資料卻沒有檢查影像。","以為醫院隱匿","確認申請項目","補申請影像資料","先看原申請內容是否包含影像及其他附件。","可核對申請單與交付清單，確認範圍。","可依需求補申請影像、報告及相關紀錄。"],["醫院說資料已銷毀","十多年前的診療資料找不到，院方稱已依規定銷毀。","直接要求賠償","確認保存規範","尋找其他資料","資料不存在不必然等於院方有法律責任。","應依資料種類與年代確認適用保存義務。","其他醫院病歷、收據或個人保存文件可能補充事實。"],["轉診單與病歷不一致","轉診單寫「急需處理」，接收醫院紀錄卻寫「一般轉診」。","只信轉診單","核對兩院紀錄","確認交接方式","單一文件可能只反映部分情況，應整體核對。","可比對轉診原因、到院時間與實際處置。","交接通知方式及時間可能是重要線索。"],["收據日期對不上","收據顯示週五付款，病歷卻寫週四完成療程。","當成造假","確認付款與處置日","保存交易明細","付款日與治療日不一定相同，先釐清用途。","可核對就診、處置及結帳日期。","交易明細能輔助確認款項與療程對應。"],["病歷只有影本","院方交付影本，病患擔心法院不採信。","堅持拿正本","確認影本來源","保存申請證明","病歷複製本不必然不能作證據，須看真實性與爭點。","可確認是否為院方依法提供的完整複製本。","保存申請與交付紀錄，必要時可請法院調查原始資料。"],["家屬手機有錄音","家屬保存術後說明錄音，卻不知道是否能作為證據。","直接上網公開","保留原始檔","整理錄音時間","公開可能涉及隱私與名譽風險，先別急。","保留原檔、建立時間與參與者資訊，避免剪輯。","時間與情境有助理解內容，證據能力仍依個案判斷。"],["病歷寫錯過敏史","病患發現病歷把曾有的過敏史記成「無」。","自行改病歷","提出更正申請","保存既有版本","不要自行更動原始資料，以免影響證據完整性。","可提出具體更正理由及相關證明。","先保存原版本，再追蹤更正方式與紀錄。"],["檢查報告姓名相近","報告上的姓名與病患只差一個字，其他資訊也不完整。","直接當作自己的","核對識別資訊","向院方確認來源","姓名相近不足以確認資料歸屬。","可核對就診日期、病歷號等識別資料。","先確認是否誤附，避免使用他人的醫療資料。"],["手術紀錄時間過短","手術紀錄顯示一小時，家屬說病患進手術室三小時。","認定紀錄不實","區分各階段時間","調閱麻醉紀錄","進出手術室與實際手術時間可能不同。","可分別確認麻醉、手術開始及結束時間。","麻醉與恢復室紀錄可協助建立完整時間線。"],["醫院只提供摘要","病患要求完整資料，院方只寄來一頁摘要。","直接接受","補充具體申請","確認交付清單","摘要未必涵蓋全部診療過程。","可具體列明病歷、護理、醫囑、檢驗等項目。","核對實際交付項目與原申請內容。"],["LINE對話被刪","病患與診所客服的對話消失，只剩部分截圖。","重新編輯截圖","保留現有截圖","尋找備份與對方回覆","不要加工成看似完整的對話，會影響可信度。","保留原截圖及裝置資訊，標示缺漏。","可查備份或其他通知，補足時間脈絡。"],["醫囑是事後輸入","醫院系統顯示醫囑建立時間晚於實際處置。","直接認定倒填","詢問系統記錄方式","比對執行紀錄","電子系統時間不一定等於實際處置時間。","可確認輸入、簽核及修改時間的意義。","比對執行紀錄，才能評估是否有實質矛盾。"],["病歷有難懂縮寫","病患發現多個縮寫，網路搜尋得到不同解釋。","自行推斷","請醫療專業解釋","整理疑問清單","同一縮寫可能有不同意思，避免直接推論。","可向院方或專業人員確認原始語境。","逐項列出頁碼與問題，有利後續釐清。"],["影像報告與醫師說法不同","報告寫「待追蹤」，醫師當天卻說「不用擔心」。","認定醫師說謊","確認完整說明","核對後續追蹤","口語說明與報告文字可能層次不同，需查證。","可確認當時說明內容及建議的追蹤安排。","看是否有後續醫囑、回診通知與檢查紀錄。"],["病歷頁數忽多忽少","第一次申請120頁，第二次變成135頁。","直接主張增補造假","核對申請範圍","逐頁比對差異","頁數不同可能因申請範圍或新增資料造成。","先比較兩次申請項目與截至日期。","標示新增頁面與建立時間，必要時請院方說明。"],["急診分流顏色不一致","家屬記得急診被告知較緊急，病歷顯示另一分級。","憑記憶認定錯誤","確認分級時間","保存現場紀錄","分級可能隨病況變化，需先釐清時點。","可核對初評與複評的時間及依據。","當時通知或單據可協助還原流程。"],["電子病歷沒有簽名","病患拿到列印資料，發現部分頁面沒有手寫簽名。","認定無效","確認電子簽章","詢問院方格式","電子病歷不必然需要手寫簽名。","可確認系統簽章與可追溯紀錄。","先了解交付格式，再評估完整性問題。"],["檢查影像與報告分開","影像在光碟、報告在紙本，病患不知道怎麼對照。","只留報告","建立編號對照","交專業人員核對","只看報告可能漏掉重要背景資料。","可依日期、檢查部位與檢查編號建立對照。","影像判讀屬醫療專業，法律整理重在資料完整性。"],["診所改名後找不到病歷","病患回診索取資料，發現診所已改名換招牌。","放棄申請","確認原醫療機構","保留舊單據","改名不代表資料權利當然消失。","可確認登記主體與病歷保存、移轉情形。","舊收據、診斷書可協助確認就診機構。"],["家屬說法互相矛盾","兩位家屬對當晚通知護理站的次數記憶不同。","統一說詞","各自記錄記憶","核對客觀紀錄","不應刻意統一不確定的說法。","可各自記下確定與不確定部分，保留原貌。","比對通話、訊息與病歷，有助釐清差異。"],["病歷寄錯地址","院方將病歷寄到舊地址，病患擔心個資外洩。","直接公開指控","確認寄送與收件","要求處理說明","先查明是否真的由他人收受，避免未查證推論。","可確認寄件資料、物流與簽收紀錄。","要求院方說明處理及資料保護措施，保存回覆。"]],"forensics":[["鑑定說沒有疏失就一定輸嗎","陳先生術後行動受限，法院鑑定認為處置沒有明顯不當。陳先生以為官司已沒希望。","法院就一定判輸嗎","可以質疑鑑定嗎","法院必須照鑑定判嗎","不一定。鑑定重要，但法院仍須綜合其他證據。","可具體列出疑點或矛盾，請法院評估補充說明。","法院負責事實認定與法律判斷，並非機械照抄鑑定。"],["鑑定漏看一份報告","鑑定意見沒有提到術前關鍵檢查，當事人擔心結論失準。","直接否定全部","指出漏看資料","請求補充鑑定","漏看資料是否影響結論，需具體說明關聯。","可標明報告頁碼與鑑定問題，向法院提出。","可請法院評估補充鑑定必要性，並非當然重做。"],["兩次鑑定互相矛盾","同案兩份鑑定對診療是否符合常規有不同結論。","選有利的一份","比較理由與依據","請法院釐清矛盾","不能只看結論，還要看各自依據。","逐項比較資料、假設及推論，找出真正歧異。","可就矛盾處提出具體問題供法院調查。"],["鑑定只回答一半","法院問了三個問題，鑑定只回答其中兩個。","當作全案完成","列出未答問題","要求專家到庭","未回答部分可能影響證明程度，先確認其重要性。","可把未答事項與爭點連結，請法院處理。","專家到庭是否必要，須由法院依個案判斷。"],["鑑定使用錯誤日期","意見書把術後檢查寫成術前檢查。","忽略筆誤","指出日期錯置","主張結論全無效","日期錯置可能影響推論，不能一概當小錯。","可附原始資料指出錯誤及對結論的影響。","是否影響整份意見，仍要看錯誤的重要性。"],["鑑定結論寫「難以判斷」","報告沒有明確支持任何一方，病患不知道下一步。","當成醫院勝訴","尋找其他證據","釐清無法判斷原因","不確定結論不等於直接認定醫院無責。","可評估其他證據是否能補足爭點。","先看是資料不足還是專業上無法判定。"],["鑑定沒有談因果關係","報告說處置有疑點，卻沒有回答損害是否由該處置造成。","直接認定勝訴","區分過失與因果","請求補充問題","處置疑點不等於損害因果已證明。","可把注意義務與因果關係分別整理。","請法院評估是否需補充因果相關鑑定問題。"],["醫療指引版本不同","鑑定引用新指引，爭議治療卻發生在多年前。","直接說鑑定錯","核對當時標準","比較指引差異","新指引不必然不能參考，重點是適用性。","可提出當時可得的醫療資訊及指引。","說明版本差異是否真正影響結論。"],["鑑定只有一句結論","意見書只寫「符合醫療常規」，缺乏具體分析。","接受結論","請求說明理由","提出具體疑點","簡短結論仍要看是否足以回應爭點。","可請法院評估要求說明判斷依據。","列出未說明的處置與資料，避免空泛反對。"],["不同專科不同看法","外科與復健專業對後遺症成因有不同判斷。","只選熟悉醫師","確認鑑定專業範圍","要求跨科評估","應先看意見是否涵蓋真正爭點。","可核對鑑定者專長與受託問題。","必要時可請法院評估其他專業意見。"],["鑑定以病歷為前提","病患主張病歷漏記，鑑定卻完全依現有病歷推論。","否定所有鑑定","先釐清資料爭議","要求列明假設","資料基礎有爭議時，結論的適用範圍也需檢視。","可先提出具體缺漏與其他證據。","請法院釐清鑑定採用哪些前提及其限制。"],["鑑定說結果屬併發症","院方主張只要是併發症就沒有責任，病患感到困惑。","接受免責說法","看有無注意義務問題","請求釐清處置過程","併發症不當然排除法律責任。","仍須看告知、處置及後續照護等爭點。","可就特定診療決策提出補充問題。"],["鑑定意見引用不存在頁碼","意見書引用病歷第250頁，但卷內只有200頁。","認定故意造假","核對卷證版本","請求確認引用資料","頁碼錯誤須查明，不能直接推定故意。","可比對送鑑資料與法院卷宗版本。","請法院確認鑑定實際參考文件。"],["法院不採私人醫師意見","病患有另一位醫師的書面意見，但法院似乎較重視正式鑑定。","認定法院偏頗","說明私人意見依據","申請補充調查","不同意見證明力須看形成過程與內容。","可具體指出私人意見引用的客觀資料。","可請法院評估是否有必要進一步調查。"],["鑑定提到「可能」","報告寫損害「可能與處置有關」，當事人以為已證明因果。","直接主張已證明","看完整推論","補強其他證據","可能性與法律上因果認定並不完全相同。","須看報告對機率、替代原因與限制的說明。","可結合其他證據，由法院整體判斷。"],["鑑定超出委託問題","法院只問診療常規，鑑定卻寫「醫院無須賠償」。","照單接受","區分專業與法律結論","提出範圍異議","法律責任最終由法院判斷。","可指出哪些屬專業判斷、哪些屬法律評價。","具體說明超出委託事項的部分及影響。"],["鑑定費用太高","法院表示追加鑑定需預繳費用，病患擔心負擔。","直接放棄","詢問必要性與費用","評估替代調查","不做鑑定可能影響舉證，須先評估。","可確認預估費用、爭點及法院安排。","可與律師討論其他證據及程序選擇。"],["鑑定意見前後用語不同","同一份報告前段寫「不宜」，結論卻寫「尚屬合理」。","只引用有利句","核對全文脈絡","提出矛盾問題","片段引用容易失真，應看完整分析。","可比較兩段所指的不同處置與條件。","若確有矛盾，可請法院要求說明。"],["鑑定沒有說明替代方案","病患主張有其他治療選擇，鑑定只討論實際採用方式。","認定鑑定無效","提出具體替代方案","請法院補問","是否需要評估替代方案，取決於本案爭點。","可說明替代方案在當時是否可行及相關資料。","可請法院釐清替代方案與注意義務的關係。"],["鑑定資料送錯版本","送鑑時附上的是初稿病歷，正式版本另有補充。","自行寄給鑑定人","通知法院差異","先核對影響","私自送件可能不符程序，應循法院管道。","可提出版本差異並請法院處理。","先說明差異是否影響鑑定所據事實。"],["鑑定只看醫療結果","意見書大量描述病患後遺症，卻少談當時診療決策。","直接接受","要求分析當時資訊","分清損害與過失","後遺症存在不代表診療一定有過失。","可要求釐清當時資訊與醫療判斷依據。","把損害、注意義務與因果關係分開整理。"],["鑑定認為資料不足","鑑定機關表示缺少麻醉紀錄，無法完整回答。","放棄爭點","請法院調取資料","改問可回答的部分","資料不足不必然代表主張失敗。","可具體列出缺漏資料及保管機關。","可評估哪些問題仍能由現有資料回答。"],["鑑定只提一般風險","報告詳述手術常見風險，卻沒有回應病患的特定症狀。","認為已回答","指出個案差異","請求補充問題","一般風險說明不能直接取代個案分析。","可指出個案時間線與症狀特徵。","將未回答的具體問題整理供法院評估。"],["鑑定與證人說法衝突","鑑定依病歷認為有告知，證人卻說當時沒有說明。","只信證人","整理兩種證據","請法院釐清事實前提","證人記憶與病歷均須評估可信度。","可分別列出兩者所支持的具體事實。","先釐清告知事實，再評估鑑定前提。"],["醫院說鑑定是最後答案","院方在法庭外說鑑定結果已經決定勝負。","相信院方","確認法院程序","提出具體書面意見","院方說法不等於法院判決。","應依案件進度確認是否仍可提出意見。","可針對鑑定依據與未答事項提出具體問題。"],["鑑定人未看原始影像","意見書只引用影像報告，沒有說明是否檢視原始影像。","要求律師自己判片","確認鑑定資料","提出補充詢問","律師不應代替醫師判讀影像。","可確認送鑑資料是否包含原始影像。","可詢問原始影像對專業結論有無必要。"],["補充鑑定仍不明確","補充意見只是重述原結論，沒有回答當事人提出的矛盾。","不再追問","精簡爭點","評估其他證據","是否再追問要衡量必要性及程序成本。","可用簡短具體問題指出仍未釐清之處。","可評估其他證據是否足以支持主張。"],["鑑定採用不同病人資料","報告中的年齡與手術部位都與本案不符。","直接認定惡意","立即提出資料錯置","請法院確認送鑑流程","明顯不符值得立即釐清，但故意與否仍須查證。","可具體列出身分及資料錯誤。","請法院確認送鑑資料與鑑定意見的對應。"],["鑑定只回答醫師行為","病患主張護理交班也有問題，鑑定只討論主治醫師。","當成全案無責","區分各角色行為","請求補充交班問題","不同醫療人員的行為不能混為一談。","可整理各人員的職責、時間與爭點。","請法院評估交班問題是否需要專業說明。"],["法院準備辯論終結","鑑定有一處重要疑點，當事人擔心來不及提出。","等判決再說","儘速整理書面疑點","與律師確認程序","拖延可能失去適時提出的機會。","可立即標明爭點、頁碼與影響，循程序提出。","確認法院進度及可採取的程序行動。"]],"ecg":[["三年後才想提告","李小姐三年前手術，最近才懷疑當年處置有問題，擔心不能求償。","三年就一定過期嗎","從手術當天算嗎","申訴會暫停時效嗎","不一定，要看請求依據、知悉損害及責任人的時間。","不同請求權起算規定可能不同，先整理重要日期。","不能認定申訴必然停止時效，須另行確認期限。"],["調解還在進行","病患與醫院談了半年，擔心協商拖過求償期限。","繼續等醫院回覆","確認時效","改走正式程序","協商不當然讓期限停止，應注意風險。","可依請求權基礎與重要日期評估時效。","正式程序是否影響時效，須看種類與法定要件。"],["收到法院通知","病患收到法院要求補正資料的通知，卻不知道何時到期。","先擱著","確認送達日期","立即詢問承辦","忽略補正期限可能影響程序權益。","可核對送達、起算與通知載明的期間。","可確認補正事項及是否有合法展延可能。"],["醫院回信隔了兩個月","病患寄出申訴後，醫院兩個月才回覆，擔心權利受影響。","等下一封信","保留往來日期","先查法律期限","等待不一定讓權利期限延長。","保存寄送、收件與回覆日期，建立時序。","應分開確認申訴流程與求償時效。"],["事故日期記錯","病患起初把治療日期記成六月，病歷顯示其實是五月。","照原日期主張","修正時間線","查是否影響期限","日期錯誤可能影響時效及證據判斷。","以可核對文件修正，保留更正原因。","重要起算點須依法律依據重新評估。"],["先談判還是先調解","醫院願意私下談，病患也收到正式調解資訊。","只私下談","了解調解程序","兩邊都安排","私下談較彈性，但不應忽略法定期限。","可確認正式調解的程序及法律效果。","避免重複承諾，並分別記錄每個程序的進度。"],["知道損害的時間","病患術後多年才經其他醫師發現可能的永久傷害。","一律從手術日算","記下發現經過","立即認定未過期","起算不一定等於手術日，仍要看請求權。","可保留新診斷及何時知悉可能責任人的資料。","是否逾期不能單憑發現較晚就下結論。"],["寄存證信函","病患想用存證信函催醫院回覆，並以為寄出就永遠不會過期。","只寄函不追蹤","確認法律效果","另評估後續措施","存證信函不會讓權利無限期保留。","催告對時效的影響須看法定條件及後續行動。","可同步評估調解、訴訟等程序及期限。"],["調解日期延期","正式調解因颱風延期，病患擔心錯過其他程序期限。","認為全部順延","保存延期通知","查其他期限","單一會議延期不代表所有法定期限都延長。","保存機關通知及新的日期。","應分別核對各程序的期限與效果。"],["醫院換了聯絡人","協商中窗口換人，新的承辦說要重新等審核。","重新從頭等","要求確認進度","確認時效風險","窗口變動通常不會自動延長法律期限。","可要求書面確認已提交的資料與協商進度。","先確認可採取的權利保全措施。"],["收到調解不成立證明","雙方調解沒有共識，病患拿到證明卻不知道下一步。","把文件收起來","確認後續期限","整理爭點與證據","不成立後仍要注意後續救濟與時效。","應確認程序效果及有無應採取的下一步。","把未解決爭點整理，方便評估訴訟。"],["法院通知開庭改期","當事人收到改期通知，原先已請假的日期不適用了。","照舊日期到場","核對新通知","向法院確認","應以正式通知與最新程序資訊為準。","核對日期、時間、法庭與案號。","通知不清楚時可向承辦單位查詢。"],["補件只剩三天","病患接到補件通知，部分醫療資料還沒拿到。","等資料齊再說","先回覆現有資料","詢問展延可能","逾期可能產生程序效果，不能只等醫院。","可先依通知說明現有資料及缺漏情況。","是否可展延須依程序規定與法院決定。"],["談好金額卻遲未簽約","雙方口頭談妥，院方一個月都沒寄和解書。","認定已結案","確認是否成立協議","留意其他期限","口頭談妥不等於所有條件已確定。","可整理雙方確認內容及尚缺條款。","協議未明前仍應注意求償時效。"],["先申訴衛生局","病患已向衛生局申訴，以為之後不用管法院期限。","只等申訴結果","分開確認程序","保存申訴紀錄","行政申訴與民事求償並非同一程序。","應確認各自的期限及法律效果。","保存申訴日期與回覆，可供後續整理。"],["收到判決書","病患收到一審判決，想先休息幾週再決定是否上訴。","過一個月再看","立即確認上訴期限","請律師評估理由","上訴期間可能很短，延後處理有風險。","應依送達日及適用程序確認期間。","可及早評估判決理由與上訴可行性。"],["和解付款日已過","醫院約定月底付款，現在過了一週仍未入帳。","再無限期等待","保存催告紀錄","檢查違約條款","延遲付款應依協議條款評估，不宜一直放任。","可書面確認到期日及催告內容。","看是否約定遲延效果與可採取措施。"],["不同家屬收到不同日期","同案兩位家屬各收到法院文件，送達日期不相同。","用最晚日期","分別核對送達","請承辦確認","不同當事人的期間未必相同。","應分別記錄各自的送達日期與身分。","程序疑問可向法院確認，避免自行推定。"],["醫院口頭承諾延長期限","院方說「放心慢慢談，不會讓你過期」。","完全相信","要求書面確認","查法定期限","對方口頭說法不一定能改變法定時效。","書面紀錄有助證明溝通，但仍須確認法律效果。","應獨立核對時效與必要程序。"],["跨年才拿到病歷","病患十二月申請病歷，一月才收到，擔心求償期限。","以收到病歷日為準","整理申請與收件日","確認時效起算","收到病歷日不一定是法定起算點。","這些日期可作為知悉經過的參考資料。","須依請求權與具體事實確認期限。"],["案件移轉法院","原法院通知案件移到另一法院，當事人擔心要重新起訴。","自行再提一件","確認移送通知","保留原案文件","不宜未查明就重複起訴。","可確認案號、承辦法院及後續通知。","原先文件與送達資料仍應妥善保存。"],["調解申請尚未受理","病患寄出調解申請，但還沒收到受理通知。","認定已完成","查收件狀態","確認法律效果","寄出不必然代表已符合所有程序要件。","可保存寄件證明並查詢是否收件。","程序對時效的影響須依規定具體判斷。"],["對方要求先撤回申訴","醫院說撤回申訴才繼續協商，病患怕影響其他權利。","立即撤回","先查撤回效果","要求書面條件","撤回可能影響既有程序，先別匆忙。","可確認撤回是否可重提及對其他程序的影響。","將交換條件寫清楚，再評估是否接受。"],["時效快到了","病患發現可能只剩兩週，醫院卻說下個月才有空談。","等下個月","先確認法律期限","尋求緊急協助","協商安排不應取代期限管理。","應立即確認請求權、起算點及保全方式。","可儘速帶資料諮詢，評估可採取的程序。"],["醫院收到催告卻不回","病患已寄函要求處理，對方沒有回覆。","認定對方默認","保留送達證明","評估下一步","不回覆不等於承認責任。","送達與內容紀錄可能影響後續主張。","可依期限評估調解或訴訟，不必無限等待。"],["刑事與民事時間不同","家屬聽說刑事告訴期限與民事求償期限不同。","當成同一期限","分別確認規定","整理知悉時間","不同法律程序的期限不可混用。","可依具體罪名及請求權分別核對。","知悉人、事與損害的時間可能有不同意義。"],["調解紀錄少一頁","當事人收到調解紀錄，發現缺少最後一頁。","直接當作無效","立即請求補正","保存收到版本","文件缺頁要先確認是否影響正式紀錄。","可向承辦機關反映並索取完整版本。","保存原件與補正過程，以免日後爭議。"],["訴訟中又發生新費用","病患起訴後新增復健費，擔心無法再主張。","等判決再說","整理新增單據","確認追加程序","新增損害是否能主張，須看訴訟階段與規則。","可按日期保存費用及必要性證明。","及早與律師確認是否需要補充或變更聲明。"],["對方寄來律師函","醫院律師函要求七天內回覆，病患以為這就是法院期限。","把七天當法定期限","辨認文件性質","及早評估回覆","私人函件期限不必然等同法院法定期間。","先確認發文者、要求內容與是否另有程序。","可及早評估回覆策略及其他真正的法定期限。"],["判決確定後才發現收據","病患在判決確定後找到一張舊醫療收據，想重新主張。","直接重提同案","確認判決範圍","評估救濟可能","判決確定後通常有既判力等限制，不可逕行重訴。","可先核對原判決處理的請求及事實。","是否有特別救濟須依嚴格法定要件評估。"]],"computer":[["病歷怎麼在這裡","哈姆太郎","咦？這份病歷怎麼放在接待櫃檯？","夢奇奇飼養者","林律師明天要開庭啊！不然放這裡當裝飾嗎？"],["第一冊而已","夢奇奇飼養者","這次病歷怎麼這麼厚？","哈姆太郎","這只是第一冊，後面還有五冊等妳！"],["開庭資料","薪水掌門人","林律師，明天開庭資料都準備好了嗎？","林律師","準備好了，就差有人幫忙搬上車。"],["醫療鑑定","哈姆太郎","鑑定書怎麼看三遍還沒看完？","夢奇奇飼養者","因為你每次看到一半就去泡咖啡！"],["影印機加班","夢奇奇飼養者","影印機今天怎麼一直叫？","薪水掌門人","它印完這八本病歷，可能想申請職災。"],["資料夾顏色","哈姆太郎","為什麼病歷都分不同顏色？","夢奇奇飼養者","怕你把明天的案子帶成上週的！"],["律師的咖啡","夢奇奇飼養者","林律師，咖啡怎麼還沒喝？","林律師","病歷看到第六冊，咖啡已經進入冷藏模式。"],["診所回函","薪水掌門人","醫院的回函收到了嗎？","哈姆太郎","收到了，附件比正文還像一本小說。"],["病歷頁碼","哈姆太郎","第九頁後面怎麼是第十一頁？","夢奇奇飼養者","先別演推理劇，看看第十頁是不是黏在後面！"],["便利貼","夢奇奇飼養者","誰把整本病歷貼滿便利貼？","林律師","每一張都是明天要問的重點。"],["紙箱數量","薪水掌門人","這三箱是誰的快遞？","哈姆太郎","不是快遞，是明天開庭的病歷。"],["會議室預約","哈姆太郎","今天會議室又被誰訂走了？","夢奇奇飼養者","病歷、病歷，還有更多病歷。"],["掃描檔名","夢奇奇飼養者","誰把檔案命名成「最終版真的最終版」？","哈姆太郎","因為上一個最終版不是最終版啊！"],["診斷書","哈姆太郎","這張診斷書要放哪裡？","薪水掌門人","先放對案件，拜託不要再夾進午餐菜單。"],["影像光碟","夢奇奇飼養者","這一疊光碟要怎麼整理？","哈姆太郎","先別拿來當杯墊，林律師會看到。"],["調解通知","薪水掌門人","明天是開庭還是調解？","夢奇奇飼養者","看行事曆！不要靠你今天的直覺。"],["文件裝訂","哈姆太郎","訂書機怎麼又沒針了？","夢奇奇飼養者","因為你剛剛訂了一整本醫療百科。"],["病歷字跡","夢奇奇飼養者","這個字到底寫什麼？","林律師","先核對電子病歷，別用猜的辦案。"],["開庭鬧鐘","哈姆太郎","為什麼手機設了五個鬧鐘？","夢奇奇飼養者","怕你明天把開庭當成休假。"],["資料袋","薪水掌門人","這袋子怎麼這麼重？","哈姆太郎","裡面裝的是法律人的核心訓練。"],["筆記太多","夢奇奇飼養者","林律師，這些筆記都要帶嗎？","林律師","帶重點就好，其他留給書櫃加班。"],["收據分類","哈姆太郎","這些收據為什麼要按月份排？","薪水掌門人","因為你上次把去年和今年排成時光旅行。"],["案件編號","夢奇奇飼養者","你又把案件編號貼錯了？","哈姆太郎","我只是想測試大家的注意力！"],["醫院來電","哈姆太郎","醫院剛剛又打來了！","夢奇奇飼養者","先記下對方說什麼，不要只記得他聲音很好聽。"],["開庭西裝","薪水掌門人","林律師，西裝準備好了嗎？","林律師","準備好了，現在只差病歷不要比行李重。"],["掃描進度","夢奇奇飼養者","掃描到哪一頁了？","哈姆太郎","進度百分之九十九，剩下的百分之一有兩百頁。"],["印表機墨水","哈姆太郎","黑色墨水怎麼又沒了？","薪水掌門人","因為今天的醫療案件比你的人生規劃還長。"],["桌上三杯水","夢奇奇飼養者","接待桌怎麼有三杯水？","哈姆太郎","一杯給我，一杯給病歷，另一杯給影印機降溫。"],["午餐去哪了","薪水掌門人","誰把便當放在病歷旁邊？","哈姆太郎","我想一邊吃一邊研究，結果先研究了醬汁。"],["下班前一分鐘","哈姆太郎","現在可以下班了吧？","夢奇奇飼養者","林律師剛說：「明天開庭資料最後再核對一次。」"]]};
  const wyZoneIndex={mediation:0,records:0,forensics:0,ecg:0,computer:0};
  function wyZoneHome(action){
    const arr=wyZoneData[action];
    const i=action==="computer"?(wyZoneIndex[action]=(wyZoneIndex[action]+1+Math.floor(Math.random()*(arr.length-1)))%arr.length):wyZoneIndex[action]++%arr.length;
    const item=arr[i];
    const zoneNames={mediation:"🤝 醫療糾紛協商區",records:"🗂️ 病歷證據探索區",forensics:"🔍 X光醫療鑑定區",ecg:"❤️ 心電圖事件回放區",computer:"💬 接待櫃檯｜事務所今天又怎麼了？"};
    title.textContent=zoneNames[action]+"｜"+item[0];choices.replaceChildren();
    if(action==="computer"){
      body.textContent=item[1]+"：『"+item[2]+"』\n"+item[3]+"：『"+item[4]+"』";
      button("🎲 再聽一組趣味對話",()=>wyZoneHome(action));return;
    }
    body.textContent=item[1]+"\n\n如果遇到這種情況，你會怎麼選？";
    [2,3,4].forEach((n,j)=>button("ABC"[j]+"．"+item[n],()=>{
      body.textContent="你的選擇："+item[n]+"\n\n林律師怎麼看？\n"+item[5+j];
      choices.replaceChildren();button("↩ 看其他選擇",()=>wyZoneShowSame(action,item));
      button("🎲 下一個情境",()=>wyZoneHome(action));
    }));
    button("🎲 換一個情境",()=>wyZoneHome(action));
  }
  function wyZoneShowSame(action,item){
    const zoneNames={mediation:"🤝 醫療糾紛協商區",records:"🗂️ 病歷證據探索區",forensics:"🔍 X光醫療鑑定區",ecg:"❤️ 心電圖事件回放區"};
    title.textContent=zoneNames[action]+"｜"+item[0];body.textContent=item[1]+"\n\n如果遇到這種情況，你會怎麼選？";choices.replaceChildren();
    [2,3,4].forEach((n,j)=>button("ABC"[j]+"．"+item[n],()=>{body.textContent="你的選擇："+item[n]+"\n\n林律師怎麼看？\n"+item[5+j];choices.replaceChildren();button("↩ 看其他選擇",()=>wyZoneShowSame(action,item));button("🎲 下一個情境",()=>wyZoneHome(action));}));
    button("🎲 下一個情境",()=>wyZoneHome(action));
  }
 let current='staff';
 function button(label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.style.cssText='width:100%;text-align:left;background:#F0F3EC;border:1px solid #BAC9B9;border-radius:10px;padding:10px 12px;color:#28524D;font-weight:600;cursor:pointer';b.onclick=fn;choices.append(b);}
 function ecgHome(){title.textContent='❤️ 心電圖螢幕｜醫療法律互動';body.textContent='請選擇您的立場，進入不同的醫療爭議法律情境：';choices.replaceChildren();button('A．病患／家屬',()=>ecgRole('patient'));button('B．醫師／院方',()=>ecgRole('provider'));}
 function ecgRole(role){const t=ecgTree[role];title.textContent='❤️ '+t.title;body.textContent=t.intro;choices.replaceChildren();t.options.forEach((o,i)=>button(String.fromCharCode(65+i)+'．'+o.q,()=>ecgQuestion(role,i)));button('↩ 重新選擇身分',ecgHome);}
 function ecgQuestion(role,i){const t=ecgTree[role],o=t.options[i];title.textContent='❤️ '+t.title+'｜'+o.q;body.textContent=o.a;choices.replaceChildren();o.next.forEach((n,j)=>button(String.fromCharCode(65+j)+'．'+n[0],()=>{body.textContent=n[1];choices.replaceChildren();button('↩ 回到這個問題',()=>ecgQuestion(role,i));button('↩ 回到'+t.title+'選單',()=>ecgRole(role));button('✕ 繼續探索',()=>el.style.display='none')}));button('↩ 回到'+t.title+'選單',()=>ecgRole(role));}
 function home(){if(wyZoneData[current]){wyZoneHome(current);return;}if(current==='liability'){liabilityHome();return;}if(customMedical[current]){customHome(current);return;}if(current==='case'){storyChoose();return;}if(current==='books'){bookShow();return;}if(current==='evidence'){detectiveShow();return;}if(current==='computer'){deskHome();return;}if(current==='ecg'){ecgHome();return;}if(current==='contact'){title.textContent='☎ 聯絡我們｜德威陽國際法律事務所';body.textContent='請選擇聯絡方式：';choices.replaceChildren();[['LINE｜@wylaw','https://line.me/R/ti/p/@wylaw'],['官方網站','https://weiandyang.com'],['Facebook','https://www.facebook.com/weiandyang'],['Instagram','https://www.instagram.com/weiyang_ceo/']].forEach(([label,url])=>button(label,()=>window.open(url,'_blank','noopener,noreferrer')));button('複製 LINE ID：@wylaw',()=>{navigator.clipboard?.writeText('@wylaw');body.textContent='LINE ID：@wylaw';});return;}const s=scenes[current];title.textContent=s.icon+' '+s.name;body.textContent=s.intro;choices.replaceChildren();s.options.forEach((o,i)=>button(String.fromCharCode(65+i)+'．'+o[0],()=>answer(i,0)));}
 function answer(i,level){const s=scenes[current],o=s.options[i];body.textContent=o[level+1];choices.replaceChildren();if(level===0)button('✨ 再了解一點',()=>answer(i,1));button('↩ 換一個問題',home);button('✕ 繼續逛辦公室',()=>el.style.display='none');}
 return {show(){el.style.display='none'},open(action='staff'){current=(scenes[action]||customMedical[action]||action==='liability')?action:'staff';home();el.style.display='block'},hide(){el.style.display='none'}};
}
