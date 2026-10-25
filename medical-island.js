// WEIYANG medical island — standalone exterior and interior module.
// All medical geometry and interaction live here; castle.js is untouched.
export function createMedicalExterior(group, THREE){
 const ivory=new THREE.MeshStandardMaterial({color:0xfff9ee,roughness:.62});
 const blue=new THREE.MeshStandardMaterial({color:0x5c9ccf,metalness:.18,roughness:.33});
 const gold=new THREE.MeshStandardMaterial({color:0xd8b16b,metalness:.55,roughness:.3});
 const glass=new THREE.MeshPhysicalMaterial({color:0xbce9f6,transparent:true,opacity:.72,roughness:.13,metalness:.08});
 const pink=new THREE.MeshStandardMaterial({color:0xf6d4e3,roughness:.7});
 const add=(geo,mat,x,y,z,parent=group)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);parent.add(o);return o};
 // Modern high-end healthcare pavilion: rounded glass towers, luminous dome, no pagoda roof.
 const silver=new THREE.MeshStandardMaterial({color:0xf8fcff,roughness:.32,metalness:.12});
 const champagne=new THREE.MeshStandardMaterial({color:0xd9bf91,roughness:.24,metalness:.67});
 const teal=new THREE.MeshStandardMaterial({color:0x52b4c4,emissive:0x174a63,emissiveIntensity:.14,roughness:.25});
 const cylinder=(r,h,x,y,z,mat=glass)=>add(new THREE.CylinderGeometry(r,r,h,48),mat,x,y,z);
 cylinder(15.2,.32,0,.19,0,ivory);
 add(new THREE.BoxGeometry(17.5,7.8,11.7),silver,0,4,-1.8);
 add(new THREE.BoxGeometry(18.4,.23,12.3),champagne,0,8,-1.8);
 // Glass drum and elegant transparent hemispherical dome.
 cylinder(5.9,3.7,0,9.95,-1.8);
 add(new THREE.SphereGeometry(5.9,40,24,0,Math.PI*2,0,Math.PI/2),glass,0,11.75,-1.8);
 cylinder(6.08,.24,0,8.1,-1.8,champagne);
 for(let k=0;k<12;k++){const a=k*Math.PI/6;cylinder(.065,3.8,5.88*Math.sin(a),9.95,-1.8+5.88*Math.cos(a),champagne);}
 // Twin contemporary glazed rotundas, intentionally not historic towers.
 for(const side of [-1,1]){
  cylinder(3.05,10.2,side*9.15,5.3,-2.1);
  cylinder(3.22,.22,side*9.15,10.55,-2.1,champagne);
  for(let k=0;k<10;k++){const a=k*Math.PI/5;cylinder(.06,9.6,side*9.15+3.05*Math.sin(a),5.3,-2.1+3.05*Math.cos(a),champagne);}
  add(new THREE.BoxGeometry(6,.25,4.6),silver,side*8.25,3.1,5.05);
  add(new THREE.BoxGeometry(6,.12,4.6),champagne,side*8.25,3.31,5.05);
 }
 for(const x of [-6.4,-4.1,4.1,6.4]){
  add(new THREE.BoxGeometry(1.75,4.5,.12),glass,x,4.45,4.13);
  add(new THREE.BoxGeometry(.09,4.7,.2),champagne,x-.9,4.45,4.23);
 }
 // Broad glazed doorway, unmistakably accessible from the rainbow bridge.
 const door=add(new THREE.BoxGeometry(5.7,5.45,.2),glass,0,2.85,4.24);
 door.userData.medicalDoor=true;
 for(const x of [-2.9,0,2.9])add(new THREE.BoxGeometry(.12,5.6,.26),champagne,x,2.85,4.4);
 add(new THREE.BoxGeometry(6.1,.17,.33),champagne,0,5.69,4.4);
 const cross=(x,y,z,scale)=>{
  add(new THREE.CircleGeometry(.9*scale,32),glass,x,y,z);
  add(new THREE.BoxGeometry(.29*scale,1.1*scale,.12),teal,x,y,z+.12);
  add(new THREE.BoxGeometry(1.1*scale,.29*scale,.12),teal,x,y,z+.12);
 };
 cross(-5.6,7.15,4.25,.9);cross(5.6,7.15,4.25,.9);
 // Flat, unobstructed pedestrian forecourt, no fence across the approach.
 add(new THREE.BoxGeometry(8.5,.14,12),ivory,0,.35,10.2);
 for(const x of [-5.1,5.1])for(const z of [8.5,12]){
  cylinder(.1,.7,x,.7,z,champagne);
  add(new THREE.SphereGeometry(.27,14,12),glass,x,1.17,z);
 }
 // Original, unchanged WEIYANG image faces the approach (+Z), in front of facade.
 const tex=new THREE.TextureLoader().load('official-logo.png');tex.colorSpace=THREE.SRGBColorSpace;
 const crest=add(new THREE.CircleGeometry(1.78,64),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide,depthTest:false,depthWrite:false}),0,7.3,4.63);
 crest.renderOrder=60;
 const rim=add(new THREE.TorusGeometry(1.87,.10,12,64),gold,0,7.3,4.56);rim.renderOrder=59;
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
 // Real animated chibi characters (short limbs, oversized heads), not static mannequins.
 const skin=mat(0xf4cdb4),hair=mat(0x634435),dress=mat(0xe7a8bf),white=mat(0xf8f8f6);
 const people=[];
 function chibi(x,z,color,bun=false){
  const g=new THREE.Group();g.position.set(x,0,z);root.add(g);
  const mesh=(geo,m,px,py,pz,parent=g)=>{const o=new THREE.Mesh(geo,m);o.position.set(px,py,pz);parent.add(o);return o};
  mesh(new THREE.CylinderGeometry(.42,.53,.9,18),mat(color),0,.94,0);
  mesh(new THREE.SphereGeometry(.75,24,16),skin,0,1.98,0);
  mesh(new THREE.SphereGeometry(.76,24,16,0,Math.PI*2,0,Math.PI*.48),hair,0,2.13,0);
  if(bun)mesh(new THREE.SphereGeometry(.35,16,12),hair,0,2.67,-.3);
  for(const sx of [-1,1]){
   const arm=mesh(new THREE.CapsuleGeometry(.14,.37,5,8),skin,sx*.53,1.0,0);arm.rotation.z=sx*.22;
   const leg=mesh(new THREE.CapsuleGeometry(.16,.34,5,8),mat(0x314963),sx*.22,.32,0);
   if(sx===-1)g.userData.leftLeg=leg;else g.userData.rightLeg=leg;
   mesh(new THREE.SphereGeometry(.075,10,8),navy,sx*.28,2.02,.68);
  }
  people.push({g,homeX:x,homeZ:z,phase:people.length*1.7,roam:!bun});return g;
 }
 const guide=chibi(4.7,5.2,0xe7a8bf,true);
 chibi(-6.5,1.7,0xd7e8f0);chibi(6.8,-1.2,0xadcbdc);chibi(-4.5,-5.5,0xf2d4c1);
 const animation=(time)=>{for(const p of people){if(!p.roam)continue;
  const t=time*.00033+p.phase;p.g.position.x=p.homeX+Math.sin(t)*1.2;
  p.g.position.z=p.homeZ+Math.cos(t*.83)*1.05;
  p.g.rotation.y=Math.atan2(Math.cos(t),-Math.sin(t*.83));
  p.g.userData.leftLeg.rotation.x=Math.sin(time*.006+p.phase)*.28;
  p.g.userData.rightLeg.rotation.x=-Math.sin(time*.006+p.phase)*.28;
 }};
 const interactionTargets=[];
 const makePanel=(x,y,z,w,h,zone)=>{const panel=add(new THREE.BoxGeometry(w,h,.18),glass,x,y,z);
  panel.userData.medicalZone=zone;interactionTargets.push(panel);
  add(new THREE.BoxGeometry(w+.2,.1,.3),gold,x,y+h/2,z);return panel;};
 makePanel(-5.2,4.1,-8.15,4.3,3.2,'scenario');
 makePanel(0,4.1,-8.15,4.3,3.2,'admin');
 makePanel(5.2,4.1,-8.15,4.3,3.2,'lawyer');
 // Hover-free, deliberate interactive objects; no modal on entering.
 // Administrative records display; preserve clear center aisle.
 for(const x of [-8.5,-5.7]){
  add(new THREE.BoxGeometry(2.2,3.4,.3),gold,x,3.4,-8.72);
  add(new THREE.BoxGeometry(1.9,3.05,.32),glass,x,3.4,-8.52);
 }
 const sealTex=new THREE.TextureLoader().load('official-logo.png');sealTex.colorSpace=THREE.SRGBColorSpace;
 add(new THREE.PlaneGeometry(1.9,1.9),new THREE.MeshBasicMaterial({map:sealTex,transparent:true,side:THREE.DoubleSide}),0,5.65,-8.5);
 return {guide,screen,interactionTargets,animation};
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
 return {show(){el.style.display='none'},open(){el.style.display='block'},hide(){el.style.display='none'}};
}
