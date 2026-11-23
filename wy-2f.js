/* v509 2 樓四個遊戲（陳老闆 11-21 定稿）：夢奇奇桌＝LINE 秒回、薪水掌門人桌＝三點半、哈姆太郎桌＝海報、德威陽漫畫＝紀錄片放映廳。
   遊戲放在獨立頁，點了才載入；關閉就整個移除，記憶體立刻還回去。
   v514：同一套外框也用在 2 樓影印機（wy-2f-printer.html）、茶水間彈珠台／貪食蛇（wy-tea-games.html）、八卦沙發（wy-tea-gossip.html）。 */
(function(){
 let ov=null;
 function close(){if(!ov)return;const f=ov.querySelector('iframe');try{f.src='about:blank'}catch(e){}ov.remove();ov=null;try{window.wySfx&&window.wySfx('tap')}catch(e){}}
 function open(src,title){if(ov)close();ov=document.createElement('div');ov.id='wy2fOv';
  ov.style.cssText='position:fixed;inset:0;z-index:9000;background:rgba(11,31,47,.55);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s';
  const f=document.createElement('iframe');f.src=src; /* v513：參數放在 # 後面，網址固定，背景先下載的檔案才用得到 */f.allow='autoplay';f.title=title||'德威陽互動';
  f.style.cssText='border:0;background:transparent;width:min(440px,96vw);height:min(calc(86dvh),800px);color-scheme:normal';
  ov.appendChild(f);ov.addEventListener('click',e=>{if(e.target===ov)close()});document.body.appendChild(ov);requestAnimationFrame(()=>ov.style.opacity='1');
  try{window.wySfx&&window.wySfx('tap')}catch(e){}}
 window.wy2fOpen=function(g){open('wy-2f-games.html?v=515#embed=1&g='+g,'德威陽 2 樓互動')};
 window.wyPageOpen=function(page,g){open(page+'?v=515#embed=1'+(g!=null?'&g='+g:''),'德威陽互動')};
 window.addEventListener('message',e=>{if(e.data==='wy2fClose')close()});
 window.wy2fClose=close;
})();
