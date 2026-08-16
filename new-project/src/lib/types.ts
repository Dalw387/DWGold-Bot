export const TONES = [
  "friendly",
  "professional",
  "energetic",
  "informative",
] as const;

export type Tone = (typeof TONES)[number];

export const TONE_LABELS: Record<Tone, string> = {
  friendly: "Friendly",
  professional: "Professional",
  energetic: "Energetic",
  informative: "Informative",
};

export const TONE_HINTS: Record<Tone, string> = {
  friendly: "Warm and neighbourly",
  professional: "Calm and businesslike",
  energetic: "Upbeat without hype",
  informative: "Clear and practical",
};

export interface GeneratorFormValues {
  businessName: string;
  businessType: string;
  location: string;
  offer: string;
  tone: Tone;
  callToAction: string;
}

export interface FieldErrors {
  businessName?: string;
  businessType?: string;
  location?: string;
  offer?: string;
  tone?: string;
  callToAction?: string;
}

export interface GeneratedPost {
  id: "neighbourhood" | "offer" | "helpful";
  label: string;
  summary: string;
  text: string;
}
