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
export function createMedicalInterior(room,THREE,staffFactory){
 const root=room.scene;
 const material=(hex,metalness=0,roughness=.46)=>new THREE.MeshStandardMaterial({color:hex,metalness,roughness});
 const cream=material(0xf7f1e7),stone=material(0xe5e1da),gold=material(0xc8a66b,.78,.24),navy=material(0x142638,.24,.4),walnut=material(0x5b4138),velvet=material(0x325467),lightGold=material(0xf3dfb3,.4,.3);
 const glass=new THREE.MeshPhysicalMaterial({color:0xa8dce4,transparent:true,opacity:.37,metalness:.08,roughness:.12,depthWrite:false});
 const add=(geo,mat,x,y,z,parent=root)=>{const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);parent.add(mesh);return mesh};
 const box=(w,h,d,mat,x,y,z)=>add(new THREE.BoxGeometry(w,h,d),mat,x,y,z);
 const cyl=(rt,rb,h,mat,x,y,z)=>add(new THREE.CylinderGeometry(rt,rb,h,40),mat,x,y,z);
 // Purpose-built boutique reception: marble floor, gold inlays and uninterrupted central aisle.
 box(23.6,.1,18.6,stone,0,.02,0);
 for(const x of [-10.5,-6.5,-2.5,2.5,6.5,10.5])box(.022,.012,18.3,gold,x,.083,0);
 for(const z of [-7,-2,3,8])box(23,.012,.022,gold,0,.086,z);
 box(23.5,.20,.35,navy,0,8.45,-9.05);
 box(23.2,.13,.3,gold,0,8.24,-9.01);
 // Full-height navy identity wall with original logo, well ahead of back wall at z=-9.2.
 box(9.2,7.35,.24,navy,0,4.58,-8.90);
 box(8.82,6.97,.10,gold,0,4.58,-8.70);
 box(8.64,6.79,.11,navy,0,4.58,-8.60);
 const tex=new THREE.TextureLoader().load('office-logo-transparent.png');tex.colorSpace=THREE.SRGBColorSpace;
 const seal=add(new THREE.PlaneGeometry(5.3,5.3),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide,depthWrite:false,depthTest:true}),0,4.85,-8.45);
 seal.renderOrder=15;
 for(const x of [-5.1,5.1]){
  box(.10,6.9,.18,gold,x,4.58,-8.75);
  for(const y of [2.15,4.6,7.05]){
   box(3.7,.09,.18,gold,x<0?-8.0:8.0,y,-8.76);
  }
  box(3.35,5.8,.12,velvet,x<0?-8.0:8.0,4.65,-8.65);
 }
 // Curved marble reception desk; height deliberately below the logo and set forward.
 const desk=new THREE.Group();root.add(desk);desk.position.set(0,0,3.9);
 const front=add(new THREE.CylinderGeometry(3.55,3.45,1.28,64,1,false,0,Math.PI),cream,0,.76,0,desk);
 front.scale.z=.47;
 const top=add(new THREE.CylinderGeometry(3.78,3.78,.13,64,1,false,0,Math.PI),stone,0,1.48,0,desk);top.scale.z=.53;
 const rim=add(new THREE.TorusGeometry(3.61,.045,8,64,Math.PI),gold,0,1.23,0,desk);rim.rotation.x=Math.PI/2;rim.scale.y=.48;
 for(const x of [-2.8,2.8]){
  cyl(.11,.11,1.5,gold,x,.75,3.4);
  add(new THREE.SphereGeometry(.19,18,12),lightGold,x,1.62,3.4);
 }
 // Exactly one person: reuse the main island's actual STAFF generator, not the avatar creator.
 let guide=null;
 if(staffFactory){
  const result=staffFactory({name:'薪水掌門人',kind:'bun',skin:'#f4c9a6',hair:'#503529',top:'#e7a8bf',bottom:'#5b6b85'});
  guide=result.root||result;guide.position.set(4.8,0,4.0);guide.rotation.y=-.35;root.add(guide);
 }
 // Boutique seating and calm architectural details. No giant sculptures, no visitors.
 for(const x of [-8.3,8.3]){
  box(3.7,.52,1.75,velvet,x,.59,4.7);
  box(3.7,1.05,.35,velvet,x,1.21,3.94);
  for(const dx of [-1.64,1.64])box(.35,.68,1.75,velvet,x+dx,.92,4.7);
  box(3.9,.09,1.8,gold,x,.25,4.7);
  cyl(.75,.78,.47,walnut,x,.40,7.0);
  cyl(.82,.82,.07,gold,x,.68,7.0);
 }
 for(const x of [-10.2,10.2]){
  cyl(.42,.49,.5,cream,x,.29,-2.0);
  cyl(.055,.055,1.7,gold,x,1.35,-2.0);
  for(let k=0;k<7;k++){
   const a=k*Math.PI*2/7;
   const leaf=add(new THREE.SphereGeometry(.35,12,10),material(0x668c73),x+Math.cos(a)*.45,2.0+(k%3)*.15,-2+Math.sin(a)*.43);
   leaf.scale.set(.7,1.5,.7);
  }
 }
 // Display zones: gold-edged touch panels at accessible height, not covering the emblem.
 const interactionTargets=[];
 const display=(x,z,w,title)=>{
  box(w+0.2,2.35,.18,gold,x,3.15,z);
  box(w,2.17,.20,navy,x,3.15,z+.12);
  const cv=document.createElement('canvas');cv.width=768;cv.height=400;
  const c=cv.getContext('2d');c.fillStyle='#142638';c.fillRect(0,0,768,400);
  c.fillStyle='#e8c78c';c.textAlign='center';c.font='bold 46px sans-serif';c.fillText(title,384,165);
  c.fillStyle='#f8f0e1';c.font='29px sans-serif';c.fillText('輕觸開啟法律探索',384,235);
  const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;
  const panel=add(new THREE.PlaneGeometry(w-.14,2.0),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}),x,3.15,z+.24);
  interactionTargets.push(panel);
 };
 display(-7.7,-8.08,3.3,'醫療爭議');display(7.7,-8.08,3.3,'醫療行政救濟');
 // ECG screen: 72 BPM dynamic signal, framed as an actual exhibit on side wall.
 const canvas=document.createElement('canvas');canvas.width=640;canvas.height=256;const ctx=canvas.getContext('2d');
 const waveTex=new THREE.CanvasTexture(canvas);waveTex.colorSpace=THREE.SRGBColorSpace;
 box(4.65,2.4,.19,gold,8.0,4.3,-3.2);
 const wavePanel=add(new THREE.PlaneGeometry(4.43,2.18),new THREE.MeshBasicMaterial({map:waveTex,side:THREE.DoubleSide}),8,4.3,-3.07);
 interactionTargets.push(wavePanel);
 const spike=phase=>{let p=((phase%1)+1)%1;const points=[[0,0],[.16,0],[.21,.05],[.25,0],[.29,-.14],[.315,.84],[.335,-.33],[.38,0],[.53,0],[.62,.21],[.72,0],[1,0]];for(let j=1;j<points.length;j++)if(p<=points[j][0]){const a=points[j-1],b=points[j],r=(p-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*r}return 0};
 let last=0;
 const animation=(time)=>{
  if(guide){guide.position.x=4.8+Math.sin(time*.00045)*.14;guide.rotation.y=-.35+Math.sin(time*.0008)*.08;}
  if(time-last<55)return;last=time;
  ctx.fillStyle='#071c29';ctx.fillRect(0,0,640,256);
  ctx.strokeStyle='rgba(80,178,151,.16)';ctx.lineWidth=1;
  for(let x=0;x<640;x+=32){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,256);ctx.stroke()}
  for(let y=0;y<256;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(640,y);ctx.stroke()}
  ctx.fillStyle='#b6f3dc';ctx.font='bold 26px sans-serif';ctx.fillText('♥ 72 BPM',20,36);
  ctx.strokeStyle='#67edaf';ctx.lineWidth=3;ctx.beginPath();
  for(let x=0;x<640;x+=2){const y=165-spike(x/185-time*.0002)*74;x===0?ctx.moveTo(x,y):ctx.lineTo(x,y)}ctx.stroke();
  ctx.fillStyle='#a9d9d1';ctx.font='16px sans-serif';ctx.fillText('WEIYANG | 醫療法律探索展示',20,235);waveTex.needsUpdate=true;
 };
 const spot=new THREE.SpotLight(0xffdfab,3.5,18,Math.PI/4,.6);spot.position.set(0,8,0);spot.target.position.set(0,4.7,-8.5);root.add(spot,spot.target);
 for(const x of [-8,8]){const l=new THREE.PointLight(0xffe5c3,1.4,11);l.position.set(x,6.8,-4);root.add(l)}
 return {guide,interactionTargets,animation};
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
