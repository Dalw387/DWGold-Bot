import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

export function Hero() {
  return (
    <section className="hero-grid border-b border-slate-200 bg-white">
      <Container className="py-16 sm:py-20 lg:py-24">
        <p className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
          Early free demo
        </p>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
          Marketing content for small businesses, written from your details
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          LocalLaunch AI helps local shops, trades, and service businesses draft
          Facebook posts without an agency. This first version is free, runs in
          your browser, and uses prepared templates rather than a paid AI model.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/tools/facebook-post-generator">
            Open the Facebook Post Generator
          </ButtonLink>
          <ButtonLink href="/#features" variant="secondary">
            See what is included
          </ButtonLink>
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-500">
          No account, no card, and no set-up. The same details always produce the
          same three drafts, so you can edit them with confidence before you post.
        </p>
      </Container>
    </section>
  );
}
