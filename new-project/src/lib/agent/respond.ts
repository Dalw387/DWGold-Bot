import { parseBrief } from "@/lib/agent/parse-brief";
import { TOOLS } from "@/lib/tools";
import type { GeneratorFormValues } from "@/lib/types";

export interface AgentTurn {
  reply: string;
  patch?: Partial<GeneratorFormValues>;
  goTo?: string;
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

  if (
    /^(hi|hello|hey|help|what can you do)\b/.test(lower)
  ) {
    return {
      reply:
        "I am the LocalLaunch studio assistant. I run in your browser and do not call a paid AI model. Tell me the business in a sentence, or ask me which tool to use.",
    };
  }

  if (lower.includes("which tool") || lower.includes("what tool") || lower.includes("instagram") || lower.includes("whatsapp") || lower.includes("google") || lower.includes("review") || lower.includes("website") || lower.includes("notice") || lower.includes("plan")) {
    const match = TOOLS.find((tool) => lower.includes(tool.shortName.toLowerCase()) || lower.includes(tool.slug.replaceAll("-", " ")));
    if (match) {
      return {
        reply: `${match.name} is the right place for that. I can take you there now. Your details stay in this tab.`,
        goTo: `/tools/${match.slug}`,
      };
    }
    return {
      reply:
        "Use Facebook Post Studio for social updates, Instagram Captions for shorter lines, Google Business posts for your listing, WhatsApp for people who already know you, and the seven-day plan if you want a week of starting points.",
    };
  }

  if (lower.includes("generate") || lower.includes("write posts") || lower.includes("make drafts")) {
    const ready =
      profile.businessName.length >= 2 &&
      profile.businessType.length >= 2 &&
      profile.location.length >= 2 &&
      profile.offer.length >= 2;
    if (ready) {
      return {
        reply:
          "Your details look complete enough to draft. Open Facebook Post Studio and the live sketch will write as you go, or press generate for the full pack.",
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
      reply: `I have taken this from what you wrote:\n${parsed.summary.map((line) => `• ${line}`).join("\n")}\n\nI will add it to the studio. Check it, then generate. I will not invent prices, reviews, or awards.`,
      patch: parsed.patch,
    };
  }

  return {
    reply:
      "I could not read a name, place, or offer in that note. Try something like: “Harbour & Hearth is a cafe in Falmouth offering weekend brunch.”",
  };
}
