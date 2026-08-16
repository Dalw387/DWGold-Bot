const KEY = "locallaunch.nano.v1";

export type GrowthSignal =
  | "home"
  | "agent"
  | "pricing"
  | "calculator"
  | "demo"
  | "audit"
  | "cta"
  | "sample";

export type SignalKind = GrowthSignal;

export type BuyingStage = "discovery" | "interest" | "evaluation" | "high-intent" | "customer";

export type AuditChoice = boolean | "sometimes";
export type AuditAnswers = Record<string, AuditChoice>;

export interface VisitorContext {
  industry?: string;
  region?: string;
  problem?: string;
  sources: string[];
  volume?: string;
  ads?: string;
  recommended: string[];
  dismissedGuide?: boolean;
  pricingViews: number;
  calculatorOpportunity?: number;
}

export interface NanoState {
  signals: { kind: GrowthSignal; at: string; detail?: string }[];
  agents: string[];
  audits: { at: string; total: number; answers: AuditAnswers }[];
  referrals: string[];
  context: VisitorContext;
}

const emptyContext: VisitorContext = {
  sources: [],
  recommended: [],
  pricingViews: 0,
};

const empty: NanoState = {
  signals: [],
  agents: [],
  audits: [],
  referrals: [],
  context: emptyContext,
};

type Listener = () => void;
const listeners = new Set<Listener>();
let snapshot: NanoState = empty;
let loaded = false;

function emit() {
  for (const listener of listeners) listener();
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(snapshot));
  } catch {
    // private mode / quota
  }
}

function normalise(raw: Partial<NanoState> | null): NanoState {
  return {
    signals: Array.isArray(raw?.signals) ? raw.signals.slice(-80) : [],
    agents: Array.isArray(raw?.agents) ? raw.agents : [],
    audits: Array.isArray(raw?.audits) ? raw.audits.slice(-12) : [],
    referrals: Array.isArray(raw?.referrals) ? raw.referrals.slice(-24) : [],
    context: {
      ...emptyContext,
      ...(raw?.context ?? {}),
      sources: Array.isArray(raw?.context?.sources) ? raw.context.sources : [],
      recommended: Array.isArray(raw?.context?.recommended) ? raw.context.recommended : [],
      pricingViews: Number(raw?.context?.pricingViews) || 0,
    },
  };
}

export function subscribeNano(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getNanoSnapshot(): NanoState {
  return snapshot;
}

export function getServerNanoSnapshot(): NanoState {
  return empty;
}

export function hydrateNano(): void {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    snapshot = raw ? normalise(JSON.parse(raw) as Partial<NanoState>) : empty;
  } catch {
    snapshot = empty;
  }
  emit();
}

export function loadNano(): NanoState {
  hydrateNano();
  return snapshot;
}

export function recordSignal(kind: GrowthSignal, detail?: string): void {
  if (typeof window === "undefined") return;
  hydrateNano();
  snapshot = {
    ...snapshot,
    signals: [...snapshot.signals, { kind, at: new Date().toISOString(), detail }].slice(-80),
    agents:
      kind === "agent" && detail && !snapshot.agents.includes(detail)
        ? [...snapshot.agents, detail]
        : snapshot.agents,
  };
  persist();
  emit();
}

export function saveAudit(answers: AuditAnswers, total: number): void {
  if (typeof window === "undefined") return;
  hydrateNano();
  snapshot = {
    ...snapshot,
    audits: [...snapshot.audits, { at: new Date().toISOString(), total, answers }].slice(-12),
  };
  persist();
  emit();
  recordSignal("audit", `score:${total}`);
}

export function patchContext(partial: Partial<VisitorContext>): void {
  if (typeof window === "undefined") return;
  hydrateNano();
  snapshot = {
    ...snapshot,
    context: {
      ...snapshot.context,
      ...partial,
      sources: partial.sources ?? snapshot.context.sources,
      recommended: partial.recommended ?? snapshot.context.recommended,
    },
  };
  persist();
  emit();
}

export function notePricingView(): void {
  if (typeof window === "undefined") return;
  hydrateNano();
  snapshot = {
    ...snapshot,
    context: { ...snapshot.context, pricingViews: snapshot.context.pricingViews + 1 },
  };
  persist();
  emit();
}

export function buyingStage(state: NanoState): BuyingStage {
  const kinds = state.signals.map((s) => s.kind);
  if (kinds.includes("cta")) return "high-intent";
  const pricing = kinds.filter((k) => k === "pricing").length + state.context.pricingViews;
  if (pricing >= 2 || kinds.includes("calculator") || kinds.includes("audit")) return "high-intent";
  if (pricing >= 1 || kinds.includes("demo")) return "evaluation";
  if (state.agents.length >= 1 || kinds.includes("sample")) return "interest";
  return "discovery";
}

export function recordReferral(code: string): void {
  const clean = code.trim().slice(0, 12).toUpperCase();
  if (!clean) return;
  hydrateNano();
  if (snapshot.referrals.includes(clean)) return;
  snapshot = { ...snapshot, referrals: [...snapshot.referrals, clean].slice(-24) };
  persist();
  emit();
}

export function makeReferralCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 5; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export function intentFromSignals(state: NanoState): {
  leads: number;
  ads: number;
  social: number;
  purchase: number;
} {
  const text = `${state.agents.join(" ")} ${state.signals.map((s) => s.detail || s.kind).join(" ")}`.toLowerCase();
  const score = (needles: string[]) => {
    const hits = needles.filter((n) => text.includes(n)).length;
    return Math.min(92, 18 + hits * 14 + Math.min(state.signals.length, 12) * 3);
  };
  return {
    leads: score(["lead", "alex", "referral", "customer-plan", "appointment"]),
    ads: score(["ads", "max", "mia", "google", "meta", "spend", "calculator"]),
    social: score(["social", "sophie", "instagram", "facebook", "sample"]),
    purchase: score(["pricing", "cta", "pay", "calculator", "audit"]),
  };
}

export function intentBars(state: NanoState): { label: string; score: number }[] {
  const intent = intentFromSignals(state);
  return [
    { label: "Lead generation", score: intent.leads },
    { label: "Google Ads", score: intent.ads },
    { label: "Social media", score: intent.social },
    { label: "Purchase intent", score: intent.purchase },
  ];
}

export const auditQuestions = [
  {
    id: "public",
    prompt: "Can a stranger read who you are, where you are, and how to enquire — without logging in?",
    weight: 16,
  },
  {
    id: "review",
    prompt: "Do you ask for a Google review the same day you finish a job?",
    weight: 14,
  },
  {
    id: "missed",
    prompt: "When a call rings off, do you send a text back within a few minutes?",
    weight: 14,
  },
  {
    id: "ads",
    prompt: "If you run ads, do they land on a page that can take an enquiry?",
    weight: 12,
  },
  {
    id: "reply",
    prompt: "Do new messages get a first reply the same day?",
    weight: 12,
  },
  {
    id: "plan",
    prompt: "Do you have a written fortnight of customer-getting actions?",
    weight: 10,
  },
  {
    id: "ledger",
    prompt: "Do you count real enquiries, calls and jobs — not likes?",
    weight: 12,
  },
  {
    id: "neighbour",
    prompt: "Do nearby businesses and past customers know what you offer right now?",
    weight: 10,
  },
] as const;

export function scoreAudit(answers: AuditAnswers): {
  total: number;
  parts: { id: string; label: string; score: number }[];
} {
  let total = 0;
  const parts = auditQuestions.map((q) => {
    const choice = answers[q.id];
    const factor = choice === true ? 1 : choice === "sometimes" ? 0.55 : 0.22;
    const score = Math.round(q.weight * factor);
    total += score;
    return { id: q.id, label: q.prompt, score };
  });
  return { total: Math.min(100, total), parts };
}

function partScore(answers: AuditAnswers, ids: string[]): number {
  const qs = auditQuestions.filter((q) => ids.includes(q.id));
  const max = qs.reduce((sum, q) => sum + q.weight, 0);
  if (!max) return 0;
  const got = qs.reduce((sum, q) => {
    const choice = answers[q.id];
    const factor = choice === true ? 1 : choice === "sometimes" ? 0.55 : 0.22;
    return sum + Math.round(q.weight * factor);
  }, 0);
  return Math.min(100, Math.round((got / max) * 100));
}

export function shareBreakdown(answers: AuditAnswers): {
  response: number;
  ads: number;
  search: number;
} {
  return {
    response: partScore(answers, ["missed", "reply"]),
    ads: partScore(answers, ["ads"]),
    search: partScore(answers, ["public", "neighbour"]),
  };
}
