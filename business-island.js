// WEIYANG v187 — corporate geometry safety rebuild, isolated to business island.
// Clean non-coplanar geometry, no nested overlapping facade shells.
export function createBusinessHeadquarters(island, THREE) {
  const root = new THREE.Group();
  root.name = 'WEIYANG_BUSINESS_V187_REBUILT';
  root.userData.islandType = 'business';
  root.userData.entryLabel = '企業商務島｜點擊大樓進入主題館';
  island.add(root);
  const basic = (c) => new THREE.MeshStandardMaterial({color:c,roughness:.42,metalness:.14,side:THREE.FrontSide});
  const ivory=basic(0xf5f0fb), lavender=basic(0xc4a9ef), violet=basic(0x5a3296), deep=basic(0x25133e), gold=new THREE.MeshStandardMaterial({color:0xe1ba75,metalness:.68,roughness:.24});
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
  cube(7.6,20.8,6.0,0,10.7,-4.8,deep);
  // Vertical window panels are proud of the front surface by 0.13 units; no shared planes.
  for(const x of [-2.55,-.85,.85,2.55]){
    cube(1.25,17.9,.12,x,11.15,-1.66,violet);
    cube(.12,18.7,.22,x+.69,11.15,-1.51,gold);
  }
  for(const y of [5.0,10.2,15.4,20.5])cube(7.8,.13,.28,0,y,-1.46,lavender);
  // Crown has clear vertical separation from tower roof.
  cube(8.6,.62,7.0,0,21.43,-4.8,ivory);
  cube(7.5,.26,6.3,0,21.91,-4.8,gold);
  // Architectural luminous crown rings: concentric but NOT coincident.
  const halo=add(new THREE.TorusGeometry(4.8,.26,12,72),ivory,0,25.9,-4.8);
  halo.rotation.x=.33;
  const inner=add(new THREE.TorusGeometry(3.94,.10,10,72),glow,0,26.18,-4.8);
  inner.rotation.x=.33;
  // Two freestanding curved towers: no underlying rectangular towers occupying the same space.
  for(const side of [-1,1]){
    const x=side*9.4;
    const body=cyl(2.75,3.10,12.6,40,x,7.1,-5.0,violet);
    body.scale.z=.82;
    // Gold accents stay entirely in front of the opaque tower, not intersecting the curved shell.
    for(const y of [3.2,6.8,10.4]){
      cube(4.2,.10,.10,x,y,-7.78,gold);
    }
    // No overlapping rib shells: purple and ivory material contrast is built into independent facade fins.
    for(const dx of [-1.55,1.55])cube(.13,10.0,.13,x+dx,7.2,-7.81,ivory);
    const roof=cyl(3.10,3.10,.35,40,x,13.65,-5.0,ivory);roof.scale.z=.85;
  }
  // Skybridges: slim separate elements with no embedded coplanar facades.
  for(const side of [-1,1]){
    const bridge=cube(5.1,.60,1.85,side*5.7,12.2,-5.0,ivory);
    cube(5.0,.12,1.96,side*5.7,12.61,-5.0,gold);
  }
  // Distinct low-rise entrance podium, entirely in front of tower footprint.
  cube(10.8,4.6,4.5,0,2.6,1.0,ivory);
  cube(8.4,3.6,.14,0,2.55,3.35,deep);
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
    cyl(1.05,1.05,.32,28,x,.65,8.5,gold);
    cyl(.82,.82,.10,28,x,.88,8.5,violet);
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
