// v510 省記憶體（畫面完全不變）：東西交給手機顯示晶片之後，程式這邊留著的備份丟掉
// 1. 文字看板的畫布、圖片：顯示晶片已經有一份，程式這邊的原稿放掉（用 WeakRef 記著：
//    如果別的程式還拿著原稿、之後又改字，就自動接回原稿，那塊看板以後不再處理）
// 2. 形狀的方向、貼圖座標、顏色資料：顯示晶片已經有一份就放掉；位置資料保留（點擊、走路判斷要用）
// 3. 只處理 20 秒內完全沒變過的東西；會動、會改字的一律不碰
// 4. 萬一手機把顯示晶片清掉（極少見），整頁重新整理，不會出現空白看板
export function setupMemFree(THREE, renderer, getScenes) {
  const EMPTY = new Float32Array(0);
  const seenTex = new Map(), seenAttr = new Map();
  let freedTex = 0, freedAttr = 0, freedBytes = 0, applied = false;
  const isStaticImg = im => im && (im.tagName === 'CANVAS' || im.tagName === 'IMG' || false);
  const walk = fn => { for (const sc of getScenes()) { if (sc) sc.traverse(fn) } };
  function scan(now) {
    walk(o => {
      if (o.isMesh || o.isSprite) {
        const ms = Array.isArray(o.material) ? o.material : [o.material];
        for (const m of ms) {
          if (!m) continue;
          for (const k of ['map', 'emissiveMap', 'alphaMap']) {
            const t = m[k];
            if (!t || t.isVideoTexture || t.isRenderTargetTexture || t.userData.__mf) continue;
            const im = t.image;
            if (!isStaticImg(im)) continue;
            const s = seenTex.get(t);
            if (!s) seenTex.set(t, { v: t.version, at: now });
            else if (s.v !== t.version) { s.v = t.version; s.at = now }
          }
        }
      }
      if (o.isMesh && o.geometry && !o.isSkinnedMesh && !o.morphTargetInfluences) {
        const g = o.geometry;
        if (g.userData.__mfSkip) return;
        for (const n in g.attributes) {
          if (n === 'position') continue;
          const a = g.attributes[n];
          if (!a || a.isInterleavedBufferAttribute || a.isInstancedBufferAttribute || !a.array || a.array === EMPTY) continue;
          const s = seenAttr.get(a);
          if (!s) seenAttr.set(a, { v: a.version, at: now });
          else if (s.v !== a.version) { s.v = a.version; s.at = now }
        }
      }
    });
  }
  // 全站統一：任何貼圖要重新上傳時，如果原稿已放掉，先接回原稿（還在記憶體）或從原網址重新載入圖片
  const P = THREE.Texture.prototype, D = Object.getOwnPropertyDescriptor(P, 'needsUpdate');
  if (D && D.set && !P.__mfPatched) {
    P.__mfPatched = true;
    Object.defineProperty(P, 'needsUpdate', {
      configurable: true, get: D.get,
      set(v) {
        const src = this.source, d = src && src.data;
        if (v && d && d.__mfStub) {
          const back = src.__mfRef && src.__mfRef.deref();
          if (back) src.data = back;
          else if (d.src) { const im = new Image(); im.crossOrigin = 'anonymous'; const self = this; im.onload = () => { src.data = im; D.set.call(self, true) }; im.src = d.src; return }
          else return;
        }
        D.set.call(this, v);
      }
    });
  }
  const hook = t => { t.userData.__mf = 1 };
  function freeTexture(t) {
    const src = t.source, im = src.data;
    if (im && im.__mfStub) { hook(t); return }
    if (typeof WeakRef === 'undefined' || src.__mfBusy) return;
    const w = im.width || im.naturalWidth || 1, h = im.height || im.naturalHeight || 1;
    const make = blob => {
      if (src.data !== im) { src.__mfBusy = 0; return } // 這段時間被換過，不處理
      src.__mfRef = new WeakRef(im);
      // 空殼：保留尺寸、原網址或無損 PNG 備份；有程式要重新畫字時，給原稿或同尺寸新畫布
      const stub = { width: w, height: h, naturalWidth: w, naturalHeight: h, src: (im.src && !/^blob:/.test(im.src)) ? im.src : '', blob, __mfStub: true, __src: src,
        getContext(...a) { let c = src.__mfRef.deref(); if (!c || !c.getContext) { c = document.createElement('canvas'); c.width = w; c.height = h } src.data = c; return c.getContext(...a) } };
      src.data = stub; src.__mfBusy = 0;
      freedBytes += w * h * 4; freedTex++;
    };
    src.__mfBusy = 1; hook(t);
    if (src.__mfBlob) make(src.__mfBlob);
    else if (im.tagName === 'CANVAS') im.toBlob(b => { if (b) make(b); else src.__mfBusy = 0 }, 'image/png');
    else if (im.src) make(null); else src.__mfBusy = 0;
  }
  // 顯示晶片要用到一張原稿已放掉的看板（例如第一次走到那一層）：原稿還在就直接用；
  // 不在就先放同尺寸空白，馬上從 PNG 備份（或原網址）還原，幾格畫面內補上，內容一模一樣
  const blank = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c };
  function rescue(tex) {
    const src = tex.source, d = src.data;
    const back = src.__mfRef && src.__mfRef.deref();
    if (back) { src.data = back; return }
    src.data = blank(d.width, d.height);
    const done = img => { src.data = img; if (d.blob) src.__mfBlob = d.blob; tex.needsUpdate = true };
    const url = d.blob ? URL.createObjectURL(d.blob) : d.src;
    if (!url) return;
    const im = new Image(); if (!d.blob) im.crossOrigin = 'anonymous';
    im.onload = () => { done(im); if (d.blob) setTimeout(() => URL.revokeObjectURL(url), 1000) }; im.src = url;
  }
  // 每一個畫面產生器（主畫面、角落小人物、預覽…）都裝上同樣的保護：共用的看板第一次被別的畫面用到時也能還原
  const guard = rr => { if (!rr || rr.__mfP) return; rr.__mfP = 1; const PR = rr.properties, pget = PR.get.bind(PR);
    PR.get = function (o) { const r = pget(o); if (o && o.isTexture && o.version > 0 && r.__version !== o.version) { const d = o.source && o.source.data; if (d && d.__mfStub) rescue(o) } return r } };
  guard(renderer);
  // 其他畫面產生器（角落小人物、選角預覽、拍照）建立時都會登記，這裡一起裝上保護
  window.__wyMFGuard = guard; (window.__wyMFReg || []).forEach(guard); window.__wyMFReg = [];
  function freeAttr(a) {
    const bytes = a.array.byteLength;
    // 先確定已經交給顯示晶片：等下一次真正上傳完成才放掉
    a.onUploadCallback = function () { if (this.array !== EMPTY) { freedBytes += this.array.byteLength; this.array = EMPTY; freedAttr++ } };
    a.needsUpdate = true;
    return bytes;
  }
  function pass() {
    const now = performance.now();
    scan(now);
    let nT = 0, nA = 0;
    // 同一份原稿的所有看板，都真的已經交給顯示晶片、而且 20 秒沒變，才放掉原稿
    const bySrc = new Map();
    for (const [t, s] of seenTex) { const k = t.source; if (!bySrc.has(k)) bySrc.set(k, []); bySrc.get(k).push([t, s]) }
    const up = t => { const pr = renderer.properties.get(t); return pr && pr.__webglTexture && pr.__version === t.version };
    for (const [src, list] of bySrc) {
      if (src.data && src.data.__mfStub) { list.forEach(([t]) => hook(t)); continue }
      if (nT >= 12) break;
      if (!list.every(([t, s]) => now - s.at >= 20000 && up(t))) continue;
      try { freeTexture(list[0][0]); list.forEach(([t]) => hook(t)); nT++ } catch (e) { src.__mfBusy = 0 }
    }
    for (const [a, s] of seenAttr) {
      if (a.__mfQueued || now - s.at < 20000 || nA >= 400) continue;
      a.__mfQueued = 1; try { freeAttr(a); nA++ } catch (e) {}
    }
    if (nT || nA) applied = true;
    window.wyMemFree = { textures: freedTex, attrs: freedAttr, MB: +(freedBytes / 1048576).toFixed(1) };
  }
  // 每 3 秒處理一小批，不會一次卡住畫面
  setInterval(() => { try { pass() } catch (e) {} }, 3000);
  const cv = renderer.domElement;
  cv.addEventListener('webglcontextrestored', () => { if (applied) location.reload() }, false);
  return { pass };
}
