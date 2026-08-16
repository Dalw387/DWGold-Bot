import { Container } from "@/components/container";

const steps = [
  {
    number: "1",
    title: "Enter a few business facts",
    body: "Name, type, area, and what you already offer. Fill the example if you only want to see how a tool behaves.",
  },
  {
    number: "2",
    title: "Choose a tool and a style",
    body: "Facebook Post Studio can build a pack of styles. Other tools turn the same facts into captions, notices, or a week of prompts.",
  },
  {
    number: "3",
    title: "Copy, edit, and publish yourself",
    body: "Check names, prices, and times. Then paste into Facebook, Instagram, Google, WhatsApp, or your website.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="bg-stone-100/70 py-16 sm:py-20"
    >
      <Container>
        <div className="max-w-2xl">
          <h2
            id="how-heading"
            className="font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
          >
            How it works
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            You stay in control. LocalLaunch AI drafts the words. You decide what
            is accurate enough to publish.
          </p>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="paper-card rounded-2xl border border-stone-200 p-6"
            >
              <p className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-700 text-sm font-semibold text-white">
                {step.number}
              </p>
              <h3 className="mt-4 font-display text-xl text-stone-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
