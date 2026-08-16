import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

export function FinalCta() {
  return (
    <section className="ink-hero py-20 sm:py-24">
      <Container className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d7c4a1]">
          Ready when you are
        </p>
        <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-[#f6f1e8] sm:text-5xl">
          Open the desk. Keep the proof honest.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#e8dcc8]">
          Use the free studio, or pay in Stripe for House Operations. Apple Pay
          and the other wallets appear on Stripe’s checkout once they are
          switched on. You stay the publisher.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/operations" variant="gold">
            Enter House Operations
          </ButtonLink>
          <ButtonLink href="/pay" variant="secondary" className="text-[#f6f1e8]">
            Pay with Stripe
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
