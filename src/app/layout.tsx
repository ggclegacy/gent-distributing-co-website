import type { Metadata, Viewport } from "next";
import { brand } from "@/lib/brand";
import localFont from "next/font/local";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";
import "./acadiana-hero.css";
import "./premium.css";
import "./acadiana-network.css";
import "./portfolio.css";
import "./distribution-engine.css";
const manrope = localFont({
  src: "../../public/fonts/manrope-latin-variable.woff2",
  weight: "200 800",
  variable: "--font-brand",
  display: "swap",
  preload: true,
});
export const metadata: Metadata = {
  title: {
    default: brand.title,
    template: "%s | Gent Distribution Co.",
  },
  description: brand.description,
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  themeColor: "#050806",
  colorScheme: "dark",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable} data-scroll-behavior="smooth">
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Organization", name: brand.name,
          description: brand.description,
          location: { "@type": "Place", name: "Lafayette, Louisiana", address: { "@type": "PostalAddress", addressLocality: "Lafayette", addressRegion: "LA", addressCountry: "US" } },
        }).replace(/</g, "\\u003c") }} />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
