// v508 重畫工具：外觀完全不變，只改「形狀資料怎麼存」，讓手機少用記憶體
// 1. 一模一樣的形狀只存一份：資料逐位元組比對完全相同，才讓多個物件共用同一份（位置、大小、顏色都還是各自的）
// 2. 同一個形狀裡重複的點只記一次：所有資料（位置、方向、貼圖座標…）完全相同的點才合成一個，三角形一個不少
// 3. 會在執行中變動的形狀（例如海浪、會動的旗子）一律不動
// 每一區處理前後各畫一張比對，只要有任何一點不同就全部還原
export function setupRedraw(THREE) {
  const fnv = (h, u) => { for (let i = 0; i < u.length; i++) { h ^= u[i]; h = Math.imul(h, 16777619) >>> 0 } return h };
  const words = a => a.byteLength % 4 === 0 ? new Uint32Array(a.buffer, a.byteOffset, a.byteLength / 4) : new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
  const plain = g => {
    for (const n in g.attributes) { const a = g.attributes[n]; if (a.isInterleavedBufferAttribute || !a.array || !a.array.length || a.__mfQueued) return false /* v511：已被省記憶體放掉備份的形狀不能再重算，否則會變黑 */ }
    if (g.morphAttributes && Object.keys(g.morphAttributes).length) return false;
    return true;
  };
  const keyOf = g => {
    let h = 2166136261 >>> 0; const parts = [];
    for (const n of Object.keys(g.attributes).sort()) { const a = g.attributes[n]; parts.push(n + a.itemSize + (a.normalized ? 'n' : '') + a.array.constructor.name + a.array.length); h = fnv(h, words(a.array)) }
    if (g.index) { parts.push('i' + g.index.array.constructor.name + g.index.array.length); h = fnv(h, words(g.index.array)) }
    parts.push('d' + g.drawRange.start + ',' + g.drawRange.count, 'g' + g.groups.map(x => x.start + ',' + x.count + ',' + x.materialIndex).join(';'));
    return h + '|' + parts.join('|');
  };
  const same = (a, b) => {
    const ka = Object.keys(a.attributes), kb = Object.keys(b.attributes); if (ka.length !== kb.length) return false;
    for (const n of ka) { const x = a.attributes[n], y = b.attributes[n]; if (!y || x.itemSize !== y.itemSize || x.normalized !== y.normalized || x.array.constructor !== y.array.constructor || x.array.length !== y.array.length) return false; const u = words(x.array), w = words(y.array); for (let i = 0; i < u.length; i++) if (u[i] !== w[i]) return false }
    if (!!a.index !== !!b.index) return false;
    if (a.index) { const u = a.index.array, w = b.index.array; if (u.length !== w.length || u.constructor !== w.constructor) return false; for (let i = 0; i < u.length; i++) if (u[i] !== w[i]) return false }
    return true;
  };
  // 把沒有索引的形狀，相同的點合成一個（全部資料逐位元組相同才合）
  function weld(g) {
    if (g.index) return null;
    const P = g.attributes.position, n = P.count; if (n < 6) return null;
    if (g.drawRange.start !== 0 || (g.drawRange.count !== Infinity && g.drawRange.count < n)) return null;
    const names = Object.keys(g.attributes), W = names.map(k => ({ k, a: g.attributes[k], u: words(g.attributes[k].array) }));
    const per = W.map(x => x.u.length / n);
    if (per.some(p => p !== Math.floor(p))) return null;
    const map = new Map(), remap = new Uint32Array(n); let uniq = 0; const keep = [];
    const eq = (i, j) => { for (let t = 0; t < W.length; t++) { const p = per[t], u = W[t].u; for (let k = 0; k < p; k++) if (u[i * p + k] !== u[j * p + k]) return false } return true };
    for (let i = 0; i < n; i++) {
      let h = 2166136261 >>> 0;
      for (let t = 0; t < W.length; t++) { const p = per[t], u = W[t].u; for (let k = 0; k < p; k++) { h ^= u[i * p + k]; h = Math.imul(h, 16777619) >>> 0 } }
      let bucket = map.get(h), id = -1;
      if (bucket) { for (const q of bucket) if (eq(keep[q], i)) { id = q; break } } else map.set(h, bucket = []);
      if (id < 0) { id = uniq++; keep.push(i); bucket.push(id) }
      remap[i] = id;
    }
    if (uniq > n * .8) return null;
    const ng = new THREE.BufferGeometry();
    for (const x of W) { const a = x.a, s = a.itemSize, src = a.array, dst = new src.constructor(uniq * s); for (let q = 0; q < uniq; q++) { const i = keep[q]; for (let k = 0; k < s; k++) dst[q * s + k] = src[i * s + k] } ng.setAttribute(x.k, new THREE.BufferAttribute(dst, s, a.normalized)) }
    const idx = uniq > 65535 ? new Uint32Array(n) : new Uint16Array(n); for (let i = 0; i < n; i++) idx[i] = remap[i];
    ng.setIndex(new THREE.BufferAttribute(idx, 1));
    for (const gr of g.groups) ng.addGroup(gr.start, gr.count, gr.materialIndex);
    ng.boundingBox = g.boundingBox ? g.boundingBox.clone() : null; ng.boundingSphere = g.boundingSphere ? g.boundingSphere.clone() : null;
    ng.userData = g.userData; ng.name = g.name;
    return ng;
  }
  const versions = g => { let s = ''; for (const n in g.attributes) s += g.attributes[n].version + ','; return s + (g.index ? g.index.version : '') };
  // 先記下每個形狀的版本，delay 後再看，期間有變動的（會動的形狀）不處理
  function collect(root) {
    const L = new Map();
    root.traverse(o => { if ((o.isMesh || o.isLine || o.isPoints) && !o.isSkinnedMesh && o.geometry && o.geometry.isBufferGeometry && plain(o.geometry)) { let e = L.get(o.geometry); if (!e) L.set(o.geometry, e = { v: versions(o.geometry), users: [] }); e.users.push(o) } });
    return L;
  }
  async function apply(root, L, budget = 8) {
    const undo = []; let before = 0, after = 0;
    const bytes = g => { let s = 0; for (const n in g.attributes) s += g.attributes[n].array.byteLength; if (g.index) s += g.index.array.byteLength; return s };
    const stable = []; L.forEach((e, g) => { if (versions(g) === e.v && e.users.every(o => o.geometry === g)) stable.push([g, e]) });
    // 1. 相同的點合一
    const canon = new Map();
    let t0 = performance.now();
    for (const [g, e] of stable) {
      if (performance.now() - t0 > budget) { await new Promise(r => requestAnimationFrame(r)); t0 = performance.now() }
      before += bytes(g);
      const w = weld(g); let use = g;
      if (w && bytes(w) < bytes(g) * .85) { use = w; for (const o of e.users) { undo.push([o, o.geometry]); o.geometry = w } }
      // 2. 一模一樣的只存一份
      const k = keyOf(use); let list = canon.get(k); if (!list) canon.set(k, list = []);
      let hit = list.find(c => same(c, use));
      if (hit && hit !== use) { for (const o of e.users) { undo.push([o, o.geometry]); o.geometry = hit } }
      else { if (!hit) list.push(use); after += bytes(use) }
    }
    return { undo, before, after };
  }
  function revert(undo) { for (let i = undo.length - 1; i >= 0; i--) { const [o, g] = undo[i]; o.geometry = g } }
  function freeOld(undo) {
    const inUse = new Set(); const chk = [];
    for (const [o, g] of undo) chk.push(g);
    // 舊形狀已經沒人用了就釋放顯示記憶體
    // v514 不卡頓：先把「目前還在用的形狀」收成一份清單，再一次比對（原本兩層迴圈，物件多時會停頓）；結果相同
    const cur = new Set(); for (const [o] of undo) cur.add(o.geometry);
    for (const g of new Set(chk)) { if (!cur.has(g)) try { g.dispose() } catch (e) { } }
  }
  return { collect, apply, revert, freeOld };
}
