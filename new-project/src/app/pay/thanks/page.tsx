import type { Metadata } from "next";
import { Suspense } from "react";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { HouseReturnMarker } from "@/components/pay/house-return-marker";

export const metadata: Metadata = {
  title: "Payment received",
  description:
    "Returned from Stripe. Next: run the house agents and log real enquiries. This page does not invent results.",
};

export default function PayThanksPage() {
  return (
    <Container className="max-w-2xl py-16 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
        Stripe
      </p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-stone-900">
        Back from checkout
      </h1>
      <p className="mt-4 text-base leading-7 text-stone-600">
        If Stripe took the payment, start the desk on the real business. This
        page does not invent a lead count or a ranking.
      </p>
      <Suspense>
        <HouseReturnMarker />
      </Suspense>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/operations?trial=gold&run=1" variant="gold">
          Run the DW Gold Trading trial
        </ButtonLink>
        <ButtonLink href="/operations" variant="secondary">
          Open House Operations
        </ButtonLink>
        <ButtonLink href="/proof" variant="secondary">
          Open the proof ledger
        </ButtonLink>
      </div>
    </Container>
  );
}
