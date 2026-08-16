import { Container } from "@/components/container";

const items = [
  {
    q: "What am I actually buying?",
    a: "£197 once, paid on Stripe. That unlocks the LocalLaunch platform in this browser: thirteen drafting rooms, five house agents, the concierge, and the proof ledger. It is not Facebook or Google ad spend. It is not a promise of new customers.",
  },
  {
    q: "Do I get in straight after I pay?",
    a: "Yes. Pay on Stripe. Stripe should send you back to this site. This browser then opens the studio. Use the same phone or computer you paid on. There is no separate login yet.",
  },
  {
    q: "Will the agents run my Facebook ads for me?",
    a: "They draft the ads and the campaign structure. They do not log into Ads Manager, spend money, or invent results. Live ads need your Meta or Google account, and that spend is paid to those platforms.",
  },
  {
    q: "Is Google AdSense part of this?",
    a: "No. AdSense shows other people’s ads on your site. It will not fill your diary. House Operations drafts Google Ads (search) and Facebook/Instagram ads.",
  },
  {
    q: "Is this a live AI model?",
    a: "The concierge and the drafts run from templates in your browser, so the desk can stay a one-off price. Same facts in, same words out. A connected model can be added later without changing how you enter a name, town, and offer.",
  },
  {
    q: "How do you prove it helps the business?",
    a: "The proof ledger. Log each real enquiry, call, visit, or sale. Zero is allowed. We will not publish fake customer numbers.",
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
          Straight answers before you pay
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
