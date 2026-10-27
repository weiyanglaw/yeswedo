// WEIYANG v98: true THREE-STOREY main castle, exterior only.
// Keep the original island, fountain, gardens, railings and indoor scenes untouched.
export function createNewFairytaleCastle(parent, THREE) {
 const root=new THREE.Group(); parent.add(root);
 const mat=(color,roughness=.42,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness,side:THREE.DoubleSide});
 const ivory=new THREE.MeshPhysicalMaterial({color:'#F7F4ED',metalness:.08,roughness:.23,clearcoat:.95,clearcoatRoughness:.10,side:THREE.DoubleSide});
 const white=new THREE.MeshPhysicalMaterial({color:'#FFFDF6',metalness:.07,roughness:.20,clearcoat:1,clearcoatRoughness:.09,side:THREE.DoubleSide});
 const navy=new THREE.MeshPhysicalMaterial({color:'#263D5B',metalness:.32,roughness:.17,clearcoat:1,clearcoatRoughness:.08,side:THREE.DoubleSide});
 const deep=new THREE.MeshPhysicalMaterial({color:'#172F52',metalness:.30,roughness:.18,clearcoat:1,clearcoatRoughness:.07,side:THREE.DoubleSide});
 const gold=new THREE.MeshPhysicalMaterial({color:'#F2D99B',metalness:.76,roughness:.13,clearcoat:1,clearcoatRoughness:.06,side:THREE.DoubleSide});
 const light=new THREE.MeshPhysicalMaterial({color:'#FFE8C7',metalness:.10,roughness:.20,clearcoat:.7,side:THREE.DoubleSide});
 const frame=new THREE.MeshPhysicalMaterial({color:'#EBD7B1',metalness:.45,roughness:.19,clearcoat:.85,side:THREE.DoubleSide});
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
 block(4.0,4.35,.24,0,3.05,2.83,gold);
 block(3.48,3.90,.25,0,3.02,3.02,deep);
 // v100: FLAT decorative arch line painted on the entrance facade, not a raised torus or 3D canopy.
 // Keep the entrance itself flush with the facade, without any stairs or extra objects.
 const flatArchPoints=[];
 for(let i=0;i<=48;i++){
   const a=Math.PI-(Math.PI*i/48);
   flatArchPoints.push(new THREE.Vector3(1.80*Math.cos(a),5.08+1.10*Math.sin(a),3.195));
 }
 const flatArch=new THREE.Line(new THREE.BufferGeometry().setFromPoints(flatArchPoints),
   new THREE.LineBasicMaterial({color:'#F2D99B',depthTest:false}));
 flatArch.renderOrder=10;root.add(flatArch);
 // A single planar wide band creates a clearly visible flat arch without any protruding geometry.
 const flatBand=new THREE.Mesh(new THREE.ShapeGeometry((()=>{
   const s=new THREE.Shape();
   s.moveTo(-2.00,5.08);
   for(let i=0;i<=48;i++){const a=Math.PI-(Math.PI*i/48);s.lineTo(2.00*Math.cos(a),5.08+1.28*Math.sin(a));}
   for(let i=48;i>=0;i--){const a=Math.PI-(Math.PI*i/48);s.lineTo(1.79*Math.cos(a),5.08+1.07*Math.sin(a));}
   s.closePath();return s;
 })()),new THREE.MeshBasicMaterial({color:'#F2D99B',side:THREE.DoubleSide,depthTest:false}));
 flatBand.position.z=3.195;flatBand.renderOrder=9;root.add(flatBand);
 block(.11,3.6,.08,0,2.94,3.21,gold);
 for(const x of [-.82,.82])block(1.34,.11,.10,x,3.15,3.23,gold);
 // Tall central brand facade on upper storeys.
 block(4.52,6.85,.25,0,9.98,2.87,deep);
 block(4.76,7.08,.17,0,9.98,2.72,gold);
 block(4.37,6.69,.20,0,9.98,2.92,deep);
 arch(0,13.33,3.04,2.16,.19,gold);
 // Original official brand logo asset, never a hand-drawn substitute.
 const logo=new THREE.Mesh(new THREE.PlaneGeometry(3.65,4.54),logoMaterial);
 logo.position.set(0,10.06,3.11);root.add(logo);
 // Warm, prominent illuminated upper bays; no tiny decorative ornaments.
 for(const x of [-4.5,4.5])block(2.1,.20,.44,x,top+.16,2.55,gold);
 return root;
}
