import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import type { Object3D } from 'three';
import type { ExchangeAsset } from './exchange-model';
import { disposeObject } from './exchange-model';

/** Optional replacement meshes stay underneath the existing authored animation pivots.
 * Export each named node at its local pivot in meters. Meshopt-compressed GLB supported.
 * Only visual descendants are replaced; camera, labels and film logic do not change. */
export async function replaceExchangeAsset(asset:ExchangeAsset,url:string,isCancelled:()=>boolean){
 const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
 const gltf=await loader.loadAsync(url);
 if(isCancelled()){disposeObject(gltf.scene);return;}
 const names=['outer_armor','inner_ring','distribution_ring','core','monogram',...asset.chambers.map(c=>c.name),...asset.connectors.map(c=>c.name)];
 const replacements: [Object3D,Object3D][]=[];
 for(const name of names){
  const target=asset.root.getObjectByName(name);const incoming=gltf.scene.getObjectByName(name);
  if(!target||!incoming){disposeObject(gltf.scene);throw new Error(`Exchange GLB missing required pivot: ${name}`);}
  replacements.push([target,incoming]);
 }
 for(const [target,incoming] of replacements){
  // Keep the core's monogram pivot available to the final portal closure.
  const keep=target===asset.core?asset.monogram:undefined;
  for(const child of [...target.children])if(child!==keep){target.remove(child);disposeObject(child);}
  target.add(incoming);incoming.position.set(0,0,0);incoming.rotation.set(0,0,0);
 }
 return ()=>disposeObject(gltf.scene);
}
