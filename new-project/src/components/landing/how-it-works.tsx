import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

const steps = [
  {
    number: "01",
    title: "Try it free",
    body: "Open a room, press Fill example, then generate. You get Facebook drafts, captions, emails, and more. Check every line before you post.",
  },
  {
    number: "02",
    title: "Run the house desk",
    body: "House Operations writes SEO, ads drafts, a public homepage, and a week of social starting points. Press “Run DW Gold Trading trial” to see it on a real business.",
  },
  {
    number: "03",
    title: "Publish, then prove",
    body: "You post the words. When someone actually enquires, log it on the proof page. Likes do not count. A quiet week with zero rows is still an honest week.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="bg-[#eceae4] py-16 sm:py-24"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4d5c57]">
            Method
          </p>
          <h2
            id="how-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl"
          >
            How it works
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            You stay in control. LocalLaunch drafts the words. You decide what
            is accurate enough to publish. The ledger only believes what you
            type.
          </p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="paper-card rounded-sm border border-stone-200 p-6"
            >
              <p className="font-display text-sm tracking-[0.2em] text-[#4d5c57]">
                {step.number}
              </p>
              <h3 className="mt-4 font-display text-2xl text-stone-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{step.body}</p>
            </li>
          ))}
        </ol>
        <ButtonLink href="/guide" className="mt-10">
          See the four-step guide
        </ButtonLink>
      </Container>
    </section>
  );
}
