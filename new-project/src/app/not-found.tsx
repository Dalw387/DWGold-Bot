import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-stone-900">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-stone-600">
        That address is not part of this studio. Return to the homepage or open
        House Operations.
      </p>
      <p className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-[#12100e] px-5 py-3 text-sm font-semibold text-[#f6f1e8] hover:bg-[#1d1915] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b0894f]"
        >
          Back to homepage
        </Link>
        <Link
          href="/operations"
          className="rounded-full border border-[rgba(176,137,79,0.45)] bg-white px-5 py-3 text-sm font-semibold text-stone-900 hover:border-[#b0894f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b0894f]"
        >
          House Operations
        </Link>
      </p>
    </Container>
  );
}
