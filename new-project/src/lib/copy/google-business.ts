import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { buildContext, hashSeed, joinParagraphs, pick } from "@/lib/copy/engine";

export function generateGoogleBusinessPosts(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "google");
  const ctx = buildContext(values, seed);

  const update = joinParagraphs(
    `Update from ${ctx.name} in ${ctx.location}.`,
    `We are ${ctx.aType} and can provide information about ${ctx.offer}. Please confirm current details with us, as listing posts can go out of date.`,
    ctx.cta,
  );

  const offer = joinParagraphs(
    `${ctx.offer} — a note from ${ctx.name}.`,
    pick(
      [
        `This is a general announcement, not a limited-time claim unless we have confirmed one with you separately.`,
        `Ask us about suitability, timing, and cost before you visit.`,
      ],
      seed,
      4,
    ),
    ctx.cta,
  );

  const event = joinParagraphs(
    `${ctx.name} (${ctx.location})`,
    `If you are planning a visit to discuss ${ctx.offer}, contact us first so we can confirm whether we can help that day.`,
    `We will not list a date or time here unless you have given us one to publish.`,
    ctx.cta,
  );

  return [
    {
      id: "update",
      label: "What’s new",
      summary: "A short Google Business Profile update.",
      text: update,
    },
    {
      id: "offer",
      label: "Offer note",
      summary: "Keeps the wording cautious so it does not invent a promotion.",
      text: offer,
    },
    {
      id: "visit",
      label: "Visit reminder",
      summary: "Encourages people to confirm before they travel.",
      text: event,
    },
  ];
}
