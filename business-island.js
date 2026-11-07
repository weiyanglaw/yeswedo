// WEIYANG business island v355 — Manhattan-inspired compact skyline, opaque static facades.
// Independent island module. No animated lights, coplanar glazing, transparent glass or dense window grids.
export function createBusinessHeadquarters(island, THREE) {
  const root = new THREE.Group();
  root.name = 'WEIYANG_BUSINESS_V355_MANHATTAN';
  root.userData.islandType = 'business';
  root.userData.entryLabel = '企業商務島｜點擊大樓進入主題館';
  island.add(root);
  const mat=(c,metalness=.12,roughness=.68)=>new THREE.MeshStandardMaterial({color:c,metalness,roughness,side:THREE.FrontSide});
  const pearl=mat(0xf2edf5), ivory=mat(0xf9f2e8), lavender=mat(0xb9a6d6), violet=mat(0x7864a9), midnight=mat(0x364767), plum=mat(0x4f497a), slate=mat(0x7087ad), silver=mat(0xc7c9d8,.28), gold=mat(0xd5b779,.32), darkGold=mat(0xa98557,.28), green=mat(0x56836d), trunk=mat(0x756654);
  const add=(geo,m,x,y,z,p=root)=>{const a=new THREE.Mesh(geo,m);a.position.set(x,y,z);p.add(a);return a;};
  const box=(w,h,d,x,y,z,m,p=root)=>add(new THREE.BoxGeometry(w,h,d),m,x,y,z,p);
  const cyl=(rt,rb,h,n,x,y,z,m,p=root)=>add(new THREE.CylinderGeometry(rt,rb,h,n),m,x,y,z,p);
  // One ground slab. No transparent architectural glazing.
  box(28.6,.22,22,0,.18,0,ivory);
  // Three distinct buildings, each with a real side depth. Central tower is slim but not a needle.
  // Tower front at z=-1.75. All decorative strips stand in front of this plane.
  box(7.2,17.5,6.1,0,9.20,-4.8,midnight);
  // Large color-block bays instead of tiny windows / nine-square grids.
  for(const [x,m] of [[-2.20,slate],[-.74,lavender],[.74,violet],[2.20,slate]]) {
    box(1.15,15.7,.16,x,9.25,-1.63,m);
  }
  // Four substantial vertical fins are deliberately readable at phone scale.
  for(const x of [-2.93,-1.46,0,1.46,2.93])box(.19,16.15,.30,x,9.28,-1.43,x===0?gold:silver);
  // Offset side-facing color band adds dimensionality without floating polygon fragments.
  box(.28,15.8,4.4,3.74,9.23,-4.65,plum);
  box(.30,15.8,4.4,-3.74,9.23,-4.65,lavender);
  // Compact chamfer-inspired crown: stepped silhouette, no tall spire.
  box(7.65,.55,6.45,0,18.18,-4.8,silver);
  box(6.15,.64,5.25,0,18.78,-4.8,violet);
  box(4.25,.55,4.15,.38,19.36,-4.8,gold);
  const logoTex=new THREE.TextureLoader().load('office-logo-transparent.png?v=20261029-v187');
  logoTex.colorSpace=THREE.SRGBColorSpace;
  // V355: same rooftop flag concept as the other islands; purple flag field.
  // Mounted on the highest central tower, with the untouched official logo image.
  const flagPurple=mat(0x713b9d,.08,.62);
  const flagPole=mat(0xc9b18a,.42,.35);
  cyl(.075,.075,5.5,10,1.18,22.32,-4.35,flagPole);
  add(new THREE.SphereGeometry(.16,12,8),gold,1.18,25.18,-4.35);
  // A single opaque panel, offset from the pole so it reads clearly on iPhone.
  box(3.25,2.05,.10,2.88,23.47,-4.35,flagPurple);
  const flagLogoMaterial=new THREE.MeshBasicMaterial({map:logoTex,transparent:true,depthWrite:false,side:THREE.DoubleSide});
  // Logo texture is loaded below for the main entrance too; see shared declaration.
  add(new THREE.PlaneGeometry(1.77,1.77),flagLogoMaterial,2.88,23.47,-4.28);
  // Left: elegant taller side office, right: lower cool-blue wing. No cylinders.
  const wings=[{x:-9.3,h:11.3,w:5.7,m:plum,bay:lavender,accent:gold},{x:9.4,h:9.2,w:5.6,m:slate,bay:violet,accent:silver}];
  for(const w of wings){
    const cy=.40+w.h/2, front=-2.18;
    box(w.w,w.h,5.55,w.x,cy,-5.03,w.m);
    // Three continuous tall bays; no repeated horizontal floor grids.
    for(const dx of [-1.58,0,1.58])box(1.12,w.h-1.3,.17,w.x+dx,cy,front+.10,w.bay);
    for(const dx of [-2.35,-.79,.79,2.35])box(.15,w.h-1.05,.31,w.x+dx,cy,front+.27,w.accent);
    box(w.w+.38,.44,5.9,w.x,.40+w.h+.20,-5.03,pearl);
    // Distinct roof silhouette, not factory-style pillars.
    box(w.w-1.45,.60,4.65,w.x+.30,.40+w.h+.72,-5.03,w.accent);
    // Bold side accent, offset from side wall.
    box(.26,w.h-1.8,3.9,w.x+Math.sign(w.x)*(w.w/2+.18),cy,-5.05,silver);
  }
  // Architectural connectors are visibly behind the forward entrance podium.
  for(const s of [-1,1])box(2.65,.65,2.0,s*5.35,7.2,-5.0,pearl);
  // International headquarters: broad entrance, dimensional canopy and no glass alpha stacking.
  box(11.8,4.4,4.7,0,2.58,1.05,pearl);
  box(9.9,3.32,.18,0,2.48,3.51,midnight);
  for(const x of [-3.30,0,3.30])box(.30,3.52,.32,x,2.52,3.75,gold);
  for(const x of [-1.60,1.60])box(2.70,2.90,.16,x,2.30,3.75,plum);
  box(12.45,.38,5.30,0,4.98,1.1,gold);
  // Distinct flat angled-look luxury canopy, simple robust shapes.
  box(11.2,.28,2.15,0,5.40,4.25,ivory);
  box(11.25,.19,.32,0,5.33,5.38,darkGold);
  // Raised sign remains readable at a distance, and uses the original supplied logo texture.
  box(5.3,3.9,.25,0,8.45,4.7,midnight);
  add(new THREE.PlaneGeometry(3.30,3.30),new THREE.MeshBasicMaterial({map:logoTex,transparent:true,depthWrite:false,side:THREE.FrontSide}),0,8.47,4.86);
  // Two premium landscape planters replacing the former purple-and-gold discs.
  // Opaque, bold shapes; no thin petals, transparency, animated lights, or coplanar layers.
  // Kept to either side of the central pedestrian path and below the entrance signage.
  const burgundy=mat(0x8b234c), magenta=mat(0xc33476), fuchsia=mat(0xdf4b91),
        orchid=mat(0x8d4bb2), royalPurple=mat(0x6c3c99), creamBloom=mat(0xf4ddc7),
        leafDeep=mat(0x275b48), leafBright=mat(0x438568), soil=mat(0x41374b);
  for(const side of [-1,1]){
    const x=side*7.15, z=8.6;
    // Wide, low architectural elliptical trough: pearl stone + champagne-gold rim.
    const plinth=cyl(1,1,.44,32,x,.65,z,pearl);plinth.scale.set(3.30,1,1.54);
    const rim=cyl(1,1,.13,32,x,.93,z,gold);rim.scale.set(3.39,1,1.62);
    const bed=cyl(1,1,.14,32,x,1.025,z,soil);bed.scale.set(3.03,1,1.35);
    // Distinct sculptural foliage volumes, clearly readable at iPhone scale.
    const stems=[[-2.12,-.35,1.50],[-1.22,.34,1.80],[-.24,-.28,1.65],[.78,.33,1.86],[1.92,-.22,1.55]];
    for(let i=0;i<stems.length;i++){
      const [dx,dz,h]=stems[i];
      const foliage=add(new THREE.IcosahedronGeometry(.67,1),i%2?leafDeep:leafBright,x+dx,1.36,z+dz);
      foliage.scale.set(1.10,.62,.80);
      const bloomColor=side<0?[orchid,magenta,royalPurple,fuchsia,burgundy][i]:[burgundy,fuchsia,magenta,creamBloom,orchid][i];
      const bloom=add(new THREE.IcosahedronGeometry(.67,1),bloomColor,x+dx, h+.24,z+dz);
      bloom.scale.set(1.03,.87,.90);
      // A few large petal-like sculptural lobes, never a cartoon daisy or dense petals.
      for(const dir of [-1,1]){
        const lobe=add(new THREE.SphereGeometry(.36,8,6),bloomColor,x+dx+dir*.48,h+.10,z+dz+.05);
        lobe.scale.set(.90,1.14,.78);
      }
    }
    // Broad architectural evergreen foliage gives color and texture without tiny geometry.
    for(const [dx,dz] of [[-2.55,.57],[-1.65,-.67],[-.55,.68],[.44,-.70],[1.44,.62],[2.48,.48]]){
      const shrub=add(new THREE.IcosahedronGeometry(.48,1),leafDeep,x+dx,1.32,z+dz);
      shrub.scale.set(1.22,.65,1.0);
    }
  }
  for(const [x,z] of [[-12.2,4.5],[12.2,4.5],[-12.0,10],[12.0,10]]){
    cyl(.23,.31,1.6,8,x,1.13,z,trunk);
    add(new THREE.IcosahedronGeometry(1.24,1),green,x,2.52,z);
  }
  return root;
}
