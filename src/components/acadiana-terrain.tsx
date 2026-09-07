"use client";

import { useState, useSyncExternalStore } from "react";
import { louisianaOutline } from "@/lib/louisiana-shape";

// Illustrative partner connections, not a claim of current delivery coverage.
const routes = [
 { d: "M240 240 C225 315 290 350 317.4 449.8", x: 240, y: 240, key: "craft", label: "Made with care", title: "Worth sharing.", copy: "Thoughtful materials and ingredients. Careful work. Products chosen for the quality and care behind them." },
 { d: "M317.4 449.8 C335 392 376 390 410 350", x: 410, y: 350, key: "business", label: "Elevate local business", title: "A more distinctive shelf.", copy: "Connect your business with exceptional products that fit your customers, bring character to your offering, and create room to grow." },
 { d: "M410 350 C448 379 448 447 510 472", x: 510, y: 472, key: "customer", label: "Create a customer favorite", title: "Something they come back for.", copy: "A daily ritual. A thoughtful detail. Carefully made products can turn an everyday visit into a reason to return." },
];
const etchedChannels = [
 "M358 90C380 145 330 177 362 218S320 280 342 332 378 365 383 414 412 456 454 497 480 535 540 560",
 "M310 270C295 318 345 351 333 390S350 442 365 476 390 510 383 540",
 "M262 384C240 409 280 436 266 471S295 499 276 533",
 "M383 414C360 465 420 479 404 525S440 554 437 575",
];

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function AcadianaTerrain() {
  const [selected, setSelected] = useState<number | null>(null);
  const interactive = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  return (
    <>
    <div className="network-camera">
      <div className="sculpture-spotlight" />
      <div className="sculpture-ground" />
      <div className="network-world terrain-reveal">
        <div className="state-turntable">
          <svg className="network-terrain" viewBox="0 0 800 760" fill="none" aria-hidden="true">
            <defs>
              <path id="louisiana-silhouette" d={louisianaOutline} />
              <clipPath id="louisiana-face"><use href="#louisiana-silhouette" /></clipPath>
              <linearGradient id="obsidian-face" x1="120" y1="80" x2="610" y2="620" gradientUnits="userSpaceOnUse"><stop stopColor="#34453b"/><stop offset=".27" stopColor="#14271f"/><stop offset=".6" stopColor="#091610"/><stop offset="1" stopColor="#243a2d"/></linearGradient>
              <linearGradient id="obsidian-edge" x1="90" y1="80" x2="580" y2="660" gradientUnits="userSpaceOnUse"><stop stopColor="#b19052"/><stop offset=".28" stopColor="#28372c"/><stop offset=".63" stopColor="#070d09"/><stop offset="1" stopColor="#7a6237"/></linearGradient>
              <linearGradient id="gold-bevel" x1="90" y1="80" x2="640" y2="600" gradientUnits="userSpaceOnUse"><stop stopColor="#f1d8a0"/><stop offset=".3" stopColor="#C4912F"/><stop offset=".6" stopColor="#5b431a"/><stop offset="1" stopColor="#e1b962"/></linearGradient>
              <linearGradient id="glass-sheen" x1="0" y1="0" x2="1" y2=".7"><stop stopColor="#dbe6ce" stopOpacity="0"/><stop offset=".48" stopColor="#dbe6ce" stopOpacity=".08"/><stop offset=".5" stopColor="#dbe6ce" stopOpacity=".2"/><stop offset=".52" stopColor="#dbe6ce" stopOpacity=".015"/><stop offset="1" stopColor="#dbe6ce" stopOpacity="0"/></linearGradient>
              <radialGradient id="source-aura"><stop stopColor="#C4912F" stopOpacity=".55"/><stop offset="1" stopColor="#C4912F" stopOpacity="0"/></radialGradient>
              <filter id="edge-bloom" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation="2.5" /></filter>
              <pattern id="surface-grid" width="27" height="27" patternUnits="userSpaceOnUse"><path d="M27 0H0V27" stroke="#b9c5b3" strokeWidth=".5" opacity=".12" /></pattern>
            </defs>
            <use href="#louisiana-silhouette" transform="translate(0 46)" fill="#010302" opacity=".7" />
            <g className="state-depth">
              {Array.from({length: 12},(_,i)=><use key={i} href="#louisiana-silhouette" transform={`translate(0 ${27-i*2})`} fill="url(#obsidian-edge)" stroke="#718168" strokeOpacity={i%3===0 ? '.16' : '.035'} strokeWidth=".6"/>)}
            </g>
            <use href="#louisiana-silhouette" fill="url(#obsidian-face)" stroke="url(#gold-bevel)" strokeWidth="1.6" />
            <g clipPath="url(#louisiana-face)">
              <path d="M70 70H710V660H70Z" fill="url(#surface-grid)" />
              <g stroke="#779381" strokeWidth=".8" opacity=".23">{etchedChannels.map(d=><path key={d} d={d}/>)}</g>
              <path className="state-sheen" d="M-200 0H780V760H-200Z" fill="url(#glass-sheen)" />
              <g className="route-beds" stroke="#020805" strokeWidth="3.5" opacity=".75">{routes.map(({d})=><path key={d} d={d}/>)}</g>
              <g className="distribution-routes" stroke="#C4912F" strokeWidth="1.2" strokeLinecap="round">{routes.map(({d})=><path key={d} d={d} pathLength="1"/>)}</g>
              <g className="distribution-packets" stroke="#ffe6b3" strokeWidth="3.5" strokeLinecap="round">{routes.map(({d})=><path key={d} d={d} pathLength="1"/>)}</g>
            </g>
            <use className="state-edge-glow" href="#louisiana-silhouette" stroke="#C4912F" strokeWidth="3" filter="url(#edge-bloom)" opacity=".3" />
            <path className="state-edge-trace" d={louisianaOutline} stroke="url(#gold-bevel)" strokeWidth="1.3" pathLength="1" />
            <g className="terrain-destinations">{routes.map(({x,y,key},index)=><g className={`terrain-node connection-place place-${key}`} data-selected={selected === index ? "true" : undefined} key={key} transform={`translate(${x} ${y})`}>
              <ellipse className="place-warmth" cx="0" cy="0" rx="72" ry="42" fill="url(#source-aura)" />
              <path d="M-40 9 0-12 43 9 0 32Z" fill="#050b08" stroke="#64745a" strokeWidth=".7" />
              <path className="place-platform" d="M-40 9V15L0 38 43 15V9L0 32Z" fill="#19281d" stroke="#C4912F" strokeOpacity=".35" strokeWidth=".6" />
              {key === "craft" ? <g>
                <path d="M-24-9 4-24 26-11 0 4Z" fill="#68715b" stroke="#bca474" strokeWidth=".8"/>
                <path d="M-24-9V6L0 19V4Z" fill="#213c2b"/><path d="M0 4 26-11V4L0 19Z" fill="#0f2017"/>
                <ellipse cx="-1" cy="-12" rx="9" ry="5" transform="rotate(-25 -1 -12)" fill="#C4912F"/>
                <path d="M-6-10Q-1-16 5-14" stroke="#413016" strokeWidth="1.5"/>
                <path d="M-17-18 2-29M-12-15 7-26" stroke="#ddc9a0" strokeWidth="1.2"/>
                <circle cx="16" cy="-4" r="3" fill="#d6ba7b"/>
              </g> : key === "business" ? <g>
                <path d="M-27 7V-28L7-45 30-32V1L-4 20Z" fill="#152a1d" stroke="#8c987d" strokeWidth=".8"/>
                <path d="M-27-28 7-45 30-32 -4-14Z" fill="#4c5a43"/>
                <path className="place-window" d="M-21-20 -7-13V9L-21 2ZM2-15 23-26V-4L2 8Z" fill="#e1ac4c"/>
                <path d="M-30-25 -4-10 33-29 30-36 -4-19 -27-32Z" fill="#a98543" stroke="#d9bd83" strokeWidth=".7"/>
                <path d="M-4-14V19M12-20V2" stroke="#122118" strokeWidth="2"/>
              </g> : <g>
                <path d="M-21 3V18M19 0V15" stroke="#99865c" strokeWidth="3"/>
                <ellipse cx="0" cy="-2" rx="29" ry="15" fill="#3b4a35" stroke="#c4ae7b"/>
                <ellipse cx="0" cy="-5" rx="29" ry="15" fill="#596148"/>
                <ellipse cx="-7" cy="-8" rx="10" ry="5" fill="#dccdac"/>
                <path d="M-13-10V-18Q-7-24-1-18V-10Q-7-4-13-10Z" fill="#eee0bf"/>
                <path d="M-1-18Q7-19 5-13L-1-12" stroke="#eee0bf" strokeWidth="2"/>
                <ellipse cx="14" cy="-5" rx="7" ry="4" fill="#C4912F"/>
                <path className="place-steam" d="M-9-27Q-14-33-8-39M-2-27Q3-34-2-39" stroke="#e7d5b0" strokeWidth="1" opacity=".6"/>
              </g>}
              <g className="community-sparks" fill="#ebc576"><circle cx="-47" cy="-8" r="1.5"/><circle cx="42" cy="-22" r="1.5"/><circle cx="24" cy="35" r="1.5"/></g>
            </g>)}</g>
            <g className="source-ignition">
              <circle cx="317.4" cy="449.8" r="65" fill="url(#source-aura)" />
              <circle className="source-ring" cx="317.4" cy="449.8" r="17" stroke="#C4912F" strokeWidth="1" />
              <circle cx="317.4" cy="449.8" r="8" stroke="#efdaa8" strokeWidth="1.5" />
              <circle cx="317.4" cy="449.8" r="3.5" fill="#fff0cf" />
              <path d="M 317.4 449.8 v44 h22" stroke="#C4912F" />
              <text x="347.4" y="496.8" className="terrain-source-label">LAFAYETTE</text>
              <text x="347.4" y="514.8" className="terrain-coordinate">ACADIANA / OUR ORIGIN</text>
            </g>
          </svg>
          <div className="connection-hotspots">
            {routes.map(({x,y,key,label},index)=><button key={key} type="button" className="connection-hotspot" style={{left: `${x/8}%`,top: `${y/7.6}%`}} disabled={!interactive} aria-label={label} aria-expanded={selected === index} aria-controls="connection-detail" onKeyDown={event=>{if(event.key === "Escape") setSelected(null);}} onClick={()=>setSelected(selected === index ? null : index)}><span aria-hidden="true">+</span></button>)}
          </div>
        </div>
      </div>
      <div className="network-mist network-mist-near" />
    </div>
    <aside id="connection-detail" className="connection-inspector" hidden={selected === null} aria-live="polite" onKeyDown={event=>{if(event.key === "Escape"){setSelected(null);document.querySelectorAll<HTMLButtonElement>(".connection-hotspot")[selected ?? 0]?.focus();}}}>
      {selected !== null && <><p className="eyebrow">{String(selected+1).padStart(2,"0")} / {routes[selected].label}</p><h3>{routes[selected].title}</h3><p>{routes[selected].copy}</p><button type="button" className="connection-close" aria-label="Close connection details" onClick={()=>{setSelected(null);document.querySelectorAll<HTMLButtonElement>(".connection-hotspot")[selected]?.focus();}}>×</button></>}
    </aside>
    </>
  );
}
