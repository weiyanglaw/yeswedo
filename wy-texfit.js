// v508 圖片瘦身：圖片比手機畫面上可能顯示的最大尺寸還大很多時，縮小到剛好夠用（長邊上限 cap）。
// 平常看到的大多是縮小後的版本（GPU 本來就會用縮小版來畫遠處），畫面幾乎看不出差別；
// 招牌這類「之後還會重畫文字」的圖，重畫時會自動再縮一次，不會壞掉。
export function setupTexFit(T, { cap = 1280, keep = null } = {}) {
  const map = new Map();          // 舊圖 → 新的小圖
  const keys = ['map', 'emissiveMap', 'alphaMap', 'roughnessMap', 'metalnessMap', 'normalMap', 'aoMap', 'bumpMap'];
  const shrink = (src, w, h) => {
    const k = cap / Math.max(w, h), nw = Math.max(1, Math.round(w * k)), nh = Math.max(1, Math.round(h * k));
    const c = document.createElement('canvas'); c.width = nw; c.height = nh;
    const g = c.getContext('2d'); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high'; g.drawImage(src, 0, 0, nw, nh); return c;
  };
  function smallFor(S) {
    if (map.has(S)) return map.get(S);
    let r = null;
    const src = S.data;
    if (src && src.tagName !== 'VIDEO' && !(src.tagName === 'IMG' && !src.complete)) {
      const w = src.width || src.naturalWidth || 0, h = src.height || src.naturalHeight || 0;
      if (w && h && Math.max(w, h) > cap && !(src.src && keep && keep.test(src.src)) && (src.tagName === 'IMG' || src.tagName === 'CANVAS' || (typeof ImageBitmap !== 'undefined' && src instanceof ImageBitmap))) {
        const NS = new T.Source(shrink(src, w, h)), orig = src;
        // 之後程式在原本那張大圖上重畫（招牌換字等）並通知更新時，自動重新縮一次
        Object.defineProperty(NS, 'needsUpdate', { configurable: true, set(v) { if (v === true) { try { const ww = orig.width || orig.naturalWidth, hh = orig.height || orig.naturalHeight; this.data = shrink(orig, ww, hh) } catch (e) { } this.version++ } } });
        r = { NS, saved: (w * h - NS.data.width * NS.data.height) * 4 * 1.33 };
      }
    }
    map.set(S, r); return r;
  }
  function fitTex(t) {
    if (!t || !t.isTexture || t.isVideoTexture || t.isRenderTargetTexture || t.isDataTexture || t.isCompressedTexture || t.isCubeTexture || !t.source) return 0;
    if (t.userData.wyFit) return 0;
    const r = smallFor(t.source); if (!r) return 0;
    t.dispose();                    // 先釋放舊的大圖
    t.source = r.NS; t.userData.wyFit = true; t.needsUpdate = true;
    return r.saved;
  }
  function apply(roots) {
    let saved = 0; const seenSrc = new Set();
    for (const root of [].concat(roots)) root.traverse(o => { if (o.isSprite) return; /* 陳老闆：拱形名牌（浮在家具上的名牌）近看會變軟 → 名牌一律維持原畫質 */ const ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
      for (const m of ms) for (const k of keys) { const t = m[k]; if (!t || !t.isTexture) continue; const S = t.source; const s = fitTex(t); if (s && !seenSrc.has(S)) { seenSrc.add(S); saved += s } } });
    return saved;
  }
  return { apply };
}
