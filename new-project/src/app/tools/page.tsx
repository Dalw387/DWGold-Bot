import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free tools",
  description:
    "Browse the LocalLaunch AI toolkit: Facebook posts, Instagram captions, Google listing updates, WhatsApp messages, a seven-day plan, and more.",
};

const categories = ["Social", "Listings", "Planning", "Website"] as const;

export default function ToolsPage() {
  return (
    <div className="mesh border-b border-stone-200">
      <Container className="py-14 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
          Toolkit
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">
          Eight free drafting tools for local businesses
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
          Every tool uses the same details and the same rules: templates, no paid
          AI, no account, and no invented awards. Your form stays in this browser
          tab so you can hop between them.
        </p>
        <div className="mt-12 space-y-12">
          {categories.map((category) => {
            const tools = TOOLS.filter((tool) => tool.category === category);
            if (tools.length === 0) return null;
            return (
              <section key={category} aria-labelledby={`cat-${category}`}>
                <h2
                  id={`cat-${category}`}
                  className="font-display text-2xl text-stone-900"
                >
                  {category}
                </h2>
                <ul className="mt-5 grid gap-5 md:grid-cols-2">
                  {tools.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="paper-card flex h-full flex-col rounded-3xl border border-stone-200 p-6 transition hover:-translate-y-0.5 hover:border-[#b0894f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b0894f]"
                      >
                        <h3 className="font-display text-2xl text-stone-900">
                          {tool.name}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-[#8c6a38]">
                          {tool.tagline}
                        </p>
                        <p className="mt-3 flex-1 text-sm leading-6 text-stone-600">
                          {tool.description}
                        </p>
                        <p className="mt-5 text-sm font-semibold text-[#12100e]">
                          Open {tool.shortName}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
