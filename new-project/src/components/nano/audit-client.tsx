"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import {
  auditQuestions,
  makeReferralCode,
  recordReferral,
  saveAudit,
  scoreAudit,
  shareBreakdown,
  type AuditAnswers,
} from "@/lib/nano-growth";

export function AuditClient() {
  const search = useSearchParams();
  const [answers, setAnswers] = useState<AuditAnswers>({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState("SHARE");

  useEffect(() => {
    const fromUrl = search.get("r");
    if (fromUrl) recordReferral(fromUrl);
  }, [search]);

  const { total } = useMemo(() => scoreAudit(answers), [answers]);
  const parts = useMemo(() => shareBreakdown(answers), [answers]);
  const complete = auditQuestions.every((q) => answers[q.id] !== undefined);

  function finish() {
    if (!complete) return;
    setCode(makeReferralCode());
    saveAudit(answers, total);
    setDone(true);
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shareText = `We scored ${total}/100 for AI marketing readiness on LocalLaunch.

Lead response: ${parts.response}/100
Advertising: ${parts.ads}/100
Search visibility: ${parts.search}/100

Run yours: ${origin}/audit?r=${code}`;

  async function copyShare() {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan/80">
        Nano Growth · shareable score
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
        Your AI marketing score
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate">
        Eight honest questions. No fake industry averages. The score is a prompt to share and a
        brief for the desks after you pay {HOUSE_PRICE_SHORT} — not a ranking Google will see, and
        not a promise that a post will go viral.
      </p>

      <div className="mt-10 space-y-4">
        {auditQuestions.map((q) => (
          <div key={q.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm font-medium text-white">{q.prompt}</p>
            <div className="mt-3 flex gap-2">
              {(["yes", "no"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: v === "yes" }))}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                    answers[q.id] === (v === "yes")
                      ? "bg-white text-[#07040f]"
                      : "border border-white/15 text-slate"
                  }`}
                >
                  {v === "yes" ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!complete}
          onClick={finish}
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#07040f] disabled:opacity-40"
        >
          Calculate score
        </button>
        <p className="text-sm text-slate">{complete ? "Ready." : "Answer every question first."}</p>
      </div>

      {done ? (
        <div className="mt-10 overflow-hidden rounded-[28px] border border-cyan/25 bg-gradient-to-br from-cyan/10 to-indigo/10 p-8">
          <p className="font-display text-[11px] uppercase tracking-[0.28em] text-cyan/80">Share card</p>
          <p className="mt-3 font-display text-6xl font-semibold text-white">{total}/100</p>
          <p className="mt-1 font-serif text-xl text-slate">AI marketing readiness</p>
          <dl className="mt-6 grid gap-2 text-sm text-slate">
            <div className="flex justify-between">
              <dt>Lead response</dt>
              <dd className="text-white">{parts.response}/100</dd>
            </div>
            <div className="flex justify-between">
              <dt>Advertising efficiency</dt>
              <dd className="text-white">{parts.ads}/100</dd>
            </div>
            <div className="flex justify-between">
              <dt>Search visibility</dt>
              <dd className="text-white">{parts.search}/100</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-slate">
            Your share link can include referral code {code}. If someone opens it on this site, that
            visit is stored in their browser — not posted to LinkedIn for you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void copyShare()}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#07040f]"
            >
              {copied ? "Copied" : "Copy share text"}
            </button>
            <StripePayLink variant="secondary">Unlock the desks · {HOUSE_PRICE_SHORT}</StripePayLink>
            <Link href="/tools/customer-plan" className="rounded-full px-5 py-2.5 text-sm text-slate">
              After pay: 14-day plan
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
