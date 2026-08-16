import { generateAdsCopy } from "@/lib/copy/ads";
import { generateContentPlan } from "@/lib/copy/content-plan";
import { generateCustomerPlan } from "@/lib/copy/outreach";
import { generatePublicHomepage } from "@/lib/copy/public-site";
import { generateSeoBriefs } from "@/lib/copy/seo";
import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";

export const OPERATION_AGENTS = [
  {
    id: "seo",
    name: "SEO agent",
    short: "Search",
    summary:
      "Public homepage (no login), local titles, search themes, and a Google Business checklist.",
  },
  {
    id: "facebook-ads",
    name: "Facebook ads agent",
    short: "Meta",
    summary:
      "Primary text, headlines, and a campaign structure for Facebook and Instagram ads.",
  },
  {
    id: "google-ads",
    name: "Google Ads agent",
    short: "Search ads",
    summary:
      "Responsive search ad lines and keyword themes. Not AdSense.",
  },
  {
    id: "social",
    name: "Social agent",
    short: "Social",
    summary: "A seven-day set of starting posts from the same facts.",
  },
  {
    id: "measurement",
    name: "Proof agent",
    short: "Proof",
    summary:
      "A measurement plan: what to log, so later you can show real enquiries instead of likes.",
  },
  {
    id: "customers",
    name: "Customers agent",
    short: "Customers",
    summary:
      "A 14-day plan and a daily habit for getting real enquiries, not likes.",
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
    default: {
      const exhaustive: never = agentId;
      throw new Error(`Unknown agent: ${exhaustive}`);
    }
  }
}
