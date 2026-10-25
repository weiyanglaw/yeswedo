// Standalone flower beds beside rainbow bridge approaches.
export function createCastleGardens(group,THREE){
  const petals=['#F6C5D5','#FFF9ED','#F8E7AD','#E8C7E9'].map(c=>new THREE.MeshBasicMaterial({color:c}));
  const leaf=new THREE.MeshBasicMaterial({color:'#73B782'});
  const stem=new THREE.MeshBasicMaterial({color:'#5C9E68'});
  // Four broad garden pockets flank the main approach and the side bridge mouths.
  // No fences, no lamp posts, no raised circular shrub planters.
  const gardenCenters=[[-14.5,10.2],[-15.5,14.5],[14.5,10.2],[15.5,14.5],[-16.4,2.0],[16.4,2.0],[-13.7,-10.7],[13.7,-10.7]];
  for(let gi=0;gi<gardenCenters.length;gi++){
    const [cx,cz]=gardenCenters[gi];
    for(let k=0;k<36;k++){
      const angle=k*2.39996+gi*.73;
      const radius=.28+Math.sqrt((k+.5)/36)*2.0;
      const x=cx+Math.cos(angle)*radius,z=cz+Math.sin(angle)*radius;
      const flower=new THREE.Group();flower.position.set(x,.55,z);group.add(flower);
      const stalk=new THREE.Mesh(new THREE.CylinderGeometry(.045,.06,.34,8),stem);stalk.position.y=.17;flower.add(stalk);
      const foliage=new THREE.Mesh(new THREE.SphereGeometry(.21,12,9),leaf);foliage.scale.set(1.1,.5,.9);foliage.position.y=.20;flower.add(foliage);
      const col=petals[(k+gi)%petals.length];
      for(let p=0;p<5;p++){const a=p*Math.PI*2/5;const petal=new THREE.Mesh(new THREE.SphereGeometry(.145,12,9),col);petal.position.set(Math.cos(a)*.17,.42,Math.sin(a)*.17);petal.scale.y=.7;flower.add(petal);}
      const center=new THREE.Mesh(new THREE.SphereGeometry(.09,12,8),petals[2]);center.position.y=.46;flower.add(center);
    }
  }
}

