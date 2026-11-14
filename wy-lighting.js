// 德威陽 有法度：整體光影（柔和陰影＋方向光），不改任何模型與材質顏色
// 用法：const L=setupPremiumLighting(scene,renderer,{hemi,sun,center,size,mobile}); L.set(true|false); L.refresh();
export function setupPremiumLighting(scene,renderer,THREE,o){
 const hemi=o.hemi,sun=o.sun;
 const old={hI:hemi.intensity,hG:hemi.groundColor.clone(),sI:sun.intensity,sC:sun.color.clone(),sP:sun.position.clone()};
 const size=o.size||60,c=o.center||new THREE.Vector3();
 const fill=new THREE.DirectionalLight(0xe4ecff,.5);fill.position.set(c.x-60,c.y+40,c.z-70);fill.visible=false;scene.add(fill);
 sun.shadow.mapSize.set(o.mobile?1024:2048,o.mobile?1024:2048);
 const cam=sun.shadow.camera;cam.left=-size;cam.right=size;cam.top=size;cam.bottom=-size;cam.near=1;cam.far=size*6;cam.updateProjectionMatrix();
 sun.shadow.bias=-.0004;sun.shadow.normalBias=.035;
 sun.target.position.copy(c);scene.add(sun.target);
 renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
 const tag=()=>scene.traverse(m=>{if(!m.isMesh)return;const mats=Array.isArray(m.material)?m.material:[m.material];
  const basic=mats.some(x=>!x||x.isMeshBasicMaterial||x.transparent);
  m.castShadow=!basic&&m.visible;m.receiveShadow=!mats.some(x=>!x||x.isMeshBasicMaterial)});
 let on=false;
 function set(v){on=v;
  if(v){tag();renderer.shadowMap.enabled=true;sun.castShadow=true;
   hemi.intensity=old.hI*.74;hemi.groundColor.set(0xd8c6c2);
   sun.intensity=old.sI*1.3;sun.color.set(0xfff2de);
   sun.position.set(c.x+size*.75,c.y+size*1.55,c.z+size*1.25);fill.visible=true;
  }else{renderer.shadowMap.enabled=false;sun.castShadow=false;
   hemi.intensity=old.hI;hemi.groundColor.copy(old.hG);sun.intensity=old.sI;sun.color.copy(old.sC);sun.position.copy(old.sP);fill.visible=false;}
  scene.traverse(m=>{if(m.material){const a=Array.isArray(m.material)?m.material:[m.material];a.forEach(x=>x.needsUpdate=true)}});
  renderer.shadowMap.needsUpdate=true;
 }
 function refresh(){if(on){tag();renderer.shadowMap.needsUpdate=true}}
 return {set,refresh,get on(){return on}};
}
