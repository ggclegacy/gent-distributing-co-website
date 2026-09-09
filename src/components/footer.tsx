import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { ExperienceControls } from "./experience-controls";
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Link
          href="/"
          className="brand"
          aria-label="Gent Reserve Co. home"
        >
          <BrandMark />
          <span className="wordmark">
            GENT <span>RESERVE CO.</span>
          </span>
        </Link>
        <p>Louisiana roots. Considered goods. Connected commerce.</p>
        <ExperienceControls />
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Gent Reserve Co.</span>
        <div>
          <Link href="/#collection">Collection</Link>
          <Link href="/approach">The house</Link>
          <Link href="/membership">Membership</Link>
          <a href="#top">Back to top ↑</a>
        </div>
        <span>CURATION. COMMERCE. CONNECTION.</span>
      </div>
    </footer>
  );
}
