// v436: Warm royal architecture, no signs, no generated imagery.
export function createLitigationInterior(root,T){
 const targets=[];
 const material=(color,metalness=0,roughness=.68)=>new T.MeshStandardMaterial({color,metalness,roughness});
 const ivory=material('#F5D6A9'),stone=material('#EAC69B'),white=material('#F9E4C2'),orange=material('#F29A64'),peach=material('#F5B6AD'),gold=material('#E8BA60',.42,.4),deep=material('#C58B68'),velvet=material('#EBA17C'),dark=material('#263B57');
 function mesh(geo,mat,x,y,z,zone,parent=root){let m=new T.Mesh(geo,mat);m.position.set(x,y,z);parent.add(m);if(zone){m.userData.litigationZone=zone;targets.push(m)}return m}
 function cube(w,h,d,x,y,z,m,zone){return mesh(new T.BoxGeometry(w,h,d),m,x,y,z,zone)}
 function cylinder(rt,rb,h,x,y,z,m,zone,n=32){return mesh(new T.CylinderGeometry(rt,rb,h,n),m,x,y,z,zone)}
 function sphere(r,x,y,z,m,zone){return mesh(new T.SphereGeometry(r,16,12),m,x,y,z,zone)}
 function rounded(w,d,r,h,x,y,z,m,zone){let s=new T.Shape();s.moveTo(-w/2+r,-d/2);s.lineTo(w/2-r,-d/2);s.quadraticCurveTo(w/2,-d/2,w/2,-d/2+r);s.lineTo(w/2,d/2-r);s.quadraticCurveTo(w/2,d/2,w/2-r,d/2);s.lineTo(-w/2+r,d/2);s.quadraticCurveTo(-w/2,d/2,-w/2,d/2-r);s.lineTo(-w/2,-d/2+r);s.quadraticCurveTo(-w/2,-d/2,-w/2+r,-d/2);let g=new T.ExtrudeGeometry(s,{depth:h,bevelEnabled:true,bevelThickness:.045,bevelSize:.05,bevelSegments:2,curveSegments:8});g.rotateX(-Math.PI/2);return mesh(g,m,x,y,z,zone)}
 function chair(x,z,zone,face=0,m=peach,scale=1){let group=new T.Group();group.position.set(x,0,z);group.rotation.y=face;group.scale.setScalar(scale);root.add(group);const part=(geo,mt,px,py,pz)=>mesh(geo,mt,px,py,pz,zone,group);part(new T.CylinderGeometry(.55,.55,.2,28),gold,0,.7,0);part(new T.BoxGeometry(1.12,.25,1.02),m,0,.89,0);let back=part(new T.BoxGeometry(1.12,1.75,.25),m,0,1.77,.47);back.rotation.x=-.08;part(new T.BoxGeometry(1.23,.14,.14),gold,0,2.66,.46);for(let dx of [-.53,.53]){part(new T.BoxGeometry(.15,.24,.85),gold,dx,1.16,0);part(new T.CylinderGeometry(.09,.1,.8,12),gold,dx,.43,0)}part(new T.CylinderGeometry(.16,.22,.65,16),gold,0,.35,0);return group}
 function table(x,z,w,d,zone){rounded(w,d,.35,.28,x,1.14,z,white,zone);rounded(w-.12,d-.12,.35,.09,x,1.39,z,gold,zone);cube(w-.8,.8,.23,x,.63,z-d/2+.25,deep,zone);for(let dx of [-w/2+.35,w/2-.35])cylinder(.13,.17,1.05,x+dx,.53,z,gold,zone)}
 // Warm, full-scale royal architecture: the back wall physically embraces the courtroom.
 cube(35,.4,29,0,-.27,0,stone);
 // Curved wall constructed from continuous radial panels, avoiding intersecting coplanar faces.
 const archCenterZ=-9.3, archRadius=12.9;
 for(let i=0;i<36;i++){
  const a0=Math.PI*.12+(Math.PI*.76)*i/36,a1=Math.PI*.12+(Math.PI*.76)*(i+1)/36;
  const a=(a0+a1)/2;
  const x=Math.cos(a)*archRadius,z=archCenterZ-Math.sin(a)*5.1;
  const panel=cube(archRadius*Math.PI*.76/36+.12,10.2,.6,x,5.1,z,ivory);
  panel.rotation.y=Math.PI/2-a;
  const stripe=cube(.11,8.6,.68,x,5.1,z,gold);stripe.rotation.y=Math.PI/2-a;
 }
 for(let x of [-17.45,17.45])cube(.35,9.5,29,x,4.75,0,ivory);
 // Grand concentric overhead crown: visually wraps the entire judge's bench.
 for(let radius of [13.5,12.65,11.8]){
  const arc=new T.Mesh(new T.TorusGeometry(radius,.17,10,96,Math.PI),gold);
  arc.rotation.x=Math.PI/2;arc.rotation.z=Math.PI;arc.position.set(0,9.1,-9.4);root.add(arc);
 }
 // Broad floor inlay, not a full bright-white floor.
 rounded(27,21,2,.045,0,.005,-.7,deep);
 rounded(26.6,20.6,2,.065,0,.07,-.7,gold);
 rounded(26.0,20.0,2,.08,0,.14,-.7,stone);
 // Court bench: substantial crescent front, layered sculpted trim, no dark expanses.
 rounded(23,2.8,1.05,1.95,0,.35,-11.4,orange,'civil');
 rounded(23.2,2.95,1.08,.16,0,2.32,-11.4,gold,'civil');
 rounded(22.85,2.55,1.02,.19,0,2.49,-11.4,white,'civil');
 for(let x of [-9,-5,-1,3,7,10])cube(.09,1.24,.12,x,1.1,-9.96,gold,'civil');
 for(let x of [-5.5,0,5.5])chair(x,-12.6,'civil',Math.PI,velvet,1.48);
 // Both counsel tables face the judge; visitor sees their clear curved profiles.
 table(-7.5,-6.9,7.4,2.1,'civil');table(7.5,-6.9,7.4,2.1,'civil');
 for(let x of [-8.9,-6.2,6.2,8.9])chair(x,-8.5,'civil',0,peach,1.02);
 table(13.5,-10,2.3,1.4,'civil');chair(13.5,-11.45,'civil',0,peach,.86);
 // One unified three-instance exhibit desk: oversized circular medallions, not three cabinets.
 rounded(18,2.5,1.1,1.2,0,.24,-1.05,orange,'hierarchy');
 rounded(18.3,2.7,1.13,.15,0,1.48,-1.05,gold,'hierarchy');
 rounded(18,2.45,1.1,.16,0,1.63,-1.05,white,'hierarchy');
 // Gold rings face entry, with large legible characters on the integrated tabletop.
 for(const [x,word] of [[-5.5,'一審'],[0,'二審'],[5.5,'三審']]){
  const ring=mesh(new T.TorusGeometry(1.38,.16,14,56),gold,x,2.95,-1.12,'hierarchy');
  const disk=cylinder(1.22,1.22,.12,x,2.95,-1.12,peach,'hierarchy',48);disk.rotation.x=Math.PI/2;
  // Use canvas-drawn text on a front-facing plane; this is UI signage only within the exhibit.
  // v436 keeps all signage removed pending user approval, so the medallions stay blank.
 }
 // Service: two actual work counters with recessed panels and countertops.
 for(let x of [-13.7,-8.3]){rounded(4.65,2.25,.65,1.5,x,.18,5.3,orange,'service');rounded(4.85,2.45,.65,.17,x,1.75,5.3,white,'service');cube(3.8,.63,.08,x,.85,6.47,ivory,'service');cube(3.7,.09,.12,x,1.45,6.51,gold,'service');rounded(1.3,.8,.12,.06,x,1.96,5.2,stone,'service')}
 // Mediation: substantial oval tabletop and six genuinely upholstered chairs.
 let t=cylinder(2.2,2.2,.32,11.1,1.2,5.8,white,'mediation',48);t.scale.set(2,1,.7);let rim=cylinder(2.23,2.23,.11,11.1,1.07,5.8,gold,'mediation',48);rim.scale.set(2,1,.7);let pedestal=cylinder(1.25,1.55,.9,11.1,.56,5.8,deep,'mediation');pedestal.scale.set(1.7,1,.7);
 for(let x of [8.2,10.15,12.05,14]){chair(x,3.7,'mediation',Math.PI,peach,.86);chair(x,8.0,'mediation',0,peach,.86)}
 // US-law: oversized five-point-star plinth and recognizable Lady Justice silhouette.
 const star=new T.Shape();for(let i=0;i<10;i++){let a=-Math.PI/2+i*Math.PI/5,r=i%2?2.65:5.25;let x=Math.cos(a)*r,y=Math.sin(a)*r;if(i===0)star.moveTo(x,y);else star.lineTo(x,y)}star.closePath();
 const starGeo=new T.ExtrudeGeometry(star,{depth:.72,bevelEnabled:true,bevelSize:.15,bevelThickness:.12,bevelSegments:3});starGeo.rotateX(-Math.PI/2);
 mesh(starGeo,orange,-11,.35,10.9,'usa');
 const statue=new T.Group();statue.position.set(-11,1.25,10.9);statue.rotation.y=Math.PI;root.add(statue);
 function sp(geo,mt,x,y,z){return mesh(geo,mt,x,y,z,'usa',statue)}
 sp(new T.CylinderGeometry(.52,1.35,3.6,24),white,0,2.1,0);
 sp(new T.SphereGeometry(.56,24,16),gold,0,4.18,0);
 sp(new T.CylinderGeometry(.14,.16,1.85,12),gold,-.65,3.25,0).rotation.z=-.5;
 sp(new T.CylinderGeometry(.12,.12,2.6,12),gold,.74,3.0,0).rotation.z=.34;
 sp(new T.CylinderGeometry(.06,.06,2.4,12),gold,-1.08,4.45,0).rotation.z=Math.PI/2;
 for(let x of [-2.05,-.1]){sp(new T.CylinderGeometry(.04,.04,.8,8),gold,x,4.1,0);sp(new T.CylinderGeometry(.62,.25,.12,24),gold,x,3.7,0)}
 // Reception: single bold curved sculptural piece, no tiny desk accessories.
 rounded(8.2,2.7,1.15,1.65,10.6,.22,12.0,orange,'reception');
 rounded(8.35,2.8,1.2,.16,10.6,1.94,12.0,gold,'reception');
 rounded(8.15,2.62,1.13,.19,10.6,2.13,12.0,white,'reception');
 rounded(7.6,.22,.1,.14,10.6,1.0,13.46,gold,'reception');
 return {targets};
}
