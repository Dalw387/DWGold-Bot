import type { ToolSlug } from "@/lib/types";

export interface ToolDefinition {
  slug: ToolSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: "Social" | "Listings" | "Planning" | "Website" | "Growth" | "Customers";
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
    tagline: "Public homepage, about, and a footer line.",
    description:
      "Plain website wording a stranger can read without logging in, plus about and footer lines. No fake awards or visitor numbers.",
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
  {
    slug: "email-update",
    name: "Customer email",
    shortName: "Email",
    tagline: "Updates for people who already asked to hear from you.",
    description:
      "Draft a customer email from the same facts as the rest of the studio. Use it only with people who expect to hear from you.",
    category: "Social",
    generateLabel: "Generate emails",
    resultTitle: "Email drafts",
    extraHint: "Do not paste this into a bought list.",
  },
  {
    slug: "review-reply",
    name: "Review replies",
    shortName: "Replies",
    tagline: "Thank-you, mixed, and concern replies.",
    description:
      "Public replies that stay calm and do not invent extra praise, excuses, or offers. Take the detail of a complaint into a private message.",
    category: "Social",
    generateLabel: "Generate replies",
    resultTitle: "Review reply drafts",
    extraHint: "Match the reply to the actual review. Do not argue in public.",
  },
  {
    slug: "ads-copy",
    name: "Ads copy desk",
    shortName: "Ads",
    tagline: "Facebook, Instagram, and Google Ads drafts.",
    description:
      "Headlines, primary text, and a campaign structure you can paste into Ads Manager or Google Ads. This does not spend money or publish ads.",
    category: "Growth",
    generateLabel: "Generate ads drafts",
    resultTitle: "Ads drafts",
    extraHint:
      "Google AdSense is not the same as Google Ads. AdSense shows other people’s ads on your site. Google Ads is what you pay to reach customers.",
  },
  {
    slug: "seo-brief",
    name: "Local SEO brief",
    shortName: "SEO",
    tagline: "Titles, themes, listing checklist, page brief.",
    description:
      "A local search starting pack from your name, type, and town. It does not promise rankings and it does not log into Google for you.",
    category: "Growth",
    generateLabel: "Generate SEO brief",
    resultTitle: "SEO drafts",
    extraHint: "Publish the changes on your own site and listing, then wait. Do not buy fake links or reviews.",
  },
  {
    slug: "campaign-pack",
    name: "Full campaign pack",
    shortName: "Pack",
    tagline: "One draft from each room, in a single download.",
    description:
      "A house pack: social, listing, email, website, SEO, and ads starting points from the same facts. Use it to brief a week of work.",
    category: "Growth",
    generateLabel: "Build the full pack",
    resultTitle: "Campaign pack",
    extraHint: "This is a lot of text. Edit the lines you will actually use. Leave the rest.",
  },
  {
    slug: "referral-ask",
    name: "Referral ask",
    shortName: "Referrals",
    tagline: "Ask a happy customer to send one real neighbour.",
    description:
      "Private message, public note, and a short after-the-job line. Only send to people you actually helped. This is how local books fill: one name at a time.",
    category: "Customers",
    generateLabel: "Generate referral asks",
    resultTitle: "Referral drafts",
    extraHint: "Never pay for fake referrals or reviews.",
  },
  {
    slug: "follow-up",
    name: "Follow-up desk",
    shortName: "Follow-up",
    tagline: "Quiet follow-ups for enquiries, visits, and noes.",
    description:
      "People who asked and went quiet still become customers if you follow up once, calmly. These drafts do not chase, invent discounts, or guilt anyone.",
    category: "Customers",
    generateLabel: "Generate follow-ups",
    resultTitle: "Follow-up drafts",
    extraHint: "One follow-up is enough. Then stop.",
  },
  {
    slug: "window-card",
    name: "Window card and flyer",
    shortName: "Print",
    tagline: "Window, A5 flyer, and counter card from the same facts.",
    description:
      "Passers-by cannot click a post. Give them a true card in the window, on the counter, or on a small flyer. Add your own phone number or URL before you print.",
    category: "Customers",
    generateLabel: "Generate print copy",
    resultTitle: "Print drafts",
    extraHint: "Take printed notices down when they are no longer true.",
  },
  {
    slug: "phone-script",
    name: "Phone and voicemail",
    shortName: "Phone",
    tagline: "Pick-up line, voicemail, and missed-call text.",
    description:
      "The first voice a customer hears is still the business. These scripts keep it clear and human. Add your real number yourself.",
    category: "Customers",
    generateLabel: "Generate phone scripts",
    resultTitle: "Phone drafts",
    extraHint: "Only text a missed call if they rang you.",
  },
  {
    slug: "neighbour-intro",
    name: "Neighbour introduction",
    shortName: "Neighbours",
    tagline: "Introduce yourself to nearby businesses and local groups.",
    description:
      "Other local businesses already speak to your customers. A calm introduction can start genuine referrals. Do not spam groups you do not belong to.",
    category: "Customers",
    generateLabel: "Generate introductions",
    resultTitle: "Introduction drafts",
    extraHint: "One neighbouring business this week is enough.",
  },
  {
    slug: "customer-plan",
    name: "14-day customer plan",
    shortName: "14 days",
    tagline: "A fortnight of actions that can bring real enquiries.",
    description:
      "What to do for two weeks so strangers can find you, ask, and get a reply. It is a work plan, not a promise of a full diary.",
    category: "Customers",
    generateLabel: "Build the 14-day plan",
    resultTitle: "Customer-getting plan",
    extraHint: "Log real enquiries as you go. Zero is still a true week.",
  },
  {
    slug: "enquiry-reply",
    name: "Enquiry reply",
    shortName: "First reply",
    tagline: "Win the job in the first message, without inventing a price.",
    description:
      "Most local work is won or lost in the first reply. These drafts answer fast, repeat what they asked, and make the next step small and true.",
    category: "Customers",
    generateLabel: "Generate enquiry replies",
    resultTitle: "Enquiry reply drafts",
    extraHint: "Do not paste a price you have not calculated.",
  },
  {
    slug: "after-job",
    name: "After the job",
    shortName: "After-job",
    tagline: "Thank-you, honest review ask, and a same-day referral.",
    description:
      "The cheapest new customer is often the next one after a job well done. Thank them, invite a true review, and ask for one neighbour who actually needs the work.",
    category: "Customers",
    generateLabel: "Generate after-job notes",
    resultTitle: "After-job drafts",
    extraHint: "Never pay for a five-star review.",
  },
  {
    slug: "quiet-week",
    name: "Quiet week fill",
    shortName: "Quiet week",
    tagline: "Honest ways to fill a quiet diary. No fake last slots.",
    description:
      "When the phone is quiet, most businesses boost a post. This room writes a true ‘we have space’ note, a message for existing customers, and a seven-step work list.",
    category: "Customers",
    generateLabel: "Generate quiet-week drafts",
    resultTitle: "Quiet-week drafts",
    extraHint: "Do the work list before you spend on ads.",
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
