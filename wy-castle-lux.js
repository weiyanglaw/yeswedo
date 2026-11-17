// 德威陽｜有法度 城堡頂級版（預覽）：造型與顏色不變，只在原本城堡上加細節
// 座標使用城堡本體（castle.js）的區域座標：正面朝 +z，一樓地板 y=.7，每層 4.1，屋頂 y=13.0
export function setupCastleLux(T, c){
 const R=c.root;if(!R)return ()=>{};
 const g=new T.Group();g.name='wyCastleLux';R.add(g);
 const MC=new Map();const M=(col,o)=>{const k=col+JSON.stringify(o||{});if(!MC.has(k))MC.set(k,new T.MeshStandardMaterial({color:col,roughness:.45,...(o||{})}));return MC.get(k)};
 const GOLD=M('#E9C46A',{metalness:.55,roughness:.3}),NAVY=M('#22406A',{roughness:.6}),WHITE=M('#FFFDF6',{roughness:.4}),CREAM=M('#F7EEDC',{roughness:.5});
 const add=(geo,m,x,y,z,p=g)=>{const o=new T.Mesh(geo,m);o.position.set(x,y,z);p.add(o);return o};
 const box=(w,h,d,m,x,y,z,p)=>add(new T.BoxGeometry(w,h,d),m,x,y,z,p);
 const cyl=(a,b,h,m,x,y,z,s=16,p)=>add(new T.CylinderGeometry(a,b,h,s),m,x,y,z,p);
 const sph=(r,m,x,y,z,p,s=12)=>add(new T.SphereGeometry(r,s,Math.max(6,s*.7|0)),m,x,y,z,p);
 const ctex=(w,h,fn)=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;fn(cv.getContext('2d'),w,h);const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t};
 const FB=.7,ST=4.1,TOP=FB+ST*3;const cyOf=f=>FB+ST*f+ST*.53;
 const WX=[-5.45,-3.6,3.6,5.45];
 // ---------- 1) 每層窗戶不同：一樓金色鍛鐵小陽台、二樓垂墜花串、三樓深藍金流蘇遮陽篷 ----------
 // 找出原本的花箱（白箱＋金條＋葉＋花），一樓與三樓的收起來
 const hideBox=f=>{const fy=cyOf(f)-1.34;R.children.forEach(o=>{if(!o.isMesh||o===g)return;const p=o.position;if(p.z>2.85&&p.z<3.5&&p.y>fy-.4&&p.y<fy+.95&&WX.some(x=>Math.abs(p.x-x)<1.2))o.visible=false})};
 hideBox(0);hideBox(2);
 for(const x of WX){
  // 一樓：法式鍛鐵欄杆
  {const y=cyOf(0)-1.2,z=3.18;box(1.9,.07,.07,GOLD,x,y,z);box(1.9,.07,.07,GOLD,x,y+.62,z);for(let k=0;k<7;k++){const bx=x-.81+k*.27;box(.04,.62,.04,GOLD,bx,y+.31,z);}
   for(const e of[-1,1]){const cu=new T.Mesh(new T.TorusGeometry(.13,.025,6,16,Math.PI*1.5),GOLD);cu.position.set(x+e*.4,y+.31,z+.02);cu.rotation.z=e>0?0:Math.PI/2;g.add(cu)}
   box(2.1,.1,.42,WHITE,x,y-.05,z-.12)}
  // 二樓：花箱下垂墜的粉白小花串
  {const fy=cyOf(1)-1.34;for(let k=0;k<6;k++){const sx=x-.85+k*.34;const n=3+(k%2);for(let j=0;j<n;j++){sph(.075+.01*((j+k)%2),M(j%2?'#FFFFFF':'#F6A9C6',{roughness:.6}),sx,fy-.32-j*.17,3.33,g,8)}}}
  // 三樓：深藍遮陽篷＋金色流蘇
  {const y=cyOf(2)+1.32,z=3.3;const aw=new T.Mesh(new T.CylinderGeometry(.8,.8,1.5,20,1,true,-Math.PI/2,Math.PI),M('#1F3A68',{side:T.DoubleSide,roughness:.7}));aw.rotation.z=Math.PI/2;aw.scale.set(1,1,.62);aw.position.set(x,y,z-.15);g.add(aw);
   const str=new T.Mesh(new T.CylinderGeometry(.81,.81,.16,20,1,true,-Math.PI/2,Math.PI),M('#F2EBDD',{side:T.DoubleSide}));str.rotation.z=Math.PI/2;str.scale.set(1,1,.63);str.position.set(x-.2,y,z-.15);g.add(str);
   for(let k=0;k<9;k++){const fx=x-.7+k*.175;cyl(.02,.02,.16,GOLD,fx,y-.08,z+.36,4);sph(.04,GOLD,fx,y-.17,z+.36,g,6)}}
 }
 // ---------- 2) 麥穗品牌主題：布幔金桿＋麥穗桿頭＋流蘇、屋簷麥穗浮雕 ----------
 const wheat=(x,y,z,s=1,rz=0,p=g)=>{const w=new T.Group();w.position.set(x,y,z);w.rotation.z=rz;w.scale.setScalar(s);p.add(w);cyl(.025,.025,.9,GOLD,0,.0,0,6,w);for(let k=0;k<6;k++){for(const e of[-1,1]){const gr=sph(.07,GOLD,e*.07,-.25+k*.12,0,w,8);gr.scale.set(.7,1.5,.7);gr.rotation.z=-e*.5}}const tip=sph(.07,GOLD,0,.5,0,w,8);tip.scale.set(.7,1.6,.7);return w};
 {const y=13.32,z=3.18;cyl(.07,.07,5.2,GOLD,0,y,z,10).rotation.z=Math.PI/2;for(const e of[-1,1])wheat(e*2.75,y,z,.9,e*Math.PI/2);
  for(let k=0;k<15;k++){const fx=-2.1+k*.3;cyl(.025,.025,.38,GOLD,fx,6.44,3.08,4);sph(.07,GOLD,fx,6.2,3.08,g,8)}
  // 布幔金色麥穗繡邊（左右兩側）
  for(const e of[-1,1])for(let k=0;k<9;k++){const w=wheat(e*2.05,7.0+k*.72,3.1,.42,e*.18);}}
 // 屋簷下一排麥穗浮雕（正面兩翼）
 for(const x of[-5.9,-5.0,-4.1,-3.2,3.2,4.1,5.0,5.9]){wheat(x,TOP-.45,2.66,.45,Math.PI/2*(x<0?1:-1)*.0)}
 // ---------- 3) 屋頂：尖塔金色頂飾、扇形金色屋簷邊、中央塔皇冠欄杆 ----------
 const cones=[[-7.1,-.65,2.06,TOP+.12,3.65],[7.1,-.65,2.06,TOP+.12,3.65],[-9.75,-.95,1.79,FB+ST*2.1+.1,2.65],[9.75,-.95,1.79,FB+ST*2.1+.1,2.65],[0,-3.6,2.65,TOP+4.0,4.25],[-4.35,-2.95,2.18,TOP+.22,3.45],[4.35,-2.95,2.18,TOP+.22,3.45]];
 for(const [x,z,r,by,h] of cones){
  const n=Math.round(r*9);for(let k=0;k<n;k++){const a=k/n*Math.PI*2;const s=sph(.17,GOLD,x+Math.cos(a)*(r+.06),by-.08,z+Math.sin(a)*(r+.06),g,8);s.scale.set(1,.6,.5);s.lookAt(x+Math.cos(a)*(r+2),by-.08,z+Math.sin(a)*(r+2))}
  const tip=by+h;const col=new T.Mesh(new T.TorusGeometry(.17,.05,8,20),GOLD);col.rotation.x=Math.PI/2;col.position.set(x,tip-.05,z);g.add(col);sph(.13,GOLD,x,tip+.06,z,g,10)}
 {const y=TOP+4.0,r=2.28;const rail=new T.Mesh(new T.TorusGeometry(r,.06,8,48),GOLD);rail.rotation.x=Math.PI/2;rail.position.set(0,y+.35,-3.6);g.add(rail);for(let k=0;k<16;k++){const a=k/16*Math.PI*2;cyl(.05,.05,.4,GOLD,Math.cos(a)*r,y+.17,-3.6+Math.sin(a)*r,6);if(k%2===0)sph(.09,GOLD,Math.cos(a)*r,y+.42,-3.6+Math.sin(a)*r,g,8)}}
 // ---------- 4) 頂級圓拱大門（不會動） ----------
 {const z=3.42,W=3.5,yb=1.0,ys=4.3,R2=W/2;
  const sh=new T.Shape();sh.moveTo(-W/2,0);sh.lineTo(W/2,0);sh.lineTo(W/2,ys-yb);sh.absarc(0,ys-yb,R2,0,Math.PI,false);sh.lineTo(-W/2,0);
  const door=new T.Mesh(new T.ShapeGeometry(sh,24),M('#1D3557',{roughness:.55}));door.position.set(0,yb,z);g.add(door);
  const fr=new T.Shape();const W2=W+.5;fr.moveTo(-W2/2,0);fr.lineTo(W2/2,0);fr.lineTo(W2/2,ys-yb);fr.absarc(0,ys-yb,W2/2,0,Math.PI,false);fr.lineTo(-W2/2,0);const hole=new T.Path();hole.moveTo(-W/2,0);hole.lineTo(W/2,0);hole.lineTo(W/2,ys-yb);hole.absarc(0,ys-yb,R2,0,Math.PI,false);hole.lineTo(-W/2,0);fr.holes.push(hole);
  const frame=new T.Mesh(new T.ExtrudeGeometry(fr,{depth:.12,bevelEnabled:false,curveSegments:24}),GOLD);frame.position.set(0,yb,z-.04);g.add(frame);
  // 金框面板（每扇上下兩格）、中縫、門環
  for(const e of[-1,1]){for(const [py,ph] of[[1.95,1.4],[3.6,1.5]]){const pw=1.25;const px=e*.86;box(pw,.06,.05,GOLD,px,py+ph/2,z+.03);box(pw,.06,.05,GOLD,px,py-ph/2,z+.03);box(.06,ph,.05,GOLD,px-pw/2,py,z+.03);box(.06,ph,.05,GOLD,px+pw/2,py,z+.03)}
   const ring=new T.Mesh(new T.TorusGeometry(.17,.035,8,20),GOLD);ring.position.set(e*.42,2.95,z+.09);g.add(ring);sph(.06,GOLD,e*.42,3.12,z+.08,g,8)}
  box(.05,ys-yb+R2,.04,GOLD,0,yb+(ys-yb+R2)/2,z+.03);
  // 門上方拱形區：深藍底金色麥穗扇形
  const fan=new T.Mesh(new T.CircleGeometry(R2-.12,32,0,Math.PI),M('#1D3557'));fan.position.set(0,ys,z+.02);g.add(fan);for(let k=0;k<7;k++){const a=Math.PI*(k+.5)/7;wheat(Math.cos(a)*.9,ys+Math.sin(a)*.9-.05,z+.06,.38,a-Math.PI/2)}
  // 門中央 Logo 圓徽
  const LOGO=new T.TextureLoader().load('./office-logo-transparent.png');LOGO.colorSpace=T.SRGBColorSpace;
  const disc=new T.Mesh(new T.CircleGeometry(.62,40),M('#1D3557'));disc.position.set(0,2.8,z+.08);g.add(disc);const rim=new T.Mesh(new T.TorusGeometry(.62,.06,8,40),GOLD);rim.position.set(0,2.8,z+.1);g.add(rim);
  const lg=new T.Mesh(new T.PlaneGeometry(1.3,1.3),new T.MeshStandardMaterial({map:LOGO,transparent:true,alphaTest:.25,metalness:.3,roughness:.4}));lg.position.set(0,2.8,z+.11);g.add(lg);
  // 造型球樹盆（不加台階）
  for(const e of[-1,1]){const px=e*3.0,pz=4.3;cyl(.42,.32,.6,WHITE,px,1.0,pz,20);const rr=new T.Mesh(new T.TorusGeometry(.42,.04,6,24),GOLD);rr.rotation.x=Math.PI/2;rr.position.set(px,1.3,pz);g.add(rr);cyl(.05,.05,.5,M('#7A5A3A'),px,1.55,pz,6);sph(.55,M('#4F8A55',{roughness:.8}),px,2.2,pz,g,16)}
 }
 // ---------- 5) 大門正上方的 24 小時鐘 ----------
 let hourHand,minHand;{const z=3.4,y=6.85,r=.64;
  const face=ctex(512,512,(x,w,h)=>{x.save();x.beginPath();x.arc(256,256,250,0,7);x.clip();x.fillStyle='#1D3557';x.fillRect(0,0,512,256);x.fillStyle='#FFF8EA';x.fillRect(0,256,512,256);
   x.fillStyle='#F4D27A';for(const [sx,sy,sr] of[[150,120,6],[210,80,4],[330,95,5],[380,150,4],[120,190,3]]){x.beginPath();x.arc(sx,sy,sr,0,7);x.fill()}
   x.beginPath();x.arc(300,165,24,0,7);x.fill();x.fillStyle='#1D3557';x.beginPath();x.arc(312,158,22,0,7);x.fill();
   x.fillStyle='#F2B33D';x.beginPath();x.arc(256,400,26,0,7);x.fill();x.strokeStyle='#F2B33D';x.lineWidth=5;for(let k=0;k<12;k++){const a=k/12*Math.PI*2;x.beginPath();x.moveTo(256+Math.cos(a)*34,400+Math.sin(a)*34);x.lineTo(256+Math.cos(a)*46,400+Math.sin(a)*46);x.stroke()}
   x.restore();
   for(let k=0;k<24;k++){const a=-Math.PI/2+k/24*Math.PI*2;const r1=k%3?222:210;x.strokeStyle='#D9A93A';x.lineWidth=k%3?4:8;x.beginPath();x.moveTo(256+Math.cos(a)*r1,256+Math.sin(a)*r1);x.lineTo(256+Math.cos(a)*240,256+Math.sin(a)*240);x.stroke()}
   x.font='bold 46px Georgia,serif';x.textAlign='center';x.textBaseline='middle';[24,3,6,9,12,15,18,21].forEach((n,i)=>{const a=-Math.PI/2+i/8*Math.PI*2;const up=Math.sin(a)<0;x.fillStyle=(i===0||i===1||i===7)?'#F4D27A':(i>=3&&i<=5)?'#1D3557':(up?'#F4D27A':'#1D3557');x.fillText(String(n),256+Math.cos(a)*176,256+Math.sin(a)*176)});
   x.fillStyle='#B8892E';x.font='bold 30px Georgia,serif';x.fillText('24 HOURS',256,330)});
  const fm=new T.Mesh(new T.CircleGeometry(r,48),new T.MeshStandardMaterial({map:face,roughness:.5}));fm.position.set(0,y,z);g.add(fm);
  const ring=new T.Mesh(new T.TorusGeometry(r+.05,.09,10,48),GOLD);ring.position.set(0,y,z+.02);g.add(ring);
  for(let k=0;k<20;k++){const a=k/20*Math.PI*2;const lf=sph(.09,GOLD,Math.cos(a)*(r+.2),y+Math.sin(a)*(r+.2),z,g,8);lf.scale.set(.6,1.4,.5);lf.rotation.z=a}
  /* v501：鐘上方的小皇冠拿掉，不再壓到 WEIYANG 字樣 */
  hourHand=new T.Group();hourHand.position.set(0,y,z+.06);g.add(hourHand);box(.06,.38,.03,GOLD,0,.19,0,hourHand);const sun=sph(.07,M('#F2B33D',{emissive:'#F2B33D',emissiveIntensity:.2}),0,.4,0,hourHand,10);
  minHand=new T.Group();minHand.position.set(0,y,z+.08);g.add(minHand);box(.03,.54,.025,GOLD,0,.27,0,minHand);sph(.07,GOLD,0,0,.02,minHand,10)}
 // ---------- 6) 金色銘牌（24 小時） ----------
 {const t=ctex(256,512,(x,w,h)=>{x.fillStyle='#14141A';x.fillRect(0,0,w,h);x.strokeStyle='#D9B45A';x.lineWidth=8;x.strokeRect(10,10,w-20,h-20);x.fillStyle='#E8C66E';x.textAlign='center';x.font='bold 40px "Noto Serif TC",serif';const L='德威陽國際法律事務所';[...L].forEach((ch,i)=>x.fillText(ch,w/2-40,60+i*40));x.font='bold 54px Georgia';x.save();x.translate(w/2+52,h/2);x.rotate(Math.PI/2);x.fillText('24H',0,0);x.restore()});
  const pl=new T.Mesh(new T.PlaneGeometry(.55,1.1),new T.MeshStandardMaterial({map:t,roughness:.35,metalness:.2}));pl.position.set(2.38,2.6,2.94);g.add(pl);box(.62,1.17,.04,GOLD,2.38,2.6,2.91)}
 // ---------- 7) 夜晚：窗戶暖光（固定不閃）與牆腳投射光 ----------
 const winMats=new Set();R.traverse(o=>{if(o.isMesh&&o.material&&o.material.color&&o.material.color.getHexString()==='ffe8c7')winMats.add(o.material)});
 const wash=ctex(8,256,(x,w,h)=>{const gr=x.createLinearGradient(0,h,0,0);gr.addColorStop(0,'rgba(255,214,150,.75)');gr.addColorStop(.6,'rgba(255,214,150,.15)');gr.addColorStop(1,'rgba(255,214,150,0)');x.fillStyle=gr;x.fillRect(0,0,w,h)});
 const washM=new T.MeshBasicMaterial({map:wash,transparent:true,depthWrite:false,blending:T.AdditiveBlending,opacity:0,fog:false});const washes=[];
 /* v501：牆面投射光加強（更寬、更高、更亮，仍是固定不閃） */
 for(const x of[-8.4,-6.45,-4.4,-2.38,2.38,4.4,6.45,8.4]){const p=new T.Mesh(new T.PlaneGeometry(2.9,10.5),washM);p.position.set(x,5.6,3.02);p.renderOrder=3;p.visible=false;g.add(p);washes.push(p)}
 let k=0,bellDone=false,AC=null;
 function midnightBell(){try{const d=document.createElement('div');d.textContent='午夜十二點，德威陽的燈還亮著';d.style.cssText='position:fixed;left:50%;top:96px;transform:translateX(-50%);z-index:80;background:rgba(31,52,96,.9);color:#FFE7A8;border:1px solid #F0C75E;border-radius:14px;padding:8px 14px;font:600 13px "Noto Sans TC",sans-serif;pointer-events:none;transition:opacity .6s';document.body.appendChild(d);setTimeout(()=>{d.style.opacity=0;setTimeout(()=>d.remove(),800)},6000)}catch(e){}
  try{if(localStorage.getItem('wy-sound')==='off')return;AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t0=AC.currentTime+.1;for(let n=0;n<12;n++){const t=t0+n*2.2;for(const [f,v] of[[392,.22],[784,.08],[1176,.04]]){const o=AC.createOscillator(),gn=AC.createGain();o.type='sine';o.frequency.value=f;gn.gain.setValueAtTime(0,t);gn.gain.linearRampToValueAtTime(v,t+.02);gn.gain.exponentialRampToValueAtTime(.0005,t+2.0);o.connect(gn);gn.connect(AC.destination);o.start(t);o.stop(t+2.1)}}}catch(e){}}
 window.__wyMidnightBell=midnightBell;
 return function tick(dt){const ph=c.phase();const tg=ph==='night'?1:ph==='dusk'?.5:0;k+=(tg-k)*Math.min(1,(dt||.016)*.8);
  for(const m of winMats){m.emissive=m.emissive||new T.Color();m.emissive.set('#FFB65C');m.emissiveIntensity=k*1.5}
  washM.opacity=k*1.0;washes.forEach(p=>p.visible=k>.02);
  let hh=12,mm=0;try{const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Taipei',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());hh=+p.find(q=>q.type==='hour').value%24;mm=+p.find(q=>q.type==='minute').value}catch(e){}
  hourHand.rotation.z=-((hh+mm/60)/24)*Math.PI*2;minHand.rotation.z=-(mm/60)*Math.PI*2;
  /* v501：午夜 12 點（台北時間）城堡大鐘敲 12 下，聲音柔和；靜音時只顯示提示 */
  if(hh===0&&mm===0&&!bellDone){bellDone=true;midnightBell()}else if(hh!==0)bellDone=false};
}
