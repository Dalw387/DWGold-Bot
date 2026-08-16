"use client";

import { useEffect, useId, useState, useSyncExternalStore, useRef } from "react";
import { Button, ButtonLink } from "@/components/button";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import {
  buyingStage,
  getNanoSnapshot,
  getServerNanoSnapshot,
  hydrateNano,
  patchContext,
  subscribeNano,
} from "@/lib/nano-growth";
import {
  BUILD_TEAM_EVENT,
  TALK_EVENT,
  explainRecommendation,
  guideOpener,
  openBuildTeam,
  openTalk,
  recommendFromContext,
  salesReply,
  specialists,
} from "@/lib/sales";

export function SalesGuide() {
  const nano = useSyncExternalStore(subscribeNano, getNanoSnapshot, getServerNanoSnapshot);
  const [open, setOpen] = useState(false);
  const [build, setBuild] = useState(false);
  const [talk, setTalk] = useState(false);
  const [input, setInput] = useState("");
  const [log, setLog] = useState<{ from: "them" | "you"; text: string }[]>([]);
  const [ready, setReady] = useState(false);
  const launched = useRef(false);

  useEffect(() => {
    hydrateNano();
  }, []);

  useEffect(() => {
    function onBuild() {
      setBuild(true);
      setOpen(false);
    }
    function onTalk() {
      setTalk(true);
      setOpen(false);
    }
    window.addEventListener(BUILD_TEAM_EVENT, onBuild);
    window.addEventListener(TALK_EVENT, onTalk);
    return () => {
      window.removeEventListener(BUILD_TEAM_EVENT, onBuild);
      window.removeEventListener(TALK_EVENT, onTalk);
    };
  }, []);

  useEffect(() => {
    if (nano.context.dismissedGuide) return undefined;
    const opener = guideOpener(nano);
    if (!opener || launched.current) return undefined;
    const wait = buyingStage(nano) === "discovery" ? 12000 : opener.waitMs;
    const id = window.setTimeout(() => {
      launched.current = true;
      setReady(true);
      setLog((current) => (current.length ? current : [{ from: "them", text: opener.line }]));
    }, wait);
    return () => window.clearTimeout(id);
  }, [nano]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const reply = salesReply(text, nano);
    setLog((current) => [...current, { from: "you", text }, { from: "them", text: reply }]);
    setInput("");
    const lower = text.toLowerCase();
    if (lower.includes("roof")) patchContext({ industry: "roofing" });
    if (lower.includes("dentist") || lower.includes("clinic")) patchContext({ industry: "health" });
    if (lower.includes("estate")) patchContext({ industry: "property" });
  }

  return (
    <>
      {ready && !nano.context.dismissedGuide && !open && !build && !talk ? (
        <button
          type="button"
          className="titanium-lit fixed bottom-20 right-4 z-50 max-w-xs rounded-2xl p-4 text-left text-sm leading-6 text-ice md:bottom-6"
          onClick={() => setOpen(true)}
        >
          {log[0]?.text ?? "Need a starting pair of specialists?"}
        </button>
      ) : null}

      {open ? (
        <div className="titanium-lit fixed bottom-20 right-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col rounded-2xl md:bottom-6">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <p className="label">LocalLaunch guide</p>
            <button
              type="button"
              className="text-sm text-slate hover:text-ice"
              onClick={() => {
                setOpen(false);
                patchContext({ dismissedGuide: true });
              }}
            >
              Close
            </button>
          </div>
          <div className="max-h-72 space-y-3 overflow-auto px-4 py-4 text-sm leading-6">
            {log.map((line, i) => (
              <p key={`${line.from}-${i}`} className={line.from === "them" ? "text-ice" : "text-titanium"}>
                {line.text}
              </p>
            ))}
          </div>
          <form
            className="border-t border-white/10 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask one thing"
              className="field mt-0"
            />
          </form>
          <div className="flex flex-col gap-2 px-3 pb-3">
            <StripePayLink className="w-full">Buy now · {HOUSE_PRICE_SHORT}</StripePayLink>
            <Button type="button" variant="secondary" className="w-full" onClick={() => openBuildTeam()}>
              Build My AI Team
            </Button>
            <button type="button" className="text-sm text-titanium hover:text-ice" onClick={() => openTalk()}>
              Talk to a human →
            </button>
          </div>
        </div>
      ) : null}

      {build ? <TeamBuilder onClose={() => setBuild(false)} /> : null}
      {talk ? <TalkPanel onClose={() => setTalk(false)} /> : null}
    </>
  );
}

function TeamBuilder({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState("");
  const [region, setRegion] = useState("");
  const [source, setSource] = useState("");
  const [problem, setProblem] = useState("");
  const questions = [
    {
      q: "What does your business do?",
      hint: "Roofing company in Leeds",
      value: industry,
      set: setIndustry,
    },
    {
      q: "Where do you operate?",
      hint: "Town or area",
      value: region,
      set: setRegion,
    },
  ];
  const current = questions[step];
  const done = step >= 2 && problem;
  const recommended = recommendFromContext({
    industry,
    region,
    problem,
    sources: source ? [source] : [],
    recommended: [],
    pricingViews: 0,
  });

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-midnight/80 p-4 backdrop-blur-sm sm:items-center">
      <div className="titanium max-h-[90vh] w-full max-w-lg overflow-auto rounded-[1.5rem] p-6 sm:p-8" role="dialog" aria-labelledby={titleId}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label">Build My AI Team</p>
            <h2 id={titleId} className="font-display display-3 mt-2 text-ice">
              Don’t pick a plan. Start with the right desks.
            </h2>
          </div>
          <button type="button" className="text-sm text-slate" onClick={onClose}>
            Close
          </button>
        </div>

        {!done && step < 2 && current ? (
          <div className="mt-8">
            <p className="text-sm text-titanium">{step + 1} / 4</p>
            <p className="mt-3 text-lg text-ice">{current.q}</p>
            <input
              value={current.value}
              onChange={(event) => current.set(event.target.value)}
              placeholder={current.hint}
              className="field"
            />
            <Button
              type="button"
              className="mt-6"
              disabled={!current.value.trim()}
              onClick={() => setStep((n) => n + 1)}
            >
              Continue
            </Button>
          </div>
        ) : null}

        {!done && step === 2 ? (
          <div className="mt-8">
            <p className="text-sm text-titanium">3 / 4</p>
            <p className="mt-3 text-lg text-ice">Where do most customers currently come from?</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Google", "Facebook", "Referrals", "Phone", "Mixture"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setSource(item);
                    setStep(3);
                  }}
                  className="rounded-full border border-titanium/30 px-4 py-2 text-sm text-ice hover:border-cyan/50"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {!done && step === 3 ? (
          <div className="mt-8">
            <p className="text-sm text-titanium">4 / 4</p>
            <p className="mt-3 text-lg text-ice">What’s costing you the most money?</p>
            <div className="mt-4 flex flex-col gap-2">
              {[
                "not enough leads",
                "missed calls",
                "poor follow-up",
                "advertising spend",
                "no time for social",
                "low reviews",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setProblem(item);
                    patchContext({
                      industry,
                      region,
                      problem: item,
                      sources: source ? [source] : [],
                      recommended: recommendFromContext({
                        industry,
                        region,
                        problem: item,
                        sources: source ? [source] : [],
                        recommended: [],
                        pricingViews: 0,
                      }).map((s) => s.id),
                    });
                  }}
                  className="rounded-xl border border-titanium/25 px-4 py-3 text-left text-sm text-ice hover:border-cyan/40"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {done ? (
          <div className="mt-8">
            <p className="label">Your recommended starting desks</p>
            <ul className="mt-4 space-y-3">
              {recommended.map((agent) => (
                <li key={agent.id} className="border-t border-white/10 pt-3">
                  <p className="font-display text-xl text-ice">
                    {agent.name} · {agent.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate">{agent.outcome}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-slate">
              {explainRecommendation(recommended, {
                industry,
                region,
                problem,
                sources: source ? [source] : [],
                recommended: recommended.map((s) => s.id),
                pricingViews: 0,
              })}
            </p>
            <p className="mt-3 text-sm text-slate">
              Purchase is still the full house — {HOUSE_PRICE_SHORT} once. This is who to use first.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <StripePayLink arrow>Start My AI Team · {HOUSE_PRICE_SHORT}</StripePayLink>
              <ButtonLink href={`/${recommended[0]?.slug ?? specialists[0]?.slug}`} variant="secondary">
                See the first desk
              </ButtonLink>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function TalkPanel({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function submit() {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, source: "talk-to-human" }),
    });
    if (!response.ok) {
      setStatus("That email could not be saved. Try again.");
      return;
    }
    setStatus("Saved. A person can follow up. No invented urgency.");
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-midnight/80 p-4 sm:items-center">
      <div className="titanium w-full max-w-md rounded-[1.5rem] p-6">
        <p className="label">Talk to a human</p>
        <h2 className="font-display display-3 mt-2 text-ice">Leave a way to reach you.</h2>
        <p className="mt-3 text-sm leading-6 text-slate">
          No chatbot in the way. We use this for LocalLaunch follow-up only.
        </p>
        <label className="mt-6 block text-sm text-ice">
          Name (optional)
          <input value={name} onChange={(event) => setName(event.target.value)} className="field" />
        </label>
        <label className="mt-4 block text-sm text-ice">
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="field" />
        </label>
        <div className="mt-6 flex gap-3">
          <Button type="button" onClick={() => void submit()}>
            Send
          </Button>
          <Button type="button" variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        {status ? <p className="mt-3 text-sm text-slate">{status}</p> : null}
      </div>
    </div>
  );
}
