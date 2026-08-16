import { applyBrief, parseBrief } from "@/lib/agent/parse-brief";
import { generateFacebookPosts } from "@/lib/copy/facebook";
import { generatePublicHomepage } from "@/lib/copy/public-site";
import { generateSeoBriefs } from "@/lib/copy/seo";
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

function liveSketch(profile: GeneratorFormValues): string {
  const facebook = generateFacebookPosts({
    ...profile,
    facebookStyles: ["short"],
    length: "short",
  })[0];
  const site = generatePublicHomepage(profile)[0];
  const seo = generateSeoBriefs(profile)[0];
  const parts = [
    facebook ? `Facebook sketch\n${facebook.text}` : "",
    site ? `Public homepage sketch\n${site.text}` : "",
    seo ? `Search title\n${seo.text}` : "",
  ].filter(Boolean);
  return `\n\n${parts.join("\n\n")}`;
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
        "I am the LocalLaunch house concierge. I run in your browser. Tell me the business and I will sketch a public homepage and a Facebook line here. I can also open House Operations, the proof ledger, or Stripe checkout. I will not invent leads.",
    };
  }

  if (
    /\b(apple pay|google pay|stripe|checkout|payment link)\b/.test(lower) ||
    (/\bpay\b/.test(lower) && !lower.includes("paypal"))
  ) {
    return {
      reply:
        "House Operations is £197 one-off. You pay on Stripe with Apple Pay, Google Pay, Link, or a card. After payment, this browser unlocks the platform. The money goes to the LocalLaunch Stripe account. I will take you to the pay page.",
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
    lower.includes("gold trading")
  ) {
    return {
      reply:
        "I will open House Operations on the DW Gold Trading owner trial. The public site currently greets people with a login wall — the SEO agent will draft a page strangers can actually read. Do not promise trading profits. Log only real enquiries.",
      goTo: "/operations?trial=gold&run=1",
    };
  }

  if (
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
        ? `House Operations is the desk for SEO, ads, social, replies, and a measurement plan.${liveSketch(profile)}\n\nI will open the desk. The agents draft in this tab. They do not spend ad budget.`
        : "House Operations can run once we have a name, type, town, and offer. Load the DW Gold Trading trial on that page if this is the owner test, or tell me the business here.",
      goTo: "/operations",
    };
  }

  if (lower.includes("campaign") || lower.includes("full pack") || lower.includes("everything")) {
    return {
      reply: profileReady(profile)
        ? `The full campaign pack uses the same facts across a public homepage, social, email, SEO, and ads.${liveSketch(profile)}`
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

  if (lower.includes("generate") || lower.includes("write posts") || lower.includes("make drafts") || lower.includes("sketch")) {
    if (profileReady(profile)) {
      return {
        reply: `Here is a live sketch from the details in this tab.${liveSketch(profile)}\n\nOpen House Operations for the full SEO and ads desk, or Facebook Post Studio for more social styles.`,
        goTo: "/operations",
      };
    }
    return {
      reply:
        "I still need a name, type, town, and offer. You can type them here in one sentence, or use Fill example on the studio page.",
    };
  }

  const parsed = parseBrief(text);
  if (parsed.summary.length > 0) {
    const next = applyBrief(profile, parsed.patch);
    const sketch = profileReady(next) ? liveSketch(next) : "";
    return {
      reply: `I have taken this from what you wrote:\n${parsed.summary.map((line) => `• ${line}`).join("\n")}${sketch}\n\nI will add it to the studio. Check it, then generate. I will not invent prices, reviews, awards, or leads.`,
      patch: parsed.patch,
    };
  }

  return {
    reply:
      "I could not read a name, place, or offer in that note. Try something like: “Harbour & Hearth is a cafe in Falmouth offering weekend brunch.” For the owner trial: “DW Gold Trading is gold trading education in Alfreton.”",
  };
}
