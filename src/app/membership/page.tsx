import Link from "next/link";
export const metadata = { title: "Gent membership" };
const benefits = [
  [
    "01",
    "First through the door",
    "Early access to upcoming products and special releases.",
  ],
  [
    "02",
    "A more rewarding ritual",
    "Member pricing on eligible products and future recurring offerings.",
  ],
  [
    "03",
    "Something worth finding",
    "Limited batches, curated bundles, and member-focused discoveries.",
  ],
  [
    "04",
    "One world. One membership.",
    "An umbrella membership designed to grow across the Gent product house.",
  ],
];
export default function Membership() {
  return (
    <main id="main" className="membership-page">
      <p className="eyebrow">THE INNER WORLD OF GENT</p>
      <h1>
        A little closer.
        <br />
        <em>A little more Gent.</em>
      </h1>
      <p className="membership-intro">
        A membership for people who believe that the things they choose should
        mean something. One connection to an expanding world of considered
        goods.
      </p>
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
        <p className="eyebrow">CURRENTLY TAKING SHAPE</p>
        <h2>Worth looking forward to.</h2>
        <p>
          Gent membership is in development. Pricing, eligibility, benefits, and
          enrollment details will be announced before launch.
        </p>
        <Link className="button" href="/#collection">
          Explore what’s coming ↗
        </Link>
      </div>
    </main>
  );
}
