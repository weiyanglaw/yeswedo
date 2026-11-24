// v513 背景先下載（陳老闆 11-22 同意）：選完角色、開始在島上走之後，才一個一個把「點了才打開」的遊戲檔先存進手機。
// 只下載、不打開，不佔記憶體；畫面有一點忙（有一格畫超過 40 毫秒）就先暫停，等順了再繼續；開場、選角完全不碰。
const LIST = ["wy-2f-games.html?v=518", "wy-2f-printer.html?v=518", "wy-tea-games.html?v=518", "wy-tea-gossip.html?v=518", "ph-castle.html?v=510", "ph-lit.html?v=510", "ph-med.html?v=510", "ph-fam.html?v=510", "ph-biz.html?v=510", "ph-biz-bg.jpg", "ph-biz-logo.png", "ph-biz-seat-you.png", "ph-biz-staff0.png", "ph-biz-staff1.png", "ph-biz-staff2.png", "ph-biz-staff3.png", "ph-castle-bg_castle.jpg", "ph-castle-logo.png", "ph-castle-seat-you.png", "ph-castle-seat-youM.png", "ph-fam-bg.jpg", "ph-fam-logo.png", "ph-fam-seat-you.png", "ph-fam-staff0.png", "ph-fam-staff1.png", "ph-fam-staff2.png", "ph-fam-staff3.png", "ph-lit-bg.jpg", "ph-lit-judge.png", "ph-lit-logo.png", "ph-lit-mq_ref.png", "ph-lit-seat-you.png", "ph-lit-staff0.png", "ph-lit-staff1.png", "ph-lit-staff2.png", "ph-lit-staff3.png", "ph-lit-tpl_foot.png", "ph-lit-tpl_head.png", "ph-med-bg.jpg", "ph-med-logo.png", "ph-med-seat-you.png", "wy-3f-media.js?v=518"];
let started = false;
export function setupPrefetch() {
  if (started || window.__pfOff) return; started = true;
  let lastLong = performance.now(), prev = performance.now();
  const watch = t => { if (t - prev > 40) lastLong = t; prev = t; requestAnimationFrame(watch) }; requestAnimationFrame(watch);
  const ready = () => { const c = document.getElementById('creator'); return (!c || getComputedStyle(c).display === 'none') && !window.wyOpeningOn && !document.body.classList.contains('wy-opening') && !document.hidden };
  const calm = () => window.__pfForce || performance.now() - lastLong > 1500; // __pfForce 只給測試機用（測試機沒有顯示晶片，每格都很慢）
  let i = 0, okSince = 0;
  const tick = async () => {
    if (i >= LIST.length) return;
    if (!ready() || !calm()) { okSince = 0; return setTimeout(tick, 1000) }
    if (!okSince) okSince = performance.now();
    if (performance.now() - okSince < 8000) return setTimeout(tick, 1000); // 開始逛之後先等 8 秒
    const u = LIST[i++];
    try { const r = await fetch(u, { priority: 'low', cache: 'force-cache' }); await r.blob() } catch (e) { }
    setTimeout(tick, 400);
  };
  setTimeout(tick, 3000);
}
