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
 tower(-6.5,-.4,1.85,8.2,3.0,false);
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
 // Garden beds are built separately beside bridge approaches, not in the walkway.
 return C;
}

