// WEIYANG Family Island v63 — intentionally simple, mobile-friendly low-poly scene.
export function createFamilyInterior(scene, THREE){
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
 for(const x of [-8,-6.6,-5.2])cyl(.43,.4,x,.3,-1.7,wood);
 // Children: simple toy box, rug and blocks.
 box(6.5,.06,5.1,7.2,.04,-4.6,blush);box(2.9,1.65,2.15,6.9,.85,-4.8,pink,'child');box(3.1,.19,2.35,6.9,1.76,-4.8,cream,'child');
 for(const [x,z,m] of [[5.5,-2.9,gold],[8.8,-3.3,sage],[8.4,-6.4,wood]])box(.65,.65,.65,x,.4,z,m);
 // Family remembrance: low console and large portrait frame on rear/right wall.
 box(4.9,1.5,1.3,-7.3,.75,4.5,walnut,'heritage');box(1.1,.12,.7,-7.3,1.57,4.5,white);box(1.6,2.1,.12,-10.6,4.7,4.2,gold);box(1.3,1.8,.14,-10.48,4.7,4.2,blush);
 // Protection telephone table and oversized burgundy telephone.
 box(3,1.2,2.2,8,.62,4.6,cream,'protect');box(1.7,.5,1.2,8,1.43,4.6,wine,'protect');cyl(.43,.16,8,1.78,4.6,gold);box(.9,.35,.4,8,1.95,4.6,wine);cyl(.35,.12,9.1,1.4,4.2,gold);
 // Central cream L-shaped sofa and table; single reception interaction.
 box(8.8,.06,6.3,0,.06,1.7,blush);box(6.8,1.15,1.65,-.7,.8,.7,cream,'sofa');box(1.7,1.15,4.5,3.45,.8,2.05,cream,'sofa');box(6.8,1.1,.45,-.7,1.5,-.05,cream);box(.45,1.1,4.5,4.05,1.5,2.05,cream);
 box(.9,.25,.8,-1,1.45,.65,wine);box(.9,.25,.8,2.9,1.45,1.5,pink);cyl(1.25,.43,-.4,.35,3.3,walnut);
 // Short-haired receptionist in a BLACK T-shirt, intentionally simple and recognizable.
 const black=mat('#22242A'),skin=mat('#E9B79D'),hair=mat('#3C302D');
 cyl(.48,1.45,4.9,1.65,1.1,black);sphere(.47,4.9,2.67,1.1,skin);box(.92,.36,.65,4.9,2.96,1.1,hair);
 for(const x of [4.5,5.3]){box(.24,1.1,.3,x,.52,1.1,black);box(.26,.8,.3,x,1.8,1.1,skin);}
 const boyHit=box(1.65,3.6,1.6,4.9,1.8,1.1,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),'staff');
 // Large invisible tap areas improve mobile touch targeting.
 const invisible=new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});
 box(7,3.4,3.4,-6.6,1.7,-3.7,invisible,'kitchen');box(4.6,3.1,4.2,7,1.5,-4.8,invisible,'child');box(6,3.4,2.6,-7.3,1.7,4.5,invisible,'heritage');box(4.1,3.3,3.1,8,1.7,4.6,invisible,'protect');box(9.5,3.1,6.5,0,1.6,1.7,invisible,'sofa');
 return {targets,root};
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
 let staffIndex=0;const staffLines=['歡迎來家庭島！每個角落都有故事喔！','孩子跟誰住？可不是猜拳決定！','遺囑寫好了，就一定有效嗎？','家人的安全，比什麼都重要。'];function open(action){el.style.display='block';if(action==='sofa')desk();else if(action==='staff'){title.textContent='德威陽｜家庭島接待';body.textContent=staffLines[staffIndex++%staffLines.length];choices.replaceChildren();button('了解家事法律諮詢',desk);}else quiz(action);}
 return {open,hide:()=>el.style.display='none'};
}
