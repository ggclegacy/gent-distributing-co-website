import * as THREE from 'three';

/** A photographic light stage. These panels exist only in the reflection probe;
 * they create shaped edge reflections without adding visible sci-fi decoration. */
export function createStudioEnvironment(){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#080b0a');
 const shell=new THREE.Mesh(new THREE.SphereGeometry(25,24,16),new THREE.MeshBasicMaterial({color:'#0b100e',side:THREE.BackSide}));scene.add(shell);
 const panel=(x:number,y:number,z:number,w:number,h:number,power:number,color:string)=>{
  const material=new THREE.MeshBasicMaterial({color:new THREE.Color(color).multiplyScalar(power),side:THREE.DoubleSide});
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),material);mesh.position.set(x,y,z);mesh.lookAt(0,0,0);scene.add(mesh);
 };
 panel(-4,3,5,1.2,8,5,'#f0f1e8');
 panel(5,1,3,.65,7,3,'#d6dfda');
 panel(0,6,0,7,3,3,'#f2e9d5');
 panel(-1,-1,-6,2,5,1.7,'#799082');
 panel(0,0,8,5,6,2.4,'#ccd0c9');
 return scene;
}
