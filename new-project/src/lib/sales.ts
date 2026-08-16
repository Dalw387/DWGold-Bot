import { AGENT_COLOURS } from "@/lib/agent-identity";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import {
  buyingStage,
  type BuyingStage,
  type NanoState,
  type VisitorContext,
} from "@/lib/nano-growth";

export type ProofState = "VERIFIED" | "DEMONSTRATION" | "ESTIMATE" | "PLANNED" | "UNAVAILABLE";

export type SpecialistId = "alex" | "max" | "sophie" | "charlie" | "grace" | "scout";

export type Specialist = {
  id: SpecialistId;
  name: string;
  title: string;
  job: string;
  problem: string;
  outcome: string;
  notFor: string;
  doesNot: string;
  deskHref: string;
  slug: string;
  complementary: SpecialistId[];
  colour: string;
  desk: string;
};

export const specialists: Specialist[] = [
  {
    id: "alex",
    name: "Alex",
    title: "Lead Agent",
    job: "Works the people who already know you.",
    problem: "not enough leads",
    outcome: "A 14-day plan, referral asks and neighbour introductions.",
    notFor: "Businesses hoping for a scraped list of strangers.",
    doesNot: "Does not scrape the internet or invent prospects.",
    deskHref: "/tools/customer-plan",
    slug: "ai-lead-generation-agent",
    complementary: ["charlie", "max"],
    colour: AGENT_COLOURS.alex,
    desk: "Leads",
  },
  {
    id: "max",
    name: "Max",
    title: "Ads Agent",
    job: "Writes the ads you paste into your own accounts.",
    problem: "advertising spend",
    outcome: "Google and Meta copy, headlines and campaign structure.",
    notFor: "Anyone wanting LocalLaunch to log into Ads Manager.",
    doesNot: "Does not log into Ads Manager or spend budget.",
    deskHref: "/tools/ads-copy",
    slug: "ai-google-ads-agent",
    complementary: ["scout", "alex"],
    colour: AGENT_COLOURS.max,
    desk: "Advertising",
  },
  {
    id: "sophie",
    name: "Sophie",
    title: "Social Agent",
    job: "Keeps the business visible when you are busy on the tools.",
    problem: "no time for social",
    outcome: "Facebook, Instagram, listing updates and a seven-day plan.",
    notFor: "Firms that need live DM bots today.",
    doesNot: "Does not publish or watch live DMs.",
    deskHref: "/tools/facebook-post-generator",
    slug: "ai-social-media-agent",
    complementary: ["grace", "alex"],
    colour: AGENT_COLOURS.sophie,
    desk: "Social",
  },
  {
    id: "charlie",
    name: "Charlie",
    title: "Appointment Agent",
    job: "Turns interest into a booked next step.",
    problem: "missed calls",
    outcome: "First replies, booking lines, voicemail and missed-call texts.",
    notFor: "Anyone expecting a live voice receptionist in this purchase.",
    doesNot: "Does not sit on the live phone or book a diary unaided.",
    deskHref: "/tools/enquiry-reply",
    slug: "ai-appointment-setter",
    complementary: ["grace", "alex"],
    colour: AGENT_COLOURS.charlie,
    desk: "Appointments",
  },
  {
    id: "grace",
    name: "Grace",
    title: "Reputation Agent",
    job: "Turns finished work into reviews, and missed calls into conversations.",
    problem: "low reviews",
    outcome: "Google review asks, calm replies and off-hours texts.",
    notFor: "Anyone expecting LocalLaunch to send SMS for them.",
    doesNot: "Does not send SMS or log into Google.",
    deskHref: "/tools/google-review-desk",
    slug: "ai-customer-service-agent",
    complementary: ["charlie", "sophie"],
    colour: AGENT_COLOURS.grace,
    desk: "Customers",
  },
  {
    id: "scout",
    name: "Scout",
    title: "Search Agent",
    job: "Gives strangers a page they can actually read.",
    problem: "not found",
    outcome: "A public homepage, local titles and a Google Business checklist.",
    notFor: "Anyone buying a ChatGPT ranking promise.",
    doesNot: "Does not promise a ranking or a mention inside ChatGPT.",
    deskHref: "/tools/seo-brief",
    slug: "ai-search-visibility-agent",
    complementary: ["max", "alex"],
    colour: AGENT_COLOURS.scout,
    desk: "Search",
  },
];

export function specialistById(id: string): Specialist | undefined {
  return specialists.find((item) => item.id === id);
}

export type ProofLine = { state: ProofState; text: string };

export const proofLines: ProofLine[] = [
  {
    state: "DEMONSTRATION",
    text: "Here is an example of what the desk writes from facts you type. Labelled as a demonstration, not a customer story.",
  },
  {
    state: "ESTIMATE",
    text: "Calculator figures are arithmetic from the numbers you enter — not a forecast and not a guarantee.",
  },
  {
    state: "UNAVAILABLE",
    text: "The desks do not log into Ads Manager, send SMS, or answer the live phone in this product.",
  },
  {
    state: "PLANNED",
    text: "Phone, CRM and Ads Manager connections are a later workforce. They are not included in this purchase.",
  },
];

const PROBLEM_TO_AGENTS: Record<string, SpecialistId[]> = {
  "not enough leads": ["alex", "max"],
  "missed calls": ["charlie", "grace"],
  "poor follow-up": ["charlie", "alex"],
  "advertising spend": ["max", "scout"],
  "no time for social": ["sophie", "grace"],
  "low reviews": ["grace", "alex"],
  "not found": ["scout", "alex"],
};

export function recommendFromProblem(problem?: string): Specialist[] {
  const ids = PROBLEM_TO_AGENTS[problem ?? ""] ?? ["alex", "charlie"];
  return ids.map((id) => specialistById(id)).filter((item): item is Specialist => Boolean(item));
}

export function recommendFromContext(context: VisitorContext): Specialist[] {
  const fromProblem = recommendFromProblem(context.problem);
  if (context.ads && context.ads !== "none" && !fromProblem.some((s) => s.id === "max")) {
    const max = specialistById("max");
    if (max) return [...fromProblem.slice(0, 2), max].slice(0, 3);
  }
  return fromProblem.slice(0, 3);
}

export function explainRecommendation(picked: Specialist[], context: VisitorContext): string {
  const names = picked.map((s) => s.name).join(" and ");
  const problem = context.problem || "the bottleneck you described";
  const extra = specialists.find((s) => !picked.some((p) => p.id === s.id));
  const later = extra
    ? ` ${extra.name} becomes useful later, but I would not make that your first move.`
    : "";
  return `For what you have described, I would start with ${names}. Your immediate bottleneck is ${problem}. You still unlock the full team for ${HOUSE_PRICE_SHORT} — this is who to use first.${later}`;
}

export type GuideOpener = {
  id: string;
  line: string;
  waitMs: number;
};

export function guideOpener(state: NanoState): GuideOpener | null {
  if (state.context.dismissedGuide) return null;
  const stage = buyingStage(state);
  const industry = state.context.industry;
  const agents = state.agents.join(" ");
  const pricing = state.context.pricingViews + state.signals.filter((s) => s.kind === "pricing").length;

  if (pricing >= 2) {
    return {
      id: "pricing",
      waitMs: 900,
      line: "Want me to work out which specialists you actually need rather than making you compare the whole house yourself?",
    };
  }
  if (state.signals.some((s) => s.kind === "calculator") && state.context.calculatorOpportunity) {
    return {
      id: "calc",
      waitMs: 800,
      line: "You have estimated significant value in missed enquiries. Want me to show you how Charlie handles that workflow?",
    };
  }
  if (agents.includes("ai-google-ads-agent") || agents.includes("ai-meta-ads-agent")) {
    return {
      id: "ads",
      waitMs: 1200,
      line: "If you already run ads, I can show you where Max fits — he drafts the copy. You still hold the budget.",
    };
  }
  if (industry && (agents.includes("lead") || agents.includes("ai-lead-generation-agent"))) {
    return {
      id: "roof-lead",
      waitMs: 1100,
      line: `Looks like you are exploring lead generation${industry ? ` for ${industry}` : ""}. Want me to show you what Alex would do in the first 14 days?`,
    };
  }
  if (stage === "evaluation" || stage === "high-intent") {
    return {
      id: "eval",
      waitMs: 1400,
      line: "Happy to recommend a starting pair of specialists, or you can pay and open the full house. Which is more useful?",
    };
  }
  if (stage === "interest") {
    return {
      id: "interest",
      waitMs: 4000,
      line: "If it helps, I can show the specialist that matches the page you just opened — without a sales pitch.",
    };
  }
  return null;
}

export function answerObjection(text: string): string | null {
  const q = text.toLowerCase();
  if (q.includes("chatgpt") || q.includes("just use")) {
    return "ChatGPT can help you write something when you ask it. LocalLaunch is built around your business, your offer and an ongoing set of desks so the specialists work from the same information. Demonstration, not a ranking claim.";
  }
  if (q.includes("guarantee") || q.includes("actually bring") || q.includes("more customers")) {
    return "No — and we would not make that promise. The desks write the work involved in generating, following up and converting opportunities. Results still depend on your market, offer, advertising and whether you send the work.";
  }
  if (q.includes("really ai") || q.includes("is it ai")) {
    return "The drafts run from templates in this browser, from the facts you type. Same facts in, same words out. That is how the price stays a one-off. It is not a live model calling an API with your data.";
  }
  if (q.includes("replac") || q.includes("staff") || q.includes("job")) {
    return "No. It is additional capability: the words a junior marketing desk would be asked to write. You stay the publisher.";
  }
  if (q.includes("post") || q.includes("automatic") || q.includes("send")) {
    return "The desks write. You approve and send. They do not publish to Facebook, send SMS, or log into Ads Manager in this product. Planned later; unavailable today.";
  }
  if (q.includes("understand marketing") || q.includes("not a marketer")) {
    return "That is who the interface is for. Tell the team what you sell and where you operate. The system turns that into drafts you can check.";
  }
  if (q.includes("trust") || q.includes("scam") || q.includes("legit")) {
    return "You can read sample drafts before you pay. After payment this browser unlocks the same desks. Stripe takes the card. We do not invent customer counts or scarcity.";
  }
  if (q.includes("price") || q.includes("197") || q.includes("expensive") || q.includes("cheap")) {
    return `${HOUSE_PRICE_SHORT} once for the full writing house. Ad spend at Google or Meta is separate and paid to them. We will not invent monthly tiers we cannot run.`;
  }
  return null;
}

export function salesReply(message: string, state: NanoState): string {
  const objection = answerObjection(message);
  if (objection) return objection;
  const lower = message.toLowerCase();
  if (lower.includes("roof") || lower.includes("dentist") || lower.includes("estate") || lower.includes("builder")) {
    return "Useful. Roughly how do most enquiries reach you now — phone, Google, Facebook, referrals, or a mixture?";
  }
  if (lower.includes("human") || lower.includes("call me") || lower.includes("person")) {
    return "You can talk to a person. Leave a name and email — no pressure script, no fake urgency.";
  }
  if (lower.includes("buy") || lower.includes("pay") || lower.includes("stripe")) {
    return `The purchase is the full team, ${HOUSE_PRICE_SHORT} once. I can still tell you who to start with after you are in.`;
  }
  const stage: BuyingStage = buyingStage(state);
  if (stage === "discovery") {
    return "LocalLaunch is an AI marketing team for businesses that cannot miss a lead. They write. You send. What kind of business are you running?";
  }
  return "Before I recommend anything: what is costing you more — not enough enquiries, slow replies, missed calls, ads, or quiet social?";
}

export const BUILD_TEAM_EVENT = "locallaunch:build-team";
export const TALK_EVENT = "locallaunch:talk";

export function openBuildTeam(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(BUILD_TEAM_EVENT));
}

export function openTalk(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(TALK_EVENT));
}
