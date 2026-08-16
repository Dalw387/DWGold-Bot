import { Container } from "@/components/container";

const features = [
  {
    title: "Studio assistant",
    body: "A browser agent that reads a sentence, fills the studio, and points you to the right tool. It does not call a paid AI API.",
  },
  {
    title: "Live sketch",
    body: "Type a business in one line on the homepage, or complete the form, and a draft appears before you press generate.",
  },
  {
    title: "Eight tools, one set of facts",
    body: "Facebook, Instagram, Google listings, WhatsApp, a seven-day plan, review requests, website copy, and notices.",
  },
  {
    title: "Eight Facebook styles",
    body: "Neighbourhood, offer, introduction, question, behind the scenes, reminder, explainer, and a short version.",
  },
  {
    title: "Edit, copy, download",
    body: "Each draft is editable. Copy one card, or download the whole pack as a text file.",
  },
  {
    title: "Honest by default",
    body: "The copy avoids fake reviews, awards, customer numbers, and guarantees you have not supplied.",
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
            Built to feel considered
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            The complimentary studio is meant to feel like a private room, not a
            loud dashboard. It is still an early demo, and it still refuses to
            invent a marketing story you did not provide.
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
