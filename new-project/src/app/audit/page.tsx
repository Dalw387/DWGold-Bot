import { Suspense } from "react";
import { OfferJsonLd } from "@/components/pay/offer-json-ld";
import { SignalTracker } from "@/components/nano/signal-tracker";
import { AuditClient } from "@/components/nano/audit-client";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

export const metadata = {
  title: "AI marketing score",
  description: `Honest eight-question audit. Share a branded score. Included with LocalLaunch for ${HOUSE_PRICE_SHORT}.`,
};

export default function AuditPage() {
  return (
    <>
      <OfferJsonLd />
      <SignalTracker kind="audit" />
      <Suspense fallback={<p className="px-5 py-24 text-slate">Loading the score…</p>}>
        <AuditClient />
      </Suspense>
    </>
  );
}
