// v435: Architecture-first litigation hall. No signs or generated imagery.
export function createLitigationInterior(root,T){
 const targets=[];
 const material=(color,metalness=0,roughness=.68)=>new T.MeshStandardMaterial({color,metalness,roughness});
 const ivory=material('#FFF0DA'),stone=material('#F8E8D2'),white=material('#FFF9EF'),orange=material('#D9804B'),peach=material('#E8A483'),gold=material('#D7B16D',.54,.32),deep=material('#9D553E'),velvet=material('#BA6A50'),dark=material('#4A4D59');
 function mesh(geo,mat,x,y,z,zone,parent=root){let m=new T.Mesh(geo,mat);m.position.set(x,y,z);parent.add(m);if(zone){m.userData.litigationZone=zone;targets.push(m)}return m}
 function cube(w,h,d,x,y,z,m,zone){return mesh(new T.BoxGeometry(w,h,d),m,x,y,z,zone)}
 function cylinder(rt,rb,h,x,y,z,m,zone,n=32){return mesh(new T.CylinderGeometry(rt,rb,h,n),m,x,y,z,zone)}
 function sphere(r,x,y,z,m,zone){return mesh(new T.SphereGeometry(r,16,12),m,x,y,z,zone)}
 function rounded(w,d,r,h,x,y,z,m,zone){let s=new T.Shape();s.moveTo(-w/2+r,-d/2);s.lineTo(w/2-r,-d/2);s.quadraticCurveTo(w/2,-d/2,w/2,-d/2+r);s.lineTo(w/2,d/2-r);s.quadraticCurveTo(w/2,d/2,w/2-r,d/2);s.lineTo(-w/2+r,d/2);s.quadraticCurveTo(-w/2,d/2,-w/2,d/2-r);s.lineTo(-w/2,-d/2+r);s.quadraticCurveTo(-w/2,-d/2,-w/2+r,-d/2);let g=new T.ExtrudeGeometry(s,{depth:h,bevelEnabled:true,bevelThickness:.045,bevelSize:.05,bevelSegments:2,curveSegments:8});g.rotateX(-Math.PI/2);return mesh(g,m,x,y,z,zone)}
 function chair(x,z,zone,face=0,m=peach,scale=1){let group=new T.Group();group.position.set(x,0,z);group.rotation.y=face;group.scale.setScalar(scale);root.add(group);const part=(geo,mt,px,py,pz)=>mesh(geo,mt,px,py,pz,zone,group);part(new T.CylinderGeometry(.55,.55,.2,28),gold,0,.7,0);part(new T.BoxGeometry(1.12,.25,1.02),m,0,.89,0);let back=part(new T.BoxGeometry(1.12,1.75,.25),m,0,1.77,.47);back.rotation.x=-.08;part(new T.BoxGeometry(1.23,.14,.14),gold,0,2.66,.46);for(let dx of [-.53,.53]){part(new T.BoxGeometry(.15,.24,.85),gold,dx,1.16,0);part(new T.CylinderGeometry(.09,.1,.8,12),gold,dx,.43,0)}part(new T.CylinderGeometry(.16,.22,.65,16),gold,0,.35,0);return group}
 function table(x,z,w,d,zone){rounded(w,d,.35,.28,x,1.14,z,white,zone);rounded(w-.12,d-.12,.35,.09,x,1.39,z,gold,zone);cube(w-.8,.8,.23,x,.63,z-d/2+.25,deep,zone);for(let dx of [-w/2+.35,w/2-.35])cylinder(.13,.17,1.05,x+dx,.53,z,gold,zone)}
 // Full-height court architecture, physically separate surfaces to avoid z-fighting.
 cube(35,.42,29,0,-.25,0,stone);cube(35,11,.55,0,5.5,-14.55,ivory);for(let x of [-17.55,17.55])cube(.5,11,29,x,5.5,0,ivory);
 // Wide readable inlay rather than tiny texture pattern.
 rounded(24,21,2,.045,0,.015,-1.2,white);rounded(23.7,20.7,2,.055,0,.082,-1.2,gold);rounded(23.2,20.2,2,.075,0,.16,-1.2,stone);
 for(let x of [-15.4,-11.1,11.1,15.4]){cube(1.35,8.6,.8,x,4.3,-14.03,white);cube(1.65,.45,1.05,x,8.7,-14.02,gold);cube(1.65,.5,1.05,x,.4,-14.02,gold)}
 cube(34,.52,.72,0,9.3,-14.02,gold);cube(34,.45,.7,0,10.05,-14.02,white);
 // Dominant courtroom, architectural raised judge desk with an open audience sightline.
 rounded(24,2.35,1,.62,0,.24,-12.25,deep,'civil');rounded(23.6,2.05,.85,.18,0,.88,-12.25,gold,'civil');rounded(23.1,1.95,.8,.18,0,1.1,-12.25,white,'civil');
 rounded(21,1.5,.5,1.75,0,1.3,-12.55,deep,'civil');rounded(21.35,1.6,.5,.18,0,3.0,-12.55,white,'civil');cube(20.6,.13,.18,0,2.35,-11.72,gold,'civil');
 for(let x of [-5.3,0,5.3])chair(x,-13.25,'civil',Math.PI,velvet,1.25);
 table(-6.8,-7.55,8.4,2.1,'civil');table(6.8,-7.55,8.4,2.1,'civil');
 for(let x of [-8.25,-5.55,5.55,8.25])chair(x,-9.35,'civil',0,peach,1.05);
 table(13.25,-10.45,2.5,1.4,'civil');chair(13.25,-12.1,'civil',0,peach,.8);
 // Three visually bold freestanding instance installations, no words or placards.
 for(let [x,zone] of [[-5.3,'hierarchy'],[0,'hierarchy'],[5.3,'hierarchy']]){
  rounded(4.5,2.75,.62,.45,x,.24,-1.6,ivory,zone);rounded(4.35,2.6,.58,.13,x,.74,-1.6,gold,zone);
  rounded(3.7,1.7,.36,.32,x,1.12,-1.7,orange,zone);
  for(let dx of [-1.1,0,1.1])cylinder(.18,.25,1.55,x+dx,1.96,-2.18,white,zone,20);
  rounded(3.65,.7,.24,.2,x,2.72,-2.15,gold,zone);
  // Large stepped gable is architecture, not a text sign.
  rounded(4.1,.85,.25,.18,x,3.05,-2.12,white,zone);
 }
 // Service: two actual work counters with recessed panels and countertops.
 for(let x of [-13.7,-8.3]){rounded(4.65,2.25,.65,1.5,x,.18,5.3,orange,'service');rounded(4.85,2.45,.65,.17,x,1.75,5.3,white,'service');cube(3.8,.63,.08,x,.85,6.47,ivory,'service');cube(3.7,.09,.12,x,1.45,6.51,gold,'service');rounded(1.3,.8,.12,.06,x,1.96,5.2,stone,'service')}
 // Mediation: substantial oval tabletop and six genuinely upholstered chairs.
 let t=cylinder(2.2,2.2,.32,11.1,1.2,5.8,white,'mediation',48);t.scale.set(2,1,.7);let rim=cylinder(2.23,2.23,.11,11.1,1.07,5.8,gold,'mediation',48);rim.scale.set(2,1,.7);let pedestal=cylinder(1.25,1.55,.9,11.1,.56,5.8,deep,'mediation');pedestal.scale.set(1.7,1,.7);
 for(let x of [8.2,10.15,12.05,14]){chair(x,3.7,'mediation',Math.PI,peach,.86);chair(x,8.0,'mediation',0,peach,.86)}
 // US-law: architectural display niche with layered sculptural federal/state columns; no text.
 rounded(7.6,1.2,.4,.48,-11,.22,12.25,deep,'usa');cube(7.4,4.0,.55,-11,2.3,13.1,ivory,'usa');cube(6.8,3.3,.18,-11,2.45,12.74,orange,'usa');for(let x of [-13.1,-11,-8.9])cylinder(.3,.35,2.3,x,2.25,12.52,white,'usa');cube(6.8,.28,.45,-11,3.7,12.45,gold,'usa');
 // Small royal reception with desk bell; no floating labels.
 rounded(7.2,2.3,.8,1.35,10.7,.23,12.2,orange,'reception');rounded(7.5,2.5,.85,.17,10.7,1.6,12.2,white,'reception');cube(5.8,.56,.09,10.7,.88,13.4,ivory,'reception');cube(6.6,.13,.12,10.7,1.38,13.47,gold,'reception');cylinder(.35,.35,.12,9.1,1.85,12.2,gold,'reception');sphere(.24,9.1,1.96,12.2,gold,'reception');
 return {targets};
}
