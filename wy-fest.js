// 德威陽｜有法度 v493 節日裝飾：春節（含元宵）、西洋情人節、端午、七夕、中秋、聖誕
// 日期每年自動判斷（台北時間）；預覽：index.html?fest=cny / val / duan / qixi / moon / xmas，可用逗號同時預覽（例如 cny,val），元宵加 &yuan=1。
// 所有裝飾都綁在島嶼、橋、廣場的位置上（xy 與島半徑），之後島嶼重排時會跟著移動。
import {makeOutfits} from './wy-outfit.js?v=509';
import {makeHeads} from './wy-heads.js?v=509';
export function setupFest(T, c, api){
 const scene=c.scene, xy=c.xy, gy=(x,z)=>{try{return c.groundY?c.groundY(x,z):0}catch(e){return 0}};
 const solid=(x,z,hx,hz)=>{try{c.addSolid&&c.addSolid(x,z,hx,hz)}catch(e){}};
 // ---------- 日期 ----------
 const TABLE={cny:{2026:'2026-02-17',2027:'2027-02-06',2028:'2028-01-26',2029:'2029-02-13',2030:'2030-02-03',2031:'2031-01-23'},duan:{2026:'2026-06-19',2027:'2027-06-09',2028:'2028-05-28'},qixi:{2026:'2026-08-19',2027:'2027-08-08',2028:'2028-08-26',2029:'2029-08-16',2030:'2030-08-05'},moon:{2026:'2026-09-25',2027:'2027-09-15',2028:'2028-10-03'}};
 const LUNAR={cny:[1,1],duan:[5,5],qixi:[7,7],moon:[8,15]};
 const WIN={cny:[-9,14],duan:[-7,0],qixi:[-7,0],moon:[-7,0]};   // 節前一週起；春節從小年夜前 7 天（v501）到元宵；過節隔天收
 const GREET={cny:'新春快樂',val:'情人節快樂',duan:'端午節安康',qixi:'七夕快樂',moon:'中秋節快樂',xmas:'Merry Christmas'};
 const tpDate=()=>{const p=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());return new Date(p+'T12:00:00+08:00')};
 function lunarFind(key,year){try{const f=new Intl.DateTimeFormat('en-u-ca-chinese',{month:'numeric',day:'numeric',timeZone:'Asia/Taipei'});const [lm,ld]=LUNAR[key];let d=new Date(year+'-01-01T12:00:00+08:00');for(let i=0;i<400;i++){const ps=f.formatToParts(d);const m=ps.find(x=>x.type==='month').value,dd=+ps.find(x=>x.type==='day').value;if(String(+m)===m&&+m===lm&&dd===ld&&d.getFullYear()===year)return d;d=new Date(d.getTime()+864e5)}}catch(e){}return null}
 const festDay=(k,y)=>{const t=TABLE[k]&&TABLE[k][y];return t?new Date(t+'T12:00:00+08:00'):lunarFind(k,y)};
 const ACT=new Set();let yuan=false,cnyYear=0,day214=false;
 let q='',qy='';try{const u=new URLSearchParams(location.search);q=(u.get('fest')||'').toLowerCase();qy=u.get('yuan')||'';const hm=(location.hash||'').match(/^#fest-([a-z-]+)/);if(hm&&!q){q=hm[1].replace(/-/g,',');if(q.includes('yuan')){qy='1';q=q.replace(/,?yuan/,'')}}}catch(e){}
 if(q){q.split(',').forEach(k=>{if(GREET[k])ACT.add(k)});yuan=qy==='1';day214=ACT.has('cny')&&ACT.has('val');cnyYear=new Date().getFullYear()}
 else{const now=tpDate(),y=now.getFullYear(),md=(now.getMonth()+1)*100+now.getDate();
  if(md>=1201&&md<=1226)ACT.add('xmas');if(md>=207&&md<=214){ACT.add('val');if(md===214)day214=true}
  for(const k of ['cny','duan','qixi','moon'])for(const yy of [y,y+1]){const d=festDay(k,yy);if(!d)continue;const diff=Math.round((now-d)/864e5);if(diff>=WIN[k][0]&&diff<=WIN[k][1]){ACT.add(k);if(k==='cny'){cnyYear=yy;yuan=diff>=9}}}}
 const LIST=[...ACT];window.wyFest=LIST.join(',');window.wyFestGreeting=LIST.map(k=>GREET[k]).join('　');
 if(!LIST.length)return null;
 const both=ACT.has('cny')&&ACT.has('val');   // 撞期：春節在廣場與橋，情人節在四座島
 // ---------- 共用 ----------
 const MC=new Map();const M=(col,o)=>{const k=col+(o?JSON.stringify(o):'');if(!MC.has(k))MC.set(k,new T.MeshStandardMaterial({color:col,roughness:.55,...(o||{})}));return MC.get(k)};
 const glowM=(col,i=.7)=>{const m=new T.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:i,roughness:.4});try{api.glow(m,i)}catch(e){}return m};
 const gold=M('#F0C75E',{metalness:.55,roughness:.3}),navy=M('#1F3460');
 const sph=(r,m,sx=1,sy=1,sz=1,seg=16)=>{const o=new T.Mesh(new T.SphereGeometry(r,seg,Math.max(8,seg*.75|0)),m);o.scale.set(sx,sy,sz);return o};
 const cyl=(rt,rb,h,m,seg=12)=>new T.Mesh(new T.CylinderGeometry(rt,rb,h,seg),m);
 const HEADS=makeHeads(T);
 const root=new T.Group();root.name='wyFest2';scene.add(root);const movers=[];const nightOnly=[];
 const add=(o,x,z,y)=>{o.position.set(x,y===undefined?gy(x,z):y,z);root.add(o);return o};
 const canvasTex=(w,h,draw)=>{const cv=document.createElement('canvas');cv.width=w;cv.height=h;draw(cv.getContext('2d'),w,h);const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;return t};
 const heartTex=canvasTex(128,128,(g,w,h)=>{g.fillStyle='#fff';g.beginPath();g.moveTo(64,112);g.bezierCurveTo(6,70,10,18,64,40);g.bezierCurveTo(118,18,122,70,64,112);g.fill()});
 const R=i=>i===0?21:17;
 const island=i=>({x:xy[i][0],z:xy[i][1]});
 // 島嶼入口（橋接到島的地方）與橋上取樣點
 const LINKS=()=>window.wyLinks||[];
 // 島嶼入口：這座島某一條橋接上來的地方（v494 起橋改成彎的麥穗弧線，改用 wyLinks）
 function entrance(i){const I=island(i);let best=null;for(const L of LINKS())for(const p of [L.pts[0],L.pts[L.pts.length-1]]){const d=Math.hypot(p[0]-I.x,p[2]-I.z);if(d<R(i)+4&&(!best||d<best.d))best={d,p}}
  let ux,uz;if(best){ux=best.p[0]-I.x;uz=best.p[2]-I.z}else{ux=-I.x;uz=-I.z}const L=Math.hypot(ux,uz)||1;ux/=L;uz/=L;return {x:I.x+ux*(R(i)-2.2),z:I.z+uz*(R(i)-2.2),ux,uz,px:-uz,pz:ux}}
 // 沿著每一條橋取樣（兩側欄杆外）
 function linkPts(L,n,off){const P=L.pts,out=[];const segs=P.length-1;for(let k=0;k<n;k++){const f=(n===1?.5:(k+.5)/n)*segs;const j=Math.min(segs-1,Math.floor(f)),u=f-j;const a=P[j],b=P[j+1];const x=a[0]+(b[0]-a[0])*u,z=a[2]+(b[2]-a[2])*u;const dx=b[0]-a[0],dz=b[2]-a[2],l=Math.hypot(dx,dz)||1;const px=-dz/l,pz=dx/l;const y=gy(x,z);
   for(const s of [-1,1])out.push({x:x+px*off*s,z:z+pz*off*s,y,s,ang:Math.atan2(dx,dz)})}return out}
 function bridgePts(i,n,off){const out=[];for(const L of LINKS())if(L.b===i||(i==='C'&&L.b==='C'))out.push(...linkPts(L,n,off));return out}
 const corners=i=>{const I=island(i);const dz=i===2?9.4:7;/* v501：醫療島往前一點，不壓到建築；家庭島右側避開天鵝湖 */return [{x:I.x-11,z:I.z+dz},{x:I.x+(i===3?13.6:11),z:I.z+dz}]};
 const PLAZA={L:{x:-8.6,z:14.6},Rt:{x:9.2,z:14.6},F:{x:0,z:20.5}};
 // 噴水池與城堡正面
 let fountain=null;try{c.groups&&c.groups()[0].traverse(o=>{if(!fountain&&o.type==='Group'&&(o.userData.wyMainFountain||Math.abs(o.position.x-.5)<.05&&(Math.abs(o.position.z-9.8)<.05||Math.abs(o.position.z-13.3)<.05)))fountain=o})}catch(e){}
 function castleFrontZ(x,y){try{const rc=new T.Raycaster(new T.Vector3(x,y,40),new T.Vector3(0,0,-1));const ms=[];c.groups()[0].traverse(o=>{if(o.isMesh&&o.visible)ms.push(o)});const h=rc.intersectObjects(ms,false).find(h=>h.point.z<8);return h?h.point.z:4.2}catch(e){return 4.2}}
 let AC=null;
 // ---------- v497 共用：點擊物件、提示泡泡 ----------
 const clickables=[];function onTap(obj,fn){clickables.push([obj,fn])}
 try{const el=c.renderer&&c.renderer.domElement;if(el){const rc=new T.Raycaster(),v=new T.Vector2();el.addEventListener('pointerdown',e=>{if(c.inside&&c.inside())return;const r=el.getBoundingClientRect();v.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);rc.setFromCamera(v,c.camera);for(const [o,fn] of clickables){if(o.visible!==false&&rc.intersectObject(o,true).length){fn();break}}})}}catch(e){}
 function toastMsg(txt,col){let d=document.getElementById('wyFestToast');if(!d){d=document.createElement('div');d.id='wyFestToast';d.style.cssText='position:fixed;left:50%;top:120px;transform:translateX(-50%) scale(.6);opacity:0;z-index:70;padding:12px 22px;border-radius:999px;font:17px/1.4 Huninn,"PingFang TC",sans-serif;letter-spacing:2px;color:#4A2E08;background:linear-gradient(180deg,#FFE7A8,#E9B65A);box-shadow:0 0 0 3px #fff,0 6px 0 3px #8A6224,0 10px 22px #0005;transition:all .35s cubic-bezier(.3,1.6,.5,1);pointer-events:none;white-space:nowrap';document.body.appendChild(d)}
  d.textContent=txt;d.style.background=col||'linear-gradient(180deg,#FFE7A8,#E9B65A)';d.style.color=col?'#FFF8E1':'#4A2E08';requestAnimationFrame(()=>{d.style.opacity=1;d.style.transform='translateX(-50%) scale(1)'});clearTimeout(d._t);d._t=setTimeout(()=>{d.style.opacity=0;d.style.transform='translateX(-50%) scale(.6)'},2400);try{window.wySfx&&window.wySfx('pop')}catch(e){}}
 function beep(fs,dur=.12,type='triangle',vol=.2){try{if(localStorage.getItem('wy-sound')==='off')return;AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t0=AC.currentTime;fs.forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;o.connect(g);g.connect(AC.destination);const st=t0+i*dur*.7;g.gain.setValueAtTime(.0001,st);g.gain.exponentialRampToValueAtTime(vol,st+.01);g.gain.exponentialRampToValueAtTime(.001,st+dur);o.start(st);o.stop(st+dur+.02)})}catch(e){}}
 function crackle(){try{if(localStorage.getItem('wy-sound')==='off')return;AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t0=AC.currentTime;for(let i=0;i<14;i++){const b=AC.createBuffer(1,800,AC.sampleRate),d=b.getChannelData(0);for(let k=0;k<800;k++)d[k]=(Math.random()*2-1)*Math.exp(-k/120);const src=AC.createBufferSource();src.buffer=b;const g=AC.createGain();g.gain.value=.35;src.connect(g);g.connect(AC.destination);src.start(t0+i*.07+Math.random()*.03)}}catch(e){}}
 // ---------- 小物件 ----------
 function lanternPost(col,big){const g=new T.Group();const H=big?3.4:2.3;const p=cyl(.06,.08,H,gold,8);p.position.y=H/2;g.add(p);const arm=cyl(.04,.04,.7,gold,6);arm.rotation.z=Math.PI/2;arm.position.set(.33,H-.05,0);g.add(arm);
  const L=new T.Group();L.position.set(.62,H-.55,0);g.add(L);const body=sph(.36,glowM(col,.6),1,1.15,1);L.add(body);for(const yy of [.42,-.42]){const cp=cyl(.17,.2,.1,gold,12);cp.position.y=yy;L.add(cp)}
  const ts=cyl(.025,.05,.42,M('#F2C14E'),6);ts.position.y=-.68;L.add(ts);L.userData.sw=Math.random()*6;movers.push((t,dt)=>{L.rotation.z=Math.sin(t*1.4+L.userData.sw)*.07});return g}
 function bridgeLanterns(i,cols,n=5){for(const p of bridgePts(i,n,5.35)){const lp=lanternPost(cols[(p.s>0?0:1)%cols.length]);lp.rotation.y=p.ang+(p.s>0?0:Math.PI)+Math.PI/2;add(lp,p.x,p.z,p.y-.2)}}
 // ---------- 春節 ----------
 function buildCNY(){
  // v499 天空：金龍風箏在群島上空盤旋
  {/* v500：金龍風箏放大、飛低、節身連續，不再像一串小點 */const kite=new T.Group();scene.add(kite);const segs2=[];const head=HEADS.dragonHead();head.g.scale.setScalar(2.1);const hg=new T.Group();hg.add(head.g);kite.add(hg);segs2.push(hg);
   const KN=22;for(let k=0;k<KN;k++){const sg=new T.Group();const r=1.75-k*.055;const d=sph(r,M(k%2?'#F2C14E':'#E23B2E',{roughness:.4}),1,1,.75);sg.add(d);const fin=new T.Mesh(new T.ConeGeometry(.45,1.3,4),gold);fin.position.y=r+.4;sg.add(fin);if(k===KN-1){for(const e of[-1,1]){const tl=new T.Mesh(new T.ConeGeometry(.6,2.2,6),gold);tl.position.set(e*.5,0,-1.4);tl.rotation.x=-Math.PI/2;sg.add(tl)}}kite.add(sg);segs2.push(sg)}
   const KR=46,KRZ=32,KY=30;movers.push(t=>{segs2.forEach((sg,k)=>{const a=t*.09-k*.052;sg.position.set(Math.cos(a)*KR,KY+Math.sin(t*1.1-k*.45)*2.4,-48+Math.sin(a)*KRZ);const a2=a+.01;sg.lookAt(Math.cos(a2)*KR,sg.position.y,-48+Math.sin(a2)*KRZ)})})}const red='#E23B2E';
  for(const i of [1,2,3,4,5,'C'])bridgeLanterns(i,[red,red],4);
  [PLAZA.L,PLAZA.Rt].forEach(p=>{add(lanternPost(red,true),p.x,p.z);solid(p.x,p.z,.25,.25)});
  if(!both)for(let i=1;i<=4;i++)corners(i).forEach(p=>{add(lanternPost(red,true),p.x,p.z);solid(p.x,p.z,.25,.25)});
  // 春聯與福字
  const z0=castleFrontZ(-2.4,3.5),z1=castleFrontZ(2.4,3.5),zc=castleFrontZ(0,6);
  // v498 春聯放大：一進廣場就看得清楚（楷書金字＋深色描邊，晚上微亮）
  const KAI='"BiauKai","DFKai-SB","標楷體","Kaiti TC","STKaiti","Noto Serif TC",serif';
  const couplet=(txt)=>canvasTex(200,820,(g,w,h)=>{g.fillStyle='#C8161E';g.fillRect(0,0,w,h);g.strokeStyle='#F2C14E';g.lineWidth=10;g.strokeRect(8,8,w-16,h-16);g.lineWidth=3;g.strokeRect(20,20,w-40,h-40);g.font='bold 104px '+KAI;g.textAlign='center';g.textBaseline='middle';[...txt].forEach((ch,k)=>{const y=70+k*(h-140)/(txt.length-1);g.lineWidth=8;g.strokeStyle='#5A0A0A';g.strokeText(ch,w/2,y);g.fillStyle='#FFD86A';g.fillText(ch,w/2,y)})});
  const banner=(txt)=>canvasTex(720,200,(g,w,h)=>{g.fillStyle='#C8161E';g.fillRect(0,0,w,h);g.strokeStyle='#F2C14E';g.lineWidth=10;g.strokeRect(8,8,w-16,h-16);g.lineWidth=3;g.strokeRect(20,20,w-40,h-40);g.font='bold 116px '+KAI;g.textAlign='center';g.textBaseline='middle';[...txt].forEach((ch,k)=>{const x=w/2+(k-(txt.length-1)/2)*150;g.lineWidth=8;g.strokeStyle='#5A0A0A';g.strokeText(ch,x,h/2+4);g.fillStyle='#FFD86A';g.fillText(ch,x,h/2+4)})});
  const pl=(tex,w,h)=>new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshStandardMaterial({map:tex,roughness:.6,emissive:'#FFFFFF',emissiveMap:tex,emissiveIntensity:.18}));
  const L=pl(couplet('德耀新春家和順'),1.05,4.3);add(L,-2.85,z0+.2,3.95);const Rg=pl(couplet('威揚四海業興隆'),1.05,4.3);add(Rg,2.85,z1+.2,3.95);
  const top=pl(banner('陽光滿門'),3.9,1.08);add(top,0,Math.max(z0,z1)+.22,6.55);
  const fuTex=canvasTex(220,220,(g,w,h)=>{g.translate(110,110);g.rotate(Math.PI/4);g.fillStyle='#C8161E';g.fillRect(-74,-74,148,148);g.strokeStyle='#F2C14E';g.lineWidth=7;g.strokeRect(-66,-66,132,132);g.rotate(-Math.PI/4+Math.PI);g.font='bold 104px '+KAI;g.textAlign='center';g.textBaseline='middle';g.lineWidth=7;g.strokeStyle='#5A0A0A';g.strokeText('福',0,6);g.fillStyle='#FFD86A';g.fillText('福',0,6)});
  for(const x of [-.68,.68]){const fu=pl(fuTex,1.25,1.25);add(fu,x,zc+.24,3.55)}
  // 四座辦公室島門前：春聯牌樓（紅柱金頂，上下聯＋橫批）
  const ISL={1:['明法守正春風暖','據理持平福運長','公道迎春'],2:['仁心妙手迎春到','福壽安康喜事多','健康平安'],3:['家和業順春常在','人壽年豐福滿堂','闔家歡樂'],4:['生意興隆通四海','財源廣進達三江','鴻圖大展']};
  for(let i=1;i<=4;i++){const I=island(i);const gz=I.z+(i===3?14.4:10.6),gx=I.x;const gate=new T.Group();
   for(const e of [-1,1]){const post=cyl(.13,.15,4.6,M('#B3141C'),10);post.position.set(e*2.6,2.3,0);gate.add(post);const cap=sph(.22,gold);cap.position.set(e*2.6,4.7,0);gate.add(cap);const base=cyl(.3,.34,.46,gold,10);base.position.set(e*2.6,.23,0);/* v500：底座加高，頂面不再和門口台階同高而閃爍 */gate.add(base);
    const cp=pl(couplet(ISL[i][e<0?0:1]),.72,3.0);cp.position.set(e*2.6,2.55,.17);gate.add(cp)}
   const beam=new T.Mesh(new T.BoxGeometry(5.8,.22,.3),gold);beam.position.y=4.55;gate.add(beam);const bn=pl(banner(ISL[i][2]),2.9,.8);bn.position.set(0,5.1,.05);gate.add(bn);const roof=new T.Mesh(new T.BoxGeometry(6.2,.18,.6),M('#B3141C'));roof.position.y=5.6;gate.add(roof);
   add(gate,gx,gz);solid(gx-2.6,gz,.2,.2);solid(gx+2.6,gz,.2,.2)}
  // v497：三組舞龍舞獅繞整個廣場跑（不擠在噴水池旁）
  /* v501：噴水池往前移後，廣場舞獅改在噴水池前方繞小圈，不穿過噴水池和求籤供桌 */const cx=0,cz=22.4,rx=9.5,rz=2.2;const posOn=a=>({x:cx+Math.cos(a)*rx,z:cz+Math.sin(a)*rz});
  const troupes=[];const RED='#D7261E',GOLD='#F2C14E';
  // 舞龍：18 節，紅金鱗片、金色背鰭、大龍頭（角、鬍鬚、張嘴）、發光龍珠
  const dragon=new T.Group();root.add(dragon);const segs=[];const DN=18;
  for(let k=0;k<DN;k++){const s=new T.Group();const head=k===0;
   if(head){const hd=new T.Group();s.add(hd);const DH=HEADS.dragonHead();DH.g.scale.setScalar(.62);DH.g.position.set(0,-.1,-.2);hd.add(DH.g);s.userData.jaw=DH.jaw;
    const ball=sph(.48,glowM('#FFB84D',.9));ball.position.set(0,.9,2.6);ball.userData.pearl=1;s.add(ball);s.userData.ball=ball;hd.scale.setScalar(1.25)}
   else{const r0=.62-.018*k;const body=sph(r0,M(k%2?RED:GOLD,{roughness:.42}),1,1,1.3);s.add(body);
    for(const e of [-1,1])for(let q=0;q<3;q++){const sc=sph(.12,M(k%2?GOLD:RED),1,1,.4);sc.position.set(e*r0*.92,.15-q*.18,-.15+q*.15);s.add(sc)}
    const fin=new T.Mesh(new T.ConeGeometry(.16,.55,4),gold);fin.position.set(0,r0+.15,0);s.add(fin);
    if(k===DN-1){for(const e of [-1,1]){const tl=new T.Mesh(new T.ConeGeometry(.25,.9,6),M(GOLD));tl.position.set(e*.2,.1,-.6);tl.rotation.x=-1.3;s.add(tl)}}}
   /* v499：拿掉舞龍底下表演者的竿子與腳 */
   const legs=new T.Group();s.userData.legs=legs;
   dragon.add(s);segs.push(s)}
  // v499 舞龍遊行路線：城堡廣場 → 繞城堡東側 → 橋 → 中央花田島繞一圈 → 回到城堡西側 → 廣場
  const C0=window.wyCenterXZ||{x:0,z:-56};const RP=[[0,19],[9,17],[16,10],[19,0],[13,-12],[3,-18],[1.5,-30],[2,-41],[8,-46],[11,-56],[8,-66],[0,-69],[-8,-66],[-11,-56],[-8,-46],[-2,-41],[-1.5,-30],[-3,-18],[-13,-12],[-19,0],[-16,10],[-9,17]].map(([x,z])=>new T.Vector3(x,0,z+(z<-35?(C0.z+56):0)));
  const DC=new T.CatmullRomCurve3(RP,true,'centripetal');const DL=DC.getLength();const dPos=a=>{const u=((a/(Math.PI*2))%1+1)%1;const v=DC.getPointAt(u);return {x:v.x,z:v.z}};const dStep=1.3*Math.PI*2/DL;
  troupes.push({ph:0,sp:2.3*Math.PI*2/DL,pos:dPos,upd(a,t){segs.forEach((s,k)=>{const aa=a-k*dStep;const p=dPos(aa);const nx=dPos(aa+.004);const y=gy(p.x,p.z);s.position.set(p.x,y+2.3+Math.sin(t*4-k*.7)*.45,p.z);s.rotation.y=Math.atan2(nx.x-p.x,nx.z-p.z);
   if(s.userData.jaw)s.userData.jaw.rotation.x=-.15+Math.sin(t*6)*.15;if(s.userData.ball){s.userData.ball.position.y=.9+Math.sin(t*3)*.3}})}});
  // 舞獅（一紅一黃）：大頭、毛茸茸鬃毛、會眨眼、嘴巴開合、亮片彩布、底下兩個人的腳
  const lion=(main,accent)=>{const g=new T.Group();const cloth=sph(.95,M(main,{roughness:.5}),1,.75,1.75);cloth.position.y=1.15;g.add(cloth);
   for(let k=0;k<18;k++){const a=k*2.39;const sq=sph(.07,glowM(k%2?accent:'#FFFFFF',.4),1,1,1,8);sq.position.set(Math.cos(a)*.9,1.15+Math.sin(k)*.4,-.9+k*.1);g.add(sq)}
   const fringe=new T.Mesh(new T.CylinderGeometry(.95,1.05,.35,24,1,true),M(accent,{side:T.DoubleSide}));fringe.position.y=.7;fringe.scale.z=1.7;g.add(fringe);
   const head=new T.Group();head.position.set(0,2.0,1.45);head.scale.setScalar(1.5);g.add(head);const LH=HEADS.lionHead(main==='#E23B2E'?'#D3202A':main,'#1F8A4C');LH.g.scale.setScalar(.66);head.add(LH.g);const lids=LH.lids;const mouth=LH.jaw,teeth=null;
   const tail=sph(.35,M('#F6C24A',{roughness:.9}));tail.position.set(0,1.4,-1.6);g.add(tail);
   const legs=[];/* v499：拿掉舞獅底下表演者的腳 */
   if(day214){const hh=new T.Mesh(new T.PlaneGeometry(.9,.9),new T.MeshBasicMaterial({map:heartTex,color:'#FF4F7E',transparent:true,depthWrite:false,side:T.DoubleSide}));hh.position.set(0,1.25,0);head.add(hh)}
   g.userData={head,legs,lids,mouth,teeth};root.add(g);return g};
  // v499 兩隻舞獅分兩條路線巡迴各島：城堡→訴訟→醫療（紅獅）、城堡→家庭→企業（黃獅），每到大門前停下表演，再原路折返
  const linkP=(ia,ib)=>{for(const L3 of LINKS()){if(L3.a===ia&&L3.b===ib)return L3.pts.map(p=>({x:p[0],z:p[2]}));if(L3.a===ib&&L3.b===ia)return L3.pts.map(p=>({x:p[0],z:p[2]})).reverse()}return []};
  const doorPt=i=>({x:xy[i][0],z:xy[i][1]+11.8,pause:5});
  const lionAnim=(L2,t,i,show,mv)=>{const U=L2.userData;U.head.rotation.y=Math.sin(t*(show?9:3)+i)*(show?.5:.25);U.head.rotation.x=Math.sin(t*5+i)*.12;const blink=(t*1.3+i)%3<.12;U.lids.forEach(l=>{l.rotation.x=blink?.95:-.35});const mo=Math.max(0,Math.sin(t*(show?8:4)));U.mouth.rotation.x=.1+mo*.35};
  const roamers=[];const buildRoute=(e,i1,i2)=>{const pts=[{x:e*6,z:16.5},{x:e*13.5,z:15.8},{x:e*16,z:6},{x:e*19.5,z:1}];/* v501：繞過前移的噴水池、求籤小廟與發財樹 */for(const p of linkP(0,i1))pts.push(p);pts.push(doorPt(i1));{const I1=island(i1);/* v499：繞過建築側邊再上橋，不穿過房子 */pts.push({x:I1.x+e*12.5,z:I1.z+9.5},{x:I1.x+e*14.5,z:I1.z-7})}for(const p of linkP(i1,i2))pts.push(p);pts.push(doorPt(i2));const r=pts.slice(0,-1).reverse().map(p=>({x:p.x,z:p.z,pause:p.pause}));return pts.concat(r.slice(1))};
  [[-1,1,2,['#E23B2E','#F2C14E']],[1,3,4,['#F2C14E','#E23B2E']]].forEach(([e,i1,i2,cols],li)=>{const L2=lion(...cols);const R=buildRoute(e,i1,i2);roamers.push({L2,R,k:0,f:0,wait:0,li,dir:0})});window.__wyRoam=roamers;
  // 四座島門口原地表演的小舞獅
  const smalls=[];for(let i=1;i<=4;i++){for(const e of[-1,1]){const L2=lion(e<0?'#E23B2E':'#F2C14E',e<0?'#F2C14E':'#E23B2E');L2.scale.setScalar(.6);const x=xy[i][0]+e*(i===2?3.6:4.4),z=xy[i][1]+(i===2?13.6:13.2);/* v500：醫療島右側花圃避開 */L2.position.set(x,gy(x,z)+.3,z);L2.rotation.y=e*.3;solid(x,z,.9,.9);smalls.push({L2,i:i*2+(e>0?1:0),x,z})}}
  movers.push((t,dt)=>{for(const r of roamers){const R=r.R;if(r.wait>0){r.wait-=dt;const L2=r.L2;L2.position.y=gy(L2.position.x,L2.position.z)+.3+Math.abs(Math.sin(t*6))*.45;L2.rotation.y+=Math.sin(t*4)*.02;lionAnim(L2,t,r.li,true);continue}
    const A=R[r.k],B=R[(r.k+1)%R.length];const d=Math.hypot(B.x-A.x,B.z-A.z)||.001;r.f+=2.4*dt/d;if(r.f>=1){r.f=0;r.k=(r.k+1)%R.length;if(B.pause)r.wait=B.pause;continue}
    const x=A.x+(B.x-A.x)*r.f,z=A.z+(B.z-A.z)*r.f;const L2=r.L2;L2.position.set(x,gy(x,z)+.3+Math.abs(Math.sin(t*6+r.li))*.22,z);const ty=Math.atan2(B.x-A.x,B.z-A.z);let dy=ty-L2.rotation.y;dy=Math.atan2(Math.sin(dy),Math.cos(dy));L2.rotation.y+=dy*Math.min(1,dt*5);lionAnim(L2,t,r.li,false)}
   for(const s2 of smalls){s2.L2.position.y=gy(s2.x,s2.z)+.3+Math.abs(Math.sin(t*5+s2.i))*.3;lionAnim(s2.L2,t,s2.i,true)}});
  movers.push((t,dt)=>{const A=c.actor&&c.actor();for(const tr of troupes){let near=false;if(A){const p=tr.pos?tr.pos(tr.ph):posOn(tr.ph);near=Math.hypot(A.position.x-p.x,A.position.z-p.z)<3.6}if(!near)tr.ph+=tr.sp*dt;tr.upd(tr.ph,t,near,dt)}});
  // v497 春節加碼：城堡兩側成串鞭炮（定時劈哩啪啦）、廣場紅包發財樹（點一下跳出新年祝福）
  {const zf=castleFrontZ(-6,6)+.6;const strings=[];for(const x of [-6.2,6.2]){const g=new T.Group();const str=cyl(.025,.025,4.2,M('#C8342B'),5);str.position.y=-2.1;g.add(str);const ps=[];
    for(let k=0;k<16;k++){const fc=cyl(.09,.09,.32,M(k%2?'#E23B2E':'#C8342B'),8);const e=k%2?1:-1;fc.position.set(e*.14,-.3-k*.24,0);fc.rotation.z=e*.6;g.add(fc);ps.push(fc)}const top=sph(.3,M(GOLD,{metalness:.4}));g.add(top);add(g,x,zf,8.6);strings.push({g,ps})}
   const sparks=[];let fcT=4;movers.push((t,dt)=>{fcT-=dt;if(fcT<=0){fcT=9;crackle();for(const st of strings)for(let k=0;k<10;k++){const sp=new T.Mesh(new T.SphereGeometry(.12,6,4),new T.MeshBasicMaterial({color:['#FFE27A','#FF6B3C','#FFFFFF'][k%3],transparent:true}));const p=st.ps[Math.floor(Math.random()*st.ps.length)];p.getWorldPosition(sp.position);scene.add(sp);sparks.push({m:sp,v:new T.Vector3((Math.random()-.5)*5,Math.random()*4,(Math.random()-.5)*5),life:.7})}}
    for(let i=sparks.length-1;i>=0;i--){const o=sparks[i];o.life-=dt;o.v.y-=9*dt;o.m.position.addScaledVector(o.v,dt);o.m.material.opacity=Math.max(0,o.life/.7);if(o.life<=0){scene.remove(o.m);o.m.geometry.dispose();o.m.material.dispose();sparks.splice(i,1)}}
    for(const st of strings)st.g.rotation.z=fcT>8.3?Math.sin(t*40)*.06:Math.sin(t*1.2)*.02})}
  {const tree=new T.Group();const pot=cyl(1.1,.85,1,M('#C8342B'),20);pot.position.y=.5;tree.add(pot);const rim=new T.Mesh(new T.TorusGeometry(1.1,.08,6,24),gold);rim.rotation.x=Math.PI/2;rim.position.y=1;tree.add(rim);
   const tr=cyl(.22,.32,2.6,M('#8A5A36'),10);tr.position.y=2.2;tree.add(tr);[[0,4.2,1.9],[-.9,3.6,1.2],[.9,3.7,1.25]].forEach(([x,y,r])=>{const cr=sph(r,M('#3F9A4E',{roughness:.7}),1,.9,1);cr.position.set(x,y,0);tree.add(cr)});
   const envTex=canvasTex(64,96,(g2,w,h)=>{g2.fillStyle='#D7261E';g2.fillRect(0,0,w,h);g2.fillStyle='#F2C14E';g2.beginPath();g2.arc(w/2,h*.38,13,0,7);g2.fill();g2.fillStyle='#D7261E';g2.font='bold 18px serif';g2.textAlign='center';g2.textBaseline='middle';g2.fillText('福',w/2,h*.4)});
   for(let k=0;k<16;k++){const a=k*2.4,r=1.2+(k%3)*.35,y=3.3+(k%5)*.35;const env=new T.Mesh(new T.PlaneGeometry(.42,.62),new T.MeshStandardMaterial({map:envTex,side:T.DoubleSide,roughness:.6}));env.position.set(Math.cos(a)*r,y,Math.sin(a)*r);env.rotation.y=-a+Math.PI/2;tree.add(env);const ph=k;movers.push(t=>{env.rotation.z=Math.sin(t*1.5+ph)*.12})}
   for(let k=0;k<6;k++){const co=cyl(.22,.22,.06,M(GOLD,{metalness:.6,roughness:.25}),16);co.rotation.x=Math.PI/2;co.position.set(Math.cos(k)*1.5,2.8+k*.3,Math.sin(k)*1.5);tree.add(co)}
   const P={x:-9.6,z:9.0};/* v501：讓開旁邊的長椅 */tree.scale.setScalar(1.1);add(tree,P.x,P.z);solid(P.x,P.z,1.3,1.3);
   // v498：發財樹點了只搖動、掉紅包和金幣（文字祝福交給籤筒）
   const drops=[];onTap(tree,()=>{beep([1319,1568,1760,2093],.08);let sh=0;const sv=setInterval(()=>{sh++;tree.rotation.z=Math.sin(sh*1.6)*.06*(1-sh/14);if(sh>=14){clearInterval(sv);tree.rotation.z=0}},40);
    for(let k=0;k<12;k++){const isEnv=k%2===0;const m=isEnv?new T.Mesh(new T.PlaneGeometry(.42,.62),new T.MeshStandardMaterial({map:envTex,side:T.DoubleSide,roughness:.6,transparent:true})):new T.Mesh(new T.CylinderGeometry(.22,.22,.06,14),new T.MeshStandardMaterial({color:GOLD,metalness:.6,roughness:.25,transparent:true}));
     const a=Math.random()*Math.PI*2,r=.6+Math.random()*1.6;m.position.set(P.x+Math.cos(a)*r,gy(P.x,P.z)+4+Math.random()*1.5,P.z+Math.sin(a)*r);scene.add(m);drops.push({m,v:new T.Vector3(Math.cos(a)*1.2,1.5+Math.random(),Math.sin(a)*1.2),spin:(Math.random()-.5)*8,life:2.4,floor:gy(P.x,P.z)+.08})}
    setTimeout(()=>beep([1568,2093],.06),250);setTimeout(()=>beep([1760,2349],.06),500)});
   movers.push((t,dt)=>{for(let i=drops.length-1;i>=0;i--){const d=drops[i];d.life-=dt;if(d.m.position.y>d.floor){d.v.y-=7*dt;d.m.position.addScaledVector(d.v,dt);d.m.rotation.x+=d.spin*dt;d.m.rotation.y+=d.spin*.7*dt}else{d.m.position.y=d.floor;d.v.set(0,0,0)}if(d.life<.6)d.m.material.opacity=Math.max(0,d.life/.6);if(d.life<=0){scene.remove(d.m);d.m.geometry.dispose();d.m.material.dispose();drops.splice(i,1)}}})}
  // v498 新春好運籤：籤筒＋供桌，走近按金色按鈕（或點籤筒）求籤；24 支全是好籤，抽完一輪才重複，第一次有金光
  {const FORT=[
   ['上上籤','財運',['春風送暖入門庭','金玉滿堂百福臨','勤耕自有豐收日','財源廣進喜盈盈'],'新的一年努力會有收穫，財運亨通。'],
   ['上上籤','事業',['鵬程萬里展新翼','步步登高志不移','貴人相助風帆順','功成名就正當時'],'事業有貴人相助，適合開創新局。'],
   ['上籤','健康',['晨光和煦照身心','四季安康福壽深','作息有常添精神','笑口常開勝千金'],'保持好作息，健康平安一整年。'],
   ['大吉','家庭',['爐火團圓笑語揚','一家和樂共春光','長幼相親情意厚','福星高照滿華堂'],'家人和睦，團圓喜樂。'],
   ['上上籤','感情',['紅線千里自相牽','花好月圓意綿綿','真心相待情長久','良緣美滿喜連年'],'真心相待，感情甜蜜。'],
   ['上籤','平安',['出入平安步步寬','風調雨順福綿延','凡事細心多思量','一年順遂好運連'],'凡事謹慎，出入平安。'],
   ['大吉','合作',['白紙黑字寫分明','合作同心事有成','約定清楚無煩惱','新春開市萬事興'],'合作前把約定寫清楚，新的一年合作順利。'],
   ['上上籤','學業',['書山有路勤為徑','日日精進見真章','一分耕耘一分得','學成名就姓名香'],'用心學習，成果看得見。'],
   ['大吉','財運',['金雞報曉福門開','五路財神送寶來','開源節流皆有道','年年有餘笑顏開'],'量入為出，年年有餘。'],
   ['上上籤','事業',['春雷一響萬物新','大展鴻圖正逢春','腳踏實地行穩健','前程似錦步青雲'],'穩紮穩打，事業步步高升。'],
   ['上籤','人緣',['和氣待人人自親','春風滿面處處春','廣結善緣多貴人','一路相扶到天明'],'人緣佳，處處有人幫忙。'],
   ['大吉','旅行',['千山萬水任遨遊','四海風光眼底收','平安出發平安返','美景良緣滿行囊'],'出遊順利，滿載而歸。'],
   ['上上籤','家庭',['堂前燕子報春歸','笑語盈門福滿閨','父慈子孝家興旺','和樂融融共舉杯'],'家和萬事興，喜事連連。'],
   ['上籤','健康',['青山綠水養精神','步履輕盈氣色新','三餐有節心常樂','福壽綿長樂此身'],'作息規律，身心都輕鬆。'],
   ['大吉','合作',['同舟共濟向前行','各盡其職事竟成','先把規則說清楚','互信互助路自平'],'分工清楚，合作愉快。'],
   ['上上籤','願望',['心中所願漸成真','好事臨門福氣臨','莫忘初衷勤努力','春光明媚照前程'],'持續努力，心願逐步實現。'],
   ['上籤','財運',['細水長流聚成河','點滴積累福氣多','理財有方心踏實','安穩富足樂呵呵'],'穩健理財，安心踏實。'],
   ['大吉','感情',['春暖花開遇知音','兩情相悅意相親','溫柔體貼常相伴','甜蜜幸福到如今'],'用心經營，感情甜蜜長久。'],
   ['上上籤','平安',['吉星高照福臨門','歲歲平安喜事頻','心寬路寬天地寬','一帆風順過新春'],'心情放寬，一路平安順遂。'],
   ['上籤','事業',['良禽擇木展翅飛','機會來時莫遲疑','準備周全迎挑戰','春風得意馬蹄疾'],'做好準備，把握機會。'],
   ['大吉','學業',['寒窗苦讀終有成','金榜題名喜盈盈','一筆一畫皆功夫','前程萬里鵬程行'],'努力不懈，考試順利。'],
   ['上上籤','人緣',['四海之內皆兄弟','真誠相待得人心','一言一行有分寸','貴人扶持事事興'],'待人真誠，貴人相助。'],
   ['上籤','願望',['春風化雨潤心田','一步一腳印向前','今年種下好種子','明年花開更燦然'],'今年打好基礎，明年更好。'],
   ['大吉','新春',['德威迎春福滿堂','陽光普照好運長','有法有度心安穩','新年新氣象吉祥'],'新年新氣象，福氣滿滿。']];
   const NUM=['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','二十一','二十二','二十三','二十四'];
   const QP={x:9.6,z:9.0},QR=-1.1;/* v501：移到城堡大門右前方的廣場空地，不壓到旁邊的長椅與花叢 */const qy=gy(QP.x,QP.z);const q=new T.Group();
   const tbl=new T.Mesh(new T.BoxGeometry(2.4,.12,1.3),M('#8A2A1E'));tbl.position.y=1.0;q.add(tbl);const cloth=new T.Mesh(new T.BoxGeometry(2.42,.7,1.32),M('#D7261E'));cloth.position.y=.62;q.add(cloth);const fr=new T.Mesh(new T.BoxGeometry(2.44,.08,1.34),gold);fr.position.y=.95;q.add(fr);
   for(const e of[-1,1]){const lg=cyl(.06,.06,1,M('#5A1A12'),6);lg.position.set(e*1.05,.5,.5);q.add(lg);const lg2=lg.clone();lg2.position.z=-.5;q.add(lg2)}
   const tube=new T.Group();tube.position.set(-.25,1.06,0);q.add(tube);const tb=new T.Mesh(new T.CylinderGeometry(.34,.3,1.0,20,1,true),M('#C8161E',{side:T.DoubleSide}));tb.position.y=.5;tube.add(tb);const tbBot=cyl(.3,.3,.04,M('#8A1A14'),20);tube.add(tbBot);
   for(const y of[.05,.95]){const r2=new T.Mesh(new T.TorusGeometry(y>.5?.34:.3,.035,6,24),gold);r2.rotation.x=Math.PI/2;r2.position.y=y;tube.add(r2)}
   const lab=new T.Mesh(new T.PlaneGeometry(.34,.5),new T.MeshStandardMaterial({map:canvasTex(80,120,(g2,w,h)=>{g2.fillStyle='#F2C14E';g2.fillRect(0,0,w,h);g2.fillStyle='#C8161E';g2.font='bold 40px "Noto Serif TC",serif';g2.textAlign='center';g2.textBaseline='middle';g2.fillText('求',w/2,h*.3);g2.fillText('籤',w/2,h*.72)}),roughness:.5}));lab.position.set(0,.52,.31);tube.add(lab);
   for(let k=0;k<14;k++){const a=k/14*Math.PI*2,r=.05+(k%3)*.07;const st=new T.Mesh(new T.BoxGeometry(.05,.95,.015),M(k%4?'#C89B5A':'#D7261E'));st.position.set(Math.cos(a)*r,1.1+(k%3)*.06,Math.sin(a)*r);st.rotation.z=Math.cos(a)*.12;st.rotation.x=Math.sin(a)*.12;tube.add(st)}
   const burner=cyl(.22,.18,.25,gold,14);burner.position.set(.55,1.18,-.15);q.add(burner);for(let k=0;k<3;k++){const ic=cyl(.012,.012,.6,M('#B8202A'),4);ic.position.set(.5+k*.05,1.55,-.15);ic.rotation.z=(k-1)*.15;q.add(ic)}
   const plate=cyl(.32,.26,.05,gold,16);plate.position.set(.7,1.1,.3);q.add(plate);for(let k=0;k<4;k++){const or=sph(.12,M('#F28C28',{roughness:.5}));or.position.set(.62+(k%2)*.16,1.2+(k>2?.16:0),.22+Math.floor(k/2)*.16);q.add(or)}
   add(q,QP.x,QP.z);q.rotation.y=QR;
   /* v501：供桌擴大成小廟前庭（紅柱、雙層屋簷、金雲籤牌），比較遠也看得到 */
   {const tp=new T.Group();q.add(tp);const RED=M('#C8261E',{roughness:.5}),RED2=M('#A3161A',{roughness:.5});
    const plat=new T.Mesh(new T.BoxGeometry(4.6,.22,2.8),M('#EBD9B8',{roughness:.8}));plat.position.set(0,.11,-.35);tp.add(plat);const pe=new T.Mesh(new T.BoxGeometry(4.7,.06,2.9),gold);pe.position.set(0,.24,-.35);tp.add(pe);
    for(const e of[-1,1]){const pl=cyl(.16,.18,3.3,RED,14);pl.position.set(e*1.85,1.85,-1.35);tp.add(pl);const pb=cyl(.26,.3,.25,gold,14);pb.position.set(e*1.85,.36,-1.35);tp.add(pb);const pc=cyl(.24,.2,.22,gold,14);pc.position.set(e*1.85,3.5,-1.35);tp.add(pc)}
    const back=new T.Mesh(new T.BoxGeometry(3.5,2.6,.12),RED2);back.position.set(0,1.75,-1.45);tp.add(back);const bf=new T.Mesh(new T.BoxGeometry(3.3,2.4,.04),M('#F2C14E',{metalness:.3,roughness:.4}));bf.position.set(0,1.75,-1.38);tp.add(bf);const bi=new T.Mesh(new T.BoxGeometry(3.1,2.2,.05),RED);bi.position.set(0,1.75,-1.36);tp.add(bi);
    const roof=(w,y,d)=>{const r=new T.Mesh(new T.BoxGeometry(w,.28,d),RED);r.position.set(0,y,-1.2);tp.add(r);const tr=new T.Mesh(new T.BoxGeometry(w+.1,.08,d+.1),gold);tr.position.set(0,y-.16,-1.2);tp.add(tr);for(const e of[-1,1]){const tip=new T.Mesh(new T.ConeGeometry(.16,.6,8),gold);tip.position.set(e*(w/2+.12),y+.22,-1.2+d/2-.1);tip.rotation.z=-e*.9;tp.add(tip)}};
    roof(4.7,3.75,1.9);roof(3.5,4.35,1.4);const ridge=cyl(.09,.09,3.2,gold,10);ridge.rotation.z=Math.PI/2;ridge.position.set(0,4.58,-1.2);tp.add(ridge);const pearl=sph(.2,gold);pearl.position.set(0,4.8,-1.2);tp.add(pearl);
    for(const e of[-1,1]){const ln=sph(.32,M('#E23B2E',{emissive:'#E23B2E',emissiveIntensity:.35,roughness:.5}),1,1.15,1);ln.position.set(e*1.85,3.1,-.95);tp.add(ln);for(const yy of[.36,-.36]){const cp=cyl(.18,.22,.08,gold,12);cp.position.set(e*1.85,3.1+yy,-.95);tp.add(cp)}}
    const cloudT=canvasTex(512,220,(x,w,h)=>{x.fillStyle='#F2C14E';x.beginPath();x.roundRect(40,40,w-80,h-80,40);x.fill();for(const [cx,cy,r] of[[60,110,52],[w-60,110,52],[150,46,40],[w-150,46,40],[256,36,40],[150,h-40,36],[w-150,h-40,36]]){x.beginPath();x.arc(cx,cy,r,0,7);x.fill()}
     x.strokeStyle='#B8892E';x.lineWidth=6;x.beginPath();x.roundRect(52,52,w-104,h-104,32);x.stroke();x.fillStyle='#B0141A';x.font='bold 74px "Noto Serif TC","PMingLiU",serif';x.textAlign='center';x.textBaseline='middle';x.fillText('新春好運籤',w/2,h/2+4)});
    const sign=new T.Mesh(new T.PlaneGeometry(3.0,1.29),new T.MeshStandardMaterial({map:cloudT,transparent:true,alphaTest:.3,roughness:.4,metalness:.2,emissive:'#4a3208',emissiveIntensity:.2}));sign.position.set(0,3.95,-.24);tp.add(sign)}
   q.scale.setScalar(1.3);solid(QP.x,QP.z,1.9,1.9);
   /* v501：第一次靠近城堡時提示一次求籤位置；走到供桌前林律師打招呼 */
   {let hinted=false,greeted=false;try{hinted=localStorage.getItem('wy-cny-hint-'+cnyYear)==='1'}catch(e){}
    movers.push(()=>{const A=c.actor&&c.actor();if(!A||(c.inside&&c.inside()))return;const dc=Math.hypot(A.position.x,A.position.z-8);
     if(!hinted&&dc<24){hinted=true;try{localStorage.setItem('wy-cny-hint-'+cnyYear,'1')}catch(e){}setTimeout(()=>toastMsg('城堡廣場右側有新春好運籤，過去抽一支吧'),1500)}
     if(!greeted&&Math.hypot(A.position.x-QP.x,A.position.z-QP.z)<4.2){greeted=true;if(window.wyCornerSay)window.wyCornerSay(0,'新年快樂！抽一支好運籤，祝您新的一年有法度。',6000);else toastMsg('新年快樂！抽一支好運籤')}})}
   /* v501：春節期間「介紹」上方多一個紅燈籠「求籤」按鈕，點了自動走到供桌前 */
   {const css=document.createElement('style');css.textContent='#wyLanternBtn{position:fixed;z-index:58;width:62px;height:76px;border:0;padding:0;background:none;display:none;-webkit-tap-highlight-color:transparent}#wyLanternBtn .lb{position:absolute;left:4px;top:10px;width:54px;height:54px;border-radius:50%/46%;background:radial-gradient(circle at 35% 30%,#FF7A63,#D7261E 55%,#9A0F14);border:2px solid #F2C14E;box-shadow:0 6px 14px #0004;display:flex;align-items:center;justify-content:center;color:#FFE7A8;font:800 15px "Noto Sans TC",sans-serif;letter-spacing:1px}#wyLanternBtn .cp{position:absolute;left:19px;width:24px;height:7px;border-radius:3px;background:#F2C14E}#wyLanternBtn .ts{position:absolute;left:29px;top:66px;width:4px;height:10px;background:#F2C14E;border-radius:2px}';document.head.appendChild(css);
    const bt=document.createElement('button');bt.id='wyLanternBtn';bt.type='button';bt.setAttribute('aria-label','求籤');bt.innerHTML='<i class="cp" style="top:6px"></i><span class="lb">求籤</span><i class="cp" style="top:62px"></i><i class="ts"></i>';document.body.appendChild(bt);
    const STAND={x:QP.x+Math.sin(QR)*3.2,z:QP.z+Math.cos(QR)*3.2};let going=false;
    bt.onclick=e=>{e.stopPropagation();if(window.wyWalkTo){window.wyWalkTo(STAND.x,STAND.z);going=true}else show()};
    let lt=0;movers.push((t)=>{if(t-lt<.25)return;lt=t;const it=document.getElementById('interact');const A=c.actor&&c.actor();const cr=document.getElementById('creator');
     const ok=it&&A&&!(c.inside&&c.inside())&&getComputedStyle(it).display!=='none'&&!(cr&&cr.style.display!=='none')&&!document.getElementById('wyFortune');const near=A&&Math.hypot(A.position.x-QP.x,A.position.z-QP.z)<3.6;
     if(going&&near){going=false;setTimeout(show,300)}
     if(!ok||near){bt.style.display='none';return}const r=it.getBoundingClientRect();if(!r.width){bt.style.display='none';return}bt.style.display='block';bt.style.left=(r.left+r.width/2-31)+'px';bt.style.top=(r.top-84)+'px'})}
   /* v501：每支籤加一句法度小提醒（依主題），不含任何保證 */
   const TIP={財運:'借錢給親友，記得留下借據或轉帳紀錄。',事業:'合作開始前，先把合約的權利義務寫清楚。',健康:'看診的病歷與收據記得保存，日後用得上。',感情:'婚前財產可以先做約定，感情更安心。',平安:'發生車禍先報警、拍照存證，再談和解。',學業:'租屋簽約前，先確認押金與修繕責任。',人緣:'網路發言前多想一下，避免涉及妨害名譽。',家庭:'遺囑要符合法定方式，才能照心意安排。',願望:'重要的承諾，記得留下書面紀錄。',合作:'合夥做生意，出資與分紅比例先白紙黑字寫好。',旅行:'出國旅遊買保險前，先看清楚理賠範圍。',新春:'新年新計畫，重要約定記得白紙黑字。'};
   let shuffled=[],first=true;const pick=()=>{if(!shuffled.length){shuffled=FORT.map((_,i)=>i);for(let i=shuffled.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]}}return shuffled.pop()};
   let busy=false;
   /* v501：把籤詩卡畫成一張圖，手機可直接分享，不支援時改為下載 */
   const shareCard=(idx,f)=>{const W=720,H=1280,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');
    const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#C8161E');g.addColorStop(1,'#A30F15');x.fillStyle=g;x.fillRect(0,0,W,H);x.strokeStyle='#F2C14E';x.lineWidth=14;x.strokeRect(20,20,W-40,H-40);x.lineWidth=4;x.strokeRect(42,42,W-84,H-84);
    x.textAlign='center';x.fillStyle='#FFE7A8';x.font='34px "Noto Serif TC",serif';x.fillText('德威陽 新春好運籤',W/2,130);x.fillStyle='#FFD86A';x.font='bold 60px "Noto Serif TC",serif';x.fillText('第'+NUM[idx]+'籤　'+f[0],W/2,215);
    x.fillStyle='#F2C14E';x.beginPath();x.roundRect(W/2-70,245,140,48,24);x.fill();x.fillStyle='#A30F15';x.font='bold 28px "Noto Sans TC",sans-serif';x.fillText(f[1],W/2,280);
    x.fillStyle='#FFF4D2';x.font='bold 50px "BiauKai","DFKai-SB","Kaiti TC","Noto Serif TC",serif';f[2].forEach((l,ci)=>{const cx=W/2+135-ci*90;[...l].forEach((ch,k)=>x.fillText(ch,cx,370+k*62))});
    x.fillStyle='#FFE7A8';x.font='30px "Noto Serif TC",serif';x.fillText('解曰：'+f[3],W/2,860);
    if(TIP[f[1]]){x.fillStyle='#FFF4D2';x.beginPath();x.roundRect(70,900,W-140,110,20);x.fill();x.fillStyle='#7A0A10';x.font='bold 28px "Noto Sans TC",sans-serif';x.fillText('法度小提醒',W/2,945);x.font='27px "Noto Sans TC",sans-serif';x.fillText(TIP[f[1]],W/2,988)}
    const fin=()=>{x.fillStyle='#FFE7A8';x.font='bold 32px "Noto Sans TC",sans-serif';x.fillText('德威陽國際法律事務所',W/2+60,1125);x.fillStyle='#FFD86A';x.fillText('有法度 YES, WE DO!',W/2+60,1170);x.fillStyle='#FFE7A8';x.font='24px "Noto Sans TC",sans-serif';x.fillText('weiyanglaw.github.io/yeswedo',W/2,1225);
     cv.toBlob(b=>{const file=new File([b],'德威陽新春好運籤.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[file]})){navigator.share({files:[file],title:'德威陽 新春好運籤'}).catch(()=>{})}else{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='德威陽新春好運籤.png';a.click();toastMsg('好運籤圖片已下載')}},'image/png')};
    const im=new Image();im.onload=()=>{x.drawImage(im,110,1075,130,130);fin()};im.onerror=fin;im.src='office-logo-transparent.png'};
   window.__wyFortuneShow=()=>show();
   const show=()=>{if(busy)return;busy=true;const idx=pick(),f=FORT[idx];const isFirst=first;first=false;
    const ov=document.createElement('div');ov.id='wyFortune';ov.style.cssText='position:fixed;inset:0;z-index:90;background:rgba(20,10,10,.55);display:flex;align-items:center;justify-content:center;flex-direction:column;overflow-y:auto;padding:12px 0;box-sizing:border-box;font-family:"Noto Serif TC","PMingLiU",serif;touch-action:none';
    const tubeEl=document.createElement('div');tubeEl.style.cssText='width:96px;height:150px;border-radius:12px 12px 16px 16px;background:linear-gradient(90deg,#9A0F14,#D7261E 45%,#9A0F14);border:4px solid #F2C14E;position:relative;box-shadow:0 10px 30px #0006';tubeEl.innerHTML='<div style="position:absolute;left:50%;top:38px;transform:translateX(-50%);width:44px;padding:6px 0;background:#F2C14E;color:#C8161E;font-weight:800;font-size:24px;line-height:1.15;text-align:center;border-radius:4px">求<br>籤</div>'+Array.from({length:9},(_,k)=>'<div style="position:absolute;bottom:136px;left:'+(14+k*7.5)+'px;width:5px;height:'+(46+(k%3)*10)+'px;background:'+(k%4?'#D9AE6A':'#E0302A')+';border-radius:2px;transform:rotate('+((k-4)*3)+'deg)"></div>').join('');
    ov.appendChild(tubeEl);document.body.appendChild(ov);
    if(isFirst){const glow=document.createElement('div');glow.style.cssText='position:absolute;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,#FFE7A8cc,#FFD36E33 55%,transparent 70%);animation:wyGlowP 1.6s ease-out forwards;pointer-events:none';ov.insertBefore(glow,tubeEl)}
    if(!document.getElementById('wyFortuneCSS')){const st=document.createElement('style');st.id='wyFortuneCSS';st.textContent='@keyframes wyShake{0%,100%{transform:rotate(0)}25%{transform:rotate(-14deg)}75%{transform:rotate(14deg)}}@keyframes wyGlowP{0%{transform:scale(.3);opacity:0}40%{opacity:1}100%{transform:scale(1.5);opacity:0}}@keyframes wyStick{0%{transform:translateY(0) rotate(0)}60%{transform:translateY(-120px) rotate(-10deg)}100%{transform:translateY(-90px) rotate(0) scale(1.05)}}@keyframes wyCardIn{0%{transform:rotateY(90deg) scale(.7);opacity:0}100%{transform:rotateY(0) scale(1);opacity:1}}';document.head.appendChild(st)}
    tubeEl.style.animation='wyShake .18s ease-in-out 8';let rs=0;const rattle=setInterval(()=>{beep([180+Math.random()*120],.03,'square',.08);if(++rs>14)clearInterval(rattle)},95);
    setTimeout(()=>{const stick=document.createElement('div');stick.style.cssText='position:absolute;width:16px;height:130px;background:linear-gradient(#E0302A,#C8161E);border:2px solid #F2C14E;border-radius:4px;color:#FFE7A8;font-weight:800;font-size:13px;writing-mode:vertical-rl;display:flex;align-items:center;justify-content:center;animation:wyStick .7s ease-out forwards';stick.textContent='第'+NUM[idx]+'籤';ov.appendChild(stick);beep([988,1319],.1);
     setTimeout(()=>{ov.innerHTML='';const card=document.createElement('div');card.style.cssText='position:relative;width:min(300px,82vw);background:linear-gradient(180deg,#C8161E,#A30F15);border:5px solid #F2C14E;border-radius:14px;padding:16px 14px 14px;color:#FFE7A8;text-align:center;box-shadow:0 16px 40px #0008,inset 0 0 0 3px #A30F15,inset 0 0 0 5px #F2C14E;animation:wyCardIn .5s ease-out';
      const ttl=isFirst?'今日第一支好運籤':'德威陽 新春好運籤';
      card.innerHTML='<div style="font-size:15px;letter-spacing:2px;opacity:.95">'+ttl+'</div><div style="margin:6px 0 2px;font-size:22px;font-weight:800;color:#FFD86A">第'+NUM[idx]+'籤　'+f[0]+'</div><div style="display:inline-block;font-size:12px;background:#F2C14E;color:#A30F15;border-radius:10px;padding:2px 10px;font-weight:700">'+f[1]+'</div>'
       +'<div style="display:flex;flex-direction:row-reverse;justify-content:center;gap:14px;margin:10px 0 8px;height:172px;font-size:19px;font-weight:700;color:#FFF4D2;font-family:\'BiauKai\',\'DFKai-SB\',\'Kaiti TC\',\'Noto Serif TC\',serif">'+f[2].map(l=>'<div style="writing-mode:vertical-rl;text-orientation:upright;letter-spacing:4px;line-height:1">'+l+'</div>').join('')+'</div>'
       +'<div style="font-size:14px;color:#FFE7A8;margin:4px 6px 10px;line-height:1.5">解曰：'+f[3]+'</div>'
       +(TIP[f[1]]?'<div style="margin:0 4px 10px;padding:7px 9px;background:#FFF4D2;color:#7A0A10;border-radius:9px;font-size:13px;line-height:1.45;text-align:left;font-family:\'Noto Sans TC\',sans-serif"><b>法度小提醒｜</b>'+TIP[f[1]]+'</div>':'')
       +'<div style="display:flex;align-items:center;justify-content:center;gap:10px;border-top:1px solid #F2C14E88;padding-top:10px"><img src="office-logo-transparent.png" style="width:52px;height:52px;object-fit:contain"><div style="font-size:14px;line-height:1.4;text-align:left;font-weight:700">德威陽國際法律事務所<br><span style="color:#FFD86A">有法度 YES, WE DO!</span></div></div>'
       +'<button id="wyFortShare" style="width:100%;margin-top:12px;padding:9px 0;border-radius:20px;border:2px solid #F2C14E;background:#1F3460;color:#FFE7A8;font-size:15px;font-weight:800">存圖分享好運</button><div style="display:flex;gap:10px;margin-top:8px"><button id="wyFortAgain" style="flex:1;padding:9px 0;border-radius:20px;border:2px solid #F2C14E;background:#7A0A10;color:#FFE7A8;font-size:15px;font-weight:700">再抽一支</button><button id="wyFortOk" style="flex:1;padding:9px 0;border-radius:20px;border:2px solid #F2C14E;background:#F2C14E;color:#A30F15;font-size:15px;font-weight:800">收下好運</button></div>'
       +'';
      ov.appendChild(card);beep([784,988,1319,1568],.12);
      const close=()=>{ov.remove();busy=false};card.querySelector('#wyFortOk').onclick=close;card.querySelector('#wyFortShare').onclick=e=>{e.stopPropagation();try{shareCard(idx,f)}catch(err){toastMsg('請直接截圖分享')}};card.querySelector('#wyFortAgain').onclick=()=>{close();setTimeout(show,60)};ov.addEventListener('click',e=>{if(e.target===ov)close()})},800)},1500)};
   onTap(q,show);
   movers.push(()=>{const A=c.actor&&c.actor();if(!A)return;const near=Math.hypot(A.position.x-QP.x,A.position.z-QP.z)<3.6;if(near&&!window.wyNearAction)window.wyNearAction={label:'求籤',hint:'按金色按鈕求籤',fn:show};else if(!near&&window.wyNearAction&&window.wyNearAction.fn===show)window.wyNearAction=null})}

  // 元宵大花燈（生肖）
  /* v501：生肖大燈籠整個春節期間都有（不只元宵），另在城堡正面兩角掛一對 */{const Z='鼠牛虎兔龍蛇馬羊猴雞狗豬'[((cnyYear||new Date().getFullYear())-4)%12];const g=new T.Group();const fr=cyl(.12,.14,5.6,gold);fr.position.y=2.8;g.add(fr);
   const big=sph(2.1,glowM('#E23B2E',.75),1,1.1,1);big.position.y=5.4;g.add(big);for(const yy of [3.05,7.75]){const cp=cyl(.9,1.1,.35,gold,20);cp.position.y=yy;g.add(cp)}
   for(let k=0;k<8;k++){const rib=new T.Mesh(new T.TorusGeometry(2.12,.05,6,40,Math.PI),gold);rib.rotation.y=k/8*Math.PI;rib.rotation.z=Math.PI/2;rib.position.y=5.4;rib.scale.set(1.1,1,1);g.add(rib)}
   const lbl=new T.Mesh(new T.CircleGeometry(1.05,40),new T.MeshBasicMaterial({map:canvasTex(256,256,(x,w,h)=>{x.fillStyle='#FFF4D2';x.beginPath();x.arc(128,128,124,0,7);x.fill();x.strokeStyle='#C9A13B';x.lineWidth=10;x.stroke();x.fillStyle='#C8342B';x.font='bold 150px "Noto Serif TC",serif';x.textAlign='center';x.textBaseline='middle';x.fillText(Z,128,138)})}));lbl.position.set(0,5.4,2.25);g.add(lbl);
   const ts=cyl(.08,.25,1.4,M('#F2C14E'),8);ts.position.y=2.4;g.add(ts);/* v499：生肖大燈籠縮小成一對，放廣場左右兩側，不擋城堡 */g.scale.setScalar(.55);add(g,-12.6,18.6);const g2=g.clone();add(g2,12.6,18.6);solid(-12.6,18.6,.9,.9);solid(12.6,18.6,.9,.9);
   for(const e of[-1,1]){const h=new T.Group();const hz=castleFrontZ(e*8.4,9)+.9;const ln=g.children.filter(o=>o!==fr&&o!==ts).map(o=>o.clone());ln.forEach(o=>{o.position.y-=5.4;h.add(o)});const rope=cyl(.04,.04,1.6,gold,6);rope.position.y=2.9;h.add(rope);h.scale.setScalar(.62);h.position.set(e*8.4,gy(e*8.4,hz)+6.2,hz);root.add(h);const ph=e;movers.push(t=>{h.rotation.z=Math.sin(t*.8+ph)*.04})}}
  // v501 春節煙火：入夜後每 20 秒輪流放「垂柳」「牡丹」「福字」；入夜與每個整點有 30 秒煙火秀，最後是 Logo 煙火和「有法度」。全部慢慢淡出，不閃爍。
  const fws=[];let fwT=4,fwK=0,showT=-1,lastHour=-1,lastPh='';
  const textPts=(txt,font,W,H,scale,max)=>{const cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');x.fillStyle='#000';x.font=font;x.textAlign='center';x.textBaseline='middle';x.fillText(txt,W/2,H/2+2);const d=x.getImageData(0,0,W,H).data;const pts=[];
   for(let j=0;j<H;j+=1)for(let i=0;i<W;i+=1){if(d[(j*W+i)*4+3]>120)pts.push([(i-W/2)*scale,(H/2-j)*scale])}return pts.length>max?pts.filter((_,k)=>k%Math.ceil(pts.length/max)===0):pts};
  let FU=null,YFD=null;try{FU=textPts('福','bold 52px "Noto Serif TC","PMingLiU",serif',64,64,.42,520);YFD=textPts('有法度','bold 40px "Noto Sans TC","PingFang TC",sans-serif',150,52,.3,700)}catch(e){}
  const skyPoint=(sx,sy,D)=>{const cam=c.camera;const dir=new T.Vector3(sx,sy,.5).unproject(cam).sub(cam.position).normalize();const p=cam.position.clone().addScaledVector(dir,D);if(p.y<24)p.y=24;return p};
  function shell(type,at){const cam=c.camera;const center=at||skyPoint((Math.random()-.5)*1.1,.25+Math.random()*.35,Math.min(95,Math.max(55,cam.position.y*.75+42)));
   let n,cols,vel=[],tgt=null,life,grav,drag,size;
   if(type==='willow'){n=120;cols=['#FFD36E','#FFE7A8','#F0B23C'];life=3.4;grav=3.2;drag=.975;size=2.3;for(let i=0;i<n;i++){const u=Math.random()*Math.PI*2,v=Math.acos(2*Math.random()-1),sp=10+Math.random()*3;vel.push([Math.sin(v)*Math.cos(u)*sp,Math.cos(v)*sp*.8+3,Math.sin(v)*Math.sin(u)*sp])}}
   else if(type==='peony'){n=130;const P=[['#FF5A5F','#FFD36E'],['#FF8FB8','#FFFFFF'],['#9AD8FF','#FFE7A8'],['#B8F28A','#FFD36E']][Math.floor(Math.random()*4)];cols=P;life=2.2;grav=5;drag=.982;size=2.6;for(let i=0;i<n;i++){const u=Math.random()*Math.PI*2,v=Math.acos(2*Math.random()-1),sp=(i%2?14:9)+Math.random()*1.5;vel.push([Math.sin(v)*Math.cos(u)*sp,Math.cos(v)*sp,Math.sin(v)*Math.sin(u)*sp])}}
   else{const src=type==='fu'?FU:YFD;if(!src||!src.length)return;tgt=src;n=src.length;cols=type==='fu'?['#FF4A3D','#FFD36E']:['#FFD36E','#FFF1C9'];life=4.4;grav=2.2;drag=.99;size=type==='fu'?2.1:1.7}
   const pos=new Float32Array(n*3),col=new Float32Array(n*3);for(let i=0;i<n;i++){const cc=new T.Color(cols[i%cols.length]);col.set([cc.r,cc.g,cc.b],i*3)}
   const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));g.setAttribute('color',new T.BufferAttribute(col,3));
   const p=new T.Points(g,new T.PointsMaterial({size,map:api.dot,vertexColors:true,transparent:true,depthWrite:false,blending:T.AdditiveBlending,fog:false}));p.position.copy(center);if(tgt){p.lookAt(cam.position)}p.renderOrder=5;scene.add(p);
   fws.push({p,vel,tgt,t:0,life,grav,drag,type});try{crackle()}catch(e){}}
  window.__wyCnyShow=()=>{showT=0};window.__wyCnyShell=t=>shell(t||'willow');
  movers.push((t,dt)=>{const inside=c.inside&&c.inside();const ph=api.phase();
   let hr=-1,mi=0;try{const p2=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Taipei',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());hr=+p2.find(q=>q.type==='hour').value%24;mi=+p2.find(q=>q.type==='minute').value}catch(e){}
   if(!inside&&ph==='night'){if(lastPh&&lastPh!=='night'&&showT<0)showT=0;if(mi===0&&hr!==lastHour&&showT<0){lastHour=hr;showT=0}}
   lastPh=ph;
   if(!inside&&showT>=0){const prev=showT;showT+=dt;const cross=v=>prev<v&&showT>=v;
    if(Math.floor(showT/0.9)!==Math.floor(prev/0.9)&&showT<25)shell(Math.random()<.5?'willow':'peony');
    if(cross(10)||cross(19))shell('fu');if(cross(26.5)){try{window.wyLogoFireworks&&window.wyLogoFireworks()}catch(e){}}
    if(cross(28.2))shell('yfd',skyPoint(0,.02,Math.min(95,Math.max(55,c.camera.position.y*.75+40))));if(showT>30)showT=-1}
   else if(!inside&&ph!=='day'){fwT-=dt;if(fwT<=0){fwT=20;shell(['willow','peony','fu'][fwK++%3])}}
   for(let i=fws.length-1;i>=0;i--){const f=fws[i];f.t+=dt;const a=f.p.geometry.attributes.position.array;
    if(f.tgt){const u=Math.min(1,f.t/.9),e=1-Math.pow(1-u,3);const fall=f.t>2.6?(f.t-2.6):0;for(let k=0;k<f.tgt.length;k++){a[k*3]=f.tgt[k][0]*e;a[k*3+1]=f.tgt[k][1]*e-fall*fall*f.grav*(1+(k%5)*.08);a[k*3+2]=0}}
    else{for(let k=0;k<f.vel.length;k++){const v=f.vel[k];v[1]-=f.grav*dt;v[0]*=f.drag;v[1]*=f.drag;v[2]*=f.drag;a[k*3]+=v[0]*dt;a[k*3+1]+=v[1]*dt;a[k*3+2]+=v[2]*dt}}
    f.p.geometry.attributes.position.needsUpdate=true;const fade=f.tgt?(f.t>2.6?Math.max(0,1-(f.t-2.6)/1.8):1):Math.max(0,1-Math.max(0,f.t-f.life*.45)/(f.life*.55));f.p.material.opacity=fade;
    if(f.t>f.life){scene.remove(f.p);f.p.geometry.dispose();f.p.material.dispose();fws.splice(i,1)}}})}
 // ---------- 西洋情人節 ----------
 function heartBalloon(col,h){const g=new T.Group();const sh=new T.Shape();sh.moveTo(0,-.5);sh.bezierCurveTo(-.9,.05,-.55,.75,0,.38);sh.bezierCurveTo(.55,.75,.9,.05,0,-.5);const geo=new T.ExtrudeGeometry(sh,{depth:.26,bevelEnabled:true,bevelThickness:.12,bevelSize:.1,bevelSegments:4});geo.center();
  const m=new T.Mesh(geo,M(col,{roughness:.25,emissive:col,emissiveIntensity:.15}));m.scale.setScalar(1.15);m.position.y=h;g.add(m);const str=cyl(.012,.012,h-.3,M('#FFFFFF'),4);str.position.y=(h-.3)/2;g.add(str);const ph=Math.random()*6;movers.push(t=>{m.position.y=h+Math.sin(t*1.3+ph)*.16;m.rotation.y=Math.sin(t*.7+ph)*.45});return g}
 function bunch(x,z){const g=new T.Group();[[0,4.3,'#E23B5E'],[.45,3.7,'#F26D8E'],[-.45,3.9,'#FF9EB8']].forEach(([dx,h,col])=>{const b=heartBalloon(col,h);b.position.x=dx;b.rotation.z=dx*.12;g.add(b)});const w=sph(.18,gold);w.position.y=.18;g.add(w);add(g,x,z);return g}
 function buildVal(){
  for(let i=1;i<=4;i++){const e=entrance(i);[-1,1].forEach(s=>bunch(e.x+e.px*5.6*s,e.z+e.pz*5.6*s));corners(i).forEach(p=>bunch(p.x,p.z));const I=island(i);bunch(I.x-12.5,I.z-2);bunch(I.x+12.5,I.z-2)}
  try{api.tintMotes&&api.tintMotes('#FF9EC0')}catch(e){}
  if(both)return;   // 撞期時，廣場和城堡交給春節
  if(fountain){fountain.traverse(o=>{if(o.userData&&o.userData.wyTopMedal)o.visible=false;if(!o.isMesh)return;const p=o.geometry.parameters||{};if(o.geometry.type==='SphereGeometry'&&(p.radius||0)>=.9)o.visible=false;const col=o.material&&o.material.color&&o.material.color.getHexString();if(col==='40c6f2'){o.material=o.material.clone();o.material.color.set('#F7A8C8')}})}
  const fp=new T.Vector3(.5,0,fountain?fountain.position.z:13.3);let topY=3.4;try{const bb=new T.Box3().setFromObject(fountain);topY=bb.max.y}catch(e){}
  // v497 邱比特：Q 版小天使，金色捲髮、明顯的翅膀、拿弓箭、頭上光環，站在一朵雲上
  const cup=new T.Group();const skin=M('#FBE0CC',{roughness:.45});
  const cloud=new T.Group();[[0,0,0,.9],[-.8,-.05,.1,.65],[.8,-.05,.1,.65],[-.35,.15,-.3,.6],[.4,.12,-.3,.6]].forEach(([x,y,z,r])=>{const c2=sph(r,M('#FFFFFF',{roughness:.9}));c2.position.set(x,y,z);cloud.add(c2)});cloud.position.y=.2;cup.add(cloud);
  const body=sph(.5,skin,1,1.05,.9);body.position.y=1.15;cup.add(body);const sash=new T.Mesh(new T.TorusGeometry(.5,.08,8,24),M('#FFB3C9'));sash.position.y=1.1;sash.rotation.set(Math.PI/2,0,.5);cup.add(sash);
  const head=sph(.55,skin);head.position.y=2.0;cup.add(head);
  for(let k=0;k<11;k++){const a2=k/11*Math.PI*1.3+Math.PI*.35;const cu=sph(.18,M('#F2C14E',{roughness:.4}));cu.position.set(Math.cos(a2)*.5,2.2+Math.sin(a2)*.38,-.05);cup.add(cu)}
  for(const e of [-1,1]){const ey=sph(.08,M('#3A2A20'));ey.position.set(e*.18,2.05,.5);cup.add(ey);const hl=sph(.03,M('#FFFFFF'));hl.position.set(e*.18+.03,2.09,.57);cup.add(hl);const ck=sph(.1,M('#FFB3C6'),1,.6,.5);ck.position.set(e*.32,1.9,.44);cup.add(ck);
   for(let f=0;f<4;f++){const w=sph(.5-f*.07,M(f%2?'#FFF6DA':'#FFFFFF',{roughness:.35}),.3,1,.6);w.position.set(e*(.6+f*.24),1.5-f*.1+f*.05,-.35);w.rotation.z=e*(.9+f*.18);cup.add(w)}
   const arm=cyl(.1,.1,.55,skin,8);arm.position.set(e*.55,1.3,.15);arm.rotation.z=e*1.1;cup.add(arm);const leg=sph(.17,skin,1,1.4,1);leg.position.set(e*.2,.62,.05);cup.add(leg)}
  const mouth=new T.Mesh(new T.TorusGeometry(.08,.02,6,12,Math.PI),M('#C8342B'));mouth.rotation.z=Math.PI;mouth.position.set(0,1.88,.53);cup.add(mouth);
  const halo=new T.Mesh(new T.TorusGeometry(.35,.05,8,28),glowM('#FFD36E',.9));halo.rotation.x=Math.PI/2;halo.position.y=2.75;cup.add(halo);
  const bow=new T.Mesh(new T.TorusGeometry(.6,.05,6,24,Math.PI),gold);bow.position.set(.85,1.45,.35);bow.rotation.z=-Math.PI/2;cup.add(bow);const strg=cyl(.01,.01,1.2,M('#FFFFFF'),4);strg.position.set(.85,1.45,.35);cup.add(strg);
  const arrow=cyl(.025,.025,1.3,gold,5);arrow.rotation.x=Math.PI/2;arrow.position.set(.85,1.45,.55);cup.add(arrow);const ah=new T.Mesh(new T.PlaneGeometry(.3,.3),new T.MeshBasicMaterial({map:heartTex,color:'#FF2F6B',transparent:true,side:T.DoubleSide}));ah.position.set(.85,1.45,1.22);cup.add(ah);
  // v499：邱比特不再坐雲擋大門，改在城堡上空繞著尖塔飛
  cup.remove(cloud);cup.scale.setScalar(1.5);root.add(cup);movers.push(t=>{const a=t*.32;const cx=0,cz=1.5,R=11.5;cup.position.set(cx+Math.cos(a)*R,21+Math.sin(t*1.4)*.8,cz+Math.sin(a)*R);cup.rotation.y=-a;cup.rotation.z=Math.sin(t*1.4)*.08;halo.rotation.z=t})
  // 愛心箭與愛心煙花、水池冒愛心
  const sprites=[];const hs=(col,s)=>{const sp=new T.Sprite(new T.SpriteMaterial({map:heartTex,color:col,transparent:true,depthWrite:false}));sp.scale.set(s,s,1);root.add(sp);return sp};
  let shotT=1.5;movers.push((t,dt)=>{shotT-=dt;if(shotT<=0){shotT=4;const a=hs('#FF4F7E',.9);a.position.set(fp.x+.6,topY+.9,fp.z+.4);sprites.push({s:a,v:new T.Vector3(.4,9,0),life:1.1,shot:1})}
   if(Math.random()<dt*2.2){const b=hs(['#FF9EB8','#FF6F9C','#FFFFFF'][Math.floor(Math.random()*3)],.35+Math.random()*.3);b.position.set(fp.x+(Math.random()-.5)*4,topY-1.4,fp.z+(Math.random()-.5)*4);sprites.push({s:b,v:new T.Vector3(0,1.2+Math.random(),0),life:2.4})}
   for(let i=sprites.length-1;i>=0;i--){const o=sprites[i];o.life-=dt;o.s.position.addScaledVector(o.v,dt);if(o.shot&&o.life<=0){for(let k=0;k<12;k++){const a2=k/12*Math.PI*2;const h2=hs(k%2?'#FF6F9C':'#FFB3C6',.45);h2.position.copy(o.s.position);sprites.push({s:h2,v:new T.Vector3(Math.cos(a2)*4,Math.sin(a2)*4,0),life:1.2})}}
    o.s.material.opacity=Math.min(1,o.life*1.5);if(o.life<=0){root.remove(o.s);o.s.material.dispose();sprites.splice(i,1)}}});
  // v497 情人節加碼：天上一個大愛心熱氣球；廣場一座愛心拍照框
  {const hb=new T.Group();const sh=new T.Shape();sh.moveTo(0,-.5);sh.bezierCurveTo(-.9,.05,-.55,.75,0,.38);sh.bezierCurveTo(.55,.75,.9,.05,0,-.5);const geo=new T.ExtrudeGeometry(sh,{depth:.6,bevelEnabled:true,bevelThickness:.25,bevelSize:.2,bevelSegments:6});geo.center();
   const env=new T.Mesh(geo,M('#FF4F7E',{roughness:.35,emissive:'#FF4F7E',emissiveIntensity:.15}));env.scale.setScalar(7);hb.add(env);const basket=new T.Mesh(new T.CylinderGeometry(.9,.75,.9,12),M('#B98A5E'));basket.position.y=-5.2;hb.add(basket);
   for(const [x,z] of [[-.6,-.4],[.6,-.4],[-.6,.4],[.6,.4]]){const rp=cyl(.03,.03,2.6,M('#8A5A36'),4);rp.position.set(x,-3.9,z);hb.add(rp)}const fl=new T.Mesh(new T.ConeGeometry(.5,1.2,3),M('#FFFFFF'));fl.rotation.x=Math.PI;fl.position.set(0,-6.2,0);hb.add(fl);
   root.add(hb);movers.push(t=>{const a=t*.04;hb.position.set(Math.cos(a)*55,38+Math.sin(t*.5)*2,-40+Math.sin(a)*30);hb.rotation.y=Math.sin(t*.3)*.4})}
  {const fr=new T.Group();const sh=new T.Shape();sh.moveTo(0,-.5);sh.bezierCurveTo(-.9,.05,-.55,.75,0,.38);sh.bezierCurveTo(.55,.75,.9,.05,0,-.5);const hole=new T.Path();hole.moveTo(0,-.36);hole.bezierCurveTo(-.7,.05,-.43,.58,0,.27);hole.bezierCurveTo(.43,.58,.7,.05,0,-.36);sh.holes.push(hole);
   const geo=new T.ExtrudeGeometry(sh,{depth:.15,bevelEnabled:true,bevelThickness:.05,bevelSize:.04,bevelSegments:3});geo.center();const fm=new T.Mesh(geo,M('#FF8FB0',{roughness:.3}));fm.scale.setScalar(4.2);fm.position.y=3.0;fr.add(fm);
   for(let k=0;k<20;k++){const a=k/20*Math.PI*2;const rr=sph(.16,M(k%2?'#FFFFFF':'#E23B5E'));rr.position.set(Math.sin(a)*1.6,3+Math.cos(a)*1.5,.25);fr.add(rr)}
   for(const e of [-1,1]){const p=cyl(.08,.1,1.2,gold,8);p.position.set(e*.6,.6,0);fr.add(p)}const P={x:12.4,z:13.4};/* v501：讓開長椅，也不和春節求籤小廟撞位 */fr.rotation.y=-.96;add(fr,P.x,P.z);solid(P.x,P.z,.8,.3)}
  // 城堡大門玫瑰花拱門
  const zd=castleFrontZ(0,3.2)+2.4;const arch=new T.Group();const vine=new T.Mesh(new T.TorusGeometry(2.6,.16,8,40,Math.PI),M('#3F8F4F'));vine.position.y=2.6;arch.add(vine);for(const e of [-1,1]){const p=cyl(.14,.16,2.6,M('#3F8F4F'),8);p.position.set(e*2.6,1.3,0);arch.add(p)}
  for(let k=0;k<26;k++){const a=k/25*Math.PI;const r=sph(.22,M(k%3===0?'#FFFFFF':k%2?'#E23B5E':'#FF8FB0'));r.position.set(Math.cos(a)*2.6,2.6+Math.sin(a)*2.6,(Math.random()-.5)*.2);arch.add(r)}
  for(let k=0;k<10;k++){for(const e of [-1,1]){const r=sph(.2,M(k%2?'#E23B5E':'#FF8FB0'));r.position.set(e*2.6+(Math.random()-.5)*.2,.3+k*.24,(Math.random()-.5)*.25);arch.add(r)}}
  add(arch,0,zd,1.47)}
 // ---------- 端午 ----------
 let boat=null,boatBoost=0;
 function drum(){try{if(localStorage.getItem('wy-sound')==='off')return;AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime;for(const d of [0,.18]){const o=AC.createOscillator(),g=AC.createGain();o.connect(g);g.connect(AC.destination);o.type='sine';o.frequency.setValueAtTime(140,t+d);o.frequency.exponentialRampToValueAtTime(50,t+d+.25);g.gain.setValueAtTime(.6,t+d);g.gain.exponentialRampToValueAtTime(.001,t+d+.3);o.start(t+d);o.stop(t+d+.32)}}catch(e){}}
 function zongzi(){const m=new T.Mesh(new T.TetrahedronGeometry(.28),M('#5E9E4A',{roughness:.7}));m.rotation.set(.6,.3,.2);const b=new T.Mesh(new T.TorusGeometry(.16,.025,6,14),M('#E8D27A'));m.add(b);return m}
 function sachet(col){const g=new T.Group();const b=sph(.2,M(col),1,1.2,.7);g.add(b);const k=sph(.07,gold);k.position.y=.25;g.add(k);const ts=cyl(.02,.05,.3,M('#F2C14E'),6);ts.position.y=-.35;g.add(ts);return g}
 function zongziPost(){const g=new T.Group();const p=cyl(.08,.1,3,navy,10);p.position.y=1.5;g.add(p);const cap=sph(.14,gold);cap.position.y=3.05;g.add(cap);const arm=cyl(.04,.04,.8,gold,6);arm.rotation.z=Math.PI/2;arm.position.set(.38,2.85,0);g.add(arm);
  const str=new T.Group();str.position.set(.75,2.85,0);g.add(str);const line=cyl(.01,.01,1.7,M('#C9A66B'),4);line.position.y=-.85;str.add(line);for(let k=0;k<5;k++){const z=zongzi();z.position.set(0,-.3-k*.33,0);str.add(z)}const sc=sachet('#E23B5E');sc.position.y=-1.95;str.add(sc);const ph=Math.random()*6;movers.push(t=>{str.rotation.z=Math.sin(t*1.3+ph)*.06});return g}
 function mugwort(){const g=new T.Group();for(let k=0;k<7;k++){const l=new T.Mesh(new T.ConeGeometry(.09,1.9,5),M(k%2?'#4E8F3A':'#6BAA4E'));l.position.set((Math.random()-.5)*.18,1,(Math.random()-.5)*.18);l.rotation.z=(Math.random()-.5)*.25;g.add(l)}const rb=new T.Mesh(new T.TorusGeometry(.14,.04,6,14),M('#E23B2E'));rb.rotation.x=Math.PI/2;rb.position.y=.6;g.add(rb);const sc=sachet(['#F2C14E','#3FA36B','#3B7DD8'][Math.floor(Math.random()*3)]);sc.position.set(0,.35,.12);g.add(sc);return g}
 function buildDuan(){
  [PLAZA.L,PLAZA.Rt].forEach(p=>{add(zongziPost(),p.x,p.z);solid(p.x,p.z,.25,.25)});for(let i=1;i<=4;i++)corners(i).forEach(p=>{add(zongziPost(),p.x,p.z);solid(p.x,p.z,.25,.25)});
  for(let i=1;i<=4;i++){const e=entrance(i);[-1,1].forEach(s=>add(mugwort(),e.x+e.px*5.4*s,e.z+e.pz*5.4*s))}
  // v501：端午期間噴水池整個收起來，原地換成大立蛋＋一圈粽子
  if(!fountain)return;const fx=fountain.position.x,fz=fountain.position.z;fountain.visible=false;
  {const eg=new T.Group();const RED=M('#C8261E',{roughness:.45});
   const plat=cyl(3.5,3.7,.5,RED,40);plat.position.y=.25;eg.add(plat);const pr=new T.Mesh(new T.TorusGeometry(3.55,.1,8,64),gold);pr.rotation.x=Math.PI/2;pr.position.y=.5;eg.add(pr);const top2=cyl(3.3,3.3,.06,M('#F6E7C8',{roughness:.7}),40);top2.position.y=.52;eg.add(top2);
   const ped=cyl(1.35,1.55,.7,RED,28);ped.position.y=.9;eg.add(ped);const pr2=new T.Mesh(new T.TorusGeometry(1.42,.07,8,32),gold);pr2.rotation.x=Math.PI/2;pr2.position.y=1.25;eg.add(pr2);
   const eggM=new T.MeshStandardMaterial({color:'#F5C542',metalness:.55,roughness:.25,emissive:'#FFD36E',emissiveIntensity:.05});const egg=sph(1.3,eggM,1,1.35,1,32);egg.position.y=3.0;eg.add(egg);
   const cols=['#E23B2E','#F2C14E','#2F8F4E','#3B7DD8','#FFFFFF'];for(let k=0;k<10;k++){const r2=new T.Mesh(new T.TorusGeometry(1.33,.045,6,48),M(cols[k%5]));r2.rotation.y=k/10*Math.PI;r2.scale.set(1,1.35,1);r2.position.y=3.0;eg.add(r2)}
   const knot=sph(.2,M('#E23B2E'));knot.position.y=4.85;eg.add(knot);
   for(let k=0;k<12;k++){const a2=k/12*Math.PI*2;const z=zongzi();z.scale.setScalar(3.2);z.position.set(Math.cos(a2)*2.75,.95,Math.sin(a2)*2.75);z.rotation.y=-a2;eg.add(z)}
   for(let k=0;k<8;k++){const a2=(k+.5)/8*Math.PI*2;const leaf=new T.Mesh(new T.ConeGeometry(.1,2.2,5),M(k%2?'#4E8F3A':'#6FAE4A',{roughness:.7}));leaf.position.set(Math.cos(a2)*1.6,2.0,Math.sin(a2)*1.6);leaf.rotation.set(Math.sin(a2)*.25,0,-Math.cos(a2)*.25);eg.add(leaf)}
   const sign=new T.Mesh(new T.PlaneGeometry(2.6,.75),new T.MeshBasicMaterial({map:canvasTex(256,74,(g2,w,h)=>{g2.fillStyle='#1F3460';g2.fillRect(0,0,w,h);g2.strokeStyle='#F2C14E';g2.lineWidth=6;g2.strokeRect(3,3,w-6,h-6);g2.fillStyle='#FFE7B0';g2.font='bold 42px "Noto Serif TC",serif';g2.textAlign='center';g2.textBaseline='middle';g2.fillText('端午立大蛋',w/2,h/2+2)})}));sign.position.set(0,.45,3.72);eg.add(sign);
   add(eg,fx,fz,1.45);solid(fx,fz,3.3,3.3);movers.push(t=>{let h=12;try{h=+new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Taipei',hour:'2-digit',hour12:false}).format(new Date())}catch(e){}eggM.emissiveIntensity=(h>=11&&h<13)?.55:.05;egg.rotation.y=t*.3})}
  // v501：四艘龍舟繞著整個群島划（船上不放人，只有會擺動的槳和鼓），點一下龍舟會加速
  const boats=[];const SEA_Y=-1.25;
  function makeBoat(col){const b=new T.Group();const hull=sph(1,M(col),.55,.34,2.4);hull.position.y=.15;b.add(hull);const stripe=sph(1.01,M('#F0C75E'),.56,.13,2.41);stripe.position.y=.26;b.add(stripe);
   for(let k=0;k<9;k++){for(const e of [-1,1]){const sc=sph(.12,M('#2F8F4E'),1,.6,1.4);sc.position.set(e*.54,.08,-1.9+k*.45);b.add(sc)}}
   const dh=new T.Group();dh.position.set(0,.85,2.45);b.add(dh);const BH=HEADS.dragonHead();BH.g.scale.setScalar(.36);BH.g.position.set(0,0,-.1);dh.add(BH.g);BH.jaw.rotation.x=-.2;
   const tail=new T.Mesh(new T.ConeGeometry(.22,.8,8),M('#2F8F4E'));tail.position.set(0,.7,-2.45);tail.rotation.x=-1.1;b.add(tail);
   const pads=[];for(let k=0;k<8;k++){const side=k%2?1:-1;const pad=new T.Group();pad.position.set(side*.48,.52,1.55-Math.floor(k/2)*.75);const sh=cyl(.02,.02,.8,M('#8A5A36'),5);sh.position.y=-.3;pad.add(sh);const bl=sph(.09,M('#8A5A36'),1,2,.3);bl.position.y=-.72;pad.add(bl);pad.rotation.z=side*.5;b.add(pad);pads.push(pad)}
   const drm=cyl(.22,.22,.28,M('#C8342B'),12);drm.position.set(0,.55,1.95);b.add(drm);const fl=new T.Mesh(new T.PlaneGeometry(.7,.45),M('#F2C14E',{side:T.DoubleSide}));fl.position.set(.35,1.35,-1.8);b.add(fl);const fp2=cyl(.025,.025,1.2,gold,5);fp2.position.set(0,1.0,-1.8);b.add(fp2);
   b.scale.setScalar(3.2);root.add(b);return {b,pads,boost:0}}
  const ECX=0,ECZ=-52,ERX=76,ERZ=86;['#D7261E','#E8A21E','#2F7FC8','#2F9E5A'].forEach((col,k)=>{const B=makeBoat(col);B.ph=k*Math.PI/2;B.ang=0;boats.push(B)});
  boat=boats[0].b;
  const splashes=[];const spM=new T.MeshBasicMaterial({color:'#FFFFFF',transparent:true,opacity:.8});
  movers.push((t,dt)=>{for(const B of boats){B.boost=Math.max(0,B.boost-dt);B.ang+=(B.boost>0?.11:.045)*dt;const a=B.ph+B.ang;B.b.position.set(ECX+Math.cos(a)*ERX,SEA_Y+.55+Math.sin(t*3+B.ph)*.08,ECZ+Math.sin(a)*ERZ);
    const nx=-Math.sin(a)*ERX,nz=Math.cos(a)*ERZ;B.b.rotation.y=Math.atan2(nx,nz);B.b.rotation.z=Math.sin(t*2.5+B.ph)*.04;const f=B.boost>0?14:7;B.pads.forEach((pd,k)=>{pd.rotation.x=Math.sin(t*f+k*.25)*.7});
    if(Math.random()<dt*(B.boost>0?12:3)){const m=new T.Mesh(new T.SphereGeometry(.12,6,4),spM.clone());const side=Math.random()<.5?-1:1;m.position.copy(B.b.position);m.position.x+=Math.cos(B.b.rotation.y)*side*2.6;m.position.z-=Math.sin(B.b.rotation.y)*side*2.6;m.position.y=B.b.position.y+.4;m.scale.setScalar(2.4);scene.add(m);splashes.push({m,v:new T.Vector3((Math.random()-.5)*1.5,2+Math.random()*1.5,(Math.random()-.5)*1.5),life:.6})}}
   for(let i=splashes.length-1;i>=0;i--){const o=splashes[i];o.life-=dt;o.v.y-=9*dt;o.m.position.addScaledVector(o.v,dt);o.m.material.opacity=Math.max(0,o.life/.6*.8);if(o.life<=0){scene.remove(o.m);o.m.geometry.dispose();o.m.material.dispose();splashes.splice(i,1)}}});
  // v497 端午加碼：立蛋桌（正午 11:00–13:00 雞蛋自己一顆顆立起來；平常點一下也會立起來）
  {const tb=new T.Group();const top=new T.Mesh(new T.BoxGeometry(4.6,.18,1.6),M('#C8342B'));top.position.y=1.05;tb.add(top);const cl=new T.Mesh(new T.BoxGeometry(4.7,.5,1.7),M('#E23B2E'));cl.position.y=.82;tb.add(cl);
   for(const [x,z] of [[-2,-.6],[2,-.6],[-2,.6],[2,.6]]){const lg=cyl(.07,.07,.95,M('#8A5A36'),6);lg.position.set(x,.48,z);tb.add(lg)}
   const sign=new T.Mesh(new T.PlaneGeometry(2.4,.7),new T.MeshBasicMaterial({map:canvasTex(256,76,(g2,w,h)=>{g2.fillStyle='#1F3460';g2.fillRect(0,0,w,h);g2.strokeStyle='#F2C14E';g2.lineWidth=6;g2.strokeRect(3,3,w-6,h-6);g2.fillStyle='#FFE7B0';g2.font='bold 44px "Noto Serif TC",serif';g2.textAlign='center';g2.textBaseline='middle';g2.fillText('端午立蛋',w/2,h/2+2)})}));sign.position.set(0,2.05,-.75);tb.add(sign);const sp2=cyl(.04,.04,1,gold,6);sp2.position.set(0,1.6,-.78);tb.add(sp2);
   const eggs=[];for(let k=0;k<6;k++){const e=sph(.24,M('#FFF6E6',{roughness:.4}),1,1.3,1);e.position.set(-1.75+k*.7,1.32,.15);e.rotation.z=Math.PI/2;tb.add(e);eggs.push({m:e,up:0,want:0})}
   const P={x:11.6,z:21.0};/* v501：移到廣場右前方，不擋城堡右側走道 */tb.rotation.y=Math.atan2(-11.1,-7.7);add(tb,P.x,P.z);solid(P.x,P.z,2.0,1.7);
   const standAll=()=>{eggs.forEach((e,k)=>setTimeout(()=>{e.want=1;beep([660+k*90],.1)},k*260));setTimeout(()=>toastMsg('立蛋成功，好運一整年'),6*260+200)};onTap(tb,standAll);
   let noonDone=false;movers.push((t,dt)=>{const hr=new Date().getHours();if(!noonDone&&hr>=11&&hr<13){noonDone=true;standAll()}eggs.forEach(e=>{e.up+=(e.want-e.up)*Math.min(1,dt*6);e.m.rotation.z=Math.PI/2*(1-e.up);e.m.position.y=1.32+e.up*.08;e.m.material.emissive&&e.m.material.emissive.set(e.up>.95?'#FFE27A':'#000000')})})}
  try{const el=c.renderer&&c.renderer.domElement;if(el){const rc=new T.Raycaster(),v=new T.Vector2();el.addEventListener('pointerdown',e=>{if(!boats.length||(c.inside&&c.inside()))return;const r=el.getBoundingClientRect();v.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);rc.setFromCamera(v,c.camera);for(const B of boats){if(rc.intersectObject(B.b,true).length){B.boost=2.4;drum();break}}})}}catch(e){}}
 // ---------- 七夕 ----------
 function magpie(){const g=new T.Group();const body=sph(.3,M('#E23B3B'),1,.85,1.3);g.add(body);const belly=sph(.24,M('#FFF4E0'),1,.8,1.1);belly.position.set(0,-.06,.05);g.add(belly);const head=sph(.2,M('#E23B3B'));head.position.set(0,.18,.32);g.add(head);
  const bk=new T.Mesh(new T.ConeGeometry(.05,.18,6),M('#F2B33D'));bk.rotation.x=Math.PI/2;bk.position.set(0,.16,.55);g.add(bk);for(const e of [-1,1]){const ey=sph(.045,M('#1A1A1A'));ey.position.set(e*.09,.24,.47);g.add(ey);const ck=sph(.04,M('#FFB3C6'));ck.position.set(e*.13,.16,.46);g.add(ck)}const hrt=new T.Mesh(new T.PlaneGeometry(.22,.22),new T.MeshBasicMaterial({map:heartTex,color:'#FF4F7E',transparent:true,depthWrite:false,side:T.DoubleSide}));hrt.position.set(0,.14,.66);g.add(hrt);
  const wl=sph(.22,M('#F2C14E',{metalness:.35,roughness:.35}),.5,.25,1),wr=wl.clone();wl.position.set(-.27,.04,-.02);wr.position.set(.27,.04,-.02);g.add(wl,wr);const tail=sph(.12,M('#F2C14E'),.6,.25,2.2);tail.position.set(0,.06,-.55);g.add(tail);g.userData={wl,wr};return g}
 async function buildQixi(){
  const pc=['#8E7CE0','#5DA8F0'];for(const i of [1,2,3,4,5])bridgeLanterns(i,pc,3);[PLAZA.L,PLAZA.Rt].forEach(p=>{add(lanternPost('#8E7CE0',true),p.x,p.z);solid(p.x,p.z,.25,.25)});
  // 鵲橋：通往後方第五座島的那座橋
  const CL=LINKS().find(L=>L.b==='C');const cen=window.wyCenterXZ||{x:0,z:-56,r:15};const I={x:cen.x,z:cen.z},Lq=Math.hypot(I.x,I.z),ux=I.x/Lq,uz=I.z/Lq,px=-uz,pz=ux;const P0=CL?CL.pts[0]:[0,0,-21],P1=CL?CL.pts[CL.pts.length-1]:[0,0,-42];const N=12;
  const dirA=Math.atan2(P1[0]-P0[0],P1[2]-P0[2]);
  /* v501：通往中央島的每一座橋都搭起喜鵲橋（一次畫完所有喜鵲，手機也順） */
  {const CLs=LINKS().filter(L=>L.b==='C'||L.a==='C');const NB=12;const birds=[];
   for(const L of CLs){const P=L.pts;const seg=[];let tot=0;for(let k=0;k<P.length-1;k++){const d=Math.hypot(P[k+1][0]-P[k][0],P[k+1][2]-P[k][2]);seg.push(d);tot+=d}
    const at=u=>{let d=u*tot;for(let k=0;k<seg.length;k++){if(d<=seg[k]||k===seg.length-1){const f=seg[k]?Math.min(1,d/seg[k]):0;const A=P[k],B=P[k+1];return {x:A[0]+(B[0]-A[0])*f,z:A[2]+(B[2]-A[2])*f,ang:Math.atan2(B[0]-A[0],B[2]-A[2])}}d-=seg[k]}};
    for(let k=0;k<NB;k++){const u=(k+.5)/NB;const p=at(u);for(const s2 of[-1,1]){birds.push({x:p.x+Math.cos(p.ang)*s2*1.5,z:p.z-Math.sin(p.ang)*s2*1.5,y:gy(p.x,p.z)+2.6+Math.sin(u*Math.PI)*4.2,ang:p.ang,ph:k*.5+s2+birds.length*.13})}}}
   const N=birds.length;if(N){const parts=[[new T.SphereGeometry(.3,12,9),M('#E23B3B'),[0,0,0],[1,.85,1.3]],[new T.SphereGeometry(.24,10,8),M('#FFF4E0'),[0,-.06,.05],[1,.8,1.1]],[new T.SphereGeometry(.2,10,8),M('#E23B3B'),[0,.18,.32],[1,1,1]],[new T.ConeGeometry(.05,.18,6).rotateX(Math.PI/2),M('#F2B33D'),[0,.16,.55],[1,1,1]],[new T.SphereGeometry(.12,8,6),M('#F2C14E'),[0,.06,-.55],[.6,.25,2.2]]];
    const wingG=new T.SphereGeometry(.22,10,7).scale(.5,.5,1).translate(.11,0,0);const wingM=M('#F2C14E',{metalness:.35,roughness:.35});const S=1.6;
    const IMs=parts.map(([g,m])=>{const im=new T.InstancedMesh(g,m,N);im.frustumCulled=false;root.add(im);return im});const WL=new T.InstancedMesh(wingG,wingM,N),WR=new T.InstancedMesh(wingG,wingM,N);WL.frustumCulled=WR.frustumCulled=false;root.add(WL,WR);
    const mB=new T.Matrix4(),mP=new T.Matrix4(),q=new T.Quaternion(),e=new T.Euler(),v=new T.Vector3(),sc=new T.Vector3();
    const place=(t2)=>{for(let n=0;n<N;n++){const b=birds[n];const y=b.y+Math.sin(t2*2+b.ph)*.12;q.setFromEuler(e.set(0,b.ang,0));mB.compose(v.set(b.x,y,b.z),q,sc.set(S,S,S));
      parts.forEach(([g,m,off,scl],pi)=>{mP.compose(v.set(off[0],off[1],off[2]),q.identity(),sc.set(scl[0],scl[1],scl[2]));mP.premultiply(mB);IMs[pi].setMatrixAt(n,mP)});
      const f=.7+Math.sin(t2*6+b.ph)*.35;for(const [W,sd] of[[WL,-1],[WR,1]]){q.setFromEuler(e.set(0,sd<0?Math.PI:0,sd<0?-f:-f));mP.compose(v.set(sd*.07,.04,-.02),q,sc.set(1,.5,1));mP.premultiply(mB);W.setMatrixAt(n,mP)}
      q.setFromEuler(e.set(0,b.ang,0))}
     for(const im of IMs)im.instanceMatrix.needsUpdate=true;WL.instanceMatrix.needsUpdate=true;WR.instanceMatrix.needsUpdate=true};
    place(0);let acc=0;movers.push((t2,dt)=>{acc+=dt||.016;if(acc<.033)return;acc=0;place(t2)})}}

  for(let k=0;k<12;k++){const m=magpie();m.scale.setScalar(1.5);root.add(m);const ph=k/12*Math.PI*2,rr=6+k%3*2,h=10+k%4*1.6;const mid={x:(P0[0]+P1[0])/2,z:(P0[2]+P1[2])/2};movers.push(t2=>{const a=ph+t2*.5;m.position.set(mid.x+Math.cos(a)*rr+ux*Math.sin(a*.7)*8,h+Math.sin(t2*2+k)*.5,mid.z+Math.sin(a)*rr+uz*Math.sin(a*.7)*8);m.rotation.y=-a;const f=Math.sin(t2*10+k)*.7;m.userData.wl.rotation.z=f;m.userData.wr.rotation.z=-f})}
  // 銀河
  const n=2600,pos=new Float32Array(n*3),col=new Float32Array(n*3);const cA=new T.Color('#FFFFFF'),cB=new T.Color('#9FB8FF'),cC=new T.Color('#D6A8FF');
  for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,w=(Math.random()+Math.random()+Math.random()-1.5)*28;const r=420;let x=Math.cos(a)*r,y=Math.sin(a)*r*.55+150,z=-120+Math.sin(a)*60;y+=w;x+=w*.3;pos.set([x,Math.max(40,y),z],i*3);const cc=[cA,cB,cC][i%3];col.set([cc.r,cc.g,cc.b],i*3)}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));g.setAttribute('color',new T.BufferAttribute(col,3));const mw=new T.Points(g,new T.PointsMaterial({size:2.2,map:api.dot,vertexColors:true,transparent:true,depthWrite:false,blending:T.AdditiveBlending,fog:false,opacity:.0}));scene.add(mw);
  movers.push(()=>{const ph=api.phase();mw.material.opacity=ph==='night'?.95:ph==='dusk'?.45:.0;mw.visible=mw.material.opacity>0});
  // v497 七夕加碼：銀河兩側一顆藍白牛郎星、一顆粉紫織女星（晚上會閃）；橋欄杆掛滿紫色許願紙條
  {const starTex=canvasTex(128,128,(x,w,h)=>{const gr=x.createRadialGradient(64,64,4,64,64,62);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.25,'rgba(255,255,255,.85)');gr.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gr;x.fillRect(0,0,w,h);x.strokeStyle='rgba(255,255,255,.9)';x.lineWidth=3;x.beginPath();x.moveTo(64,4);x.lineTo(64,124);x.moveTo(4,64);x.lineTo(124,64);x.stroke()});
   const mk=(col,x,y,z)=>{const sp=new T.Sprite(new T.SpriteMaterial({map:starTex,color:col,transparent:true,depthWrite:false,blending:T.AdditiveBlending,fog:false}));sp.position.set(x,y,z);sp.scale.set(22,22,1);scene.add(sp);return sp};
   /* v501：牛郎、織女改成兩顆大愛心，低一點、大一點，沿著鵲橋從兩端慢慢飛向中間相會，相會時變成一顆大愛心，光是穩定的不閃 */
   {const hs=new T.Shape();hs.moveTo(0,-1);hs.bezierCurveTo(-1.8,.2,-1,1.6,0,.8);hs.bezierCurveTo(1,1.6,1.8,.2,0,-1);const hg=new T.ExtrudeGeometry(hs,{depth:.45,bevelEnabled:true,bevelSize:.14,bevelThickness:.14,bevelSegments:3});hg.center();
    const mkH=(col)=>{const m=new T.Mesh(hg,new T.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:.55,roughness:.35,transparent:true,opacity:1}));m.scale.setScalar(2.2);root.add(m);return m};
    const hA=mkH('#8FC8FF'),hB=mkH('#FF8FC8'),hC=mkH('#FF6FA8');hC.scale.setScalar(0.01);hC.visible=false;
    const mid={x:(P0[0]+P1[0])/2,z:(P0[2]+P1[2])/2};const baseY=gy(mid.x,mid.z)+11.5;const L0={x:P0[0],z:P0[2]},L1={x:P1[0],z:P1[2]};const ry=dirA+Math.PI/2;[hA,hB,hC].forEach(h=>h.rotation.y=ry);
    const lab=(txt,col)=>{const sp=new T.Sprite(new T.SpriteMaterial({map:canvasTex(256,80,(x,w,h)=>{x.fillStyle='rgba(255,255,255,.9)';x.beginPath();x.roundRect(4,8,w-8,h-16,30);x.fill();x.fillStyle=col;x.font='bold 40px "Noto Sans TC",sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(txt,w/2,h/2+2)}),transparent:true,depthWrite:false}));sp.scale.set(4.4,1.4,1);root.add(sp);return sp};
    const lA=lab('牛郎','#3E7BC8'),lB=lab('織女','#D2508F');
    const CYC=40;movers.push(t=>{const u=(t%CYC)/CYC;let k=Math.min(1,u/.55);k=k*k*(3-2*k);const meet=u>=.55&&u<.85;const back=u>=.85;
     const a={x:L0.x+(mid.x-L0.x)*k*.92,z:L0.z+(mid.z-L0.z)*k*.92},b={x:L1.x+(mid.x-L1.x)*k*.92,z:L1.z+(mid.z-L1.z)*k*.92};const bob=Math.sin(t*1.2)*.3;
     if(!back){hA.position.set(a.x,baseY+bob,a.z);hB.position.set(b.x,baseY-bob,b.z);lA.position.set(a.x,baseY+3.4+bob,a.z);lB.position.set(b.x,baseY+3.4-bob,b.z)}
     let m=0;if(meet){m=Math.min(1,(u-.55)/.06)}else if(back){m=Math.max(0,1-(u-.85)/.06)}
     hC.visible=m>.01;hC.position.set(mid.x,baseY+.6,mid.z);hC.scale.setScalar(.01+m*3.4);const keep=1-m;[hA,hB].forEach(h=>{h.material.opacity=back?Math.max(0,(u-.91)/.09):keep;h.visible=h.material.opacity>.02});lA.material.opacity=lB.material.opacity=hA.material.opacity;lA.visible=lB.visible=hA.visible;
     if(back&&u>.91){hA.position.set(L0.x,baseY,L0.z);hB.position.set(L1.x,baseY,L1.z);lA.position.set(L0.x,baseY+3.4,L0.z);lB.position.set(L1.x,baseY+3.4,L1.z)}})}}
  {const cols=['#B79CF2','#8E7CE0','#D7B8FF','#9FB8FF'];for(const L of LINKS())for(const p of linkPts(L,12,4.9)){const col=cols[Math.floor(Math.random()*4)];const hg=new T.Group();hg.position.set(p.x,p.y+1.55,p.z);hg.rotation.y=p.ang;const st=new T.Mesh(new T.PlaneGeometry(.34,1.0),new T.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:.25,side:T.DoubleSide,roughness:.6}));st.position.y=-.62;hg.add(st);const str=cyl(.008,.008,.14,M('#F2C14E'),3);str.position.y=-.07;hg.add(str);root.add(hg);const ph=Math.random()*6;movers.push(t=>{hg.rotation.x=Math.sin(t*2+ph)*.3})}}
}
 // ---------- 中秋 ----------
 function mooncake(s0=1){const g=new T.Group();const sk=M('#C98A3C',{roughness:.35,metalness:.05});const body=new T.Mesh(new T.CylinderGeometry(.3,.3,.2,24),sk);g.add(body);
  for(let k=0;k<12;k++){const a=k/12*Math.PI*2;const pt=sph(.07,sk,1,1.3,1,8);pt.position.set(Math.cos(a)*.3,0,Math.sin(a)*.3);g.add(pt)}
  const top=new T.Mesh(new T.CylinderGeometry(.24,.26,.03,24),M('#B5762C',{roughness:.3}));top.position.y=.11;g.add(top);const flw=new T.Mesh(new T.TorusGeometry(.13,.025,6,20),M('#D99A4C'));flw.rotation.x=Math.PI/2;flw.position.y=.13;g.add(flw);
  for(let k=0;k<4;k++){const a=k/4*Math.PI*2+.4;const lf=sph(.05,M('#D99A4C'),1,.3,1.8,6);lf.position.set(Math.cos(a)*.06,.13,Math.sin(a)*.06);lf.rotation.y=-a;g.add(lf)}g.scale.setScalar(s0);return g}
 function cutMooncake(){const g=mooncake();g.children.forEach(c2=>{});const half=new T.Mesh(new T.CylinderGeometry(.3,.3,.2,24,1,false,0,Math.PI),M('#C98A3C'));half.position.x=.7;g.add(half);const face=new T.Mesh(new T.PlaneGeometry(.6,.2),M('#9B5A2A',{side:T.DoubleSide}));face.position.set(.7,0,0);face.rotation.y=Math.PI/2;g.add(face);const yolk=new T.Mesh(new T.CircleGeometry(.1,16),M('#F2A93D',{side:T.DoubleSide}));yolk.position.set(.701,0,0);yolk.rotation.y=Math.PI/2;g.add(yolk);return g}
 function giftTower(){const g=new T.Group();const RED=M('#C8262E',{roughness:.45}),RIB=M('#F2C14E',{metalness:.45,roughness:.3});
  const moonTex=canvasTex(256,256,(x,w,h)=>{x.fillStyle='#C8262E';x.fillRect(0,0,w,h);x.strokeStyle='#F2C14E';x.lineWidth=10;x.strokeRect(10,10,w-20,h-20);x.fillStyle='#FFE9A8';x.beginPath();x.arc(w/2,h*.42,62,0,7);x.fill();x.fillStyle='#FFFFFF';x.beginPath();x.ellipse(w/2-10,h*.5,20,14,0,0,7);x.fill();x.beginPath();x.ellipse(w/2-18,h*.38,6,20,-.2,0,7);x.fill();x.beginPath();x.ellipse(w/2-4,h*.37,6,20,.2,0,7);x.fill();x.fillStyle='#F2C14E';x.font='bold 46px "Noto Serif TC",serif';x.textAlign='center';x.fillText('中秋',w/2,h*.86)});
  const faceM=new T.MeshStandardMaterial({map:moonTex,roughness:.5});
  const box=(w,h,x,y,z,ry=0)=>{const b=new T.Mesh(new T.BoxGeometry(w,h,w),[RED,RED,RED,RED,faceM,RED]);b.position.set(x,y,z);b.rotation.y=ry;g.add(b);const r1=new T.Mesh(new T.BoxGeometry(w*1.01,h*1.01,w*.12),RIB);r1.position.copy(b.position);r1.rotation.y=ry;g.add(r1);const r2=new T.Mesh(new T.BoxGeometry(w*.12,h*1.01,w*1.01),RIB);r2.position.copy(b.position);r2.rotation.y=ry;g.add(r2);return b};
  box(1.9,.75,0,.375,0);box(1.5,.65,0,1.07,0,.3);box(1.1,.55,0,1.67,0,-.2);
  const bow=new T.Group();bow.position.y=2.05;g.add(bow);for(const e of [-1,1]){const l=new T.Mesh(new T.TorusGeometry(.26,.09,10,20),RIB);l.position.x=e*.26;l.rotation.y=Math.PI/2;l.scale.set(1,1,.6);bow.add(l);const tl=new T.Mesh(new T.BoxGeometry(.12,.45,.03),RIB);tl.position.set(e*.12,-.25,.2);tl.rotation.z=e*.35;bow.add(tl)}bow.add(sph(.13,RIB));
  for(const [x,z,ry] of [[1.75,.4,-.4],[-1.75,.5,.5]]){const ob=new T.Group();ob.position.set(x,0,z);ob.rotation.y=ry;g.add(ob);const tray=new T.Mesh(new T.BoxGeometry(1.2,.25,1.2),RED);tray.position.y=.125;ob.add(tray);const inner=new T.Mesh(new T.BoxGeometry(1.08,.05,1.08),M('#F7E3B5'));inner.position.y=.26;ob.add(inner);
   const lid=new T.Mesh(new T.BoxGeometry(1.24,.12,1.24),[RED,RED,faceM,RED,RED,RED]);lid.position.set(0,.55,-.75);lid.rotation.x=-1.1;ob.add(lid);for(const [mx,mz] of [[-.28,-.28],[.28,-.28],[-.28,.28],[.28,.28]]){const mc=mooncake(.8);mc.position.set(mx,.36,mz);ob.add(mc)}}
  const cm=cutMooncake();cm.position.set(.2,.12,1.35);g.add(cm);return g}
 function teaSet(){const g=new T.Group();const top=cyl(1.25,1.25,.14,M('#B5703E'),28);top.position.y=.62;g.add(top);const leg=cyl(.18,.25,.6,M('#8A4F28'),10);leg.position.y=.3;g.add(leg);
  for(let k=0;k<3;k++){const a=k/3*Math.PI*2+.5;const cu=cyl(.55,.55,.16,M(['#E9C46A','#F2A7B8','#9FD2E8'][k]),18);cu.position.set(Math.cos(a)*1.9,.08,Math.sin(a)*1.9);g.add(cu)}
  const pot=sph(.26,M('#FFFFFF'));pot.position.set(-.35,.9,0);g.add(pot);const sp=cyl(.03,.05,.3,M('#FFFFFF'),6);sp.rotation.z=-1;sp.position.set(-.08,.95,0);g.add(sp);const lid=sph(.07,navy);lid.position.set(-.35,1.17,0);g.add(lid);
  for(const [x,z] of [[.15,.35],[.15,-.35]]){const cp=cyl(.09,.07,.12,M('#FFFFFF'),10);cp.position.set(x,.75,z);g.add(cp)}
  const plate=cyl(.45,.4,.05,M('#FFFFFF'),20);plate.position.set(.55,.72,0);g.add(plate);for(let k=0;k<3;k++){const m=mooncake(.6);m.position.set(.45+(k%2)*.2,.83+(k>1?.16:0),-.12+k*.12);g.add(m)}
  for(const [x,z] of [[-.75,.55],[-.95,.2]]){const p=sph(.24,M('#C7D96A'));p.position.set(x,.92,z);g.add(p)}return g}
 function bunny(){const g=new T.Group();const w=M('#FFFFFF',{roughness:.7});const b=sph(.5,w,1,1.05,.95);b.position.y=.55;g.add(b);const h=sph(.42,w);h.position.y=1.32;g.add(h);
  for(const e of [-1,1]){const ear=sph(.13,w,1,3.2,.7);ear.position.set(e*.17,1.95,-.02);ear.rotation.z=-e*.12;g.add(ear);const inn=sph(.08,M('#FFB7C9'),1,3,.5);inn.position.set(e*.17,1.95,.06);inn.rotation.z=-e*.12;g.add(inn);const ey=sph(.06,M('#2A1A1A'));ey.position.set(e*.15,1.38,.37);g.add(ey);const ck=sph(.07,M('#FFC4D2'));ck.position.set(e*.25,1.25,.33);g.add(ck)}
  const nose=sph(.04,M('#FF8FA3'));nose.position.set(0,1.28,.42);g.add(nose);
  const sc=new T.Group();sc.position.set(0,.85,.55);g.add(sc);const pole=cyl(.03,.03,.7,gold,6);pole.position.y=.2;sc.add(pole);const beam=cyl(.025,.025,.8,gold,6);beam.rotation.z=Math.PI/2;beam.position.y=.55;sc.add(beam);
  for(const e of [-1,1]){const pan=cyl(.16,.12,.04,gold,14);pan.position.set(e*.4,.3,0);sc.add(pan);const s1=cyl(.006,.006,.25,gold,3);s1.position.set(e*.4,.42,0);sc.add(s1)}
  for(const e of [-1,1]){const paw=sph(.11,w);paw.position.set(e*.2,.85,.5);g.add(paw)}const ft=sph(.18,w,1.2,.6,1.4);ft.position.set(0,.12,.25);g.add(ft);g.userData.sc=sc;return g}
 function buildMoon(){try{api.moon.visible=true;api.moon.material.opacity=Math.max(api.moon.material.opacity,.95);api.moon.scale.set(115,115,1)}catch(e){}
  movers.push(()=>{try{api.moon.visible=true;api.moon.material.opacity=Math.max(api.moon.material.opacity,.92);api.moon.scale.set(115,115,1)}catch(e){}});
  for(const i of [1,2,3,4,5,'C'])bridgeLanterns(i,['#F7C548','#F2A93D'],4);
  const gt=giftTower();gt.scale.setScalar(1.25);add(gt,PLAZA.L.x,PLAZA.L.z);solid(PLAZA.L.x,PLAZA.L.z,2.6,1.2);
  for(let i=1;i<=4;i++){const [cl,cr]=corners(i);const b=bunny();b.scale.setScalar(1.2);add(b,cl.x,cl.z);solid(cl.x,cl.z,.6,.6);const ts=teaSet();add(ts,cr.x,cr.z);solid(cr.x,cr.z,1.4,1.4);const ph=i;movers.push(t=>{b.userData.sc.rotation.z=Math.sin(t*1.5+ph)*.12})}
  // v499 中秋：城堡後方升起大滿月（玉兔搗藥剪影）、廣場大玉兔搗藥、夜晚天燈、桂花樹、柚子月餅攤、各島門口燈籠
  {const mt=canvasTex(512,512,(x,w,h)=>{const g2=x.createRadialGradient(w/2,h/2,40,w/2,h/2,250);g2.addColorStop(0,'#FFF6CF');g2.addColorStop(.75,'#FFE08A');g2.addColorStop(.97,'#F7C85A');g2.addColorStop(1,'rgba(247,200,90,0)');x.fillStyle=g2;x.beginPath();x.arc(w/2,h/2,250,0,7);x.fill();
    x.fillStyle='rgba(214,170,80,.35)';for(const [cx2,cy2,r] of[[180,170,40],[330,300,55],[300,150,25],[170,340,30]]){x.beginPath();x.arc(cx2,cy2,r,0,7);x.fill()}
    x.fillStyle='rgba(176,128,52,.55)';x.beginPath();x.ellipse(250,300,55,45,0,0,7);x.fill();x.beginPath();x.arc(285,235,32,0,7);x.fill();x.beginPath();x.ellipse(268,175,10,42,-.2,0,7);x.fill();x.beginPath();x.ellipse(292,172,10,42,.2,0,7);x.fill();x.beginPath();x.ellipse(200,330,14,12,0,0,7);x.fill();
    x.fillRect(328,300,40,60);x.fillRect(318,296,60,10);x.save();x.translate(320,250);x.rotate(.5);x.fillRect(-6,-60,12,80);x.restore()});
   const moonM=new T.MeshBasicMaterial({map:mt,transparent:true,depthWrite:false,fog:false});const bigMoon=new T.Mesh(new T.PlaneGeometry(130,130),moonM);bigMoon.position.set(0,58,-300);bigMoon.renderOrder=-1;scene.add(bigMoon);
   const halo=new T.Sprite(new T.SpriteMaterial({map:api.dot,color:'#FFE7A8',transparent:true,opacity:.35,depthWrite:false,fog:false,blending:T.AdditiveBlending}));halo.scale.set(240,240,1);halo.position.set(0,58,-302);scene.add(halo);
   movers.push(()=>{/* v500：白天淡淡的小一點，晚上才完整亮起 */const ph=api.phase();const tg=ph==='night'?1:ph==='day'?0:.5;bigMoon.userData.k=(bigMoon.userData.k??tg)+(tg-(bigMoon.userData.k??tg))*.02;const k=bigMoon.userData.k;moonM.opacity=.3+.7*k;bigMoon.scale.setScalar(.72+.28*k);halo.material.opacity=.4*k;halo.scale.set(170+70*k,170+70*k,1)})}
  // 廣場大玉兔搗藥（取代天上的小玉兔）
  {const rb=new T.Group();const W=M('#FFFFFF',{roughness:.7});const body=sph(.95,W,1,1.1,.95);body.position.y=1.0;rb.add(body);const head=sph(.72,W);head.position.y=2.35;rb.add(head);
   for(const e of[-1,1]){const ear=sph(.22,W,1,3.2,.6);ear.position.set(e*.28,3.55,-.05);ear.rotation.z=-e*.15;rb.add(ear);const ein=sph(.12,M('#FFB3C6'),1,2.6,.5);ein.position.set(e*.28,3.55,.06);ein.rotation.z=-e*.15;rb.add(ein);const ey=sph(.1,M('#E0304F'));ey.position.set(e*.25,2.45,.62);rb.add(ey);const ck=sph(.13,M('#FFB3C6'),1,.6,.4);ck.position.set(e*.42,2.2,.56);rb.add(ck);const ft=sph(.3,W,1,.6,1.4);ft.position.set(e*.45,.2,.25);rb.add(ft)}
   const nose=sph(.07,M('#FF8FB0'));nose.position.set(0,2.3,.72);rb.add(nose);const tail=sph(.3,W);tail.position.set(0,.8,-.95);rb.add(tail);
   const mortar=cyl(.75,.55,.9,M('#C9A06A',{roughness:.6}),20);mortar.position.set(0,.45,1.45);rb.add(mortar);const mrim=new T.Mesh(new T.TorusGeometry(.72,.06,8,24),gold);mrim.rotation.x=Math.PI/2;mrim.position.set(0,.9,1.45);rb.add(mrim);
   const arms=new T.Group();arms.position.set(0,1.55,.6);rb.add(arms);for(const e of[-1,1]){const arm=sph(.18,W,1,1,1.6);arm.position.set(e*.25,0,.35);arms.add(arm)}const pest=cyl(.09,.12,1.6,M('#B07A4A',{roughness:.6}),10);pest.position.set(0,-.1,.85);arms.add(pest);
   rb.scale.setScalar(1.25);add(rb,PLAZA.Rt.x+1.2,PLAZA.Rt.z+1.2);rb.rotation.y=-.5;solid(PLAZA.Rt.x+1.2,PLAZA.Rt.z+1.2,1.5,1.5);
   movers.push(t=>{const k=Math.max(0,Math.sin(t*4));arms.position.y=1.55+k*.5;arms.rotation.x=-k*.25;rb.children[0].scale.y=1.1-k*.03})}
  // 夜晚天燈：從群島四周海面慢慢升起
  {const N=36;const geo=new T.CylinderGeometry(.55,.42,1.0,8);const lm=new T.MeshBasicMaterial({color:'#FFB040',fog:false,transparent:true,opacity:.95});const inst=new T.InstancedMesh(geo,lm,N);scene.add(inst);const st=[];for(let k=0;k<N;k++){const a=Math.random()*Math.PI*2,r=55+Math.random()*60;st.push({x:Math.cos(a)*r,z:-40+Math.sin(a)*r*.8,y:Math.random()*55,sp:1.2+Math.random()*.8,ph:Math.random()*6})}
   const mx=new T.Matrix4();movers.push((t,dt)=>{const ph=api.phase();inst.visible=ph!=='day';if(!inst.visible)return;st.forEach((q,k)=>{q.y+=q.sp*dt;if(q.y>65){q.y=-1;const a=Math.random()*Math.PI*2,r=55+Math.random()*60;q.x=Math.cos(a)*r;q.z=-40+Math.sin(a)*r*.8}mx.makeTranslation(q.x+Math.sin(t*.5+q.ph)*1.5,q.y,q.z);inst.setMatrixAt(k,mx)});inst.instanceMatrix.needsUpdate=true})}
  // 桂花樹（金色小花）、柚子與月餅攤
  for(const e of[-1,1]){const tr=new T.Group();const tk=cyl(.25,.35,2.2,M('#7A4A2A'),8);tk.position.y=1.1;tr.add(tk);for(const [x,y,z,r] of[[0,3.0,0,1.5],[.9,2.6,.3,1.0],[-.9,2.7,-.2,1.1]]){const cr=sph(r,M('#3E8A4A',{roughness:.8}));cr.position.set(x,y,z);tr.add(cr);for(let k=0;k<14;k++){const f=sph(.09,M('#F5B731'),1,1,1,6);const a=Math.random()*Math.PI*2,v=Math.random()*Math.PI;f.position.set(x+Math.cos(a)*Math.sin(v)*r,y+Math.cos(v)*r,z+Math.sin(a)*Math.sin(v)*r);tr.add(f)}}add(tr,e*17.2,15.2);solid(e*17.2,15.2,.6,.6)}
  {const stall=new T.Group();const tb=new T.Mesh(new T.BoxGeometry(3.2,.15,1.4),M('#8A5A36'));tb.position.y=1;stall.add(tb);const cl=new T.Mesh(new T.BoxGeometry(3.25,.7,1.45),M('#C8261E'));cl.position.y=.6;stall.add(cl);const awn=new T.Mesh(new T.BoxGeometry(3.6,.12,1.9),M('#F2C14E'));awn.position.set(0,2.6,0);stall.add(awn);for(const e of[-1,1]){const po=cyl(.06,.06,2.6,M('#8A5A36'),6);po.position.set(e*1.6,1.3,.6);stall.add(po)}
   for(let k=0;k<6;k++){const pm=sph(.28,M('#D8E26A',{roughness:.55}),1,.9,1);pm.position.set(-1.1+(k%3)*.32,1.32+(k>2?.38:0),(k>2?0:.2));stall.add(pm)}for(let k=0;k<3;k++){const bx=new T.Mesh(new T.BoxGeometry(.55,.35,.55),M('#C8261E'));bx.position.set(.55+k*.18,1.25+k*.36,0);stall.add(bx);const rb2=new T.Mesh(new T.BoxGeometry(.57,.36,.08),gold);rb2.position.copy(bx.position);stall.add(rb2)}
   add(stall,14.5,19.4);stall.rotation.y=-.4;solid(14.5,19.4,1.7,.9)}
  // 各島門口燈籠
  for(let i=1;i<=4;i++)for(const e of[-1,1]){const x=xy[i][0]+e*3.4,z=xy[i][1]+10.2;add(lanternPost(['#F7C548','#F2A93D'][e<0?0:1]),x,z);solid(x,z,.25,.25)}
  {const lan=[];const N=6;const fws=[];const fire=()=>{for(let b=0;b<4;b++)setTimeout(()=>{const n=70,pos=new Float32Array(n*3),vel=[];const cx2=(Math.random()-.5)*40,cy2=40+Math.random()*15,cz2=-20+(Math.random()-.5)*20;for(let i=0;i<n;i++){pos.set([cx2,cy2,cz2],i*3);const u=Math.random()*Math.PI*2,v=Math.acos(2*Math.random()-1),sp=10+Math.random()*5;vel.push([Math.sin(v)*Math.cos(u)*sp,Math.cos(v)*sp,Math.sin(v)*Math.sin(u)*sp])}
     const gg=new T.BufferGeometry();gg.setAttribute('position',new T.BufferAttribute(pos,3));const pm=new T.Points(gg,new T.PointsMaterial({size:2.4,map:api.dot,transparent:true,depthWrite:false,blending:T.AdditiveBlending,color:['#FFD36E','#FFF3C4','#FF9A3C','#9AD8FF'][b%4],fog:false}));pm.userData={vel,t:0};scene.add(pm);fws.push(pm);beep([523,659,784],.1)},b*450)};
   movers.push((t,dt)=>{for(let i=fws.length-1;i>=0;i--){const p2=fws[i],u=p2.userData;u.t+=dt;const a2=p2.geometry.attributes.position.array;for(let k=0;k<u.vel.length;k++){const v=u.vel[k];v[1]-=6*dt;a2[k*3]+=v[0]*dt;a2[k*3+1]+=v[1]*dt;a2[k*3+2]+=v[2]*dt}p2.geometry.attributes.position.needsUpdate=true;p2.material.opacity=Math.max(0,1-u.t/1.8);if(u.t>1.8){scene.remove(p2);p2.geometry.dispose();p2.material.dispose();fws.splice(i,1)}}});
   for(let k=0;k<N;k++){const x=-6.2+k*2.48,z=21.2;const g=new T.Group();const pole=cyl(.05,.06,1.6,gold,8);pole.position.y=.8;g.add(pole);const off=M('#B5A07A',{roughness:.6});const onM=new T.MeshStandardMaterial({color:'#FFB23D',emissive:'#FF9A1F',emissiveIntensity:1.1,roughness:.4});
    const body=sph(.42,off,1,1.15,1);body.position.y=2.0;g.add(body);for(const yy of [2.48,1.52]){const cp=cyl(.18,.22,.1,gold,12);cp.position.y=yy;g.add(cp)}const ts=cyl(.025,.05,.4,M('#F2C14E'),6);ts.position.y=1.2;g.add(ts);add(g,x,z);solid(x,z,.2,.2);const L={g,body,onM,lit:false};lan.push(L);
    onTap(g,()=>{if(L.lit)return;L.lit=true;L.body.material=L.onM;beep([700+k*80],.12);const n=lan.filter(q=>q.lit).length;if(n===N){toastMsg('花好月圓，中秋快樂');fire();try{window.wyLogoFireworks&&window.wyLogoFireworks()}catch(e){}setTimeout(()=>{lan.forEach(q=>{q.lit=false;q.body.material=off})},20000)}else toastMsg('點亮燈籠 '+n+'／'+N)})}}
}
 // ---------- 聖誕 ----------
 function xmasTree(s){const g=new T.Group();const tr=cyl(.3,.4,1,M('#7A4A2A'),10);tr.position.y=.5;g.add(tr);[[2.2,2.2,1.6],[1.7,1.9,2.9],[1.15,1.6,4.0]].forEach(([r,h,y])=>{const cn=new T.Mesh(new T.ConeGeometry(r,h,24),M('#2F7A4A',{roughness:.7}));cn.position.y=y;g.add(cn)});
  const orn=['#E23B2E','#F2C14E','#3B7DD8','#FFFFFF'];for(let i=0;i<16;i++){const a=i*2.4,y=1.2+i*.2,r=2.0-i*.11;const b=sph(.14,glowM(orn[i%4],.35));b.position.set(Math.cos(a)*r,y,Math.sin(a)*r);g.add(b)}
  const star=new T.Mesh(new T.OctahedronGeometry(.42),glowM('#FFD36E',.9));star.position.y=5.0;g.add(star);movers.push((t,dt)=>{star.rotation.y+=dt*1.2});
  [['#E23B2E',-1.6,1.4],['#3B7DD8',1.5,1.6],['#F2C14E',-.4,2.2]].forEach(([col,dx,dz])=>{const bx=new T.Mesh(new T.BoxGeometry(.7,.6,.7),M(col));bx.position.set(dx,.3,dz);g.add(bx);const rb=new T.Mesh(new T.BoxGeometry(.72,.62,.14),M('#FFFFFF'));rb.position.copy(bx.position);g.add(rb)});g.scale.setScalar(s);return g}
 function snowman(){const g=new T.Group();const w=M('#FFFFFF',{roughness:.8});const b1=sph(.95,w);b1.position.y=.9;g.add(b1);const b2=sph(.7,w);b2.position.y=2.2;g.add(b2);const hd=sph(.52,w);hd.position.y=3.15;g.add(hd);
  for(const e of [-1,1]){const ey=sph(.07,M('#1A1A1A'));ey.position.set(e*.17,3.25,.47);g.add(ey);const hl=sph(.025,M('#FFFFFF'));hl.position.set(e*.17+.03,3.28,.53);g.add(hl);const ck=sph(.1,M('#FFB3C6'),1,.6,.4);ck.position.set(e*.3,3.05,.43);g.add(ck);
   const arm=cyl(.04,.04,1.1,M('#7A4A2A'),5);arm.position.set(e*.95,2.4,0);arm.rotation.z=e*.9;g.add(arm);const mit=sph(.17,M('#C8342B'),1,1.1,.8);mit.position.set(e*1.38,2.78,0);g.add(mit);const cuff=new T.Mesh(new T.TorusGeometry(.14,.05,6,14),M('#FFFFFF'));cuff.position.set(e*1.3,2.68,0);cuff.rotation.z=e*.9;g.add(cuff)}
  const nose=new T.Mesh(new T.ConeGeometry(.09,.48,10),M('#F28C28'));nose.rotation.x=Math.PI/2;nose.position.set(0,3.12,.7);g.add(nose);const sm=new T.Mesh(new T.TorusGeometry(.16,.03,6,14,Math.PI),M('#1A1A1A'));sm.rotation.z=Math.PI;sm.position.set(0,2.98,.48);g.add(sm);
  for(let k=0;k<3;k++){const bt=sph(.08,M('#1A1A1A'));bt.position.set(0,2.0+k*.25,.68);g.add(bt)}
  const hat=cyl(.48,.5,.12,M('#C8342B'),18);hat.position.y=3.55;g.add(hat);const hc=new T.Mesh(new T.ConeGeometry(.44,.85,18),M('#C8342B'));hc.position.set(.08,3.98,0);hc.rotation.z=-.35;g.add(hc);const fur=new T.Mesh(new T.TorusGeometry(.48,.1,8,20),M('#FFFFFF'));fur.rotation.x=Math.PI/2;fur.position.y=3.58;g.add(fur);const pom=sph(.15,M('#FFFFFF'));pom.position.set(.42,4.3,0);g.add(pom);
  for(let k=0;k<6;k++){const r=new T.Mesh(new T.TorusGeometry(.56,.11,8,20,Math.PI*2/6),M(k%2?'#FFFFFF':'#D7261E'));r.rotation.set(Math.PI/2,0,k*Math.PI/3);r.position.y=2.75;g.add(r)}
  const tail=new T.Mesh(new T.BoxGeometry(.24,.75,.08),M('#D7261E'));tail.position.set(.32,2.35,.55);tail.rotation.z=.15;g.add(tail);for(let k=0;k<3;k++){const st=new T.Mesh(new T.BoxGeometry(.25,.08,.09),M('#FFFFFF'));st.position.set(.32+k*.02,2.15+k*.22,.56);g.add(st)}
  g.scale.setScalar(1.15);return g}
 function wreath(r=.7){const g=new T.Group();const rg=new T.Mesh(new T.TorusGeometry(r,r*.28,10,28),M('#2F7A4A',{roughness:.8}));g.add(rg);for(let k=0;k<10;k++){const a=k/10*Math.PI*2;const b=sph(r*.11,M(k%2?'#E23B2E':'#F2C14E'));b.position.set(Math.cos(a)*r,Math.sin(a)*r,r*.22);g.add(b)}
  const bow=new T.Group();bow.position.set(0,-r,r*.25);for(const e of [-1,1]){const l=sph(r*.2,M('#C8342B'),1.3,.8,.5);l.position.x=e*r*.22;bow.add(l)}g.add(bow);return g}
 function candyCane(){const g=new T.Group();const H=1.9;for(let k=0;k<8;k++){const s=cyl(.09,.09,H/8,M(k%2?'#FFFFFF':'#E23B2E'),10);s.position.y=k*H/8+H/16;g.add(s)}const hook=new T.Mesh(new T.TorusGeometry(.28,.09,8,16,Math.PI),M('#E23B2E'));hook.position.set(.28,H,0);g.add(hook);return g}
 function buildXmas(){try{api.setSnow&&api.setSnow()}catch(e){}
  const tp=[{x:-16.5,z:6}];const big=xmasTree(1.7);add(big,tp[0].x,tp[0].z);solid(tp[0].x,tp[0].z,3.2,3.2);
  // v497 巨型聖誕樹：頂端金色 WY 星＋夜晚螺旋燈串
  {big.children.filter(o=>o.geometry&&o.geometry.type==='OctahedronGeometry').forEach(o=>o.visible=false);const sh=new T.Shape();for(let k=0;k<10;k++){const r=k%2?.28:.62,a=k/10*Math.PI*2+Math.PI/2;const x=Math.cos(a)*r,y=Math.sin(a)*r;k?sh.lineTo(x,y):sh.moveTo(x,y)}
   const star=new T.Mesh(new T.ExtrudeGeometry(sh,{depth:.16,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:2}),glowM('#FFD36E',1.0));star.position.set(0,5.25,-.08);big.add(star);
   const wyT=/* v500：聖誕星改正式 Logo */(()=>{const cv=document.createElement('canvas');cv.width=cv.height=256;const x=cv.getContext('2d');x.fillStyle='#1F3460';x.beginPath();x.arc(128,128,124,0,7);x.fill(); const t=new T.CanvasTexture(cv);t.colorSpace=T.SRGBColorSpace;const im=new Image();im.onload=()=>{x.drawImage(im,-12,-12,280,280);t.needsUpdate=true};im.src='./office-logo-transparent.png';return t})();for(const zz of [.25,-.25]){const pl=new T.Mesh(new T.PlaneGeometry(.62,.62),new T.MeshBasicMaterial({map:wyT,transparent:true,depthWrite:false,side:T.DoubleSide}));pl.position.set(0,5.25,zz);pl.rotation.y=zz>0?0:Math.PI;big.add(pl)}
   movers.push(t=>{star.rotation.y=Math.sin(t*.8)*.5});
   const lights=[];const lc=['#FF5A5A','#FFD36E','#7FD0F2','#B8E986','#FFFFFF','#FF9AE0'];for(let k=0;k<70;k++){const u=k/70;const y=1.0+u*3.8;const r=2.25*(1-u*.78)+.05;const a=u*Math.PI*2*5.5;const b=sph(.09,glowM(lc[k%6],.2),1,1,1,6);b.position.set(Math.cos(a)*r,y,Math.sin(a)*r);big.add(b);lights.push(b)}
   movers.push(t=>{const ph=api.phase();const n=ph==='night'?1:ph==='dusk'?.6:.15;lights.forEach((b,k)=>{b.material.emissiveIntensity=n*1.05})/* v500：燈泡恆亮不閃 */})}const sm0=snowman();sm0.rotation.y=-.35;add(sm0,PLAZA.Rt.x+.6,PLAZA.Rt.z+.6);solid(PLAZA.Rt.x+.6,PLAZA.Rt.z+.6,.7,.7);
  for(let i=1;i<=4;i++){const [cl,cr]=corners(i);add(xmasTree(.72),cl.x,cl.z);solid(cl.x,cl.z,1.4,1.4);const sm=snowman();sm.rotation.y=-.3;add(sm,cr.x,cr.z);solid(cr.x,cr.z,.7,.7);
   const e=entrance(i);[-1,1].forEach(s=>{const px=e.x+e.px*5.4*s,pz=e.z+e.pz*5.4*s;const post=new T.Group();const p=cyl(.1,.12,2.6,navy,10);p.position.y=1.3;post.add(p);const cap=sph(.16,gold);cap.position.y=2.68;post.add(cap);const w=wreath(.42);w.position.set(0,2.05,.14);post.add(w);post.rotation.y=Math.atan2(e.ux,e.uz);add(post,px,pz);solid(px,pz,.25,.25)})}
  for(const i of [1,2,3,4,5,'C'])for(const p of bridgePts(i,3,5.35)){const cc=candyCane();cc.rotation.y=p.ang+(p.s>0?Math.PI/2:-Math.PI/2);add(cc,p.x,p.z,p.y-.2)}
  // 城堡大門花圈與外牆燈串
  const zc=castleFrontZ(0,5.5);const wr=wreath(1.25);add(wr,0,zc+.3,5.7);
  // v497 城堡大門：松枝拱形花環＋燈泡、門兩側小聖誕樹、拐杖糖、禮物堆
  {const gy0=gy(0,zc+1);const arch=new T.Group();const pine=M('#2B6E3F',{roughness:.85});const R=2.9;for(let k=0;k<=36;k++){const a=Math.PI*k/36;const x=Math.cos(a)*R,y=Math.sin(a)*R*1.05;const tuft=sph(.32,pine,1,1,.7,7);tuft.position.set(x,y,0);tuft.rotation.z=a;arch.add(tuft);if(k%3===0){const b=sph(.12,glowM(['#FF4B4B','#FFD36E','#FFFFFF'][k/3%3],.8),1,1,1,6);b.position.set(x*1.04,y*1.04,.25);arch.add(b)}if(k%9===4){const bw=new T.Group();for(const e of [-1,1]){const l=sph(.18,M('#D7261E'),1.3,.8,.5);l.position.x=e*.18;bw.add(l)}bw.position.set(x,y,.3);arch.add(bw)}}
   arch.position.set(0,gy0+.2,zc+.45);root.add(arch);
   for(const e of [-1,1]){const st=xmasTree(.55);add(st,e*4.4,zc+1.6);solid(e*4.4,zc+1.6,1.0,1.0);const cc=candyCane();cc.scale.setScalar(1.2);cc.rotation.y=e>0?Math.PI:0;add(cc,e*3.2,zc+1.4);
    const cols2=[['#D7261E','#F2C14E'],['#F2C14E','#D7261E'],['#2F8F4E','#F2C14E'],['#FFFFFF','#D7261E']];const pile=new T.Group();[[0,0,0,.9],[.85,0,.2,.65],[-.2,0,.85,.6],[.25,.82,.2,.5]].forEach(([x,y,z,sz],k)=>{const bx=new T.Mesh(new T.BoxGeometry(sz,sz*.8,sz),M(cols2[k][0]));bx.position.set(x,y+sz*.4,z);bx.rotation.y=k*.5;pile.add(bx);for(const r of [0,Math.PI/2]){const rb=new T.Mesh(new T.BoxGeometry(sz*1.02,sz*.82,sz*.16),M(cols2[k][1],{metalness:.3}));rb.position.copy(bx.position);rb.rotation.y=bx.rotation.y+r;pile.add(rb)}const bw=sph(sz*.16,M(cols2[k][1]),1.6,.8,.8);bw.position.set(x,y+sz*.86,z);pile.add(bw)});add(pile,e*6.2,zc+2.2);solid(e*6.2,zc+2.2,.9,.9)}}
  // v497 薑餅人在廣場前圍圈跳舞
  {const gbM=M('#B5652B',{roughness:.6}),ic=M('#FFFFFF');const mk=()=>{const g=new T.Group();const bd=sph(.42,gbM,1,1.15,.45);bd.position.y=.95;g.add(bd);const hd=sph(.32,gbM,1,1,.5);hd.position.y=1.62;g.add(hd);for(const e of [-1,1]){const ey=sph(.045,ic);ey.position.set(e*.11,1.68,.15);g.add(ey);const lg=sph(.17,gbM,1,1.8,.5);lg.position.set(e*.2,.38,0);g.add(lg);const ar=sph(.15,gbM,1.9,.9,.5);ar.position.set(e*.5,1.1,0);ar.userData.arm=e;g.add(ar)}
    const sm=new T.Mesh(new T.TorusGeometry(.1,.02,4,10,Math.PI),ic);sm.rotation.z=Math.PI;sm.position.set(0,1.56,.16);g.add(sm);for(let k=0;k<3;k++){const bt=sph(.055,M(['#E23B2E','#2F8F4E','#E23B2E'][k]));bt.position.set(0,1.15-k*.2,.19);g.add(bt)}const bow=sph(.09,M('#E23B2E'),1.6,.7,.6);bow.position.set(0,1.33,.17);g.add(bow);g.scale.setScalar(1.25);return g};
   const cx3=-4.6,cz3=20.2;const men=[];for(let k=0;k<5;k++){const m=mk();root.add(m);men.push(m)}solid(cx3,cz3,1.9,1.9);
   movers.push(t=>{men.forEach((m,k)=>{const a=t*.7+k/5*Math.PI*2;const x=cx3+Math.cos(a)*1.6,z=cz3+Math.sin(a)*1.6;m.position.set(x,gy(x,z)+Math.abs(Math.sin(t*5+k))*.25,z);m.rotation.y=-a;m.children.forEach(o=>{if(o.userData.arm)o.rotation.z=o.userData.arm*(.4+Math.sin(t*6+k)*.5)})})})}
  const bulbs=[];const cols=['#FF5A5A','#FFD36E','#7FD0F2','#B8E986','#FFFFFF'];for(const yy of [7.2,10.2]){for(let k=0;k<=30;k++){const t=k/30;const x=-8+t*16;const z=castleFrontZ(x,yy)+.3;const y=yy-Math.sin(t*Math.PI)*.8;const b=sph(.13,glowM(cols[k%5],.9),1,1,1,8);add(b,x,z,y);bulbs.push(b)}}
  movers.push(t=>{const ph=Math.floor(t*2)%2;bulbs.forEach((b,k)=>{b.material.emissiveIntensity=((k+ph)%2)?1.2:.35})});
  // 地面慢慢積雪
  const frost=[];const fm=new T.MeshBasicMaterial({color:'#FFFFFF',transparent:true,opacity:0,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2});
  for(let i=0;i<=4;i++){const I=island(i);const geo=i===0?new T.RingGeometry(13,22.4,64):new T.RingGeometry(9.5,16.6,48);const f=new T.Mesh(geo,fm);f.rotation.x=-Math.PI/2;if(i===0)add(f,0,3.5,1.66);else add(f,I.x,I.z,(i<=2?.85:0)+.06);frost.push(f)}
  let acc=0;movers.push((t,dt)=>{acc=Math.min(.42,acc+dt*.006);fm.opacity=acc});
  // 夜晚麋鹿雪橇
  const sl=new T.Group();const sled=new T.Group();sl.add(sled);const sb=new T.Mesh(new T.BoxGeometry(1.8,.9,2.6),M('#C8342B'));sb.position.y=.7;sled.add(sb);const sback=new T.Mesh(new T.BoxGeometry(1.8,1.2,.3),M('#C8342B'));sback.position.set(0,1.3,-1.15);sled.add(sback);const strim=new T.Mesh(new T.BoxGeometry(1.86,.12,2.66),M('#F2C14E',{metalness:.5}));strim.position.y=1.15;sled.add(strim);
  for(const e of [-1,1]){const rn=new T.Mesh(new T.TorusGeometry(1.3,.07,6,24,Math.PI*.85),gold);rn.position.set(e*.75,.15,.1);rn.rotation.y=Math.PI/2;rn.rotation.z=Math.PI*.08;sled.add(rn)}
  const sack=sph(.75,M('#8A5A36'),1,1.1,1);sack.position.set(0,1.75,-.7);sled.add(sack);[['#2F8F4E',.5],['#3B7DD8',-.4],['#F2C14E',.05]].forEach(([c2,x])=>{const gb=new T.Mesh(new T.BoxGeometry(.4,.4,.4),M(c2));gb.position.set(x,2.45,-.6);gb.rotation.y=x;sled.add(gb)});
  const santa=new T.Group();santa.position.set(0,1.25,.35);sled.add(santa);const sbody=sph(.62,M('#D7261E'),1,1,.9);sbody.position.y=.45;santa.add(sbody);const belt=new T.Mesh(new T.TorusGeometry(.6,.08,8,24),M('#1A1A1A'));belt.rotation.x=Math.PI/2;belt.position.y=.35;santa.add(belt);const sface=sph(.4,M('#F6D3BC'));sface.position.y=1.25;santa.add(sface);
  const beard=sph(.42,M('#FFFFFF',{roughness:.9}),1,1,.8);beard.position.set(0,1.0,.18);santa.add(beard);const snose=sph(.09,M('#F28C8C'));snose.position.set(0,1.27,.4);santa.add(snose);for(const e of [-1,1]){const ey=sph(.05,M('#1A1A1A'));ey.position.set(e*.13,1.37,.35);santa.add(ey)}
  const shat=new T.Mesh(new T.ConeGeometry(.38,.7,16),M('#D7261E'));shat.position.set(.06,1.82,0);shat.rotation.z=-.4;santa.add(shat);const sfur=new T.Mesh(new T.TorusGeometry(.38,.09,8,18),M('#FFFFFF'));sfur.rotation.x=Math.PI/2;sfur.position.y=1.55;santa.add(sfur);const spom=sph(.12,M('#FFFFFF'));spom.position.set(.35,2.1,0);santa.add(spom);
  for(const e of [-1,1]){const arm=cyl(.13,.13,.6,M('#D7261E'),8);arm.position.set(e*.55,.75,.35);arm.rotation.x=-1.0;santa.add(arm);const mit=sph(.14,M('#1A1A1A'));mit.position.set(e*.55,.82,.65);santa.add(mit)}
  const deerM=M('#9A6A43'),antM=M('#5A3A22');for(let k=0;k<4;k++){const d=new T.Group();const row=Math.floor(k/2),e=k%2?1:-1;d.position.set(e*.75,.6,3.3+row*2.3);const db=sph(.5,deerM,.8,.75,1.4);d.add(db);const belly=sph(.38,M('#E8CFA8'),.7,.5,1.1);belly.position.y=-.18;d.add(belly);const neck=cyl(.18,.22,.6,deerM,8);neck.position.set(0,.45,.55);neck.rotation.x=.6;d.add(neck);const dh=sph(.32,deerM,1,1,1.2);dh.position.set(0,.85,.85);d.add(dh);
   for(const s2 of [-1,1]){const ey=sph(.05,M('#1A1A1A'));ey.position.set(s2*.14,.95,1.1);d.add(ey);const an=new T.Group();an.position.set(s2*.15,1.12,.75);const a1=cyl(.03,.035,.45,antM,5);a1.position.y=.22;an.add(a1);const a2=cyl(.025,.03,.25,antM,5);a2.position.set(s2*.08,.35,0);a2.rotation.z=-s2*.8;an.add(a2);an.rotation.z=-s2*.3;d.add(an);
    for(let l=0;l<2;l++){const lg=cyl(.07,.07,.65,deerM,6);lg.position.set(s2*.22,-.5,l?.45:-.45);d.add(lg)}}
   const ns=sph(.11,k===3?glowM('#FF3B3B',1.3):M('#3A2A20'));ns.position.set(0,.82,1.22);d.add(ns);const har=new T.Mesh(new T.TorusGeometry(.4,.04,6,16),M('#F2C14E'));har.position.set(0,.2,.1);har.rotation.y=Math.PI/2;d.add(har);d.userData.ph=k;sl.add(d)}
  const reins=cyl(.02,.02,5,M('#F2C14E'),4);reins.rotation.x=Math.PI/2;reins.position.set(0,1.3,3);sl.add(reins);sl.scale.setScalar(1.4);
  const trailN=40,tp2=new Float32Array(trailN*3);const tg=new T.BufferGeometry();tg.setAttribute('position',new T.BufferAttribute(tp2,3));const trail=new T.Points(tg,new T.PointsMaterial({size:1.6,map:api.dot,color:'#FFE7A8',transparent:true,depthWrite:false,blending:T.AdditiveBlending,fog:false}));scene.add(trail);
  root.add(sl);let ti=0;movers.push((t,dt)=>{const ph=api.phase();const on=ph!=='day'&&!(c.inside&&c.inside());sl.visible=on;trail.visible=on;if(!on)return;const a=t*.16;sl.position.set(Math.cos(a)*85,52+Math.sin(t*.8)*3,Math.sin(a)*60-20);sl.rotation.y=-a;sl.children.forEach(d=>{if(d.userData.ph!==undefined){d.position.y=.6+Math.sin(t*8+d.userData.ph)*.18}});
   tp2.set([sl.position.x,sl.position.y+.4,sl.position.z],(ti%trailN)*3);ti++;tg.attributes.position.needsUpdate=true})}
 // ---------- 組合 ----------
 // v499 每個節慶：四座島門口左前方放一個大型主題裝飾
 function islandPiece(k){for(let i=1;i<=4;i++){const x=xy[i][0]+(i===3?-7.2:-7.6),z=xy[i][1]+(i===3?13.6:12.4);/* v500：家庭島避開花圃 */const g=new T.Group();
   if(k==='cny'){const p2=cyl(.1,.12,4.2,gold,8);p2.position.y=2.1;g.add(p2);const bl=sph(1.25,glowM('#E23B2E',.6),1,1.1,1);bl.position.y=4.6;g.add(bl);for(const yy of[3.35,5.85]){const cp=cyl(.55,.7,.25,gold,16);cp.position.y=yy;g.add(cp)}const fu=new T.Mesh(new T.CircleGeometry(.6,24),new T.MeshBasicMaterial({map:canvasTex(128,128,(x2,w,h)=>{x2.fillStyle='#F2C14E';x2.beginPath();x2.arc(64,64,62,0,7);x2.fill();x2.fillStyle='#C8261E';x2.font='bold 84px "Noto Serif TC",serif';x2.textAlign='center';x2.textBaseline='middle';x2.fillText('福',64,70)})}));fu.position.set(0,4.6,1.33);g.add(fu);const ts=cyl(.05,.18,1,M('#F2C14E'),8);ts.position.y=2.9;g.add(ts)}
   else if(k==='val'){const p2=cyl(.08,.1,2.6,gold,8);p2.position.y=1.3;g.add(p2);const hs=new T.Shape();hs.moveTo(0,-1);hs.bezierCurveTo(-1.8,.2,-1,1.6,0,.8);hs.bezierCurveTo(1,1.6,1.8,.2,0,-1);const hm=new T.Mesh(new T.ExtrudeGeometry(hs,{depth:.5,bevelEnabled:true,bevelSize:.15,bevelThickness:.15,bevelSegments:3}),glowM('#FF4F7E',.35));hm.position.set(0,3.6,-.25);hm.scale.setScalar(1.2);g.add(hm);movers.push(t=>{hm.rotation.y=Math.sin(t*1.2+i)*.5})}
   else if(k==='duan'){const geo=new T.TetrahedronGeometry(1.4,1);const z2=new T.Mesh(geo,M('#4E9A3A',{roughness:.6,flatShading:true}));z2.position.y=1.5;z2.rotation.set(.6,0,.8);g.add(z2);const band=new T.Mesh(new T.TorusGeometry(1.05,.07,8,32),M('#E23B2E'));band.rotation.x=Math.PI/2;band.position.y=1.4;g.add(band)}
   else if(k==='qixi'){const p2=cyl(.08,.1,3,gold,8);p2.position.y=1.5;g.add(p2);const sh=new T.Shape();for(let q=0;q<10;q++){const r=q%2?.55:1.3,a=q/10*Math.PI*2+Math.PI/2;q?sh.lineTo(Math.cos(a)*r,Math.sin(a)*r):sh.moveTo(Math.cos(a)*r,Math.sin(a)*r)}const st=new T.Mesh(new T.ExtrudeGeometry(sh,{depth:.35,bevelEnabled:true,bevelSize:.08,bevelThickness:.08}),glowM('#B79CF2',.5));st.position.set(0,4.1,-.17);g.add(st);movers.push(t=>{st.rotation.y=t*.8+i})}
   else if(k==='moon'){const p2=cyl(.1,.12,3.6,gold,8);p2.position.y=1.8;g.add(p2);const bl=sph(1.25,glowM('#FFC24A',.6),1,.95,1);bl.position.y=4.2;g.add(bl);for(const yy of[3.05,5.35]){const cp=cyl(.5,.6,.22,gold,16);cp.position.y=yy;g.add(cp)}const rb=sph(.35,M('#FFFFFF'));rb.position.set(0,4.2,1.25);g.add(rb);for(const e of[-1,1]){const er=sph(.1,M('#FFFFFF'),1,2.4,.6);er.position.set(e*.13,4.65,1.25);g.add(er)}}
   else if(k==='xmas'){const tr=xmasTree(.75);g.add(tr)}
   else continue;
   add(g,x,z);solid(x,z,1.2,1.2)}}
 const builders={cny:buildCNY,val:buildVal,duan:buildDuan,qixi:buildQixi,moon:buildMoon,xmas:buildXmas};
 const waitSea=(cb,n=0)=>{if((window.wySeaReady&&window.wyCastleTopReady!==false)||n>80)cb();else setTimeout(()=>waitSea(cb,n+1),250)};const OUT_PRI=['cny','qixi','moon','duan','xmas','val'];const outFest=day214?'val':OUT_PRI.find(k=>ACT.has(k));
 if(outFest){const OF=makeOutfits(T);const tryDress=(n=0)=>{const S=c.staff?c.staff():[];if(window.wyRedressStaff&&S.length){window.wyRedressStaff(outFest,OF);movers.push(t=>{for(const f of OF.ANIM){try{f(t)}catch(e){}}})}else if(n<80)setTimeout(()=>tryDress(n+1),250)};setTimeout(tryDress,600)}
 waitSea(()=>setTimeout(()=>{try{islandPiece(day214?'val':(OUT_PRI.find(k=>ACT.has(k))))}catch(e){console.error('piece',e)}for(const k of LIST){try{const r=builders[k]();if(r&&r.catch)r.catch(e=>console.error('fest '+k,e))}catch(e){console.error('fest '+k,e)}}},300));
 let tt=0;return function tick(dt){tt+=dt;const inside=c.inside&&c.inside();root.visible=!inside;if(inside)return;for(const f of movers){try{f(tt,dt)}catch(e){}}};
}
