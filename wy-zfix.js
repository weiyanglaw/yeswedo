// v507 全場景防閃（z-fighting）：找出「同一平面重疊」的兩個物件（地面同高綠塊、門楣金葉貼牆等），
// 讓比較小的那一個用 polygonOffset 穩定畫在上面。只改深度比較，不移動任何物件，所以不會漂浮。
export function wyFixZ(THREE, root, opt = {}) {
  if (!root) return 0;
  root.updateMatrixWorld(true);
  const L = [];
  root.traverse(o => {
    if (!o.isMesh || o.userData.wyZfix) return;
    for (let q = o; q; q = q.parent) if (q.visible === false || q.userData.wyChibi) return; /* v522 人物（頭髮、臉、衣服）不處理，避免林律師像禿頭 */
    const m = Array.isArray(o.material) ? null : o.material;
    if (!m || m.transparent && m.opacity < .6) return;
    if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    const bb = o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld);
    const s = new THREE.Vector3(); bb.getSize(s);
    if (!isFinite(s.x) || Math.max(s.x, s.y, s.z) > (opt.maxSize || 400)) return;
    L.push({ o, bb, s, area: Math.max(s.x * s.z, s.x * s.y, s.y * s.z), idx: L.length });
  });
  const E = .004, hits = new Set();
  /* v516 進島要順：先依左右位置排好，左右碰不到的就不用再比，結果完全一樣 */
  L.sort((p, q) => p.bb.min.x - q.bb.min.x);
  const ov = (a0, a1, b0, b1) => Math.min(a1, b1) - Math.max(a0, b0);
  for (let i = 0; i < L.length; i++) {
    const a = L[i];
    for (let j = i + 1; j < L.length; j++) {
      const b = L[j];
      if (b.bb.min.x - a.bb.max.x > E) break;
      const ox = ov(a.bb.min.x, a.bb.max.x, b.bb.min.x, b.bb.max.x); if (ox < -E) continue;
      const oy = ov(a.bb.min.y, a.bb.max.y, b.bb.min.y, b.bb.max.y); if (oy < -E) continue;
      const oz = ov(a.bb.min.z, a.bb.max.z, b.bb.min.z, b.bb.max.z); if (oz < -E) continue;
      let face = false;
      // 頂面同高（地面、檯面）
      if (Math.abs(a.bb.max.y - b.bb.max.y) < E && ox * oz > .04) face = true;
      // 前後貼面（牆面裝飾、門楣）
      else if ((Math.abs(a.bb.max.z - b.bb.max.z) < E || Math.abs(a.bb.min.z - b.bb.min.z) < E) && ox * oy > .02) face = true;
      else if ((Math.abs(a.bb.max.x - b.bb.max.x) < E || Math.abs(a.bb.min.x - b.bb.min.x) < E) && oz * oy > .02) face = true;
      if (!face) continue;
      const [f, g] = a.idx < b.idx ? [a, b] : [b, a]; const top = f.area <= g.area ? f : g;
      if (top.o.material === (top === a ? b : a).o.material) continue; // 同材質看不出閃
      hits.add(top.o);
    }
  }
  const cache = new Map();
  hits.forEach(o => {
    let m = cache.get(o.material);
    if (!m) { m = o.material.clone(); m.polygonOffset = true; m.polygonOffsetFactor = -2; m.polygonOffsetUnits = -4; cache.set(o.material, m); }
    o.material = m; o.userData.wyZfix = 1;
  });
  return hits.size;
}
