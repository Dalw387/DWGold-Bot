import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">
        That address is not part of this free demo. Return to the homepage or open
        the Facebook Post Generator.
      </p>
      <p className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Back to homepage
        </Link>
        <Link
          href="/tools/facebook-post-generator"
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Open the generator
        </Link>
      </p>
    </Container>
  );
}
