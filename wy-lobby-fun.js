// 1F 迎賓大廳趣味互動：拉花占卜（茶點區）＋《有法度日報》（沙發茶几）
// 用法：import {openLatte,openPaper} from './wy-lobby-fun.js';
const LINE='LINE：@wylaw　｜　官網：weiandyang.com';
const LOGO='./office-logo-transparent.png';

// 拉花：[名稱, 圖案key, [[今日運勢, 小提醒, 德威陽怎麼幫您, 繼承類?], ×3]]
const LATTE=[
 ['愛心拉花','heart',[
  ['今日人緣運旺，感情加溫。','重要的約定，寫下來比記在心裡更安心。','規劃婚前協議與夫妻財產約定，兼顧感情與保障。'],
  ['今日桃花朵朵開，笑容滿分。','交往中一起買東西，誰出多少錢記得留紀錄。','盤點共同財產往來，評估日後可能的權利分配。'],
  ['今日家庭運溫暖，適合陪伴家人。','孩子的事情，大人好好商量最重要。','評估親權與會面安排，規劃對孩子最好的方式。']]],
 ['麥穗拉花','wheat',[
  ['今日事業運豐收，努力都有回報。','合作談成時，把分工與報酬一併寫進合約。','審閱合作契約，盤點分潤與責任條款。'],
  ['今日財運穩穩成長。','投資之前，先看懂合約上的每一項風險。','評估投資文件內容，標出需要留意的條款。'],
  ['今日團隊運旺，夥伴同心。','一起創業，先談好股份與退場方式。','規劃股東協議，設計決策與退場機制。']]],
 ['小房子拉花','house',[
  ['今日家宅運平安順遂。','租屋交屋時，屋況先拍照存檔。','審閱租賃契約，評估押金與修繕約定。'],
  ['今日置產運佳，好房在望。','買房簽約前，先確認產權與貸款條件。','審閱不動產買賣契約，盤點交易風險。'],
  ['今日家族和睦，凡事好商量。','家中財產的安排，早點想清楚，家人少煩惱。','規劃遺囑與財產安排，盤點家族資產狀況。',1]]],
 ['星星拉花','star',[
  ['今日靈感運閃亮登場。','好點子分享前，先想好要不要簽保密協議。','擬定保密協議，界定資訊保護範圍。'],
  ['今日創作運大爆發。','作品公開前，留下創作過程的紀錄。','規劃著作權保護，盤點作品權利歸屬。'],
  ['今日品牌運發光。','品牌名稱想長久使用，先查詢、再申請。','規劃商標布局，評估品牌權利風險。']]],
 ['天鵝拉花','swan',[
  ['今日氣場優雅，談判從容。','談判前先想好底線，再開口。','評估談判立場，擬定協商策略。'],
  ['今日說話有分量，溝通順利。','重要的對話結論，事後用訊息再確認一次。','整理溝通紀錄，評估後續協商方向。'],
  ['今日貴氣上身，萬事從容。','大額交易前，先確認對方身分與授權。','審閱交易文件，比對簽約主體與授權範圍。']]],
 ['太陽拉花','sun',[
  ['今日活力滿點，事情一次搞定。','重要文件正本收好，影本另外備份。','盤點重要文件，規劃保存與管理方式。'],
  ['今日正能量滿滿。','收到法院或機關的信，當天就打開看。','判讀文書內容，盤點期限與因應步驟。'],
  ['今日光明正大，好事上門。','公司規章更新了，記得讓員工確實知道。','審閱公司內部規章，評估勞動管理風險。']]],
 ['雲朵拉花','cloud',[
  ['今日心情輕盈，煩惱散去。','爭執時的訊息先別刪，日後可能用得上。','整理對話與證據，評估可行的處理方向。'],
  ['今日適合放慢腳步。','情緒激動時先別簽名，冷靜後再決定。','審閱待簽文件，評估簽署前應注意的事項。'],
  ['今日好運飄過來。','網路上發文之前，先想想會不會傷到別人。','評估言論風險，規劃妥善的回應方式。']]],
 ['小熊拉花','bear',[
  ['今日貴人運佳，有人挺你。','別人請你作保前，先想清楚可能承擔的責任。','評估保證責任範圍，規劃風險控管。'],
  ['今日朋友運旺，友情加溫。','借錢給朋友，金額與還款日寫清楚。','擬定借貸文件，規劃債權確保方式。'],
  ['今日療癒滿分，煩惱減半。','遇到消費糾紛，先保留發票與交易紀錄。','整理交易證據，評估求償與協商方式。']]],
 ['鬱金香拉花','tulip',[
  ['今日職場運順風，表現亮眼。','簽勞動契約前，看清楚工時與競業約定。','審閱勞動契約，評估競業與保密條款。'],
  ['今日升遷運來敲門。','職務調整時，新的工作條件記得白紙黑字。','評估職務調整內容，擬定書面約定。'],
  ['今日工作順心，貴人相助。','離職前，先確認交接與保密的範圍。','審閱離職相關文件，盤點雙方權利義務。']]],
 ['地球拉花','globe',[
  ['今日遠方運旺，適合跨國交流。','與國外客戶往來，幣別與付款條件先講清楚。','審閱跨國交易文件，比對雙方條款差異。'],
  ['今日國際運大開。','跟國外廠商合作，先約定發生爭議時在哪裡處理。','規劃跨國契約架構，評估爭議處理機制。'],
  ['今日旅行運佳，一路順風。','出國旅遊前，看清楚訂房訂票的退費條款。','審閱消費契約內容，評估退費與求償方式。']]],
 ['月亮拉花','moon',[
  ['今日夜貓運旺，靈感晚上來。','重要合約別熬夜趕簽，隔天再看一次。','逐條審閱契約，標出需要協商的重點。'],
  ['今日月圓人團圓。','家人之間的約定，說清楚比猜測好。','評估家事安排，規劃兼顧情理的處理方式。'],
  ['今日安穩好眠，無事煩心。','重要期限記在行事曆上，提前提醒自己。','盤點案件期限，規劃後續處理時程。']]],
 ['愛心氣球拉花','balloon',[
  ['今日喜事臨門，好消息不斷。','辦活動收費前，退費規則先公告清楚。','擬定活動條款，評估消費爭議風險。'],
  ['今日心想事成，願望起飛。','開店創業，先確認營業登記與招牌名稱。','規劃創業法律架構，盤點設立應備事項。'],
  ['今日好運飛高高。','收到中獎通知先別急著匯錢，先查證真偽。','評估交易真實性，規劃自我保護措施。']]]
];
// 日報：[頭條, 記者觀察, 德威陽怎麼幫您, 副標, 繼承類?]
const NEWS=[
 ['震驚！男子看懂合約條款，全場起立鼓掌','簽約前看懂每一條，比事後爭執省力得多。','逐條審閱契約，標出需要協商的重點。','現場簽約氣氛和諧，雙方笑稱這次不用再開第二次會。'],
 ['女子交屋前拍照存證，退租時從容不迫','屋況照片記得保留拍攝日期。','審閱租約內容，評估押金與修繕爭議。','房東看完照片也點頭，雙方十分鐘完成點交。'],
 ['老闆宣布加薪，員工：這次有白紙黑字','重要的承諾，留下書面紀錄最穩當。','審閱勞動條件，擬定書面約定。','同事紛紛表示羨慕，人資已開始準備新版契約。'],
 ['好友借錢先寫借據，友情不減反增','金額、還款日與雙方簽名，一樣都不能少。','擬定借貸文件，規劃債權確保方式。','兩人約好還錢那天，要一起吃飯慶祝。'],
 ['新創團隊先簽股東協議，開會吵架大幅減少','創業夥伴的分工與退場方式，越早談越好。','規劃股東協議，設計決策與退場機制。','團隊表示把話先講清楚之後，會議時間縮短一半。'],
 ['網購賣家截圖留證，買賣糾紛三天落幕','交易紀錄與對話截圖，記得另外備份。','整理交易證據，評估求償與協商方式。','買家看到完整紀錄，雙方很快談出共識。'],
 ['民眾收到法院信件立刻拆開，順利趕上期限','法院文書常附有期限，收到就先打開看。','判讀文書內容，盤點期限與因應步驟。','當事人表示原本以為是廣告信，還好有打開。'],
 ['本地品牌搶先註冊商標，招牌越做越安心','品牌名稱想長久使用，先查詢、再申請。','規劃商標布局，盤點品牌權利。','老闆笑說，名字是自己取的，就要自己顧好。'],
 ['社區開會留下會議紀錄，住戶紛爭明顯變少','重要決議做成紀錄，日後才有依據。','審閱管理規約，評估會議程序。','主委表示有了紀錄之後，大家開會更有效率。'],
 ['駕駛裝了行車紀錄器，事故責任一目了然','發生事故時，先保存影像再談和解。','評估事故責任，規劃和解與求償方向。','雙方看完影像，現場就冷靜下來。'],
 ['工程師離職前確認保密範圍，新工作順利開跑','離職前先看清楚競業與保密約定。','審閱離職與保密文件，盤點雙方權利義務。','新公司主管表示，這樣的員工讓人放心。'],
 ['小吃店老闆先看懂加盟合約，展店一路順利','加盟前，權利金與退出條件要先看清楚。','審閱加盟契約，評估權利金與解約條款。','老闆說，第二家分店已經在找店面了。'],
 ['跨國訂單先談好付款條件，貨款準時入帳','與國外客戶往來，幣別、付款期限先講清楚。','審閱跨國交易文件，比對雙方條款差異。','業務部表示，這個月終於不用天天追款。'],
 ['夫妻婚前先聊財產安排，婚禮更甜蜜','坦誠溝通財產觀念，是婚姻的好開始。','規劃婚前協議，評估夫妻財產制選擇。','新人表示，把話說開之後，籌備婚禮更輕鬆。'],
 ['離婚父母好好談會面安排，孩子笑得更開心','孩子的安排，以孩子的需要為優先。','評估親權與會面安排，規劃穩定的照顧方式。','孩子說，最開心的是爸爸媽媽都會來看表演。'],
 ['病患保存完整病歷，醫病溝通更順暢','就醫紀錄與收據，記得好好保存。','整理醫療紀錄，評估醫療爭議處理方向。','醫院表示，資料齊全讓說明更清楚。'],
 ['公司更新員工手冊，勞資溝通更透明','工作規則更新時，要讓員工確實知道。','審閱工作規則，評估勞動管理風險。','員工表示，規則講清楚，上班更安心。'],
 ['房東簽約前確認房客資料，出租一路平安','出租前，確認身分與租期約定。','擬定租賃契約，規劃押金與違約條款。','房東笑說，好的開始就是成功的一半。'],
 ['老闆遇到行政處分先查期限，救濟沒有錯過','對機關決定有意見，期限是第一件要確認的事。','評估行政處分內容，規劃救濟途徑與時程。','老闆表示，原本以為只能認了，還好有先問清楚。'],
 ['網紅發文前先查證，粉絲好評不斷','公開發言前，先確認內容與用字。','評估言論風險，規劃妥善的回應方式。','網紅表示，謹慎一點，粉絲反而更信任。'],
 ['中小企業導入個資管理，客戶信任度大增','客戶資料的蒐集與保存，都要有規則。','規劃個資保護制度，盤點資料管理流程。','客戶表示，看到隱私聲明就覺得很放心。'],
 ['設計師作品留存創作紀錄，著作權一清二楚','創作過程的草稿與檔案，都是重要紀錄。','規劃著作權保護，盤點作品權利歸屬。','設計師說，原來草稿也這麼有價值。'],
 ['合夥開店先寫好分工，三年感情依舊','誰出錢、誰出力、怎麼分紅，一開始就說清楚。','擬定合夥契約，規劃分潤與退夥機制。','兩位老闆表示，最大的祕訣就是先講好。'],
 ['工地主任每天做安全紀錄，工程順利完工','施工安全的紀錄，平時就要確實留存。','評估工程契約與安全責任，盤點相關風險。','業主表示，看到紀錄就知道很用心。'],
 ['阿公提早安排財產，全家聚餐氣氛融洽','財產安排想清楚，寫下來讓家人少煩惱。','規劃遺囑與財產安排，盤點家族資產狀況。','孫子說，阿公最常講的就是一家人要和和氣氣。',1],
 ['兄弟姊妹好好談共有房屋，感情更緊密','共有的不動產，使用與管理方式先談好。','評估共有關係，規劃使用與分配方式。','大家約好每年在老家聚一次。',1],
 ['消費者看清退費條款，健身房會員安心續約','簽約前，先確認退費與轉讓規定。','審閱消費契約內容，評估退費與求償方式。','會員表示，規則清楚，運動起來更有動力。'],
 ['店家收到存證信函冷靜應對，糾紛圓滿落幕','收到存證信函，先看清楚對方主張什麼。','判讀存證信函內容，擬定回覆與因應策略。','老闆說，原本很緊張，看懂之後就不怕了。'],
 ['企業簽約前查清對方授權，交易安全上路','簽約前，確認對方是否有權代表公司。','審閱交易文件，比對簽約主體與授權範圍。','財務長表示，多確認一步，晚上睡得更好。'],
 ['長輩接到可疑電話先查證，荷包安全保住','接到要求匯款的電話，先掛斷再查證。','評估交易真實性，規劃自我保護措施。','家人表示，平常多聊兩句，長輩更有警覺。']
];
// 節日版：[節日key, 頭條, 記者觀察, 德威陽怎麼幫您, 副標]
const NEWS_FEST={
 cny:['新春開工大吉，企業先檢查年度合約','新的一年，到期的合約記得先盤點。','盤點年度合約，評估續約與調整重點。','老闆笑說，紅包發完，合約也要看完。'],
 lantern:['元宵燈會人潮滿滿，民眾開心猜燈謎','人多的地方，隨身物品記得顧好。','評估消費與活動糾紛，規劃求償方式。','有民眾一口氣猜中十題，笑得合不攏嘴。'],
 qingming:['清明連假返鄉掃墓，民眾提早出門避車潮','山路濕滑，開車慢一點，停車注意標線。','評估交通事故責任，規劃和解與求償方向。','許多家庭表示，一家人一起出門最開心。'],
 dragon:['端午龍舟賽熱鬧登場，粽香飄滿河岸','參加活動前，先看清楚報名與保險規定。','審閱活動契約，評估主辦與參加者責任。','有隊伍表示，划完龍舟最期待吃粽子。'],
 qixi:['七夕情人節甜蜜滿分，情侶浪漫約會','網路訂購禮物，記得保留訂單與付款紀錄。','整理交易紀錄，評估消費爭議處理方式。','花店老闆表示，今天玫瑰特別搶手。'],
 midautumn:['中秋烤肉香滿街，鄰里和樂一家親','烤肉時注意用火安全，也別影響鄰居。','評估相鄰關係糾紛，規劃溝通與處理方式。','社區主委表示，今年的月亮特別圓。'],
 mother:['母親節感恩送暖，餐廳訂位一位難求','訂位、訂餐記得確認取消規定。','審閱消費契約內容，評估退費與求償方式。','許多人表示，最好的禮物是好好陪媽媽吃頓飯。'],
 father:['父親節溫馨登場，爸爸們笑開懷','送禮網購記得留存訂單紀錄。','整理交易紀錄，評估消費爭議處理方式。','有孩子親手做卡片，爸爸感動到說不出話。'],
 xmas:['聖誕節交換禮物，辦公室笑聲不斷','團購和交換禮物，金額與規則先說好。','評估消費與團購糾紛，規劃求償方式。','有同事抽到最想要的禮物，開心到跳起來。'],
 newyear:['跨年煙火璀璨，民眾許下新年新希望','新年新計畫，重要的約定記得寫下來。','規劃新年度法律事務，盤點待處理事項。','許多人的新年願望是：平平安安、事事順心。']
};
// 節日日期（農曆每年不同，依官方行事曆；每年年底跟陳老闆確認隔年日期）
const FEST_DAYS={
 '2027':{cny:['02-05','02-11'],lantern:['02-20','02-20'],qingming:['04-02','04-05'],dragon:['06-09','06-09'],qixi:['08-08','08-08'],midautumn:['09-15','09-15']},
 '2028':{cny:['01-25','01-31'],lantern:['02-09','02-09'],qingming:['04-01','04-04'],dragon:['05-28','05-28'],qixi:['08-26','08-26'],midautumn:['10-03','10-03']}
};
function festToday(d=new Date()){
 const y=String(d.getFullYear()),md=String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
 const t=FEST_DAYS[y]||{};for(const k in t){if(md>=t[k][0]&&md<=t[k][1])return k}
 if(md==='08-08')return 'father';if(md>='12-24'&&md<='12-25')return 'xmas';if(md==='12-31'||md==='01-01')return 'newyear';
 if(d.getMonth()===4&&d.getDay()===0&&d.getDate()>=8&&d.getDate()<=14)return 'mother';
 return null;
}
const MOTTO=['咖啡可以續杯，法律期限可不能隨便延長。','餅乾可以分享，當事人的秘密不行。','律師的咖啡可能會冷，重要的案件期限不能忘。','甜點可以分層，法律責任也要分清楚。','咖啡有濃淡，法律分析不能只憑感覺。','餅乾碎了可以再拿，證據遺失可就麻煩了。','一杯咖啡的時間，可能足夠發現合約裡的一個問題。','甜點講究比例，損害賠償也講究依據。','咖啡要選豆，律師要先看證據。','零食有保存期限，法律上的請求權也可能有時效。','咖啡可以外帶，法律責任不會因為出國就自動消失。','蛋糕切得漂亮，不代表財產分割就容易。','有些問題，比咖啡還需要時間慢慢釐清。','餅乾少了一塊，先別急著指認嫌疑人。','咖啡可以加糖，契約條款不能只挑甜的看。','甜點可以試吃，合約可不能隨便試簽。','律師最熟悉的味道，可能是開庭前的第一杯咖啡。','零食可以先拿，別人的文件不能先翻。','一杯拿鐵有配方，一份法律意見也需要事實基礎。','甜點吃完會留下盤子，重要交易最好也留下紀錄。','咖啡機可以重新啟動，錯過的法定期限未必能重來。','包裝上寫著限量，合約上寫著限制，兩種都要看清楚。','今天適合喝咖啡，不一定適合衝動提告。','甜點可以選自己喜歡的，法律策略要選適合案件的。','咖啡香會散，電子證據也可能隨時間消失。','誰拿了最後一塊餅乾？先確認事實，再談責任。','咖啡可以慢慢品，法院通知可別慢慢看。','甜點有菜單，法律服務也需要先確認需求。','有些合約比黑咖啡還苦，簽之前最好先看懂。','歡迎來到德威陽，茶點先享用，法律問題交給專業來討論。'];
let box,lastM=-1,lastL=-1,lastN=-1;
function pick(n,last){if(n<2)return 0;let i;do{i=Math.floor(Math.random()*n)}while(i===last);return i}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}

const CSS=`
#wyLF{position:fixed;inset:0;z-index:130;display:none;align-items:center;justify-content:center;padding:12px;background:#0b1f2fcc;font-family:system-ui,'Noto Sans TC',sans-serif}
#wyLF .lf-card{width:min(94vw,420px);max-height:90dvh;overflow:auto;background:#fff;border:2px solid #d3aa67;border-radius:18px;box-shadow:0 18px 55px #0008;box-sizing:border-box}
#wyLF .lf-brand{display:flex;align-items:center;gap:10px;padding:8px 12px;background:#fff;border-bottom:1px solid #ecd3a8;position:sticky;top:0;z-index:2}
#wyLF .lf-brand img{width:34px;height:34px;object-fit:contain;flex:none;background:#fff;border:2px solid #d3aa67;border-radius:9px}
#wyLF .lf-brand div{flex:1}#wyLF .lf-brand b{display:block;font-size:15px;color:#1f3b2f}#wyLF .lf-brand small{display:block;font-size:10.5px;color:#a07d45}
#wyLF .lf-x{border:0;background:#e9f3ee;color:#1f5a43;font-size:20px;width:36px;height:36px;border-radius:10px;font-weight:700}
#wyLF .lf-body{padding:12px 14px 14px}
#wyLF h3{margin:2px 0 8px;font:800 20px 'Noto Serif TC','Songti TC','PMingLiU',serif;color:#1f5a43;text-align:center}
#wyLF .lf-stage{position:relative;height:236px;display:flex;align-items:center;justify-content:center}
#wyLF .lf-stage svg{width:200px;height:236px}
#wyLF .lf-stage svg *{transform-box:fill-box}
#wyLF .lf-jug{transform-origin:80% 30%;transform:translate(30px,-30px) rotate(0);opacity:0}
#wyLF .lf-stream{transform-origin:50% 0;transform:scaleY(0)}
#wyLF .lf-blob{transform-origin:50% 50%;transform:scale(0)}
#wyLF .lf-wig{transform-origin:50% 50%}
#wyLF .lf-ring{transform-origin:50% 50%;opacity:0}
#wyLF .lf-swirl{transform-origin:50% 50%;opacity:0}
#wyLF .lf-mk{transform-origin:50% 50%;transform:scale(0)}
#wyLF .lf-art{transform-origin:50% 50%;transform:scale(.7)}
#wyLF.lf-go .lf-jug{animation:lfJug 2.5s ease-in-out forwards}
#wyLF.lf-go .lf-stream{animation:lfStream 2.5s ease-in-out forwards}
#wyLF.lf-go .lf-blob{animation:lfBlob 2.5s ease-out forwards}
#wyLF.lf-go .lf-wig{animation:lfWig .32s ease-in-out .6s 4 alternate}
#wyLF.lf-go .lf-ring{animation:lfRing 2.5s ease-out forwards}
#wyLF.lf-go .lf-swirl{animation:lfSwirl 2.5s ease-out forwards}
#wyLF.lf-go .lf-mk{animation:lfMk 2.5s ease-out forwards}
#wyLF.lf-go .lf-art{animation:lfArt 2.5s cubic-bezier(.3,1.3,.5,1) forwards}
@keyframes lfJug{0%{opacity:0;transform:translate(30px,-30px) rotate(0)}12%{opacity:1;transform:translate(0,0) rotate(0)}22%,70%{opacity:1;transform:translate(0,0) rotate(-28deg)}84%{opacity:1;transform:translate(0,0) rotate(0)}100%{opacity:0;transform:translate(30px,-30px) rotate(0)}}
@keyframes lfStream{0%,20%{transform:scaleY(0)}28%,66%{transform:scaleY(1)}74%,100%{transform:scaleY(0)}}
@keyframes lfBlob{0%,26%{transform:scale(0);opacity:1}55%{transform:scale(1.35);opacity:1}78%{transform:scale(1.6);opacity:0}100%{transform:scale(1.6);opacity:0}}
@keyframes lfWig{from{transform:translateX(-5px)}to{transform:translateX(5px)}}
@keyframes lfRing{0%,60%{opacity:0;transform:scale(.8)}70%{opacity:.7}100%{opacity:0;transform:scale(1.9)}}
@keyframes lfSwirl{0%,25%{opacity:0;transform:rotate(0)}45%{opacity:1}100%{opacity:.35;transform:rotate(200deg)}}
@keyframes lfMk{0%,45%{transform:scale(0)}80%,100%{transform:scale(1)}}
@keyframes lfArt{0%,45%{transform:scale(.6)}85%,100%{transform:scale(1)}}
#wyLF .lf-res{opacity:0;transform:translateY(8px);transition:all .45s ease 2.3s}
#wyLF.lf-go .lf-res,#wyLF.lf-np .lf-res{opacity:1;transform:none}
#wyLF.lf-np .lf-res{transition-delay:.3s}
#wyLF .lf-name{text-align:center;font:800 17px 'Noto Serif TC',serif;color:#b0832f;margin:0 0 6px}
#wyLF .lf-luck{background:#e8f6ef;border:1.5px solid #8fcdb0;border-radius:12px;padding:10px 12px;margin:6px 0;text-align:center}
#wyLF .lf-luck b{display:block;font-size:12px;color:#2e8a62;letter-spacing:.15em;margin-bottom:2px}
#wyLF .lf-luck span{font-size:17px;font-weight:800;color:#17402f;line-height:1.55}
#wyLF .lf-tip{font-size:14px;line-height:1.65;color:#2d3b36;margin:8px 2px}
#wyLF .lf-wy{margin-top:8px;background:#FDE3C8;border:1px solid #E9B98A;border-left:5px solid #C6A25D;border-radius:10px;padding:9px 10px;color:#5A3216;font-weight:600;font-size:13px;line-height:1.5}
#wyLF .lf-wy>b{display:block;font-size:16px;font-weight:800;margin-bottom:3px;color:#8A3D10}
#wyLF .lf-wy:after{content:"${LINE}";display:block;margin-top:5px;padding-top:4px;border-top:1px dashed currentColor;font-size:13px;font-weight:700;color:#8A3D10}
#wyLF .lf-row{display:flex;gap:9px;margin-top:11px}
#wyLF .lf-row button{flex:1;min-width:0;padding:12px 6px;border-radius:11px;font-weight:800;font-size:15px;border:1.5px solid #c6a25d;touch-action:manipulation}
#wyLF .lf-a{background:#1f6b4f;color:#fff3d6}#wyLF .lf-b{background:#fff;color:#1f5a43}
/* 報紙 */
#wyLF .np{background:#fff;border:1.5px solid #cfe3d9;border-radius:6px;box-shadow:0 6px 18px #1f5a4326;transform-origin:50% 0;animation:npOpen .6s cubic-bezier(.3,1.25,.5,1)}
@keyframes npOpen{0%{transform:perspective(600px) rotateX(-88deg);opacity:.3}100%{transform:none;opacity:1}}
#wyLF .np-head{background:#1f6b4f;color:#f3d48c;text-align:center;padding:9px 6px 7px;border-radius:5px 5px 0 0}
#wyLF .np-head b{display:block;font:900 30px 'Noto Serif TC','Songti TC','PMingLiU',serif;letter-spacing:.18em}
#wyLF .np-head small{display:block;font-size:10px;letter-spacing:.3em;color:#e8cf95}
#wyLF .np-date{display:flex;justify-content:space-between;font-size:11.5px;color:#1f5a43;font-weight:700;padding:5px 9px;border-bottom:2px solid #1f6b4f}
#wyLF .np-main{padding:10px 11px 12px}
#wyLF .np-tag{display:inline-block;background:#e0503f;color:#fff;font-size:11px;font-weight:800;padding:2px 7px;border-radius:4px;margin-bottom:5px}
#wyLF .np-h{font:900 22px/1.4 'Noto Serif TC','Songti TC','PMingLiU',serif;color:#14201b;margin:0 0 8px}
#wyLF .np-cols{display:flex;gap:10px;align-items:flex-start}
#wyLF .np-pic{flex:none;width:86px;height:70px;border-radius:5px;background:linear-gradient(160deg,#bfe9d6,#7ccbaa);display:flex;align-items:center;justify-content:center;font:900 26px 'Noto Serif TC',serif;color:#fff;text-shadow:0 2px 0 #1f6b4f66}
#wyLF .np-s{font-size:14px;line-height:1.65;color:#2d3b36;margin:0}
#wyLF .np-s b{color:#1f6b4f}
#wyLF .np-sub{font-size:14.5px;font-weight:700;color:#1f5a43;line-height:1.6;margin:0 0 8px;padding-left:9px;border-left:4px solid #c6a25d}
#wyLF .np-motto{margin-top:10px;padding:9px 10px;border:1.5px dashed #8fcdb0;border-radius:8px;background:#f2faf6;font:700 15px/1.6 'Noto Serif TC','Songti TC',serif;color:#17402f}
#wyLF .np-motto b{display:block;font:800 12px system-ui,'Noto Sans TC',sans-serif;color:#2e8a62;letter-spacing:.15em;margin-bottom:2px}
`;

function svgLatte(key){
 const F='#fffaf0';// 奶泡白
 const art={
  heart:`<path d="M95 128 C60 104 58 74 78 68 C88 65 95 73 95 80 C95 73 102 65 112 68 C132 74 130 104 95 128Z" fill="${F}"/>`,
  wheat:`<path d="M95 132 L95 62" stroke="${F}" stroke-width="5" stroke-linecap="round"/>`+[0,1,2,3].map(i=>`<ellipse cx="85" cy="${74+i*13}" rx="9" ry="5" transform="rotate(-35 85 ${74+i*13})" fill="${F}"/><ellipse cx="105" cy="${74+i*13}" rx="9" ry="5" transform="rotate(35 105 ${74+i*13})" fill="${F}"/>`).join('')+`<ellipse cx="95" cy="62" rx="5" ry="8" fill="${F}"/>`,
  house:`<path d="M66 96 L95 70 L124 96Z" fill="${F}"/><rect x="73" y="95" width="44" height="34" rx="5" fill="${F}"/><rect x="89" y="108" width="12" height="21" rx="3" fill="#a8693c"/>`,
  star:`<path d="M95 62 L104 86 L130 87 L110 103 L117 128 L95 114 L73 128 L80 103 L60 87 L86 86Z" fill="${F}" stroke="${F}" stroke-width="4" stroke-linejoin="round"/>`,
  swan:`<path d="M68 112 C70 126 118 132 126 110 C112 116 96 112 92 104 C88 92 104 86 100 72 C97 63 84 64 84 72 C84 78 90 78 92 82 C82 92 80 104 68 112Z" fill="${F}"/><circle cx="88" cy="70" r="2.5" fill="#7a4a28"/>`,
  sun:`<circle cx="95" cy="97" r="19" fill="${F}"/>`+[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4,x=95+Math.cos(a)*31,y=97+Math.sin(a)*31;return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5.5" fill="${F}"/>`}).join(''),
  cloud:`<path d="M66 114 C54 114 54 96 68 95 C68 80 88 76 95 88 C102 74 126 78 124 96 C138 96 138 114 124 114Z" fill="${F}"/>`,
  bear:`<circle cx="74" cy="76" r="10" fill="${F}"/><circle cx="116" cy="76" r="10" fill="${F}"/><circle cx="95" cy="100" r="28" fill="${F}"/><circle cx="85" cy="95" r="3" fill="#7a4a28"/><circle cx="105" cy="95" r="3" fill="#7a4a28"/><ellipse cx="95" cy="108" rx="8" ry="5.5" fill="#d9b38c"/><circle cx="95" cy="106" r="2.5" fill="#7a4a28"/>`,
  tulip:`<path d="M95 132 L95 102" stroke="${F}" stroke-width="5" stroke-linecap="round"/><path d="M76 74 L84 86 L95 70 L106 86 L114 74 C118 96 110 108 95 108 C80 108 72 96 76 74Z" fill="${F}"/><ellipse cx="82" cy="122" rx="11" ry="5" transform="rotate(-30 82 122)" fill="${F}"/>`,
  moon:`<path d="M108 64 C84 66 70 84 72 104 C74 124 92 136 112 132 C96 126 86 112 88 96 C90 80 98 70 108 64Z" fill="${F}"/><circle cx="118" cy="80" r="4" fill="${F}"/><circle cx="124" cy="100" r="3" fill="${F}"/>`,
  balloon:`<path d="M88 106 C70 92 70 72 82 68 C88 66 92 70 92 74 C92 70 96 66 102 68 C114 72 112 92 92 106Z" fill="${F}"/><path d="M108 96 C96 86 96 72 104 70 C108 69 110 72 110 74 C110 72 112 69 116 70 C124 72 122 86 108 96Z" fill="${F}"/><path d="M90 106 Q92 120 96 132 M108 96 Q104 116 98 132" stroke="${F}" stroke-width="2.5" fill="none"/>`,
  globe:`<circle cx="95" cy="98" r="30" fill="none" stroke="${F}" stroke-width="5"/><ellipse cx="95" cy="98" rx="13" ry="30" fill="none" stroke="${F}" stroke-width="4"/><path d="M66 98 H124 M70 84 H120 M70 112 H120" stroke="${F}" stroke-width="4"/>`
 }[key];
 // 俯視杯＋側面拉花鋼杯：倒奶 → 奶泡擴散左右擺動 → 圖案浮現 → 收杯
 return `<svg viewBox="0 0 200 236" overflow="visible"><defs>
 <radialGradient id="lfCrema" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#c98c57"/><stop offset=".7" stop-color="#a8693c"/><stop offset="1" stop-color="#7c4525"/></radialGradient>
 <mask id="lfMask" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="236"><circle class="lf-mk" cx="100" cy="140" r="62" fill="#fff"/></mask>
 <clipPath id="lfCup"><circle cx="100" cy="140" r="59"/></clipPath></defs>
 <circle cx="100" cy="140" r="88" fill="#e9f6ef" stroke="#c6a25d" stroke-width="3"/>
 <rect x="155" y="129" width="34" height="22" rx="11" fill="#23946a"/>
 <circle cx="100" cy="140" r="70" fill="#23946a"/><circle cx="100" cy="140" r="64" fill="#c6a25d"/>
 <circle cx="100" cy="140" r="59" fill="url(#lfCrema)"/>
 <g clip-path="url(#lfCup)">
  <g class="lf-swirl"><path d="M100 140 m-40 0 a40 40 0 1 1 80 0 a32 32 0 1 1 -64 0 a24 24 0 1 1 48 0" fill="none" stroke="#d9a370" stroke-width="3" opacity=".55"/></g>
  <g class="lf-wig"><ellipse class="lf-blob" cx="100" cy="140" rx="24" ry="20" fill="#fffaf0"/></g>
  <circle class="lf-ring" cx="100" cy="140" r="30" fill="none" stroke="#fffaf0" stroke-width="3"/>
  <g mask="url(#lfMask)"><g transform="translate(5 43)"><g class="lf-art">${art}</g></g></g>
 </g>
 <g class="lf-pit"><rect class="lf-stream" x="97" y="34" width="6" height="104" rx="3" fill="#fffaf0"/>
  <g class="lf-jug"><path d="M86 6 L134 6 L130 40 Q129 48 120 48 L100 48 Q92 48 90 40 Z" fill="#dfe9ee" stroke="#9fb3bf" stroke-width="2"/><path d="M90 40 L80 32 L88 26" fill="#dfe9ee" stroke="#9fb3bf" stroke-width="2" stroke-linejoin="round"/><path d="M134 12 Q150 14 146 30 Q143 38 131 36" fill="none" stroke="#9fb3bf" stroke-width="5" stroke-linecap="round"/></g></g>
 </svg>`;
}

function ensure(){
 if(box)return;
 const st=document.createElement('style');st.textContent=CSS;document.head.append(st);
 box=document.createElement('div');box.id='wyLF';document.body.append(box);
 box.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.lf==='close'){box.style.display='none';box.className=''}
  if(b.dataset.lf==='latte')openLatte();if(b.dataset.lf==='paper')openPaper();});
}
function shell(title,inner,again,againLabel){
 return `<div class="lf-card"><div class="lf-brand"><img alt="德威陽國際法律事務所" src="${LOGO}"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div><button class="lf-x" data-lf="close" aria-label="關閉">×</button></div><div class="lf-body"><h3>${title}</h3>${inner}<div class="lf-row"><button class="lf-a" data-lf="${again}">${againLabel}</button><button class="lf-b" data-lf="close">返回迎賓大廳</button></div></div></div>`;
}
export function openLatte(){
 ensure();const fest=festToday();lastL=pick(LATTE.length,lastL);const p=LATTE[lastL];
 const sets=p[2].filter(x=>!(fest&&x[3]));const f=sets[Math.floor(Math.random()*sets.length)];
 box.className='';
 box.innerHTML=shell('拉花占卜｜今日法律運勢',
  `<div class="lf-stage">${svgLatte(p[1])}</div>
  <div class="lf-res"><p class="lf-name">${esc(p[0])}</p>
  <div class="lf-luck"><b>今日運勢</b><span>${esc(f[0])}</span></div>
  <p class="lf-tip">${esc(f[1])}</p>
  <div class="lf-wy"><b>德威陽怎麼幫您？</b>${esc(f[2])}</div></div>`,'latte','再來一杯');
 box.style.display='flex';
 box.offsetWidth;requestAnimationFrame(()=>box.classList.add('lf-go'));
}
let festShown=false;
export function openPaper(){
 ensure();const fest=festToday();lastM=pick(MOTTO.length,lastM);let d,tag='頭條';
 if(fest&&!festShown){festShown=true;const F=NEWS_FEST[fest];d=[F[0],F[1],F[2],F[3]];tag='節日特刊'}
 else{do{lastN=pick(NEWS.length,lastN)}while(fest&&NEWS[lastN][4]);d=NEWS[lastN]}
 const now=new Date(),wk='日一二三四五六'[now.getDay()];
 const date=`${now.getFullYear()-1911}年${now.getMonth()+1}月${now.getDate()}日　星期${wk}`;
 /* v515：日報一天一期，從網站上線日（2026/11/24）算第 1 期 */const issue=Math.max(1,Math.floor((new Date(now.getFullYear(),now.getMonth(),now.getDate())-new Date(2026,10,24))/864e5)+1);
 box.className='lf-np';
 box.innerHTML=shell('今日頭條有法度',
  `<div class="np"><div class="np-head wyl-keep" style="display:flex;align-items:center;justify-content:center;gap:10px"><img src="${LOGO}" alt="" style="width:54px;height:54px;object-fit:contain;filter:brightness(1.5) saturate(.7);flex:none"><div style="text-align:center"><b>有法度日報</b><small>YES, WE DO! DAILY</small><small style="display:block;margin-top:3px;letter-spacing:1px;opacity:.95">德威陽國際法律事務所　出版</small></div></div>
  <div class="np-date"><span>${date}</span><span>第 ${issue} 期｜非賣品</span></div>
  <div class="np-main"><span class="np-tag">${tag}</span><p class="np-h">${esc(d[0])}</p>
  <p class="np-sub">${esc(d[3])}</p>
  <p class="np-s"><b>記者觀察：</b>${esc(d[1])}</p>
  <div class="np-motto"><b>編輯台小語</b>${esc(MOTTO[lastM])}</div></div>
  <div style="margin-top:8px;padding-top:6px;border-top:1.5px solid #2E6B4F;display:flex;justify-content:space-between;gap:6px;font:700 11px/1.4 sans-serif;color:#2E6B4F;flex-wrap:wrap"><span>發行｜德威陽國際法律事務所</span><span>LINE @wylaw</span></div></div>
  <div class="lf-res"><div class="lf-wy"><b>德威陽怎麼幫您？</b>${esc(d[2])}</div></div>`,'paper','翻下一版');
 box.style.display='flex';
}
