import { Container } from "@/components/container";

const items = [
  {
    q: "Is this a real AI model?",
    a: "The concierge and the drafts run from templates in your browser so the studio can stay free. Same facts in, same words out. A connected model can be added later without changing how you enter a name, town, and offer.",
  },
  {
    q: "Do I need to pay?",
    a: "No. The thirteen rooms, the concierge, copy and download are £0. House Operations is £197 once, paid on Stripe with Apple Pay, Google Pay, Link, or a card. That is for the desk and the ledger, not for Facebook or Google ad spend.",
  },
  {
    q: "Will the agents actually run my Facebook ads?",
    a: "They draft the ads and the campaign structure. They do not log into Ads Manager, spend money, or invent results. Live ads need your Meta or Google account, and that spend is paid to those platforms.",
  },
  {
    q: "Is Google AdSense part of this?",
    a: "AdSense shows other people’s ads on your site. It is not how you advertise a local business. House Operations drafts Google Ads (search) and Facebook/Instagram ads. AdSense will not fill your diary.",
  },
  {
    q: "How do you prove it?",
    a: "The proof ledger. Log each real enquiry, call, visit, or sale. Zero is allowed. We will not publish fake customer numbers. The DW Gold Trading trial uses the same rule: owner test, not a case study with invented leads.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-[#fffaf3] py-16 sm:py-24">
      <Container>
        <h2
          id="faq-heading"
          className="font-display text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl"
        >
          A few quiet answers
        </h2>
        <dl className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
          {items.map((item) => (
            <div key={item.q} className="grid gap-3 py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
              <dt className="font-display text-xl text-stone-900">{item.q}</dt>
              <dd className="text-sm leading-7 text-stone-600">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
