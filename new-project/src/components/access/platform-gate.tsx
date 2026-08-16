"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { ButtonLink } from "@/components/button";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import {
  getAccessSnapshot,
  getServerAccessSnapshot,
  hydrateAccessStore,
  subscribeAccess,
} from "@/lib/access-storage";
import { stripePaymentLink } from "@/lib/payments";

export function PlatformGate({ children }: { children: ReactNode }) {
  const access = useSyncExternalStore(
    subscribeAccess,
    getAccessSnapshot,
    getServerAccessSnapshot,
  );
  useEffect(() => {
    hydrateAccessStore();
  }, []);

  if (!access.hydrated) {
    return (
      <Container className="py-16">
        <p className="text-sm text-stone-600">Opening the desk.</p>
      </Container>
    );
  }

  if (access.unlocked) return children;

  const link = stripePaymentLink();

  return (
    <div className="ink-hero border-b border-[rgba(176,137,79,0.25)]">
      <Container className="max-w-2xl py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d7c4a1]">
          Members’ desk
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium tracking-tight text-[#f6f1e8] sm:text-5xl">
          Pay {HOUSE_PRICE_SHORT} to come inside
        </h1>
        <p className="mt-5 text-base leading-7 text-[#e8dcc8]">
          The studio, the house agents, the concierge, and the proof ledger open
          after Stripe takes payment. Read what we actually do first. If you are
          happy, pay on Stripe. This browser then unlocks the platform.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          {link ? (
            <StripePayLink>Continue to Stripe · {HOUSE_PRICE_SHORT}</StripePayLink>
          ) : null}
          <ButtonLink href="/#help" variant="secondary" className="text-[#f6f1e8]">
            Read how we help first
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
