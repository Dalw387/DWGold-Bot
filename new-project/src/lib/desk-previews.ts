import { DEFAULT_FACEBOOK_STYLES, type GeneratorFormValues, type ToolSlug } from "@/lib/types";
import { workforceAgents } from "@/lib/workforce";

function profile(
  businessName: string,
  businessType: string,
  location: string,
  offer: string,
  callToAction: string,
  tone: GeneratorFormValues["tone"] = "professional",
): GeneratorFormValues {
  return {
    businessName,
    businessType,
    location,
    offer,
    tone,
    callToAction,
    length: "standard",
    includeHashtags: false,
    facebookStyles: [...DEFAULT_FACEBOOK_STYLES],
  };
}

const samples = {
  roof: profile(
    "Ridge & Rain",
    "roofing",
    "Manchester",
    "roof repairs, new roofs, and gutter work for homes in Greater Manchester",
    "Call or message for a quote",
  ),
  clinic: profile(
    "Elm Dental",
    "dental practice",
    "Leeds",
    "check-ups, hygienist visits, and cosmetic dentistry by appointment",
    "Book a consultation",
  ),
  agency: profile(
    "Harbour & Field",
    "estate agency",
    "Bristol",
    "sales and lettings for homes in Bristol and North Somerset",
    "Book a valuation or viewing",
  ),
  build: profile(
    "Ash & Lime",
    "building and home improvement",
    "Nottingham",
    "extensions, kitchens, and repairs for local homes",
    "Message for a site visit",
  ),
  legal: profile(
    "Hart & Vale",
    "solicitors",
    "York",
    "residential conveyancing and wills by appointment",
    "Enquire to book a consultation",
  ),
  cafe: profile(
    "Harbour & Hearth",
    "cafe",
    "Falmouth",
    "weekend brunch plates and filter coffee",
    "Message us to ask what is on this weekend",
    "friendly",
  ),
};

export type DeskPreview = {
  name: string;
  title: string;
  deskHref: string;
  tools: ToolSlug[];
  sample: GeneratorFormValues;
  sampleNote: string;
};

const bySlug: Record<string, DeskPreview> = {
  "ai-lead-generation-agent": {
    name: "Alex",
    title: "Lead Agent",
    deskHref: "/tools/customer-plan",
    tools: ["customer-plan", "referral-ask"],
    sample: samples.roof,
    sampleNote: "Demonstration copy for a Manchester roofing firm. After you pay, Alex writes this pack from your facts.",
  },
  "ai-google-ads-agent": {
    name: "Max",
    title: "Ads Agent",
    deskHref: "/tools/ads-copy",
    tools: ["ads-copy"],
    sample: samples.clinic,
    sampleNote: "Demonstration Google Ads lines for a Leeds clinic. Max drafts. You paste. You hold the budget.",
  },
  "ai-meta-ads-agent": {
    name: "Mia",
    title: "Meta Ads",
    deskHref: "/tools/ads-copy",
    tools: ["ads-copy"],
    sample: samples.agency,
    sampleNote: "Demonstration Meta ads copy for a Bristol estate agency. Mia does not log into Ads Manager.",
  },
  "ai-social-media-agent": {
    name: "Sophie",
    title: "Social Agent",
    deskHref: "/tools/facebook-post-generator",
    tools: ["facebook-post-generator", "instagram-captions"],
    sample: samples.cafe,
    sampleNote: "Demonstration social drafts for a Falmouth cafe. Sophie writes. You still publish.",
  },
  "ai-appointment-setter": {
    name: "Charlie",
    title: "Appointment Agent",
    deskHref: "/tools/enquiry-reply",
    tools: ["enquiry-reply", "phone-script"],
    sample: samples.roof,
    sampleNote: "Demonstration first-reply pack. Charlie does not sit on the live phone.",
  },
  "ai-customer-service-agent": {
    name: "Grace",
    title: "Customer Agent",
    deskHref: "/tools/google-review-desk",
    tools: ["google-review-desk", "off-hours"],
    sample: samples.build,
    sampleNote: "Demonstration review ask and missed-call text. You send them from your own phone.",
  },
  "ai-search-visibility-agent": {
    name: "Scout",
    title: "Search Agent",
    deskHref: "/tools/seo-brief",
    tools: ["website-blurb", "seo-brief"],
    sample: samples.legal,
    sampleNote: "Demonstration public page and search brief. Scout does not promise a ranking or ChatGPT mention.",
  },
  "ai-marketing-team": {
    name: "The house",
    title: "Full AI team",
    deskHref: "/tools/customer-plan",
    tools: ["customer-plan", "enquiry-reply"],
    sample: samples.agency,
    sampleNote: "The department writes from one set of facts. This sample is a Bristol estate agency, labelled as a demonstration.",
  },
  "ai-marketing-for-roofers": {
    name: "Alex + Charlie",
    title: "Trades desk",
    deskHref: "/tools/enquiry-reply",
    tools: ["enquiry-reply", "google-review-desk"],
    sample: samples.roof,
    sampleNote: "For roofers: the first reply and the Google review ask. Same desks you unlock after £197.",
  },
  "ai-marketing-for-dentists": {
    name: "Charlie + Max",
    title: "Clinic desk",
    deskHref: "/tools/enquiry-reply",
    tools: ["enquiry-reply", "ads-copy"],
    sample: samples.clinic,
    sampleNote: "For clinics: the booking reply and ads copy pointed at a page that can take an enquiry.",
  },
  "ai-marketing-for-estate-agents": {
    name: "Sophie + Charlie",
    title: "Agency desk",
    deskHref: "/tools/facebook-post-generator",
    tools: ["facebook-post-generator", "enquiry-reply"],
    sample: samples.agency,
    sampleNote: "For estate agents: listing-style posts and the reply that turns an enquiry into a viewing.",
  },
  "ai-marketing-for-builders": {
    name: "Alex + Grace",
    title: "Builders desk",
    deskHref: "/tools/customer-plan",
    tools: ["customer-plan", "neighbour-intro"],
    sample: samples.build,
    sampleNote: "For builders: a 14-day plan and a neighbour introduction. Not a scraped list of strangers.",
  },
  "ai-marketing-for-solicitors": {
    name: "Scout + Charlie",
    title: "Professional desk",
    deskHref: "/tools/seo-brief",
    tools: ["website-blurb", "enquiry-reply"],
    sample: samples.legal,
    sampleNote: "For legal and financial firms: a public page a stranger can read, and a cautious first reply.",
  },
};

export function deskPreviewForSlug(slug: string): DeskPreview | undefined {
  return bySlug[slug];
}

export function workforceDeskHref(slug: string): string | undefined {
  return workforceAgents.find((agent) => agent.slug === slug)?.deskHref;
}
