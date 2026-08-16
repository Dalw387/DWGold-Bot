import type { Metadata } from "next";
import Link from "next/link";
import { PlatformGate } from "@/components/access/platform-gate";
import { Container } from "@/components/container";
import { ROOM_COUNT_TITLE } from "@/lib/counts";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Twenty-two drafting rooms: social, listings, SEO, ads, referrals, first replies, follow-ups, print, phone, and a 14-day customer plan.",
};

const categories = ["Customers", "Growth", "Social", "Listings", "Planning", "Website"] as const;

export default function ToolsPage() {
  return (
    <PlatformGate>
      <div className="mesh border-b border-stone-200">
        <Container className="py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4d5c57]">
            Studio
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">
            {ROOM_COUNT_TITLE} drafting rooms. One set of facts.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
            Every tool uses the same details: templates, no paid AI, and no
            invented awards. {ROOM_COUNT_TITLE} rooms sit under House Operations
            for SEO, ads, replies, and a proof plan. Your form stays in this
            browser tab so you can hop between rooms.
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
                          className="paper-card flex h-full flex-col rounded-sm border border-stone-200 p-6 transition hover:-translate-y-0.5 hover:border-[#1e3a34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a34]"
                        >
                          <h3 className="font-display text-2xl text-stone-900">
                            {tool.name}
                          </h3>
                          <p className="mt-2 text-sm font-medium text-[#4d5c57]">
                            {tool.tagline}
                          </p>
                          <p className="mt-3 flex-1 text-sm leading-6 text-stone-600">
                            {tool.description}
                          </p>
                          <p className="mt-5 text-sm font-semibold text-[#191919]">
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
    </PlatformGate>
  );
}
