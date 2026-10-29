// WEIYANG v192 — enterprise island facade, crystal crown, curved side towers, flat entrance.
// Clean non-coplanar geometry, no nested overlapping facade shells.
export function createBusinessHeadquarters(island, THREE) {
  const root = new THREE.Group();
  root.name = 'WEIYANG_BUSINESS_V192_CROWN';
  root.userData.islandType = 'business';
  root.userData.entryLabel = '企業商務島｜點擊大樓進入主題館';
  island.add(root);
  const basic = (c) => new THREE.MeshStandardMaterial({color:c,roughness:.42,metalness:.14,side:THREE.FrontSide});
  const ivory=basic(0xf5f0fb), lavender=basic(0xcfc1e8), violet=basic(0x8066ad), deep=basic(0x544477), silver=basic(0xdadce7), pearl=basic(0xeeeaf5), mist=basic(0xaaa2c5), gold=new THREE.MeshStandardMaterial({color:0xe1ba75,metalness:.68,roughness:.24});
  const glow=new THREE.MeshBasicMaterial({color:0xc9a3ff});
  const green=basic(0x638b76), trunk=basic(0x786451);
  const add=(geom,material,x,y,z,parent=root)=>{const mesh=new THREE.Mesh(geom,material);mesh.position.set(x,y,z);parent.add(mesh);return mesh;};
  const cube=(w,h,d,x,y,z,material,parent=root)=>add(new THREE.BoxGeometry(w,h,d),material,x,y,z,parent);
  const cyl=(rt,rb,h,r,x,y,z,material,parent=root)=>add(new THREE.CylinderGeometry(rt,rb,h,r),material,x,y,z,parent);
  const tube=(coords,r,material,closed=false)=>{
    const path=new THREE.CatmullRomCurve3(coords.map(p=>new THREE.Vector3(...p)),closed);
    return add(new THREE.TubeGeometry(path,Math.max(28,coords.length*14),r,8,closed),material,0,0,0);
  };
  // Single ground plane, no stacked plaza slabs or coplanar surfaces.
  cube(28.6,.20,22.0,0,.20,0,ivory);
  // Landmark central tower: a single structural body, with facade pieces placed outside its envelope.
  cube(7.6,20.8,6.0,0,10.7,-4.8,silver);
  // Vertical window panels are proud of the front surface by 0.13 units; no shared planes.
  for(const x of [-2.55,-.85,.85,2.55]){
    cube(1.25,17.9,.12,x,11.15,-1.66,x<0?violet:mist);
    cube(.12,18.7,.22,x+.69,11.15,-1.51,gold);
  }
  // No repeated floor-by-floor horizontal facade strips: preserve vertical zoning.
  // Crown has clear vertical separation from tower roof.
  cube(8.6,.62,7.0,0,21.43,-4.8,ivory);
  cube(7.5,.26,6.3,0,21.91,-4.8,gold);
  // Faceted violet crystal spire and substantial sculptural golden crown.
  // Distinct surfaces avoid coincident faces and the spire reads clearly on phones.
  const spire=cyl(0,1.95,5.65,6,0,2.86,0,crystal,crownGroup);
  spire.rotation.y=Math.PI/6;
  const crownGold=new THREE.MeshStandardMaterial({color:0xf0c780,metalness:.73,roughness:.22});
  for(let k=0;k<8;k++){
    const a=k*Math.PI/4, r=2.8;
    const fin=new THREE.Group();fin.position.set(Math.sin(a)*r,.28,Math.cos(a)*r);fin.rotation.y=a;crownGroup.add(fin);
    const blade=cube(.72,4.05,.54,0,2.04,0,crownGold,fin);
    blade.rotation.z=-.23;
    const tip=cyl(0,.53,1.45,4,-.39,4.63,0,crownGold,fin);
    tip.rotation.y=Math.PI/4;
  }
  cyl(3.2,3.2,.56,8,0,.29,0,crownGold,crownGroup);
  cyl(2.55,2.95,.34,8,0,.67,0,ivory,crownGroup);
  // Twin elliptic curved wings: real rounded glass facades, framed vertically in gold.
  // Front glazing and gold fins stand ahead of the solid side tower to prevent flicker.
  for(const side of [-1,1]){
    const x=side*9.55, z=-4.9;
    const body=cyl(2.65,3.05,13.3,48,x,7.4,z,deep);
    body.scale.z=.87;
    // Translucent-tinted vertical facade bays around the outward-facing curved wall.
    for(let k=0;k<=12;k++){
      const theta=(-.84+k*1.68/12);
      const px=x+3.12*Math.sin(theta), pz=z+2.75*Math.cos(theta);
      const bay=cube(.69,10.9,.13,px,7.4,pz,k%3===0?violet:lavender);
      bay.rotation.y=theta;
      if(k%2===0){
        const rib=cube(.115,11.25,.18,px+.38*Math.cos(theta),7.4,pz-.38*Math.sin(theta),gold);
        rib.rotation.y=theta;
      }
    }
    const crownRoof=cyl(3.22,3.22,.40,48,x,14.35,z,ivory);crownRoof.scale.z=.90;
    const terrace=cyl(2.88,2.88,.17,48,x,14.66,z,green);terrace.scale.z=.86;
    const rail=cyl(3.12,3.12,.13,48,x,14.90,z,gold);rail.scale.z=.88;
    // Roof gardens and planted terraces, with distinct silhouettes.
    for(const dx of [-1.35,1.35]){
      cyl(.20,.27,.62,8,x+dx,15.18,z,trunk);
      add(new THREE.IcosahedronGeometry(.66,1),green,x+dx,15.76,z);
    }
    // Gold side cornice makes the wings read as architecturally connected.
    const edge=cube(.25,12.5,.25,x+side*2.90,7.35,z,gold);
  }
  // Skybridges: slim separate elements with no embedded coplanar facades.
  for(const side of [-1,1]){
    const bridge=cube(5.1,.60,1.85,side*5.7,12.2,-5.0,ivory);
    cube(5.0,.12,1.96,side*5.7,12.61,-5.0,gold);
  }
  // Distinct low-rise entrance podium, entirely in front of tower footprint.
  cube(10.8,4.6,4.5,0,2.6,1.0,ivory);
  cube(8.4,3.6,.14,0,2.55,3.35,mist);
  // Purple entry portal, with separate door panels and no overlaid parallel planes.
  for(const side of [-1,1]){
    cube(2.15,3.05,.15,side*1.17,2.35,3.50,violet);
    cube(.075,2.6,.11,side*.16,2.35,3.64,gold);
  }
  cube(10.95,.28,4.8,0,5.05,1.0,gold);
  // Entrance canopy / sculptural arch in front of the doors.
  tube([[-5.1,4.8,4.4],[-3.8,6.1,4.4],[0,6.8,4.4],[3.8,6.1,4.4],[5.1,4.8,4.4]],.20,ivory);
  tube([[-4.8,4.75,4.53],[-3.5,5.9,4.53],[0,6.55,4.53],[3.5,5.9,4.53],[4.8,4.75,4.53]],.07,gold);
  // High-contrast luxury violet promenade, no overlapping floor layers.
  for(const x of [-5.7,5.7]){
    cube(2.9,.26,3.5,x,.44,8.5,lavender);
    cyl(1.05,1.05,.20,28,x,.58,8.5,gold);
    cyl(.82,.82,.08,28,x,.72,8.5,green);
    for(const dx of [-.42,.42])add(new THREE.IcosahedronGeometry(.37,1),green,x+dx,1.08,8.5);
  }
  // No intersecting ribbon meshes on the tower corners: keep a clean futuristic silhouette.
  // Official supplied logo, untouched original texture, mounted on its own freestanding sign.
  cube(5.4,4.1,.22,0,9.0,4.5,deep);
  const texture=new THREE.TextureLoader().load('office-logo-transparent.png?v=20261029-v187');
  texture.colorSpace=THREE.SRGBColorSpace;
  const logo=add(new THREE.PlaneGeometry(3.35,3.35),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,side:THREE.FrontSide}),0,9.05,4.625);
  // Trees are separate, clean low-poly shapes.
  for(const [x,z] of [[-12.4,4.5],[12.4,4.5],[-12.2,10.1],[12.2,10.1]]){
    cyl(.23,.32,1.7,8,x,1.17,z,trunk);
    add(new THREE.IcosahedronGeometry(1.32,1),green,x,2.7,z);
  }
  return root;
}
