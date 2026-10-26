// WEIYANG standalone castle module. Does not load the legacy castle GLB.
export function createNewFairytaleCastle(parent,THREE){
 const C=new THREE.Group();parent.add(C);
 const wall=new THREE.MeshStandardMaterial({color:'#FFFDF5',roughness:.16,metalness:.18,side:THREE.DoubleSide});
 const wallLight=new THREE.MeshStandardMaterial({color:'#FFFFFF',roughness:.18,metalness:.14,side:THREE.DoubleSide});
 const trim=new THREE.MeshPhysicalMaterial({color:'#F0DBB2',roughness:.18,metalness:.72,clearcoat:1,clearcoatRoughness:.08,emissive:'#735A30',emissiveIntensity:.13});
 // v91: broad flat roof between blue turrets, not facade or blue domes. Pale polished champagne ivory with visible mobile-scale highlights.
 const roofChampagne=new THREE.MeshPhysicalMaterial({color:'#FFF6E3',metalness:.34,roughness:.12,clearcoat:1,clearcoatRoughness:.055,emissive:'#D7B985',emissiveIntensity:.19});
 const blueRoof=new THREE.MeshPhysicalMaterial({color:'#12355D',metalness:.22,roughness:.30,clearcoat:1,clearcoatRoughness:.11,emissive:'#806039',emissiveIntensity:.12});
 const darkBlue=new THREE.MeshStandardMaterial({color:'#12355D',roughness:.75,side:THREE.DoubleSide});
 const doorMat=new THREE.MeshStandardMaterial({color:'#775438',roughness:.42,metalness:.13});
 const glass=new THREE.MeshStandardMaterial({color:'#FFE4A6',emissive:'#E8B95E',emissiveIntensity:.28,roughness:.22,metalness:.10});
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
      const bannerW=main?2.55:2.05,bannerH=main?1.85:1.50;
      const banner=new THREE.Mesh(new THREE.PlaneGeometry(bannerW,bannerH),new THREE.MeshBasicMaterial({color:'#102F58',side:THREE.DoubleSide}));
      banner.position.set(x+bannerW/2,tip+poleH-.82,z+.04);C.add(banner);
      const tex=flagTexture;
      const emblem=new THREE.Mesh(new THREE.PlaneGeometry(bannerH*.87,bannerH*.87),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:THREE.DoubleSide}));
      emblem.position.set(x+bannerW/2,tip+poleH-.82,z+.065);C.add(emblem);
   }
 };
 // Continuous castle mass: no dark black/coffee facade or floating pieces.
 block(13.3,8.5,6.8,0,4.95,-1.1,wall);
 block(14.0,.45,7.4,0,9.38,-1.1,roofChampagne);
 block(12.4,.35,7.1,0,8.75,-1.1,wallLight);
 block(10.4,2.0,4.7,0,9.55,-1.9,roofChampagne);
 block(10.9,.3,5.0,0,10.55,-1.9,roofChampagne);
 // v91 roof-only specular streaks, just above the main upper roof plane (y=10.70).
 const roofSheen=new THREE.MeshBasicMaterial({color:'#FFFDF4',transparent:true,opacity:.17,depthWrite:false,side:THREE.DoubleSide});
 for(const [x,w] of [[-2.45,.90],[1.65,1.18]]){
   const shine=new THREE.Mesh(new THREE.PlaneGeometry(w,4.25),roofSheen);
   shine.rotation.x=-Math.PI/2;shine.rotation.z=-.16;shine.position.set(x,10.709,-1.9);C.add(shine);
 }
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
 crestRim.rotation.x=Math.PI/2;crestRim.position.set(0,9.2,4.18);crestRim.renderOrder=0;crestRim.material=trim.clone();crestRim.material.depthTest=true;crestRim.material.depthWrite=true;C.add(crestRim);
 const crest=new THREE.Mesh(new THREE.CircleGeometry(1.49,64),new THREE.MeshBasicMaterial({map:crestTex,side:THREE.DoubleSide}));
 crest.position.set(0,9.2,4.32);crest.renderOrder=0;crest.material.depthTest=true;crest.material.depthWrite=true;C.add(crest);

 // Architectural detailing: warm ivory stone, blue enamel and restrained champagne-gold ornament.
 const marble=new THREE.MeshStandardMaterial({color:'#FFFDF6',roughness:.19,metalness:.16});
 const pearl=new THREE.MeshStandardMaterial({color:'#FFFDF7',roughness:.28,metalness:.09});
 const brightGold=new THREE.MeshPhysicalMaterial({color:'#F4E1B9',metalness:.76,roughness:.17,clearcoat:1,clearcoatRoughness:.08,emissive:'#806234',emissiveIntensity:.12});
 const recess=new THREE.MeshStandardMaterial({color:'#FFF4DF',roughness:.23});
 const winBlue=new THREE.MeshStandardMaterial({color:'#91C9E2',emissive:'#E6D1A0',emissiveIntensity:.20,roughness:.19});
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
 // Step-free entrance: the existing level island paving reaches the doors.
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

 // Additional grand-palace ornamentation: layered pediments, columns, gilded window crowns.
 for(const x of [-5.2,-3.6,3.6,5.2]){
   const z=2.95;
   for(const y of [3.45,6.85]){
     const crown=block(1.28,.15,.24,x,y,z,brightGold);
     const jewel=ball(.18,x,y+.20,z+.13,brightGold);
     const panel=block(.87,.64,.13,x,y-.47,z,pearl);
     const inset=block(.66,.44,.15,x,y-.47,z+.08,recess);
   }
 }
 for(const x of [-6.9,6.9]){
   for(let j=0;j<4;j++){
     const y=2.0+j*1.32;
     const frame=block(.86,1.04,.24,x,y,2.36,brightGold);
     block(.60,.78,.28,x,y,2.52,glass);
   }
 }
 // Grand central pediment above the crest, gold ribs on the facade.
 const crownBeam=block(6.6,.26,.42,0,10.77,2.28,brightGold);
 for(const x of [-2.8,-1.4,0,1.4,2.8]){
   ball(.18,x,11.00,2.43,brightGold);
 }
 // Gold ornaments under the entrance crest and along the door frame.
 for(const x of [-2.1,2.1])for(const y of [3.6,4.4,5.2])ball(.13,x,y,3.32,brightGold);
 // Palace-level detailing: arched window bays, sculpted pediments, gilded roof ribs,
 // layered stone balconies and golden finials. These are real 3D meshes, not an image backdrop.
 const stoneEdge=new THREE.MeshStandardMaterial({color:'#FFFDF7',roughness:.24});
 const royalGlass=new THREE.MeshStandardMaterial({color:'#9CC9DE',emissive:'#F3D69C',emissiveIntensity:.21,roughness:.19});
 const front=3.25;
 const ornament=(x,y,z,r=.14)=>{const o=new THREE.Mesh(new THREE.OctahedronGeometry(r,0),brightGold);o.position.set(x,y,z);C.add(o);};
 // Three-dimensional stone facade bays with arched windows and decorated sills.
 for(const x of [-5.2,-3.75,3.75,5.2])for(const y of [3.35,6.05]){
   block(1.16,1.74,.18,x,y,2.80,stoneEdge);
   block(.83,1.43,.20,x,y,2.93,brightGold);
   block(.62,1.24,.21,x,y,3.06,royalGlass);
   const arch=new THREE.Mesh(new THREE.TorusGeometry(.43,.115,12,32,Math.PI),brightGold);
   arch.position.set(x,y+.75,3.10);C.add(arch);
   block(1.42,.16,.40,x,y-.93,3.04,stoneEdge);
   block(.085,1.28,.25,x,y,3.20,brightGold);
   ornament(x,y+.97,3.11,.19);
 }
 // Sculptural entrance surround and elevated classical triangular pediment.
 for(const x of [-2.72,2.72]){
   cyl(.30,.38,5.3,x,3.66,3.46,stoneEdge,24);
   cyl(.50,.50,.31,x,1.02,3.46,brightGold,24);
   cyl(.49,.49,.33,x,6.34,3.46,brightGold,24);
 }
 block(6.65,.34,.72,0,6.62,3.15,stoneEdge);
 block(7.00,.12,.80,0,6.84,3.15,brightGold);
 for(const side of [-1,1]){
   const slope=block(4.1,.26,.63,side*1.74,7.62,3.06,stoneEdge);
   slope.rotation.z=side*-.40;
   const gilded=block(4.15,.085,.70,side*1.74,7.78,3.06,brightGold);
   gilded.rotation.z=side*-.40;
 }
 ornament(0,8.58,3.16,.40);
 // Deep relief rosettes and raised masonry bands around the main entrance.
 for(const x of [-6.1,-4.0,-2.5,2.5,4.0,6.1]){
   for(const y of [1.55,8.23])ornament(x,y,2.99,.17);
 }
 // Upper balcony parapets and repeated balusters, separated from the entrance arch.
 for(const side of [-1,1]){
   const bx=side*4.18;
   block(3.55,.22,1.15,bx,10.78,1.43,stoneEdge);
   for(let k=0;k<7;k++){
     const x=bx-1.52+k*.50;
     cyl(.11,.14,.87,x,11.28,2.08,stoneEdge,12);
     ball(.14,x,11.76,2.08,brightGold);
   }
   block(3.65,.18,.27,bx,11.79,2.08,brightGold);
 }
 // Gold ribbing on every blue roof, with capstones and dimensional roof shingles.
 const roofs=[[-6.5,-.4,1.85,8.2,3], [6.5,-.4,1.85,8.2,3],[-4.15,-3.4,1.95,10.4,3.7],[4.15,-3.4,1.95,10.4,3.7],[0,-4.1,2.35,13,4.5],[-8.4,1.25,1.35,6.2,2.35],[8.4,1.25,1.35,6.2,2.35]];
 for(const [x,z,r,h,rh] of roofs){
   const baseY=h+.86;
   const ring=new THREE.Mesh(new THREE.TorusGeometry(r+.45,.105,8,48),brightGold);
   ring.rotation.x=Math.PI/2;ring.position.set(x,baseY+.06,z);C.add(ring);
   for(let j=0;j<8;j++){
     const a=j*Math.PI/4;
     const from=new THREE.Vector3(x+Math.cos(a)*(r+.38),baseY,z+Math.sin(a)*(r+.38));
     const to=new THREE.Vector3(x,baseY+rh,z);
     const delta=to.clone().sub(from);
     const rib=new THREE.Mesh(new THREE.CylinderGeometry(.035,.058,delta.length(),8),brightGold);
     rib.position.copy(from.add(to).multiplyScalar(.5));rib.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());C.add(rib);
   }
   // Golden architectural bands and arched tower windows face the entrance.
   const wy=h*.63+.7;
   block(.95,1.45,.13,x,wy,z+r+.16,brightGold);
   block(.68,1.22,.16,x,wy,z+r+.25,royalGlass);
   const top=new THREE.Mesh(new THREE.TorusGeometry(.40,.09,10,28,Math.PI),brightGold);
   top.position.set(x,wy+.68,z+r+.28);C.add(top);
   ornament(x,wy+1.0,z+r+.29,.17);
 }
 // Stone sculptures on the two sides of the grand entry.
 for(const x of [-3.0,3.0]){
   block(.90,.65,.90,x,1.00,4.20,stoneEdge);
   cyl(.30,.37,1.12,x,1.88,4.20,stoneEdge,20);
   ball(.38,x,2.58,4.20,stoneEdge);
   ball(.17,x,3.06,4.20,brightGold);
 }
 // v40: understated, low-poly luxury detailing; all decorations are attached to
 // the existing castle and never block the flat entrance or alter island layout.
 const accentGold=new THREE.MeshPhysicalMaterial({color:'#FFE5A6',metalness:.58,roughness:.20,clearcoat:.8,clearcoatRoughness:.15});
 const navyEnamel=new THREE.MeshStandardMaterial({color:'#16385D',roughness:.34,metalness:.16});
 const ivoryGlow=new THREE.MeshBasicMaterial({color:'#FFF0C7'});
 // Fine facade bands and the pair of ceremonial entrance sconces.
 for(const y of [1.42,7.98,9.55]){
   block(13.95,.055,.12,0,y,2.78,accentGold);
 }
 for(const x of [-2.90,2.90]){
   block(.16,.66,.20,x,4.30,3.52,accentGold);
   ball(.24,x,4.66,3.61,ivoryGlow);
   ball(.11,x,4.98,3.61,accentGold);
 }
 // Subtle vertical gold seams give the blue roofs richer dimension at normal
 // mobile viewing distance, without high polygon counts or a photorealistic look.
 for(const [x,z,r,h,rh] of roofs){
   for(let j=0;j<12;j++){
     const a=j*Math.PI/6;
     const p1=new THREE.Vector3(x+Math.cos(a)*(r+.42),h+.91,z+Math.sin(a)*(r+.42));
     const p2=new THREE.Vector3(x+Math.cos(a)*.15,h+.86+rh*.91,z+Math.sin(a)*.15);
     const delta=p2.clone().sub(p1);
     const seam=new THREE.Mesh(new THREE.CylinderGeometry(.017,.025,delta.length(),5),j%3===0?accentGold:navyEnamel);
     seam.position.copy(p1.add(p2).multiplyScalar(.5));
     seam.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());C.add(seam);
   }
 }
 // Small symmetric planter accents: no foreground staircase or new bridge rails.
 for(const x of [-7.65,7.65]){
   cyl(.42,.50,.38,x,.99,3.80,accentGold,16);
   ball(.43,x,1.42,3.80,leafMat);
   ball(.22,x,1.80,3.80,leafMat);
 }
 // Garden beds are built separately beside bridge approaches, not in the walkway.
 return C;
}

