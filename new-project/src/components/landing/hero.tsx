import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

const floatingCards = [
  {
    title: "Neighbourhood update",
    body: "Hello from Harbour & Hearth in Falmouth. We wanted neighbours to know about weekend brunch plates and filter coffee.",
    rotate: "-rotate-2",
  },
  {
    title: "Community question",
    body: "When you think about brunch in Falmouth, what do you wish a local cafe would explain first?",
    rotate: "rotate-1",
  },
  {
    title: "Seven-day plan",
    body: "Monday to Sunday starting points, generated from the same details, ready to edit.",
    rotate: "-rotate-1",
  },
];

export function Hero() {
  return (
    <section className="mesh border-b border-stone-200">
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <p className="inline-flex rounded-full border border-indigo-100 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-800">
            Eight free tools · no account
          </p>
          <h1 className="font-display mt-6 max-w-xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            Marketing words for small businesses, with the facts you already have
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            LocalLaunch AI drafts Facebook posts, Instagram captions, listing
            updates, and a week of starting points. This demo is free, runs in
            your browser, and uses templates rather than a paid AI model.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/tools/facebook-post-generator">
              Open Facebook Post Studio
            </ButtonLink>
            <ButtonLink href="/tools" variant="secondary">
              Browse every tool
            </ButtonLink>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-6 text-stone-500">
            Despite the name, this version does not call an AI service. The same
            details always produce the same drafts, so you can edit them before
            anyone else sees them.
          </p>
        </div>
        <div className="relative hidden min-h-[22rem] lg:block" aria-hidden="true">
          {floatingCards.map((card, index) => (
            <article
              key={card.title}
              className={`paper-card absolute w-[85%] rounded-2xl border border-stone-200 p-5 ${card.rotate} ${
                index === 0
                  ? "top-0 left-0"
                  : index === 1
                    ? "top-24 right-0"
                    : "bottom-0 left-8"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                Example preview
              </p>
              <h2 className="mt-2 font-display text-lg text-stone-900">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">{card.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
