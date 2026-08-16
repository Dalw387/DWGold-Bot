import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

export function FinalCta() {
  return (
    <section className="ink-hero py-20 sm:py-24">
      <Container className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d7c4a1]">
          Ready when you are
        </p>
        <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-[#f6f1e8] sm:text-5xl">
          Open the studio. Keep the receipts honest.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#e8dcc8]">
          Use the assistant, fill a sentence, and take a pack of drafts into
          Facebook, Instagram, or your listing. You stay the publisher.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/tools/facebook-post-generator" variant="gold">
            Enter Facebook Post Studio
          </ButtonLink>
          <ButtonLink href="/tools/content-plan" variant="secondary" className="text-[#f6f1e8]">
            Open the seven-day plan
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
