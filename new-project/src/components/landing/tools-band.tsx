import Link from "next/link";
import { Container } from "@/components/container";
import { TOOLS } from "@/lib/tools";

export function ToolsBand() {
  return (
    <section id="tools" aria-labelledby="tools-heading" className="bg-[#fffaf3] py-16 sm:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
              The house toolkit
            </p>
            <h2
              id="tools-heading"
              className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl"
            >
              Eight rooms. One set of facts.
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-600">
              Start with Facebook if that is your main channel. The assistant and
              the other tools reuse the same details, kept only in this browser tab.
            </p>
          </div>
          <Link
            href="/tools"
            className="text-sm font-semibold text-[#8c6a38] hover:text-[#12100e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b0894f]"
          >
            View the full toolkit
          </Link>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}`}
                className="paper-card flex h-full flex-col rounded-3xl border border-stone-200 p-5 transition hover:-translate-y-0.5 hover:border-[#b0894f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b0894f]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8c6a38]">
                  {tool.category}
                </p>
                <h3 className="mt-2 font-display text-xl text-stone-900">{tool.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-stone-600">{tool.tagline}</p>
                <p className="mt-4 text-sm font-semibold text-[#12100e]">Open</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
