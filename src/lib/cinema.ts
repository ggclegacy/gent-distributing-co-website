import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/** Native document scroll drives independent sticky chapters. The intro has its own director. */
export function mountPageDirector(root: HTMLElement, rail: HTMLElement | null) {
  const scenes = [...root.querySelectorAll<HTMLElement>("[data-chapter-scene]")];
  const triggers = new Map<string, ScrollTrigger>();
  let active = 0;
  let disposed = false;
  root.dataset.chapterDirector = "true";
  const publish = (scene: HTMLElement, progress: number) => scene.dispatchEvent(new CustomEvent("gent-intelligence-progress", { detail: progress }));
  const mark = (index: number) => {
    active = index;
    root.dataset.activeScene = String(index + 1);
    const label = rail?.querySelector("[data-act-label]");
    if (label) label.textContent = `${String(index + 2).padStart(2,"0")} / ${scenes[index].dataset.chapterName}`;
    rail?.querySelector<HTMLButtonElement>("[data-scene-prev]")?.toggleAttribute("disabled",index===0);
    rail?.querySelector<HTMLButtonElement>("[data-scene-next]")?.toggleAttribute("disabled",index===scenes.length-1);
    for (const s of scenes.slice(index,index+2)) s.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach(image=> { image.loading="eager"; void image.decode().catch(()=>{}); });
  };
  const context = gsap.context(() => {
    scenes.forEach((scene,index) => {
      const signal = { p:0 };
      const tween = gsap.to(signal,{p:1,ease:"none",onUpdate:()=>publish(scene,signal.p),scrollTrigger:{trigger:scene,start:"top top",end:"bottom bottom",scrub:.35,invalidateOnRefresh:true,onEnter:()=>mark(index),onEnterBack:()=>mark(index),onUpdate:self=>{
        const bar=rail?.querySelector<HTMLElement>("[data-act-progress]");
        if (self.isActive && bar) bar.style.transform=`scaleX(${(index+self.progress)/scenes.length})`;
      }}});
      triggers.set(scene.id,tween.scrollTrigger!);
    });
  },root);
  const go = (scene: HTMLElement,p=0,focus=false) => {
    const trigger=triggers.get(scene.id);
    const top=trigger ? trigger.start+(trigger.end-trigger.start)*p : scene.getBoundingClientRect().top+scrollY;
    window.scrollTo({top,behavior:"instant"});
    ScrollTrigger.update();
    trigger?.getTween()?.progress(1);
    publish(scene,p);
    mark(scenes.indexOf(scene));
    if(focus) scene.querySelector<HTMLElement>("h2")?.focus({preventScroll:true});
  };
  const hash=()=>{let id="";try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const scene=scenes.find(s=>s.id===id);if(scene)go(scene);};
  const seek=(event:Event)=>{const detail=(event as CustomEvent<{id:string;p:number}>).detail;const scene=scenes.find(s=>s.id===detail.id);if(scene)go(scene,Math.max(0,Math.min(1,detail.p)));};
  const step=(event:Event)=>{const index=Math.max(0,Math.min(scenes.length-1,active+Number((event as CustomEvent).detail)));history.pushState(null,"",`#${scenes[index].id}`);go(scenes[index],0,true);};
  const click=(event:MouseEvent)=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||!(event.target instanceof Element))return;
    const link=event.target.closest<HTMLAnchorElement>('a[href]');if(!link)return;
    const url=new URL(link.href);if(url.origin!==location.origin||url.pathname!==location.pathname)return;
    const scene=scenes.find(s=>`#${s.id}`===url.hash);if(!scene)return;
    event.preventDefault();history.pushState(null,"",url.hash);go(scene,0,true);
  };
  window.addEventListener("gent-chapter-seek",seek);
  window.addEventListener("gent-scene-step",step);
  window.addEventListener("hashchange",hash);
  document.addEventListener("click",click);
  let frame=requestAnimationFrame(()=>{ScrollTrigger.refresh();hash();});
  void document.fonts.ready.then(()=>{if(!disposed){cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{ScrollTrigger.refresh();hash();});}});
  return ()=>{disposed=true;cancelAnimationFrame(frame);context.revert();delete root.dataset.chapterDirector;delete root.dataset.activeScene;window.removeEventListener("gent-chapter-seek",seek);window.removeEventListener("gent-scene-step",step);window.removeEventListener("hashchange",hash);document.removeEventListener("click",click);};
}
