// v509 閃爍修正：兩個面疊在同一平面會在手機上閃（2 樓左牆、2 樓地毯與書桌、3 樓健身房地板、訴訟島門口廣場）。
// 用「顏色＋大小」找到那一片，往外推 1～4 公分，外觀不變。
const R = {
  ext: [['f5d9b7', 'Cylinder', [16.4, 0, 16.4], 'y', .015]],
  office: [['d6e1e5', 'Box', [12.3, 0, 9.8], 'y', .02], ['ffffff', 'Plane', [11.6, 0, 6.4], 'y', .04], ['ffffff', 'Buffer', [0.1, 7.5, 2.8], 'x', .03], ['ffffff', 'Buffer', [0.1, 7.5, 2.2], 'x', .03], ['ffe2a8', 'Box', [6.7, 3.3, 0], 'z', .03], ['e4b95a', 'Box', [7.9, 0, 2.4], 'y', .014], ['f6f0e6', 'Box', [7.7, 0, 2.2], 'y', .028], ['ffd98a', 'Box', [8.5, 0, 1.9], 'y', .01]],
  f3: [['ffffff', 'Box', [7.5, 0.1, 3.8], 'y', .015]],
};
export function zfix509(T, scenes) {
  for (const [k, sc] of Object.entries(scenes)) {
    if (!sc || !R[k]) continue; sc.updateMatrixWorld(true);
    const done = new Set();
    sc.traverse(o => {
      if (!o.isMesh || o.userData.wyZ509 || Array.isArray(o.material) || !o.material.color) return;
      const col = o.material.color.getHexString(), ty = o.geometry.type;
      const sz = new T.Box3().setFromObject(o).getSize(new T.Vector3()).toArray();
      for (const [i, [c, t, s, ax, d]] of R[k].entries()) {
        if (col !== c || !ty.startsWith(t) || s.some((v, j) => Math.abs(v - sz[j]) > .06)) continue;
        // 世界座標的位移換成父層座標
        const w = new T.Vector3(); o.getWorldPosition(w); w[ax] += ax === 'y' ? d : (w[ax] < 0 ? d : -d); // 牆面一律往房間中間推
        if (o.parent) o.parent.worldToLocal(w); o.position.copy(w); o.updateMatrix(); o.updateMatrixWorld(true);
        o.userData.wyZ509 = 1; done.add(i); break;
      }
    });
    if (done.size) console.log('zfix509', k, [...done]);
  }
}
