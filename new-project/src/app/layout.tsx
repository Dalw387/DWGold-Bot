import type { Metadata } from "next";
import { Instrument_Serif, Inter, Syne } from "next/font/google";
import { StudioAgent } from "@/components/agent/studio-agent";
import { Atmosphere } from "@/components/landing/atmosphere";
import { ScrollTheatre } from "@/components/landing/scroll-theatre";
import { NanoBoot } from "@/components/nano/nano-boot";
import { SalesGuide } from "@/components/sales/sales-guide";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyPayBar } from "@/components/landing/sticky-pay-bar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  ),
  title: {
    default: "LocalLaunch — the AI marketing workforce for modern business",
    template: "%s | LocalLaunch",
  },
  description:
    "An AI marketing team for small and mid-sized businesses. Leads, advertising, social, appointments, reviews and search — a department that is ready whenever you are. £197 once.",
  applicationName: "LocalLaunch",
  openGraph: {
    title: "LocalLaunch — AI marketing workforce",
    description:
      "Meet the AI team that grows your business. Built for trades, clinics, estate agents, and professional services.",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${syne.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-background pb-24 font-sans text-foreground md:pb-0">
        <Atmosphere />
        <ScrollTheatre />
        <NanoBoot />
        <div className="grain" aria-hidden="true" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-elevated focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:outline-2 focus:outline-offset-2 focus:outline-cobalt"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="relative z-10 flex-1">
          {children}
        </main>
        <SiteFooter />
        <StickyPayBar />
        <SalesGuide />
        <StudioAgent />
      </body>
    </html>
  );
}
