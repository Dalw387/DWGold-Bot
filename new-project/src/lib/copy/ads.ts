import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { buildContext, hashSeed, joinParagraphs, pick } from "@/lib/copy/engine";

function riskNote(ctx: { typeLower: string }): string {
  if (
    /trad|invest|gold|crypto|fx|forex|wealth|financ/.test(ctx.typeLower)
  ) {
    return "Paid ads for trading, investing, or financial education are often restricted. Do not promise profits, income, or “signals that work”. Add risk wording, and check Meta and Google policies before you spend.";
  }
  return "These are drafts. They do not place ads, spend money, or connect to an ads account.";
}

export function generateAdsCopy(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "ads");
  const ctx = buildContext(values, seed);
  const risk = riskNote(ctx);

  const facebookPrimary = joinParagraphs(
    pick(
      [
        `${ctx.name} is ${ctx.aType} in ${ctx.location}. This ad is about ${ctx.offer}.`,
        `If you are in or near ${ctx.location} and need ${ctx.aType}, this is ${ctx.name}.`,
      ],
      seed,
      3,
    ),
    `We will confirm details when you enquire. This ad is not a guarantee.`,
    ctx.cta,
    risk,
  );

  const facebookHeadlines = [
    `${ctx.name} in ${ctx.location}`,
    `${ctx.type} in ${ctx.location}`,
    `Ask about ${ctx.offer}`,
    `Local ${ctx.typeLower} — enquire`,
    `Serving ${ctx.location}`,
  ].join("\n");

  const googleHeadlines = [
    `${ctx.name} ${ctx.location}`,
    `${ctx.type} in ${ctx.location}`,
    `${ctx.offer}`,
    `Enquire with ${ctx.name}`,
    `${ctx.location} ${ctx.typeLower}`,
    `Talk to ${ctx.name}`,
    `Local ${ctx.typeLower} help`,
    `Confirm details first`,
  ];

  const googleDescriptions = [
    `${ctx.name} is ${ctx.aType} in ${ctx.location}. Ask about ${ctx.offer} before you visit.`,
    `Information first. Confirm times, cost, and whether we can help.`,
    ctx.cta,
  ];

  const structure = joinParagraphs(
    `Campaign structure (you still build this in Meta or Google):`,
    `Objective: enquiries or website visits — not vanity reach.`,
    `Geo: ${ctx.location} and a tight radius you actually serve.`,
    `Creative: one clear offer (${ctx.offer}), one action (${ctx.cta}).`,
    `Budget: set in the ads account. This studio will not invent a spend figure.`,
    `Measurement: log each real enquiry in the proof ledger. Do not count likes as customers.`,
    risk,
  );

  const googleKeywords = joinParagraphs(
    `Search themes (not a live keyword plan with volumes):`,
    `• ${ctx.typeLower} ${ctx.location}\n• ${ctx.offer} ${ctx.location}\n• ${ctx.name}\n• ${ctx.typeLower} near me — only if you can actually serve “near me”`,
    `Negatives to consider: jobs, wholesale, DIY, free, if those are not your work.`,
    `Google AdSense is different: it shows other people’s ads on your site. It does not get you customers. Use Google Ads (search and maps) when you want to advertise.`,
    risk,
  );

  return [
    {
      id: "fb-primary",
      label: "Facebook / Instagram primary text",
      summary: "Main ad text. Review before you paste it into Ads Manager.",
      text: facebookPrimary,
    },
    {
      id: "fb-headlines",
      label: "Facebook / Instagram headlines",
      summary: "Short lines for the headline field. One per line.",
      text: facebookHeadlines,
    },
    {
      id: "google-rsa",
      label: "Google Ads headlines and descriptions",
      summary: "Responsive search ad parts. Google will mix them. Keep every line true.",
      text: joinParagraphs(
        "Headlines:",
        googleHeadlines.map((line, index) => `${index + 1}. ${line}`).join("\n"),
        "Descriptions:",
        googleDescriptions.map((line, index) => `${index + 1}. ${line}`).join("\n"),
      ),
    },
    {
      id: "google-keywords",
      label: "Search themes and AdSense note",
      summary: "Where to start in Google Ads. AdSense is not an advertising campaign.",
      text: googleKeywords,
    },
    {
      id: "structure",
      label: "Campaign structure",
      summary: "How to set the campaign up. This does not publish or spend.",
      text: structure,
    },
  ];
}
