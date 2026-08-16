import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/container";
import { OperationsDesk } from "@/components/operations/operations-desk";
import { PayButton } from "@/components/pay-button";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

export const metadata: Metadata = {
  title: "House Operations",
  description:
    "SEO, Facebook ads drafts, Google Ads drafts, a week of social starting points, and a proof plan. They draft work. They do not invent results.",
};

export default function OperationsPage() {
  return (
    <div className="mesh border-b border-stone-200">
      <Container className="py-14 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
          House Operations
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">
          SEO, ads drafts, and a proof ledger
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
          Five agents write in this browser tab: a public homepage, local SEO,
          Facebook/Instagram ads, Google Ads (not AdSense), a week of social
          starting points, and what to log as proof. They do not spend your ad
          budget. The studio is free. This desk is {HOUSE_PRICE_SHORT} one-off
          on Stripe if you want it as a paid product.
        </p>
        <div className="mt-8 max-w-md">
          <PayButton>{`Pay ${HOUSE_PRICE_SHORT} with Apple Pay or card`}</PayButton>
        </div>
        <div className="mt-12">
          <Suspense fallback={<p className="text-sm text-stone-600">Opening the desk.</p>}>
            <OperationsDesk />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
