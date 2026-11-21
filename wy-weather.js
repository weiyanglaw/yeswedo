// v507 德威陽法律氣象台（遊戲內版本）：以事務所所在地台北的「目前實況」為準（Open-Meteo 免費服務，連不到就照月份季節）。
// 句子規則：先看日子（節日／連假）再看台北天氣，兩個都對上才出那一格；同一格多句依日期輪流，不隨機。
// 習俗：繼承、遺產類只放平日且措辭放軟；過年與喜慶節日不出；清明寫掃墓交通停車。農曆日期依官方行事曆，每年年底跟陳老闆確認隔年。
const LINE = 'LINE：@wylaw　｜　官網：weiandyang.com';
const CITIES = [['台北', 25.05, 121.53], ['新北', 25.01, 121.46], ['基隆', 25.13, 121.74], ['桃園', 24.99, 121.30], ['新竹', 24.80, 120.97], ['苗栗', 24.56, 120.82], ['台中', 24.15, 120.67], ['彰化', 24.08, 120.54], ['南投', 23.91, 120.68], ['雲林', 23.71, 120.43], ['嘉義', 23.48, 120.45], ['台南', 22.99, 120.21], ['高雄', 22.63, 120.30], ['屏東', 22.67, 120.49], ['宜蘭', 24.75, 121.75], ['花蓮', 23.98, 121.60], ['台東', 22.76, 121.14], ['澎湖', 23.57, 119.58], ['金門', 24.43, 118.32], ['連江', 26.16, 119.95], ['紐約', 40.71, -74.01], ['東京', 35.68, 139.69]];
const STAFF = { rain: ['wx-staff1.png', '夢奇奇飼養者'], typhoon: ['wx-staff1.png', '夢奇奇飼養者'], cold: ['wx-staff3.png', '薪水掌門人'], cloud: ['wx-staff3.png', '薪水掌門人'], sun: ['wx-staff2.png', '哈姆太郎'], hot: ['wx-staff2.png', '哈姆太郎'] };
// 平日（依天氣）：[今日法律提醒, 德威陽怎麼幫您, 繼承類?]
const DAY = {
  rain: [
    ['下雨路滑，萬一發生行車事故，先拍照、報警，現場證據留好。', '釐清行車事故經過，整理證據並規劃理賠方向。'],
    ['雨天外送、叫車變多，消費糾紛的對話紀錄記得截圖保存。', '整理消費往來紀錄，評估退費與求償的可行做法。'],
    ['房子漏水別只靠口頭講，拍照、錄影、傳訊息通知房東。', '審閱租約修繕約定，評估漏水爭議的處理方式。'],
    ['樓上漏水滲到家裡，先拍下水痕與損壞情形，再找管委會。', '盤點相鄰漏水的損害事實，規劃協商與求償步驟。'],
    ['下雨天在賣場滑倒，記得留下現場照片和就醫紀錄。', '評估場所管理責任，整理損害與醫療相關資料。'],
    ['梅雨季工地進度延後，工期展延要用書面跟業主確認。', '審閱工程契約的工期與展延條款，擬定書面通知內容。'],
    ['雨天公司要求冒雨外勤，工作安全的安排可以先問清楚。', '評估勞動安全與職務安排，盤點勞資雙方的權利義務。'],
    ['車子停在路邊被落物砸到，先拍照，再查是誰管理的。', '評估落物損害的責任歸屬，規劃求償對象與方式。'],
    ['網購的雨具品質跟廣告差很多，保留商品頁面截圖。', '比對廣告與實際商品差異，評估消費爭議的主張。'],
    ['下雨天騎車發生擦撞，別急著在現場私下和解。', '評估事故責任比例，擬定和解條件與書面內容。'],
    ['連續下雨，貨物延遲到貨，合約裡的交期條款看一下。', '審閱交貨期限與遲延責任條款，規劃與對方的協商。'],
    ['雨天出租房屋發霉，入住時的屋況照片就很重要了。', '整理屋況證據，評估押金與修繕責任的分擔。']
  ],
  cold: [
    ['天氣轉涼，年終與年假也快到了，勞動契約和公司規定先看清楚。', '審閱勞動契約與公司規章，評估年終與休假的爭議。'],
    ['冷到想窩在家，網購下單前，退換貨規定先看一下。', '評估網購退換貨爭議，整理交易與溝通紀錄。'],
    ['天冷用電暖器，租屋處電線老舊，記得先跟房東反映。', '審閱租賃契約的修繕責任，規劃書面通知方式。'],
    ['寒流來襲，長輩獨居要多關心，重要文件放哪裡也聊一聊。', '盤點家中重要文件，規劃家庭事務的安排方式。', 1],
    ['冷天熱湯熱飲多，餐廳燙傷意外，記得保留就醫單據。', '評估消費場所責任，整理醫療與損害資料。'],
    ['年底公司結算，借給朋友的錢也該想想怎麼要回來了。', '盤點債權證據，規劃催告與求償步驟。'],
    ['天冷容易感冒請病假，請假規則和證明文件先確認好。', '評估請假與考勤爭議，比對公司規定與勞動條件。'],
    ['冬天保養品團購很熱，團購主收錢不出貨，對話先存起來。', '整理團購交易紀錄，評估求償與後續處理方式。'],
    ['冷氣團報到，出國滑雪前，旅行社定型化契約看一下。', '審閱旅遊契約條款，評估取消與退費爭議。'],
    ['家人一起取暖聊天時，可以聊聊對未來的安排與想法。', '規劃家庭財產與意定監護等安排，盤點家人的需要。', 1]
  ],
  hot: [
    ['太陽很大！戶外工作要多喝水、適時休息，身體不舒服先停下來。', '盤點工作場所安全措施，評估勞動條件爭議。'],
    ['熱到開冷氣，租屋冷氣壞了，修繕費誰出，租約先看清楚。', '審閱租約修繕條款，評估費用分擔方式。'],
    ['夏天游泳、玩水的活動多，報名前先看清楚保險與責任規定。', '審閱活動報名條款，評估主辦與參加者的責任。'],
    ['高溫天外送員辛苦了，平台契約的保障內容也值得了解。', '審閱平台合作契約，評估勞務關係與保障內容。'],
    ['夏天出遊旺季，訂房訂票之前，退費條款記得先看一下。', '評估旅遊與住宿退費爭議，整理交易紀錄。'],
    ['熱天車內高溫，二手車交車時，車況紀錄一起確認。', '審閱買賣契約與車況說明，評估瑕疵擔保主張。'],
    ['暑假打工季，學生打工也有基本的勞動權益。', '評估打工勞動條件，盤點工資與工時爭議。'],
    ['天氣熱容易煩躁，網路留言之前，先深呼吸再送出。', '評估網路言論風險，規劃回應與處理方式。'],
    ['夏季用電高峰，公司停電影響交貨，不可抗力條款看一下。', '審閱契約不可抗力條款，評估違約責任的範圍。'],
    ['熱浪來襲，健身房會員想解約，轉讓與退費規定先確認。', '審閱會員契約內容，評估解約與退費方式。']
  ],
  sun: [
    ['適合出門走走！訂房、訂票之前，退費條款記得先看一下。', '評估旅遊、消費糾紛，整理事實與交易紀錄。'],
    ['好天氣適合看房，簽約前先確認產權與屋況。', '審閱不動產買賣契約，盤點交易風險。'],
    ['晴天適合搬家，搬家公司報價和損壞賠償先講好。', '審閱服務契約條款，評估物品損壞的求償方式。'],
    ['天氣好適合談生意，談好的條件記得寫成合約。', '擬定合作契約，規劃權利義務與付款條件。'],
    ['晴朗好心情，跟朋友合夥開店前，分工與分紅先寫清楚。', '規劃合夥架構，擬定分潤與退夥機制。'],
    ['陽光正好，拍照打卡分享前，記得別拍到別人的個資。', '評估肖像與個資使用風險，規劃妥善的處理方式。']
  ],
  cloud: [
    ['天氣陰陰的，正好把抽屜裡的合約拿出來整理一下。', '盤點既有合約，評估到期與續約的重點。'],
    ['多雲微涼，適合坐下來把公司內部規章看一遍。', '審閱公司內部規章，評估勞動管理的風險。'],
    ['陰天在家，順便檢查一下各種會員自動續約的設定。', '審閱定型化契約條款，評估解約與退費方式。'],
    ['天氣普通，收到的存證信函可不普通，先看清楚對方要什麼。', '判讀存證信函內容，擬定回覆與因應策略。'],
    ['多雲的日子適合整理帳務，客戶欠款別放太久。', '盤點應收帳款證據，規劃催收與求償步驟。'],
    ['陰天適合想想品牌名稱，要長久使用，先查詢再申請商標。', '規劃商標布局，評估品牌權利風險。']
  ],
  typhoon: [
    ['颱風來了，出遊行程取消，訂房訂票的退費規定先查清楚。', '評估颱風取消行程的退費爭議，整理交易紀錄。'],
    ['颱風天停班停課，公司要求上班的安排可以先問清楚。', '評估颱風天出勤與工資爭議，比對公司規定。'],
    ['颱風過後屋損，先拍照存證，保險理賠資料一起整理。', '整理損害證據，規劃保險理賠與求償方向。'],
    ['颱風吹倒招牌砸到車，先拍現場，再找管理人。', '評估招牌掉落的管理責任，規劃求償方式。'],
    ['颱風影響船期，國際貨物延誤，合約交期條款先看一下。', '審閱國際買賣契約的交期與風險條款，規劃協商。'],
    ['颱風天外出很危險，重要文件與證據記得先備份。', '盤點重要文件與電子資料，規劃保存方式。']
  ]
};
// 節日與連假：每個節日依晴／雨／颱風／冷熱
const FEST = {
  cny: { sun: [['過年出遊人潮多，訂房訂票的退費規定先看清楚。', '評估旅遊與住宿消費爭議，整理交易紀錄。'], ['新春開工，今年到期的合約先盤點一下。', '盤點年度合約，評估續約與調整重點。']], rain: [['過年返鄉遇到下雨，開車慢一點，事故先拍照。', '釐清行車事故經過，規劃理賠方向。'], ['年假在家，網購年貨記得保留訂單與付款紀錄。', '整理消費往來紀錄，評估退換貨方式。']], cold: [['過年寒流，圍爐暖暖，紅包發完，新年合約也記得看。', '審閱新年度合約條款，標出需要協商的重點。'], ['年節禮盒團購，收錢不出貨，對話紀錄先保存。', '整理團購交易證據，評估求償方式。']] },
  lantern: { sun: [['元宵燈會人潮多，隨身物品要顧好。', '評估活動與消費糾紛，規劃求償方式。']], rain: [['元宵下雨，提燈籠出門小心路滑。', '釐清意外事故經過，整理相關證據。']], cold: [['元宵吃湯圓，冷冷的天也要注意用火安全。', '評估居家意外責任，規劃後續處理方式。']] },
  qingming: { sun: [['清明掃墓路邊停車，注意標線別違停。', '評估交通裁罰內容，規劃陳述與救濟方式。'], ['清明連假車多，開車保持距離，事故先拍照。', '釐清行車事故經過，規劃和解與理賠方向。']], rain: [['清明下雨山路濕滑，開車慢一點。', '評估交通事故責任，整理現場與就醫資料。'], ['清明時節雨紛紛，出門掃墓記得帶傘、注意安全。', '釐清意外事故經過，規劃後續處理步驟。']] },
  dragon: { sun: [['端午連假出遊，訂房訂票的退費規定先看一下。', '評估旅遊消費爭議，整理交易紀錄。'], ['端午划龍舟、玩水，活動保險與報名規定先確認。', '審閱活動契約內容，評估主辦與參加者責任。']], rain: [['端午連假下雨，開車返鄉慢一點，事故先拍照。', '釐清行車事故經過，規劃理賠方向。']], hot: [['端午好熱，戶外活動多喝水，量力而為。', '盤點活動安全責任，評估意外處理方式。']], typhoon: [['端午遇颱風，取消行程的退費規定先查清楚。', '評估颱風取消行程的退費爭議。']] },
  midautumn: { sun: [['中秋烤肉香，注意用火安全，也別影響鄰居。', '評估相鄰關係糾紛，規劃溝通與處理方式。'], ['中秋連假出遊，訂房訂票先看退費條款。', '評估旅遊消費爭議，整理交易紀錄。']], rain: [['中秋下雨，在家賞月也很好，網購月餅留好訂單。', '整理消費往來紀錄，評估退換貨方式。']], typhoon: [['中秋遇颱風，戶外烤肉改期，場地訂金規定先看。', '審閱場地租借條款，評估訂金退還方式。']], hot: [['中秋還很熱，烤肉時多補水，注意用火安全。', '評估居家與活動意外責任，規劃處理方式。']] },
  double10: { sun: [['國慶連假出遊，停車場收費與責任規定看一下。', '評估停車場保管責任，整理相關證據。']], rain: [['國慶連假下雨，開車小心，事故先拍照存證。', '釐清行車事故經過，規劃理賠方向。']], typhoon: [['國慶遇颱風，取消行程的退費規定先查清楚。', '評估颱風取消行程的退費爭議。']], hot: [['國慶連假很熱，戶外活動記得補水。', '盤點活動安全責任，評估意外處理方式。']] },
  mother: { sun: [['母親節訂餐廳，取消與訂金規定先確認。', '審閱訂位與消費條款，評估退費方式。']], rain: [['母親節下雨，宅配禮物記得保留訂單與物流紀錄。', '整理消費往來紀錄，評估遲延與退換貨方式。']], hot: [['母親節帶媽媽出門，天氣熱，行程安排輕鬆一點。', '評估旅遊消費爭議，整理交易紀錄。']] },
  father: { sun: [['父親節送禮網購，記得保留訂單與付款紀錄。', '整理交易紀錄，評估消費爭議處理方式。']], rain: [['父親節下雨，宅配禮物遲到，物流紀錄先截圖。', '評估遲延交付爭議，整理往來紀錄。']], typhoon: [['父親節遇颱風，聚餐改期，訂金規定先看。', '審閱訂位條款，評估訂金退還方式。']], hot: [['父親節天氣熱，帶爸爸出門記得補水休息。', '評估旅遊消費爭議，整理交易紀錄。']] },
  school: { sun: [['開學前租屋，簽約前先確認租期、押金與修繕。', '審閱租賃契約，評估押金與修繕約定。']], rain: [['開學前下雨看房，順便檢查有沒有漏水。', '評估租屋瑕疵爭議，整理屋況證據。']], hot: [['開學前補習班報名，退費規定先看清楚。', '審閱補習班定型化契約，評估退費方式。']], typhoon: [['開學前遇颱風，搬家延期，搬家公司訂金規定先看。', '審閱服務契約條款，評估訂金退還方式。']] },
  yearend: { sun: [['年底了，今年到期的合約與帳款，先盤點一下。', '盤點合約與應收帳款，規劃年度收尾事項。']], cold: [['年底寒冷，尾牙、年終快到了，勞動條件先看清楚。', '審閱勞動條件與獎金規定，評估爭議處理方式。']], rain: [['年底下雨，在家整理今年的重要文件吧。', '盤點重要文件，規劃保存與管理方式。']], cloud: [['年底多雲，正好規劃明年的公司法律事務。', '規劃年度法律事務，盤點待處理事項。']] },
  tax: { sun: [['報稅季，各種收入與扣除的單據先整理好。', '盤點稅務相關文件，評估申報與爭議風險。']], rain: [['報稅季遇雨天，在家線上申報，資料記得備份。', '整理申報資料，評估稅務爭議處理方式。']], hot: [['報稅季天氣熱，別讓文件拖到最後一天。', '盤點申報期限，規劃稅務文件準備。']], cloud: [['報稅季多雲，收到稅單有疑問，先確認期限。', '判讀稅務文件內容，規劃救濟途徑與時程。']] }
};
const FEST_NAME = { cny: '春節', lantern: '元宵', qingming: '清明連假', dragon: '端午連假', midautumn: '中秋連假', double10: '國慶連假', mother: '母親節', father: '父親節', school: '開學前', yearend: '年底', tax: '報稅季' };
const FEST_DAYS = {
  2027: { cny: ['02-05', '02-11'], lantern: ['02-20', '02-20'], qingming: ['04-02', '04-05'], dragon: ['06-09', '06-11'], midautumn: ['09-15', '09-17'], double10: ['10-09', '10-11'] },
  2028: { cny: ['01-25', '01-31'], lantern: ['02-09', '02-09'], qingming: ['04-01', '04-04'], dragon: ['05-27', '05-29'], midautumn: ['10-03', '10-05'], double10: ['10-07', '10-10'] }
};
const NO_INH = ['cny', 'lantern', 'midautumn', 'mother', 'father', 'qingming', 'dragon', 'double10'];
function md(d) { return String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') }
function fest(d) {
  const y = d.getFullYear(), m = md(d), T = FEST_DAYS[y] || {};
  for (const k in T) if (m >= T[k][0] && m <= T[k][1]) return k;
  if (d.getMonth() === 4 && d.getDay() === 0 && d.getDate() >= 8 && d.getDate() <= 14) return 'mother';
  if (m === '08-08') return 'father';
  if (m >= '08-20' && m <= '08-31' || m >= '02-10' && m <= '02-16' && !T.cny) return 'school';
  if (m >= '05-01' && m <= '05-31') return 'tax';
  if (m >= '12-20' && m <= '12-31') return 'yearend';
  return null;
}
function kindOf(code, temp, wind) {
  if (wind >= 50 && code >= 51) return 'typhoon';
  if (code >= 51) return 'rain';
  if (temp != null && temp >= 32) return 'hot';
  if (temp != null && temp <= 15) return 'cold';
  if (code <= 1) return 'sun';
  return 'cloud';
}
const DESC = c => c === 0 ? '晴' : c <= 2 ? '晴時多雲' : c === 3 ? '多雲' : c <= 48 ? '霧' : c <= 57 ? '毛毛雨' : c <= 67 ? '雨' : c <= 77 ? '下雪' : c <= 82 ? '陣雨' : '雷雨';
const ICON = c => c >= 51 ? 'rain' : c === 3 || c >= 45 ? 'cloud' : c >= 1 ? 'part' : 'sun';
function fallback(now) { const m = now.getMonth() + 1; const k = m >= 6 && m <= 9 ? [33, 2] : m === 5 || m === 10 ? [27, 2] : m >= 11 || m <= 2 ? [15, 61] : [22, 3]; return { t: k[0], code: k[1], hi: k[0] + 3, lo: k[0] - 4, wind: 10, est: true } }
let data = null, loading = null;
function fetchAll() {
  if (loading) return loading;
  const lat = CITIES.map(c => c[1]).join(','), lon = CITIES.map(c => c[2]).join(',');
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=auto`;
  loading = fetch(url).then(r => r.json()).then(j => { const arr = Array.isArray(j) ? j : [j]; data = {}; arr.forEach((x, i) => { const c = CITIES[i]; if (!c || !x.current) return; data[c[0]] = { t: Math.round(x.current.temperature_2m), code: x.current.weather_code, wind: x.current.wind_speed_10m, hi: Math.round(x.daily.temperature_2m_max[0]), lo: Math.round(x.daily.temperature_2m_min[0]) } }); return data })
    .catch(() => { data = null; return null });
  return loading;
}
function wx(name) { return (data && data[name]) || fallback(new Date()) }
function pickLine(now) {
  const T = wx('台北'), k = kindOf(T.code, T.t, T.wind), f = fest(now);
  const doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 864e5);
  if (f && FEST[f]) { const F = FEST[f]; const cell = F[k] || F[k === 'typhoon' ? 'rain' : k === 'hot' || k === 'cold' ? 'sun' : 'sun'] || Object.values(F)[0]; return { k, f, line: cell[doy % cell.length] } }
  let cell = DAY[k];
  return { k, f: null, line: cell[doy % cell.length] };
}
function iconSVG(kind, s = 64) {
  const sun = `<circle cx="32" cy="30" r="13" fill="#FFC940"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return `<line x1="${32 + Math.cos(a) * 18}" y1="${30 + Math.sin(a) * 18}" x2="${32 + Math.cos(a) * 24}" y2="${30 + Math.sin(a) * 24}" stroke="#FFB320" stroke-width="4" stroke-linecap="round"/>` }).join('');
  const cloud = (x, y, c) => `<g fill="${c}"><circle cx="${x - 10}" cy="${y}" r="9"/><circle cx="${x + 1}" cy="${y - 6}" r="12"/><circle cx="${x + 12}" cy="${y}" r="9"/><rect x="${x - 19}" y="${y}" width="40" height="9" rx="4.5"/></g>`;
  const inner = kind === 'sun' ? sun : kind === 'part' ? `<g transform="translate(-8 -4) scale(.85)">${sun}</g>` + cloud(38, 40, '#fff') : kind === 'cloud' ? cloud(30, 30, '#C9D4E2') + cloud(38, 40, '#EEF3F8') : cloud(32, 24, '#AFC0D6') + [[20, 42], [32, 46], [44, 42]].map(([x, y]) => `<line x1="${x}" y1="${y}" x2="${x - 3}" y2="${y + 8}" stroke="#3F80DA" stroke-width="4" stroke-linecap="round"/>`).join('');
  return `<svg viewBox="0 0 64 64" width="${s}" height="${s}">${inner}</svg>`;
}
const css = `
#wyWX{position:fixed;inset:0;z-index:135;display:none;align-items:center;justify-content:center;padding:10px;background:#0e1a3aa0;font-family:system-ui,'Noto Sans TC',sans-serif}
#wyWX .c{width:min(95vw,430px);max-height:94dvh;overflow:auto;background:#fff;border:2px solid #d3aa67;border-radius:18px;box-shadow:0 18px 55px #0008}
#wyWX .br{display:flex;align-items:center;gap:10px;padding:8px 12px;border-bottom:1px solid #ecd3a8;position:sticky;top:0;background:#fff;z-index:2}
#wyWX .br img{width:34px;height:34px;object-fit:contain;border:2px solid #d3aa67;border-radius:9px}
#wyWX .br div{flex:1}#wyWX .br b{display:block;font-size:15px;color:#1f3b2f}#wyWX .br small{font-size:10.5px;color:#a07d45}
#wyWX .x{border:0;background:#e9f3ee;color:#1f5a43;font-size:20px;width:36px;height:36px;border-radius:10px;font-weight:700}
#wyWX .bd{padding:10px 12px 12px}
#wyWX h3{margin:0 0 8px;font:900 21px 'Noto Serif TC',serif;color:#1F2E5C;text-align:center}
#wyWX .chips{display:flex;gap:7px;overflow-x:auto;padding:2px 2px 8px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
#wyWX .chip{flex:0 0 auto;scroll-snap-align:start;border:2px solid #E6C27A;background:#FFF8EA;border-radius:13px;padding:5px 8px;display:flex;align-items:center;gap:3px;font:800 13px system-ui;color:#1F2E5C}
#wyWX .chip.on{background:#1F2E5C;color:#F6DC9A}
#wyWX .studio{border-radius:16px;overflow:hidden;border:3px solid #E6C27A;background:linear-gradient(#24376B,#1A2852)}
#wyWX .bar{display:flex;align-items:center;justify-content:space-between;padding:7px 12px;background:#E6C27A;font:900 17px 'Noto Serif TC',serif;color:#1F2E5C}
#wyWX .bar small{font:800 12px system-ui;color:#5a4314}
#wyWX .stage{display:flex;align-items:flex-end;gap:6px;padding:8px 8px 0}
#wyWX .anchor{width:104px;flex:none;display:block}
#wyWX .screen{flex:1;margin-bottom:10px;background:#FFF8EA;border:3px solid #E6C27A;border-radius:14px;padding:8px;display:flex;align-items:center;gap:6px}
#wyWX .big{font:900 32px Georgia,serif;color:#1F2E5C;line-height:1}
#wyWX .cond{font:900 16px system-ui;color:#1F2E5C;margin-top:3px}
#wyWX .hl{font:800 12px system-ui;color:#46507A;margin-top:2px}
#wyWX .tip{margin:0 8px 10px;background:#fff;border-radius:13px;padding:9px 11px;font:800 15.5px/1.5 system-ui;color:#1F2E5C;border:3px solid #E6C27A}
#wyWX .tip b{display:block;color:#A8476F;font-size:12.5px}
#wyWX .wy{margin-top:10px;background:#FDE3C8;border:1px solid #E9B98A;border-left:5px solid #C6A25D;border-radius:10px;padding:9px 10px;color:#5A3216;font-weight:600;font-size:13px;line-height:1.5}
#wyWX .wy>b{display:block;font-size:16px;font-weight:800;margin-bottom:3px;color:#8A3D10}
#wyWX .wy:after{content:"${LINE}";display:block;margin-top:5px;padding-top:4px;border-top:1px dashed currentColor;font-size:13px;font-weight:700;color:#8A3D10}
#wyWX .note{font-size:11px;color:#7a7f8c;text-align:center;margin-top:6px}
#wyWXr{position:fixed;left:10px;top:calc(76px + env(safe-area-inset-top,0px));z-index:96;transform:translateX(-120%);transition:transform .45s cubic-bezier(.2,.9,.3,1.15);display:flex;align-items:center;gap:8px;background:#1F2E5C;border:3px solid #E6C27A;border-radius:18px;padding:6px 12px 6px 6px;max-width:300px;font-family:system-ui,'Noto Sans TC',sans-serif}
#wyWXr.on{transform:none}#wyWXr img{width:44px;height:44px;border-radius:50%;background:#FFF8EA;object-fit:cover;object-position:top}
#wyWXr b{display:block;color:#F6DC9A;font:900 14px 'Noto Serif TC',serif}#wyWXr span{color:#fff;font:800 13px system-ui}
#wyWxLine{margin-top:3px;font:800 12px system-ui;color:#1F5A43;cursor:pointer}
`;
let box, city = '台北', rib;
try { city = localStorage.getItem('wy-wx-city') || '台北' } catch (e) { }
function ensure() {
  if (box) return; const st = document.createElement('style'); st.textContent = css; document.head.append(st);
  box = document.createElement('div'); box.id = 'wyWX'; document.body.append(box);
  box.addEventListener('click', e => { const b = e.target.closest('[data-c],button'); if (!b) return; if (b.dataset.a === 'close') { box.style.display = 'none'; return } if (b.dataset.c) { city = b.dataset.c; try { localStorage.setItem('wy-wx-city', city) } catch (e) { } render(); const ch = box.querySelector('.chip.on'); ch && ch.scrollIntoView({ inline: 'center', block: 'nearest' }) } });
}
function render() {
  const now = new Date(), P = pickLine(now), W = wx(city), st = STAFF[P.k] || STAFF.sun;
  const ttl = P.f ? FEST_NAME[P.f] + '｜' : '';
  box.innerHTML = `<div class="c"><div class="br"><img alt="德威陽國際法律事務所" src="./office-logo-transparent.png"><div><b>德威陽國際法律事務所</b><small>Wei &amp; Yang International Law Firm</small></div><button class="x" data-a="close" aria-label="關閉">×</button></div>
  <div class="bd"><h3>德威陽法律氣象台</h3>
  <div class="chips">${CITIES.map(([n]) => { const w = wx(n); return `<button class="chip${n === city ? ' on' : ''}" data-c="${n}">${iconSVG(ICON(w.code), 22)}${n} ${w.t}°</button>` }).join('')}</div>
  <div class="studio"><div class="bar">${city}<small>${now.getMonth() + 1}/${now.getDate()} ${ttl}${W.est ? '季節參考' : '目前實況'}</small></div>
   <div class="stage"><img class="anchor" src="./${st[0]}" alt="${st[1]}"><div class="screen">${iconSVG(ICON(W.code), 64)}<div><div class="big">${W.t}°C</div><div class="cond">${DESC(W.code)}</div><div class="hl">最高 ${W.hi}° ／ 最低 ${W.lo}°</div></div></div></div>
   <div class="tip"><b>${st[1]}｜今日法律提醒</b>${P.line[0]}</div></div>
  <div class="wy"><b>德威陽怎麼幫您？</b>${P.line[1]}</div>
  <p class="note">法律提醒依台北（事務所所在地）的天氣與日子每天更新</p></div></div>`;
  box.style.display = 'flex';
}
export function openWeather() { ensure(); render(); fetchAll().then(() => { if (box.style.display === 'flex') render() }) }
export function setupWeather(O) {
  ensure();
  // v508：原本把天氣放在 #hud 裡，但新版左上名牌是 game-ui 的 .guBadge，#hud 被藏起來所以看不到；改成名牌正下方一顆可點的天氣小膠囊
  const st = document.createElement('button'); st.id = 'wyWxChip'; st.type = 'button'; st.textContent = '法律氣象台 讀取中…';
  st.style.cssText = 'position:fixed;z-index:61;left:14px;top:calc(env(safe-area-inset-top,0px) + 84px);display:none;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;border:2px solid #E0B64E;background:#FFFDF3F2;color:#1A2B4C;font:800 13px "Huninn","PingFang TC","Noto Sans TC",system-ui;box-shadow:0 3px 10px #0003;cursor:pointer';
  document.body.append(st); st.addEventListener('click', () => openWeather());
  const place = () => { const b = document.querySelector('.guBadge'); if (b) { const r = b.getBoundingClientRect(); if (r.height) st.style.top = (r.bottom + 6) + 'px' } };
  (function vis() { let ok = true; try { ok = !O.ready || O.ready() } catch (e) { } const b = document.querySelector('.guBadge'); const bv = !b || getComputedStyle(b).opacity !== '0'; st.style.display = ok && bv ? 'flex' : 'none'; if (ok) place(); setTimeout(vis, 600) })();
  const line = () => { const W = wx('台北'); st.textContent = '台北 ' + DESC(W.code) + ' ' + W.t + '°C｜法律氣象台' };
  fetchAll().then(line); line();
  rib = document.createElement('div'); rib.id = 'wyWXr'; document.body.append(rib); rib.addEventListener('click', () => { rib.classList.remove('on'); openWeather() });
  // 每天第一次進城堡廣場：左上角滑出小橫幅 3 秒
  const key = 'wy-wx-day', today = new Date().toDateString();
  let shown = false; try { shown = localStorage.getItem(key) === today } catch (e) { }
  if (!shown) { const tryShow = () => { if (O.ready && !O.ready()) { setTimeout(tryShow, 1500); return } fetchAll().then(() => { const W = wx('台北'), P = pickLine(new Date()), s = STAFF[P.k] || STAFF.sun; rib.innerHTML = `<img src="./${s[0]}" alt=""><div><b>德威陽法律氣象台</b><span>台北 ${DESC(W.code)} ${W.t}°C｜點我看今日提醒</span></div>`; rib.classList.add('on'); try { localStorage.setItem(key, today) } catch (e) { } setTimeout(() => rib.classList.remove('on'), 4000) }) }; setTimeout(tryShow, 2500) }
  return { openWeather };
}
export const _test = { pickLine, fest, kindOf, DAY, FEST };
