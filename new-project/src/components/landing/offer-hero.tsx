import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { ProductStage } from "@/components/landing/product-stage";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { tradesWeFit } from "@/lib/desk-team";

export function OfferHero() {
  return (
    <section className="border-b border-border">
      <Container className="py-16 sm:py-24 lg:py-28">
        <p className="kicker">{HOUSE_PRICE_SHORT} once · not a monthly retainer</p>
        <div className="mt-6 grid items-end gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <h1 className="font-display text-[2.35rem] font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.65rem] lg:leading-[1.06]">
              You run the business. The desk writes the next customer.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Named desks for leads, advertising, social, appointments, reviews
              and search. They write in this browser. You send the work. One
              extra job covers the {HOUSE_PRICE_SHORT}.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#team" variant="primary">
                Meet the desks
              </ButtonLink>
              <ButtonLink href="#start" variant="secondary">
                The two jobs that pay first
              </ButtonLink>
            </div>
            <p className="mt-8 max-w-lg text-sm leading-6 text-muted">
              Not an AI that finds leads while you sleep. Not a robot on your
              phone. Not ad spend. The product worth the money is the full
              customer-getting pack — written, ready to send, yours to keep.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <StripePayLink variant="ghost">
                Pay {HOUSE_PRICE_SHORT} on Stripe
              </StripePayLink>
              <ButtonLink href="/sample" variant="ghost">
                Read a real sample
              </ButtonLink>
            </div>
          </div>
          <ProductStage />
        </div>
        <ul className="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-8 text-sm text-muted">
          {tradesWeFit.map((trade) => (
            <li key={trade}>{trade}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
