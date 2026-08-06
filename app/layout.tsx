import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { siteConfig } from "@/data/site";
import "./globals.css";

/** Display — engineered, slightly condensed. Topographic map labels, not fashion. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

/** Body & UI — a grotesque with more warmth in the lowercase than Inter. */
const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

/** Data — altitudes, day numbers, prices, coordinates. Tabular by default. */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Expeditions in the Karakoram, Himalaya & Hindukush`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  /** Self-referencing canonical for `/`; every other route sets its own. */
  alternates: { canonical: "/" },
  keywords: [
    "K2 base camp trek",
    "Karakoram trekking",
    "Pakistan expeditions",
    "Gondogoro La",
    "Snow Lake trek",
    "Hunza tours",
    "cycling Karakoram Highway",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `${siteConfig.name} — Expeditions in the Karakoram`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  verification: {
    google: "7zKWmUh_dqAfR08X3F9ALGOjF8Ds1K8bqu1dxv9SMgQ",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1116" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col overflow-x-clip font-sans">
        {/* Scroll reveals are rendered as inline `opacity:0` during SSR. Without
            JS those elements would never un-hide, so the whole page would read
            as blank. This puts every one of them back. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-alpenglow focus:px-5 focus:py-2.5 focus:text-body-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
