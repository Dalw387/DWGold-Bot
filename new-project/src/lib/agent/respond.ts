import { parseBrief } from "@/lib/agent/parse-brief";
import { TOOLS } from "@/lib/tools";
import type { GeneratorFormValues } from "@/lib/types";

export interface AgentTurn {
  reply: string;
  patch?: Partial<GeneratorFormValues>;
  goTo?: string;
}

function profileReady(profile: GeneratorFormValues): boolean {
  return (
    profile.businessName.length >= 2 &&
    profile.businessType.length >= 2 &&
    profile.location.length >= 2 &&
    profile.offer.length >= 2
  );
}

export function respondToMessage(
  message: string,
  profile: GeneratorFormValues,
): AgentTurn {
  const text = message.trim();
  const lower = text.toLowerCase();

  if (!text) {
    return {
      reply: "Write a short note about the business, such as the name, town, and what you offer.",
    };
  }

  if (/^(hi|hello|hey|help|what can you do)\b/.test(lower)) {
    return {
      reply:
        "I am the LocalLaunch house concierge. I run in your browser. I can fill the studio, open SEO or ads drafts, send you to House Operations, or explain Stripe checkout (Apple Pay, Google Pay, Link, and card). I will not invent leads.",
    };
  }

  if (
    /\b(apple pay|google pay|stripe|checkout|payment link)\b/.test(lower) ||
    (/\bpay\b/.test(lower) && !lower.includes("paypal"))
  ) {
    return {
      reply:
        "House Operations is paid in Stripe. When the Payment Link or Price is connected, Apple Pay, Google Pay, Link, and cards go straight to that Stripe account. I will take you to the pay page. The complimentary studio stays free.",
      goTo: "/pay",
    };
  }

  if (lower.includes("proof") || lower.includes("ledger") || lower.includes("leads") || lower.includes("results")) {
    return {
      reply:
        "The proof ledger only counts rows you type. That is how we prove work: real enquiries, not likes. I will open it.",
      goTo: "/proof",
    };
  }

  if (
    lower.includes("dw gold") ||
    lower.includes("gold trading") ||
    lower.includes("house agent") ||
    lower.includes("operations") ||
    lower.includes("run the house") ||
    lower.includes("facebook ads") ||
    lower.includes("google ads") ||
    lower.includes("adsense") ||
    lower.includes("seo")
  ) {
    if (lower.includes("adsense")) {
      return {
        reply:
          "Google AdSense pays you when other people’s ads show on your site. It does not get you customers. For getting noticed, use Google Ads and Meta ads drafts in House Operations. I will take you there.",
        goTo: "/operations",
      };
    }
    return {
      reply: profileReady(profile)
        ? "House Operations is the desk for SEO, Facebook/Instagram ads, Google Ads, social, and a measurement plan. The agents draft in this tab. They do not spend ad budget. I will open the desk."
        : "House Operations can run once we have a name, type, town, and offer. Load the DW Gold Trading trial on that page if this is the owner test, or tell me the business here.",
      goTo: "/operations",
    };
  }

  if (lower.includes("campaign") || lower.includes("full pack") || lower.includes("everything")) {
    return {
      reply: profileReady(profile)
        ? "The full campaign pack uses the same facts across social, email, SEO, and ads. Opening it now."
        : "I still need a name, type, town, and offer before I can open the campaign pack.",
      goTo: profileReady(profile) ? "/tools/campaign-pack" : undefined,
    };
  }

  if (
    lower.includes("which tool") ||
    lower.includes("what tool") ||
    TOOLS.some(
      (tool) =>
        lower.includes(tool.shortName.toLowerCase()) ||
        lower.includes(tool.slug.replaceAll("-", " ")),
    )
  ) {
    const match = TOOLS.find(
      (tool) =>
        lower.includes(tool.shortName.toLowerCase()) ||
        lower.includes(tool.slug.replaceAll("-", " ")),
    );
    if (match) {
      return {
        reply: `${match.name} is the right place for that. I can take you there now. Your details stay in this tab.`,
        goTo: `/tools/${match.slug}`,
      };
    }
  }

  if (lower.includes("generate") || lower.includes("write posts") || lower.includes("make drafts")) {
    if (profileReady(profile)) {
      return {
        reply:
          "Your details look complete enough to draft. Open Facebook Post Studio, or House Operations if you want SEO and ads as well.",
        goTo: "/tools/facebook-post-generator",
      };
    }
    return {
      reply:
        "I still need a name, type, town, and offer. You can type them here in one sentence, or use Fill example on the studio page.",
    };
  }

  const parsed = parseBrief(text);
  if (parsed.summary.length > 0) {
    return {
      reply: `I have taken this from what you wrote:\n${parsed.summary.map((line) => `• ${line}`).join("\n")}\n\nI will add it to the studio. Check it, then generate. I will not invent prices, reviews, awards, or leads.`,
      patch: parsed.patch,
    };
  }

  return {
    reply:
      "I could not read a name, place, or offer in that note. Try something like: “Harbour & Hearth is a cafe in Falmouth offering weekend brunch.” For the owner trial: “DW Gold Trading is gold trading education in Alfreton.”",
  };
}
