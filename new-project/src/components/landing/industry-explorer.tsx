"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { generateForTool } from "@/lib/copy";
import { industryCategories } from "@/lib/industry-explorer";
import { patchContext } from "@/lib/nano-growth";

export function IndustryExplorer() {
  const [catId, setCatId] = useState(industryCategories[0]?.id ?? "trades");
  const category = industryCategories.find((c) => c.id === catId) ?? industryCategories[0];
  const [bizId, setBizId] = useState(category?.businesses[0]?.id ?? "roofer");
  const business =
    category?.businesses.find((b) => b.id === bizId) ?? category?.businesses[0];

  const drafts = useMemo(() => {
    const cat = industryCategories.find((c) => c.id === catId);
    const biz = cat?.businesses.find((b) => b.id === bizId);
    if (!biz) return [];
    const reply = generateForTool("enquiry-reply", biz.values)[0];
    const ads = generateForTool("ads-copy", biz.values)[0];
    const review = generateForTool("google-review-desk", biz.values)[0];
    return [
      { who: "Charlie", label: "First reply", text: reply?.text ?? "" },
      { who: "Max", label: "Ads opening", text: ads?.text ?? "" },
      { who: "Grace", label: "Review ask", text: review?.text ?? "" },
    ].filter((item) => item.text);
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
    <section id="solutions" aria-labelledby="solutions-heading" className="py-24 sm:py-32">
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Built around your business
        </p>
        <h2 id="solutions-heading" className="font-display display-2 mt-6 max-w-3xl text-ice">
          Your business has leads.
          <br />
          Your AI team knows what to do with them.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate">
          Choose an industry. Watch an enquiry arrive, then see the desks write
          the first reply, the ads lines and the review ask — from the same facts.
        </p>
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {industryCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectCategory(item.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm ${
                item.id === catId
                  ? "bg-cobalt text-ice"
                  : "border border-titanium/25 text-titanium hover:text-ice"
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
                item.id === business?.id ? "bg-white/10 text-ice" : "text-slate hover:text-ice"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        {business ? (
          <div className="titanium mt-10 grid gap-8 rounded-[1.5rem] p-6 lg:grid-cols-[0.9fr_1.1fr] sm:p-8">
            <div>
              <p className="label">Incoming enquiry · {business.name}</p>
              <p className="mt-4 font-display text-2xl leading-snug text-ice">“{business.enquiry}”</p>
              <p className="mt-6 text-sm leading-6 text-slate">
                Six specialists. One enquiry. Nothing forgotten — if you send the
                drafts. Demonstration copy for {business.values.businessName}.
              </p>
              {business.href ? (
                <ButtonLink href={business.href} className="mt-8" variant="secondary" arrow>
                  See LocalLaunch for {business.name.toLowerCase()}
                </ButtonLink>
              ) : (
                <Link href={`/${category?.id === "trades" ? "ai-marketing-for-roofers" : "ai-marketing-team"}`} className="mt-8 inline-flex text-sm text-titanium hover:text-ice">
                  See the team →
                </Link>
              )}
            </div>
            <div className="space-y-6">
              {drafts.map((item) => (
                <article key={item.who}>
                  <p className="label">
                    {item.who} · {item.label}
                  </p>
                  <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap font-sans text-sm leading-7 text-ice">
                    {item.text.length > 420 ? `${item.text.slice(0, 420).trim()}…` : item.text}
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
