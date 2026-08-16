import { Container } from "@/components/container";

const you = [
  "Approve the work",
  "Publish when ready",
  "Send messages",
  "Control ad spend",
  "Own the customer relationship",
];

const house = [
  "Writes the first response",
  "Builds follow-up",
  "Drafts ads",
  "Creates social content",
  "Prepares review requests",
  "Plans local search actions",
];

export function HonestSplit() {
  return (
    <section id="split" aria-labelledby="split-heading" className="py-24 sm:py-28">
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Who does what
        </p>
        <h2 id="split-heading" className="font-display display-2 mt-6 max-w-3xl text-ice">
          You stay in control.
          The team does the groundwork.
        </h2>
        <p className="prose-narrow mt-5 text-base leading-7 text-slate">
          The story is an AI workforce. What you can buy today is the writing
          house. Nothing is published or spent without you.
        </p>
        <div className="mt-12 grid overflow-hidden rounded-[1.6rem] lg:grid-cols-[1fr_auto_1fr]">
          <article className="glass p-7 sm:p-9">
            <p className="label">You</p>
            <ul className="mt-6 space-y-4">
              {you.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-ice">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <div className="flex items-center justify-center bg-void px-4 py-6 lg:flex-col lg:px-6">
            <p className="text-center text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan">
              You decide
            </p>
            <span className="mx-4 hidden h-px w-10 bg-magenta/50 lg:mx-0 lg:my-4 lg:block lg:h-16 lg:w-px" />
            <p className="text-center text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-magenta">
              LocalLaunch prepares
            </p>
          </div>
          <article className="glass p-7 sm:p-9">
            <p className="label text-magenta">LocalLaunch</p>
            <ul className="mt-6 space-y-4">
              {house.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-ice">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-magenta" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Container>
    </section>
  );
}
