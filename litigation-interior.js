// v446: Accessible circulation, solid rear wall, themed counters and large courtroom objects.
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
 cube(35,.4,34,0,-.27,1.5,stone);
 // Curved wall constructed from continuous radial panels, avoiding intersecting coplanar faces.
 const archCenterZ=-9.3, archRadius=12.9;
 for(let i=0;i<36;i++){
  const a0=Math.PI*.12+(Math.PI*.76)*i/36,a1=Math.PI*.12+(Math.PI*.76)*(i+1)/36;
  const a=(a0+a1)/2;
  const x=Math.cos(a)*archRadius,z=archCenterZ-Math.sin(a)*5.1;
  const panel=cube(archRadius*Math.PI*.76/36+.12,10.2,.6,x,5.1,z,ivory);
  panel.rotation.y=Math.PI/2-a;
  // Original wall surface retained; no coplanar thin stripes.
 }
 for(let x of [-17.45,17.45])cube(.35,9.5,29,x,4.75,0,ivory);
 // Raised open-air architectural silhouette: vertical grand arch, no ceiling or suspended fixtures.
 // Each upper panel follows the curved profile and sits above the original wall (no overlapping faces).
 const archTop=x=>10.5+6.2*Math.sqrt(Math.max(0,1-(x/18.3)**2));
 for(let i=0;i<36;i++){
   const a=Math.PI*.12+Math.PI*.76*(i+.5)/36;
   const x=Math.cos(a)*archRadius,z=archCenterZ-Math.sin(a)*5.1;
   const h=Math.max(.45,archTop(x)-10.2);
   const panel=cube(archRadius*Math.PI*.76/36+.035,h,.59,x,10.2+h/2,z,ivory);
   panel.rotation.y=Math.PI/2-a;
 }
 // Single continuous opaque rear skin, with overlapping watertight edges and a rear offset.
 // Unlike the old isolated radial blocks, this cannot reveal slits when seen from outside.
 {
  const verts=[],indices=[],steps=144;
  for(let i=0;i<=steps;i++){
   const a=Math.PI*.12+Math.PI*.76*i/steps;
   const x=Math.cos(a)*archRadius,z=archCenterZ-Math.sin(a)*5.1-.48;
   const top=archTop(x)+.12;
   verts.push(x,0,z,x,top,z);
   if(i<steps){const j=i*2;indices.push(j,j+1,j+2,j+1,j+3,j+2)}
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(verts,3));g.setIndex(indices);g.computeVertexNormals();
  const backMat=new T.MeshStandardMaterial({color:'#F5D6A9',roughness:.75,side:T.DoubleSide});
  mesh(g,backMat,0,0,0);
 }
 // Vertical crown, shaped like the owner's drawn high semicircle; behind all furniture.
 for(const [offset,thick,mt] of [[0,.24,gold],[-.45,.12,white],[-.83,.10,gold]]){
   const pts=[];
   for(let j=0;j<=72;j++){
     const x=-17.2+34.4*j/72;
     pts.push(new T.Vector3(x,archTop(x)+offset,-14.95));
   }
   mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts),100,thick,7,false),mt,0,0,0);
 }
 // Complete the side wings: no open voids beside the monumental rear wall.
 // Thick ivory wall sections follow the rear arc endpoints, leaving the front open.
 for(const side of [-1,1]){
   const wing=cube(3.55,12.4,.68,side*14.95,6.2,-11.3,ivory);
   wing.rotation.y=side*.27;
   const trim=cube(3.45,.26,.78,side*14.95,12.48,-11.28,gold);trim.rotation.y=side*.27;
   const foot=cube(3.45,.26,.82,side*14.95,.36,-11.28,stone);foot.rotation.y=side*.27;
 }
 // Sculpt the two formerly blank infill wings as monumental royal masonry, not flat patched boards.
 for(const side of [-1,1]){
   const x=side*14.95;
   const wallPanel=cube(2.85,8.7,.32,x,6.7,-10.80,stone);
   wallPanel.rotation.y=side*.27;
   const centralRelief=cube(1.90,6.45,.28,x,6.45,-10.47,white);
   centralRelief.rotation.y=side*.27;
   const crown=cube(3.05,.72,.48,x,11.35,-10.43,gold);crown.rotation.y=side*.27;
   const plinth=cube(3.10,.74,.44,x,1.1,-10.43,deep);plinth.rotation.y=side*.27;
   for(const dx of [-1.25,1.25]){
     const pier=cube(.38,9.6,.47,x+dx,6.0,-10.38,ivory);pier.rotation.y=side*.27;
     const cap=cube(.67,.37,.55,x+dx,11.0,-10.35,gold);cap.rotation.y=side*.27;
   }
 }
 // Both long lateral walls: bold architectural coffers and broad pilasters, with deep offsets.
 // Large pieces avoid the high-frequency lines that shimmer on iPhone.
 for(const side of [-1,1]){
   const wallX=side*17.45, inward=wallX-side*.30;
   for(const z of [-9,-1,7]){
     const bay=cube(.18,6.25,5.6,inward,5.2,z,stone);
     const panel=cube(.24,4.8,4.05,inward-side*.20,5.3,z,white);
     const medallion=mesh(new T.CylinderGeometry(.83,.83,.18,40),peach,inward-side*.40,6.25,z);
     medallion.rotation.z=Math.PI/2;
     const goldBoss=mesh(new T.CylinderGeometry(.55,.55,.21,40),gold,inward-side*.55,6.25,z);
     goldBoss.rotation.z=Math.PI/2;
   }
   for(const z of [-13,-5,3,11]){
     cube(.48,8.2,.70,inward-side*.18,4.4,z,ivory);
     cube(.63,.48,.95,inward-side*.18,8.5,z,gold);
     cube(.68,.45,1.02,inward-side*.18,.42,z,deep);
   }
 }
 // Deep forward-projecting open-air crown (not a ceiling or suspended light).
 // Curved multi-tier architectural extrusion is deliberately separated in depth.
 for(const [offset,z,rad,mt] of [[.65,-13.86,.32,gold],[.30,-13.64,.22,white],[-.15,-13.45,.15,gold]]){
   const pts=[];
   for(let j=0;j<=84;j++){
    const x=-16.7+33.4*j/84;
    pts.push(new T.Vector3(x,archTop(x)+offset,z));
   }
   mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts),120,rad,10,false),mt,0,0,0);
 }
 // Broad floor inlay, not a full bright-white floor.
 rounded(27,21,2,.045,0,.005,-.7,deep);
 rounded(26.6,20.6,2,.065,0,.07,-.7,gold);
 rounded(26.0,20.0,2,.08,0,.14,-.7,stone);
 // Court bench: substantial crescent front, layered sculpted trim, no dark expanses.
 rounded(23,2.8,1.05,1.95,0,.35,-9.35,orange,'civil');
 rounded(23.2,2.95,1.08,.16,0,2.32,-9.35,gold,'civil');
 rounded(22.85,2.55,1.02,.19,0,2.49,-9.35,white,'civil');
 for(let x of [-9,-5,-1,3,7,10])cube(.09,1.24,.12,x,1.1,-7.91,gold,'civil');
 for(let x of [-5.5,0,5.5])chair(x,-11.45,'civil',Math.PI,velvet,1.48);
 // Both counsel tables face the judge; visitor sees their clear curved profiles.
 table(-7.5,-4.8,7.4,2.1,'civil');table(7.5,-4.8,7.4,2.1,'civil');
 for(let x of [-8.9,-6.2,6.2,8.9])chair(x,-6.25,'civil',Math.PI,peach,1.02);
 // Removed the isolated right-rear desk and chair requested by the owner.
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
 // Two distinctly legible royal service windows: clerk intake and court-fee cashier.
 // Backward shift preserves a usable passage between the independent star and windows.
 for(const [x,kind] of [[-13.7,'intake'],[-8.3,'cashier']]){
  const z=4.7;
  rounded(4.65,2.25,.65,1.5,x,.18,z,orange,'service');
  rounded(4.85,2.45,.65,.17,x,1.75,z,white,'service');
  cube(3.8,.63,.12,x,.85,z+1.19,ivory,'service');
  // Large architectural relief in front, not tiny desk ornaments.
  if(kind==='intake'){
   for(const side of [-1,1]){
    const leaf=cube(1.42,.79,.19,x+side*.77,1.02,z+1.34,white,'service');leaf.rotation.y=side*.13;
    cube(1.28,.085,.22,x+side*.77,.69,z+1.46,gold,'service');
   }
   cube(.18,1.03,.23,x,1.03,z+1.47,gold,'service');
  }else{
   const arch=cube(2.75,1.04,.24,x,1.01,z+1.37,stone,'service');
   for(const dx of [-1.08,1.08])cube(.22,.95,.29,x+dx,1.03,z+1.53,gold,'service');
   cube(2.48,.20,.30,x,1.56,z+1.52,gold,'service');
   const med=cylinder(.37,.37,.18,x,1.10,z+1.60,gold,'service',40);med.rotation.x=Math.PI/2;
  }
  // Oversized readable floating fascia integrated with the counter, not an added desk.
  const label=kind==='intake'?'收狀處':'裁判費收費處';
  if(typeof document!=='undefined'){
   const c=document.createElement('canvas');c.width=1024;c.height=256;
   const ctx=c.getContext('2d');ctx.clearRect(0,0,1024,256);
   ctx.fillStyle='#263B57';ctx.beginPath();ctx.roundRect(12,12,1000,232,34);ctx.fill();
   ctx.strokeStyle='#E8BA60';ctx.lineWidth=16;ctx.stroke();
   ctx.fillStyle='#F9E4C2';ctx.font='bold 118px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,512,130);
   const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;
   mesh(new T.PlaneGeometry(3.55,.88),new T.MeshBasicMaterial({map:tex,transparent:true,side:T.DoubleSide}),x,2.37,z+1.27,'service');
  }
 }
 // Mediation: substantial oval tabletop and six genuinely upholstered chairs.
 let t=cylinder(2.2,2.2,.32,11.1,1.2,3.9,white,'mediation',48);t.scale.set(2,1,.7);let rim=cylinder(2.23,2.23,.11,11.1,1.07,3.9,gold,'mediation',48);rim.scale.set(2,1,.7);let pedestal=cylinder(1.25,1.55,.9,11.1,.56,3.9,deep,'mediation');pedestal.scale.set(1.7,1,.7);
 for(let x of [8.2,10.15,12.05,14]){chair(x,1.85,'mediation',Math.PI,peach,.86);chair(x,6.0,'mediation',0,peach,.86)}
 // US-law: retain original five-point star, replace white cone figure with a bronze sculptural figure.
 const star=new T.Shape();for(let i=0;i<10;i++){let a=-Math.PI/2+i*Math.PI/5,r=i%2?2.65:5.25;let x=Math.cos(a)*r,y=Math.sin(a)*r;if(i===0)star.moveTo(x,y);else star.lineTo(x,y)}star.closePath();
 const starGeo=new T.ExtrudeGeometry(star,{depth:.72,bevelEnabled:true,bevelSize:.15,bevelThickness:.12,bevelSegments:3});starGeo.rotateX(-Math.PI/2);
 mesh(starGeo,orange,-11,.35,12.3,'usa');
 // C: layered royal star stage, inset star raised above the original platform.
 const insetStar=new T.Shape();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=(i%2?2.03:4.12);const xx=Math.cos(a)*r,yy=Math.sin(a)*r;if(!i)insetStar.moveTo(xx,yy);else insetStar.lineTo(xx,yy)}insetStar.closePath();
 const insetGeo=new T.ExtrudeGeometry(insetStar,{depth:.18,bevelEnabled:true,bevelSize:.08,bevelThickness:.04,bevelSegments:2});insetGeo.rotateX(-Math.PI/2);
 mesh(insetGeo,gold,-11,.92,12.3,'usa');
 const starInner=new T.Shape();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=(i%2?1.87:3.83);const xx=Math.cos(a)*r,yy=Math.sin(a)*r;if(!i)starInner.moveTo(xx,yy);else starInner.lineTo(xx,yy)}starInner.closePath();
 const innerGeo=new T.ExtrudeGeometry(starInner,{depth:.09,bevelEnabled:true,bevelSize:.03,bevelThickness:.02,bevelSegments:2});innerGeo.rotateX(-Math.PI/2);
 mesh(innerGeo,peach,-11,1.17,12.3,'usa');
 cylinder(1.20,1.37,.33,-11,1.39,12.3,deep,'usa');
 cylinder(1.09,1.22,.13,-11,1.61,12.3,gold,'usa');
 const statue=new T.Group();statue.position.set(-11,1.78,12.3);statue.rotation.y=0;root.add(statue);
 const bronze=material('#B78A48',.72,.37),bronzeLight=material('#D3AE68',.68,.35),bronzeShadow=material('#81603B',.58,.5);
 function sp(geo,mt,x,y,z){return mesh(geo,mt,x,y,z,'usa',statue)}
 function limb(a,b,r1,r2,mt=bronze){const v1=new T.Vector3(...a),v2=new T.Vector3(...b),v=v2.clone().sub(v1);let m=sp(new T.CylinderGeometry(r2,r1,v.length(),14),mt,...v1.clone().add(v2).multiplyScalar(.5).toArray());m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v.normalize());return m}
 // Folds are modelled in relief rather than painted onto the sculpture.
 const skirt=sp(new T.LatheGeometry([[.48,0],[.65,.18],[.73,.5],[.68,1.0],[.57,1.6],[.46,2.25],[.43,2.65]].map(q=>new T.Vector2(...q)),48),bronze,0,.34,0);
 for(let i=0;i<15;i++){let a=i*Math.PI*2/15,rr=.66;let fold=sp(new T.CylinderGeometry(.032,.09,2.05,7),i%3?bronzeLight:bronzeShadow,Math.cos(a)*rr,1.35,Math.sin(a)*rr);fold.rotation.z=Math.sin(a)*.13;fold.rotation.x=Math.cos(a)*.13}
 const bod=sp(new T.SphereGeometry(.52,28,20),bronze,0,3.08,0);bod.scale.set(1,.98,.65);
 const neck=sp(new T.CylinderGeometry(.16,.19,.34,16),bronzeLight,0,3.72,0);
 // Rebuilt continuous female portrait mesh: anatomically tapered jaw, sculpted brow,
 // integrated nose and lips. No spheres, bead hair, or pasted flat photograph.
 const portrait=new T.BufferGeometry(), pv=[], pi=[];
 const nLat=34,nLon=64;
 for(let j=0;j<=nLat;j++){
   const t=j/nLat, y=3.77+t*.68;
   const jaw=.18+.16*Math.sin(Math.PI*Math.pow(t,.83));
   const taper=1-.25*Math.max(0,(t-.82)/.18);
   for(let k=0;k<=nLon;k++){
     const a=2*Math.PI*k/nLon, xx=jaw*taper*Math.cos(a);
     const front=Math.max(0,Math.sin(a));
     let zz=.012+(.21+.025*Math.sin(Math.PI*t))*Math.sin(a);
     // Nose ridge is raised as part of the same continuous facial surface.
     const ridge=Math.exp(-Math.pow(xx/.065,2));
     const noseProfile=Math.exp(-Math.pow((t-.43)/.15,2));
     zz+=front*ridge*noseProfile*.12;
     // Small integrated lips and softly sculpted cheekbones.
     zz+=front*Math.exp(-Math.pow((t-.245)/.047,2))*Math.exp(-Math.pow(xx/.12,2))*.028;
     zz+=front*Math.exp(-Math.pow((t-.52)/.20,2))*Math.exp(-Math.pow((Math.abs(xx)-.19)/.10,2))*.023;
     pv.push(xx,y,zz);
   }
 }
 for(let j=0;j<nLat;j++)for(let k=0;k<nLon;k++){
   const a=j*(nLon+1)+k,b=a+nLon+1;pi.push(a,b,a+1,b,b+1,a+1);
 }
 portrait.setAttribute('position',new T.Float32BufferAttribute(pv,3));portrait.setIndex(pi);portrait.computeVertexNormals();
 sp(portrait,new T.MeshStandardMaterial({color:'#C6A05D',metalness:.58,roughness:.46,side:T.DoubleSide}),0,0,0);
 // Blindfold: wide, sculpted satin ribbon across the eye line, not a cylindrical bar.
 const blindShape=new T.BufferGeometry(),bv=[],bi=[];
 for(let i=0;i<=30;i++){
   const a=-1.30+i*2.60/30;
   for(const dy of [-.055,.055]){
     bv.push(.32*Math.sin(a),4.12+dy+.018*Math.cos(a*2),.225*Math.cos(a)+.06);
   }
   if(i<30){const v=i*2;bi.push(v,v+1,v+2,v+1,v+3,v+2)}
 }
 blindShape.setAttribute('position',new T.Float32BufferAttribute(bv,3));blindShape.setIndex(bi);blindShape.computeVertexNormals();
 sp(blindShape,new T.MeshStandardMaterial({color:'#99753F',metalness:.5,roughness:.5,side:T.DoubleSide}),0,0,0);
 // Sculpted wavy locks: broad swept ribbons, not a row of gold beads.
 for(let i=0;i<13;i++){
   const a=-Math.PI+.16+i*(Math.PI*1.84)/12;
   const ribbon=[],faces=[];
   for(let j=0;j<=18;j++){
     const t=j/18,rad=.29+.022*Math.sin(t*11+i),yy=4.43-.53*t+.022*Math.sin(t*12+i);
     for(const da of [-.085,.085])ribbon.push(Math.sin(a+da)*rad,yy,Math.cos(a+da)*rad-.035);
     if(j<18){const v=2*j;faces.push(v,v+2,v+1,v+1,v+2,v+3)}
   }
   const hair=new T.BufferGeometry();hair.setAttribute('position',new T.Float32BufferAttribute(ribbon,3));hair.setIndex(faces);hair.computeVertexNormals();
   sp(hair,i%3?bronze:bronzeLight,0,0,0);
 }
 for(let i=0;i<5;i++){
   const pts=[];for(let j=0;j<=18;j++){const t=j/18;pts.push(new T.Vector3(.28+i*.022+.025*Math.sin(t*12+i),4.22-t*.86,.06+.07*Math.cos(t*9+i)))}
   sp(new T.TubeGeometry(new T.CatmullRomCurve3(pts),28,.017,6,false),bronzeLight,0,0,0);
 }
 // Diagonal draped gown with curved fabric ridges, no flashing surface textures.
 for(let i=0;i<17;i++){
  const a=i*2*Math.PI/17;
  const pts=[];
  for(let j=0;j<=10;j++){
   const t=j/10,rad=.44+.24*t;
   pts.push(new T.Vector3(Math.cos(a+.22*t)*rad,2.5-2.04*t,Math.sin(a+.22*t)*rad));
  }
  sp(new T.TubeGeometry(new T.CatmullRomCurve3(pts),12,.018+(i%3)*.005,5,false),i%3?bronzeLight:bronzeShadow,0,0,0);
 }
 // Braided belt knot and hanging folds on the right hip.
 sp(new T.SphereGeometry(.13,12,9),bronzeLight,.46,2.63,.20);
 for(let i=0;i<3;i++)limb([.48+i*.045,2.58,.20],[.53+i*.10,1.86-i*.20,.20],.025,.012,bronzeLight);
 // Raised left arm supports a detailed crossbar with two suspended dishes.
 limb([-.35,3.38,0],[-.70,3.83,.02],.16,.13);limb([-.70,3.83,.02],[-.88,4.65,.04],.13,.095);
 sp(new T.SphereGeometry(.12,14,10),bronzeLight,-.88,4.69,.04);
 limb([-.88,4.68,.04],[-.88,5.32,.04],.055,.045,bronzeLight);
 limb([-1.93,4.63,.04],[.16,4.63,.04],.045,.045,bronzeLight);
 for(const xx of [-1.76,-.02]){for(const delta of [-.24,.24])limb([xx+delta,4.62,.04],[xx+delta,4.03,.04],.014,.014,bronzeShadow);let pan=sp(new T.CylinderGeometry(.32,.17,.09,24),bronzeLight,xx,3.99,.04);pan.scale.z=.65}
 // Right arm and downward sword, including guard and blade.
 limb([.34,3.36,0],[.65,2.93,.05],.16,.125);limb([.65,2.93,.05],[.85,2.28,.08],.125,.095);
 sp(new T.SphereGeometry(.12,12,10),bronzeLight,.86,2.25,.08);
 limb([.88,2.31,.08],[1.05,.55,.08],.065,.015,bronzeLight);
 limb([.58,2.19,.08],[1.17,2.19,.08],.05,.05,bronzeShadow);
 // Pleated shoulder sash and waist belt.
 for(let i=0;i<5;i++)limb([-.38+i*.09,3.43,.30],[.17+i*.05,2.72,.39],.018,.035,bronzeLight);
 const belt=sp(new T.TorusGeometry(.48,.06,8,38),bronzeShadow,0,2.65,0);belt.rotation.x=Math.PI/2;
 // Sculpted pedestal sits on original star, no additional platform footprint.
 sp(new T.BoxGeometry(1.45,.22,1.03),bronzeShadow,0,.25,0);
 // Reception: single bold curved sculptural piece, no tiny desk accessories.
 rounded(8.2,2.7,1.15,1.65,10.6,.22,12.0,orange,'reception');
 rounded(8.35,2.8,1.2,.16,10.6,1.94,12.0,gold,'reception');
 rounded(8.15,2.62,1.13,.19,10.6,2.13,12.0,white,'reception');
 rounded(7.6,.22,.1,.14,10.6,1.0,13.46,gold,'reception');

 // Monumental royal wall relief: fewer broad pilasters, deep framed bays, sculpted capitals.
 // Decorations have intentional depth separation; no coplanar surfaces or animated lights.
 for(let i=0;i<13;i++){
  const a=Math.PI*.12+Math.PI*.76*i/12;
  const x=Math.cos(a)*12.9,z=-9.3-Math.sin(a)*5.1;
  const h=archTop(x);
  const p=new T.Group();p.position.set(x,0,z);p.rotation.y=Math.PI/2-a;root.add(p);
  const part=(w,hh,d,px,py,pz,mt)=>mesh(new T.BoxGeometry(w,hh,d),mt,px,py,pz,null,p);
  part(.48,h-.55,.32,0,(h-.55)/2,.62,white);
  part(.70,.27,.49,0,h-.53,.65,gold);
  part(.96,.20,.55,0,h-.29,.68,ivory);
  part(.72,.14,.53,0,h-.09,.68,gold);
  part(.83,.30,.47,0,.44,.65,gold);
  for(const dx of [-.20,.20])part(.055,Math.max(1,h-2.3),.07,dx,h/2,.82,gold);
 }
 // Arched recessed panels between columns: framed raised relief, restrained and flicker-free.
 for(let i=0;i<12;i++){
  const a=Math.PI*.12+Math.PI*.76*(i+.5)/12;
  const x=Math.cos(a)*12.9,z=-9.3-Math.sin(a)*5.1;
  const g=new T.Group();g.position.set(x,0,z);g.rotation.y=Math.PI/2-a;root.add(g);
  const part=(w,h,d,xx,yy,zz,mt)=>mesh(new T.BoxGeometry(w,h,d),mt,xx,yy,zz,null,g);
  part(1.15,6.55,.12,0,5.2,.46,stone);
  for(const dx of [-.58,.58])part(.085,6.8,.15,dx,5.25,.56,gold);
  part(1.22,.10,.16,0,8.7,.57,gold);
  part(1.22,.11,.16,0,1.78,.57,gold);
  part(.87,4.95,.10,0,5.15,.58,ivory);
  part(.68,.09,.13,0,7.68,.68,gold);
  part(.68,.09,.13,0,2.63,.68,gold);
 }
 // Three substantial tiers behind the judge, without changing bench dimensions.
 rounded(23.6,3.05,1.08,.18,0,.14,-9.35,gold,'civil');
 for(const yy of [1.0,1.43]){
  for(let x=-10.4;x<=10.4;x+=2.08)cube(1.15,.13,.11,x,yy,-7.85,gold,'civil');
 }
 // Curved judge-dais face relief, layered sculpted ribs with visible spacing.
 for(const x of [-9.7,-6.7,-3.7,-.7,2.3,5.3,8.3]){
   cube(.11,1.05,.11,x,1.0,-7.85,gold,'civil');
   cube(1.65,.10,.14,x,1.72,-7.82,white,'civil');
 }
 // Genuine unchanged official image on a locally contrasting terracotta backing.
 // Plane faces the entrance (+Z); preserve the official white-backed artwork without recoloring.
 const logoGroup=new T.Group();logoGroup.position.set(0,14.0,-12.85);root.add(logoGroup);
 const backing=material('#995B57',.05,.87);
 mesh(new T.BoxGeometry(7.8,5.4,.28),gold,0,0,0,'civil',logoGroup);
 mesh(new T.BoxGeometry(7.48,5.06,.10),backing,0,0,.22,'civil',logoGroup);
 const official=new T.TextureLoader().load('./office-logo-transparent.png');official.colorSpace=T.SRGBColorSpace;
 const officialMat=new T.MeshBasicMaterial({map:official,transparent:true,side:T.DoubleSide,depthWrite:false});
 mesh(new T.PlaneGeometry(5.10,5.10),officialMat,0,0,.31,'civil',logoGroup);
 // Upholstery detailing follows original chair positions, without additional seats in the courtroom.
 function seatFinish(x,z,face,sc,zone){
  const g=new T.Group();g.position.set(x,0,z);g.rotation.y=face;g.scale.setScalar(sc);root.add(g);
  const part=(geo,mt,px,py,pz)=>mesh(geo,mt,px,py,pz,zone,g);
  part(new T.BoxGeometry(.93,1.24,.085),velvet,0,1.75,.66);
  for(const dx of [-.48,.48])part(new T.BoxGeometry(.075,1.45,.10),gold,dx,1.76,.68);
  part(new T.BoxGeometry(.90,.075,.09),gold,0,2.47,.68);
  part(new T.BoxGeometry(.86,.08,.80),white,0,1.04,-.015);
 }
 for(const x of [-5.5,0,5.5])seatFinish(x,-11.45,Math.PI,1.48,'civil');
 for(const x of [-8.9,-6.2,6.2,8.9])seatFinish(x,-6.25,Math.PI,1.02,'civil');
 
 for(const x of [8.2,10.15,12.05,14]){seatFinish(x,1.85,Math.PI,.86,'mediation');seatFinish(x,6,0,.86,'mediation')}
 // Reception counter remains exactly v351 dimensions (8.2 x 2.7) and position.
 // Its sole staff chair faces the visitor (+Z), and sits on the staff side (negative Z).
 chair(10.6,9.94,'reception',Math.PI,velvet,.80);
 seatFinish(10.6,9.94,Math.PI,.80,'reception');
 // No additional round table or loose chairs beside the reception counter.
 // Service counter seats are positioned behind existing counters, not in the walking lane.
 for(const x of [-13.7,-8.3])chair(x,2.9,'service',Math.PI,peach,.65);
 // Five monumental, single-purpose silhouettes: clearly readable at mobile entrance distance.
 // The objects are kept away from chair paths and remain within their own tabletop footprints.
 function rodBetween(a,b,r,mt,zone){
  const p=new T.Vector3(...a),q=new T.Vector3(...b),d=q.clone().sub(p);
  const m=mesh(new T.CylinderGeometry(r,r,d.length(),16),mt,...p.clone().add(q).multiplyScalar(.5).toArray(),zone);
  m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return m;
 }
 // Mediation: a single oversized pair of interlocking clasped hands, not a stack of files.
 {
  const z=3.9,y=1.58;
  rodBetween([9.85,y, z],[10.84,y+.35,z],.25,gold,'mediation');
  rodBetween([12.35,y,z],[11.36,y+.35,z],.25,gold,'mediation');
  const a=sphere(.43,10.93,y+.42,z,gold,'mediation');a.scale.set(1.35,.64,.9);
  const b=sphere(.43,11.28,y+.42,z,white,'mediation');b.scale.set(1.35,.64,.9);
  for(let k=0;k<3;k++)rodBetween([10.90,y+.48,z-.28+k*.27],[11.39,y+.42,z-.28+k*.27],.065,gold,'mediation');
 }
 // Reception: one oversized domed service bell, readable by its button and dome profile.
 {
  const x=10.6,z=12.0;
  cylinder(.83,.94,.16,x,2.55,z,gold,'reception',48);
  const dome=sphere(.82,x,2.78,z,gold,'reception');dome.scale.y=.55;
  cylinder(.17,.17,.28,x,3.29,z,deep,'reception');sphere(.24,x,3.48,z,gold,'reception');
 }
 // Counsel desks: one freestanding convex shield on each, broad shield outline facing entrance.
 function counselShield(x){
  const shape=new T.Shape();shape.moveTo(-1.18,1.16);shape.lineTo(1.18,1.16);
  shape.quadraticCurveTo(1.32,.28,.92,-.37);shape.quadraticCurveTo(.45,-.94,0,-1.25);
  shape.quadraticCurveTo(-.45,-.94,-.92,-.37);shape.quadraticCurveTo(-1.32,.28,-1.18,1.16);
  const g=new T.ExtrudeGeometry(shape,{depth:.22,bevelEnabled:true,bevelThickness:.09,bevelSize:.09,bevelSegments:2,curveSegments:12});
  const shield=mesh(g,gold,x,2.82,-4.67,'civil');shield.rotation.x=-.07;
  const face=mesh(new T.ShapeGeometry(shape,16),peach,x,2.82,-4.33,'civil');face.scale.set(.79,.79,1);
  // Strong three-dimensional central scale of justice, deliberately thick and simple.
  rodBetween([x,2.38,-4.17],[x,3.28,-4.17],.065,deep,'civil');
  rodBetween([x-.64,3.12,-4.17],[x+.64,3.12,-4.17],.065,deep,'civil');
  for(const dx of [-.49,.49]){
   rodBetween([x+dx,3.12,-4.17],[x+dx,2.83,-4.17],.035,deep,'civil');
   const pan=mesh(new T.ConeGeometry(.26,.16,24),white,x+dx,2.78,-4.17,'civil');pan.rotation.z=Math.PI;
  }
 }
 counselShield(-7.5);counselShield(7.5);
 // Judge dais: single monumental diagonal gavel and thick sound block, on the front right.
 {
  const x=7.8,z=-9.2;
  cylinder(1.05,1.12,.22,x,2.84,z,gold,'civil',48);
  cylinder(.82,.86,.17,x,3.02,z,deep,'civil',48);
  rodBetween([x-.85,3.25,z+.1],[x+1.05,4.26,z+.1],.17,deep,'civil');
  const head=rodBetween([x+.72,4.56,z+.1],[x+1.37,3.97,z+.1],.46,gold,'civil');
  head.material=gold;
 }
 // Bronze Lady Justice is a detailed procedural approximation, not a photo-identical scan.
 return {targets};
}
