import Link from "next/link";
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Link href="/" className="wordmark">
          GENT<span>DISTRIBUTION CO.</span>
        </Link>
        <p>Good taste is only the beginning.</p>
        <Link className="text-link" href="/membership">
          Enter the world of Gent ↗
        </Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Gent Distribution Co.</span>
        <span>PRODUCT HOUSE · DISTRIBUTION · MEMBERSHIP</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
