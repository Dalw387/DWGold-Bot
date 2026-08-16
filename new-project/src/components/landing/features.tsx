import { Container } from "@/components/container";

const features = [
  {
    title: "Made for local businesses",
    body: "Shops, cafes, trades, clinics, and independent services can turn everyday details into post drafts.",
  },
  {
    title: "Three drafts, not one",
    body: "Each run produces a neighbourhood note, an offer update, and a helpful introduction so you can choose a fit.",
  },
  {
    title: "No account required",
    body: "Nothing is saved to a database in this demo. If you refresh the page, the form starts again.",
  },
  {
    title: "Works without paid AI",
    body: "Despite the product name, this version does not call an AI API. Templates keep it free and predictable.",
  },
  {
    title: "Edit before you publish",
    body: "Copy a draft, change the wording, and check facts such as prices, times, and availability.",
  },
  {
    title: "Honest by default",
    body: "The copy avoids fake reviews, awards, customer numbers, and guarantees you have not supplied.",
  },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="bg-white py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2
            id="features-heading"
            className="text-3xl font-semibold tracking-tight text-slate-900"
          >
            What this free version does
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The first release is deliberately small. It is a working Facebook Post
            Generator with a public homepage, not a full marketing suite.
          </p>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
