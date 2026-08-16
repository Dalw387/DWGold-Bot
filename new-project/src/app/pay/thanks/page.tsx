import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Payment received",
  description: "Stripe has taken the House Operations payment. Next: run the house agents and log real enquiries.",
};

export default function PayThanksPage() {
  return (
    <Container className="max-w-2xl py-16 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
        Stripe
      </p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-stone-900">
        Payment received
      </h1>
      <p className="mt-4 text-base leading-7 text-stone-600">
        Stripe has processed the checkout. This page does not invent a lead
        count or a ranking. Open House Operations, run the agents on the real
        business, then log every genuine enquiry in the proof ledger.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/operations" variant="gold">
          Open House Operations
        </ButtonLink>
        <ButtonLink href="/proof" variant="secondary">
          Open the proof ledger
        </ButtonLink>
      </div>
    </Container>
  );
}
