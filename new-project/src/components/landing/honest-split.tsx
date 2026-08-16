import { Container } from "@/components/container";
import { weDo, weNever, youDo } from "@/lib/offer";

export function HonestSplit() {
  return (
    <section id="split" aria-labelledby="split-heading" className="border-b border-border py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="kicker">
            <span className="kicker-dot" aria-hidden="true" />
            Who does what
          </p>
          <h2
            id="split-heading"
            className="font-display mt-6 text-4xl font-medium leading-[1.02] text-ice sm:text-5xl"
          >
            The team writes. You stay the business.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate">
            The story is an AI workforce. What you can buy today is the writing
            house. Read this before you pay.
          </p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <article className="surface rounded-2xl p-6 sm:p-8">
            <h3 className="font-display text-2xl text-ice">The platform does</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate">
              {weDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="surface rounded-2xl p-6 sm:p-8">
            <h3 className="font-display text-2xl text-ice">You still do</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate">
              {youDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="surface-lit rounded-2xl p-6 sm:p-8">
            <h3 className="font-display text-2xl text-ice">We never</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate">
              {weNever.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </Container>
    </section>
  );
}
