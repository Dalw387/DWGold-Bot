import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { StudioAgent } from "@/components/agent/studio-agent";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyPayBar } from "@/components/landing/sticky-pay-bar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    "Pay £197 once. Named desks that write the work to find customers, advertise, reply, book, and ask for reviews. You send it. One extra job can cover it.",
  applicationName: "LocalLaunch",
  openGraph: {
    title: "LocalLaunch",
    description:
      "A £197 desk for local businesses. You run the business. The desk writes the next customer-getting job.",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-background pb-20 font-sans text-foreground md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:outline-2 focus:outline-offset-2 focus:outline-accent"
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
