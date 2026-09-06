import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="closing">
      <p className="eyebrow">A DIFFERENT DIRECTION</p>
      <h1>
        This discovery
        <br />
        is still ahead.
      </h1>
      <Link className="button" href="/">
        Return to Gent ↗
      </Link>
    </main>
  );
}
