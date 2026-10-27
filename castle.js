// WEIYANG v98: true THREE-STOREY main castle, exterior only.
// Keep the original island, fountain, gardens, railings and indoor scenes untouched.
export function createNewFairytaleCastle(parent, THREE) {
 const root=new THREE.Group(); parent.add(root);
 const mat=(color,roughness=.42,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness,side:THREE.DoubleSide});
 const ivory=mat('#F7F4ED',.55), white=mat('#FFFDF6',.45), navy=mat('#263D5B',.34,.12);
 const deep=mat('#213B59',.38,.15), gold=new THREE.MeshPhysicalMaterial({color:'#DCC18A',metalness:.55,roughness:.24,clearcoat:.65});
 const light=mat('#FFE4B5',.24), frame=mat('#E7CFA4',.42);
 const block=(w,h,d,x,y,z,m)=>{let o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);root.add(o);return o};
 const cylinder=(rt,rb,h,x,y,z,m,n=32)=>{let o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,n),m);o.position.set(x,y,z);root.add(o);return o};
 const arch=(x,y,z,r,t,m)=>{let o=new THREE.Mesh(new THREE.TorusGeometry(r,t,10,36,Math.PI),m);o.position.set(x,y,z);root.add(o);return o};
 const roof=(x,z,r,baseY,height,flag=false)=>{let c=new THREE.Mesh(new THREE.ConeGeometry(r,height,36),navy);c.position.set(x,baseY+height/2,z);root.add(c);
 cylinder(r+.12,r+.12,.26,x,baseY,z,gold);
 cylinder(.09,.09,.4,x,baseY+height+.22,z,gold,12);
 if(flag){cylinder(.045,.045,1.65,x,baseY+height+1.0,z,gold,10);
 block(1.35,.90,.055,x+.68,baseY+height+1.35,z,deep);}
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
 // Four major ivory pillars across the full THREE floors, not micro-ornaments.
 for(const x of [-6.45,-2.38,2.38,6.45]){
  block(.46,story*3,.48,x,floorBottom+story*1.5,2.68,white);
  for(let i=0;i<=3;i++)block(.77,.29,.65,x,floorBottom+story*i+.12,2.70,gold);
 }
 // High-end entrance; same level paving and door location.
 block(4.0,4.35,.24,0,3.05,2.83,gold);
 block(3.48,3.90,.25,0,3.02,3.02,deep);
 arch(0,5.16,3.15,1.92,.25,white);
 arch(0,5.16,3.22,1.69,.14,gold);
 block(.11,3.6,.08,0,2.94,3.21,gold);
 for(const x of [-.82,.82])block(1.34,.11,.10,x,3.15,3.23,gold);
 // Tall central brand facade on upper storeys.
 block(4.52,6.85,.25,0,9.98,2.87,deep);
 block(4.76,7.08,.17,0,9.98,2.72,gold);
 block(4.37,6.69,.20,0,9.98,2.92,deep);
 arch(0,13.33,3.04,2.16,.19,gold);
 // Original official brand logo asset, never a hand-drawn substitute.
 const texture=new THREE.TextureLoader().load('official-logo.png');
 texture.colorSpace=THREE.SRGBColorSpace;
 const logo=new THREE.Mesh(new THREE.PlaneGeometry(3.15,3.15),
  new THREE.MeshBasicMaterial({map:texture,transparent:true,side:THREE.DoubleSide,depthWrite:false}));
 logo.position.set(0,10.25,3.10);root.add(logo);
 // Warm, prominent illuminated upper bays; no tiny decorative ornaments.
 for(const x of [-4.5,4.5])block(2.1,.20,.44,x,top+.16,2.55,gold);
 return root;
}
