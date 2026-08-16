import { ButtonAnchor, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { OFFER_TAGLINE } from "@/lib/offer";
import { stripePaymentLink } from "@/lib/payments";

export function OfferHero() {
  const link = stripePaymentLink();

  return (
    <section className="ink-hero border-b border-[rgba(176,137,79,0.25)]">
      <Container className="max-w-3xl py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d7c4a1]">
          LocalLaunch AI · {HOUSE_PRICE_SHORT} one-off
        </p>
        <h1 className="font-display mt-6 text-4xl font-medium tracking-tight text-[#f6f1e8] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
          This is how we help your business get found, asked, and counted.
        </h1>
        <p className="mt-6 text-lg leading-8 text-[#e8dcc8]">
          Read the offer in full. If you are happy, pay {HOUSE_PRICE_SHORT} on
          Stripe. That payment unlocks the platform in this browser: thirteen
          drafting rooms, five house agents, a concierge, and a proof ledger.
          You still publish. We still refuse to invent customers.
        </p>
        <p className="mt-4 text-sm leading-6 text-[#d7c4a1]">{OFFER_TAGLINE}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#help" variant="gold">
            How we help your business
          </ButtonLink>
          {link ? (
            <ButtonAnchor href={link} variant="secondary" className="text-[#f6f1e8]" rel="noreferrer">
              I have read it · pay {HOUSE_PRICE_SHORT}
            </ButtonAnchor>
          ) : (
            <ButtonLink href="/pay" variant="secondary" className="text-[#f6f1e8]">
              Pay {HOUSE_PRICE_SHORT}
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  );
}
