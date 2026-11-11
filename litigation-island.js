// WEIYANG litigation island v424 — monumental orange/ivory courthouse.
// Native geometry, level entrance, no front stairs, ramps, roof domes, or signboard.
export function createLitigationCourthouse(parent,T){
 const root=new T.Group();root.name='WEIYANG_LITIGATION_V424';root.userData.island='litigation';parent.add(root);
 const mat=(c,metal=0)=>new T.MeshStandardMaterial({color:c,roughness:metal?.42:.79,metalness:metal});
 const ivory=mat('#fff8eb'),white=mat('#fffdf5'),sand=mat('#f5d9b7'),light=mat('#f4b77f'),orange=mat('#db854d'),terracotta=mat('#c66c42'),recess=mat('#a66d52'),blue=mat('#83b5c0'),bronze=mat('#d7a77d',.25);
 const add=(geo,m,x,y,z,p=root)=>{let o=new T.Mesh(geo,m);o.position.set(x,y,z);p.add(o);return o};
 const box=(w,h,d,x,y,z,m,p)=>add(new T.BoxGeometry(w,h,d),m,x,y,z,p);
 const cyl=(r1,r2,h,n,x,y,z,m,p)=>add(new T.CylinderGeometry(r1,r2,h,n),m,x,y,z,p);
 // Stepped-in-depth, NOT stepped-in-height, monumental main mass.
 box(15.8,12.8,8.2,0,6.4,-3.2,sand);
 box(17.2,.7,9.1,0,12.65,-3.2,terracotta);
 box(17.8,.36,9.4,0,13.13,-3.2,ivory);
 box(16.2,.85,8.6,0,13.73,-3.2,orange);
 box(15.4,.28,8.7,0,14.3,-3.2,white);
 // Deep recessed portico, extra wide, tall uninterrupted classical columns.
 box(14.8,10.7,.4,0,5.4,1.0,recess);
 box(14.1,10.6,.24,0,5.35,1.24,sand);
 box(7.1,9.15,.2,0,4.58,1.47,recess);
 box(6.5,8.75,.12,0,4.38,1.60,blue);
 box(.13,8.7,.18,0,4.35,1.75,ivory);
 // One-piece arched entrance surround, no horizontal crossbar.
 const arc=new T.Mesh(new T.TorusGeometry(3.23,.33,10,40,Math.PI),ivory);arc.position.set(0,8.67,1.8);root.add(arc);
 for(const x of [-7.0,-4.8,4.8,7.0]){
   cyl(.48,.56,10.45,20,x,5.37,3.35,white);
   cyl(.65,.65,.24,20,x,.16,3.35,ivory);
   box(1.5,.45,1.5,x,10.82,3.35,ivory);
   box(1.76,.28,1.66,x,11.18,3.35,bronze);
   // large vertical column flutes (sparse enough for mobile)
   for(const dx of [-.24,.24])box(.055,8.9,.05,x+dx,5.25,3.79,sand);
 }
 // Top of colonnade only, no mid-height beam.
 box(18.4,.75,5.1,0,11.74,2.55,orange);
 box(19.0,.3,5.5,0,12.22,2.55,white);
 box(18.1,.4,5.2,0,12.6,2.55,terracotta);
 // Ornate high parapet: broad shapes, not fragile spires.
 for(const x of [-7.8,-5.5,5.5,7.8]){
   box(1.65,1.25,1.2,x,13.35,2.25,ivory);
   box(1.95,.18,1.4,x,14.06,2.25,orange);
 }
 // Side wings curve toward visitor with 3 large volumes each, forming a horseshoe courtyard.
 for(const side of [-1,1]){
  const wing=new T.Group();wing.position.set(side*8.7,0,-2.6);wing.rotation.y=side*.25;root.add(wing);
  for(let k=0;k<3;k++){
    const xx=side*(1.7+k*2.85),zz=k*1.5,hh=10.8-k*.5;
    box(3.25,hh,6.5,xx,hh/2,zz,k===2?light:sand,wing);
    box(3.5,.65,7.0,xx,hh+.18,zz,orange,wing);
    box(3.65,.23,7.15,xx,hh+.64,zz,white,wing);
    box(3.1,.28,6.6,xx,.16,zz,terracotta,wing);
    // Double-height arcade, upper relief and broad arched glazing.
    const front=zz+3.34;
    box(2.18,5.6,.12,xx,4.4,front,recess,wing);
    box(1.8,5.25,.16,xx,4.25,front+.12,blue,wing);
    const wa=new T.Mesh(new T.TorusGeometry(.91,.16,8,24,Math.PI),ivory);
    wa.position.set(xx,7.03,front+.22);wing.add(wa);
    box(.23,5.1,.34,xx-1.02,4.25,front+.25,ivory,wing);
    box(.23,5.1,.34,xx+1.02,4.25,front+.25,ivory,wing);
    box(2.1,.55,.3,xx,9.0,front+.22,ivory,wing);
    box(2.45,.19,.35,xx,9.45,front+.25,bronze,wing);
  }
  // Rounded corner pavilion, a true large curved volume, not a tower or dome.
  const pavilion=cyl(3.25,3.25,10.6,32,side*9.85,5.3,5.2,light);
  pavilion.scale.set(.75,1,.75);
  cyl(2.65,2.65,.65,32,side*9.85,10.9,5.2,orange);
  cyl(2.82,2.82,.25,32,side*9.85,11.35,5.2,ivory);
  for(const angle of [-.55,0,.55]){
    const x=side*9.85+Math.sin(angle)*2.34,z=5.2+Math.cos(angle)*2.34;
    box(.8,5.2,.25,x,4.1,z,blue);
    box(1.05,.3,.4,x,7.1,z,ivory);
  }
 }
 // Imperial carved architectural detailing: substantial stone relief, not layered box roofs.
 const carving=mat('#f9e5c8'),shadow=mat('#b46f4b'),antique=mat('#d2a66d',.22);
 // Tall pilaster ribs and recessed upper-storey window bays.
 for(const x of [-7.75,-6.2,6.2,7.75]){
   box(.24,8.8,.48,x,6.0,1.73,ivory);
   box(.55,.45,.7,x,10.58,1.76,carving);
 }
 for(const x of [-6.0,-3.9,3.9,6.0]){
   box(1.12,1.42,.12,x,9.34,1.53,shadow);
   box(.92,1.22,.14,x,9.34,1.65,carving);
   box(1.34,.18,.42,x,10.18,1.77,antique);
 }
 // Broad sculpted frieze with inset classical rosettes and gilded trim.
 box(17.8,.16,.3,0,11.43,5.16,antique);
 for(const x of [-7.0,-5.25,-3.5,-1.75,0,1.75,3.5,5.25,7.0]){
   const rose=cyl(.31,.31,.12,12,x,12.65,5.22,carving);
   rose.rotation.x=Math.PI/2;
   const center=cyl(.12,.12,.14,12,x,12.65,5.32,antique);center.rotation.x=Math.PI/2;
 }
 // Oversized central crest, flanked by recessed stone ornament.
 const crest=new T.Mesh(new T.SphereGeometry(1.08,20,12),carving);
 crest.scale.set(1.2,.72,.22);crest.position.set(0,13.62,5.19);root.add(crest);
 const crestInset=new T.Mesh(new T.TorusGeometry(.56,.085,8,28),antique);
 crestInset.position.set(0,13.62,5.44);root.add(crestInset);
 for(const side of [-1,1]){
   // Deep paired reliefs give the facade a ceremonial stonework rhythm.
   for(const x of [side*2.8,side*4.7,side*6.65]){
     box(.18,1.45,.28,x,13.65,1.28,carving);
     box(.65,.14,.4,x,14.47,1.28,antique);
   }
   // Curved pavilion parapet with continuous metallic molding.
   const rim=new T.Mesh(new T.TorusGeometry(2.22,.14,10,48),antique);
   rim.rotation.x=Math.PI/2;rim.position.set(side*9.85,11.5,5.2);root.add(rim);
 }
 // Wide, entirely flat courtyard: flush level, no slope, no staircase.
 cyl(15.7,15.7,.12,64,0,.065,10.5,ivory);
 cyl(12.7,12.7,.018,64,0,.135,10.5,sand);
 // Oversized court entrance framing and shallow relief decoration.
 for(const side of [-1,1]){
  box(.9,3.1,.75,side*8.65,10.0,2.25,ivory);
  box(1.4,.35,1.05,side*8.65,11.73,2.25,orange);
 }
 // Scale every existing court component together, including the side wings and ornament.
 // Courthouse footprint grows to 90%; the litigation island platform is enlarged to radius 27 to keep all components inside.
 // Preserve the original 17-unit island radius. Fit the entire courthouse footprint
 // (including the forward ceremonial courtyard) within its unchanged perimeter.
 root.updateMatrixWorld(true);
 const footprint=new T.Box3().setFromObject(root);
 const footprintCorners=[
  [footprint.min.x,footprint.min.z],[footprint.min.x,footprint.max.z],
  [footprint.max.x,footprint.min.z],[footprint.max.x,footprint.max.z]
 ];
 const maximumRadius=Math.max(...footprintCorners.map(([x,z])=>Math.hypot(x,z)));
 const safeRadius=16.25; // margin inside the original radius-17 island
 root.scale.setScalar(Math.min(.90,safeRadius/maximumRadius));
 // Orange ceremonial flag above central roof, with the unchanged original WEIYANG artwork.
 // Flag is in parent island coordinates, not scaled with the courthouse.
 const banner=new T.Group();banner.name='WEIYANG_LITIGATION_FLAG';parent.add(banner);
 const pole=new T.Mesh(new T.CylinderGeometry(.12,.12,12.0,12),new T.MeshStandardMaterial({color:'#d8b36c',metalness:.55,roughness:.32}));
 pole.position.set(0,18.0,-2.0);banner.add(pole);
 const cloth=new T.Mesh(new T.PlaneGeometry(6.4,4.2),new T.MeshStandardMaterial({color:'#D94F32',side:T.DoubleSide,roughness:.82}));
 cloth.position.set(3.3,21.65,-2.0);banner.add(cloth);
 const logoTexture=new T.TextureLoader().load('office-logo-transparent.png');
 logoTexture.colorSpace=T.SRGBColorSpace;
 const logo=new T.Mesh(new T.PlaneGeometry(3.4,3.4),new T.MeshBasicMaterial({map:logoTexture,transparent:true,side:T.DoubleSide,depthWrite:false}));
 logo.position.set(3.3,21.65,-1.97);banner.add(logo);
 return root;
}
