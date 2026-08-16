import { Container } from "@/components/container";
import { weDo, weNever, youDo } from "@/lib/offer";

export function HonestSplit() {
  return (
    <section id="split" aria-labelledby="split-heading" className="bg-wash py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="kicker">Who does what</p>
          <h2
            id="split-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-5xl"
          >
            We write the drafts. You stay the business.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Read this before you pay. If you need someone to log into Ads
            Manager, spend budget, or guarantee leads, this is not that product.
            If you need a desk that writes honest local copy and then gets out
            of the way, this is.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <article className="paper-card rounded-sm border border-border p-6 sm:p-8">
            <h3 className="font-display text-2xl text-foreground">The platform does</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
              {weDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="paper-card rounded-sm border border-border p-6 sm:p-8">
            <h3 className="font-display text-2xl text-foreground">You still do</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
              {youDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-sm bg-ink p-6 text-paper sm:p-8">
            <h3 className="font-display text-2xl">We never</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#cfcbc3]">
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
