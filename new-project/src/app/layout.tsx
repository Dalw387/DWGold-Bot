import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { StudioAgent } from "@/components/agent/studio-agent";
import { GoldCursor } from "@/components/luxury/gold-cursor";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  ),
  title: {
    default: "LocalLaunch AI — house marketing studio for small businesses",
    template: "%s | LocalLaunch AI",
  },
  description:
    "Free drafting studio for local businesses, plus House Operations for £197: SEO, ads copy, social drafts, and a proof ledger. Pay on Stripe with Apple Pay, Google Pay, Link, or card.",
  applicationName: "LocalLaunch AI",
  openGraph: {
    title: "LocalLaunch AI",
    description:
      "Free marketing drafts for local businesses. House Operations is £197 one-off on Stripe. Proof is a ledger of real enquiries, not a slogan.",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${plusJakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-background font-sans text-stone-900">
        <GoldCursor />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow focus:outline-2 focus:outline-offset-2 focus:outline-[#b0894f]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="relative z-10 flex-1">
          {children}
        </main>
        <SiteFooter />
        <StudioAgent />
      </body>
    </html>
  );
}
