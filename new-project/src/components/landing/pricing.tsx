import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { PayButton } from "@/components/pay-button";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

const complimentary = [
  "Concierge in the browser",
  "Type a sentence, watch a draft appear",
  "Thirteen rooms, including a full campaign pack",
  "Facebook, Instagram, Google listing, WhatsApp, email",
  "SEO, ads copy, review replies, public homepage copy",
  "Seven-day plan, notices, copy and download",
  "No account needed",
];

const house = [
  "SEO, Meta ads, and Google Ads drafts",
  "A public homepage so ads are not sent to a login wall",
  "A week of social starting points",
  "Proof ledger for real enquiries only",
  "DW Gold Trading owner trial included to test the desk",
  `Pay ${HOUSE_PRICE_SHORT} in Stripe: Apple Pay, Google Pay, Link, or card`,
  "Facebook/Google ad spend is separate",
];

export function Pricing() {
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
            Free to try. {HOUSE_PRICE_SHORT} for the house desk.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            Use the studio at £0. Pay {HOUSE_PRICE_SHORT} once if you want House
            Operations: the agents, the public-page draft, and the ledger. That
            is not a promise of new customers. It is the desk that writes the
            work, then asks you to write down who actually got in touch.
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
              Every drafting room. No card. No account.
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
            <p className="mt-2 text-4xl font-medium text-[#f6f1e8]">{HOUSE_PRICE_SHORT}</p>
            <p className="mt-1 text-sm text-[#d7c4a1]">One-off</p>
            <p className="mt-3 text-sm text-[#e8dcc8]">
              Apple Pay, Google Pay, Link, or card. You pay on Stripe. We do not
              store card numbers here.
            </p>
            <ul className="mt-8 grid gap-3 text-sm leading-6 sm:grid-cols-2">
              {house.map((item) => (
                <li key={item} className="border-t border-[rgba(176,137,79,0.2)] pt-3">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <PayButton tone="ink">{`Pay ${HOUSE_PRICE_SHORT} with Apple Pay or card`}</PayButton>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
