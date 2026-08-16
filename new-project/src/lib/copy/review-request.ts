import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { buildContext, hashSeed, joinParagraphs, pick } from "@/lib/copy/engine";

export function generateReviewRequests(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "review");
  const ctx = buildContext(values, seed);

  const polite = joinParagraphs(
    `Hello from ${ctx.name} in ${ctx.location}.`,
    pick(
      [
        `If we have already helped you with ${ctx.offer}, and you have time, an honest review on the platform you actually use would help other local people. There is no need to write anything glowing if that is not how you feel.`,
        `Only if it feels fair: you can leave a review based on your real experience of ${ctx.name}. Please do not invent details, and ignore this if you would rather not.`,
      ],
      seed,
      2,
    ),
    `Thank you for considering it. ${ctx.cta}`,
  );

  const aftercare = joinParagraphs(
    `From ${ctx.name}.`,
    `If something was not right about ${ctx.offer}, we would rather hear that directly so we can try to put it right. If you were satisfied, a public review is optional.`,
    ctx.cta,
  );

  const short = `If you recently used ${ctx.name} in ${ctx.location} for ${ctx.offer}, an honest review is welcome. No pressure, and please only write what is true.`;

  return [
    {
      id: "polite",
      label: "Polite request",
      summary: "Asks for an honest review and makes it easy to say no.",
      text: polite,
    },
    {
      id: "aftercare",
      label: "Aftercare first",
      summary: "Invites private feedback if something went wrong.",
      text: aftercare,
    },
    {
      id: "short",
      label: "Short request",
      summary: "A single-paragraph version.",
      text: short,
    },
  ];
}
