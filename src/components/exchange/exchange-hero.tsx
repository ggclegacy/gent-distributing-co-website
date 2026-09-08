'use client';
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { beats, beatAt, exchangeSignal, windowAt, smooth } from '@/lib/exchange-film';
import type { ExchangeWorldProps } from './exchange-world';

class RenderBoundary extends Component<{children:ReactNode; onFail:()=>void},{failed:boolean}> {
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 componentDidCatch(){this.props.onFail();}
 render(){return this.state.failed?null:this.props.children;}
}
/** HTML and campaign artwork arrive before WebGL. Motion off never downloads the renderer. */
export function ExchangeHero() {
 const root=useRef<HTMLDivElement>(null);
 const [World,setWorld]=useState<React.ComponentType<ExchangeWorldProps>|null>(null);
 const [enabled,setEnabled]=useState(false);
 const [failed,setFailed]=useState(false);
 useEffect(()=>{
  let disposed=false;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>{
   const nav=navigator as Navigator & {deviceMemory?:number;connection?:{saveData?:boolean}};
   const on=!media.matches && document.documentElement.dataset.motion!=='paused' && !nav.connection?.saveData && (nav.deviceMemory??8)>2;
   setEnabled(on);
   if(on) void import('./exchange-world').then(m=>{if(!disposed)setWorld(()=>m.ExchangeWorld);}).catch(()=>{if(!disposed)setFailed(true);});
  };
  const observer=new MutationObserver(sync);observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});
  media.addEventListener('change',sync);sync();
  return ()=>{disposed=true;observer.disconnect();media.removeEventListener('change',sync);};
 },[]);
 useEffect(()=>{
  const element=root.current;if(!element)return;
  const caption=element.querySelector<HTMLElement>('.exchange-film-caption')!;
  const title=caption.querySelector('strong')!;const number=caption.querySelector('span')!;
  const network=element.querySelector<HTMLElement>('.exchange-destinations')!;
  const update=()=>{
   const p=exchangeSignal.progress,b=beatAt(p);
   element.dataset.beat=beats[b][0].toLowerCase();element.dataset.progress=p.toFixed(4);
   title.textContent=b===3?(p<.39?'Provisions. The first chapter.':p<.48?'Personal care. Considered daily.':'Wellness. A new possibility.'):beats[b][1];number.textContent=`0${b+1} / ${beats[b][0]}`;
   caption.style.opacity=String(b===7?0:1-smooth(.94,.975,p));
   network.style.opacity=String(windowAt(.56,.65,p));
   element.style.setProperty('--portal-inset',`${49.9*(1-smooth(.975,1,p))}%`);
   element.style.setProperty('--portal-visible',p>.975?'1':'0');
  };
  exchangeSignal.listeners.add(update);update();return ()=>{exchangeSignal.listeners.delete(update);};
 },[]);
 const live=Boolean(enabled&&World&&!failed);
 const fail=useCallback(()=>setFailed(true),[]);
 useEffect(()=>{
  const cinema=root.current?.closest<HTMLElement>('[data-cinema]');
  if(cinema)cinema.dataset.exchangeRenderer=live?'webgl':'campaign';
  return()=>{if(cinema)delete cinema.dataset.exchangeRenderer;};
 },[live]);
 return <div ref={root} className="exchange-film" data-renderer={live?'webgl':'campaign'}>
  <div className="exchange-poster"><Image src="/images/exchange/campaign.webp" alt="The Gent Exchange: a precision obsidian and gold mechanism behind a collection of product concepts." fill sizes="100vw" priority /><Image className="exchange-poster-portrait" src="/images/exchange/campaign-portrait.webp" alt="" fill sizes="100vw" priority /></div>
  {live&&World&&<RenderBoundary onFail={fail}><World onFail={fail}/></RenderBoundary>}
  <div className="exchange-portal-room" aria-hidden="true"><Image src="/images/story/product-intelligence-lab-landscape.webp" alt="" fill sizes="100vw"/><Image className="exchange-poster-portrait" src="/images/story/product-intelligence-lab-portrait.webp" alt="" fill sizes="100vw"/></div>
  <div className="exchange-film-vignette" />
  <div className="exchange-film-caption" aria-hidden="true"><span>01 / ARTIFACT</span><strong>A world of possibility.</strong></div>
  <div className="exchange-destinations" aria-hidden="true"><span>BUSINESSES</span><span>RETAIL</span><span>HOSPITALITY</span><span>CUSTOMERS</span><small>LAFAYETTE / ORIGIN → POSSIBILITY</small></div>
  <span className="exchange-edition" aria-hidden="true">GENT / THE EXCHANGE <i>30.2241° N · 92.0198° W</i></span>
 </div>;
}
