// WEIYANG v98: true THREE-STOREY main castle, exterior only.
// Keep the original island, fountain, gardens, railings and indoor scenes untouched.
export function createNewFairytaleCastle(parent, THREE) {
 const root=new THREE.Group(); parent.add(root);
 const mat=(color,roughness=.42,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness,side:THREE.DoubleSide});
 const ivory=new THREE.MeshPhysicalMaterial({color:'#F7F4ED',metalness:.08,roughness:.23,clearcoat:.95,clearcoatRoughness:.10,side:THREE.DoubleSide});
 const white=new THREE.MeshPhysicalMaterial({color:'#FFFDF6',metalness:.07,roughness:.20,clearcoat:1,clearcoatRoughness:.09,side:THREE.DoubleSide});
 const navy=new THREE.MeshPhysicalMaterial({color:'#456989',metalness:.32,roughness:.17,clearcoat:1,clearcoatRoughness:.08,side:THREE.DoubleSide});
 const deep=new THREE.MeshPhysicalMaterial({color:'#345779',metalness:.30,roughness:.18,clearcoat:1,clearcoatRoughness:.07,side:THREE.DoubleSide});
 const gold=new THREE.MeshPhysicalMaterial({color:'#FFF4D8',metalness:.76,roughness:.13,clearcoat:1,clearcoatRoughness:.06,side:THREE.DoubleSide});
 const light=new THREE.MeshPhysicalMaterial({color:'#FFE8C7',metalness:.10,roughness:.20,clearcoat:.7,side:THREE.DoubleSide});
 const frame=new THREE.MeshPhysicalMaterial({color:'#F6EBDD',metalness:.45,roughness:.19,clearcoat:.85,side:THREE.DoubleSide});
 const leaf=mat('#648B66',.72);
 const flowerMaterials=['#F4A7C5','#F9C3D9','#F7D3E5','#FFF4F6','#DDB4E9'].map(c=>mat(c,.54));
 const block=(w,h,d,x,y,z,m)=>{let o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);root.add(o);return o};
 const cylinder=(rt,rb,h,x,y,z,m,n=32)=>{let o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,n),m);o.position.set(x,y,z);root.add(o);return o};
 const arch=(x,y,z,r,t,m)=>{let o=new THREE.Mesh(new THREE.TorusGeometry(r,t,10,36,Math.PI),m);o.position.set(x,y,z);root.add(o);return o};
 const officialLogoTexture=new THREE.TextureLoader().load('weiyang-logo-tight-v102.png');
 officialLogoTexture.colorSpace=THREE.SRGBColorSpace;
 const logoMaterial=new THREE.MeshBasicMaterial({map:officialLogoTexture,transparent:true,side:THREE.DoubleSide,depthWrite:false});
 const roof=(x,z,r,baseY,height,flag=false)=>{let c=new THREE.Mesh(new THREE.ConeGeometry(r,height,36),navy);c.position.set(x,baseY+height/2,z);root.add(c);
 cylinder(r+.12,r+.12,.26,x,baseY,z,gold);
 cylinder(.09,.09,.4,x,baseY+height+.22,z,gold,12);
 if(flag){
  // Large navy flags with the *original* official transparent logo, visible from island overview.
  cylinder(.065,.065,2.70,x,baseY+height+1.38,z,gold,10);
  block(2.95,1.92,.09,x+1.50,baseY+height+1.66,z,deep);
  const flagLogo=new THREE.Mesh(new THREE.PlaneGeometry(1.43,1.76),logoMaterial);
  flagLogo.position.set(x+1.50,baseY+height+1.66,z+.075);root.add(flagLogo);
 }
 };
 // Original footprint: 17.5 wide; raise only the actual facade to THREE floors.
 const floorBottom=.70, story=4.10, top=floorBottom+story*3;
 block(13.35,story*3,6.8,0,floorBottom+story*1.5,-1.05,ivory);
 // Left and right turret masses fit the same horizontal footprint.
 for(const x of [-7.1,7.1]){
  cylinder(1.66,1.70,story*3,x,floorBottom+story*1.5,-.65,ivory,40);
  for(let i=1;i<3;i++)cylinder(1.76,1.76,.21,x,floorBottom+story*i,-.65,gold,40);
  roof(x,-.65,2.06,top+.12,3.65,true);
 }
 // v103: two SMALL side pavilion towers, each within the existing island edge.
 // Outer extent about +/- 10.2 (main island radius 21); keep surrounding paths free.
 for(const x of [-9.15,9.15]){
  block(2.20,story*2.1,3.8,x,floorBottom+story*1.05,-.95,ivory);
  for(let floor=0;floor<2;floor++){
   const y=floorBottom+story*floor+story*.53;
   block(1.16,2.22,.18,x,y,1.01,frame);
   block(.92,1.98,.21,x,y,1.13,light);
   block(.11,1.98,.23,x,y,1.27,white);
   block(1.24,.18,.29,x,y-1.13,1.19,white);
  }
  block(2.55,.27,4.12,x,floorBottom+story*2.1,-.95,white);
  roof(x,-.95,1.67,floorBottom+story*2.1+.1,2.65,false);
 }
 // Central original tower raised, NOT counted as a storey.
 cylinder(2.15,2.20,4.0,0,top+2.0,-3.6,white,40);
 roof(0,-3.6,2.65,top+4.0,4.25,true);
 for(const x of [-4.35,4.35])roof(x,-2.95,2.18,top+.22,3.45,true);
 // Visible 1st, 2nd, 3rd storey horizontal divisions.
 for(let i=0;i<=3;i++){
   const y=floorBottom+i*story;
   block(13.9,.27,7.12,0,y,-1.05,i===0?white:gold);
   block(13.75,.36,.34,0,y,2.52,white);
 }
 // Large recognizable windows, three separate stacked rows.
 // Keep central ground-level entrance open/flat, with no steps.
 const window=(x,y,z,w=1.30,h=2.25)=>{
   block(w+.22,h+.20,.19,x,y,z,frame);
   block(w,h,.22,x,y,z+.12,light);
   arch(x,y+h/2,z+.20,w/2,.12,gold);
   block(.095,h,.23,x,y,z+.25,gold);
   block(w+.30,.13,.28,x,y-h/2-.13,z+.13,white);
 };
 for(let floor=0;floor<3;floor++){
  const cy=floorBottom+story*floor+story*.53;
  for(const x of [-5.45,-3.60,3.60,5.45])window(x,cy,2.51);
  // Taller turret windows also visibly repeat across three floors.
  for(const x of [-7.1,7.1])window(x,cy,-.65+1.69,.88,1.85);
 }
 // v100: LARGE flower boxes and bold pink-led blooms visible at normal mobile island distance.
 // No flowerpots beside the entrance, no lamps, no stairs, no plaza additions.
 const bloomGeometry=new THREE.SphereGeometry(.38,12,9);
 const leafGeometry=new THREE.SphereGeometry(.43,12,9);
 for(let floor=0;floor<3;floor++){
  const cy=floorBottom+story*floor+story*.53;
  for(const x of [-5.45,-3.60,3.60,5.45]){
   const fy=cy-1.34;
   block(2.10,.38,.72,x,fy,2.94,white);
   block(2.16,.16,.76,x,fy-.24,2.96,gold);
   for(let j=0;j<5;j++){
    const xx=x+(j-2)*.41;
    const foliage=new THREE.Mesh(leafGeometry,leaf);
    foliage.position.set(xx,fy+.40,3.16);root.add(foliage);
    const flower=new THREE.Mesh(bloomGeometry,flowerMaterials[(j+floor)%flowerMaterials.length]);
    flower.position.set(xx,fy+.66+(j%2)*.13,3.43);root.add(flower);
   }
  }
 }
 // Reflection needs both glossy materials and an actual large highlight.
 // Two broad, subtle surface highlights avoid tiny, unreadable ornaments.
 const shineMat=new THREE.MeshBasicMaterial({color:'#FFFFFF',transparent:true,opacity:.18,depthWrite:false,side:THREE.DoubleSide});
 for(const x of [-6.0,6.0]){
  const shine=new THREE.Mesh(new THREE.PlaneGeometry(.21,8.0),shineMat);
  shine.position.set(x,7.25,2.995);root.add(shine);
 }
 // Four major ivory pillars across the full THREE floors, not micro-ornaments.
 for(const x of [-6.45,-2.38,2.38,6.45]){
  block(.46,story*3,.48,x,floorBottom+story*1.5,2.68,white);
  for(let i=0;i<=3;i++)block(.77,.29,.65,x,floorBottom+story*i+.12,2.70,gold);
 }
 // High-end entrance; same level paving and door location.
 block(4.0,4.35,.24,0,3.05,2.83,white);
 block(3.48,3.90,.25,0,3.02,3.02,deep);
 // v103: four-panel royal blue double door; bold ivory frames, no suspended arch.
 const doorIvory=new THREE.MeshBasicMaterial({color:'#FFF9EF',side:THREE.DoubleSide});
 for(const x of [-.86,.86])for(const y of [2.18,3.84]){
  block(1.39,1.40,.10,x,y,3.20,doorIvory);
  block(1.13,1.13,.12,x,y,3.28,navy);
 }
 block(.13,3.82,.14,0,3.01,3.32,doorIvory);
 block(3.82,.18,.14,0,5.05,3.30,doorIvory);
 block(3.82,.18,.14,0,1.04,3.30,doorIvory);
 for(const x of [-.16,.16]){
  const knob=new THREE.Mesh(new THREE.SphereGeometry(.105,12,10),gold);
  knob.position.set(x,3.00,3.43);root.add(knob);
 }
 // Tall central brand facade on upper storeys.
 block(4.52,6.85,.25,0,9.98,2.87,deep);
 block(4.76,7.08,.17,0,9.98,2.72,gold);
 block(4.37,6.69,.20,0,9.98,2.92,deep);
 // v104: integrated pearl-white cornice. No suspended gold ring, no separate board.
 block(4.85,.43,.48,0,13.50,2.92,white);
 block(4.93,.14,.52,0,13.77,2.94,frame);
 // Broad leaf silhouettes, not clusters of green spheres; front-facing and opaque.
 const leafGreen=new THREE.MeshBasicMaterial({color:'#6EA477',side:THREE.DoubleSide});
 const leafDark=new THREE.MeshBasicMaterial({color:'#4B8061',side:THREE.DoubleSide});
 for(let i=0;i<7;i++){
  const x=(i-3)*.58, y=13.99+(.20-.065*Math.abs(i-3));
  const blade=new THREE.Mesh(new THREE.SphereGeometry(.30,10,8),i%2?leafGreen:leafDark);
  blade.scale.set(1.12,.42,.16);blade.rotation.z=(i-3)*-.12;
  blade.position.set(x,y,3.19);root.add(blade);
 }
 // v104: genuinely arched royal windows, with thick high-contrast outlines.
 // Flat arch silhouettes lie against facade; no transparent hole or fine mullions.
 const glassBlue=new THREE.MeshBasicMaterial({color:'#C9E3F0',side:THREE.DoubleSide});
 const archShape=(w,h,r)=>{
  const sh=new THREE.Shape();
  sh.moveTo(-w/2,0);sh.lineTo(w/2,0);sh.lineTo(w/2,h-r);
  sh.absarc(0,h-r,r,0,Math.PI,false);sh.lineTo(-w/2,0);
  return sh;
 };
 const archPanel=(x,y,z,w,h,m)=>{
  const o=new THREE.Mesh(new THREE.ShapeGeometry(archShape(w,h,w/2)),m);
  o.position.set(x,y,z);root.add(o);return o;
 };
 for(const x of [-4.55,4.55]){
   archPanel(x,6.86,3.18,2.48,5.46,white);
   archPanel(x,7.03,3.21,2.18,5.10,navy);
   archPanel(x,7.23,3.24,1.76,4.69,glassBlue);
   // Two thick, readable glazing divisions rather than dense hairline grids.
   block(.13,3.10,.09,x,9.07,3.28,white);
   block(1.72,.14,.09,x,9.25,3.28,white);
   block(2.65,.22,.35,x,6.82,3.20,white);
 }
 // Original official brand logo asset, never a hand-drawn substitute.
 const logo=new THREE.Mesh(new THREE.PlaneGeometry(3.65,4.54),logoMaterial);
 logo.position.set(0,10.06,3.11);root.add(logo);
 // Warm, prominent illuminated upper bays; no tiny decorative ornaments.
 for(const x of [-4.5,4.5])block(2.1,.20,.44,x,top+.16,2.55,gold);
 return root;
}
