// v507.1 效能：同一張圖片全站只載入一份（畫質不變，原圖大小不縮）
// 原本每個地方各自 new TextureLoader().load(同一張圖)，手機要各存一份；改成共用同一份圖片來源。
// 各自的貼圖設定（重複、方向、色彩）照舊獨立，GPU 端相同設定只上傳一次。
import * as THREE from 'three';
const cache = new Map();
const orig = THREE.TextureLoader.prototype.load;
if (!THREE.TextureLoader.prototype.__wyCached) {
  THREE.TextureLoader.prototype.__wyCached = true;
  THREE.TextureLoader.prototype.load = function (url, onLoad, onProgress, onError) {
    let key; try { key = new URL((this.path || '') + url, document.baseURI).pathname } catch (e) { key = url }
    const tex = new THREE.Texture();
    let e = cache.get(key);
    /* v510：原稿已被省記憶體放掉的，重新載入一份，不拿空殼去用 */
    if (e && e.source && e.source.data && e.source.data.__mfStub) { cache.delete(key); e = null }
    if (!e) {
      e = { source: null, wait: [], fail: [] }; cache.set(key, e);
      orig.call(this, url, t => { e.source = t.source; const w = e.wait; e.wait = null; w.forEach(f => f()) }, onProgress, err => { cache.delete(key); const f = e.fail; e.fail = null; f.forEach(x => x(err)) });
    }
    const done = () => { tex.source = e.source; tex.needsUpdate = true; if (onLoad) onLoad(tex) };
    if (e.source) { tex.source = e.source; tex.needsUpdate = true; setTimeout(() => { if (onLoad) onLoad(tex) }, 0) } else { e.wait.push(done); e.fail && e.fail.push(err => { if (onError) onError(err) }) }
    return tex;
  };
}
export const wyTexCache = cache;
