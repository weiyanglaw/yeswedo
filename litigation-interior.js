// v434 Royal Litigation Island: stable, non-animated geometry, six recognizable installations.
export function createLitigationInterior(root,T){
 const targets=[]; const mat=(color,metalness=0)=>new T.MeshStandardMaterial({color,roughness:metalness?0.49:0.83,metalness,side:T.DoubleSide});
 const O=mat('#ED8647'),D=mat('#B95831'),P=mat('#F7B5A0'),I=mat('#FFF3E4'),W=mat('#FFFCF5'),G=mat('#D9B36C',.35),N=mat('#263B57'),F=mat('#F2DCC3'),S=mat('#D98E65');
 const add=(geom,m,x,y,z,zone)=>{const a=new T.Mesh(geom,m);a.position.set(x,y,z);root.add(a);if(zone){a.userData.litigationZone=zone;targets.push(a)}return a};
 const box=(w,h,d,x,y,z,m,zone)=>add(new T.BoxGeometry(w,h,d),m,x,y,z,zone);
 const cyl=(r,h,x,y,z,m,zone,r2=r)=>add(new T.CylinderGeometry(r,r2,h,32),m,x,y,z,zone);
 const round=(w,h,d,x,y,z,m,zone)=>{const a=add(new T.BoxGeometry(w,h,d),m,x,y,z,zone);return a};
 const sign=(label,x,y,z,w=4,h=.7,zone,rotation=0)=>{const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=220;const q=canvas.getContext('2d');q.fillStyle='#263B57';q.fillRect(0,0,1024,220);q.strokeStyle='#E9C47D';q.lineWidth=13;q.strokeRect(9,9,1006,202);q.fillStyle='#FFF3E4';q.font='bold 88px "Noto Sans TC", "PingFang TC", sans-serif';q.textAlign='center';q.textBaseline='middle';q.fillText(label,512,112,955);const tx=new T.CanvasTexture(canvas);tx.colorSpace=T.SRGBColorSpace;tx.anisotropy=4;const m=new T.MeshBasicMaterial({map:tx,side:T.DoubleSide,transparent:false,depthWrite:true});const a=add(new T.PlaneGeometry(w,h),m,x,y,z,zone);a.rotation.y=rotation;return a};
 const chair=(x,z,color=O,zone,face=0)=>{const g=new T.Group();root.add(g);g.position.set(x,0,z);g.rotation.y=face;const part=(geo,m,px,py,pz)=>{const a=new T.Mesh(geo,m);a.position.set(px,py,pz);g.add(a);if(zone){a.userData.litigationZone=zone;targets.push(a)}};part(new T.BoxGeometry(1.1,.25,.9),color,0,.76,0);part(new T.BoxGeometry(1.12,1.45,.23),color,0,1.38,.41);for(const dx of [-.45,.45]){part(new T.CylinderGeometry(.075,.075,.75,10),G,dx,.37,0);part(new T.BoxGeometry(.14,.15,.78),G,dx,.99,0)}return g};
 const desk=(x,z,w,d,zone)=>{box(w,.22,d,x,1.03,z,I,zone);box(w,.73,.15,x,.58,z-d/2+.1,D,zone);for(const dx of [-w/2+.22,w/2-.22])box(.16,.95,.16,x+dx,.5,z,G,zone);box(w,.11,.12,x,1.16,z+d/2-.07,G,zone)};
 // No overlapping coplanar floors, flickering shaders, emissive pulse, or animated lighting.
 box(35,.28,29,0,-.14,0,F);box(35,9.7,.32,0,4.85,-14.5,O);for(const x of [-17.36,17.36])box(.28,9.7,29,x,4.85,0,I);
 box(34,.34,.28,0,8.85,-14.22,G);box(34,.27,.28,0,.34,-14.22,G);
 // ① Dominant grand courtroom, judge and both parties in adjacent lawyer/client pairs.
 sign('皇家大法庭',0,8.0,-14.28,9,1.05,'civil');
 box(25,1.85,1.6,0,.93,-12.35,D,'civil');box(25.3,.2,1.84,0,1.96,-12.35,I,'civil');box(25.35,.16,.16,0,1.64,-11.48,G,'civil');
 for(const x of [-5.2,0,5.2])chair(x,-13.1,N,'civil');
 desk(-7.0,-7.7,8.0,2.15,'civil');desk(7.0,-7.7,8.0,2.15,'civil');
 for(const x of [-8.4,-5.7,5.7,8.4])chair(x,-9.35,P,'civil');
 sign('原告與律師',-7,2.4,-8.85,5,.7,'civil');sign('被告與律師',7,2.4,-8.85,5,.7,'civil');
 desk(13,-10.7,2.6,1.35,'civil');chair(13,-12.1,P,'civil');sign('書記官',13,2.2,-11.55,2.5,.55,'civil');
 // Decorative curved courtroom rail: physically separated components, no surface overlap.
 for(const x of [-12,-10,-8,8,10,12])cyl(.075,.88,x,.44,-4.85,G);
 for(const x of [-11,11])box(2.8,.12,.16,x,.89,-4.85,G);
 // ② Central first/second/third instance exhibition, huge and visible from entrance.
 sign('法院審級與司法制度',0,4.2,-3.55,10,.8,'hierarchy');
 const steps=[['第一審','事實與證據',-5.25],['第二審','上訴審查',0],['第三審','法律審為主',5.25]];
 for(const [a,b,x] of steps){box(4.65,.5,2.8,x,.25,-1.0,I,'hierarchy');box(4.75,.16,2.95,x,.58,-1,G,'hierarchy');box(4.3,1.8,.24,x,1.57,-1.75,N,'hierarchy');sign(a,x,1.92,-1.60,3.85,.78,'hierarchy');sign(b,x,1.12,-1.60,3.8,.47,'hierarchy');cyl(.19,.24,x,.77,-.12,G,'hierarchy')}
 // ③ Court public service area, two full-size counters.
 sign('法院便民服務',-11.2,4.4,3.2,8,.85,'service');
 for(const [x,t] of [[-14,'收狀處'],[-8.5,'裁判費收費處']]){box(5.2,1.45,2.1,x,.73,5.2,O,'service');box(5.35,.18,2.35,x,1.55,5.2,I,'service');box(5.4,.16,.12,x,1.15,6.34,G,'service');sign(t,x,2.65,4.06,5,.7,'service');box(1.7,.08,1.1,x,1.68,5.2,W,'service')}
 // ④ Royal mediation lounge, large oval table and plush backed seats.
 sign('皇家調解廳',11.1,4.4,3.2,7.3,.85,'mediation');
 const oval=cyl(2.25,.22,11,1.1,6.2,I,'mediation');oval.scale.set(2.0,1,0.67);const base=cyl(1.2,1,11,.55,6.2,D,'mediation');base.scale.set(1.7,1,.72);
 for(const x of [7.2,9.65,12.35,14.8]){chair(x,4.1,P,'mediation',Math.PI);chair(x,8.35,P,'mediation',0)}
 // ⑤ US introduction: distinct standing digital board, no redundant courtroom.
 sign('美國訴訟入門',-11,4.1,10.5,7.5,.85,'usa');
 box(7.4,2.5,.45,-11,2.25,12.5,N,'usa');box(7.7,.16,.65,-11,3.6,12.5,G,'usa');sign('聯邦法院・州法院',-11,2.65,12.78,6.8,.65,'usa');sign('臺美司法制度比較',-11,1.72,12.78,6.8,.65,'usa');
 // ⑥ Small royal reception with legible sign and desk bell.
 sign('皇家趣味接待',10.7,4.1,10.5,7.5,.85,'reception');
 box(7.1,1.3,2.1,10.7,.65,12.3,O,'reception');box(7.35,.18,2.35,10.7,1.4,12.3,I,'reception');box(7.45,.13,.14,10.7,1.08,13.46,G,'reception');cyl(.35,.18,9.1,1.62,12.5,G,'reception');
 // Strong visual grouping, no delicate patterns invisible on a phone.
 return {targets};
}
