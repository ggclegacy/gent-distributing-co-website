import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Gent Distribution Co. — Exceptional by nature",
    template: "%s | Gent Distribution Co.",
  },
  description:
    "A modern product house. Discover Gent Coffee, considered goods, and a world of good taste.",
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
