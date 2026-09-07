import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";
const manrope = localFont({
  src: "../../public/fonts/manrope-latin-variable.woff2",
  weight: "200 800",
  variable: "--font-brand",
  display: "swap",
  preload: true,
});
export const metadata: Metadata = {
  title: {
    default: "Gent Distribution Co. — Good things deserve to travel",
    template: "%s | Gent Distribution Co.",
  },
  description:
    "A modern merchant house discovering, developing, and distributing goods worth knowing. Explore Gent Coffee, future pantry goods, and our approach to independent makers.",
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
    <html lang="en" className={manrope.variable}>
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
