import { Container } from "@/components/container";
import { weNever, youDo } from "@/lib/offer";

export function HonestSplit() {
  return (
    <section id="split" aria-labelledby="split-heading" className="py-24 sm:py-32">
      <Container className="max-w-3xl">
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Who does what
        </p>
        <h2 id="split-heading" className="font-display display-2 mt-6 text-ice">
          The team writes. You stay the business.
        </h2>
        <p className="mt-5 text-base leading-7 text-slate">
          The story is an AI workforce. What you can buy today is the writing
          house. Read this before you pay.
        </p>
        <div className="mt-12 grid gap-12 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl text-ice">You still do</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate">
              {youDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl text-ice">We never</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate">
              {weNever.slice(0, 6).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
