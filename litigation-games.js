// Litigation island interactive entrances, v457. No scene geometry is modified.
export function openLitigationGame(kind){
 let shell=document.getElementById('wy-lit-games');if(!shell){shell=document.createElement('div');shell.id='wy-lit-games';document.body.append(shell)}
 shell.style.cssText='position:fixed;inset:0;z-index:9000;background:#15171bd9;display:flex;align-items:center;justify-content:center;padding:12px;font-family:-apple-system,BlinkMacSystemFont,sans-serif';
 const names={match:'官司闖關有法度！',judge:'下一步，你決定',fees:'有法度，也要有額度？',usa:'美國法律風暴｜你會怎麼選？',filing:'一狀在手，法度我有！',mediation:'調解互動',reception:'趣味接待櫃檯'};
 shell.innerHTML=`<section style="width:min(95vw,550px);max-height:87dvh;overflow:auto;background:#fff9ef;color:#382b26;border:3px solid #d49a56;border-radius:16px;padding:16px;line-height:1.65"><header style="display:flex;align-items:center;justify-content:space-between;gap:8px"><strong style="font-size:19px">${names[kind]}</strong><button id="wyg-close" style="font-size:22px;background:transparent;border:0;color:#382b26">×</button></header><div id="wyg-content" style="margin-top:14px"></div></section>`;
 shell.querySelector('#wyg-close').onclick=()=>shell.style.display='none';const el=shell.querySelector('#wyg-content');
 const btn=(label,fn)=>{const b=document.createElement('button');b.textContent=label;b.style.cssText='border:1px solid #bb8c57;border-radius:9px;background:#fff0d7;color:#3e3029;padding:10px 12px;margin:4px;font-size:15px;cursor:pointer';b.onclick=fn;return b};
 const paragraph=(txt)=>{const p=document.createElement('p');p.textContent=txt;el.append(p)};
 const render=(heading,body,buttons=[])=>{el.replaceChildren();if(heading){const h=document.createElement('h3');h.textContent=heading;el.append(h)}paragraph(body);buttons.forEach(x=>el.append(btn(x[0],x[1])))};
 if(kind==='match'){
 const stages=['地檢署','第一審','第二審','第三審'],types=['民事訴訟','刑事訴訟','行政訴訟'];
 const explanations=[
 ['地檢署主要處理刑事偵查，不負責一般民事爭議的審理。民事訴訟通常由當事人向法院提起，不需要經過地檢署。','地檢署主要負責刑事案件的偵查，由檢察官調查犯罪嫌疑及相關證據，並依法決定是否起訴；起訴後才由法院進行審判。','地檢署不負責一般行政訴訟。行政爭議依法律規定循行政救濟程序處理，符合起訴條件後，由行政法院審理。'],
 ['第一審法院負責首次審理民事爭議，確認雙方的主張與證據，釐清法律上的權利義務，並依法作成裁判。','第一審法院審理刑事案件，調查犯罪事實與相關證據，並依法作成判決。','第一審行政法院依適用程序審理行政爭議，審查行政機關處分或行為是否合法，並依法作成裁判。'],
 ['第二審法院依法審理對第一審民事裁判不服的上訴案件，並依相關規定作成裁判。','第二審法院依上訴範圍及相關規定，審查第一審判決是否妥當，並依法決定維持、撤銷或變更原判決。','行政訴訟原則上採二級二審，符合上訴要件時，由上級行政法院依法審查第一審裁判。'],
 ['第三審原則上著重審查原判決是否違反法律規定，而非重新調查全部事實，且須符合相關上訴條件。','刑事第三審主要審查法律問題，並非所有刑事案件都能上訴第三審，仍須符合相關法定條件。','行政訴訟原則上採二級二審，沒有與一般民事、刑事訴訟相同的第三審程序。']];
 const promo=['德威陽重視先釐清案件適用的程序及法律風險，協助當事人掌握方向。','林柏均律師具台灣與美國紐約州律師資格，並有企業法務與訴訟實務背景，重視案件整體分析。','德威陽重視判決理由、程序限制與救濟策略，協助當事人評估下一步。','德威陽重視法律爭點與上訴條件的精準判斷，避免盲目投入程序。'];
 let a=null,b=null;const invalid=(i,j)=>(i===0&&j!==1)||(i===3&&j===2);
 const draw=()=>{el.replaceChildren();paragraph('上方：');const upper=document.createElement('div');upper.style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:2px';stages.forEach((s,i)=>upper.append(btn((a===i?'● ':'')+s,()=>{a=i;b=null;draw()})));el.append(upper);const visual=document.createElement('div');visual.style.cssText='height:85px;background:#f6ead9;border-radius:12px;margin:8px 0;display:flex;align-items:center;justify-content:center';visual.textContent=a===null?'選擇上方機關或審級':b===null?'再選擇下方訴訟類型':stages[a]+' ━━━ '+types[b];visual.style.color=b===null?'#9b8064':invalid(a,b)?'#b64e51':'#ae7d34';el.append(visual);const lower=document.createElement('div');types.forEach((s,j)=>lower.append(btn((b===j?'● ':'')+s,()=>{if(a===null)return;b=j;draw()})));el.append(lower);if(a!==null&&b!==null){const h=document.createElement('h3');h.textContent=invalid(a,b)?'無法連線':'連線成立';el.append(h);paragraph(explanations[a][b]);const h2=document.createElement('h3');h2.textContent='德威陽可以幫你做什麼？';el.append(h2);paragraph(promo[a])}el.append(btn('重新連線',()=>{a=null;b=null;draw()}))};draw();return;
 }
 if(kind==='fees'){
 let type='民事訴訟',level='第一審',amount='10萬元以下（含10萬元）';const draw=()=>{el.replaceChildren();paragraph('訴訟類型');['民事訴訟','刑事訴訟','刑事附帶民事訴訟'].forEach(x=>el.append(btn((type===x?'● ':'')+x,()=>{type=x;draw()})));paragraph('審級');['第一審','第二審','第三審'].forEach(x=>el.append(btn((level===x?'● ':'')+x,()=>{level=x;draw()})));if(type==='民事訴訟'){paragraph('請求金額');['10萬元以下（含10萬元）','50萬元','100萬元'].forEach(x=>el.append(btn((amount===x?'● ':'')+x,()=>{amount=x;draw()})));paragraph(type+'／'+level+'／'+amount);paragraph('法院裁判費須依現行法令及法院核定結果計算；此處不以未經核對的數字代替正式核算。')}else paragraph(type+'／'+level+'：法院費用須依程序及法律規定個別確認。');paragraph('法院裁判費並非律師費。');paragraph('德威陽可以幫你做什麼？協助評估訴訟成本、法律風險與處理方向。')};draw();return;
 }
 if(kind==='judge'){
 const kinds=['民事訴訟','刑事訴訟','行政訴訟'];let type=null,step=0;const draw=()=>{if(type===null){render('選擇案件類型','民事、刑事、行政各10案，依故事中的選擇發展，不採計分制。',kinds.map(x=>[x,()=>{type=x;step=0;draw()}]));return}render(type+'｜第'+(step+1)+'階段','這項遊戲已確認採三階段、每階段三個選項的分支故事。完整30案劇本尚未納入目前檔案，暫不以自編故事冒充原定案。',[["返回選擇類型",()=>{type=null;draw()}]])};draw();return;
 }
 if(kind==='usa'){
 let mode=null;const draw=()=>{if(!mode){render('選擇玩法','10個台美跨國法律情境；可在法庭攻防與跨國策略兩種玩法間切換。',[['A｜法庭攻防',()=>{mode='A';draw()}],['B｜跨國策略',()=>{mode='B';draw()}]]);return}render(mode==='A'?'A｜法庭攻防':'B｜跨國策略','案件選擇、前後頁與故事分支須依原先確認的10案劇本；尚未取得完整原文的部分不自行補寫。',[['切換'+(mode==='A'?'B｜跨國策略':'A｜法庭攻防'),()=>{mode=mode==='A'?'B':'A';draw()}],['上一頁',()=>{mode=null;draw()}]])};draw();return;
 }
 if(kind==='filing')render('一狀在手，法度我有！','收狀互動入口已連結至收狀處；原定遊戲題目與操作流程尚未核對，未擅自新增遞狀動畫。');
 if(kind==='mediation')render('皇家調解廳','保留民事、家事、勞動調解與和解等法律主題；原先確認的趣味情境及分支尚未取得，不擅自重寫。');
 if(kind==='reception')render('趣味接待櫃檯','既有30組趣味對話與新增第31組均須依原文呈現；未取得既有30組原文前，不以自編台詞取代。',[['第31組｜台美時差',()=>render('台美時差','哈姆太郎：律師去美國開庭，我們可以休息了？\n夢奇奇：美國白天，台灣半夜耶！\n哈姆太郎：所以律師跨海，我們熬夜？🤣',[['返回',()=>openLitigationGame('reception')]])]]);
}
