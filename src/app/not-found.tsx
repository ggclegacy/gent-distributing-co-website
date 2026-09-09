import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found-page">
      <p className="eyebrow">PAGE NOT FOUND</p>
      <h1>
        A loose end.
        <br />
        Let’s get you home.
      </h1>
      <p>
        We couldn’t find that page. The collection is a good place to start.
      </p>
      <Link className="button" href="/">
        Return to Gent Reserve Co. ↗
      </Link>
    </main>
  );
}
