import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
export type ExchangeAsset = ReturnType<typeof createExchange>;
const LOGO = [[37,14],[30,7],[17,7],[7,17],[7,31],[17,41],[31,41],[41,31],[41,23],[24,23],[24,30],[33,30],[28,35],[20,35],[14,29],[14,20],[20,14],[28,14],[32,18]];

/** Shared local pivots remain identical to the film/GLB contract. No animation changes. */
export function createExchange(standard:boolean, graybox=false) {
 const root=new THREE.Group();root.name='exchange_root';
 const grain=(brushed=false)=>{
  const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d')!;const data=ctx.createImageData(256,256);
  for(let y=0;y<256;y++)for(let x=0;x<256;x++){
   const v=brushed?180+22*Math.sin(y*33.17)+8*Math.sin(x*.17+y*2.7):185+27*Math.sin((x*12.9898+y*78.233))*Math.sin(x*4.1-y*3.7);
   const i=(y*256+x)*4;data.data[i]=data.data[i+1]=data.data[i+2]=v;data.data[i+3]=255;
  }
  ctx.putImageData(data,0,0);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;
 };
 const brushed=grain(true),paperGrain=grain();
 const mats={
  black:new THREE.MeshPhysicalMaterial({color:'#303735',metalness:.72,roughness:.38,roughnessMap:brushed,clearcoat:.12,clearcoatRoughness:.3}),
  edge:new THREE.MeshStandardMaterial({color:'#303a36',metalness:.93,roughness:.29,roughnessMap:brushed}),
  gold:new THREE.MeshPhysicalMaterial({color:'#cfb783',metalness:1,roughness:.3,roughnessMap:brushed,anisotropy:standard?0:.55}),
  green:new THREE.MeshStandardMaterial({color:'#04251a',emissive:'#075032',emissiveIntensity:.4,metalness:.5,roughness:.3}),
  paper:new THREE.MeshStandardMaterial({color:'#202b22',roughness:.58,bumpMap:paperGrain,bumpScale:.009}),
  lacquer:new THREE.MeshPhysicalMaterial({color:'#03251a',metalness:.15,roughness:.27,clearcoat:.7,clearcoatRoughness:.21}),
  glass:new THREE.MeshPhysicalMaterial({color:'#0b1410',metalness:.1,roughness:.24,clearcoat:.8,clearcoatRoughness:.15}),
  cloth:new THREE.MeshStandardMaterial({color:'#0c1410',roughness:.86,bumpMap:paperGrain,bumpScale:.016}),
  leather:new THREE.MeshStandardMaterial({color:'#0d1110',roughness:.48,bumpMap:paperGrain,bumpScale:.013}),
 };
 if(graybox)Object.values(mats).forEach(m=>{m.color.set('#777777');m.metalness=0;m.roughness=.8;});
 const seg=standard?64:96;
 function mesh(g:THREE.BufferGeometry,m:THREE.Material,parent:THREE.Object3D,x=0,y=0,z=0){
  const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;
 }
 function group(name:string,parent=root){const g=new THREE.Group();g.name=name;parent.add(g);return g;}
 function box(parent:THREE.Object3D,w:number,h:number,d:number,x:number,y:number,z:number,m:THREE.Material=mats.black,r=.02){return mesh(new RoundedBoxGeometry(w,h,d,standard?2:3,r),m,parent,x,y,z);}
 function band(parent:THREE.Object3D,outer:number,inner:number,depth:number,z:number,m:THREE.Material=mats.black,start=0,arc=Math.PI*2){
  const shape=new THREE.Shape();shape.absarc(0,0,outer,start,start+arc,false);
  if(arc>=Math.PI*2){const hole=new THREE.Path();hole.absarc(0,0,inner,0,Math.PI*2,true);shape.holes.push(hole);}
  else {shape.absarc(0,0,inner,start+arc,start,true);shape.closePath();}
  return mesh(new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSize:Math.min(.017,(outer-inner)*.2),bevelThickness:.012,bevelSegments:2,curveSegments:standard?24:40}),m,parent,0,0,z);
 }
 function cylinder(parent:THREE.Object3D,r:number,h:number,y:number,m:THREE.Material=mats.black){return mesh(new THREE.CylinderGeometry(r,r,h,seg),m,parent,0,y,0);}
 function brandPath(ctx:CanvasRenderingContext2D,x:number,y:number,size:number){ctx.save();ctx.translate(x,y);ctx.scale(size/48,size/48);ctx.beginPath();LOGO.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.lineWidth=1.3;ctx.lineJoin='miter';ctx.stroke();ctx.restore();}
 function inscription(parent:THREE.Object3D,text:string,w:number,h:number,x:number,y:number,z:number){
  const c=document.createElement('canvas');c.width=1024;c.height=128;const ctx=c.getContext('2d')!;ctx.fillStyle='#b7b6a5';ctx.font='34px sans-serif';ctx.textAlign='center';ctx.fillText(text,512,76);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;
  return mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:t,transparent:true,depthWrite:false,roughness:.5,metalness:.5}),parent,x,y,z);
 }
 function foilTexture(kind:number){
  const c=document.createElement('canvas');c.width=1024;c.height=kind===0?1536:1024;const ctx=c.getContext('2d')!;
  ctx.fillStyle='#d6c69f';ctx.strokeStyle='#d6c69f';ctx.textAlign='center';
  brandPath(ctx,437,kind===0?155:50,150);
  ctx.font='24px sans-serif';ctx.fillText('G E N T   D I S T R I B U T I O N',512,kind===0?360:262);
  if(kind===0){
   ctx.font='116px Georgia';ctx.fillText('LEGACY',512,610);ctx.font='47px Georgia';ctx.fillText('R E S E R V E',512,698);
   ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(340,800);ctx.lineTo(684,800);ctx.stroke();
   ctx.font='32px sans-serif';ctx.fillText('C O F F E E',512,899);ctx.font='20px sans-serif';ctx.fillText('THE FIRST CHAPTER',512,973);
   ctx.font='20px sans-serif';ctx.fillText('LAFAYETTE, LOUISIANA',512,1240);ctx.font='15px sans-serif';ctx.fillText('P R O D U C T   C O N C E P T',512,1290);
  }else{
   ctx.font='96px Georgia';ctx.fillText(kind===1?'GENT':kind===2?'DAILY':'HONEY',512,475);
   ctx.font='25px sans-serif';ctx.fillText(kind===1?'P E R S O N A L   C A R E':kind===2?'W E L L N E S S':'P A N T R Y',512,570);
   ctx.beginPath();ctx.moveTo(365,660);ctx.lineTo(659,660);ctx.stroke();
   ctx.font='20px sans-serif';ctx.fillText('THE GENT STANDARD',512,750);ctx.font='15px sans-serif';ctx.fillText('P R O D U C T   C O N C E P T',512,824);
  }
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=standard?2:4;
  return new THREE.MeshPhysicalMaterial({map:t,transparent:true,depthWrite:false,metalness:.4,roughness:.4,polygonOffset:true,polygonOffsetFactor:-1});
 }
 // Broad, flat machined rings carry mass. Gold is confined to narrow inlays.
 const rear=group('distribution_ring');band(rear,2.9,2.47,.18,-.75,mats.black);band(rear,2.64,2.61,.025,-.55,mats.edge);
 const inner=group('inner_ring');band(inner,1.76,1.48,.24,-.04,mats.black);band(inner,1.69,1.675,.012,.224,mats.gold);band(inner,1.5,1.46,.04,.13,mats.edge);
 const armor=group('outer_armor');band(armor,3.27,3.04,.3,-.15,mats.black);band(armor,3.275,3.256,.02,.14,mats.gold);band(armor,3.058,3.04,.016,.16,mats.edge);
 const marks=new THREE.InstancedMesh(new THREE.BoxGeometry(.013,.066,.008),mats.edge,72);const dummy=new THREE.Object3D();
 for(let i=0;i<72;i++){const a=i*Math.PI/36;dummy.position.set(Math.sin(a)*3.15,Math.cos(a)*3.15,.168);dummy.rotation.z=-a;dummy.updateMatrix();marks.setMatrixAt(i,dummy.matrix);}armor.add(marks);
 // Twelve recessed structural lugs reveal the manufacturing logic of the housing.
 for(let i=0;i<12;i++){const a=i*Math.PI/6;const g=group(`armor_lug_${i}`,armor);g.rotation.z=a;box(g,.18,.24,.23,0,3.14,-.01,mats.black,.028);box(g,.035,.11,.008,0,3.16,.13,mats.gold,.003);}
 const seams:THREE.MeshStandardMaterial[]=[];const chambers:THREE.Group[]=[];const connectors:THREE.Group[]=[];
 for(let i=0;i<6;i++){
  const a=i*Math.PI/3,c=group(`category_${['provisions','personalcare','wellness','pantry','apparel','accessories'][i]}`);c.rotation.z=a;chambers.push(c);
  const start=.055,arc=Math.PI/3-.11;
  band(c,2.97,1.88,.34,-.14,mats.black,start,arc);
  band(c,2.8,2.72,.024,.213,mats.edge,start+.045,arc-.09);
  const seam=mats.gold.clone();seam.emissive.set('#70572e');seams.push(seam);band(c,2.83,2.815,.01,.245,seam,start+.045,arc-.09);
  // An inset secondary face, fine vent cuts and captive black fasteners.
  band(c,2.61,2.09,.025,.215,mats.black,start+.07,arc-.14);
  for(let j=0;j<5;j++){
   const theta=start+.16+j*.14;const slot=box(c,.016,.14,.009,2.4*Math.cos(theta),2.4*Math.sin(theta),.265,mats.edge,.002);slot.rotation.z=theta-Math.PI/2;
  }
  band(c,1.955,1.938,.017,.07,mats.green,start+.03,arc-.06);
  for(const theta of [start+.08,start+arc-.08]){
   const fast=mesh(new THREE.CylinderGeometry(.045,.045,.025,6),mats.edge,c,2.65*Math.cos(theta),2.65*Math.sin(theta),.263);fast.rotation.x=Math.PI/2;
   const cut=box(c,.04,.007,.008,fast.position.x,fast.position.y,.28,mats.black,.001);cut.rotation.z=theta;
  }
  const carrier=group(`connector_${i}`);carrier.rotation.z=a;connectors.push(carrier);
  box(carrier,.8,.14,.18,1.85,0,-.32,mats.black);box(carrier,.6,.035,.025,1.84,0,-.215,mats.gold,.006);
 }
 const core=group('core');band(core,1.28,.93,.22,.21,mats.black);band(core,1.265,1.248,.018,.43,mats.gold);band(core,1.02,.985,.045,.43,mats.edge);band(core,.965,.946,.016,.29,mats.green);
 const monogram=group('monogram',core);
 const face=mesh(new THREE.CylinderGeometry(.927,.927,.045,seg),mats.black,monogram,0,0,.42);face.rotation.x=Math.PI/2;
 // Continuous extruded brand mark, with mitered joins rather than separate bars.
 const points=LOGO.map(([x,y])=>new THREE.Vector2((x-24)*.038,(24-y)*.038));const left:THREE.Vector2[]=[],right:THREE.Vector2[]=[];
 points.forEach((p,i)=>{
  const prev=p.clone().sub(points[Math.max(0,i-1)]).normalize(),next=points[Math.min(points.length-1,i+1)].clone().sub(p).normalize();
  if(i===0)prev.copy(next);if(i===points.length-1)next.copy(prev);
  const n1=new THREE.Vector2(-prev.y,prev.x),n2=new THREE.Vector2(-next.y,next.x);const bis=n1.clone().add(n2).normalize().multiplyScalar(.021/Math.max(.3,n1.dot(n1.clone().add(n2).normalize())));
  left.push(p.clone().add(bis));right.push(p.clone().sub(bis));
 });
 const shape=new THREE.Shape([...left,...right.reverse()]);mesh(new THREE.ExtrudeGeometry(shape,{depth:.04,bevelEnabled:true,bevelSize:.005,bevelThickness:.005,bevelSegments:2}),mats.gold,monogram,0,0,.475);
 inscription(monogram,'G E N T',.72,.12,0,-.78,.49);inscription(armor,'G E N T   /   T H E   E X C H A N G E',1.5,.13,0,-3.13,.18);
 const network=group('gold_channels');
 for(let i=0;i<4;i++){const sign=i%2?1:-1,y=i<2?1.5:-1.5;const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,-.7),new THREE.Vector3(sign*2,y,-1),new THREE.Vector3(sign*5,y*1.7,-2),new THREE.Vector3(sign*13,y*2,-5)]);mesh(new THREE.TubeGeometry(curve,32,.012,5,false),mats.gold,network);}
 const products:THREE.Group[]=[];
 // The pouch is a continuous superellipse surface: bowed faces, tapered shoulders,
 // side gussets and compressed seals. Small folds affect the actual silhouette.
 function bagShape(y:number,angle:number){
  const t=(y+1.4)/2.8,shoulder=THREE.MathUtils.smoothstep(t,.72,.96),bottom=THREE.MathUtils.smoothstep(t,0,.14);
  const w=.73-.045*shoulder-.02*(1-bottom),d=.28*(1-shoulder)+.035*shoulder;
  const ca=Math.cos(angle),sa=Math.sin(angle);let x=Math.sign(ca)*Math.pow(Math.abs(ca),.30)*w;
  let z=Math.sign(sa)*Math.pow(Math.abs(sa),.36)*d;
  const seam=Math.pow(Math.abs(ca),12);z*=1-.28*seam;
  const wrinkle=(Math.sin(y*16+angle*3)*.006+Math.sin(y*29-angle*5)*.004)*(1-Math.abs(sa)*.7);
  x+=wrinkle;z+=Math.sign(sa)*(.012*Math.sin(y*7+x*5)*Math.pow(Math.abs(x)/.75,3));
  return new THREE.Vector3(x,y,z);
 }
 function pouchGeometry(){
  const g=new THREE.BufferGeometry(),pos:number[]=[],uv:number[]=[],indices:number[]=[];const rows=36,cols=standard?48:72;
  for(let r=0;r<=rows;r++)for(let c=0;c<=cols;c++){const v=bagShape(-1.4+r/rows*2.8,c/cols*Math.PI*2);pos.push(v.x,v.y,v.z);uv.push(c/cols,r/rows);}
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const a=r*(cols+1)+c,b=a+cols+1;indices.push(a,b,a+1,b,b+1,a+1);}
  g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g;
 }
 for(let i=0;i<6;i++){
  const p=new THREE.Group();p.name=`product_${i}`;products.push(p);
  if(i===0){
   mesh(pouchGeometry(),mats.paper,p);
   box(p,1.43,.07,.085,0,1.4,0,mats.paper,.015);box(p,1.43,.08,.48,0,-1.4,0,mats.paper,.018);
   for(let j=0;j<3;j++)box(p,1.39,.006,.004,0,1.38+j*.014,.046,mats.edge,.001);
   // A curved foil print follows the bowed front surface instead of floating over it.
   const labelGeo=new THREE.PlaneGeometry(1.39,2.6,24,32),vertices=labelGeo.attributes.position;
   for(let j=0;j<vertices.count;j++){
    const x=vertices.getX(j),y=vertices.getY(j);const t=(y+1.4)/2.8,shoulder=THREE.MathUtils.smoothstep(t,.72,.96),w=.73-.045*shoulder;
    const ca=Math.pow(Math.min(.999,Math.abs(x/w)),1/.30)*Math.sign(x);const v=bagShape(y,Math.acos(ca));vertices.setXYZ(j,x,y,v.z+.003);
   }labelGeo.computeVertexNormals();mesh(labelGeo,foilTexture(0),p);
   const valve=mesh(new THREE.CylinderGeometry(.056,.056,.009,24),mats.black,p,.47,.85,-.23);valve.rotation.x=Math.PI/2;
  }else if(i<4){
   const r=i===1?.5:i===2?.59:.68,h=i===3?1.45:1.85;
   const profile=[[0,-h/2],[r*.8,-h/2],[r*.95,-h/2+.025],[r,-h/2+.10],[r,h/2-.25],[r*.985,h/2-.12],[r*.88,h/2+.015],[r*.66,h/2+.13],[r*.58,h/2+.17],[r*.58,h/2+.31],[0,h/2+.31]].map(([x,y])=>new THREE.Vector2(x,y));
   mesh(new THREE.LatheGeometry(profile,seg),i===2?mats.lacquer:mats.glass,p);
   cylinder(p,r*.96,.012,-h/2+.09,mats.edge);cylinder(p,r*.59,.19,h/2+.2,mats.gold);
   const capRadius=r*.73;const capProfile=[[0,-.18],[capRadius*.94,-.18],[capRadius,-.14],[capRadius,.13],[capRadius*.96,.17],[0,.17]].map(([x,y])=>new THREE.Vector2(x,y));
   mesh(new THREE.LatheGeometry(capProfile,seg),mats.black,p,0,h/2+.31,0);cylinder(p,capRadius,.017,h/2+.15,mats.gold);
   const count=standard?40:64,knurl=new THREE.InstancedMesh(new THREE.BoxGeometry(.007,.23,.008),mats.edge,count);
   for(let j=0;j<count;j++){const a=j/count*Math.PI*2;dummy.position.set(Math.sin(a)*(capRadius+.003),h/2+.31,Math.cos(a)*(capRadius+.003));dummy.rotation.set(0,a,0);dummy.updateMatrix();knurl.setMatrixAt(j,dummy.matrix);}p.add(knurl);
   if(i===1){cylinder(p,.125,.47,h/2+.67,mats.glass);box(p,.37,.075,.14,.08,h/2+.93,0,mats.black,.02);box(p,.035,.016,.04,.245,h/2+.91,.015,mats.gold,.003);}
   const labelHeight=h*.84;mesh(new THREE.CylinderGeometry(r+.003,r+.003,labelHeight,48,1,true,-.82,1.64),foilTexture(i),p,0,-.03,0);
  }else if(i===4){
   for(let j=0;j<3;j++)box(p,1.55-j*.025,.19,1.05,0,-.19+j*.19,0,mats.cloth,.065);
   box(p,.43,.6,1.07,0,0,0,mats.paper,.012);inscription(p,'G E N T',.34,.065,0,.05,.54);
  }else{
   box(p,1.35,.9,.23,0,0,0,mats.leather,.075);box(p,1.27,.81,.01,0,0,.12,mats.leather,.06);
   inscription(p,'G E N T',.45,.09,0,0,.133);
   const count=46,stitch=new THREE.InstancedMesh(new THREE.BoxGeometry(.025,.008,.003),mats.edge,count);
   for(let j=0;j<count;j++){const a=j/count*Math.PI*2;dummy.position.set(Math.cos(a)*.595,Math.sin(a)*.34,.135);dummy.rotation.set(0,0,a+Math.PI/2);dummy.updateMatrix();stitch.setMatrixAt(j,dummy.matrix);}p.add(stitch);
  }
 }
 return {seams,root,armor,inner,rear,chambers,connectors,core,monogram,network,products,mats};
}
export function disposeObject(root:THREE.Object3D){
 const materials=new Set<THREE.Material>(),textures=new Set<THREE.Texture>(),geometries=new Set<THREE.BufferGeometry>();
 root.traverse(o=>{if(o instanceof THREE.Mesh){geometries.add(o.geometry);(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));if(o instanceof THREE.InstancedMesh)o.dispose();}});
 materials.forEach(m=>{Object.values(m).forEach(v=>{if(v instanceof THREE.Texture)textures.add(v);});m.dispose();});textures.forEach(t=>t.dispose());geometries.forEach(g=>g.dispose());
}
