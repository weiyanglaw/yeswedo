// 正義女神像（程式雕塑版）：蒙眼、右手高舉長劍、左手持天秤、古典長袍、階梯式台座。
// 以傳統正義女神的公有圖像元素自行塑造，不是任何特定雕塑作品的複製。
// 座標：底部 y=0，正面朝 +Z，總高約 5.3。顏色沿用原雕像的三種銅色。
export function createJustice(T){
 const g=new T.Group();
 const mat=(c,m,r)=>new T.MeshStandardMaterial({color:c,metalness:m,roughness:r});
 const bronze=mat('#B78A48',.72,.37),light=mat('#D3AE68',.68,.35),dark=mat('#81603B',.58,.5);
 const add=(geo,m,x=0,y=0,z=0)=>{const o=new T.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;g.add(o);return o};
 const V=(x,y,z)=>new T.Vector3(x,y,z);
 // 依曲線產生粗細漸變的圓管（手臂、披巾、髮束）
 function taper(points,r0,r1,m,seg=40,rad=12){
  const curve=new T.CatmullRomCurve3(points.map(p=>V(...p)));
  const geo=new T.TubeGeometry(curve,seg,1,rad,false);const pos=geo.attributes.position;
  const fr=curve.computeFrenetFrames(seg,false);const c=new T.Vector3(),n=new T.Vector3();
  for(let i=0;i<=seg;i++){const t=i/seg,r=r0+(r1-r0)*t;curve.getPointAt(t,c);
   for(let j=0;j<=rad;j++){const k=i*(rad+1)+j;n.set(pos.getX(k),pos.getY(k),pos.getZ(k)).sub(c).normalize().multiplyScalar(r).add(c);pos.setXYZ(k,n.x,n.y,n.z)}}
  geo.computeVertexNormals();
  // 管子兩端補圓
  add(new T.SphereGeometry(r0,12,10),m,...points[0]);add(new T.SphereGeometry(r1,12,10),m,...points[points.length-1]);
  return add(geo,m);
 }
 // 旋轉體＋垂直衣褶位移＋前傾
 function draped(profile,folds,amp,m,lean=0,sway=0){
  const geo=new T.LatheGeometry(profile.map(p=>new T.Vector2(p[0],p[1])),96);const pos=geo.attributes.position;
  const h0=profile[0][1],h1=profile[profile.length-1][1];
  for(let i=0;i<pos.count;i++){let x=pos.getX(i),y=pos.getY(i),z=pos.getZ(i);const a=Math.atan2(z,x),t=(y-h0)/(h1-h0);
   const fold=amp*(1-t*.75)*(Math.sin(a*folds+Math.sin(y*2.2)*.9)*.75+Math.sin(a*folds*2.3+1.3)*.25);
   const r=Math.hypot(x,z)+fold;x=Math.cos(a)*r;z=Math.sin(a)*r;
   z+=lean*(1-t)*(z>0?1:.4);x+=sway*Math.sin(t*Math.PI);pos.setXYZ(i,x,y,z)}
  geo.computeVertexNormals();return add(geo,m);
 }

 /* ---------- 台座：三層階梯，邊緣倒角 ---------- */
 const slab=(w,h,d,y,m)=>{const s=new T.Shape(),r=.06;s.moveTo(-w/2+r,-d/2);s.lineTo(w/2-r,-d/2);s.quadraticCurveTo(w/2,-d/2,w/2,-d/2+r);s.lineTo(w/2,d/2-r);s.quadraticCurveTo(w/2,d/2,w/2-r,d/2);s.lineTo(-w/2+r,d/2);s.quadraticCurveTo(-w/2,d/2,-w/2,d/2-r);s.lineTo(-w/2,-d/2+r);s.quadraticCurveTo(-w/2,-d/2,-w/2+r,-d/2);
  const geo=new T.ExtrudeGeometry(s,{depth:h,bevelEnabled:true,bevelThickness:.03,bevelSize:.03,bevelSegments:2});geo.rotateX(-Math.PI/2);return add(geo,m,0,y,0)};
 slab(1.75,.22,1.35,0,dark);slab(1.5,.2,1.12,.25,bronze);slab(1.28,.32,.94,.48,dark);
 add(new T.BoxGeometry(1.32,.04,.98),light,0,.83,0);
 // 台座上的法典：微開的厚書
 const book=new T.Group();book.position.set(.34,.95,.22);book.rotation.set(0,-.5,.08);g.add(book);
 for(const s of [-1,1]){const p=new T.Mesh(new T.BoxGeometry(.22,.07,.3),bronze);p.position.set(s*.115,0,0);p.rotation.z=s*-.12;p.castShadow=true;book.add(p)}

 /* ---------- 長袍：裙身、腰部、上身 ---------- */
 const base=.86;
 draped([[.0,base],[.46,base],[.5,base+.12],[.47,base+.6],[.42,base+1.25],[.36,base+1.85],[.3,base+2.25]],13,.045,bronze,.12,.03);
 // 前跨的左腿輪廓（從衣袍中微微凸出）
 taper([[.12,base+.15,.36],[.12,base+.75,.26],[.1,base+1.45,.12]],.12,.15,bronze);
 add(new T.SphereGeometry(.09,14,10),light,.12,base+.08,.47).scale.set(1,.55,1.7); // 涼鞋腳尖
 // 腰帶與交叉衣帶
 const belt=add(new T.TorusGeometry(.305,.035,10,48),light,0,base+2.18,0);belt.rotation.x=Math.PI/2;belt.scale.set(1,.85,1);
 // 上身：胸腔與肩膀
 const torso=draped([[.29,base+2.2],[.31,base+2.42],[.33,base+2.62],[.34,base+2.8],[.31,base+2.95],[.18,base+3.05],[.08,base+3.08]],9,.018,bronze,0,0);
 torso.scale.set(1.12,1,.78);
 for(const s of [-1,1]){const b=add(new T.SphereGeometry(.13,18,14),bronze,s*.13,base+2.68,.17);b.scale.set(1,.9,.8)}
 // 斜披的希臘式披肩：從左肩繞到右腰，再垂至背後
 taper([[-.3,base+3.0,.05],[-.12,base+2.75,.25],[.12,base+2.45,.26],[.32,base+2.2,.08],[.36,base+1.7,-.18],[.3,base+1.1,-.3]],.07,.05,light,60);
 taper([[-.32,base+2.98,-.05],[-.3,base+2.5,-.28],[-.25,base+1.6,-.36],[-.2,base+.95,-.4]],.08,.06,bronze,50);

 /* ---------- 頸、頭、蒙眼布、髮 ---------- */
 add(new T.CylinderGeometry(.075,.09,.24,16),bronze,0,base+3.15,0);
 const head=add(new T.SphereGeometry(.17,28,22),bronze,0,base+3.42,.02);head.scale.set(.86,1.08,.95);
 const chin=add(new T.SphereGeometry(.08,16,12),bronze,0,base+3.3,.1);chin.scale.set(1,.8,.9);
 add(new T.ConeGeometry(.025,.08,8),bronze,0,base+3.42,.18).rotation.x=Math.PI/2; // 鼻樑
 // 蒙眼布：繞頭一圈的寬布帶，正面加厚凸出，在雙眼位置清楚可見
 const eyeY=base+3.45;
 const blind=new T.CylinderGeometry(.168,.172,.085,48,1,true);
 const bl=add(blind,light,0,eyeY,.02);bl.scale.set(.9,1,1.02);bl.material=bl.material.clone();bl.material.side=T.DoubleSide;
 const front=add(new T.CylinderGeometry(.18,.184,.075,32,1,true,-Math.PI*.42,Math.PI*.84),light,0,eyeY,.02);front.scale.set(.9,1,1.04);
 front.material=light.clone();front.material.side=T.DoubleSide;
 for(const y of [eyeY+.042,eyeY-.042]){const e=add(new T.TorusGeometry(.17,.01,6,48),light,0,y,.02);e.rotation.x=Math.PI/2;e.scale.set(.9,1.03,1)} // 布邊
 add(new T.SphereGeometry(.035,12,10),light,0,eyeY,-.17); // 腦後布結
 taper([[-.02,eyeY-.01,-.18],[-.07,eyeY-.12,-.25],[-.06,eyeY-.32,-.27]],.024,.014,light,16,8); // 布結垂帶
 taper([[.02,eyeY-.01,-.18],[.07,eyeY-.13,-.23],[.1,eyeY-.28,-.21]],.022,.013,light,16,8);
 // 頭髮只覆蓋頭頂與後腦，不遮住臉和蒙眼布
 const hair=add(new T.SphereGeometry(.18,28,22,0,Math.PI*2,0,Math.PI*.42),dark,0,base+3.47,-.04);hair.scale.set(.92,1.05,1);hair.rotation.x=-.75;
 add(new T.SphereGeometry(.11,18,14),dark,0,base+3.5,-.2); // 髮髻
 for(let i=0;i<6;i++){const a=i/5*Math.PI-Math.PI/2;taper([[Math.sin(a)*.15,base+3.38,-.06+Math.cos(a)*.04],[Math.sin(a)*.2,base+3.18,-.08],[Math.sin(a)*.18,base+3.0,-.12]],.03,.018,dark,14,8)} // 垂髮捲
 // 月桂髮環
 for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const l=add(new T.SphereGeometry(.035,8,6),light,Math.cos(a)*.165,base+3.56,Math.sin(a)*.165+.0);l.scale.set(1,.45,1.8);l.rotation.y=-a}

 /* ---------- 右臂高舉長劍 ---------- */
 const rs=[.36,base+2.93,0];
 taper([rs,[.46,base+3.3,.02],[.47,base+3.62,.05]],.09,.07,bronze); // 上臂
 taper([[.47,base+3.62,.05],[.43,base+3.95,.1],[.4,base+4.2,.12]],.07,.055,bronze); // 前臂
 const rh=add(new T.SphereGeometry(.07,14,12),bronze,.4,base+4.25,.12);rh.scale.set(1,1.2,.9);
 // 長劍：劍柄、護手、劍身朝上
 const sword=new T.Group();sword.position.set(.4,base+4.25,.12);g.add(sword);
 const sm=(geo,m,y)=>{const o=new T.Mesh(geo,m);o.position.y=y;o.castShadow=true;sword.add(o);return o};
 sm(new T.CylinderGeometry(.025,.028,.24,10),dark,-.02);
 sm(new T.SphereGeometry(.045,12,10),light,-.17);
 const guard=sm(new T.BoxGeometry(.38,.04,.06),light,.12);
 for(const s of [-1,1]){const k=new T.Mesh(new T.SphereGeometry(.03,10,8),light);k.position.set(s*.19,.12,0);sword.add(k)}
 const blade=new T.Shape();blade.moveTo(-.04,0);blade.lineTo(.04,0);blade.lineTo(.03,1.05);blade.lineTo(0,1.18);blade.lineTo(-.03,1.05);blade.closePath();
 const bg=new T.ExtrudeGeometry(blade,{depth:.012,bevelEnabled:true,bevelThickness:.006,bevelSize:.008,bevelSegments:1});bg.translate(0,0,-.006);
 sm(bg,light,.14);

 /* ---------- 左臂平舉天秤 ---------- */
 const ls=[-.36,base+2.93,0];
 taper([ls,[-.52,base+2.82,.12],[-.66,base+2.72,.28]],.09,.07,bronze);
 taper([[-.66,base+2.72,.28],[-.8,base+2.86,.42],[-.88,base+3.02,.5]],.07,.055,bronze);
 add(new T.SphereGeometry(.065,14,12),bronze,-.88,base+3.07,.5);
 const sc=new T.Group();sc.position.set(-.88,base+3.12,.5);g.add(sc);
 const sa=(geo,m,x,y,z)=>{const o=new T.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;sc.add(o);return o};
 sa(new T.CylinderGeometry(.02,.02,.32,10),light,0,.1,0); // 提柄
 sa(new T.SphereGeometry(.04,12,10),light,0,.28,0);
 const beam=sa(new T.CylinderGeometry(.018,.018,.95,10),light,0,.26,0);beam.rotation.z=Math.PI/2;
 for(const s of [-1,1]){
  sa(new T.SphereGeometry(.03,10,8),light,s*.475,.26,0);
  const pan=new T.LatheGeometry([[0,0],[.1,.005],[.17,.03],[.2,.07],[.205,.075]].map(q=>new T.Vector2(...q)),36);
  sa(pan,light,s*.475,-.5,0);
  for(let k=0;k<3;k++){const a=k/3*Math.PI*2;const top=V(s*.475,.24,0),bot=V(s*.475+Math.cos(a)*.17,-.43,Math.sin(a)*.17);const v=bot.clone().sub(top);
   const ch=sa(new T.CylinderGeometry(.006,.006,v.length(),5),dark,...top.clone().add(bot).multiplyScalar(.5).toArray());ch.quaternion.setFromUnitVectors(V(0,1,0),v.normalize())}
 }
 return g;
}
