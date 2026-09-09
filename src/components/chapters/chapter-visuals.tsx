import Image from "next/image";
import {MembershipCard} from "../membership-card";
const coffee="/images/cinema/coffee-object.webp";
export function WorkshopVisual(){return <div className="craft-stage" aria-hidden="true">
 <div className="craft-macro"><Image src="/images/chapters/coffee-study.webp" alt="" fill sizes="100vw"/></div>
 <div className="craft-bench"/>
 <div className="craft-drawing"><svg viewBox="0 0 360 480" fill="none"><path pathLength="1" d="M80 30H280L302 430L270 460H85L58 430Z M80 50H280 M64 410H300 M108 166H250V310H108Z M180 0V480 M20 250H340"/></svg></div>
 <div className="craft-package"><Image src={coffee} alt="" fill sizes="(max-width:699px) 50vw, 400px"/><div className="craft-inspection"/></div>
 <div className="craft-signature"><span>G</span><b>GENT APPROVED</b><small>WORTH KNOWING. WORTH HAVING.</small></div>
 <div className="craft-measure"><i/><i/><i/><i/><i/><i/><i/><i/></div>
 </div>}
const goods=[{image:coffee,label:"Legacy Reserve",note:"Chapter one / coffee"},{image:"/images/story-film/gent-honey.png",label:"Gent Honey",note:"Provisions / in development"},{image:"/images/story-film/gent-seasonings.png",label:"At the table",note:"Seasonings / in development"}];
export function VaultVisual(){return <div className="vault-stage" aria-hidden="true"><div className="vault-architecture"><i/><i/><i/></div><div className="vault-travel">{goods.map((good,i)=><figure className="vault-object" key={good.label}><div className="vault-light"/><span className="vault-number">0{i+1}</span><div className="vault-product"><Image src={good.image} alt="" fill sizes="(max-width:699px) 52vw, 360px"/></div><figcaption><b>{good.label}</b><span>{good.note}</span></figcaption></figure>)}<figure className="vault-object vault-future"><div className="vault-light"/><span className="vault-number">04</span><div className="vault-horizon">A larger<br/>world.</div><figcaption><b>What comes next</b><span>Owned creations. Selected brands.</span></figcaption></figure></div><div className="vault-ledge"/></div>}
export function NetworkVisual(){return <div className="dispatch-stage" aria-hidden="true">
 <div className="dispatch-window dispatch-maker"><Image src="/images/story/product-intelligence-lab-portrait.webp" alt="" fill sizes="(max-width:699px) 55vw, 35vw"/><span>THE MAKER</span></div>
 <div className="dispatch-window dispatch-destination"><Image src="/images/story/gent-exchange-portrait.webp" alt="" fill sizes="(max-width:699px) 55vw, 35vw"/><span>THE RIGHT SETTING</span></div>
 <svg className="dispatch-path" viewBox="0 0 1000 400" preserveAspectRatio="none"><path className="dispatch-track" d="M70 140C300 140 250 280 500 280S750 140 930 140"/><path className="dispatch-gold" pathLength="1" d="M70 140C300 140 250 280 500 280S750 140 930 140"/></svg>
 <div className="dispatch-product"><Image src={coffee} alt="" fill sizes="(max-width:699px) 26vw, 180px"/></div>
 <div className="dispatch-case"><span>G</span><small>SELECT · PREPARE · MOVE</small><i/><i/></div>
 <div className="dispatch-stations"><span>MAKER</span><span>GENT</span><span>DAILY LIFE</span></div>
 </div>}
export function ExchangeVisual(){return <div className="exchange-chapter-stage" aria-hidden="true"><div className="exchange-door door-left"/><div className="exchange-door door-right"/><div className="exchange-table-light"/><div className="exchange-invitation"><MembershipCard/><p>AN INVITATION TO WHAT’S NEXT</p></div><div className="exchange-human-note">Good things bring<br/><em>people together.</em></div></div>}
