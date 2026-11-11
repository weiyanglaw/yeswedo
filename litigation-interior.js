// Litigation palace v433: single-level orange-gold interior, fixed non-animated materials.
export function createLitigationInterior(root,T){
 const targets=[];const M=(c,metal=0)=>new T.MeshStandardMaterial({color:c,roughness:metal?.52:.87,metalness:metal});
 const orange=M('#C76332'),light=M('#E99559'),ivory=M('#FFF0D6'),gold=M('#D6A65E',.27),wood=M('#70422D'),navy=M('#263B57'),marble=M('#F8E7CF'),burgundy=M('#8C4435'),glass=M('#D6C9A7');
 const add=(g,m,x,y,z,tag)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);root.add(o);if(tag){o.userData.litigationZone=tag;targets.push(o)}return o};
 const b=(w,h,d,x,y,z,m,tag)=>add(new T.BoxGeometry(w,h,d),m,x,y,z,tag);
 const c=(r,h,x,y,z,m,tag)=>add(new T.CylinderGeometry(r,r,h,20),m,x,y,z,tag);
 // Single continuous floor, all furniture stands directly on y=0.
 b(35,.24,29,0,-.12,0,marble);b(35,10,.25,0,5,-14.5,orange);
 for(const x of [-17.35,17.35])b(.3,10,29,x,5,0,light);
 // Wide broad architectural gold trim, all firmly connected to walls.
 b(35,.22,.3,0,9.5,-14.24,gold);b(35,.16,.3,0,.22,-14.24,gold);
 for(const x of [-15,-9,9,15]){c(.58,9.2,x,4.6,-13.65,ivory);c(.73,.28,x,9.35,-13.65,gold);c(.75,.2,x,.1,-13.65,gold)}
 // Symmetrical orange royal carpet, flush, no stairs.
 b(5,.025,21,0,.02,3.2,burgundy);b(5.25,.025,21,0,.013,3.2,gold);
 // Central royal reception, independently interactive.
 b(8,1.3,1.65,0,.65,9.6,orange,'reception');b(8.3,.15,1.9,0,1.39,9.6,ivory,'reception');b(8.15,.13,.12,0,.86,10.48,gold,'reception');
 for(const x of [-3.2,3.2])b(.17,1.25,1.8,x,.65,9.6,gold);
 // Unified, luxurious public service hall; separate real receiving and payment windows.
 b(10,.22,3,-11.4,.11,4.0,gold);b(10,1.22,2.1,-11.4,.61,3.3,orange,'service');b(10,.14,2.35,-11.4,1.29,3.3,ivory,'service');
 for(const x of [-14.7,-9.8]){b(4.2,2.1,.35,x,2.7,2.3,wood,'service');b(4.0,.16,.45,x,3.72,2.3,gold,'service')}
 // Large courtroom suites, not small booths: a full courtroom arrangement in each open wing.
 const court=(cx,cz,tag)=>{
  b(9,.08,8,cx,.04,cz,burgundy);b(9.3,.07,.17,cx,.045,cz-4.1,gold);
  b(7,1.45,1.35,cx,.725,cz-2.75,wood,tag);b(7.2,.12,1.5,cx,1.5,cz-2.75,gold,tag);
  for(const x of [-2.4,0,2.4]){b(1.25,2,.35,cx+x,1.1,cz-3.8,orange,tag);b(1.35,.2,.55,cx+x,2.04,cz-3.8,gold)}
  for(const x of [-2.3,2.3]){b(2.5,.85,1.2,cx+x,.425,cz+.15,wood,tag);b(2.65,.12,1.3,cx+x,.9,cz+.15,ivory,tag)}
  for(const x of [-2.8,-.95,.95,2.8])for(const z of [2.1,3.25]){b(1.45,.45,.8,cx+x,.3,cz+z,wood);b(1.45,1,.18,cx+x,.83,cz+z+.38,orange)}
 };
 court(-10,-7,'civil');court(10,-7,'criminal');
 // Administrative court on the side, complete desk and judge bench.
 b(7,.05,5,11,.04,5.0,burgundy);b(6,1.3,1.1,11,.65,3.2,wood,'administrative');b(6.1,.14,1.25,11,1.36,3.2,gold,'administrative');
 for(const x of [9.4,12.6]){b(2.3,.8,1.2,x,.4,6.3,wood,'administrative');b(1.2,1.25,.25,x,.7,7.35,orange)}
 // Mediation: full conference table, upholstered backed chairs.
 b(7,.07,5,-11,.04,10.7,burgundy);b(4.7,.9,1.65,-11,.45,10.4,wood,'mediation');b(4.9,.12,1.8,-11,.97,10.4,ivory,'mediation');
 for(const x of [-13,-11,-9])for(const z of [8.95,11.9]){b(1.0,.48,.8,x,.28,z,orange);b(1,1.35,.22,x,.72,z+(z<10?-.38:.38),orange)}
 // Court hierarchy and knowledge wall, integrated into architecture.
 b(9,5,.3,0,5,-14.15,wood,'hierarchy');b(9.3,.2,.42,0,7.55,-13.9,gold,'hierarchy');
 for(const x of [-2.7,0,2.7]){b(2.2,3.6,.1,x,5.0,-13.88,orange,'hierarchy');b(2.35,.16,.18,x,6.9,-13.75,gold)}
 // Waiting lounge: grounded sofas, backed seats and matching side tables.
 for(const x of [-14.2,14.2]){b(3.2,.55,1.35,x,.3,12.2,orange);b(3.2,1.25,.35,x,.7,12.85,orange);b(1.5,.55,1.0,x,.28,10.6,wood)}
 // Large fixed luminous-style fixtures; no emissive pulsing or blinking.
 for(const x of [-7,0,7]){c(.75,.22,x,8.9,1.5,gold);c(.56,.2,x,8.72,1.5,ivory)}
 return {targets};
}
