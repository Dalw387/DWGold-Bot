import { Container } from "@/components/container";

const steps = [
  {
    number: "01",
    title: "Speak or fill",
    body: "Tell the assistant a sentence, type in the live studio, or use Fill example. Name, type, town, and offer are enough.",
  },
  {
    number: "02",
    title: "Watch the sketch",
    body: "Drafts appear as the details land. Choose styles, length, and tone. Nothing is sent to a paid model.",
  },
  {
    number: "03",
    title: "Edit, then publish",
    body: "Copy or download. Check names, prices, and times. You remain the person who posts.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="bg-[#f3eee4] py-16 sm:py-24"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
            Method
          </p>
          <h2
            id="how-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl"
          >
            How it works
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            You stay in control. LocalLaunch AI drafts the words. You decide what
            is accurate enough to publish.
          </p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="paper-card rounded-3xl border border-stone-200 p-6"
            >
              <p className="font-display text-sm tracking-[0.2em] text-[#8c6a38]">
                {step.number}
              </p>
              <h3 className="mt-4 font-display text-2xl text-stone-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
