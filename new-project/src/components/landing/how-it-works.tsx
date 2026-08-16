import { Container } from "@/components/container";

const steps = [
  {
    number: "1",
    title: "Enter a few business facts",
    body: "Add your name, type of business, area, and the product or service you already offer. Choose a tone.",
  },
  {
    number: "2",
    title: "Generate three local drafts",
    body: "The generator builds three different Facebook posts in your browser. The same details always return the same wording.",
  },
  {
    number: "3",
    title: "Copy, edit, and publish yourself",
    body: "Use the copy button, adjust anything that needs a human check, then paste the post into Facebook when you are ready.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="bg-slate-50 py-16 sm:py-20"
    >
      <Container>
        <div className="max-w-2xl">
          <h2
            id="how-heading"
            className="text-3xl font-semibold tracking-tight text-slate-900"
          >
            How it works
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            You stay in control. LocalLaunch AI drafts the words. You decide what
            is accurate enough to publish.
          </p>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                {step.number}
              </p>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
