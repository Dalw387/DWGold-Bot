import { Container } from "@/components/container";

const features = [
  {
    title: "Eight tools, one set of facts",
    body: "Facebook, Instagram, Google listings, WhatsApp, a seven-day plan, review requests, website copy, and notices.",
  },
  {
    title: "Extra Facebook styles",
    body: "Neighbourhood, offer, introduction, question, behind the scenes, reminder, explainer, and a short version.",
  },
  {
    title: "Details stay in this tab",
    body: "Your form is remembered in session storage so you can move between tools. Nothing is sent to a database.",
  },
  {
    title: "Works without paid AI",
    body: "Despite the product name, this version does not call an AI API. Templates keep it free and predictable.",
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
    <section id="features" aria-labelledby="features-heading" className="bg-[#fffcf7] py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2
            id="features-heading"
            className="font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
          >
            What this free version does
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            It is still an early demo. It is now a small toolkit rather than a
            single generator, and it still refuses to invent a marketing story
            you did not provide.
          </p>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="paper-card rounded-2xl border border-stone-200 p-6"
            >
              <h3 className="font-display text-xl text-stone-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{feature.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
