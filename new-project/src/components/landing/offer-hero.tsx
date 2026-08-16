import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { OFFER_TAGLINE } from "@/lib/offer";

export function OfferHero() {
  return (
    <section className="ink-hero border-b border-[rgba(176,137,79,0.25)]">
      <Container className="max-w-3xl py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d7c4a1]">
          LocalLaunch AI · {HOUSE_PRICE_SHORT} one-off
        </p>
        <h1 className="font-display mt-6 text-4xl font-medium tracking-tight text-[#f6f1e8] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
          Get more local customers for {HOUSE_PRICE_SHORT}. Not a monthly retainer.
        </h1>
        <p className="mt-6 text-lg leading-8 text-[#e8dcc8]">
          This desk writes the words that get you found, asked, followed up, and
          counted: posts, ads drafts, a public page, referrals, phone scripts, a
          14-day plan, and a ledger of real enquiries. Read the offer. If you
          are happy, pay once on Stripe. The platform unlocks in this browser.
        </p>
        <p className="mt-4 text-sm leading-6 text-[#d7c4a1]">{OFFER_TAGLINE}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#help" variant="gold">
            How we help you get customers
          </ButtonLink>
          <StripePayLink variant="secondary" className="text-[#f6f1e8]">
            I have read it · pay {HOUSE_PRICE_SHORT}
          </StripePayLink>
        </div>
      </Container>
    </section>
  );
}
