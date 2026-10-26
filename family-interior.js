// WEIYANG Family Island v63 — intentionally simple, mobile-friendly low-poly scene.
export function createFamilyInterior(scene, THREE, makeStaffChibi){
 const root=new THREE.Group();root.name='FamilyOpenPlan';scene.add(root);
 const mat=(c)=>new THREE.MeshStandardMaterial({color:c,roughness:.82});
 const cream=mat('#F7F0E5'),pink=mat('#D9B6B9'),blush=mat('#F4DFE4'),wine=mat('#773D49'),gold=mat('#D5B77A'),wood=mat('#B89B80'),walnut=mat('#9C7557'),white=mat('#FFF8F7'),sage=mat('#B7C7B2');
 const targets=[];
 function box(w,h,d,x,y,z,m,action){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);root.add(o);if(action){o.userData.familyAction=action;targets.push(o);}return o;}
 function cyl(r,h,x,y,z,m){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,16),m);o.position.set(x,y,z);root.add(o);return o;}
 function sphere(r,x,y,z,m){const o=new THREE.Mesh(new THREE.SphereGeometry(r,12,8),m);o.position.set(x,y,z);root.add(o);return o;}
 // Flat, uninterrupted floor. NO stairs, slopes, inner rooms or partitions.
 box(23.5,.2,18.5,0,-.12,0,mat('#D9C4A8'));
 // Simple window frames along existing outer walls.
 for(const x of [-8,8]){box(2.5,3,.1,x,5,-8.9,wood);box(2.25,2.7,.13,x,5,-8.82,mat('#DCEAF0'));box(.09,2.7,.16,x,5,-8.72,cream);box(2.25,.09,.16,x,5,-8.72,cream);}
 for(const z of [-4.5,4.5]){for(const x of [-11.65,11.65]){box(.12,2.9,2.1,x,4.8,z,wood);box(.14,2.6,1.9,x,4.8,z,mat('#DCEAF0'));}}
 // Burgundy branded feature is attached directly to the EXISTING rear wall, no new partition.
 box(6.2,5.2,.14,0,5.35,-8.94,wine);box(6.35,.10,.22,0,7.96,-8.83,gold);box(6.35,.10,.22,0,2.75,-8.83,gold);
 // Exact original logo texture loaded from bundled file; not redrawn.
 const loader=new THREE.TextureLoader();loader.load('./office-logo-transparent.png',tex=>{tex.colorSpace=THREE.SRGBColorSpace;const p=new THREE.Mesh(new THREE.PlaneGeometry(3.7,3.7),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide,depthWrite:false}));p.position.set(0,5.3,-8.82);root.add(p);});
 // Marriage kitchen, left rear.
 box(8,.25,1.5,-7.0,.9,-7.8,cream);for(const x of [-10,-8,-6,-4.4])box(1.7,2.3,1,-x+(-14),2.4,-8.1,cream);
 box(5.4,1.45,2.35,-6.6,.73,-3.7,pink,'kitchen');box(5.7,.18,2.55,-6.6,1.54,-3.7,white,'kitchen');
 for(const x of [-8,-6.6,-5.2]){cyl(.43,.4,x,.55,-1.7,wood);box(.85,.12,.75,x,.84,-1.7,white);box(.85,.85,.12,x,1.22,-1.36,cream);}
 // Sink and hob make the kitchen recognisable.
 box(1.2,.035,.7,-7.9,1.66,-3.7,wood);cyl(.12,.35,-8.1,1.9,-3.8,gold);
 for(const x of [-5.7,-5.1])cyl(.24,.035,x,1.66,-3.7,walnut);
 for(const x of [-9.6,-7.9,-6.2,-4.5])box(.08,.4,.08,x,2.35,-7.5,gold);
 // Children: simple toy box, rug and blocks.
 box(6.5,.06,5.1,7.2,.04,-4.6,blush);box(2.9,1.65,2.15,6.9,.85,-4.8,pink,'child');box(3.1,.19,2.35,6.9,1.76,-4.8,cream,'child');
 for(const [x,z,m] of [[5.5,-2.9,gold],[8.8,-3.3,sage],[8.4,-6.4,wood]])box(.65,.65,.65,x,.4,z,m);
 // Toy-chest handle and large teddy bear.
 box(.85,.14,.09,6.9,1.25,-3.59,gold);
 sphere(.7,9.15,1.15,-6.1,wood);sphere(.54,9.15,2.03,-6.1,wood);
 sphere(.22,8.77,2.47,-6.12,wood);sphere(.22,9.53,2.47,-6.12,wood);
 sphere(.11,9.0,2.09,-5.62,walnut);sphere(.11,9.32,2.09,-5.62,walnut);
 // v67: tall inheritance library and adjacent writing desk, replacing the low console.
 const libraryWood=mat('#74505B'),bookPaper=mat('#F1E5D7'),bookNavy=mat('#344D68');
 box(4.9,5.25,.95,-8.0,2.66,5.6,libraryWood,'heritage');
 for(const y of [.50,1.65,2.8,3.95,5.05])box(4.75,.13,1.06,-8.0,y,5.6,gold,'heritage');
 for(let shelf=0;shelf<4;shelf++)for(let i=0;i<9;i++){
   const x=-10.0+i*.48,yy=.76+shelf*1.13;
   box(.28,.68+(i%3)*.11,.66,x,yy,5.61,i%3===0?wine:i%3===1?bookPaper:bookNavy,'heritage');
   box(.04,.50,.69,x+.07,yy,5.62,gold);
 }
 // Adjacent desk, chair and clearly visible will document.
 box(3.2,.24,1.65,-5.4,1.33,5.35,white,'heritage');
 for(const x of [-6.72,-4.10])for(const z of [4.77,5.95])box(.16,1.19,.16,x,.63,z,libraryWood);
 box(1.18,.035,.78,-5.7,1.48,5.3,bookPaper,'heritage');
 for(let j=0;j<4;j++)box(.76,.018,.03,-5.7,1.51,5.08+j*.15,libraryWood);
 box(.08,.08,.85,-4.5,1.52,5.18,bookNavy);
 box(1.15,.18,1.1,-5.2,.60,7.1,libraryWood);
 for(const x of [-5.65,-4.75])for(const z of [6.65,7.53])box(.10,.55,.10,x,.28,z,libraryWood);
 box(1.14,1.28,.18,-5.2,1.25,7.62,libraryWood);
 // v67: oversized legible rotary telephone, with receiver and dial facing the visitor.
 box(3.6,1.14,2.8,8.1,.57,4.9,cream,'protect');
 box(2.7,.20,2.0,8.1,1.23,4.9,white,'protect');
 const phoneShell=box(2.40,.72,1.48,8.1,1.66,4.75,wine,'protect');
 box(2.05,.14,1.28,8.1,2.04,4.75,mat('#A65C70'),'protect');
 // Dial disk stands vertically at the front, with ten contrasting finger holes.
 const dial=cyl(.64,.09,8.1,1.72,3.93,bookPaper);dial.rotation.x=Math.PI/2;dial.userData.familyAction='protect';targets.push(dial);
 const dialCore=cyl(.22,.11,8.1,1.72,3.86,gold);dialCore.rotation.x=Math.PI/2;
 for(let k=0;k<10;k++){const a=k*Math.PI*2/10;
   sphere(.088,8.1+Math.cos(a)*.43,1.72+Math.sin(a)*.43,3.82,wine);
 }
 // Curved handset built from a segmented 3D tube, not an unrecognisable rectangular bar.
 const pts=[];for(let i=0;i<=12;i++){const t=i/12;pts.push(new THREE.Vector3(7.0+2.2*t,2.60+.35*Math.sin(Math.PI*t),4.65));}
 const handset=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),20,.16,9,false),wine);root.add(handset);handset.userData.familyAction='protect';targets.push(handset);
 for(const x of [7.0,9.2]){const cup=cyl(.33,.38,x,2.47,4.65,wine);cup.userData.familyAction='protect';targets.push(cup);}
 // Central cream L-shaped sofa and table; single reception interaction.
 box(8.8,.06,6.3,0,.06,1.7,blush);box(6.8,1.15,1.65,-.7,.8,.7,cream,'sofa');box(1.7,1.15,4.5,3.45,.8,2.05,cream,'sofa');box(6.8,1.1,.45,-.7,1.5,-.05,cream);box(.45,1.1,4.5,4.05,1.5,2.05,cream);
 for(const x of [-2.8,-1.1,.6])box(1.75,.18,1.5,x,1.39,.72,white,'sofa');
 box(.9,.25,.8,-1,1.45,.65,wine);box(.9,.25,.8,2.9,1.45,1.5,pink);cyl(1.25,.43,-.4,.35,3.3,walnut);
 // EXACT same shared character constructor as the main office, black T-shirt.
 let walkingNpc=null;
 if(makeStaffChibi){const npc=makeStaffChibi({name:'哈姆太郎',kind:'short',skin:'#E9B79D',hair:'#3C302D',top:'#22242A',bottom:'#32333A'});npc.root.position.set(4.9,.05,1.1);root.add(npc.root);walkingNpc=npc.root;npc.root.traverse(o=>{if(o.isMesh){o.userData.familyAction='staff';targets.push(o);}});}
 const boyHit=box(1.7,3.5,1.6,4.9,1.75,1.1,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),'staff');
 // Floating labels match the medical island canvas resolution, font and dimensions.
 // v66: furniture details intentionally made from light-weight low-poly shapes.
 // Visible stove, hood, utensils and wall cabinets.
 box(2.1,.16,1.2,-5.6,1.67,-3.8,walnut);
 for(const x of [-6.2,-5.0])for(const z of [-4.2,-3.4]){cyl(.26,.025,x,1.77,z,wine);cyl(.16,.03,x,1.80,z,gold);}
 box(2.6,.32,1.25,-6.2,6.1,-8.1,cream);box(2.3,.18,1.1,-6.2,5.75,-8.1,gold);
 for(const x of [-9.4,-7.4,-5.4]){box(1.75,1.4,.65,x,4.25,-8.3,cream);box(.13,.48,.08,x+.62,4.2,-7.92,gold);}
 // Faucet arches over inset dark sink, with a distinct spout.
 box(1.2,.045,.82,-8.15,1.7,-3.75,mat('#899FA1'));
 const faucet=cyl(.055,.72,-8.4,2.02,-3.85,gold);box(.5,.09,.09,-8.2,2.38,-3.85,gold);
 // v67 play zone: recognisable stuffed bunny, teddy, train and toy car.
 const toyBrown=mat('#C6A08B'),toyPink=mat('#F0BFC8'),toyBlue=mat('#7FA9C8');
 function plush(x,z,m,bunny=false){
  sphere(.48,x,.68,z,m);sphere(.42,x,1.42,z,m);
  for(const dx of [-.31,.31]){
   sphere(.20,x+dx,1.77,z,m);sphere(.22,x+dx,.30,z+.08,m);
   sphere(.18,x+dx*.96,.94,z+.05,m);
   sphere(.055,x+dx*.65,1.48,z+.36,walnut);
  }
  sphere(.10,x,1.30,z+.40,walnut);
  if(bunny)for(const dx of [-.25,.25]){const ear=box(.23,.75,.24,x+dx,2.13,z,m);ear.rotation.z=dx>0?-.17:.17;}
 }
 plush(9.1,-6.15,toyBrown);plush(5.3,-6.45,toyPink,true);
 // Car body, windscreen and four clearly visible wheels.
 box(1.32,.38,.76,8.8,.35,-2.65,toyBlue);
 box(.70,.34,.63,8.73,.66,-2.65,white);
 for(const x of [8.32,9.25])for(const z of [-2.22,-3.08]){
  const w=cyl(.23,.14,x,.23,z,walnut);w.rotation.x=Math.PI/2;
 }
 // Three-wagon train with wheels and a distinct locomotive smokestack.
 for(let i=0;i<3;i++){
  const x=5.6+i*.85;
  box(.69,.43,.72,x,.35,-2.55,i===0?wine: i===1?gold:toyBlue);
  for(const z of [-2.16,-2.94]){const w=cyl(.15,.11,x,.17,z,walnut);w.rotation.x=Math.PI/2;}
 }
 cyl(.13,.46,5.6,.82,-2.55,walnut);
 for(const [x,z,m] of [[6.0,-7.5,gold],[6.6,-7.5,sage],[7.2,-7.5,pink]])box(.52,.52,.52,x,.27,z,m);
 // Inheritance writing desk lamp, next to the bookcase.
 const lampStem=cyl(.055,.67,-4.2,1.85,5.25,gold);
 const shade=cyl(.34,.22,-4.2,2.24,5.25,white);
 // Softer cushions, clear armrests and low table legs.
 for(const x of [-3.2,-1.5,.2,1.9]){box(1.45,.33,1.34,x,1.45,.65,white);box(1.1,.75,.24,x,1.95,-.01,cream);}
 for(const x of [-1.1,.3])box(.8,.75,.24,x,1.8,.43,pink);
 for(const x of [-1.1,.3])for(const z of [2.55,4.05])cyl(.09,.55,x,.35,z,wood);
 const labels=[];
 function hint(text,x,y,z,action){
  const canvas=document.createElement('canvas');canvas.width=480;canvas.height=112;
  const c=canvas.getContext('2d');c.fillStyle='rgba(119,61,73,.97)';c.beginPath();c.roundRect(5,5,470,102,36);c.fill();
  c.strokeStyle='#D5B77A';c.lineWidth=6;c.stroke();c.fillStyle='#FFF8F7';c.textAlign='center';c.textBaseline='middle';c.font='bold 39px sans-serif';c.fillText(text,240,56,448);
  const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;
  const label=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}));label.position.set(x,y,z);label.scale.set(4.35,1.02,1);label.renderOrder=80;label.userData.familyAction=action;label.userData.baseY=y;root.add(label);targets.push(label);labels.push(label);
 }
 hint('婚姻家事',-6.6,3.0,-3.7,'kitchen');
 hint('親權扶養',7.0,3.25,-4.8,'child');
 hint('遺囑繼承',-7.3,3.4,4.5,'heritage');
 hint('家事保護',8.0,3.7,4.6,'protect');
 hint('德威陽諮詢',0,3.15,1.7,'sofa');
 const staffLabelText='哈姆太郎';hint(staffLabelText,4.9,3.45,1.1,'staff');
 // Large invisible tap areas improve mobile touch targeting.
 const invisible=new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});
 box(7,3.4,3.4,-6.6,1.7,-3.7,invisible,'kitchen');box(4.6,3.1,4.2,7,1.5,-4.8,invisible,'child');box(6,3.4,2.6,-7.3,1.7,4.5,invisible,'heritage');box(4.1,3.3,3.1,8,1.7,4.6,invisible,'protect');box(9.5,3.1,6.5,0,1.6,1.7,invisible,'sofa');
 // v67 waypoint walk: traverse clear corridor and stop to work, not spin in place.
 const staffLabel=labels[labels.length-1];
 const route=[[4.9,1.1],[5.0,3.9],[2.0,5.3],[-2.1,5.1],[-2.3,3.6],[.7,3.7],[3.1,4.2],[5.0,3.9]];
 let nextPoint=1,lastTime=null,pause=0,walkPhase=0;
 function animation(time){
  if(!walkingNpc)return;
  const dt=lastTime===null?0:Math.min(.05,Math.max(0,(time-lastTime)/1000));lastTime=time;
  if(pause>0){pause-=dt;walkingNpc.position.y=.05;}
  else{
   const target=route[nextPoint],dx=target[0]-walkingNpc.position.x,dz=target[1]-walkingNpc.position.z;
   const dist=Math.hypot(dx,dz);
   if(dist<.12){nextPoint=(nextPoint+1)%route.length;pause=1.3;}
   else{
    const step=Math.min(dist,dt*1.1),vx=dx/dist,vz=dz/dist;
    walkingNpc.position.x+=vx*step;walkingNpc.position.z+=vz*step;
    walkingNpc.rotation.y=Math.atan2(vx,vz);walkPhase+=dt*10;
    walkingNpc.position.y=.05+Math.abs(Math.sin(walkPhase))*.055;
   }
  }
  boyHit.position.x=walkingNpc.position.x;boyHit.position.z=walkingNpc.position.z;
  staffLabel.position.x=walkingNpc.position.x;staffLabel.position.z=walkingNpc.position.z;
  staffLabel.position.y=3.45+Math.sin(time*.0018)*.06;
 }
 return {targets,root,labels,animation};
}

export function createFamilyExperience(){
 const questions={
 kitchen:{title:'婚姻廚房｜夫妻財產',q:'丈夫婚前存款200萬元，婚後用這筆錢購屋。離婚時，這筆款項如何處理？',options:['A．婚後買房就全部算婚後財產','B．須追查資金來源及適用財產制，再計算','C．另一方當然可以直接拿走100萬元'],correct:1,explain:'婚前財產及其變形、婚後財產的認定與剩餘財產差額分配，須依財產制、資金來源與證據判斷。'},
 child:{title:'親子生活區｜扶養費',q:'離婚協議每月扶養費1萬元，後來孩子有重大醫療需求，可以要求調整嗎？',options:['A．協議後一律不能更改','B．只要想增加就一定成功','C．情事變更時可依法請求調整'],correct:2,explain:'扶養費應考量子女需求、父母經濟能力及情事變更；必要時可依法聲請調整。'},
 heritage:{title:'家族紀念區｜拋棄繼承',q:'父親過世後，兒子只口頭表示不繼承，四個月後債權人來催討。何者較正確？',options:['A．口頭表示就完成拋棄繼承','B．拋棄繼承原則上須於知悉得繼承起三個月內向法院為之','C．所有債務一律要用自己財產全額清償'],correct:1,explain:'拋棄繼承有法定期限與法院程序；未拋棄時，繼承債務原則上以所得遺產為限負清償責任。'},
 protect:{title:'家庭守護區｜扶養義務',q:'父親長期無正當理由未扶養孩子，年老後要求孩子扶養，孩子能直接拒絕嗎？',options:['A．可以自行宣布永遠免除','B．無論如何都不能減免','C．符合條件時可請法院減輕或免除'],correct:2,explain:'依民法相關規定，若符合特定重大情事，可由法院依法減輕或免除扶養義務，不能只憑單方宣告。'}
 };
 const el=document.createElement('section');el.id='wyFamilyExperience';el.style.cssText='display:none;position:fixed;left:50%;transform:translateX(-50%);bottom:78px;z-index:85;width:min(92vw,440px);max-height:68dvh;overflow-y:auto;background:#F4DFE4;color:#713F4C;border:2px solid #D2AD77;border-radius:18px;padding:14px;box-shadow:0 15px 38px #33212b66;font:14px/1.6 system-ui,sans-serif';
 el.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b id="wyFamilyTitle"></b><button id="wyFamilyClose" aria-label="關閉">✕</button></div><p id="wyFamilyBody" style="margin:12px 0"></p><div id="wyFamilyChoices" style="display:grid;gap:7px"></div><small style="display:block;margin-top:10px;color:#8C6872">德威陽｜有法度・一般法律資訊，個案仍需評估</small>';
 document.body.append(el);const title=el.querySelector('#wyFamilyTitle'),body=el.querySelector('#wyFamilyBody'),choices=el.querySelector('#wyFamilyChoices');el.querySelector('#wyFamilyClose').onclick=()=>el.style.display='none';
 function button(label,fn){const b=document.createElement('button');b.textContent=label;b.style.cssText='width:100%;text-align:left;background:#FFF8F7;border:1px solid #DBB8C0;border-radius:10px;padding:10px 12px;color:#713F4C;font-weight:650;cursor:pointer';b.onclick=fn;choices.append(b);}
 function quiz(k){const q=questions[k];title.textContent=q.title;body.textContent=q.q;choices.replaceChildren();q.options.forEach((opt,i)=>button(opt,()=>{body.textContent=(i===q.correct?'答對了！':'這個選項不太正確。')+'\n'+q.explain;choices.replaceChildren();button('再看一次題目',()=>quiz(k));button('返回探索',()=>el.style.display='none');}));}
 function contact(){title.textContent='德威陽｜聯絡資訊';body.textContent='點擊即可複製聯絡資料。';choices.replaceChildren();[['LINE','@wylaw'],['官網','weiandyang.com'],['Facebook','weiandyang'],['Instagram','weiyang_ceo']].forEach(([k,v])=>button(k+'｜'+v,()=>{navigator.clipboard?.writeText(v);body.textContent='已選取：'+v+'（可複製使用）';}));button('返回家事諮詢沙發',desk);}
 function desk(){title.textContent='家事法律諮詢沙發｜德威陽';body.textContent='歡迎來到德威陽，想先了解什麼？';choices.replaceChildren();button('婚姻／家庭法律需求',()=>{body.textContent='可先整理事件經過、婚姻及財產相關文件，再由律師評估適用法律與處理方式。';});button('親子／繼承法律需求',()=>{body.textContent='可先整理親權、扶養或繼承關係及相關證明文件，協助釐清案件需求。';});button('諮詢與委任流程',()=>{body.textContent='可先聯繫本所說明案件類型，安排諮詢後再確認委任範圍。';});button('聯絡資訊與複製',contact);}
 let staffIndex=0;const staffLines=['我是哈姆太郎，歡迎探索家事法律！','想了解夫妻財產？點擊婚姻廚房。','子女扶養與親權，請看玩具箱。','遺囑與繼承爭議，可探索書櫃。','家庭安全與保護令，點擊復古電話。','需要專業協助？歡迎點擊諮詢沙發。'];function open(action){el.style.display='block';if(action==='sofa')desk();else if(action==='staff'){title.textContent='哈姆太郎｜家事法律導覽';body.textContent=staffLines[staffIndex++%staffLines.length];choices.replaceChildren();button('了解家事法律諮詢',desk);}else quiz(action);}
 return {open,hide:()=>el.style.display='none'};
}
