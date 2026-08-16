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
