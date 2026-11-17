// 德威陽｜有法度 v498 成員節日換裝（春節、中秋、端午、情人節、七夕、聖誕）
// 由 wy-fest.js 呼叫 window.wyRedressStaff 套用到島上四位成員；預覽定稿見 claude/有法度-v498 規劃。
export function makeOutfits(T){
const ANIM=[];
const M=(c,o={})=>new T.MeshStandardMaterial({color:c,roughness:.5,...o});const sph=(r,c,sx=1,sy=1,sz=1,ws=20,hs=14)=>{const m=new T.Mesh(new T.SphereGeometry(r,ws,hs),typeof c==='string'?M(c):c);m.scale.set(sx,sy,sz);return m};
const cyl=(a,b,h,c,s=16)=>new T.Mesh(new T.CylinderGeometry(a,b,h,s),typeof c==='string'?M(c):c);const tor=(r,t,c,arc=Math.PI*2,s=28)=>new T.Mesh(new T.TorusGeometry(r,t,8,s,arc),typeof c==='string'?M(c):c);
const ctex=(w,h,fn)=>{const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t};
const brocade=(base,fg)=>ctex(256,256,(x,w,h)=>{x.fillStyle=base;x.fillRect(0,0,w,h);x.strokeStyle=fg;x.fillStyle=fg;for(const [cx,cy] of[[64,64],[192,192],[192,64],[64,192]]){const big=(cx+cy)%256===128?0:1;x.lineWidth=4;x.beginPath();x.arc(cx,cy,big?34:20,0,7);x.stroke();for(let k=0;k<8;k++){const a=k/8*Math.PI*2;x.beginPath();x.ellipse(cx+Math.cos(a)*(big?20:11),cy+Math.sin(a)*(big?20:11),big?9:5,big?5:3,a,0,7);x.fill()}x.beginPath();x.arc(cx,cy,big?7:4,0,7);x.fill()}x.lineWidth=3;for(const [cx,cy] of[[128,0],[0,128],[128,256],[256,128],[128,128]]){x.beginPath();x.arc(cx-8,cy,8,Math.PI,0);x.arc(cx+8,cy,8,Math.PI,0);x.stroke()}});
const GOLD=M('#F2C14E',{metalness:.55,roughness:.28});
const outline=(m,k=1.06)=>{const o=new T.Mesh(m.geometry,new T.MeshBasicMaterial({color:'#1A1A1A',side:T.BackSide}));o.scale.setScalar(k);m.add(o);return m};
// ---------- 道具 ----------
function redEnvelope(){const g=new T.Group();const t=ctex(128,192,(x,w,h)=>{x.fillStyle='#D7261E';x.fillRect(0,0,w,h);x.strokeStyle='#F2C14E';x.lineWidth=6;x.strokeRect(8,8,w-16,h-16);x.fillStyle='#F2C14E';x.beginPath();x.arc(w/2,h*.42,36,0,7);x.fill();x.fillStyle='#D7261E';x.font='bold 48px "Noto Serif TC","Noto Serif CJK TC","PMingLiU","Songti TC",serif';x.textAlign='center';x.textBaseline='middle';x.fillText('福',w/2,h*.43)});
 const b=new T.Mesh(new T.BoxGeometry(.2,.3,.02),[M('#D7261E'),M('#D7261E'),M('#D7261E'),M('#D7261E'),new T.MeshStandardMaterial({map:t,roughness:.4}),M('#D7261E')]);g.add(b);return g}
function ingot(){const g=new T.Group();const base=sph(.16,GOLD,1.5,.55,.9);g.add(base);for(const e of[-1,1]){const w=sph(.08,GOLD,1,1,1);w.position.set(e*.17,.07,0);g.add(w)}const top=sph(.08,GOLD,1,.9,1);top.position.y=.08;g.add(top);return g}
function frog(){const g=new T.Group();for(const e of[-1,1]){const l=tor(.035,.012,GOLD);l.position.x=e*.04;g.add(l)}g.add(sph(.02,GOLD));return g}
function flower(c1,c2,r=.12){const g=new T.Group();for(let k=0;k<6;k++){const a=k/6*Math.PI*2;const p=sph(r*.55,c1,1,.45,1);p.position.set(Math.cos(a)*r*.6,Math.sin(a)*r*.6,0);p.rotation.x=Math.PI/2;g.add(p)}for(let k=0;k<5;k++){const a=k/5*Math.PI*2+.3;const p=sph(r*.35,c1,1,.45,1);p.position.set(Math.cos(a)*r*.3,Math.sin(a)*r*.3,.03);p.rotation.x=Math.PI/2;g.add(p)}const c=sph(r*.22,c2);c.position.z=.05;g.add(c);return g}
function rose(){const r2=new T.Group();const fl=sph(.1,'#C81D3A',1,.9,1);fl.position.y=.28;r2.add(fl);for(let q=0;q<7;q++){const a=q/7*Math.PI*2;const pp=sph(.075,'#E0304F',1,.75,.45);pp.position.set(Math.cos(a)*.08,.26,Math.sin(a)*.08);pp.rotation.y=-a;r2.add(pp)}for(const e of[-1,1]){const sp=new T.Mesh(new T.ConeGeometry(.04,.09,4),M('#2F8F4E'));sp.position.set(e*.04,.19,0);sp.rotation.z=Math.PI+e*.6;r2.add(sp)}const st=cyl(.014,.014,.42,'#2F8F4E',6);st.position.y=-.02;r2.add(st);for(const e of[-1,1]){const lf=sph(.06,'#3F9A3E',1.7,.3,.8);lf.position.set(e*.06,.04+e*.05,0);lf.rotation.z=e*.5;r2.add(lf)}return r2}
function bow(col,s=1){const w=new T.Group();const m=M(col,{roughness:.35});for(const e of[-1,1]){const l=sph(.2,m,1.25,.85,.38);l.position.x=e*.24;l.rotation.z=e*.25;w.add(l);const inner=sph(.09,M(col,{roughness:.6,color:new T.Color(col).multiplyScalar(.7)}),1.2,.7,.3);inner.position.set(e*.17,0,.06);w.add(inner);const tl=new T.Mesh(new T.BoxGeometry(.1,.38,.04),m);tl.position.set(e*.1,-.27,-.02);tl.rotation.z=e*.35;w.add(tl)}w.add(sph(.09,m,1,1,.6));w.scale.setScalar(s);return w}
function zongzi(){// 圓角三角錐＋竹葉條紋手繪貼圖＋黑色描邊（平面插畫感）
 const geo=new T.SphereGeometry(1,64,40);const N=[new T.Vector3(0,-1,0)];for(let k=0;k<3;k++){const a=k/3*Math.PI*2+Math.PI/2;N.push(new T.Vector3(Math.cos(a)*Math.sqrt(8)/3,1/3,Math.sin(a)*Math.sqrt(8)/3))}
 const p=geo.attributes.position,v=new T.Vector3();for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).normalize();let mx=-9;for(const n of N)mx=Math.max(mx,v.dot(n));const rr=(1/(3*mx))*.72+.28*.55;p.setXYZ(i,v.x*rr,v.y*rr,v.z*rr)}geo.computeVertexNormals();
 const t=ctex(1024,512,(x,w,h)=>{x.fillStyle='#4E9A3A';x.fillRect(0,0,w,h);const cols=['#3F8A31','#5FB04A','#4E9A3A','#6CC257'];for(let k=-20;k<40;k++){x.fillStyle=cols[(k+40)%4];x.beginPath();x.moveTo(k*60,0);x.lineTo(k*60+60,0);x.lineTo(k*60+60-300,h);x.lineTo(k*60-300,h);x.closePath();x.fill();x.strokeStyle='#1A1A1A';x.lineWidth=5;x.beginPath();x.moveTo(k*60,0);x.lineTo(k*60-300,h);x.stroke();x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=3;x.beginPath();x.moveTo(k*60+30,0);x.lineTo(k*60+30-300,h);x.stroke()}});
 const z=new T.Mesh(geo,new T.MeshStandardMaterial({map:t,roughness:.6}));outline(z,1.05);const g=new T.Group();g.add(z);
 const str=M('#B9C2C9',{roughness:.5});const band=new T.Mesh(new T.TorusGeometry(.5,.045,8,48),str);band.rotation.x=Math.PI/2;band.position.y=.02;band.scale.set(1,1,1);g.add(band);
 const bw=new T.Group();for(const e of[-1,1]){const l=new T.Mesh(new T.TorusGeometry(.12,.035,8,20),str);l.position.x=e*.13;l.scale.set(1.2,1,1);bw.add(l);const tl=cyl(.03,.03,.22,str,6);tl.position.set(e*.07,-.15,0);tl.rotation.z=e*.4;bw.add(tl)}bw.add(sph(.05,str));bw.position.set(0,.02,.56);g.add(bw);return g}
function pomeloHat(){const g=new T.Group();
 const pt=ctex(512,256,(x,w,h)=>{const gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#C9D45A');gr.addColorStop(.6,'#DCE37E');gr.addColorStop(1,'#E8E9A0');x.fillStyle=gr;x.fillRect(0,0,w,h);for(let i=0;i<5000;i++){x.fillStyle=`rgba(150,165,60,${.12+Math.random()*.12})`;x.fillRect(Math.random()*w,Math.random()*h,1.4,1.4)}for(let i=0;i<400;i++){x.fillStyle='rgba(255,255,230,.25)';x.fillRect(Math.random()*w,Math.random()*h,2,2)}});
 // 文旦外形：上窄微尖、下寬，底部平切開口
 const prof=[];for(let k=0;k<=30;k++){const t=k/30;const y=t*.58;const r=.5*Math.pow(1-Math.pow(t,2.2),.55)*(1-.12*t);prof.push(new T.Vector2(Math.max(r,.001),y))}prof.push(new T.Vector2(.001,.6))
 const outer=new T.Mesh(new T.LatheGeometry(prof,48),new T.MeshStandardMaterial({map:pt,roughness:.55,side:T.FrontSide}));g.add(outer);
 const innerP=prof.map(v=>new T.Vector2(Math.max(v.x-.07,.001),v.y));const inner=new T.Mesh(new T.LatheGeometry(innerP,48),M('#FFFBEA',{side:T.BackSide,roughness:.9}));g.add(inner);
 // 一刀平切的切口：厚厚一圈白色內皮
 const cut=new T.Mesh(new T.RingGeometry(.43,.5,48),M('#FFF6DC',{side:T.DoubleSide,roughness:.9}));cut.rotation.x=Math.PI/2;cut.position.y=.002;g.add(cut);const lip=new T.Mesh(new T.TorusGeometry(.47,.035,10,48),M('#FFF6DC',{roughness:.9}));lip.rotation.x=Math.PI/2;g.add(lip);
 const st=cyl(.025,.035,.08,'#7A6A2A',8);st.position.y=.62;g.add(st);const lf=sph(.12,M('#4FA24A',{roughness:.4}),1.6,.2,.75);lf.position.set(.13,.61,.03);lf.rotation.z=-.5;g.add(lf);const vn=cyl(.005,.005,.3,'#8ED07A',3);vn.rotation.z=Math.PI/2-.5;vn.position.set(.13,.63,.03);g.add(vn);
 g.position.y=-.02;return g}
function mooncake(){const g=new T.Group();const sh=new T.Shape();const R0=.2;for(let k=0;k<=120;k++){const a=k/120*Math.PI*2;const r=R0+Math.abs(Math.sin(a*6))*.025;const x=Math.cos(a)*r,y=Math.sin(a)*r;k?sh.lineTo(x,y):sh.moveTo(x,y)}
 const geo=new T.ExtrudeGeometry(sh,{depth:.08,bevelEnabled:true,bevelSize:.02,bevelThickness:.03,bevelSegments:4,curveSegments:8});
 const t=ctex(256,256,(x,w,h)=>{const gr=x.createRadialGradient(w/2,h/2,10,w/2,h/2,128);gr.addColorStop(0,'#E0AC5C');gr.addColorStop(1,'#B97A30');x.fillStyle=gr;x.fillRect(0,0,w,h);x.strokeStyle='#8A521C';x.lineWidth=6;x.beginPath();x.arc(w/2,h/2,74,0,7);x.stroke();x.lineWidth=4;for(let k=0;k<8;k++){const a=k/8*Math.PI*2;x.beginPath();x.ellipse(w/2+Math.cos(a)*94,h/2+Math.sin(a)*94,14,8,a,0,7);x.stroke()}x.fillStyle='#8A521C';x.font='bold 80px "Noto Serif TC","Noto Serif CJK TC","PMingLiU","Songti TC",serif';x.textAlign='center';x.textBaseline='middle';x.fillText('月',w/2,h/2+4)});
 t.repeat.set(1/.5,1/.5);t.offset.set(.5,.5);const top=new T.MeshStandardMaterial({map:t,roughness:.45});const side=M('#B5762C',{roughness:.45});const m=new T.Mesh(geo,[top,side]);m.rotation.x=-Math.PI/2;m.position.y=-.04;g.add(m);return g}
function lantern(){const g=new T.Group();const body=sph(.13,new T.MeshStandardMaterial({color:'#E0332B',emissive:'#FF5A2A',emissiveIntensity:.4}),1,.9,1);g.add(body);for(const y of[.12,-.12]){const c=cyl(.06,.06,.03,GOLD,12);c.position.y=y;g.add(c)}for(let k=0;k<6;k++){const a=k/6*Math.PI*2;const rib=tor(.13,.006,GOLD,Math.PI,16);rib.rotation.set(0,a,Math.PI/2);rib.scale.y=.9;g.add(rib)}const ts=cyl(.012,.03,.12,'#F2C14E',6);ts.position.y=-.2;g.add(ts);const hd=tor(.06,.008,'#7A4A2A',Math.PI,12);hd.position.y=.13;g.add(hd);g.position.y=0;return g}
function bentCone(r,h,col,bend,trim){const geo=new T.CylinderGeometry(.01,r,h,28,24,true);const p=geo.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i),t=(y+h/2)/h;p.setX(i,p.getX(i)+bend*h*t*t*1.1);p.setY(i,y-bend*h*.55*t*t*t+h/2)}geo.computeVertexNormals();const g=new T.Group();g.add(new T.Mesh(geo,M(col,{side:T.DoubleSide,roughness:.7})));const cap=new T.Mesh(new T.CircleGeometry(r,28),M(col));cap.rotation.x=Math.PI/2;g.add(cap);
 const fur=tor(r,.085*r/.36,trim||'#FFFFFF');fur.rotation.x=Math.PI/2;g.add(fur);const pm=sph(.09*r/.36,trim||'#FFFFFF');pm.position.set(bend*h*1.1,h-bend*h*.55,0);g.add(pm);g.userData.tip=pm;return g}
// ---------- 服裝 ----------
const tangA={top:'#a31c24',shirt:'#a31c24',bottom:'#2B2B33',shoes:'#1A1A1E'};
const FIT={cny:[tangA,{qipao:'#d2393f',trim:'#F2C14E',shoes:'#2B2321'},{top:'#1f3a6b',shirt:'#1f3a6b',bottom:'#2B2B33',shoes:'#1A1A1E'},{qipao:'#e0a92e',trim:'#C8342B',shoes:'#2B2321'}],
 qixi:[{top:'#9DB4CC',shirt:'#9DB4CC',bottom:'#5E6F86',shoes:'#3A2A24'},{gown:'#F2C4DE',sash:'#B98AE0',shoes:'#FFFFFF',tights:'#F8D9C5'},{top:'#9DB4CC',shirt:'#9DB4CC',bottom:'#5E6F86',shoes:'#3A2A24'},{gown:'#E3C8F5',sash:'#F29BC0',shoes:'#FFFFFF',tights:'#F8D9C5'}],
 xmas:[{top:'#D7261E',shirt:'#D7261E',bottom:'#D7261E',shoes:'#1A1A1E'},{dress:'#D7261E',lace:'#FFFFFF',shoes:'#1A1A1E',tights:'#FFFFFF'},{top:'#2F8F4E',shirt:'#2F8F4E',bottom:'#C8342B',shoes:'#C8342B'},{top:'#9A6A43',shirt:'#9A6A43',bottom:'#9A6A43',shoes:'#5A3A22'}]};
function dress(fest,i,g,H){if(fest==='cny'){const fo=FIT.cny[i];const base=fo.qipao||fo.top;const fg=i===3?'#C8342B':'#F2C14E';const tx=brocade(base,fg);tx.wrapS=tx.wrapT=T.RepeatWrapping;tx.repeat.set(3,2);g.traverse(o=>{if(o.isMesh&&o.material.color&&'#'+o.material.color.getHexString()===base.toLowerCase()){o.material=o.material.clone();o.material.map=tx;o.material.color.set('#FFFFFF');o.material.needsUpdate=true}})}const P=(m,x,y,z,s=1)=>{m.position.set(x*H,y*H,z*H);m.scale.multiplyScalar(s*H);g.add(m);return m};const handR=[.17,.18,.06],handL=[-.17,.18,.06];
 const male=i===0||i===2;
 if(fest==='cny'){if(male){const col=P(cyl(.07,.078,.035,'#F2C14E',24),0,.36,0);for(const y of[.3,.245,.19])P(frog(),0,y,.112,.6);const lp=P(new T.Mesh(new T.BoxGeometry(.012,.2,.01),GOLD),0,.25,.11);
   const med=new T.Mesh(new T.CircleGeometry(.045,24),new T.MeshStandardMaterial({map:ctex(128,128,(x,w,h)=>{x.fillStyle='#F2C14E';x.beginPath();x.arc(64,64,62,0,7);x.fill();x.fillStyle=i?'#C8342B':'#C8342B';x.font='bold 80px "Noto Serif TC","Noto Serif CJK TC","PMingLiU","Songti TC",serif';x.textAlign='center';x.textBaseline='middle';x.fillText('福',64,68)}),roughness:.4}));med.position.set(-.065*H,.27*H,.098*H);med.rotation.y=-.45;med.scale.setScalar(.7);med.scale.setScalar(.75*H);g.add(med);
   const hem=P(tor(.115,.012,'#F2C14E'),0,.125,0);hem.rotation.x=Math.PI/2;P(redEnvelope(),...handR,.55).rotation.y=-.3}
  else{P(cyl(.06,.07,.07,FIT.cny[i].trim,24),0,.36,0);for(const [x,y] of[[.05,.28],[-.04,.2],[.03,.14],[-.05,.32]])P(flower(i===1?'#F2C14E':'#C8342B',i===1?'#C8342B':'#F2C14E',.03),x,y,.105,1);{const bw=bow('#D7261E',1);const edge=M('#F2C14E',{metalness:.4,roughness:.3});bw.children.forEach(o=>{if(o.isMesh&&o.geometry.type==='SphereGeometry'&&o.scale.x>1.1){const e2=o.clone();e2.material=edge;e2.scale.multiplyScalar(1.06);e2.position.z-=.012;bw.add(e2)}});const knot=new T.Group();const kn=new T.Mesh(new T.BoxGeometry(.09,.09,.03),M('#D7261E'));kn.rotation.z=Math.PI/4;knot.add(kn);const kr=tor(.05,.01,'#F2C14E');knot.add(kr);for(let q=0;q<5;q++){const fr=cyl(.006,.006,.16,'#D7261E',4);fr.position.set((q-2)*.012,-.13,0);knot.add(fr)}const cap=cyl(.015,.02,.03,'#F2C14E',8);cap.position.y=-.06;knot.add(cap);knot.position.y=-.32;bw.add(knot);if(i===1){const b=P(bw,.42,.7,-.08,.62);b.rotation.y=Math.PI*.5}else{const b=P(bw,.2,.79,.1,.52);b.rotation.set(0,-.35,-.35)}}P(ingot(),...handR,.45)}}
 if(fest==='moon'){P(pomeloHat(),0,.7,-.02,.8).rotation.x=-.22;P(mooncake(),...handR,.5).rotation.x=1.2;const l=P(lantern(),...handL,.6)}
 if(fest==='duan'){P(zongzi(),0,.96,-.02,.33)}
 if(fest==='val'){if(i===1){P(bow('#D7261E',1),.42,.7,-.08,.68).rotation.y=Math.PI*.5}if(i===3){{const b2=P(bow('#FF8FB8',1),.2,.79,.1,.55);b2.rotation.set(0,-.35,-.35)}}if(male){P(rose(),...handR,.5).rotation.z=-.2}}


 if(fest==='qixi'){
  // ---- 喜鵲（淺色系、每人不同色、跟在頭旁邊）
  const MC=[['#7EC8F2','#BFE6FF'],['#FF9E9E','#FFD0D0'],['#7FE0B8','#C8F5E2'],['#C8A8F0','#E8D8FF']][i];
  const bird=new T.Group();const bm=M(MC[0],{roughness:.4}),lt=M(MC[1],{roughness:.4});const body=sph(.16,bm,1,.9,1.3);bird.add(body);const belly=sph(.12,M('#FFFFFF'),1,.85,1.1);belly.position.set(0,-.04,.05);bird.add(belly);
  const hd=sph(.11,bm);hd.position.set(0,.12,.17);bird.add(hd);for(const e of[-1,1]){const ey=sph(.025,M('#1A1A1A'));ey.position.set(e*.06,.15,.25);bird.add(ey);const hl=sph(.008,M('#FFFFFF'));hl.position.set(e*.06+.008,.16,.272);bird.add(hl);const ck=sph(.025,M('#FF8FB0'),1,.6,.4);ck.position.set(e*.08,.1,.24);bird.add(ck);
   const w=new T.Group();w.position.set(e*.13,.05,0);const wing=sph(.13,lt,.35,.7,1.1);wing.position.set(e*.08,.06,0);w.add(wing);const tip=sph(.07,GOLD,.3,.5,.8);tip.position.set(e*.1,.12,-.04);w.add(tip);w.rotation.z=-e*1.25;w.userData.wyWing=e;bird.add(w);const wt=sph(.06,M('#FFFFFF'),.3,.5,.8);wt.position.set(e*.16,.24,-.02);w.add(wt)}
  const bk=new T.Mesh(new T.ConeGeometry(.035,.09,8),GOLD);bk.rotation.x=Math.PI/2;bk.position.set(0,.11,.3);bird.add(bk);
  for(const e of[-1,1]){const tl=sph(.06,bm,.5,.2,2.6);tl.position.set(e*.04,.02,-.3);tl.rotation.y=e*.12;tl.rotation.x=-.25;bird.add(tl);const tt=sph(.04,lt,.5,.2,1);tt.position.set(e*.05,-.01,-.4);bird.add(tt)}
  const ht=sph(.04,M('#FF5A7A'),1,1,.4);ht.position.set(0,.03,.34);bird.add(ht);
  {const bb=P(bird,i%2?-.46:.46,1.08,-.05,1.4);bb.rotation.y=i%2?.55:-.55;bb.rotation.x=.15;const y0=bb.position.y,ph=i*1.3;ANIM.push(t=>{bb.position.y=y0+Math.sin(t*3+ph)*.05*H;bird.children.forEach(o=>{if(o.userData.wyWing)o.rotation.z=-o.userData.wyWing*(1.25+Math.sin(t*14+ph)*.55)})})}
  if(male){// 牛郎：淺藍布衣、白交領、腰帶、斗笠（戴好＋綁帶）、肩扛鋤頭
   const vL=P(new T.Mesh(new T.BoxGeometry(.03,.17,.01),M('#FFFFFF')),-.03,.29,.108);vL.rotation.z=.5;const vR=P(new T.Mesh(new T.BoxGeometry(.03,.17,.01),M('#FFFFFF')),.03,.29,.106);vR.rotation.z=-.5;
   P(cyl(.118,.118,.035,'#2E4466',28),0,.17,0);
   const straw=ctex(512,128,(x,w,h)=>{x.fillStyle='#E2C27A';x.fillRect(0,0,w,h);for(let k=0;k<64;k++){x.strokeStyle=k%2?'#C9A55A':'#EED394';x.lineWidth=4;x.beginPath();x.moveTo(k*8,0);x.lineTo(k*8,h);x.stroke()}x.strokeStyle='#A8843E';x.lineWidth=3;for(let y=20;y<h;y+=28){x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke()}});
   const hat=new T.Group();const cone=new T.Mesh(new T.ConeGeometry(.62,.3,48,1,true),new T.MeshStandardMaterial({map:straw,color:'#FFF2C8',roughness:.7,side:T.DoubleSide}));cone.position.y=.15;hat.add(cone);const rim=new T.Mesh(new T.TorusGeometry(.62,.028,6,48),M('#6B4A1E'));rim.rotation.x=Math.PI/2;hat.add(rim);const knob=sph(.05,'#B8924A');knob.position.y=.31;hat.add(knob);const band=new T.Mesh(new T.CylinderGeometry(.36,.46,.07,48,1,true),M('#D7261E',{side:T.DoubleSide}));band.position.y=.085;band.scale.setScalar(1.05);hat.add(band);
   P(hat,0,.73,0,.85).rotation.x=-.08;const strap=P(new T.Mesh(new T.TorusGeometry(.3,.007,4,30,Math.PI),M('#7A5A2A')),0,.54,.04,1);strap.rotation.set(0,0,Math.PI);strap.scale.set(H*1.05,H*.75,H);
   const hoe=new T.Group();const hd2=cyl(.012,.012,.62,M('#8A5A30',{roughness:.7}),8);hoe.add(hd2);const blade=new T.Mesh(new T.BoxGeometry(.14,.09,.012),M('#9AA3AD',{metalness:.7,roughness:.3}));blade.position.set(0,.3,.05);blade.rotation.x=1.2;hoe.add(blade);const nk=cyl(.014,.014,.06,M('#6A6F76',{metalness:.6}),6);nk.position.set(0,.3,.02);nk.rotation.x=Math.PI/2;hoe.add(nk);
   const hh=P(hoe,-.2,.3,.06,1);hh.rotation.set(-.35,0,.75)}
  else{// 織女：仙女長裙＋誇張飄逸的寬披帛（半透明漸層）＋大金簪步搖
   const ribT=ctex(512,64,(x,w,h)=>{const gr=x.createLinearGradient(0,0,w,0);gr.addColorStop(0,i===1?'#FFB3D9':'#D9B8FF');gr.addColorStop(.5,i===1?'#FFD6EC':'#EBDDFF');gr.addColorStop(1,i===1?'#C9A6F2':'#FFB3D9');x.fillStyle=gr;x.fillRect(0,0,w,h);x.fillStyle='rgba(255,255,255,.5)';for(let k=0;k<30;k++){x.beginPath();x.arc(Math.random()*w,Math.random()*h,2,0,7);x.fill()}x.strokeStyle='rgba(242,193,78,.9)';x.lineWidth=4;x.beginPath();x.moveTo(0,3);x.lineTo(w,3);x.moveTo(0,h-3);x.lineTo(w,h-3);x.stroke()});
   const ribbon=(pts,wd)=>{const cur=new T.CatmullRomCurve3(pts);const N=120,pos=[],uv=[],idx=[];for(let k=0;k<=N;k++){const t=k/N;const p=cur.getPoint(t),tg=cur.getTangent(t);let sd=new T.Vector3().crossVectors(tg,new T.Vector3(0,1,0));if(sd.length()<.1)sd.set(1,0,0);sd.normalize();const tw=Math.sin(t*Math.PI*3)*.9;const up=new T.Vector3().crossVectors(sd,tg).normalize();const dir=sd.clone().multiplyScalar(Math.cos(tw)).add(up.multiplyScalar(Math.sin(tw)));const w2=wd*(.6+.4*Math.sin(t*Math.PI));
     pos.push(...p.clone().addScaledVector(dir,w2/2).toArray(),...p.clone().addScaledVector(dir,-w2/2).toArray());uv.push(t,0,t,1);if(k<N)idx.push(k*2,k*2+1,k*2+2,k*2+1,k*2+3,k*2+2)}const ge=new T.BufferGeometry();ge.setAttribute('position',new T.Float32BufferAttribute(pos,3));ge.setAttribute('uv',new T.Float32BufferAttribute(uv,2));ge.setIndex(idx);ge.computeVertexNormals();
     const m=new T.Mesh(ge,new T.MeshStandardMaterial({map:ribT,side:T.DoubleSide,transparent:true,opacity:.88,roughness:.35,depthWrite:false}));m.scale.setScalar(H);g.add(m);const ph=i*.7;ANIM.push(t=>{m.rotation.y=Math.sin(t*1.6+ph)*.12;m.rotation.z=Math.sin(t*2.1+ph)*.05})};
   // 從左手繞過背後高高拱起（飛天式），再從右手飄出長尾
   ribbon([new T.Vector3(-.5,.02,.18),new T.Vector3(-.36,.12,.05),new T.Vector3(-.22,.2,.02),new T.Vector3(-.4,.55,-.25),new T.Vector3(-.2,.95,-.38),new T.Vector3(.2,1.0,-.38),new T.Vector3(.42,.6,-.25),new T.Vector3(.22,.2,.02),new T.Vector3(.38,.1,.08),new T.Vector3(.55,.18,.15),new T.Vector3(.68,.05,.05)],.11);
   const peony=(c1,c2)=>{const pg=new T.Group();const m1=M(c1,{roughness:.45}),m2=M(c2,{roughness:.45});
     [[.0,9,.16,.5,m1],[.03,8,.13,.75,m2],[.06,7,.1,1.0,m1],[.08,6,.065,1.2,m2]].forEach(([y,n,r,tilt,m],L)=>{for(let k=0;k<n;k++){const a=k/n*Math.PI*2+L*.4;const p=sph(.085-L*.012,m,1.05,.35,.8);p.position.set(Math.cos(a)*r,y,Math.sin(a)*r);p.rotation.set(0,-a,0);p.rotateZ(tilt);pg.add(p)}});
     const ctr=sph(.035,M('#FFD24A'));ctr.position.y=.1;pg.add(ctr);for(let k=0;k<8;k++){const a=k/8*Math.PI*2;const st=sph(.012,M('#FFE27A'));st.position.set(Math.cos(a)*.035,.12,Math.sin(a)*.035);pg.add(st)}
     for(const e of[-1,1]){const lf=sph(.07,M('#3F9A3E'),1.8,.25,.8);lf.position.set(e*.17,-.02,.06);lf.rotation.y=e*.4;pg.add(lf)}return pg};
   const G3=M('#FFD24A',{metalness:.3,roughness:.3,emissive:'#5A3A00',emissiveIntensity:.2});
   const crown=(r)=>{const cg=new T.Group();const ring=new T.Mesh(new T.CylinderGeometry(r,r*1.04,.05,40,1,true),new T.MeshStandardMaterial({color:'#FFD24A',metalness:.3,roughness:.3,side:T.DoubleSide,emissive:'#5A3A00',emissiveIntensity:.2}));cg.add(ring);const ed=new T.Mesh(new T.TorusGeometry(r*1.02,.008,6,40),G3);ed.rotation.x=Math.PI/2;ed.position.y=-.025;cg.add(ed);
     for(let k=0;k<10;k++){const a=k/10*Math.PI*2;const sp=new T.Mesh(new T.ConeGeometry(.022,.07,4),G3);sp.position.set(Math.cos(a)*r,.055,Math.sin(a)*r);cg.add(sp);const pr=sph(.014,M(k%2?'#FFFFFF':'#E0304F',{roughness:.15}));pr.position.set(Math.cos(a)*r*1.02,.0,Math.sin(a)*r*1.02);cg.add(pr)}return cg};
   const tassel=(x,y,z,col)=>{for(let k=0;k<3;k++){const L=(.14+k*.03)*H;for(let q=0;q<4;q++){const bd=sph((q===3?.018:.011)*H,M(q===3?col:'#FFD24A',{roughness:.2}));bd.position.set(x+(k-1)*.025*H,y-L*(q+1)/4,z);g.add(bd)}}};
   if(i===1){// 夢奇奇飼養者：頭頂金冠（髮箍式）＋右側大粉牡丹（馬尾根部上方）
     
     const pn=peony('#FF8FB8','#FFC2DA');tassel(.3*H,.8*H,.1*H,'#E0304F');pn.scale.setScalar(H*.85);pn.position.set(.28*H,.84*H,.08*H);pn.rotation.set(1.0,0,-.8);g.add(pn);}
   else{// 薪水掌門人：髮髻金冠＋大紫紅牡丹
     
     const pn=peony('#C04FD0','#E7A6F0');tassel(.2*H,.84*H,.1*H,'#C04FD0');pn.scale.setScalar(H*.85);pn.position.set(.17*H,.86*H,.07*H);pn.rotation.set(1.0,0,-.6);g.add(pn)}
}}
 if(fest==='xmas'){if(i===0||i===1){const hat=bentCone(.34,.5,'#D7261E',.6);P(hat,0,.745,-.03,1).rotation.x=-.12;if(i===1)hat.rotation.y=Math.PI*.95}
  if(i===0){const belt=P(cyl(.118,.118,.035,'#1A1A1E',28),0,.165,0);P(new T.Mesh(new T.BoxGeometry(.06,.045,.012),GOLD),0,.165,.118);const f=P(tor(.115,.016,'#FFFFFF'),0,.115,0);f.rotation.x=Math.PI/2;const c2=P(tor(.08,.018,'#FFFFFF'),0,.35,0);c2.rotation.x=Math.PI/2;for(const y of[.30,.24])P(sph(.012,'#FFFFFF'),0,y,.108);P(new T.Mesh(new T.BoxGeometry(.12,.14,.1),M('#8A5A36')),...handR,1)}

  if(i===0){// 聖誕鬍子：只蓋下半臉，眼睛腮紅露出
   const W=M('#FFFFFF',{roughness:.95});for(let row=0;row<2;row++){const R=.27-row*.06;const n=13-row*3;for(let k=0;k<=n;k++){const a=Math.PI*(1.1+k/n*.8);const x=Math.cos(a)*R*1.02,y=.385+Math.sin(a)*R*.72;const z=Math.sqrt(Math.max(.0,.35*.35-x*x-(y-.535)*(y-.535)))+.005;P(sph(.058,W,1,1,.8,12,10),x,y,z*.97)}}
   for(let k=0;k<3;k++){P(sph(.058,W,1,1.2,.8,12,10),(k-1)*.06,.215,.16)}

   for(const e of[-1,1]){const mu=P(sph(.038,W,1.5,.55,.7),e*.045,.452,.33);mu.rotation.z=e*.35;}
   }
  if(i===3){// 麋鹿裝
   const hood=new T.Mesh(new T.SphereGeometry(.39,40,24,0,Math.PI*2,0,Math.PI*.6),M('#9A6A43',{roughness:.75}));const hh=P(hood,0,.56,-.02,1);hh.rotation.x=-.42;
   
   const am=M('#E9C46A',{roughness:.4});for(const e of[-1,1]){const ant=new T.Group();const a1=cyl(.025,.032,.26,am,8);a1.position.y=.13;ant.add(a1);const a2=cyl(.018,.022,.14,am,8);a2.position.set(e*.05,.2,0);a2.rotation.z=-e*.9;ant.add(a2);const a3=cyl(.016,.02,.12,am,8);a3.position.set(-e*.035,.25,0);a3.rotation.z=e*.7;ant.add(a3);const at=P(ant,e*.18,.9,-.06,1);at.rotation.z=-e*.35;
    const ear=P(sph(.07,'#9A6A43',.55,1,.35),e*.33,.8,-.05,1);ear.rotation.z=-e*1.0;const ei=P(sph(.045,'#F2B8A0',.5,.9,.3),e*.335,.8,-.03,1);ei.rotation.z=-e*1.0}
   P(sph(.036,new T.MeshStandardMaterial({color:'#E0242E',emissive:'#B01018',emissiveIntensity:.35,roughness:.25})),0,.405,.335);
   P(sph(.1,'#F2E3C6',1,1.2,.35),0,.24,.1);
   const col=P(tor(.075,.016,'#D7261E'),0,.345,0);col.rotation.x=Math.PI/2;for(let k=0;k<3;k++){const a=Math.PI/2+(k-1)*.5;P(sph(.022,GOLD),Math.cos(a)*.08,.325,Math.sin(a)*.08)}
   const tail=P(sph(.04,'#F2E3C6'),0,.14,-.12)}
  if(i===1){const c2=P(tor(.08,.02,'#FFFFFF'),0,.35,0);c2.rotation.x=Math.PI/2}
  if(i===2){const hat=bentCone(.34,.65,'#2F8F4E',.45,'#C8342B');P(hat,0,.745,-.03,1).rotation.x=-.12;hat.userData.tip.material=GOLD;for(let k=0;k<8;k++){const a=k/8*Math.PI*2;const pt=new T.Mesh(new T.ConeGeometry(.04,.07,3),M(k%2?'#C8342B':'#FFFFFF'));P(pt,Math.cos(a)*.08,.33,Math.sin(a)*.08,1).rotation.x=Math.PI}const bl=P(cyl(.118,.118,.03,'#1A1A1E',28),0,.165,0);P(new T.Mesh(new T.BoxGeometry(.05,.04,.01),GOLD),0,.165,.118)}
  if(false){// 薑餅人裝(停用)：咖啡色連身＋白色糖霜波浪線＋軟糖鈕扣＋薑餅頭套
   for(const y of[.12,.33]){const pts=[];for(let k=0;k<=64;k++){const a=k/64*Math.PI*2;pts.push(new T.Vector3(Math.cos(a)*.116,y+Math.sin(a*10)*.012,Math.sin(a)*.116))}P(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts,true),96,.007,6,true),M('#FFFFFF')),0,0,0)}
   ['#E23B2E','#2F8F4E','#E23B2E'].forEach((c,k)=>P(sph(.016,c,1,1,.7),0,.29-k*.05,.108));
   const hood=new T.Mesh(new T.SphereGeometry(.4,32,20,0,Math.PI*2,0,Math.PI*.62),M('#B5652B',{roughness:.7}));P(hood,0,.6,-.03,1).rotation.x=-.32;const edge=tor(.37,.02,'#FFFFFF',Math.PI*2,48);const e2=P(edge,0,.6,.03,1);e2.rotation.x=-.32-Math.PI/2+Math.PI;e2.position.set(0,.575*H,.105*H);
   for(const e of[-1,1]){const ear=sph(.09,'#B5652B',1,1,.6);P(ear,e*.27,.93,-.05,1);const ic=sph(.05,'#FFFFFF',1,1,.5);P(ic,e*.27,.93,-.0,1)}
   P(new T.Mesh(new T.BoxGeometry(.03,.03,.03),M('#E23B2E')),.0,.0,0,0)}}}
const PROPLESS=(fest,i)=>fest==='qixi'||fest==='cny'||fest==='moon'||(fest==='val'&&(i===0||i===2))||(fest==='xmas'&&(i===0||i===3));
return {FIT,dress,ANIM,propless:PROPLESS};
}
