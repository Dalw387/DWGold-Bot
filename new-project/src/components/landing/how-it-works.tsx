import { Container } from "@/components/container";

const steps = [
  {
    number: "01",
    title: "Speak or fill",
    body: "Tell the concierge a sentence, type in the live studio, or load the DW Gold Trading trial. Name, type, town, and offer are enough.",
  },
  {
    number: "02",
    title: "Let the house work",
    body: "Run the studio rooms, or queue the SEO and ads agents. Nothing is sent to a paid model. Live ads still need your ads account.",
  },
  {
    number: "03",
    title: "Publish, then prove",
    body: "Edit and post. Log every real enquiry in the ledger. That is how we show the work is getting people through the door.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="bg-[#efe8db] py-16 sm:py-24"
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
            You stay in control. LocalLaunch AI drafts the words and the ads.
            You decide what is accurate enough to publish. The ledger only
            believes what you type.
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
