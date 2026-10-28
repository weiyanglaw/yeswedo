// WEIYANG v107: Corporate island, large-scale low-poly architectural detailing.
// Derived solely from official v106. All existing site interactions remain unchanged.
export function createBusinessHeadquarters(island, THREE){
 const root=new THREE.Group();root.name='WEIYANG_BUSINESS_V107';island.add(root);
 const mat=(hex)=>new THREE.MeshBasicMaterial({color:hex,side:THREE.DoubleSide});
 const pearl=mat('#F9F7F0'),white=mat('#E9F0F0'),ice=mat('#83B7D2'),glass=mat('#4788B4'),glassDark=mat('#275A81'),navy=mat('#203F62'),gold=mat('#E9CF92'),goldDark=mat('#C7AC75'),plaza=mat('#E8ECEB'),pave=mat('#D4E3ED'),leaf=mat('#6F9F6C'),leafLight=mat('#91B77D'),leafDark=mat('#4F835F'),bark=mat('#766F60');
 const box=(w,h,d,x,y,z,m,group=root)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);group.add(o);return o;};
 const poly=(pts,depth,x,y,z,m)=>{const s=new THREE.Shape();s.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)s.lineTo(pts[i][0],pts[i][1]);s.closePath();const g=new THREE.ExtrudeGeometry(s,{depth,bevelEnabled:false,steps:1});const o=new THREE.Mesh(g,m);o.position.set(x,y,z);root.add(o);return o;};
 // Original floating island diameter 34; no modification to bridges or original island.
 box(29,.18,18,0,.10,0,plaza);box(10.8,.10,11.2,0,.25,7.5,pave);
 for(const [w,h,y,m] of [[6,.035,.32,glassDark],[3.6,.038,.36,pearl],[1.7,.042,.40,ice]]){const o=box(w,h,w,0,y,9.5,m);o.rotation.y=Math.PI/4;}
 // Slender main tower, deliberately lower than v106 (approx 26 vs 35 units).
 box(6.2,20.7,5.7,0,10.65,-4.25,glassDark);
 box(4.7,4.1,5.1,0,22.7,-4.35,glass);
 // Large, actual three-dimensional stepped / diagonally cut roof silhouette.
 poly([[-3.25,0],[-3.25,3.0],[-1.9,4.4],[2.15,4.4],[3.25,2.8],[3.25,0]],5.9,0,21.0,-7.20,pearl);
 poly([[-2.50,0],[-2.50,2.5],[-1.25,3.45],[1.65,3.45],[2.50,2.15],[2.50,0]],6.1,0,21.45,-7.35,glassDark);
 // Oversized ivory fins are thick structural solids, readable at island scale.
 for(const x of [-3.35,3.35])box(.72,21.0,6.6,x,10.75,-4.25,pearl);
 for(const x of [-2.55,2.55])box(.28,17.2,.28,x,12.1,-1.10,gold);
 // A bold, single mid-height cross band instead of tiny window grid.
 box(7.15,.85,6.3,0,14.4,-4.15,pearl);
 box(6.5,.23,.3,0,14.75,-.94,gold);
 // Large glass planes with only a few broad, high-contrast vertical divisions.
 for(const x of [-1.5,1.5])box(.23,7.6,.18,x,18.5,-1.30,ice);
 // Left tower: visible diagonal roof and stepped facade, not a rectangular stick.
 poly([[-2.45,0],[-2.45,13.0],[-1.0,15.2],[2.15,12.3],[2.15,0]],5.0,-9.3,.35,-6.6,pearl);
 poly([[-1.85,0],[-1.85,11.8],[-.75,13.4],[1.65,11.2],[1.65,0]],.18,-9.3,.45,-1.43,glass);
 box(.6,13.2,5.6,-11.85,7.0,-4.1,pearl);
 box(.38,11.3,.32,-7.45,6.2,-1.20,gold);
 // Big architectural terrace step, visible at wide camera distance.
 box(4.95,1.15,5.55,-9.3,5.1,-4.05,pearl);
 box(4.0,.40,5.7,-9.3,5.8,-4.05,goldDark);
 // Right tower: stepped, slanted roof, big clean blue glass surfaces.
 poly([[-2.30,0],[-2.30,12.3],[.9,16.0],[2.30,16.0],[2.30,0]],5.0,9.2,.35,-6.6,pearl);
 poly([[-1.75,0],[-1.75,11.6],[1.1,14.5],[1.75,14.5],[1.75,0]],.18,9.2,.45,-1.43,glass);
 box(.65,15.8,5.7,11.60,8.4,-4.0,pearl);
 box(.30,13.0,.35,7.15,7.2,-1.16,gold);
 box(5.0,1.2,5.5,9.2,5.7,-4.0,pearl);
 box(4.3,.35,5.7,9.2,6.5,-4.0,goldDark);
 // Two large forward-facing architectural facets on each side; thick and 3D.
 for(const x of [-9.3,9.2]){
   box(4.2,3.7,.27,x,2.8,-1.36,glassDark);
   box(3.55,2.9,.29,x,2.8,-1.18,ice);
   for(const dx of [-1.93,1.93])box(.35,4.0,.40,x+dx,2.9,-1.06,pearl);
 }
 // Connected campus wings; one front entry and level continuous walking surface.
 for(const x of [-5.75,5.75]){
   box(5.4,4.3,4.7,x,2.35,.15,pearl);
   box(4.8,3.2,.24,x,2.10,2.63,glass);
   box(5.5,.55,5.0,x,4.60,.15,pearl);
 }
 // Entrance: taller, deeper and visibly layered, but no stairs and no ramp.
 box(10.2,5.15,4.3,0,2.68,1.5,pearl);
 box(8.8,4.12,.22,0,2.17,3.80,glassDark);
 box(7.55,3.5,.26,0,1.99,3.98,ice);
 for(const x of [-4.6,4.6])box(.75,5.3,4.7,x,2.75,1.5,pearl);
 box(10.7,.77,4.9,0,5.65,1.5,pearl);
 box(9.6,.24,5.1,0,6.15,1.5,gold);
 for(const x of [-2.5,0,2.5])box(.34,3.55,.40,x,2.0,4.20,pearl);
 // Actual unchanged official logo image, enlarged on a clear dark facade.
 const texture=new THREE.TextureLoader().load('weiyang-logo-tight-v102.png?v=20261027-v107');
 texture.colorSpace=THREE.SRGBColorSpace;
 const logo=new THREE.Mesh(new THREE.PlaneGeometry(5.05,6.4),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,side:THREE.DoubleSide}));
 logo.position.set(0,10.7,-1.005);root.add(logo);
 // Broad, recognizable low-poly trees; no obstruction of main approach.
 function broadTree(x,z,scale=1){
  const g=new THREE.Group();g.position.set(x,.35,z);g.scale.setScalar(scale);root.add(g);
  const cylinder=(r1,r2,h,x,y,z,m)=>{const o=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,7),m);o.position.set(x,y,z);g.add(o);return o;};
  cylinder(.32,.43,1.55,0,.78,0,bark);
  for(const side of [-1,1]){const b=cylinder(.16,.22,1.35,side*.63,1.70,0,bark);b.rotation.z=side*-.70;}
  const puff=(x,y,z,sx,sy,sz,m)=>{const o=new THREE.Mesh(new THREE.IcosahedronGeometry(1,1),m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);g.add(o);};
  puff(0,2.6,0,1.55,.95,1.25,leaf);puff(-1.1,2.35,.1,1.15,.78,1.10,leafDark);puff(1.05,2.40,.15,1.20,.85,1.1,leafLight);puff(0,3.10,-.20,1.25,.72,1.1,leaf);
 }
 for(const [x,z,s] of [[-12,5.7,.85],[12,5.7,.85],[-12,10.5,.82],[12,10.5,.82],[-13.1,-.5,.72],[13.1,-.5,.72]])broadTree(x,z,s);
 for(const x of [-12,12]){box(4.2,.48,2.1,x,.42,8.0,pearl);box(3.5,.15,1.65,x,.74,8.0,leafDark);}
 root.userData.islandType='business';root.userData.entryLabel='企業商務島｜點擊大樓進入主題館';return root;
}
