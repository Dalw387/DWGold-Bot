import type { Metadata } from "next";
import { Suspense } from "react";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { HouseReturnMarker } from "@/components/pay/house-return-marker";

export const metadata: Metadata = {
  title: "You are in",
  description:
    "Returned from Stripe. The LocalLaunch platform is unlocked in this browser. Run the house agents and log only real enquiries.",
};

export default function PayThanksPage() {
  return (
    <Container className="max-w-2xl py-16 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
        Payment
      </p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-stone-900">
        You are inside. Start the desk.
      </h1>
      <p className="mt-4 text-base leading-7 text-stone-600">
        If Stripe took the £197, this browser now opens the platform. Type your
        business, or run the owner trial, then publish only what is true. This
        page does not invent a lead count.
      </p>
      <Suspense>
        <HouseReturnMarker />
      </Suspense>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/operations" variant="gold">
          Open House Operations
        </ButtonLink>
        <ButtonLink href="/tools" variant="secondary">
          Open the studio
        </ButtonLink>
        <ButtonLink href="/proof" variant="secondary">
          Open the proof ledger
        </ButtonLink>
      </div>
    </Container>
  );
}
