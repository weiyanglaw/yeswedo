// WEIYANG standalone castle module. Does not load the legacy castle GLB.
export function createNewFairytaleCastle(parent,THREE){
 const C=new THREE.Group();parent.add(C);
 const wall=new THREE.MeshBasicMaterial({color:'#FFF0D7',side:THREE.DoubleSide});
 const wallLight=new THREE.MeshBasicMaterial({color:'#FFF1D8',side:THREE.DoubleSide});
 const trim=new THREE.MeshStandardMaterial({color:'#E6C681',roughness:.55,metalness:.12});
 const blueRoof=new THREE.MeshBasicMaterial({color:'#3C86C6'});
 const darkBlue=new THREE.MeshStandardMaterial({color:'#12355D',roughness:.75,side:THREE.DoubleSide});
 const doorMat=new THREE.MeshStandardMaterial({color:'#9A6339',roughness:.78});
 const glass=new THREE.MeshStandardMaterial({color:'#FFDB8C',emissive:'#E7A750',emissiveIntensity:.20,roughness:.5});
 const green=new THREE.MeshStandardMaterial({color:'#70B879',roughness:.9});
 const cyl=(rt,rb,h,x,y,z,mat,seg=40)=>{const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg),mat);o.position.set(x,y,z);C.add(o);return o};
 const block=(w,h,d,x,y,z,mat)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);o.position.set(x,y,z);C.add(o);return o};
 const ball=(r,x,y,z,mat)=>{const o=new THREE.Mesh(new THREE.SphereGeometry(r,20,16),mat);o.position.set(x,y,z);C.add(o);return o};
 const flagTexture=new THREE.TextureLoader().load('office-logo-transparent.png');flagTexture.colorSpace=THREE.SRGBColorSpace;
 const tower=(x,z,r,bodyH,roofH,flag=false,main=false)=>{
   cyl(r,r+.10,bodyH,x,bodyH/2+.7,z,wall,48);
   cyl(r+.23,r+.23,.32,x,bodyH+.72,z,trim,48);
   cyl(r+.18,r+.18,.25,x,bodyH*.30,z,trim,48);
   const cone=new THREE.Mesh(new THREE.ConeGeometry(r+0.50,roofH,48),blueRoof);
   cone.position.set(x,bodyH+.86+roofH/2,z);C.add(cone);
   cyl(.10,.10,.35,x,bodyH+.86+roofH+.14,z,trim,16);
   ball(.19,x,bodyH+.86+roofH+.37,z,trim);
   // Warm glowing arched tower window on forward face
   block(.72,1.15,.10,x,bodyH*.55,z+r+.06,glass);
   const winTop=new THREE.Mesh(new THREE.SphereGeometry(.36,20,12,0,Math.PI*2,0,Math.PI/2),glass);
   winTop.position.set(x,bodyH*.55+.56,z+r+.07);C.add(winTop);
   if(flag){
      const tip=bodyH+.86+roofH+.32;
      const poleH=main?2.6:2.0;
      cyl(.055,.055,poleH,x,tip+poleH/2,z,trim,12);
      const bannerW=main?1.85:1.45,bannerH=main?1.35:1.08;
      const banner=new THREE.Mesh(new THREE.PlaneGeometry(bannerW,bannerH),new THREE.MeshBasicMaterial({color:'#102F58',side:THREE.DoubleSide}));
      banner.position.set(x+bannerW/2,tip+poleH-.62,z+.04);C.add(banner);
      const tex=flagTexture;
      const emblem=new THREE.Mesh(new THREE.PlaneGeometry(bannerH*.87,bannerH*.87),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:THREE.DoubleSide}));
      emblem.position.set(x+bannerW/2,tip+poleH-.62,z+.06);C.add(emblem);
   }
 };
 // Continuous castle mass: no dark black/coffee facade or floating pieces.
 block(13.3,8.5,6.8,0,4.95,-1.1,wall);
 block(14.0,.45,7.4,0,9.38,-1.1,trim);
 block(12.4,.35,7.1,0,8.75,-1.1,wallLight);
 block(10.4,2.0,4.7,0,9.55,-1.9,wallLight);
 block(10.9,.3,5.0,0,10.55,-1.9,trim);
 // Side turret roofs are physically connected to their bodies.
 tower(-6.5,-.4,1.85,8.2,3.0,true);
 tower( 6.5,-.4,1.85,8.2,3.0,false);
 tower(-4.15,-3.4,1.95,10.4,3.7,true);
 tower( 4.15,-3.4,1.95,10.4,3.7,true);
 tower(0,-4.1,2.35,13.0,4.5,true,true);
 // Lower symmetrical small front turrets
 tower(-8.4,1.25,1.35,6.2,2.35,false);
 tower( 8.4,1.25,1.35,6.2,2.35,false);
 // Central doorway and golden arch, clearly open approach
 block(4.3,4.5,.25,0,2.9,2.55,trim);
 block(3.72,4.05,.24,0,2.83,2.78,doorMat);
 const arch=new THREE.Mesh(new THREE.TorusGeometry(1.72,.24,12,42,Math.PI),trim);
 arch.rotation.z=0;arch.position.set(0,4.86,2.95);C.add(arch);
 block(.09,3.55,.12,0,2.8,2.96,trim);for(const x of [-.8,.8]){block(.055,3.12,.13,x,2.8,2.97,trim);block(1.28,.06,.14,x,3.75,2.97,trim);block(1.28,.06,.14,x,1.86,2.97,trim);}
 ball(.13,-.27,2.5,3.04,trim);ball(.13,.27,2.5,3.04,trim);
 for(const x of [-4.7,-3.0,3.0,4.7]){
   block(.80,1.35,.14,x,6.4,2.36,trim);
   block(.56,1.11,.18,x,6.4,2.46,glass);
 }
 // Facade crest uses the genuine supplied logo image, not generated lettering.
 const crestTex=new THREE.TextureLoader().load('official-logo.png');crestTex.colorSpace=THREE.SRGBColorSpace;
 const crestRim=new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.6,.17,64),trim);
 crestRim.rotation.x=Math.PI/2;crestRim.position.set(0,9.2,2.50);C.add(crestRim);
 const crest=new THREE.Mesh(new THREE.CircleGeometry(1.49,64),new THREE.MeshBasicMaterial({map:crestTex,side:THREE.DoubleSide}));
 crest.position.set(0,9.2,2.62);C.add(crest);

 // Architectural detailing: warm ivory stone, blue enamel and restrained champagne-gold ornament.
 const marble=new THREE.MeshStandardMaterial({color:'#FFF0D7',roughness:.78});
 const pearl=new THREE.MeshStandardMaterial({color:'#FFF9EA',roughness:.57});
 const brightGold=new THREE.MeshStandardMaterial({color:'#D7A74D',metalness:.56,roughness:.28});
 const recess=new THREE.MeshStandardMaterial({color:'#F1D8AC',roughness:.83});
 const winBlue=new THREE.MeshStandardMaterial({color:'#6BB7DB',emissive:'#C3D7EA',emissiveIntensity:.12,roughness:.25});
 const frontZ=2.50;
 // Continuous cornices and framed wall panels; no disconnected black wall pieces.
 for(const [y,w,d] of [[1.0,13.9,7.2],[7.5,13.9,7.2],[8.55,14.4,7.6],[10.75,11.1,5.2]]){
   block(w,.15,d,0,y,-1.1,pearl);
   block(w+.13,.075,d+.13,0,y+.11,-1.1,brightGold);
 }
 // Pilasters on the front facade with capitals, plinths and recessed relief panels.
 for(const x of [-5.9,-2.65,2.65,5.9]){
   block(.55,6.8,.50,x,4.7,frontZ,pearl);
   block(.91,.27,.68,x,1.23,frontZ,brightGold);
   block(.94,.32,.68,x,8.08,frontZ,brightGold);
   block(.18,5.75,.10,x,4.65,frontZ+.32,recess);
 }
 // Detailed arched window assemblies and decorative keystones.
 for(const x of [-4.65,-3.38,3.38,4.65]){
   const z=2.72;
   block(.93,1.73,.14,x,5.75,z,brightGold);
   block(.70,1.49,.17,x,5.74,z+.10,winBlue);
   const a=new THREE.Mesh(new THREE.TorusGeometry(.40,.085,10,28,Math.PI),brightGold);
   a.position.set(x,6.60,z+.19);C.add(a);
   block(.09,1.50,.20,x,5.74,z+.23,brightGold);
   block(.77,.08,.20,x,5.80,z+.24,brightGold);
   block(1.07,.12,.32,x,4.80,z+.13,pearl);
   ball(.115,x,6.99,z+.17,brightGold);
 }
 // Grand door portal: paired columns, double moulded arch and royal entrance steps.
 for(const x of [-2.25,2.25]){
   cyl(.27,.33,4.35,x,3.08,3.08,pearl,20);
   cyl(.43,.43,.26,x,1.04,3.08,brightGold,24);
   cyl(.43,.43,.30,x,5.29,3.08,brightGold,24);
   for(const dx of [-.16,.16])block(.055,3.9,.065,x+dx,3.07,3.34,brightGold);
 }
 for(const [r,y,z] of [[2.08,5.13,3.15],[1.83,5.10,3.24]]){
   const arch=new THREE.Mesh(new THREE.TorusGeometry(r,.12,12,48,Math.PI),r>2?pearl:brightGold);
   arch.position.set(0,y,z);C.add(arch);
 }
 for(let k=0;k<3;k++){
   const step=block(5.45+k*.48,.13,1.0,0,.79+k*.10,3.55+k*.38,k===1?brightGold:pearl);
 }
 // Door leaf bevels and fine inset gold borders.
 for(const x of [-.93,.93]){
   block(1.59,3.53,.055,x,2.86,3.015,doorMat);
   for(const y of [2.08,3.62]){
     block(1.20,1.12,.072,x,y,3.07,brightGold);
     block(1.04,.96,.078,x,y,3.11,doorMat);
   }
 }
 // Symmetrical balustraded upper terrace, in front of the central upper mass.
 for(const x of [-5.25,5.25]){
   block(.42,1.12,.42,x,10.98,.64,pearl);
   ball(.22,x,11.68,.64,brightGold);
 }
 for(let x=-5.05;x<=5.06;x+=.57){
   if(Math.abs(x)<2.0)continue;
   cyl(.095,.125,.83,x,10.99,.65,pearl,12);
   ball(.14,x,11.44,.65,brightGold);
 }
 for(const [x,w] of [[-3.65,3.2],[3.65,3.2]])block(w,.13,.26,x,11.50,.65,brightGold);
 // Corner crest diamonds and facade gold rosettes.
 for(const x of [-5.85,-2.72,2.72,5.85]){
   for(const y of [7.90,9.27]){
     const diamond=block(.23,.23,.11,x,y,2.89,brightGold);diamond.rotation.z=Math.PI/4;
   }
 }
 // Flag #4 on the left lower tower. Three other royal-blue logo banners remain on upper towers.
 // Rounded golden flower boxes at the foot of the facade (never in the path).
 const leafMat=new THREE.MeshStandardMaterial({color:'#5E9C64',roughness:.87});
 const blossomMats=['#F9D0DF','#FFF9F0','#F8E9B6'].map(color=>new THREE.MeshBasicMaterial({color}));
 for(const side of [-1,1])for(let k=0;k<12;k++){
   const x=side*(5.6+(k%4)*.53),z=3.8+Math.floor(k/4)*.47;
   ball(.22,x,.80,z,leafMat);
   ball(.13,x,.98,z,blossomMats[k%3]);
 }

 // Garden beds are built separately beside bridge approaches, not in the walkway.
 return C;
}

