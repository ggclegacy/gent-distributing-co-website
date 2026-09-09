"use client";
import {useEffect,useRef,useState} from "react";
const ease=(a:number,b:number,p:number)=>{const t=Math.max(0,Math.min(1,(p-a)/(b-a)));return t*t*(3-2*t);};
/** One absolute scene pose. Native fallback and GSAP never write simultaneously. */
export function useChapter() {
 const root=useRef<HTMLElement>(null);
 const [active,setActive]=useState(0);
 const write=useRef<(p:number)=>void>(()=>{});
 useEffect(()=>{
  const scene=root.current!;let frame=0,visible=false,last=-1;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const device=navigator as Navigator & {connection?:{saveData?:boolean};deviceMemory?:number};
  const motion=()=>!media.matches&&!device.connection?.saveData&&(device.deviceMemory??8)>2&&document.documentElement.dataset.motion!=="paused";
  const update=(value:number)=>{
   const p=Math.max(0,Math.min(1,value));const phase=Math.min(3,Math.floor(p*4));
   if(phase!==last){last=phase;setActive(phase);}
   scene.dataset.progress=p.toFixed(4);
   const vars={p,transit:Math.sin(ease(.12,.85,p)*Math.PI),assembly:ease(.12,.56,p),approval:ease(.67,.83,p),shelf:ease(.05,.92,p),delivery:ease(.12,.85,p),invitation:ease(.38,.8,p),settle:ease(.05,.65,p)};
   Object.entries(vars).forEach(([k,v])=>scene.style.setProperty(`--ch-${k}`,String(v)));
  };
  write.current=update;
  const read=()=>{frame=0;if(!visible||!motion()||scene.closest('[data-chapter-director]'))return;const rect=scene.getBoundingClientRect();update(-rect.top/Math.max(1,rect.height-innerHeight));};
  const scroll=()=>{if(visible&&!frame)frame=requestAnimationFrame(read);};
  const sync=()=>{scene.dataset.animated=String(motion());if(!motion())update(0);else scroll();};
  const film=(e:Event)=>{if(motion())update(Number((e as CustomEvent).detail));};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)scroll();},{rootMargin:'100px'});observer.observe(scene);
  const mutation=new MutationObserver(sync);mutation.observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});
  scene.addEventListener('gent-intelligence-progress',film);window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);media.addEventListener('change',sync);sync();update(0);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();mutation.disconnect();scene.removeEventListener('gent-intelligence-progress',film);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);media.removeEventListener('change',sync);};
 },[]);
 const select=(id:string,index:number)=>{const p=index*.25+.05;write.current(p);window.dispatchEvent(new CustomEvent('gent-chapter-seek',{detail:{id,p}}));};
 return {root,active,select};
}
