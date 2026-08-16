import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

export function FinalCta() {
  return (
    <section className="bg-indigo-800 py-16 sm:py-20">
      <Container className="text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Make this week’s posts from one set of facts
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-indigo-100">
          Open Facebook Post Studio, or start with the seven-day plan if you want
          a week of starting points. Check every draft, then publish yourself.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink
            href="/tools/facebook-post-generator"
            className="bg-white text-indigo-800 hover:bg-indigo-50 focus-visible:outline-white"
          >
            Open Facebook Post Studio
          </ButtonLink>
          <ButtonLink
            href="/tools/content-plan"
            variant="secondary"
            className="border-indigo-400 bg-transparent text-white hover:bg-indigo-700 focus-visible:outline-white"
          >
            Build a seven-day plan
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
