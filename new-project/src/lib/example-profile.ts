import { DEFAULT_FACEBOOK_STYLES, type GeneratorFormValues } from "@/lib/types";

export const EXAMPLE_PROFILE: GeneratorFormValues = {
  businessName: "Harbour & Hearth",
  businessType: "cafe",
  location: "Falmouth",
  offer: "weekend brunch plates and filter coffee",
  tone: "friendly",
  callToAction: "Message us to ask what is on this weekend",
  length: "standard",
  includeHashtags: true,
  facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
};

/**
 * Owner trial for DW Gold Trading Ltd (Companies House 17131549).
 * Only public, cautious facts. Education SIC, not a brokerage claim.
 * Website exists at dwgoldtrading.com; the public homepage is currently a login wall.
 */
export const DW_GOLD_TRIAL: GeneratorFormValues = {
  businessName: "DW Gold Trading",
  businessType: "gold trading education",
  location: "Alfreton, Derbyshire",
  offer:
    "education and market insight for people who want to learn about gold trading",
  tone: "professional",
  callToAction: "Enquire to ask what teaching is currently available",
  length: "standard",
  includeHashtags: false,
  facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
};

export const DW_GOLD_TRIAL_NOTES = {
  companyNumber: "17131549",
  website: "https://www.dwgoldtrading.com",
  sic: "85590 — Other education not elsewhere classified",
  caution:
    "This is an owner trial, not a customer case study. Do not promise trading profits. Paid ads for financial education are often restricted. Log only real enquiries in the proof ledger.",
};
