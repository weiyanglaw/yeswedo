// Litigation Island courthouse: original, native Three.js exterior.
// Flat ground-level entrance; no steps, ramps, roof dome, or mid-column beam.
export function createLitigationCourthouse(parent, T) {
  const g = new T.Group(); g.name='LitigationCourthouseOrange'; parent.add(g);
  const mat=(color,roughness=.76,metalness=0)=>new T.MeshStandardMaterial({color,roughness,metalness});
  const ivory=mat('#fff4e5'), white=mat('#fffaf1'), cream=mat('#f4d5af');
  const paleOrange=mat('#f4b475'), orange=mat('#dc8248'), deepOrange=mat('#c76e3e');
  const shade=mat('#b98260'), glass=new T.MeshStandardMaterial({color:'#9fc9d0',roughness:.24,metalness:.08,transparent:true,opacity:.88,side:T.DoubleSide});
  const metal=mat('#d9b89a',.48,.12);
  function box(w,h,d,x,y,z,m){const a=new T.Mesh(new T.BoxGeometry(w,h,d),m);a.position.set(x,y,z);g.add(a);return a}
  function cyl(rt,rb,h,x,y,z,m,n=16){const a=new T.Mesh(new T.CylinderGeometry(rt,rb,h,n),m);a.position.set(x,y,z);g.add(a);return a}
  // Building faces toward +Z, matching island entry orientation. All ground-level.
  box(13.4,10.5,6.2,0,5.25,-2.3,cream);
  box(13.9,.75,7,0,10.55,-2.3,orange);
  box(12.8,.42,6.8,0,11.13,-2.3,ivory);
  box(11.6,.40,6.5,0,11.65,-2.3,deepOrange);
  box(10.5,.22,6.0,0,12.0,-2.3,white);
  // Arched entrance: flat glass panel and a thick smooth arch crown.
  box(5.25,6.6,.13,0,3.3,1.03,glass);
  const arch=new T.Mesh(new T.TorusGeometry(2.64,.32,10,32,Math.PI),ivory);
  arch.position.set(0,6.63,1.15);g.add(arch);
  box(.55,6.55,.55,-2.65,3.275,1.13,ivory);
  box(.55,6.55,.55,2.65,3.275,1.13,ivory);
  box(.09,6.5,.18,0,3.25,1.25,ivory);
  // No horizontal glass mullion, and no mid-height bar across columns.
  // Monumental, uninterrupted columns and deep porch roof.
  for(const x of [-5.65,-3.65,3.65,5.65]){
    cyl(.40,.44,8.4,x,4.55,2.0,white,18);
    box(1.13,.45,1.13,x,8.97,2.0,ivory);
    box(1.10,.40,1.10,x,.2,2.0,ivory);
    cyl(.51,.51,.18,x,8.66,2.0,cream,18);
  }
  box(14.5,.55,4.25,0,9.55,1.05,paleOrange);
  box(14.8,.27,4.4,0,9.96,1.05,ivory);
  // Curved wings, using broad curved walls and large arch-shaped window groups.
  function wing(sign){
    const wingG=new T.Group();wingG.position.set(sign*7.0,0,-1.0);wingG.rotation.y=sign*.27;g.add(wingG);
    function wb(w,h,d,x,y,z,m){const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.position.set(x,y,z);wingG.add(o);return o}
    wb(5.0,7.2,6.8,sign*2.3,3.6,-.5,paleOrange);
    wb(5.35,.55,7.1,sign*2.3,7.45,-.5,orange);
    wb(5.5,.25,7.2,sign*2.3,7.85,-.5,ivory);
    wb(5.0,.27,7.2,sign*2.3,.15,-.5,deepOrange);
    for(const z of [-2.65,.0,2.55]){
      wb(1.45,3.7,.09,sign*2.3,3.15,z,glass);
      wb(1.8,.27,.22,sign*2.3,5.15,z,white);
      wb(.17,4.0,.22,sign*1.45,3.0,z,ivory);
      wb(.17,4.0,.22,sign*3.15,3.0,z,ivory);
    }
    // Rounded end volume adds depth without a spire or dome.
    const end=new T.Mesh(new T.CylinderGeometry(2.7,2.7,7.0,24,1,false,0,Math.PI),cream);
    end.rotation.y=sign*Math.PI/2;end.position.set(sign*4.75,3.5,-.5);wingG.add(end);
  }
  wing(-1);wing(1);
  // Flat continuous forecourt (no stairs or slopes).
  const plaza=new T.Mesh(new T.CylinderGeometry(13.9,13.9,.09,64),ivory);
  plaza.position.set(0,.055,8.0);g.add(plaza);
  const inset=new T.Mesh(new T.CylinderGeometry(11.3,11.3,.018,64),cream);
  inset.position.set(0,.108,8.0);g.add(inset);
  // Courthouse identification, using canvas texture for readable mobile typography.
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=180;
  const ctx=canvas.getContext('2d');ctx.clearRect(0,0,1024,180);
  ctx.fillStyle='#fffaf1';ctx.font='bold 72px sans-serif';ctx.textAlign='center';ctx.fillText('訴訟法律館',512,105);
  const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;
  const sign=new T.Mesh(new T.PlaneGeometry(7.5,1.3),new T.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));
  sign.position.set(0,10.25,3.24);g.add(sign);
  g.userData.island='litigation';return g;
}
