/* v509 2 樓四個遊戲（陳老闆 11-21 定稿）：夢奇奇桌＝LINE 秒回、薪水掌門人桌＝三點半、哈姆太郎桌＝海報、德威陽漫畫＝漫畫館。
   遊戲放在獨立頁 wy-2f-games.html，點了才載入；關閉就整個移除，記憶體立刻還回去。 */
(function(){
 let ov=null;
 function close(){if(!ov)return;const f=ov.querySelector('iframe');try{f.src='about:blank'}catch(e){}ov.remove();ov=null;try{window.wySfx&&window.wySfx('tap')}catch(e){}}
 window.wy2fOpen=function(g){if(ov)close();ov=document.createElement('div');ov.id='wy2fOv';
  ov.style.cssText='position:fixed;inset:0;z-index:9000;background:rgba(11,31,47,.55);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s';
  const f=document.createElement('iframe');f.src='wy-2f-games.html?v=509&embed=1&g='+g;f.allow='autoplay';f.title='德威陽 2 樓互動';
  f.style.cssText='border:0;background:transparent;width:min(440px,96vw);height:min(calc(86dvh),800px);color-scheme:normal';
  ov.appendChild(f);ov.addEventListener('click',e=>{if(e.target===ov)close()});document.body.appendChild(ov);requestAnimationFrame(()=>ov.style.opacity='1');
  try{window.wySfx&&window.wySfx('tap')}catch(e){}};
 window.addEventListener('message',e=>{if(e.data==='wy2fClose')close()});
 window.wy2fClose=close;
})();
