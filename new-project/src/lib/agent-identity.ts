import { DEFAULT_FACEBOOK_STYLES, type GeneratorFormValues, type ToolSlug } from "@/lib/types";

export const AGENT_COLOURS = {
  alex: "#49E6FF",
  charlie: "#956BFF",
  grace: "#FF6BA8",
  max: "#5685FF",
  sophie: "#E54FD1",
  scout: "#55E6C1",
} as const;

export type AgentColourId = keyof typeof AGENT_COLOURS;

export const AGENT_DESKS: Record<
  AgentColourId,
  { desk: string; nav: string; sampleTool: ToolSlug }
> = {
  alex: { desk: "Leads", nav: "Leads", sampleTool: "follow-up" },
  charlie: { desk: "Appointments", nav: "Appointments", sampleTool: "enquiry-reply" },
  grace: { desk: "Customers", nav: "Reviews", sampleTool: "google-review-desk" },
  max: { desk: "Advertising", nav: "Advertising", sampleTool: "ads-copy" },
  sophie: { desk: "Social", nav: "Social", sampleTool: "facebook-post-generator" },
  scout: { desk: "Search", nav: "Search", sampleTool: "seo-brief" },
};

export function colourForAgent(nameOrId: string): string {
  const key = nameOrId.trim().toLowerCase() as AgentColourId;
  return AGENT_COLOURS[key] ?? AGENT_COLOURS.alex;
}

export const DEMO_WORKSPACE: GeneratorFormValues = {
  businessName: "Ridge & Rain",
  businessType: "roofing",
  location: "Leeds",
  offer: "roof repairs, replacements and gutter work",
  tone: "professional",
  callToAction: "Call or message for a quote",
  length: "standard",
  includeHashtags: false,
  facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
};

export const DEMO_ENQUIRY =
  "Hi, looking for a quote for replacing our roof. We're in Leeds.";

export const WORKFORCE_CORE: {
  id: AgentColourId;
  name: string;
  desk: string;
  doing: string;
  slug: string;
}[] = [
  { id: "alex", name: "Alex", desk: "Leads", doing: "Finding new opportunities…", slug: "ai-lead-generation-agent" },
  { id: "charlie", name: "Charlie", desk: "Appointments", doing: "Preparing lead response…", slug: "ai-appointment-setter" },
  { id: "max", name: "Max", desk: "Advertising", doing: "Building campaign…", slug: "ai-google-ads-agent" },
  { id: "sophie", name: "Sophie", desk: "Social", doing: "Creating social content…", slug: "ai-social-media-agent" },
  { id: "grace", name: "Grace", desk: "Customers & reviews", doing: "Preparing review journey…", slug: "ai-customer-service-agent" },
  { id: "scout", name: "Scout", desk: "Search", doing: "Checking local visibility…", slug: "ai-search-visibility-agent" },
];
