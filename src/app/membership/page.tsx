import Link from "next/link";
import { MembershipCard } from "@/components/membership-card";
export const metadata = { title: "Gent membership — Good company, shared taste", description: "A closer connection to Gent’s goods and the people behind them. Explore our membership direction, currently in development. Enrollment is not yet open." };
const benefits = [
  [
    "01",
    "First access.",
    "We’re exploring early access so members can discover upcoming goods before a wider release.",
  ],
  [
    "02",
    "A reason to return.",
    "Member pricing is part of the plan. Eligible goods and any savings will be confirmed before enrollment.",
  ],
  [
    "03",
    "The next good find.",
    "We’re considering small releases and selected bundles that give members something new to get to know.",
  ],
  [
    "04",
    "Room to grow.",
    "The aim is one membership that can grow across Gent’s categories and participating brands, with eligibility and terms made clear before enrollment.",
  ],
];
export default function Membership() {
  return (
    <main id="main" className="membership-page section-pad">
      <div className="membership-page-hero">
        <div>
          <p className="eyebrow">GENT MEMBERSHIP / IN DEVELOPMENT</p>
          <h1>
            Good company.
            <br />
            <em>Shared taste.</em>
          </h1>
          <p className="membership-intro">
            For those who enjoy the find as much as the goods themselves.
            We’re shaping a closer connection to our collection and the people
            behind it. These ideas are guiding membership; benefits are not yet final.
          </p>
          <a className="button button-outline" href="#benefits">
            See what we’re planning <span aria-hidden="true">↓</span>
          </a>
        </div>
        <MembershipCard />
      </div>
      <div className="section-index" id="benefits">
        <span>THE MEMBERSHIP VISION</span>
        <span>BENEFITS UNDER CONSIDERATION</span>
      </div>
      <div className="membership-benefits">
        {benefits.map(([number, title, description]) => (
          <article key={number}>
            <span className="eyebrow">{number}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <div className="membership-launch">
        <p className="eyebrow">
          <span className="status-dot" /> BEFORE THE DOORS OPEN
        </p>
        <h2>
          The details
          <br />
          <em>come first.</em>
        </h2>
        <p>
          Enrollment is not open yet. We’ll publish pricing, eligibility,
          confirmed benefits, and membership terms before you’re asked to join.
        </p>
        <Link className="button" href="/#collection">
          Explore the collection <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </main>
  );
}
