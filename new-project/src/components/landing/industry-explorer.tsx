"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { generateForTool } from "@/lib/copy";
import { industryCategories } from "@/lib/industry-explorer";
import { colourForAgent } from "@/lib/agent-identity";
import { patchContext } from "@/lib/nano-growth";
import { openBuildTeam } from "@/lib/sales";

const desks = [
  { who: "Charlie", label: "Reply prepared", tool: "enquiry-reply" as const },
  { who: "Alex", label: "48-hour follow-up prepared", tool: "follow-up" as const },
  { who: "Max", label: "Ad variation prepared", tool: "ads-copy" as const },
  { who: "Sophie", label: "Social listing prepared", tool: "facebook-post-generator" as const },
  { who: "Grace", label: "Post-sale review journey prepared", tool: "google-review-desk" as const },
  { who: "Scout", label: "Local search actions prepared", tool: "seo-brief" as const },
];

export function IndustryExplorer() {
  const [catId, setCatId] = useState(industryCategories[0]?.id ?? "trades");
  const category = industryCategories.find((c) => c.id === catId) ?? industryCategories[0];
  const [bizId, setBizId] = useState(category?.businesses[0]?.id ?? "roofer");
  const business =
    category?.businesses.find((b) => b.id === bizId) ?? category?.businesses[0];

  const scene = useMemo(() => {
    const cat = industryCategories.find((c) => c.id === catId);
    const biz = cat?.businesses.find((b) => b.id === bizId);
    if (!biz) return [];
    return desks.map((desk) => {
      const draft = generateForTool(desk.tool, biz.values)[0];
      return {
        ...desk,
        text: draft?.text ?? "",
        colour: colourForAgent(desk.who),
      };
    });
  }, [bizId, catId]);

  function selectCategory(id: string) {
    setCatId(id);
    const next = industryCategories.find((c) => c.id === id);
    const first = next?.businesses[0];
    if (first) setBizId(first.id);
    patchContext({ industry: next?.label });
  }

  function selectBiz(id: string) {
    setBizId(id);
    const biz = category?.businesses.find((b) => b.id === id);
    if (biz) patchContext({ industry: biz.name });
  }

  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="band-industries py-24 sm:py-32">
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Built for businesses where every lead matters
        </p>
        <h2 id="solutions-heading" className="font-display display-2 mt-6 max-w-3xl text-ice">
          Show us what you do.
          We’ll show you the team at work.
        </h2>
        <p className="prose-narrow mt-5 text-base leading-7 text-slate">
          Choose a category, then a business. The right panel becomes a live
          scenario — six desks writing from the same facts.
        </p>
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {industryCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectCategory(item.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm ${
                item.id === catId
                  ? "bg-violet/30 text-ice"
                  : "border border-white/12 text-titanium hover:text-ice"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {category?.businesses.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectBiz(item.id)}
              className={`rounded-full px-3 py-1.5 text-sm ${
                item.id === business?.id ? "bg-cyan/20 text-ice" : "text-slate hover:text-ice"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        {business ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="glass rounded-[1.5rem] p-6 sm:p-8">
              <p className="label">Incoming enquiry · {business.name}</p>
              {business.incomingLabel ? (
                <p className="mt-4 text-sm text-cyan">{business.incomingLabel}</p>
              ) : null}
              <p className="mt-4 font-serif text-2xl leading-snug text-ice">“{business.enquiry}”</p>
              <p className="mt-6 text-sm leading-6 text-slate">
                Demonstration copy for {business.values.businessName}. The desks
                write. You still send.
              </p>
              <Button
                type="button"
                className="mt-8"
                arrow
                onClick={() => {
                  patchContext({ industry: business.name });
                  openBuildTeam();
                }}
              >
                Build this team for my {business.ctaNoun}
              </Button>
            </div>
            <div className="space-y-3" key={business.id}>
              {scene.map((item, index) => (
                <article
                  key={item.who}
                  className="glass live-cascade rounded-2xl p-4"
                  style={{
                    animationDelay: `${index * 110}ms`,
                    boxShadow: `inset 3px 0 0 ${item.colour}`,
                  }}
                >
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em]" style={{ color: item.colour }}>
                    {item.who} · {item.label}
                  </p>
                  <pre className="mt-2 max-h-28 overflow-auto whitespace-pre-wrap font-sans text-sm leading-6 text-silver">
                    {item.text.length > 280 ? `${item.text.slice(0, 280).trim()}…` : item.text}
                  </pre>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
