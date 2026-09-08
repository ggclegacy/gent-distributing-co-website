'use client';
/* eslint-disable react-hooks/immutability -- Three.js owns a mutable scene graph; useFrame deliberately updates its objects outside React rendering. */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { createStudioEnvironment } from './exchange-studio';
import { cameraAt, exchangeSignal, filmAt, smooth, windowAt } from '@/lib/exchange-film';
import { createExchange, disposeObject } from './exchange-model';
export type ExchangeWorldProps={onFail:()=>void};
function World({onFail}:ExchangeWorldProps) {
 const {gl,scene,camera,size,invalidate}=useThree();
 const standard=size.width<1000;
 const asset=useMemo(()=>createExchange(standard,new URLSearchParams(location.search).has('animatic')),[standard]);
 const group=useRef<THREE.Group>(null);
 const key=useRef<THREE.DirectionalLight>(null);
 const collection=[[-1.85,-1.1,2.1],[.2,-1.1,3.3],[1.65,-1.05,2.2],[2.8,-1.5,.5],[-2.7,-1.65,.4],[.7,-2,2.4]];
 useEffect(()=>{
  const pmrem=new THREE.PMREMGenerator(gl);const room=createStudioEnvironment();const env=pmrem.fromScene(room,.025, .1,100);scene.environment=env.texture;scene.environmentIntensity=.8;
  disposeObject(room);pmrem.dispose();
  const update=()=>invalidate();exchangeSignal.listeners.add(update);invalidate();
  const lost=(e:Event)=>{e.preventDefault();onFail();};gl.domElement.addEventListener('webglcontextlost',lost);
  return()=>{exchangeSignal.listeners.delete(update);gl.domElement.removeEventListener('webglcontextlost',lost);scene.environment=null;env.dispose();};
 },[gl,scene,invalidate,onFail]);
 useEffect(()=>{
  const url=process.env.NEXT_PUBLIC_EXCHANGE_GLB;
  if(!url)return;
  let cancelled=false;
  void import('./exchange-assets').then(({replaceExchangeAsset})=>replaceExchangeAsset(asset,url,()=>cancelled)).then(()=>invalidate()).catch(()=>{/* Retain the complete procedural model if the optional replacement cannot load. */});
  return()=>{cancelled=true;};
 },[asset,invalidate]);
 useEffect(()=>()=>{disposeObject(asset.root);asset.products.forEach(disposeObject);},[asset]);
 useFrame(()=>{
  const p=exchangeSignal.progress, f=filmAt(p),e=f.explosion;
  const framing=size.width<700&&size.height>size.width?'portrait':size.width<1100?'tablet':'desktop';
  const view=cameraAt(p,framing);camera.position.set(view[0],view[1],view[2]);camera.lookAt(view[3],view[4],view[5]);
  asset.root.rotation.set(.1*(1-f.portal),-.08*(1-f.portal),-.1+smooth(.07,.28,p)*.14-smooth(.73,.84,p)*.04);
  asset.armor.position.z=e*1.25;asset.armor.rotation.z=e*.13;
  asset.inner.position.z=-e*1.2;asset.inner.rotation.z=e*.65;
  asset.rear.position.z=-e*2;asset.rear.rotation.z=-e*.45;
  asset.chambers.forEach((c,i)=>{
   const a=i*Math.PI/3, chamberE=smooth(.16+i*.009,.25+i*.009,p)*(1-smooth(.73+i*.009,.78+i*.009,p)),local=chamberE*(.9+i*.05);c.position.set(Math.cos(a+.5)*local,Math.sin(a+.5)*local,chamberE*(i%2?.6:-.8));c.rotation.z=a+chamberE*.08;
  });
  asset.connectors.forEach((c,i)=>{const a=i*Math.PI/3;c.position.set(Math.cos(a)*e*.4,Math.sin(a)*e*.4,-e*1.4);});
  asset.seams.forEach((m,i)=>{m.emissiveIntensity=.04+windowAt(.775+i*.009,.83+i*.009,p,.012)*.6;});
  asset.core.position.z=e*.35+(1-smooth(.80,.845,p))*windowAt(.73,.85,p)*.6;
  asset.monogram.visible=p<.958;
  asset.network.visible=f.network>.001;asset.network.scale.setScalar(.3+.7*f.network);
  asset.mats.green.emissiveIntensity=.25+e*.35+f.portal*1.4;
  scene.environmentIntensity=.24+smooth(0,.09,p)*.65;
  if(key.current){key.current.intensity=.35+smooth(0,.1,p)*1.3;key.current.position.set(-3+Math.sin(p*5)*5,5,7);}
  asset.products.forEach((product,i)=>{
   const macro=i<3?windowAt(.285+i*.087,.392+i*.087,p,.028):0;
   const show=smooth(.26+i*.012,.30+i*.012,p)*(1-smooth(.93,.963,p));
   product.visible=show>.001;
   const gather=smooth(.55,.67,p);const base=collection[i];
   const spread=1+(1-gather)*.35;
   const target=[base[0]*spread*(framing==='portrait'?1-.40*gather:1),base[1],base[2]-2*(1-gather)];
   product.position.set(target[0]*(1-macro),(target[1]+smooth(.78,.85,p)*(framing==='portrait'?1.6:1.05))*(1-macro),target[2]*(1-macro)+2.1*macro);
   product.scale.setScalar(show*(.66+.34*macro));
   product.rotation.y=(i%2?.2:-.22)*(1-macro)+Math.sin(p*6+i)*.04;
   product.rotation.z=(i%2?.06:-.06)*(1-macro);
   // During a solo close-up other products remain in their physical chambers.
   const otherSolo=i<3?Math.max(...[0,1,2].filter(j=>j!==i).map(j=>windowAt(.285+j*.087,.392+j*.087,p,.028))):windowAt(.285,.56,p);
   product.position.z-=otherSolo*4;
  });
  if(group.current)group.current.visible=p<.999;
 });
 return <group ref={group}>
  <primitive object={asset.root}/>
  {asset.products.map(p=><primitive key={p.name} object={p}/>)}
  <directionalLight ref={key} position={[-3,5,7]} intensity={1.6} color="#f4f1e5" castShadow shadow-mapSize={[standard?512:1024,standard?512:1024]} shadow-camera-left={-8} shadow-camera-right={8} shadow-camera-top={8} shadow-camera-bottom={-8} shadow-normalBias={.035} shadow-bias={-.0001}/>
  <directionalLight position={[5,1,2]} intensity={.65} color="#d6e2db"/>
  <pointLight position={[0,0,-1]} intensity={3} distance={5} color="#168257"/>
  <mesh position={[0,-3.7,-2]} rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[60,60]}/><meshStandardMaterial color="#080d0b" metalness={.3} roughness={.36}/></mesh>
  <mesh position={[0,2,-10]} receiveShadow><planeGeometry args={[60,28]}/><meshStandardMaterial color="#060c09" roughness={.92}/></mesh>
  <mesh position={[-7,2,-8]}><boxGeometry args={[.5,20,2]}/><meshStandardMaterial color="#111a16" metalness={.55} roughness={.4}/></mesh>
  <mesh position={[7,2,-8]}><boxGeometry args={[.5,20,2]}/><meshStandardMaterial color="#111a16" metalness={.55} roughness={.4}/></mesh>
 </group>;
}
export function ExchangeWorld({onFail}:ExchangeWorldProps){
 return <Canvas shadows="percentage" className="exchange-webgl" frameloop="demand" dpr={[1,innerWidth<1000?1.25:1.5]} camera={{position:[3,1,11],fov:38,near:.08,far:70}} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}} onCreated={({gl})=>{gl.toneMapping=THREE.NeutralToneMapping;gl.toneMappingExposure=1;}} fallback={null}>
  <World onFail={onFail}/>
 </Canvas>;
}
