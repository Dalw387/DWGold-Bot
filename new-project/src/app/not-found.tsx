import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="font-display text-4xl font-medium tracking-tight text-ice">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate">
        That address is not part of this studio. Return to the homepage or open
        House Operations.
      </p>
      <p className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href="/">Back to homepage</ButtonLink>
        <ButtonLink href="/operations" variant="secondary">
          House Operations
        </ButtonLink>
      </p>
    </Container>
  );
}
