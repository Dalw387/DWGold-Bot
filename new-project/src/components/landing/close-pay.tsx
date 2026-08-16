import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { includedAfterPay } from "@/lib/offer";
import { housePriceLabel } from "@/lib/payments";

export function ClosePay() {
  const label = housePriceLabel();

  return (
    <section id="pay" aria-labelledby="pay-heading" className="ink-hero py-16 sm:py-24">
      <Container className="max-w-3xl">
        <p className="kicker !text-[#a8a59e]">If you are happy</p>
        <h2
          id="pay-heading"
          className="font-display mt-4 text-3xl font-medium tracking-tight text-paper sm:text-5xl"
        >
          Pay {HOUSE_PRICE_SHORT} on Stripe. Then come inside and start getting customers.
        </h2>
        <p className="mt-5 text-base leading-7 text-[#cfcbc3]">
          Apple Pay, Google Pay, Link, or a card. You leave this page and pay on
          Stripe. The money goes to the LocalLaunch Stripe account. We never see
          your card number. After payment, Stripe should send you back. This
          browser then unlocks the platform.
        </p>
        <p className="mt-4 text-lg text-paper">{label}</p>
        <ul className="mt-8 space-y-3 text-sm leading-7 text-[#cfcbc3]">
          {includedAfterPay.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <StripePayLink>Continue to Stripe · {HOUSE_PRICE_SHORT}</StripePayLink>
          <ButtonLink href="/pay" variant="inverse">
            Full checkout page
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
