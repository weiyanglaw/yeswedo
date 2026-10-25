// WEIYANG medical island — standalone exterior and interior module.
// All medical geometry and interaction live here; castle.js is untouched.
export function createMedicalExterior(group, THREE){
 const ivory=new THREE.MeshStandardMaterial({color:0xfff7e9,roughness:.65}),blue=new THREE.MeshStandardMaterial({color:0x72a9d3,metalness:.16,roughness:.35}),gold=new THREE.MeshStandardMaterial({color:0xd9b67c,metalness:.65,roughness:.3});
 const add=(geo,mat,x,y,z)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);group.add(o);return o};
 // Freestanding branded medical pavilion facade, forward of the legacy GLB.
 add(new THREE.BoxGeometry(13,7,1.1),ivory,0,4,-5.5);
 add(new THREE.BoxGeometry(14,.35,1.5),gold,0,7.65,-5.5);
 for(const x of [-5.8,5.8]){add(new THREE.CylinderGeometry(.35,.42,6.3,16),ivory,x,3.4,-4.7);add(new THREE.SphereGeometry(.44,16,12),gold,x,6.8,-4.7)}
 const door=add(new THREE.BoxGeometry(3.6,4.7,.28),blue,0,2.55,-4.72);
 for(const x of [-1.6,1.6])add(new THREE.BoxGeometry(.1,4.7,.33),gold,x,2.55,-4.53);
 const tex=new THREE.TextureLoader().load('official-logo.png');tex.colorSpace=THREE.SRGBColorSpace;
 const crest=add(new THREE.CircleGeometry(1.55,64),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide,depthTest:false,depthWrite:false}),0,9.4,-4.02);
 crest.renderOrder=60;
 const rim=add(new THREE.TorusGeometry(1.65,.085,12,64),gold,0,9.4,-4.09);rim.renderOrder=59;
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
 el.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font-size:16px">🏥 德威陽｜醫療法律探索館</b><button id="medClose" type="button">×</button></div><p id="medIntro">薪水掌門人：歡迎來到醫療法律探索館！醫療爭議不論站在哪一方，事實與證據都很重要。</p><div style="display:flex;gap:8px"><button id="medPatient" type="button">我是病患／家屬</button><button id="medDoctor" type="button">我是醫師／院方</button></div><div id="medScene" style="margin-top:10px"></div><div id="medAdmin" style="margin-top:12px"><button id="medAdminBtn" type="button">🏛️ 探索醫療行政爭議</button><div id="medAdminText" hidden>健保給付、醫事人員及醫療機構行政處分，與一般醫療損害賠償案件不同；應確認處分內容、救濟期間及相關紀錄。</div></div><hr style="border:0;border-top:1px solid #d9b77d"><p style="margin:7px 0">德威陽國際法律事務所｜林柏均律師（台灣及紐約州律師）<br>Emory University LL.M.｜University of La Verne MBA</p><a href="https://line.me/R/ti/p/@wylaw" target="_blank" rel="noopener" style="display:inline-block;background:#1d3858;color:white;padding:8px 14px;border-radius:9px;text-decoration:none">LINE 聯繫德威陽｜@wylaw</a>';
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
