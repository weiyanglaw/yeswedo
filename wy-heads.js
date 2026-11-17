// 德威陽｜有法度 v498 廟會版舞獅頭、龍頭（定稿：立體眼＋金色眼皮，紅金綠配色）
// lionHead：臉朝 +z、半徑約 1.3；dragonHead：吻部朝 +z、長約 2.4。舞獅、舞龍、龍舟共用。
export function makeHeads(T){
 const MC=new Map();const M=(c,o={})=>{const k=c+JSON.stringify(o);if(!MC.has(k))MC.set(k,new T.MeshStandardMaterial({color:c,roughness:.45,...o}));return MC.get(k)};
 const sph=(r,c,sx=1,sy=1,sz=1,a=24,b=16)=>{const m=new T.Mesh(new T.SphereGeometry(r,a,b),typeof c==='string'?M(c):c);m.scale.set(sx,sy,sz);return m};
 const cyl=(a,b,h,c,s=16)=>new T.Mesh(new T.CylinderGeometry(a,b,h,s),typeof c==='string'?M(c):c);
 const ctex=(w,h,fn)=>{const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t};
 const GOLD=M('#E9B53C',{metalness:.45,roughness:.3}),FUR=M('#FFFFFF',{roughness:.95}),LFUR=M('#F6C24A',{roughness:.9}),BLACK=M('#141414',{roughness:.4});
 const fur=(g,pts,r,mat=FUR)=>pts.forEach(([x,y,z],k)=>{const f=sph(r*(.8+.4*((k*37)%10)/10),mat,1,1,1,10,8);f.position.set(x,y,z);g.add(f)});
 const ET=new Map();const eyeTex=iris=>{if(ET.has(iris))return ET.get(iris);const t=ctex(256,256,(x)=>{x.fillStyle='#FFFFFF';x.fillRect(0,0,256,256);const gr=x.createRadialGradient(128,128,10,128,128,70);gr.addColorStop(0,'#000');gr.addColorStop(.35,'#111');gr.addColorStop(.4,iris);gr.addColorStop(.9,'#222');gr.addColorStop(1,'#FFFFFF');x.fillStyle=gr;x.beginPath();x.arc(128,128,70,0,7);x.fill();x.fillStyle='rgba(255,255,255,.95)';x.beginPath();x.arc(100,100,16,0,7);x.fill();x.beginPath();x.arc(150,150,7,0,7);x.fill()});ET.set(iris,t);return t};
 const eyeball=(r,iris)=>{const e=new T.Mesh(new T.SphereGeometry(r,24,18),new T.MeshStandardMaterial({map:eyeTex(iris),roughness:.15}));e.rotation.y=-Math.PI/2;return e};
 const FT=new Map();const lionFace=(main)=>FT.get(main)||(FT.set(main,ctex(1024,512,(x,w,h)=>{x.fillStyle=main;x.fillRect(0,0,w,h);x.lineCap='round';
  for(const cx of[340,684]){for(const [r,c,lw] of[[70,'#F2C14E',26],[70,'#1F8A4C',14]]){x.strokeStyle=c;x.lineWidth=lw;x.beginPath();x.arc(cx,330,r,.2,Math.PI*1.75);x.stroke();x.beginPath();x.arc(cx+(cx<512?-50:50),300,32,0,Math.PI*1.5);x.stroke()}}
  x.fillStyle='#F2C14E';for(let k=0;k<40;k++){x.beginPath();x.arc((k*97)%w,420+(k*53)%90,6,0,7);x.fill()}
  x.strokeStyle='#141414';x.lineWidth=6;x.beginPath();x.moveTo(380,250);x.quadraticCurveTo(512,200,644,250);x.stroke()})),FT.get(main));
 // 醒獅頭（main 臉色、accent 點綴色）。回傳 {g, lids, jaw}
 function lionHead(main='#D3202A',accent='#1F8A4C'){const g=new T.Group();
  const head=new T.Mesh(new T.SphereGeometry(1,40,28),new T.MeshStandardMaterial({map:lionFace(main),roughness:.5}));head.scale.set(1.25,1.05,1.1);head.rotation.y=-Math.PI/2;g.add(head);
  const fore=sph(.75,M('#F2C14E',{metalness:.3,roughness:.35}),1.25,.7,.9);fore.position.set(0,.62,.35);g.add(fore);
  for(let k=0;k<9;k++){const a=-.9+k*.225;const sc=sph(.12,M(k%2?accent:'#D3202A'),1,1,.5,12,8);sc.position.set(Math.sin(a)*.82,.78+Math.cos(a*1.3)*.1,.6+Math.cos(a)*.35);sc.lookAt(sc.position.clone().multiplyScalar(2));g.add(sc)}
  const mir=cyl(.2,.2,.04,new T.MeshStandardMaterial({color:'#CFEFFF',emissive:'#8FD3FF',emissiveIntensity:.35,metalness:.2,roughness:.1}),24);mir.rotation.x=Math.PI/2-.35;mir.position.set(0,.78,.98);g.add(mir);const mr=new T.Mesh(new T.TorusGeometry(.21,.04,8,24),GOLD);mr.position.copy(mir.position);mr.rotation.x=-.35;g.add(mr);
  const horn=new T.Mesh(new T.ConeGeometry(.13,.42,12),M(accent,{roughness:.3}));horn.position.set(0,1.18,.3);horn.rotation.x=-.4;g.add(horn);const hb=new T.Mesh(new T.TorusGeometry(.13,.04,8,16),GOLD);hb.position.set(0,1.0,.36);hb.rotation.x=Math.PI/2-.4;g.add(hb);
  const lids=[];
  for(const e of[-1,1]){const eg=new T.Group();eg.position.set(e*.48,.3,.88);g.add(eg);eg.add(eyeball(.26,'#5A3A1A'));const lid=new T.Mesh(new T.SphereGeometry(.29,24,12,0,Math.PI*2,0,Math.PI*.3),GOLD);lid.rotation.x=-.35;eg.add(lid);lids.push(lid);const rim=new T.Mesh(new T.TorusGeometry(.27,.035,8,24),BLACK);rim.position.z=.03;eg.add(rim);
   const bp=[];for(let k=0;k<9;k++){const t=k/8;bp.push([e*(.2+t*.55),.58+Math.sin(t*Math.PI)*.12,.92-t*.25])}fur(g,bp,.1,LFUR);
   const ear=sph(.26,M('#F2C14E',{metalness:.3}),.5,1,.35);ear.position.set(e*1.15,.7,-.1);ear.rotation.z=-e*.5;g.add(ear);const ein=sph(.18,M('#D3202A'),.4,.8,.3);ein.position.set(e*1.13,.7,-.04);ein.rotation.z=-e*.5;g.add(ein)}
  const nose=sph(.28,M('#F2C14E',{metalness:.35,roughness:.3}),1.3,.8,1);nose.position.set(0,-.02,1.08);g.add(nose);for(const e of[-1,1]){const n=sph(.06,BLACK,1,1,1,10,8);n.position.set(e*.13,-.08,1.3);g.add(n)}
  const lip=new T.Mesh(new T.TorusGeometry(.62,.1,8,28,Math.PI),M('#F2C14E',{metalness:.3}));lip.rotation.set(Math.PI*1.05,0,0);lip.position.set(0,-.25,.72);lip.scale.set(1,.8,1);g.add(lip);
  const mp=[];for(let k=0;k<15;k++){const a=Math.PI*(k/14);mp.push([Math.cos(a)*.66,-.3-Math.sin(a)*.08,.75+Math.sin(a)*.38])}fur(g,mp,.09,LFUR);
  const mouth=sph(.6,M('#5A0E12',{roughness:.8}),1,.45,.8);mouth.position.set(0,-.48,.55);g.add(mouth);
  for(let k=0;k<8;k++){const tx=-.42+k*.12;const t=new T.Mesh(new T.ConeGeometry(.05,.13,6),M('#FFFFFF',{roughness:.3}));t.position.set(tx,-.36,.95-Math.abs(tx)*.35);t.rotation.x=Math.PI;g.add(t)}
  const jaw=new T.Group();jaw.position.set(0,-.55,.3);g.add(jaw);
  const tongue=sph(.3,M('#E8566C',{roughness:.4}),1,.3,.9);tongue.position.set(0,-.07,.5);jaw.add(tongue);
  const jw=new T.Mesh(new T.TorusGeometry(.55,.12,8,28,Math.PI),M('#D3202A'));jw.rotation.set(Math.PI*.05,0,Math.PI);jw.position.set(0,-.07,.3);jw.scale.set(1,.7,1);jaw.add(jw);
  for(let k=0;k<7;k++){const tx=-.36+k*.12;const t=new T.Mesh(new T.ConeGeometry(.045,.11,6),M('#FFFFFF'));t.position.set(tx,-.15,.65-Math.abs(tx)*.4);jaw.add(t)}
  const bd=[];for(let k=0;k<13;k++){const a=Math.PI*(k/12);bd.push([Math.cos(a)*.55,-.4-Math.sin(a)*.15,.3+Math.sin(a)*.35])}fur(jaw,bd,.13);
  const mn=[];for(let k=0;k<34;k++){const a=k/34*Math.PI*2;mn.push([Math.cos(a)*1.3,Math.sin(a)*1.12+.05,-.05])}fur(g,mn,.2,LFUR);
  const back=sph(1.05,M(main),1.15,1,1);back.position.z=-.45;g.add(back);return {g,lids,jaw}}
 // 龍頭：opts.pearl 是否含龍珠。回傳 {g, jaw}
 let scaleT=null;const dragonScale=()=>scaleT||(scaleT=(()=>{const t=ctex(512,512,(x,w,h)=>{x.fillStyle='#1E8C4A';x.fillRect(0,0,w,h);for(let r=0;r<14;r++)for(let k=0;k<14;k++){const cx=k*38+(r%2)*19,cy=r*38;const gr=x.createRadialGradient(cx,cy+6,2,cx,cy,22);gr.addColorStop(0,'#5FD08A');gr.addColorStop(1,'#167A3E');x.fillStyle=gr;x.beginPath();x.arc(cx,cy,20,0,Math.PI);x.fill();x.strokeStyle='#F2C14E';x.lineWidth=2;x.beginPath();x.arc(cx,cy,20,0,Math.PI);x.stroke()}});t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(2,2);return t})());
 function dragonHead(opts={}){const g=new T.Group();const SK=new T.MeshStandardMaterial({map:dragonScale(),roughness:.4});const GM=M('#F2C14E',{metalness:.35,roughness:.3});
  const skull=sph(.9,SK,1,.85,1.05);skull.position.set(0,.35,-.2);g.add(skull);const snout=sph(.62,SK,1,.6,1.5);snout.position.set(0,.18,.85);g.add(snout);
  const brow=sph(.55,GM,1.5,.45,.9);brow.position.set(0,.68,.38);g.add(brow);
  const nose=sph(.33,GM,1.35,.75,.9);nose.position.set(0,.32,1.62);g.add(nose);for(const e of[-1,1]){const n=new T.Mesh(new T.TorusGeometry(.09,.035,6,12),M('#B8202A'));n.position.set(e*.16,.38,1.86);n.rotation.y=e*.4;g.add(n)}
  for(const e of[-1,1]){const eg=new T.Group();eg.position.set(e*.48,.6,.62);eg.rotation.y=e*.45;g.add(eg);eg.add(eyeball(.24,'#D8A020'));const ring=new T.Mesh(new T.TorusGeometry(.25,.06,8,24),M('#C8202A'));eg.add(ring);const lid=new T.Mesh(new T.SphereGeometry(.27,24,12,0,Math.PI*2,0,Math.PI*.28),GM);lid.rotation.x=-.3;eg.add(lid);
   for(let k=0;k<5;k++){const f=new T.Mesh(new T.ConeGeometry(.08,.42-k*.04,6),M(k%2?'#E23B2E':'#FF8A2A'));f.position.set(e*(.35+k*.13),.95+k*.02,.4-k*.12);f.rotation.set(-.9,0,-e*(.9+k*.12));g.add(f)}
   const am=M('#E9C46A',{roughness:.35,metalness:.2});const ant=new T.Group();ant.position.set(e*.38,.98,-.35);g.add(ant);const a1=cyl(.06,.09,1.1,am,8);a1.position.y=.55;ant.add(a1);for(const [y,l,ang] of[[.45,.45,.9],[.8,.35,-.8],[1.05,.3,.7]]){const b2=cyl(.035,.05,l,am,6);b2.position.set(Math.sin(ang)*l*.5*e,y+Math.cos(ang)*l*.4,0);b2.rotation.z=-ang*e;ant.add(b2)}ant.rotation.set(-.55,0,-e*.3);
   const pts=[new T.Vector3(e*.3,.25,1.75),new T.Vector3(e*.9,.35,1.9),new T.Vector3(e*1.6,.0,1.6),new T.Vector3(e*2.1,.3,1.0),new T.Vector3(e*2.5,-.1,.6)];g.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts),24,.035,6),M('#F2C14E')));
   for(let k=0;k<5;k++){const f=new T.Mesh(new T.ConeGeometry(.12,.55,6),M(k%2?'#E23B2E':'#FFFFFF',{roughness:.8}));f.position.set(e*(.85+k*.05),.1-k*.12,-.1-k*.08);f.rotation.set(0,0,e*(1.6+k*.15));g.add(f)}}
  for(let k=0;k<7;k++){const f=new T.Mesh(new T.ConeGeometry(.14,.6-k*.04,6),M(k%2?'#E23B2E':'#FF8A2A'));f.position.set(0,1.05-k*.12,-.1-k*.25);f.rotation.x=-.9;g.add(f)}
  const upper=sph(.6,M('#C8202A',{roughness:.6}),1,.25,1.4);upper.position.set(0,-.05,.95);g.add(upper);
  for(let k=0;k<9;k++){const a=-1+k*.25;const t=new T.Mesh(new T.ConeGeometry(.05,.14,6),M('#FFFFFF',{roughness:.3}));t.position.set(Math.sin(a)*.5,-.12,.95+Math.cos(a)*.7);t.rotation.x=Math.PI;g.add(t)}
  for(const e of[-1,1]){const f=new T.Mesh(new T.ConeGeometry(.07,.36,8),M('#FFFFF0',{roughness:.25}));f.position.set(e*.4,-.25,1.35);f.rotation.x=Math.PI;g.add(f)}
  const jaw=new T.Group();jaw.position.set(0,-.35,.2);g.add(jaw);
  const jw=sph(.55,SK,.95,.28,1.35);jw.position.set(0,-.27,.55);jw.rotation.x=.35;jaw.add(jw);const inner=sph(.5,M('#5A0E12',{roughness:.8}),.85,.2,1.25);inner.position.set(0,-.13,.62);inner.rotation.x=.35;jaw.add(inner);
  const tg=sph(.22,M('#E8566C',{roughness:.4}),1,.25,1.6);tg.position.set(0,-.07,.95);tg.rotation.x=.25;jaw.add(tg);
  for(let k=0;k<7;k++){const a=-.9+k*.3;const t=new T.Mesh(new T.ConeGeometry(.045,.12,6),M('#FFFFFF'));t.position.set(Math.sin(a)*.42,-.07,.65+Math.cos(a)*.58);jaw.add(t)}
  fur(jaw,Array.from({length:11},(_,k)=>{const a=-1.2+k*.24;return [Math.sin(a)*.5,-.6-Math.cos(a)*.15,.5+Math.cos(a)*.4]}),.13);
  if(opts.pearl){const pearl=sph(.25,new T.MeshStandardMaterial({color:'#FFE9A8',emissive:'#FFB23D',emissiveIntensity:.5,roughness:.15}));pearl.position.set(0,.9,2.3);g.add(pearl)}
  return {g,jaw}}
 return {lionHead,dragonHead};
}
