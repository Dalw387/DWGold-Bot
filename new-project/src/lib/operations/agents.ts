import { generateAdsCopy } from "@/lib/copy/ads";
import { generateContentPlan } from "@/lib/copy/content-plan";
import {
  generateAfterJob,
  generateCustomerPlan,
  generateEnquiryReplies,
  generateFollowUps,
  generateGoogleReviewDesk,
  generateOffHours,
  generateQuietWeek,
} from "@/lib/copy/outreach";
import { generateReviewReplies } from "@/lib/copy/review-reply";
import { generatePublicHomepage } from "@/lib/copy/public-site";
import { generateSeoBriefs } from "@/lib/copy/seo";
import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";

export const OPERATION_AGENTS = [
  {
    id: "seo",
    persona: "Scout",
    name: "Scout — Search desk",
    short: "Scout",
    summary:
      "Public homepage (no login), local titles, search themes, and a Google Business checklist. Does not rank you in ChatGPT.",
  },
  {
    id: "facebook-ads",
    persona: "Mia",
    name: "Mia — Meta ads desk",
    short: "Mia",
    summary:
      "Primary text, headlines, and a campaign structure for Facebook and Instagram ads. You still build the campaign in Meta.",
  },
  {
    id: "google-ads",
    persona: "Max",
    name: "Max — Google Ads desk",
    short: "Max",
    summary:
      "Responsive search ad lines and keyword themes. This is Google Ads, not AdSense. Max does not spend budget.",
  },
  {
    id: "social",
    persona: "Sophie",
    name: "Sophie — Social desk",
    short: "Sophie",
    summary: "A seven-day set of starting posts from the same facts. Sophie does not publish or watch DMs.",
  },
  {
    id: "measurement",
    persona: "Quinn",
    name: "Quinn — Proof desk",
    short: "Quinn",
    summary:
      "A measurement plan: what to log, so later you can show real enquiries instead of likes.",
  },
  {
    id: "customers",
    persona: "Alex",
    name: "Alex — Lead desk",
    short: "Alex",
    summary:
      "A 14-day plan and a daily habit for getting real enquiries, not likes. Alex does not scrape leads.",
  },
  {
    id: "replies",
    persona: "Charlie",
    name: "Charlie — Appointment desk",
    short: "Charlie",
    summary:
      "First reply to an enquiry, after-the-job thank you, and a calm way to fill a quiet week. Charlie does not answer the live phone.",
  },
  {
    id: "reviews",
    persona: "Grace",
    name: "Grace — Front desk",
    short: "Grace",
    summary:
      "Google review SMS and email after the job, how to copy the review link, calm replies, and the missed-call texts. You still send them.",
  },
] as const;

export type OperationAgentId = (typeof OPERATION_AGENTS)[number]["id"];

export function runOperationAgent(
  agentId: OperationAgentId,
  values: GeneratorFormValues,
): GeneratedPost[] {
  switch (agentId) {
    case "seo":
      return [...generatePublicHomepage(values), ...generateSeoBriefs(values)];
    case "facebook-ads":
      return generateAdsCopy(values).filter((post) =>
        post.id.startsWith("fb") || post.id === "structure",
      );
    case "google-ads":
      return generateAdsCopy(values).filter((post) =>
        post.id.startsWith("google") || post.id === "structure",
      );
    case "social":
      return generateContentPlan(values);
    case "measurement":
      return [
        {
          id: "measure",
          label: "What to log this week",
          summary: "Proof only counts if you write down real people, not reach.",
          text: [
            `Measurement plan for ${values.businessName} in ${values.location}.`,
            "Log in the proof ledger, by hand, each time it actually happens:",
            "• Website enquiry or form",
            "• Facebook or Instagram message that asks a real question",
            "• Google call or message from the listing",
            "• Phone call or visit you can name",
            "• A sale — only when money actually changed hands",
            "Do not log likes, views, or impressions as customers.",
            "Do not add numbers you hope will happen.",
            `Offer being advertised: ${values.offer}.`,
            "If a week ends with zero rows, that is still a true result. Change the draft, the targeting, or the page — then log the next real enquiry.",
          ].join("\n\n"),
        },
      ];
    case "customers":
      return generateCustomerPlan(values);
    case "replies":
      return [
        ...generateEnquiryReplies(values),
        ...generateFollowUps(values).slice(0, 1),
        ...generateAfterJob(values),
        ...generateQuietWeek(values).slice(0, 1),
      ];
    case "reviews":
      return [
        ...generateGoogleReviewDesk(values),
        ...generateReviewReplies(values),
        ...generateOffHours(values).slice(0, 2),
      ];
    default: {
      const exhaustive: never = agentId;
      throw new Error(`Unknown agent: ${exhaustive}`);
    }
  }
}
