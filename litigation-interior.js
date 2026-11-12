// v438 - luxury detailing and circulation courthouse, procedural 3D only; no AI images, no floating signs.
export function createLitigationInterior(root,T){
 const targets=[];
 const mat=(c,metal=0,rough=.8)=>new T.MeshStandardMaterial({color:c,metalness:metal,roughness:rough,side:T.DoubleSide});
 const sand=mat('#CDAE91'),floor=mat('#D7BDA5'),wall=mat('#D9B49C'),inset=mat('#C58F78'),peach=mat('#D99A83'),coral=mat('#D78C77'),ivory=mat('#EAD4B8'),gold=mat('#C9A26B',.33,.56),line=mat('#47546B'),bronze=mat('#AD8865',.28,.6),robe=mat('#D7C1A4');
 function add(geo,m,x=0,y=0,z=0,zone=null,parent=root){const o=new T.Mesh(geo,m);o.position.set(x,y,z);parent.add(o);if(zone){o.userData.litigationZone=zone;targets.push(o)}return o}
 function box(w,h,d,x,y,z,m,zone){return add(new T.BoxGeometry(w,h,d),m,x,y,z,zone)}
 function ell(rx,ry,rz,x,y,z,m,zone,parent=root){let o=add(new T.SphereGeometry(1,28,18),m,x,y,z,zone,parent);o.scale.set(rx,ry,rz);return o}
 function cyl(r1,r2,h,x,y,z,m,zone,n=40,parent=root){return add(new T.CylinderGeometry(r1,r2,h,n),m,x,y,z,zone,parent)}
 function curve(points,r,m,zone,segments=64){return add(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),segments,r,8,false),m,0,0,0,zone)}
 function rounded(w,d,r,h,x,y,z,m,zone){const sh=new T.Shape();sh.moveTo(-w/2+r,-d/2);sh.lineTo(w/2-r,-d/2);sh.quadraticCurveTo(w/2,-d/2,w/2,-d/2+r);sh.lineTo(w/2,d/2-r);sh.quadraticCurveTo(w/2,d/2,w/2-r,d/2);sh.lineTo(-w/2+r,d/2);sh.quadraticCurveTo(-w/2,d/2,-w/2,d/2-r);sh.lineTo(-w/2,-d/2+r);sh.quadraticCurveTo(-w/2,-d/2,-w/2+r,-d/2);const g=new T.ExtrudeGeometry(sh,{depth:h,bevelEnabled:true,bevelSize:.065,bevelThickness:.045,bevelSegments:3,curveSegments:12});g.rotateX(-Math.PI/2);return add(g,m,x,y,z,zone)}
 function chair(x,z,zone,angle=0,scale=1){
 const g=new T.Group();g.position.set(x,0,z);g.rotation.y=angle;g.scale.setScalar(scale);root.add(g);
 const part=(geo,m,x,y,z)=>add(geo,m,x,y,z,zone,g);
 // Turned pedestal, splayed feet, thick upholstered seat and layered sculpted back.
 part(new T.CylinderGeometry(.32,.44,.16,32),bronze,0,.20,0);
 for(let k=0;k<5;k++){let a=k*Math.PI*2/5;let foot=part(new T.SphereGeometry(1,16,12),gold,Math.cos(a)*.42,.18,Math.sin(a)*.42);foot.scale.set(.31,.095,.12);foot.rotation.y=-a}
 part(new T.CylinderGeometry(.13,.19,.67,20),gold,0,.59,0);
 let shell=part(new T.SphereGeometry(1,32,24),gold,0,1.07,0);shell.scale.set(.78,.23,.64);
 let seat=part(new T.SphereGeometry(1,32,24),ivory,0,1.15,-.04);seat.scale.set(.7,.21,.57);
 let backFrame=part(new T.SphereGeometry(1,32,24),bronze,0,2.03,.52);backFrame.scale.set(.81,1.12,.19);backFrame.rotation.x=-.12;
 let back=part(new T.SphereGeometry(1,32,24),peach,0,2.02,.33);back.scale.set(.70,1.01,.17);back.rotation.x=-.12;
 let inner=part(new T.SphereGeometry(1,32,24),ivory,0,2.06,.19);inner.scale.set(.52,.81,.065);inner.rotation.x=-.12;
 let crest=part(new T.SphereGeometry(1,24,16),gold,0,3.09,.48);crest.scale.set(.27,.13,.13);
 for(let d of [-1,1]){
   part(new T.CylinderGeometry(.09,.13,.68,16),bronze,d*.69,.87,.07);
   let arm=part(new T.SphereGeometry(1,20,12),peach,d*.69,1.39,-.03);arm.scale.set(.15,.12,.60);
   part(new T.SphereGeometry(.13,14,10),gold,d*.69,1.4,-.58);
 }
 return g}
 function desk(x,z,w,d,zone){
 rounded(w,d,.55,1.1,x,.08,z,inset,zone);
 rounded(w+.18,d+.16,.55,.12,x,1.23,z,gold,zone);
 rounded(w,d,.55,.18,x,1.37,z,ivory,zone);
 rounded(w*.91,.18,.09,.1,x,.75,z+d*.48,peach,zone);
 curve([[x-w*.43,.45,z+d*.51],[x,.45,z+d*.56],[x+w*.43,.45,z+d*.51]],.07,gold,zone);
 for(let j=-Math.floor(w/.55/2);j<=Math.floor(w/.55/2);j++){
   let xx=x+j*.55;if(Math.abs(xx-x)>w*.44)continue;
   box(.055,.67,.045,xx,.77,z+d*.5+.03,gold,zone);
 }
 for(let d2 of [-1,1])ell(.19,.65,.24,x+d2*(w*.45),.65,z,bronze,zone);
 }
 // Matte sandstone flooring, gentle warm contrast; dark pigment only as thin accents.
 box(35,.32,30,0,-.26,0,floor);
 for(let x of [-17.35,17.35])box(.3,9.3,30,x,4.65,0,wall);
 // The giant semicircular back wall is a continuous architectural envelope.
 const R=14.5,zc=-7.7,N=64;
 for(let i=0;i<N;i++){let a=Math.PI*.06+(Math.PI*.88)*(i+.5)/N;let x=R*Math.cos(a),z=zc-6.5*Math.sin(a);let w=R*Math.PI*.88/N+.065;let panel=box(w,10.2,.45,x,5.1,z,wall);panel.rotation.y=Math.PI/2-a;}
 for(let i=0;i<=12;i++){let a=Math.PI*.06+Math.PI*.88*i/12,x=R*Math.cos(a),z=zc-6.5*Math.sin(a);cyl(.32,.38,9.25,x,4.63,z,ivory);cyl(.47,.47,.27,x,9.2,z,gold);cyl(.45,.48,.34,x,.2,z,bronze)}
 for(let y of [8.2,9.35]){const ps=[];for(let i=0;i<=90;i++){let a=Math.PI*.06+Math.PI*.88*i/90;ps.push([R*Math.cos(a),y,zc-6.5*Math.sin(a)])}curve(ps,.16,gold)}

 // Royal architectural wall finish: recessed panels, continuous mouldings, concealed warm light; no pole/ball sconces.
 const glow=mat('#F3D7A8',.05,.86),panel=mat('#E8CBB2'),shade=mat('#B98774');
 for(let side of [-1,1]){
   for(let j=0;j<5;j++){
     const z=-10.8+j*4.35;
     box(.08,6.7,3.25,side*17.08,4.55,z,panel);
     box(.11,.09,3.25,side*17.01,7.95,z,gold);
     box(.11,.08,3.25,side*17.01,1.2,z,gold);
     for(let edge of [-1,1])box(.1,6.65,.075,side*17.0,4.5,z+edge*1.52,gold);
     box(.095,.045,3.1,side*16.98,7.77,z,glow);
     box(.1,4.8,2.4,side*16.94,4.48,z,shade);
     box(.12,4.65,2.24,side*16.9,4.48,z,panel);
   }
 }
 // Tall upper cornice and continuous recessed lighting in place of wall-mounted lamps.
 for(let side of [-1,1]){
   box(.4,.24,29.4,side*17.1,8.65,0,gold);
   box(.16,.055,29.0,side*16.92,8.36,0,glow);
 }
 // Crown moulding and reliefs on the semicircular rear court envelope.
 for(let i=0;i<24;i++){
   const a=Math.PI*.06+Math.PI*.88*(i+.5)/24;
   const x=14.5*Math.cos(a),z=-7.7-6.5*Math.sin(a);
   let relief=box(.34,4.8,.16,x,5.5,z,ivory);relief.rotation.y=Math.PI/2-a;
   let reliefGold=box(.43,.12,.19,x,7.92,z,gold);reliefGold.rotation.y=Math.PI/2-a;
 }
 // Architectural overhead arch that visually wraps around the full courtroom, not floor scribbles.
 for(let i=0;i<3;i++){let ps=[];for(let k=0;k<=50;k++){let a=Math.PI*k/50;ps.push([-11+i*1.4+22*Math.sin(a),8.8+2.4*Math.sin(a),-12.6+i*.95])}curve(ps,.16,i===1?ivory:gold)}
 // Official logo mounted on the rear focal wall; original file, never redrawn.
 const logoTexture=new T.TextureLoader().load('./office-logo-transparent.png');
 logoTexture.colorSpace=T.SRGBColorSpace;
 const logoPanel=add(new T.PlaneGeometry(4.8,4.8),new T.MeshBasicMaterial({map:logoTexture,transparent:true,side:T.DoubleSide,depthWrite:false}),0,10.3,-13.83);
 logoPanel.renderOrder=2;
 // Central raised judge's crescent, richly layered and generously sized.
 rounded(21,3.15,1.3,1.95,0,.08,-11.0,inset,'civil');rounded(21.2,3.2,1.3,.16,0,2.1,-11.0,gold,'civil');rounded(20.9,2.98,1.25,.18,0,2.28,-11.0,ivory,'civil');
 for(let x of [-7.4,-4.4,-1.4,1.6,4.6,7.6])box(.085,1.2,.09,x,1.0,-9.36,gold,'civil');
 for(let x of [-5,0,5])chair(x,-12.35,'civil',Math.PI,1.22);
 // Counsel and parties side-by-side, desks face the judge.
 desk(-7,-5.9,7.1,2.1,'civil');desk(7,-5.9,7.1,2.1,'civil');for(let x of [-8.25,-5.7,5.7,8.25])chair(x,-7.65,'civil',0,.85);
 desk(12.7,-10,2.4,1.4,'civil');chair(12.7,-11.6,'civil',0,.72);
 // Three court instances: ONE sculptural crescent console with three oversized medallions.
 rounded(11.3,2.3,1.05,1.18,0,.08,-1.1,peach,'hierarchy');rounded(11.45,2.45,1.05,.13,0,1.3,-1.1,gold,'hierarchy');rounded(11.15,2.2,1.02,.16,0,1.45,-1.1,ivory,'hierarchy');
 // Clear large type is embedded in the medallions; not overhead facility signage.
 function label(t,x,y,z){const c=document.createElement('canvas');c.width=512;c.height=256;const ctx=c.getContext('2d');ctx.clearRect(0,0,512,256);ctx.fillStyle='#684C42';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 142px "Noto Sans TC", sans-serif';ctx.fillText(t,256,132);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;let p=add(new T.PlaneGeometry(2.25,1.2),new T.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:T.DoubleSide}),x,y,z,'hierarchy');return p}
 for(const [x,t] of [[-3.5,'一審'],[0,'二審'],[3.5,'三審']]){cyl(1.18,1.18,.18,x,2.83,-.9,gold,'hierarchy',56).rotation.x=Math.PI/2;cyl(1.05,1.05,.2,x,2.83,-.76,ivory,'hierarchy',56).rotation.x=Math.PI/2;label(t,x,2.83,-.62)}
 // Court service counter, front faces visitor.
 desk(-11.7,5.0,7.2,2.1,'service');for(let x of [-13.2,-10])chair(x,3.6,'service',0,.7);
 // Mediation: sculpted oval table and six substantial upholstered chairs.
 const mt=cyl(2.3,2.3,.28,11,1.35,5.0,ivory,'mediation',56);mt.scale.set(1.85,1,.78);const edge=cyl(2.35,2.35,.12,11,1.24,5.0,gold,'mediation',56);edge.scale.set(1.85,1,.78);cyl(1.05,1.3,1.1,11,.58,5.0,inset,'mediation',40).scale.set(1.5,1,.9);for(let x of [8.4,10.4,12.4]){chair(x,2.55,'mediation',Math.PI,.77);chair(x,7.45,'mediation',0,.77)}
 // Lady Justice: full-size articulated figurative silhouette, five-point star plinth.
 const star=new T.Shape();for(let i=0;i<10;i++){let a=-Math.PI/2+i*Math.PI/5,r=i%2?2.45:4.15;let x=r*Math.cos(a),y=r*Math.sin(a);if(i===0)star.moveTo(x,y);else star.lineTo(x,y)}star.closePath();const sg=new T.ExtrudeGeometry(star,{depth:.55,bevelEnabled:true,bevelSize:.14,bevelThickness:.1,bevelSegments:3});sg.rotateX(-Math.PI/2);add(sg,peach,-11,.35,11.1,'usa');
 const fig=new T.Group();fig.position.set(-11,.85,11.1);root.add(fig);const f=(g,m,x,y,z)=>add(g,m,x,y,z,'usa',fig);
 f(new T.CylinderGeometry(.46,1.0,3.25,32),robe,0,2.15,0);for(let i=0;i<9;i++){let a=i*Math.PI*2/9;let fl=f(new T.SphereGeometry(1,16,12),ivory,Math.sin(a)*.7,1.5,Math.cos(a)*.7);fl.scale.set(.23,1.32,.22)}
 let torso=f(new T.SphereGeometry(1,28,18),robe,0,3.76,0);torso.scale.set(.76,.9,.43);let neck=f(new T.CylinderGeometry(.19,.23,.45,20),robe,0,4.48,0);let head=f(new T.SphereGeometry(1,32,24),ivory,0,4.93,0);head.scale.set(.47,.61,.42);let hair=f(new T.SphereGeometry(1,24,18),bronze,0,5.18,-.15);hair.scale.set(.49,.47,.36);
 let blind=f(new T.BoxGeometry(.98,.14,.12),gold,0,5.0,.39);blind.rotation.z=-.07;
 function limb(a,b,r,m){const v=new T.Vector3(...a),w=new T.Vector3(...b),d=w.clone().sub(v),o=f(new T.CylinderGeometry(r*.78,r,d.length(),14),m,...v.clone().add(w).multiplyScalar(.5).toArray());o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize())}
 limb([-.55,4.18,0],[-1.15,4.45,0],.22,robe);limb([-1.15,4.45,0],[-1.35,5.4,0],.16,ivory);limb([.55,4.18,0],[1.05,3.55,0],.22,robe);limb([1.05,3.55,0],[1.1,2.75,0],.16,ivory);
 // Scales: clear crossbar, chains and two broad pans.
 limb([-2.65,5.65,0],[-.05,5.65,0],.055,gold);limb([-1.35,5.35,0],[-1.35,6.0,0],.05,gold);for(let x of [-2.4,-.3]){limb([x,5.65,0],[x,4.85,0],.027,gold);const pan=f(new T.CylinderGeometry(.42,.25,.12,32),gold,x,4.82,0)}
 // Sword in lowered right hand.
 limb([1.1,3.1,.1],[1.7,1.05,.1],.065,bronze);limb([.88,3.12,.1],[1.34,3.12,.1],.075,gold);
 // Reception: elegant substantial one-piece crescent; no small unreadable clutter.
 rounded(6.0,2.2,1.0,1.45,11.5,.1,11.4,coral,'reception');rounded(6.15,2.35,1.0,.13,11.5,1.61,11.4,gold,'reception');rounded(6.0,2.2,1.0,.17,11.5,1.75,11.4,ivory,'reception');curve([[9.0,.7,12.56],[11.5,.7,12.66],[14.0,.7,12.56]],.08,gold,'reception');

 // Reception: one additional luxury operator chair, tucked behind the counter.
 chair(11.5,10.05,'reception',Math.PI,.69);
 // Existing reception round-table setting retained in compact wall-side niche.
 cyl(.86,.86,.13,15.0,1.20,8.85,ivory,'reception',40);
 cyl(.90,.90,.07,15.0,1.13,8.85,gold,'reception',40);
 cyl(.19,.26,1.03,15.0,.56,8.85,bronze,'reception',24);
 chair(15.0,7.38,'reception',0,.57);
 // Fine architectural fascia: no textured marble, no flickering lights, no coplanar gold strips.
 for(let x of [-7.4,-4.4,-1.4,1.6,4.6,7.6]){
   box(.15,.7,.13,x,.95,-9.28,ivory,'civil');
   box(.20,.09,.15,x,1.32,-9.23,gold,'civil');
 }
 // Dedicated subdued, steady accent light: constant intensity, no animation.
 const royalLight=new T.PointLight(0xFFE6C6,1.0,24,2);royalLight.position.set(0,10,-8);root.add(royalLight);
 return {targets};
}
