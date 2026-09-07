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
          aria-label="Gent Distribution Co. home"
        >
          <BrandMark />
          <span className="wordmark">
            GENT <span>DISTRIBUTION CO.</span>
          </span>
        </Link>
        <p>Lafayette roots. Exceptional goods. A wider horizon.</p>
        <ExperienceControls />
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Gent Distribution Co.</span>
        <div>
          <Link href="/#collection">Collection</Link>
          <Link href="/approach">The house</Link>
          <Link href="/membership">Membership</Link>
          <a href="#top">Back to top ↑</a>
        </div>
        <span>DISCOVERY. QUALITY. RELATIONSHIPS.</span>
      </div>
    </footer>
  );
}
