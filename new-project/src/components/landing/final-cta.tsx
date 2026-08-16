import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

export function FinalCta() {
  return (
    <section className="bg-indigo-700 py-16 sm:py-20">
      <Container className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Draft your next Facebook post in a few minutes
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-indigo-100">
          Open the free generator, add the facts you already know, and take three
          editable drafts away with you. Check them, then publish on Facebook
          when the wording is right.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink
            href="/tools/facebook-post-generator"
            className="bg-white text-indigo-700 hover:bg-indigo-50 focus-visible:outline-white"
          >
            Start the Facebook Post Generator
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
