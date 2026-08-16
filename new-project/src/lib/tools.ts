import type { ToolSlug } from "@/lib/types";

export interface ToolDefinition {
  slug: ToolSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: "Social" | "Listings" | "Planning" | "Website";
  generateLabel: string;
  resultTitle: string;
  extraHint: string;
}

export const TOOLS: ToolDefinition[] = [
  {
    slug: "facebook-post-generator",
    name: "Facebook Post Studio",
    shortName: "Facebook",
    tagline: "Eight styles, three lengths, optional local hashtags.",
    description:
      "Build a pack of Facebook drafts from the facts you already know. Choose styles such as neighbourhood update, community question, explainer, and a short punchy version.",
    category: "Social",
    generateLabel: "Generate Facebook drafts",
    resultTitle: "Facebook drafts",
    extraHint:
      "Pick at least one style. The same details always produce the same wording.",
  },
  {
    slug: "instagram-captions",
    name: "Instagram Captions",
    shortName: "Instagram",
    tagline: "Feed, carousel outline, and story text.",
    description:
      "Draft Instagram wording without inventing photos, trends, or follower counts. Add your own images separately.",
    category: "Social",
    generateLabel: "Generate captions",
    resultTitle: "Instagram captions",
    extraHint: "Hashtags are optional and kept generic plus your location and type.",
  },
  {
    slug: "google-business-post",
    name: "Google Business posts",
    shortName: "Google",
    tagline: "Short listing updates that do not invent opening times.",
    description:
      "Create cautious Google Business Profile posts. They remind people to confirm details before they travel.",
    category: "Listings",
    generateLabel: "Generate listing posts",
    resultTitle: "Google Business drafts",
    extraHint: "Do not add dates or prices here unless they are already true.",
  },
  {
    slug: "whatsapp-message",
    name: "WhatsApp update",
    shortName: "WhatsApp",
    tagline: "Messages for people who already know you.",
    description:
      "Draft WhatsApp notes for existing customers or neighbours who expect to hear from you. Not for bought lists.",
    category: "Social",
    generateLabel: "Generate messages",
    resultTitle: "WhatsApp drafts",
    extraHint: "Only send to people who have asked for updates.",
  },
  {
    slug: "content-plan",
    name: "Seven-day content plan",
    shortName: "Planner",
    tagline: "A week of starting points, not a locked calendar.",
    description:
      "Turn your details into seven short Facebook-style notes, one for each day. Move days around. Check facts before you schedule anything.",
    category: "Planning",
    generateLabel: "Build a seven-day plan",
    resultTitle: "This week’s starting points",
    extraHint: "These are prompts, not a promise that you must post daily.",
  },
  {
    slug: "review-request",
    name: "Review request",
    shortName: "Reviews",
    tagline: "Ask for honest feedback without pressure.",
    description:
      "Polite review requests that make it easy to say no, and that invite private feedback if something went wrong.",
    category: "Social",
    generateLabel: "Generate review requests",
    resultTitle: "Review request drafts",
    extraHint: "Never offer rewards for positive reviews.",
  },
  {
    slug: "website-blurb",
    name: "Website about copy",
    shortName: "Website",
    tagline: "Homepage, about, and a footer line.",
    description:
      "Plain website wording that introduces the business without fake awards or visitor numbers.",
    category: "Website",
    generateLabel: "Generate website copy",
    resultTitle: "Website drafts",
    extraHint: "Paste into your own site after a human edit.",
  },
  {
    slug: "notice",
    name: "Notice and opening update",
    shortName: "Notice",
    tagline: "Window, Facebook, and email versions of the same facts.",
    description:
      "Turn a change or reminder into three notices. Put the actual change in the product or offer field.",
    category: "Planning",
    generateLabel: "Generate notices",
    resultTitle: "Notice drafts",
    extraHint: "Take the notice down when it is no longer true.",
  },
];

export function getTool(slug: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function relatedTools(slug: ToolSlug, count = 3): ToolDefinition[] {
  const current = TOOLS.findIndex((tool) => tool.slug === slug);
  if (current === -1) return TOOLS.slice(0, count);
  const rest = [...TOOLS.slice(current + 1), ...TOOLS.slice(0, current)];
  return rest.slice(0, count);
}
