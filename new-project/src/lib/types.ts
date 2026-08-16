export const TONES = [
  "friendly",
  "professional",
  "energetic",
  "informative",
  "reassuring",
] as const;

export type Tone = (typeof TONES)[number];

export const TONE_LABELS: Record<Tone, string> = {
  friendly: "Friendly",
  professional: "Professional",
  energetic: "Energetic",
  informative: "Informative",
  reassuring: "Reassuring",
};

export const TONE_HINTS: Record<Tone, string> = {
  friendly: "Warm and neighbourly",
  professional: "Calm and businesslike",
  energetic: "Upbeat without hype",
  informative: "Clear and practical",
  reassuring: "Steady and careful",
};

export const POST_LENGTHS = ["short", "standard", "long"] as const;
export type PostLength = (typeof POST_LENGTHS)[number];

export const POST_LENGTH_LABELS: Record<PostLength, string> = {
  short: "Short",
  standard: "Standard",
  long: "Longer",
};

export const FACEBOOK_STYLES = [
  "neighbourhood",
  "offer",
  "helpful",
  "question",
  "behind-the-scenes",
  "reminder",
  "education",
  "short",
] as const;

export type FacebookStyleId = (typeof FACEBOOK_STYLES)[number];

export const FACEBOOK_STYLE_META: Record<
  FacebookStyleId,
  { label: string; summary: string }
> = {
  neighbourhood: {
    label: "Neighbourhood update",
    summary: "A local note for people in the area.",
  },
  offer: {
    label: "Offer update",
    summary: "A direct post about the product or service.",
  },
  helpful: {
    label: "Helpful introduction",
    summary: "Who you are and how to enquire.",
  },
  question: {
    label: "Community question",
    summary: "Invites a reply without fishing for fake praise.",
  },
  "behind-the-scenes": {
    label: "Behind the scenes",
    summary: "A quieter look at the work, without invented stories.",
  },
  reminder: {
    label: "Gentle reminder",
    summary: "A follow-up style note for people who already know you.",
  },
  education: {
    label: "Useful explainer",
    summary: "A short educational post tied to what you offer.",
  },
  short: {
    label: "Short and punchy",
    summary: "A compact update for a quick scroll.",
  },
};

export const DEFAULT_FACEBOOK_STYLES: FacebookStyleId[] = [
  "neighbourhood",
  "offer",
  "helpful",
  "question",
  "education",
  "short",
];

export type ToolSlug =
  | "facebook-post-generator"
  | "instagram-captions"
  | "google-business-post"
  | "whatsapp-message"
  | "content-plan"
  | "review-request"
  | "website-blurb"
  | "notice"
  | "email-update"
  | "review-reply"
  | "ads-copy"
  | "seo-brief"
  | "campaign-pack"
  | "referral-ask"
  | "follow-up"
  | "window-card"
  | "phone-script"
  | "neighbour-intro"
  | "customer-plan"
  | "enquiry-reply"
  | "after-job"
  | "quiet-week";

export interface GeneratorFormValues {
  businessName: string;
  businessType: string;
  location: string;
  offer: string;
  tone: Tone;
  callToAction: string;
  length: PostLength;
  includeHashtags: boolean;
  facebookStyles: FacebookStyleId[];
}

export interface FieldErrors {
  businessName?: string;
  businessType?: string;
  location?: string;
  offer?: string;
  tone?: string;
  callToAction?: string;
  facebookStyles?: string;
}

export interface GeneratedPost {
  id: string;
  label: string;
  summary: string;
  text: string;
}

export const emptyGeneratorValues: GeneratorFormValues = {
  businessName: "",
  businessType: "",
  location: "",
  offer: "",
  tone: "friendly",
  callToAction: "",
  length: "standard",
  includeHashtags: false,
  facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
};
