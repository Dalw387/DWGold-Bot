import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { BrandMark } from "@/components/logo";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

export function OfferHero() {
  return (
    <section className="border-b border-[#d8d4cc]">
      <Container className="max-w-3xl py-20 sm:py-28">
        <BrandMark className="h-10 w-10" />
        <p className="kicker mt-10">LocalLaunch · {HOUSE_PRICE_SHORT} once</p>
        <h1 className="font-display mt-5 text-4xl font-medium tracking-tight text-[#191919] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.12]">
          One extra job covers the {HOUSE_PRICE_SHORT}. The next customer is money in the till.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3a3936]">
          A desk that writes the words a local business needs to get found,
          asked, followed up, and paid. Read it. If it is a fit, pay once on
          Stripe. This browser then opens the platform.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#value" variant="primary">
            See why it is worth {HOUSE_PRICE_SHORT}
          </ButtonLink>
          <ButtonLink href="#start" variant="secondary">
            The two jobs that pay first
          </ButtonLink>
        </div>
        <p className="mt-8 max-w-xl text-sm leading-6 text-[#5f5c56]">
          Not a monthly retainer. Not ad spend. Not a promise of a full diary.
          If one extra job, visit, or booking comes from this desk, the{" "}
          {HOUSE_PRICE_SHORT} is already behind you.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <StripePayLink variant="ghost">Pay {HOUSE_PRICE_SHORT} on Stripe</StripePayLink>
          <ButtonLink href="/sample" variant="ghost">
            Look at a real sample
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
