import type { Metadata } from "next";
import { Suspense } from "react";
import { PlatformGate } from "@/components/access/platform-gate";
import { Container } from "@/components/container";
import { OperationsDesk } from "@/components/operations/operations-desk";

export const metadata: Metadata = {
  title: "House Operations",
  description:
    "SEO, Facebook ads drafts, Google Ads drafts, a week of social starting points, and a proof plan. They draft work. They do not invent results.",
};

export default function OperationsPage() {
  return (
    <PlatformGate>
      <div className="mesh border-b border-stone-200">
        <Container className="py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4d5c57]">
            House Operations
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">
            SEO, ads drafts, reviews, replies, and a 14-day customer plan
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
            Eight agents write in this browser tab: a public homepage, local SEO,
            Facebook/Instagram ads, Google Ads (not AdSense), a week of social
            starting points, a 14-day customer-getting plan, first replies,
            Google review and missed-call packs, and what to log as proof. They
            do not spend your ad budget. Type the business, or run a trial, then
            press Run all house agents. Start with the Reviews agent if you want
            the two jobs that pay first.
          </p>
          <div className="mt-12">
            <Suspense fallback={<p className="text-sm text-stone-600">Opening the desk.</p>}>
              <OperationsDesk />
            </Suspense>
          </div>
        </Container>
      </div>
    </PlatformGate>
  );
}
