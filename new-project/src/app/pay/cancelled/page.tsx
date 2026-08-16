import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Checkout cancelled",
  description: "The Stripe checkout was cancelled. No payment was taken.",
};

export default function PayCancelledPage() {
  return (
    <Container className="max-w-2xl py-16 sm:py-24">
      <h1 className="font-display text-4xl font-medium tracking-tight text-stone-900">
        Checkout cancelled
      </h1>
      <p className="mt-4 text-base leading-7 text-stone-600">
        No payment was taken. The platform stays locked until Stripe takes the
        £197. You can read the offer again, then pay when you are ready.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/pay" variant="gold">
          Return to pay
        </ButtonLink>
        <ButtonLink href="/#help" variant="secondary">
          Read how we help
        </ButtonLink>
      </div>
    </Container>
  );
}
