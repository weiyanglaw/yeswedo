
// WEIYANG v106: Native low-poly Corporate Island exterior.
// A single connected headquarters; themed rooms are accessed AFTER entering.
// Shapes and color blocks are deliberately bold for actual mobile Three.js rendering.
export function createBusinessHeadquarters(island, THREE){
 const root=new THREE.Group();root.name='WEIYANG_BUSINESS_V106';island.add(root);
 const mat=(hex)=>new THREE.MeshBasicMaterial({color:hex,side:THREE.DoubleSide});
 const pearl=mat('#F8F5EE'),ivory=mat('#E5E7E5'),blue=mat('#537FA5'),
       ice=mat('#9FC6DA'),deep=mat('#294D70'),navy=mat('#263E5D'),
       slate=mat('#718DA6'),plaza=mat('#E8ECEB'),pave=mat('#D4E3ED'),
       leaf=mat('#6F9F6C'),leafLight=mat('#91B77D'),leafDark=mat('#4F835F'),
       bark=mat('#766F60'),gold=mat('#F8E5B8');
 const box=(w,h,d,x,y,z,m,group=root)=>{
   const a=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);
   a.position.set(x,y,z);group.add(a);return a;
 };
 // Island diameter is 34 units. The original platform and bridges are not moved.
 // All building masses stay in the rear half; the front 7+ units remain open.
 box(29,.18,18,0,.10,0,plaza);
 box(10.8,.10,11.2,0,.25,7.5,pave);
 // Clear, wide central geometric ground mark, not a globe or standing sculpture.
 const diamond=box(6,.035,6,0,.32,9.5,blue);diamond.rotation.y=Math.PI/4;
 const inset=box(3.6,.038,3.6,0,.36,9.5,pearl);inset.rotation.y=Math.PI/4;
 const middle=box(1.7,.042,1.7,0,.40,9.5,ice);middle.rotation.y=Math.PI/4;
 // Main central tower: strong stepped New York skyline, no reflective shaders.
 box(7.1,22.8,6.3,0,11.5,-4.0,deep);
 box(5.5,6.3,5.6,0,26.0,-4.0,blue);
 box(3.5,3.6,4.5,0,30.95,-4.0,pearl);
 box(2.3,2.5,3.4,0,34.0,-4.0,slate);
 // Large architectural fins make the tower readable even from far away.
 for(const x of [-3.85,3.85])box(.85,24.6,7.1,x,12.4,-4.0,pearl);
 box(8.8,.9,7.0,0,23.3,-4.0,pearl);
 // Single, broad and level main entry, NOT a slope or stairs.
 box(11.6,5.4,5.0,0,2.8,1.1,pearl);
 box(9.7,3.75,.20,0,2.15,3.72,deep);
 box(7.4,3.2,.23,0,1.95,3.86,ice);
 box(.32,3.2,.28,0,1.95,4.02,pearl);
 for(const x of [-5.1,5.1])box(.8,5.5,5.0,x,2.85,1.1,ivory);
 box(11.8,.85,5.3,0,5.9,1.15,pearl);
 // Distinct side towers integrated visually with the central campus, not separate museums.
 // Left: tiered Manhattan-style tower.
 box(4.7,15.0,5.0,-9.4,7.6,-4.4,blue);
 box(3.6,5.4,4.4,-9.4,17.7,-4.4,deep);
 box(2.6,2.2,3.4,-9.4,21.5,-4.4,pearl);
 box(.55,17.0,5.6,-11.95,8.5,-4.4,ivory);
 // Right: clean angular tower, not a mass of window-grid lines.
 box(5.0,18.6,5.4,9.2,9.5,-4.0,ice);
 box(3.9,4.6,4.4,9.2,21.1,-4.0,slate);
 box(.8,20.0,6.1,11.85,10.1,-4.0,pearl);
 box(4.6,1.1,5.5,9.2,19.1,-4.0,pearl);
 // Broad blue facade areas, not tiny glass squares.
 for(const x of [-9.4,9.2]){
   box(3.25,8.5,.14,x,9.4,-1.56,deep);
   box(3.25,1.1,.16,x,14.1,-1.44,pearl);
 }
 // Low connected wings at the sides reinforce ONE complex, with one entry.
 box(5.0,5.2,4.0,-6.3,2.7,.2,ivory);
 box(5.0,5.2,4.0,6.3,2.7,.2,ivory);
 box(4.4,3.1,.16,-6.3,2.2,2.29,ice);
 box(4.4,3.1,.16,6.3,2.2,2.29,ice);
 // Exact official logo image, never approximate/repaint it.
 const texture=new THREE.TextureLoader().load('weiyang-logo-tight-v102.png?v=20261027-v106');
 texture.colorSpace=THREE.SRGBColorSpace;
 const logo=new THREE.Mesh(new THREE.PlaneGeometry(5.5,7.0),
   new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,side:THREE.DoubleSide}));
 logo.position.set(0,15.0,-.76);root.add(logo);
 // Trees: SHORT visible branched trunks, WIDE layered canopies; no stick + ball.
 // Placed outside the entrance path and outside the island edge.
 function broadTree(x,z,scale=1){
   const g=new THREE.Group();g.position.set(x,.35,z);g.scale.setScalar(scale);root.add(g);
   const cylinder=(r1,r2,h,x,y,z,m)=>{
      const o=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,7),m);
      o.position.set(x,y,z);g.add(o);return o;
   };
   cylinder(.32,.43,1.55,0,.78,0,bark);
   for(const side of [-1,1]){
     const b=cylinder(.16,.22,1.35,side*.63,1.70,0,bark);
     b.rotation.z=side*-.70;
   }
   const puff=(x,y,z,sx,sy,sz,m)=>{
     const o=new THREE.Mesh(new THREE.IcosahedronGeometry(1,1),m);
     o.position.set(x,y,z);o.scale.set(sx,sy,sz);g.add(o);
   };
   puff(0,2.6,0,1.55,.95,1.25,leaf);
   puff(-1.1,2.35,.1,1.15,.78,1.10,leafDark);
   puff(1.05,2.40,.15,1.20,.85,1.1,leafLight);
   puff(0,3.10,-.20,1.25,.72,1.1,leaf);
 }
 for(const [x,z,s] of [[-12,5.7,.85],[12,5.7,.85],[-12,10.5,.82],[12,10.5,.82],[-13.1,-.5,.72],[13.1,-.5,.72]])
   broadTree(x,z,s);
 // Low, large color-block planters; never in the central entrance corridor.
 for(const x of [-12,12]){
   box(4.2,.48,2.1,x,.42,8.0,ivory);
   box(3.5,.15,1.65,x,.74,8.0,leafDark);
 }
 root.userData.islandType='business';
 root.userData.entryLabel='企業商務島｜點擊大樓進入主題館';
 return root;
}
