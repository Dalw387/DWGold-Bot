import { Container } from "@/components/container";

const features = [
  {
    title: "House concierge",
    body: "A browser agent that reads a sentence, fills the studio, and can send you to SEO, ads, operations, or Stripe checkout.",
  },
  {
    title: "House Operations",
    body: "Five agents in a queue: local SEO, Meta ads, Google Ads, social, and a measurement plan. They draft. They do not spend.",
  },
  {
    title: "Proof ledger",
    body: "Log real enquiries, calls, visits, and sales. Zero is an honest week. We will not invent a customer count.",
  },
  {
    title: "Twenty-two drafting rooms",
    body: "Facebook, Instagram, listings, WhatsApp, email, website, notices, reviews, SEO, ads copy, and a full campaign pack.",
  },
  {
    title: "Pay £197 on Stripe",
    body: "Apple Pay, Google Pay, Link, or card. You leave this site and pay on Stripe. We never see your card number. Facebook and Google ad spend is extra.",
  },
  {
    title: "Owner trial",
    body: "DW Gold Trading can be loaded as an owner test: education in Alfreton, no profit promises, no fake leads.",
  },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="bg-[#fffaf3] py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
            Included
          </p>
          <h2
            id="features-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl"
          >
            Built to do the work, not the slogans
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            The complimentary studio is meant to feel like a private room. House
            Operations is the paid floor above it: still early, still unwilling
            to invent a marketing story you did not provide.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="paper-card rounded-3xl border border-stone-200 p-6"
            >
              <h3 className="font-display text-2xl text-stone-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{feature.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
