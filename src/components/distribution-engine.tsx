"use client";

import { useRef, useState } from "react";


const categories = [
  ["Provisions", "Coffee, honey and carefully chosen provisions open our story."],
  ["Personal care", "Grooming and personal care belong in the longer-term vision. Every addition must earn its place."],
  ["Wellness", "A future direction for useful, thoughtfully selected wellness goods."],
  ["Apparel & goods", "Considered materials. Everyday purpose. A category we intend to explore."],
  ["Accessories", "Objects worth keeping. Premium accessories are part of the horizon."],
  ["Honey & pantry", "Exceptional pantry goods, selected for their quality and the people behind them."],
];
const positions = [[155, 290], [115, 410], [160, 530], [865, 255], [915, 425], [865, 590]];
const housingAngles = [0, 60, 120, 180, 240, 300];

function ProductForm({ index }: { index: number }) {
  return <g fill="url(#engine-ceramic)" stroke="url(#engine-metal)" strokeWidth="1.2">
    {index === 0 ? <><path d="M-27-46H27L24-27 34 45Q0 55-34 45L-24-27Z"/><path d="M-27-40H27M-24-27H24M-19 10H19M-19 15H8"/><path d="M-7-7H7V3H-7Z" fill="#c4912f"/></> :
     index === 1 ? <><rect x="-19" y="-30" width="38" height="77" rx="8"/><path d="M-10-30V-47H11V-30M-8-47V-59H8V-47"/><path d="M-11 0H11M-11 7H4"/><circle cy="23" r="5"/></> :
     index === 2 ? <><rect x="-31" y="-29" width="62" height="72" rx="12"/><rect x="-33" y="-42" width="66" height="17" rx="4"/><path d="M-21-6H21V24H-21Z"/><path d="M-8 3H8M0-5V11"/></> :
     index === 3 ? <><path d="M-38-24-16-42 0-35 16-42 38-24 25-7 16-14 19 37H-19L-16-14-25-7Z"/><path d="M-16-42Q0-11 16-42M-15 30H16"/></> :
     index === 4 ? <><path d="M-13-60H13L17-18V18L13 60H-13L-17 18V-18Z"/><circle r="28"/><circle r="23" fill="#090d0c"/><path d="M0-16V0L12 7M0-21V-18M21 0H18M0 21V18M-21 0H-18"/></> :
     <><path d="M-23-24Q-31-18-31-4V31Q-30 42 0 44 30 42 31 31V-4Q31-18 23-24Z" fill="url(#engine-amber)"/><rect x="-25" y="-37" width="50" height="14" rx="3"/><path d="M-22-1H22V23H-22Z" fill="#11150f"/><path d="M-9 7H9M-5 13H5"/></>}
  </g>;
}

/** Server-rendered vector sculpture, enhanced by event-driven CSS 3D; no render loop. */
export function DistributionEngine() {
  const surface = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  return <div className="engine-camera network-camera">
    <div className="engine-atmosphere" aria-hidden="true" />
    <div className="exchange-environment" aria-hidden="true">
      <div className="exchange-aurora"/>
      <div className="exchange-depth-plane"><div className="exchange-grid"/></div>
      <div className="exchange-horizons">{[0,1,2,3].map(i=><span key={i} style={{inset: `${i*9}%`}}/>)}</div>
      <div className="exchange-dust">{Array.from({length:18},(_,i)=><i key={i} style={{left:`${42+(i*17)%57}%`,top:`${12+(i*23)%70}%`}}/>)}</div>
      <div className="exchange-light-shaft"/>
    </div>
    <div className="engine-surface" ref={surface} onPointerMove={event => {
      if (window.scrollY < 2 || event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "paused") return;
      const rect = event.currentTarget.getBoundingClientRect();
      surface.current?.style.setProperty("--engine-yaw", `${((event.clientX-rect.left)/rect.width-.5)*7}deg`);
      surface.current?.style.setProperty("--engine-pitch", `${-((event.clientY-rect.top)/rect.height-.5)*5}deg`);
    }} onPointerLeave={() => { surface.current?.style.setProperty("--engine-yaw", "0deg"); surface.current?.style.setProperty("--engine-pitch", "0deg"); }}>
      <svg className="engine-field" viewBox="0 0 1000 900" aria-hidden="true">
        <defs>
          <linearGradient id="engine-metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#493419"/><stop offset=".22" stopColor="#c4912f"/><stop offset=".4" stopColor="#f5dfab"/><stop offset=".49" stopColor="#826025"/><stop offset=".69" stopColor="#c4912f"/><stop offset=".86" stopColor="#513d20"/><stop offset="1" stopColor="#e3bf73"/></linearGradient>
          <linearGradient id="exchange-incoming" gradientUnits="userSpaceOnUse" x1="-180" y1="0" x2="500" y2="0"><stop stopColor="#c4912f" stopOpacity="0"/><stop offset=".35" stopColor="#c4912f" stopOpacity="0"/><stop offset=".7" stopColor="#c4912f"/><stop offset="1" stopColor="#edce8a"/></linearGradient>
          <linearGradient id="engine-ceramic"><stop stopColor="#030706"/><stop offset=".45" stopColor="#26332c"/><stop offset=".65" stopColor="#111914"/><stop offset="1" stopColor="#040706"/></linearGradient>
          <linearGradient id="engine-amber"><stop stopColor="#16130c"/><stop offset=".45" stopColor="#745123"/><stop offset=".65" stopColor="#302216"/><stop offset="1" stopColor="#100f0a"/></linearGradient>
          <radialGradient id="engine-green"><stop stopColor="#325d40" stopOpacity=".5"/><stop offset="1" stopColor="#0c2a1d" stopOpacity="0"/></radialGradient>
        </defs>
        <ellipse cx="500" cy="730" rx="380" ry="120" fill="url(#engine-green)"/>
        <g className="engine-waterways" fill="none" stroke="#325d40" strokeWidth="1">
          {Array.from({length:8},(_,i)=><path key={i} d={`M${90-i*22} ${795+i*9} C${290+i*9} ${650+i*10},${170+i*21} ${910+i*3},${500+i*20} ${760+i*14} S${805+i*15} ${780+i*9},1050 ${680+i*16}`}/>)}
        </g>
        <g className="engine-expansion" fill="none" stroke="url(#engine-metal)" strokeWidth="1.4">
          {[210, 320, 430, 540, 650].map((y, i) => <g key={y}>
            <path pathLength="1" d={`M500 430 C690 430 730 ${y} 860 ${y} S1090 ${y - 65 + i * 25} 1250 ${y - 85 + i * 40}`}/>
            <circle cx="860" cy={y} r="3" fill="#c4912f" stroke="none"/>
          </g>)}
          <g className="exchange-destinations" stroke="none" fill="#b7bbac"><text x="875" y="202">BUSINESSES</text><text x="875" y="312">RETAIL</text><text x="875" y="422">HOSPITALITY</text><text x="875" y="532">CUSTOMERS</text></g>
        </g>
        <g className="engine-paths" fill="none" stroke="url(#exchange-incoming)" strokeWidth="1.5">
          {positions.slice(0,3).map(([x,y],i)=><path key={i} pathLength="1" d={`M-180 ${y-80} C${x-80} ${y-90} ${x-50} ${y+70} ${x+100} ${y+30} S400 430 500 430`}/>)}
          <path className="engine-origin-path" pathLength="1" d="M500 794 C500 695 355 689 395 569 S470 481 500 430"/>
        </g>
        <g className="exchange-transit" fill="none" stroke="#f0d49a" strokeWidth="2.5">
          <path pathLength="1" d="M155 290C340 270 390 430 500 430S735 210 1000 210"/>
          <path pathLength="1" d="M115 440C305 510 420 430 500 430S750 540 1100 540"/>
          <path pathLength="1" d="M500 794C500 695 355 689 395 569S470 481 500 430 760 320 1100 320"/>
        </g>
        <g className="engine-origin" transform="translate(500 794)"><circle r="18" fill="none" stroke="#325d40"/><circle r="6" fill="#c4912f"/><circle r="2" fill="#ffebbd"/><text y="40" textAnchor="middle">LAFAYETTE, LOUISIANA</text><text y="58" textAnchor="middle" className="engine-origin-sub">OUR ORIGIN. AN OPEN HORIZON.</text></g>
      </svg>
      <div className="engine-assembly" aria-hidden="true" data-exchange-selected={selected !== null}>
        <div className="engine-tilt">
          <svg className="engine-caliber exchange-sculpture" viewBox="0 0 600 660">
            <defs>
              <radialGradient id="exchange-shadow"><stop stopColor="#000" stopOpacity=".8"/><stop offset="1" stopColor="#000" stopOpacity="0"/></radialGradient>
              <linearGradient id="exchange-obsidian" x1=".1" y1="0" x2=".8" y2="1"><stop stopColor="#50605a"/><stop offset=".12" stopColor="#293630"/><stop offset=".38" stopColor="#101914"/><stop offset=".78" stopColor="#060b09"/><stop offset="1" stopColor="#1d2922"/></linearGradient>
              <linearGradient id="exchange-edge" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7f8b7d"/><stop offset=".25" stopColor="#303e34"/><stop offset=".6" stopColor="#050a08"/><stop offset="1" stopColor="#4b5545"/></linearGradient>
              <linearGradient id="exchange-depth"><stop stopColor="#020504"/><stop offset=".45" stopColor="#1e2c22"/><stop offset=".7" stopColor="#080e0b"/><stop offset="1" stopColor="#020504"/></linearGradient>
              <radialGradient id="exchange-well"><stop stopColor="#294c36"/><stop offset=".45" stopColor="#10291c"/><stop offset=".8" stopColor="#020705"/><stop offset="1" stopColor="#020403"/></radialGradient>
              <linearGradient id="exchange-ribbon" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#edd6a2"/><stop offset=".25" stopColor="#c4912f"/><stop offset=".48" stopColor="#624519"/><stop offset=".75" stopColor="#ae7e28"/><stop offset="1" stopColor="#edce8a"/></linearGradient>
              <pattern id="exchange-brushed" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 1H4" stroke="#d8e2ce" strokeOpacity=".055" strokeWidth=".4"/></pattern>
              <clipPath id="exchange-panel-clip"><path d="M170 61Q300-8 430 61L373 173Q300 148 227 173Z"/></clipPath>
              <clipPath id="exchange-port-clip"><rect x="263" y="73" width="74" height="51" rx="7"/></clipPath>
            </defs>
            <ellipse cx="307" cy="584" rx="215" ry="35" fill="url(#exchange-shadow)"/>
            <path d="M164 87Q300 10 436 87L565 311 440 539Q300 622 160 539L35 311Z" fill="url(#exchange-depth)" stroke="#243429" strokeWidth="2"/>
            <path d="M164 99 39 320 163 540Q300 615 439 540L562 320" fill="none" stroke="#6d5229" strokeWidth="2"/>
            <path d="M171 106 49 320 170 530Q300 600 430 530L551 320" fill="none" stroke="#121d15" strokeWidth="8"/>
            <path d="M222 158H378L456 300 378 442H222L144 300Z" fill="url(#exchange-well)" stroke="url(#engine-metal)" strokeWidth="3"/>
            <path d="M236 183H364L431 300 364 417H236L169 300Z" fill="none" stroke="#1d3927" strokeWidth="12"/>
            <g className="exchange-confluence" fill="none" stroke="url(#exchange-ribbon)">
              <path d="M-65 458C118 520 142 344 218 343S278 294 309 298 435 315 476 216 576 168 679 160" strokeWidth="8"/>
              <path d="M-54 479C100 539 153 365 221 365S280 307 310 311 443 333 492 228 590 188 676 180" strokeWidth="2"/>
              <path d="M293 574C242 489 411 455 369 360" strokeWidth="4"/>
            </g>
            <g className="exchange-aperture">
              {housingAngles.map((angle,i)=><g key={angle} transform={`rotate(${angle} 300 300)`}>
                <path className="exchange-blade" d="M230 181H367L402 241 322 286 295 253 251 257 204 220Z" fill="url(#exchange-obsidian)" stroke="url(#exchange-edge)" strokeWidth="1.2"/>
                <path className="exchange-blade-edge" d="M230 181H367L402 241" fill="none" stroke={i%2===0 ? "#ba9652" : "#586448"} strokeWidth="1"/>
              </g>)}
            </g>
            <g className="exchange-monogram" transform="translate(224 224) scale(3.2)">
              <path d="M37 14 30 7H17L7 17v14l10 10h14l10-10V23H24v7h9l-5 5h-8l-6-6V20l6-6h8l4 4" fill="none" stroke="url(#engine-metal)" strokeWidth="1.7"/>
            </g>
            {housingAngles.map((angle,index)=><g key={angle} transform={`rotate(${angle} 300 300)`}>
              <g className="exchange-panel" data-panel={index} data-selected={selected === index}>
                <path d="M170 61Q300-8 430 61L430 80 373 194Q300 169 227 194L170 80Z" fill="url(#exchange-depth)" stroke="#111d15"/>
                <path d="M170 61Q300-8 430 61L373 173Q300 148 227 173Z" fill="url(#exchange-obsidian)" stroke="url(#exchange-edge)" strokeWidth="2"/>
                <path d="M170 61Q300-8 430 61L373 173Q300 148 227 173Z" fill="url(#exchange-brushed)"/>
                <path d="M180 63Q300 0 420 63" fill="none" stroke="#9eaa94" strokeOpacity=".35" strokeWidth="1"/>
                <path d="M229 168Q300 145 371 168" fill="none" stroke="url(#engine-metal)" strokeWidth="2"/>
                <path d="M182 69 235 156M418 69 365 156" fill="none" stroke="#040806" strokeWidth="6"/>
                <path d="M181 68 234 155" fill="none" stroke="url(#engine-metal)" strokeWidth="1.4"/>
                <g clipPath="url(#exchange-panel-clip)">
                  <rect x="260" y="70" width="80" height="57" rx="8" fill="#020604" stroke="#344137"/>
                  <g clipPath="url(#exchange-port-clip)"><g className="engine-product" data-selected={selected === index} transform={`translate(300 113) rotate(${-angle}) scale(.75)`}><ProductForm index={index}/></g></g>
                  <path d="M268 74H332" stroke="#bf9b53" strokeOpacity=".6"/>
                </g>
                <path className="exchange-panel-signal" d="M290 140H310" stroke="#c4912f" strokeWidth="2"/>
              </g>
            </g>)}
            <path className="exchange-g-bridge" d="M481 303H388L357 334H306" fill="none" stroke="#040907" strokeWidth="22"/>
            <path d="M481 294H388L357 325H306" fill="none" stroke="url(#engine-metal)" strokeWidth="2"/>
            <text x="303" y="555" textAnchor="middle" className="exchange-engraving">G E N T</text>
            <text x="303" y="569" textAnchor="middle" className="exchange-edition">THE EXCHANGE / 01</text>
          </svg>
          <div className="exchange-light-volume"><div className="exchange-reflection"/></div>
        </div>
      </div>
    </div>
    <div className="engine-controls">
      <p className="engine-signature">THE GENT EXCHANGE <span>SOURCE / SELECT / CONNECT</span></p>
      <div className="engine-category-controls" aria-label="Explore the category vision">
        {categories.map(([title],i)=><button key={title} type="button" aria-expanded={selected === i} aria-controls="engine-category-detail" onClick={()=>setSelected(selected === i ? null : i)}>{title}</button>)}
      </div>
      <p id="engine-category-detail" className="engine-detail" aria-live="polite">{selected === null ? "A vision for our house. Every category held to one standard." : categories[selected][1]}</p>
    </div>
  </div>;
}
