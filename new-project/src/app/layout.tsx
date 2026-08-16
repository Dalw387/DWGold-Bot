import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { StudioAgent } from "@/components/agent/studio-agent";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyPayBar } from "@/components/landing/sticky-pay-bar";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  ),
  title: {
    default: "LocalLaunch — a customer-getting desk for local businesses",
    template: "%s | LocalLaunch",
  },
  description:
    "Pay £197 once. Get the words, the plan, and the desk to win more local customers. One extra job can cover it.",
  applicationName: "LocalLaunch",
  openGraph: {
    title: "LocalLaunch",
    description:
      "A £197 desk for local businesses. One extra job can cover it. The next customer is the return.",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${sourceSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-background pb-20 font-sans text-[#191919] md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:outline-2 focus:outline-offset-2 focus:outline-[#1e3a34]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="relative z-10 flex-1">
          {children}
        </main>
        <SiteFooter />
        <StickyPayBar />
        <StudioAgent />
      </body>
    </html>
  );
}
