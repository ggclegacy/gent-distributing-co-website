"use client";
import {useRef} from "react";
import Link from "next/link";
import {StoryEnvironment} from "./story-environment";
import {ProductExplorer} from "./product-explorer";
import type {IntelligenceRecord} from "@/lib/intelligence";
import {useChapter} from "./chapters/use-chapter";
import {WorkshopVisual,VaultVisual,NetworkVisual,ExchangeVisual} from "./chapters/chapter-visuals";
const scenes={workshop:WorkshopVisual,vault:VaultVisual,network:NetworkVisual,arrival:ExchangeVisual};
const headings={workshop:<>Nothing earns<br/>our name<br/><em>by accident.</em></>,vault:<>A first release.<br/><em>A larger world.</em></>,network:<>From exceptional<br/>hands.<br/><em>To everyday life.</em></>,arrival:<>Good taste.<br/><em>Better company.</em></>};
const mobileCopy={
 workshop:["Exceptional ingredients. Clear origins. Considered partners.","Product, brand and packaging. Refined together.","Quality, purpose and experience. Every detail reviewed.","Only what meets the standard moves forward."],
 vault:["Our first coffee concept. Origin details before orders open.","Signature Blend Coffee. Our own label, in development.","Owned creations. Selected brands. Room to grow.","Origin, roast and release details before preorders."],
 network:["Exceptional makers bring the substance. Gent sees the opportunity.","Curation, development and logistics. A path to opportunity.","Purposeful goods for retail, wellness and hospitality.","Born in Louisiana. An ambition to reach further."],
 arrival:["Early releases and selected bundles are under consideration.","A vision for makers and customers to meet, taste and discover.","Member pricing is planned. Terms before enrollment.","Future categories. Participating brands. Details to come."]
};
export function IntelligenceScene({record}:{record:IntelligenceRecord}){
 const {root,active,select}=useChapter();const dialog=useRef<HTMLDialogElement>(null);const opener=useRef<HTMLButtonElement>(null);const Visual=scenes[record.scene];
 return <section ref={root} id={record.id} className={`material-scene cinematic-chapter chapter-${record.scene}`} data-scene={record.scene} data-chapter-scene data-chapter-name={record.name} data-intelligence data-phase={active} aria-labelledby={`${record.id}-title`}>
  <div className="chapter-viewport">
   <StoryEnvironment scene={record.scene} instrumentation={false}/>
   <Visual/>
   <div className="chapter-shade" aria-hidden="true"/>
   <header className="chapter-heading"><p className="chapter-index">{record.number} / {record.name}</p><h2 id={`${record.id}-title`} tabIndex={-1}>{headings[record.scene]}</h2></header>
   <div className="chapter-narrative">
    {record.phases.map((phase,i)=><article className="chapter-beat" key={phase.label} data-selected={i===active} aria-hidden={i!==active}>
     <p className="chapter-kicker">0{i+1} / {phase.label}</p><h3>{phase.title}</h3><p className="chapter-description chapter-full-copy">{phase.copy}</p><p className="chapter-description chapter-mobile-copy">{mobileCopy[record.scene][i]}</p>
     <details className="chapter-details"><summary>Explore the details</summary><p className="chapter-mobile-copy">{phase.copy}</p><dl>{phase.fields.map(([name,value])=><div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl></details>
    </article>)}
    <div className="chapter-actions">
     {record.scene==="vault"&&<><button ref={opener} onClick={()=>dialog.current?.showModal()}>Explore all categories <span>↗</span></button><Link href="/products/gent-coffee">Meet Legacy Reserve →</Link></>}
     {record.scene==="network"&&<Link href="/approach">Explore the house ↗</Link>}
     {record.scene==="arrival"&&<Link href="/membership">Explore the membership vision ↗</Link>}
    </div>
   </div>
   <nav className="chapter-progress" aria-label={`${record.name} story chapters`}>{record.phases.map((phase,i)=><button key={phase.label} aria-pressed={active===i} onClick={()=>select(record.id,i)}><i/><span>{phase.label}</span></button>)}</nav>
   <p className="chapter-status">{record.status}</p><span className="chapter-scroll" aria-hidden="true">SCROLL TO CONTINUE ↓</span>
  </div>
  <div className="chapter-static-records">{record.phases.map(phase=><article key={phase.label}><h3>{phase.title}</h3><p>{phase.copy}</p><dl>{phase.fields.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></article>)}</div>
  {record.scene==="vault"&&<dialog ref={dialog} className="chapter-catalog" aria-label="The Gent collection" onClose={()=>opener.current?.focus({preventScroll:true})}><div className="catalog-top"><h2>The collection</h2><button onClick={()=>dialog.current?.close()} aria-label="Close collection">Close ×</button></div><ProductExplorer/></dialog>}
 </section>
}
export function ClosingScene(){const {root}=useChapter();return <section ref={root} id="welcome" className="material-scene cinematic-chapter chapter-closing" data-scene="doorway" data-chapter-scene data-chapter-name="COME IN" aria-labelledby="welcome-title"><div className="chapter-viewport"><StoryEnvironment scene="arrival" instrumentation={false}/><div className="closing-threshold" aria-hidden="true"><i/><i/></div><div className="closing-copy"><p className="chapter-index">06 / FROM OUR HOUSE TO YOURS</p><h2 id="welcome-title" tabIndex={-1}>Come in.<br/><em>Find your good.</em></h2><p>Exceptional goods. Considered connections.<br/>A place for what comes next.</p><div className="chapter-actions"><Link href="#collection">Explore the collection ↗</Link><Link href="/approach">Build with Gent ↗</Link></div></div></div></section>}
