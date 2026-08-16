import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { PayButton } from "@/components/pay-button";
import { housePriceLabel } from "@/lib/payments";

const complimentary = [
  "House concierge in the browser",
  "Live sketch as you type a sentence",
  "Thirteen rooms, including a full campaign pack",
  "Facebook, Instagram, Google listing, WhatsApp, email",
  "SEO brief, ads copy, review replies, website copy",
  "Seven-day plan, notices, copy and download",
  "No account required for the studio",
];

const house = [
  "SEO agent, Meta ads agent, Google Ads agent",
  "Social agent and a measurement plan",
  "Proof ledger for real enquiries only",
  "DW Gold Trading owner trial on this desk",
  "Pay in Stripe: Apple Pay, Google Pay, Link, card",
  "Money goes to the connected Stripe account",
  "Ad spend at Meta or Google stays separate",
];

export function Pricing() {
  const label = housePriceLabel();

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="bg-[#fffaf3] py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl"
          >
            Drafts free. Getting them noticed is House.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            The studio is still complimentary so a high-street business can leave
            with a week of words. House Operations is the paid desk: agents for
            SEO and ads, and a ledger so we can prove enquiries instead of
            promising them. The live amount is set in Stripe, not invented here.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="paper-card rounded-[2rem] border border-stone-200 p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c6a38]">
              Complimentary
            </p>
            <h3 className="font-display mt-3 text-4xl text-stone-900">Studio</h3>
            <p className="mt-2 text-4xl font-medium text-stone-900">£0</p>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              Use every drafting room. We are not metering this version.
            </p>
            <ul className="mt-8 grid gap-3 text-sm leading-6 sm:grid-cols-2">
              {complimentary.map((item) => (
                <li key={item} className="border-t border-stone-200 pt-3">
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/tools" className="mt-10">
              Start without paying
            </ButtonLink>
          </article>
          <article className="rounded-[2rem] border border-[rgba(176,137,79,0.45)] bg-[#12100e] p-8 text-[#f6f1e8] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d7c4a1]">
              Paid in Stripe
            </p>
            <h3 className="font-display mt-3 text-4xl">House Operations</h3>
            <p className="mt-2 text-2xl font-medium text-[#f6f1e8]">
              {label || "Amount set in Stripe Checkout"}
            </p>
            <p className="mt-3 text-sm text-[#e8dcc8]">
              Apple Pay, Google Pay, Link, and cards, when you have enabled them
              in Stripe and verified the domain. The premium is for the desk that
              tries to get the business more customers — and then writes those
              customers down.
            </p>
            <ul className="mt-8 grid gap-3 text-sm leading-6 sm:grid-cols-2">
              {house.map((item) => (
                <li key={item} className="border-t border-[rgba(176,137,79,0.2)] pt-3">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <PayButton tone="ink">Pay with Apple Pay or card</PayButton>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
