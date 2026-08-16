import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { buildContext, hashSeed, joinParagraphs, pick } from "@/lib/copy/engine";

export function generateEmailUpdates(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "email");
  const ctx = buildContext(values, seed);

  const subject = pick(
    [
      `A short update from ${ctx.name} in ${ctx.location}`,
      `${ctx.name}: a note about ${ctx.offer}`,
      `From ${ctx.name} — information, not a hard sell`,
    ],
    seed,
    2,
  );

  const customer = joinParagraphs(
    `Subject: ${subject}`,
    `Hello,`,
    `This is ${ctx.name}, ${ctx.aType} in ${ctx.location}. We are writing to people who already know the business.`,
    pick(
      [
        `The useful update is ${ctx.offer}. If that is not relevant, you can ignore this email.`,
        `We wanted to mention ${ctx.offer}. Please treat this as information. Confirm times, prices, and availability with us before you plan around them.`,
      ],
      seed,
      5,
    ),
    ctx.cta,
    `If you would rather not hear from us, say so and we will stop.`,
  );

  const short = joinParagraphs(
    `Subject: Update from ${ctx.name}`,
    `${ctx.name} in ${ctx.location}: ${ctx.offer}. ${ctx.cta}`,
  );

  const careful = joinParagraphs(
    `Subject: ${ctx.name} — please confirm before you travel`,
    `Hello from ${ctx.name}.`,
    `This email is only for people who asked for updates. It covers ${ctx.offer}.`,
    `We will not invent discounts, results, or awards in this note.`,
    ctx.cta,
  );

  return [
    {
      id: "customer",
      label: "Customer email",
      summary: "A full email for people who already expect to hear from you.",
      text: customer,
    },
    {
      id: "short",
      label: "Short email",
      summary: "A compact version for a quick send.",
      text: short,
    },
    {
      id: "careful",
      label: "Careful email",
      summary: "Extra caution on facts, consent, and what this is not.",
      text: careful,
    },
  ];
}
