// WEIYANG medical island — standalone exterior and interior module.
// All medical geometry and interaction live here; castle.js is untouched.
export function createMedicalExterior(group, THREE){
 const ivory=new THREE.MeshStandardMaterial({color:0xfff9ee,roughness:.62});
 const blue=new THREE.MeshStandardMaterial({color:0x5c9ccf,metalness:.18,roughness:.33});
 const gold=new THREE.MeshStandardMaterial({color:0xd8b16b,metalness:.55,roughness:.3});
 const glass=new THREE.MeshPhysicalMaterial({color:0xbce9f6,transparent:true,opacity:.72,roughness:.13,metalness:.08});
 const pink=new THREE.MeshStandardMaterial({color:0xf6d4e3,roughness:.7});
 const add=(geo,mat,x,y,z,parent=group)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);parent.add(o);return o};
 // A full, unmistakable standalone medical palace, occupying the medical island.
 // The previous medical GLB is intentionally NOT loaded by index.html.
 add(new THREE.CylinderGeometry(15.5,15.5,.35,64),ivory,0,.2,0);
 add(new THREE.BoxGeometry(19,8,13),ivory,0,4.25,-1.5);
 add(new THREE.BoxGeometry(20,.38,14),gold,0,8.5,-1.5);
 add(new THREE.BoxGeometry(12,2.8,12),glass,0,9.8,-1.5);
 const roof=add(new THREE.ConeGeometry(9.5,5.5,8),blue,0,14.0,-1.5);roof.rotation.y=Math.PI/8;
 add(new THREE.SphereGeometry(.55,16,12),gold,0,17.05,-1.5);
 for(const x of [-9.6,9.6]){
   add(new THREE.CylinderGeometry(2.35,2.55,9,24),ivory,x,4.8,-2);
   add(new THREE.ConeGeometry(3.05,5.0,16),blue,x,11.7,-2);
   add(new THREE.SphereGeometry(.35,12,10),gold,x,14.4,-2);
 }
 for(const x of [-7,-4.5,4.5,7]){
   add(new THREE.BoxGeometry(1.65,3.3,.18),glass,x,4.8,5.12);
   add(new THREE.BoxGeometry(1.85,.13,.23),gold,x,6.5,5.22);
 }
 const door=add(new THREE.BoxGeometry(4.4,5.2,.34),blue,0,2.8,5.26);
 for(const x of [-2.25,2.25])add(new THREE.BoxGeometry(.17,5.45,.4),gold,x,2.8,5.44);
 add(new THREE.BoxGeometry(5.2,.25,.6),gold,0,5.57,5.46);
 add(new THREE.SphereGeometry(.16,12,10),gold,-.3,2.65,5.47);
 add(new THREE.SphereGeometry(.16,12,10),gold,.3,2.65,5.47);
 // Medical identity is part of the architecture, not a floating sign.
 // Blue enamel medical crosses are on both facade wings; the firm's logo remains the central focal point.
 const enamel=new THREE.MeshStandardMaterial({color:0x267eae,metalness:.28,roughness:.26});
 const bright=new THREE.MeshStandardMaterial({color:0xe9fcff,emissive:0x4ba4c5,emissiveIntensity:.2,roughness:.32});
 const cross=(x,y,z,scale=1)=>{
   const medallion=add(new THREE.CylinderGeometry(1.27*scale,1.27*scale,.15*scale,48),gold,x,y,z);
   medallion.rotation.x=Math.PI/2;
   const disk=add(new THREE.CylinderGeometry(1.12*scale,1.12*scale,.17*scale,48),ivory,x,y,z+.12*scale);
   disk.rotation.x=Math.PI/2;
   add(new THREE.BoxGeometry(.40*scale,1.46*scale,.15*scale),enamel,x,y,z+.25*scale);
   add(new THREE.BoxGeometry(1.46*scale,.40*scale,.15*scale),enamel,x,y,z+.25*scale);
 };
 cross(-6.2,7.1,5.35,.9);cross(6.2,7.1,5.35,.9);
 // Illuminated medical emblem on the glass-roof frontage, above the original WEIYANG crest.
 cross(0,12.1,4.68,.82);
 // A refined heartbeat motif across the entrance lintel, like a premium medical center.
 const ecgPoints=[[-7.7,6.82],[-6.6,6.82],[-6.15,7.1],[-5.72,6.3],[-5.24,7.5],[-4.72,6.82],[-3.1,6.82]];
 for(const sign of [-1,1])for(let j=1;j<ecgPoints.length;j++){
   const a=ecgPoints[j-1],b=ecgPoints[j];
   const p1=new THREE.Vector3(sign*Math.abs(a[0]),a[1],5.41),p2=new THREE.Vector3(sign*Math.abs(b[0]),b[1],5.41);
   const delta=p2.clone().sub(p1);const segment=add(new THREE.CylinderGeometry(.055,.055,delta.length(),8),bright,0,0,0);
   segment.position.copy(p1.add(p2).multiplyScalar(.5));segment.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());
 }
 // Medical blue-and-white lanterns mark the two sides of the entrance path.
 for(const x of [-3.5,3.5]){
   add(new THREE.CylinderGeometry(.13,.18,1.25,12),gold,x,1.05,8.6);
   add(new THREE.SphereGeometry(.35,16,12),glass,x,1.78,8.6);
   add(new THREE.SphereGeometry(.12,12,8),enamel,x,2.11,8.6);
 }
 // Original, unchanged WEIYANG image faces the approach (+Z), in front of facade.
 const tex=new THREE.TextureLoader().load('official-logo.png');tex.colorSpace=THREE.SRGBColorSpace;
 const crest=add(new THREE.CircleGeometry(1.78,64),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide,depthTest:false,depthWrite:false}),0,10.0,5.76);
 crest.renderOrder=60;
 const rim=add(new THREE.TorusGeometry(1.87,.10,12,64),gold,0,10.0,5.69);rim.renderOrder=59;
 for(const x of [-12.2,12.2])for(const z of [2.5,7]){
   add(new THREE.CylinderGeometry(.07,.07,.7,8),gold,x,.65,z);
   add(new THREE.SphereGeometry(.38,12,10),pink,x,1.1,z);
 }
 // Forecourt to the door, distinct from the surrounding pink island body.
 add(new THREE.BoxGeometry(6.2,.14,10),ivory,0,.38,10.0);
 return {door,crest};
}
export function createMedicalInterior(room,THREE){
 const root=room.scene;const mat=(c)=>new THREE.MeshStandardMaterial({color:c,roughness:.56});
 const ivory=mat(0xfff8ed),navy=mat(0x294a6a),gold=mat(0xd9b77d),glass=new THREE.MeshPhysicalMaterial({color:0xb8e4f1,transparent:true,opacity:.45,roughness:.15});
 const add=(g,m,x,y,z)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);root.add(o);return o};
 // Existing generic island interior stays intact: additions form three distinct zones.
 add(new THREE.BoxGeometry(9,3.9,.18),navy,0,4.2,-8.88);
 for(const x of [-3.7,3.7])add(new THREE.BoxGeometry(.12,4.2,.28),gold,x,4.2,-8.7);
 const screen=add(new THREE.PlaneGeometry(7.0,3.1),new THREE.MeshBasicMaterial({color:0xd9f0f8,side:THREE.DoubleSide}),0,4.25,-8.72);
 // Live ECG monitor: animated CanvasTexture mapped onto an actual 3D screen in the medical interior.
 // No video download or autoplay audio; runs only while the medical room is visible.
 const ecgCanvas=document.createElement('canvas');ecgCanvas.width=640;ecgCanvas.height=256;
 const ecgCtx=ecgCanvas.getContext('2d');
 const ecgTexture=new THREE.CanvasTexture(ecgCanvas);ecgTexture.colorSpace=THREE.SRGBColorSpace;
 const ecgCase=new THREE.MeshStandardMaterial({color:0x203b56,metalness:.22,roughness:.34});
 add(new THREE.BoxGeometry(5.55,2.7,.22),gold,5.1,4.25,-8.45);
 add(new THREE.BoxGeometry(5.32,2.47,.24),ecgCase,5.1,4.25,-8.28);
 const ecgDisplay=add(new THREE.PlaneGeometry(5.05,2.24),new THREE.MeshBasicMaterial({map:ecgTexture,side:THREE.DoubleSide}),5.1,4.25,-8.14);
 const ecgWave=t=>{const phase=((t%1)+1)%1;
   const spikes=[[.0,0],[.07,0],[.12,.05],[.16,0],[.205,0],[.238,-.13],[.255,.82],[.274,-.33],[.302,0],[.44,0],[.51,.18],[.59,.23],[.67,0],[1,0]];
   for(let j=1;j<spikes.length;j++)if(phase<=spikes[j][0]){
     const a=spikes[j-1],b=spikes[j],r=(phase-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*r;
   }return 0;
 };
 function paintEcg(time){
  const w=640,h=256,c=ecgCtx;c.fillStyle='#071b27';c.fillRect(0,0,w,h);
  c.strokeStyle='rgba(72,155,150,.15)';c.lineWidth=1;
  for(let x=0;x<w;x+=32){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke()}
  for(let y=0;y<h;y+=32){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke()}
  c.fillStyle='#b9f6da';c.font='bold 26px sans-serif';c.fillText('♥ 72 BPM',20,36);
  c.font='17px sans-serif';c.fillStyle='#9bd9d0';c.fillText('WEIYANG  |  MEDICAL EXPLORATION',20,61);
  c.strokeStyle='#65f3b3';c.lineWidth=4;c.shadowColor='#52e7a5';c.shadowBlur=10;c.beginPath();
  const shift=time*.19;
  for(let x=0;x<w;x+=2){const v=ecgWave(x/180-shift);const y=171-v*75;
   if(x===0)c.moveTo(x,y);else c.lineTo(x,y);
  }c.stroke();c.shadowBlur=0;
  c.fillStyle='#9bd9d0';c.font='16px sans-serif';c.fillText('心電圖互動展示・非真實醫療監測',20,237);
  ecgTexture.needsUpdate=true;
 }
 paintEcg(0);
 let ecgLast=0;
 function animateEcg(time){requestAnimationFrame(animateEcg);
  if(document.hidden||!room.scene.visible||time-ecgLast<40)return;
  ecgLast=time;paintEcg(time/1000);
 }
 requestAnimationFrame(animateEcg);
 add(new THREE.BoxGeometry(4.7,1.25,1.6),ivory,0,.65,6.2);
 add(new THREE.BoxGeometry(4.9,.13,1.7),gold,0,1.32,6.2);
 // Bun-haired guide: deliberately a firm assistant, not a clinician.
 const guide=new THREE.Group();guide.position.set(3,0,5.2);root.add(guide);
 const gadd=(g,m,x,y,z)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);guide.add(o);return o};
 gadd(new THREE.CylinderGeometry(.53,.65,1.6,18),mat(0xe8a6c1),0,1.35,0);
 gadd(new THREE.SphereGeometry(.54,20,14),mat(0xf2c7aa),0,2.55,0);
 gadd(new THREE.SphereGeometry(.56,20,14),mat(0x674331),0,2.96,-.12);
 gadd(new THREE.SphereGeometry(.38,16,12),mat(0x674331),0,3.29,-.28);
 for(const x of [-.26,.26])gadd(new THREE.SphereGeometry(.055,8,8),navy,x,2.57,.49);
 // Administrative records display; preserve clear center aisle.
 for(const x of [-8.5,-5.7]){
  add(new THREE.BoxGeometry(2.2,3.4,.3),gold,x,3.4,-8.72);
  add(new THREE.BoxGeometry(1.9,3.05,.32),glass,x,3.4,-8.52);
 }
 const sealTex=new THREE.TextureLoader().load('official-logo.png');sealTex.colorSpace=THREE.SRGBColorSpace;
 add(new THREE.PlaneGeometry(1.9,1.9),new THREE.MeshBasicMaterial({map:sealTex,transparent:true,side:THREE.DoubleSide}),0,5.65,-8.5);
 return {guide,screen};
}
export function createMedicalExperience(){
 const el=document.createElement('section');el.id='wyMedicalExperience';
 el.style.cssText='display:none;position:fixed;inset:auto 12px 74px 12px;z-index:80;max-width:520px;margin:auto;background:#fff9ee;color:#243e5b;border:2px solid #d3ae70;border-radius:16px;padding:14px;box-shadow:0 12px 35px #172b4760;font:14px/1.55 system-ui,sans-serif;max-height:68vh;overflow:auto';
 el.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font-size:16px">🏥 德威陽｜醫療法律探索館</b><button id="medClose" type="button">×</button></div><p id="medIntro">薪水掌門人：歡迎來到醫療法律探索館！請先看看室內正在跳動的綠色心電圖。這是互動展示，不是真實醫療數據；一場醫療事件發生後，病患與醫師都需要重視安全、紀錄與法律權益。</p><div style="display:flex;gap:8px"><button id="medPatient" type="button">我是病患／家屬</button><button id="medDoctor" type="button">我是醫師／院方</button></div><p style="margin:8px 0;font-size:12px;color:#496d80">💚 室內 3D 心電監測螢幕會持續顯示跳動波形；選擇身分即可展開醫療事件劇場。</p><div id="medScene" style="margin-top:10px"></div><div id="medAdmin" style="margin-top:12px"><button id="medAdminBtn" type="button">🏛️ 探索醫療行政爭議</button><div id="medAdminText" hidden>健保給付、醫事人員及醫療機構行政處分，與一般醫療損害賠償案件不同；應確認處分內容、救濟期間及相關紀錄。</div></div><hr style="border:0;border-top:1px solid #d9b77d"><p style="margin:7px 0">德威陽國際法律事務所｜林柏均律師（台灣及紐約州律師）<br>Emory University LL.M.｜University of La Verne MBA</p><a href="https://line.me/R/ti/p/@wylaw" target="_blank" rel="noopener" style="display:inline-block;background:#1d3858;color:white;padding:8px 14px;border-radius:9px;text-decoration:none">LINE 聯繫德威陽｜@wylaw</a>';
 document.body.append(el);
 const $=id=>el.querySelector('#'+id);
 const data=[{q:'手術後發生非預期併發症，你會先做什麼？',a:['先確認病患安全與必要醫療處置','先認定一定有人犯錯'],note:'優先處理醫療安全。非預期結果不當然等於醫療過失。'},{q:'病情穩定後，要如何釐清事實？',a:['依法取得或完整保存病歷、同意書及檢查資料','只憑口頭記憶即可'],note:'完整病歷、時間軸與相關紀錄，是雙方釐清爭議的基礎。'},{q:'雙方仍有不同看法，接下來呢？',a:['透過適當溝通、調解與專業評估釐清','不看證據直接認定責任'],note:'應依事實、證據、醫療專業及適用法律評估處理途徑。'}];
 let role='',step=0;
 function render(){const d=data[step];$('medScene').innerHTML=`<div style="background:#e8f1f6;border-radius:9px;padding:10px"><b>${role==='doctor'?'醫師／院方':'病患／家屬'}｜第 ${step+1} 幕</b><p>${d.q}</p>${d.a.map((a,i)=>`<button data-choice="${i}" style="display:block;width:100%;text-align:left;margin:6px 0;padding:9px;background:#fff;border:1px solid #b9cbd5;border-radius:8px">${i+1}. ${a}</button>`).join('')}<div id="medFeedback"></div></div>`;
 $('medScene').querySelectorAll('[data-choice]').forEach(btn=>btn.onclick=()=>{$('medFeedback').innerHTML=`<p><b>${btn.dataset.choice==='0'?'這是較適當的處理方向':'請再想想處理的優先順序'}</b><br>${d.note}</p><button id="medNext">${step===2?'重新體驗':'下一幕 →'}</button>`;$('medNext').onclick=()=>{step=(step+1)%3;render()}})}
 $('medPatient').onclick=()=>{role='patient';step=0;render()};$('medDoctor').onclick=()=>{role='doctor';step=0;render()};
 $('medAdminBtn').onclick=()=>{$('medAdminText').hidden=!$('medAdminText').hidden};$('medClose').onclick=()=>el.style.display='none';
 return {show(){el.style.display='block'},hide(){el.style.display='none'}};
}
