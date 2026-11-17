// 德威陽｜有法度 v499 四座島本體升級（陳老闆定稿四項）：醫療圓頂與塔頂、家庭花箱拱門天鵝湖、訴訟柱頭與屋頂欄杆、企業停機坪直升機
export function setupIsleLux(T, c){
 const scene=c.scene, G=c.groups();
 const MC=new Map();const M=(col,o)=>{const k=col+(o?JSON.stringify(o):'');if(!MC.has(k))MC.set(k,new T.MeshStandardMaterial({color:col,roughness:.5,...(o||{})}));return MC.get(k)};
 const GOLD=M('#F4C552',{metalness:.55,roughness:.28});const NAVY=M('#2B3A67',{roughness:.6});const ctex=(w,h,fn)=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;fn(cv.getContext('2d'),w,h);const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t};const WHITE=M('#FFF8EE',{roughness:.5});
 const box=(w,h,d,m)=>new T.Mesh(new T.BoxGeometry(w,h,d),m);const cyl=(a,b,h,m,s=16)=>new T.Mesh(new T.CylinderGeometry(a,b,h,s),m);
 const sph=(r,m,sx=1,sy=1,sz=1,s=16)=>{const o=new T.Mesh(new T.SphereGeometry(r,s,Math.max(8,s*.7|0)),m);o.scale.set(sx,sy,sz);return o};
 const at=(o,x,y,z,p)=>{o.position.set(x,y,z);(p||root).add(o);return o};
 const root=new T.Group();root.name='wyIsleLux';scene.add(root);const movers=[];const glow=[];
 const glowM=(col,em='#FFC86A')=>{const m=new T.MeshStandardMaterial({color:col,roughness:.35,emissive:em,emissiveIntensity:.15});glow.push(m);return m};
 const solid=(x,z,hx,hz)=>{try{c.addSolid&&c.addSolid(x,z,hx,hz)}catch(e){}};
 const phase=()=>{try{return window.wySky?window.wySky.phase():'day'}catch(e){return 'day'}};
 // ---------- 共用小物 ----------
 const lamp=(x,z,h=3.4,col='#1F2A44',y0=.85)=>{const g=new T.Group();g.position.set(x,y0,z);root.add(g);const p=cyl(.09,.13,h,M(col,{metalness:.4,roughness:.35}),10);p.position.y=h/2;g.add(p);const hd=sph(.3,glowM('#FFF4D6'));hd.position.y=h+.15;g.add(hd);const cp=new T.Mesh(new T.ConeGeometry(.34,.32,12),GOLD);cp.position.y=h+.5;g.add(cp);solid(x,z,.2,.2);return g};
 const topiary=(x,z,y0=.85,s=1)=>{const g=new T.Group();g.position.set(x,y0,z);g.scale.setScalar(s);root.add(g);const pot=cyl(.45,.34,.6,GOLD,16);pot.position.y=.3;g.add(pot);const b1=sph(.55,M('#3E9A4C',{roughness:.8}));b1.position.y=1.05;g.add(b1);const b2=sph(.38,M('#4FAE58',{roughness:.8}));b2.position.y=1.75;g.add(b2);solid(x,z,.4,.4);return g};
 const carpet=(x,z0,z1,y=.87,w=2.2)=>{at(box(w,.05,z1-z0,M('#B3141C',{roughness:.85})),x,y,(z0+z1)/2);for(const e of[-1,1])at(box(.08,.06,z1-z0,GOLD),x+e*w/2,y+.01,(z0+z1)/2)};
 const hedge=(x,z,w,d,y0=.85)=>{const h=box(w,.75,d,M('#3E9A4C',{roughness:.85}));at(h,x,y0+.38,z);solid(x,z,w/2,d/2);return h};
 const flowers=(x,z,w,d,cols,y=1.3)=>{const n=Math.round(w*d*2);const geo=new T.SphereGeometry(.14,8,6);for(let i=0;i<n;i++){const f=new T.Mesh(geo,M(cols[i%cols.length],{roughness:.6}));f.scale.y=.7;f.position.set(x+(Math.random()-.5)*w,y,z+(Math.random()-.5)*d);root.add(f)}};
 const flag=(x,z,h,col,y0=.85)=>{const g=new T.Group();g.position.set(x,y0,z);root.add(g);at(cyl(.06,.08,h,GOLD,8),0,h/2,0,g);at(sph(.14,GOLD),0,h+.1,0,g);const fl=new T.Mesh(new T.PlaneGeometry(1.6,1.0,8,1),M(col,{side:T.DoubleSide,roughness:.7}));fl.position.set(.82,h-.6,0);g.add(fl);const pos=fl.geometry.attributes.position,base=pos.array.slice();movers.push(t=>{for(let i=0;i<pos.count;i++){const xx=base[i*3];pos.setZ(i,Math.sin(t*3+xx*2.4+x)*.12*(xx+.8))}pos.needsUpdate=true});solid(x,z,.15,.15);return g};
 // 晚上：原本窗戶材質透出暖光（只改指定顏色的材質，不動其他）
 const winGlow=(g,hexes,int=.7)=>{const seen=new Map();g.traverse(o=>{if(!o.isMesh||!o.material||!o.material.color)return;const h=o.material.color.getHexString();if(!hexes.includes(h))return;if(!seen.has(o.material)){const m=o.material.clone();m.emissive=new T.Color('#FFC86A');m.emissiveIntensity=0;m.userData.wyGlowMax=int;seen.set(o.material,m);glow.push(m)}o.material=seen.get(o.material)})};
 // 金色收邊加淡淡金屬光澤（環境反射，只對金色系材質）
 const goldSheen=(g)=>{g.traverse(o=>{if(!o.isMesh||!o.material||!o.material.color)return;const col=o.material.color;const hsl={};col.getHSL(hsl);if(hsl.h>.09&&hsl.h<.16&&hsl.s>.35&&hsl.l>.35&&hsl.l<.75&&!o.material.userData.wySheen){const m=o.material.clone();m.metalness=Math.max(m.metalness||0,.55);m.roughness=Math.min(m.roughness||1,.32);m.envMapIntensity=1;m.userData.wySheen=1;o.material=m}})};
 const IX=42,IZ=-82;
 // ================= 訴訟島（橘）：柱頭柱腳＋屋頂欄杆 =================
 { // 24 四根大柱：直條紋＋放大的金色柱頭柱腳
  for(const x of[-56,-54.1,-45.9,-44]){const z=-27.1;for(let k=0;k<10;k++){const a=k/10*Math.PI*2;at(box(.07,8.4,.07,M('#EFE4CF')),x+Math.cos(a)*.63,5.4,z+Math.sin(a)*.63)}at(cyl(.92,.66,.55,GOLD,20),x,9.75,z);at(cyl(.9,.9,.12,GOLD,20),x,9.42,z);at(cyl(.78,.86,.5,GOLD,20),x,1.25,z)}
  // 25 屋頂欄杆＋金色瓶飾（主殿正面屋簷）
  {const y=11.85,z=-29.35;at(box(13.6,.16,.22,WHITE),-50,y+.75,z);at(box(13.6,.16,.3,WHITE),-50,y+.08,z);for(let k=0;k<=24;k++)at(cyl(.07,.09,.6,WHITE,8),-56.7+k*13.4/24,y+.42,z);for(let k=0;k<=6;k++){const u=sph(.26,GOLD,1,1.35,1);at(u,-56.7+k*13.4/6,y+1.15,z);at(cyl(.14,.18,.2,GOLD,10),-56.7+k*13.4/6,y+.9,z)}}
 }
 // ================= 醫療島（綠）：圓頂淡翠綠＋圓塔綠頂金冠 =================
 {const g=G[2]; // 29 玻璃圓頂調成淡翠綠、不透明（保留原本金色經緯骨架）
  g.traverse(o=>{if(!o.isMesh||!o.material||!o.material.color)return;const b=new T.Box3().setFromObject(o);if(o.material.color.getHexString()==='c9f1fb'&&(o.geometry.type==='SphereGeometry'||o.geometry.type==='CylinderGeometry')){const m=o.material.clone();m.color.set(o.geometry.type==='SphereGeometry'?'#A8E8C8':'#BDEFD6');m.transparent=false;m.opacity=1;m.roughness=.18;m.metalness=.15;m.emissive=new T.Color('#FFF2C8');m.emissiveIntensity=0;o.material=m}});
  // 30 兩座圓塔頂金色冠頂＋小尖頂
  for(const x of[-51.15,-32.85]){const z=-84.1;at(cyl(3.25,3.25,.35,GOLD,32),x,11.4,z);for(let k=0;k<12;k++){const a=k/12*Math.PI*2;at(new T.Mesh(new T.ConeGeometry(.22,.6,6),GOLD),x+Math.cos(a)*3.0,11.85,z+Math.sin(a)*3.0)}const dm=new T.Mesh(new T.SphereGeometry(2.2,24,12,0,Math.PI*2,0,Math.PI/2),M('#4FBF8F',{roughness:.4}));at(dm,x,11.55,z);at(cyl(.06,.12,1.6,GOLD,8),x,14.5,z);at(sph(.2,GOLD),x,15.35,z)}
 }
 // ================= 家庭島（酒紅）：花箱、玫瑰拱門長廊、天鵝湖 =================
 {const g=G[3]; // 35 窗台花箱（每扇窗下）
  for(const wx of[44.6,47.1,52.9,55.4])for(const wy of[2.0,6.5]){at(box(2.0,.3,.42,M('#8A5A36')),wx,wy-.12,-25.55);for(let k=0;k<7;k++){const f=sph(.13,M(['#E0304F','#FF8FB8','#FFFFFF'][k%3]),1,1,1,8);at(f,wx-.8+k*.27,wy+.12,-25.45)}}
  // 36 玫瑰拱門長廊＋燈串（門前步道）
  for(let k=0;k<4;k++){const z=-23.2+k*2.2;const arch=new T.Mesh(new T.TorusGeometry(1.9,.12,8,24,Math.PI),M('#FFFFFF'));at(arch,50,2.65,z);for(const e of[-1,1]){at(box(.18,1.8,.18,WHITE),50+e*1.9,1.75,z);solid(50+e*1.9,z,.15,.15)}
   for(let q=0;q<11;q++){const a=q/10*Math.PI;at(sph(.16,M(q%3?'#E0304F':'#FF8FB8'),1,1,1,8),50+Math.cos(a)*1.9,2.65+Math.sin(a)*1.9,z);if(q%2===0)at(sph(.07,glowM('#FFF6DD','#FFD98A'),1,1,1,8),50+Math.cos(a)*2.02,2.65+Math.sin(a)*2.02,z+.12)}}
 {   const lx=59.9,lz=-21.7;const lake=new T.Mesh(new T.CircleGeometry(2.0,40),M('#5DB5E6',{roughness:.1,metalness:.2}));lake.rotation.x=-Math.PI/2;at(lake,lx,.12,lz);const lr=new T.Mesh(new T.TorusGeometry(2.0,.18,8,40),M('#E8E2D6'));lr.rotation.x=Math.PI/2;at(lr,lx,.14,lz);solid(lx,lz,2.1,2.1);
   const sw2=[];for(let k=0;k<2;k++){const s=new T.Group();s.add(sph(.32,WHITE,1,.7,1.4));const nk=new T.Mesh(new T.TorusGeometry(.27,.065,8,16,Math.PI),WHITE);nk.position.set(0,.28,.32);nk.rotation.y=Math.PI/2;s.add(nk);const bk=new T.Mesh(new T.ConeGeometry(.05,.15,6),M('#F28C28'));bk.rotation.x=Math.PI/2;bk.position.set(0,.54,.58);s.add(bk);at(s,lx,.24,lz);sw2.push(s)}movers.push(t=>sw2.forEach((s,k)=>{const a=t*.25+k*Math.PI;s.position.x=lx+Math.cos(a)*1.0;s.position.z=lz+Math.sin(a)*1.0;s.rotation.y=-a}))}}
 // ================= 企業島（紫）：頂樓停機坪＋金色直升機 =================
 {const g=G[4];
 // 1) 頂樓停機坪＋金色直升機
 {const g=new T.Group();g.position.set(IX+.6,19.62,IZ-5.6);root.add(g);
  const pad=cyl(2.7,2.7,.18,NAVY,40);g.add(pad);const ring=new T.Mesh(new T.TorusGeometry(2.45,.09,8,48),GOLD);ring.rotation.x=Math.PI/2;ring.position.y=.11;g.add(ring);
  const hT=ctex(128,128,(x,w,h)=>{x.clearRect(0,0,w,h);x.fillStyle='#FFFFFF';x.font='bold 100px Arial';x.textAlign='center';x.textBaseline='middle';x.fillText('H',w/2,h/2+6)});const hm=new T.Mesh(new T.PlaneGeometry(2.2,2.2),new T.MeshBasicMaterial({map:hT,transparent:true}));hm.rotation.x=-Math.PI/2;hm.position.y=.1;g.add(hm);
  const lights=[];for(let k=0;k<8;k++){const a=k/8*Math.PI*2;const l=new T.Mesh(new T.SphereGeometry(.12,8,6),new T.MeshStandardMaterial({color:'#9AD8FF',emissive:'#5AC8FF',emissiveIntensity:1}));l.position.set(Math.cos(a)*2.75,.14,Math.sin(a)*2.75);g.add(l);lights.push(l)}
  const heli=new T.Group();heli.position.set(0,.35,0);heli.rotation.y=.9;heli.scale.setScalar(1.35);g.add(heli);const HG=M('#F5C542',{metalness:.55,roughness:.25});
  const body=new T.Mesh(new T.SphereGeometry(.9,24,16),HG);body.scale.set(1,.85,1.55);body.position.y=.75;heli.add(body);const glass=new T.Mesh(new T.SphereGeometry(.72,20,14,0,Math.PI*2,0,Math.PI*.55),M('#1F3A75',{roughness:.1,metalness:.3}));glass.rotation.x=1.1;glass.position.set(0,.95,.75);glass.scale.set(1,.9,1.1);heli.add(glass);
  const boom=cyl(.16,.08,2.6,HG,10);boom.rotation.x=Math.PI/2;boom.position.set(0,.95,-2.2);heli.add(boom);const fin=box(.08,.7,.5,HG);fin.position.set(0,1.3,-3.4);heli.add(fin);
  const tr=new T.Group();tr.position.set(.12,1.3,-3.4);heli.add(tr);for(let k=0;k<2;k++){const b=box(.03,.9,.12,M('#FFFFFF'));b.rotation.x=k*Math.PI/2;tr.add(b)}
  for(const e of[-1,1]){const sk=cyl(.05,.05,2.2,GOLD,8);sk.rotation.x=Math.PI/2;sk.position.set(e*.7,.05,.1);heli.add(sk);for(const z of[-.5,.6]){const st=cyl(.04,.04,.45,GOLD,6);st.position.set(e*.6,.25,z);st.rotation.z=e*.3;heli.add(st)}}
  const mast=cyl(.07,.07,.4,M('#333333'),8);mast.position.set(0,1.65,.1);heli.add(mast);const rot=new T.Group();rot.position.set(0,1.88,.1);heli.add(rot);for(let k=0;k<2;k++){const b=box(5.4,.05,.28,M('#2B2B2B'));b.rotation.y=k*Math.PI/2;rot.add(b)}
  const logo=new T.Mesh(new T.CircleGeometry(.32,24),new T.MeshStandardMaterial({map:ctex(128,128,(x,w,h)=>{x.fillStyle='#16264A';x.beginPath();x.arc(64,64,62,0,7);x.fill();x.fillStyle='#F2C14E';x.font='bold 60px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText('WY',64,68)})}));logo.position.set(.9,.8,0);logo.rotation.y=Math.PI/2;heli.add(logo);const logo2=logo.clone();logo2.position.x=-.9;logo2.rotation.y=-Math.PI/2;heli.add(logo2);
  movers.push((t,dt)=>{rot.rotation.y+=dt*2.2;tr.rotation.x+=dt*6;const n=phase()==='night'?1:.3;lights.forEach((l,k)=>l.material.emissiveIntensity=n*(.5+.5*Math.max(0,Math.sin(t*3-k*.8))))})}

  // 39 紫旗移到主塔後方另一角，讓停機坪完整露出
  g.traverse(o=>{if(!o.isMesh)return;const b=new T.Box3().setFromObject(o);if(b.min.y>19.4&&b.max.x<46.5&&b.min.x>40.3&&b.max.z>-84.5){const p=o.parent;const v=new T.Vector3(4.6,0,-6.0);const inv=new T.Matrix4().copy(p.matrixWorld).invert();const a=o.getWorldPosition(new T.Vector3());const tgt=a.clone().add(v);p.worldToLocal(tgt);o.position.copy(tgt)}})}
 let tt=0;return function tick(dt){tt+=dt;const ins=c.inside&&c.inside();root.visible=!ins;if(ins)return;const ph=phase();const n=ph==='night'?1:ph==='dusk'?.5:0;for(const m of glow)m.emissiveIntensity=(m.userData.wyGlowMax||.9)*n+(m.userData.wyGlowMax?0:.15);for(const f of movers){try{f(tt,dt)}catch(e){}}};
}
