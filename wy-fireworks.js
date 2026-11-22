// 德威陽｜有法度 v498 Logo 煙火：天空炸出 WY 徽章（金色）與 WEIYANG（白色）
// 施放時機：逛完四間辦公室（每位訪客一次）、每天進入夜晚時一輪＋夜晚每 3 分鐘一輪（節慶期間 90 秒）、
// 跨年 12/31 午夜前後連續施放、中秋點滿燈籠（wy-fest 呼叫 window.wyLogoFireworks）。施放時右下角提示截圖分享。
export function setupFireworks(T, c, api){
 const scene=c.scene, camera=c.camera;
 const dot=api.dot;
 let targets=null;           // [{x,y,gold}] 以徽章中心為原點，單位約 1 = 1 公尺
 (async()=>{try{const img=await new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src='ground-logo-cropped.png'});
  const GW=64,GH=Math.round(64*img.height*.8/img.width);const cv=document.createElement('canvas');cv.width=GW;cv.height=GH;const x=cv.getContext('2d');x.drawImage(img,0,0,img.width,img.height*.8,0,0,GW,GH);const p=x.getImageData(0,0,GW,GH).data;
  const pts=[];const S=24/GW;for(let j=0;j<GH;j++)for(let i=0;i<GW;i++){const k=(j*GW+i)*4;if(p[k+3]>100&&(p[k]+p[k+1]+p[k+2])<640)pts.push({x:(i-GW/2)*S,y:(GH/2-j)*S+3,gold:1})}
  const TW=90,TH=16;const tc=document.createElement('canvas');tc.width=TW;tc.height=TH;const tx=tc.getContext('2d');tx.fillStyle='#000';tx.font='bold 15px Arial,Helvetica,sans-serif';tx.textAlign='center';tx.textBaseline='middle';tx.fillText('WEIYANG',TW/2,TH/2+1);const tp=tx.getImageData(0,0,TW,TH).data;
  const TS=.34;for(let j=0;j<TH;j++)for(let i=0;i<TW;i++){const k=(j*TW+i)*4;if(tp[k+3]>110)pts.push({x:(i-TW/2)*TS,y:-GH*S/2+3-3.2-(j-TH/2)*TS,gold:0})}
  // 太密的點抽稀，維持手機效能
  const MAX=1400;targets=pts.length>MAX?pts.filter((_,k)=>k%Math.ceil(pts.length/MAX)===0):pts}catch(e){console.error('fw logo',e)}})();
 const shows=[];
 const tip=document.createElement('div');tip.textContent='截圖分享這一刻';tip.style.cssText='position:fixed;left:50%;transform:translateX(-50%);top:calc(166px + env(safe-area-inset-top,0px));/* v510：移到名牌與氣象台下面，不重疊 */z-index:60;background:rgba(31,52,96,.88);color:#FFE7A8;font:600 13px/1.2 "Noto Sans TC",sans-serif;padding:8px 12px;border-radius:14px;border:1px solid #F0C75E;opacity:0;transition:opacity .4s;pointer-events:none';document.body.appendChild(tip);
 let tipT=0;
 function launch(){if(!targets||(c.inside&&c.inside()))return false;
  const fw=new T.Vector3();camera.getWorldDirection(fw);const hf=fw.clone();hf.y=0;if(hf.lengthSq()<1e-4)hf.set(0,0,-1);hf.normalize();
  const dir=new T.Vector3(0,.28,.5).unproject(camera).sub(camera.position).normalize();const D=Math.min(95,Math.max(55,camera.position.y*.75+40));const center=camera.position.clone().addScaledVector(dir,D);if(center.y<22)center.y=22;
  const N=targets.length;const pos=new Float32Array(N*3),col=new Float32Array(N*3);const gold=new T.Color('#FFD36E'),white=new T.Color('#FFFFFF');
  for(let k=0;k<N;k++){pos.set([0,0,0],k*3);const cc=targets[k].gold?gold:white;col.set([cc.r,cc.g,cc.b],k*3)}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));g.setAttribute('color',new T.BufferAttribute(col,3));
  const m=new T.PointsMaterial({size:1.25,map:dot,vertexColors:true,transparent:true,depthWrite:false,blending:T.AdditiveBlending,fog:false,opacity:1});
  const P=new T.Points(g,m);P.position.copy(center);P.lookAt(camera.position);P.visible=false;P.renderOrder=5;scene.add(P);
  // 上升的火箭
  const rk=new T.Mesh(new T.SphereGeometry(.45,8,6),new T.MeshBasicMaterial({color:'#FFE7A8',fog:false}));const start=center.clone();start.y=4;rk.position.copy(start);scene.add(rk);
  // 兩側陪襯的彩色小煙火
  const side=[];for(let s=0;s<4;s++){const n=80,pp=new Float32Array(n*3),vel=[];for(let i=0;i<n;i++){const u=Math.random()*Math.PI*2,v=Math.acos(2*Math.random()-1),sp=9+Math.random()*4;vel.push([Math.sin(v)*Math.cos(u)*sp,Math.cos(v)*sp,Math.sin(v)*Math.sin(u)*sp])}
   const sg=new T.BufferGeometry();sg.setAttribute('position',new T.BufferAttribute(pp,3));const sp2=new T.Points(sg,new T.PointsMaterial({size:1.6,map:dot,color:['#FF8FB8','#9AD8FF','#FFB23D','#B8F28A'][s],transparent:true,depthWrite:false,blending:T.AdditiveBlending,fog:false}));
   const off=new T.Vector3((s<2?-1:1)*(26+Math.random()*10),(s%2?8:-4)+Math.random()*6,(Math.random()-.5)*10);sp2.position.copy(center).add(off.applyAxisAngle(new T.Vector3(0,1,0),Math.atan2(hf.x,hf.z)));sp2.visible=false;scene.add(sp2);side.push({p:sp2,vel,at:1.6+s*.45})}
  shows.push({t:0,P,rk,start,center,side});tipT=6;tip.style.opacity=1;clearTimeout(tip.__h);tip.__h=setTimeout(()=>{tip.style.opacity=0;tipT=0},6000);/* v510：一定 6 秒後收起（進室內不會一直掛著） */try{api.boom&&api.boom()}catch(e){}return true}
 window.wyLogoFireworks=()=>launch();
 // 逛完四間辦公室
 const KEY='wy-visited-rooms-v498',DONE='wy-fw-allrooms-v498';
 window.wyMarkVisit=i=>{try{if(!(i>=1&&i<=4))return;const s=new Set(JSON.parse(localStorage.getItem(KEY)||'[]'));s.add(i);localStorage.setItem(KEY,JSON.stringify([...s]))}catch(e){}};
 let pendingRooms=false;const checkRooms=()=>{try{const s=JSON.parse(localStorage.getItem(KEY)||'[]');if(s.length>=4&&localStorage.getItem(DONE)!=='yes'){pendingRooms=true}}catch(e){}};
 let lastPhase='',nightT=0,cd=3,yearCd=0;
 const ease=x=>1-Math.pow(1-x,3);
 const tick=function(dt){cd-=dt;
  // 夜晚施放
  const ph=api.phase();const fest=(window.wyFest||'').length>0;
  if(ph==='night'&&lastPhase&&lastPhase!=='night'){nightT=0;if(cd<=0&&launch())cd=20}
  if(ph==='night'){nightT+=dt;const iv=fest?90:180;if(nightT>iv){nightT=0;if(launch())cd=20}}
  lastPhase=ph;
  // 逛完四間：回到戶外後放
  checkRooms();if(pendingRooms&&!(c.inside&&c.inside())&&cd<=0&&targets){if(launch()){pendingRooms=false;cd=20;try{localStorage.setItem(DONE,'yes')}catch(e){}}}
  // 跨年：12/31 23:59 起到 1/1 00:05（台北時間），每 15 秒一輪
  yearCd-=dt;if(yearCd<=0){yearCd=15;try{const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Taipei',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());const g=k=>+p.find(q=>q.type===k).value;const mo=g('month'),d=g('day'),h=g('hour'),mi=g('minute');if((mo===12&&d===31&&h===23&&mi>=59)||(mo===1&&d===1&&h===0&&mi<5))launch()}catch(e){}}
  if(tipT>0){tipT-=dt;if(tipT<=0)tip.style.opacity=0}
  for(let i=shows.length-1;i>=0;i--){const s=shows[i];s.t+=dt;const t=s.t;
   if(t<1.4){const f=t/1.4;s.rk.position.lerpVectors(s.start,s.center,ease(f));}
   else if(s.rk.parent){scene.remove(s.rk);s.rk.geometry.dispose();s.P.visible=true}
   if(t>=1.4){const a=s.P.geometry.attributes.position.array;const u=Math.min(1,(t-1.4)/.9),e=ease(u);const fall=t>4.6?(t-4.6):0;
    for(let k=0;k<targets.length&&k*3<a.length;k++){const q=targets[k];a[k*3]=-q.x*e;a[k*3+1]=q.y*e-fall*fall*2.2-(fall>0?((k*7)%5)*fall*.3:0);a[k*3+2]=0}
    s.P.geometry.attributes.position.needsUpdate=true;s.P.material.size=1.25+(t<2.3?(1-u)*1.2:0);/* v501：不閃爍 */s.P.material.opacity=t>4.6?Math.max(0,1-(t-4.6)/1.6):1}
   for(const sd of s.side){if(t<sd.at)continue;sd.p.visible=true;const lt=t-sd.at;const a=sd.p.geometry.attributes.position.array;for(let k=0;k<sd.vel.length;k++){const v=sd.vel[k];a[k*3]=v[0]*lt;a[k*3+1]=v[1]*lt-3*lt*lt;a[k*3+2]=v[2]*lt}sd.p.geometry.attributes.position.needsUpdate=true;sd.p.material.opacity=Math.max(0,1-lt/1.8)}
   if(t>6.4){scene.remove(s.P);s.P.geometry.dispose();s.P.material.dispose();for(const sd of s.side){scene.remove(sd.p);sd.p.geometry.dispose();sd.p.material.dispose()}shows.splice(i,1)}}};
 window.__wyFwStep=tick;return tick;
}
