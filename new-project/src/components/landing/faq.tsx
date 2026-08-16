import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { AGENT_COUNT_WORDS, ROOM_COUNT_WORDS } from "@/lib/counts";

const items = [
  {
    q: "What am I actually buying?",
    a: `${HOUSE_PRICE_SHORT} once, paid on Stripe. That unlocks ${ROOM_COUNT_WORDS} drafting rooms, ${AGENT_COUNT_WORDS} named desks, the concierge, a 14-day customer-getting plan, enquiry replies, after-the-job notes, a quiet-week fill, and the proof ledger. It is not Facebook or Google ad spend. It is not a promise of a full diary. It is the desk that helps you get more local customers.`,
  },
  {
    q: "Will this get me more customers?",
    a: "That is the aim. The work is: a public page strangers can read, posts and ads drafts, the first reply that can win the job, referrals, follow-ups, print and phone, a fortnight of actions, and a ledger of real enquiries. You still publish. One extra job can cover the £197. The next one is the return. We will not invent that job.",
  },
  {
    q: "Are these AI employees that work while I sleep?",
    a: "No. They are named desks so a business owner understands the job in seconds — Alex for leads, Charlie for appointments, Sophie for social, Max and Mia for ads, Grace for reviews and missed calls, Scout for search. They write drafts in this browser. They do not scrape prospects, answer the live phone, post to Instagram, or log into Ads Manager.",
  },
  {
    q: "Do I get in straight after I pay?",
    a: "Yes. Pay on Stripe. Stripe should send you back to this site. This browser then opens the studio. Use the same phone or computer you paid on. There is no separate login yet.",
  },
  {
    q: "Will Max run my Google Ads for me?",
    a: "Max and Mia draft the ads and the campaign structure. They do not log into Ads Manager, spend money, or invent results. Live ads need your Meta or Google account, and that spend is paid to those platforms.",
  },
  {
    q: "Will you get me mentioned in ChatGPT?",
    a: "Not in this product. Scout writes a public homepage and a Google Business checklist so people in your town can find you. Appearing inside ChatGPT, Gemini, or Google AI Overviews is a later product. We will not sell that as if it is included today.",
  },
  {
    q: "Why collect my email?",
    a: "So we can tell you about LocalLaunch and later products, and so Stripe can open with your address already filled. We do not sell the list. You can ask to be removed.",
  },
  {
    q: "Is this an AI receptionist?",
    a: "No. Grace writes the missed-call text, the closed voicemail, and the morning callback. You send them from your own phone. We do not answer live calls, book a diary from a voice bot, or replace a receptionist. Firms that do that often charge thousands up front and a monthly fee. This desk is the words, for £197 once.",
  },
  {
    q: "Will you send the Google review texts for me?",
    a: "No. Grace writes the SMS and email, and shows you how to copy your Google review link. You paste the link and send it to people you actually helped. Tools such as Birdeye or Podium will send the texts for you, usually for hundreds of pounds a month. We do not log into Google.",
  },
  {
    q: "Is this a live AI model?",
    a: "The concierge and the drafts run from templates in your browser, so the desk can stay a one-off price. Same facts in, same words out. That is how we give you a lot for £197 instead of a monthly software bill.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-background py-16 sm:py-24">
      <Container>
        <h2
          id="faq-heading"
          className="font-display text-4xl font-medium tracking-tight text-ice sm:text-5xl"
        >
          Straight answers before you pay
        </h2>
        <dl className="mt-10 divide-y divide-border border-y border-border">
          {items.map((item) => (
            <div key={item.q} className="grid gap-3 py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
              <dt className="font-display text-xl text-ice">{item.q}</dt>
              <dd className="text-sm leading-7 text-slate">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
