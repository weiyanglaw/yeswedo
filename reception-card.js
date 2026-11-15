// 德威陽｜有法度 — 四島共用「接待櫃檯｜事務所今天又怎麼了？」視窗（試玩版）
(function(){
 const WHO={'林律師':'#1A2B4C','夢奇奇飼養者':'#A8476F','哈姆太郎':'#2B6A8A','薪水掌門人':'#8A5A12'};
 const THEME={med:{c:'#2F7A68',bg:'#EAF4F0',name:'醫療法律島'},fam:{c:'#7B5AA6',bg:'#F2ECF8',name:'家庭生活島'},biz:{c:'#4B3470',bg:'#EFEAF5',name:'企業商務島'},lit:{c:'#D9702F',bg:'#FDF0E4',name:'訴訟法律島'}};
 let box,cfg,bag=[],hist=[],pos=-1;
 function css(){return '<style>'+
 '#wyRC{position:fixed;z-index:131;left:50%;bottom:calc(44px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);width:min(92vw,420px);max-height:72dvh;overflow:auto;background:#FFFCF6;border-radius:18px;box-shadow:0 0 0 1.5px #C9A66B,0 0 0 5px #FFFCF6,0 0 0 6px #C9A66B88,0 14px 36px #0006;color:#2D3142;display:none;font-family:-apple-system,BlinkMacSystemFont,"PingFang TC","Noto Sans TC",sans-serif}'+
 '#wyRC *{box-sizing:border-box}'+
 '#wyRC .rc-brand{display:flex;align-items:center;gap:10px;padding:10px 12px 8px}'+
 '#wyRC .rc-brand img{width:38px;height:38px;object-fit:contain;flex:none;background:#fff;border:1.5px solid #C9A66B;border-radius:10px}'+
 '#wyRC .rc-brand div{flex:1;min-width:0}#wyRC .rc-brand b{display:block;font-size:14.5px;color:#1A2B4C;letter-spacing:.5px}#wyRC .rc-brand small{display:block;font-size:9.5px;color:#9A8466;letter-spacing:.6px}'+
 '#wyRC .rc-x{flex:none;width:30px;height:30px;border:1px solid #C9A66B;border-radius:50%;background:#fff;font-size:16px;color:#6a5a40;cursor:pointer;line-height:1}'+
 '#wyRC .rc-band{position:relative;margin:0 12px;padding:9px 14px 8px;border-radius:12px;background:var(--t);color:#fff;overflow:hidden}'+
 '#wyRC .rc-band:after{content:"";position:absolute;inset:3px;border:1px solid #ffffff55;border-radius:9px;pointer-events:none}'+
 '#wyRC .rc-band b{display:block;font-size:17px;letter-spacing:3px}#wyRC .rc-band span{display:block;font-size:12px;opacity:.92;margin-top:1px;letter-spacing:1px}'+
 '#wyRC .rc-band i{position:absolute;right:12px;top:50%;width:30px;height:30px;transform:translateY(-50%);border-radius:50%;border:2px solid #ffffffaa}'+
 '#wyRC .rc-band i:before{content:"";position:absolute;left:50%;top:7px;width:12px;height:9px;transform:translateX(-50%);border-radius:7px 7px 2px 2px;background:#fff}'+
 '#wyRC .rc-band i:after{content:"";position:absolute;left:50%;top:17px;width:18px;height:3px;transform:translateX(-50%);border-radius:2px;background:#fff}'+
 '#wyRC .rc-talk{margin:10px 12px 0;padding:10px 10px 4px;border-radius:12px;background:var(--bg);border:1px solid #E9DCC4}'+
 '#wyRC .rc-l{display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;animation:rcIn .32s both}'+
 '#wyRC .rc-n{flex:none;width:92px;text-align:center;font-size:11.5px;font-weight:800;color:#fff;border-radius:999px;padding:4px 0;margin-top:3px;letter-spacing:.5px}'+
 '#wyRC .rc-s{flex:1;background:#fff;border-radius:4px 12px 12px 12px;padding:6px 10px;font-size:14.5px;line-height:1.6;box-shadow:0 1px 0 #00000012}'+
 '#wyRC .rc-l.last .rc-s{font-weight:700;box-shadow:inset 3px 0 0 #C9A66B,0 1px 0 #00000012}'+
 '#wyRC .rc-foot{display:flex;gap:8px;padding:10px 12px 4px}'+
 '#wyRC .rc-foot button{flex:1;border-radius:11px;padding:9px 4px;font-size:14px;font-weight:800;cursor:pointer;border:1.5px solid var(--t);background:#fff;color:var(--t)}'+
 '#wyRC .rc-foot .nx{background:var(--t);color:#fff}'+
 '#wyRC .rc-note{padding:4px 14px 10px;font-size:10.5px;color:#9A8466;text-align:center}'+
 '@keyframes rcIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}</style>'}
 function draw(){if(!bag.length){bag=[...cfg.lines.keys()].sort(()=>Math.random()-.5);if(bag.length>1&&bag[0]===hist[hist.length-1])bag.push(bag.shift())}return bag.shift()}
 function show(i){const d=cfg.lines[i];box.querySelector('.rc-talk').innerHTML=d.map((l,k)=>'<div class="rc-l'+(k===d.length-1?' last':'')+'" style="animation-delay:'+(k*.16)+'s"><span class="rc-n" style="background:'+(WHO[l[0]]||'#555')+'">'+l[0]+'</span><div class="rc-s">'+l[1]+'</div></div>').join('')}
 function next(){if(pos<hist.length-1)pos++;else{hist.push(draw());pos=hist.length-1}show(hist[pos])}
 function prev(){if(pos>0){pos--;show(hist[pos])}}
 function build(){box=document.createElement('div');box.id='wyRC';box.innerHTML=css()+'<div class="rc-brand"><img src="./office-logo-transparent.png" alt="德威陽國際法律事務所"><div><b>德威陽國際法律事務所</b><small>WEI &amp; YANG INTERNATIONAL LAW FIRM</small></div><button class="rc-x" data-close="1" aria-label="關閉">×</button></div><div class="rc-band"><b>接待櫃檯</b><span>事務所今天又怎麼了？</span><i></i></div><div class="rc-talk"></div><div class="rc-foot"><button data-act="prev">← 上一則</button><button class="nx" data-act="next">下一則 →</button><button data-close="1">返回</button></div><div class="rc-note">德威陽｜有法度・一般法律資訊，個案仍須評估</div>';document.body.appendChild(box);
  box.addEventListener('click',e=>{if(e.target.closest('[data-close]')){box.style.display='none';return}const a=e.target.closest('[data-act]');if(a)(a.dataset.act==='next'?next:prev)()})}
 window.wyReceptionCard=function(theme,lines){if(!box)build();cfg={lines};const t=THEME[theme]||THEME.lit;box.style.setProperty('--t',t.c);box.style.setProperty('--bg',t.bg);bag=[];hist=[];pos=-1;box.style.display='block';next()};
 window.wyReceptionThemes=THEME;
 window.wyReceptionOpen=function(k){const D=window.WY_RECEPTION_DATA||{};if(D[k])window.wyReceptionCard(k,D[k])};
})();
