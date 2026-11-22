// v514 使用說明與免責聲明（陳老闆 11-22 定：只放一處，在選角「開始探索」按鈕正下方，按下即表示同意）
// 全文可點開閱讀；條文內容改動請同步更新專案文件「有法度-免責聲明」。
const TERMS = [
  ['網站性質', '本網站為德威陽國際法律事務所（下稱本所）設置之互動網站，以推廣法律常識為目的，並兼具趣味性。所有遊戲、問答、對話、漫畫及其他內容，僅供娛樂及一般法律資訊參考；其中部分情節、對話及角色設定，係為趣味效果而誇張或虛構，請使用者自行判斷。'],
  ['同意及未成年人', '使用者開始使用本網站，即表示已閱讀、瞭解並同意本聲明全部內容；如不同意，請停止使用。使用者如為未成年人，應經法定代理人閱讀、瞭解並同意本聲明後，始得使用本網站。'],
  ['非法律意見', '本網站內容不構成法律意見或法律服務，使用本網站亦不因此與本所或本所律師成立委任關係。'],
  ['內容簡化', '遊戲之選項、答案及結果係為遊戲設計而簡化，不代表本所、本所律師或網站創作者對任何個案之見解。法令及實務見解可能變動，本網站內容未必正確、完整或即時，本所亦無隨時更新之義務。'],
  ['個案判斷', '個案事實不同，結論可能不同。請勿僅依本網站內容作成任何決定或採取任何行動；具體法律問題，請另行委任律師處理。'],
  ['依現狀提供', '本網站係依現狀免費提供，本所不保證本網站或其內容無錯誤、不中斷、無病毒或適合任何特定用途，亦不保證可於所有裝置、瀏覽器或網路環境正常運作。本所得隨時變更、暫停或終止本網站之全部或一部，無須事先通知。'],
  ['責任限制', '使用者因信賴或使用本網站內容，或因網站中斷、錯誤、遊戲紀錄遺失、裝置相容性問題或連結之外部網站所生之任何損害，本所、本所律師、員工及網站創作者均不負賠償責任；對於任何間接、附帶、衍生或懲罰性損害，亦同。如依法仍應負責者，賠償總額以新臺幣一千元為上限。但因故意或重大過失所生之責任，或其他依法不得排除或限制之責任，不在此限。'],
  ['角色設定資料', '您於本網站輸入之角色名稱、造型及行業等設定，僅儲存於您自己的裝置，用於顯示您的角色；清除瀏覽器資料後即會消失。'],
  ['角色名稱', '角色名稱由使用者自由輸入，本所並未審查，亦不代表本所認可其內容；使用者對角色名稱不取得任何權利。使用者如以角色名稱或含有角色名稱之分享內容冒用他人身分、誤導他人，或從事不法、侵權或其他不當行為者，應由使用者自負全部法律責任，與本所、本所律師、員工及網站創作者無涉。本所得不經通知，對含有猥褻、不雅或其他不適當文字之名稱，不予顯示或以預設名稱取代。'],
  ['禁止行為', '使用者不得有下列行為：<ol><li>重製、擷取、下載或還原本網站之程式碼、3D 模型、圖像、音樂、音效或其他素材，或進行反組譯、逆向工程。</li><li>以程式、爬蟲或其他自動化方式存取本網站，或以任何方式干擾、破壞本網站之正常運作。</li><li>將本網站或其內容改作、重新包裝後公開散布，或架設與本網站相同或近似之網站。</li><li>冒用本所、本所律師或本網站角色之名義，或以本網站內容誹謗、侮辱他人。</li><li>其他違反法令或本聲明之行為。</li></ol>'],
  ['著作權及標誌', '本網站之角色（林律師、夢奇奇飼養者、哈姆太郎、薪水掌門人）之名稱、形象及設定、德威陽漫畫、圖像、3D 模型、音樂、音效、文字、程式及網站設計，其著作權及相關權利均屬本所或各該創作者所有；「德威陽」「有法度 YES, WE DO!」及本所 Logo 為本所之標誌，本所律師林柏均之姓名及肖像亦受法律保護。未經本所書面同意，不得重製、改作、散布、公開傳輸、公開展示或作商業使用；但依下一點分享者，不在此限。'],
  ['分享內容', '本網站提供之律師函、紀念照、圖卡、桌布及其他可儲存或分享之內容（下稱分享內容），使用者得於個人非商業目的下儲存、分享或作為裝置桌布使用，但應遵守下列事項：<ol><li>分享內容均為趣味性質，不具任何法律效力，不構成本所之通知、證明、意見或承諾，亦不得作為主張任何權利或義務之依據。</li><li>不得以分享內容表示或暗示與本所或本所律師有委任、合作、推薦或代言關係。</li><li>不得刪除、遮蓋或變更分享內容上之本所名稱、Logo 及標示，亦不得改作後再行散布。</li><li>不得將分享內容用於商業目的，或用於不法、誹謗、冒用他人身分等不當用途。</li></ol>'],
  ['使用者責任', '使用者違反法令或本聲明，致本所、本所律師、員工或網站創作者受有損害或遭第三人請求者，使用者應負賠償責任，並負擔因此所生之一切費用，包括訴訟費用及律師費用。'],
  ['第三人標示及連結', '本網站所提及之第三人名稱、商品或商標，均屬各該權利人所有，僅供趣味情境使用，不代表與該權利人有任何合作或代言關係。本網站連結之外部網站，非本所所控制，本所對其內容不負任何責任。'],
  ['聲明之修改', '本所得修改本聲明，修改後之內容自公布於本網站時起生效；使用者於修改後繼續使用本網站，視為同意修改後之內容。'],
  ['其他', '本聲明任一條款經認定無效或不能執行者，不影響其他條款之效力。本所未行使或延遲行使本聲明之任何權利，不構成權利之拋棄。'],
  ['準據法及管轄', '本聲明以中華民國法律為準據法；因本網站所生之爭議，以臺灣臺北地方法院為第一審管轄法院。']
];
const NUM = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七'];
// 角色名稱過濾（陳老闆 11-22：不要擋太多，只擋不雅字詞；冒用、不法責任由使用者自負，見條款第九點）
const BLOCK = ['幹你', '幹妳', '靠北', '靠杯', '操你', '肏', '屌', '屁眼', '雞巴', '機掰', '雞掰', '王八蛋', '婊子', '賤人', '去死', '白痴', '智障', '腦殘', '妓女', '強姦', 'fuck', 'shit', 'bitch'];
export function cleanName(n) { n = String(n || '').trim(); const low = n.toLowerCase().replace(/\s+/g, ''); if (!n || BLOCK.some(w => low.includes(w))) return '法律探險家'; return n }
window.wyCleanName = cleanName;
export function setupTerms() {
  const btn = document.getElementById('startExplore'); if (!btn || document.getElementById('wyTermsNote')) return;
  const st = document.createElement('style'); st.textContent = `
  #wyTermsNote{flex:0 0 auto;margin:6px 0 0;text-align:center;font-size:11px;line-height:1.5;color:#8A6A3A;letter-spacing:.3px}
  #wyTermsNote a{color:#1A2B4C;font-weight:700;text-decoration:underline;text-underline-offset:2px;cursor:pointer}
  #wyTerms{position:fixed;inset:0;z-index:2147483300;display:none;align-items:center;justify-content:center;background:#1A2B4C99;padding:max(12px,env(safe-area-inset-top)) 12px max(12px,env(safe-area-inset-bottom))}
  #wyTerms.on{display:flex}
  #wyTerms .card{width:min(440px,100%);max-height:100%;display:flex;flex-direction:column;background:#FFF8EC;border-radius:18px;box-shadow:0 0 0 3px #D9B56A,0 18px 40px #0006;overflow:hidden;font-family:-apple-system,"PingFang TC","Noto Sans TC",sans-serif;color:#2D3142}
  #wyTerms .bar{display:flex;align-items:center;gap:9px;padding:10px 14px;background:#1A2B4C;color:#F3D9A4}
  #wyTerms .bar img{width:34px;height:34px;object-fit:contain;background:#fff;border-radius:50%;padding:2px}
  #wyTerms .bar b{display:block;font-size:14px;letter-spacing:1px}#wyTerms .bar small{display:block;font-size:10px;opacity:.85}
  #wyTerms h3{margin:12px 16px 4px;font-size:17px;color:#1A2B4C;text-align:center;letter-spacing:2px}
  #wyTerms .lead{margin:0 16px 6px;font-size:12px;color:#8A6224;text-align:center;text-wrap:balance}
  #wyTerms .body{overflow:auto;-webkit-overflow-scrolling:touch;padding:4px 16px 8px;border-top:1.5px solid #E8D5AE}
  #wyTerms .it{display:grid;grid-template-columns:2.4em 1fr;gap:0 2px;margin:9px 0;font-size:13px;line-height:1.7;text-align:justify;line-break:strict;text-wrap:pretty}
  #wyTerms .it>span{color:#8A6224;font-weight:700}#wyTerms .it b{display:block;color:#1A2B4C}
  #wyTerms .it ol{margin:4px 0 0;padding-left:1.6em}#wyTerms .it li{margin:2px 0}
  #wyTerms .ok{margin:8px 16px 14px;border:0;border-radius:13px;background:#1A2B4C;color:#F3D9A4;font:inherit;font-size:15px;font-weight:800;padding:11px;letter-spacing:1px}`;
  document.head.appendChild(st);
  const note = document.createElement('div'); note.id = 'wyTermsNote';
  note.innerHTML = '按下開始探索，即表示您已閱讀並同意<br><a role="button" tabindex="0">《使用說明與免責聲明》</a>';
  btn.insertAdjacentElement('afterend', note);
  const ov = document.createElement('div'); ov.id = 'wyTerms';
  ov.innerHTML = `<div class="card"><div class="bar"><img src="office-logo-transparent.png" alt="德威陽"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div></div>
   <h3>使用說明與免責聲明</h3><p class="lead">歡迎蒞臨有法度群島。<br>按下「開始探索」即表示您已閱讀、瞭解並同意下列各點：</p>
   <div class="body">${TERMS.map(([t, s], i) => `<div class="it"><span>${NUM[i]}、</span><div><b>${t}</b>${s}</div></div>`).join('')}</div>
   <button class="ok" type="button">我知道了</button></div>`;
  document.body.appendChild(ov);
  const open = () => { ov.classList.add('on'); ov.querySelector('.body').scrollTop = 0 };
  const a = note.querySelector('a'); a.onclick = open; a.onkeydown = e => { if (e.key === 'Enter') open() };
  ov.querySelector('.ok').onclick = () => ov.classList.remove('on');
  ov.onclick = e => { if (e.target === ov) ov.classList.remove('on') };
  window.wyTermsOpen = open;
}
