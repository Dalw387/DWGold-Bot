import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

export function FinalCta() {
  return (
    <section className="ink-hero py-20 sm:py-24">
      <Container className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d7c4a1]">
          Ready when you are
        </p>
        <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-[#f6f1e8] sm:text-5xl">
          Try it free. Pay {HOUSE_PRICE_SHORT} only if you want the desk.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#e8dcc8]">
          Four steps: try a draft, run the house agents, pay on Stripe if you
          want House Operations, then log real enquiries. You stay the person
          who publishes. We do not invent customers.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/guide" variant="gold">
            Start in four steps
          </ButtonLink>
          <ButtonLink href="/pay" variant="secondary" className="text-[#f6f1e8]">
            Pay {HOUSE_PRICE_SHORT} on Stripe
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
