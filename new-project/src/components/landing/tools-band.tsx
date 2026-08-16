import Link from "next/link";
import { Container } from "@/components/container";
import { TOOLS } from "@/lib/tools";

export function ToolsBand() {
  return (
    <section id="tools" aria-labelledby="tools-heading" className="bg-[#fffcf7] py-16 sm:py-20">
      <Container>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2
              id="tools-heading"
              className="font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
            >
              A small studio of free tools
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-600">
              Start with Facebook if that is your main channel. The other tools
              reuse the same business details, kept only in this browser tab.
            </p>
          </div>
          <Link
            href="/tools"
            className="text-sm font-semibold text-indigo-800 hover:text-indigo-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View the full toolkit
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}`}
                className="paper-card flex h-full flex-col rounded-2xl border border-stone-200 p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                  {tool.category}
                </p>
                <h3 className="mt-2 font-display text-xl text-stone-900">{tool.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-stone-600">{tool.tagline}</p>
                <p className="mt-4 text-sm font-semibold text-indigo-800">Open tool</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
