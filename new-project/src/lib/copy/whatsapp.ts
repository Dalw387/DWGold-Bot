import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { buildContext, hashSeed, joinParagraphs, pick } from "@/lib/copy/engine";

export function generateWhatsAppMessages(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "whatsapp");
  const ctx = buildContext(values, seed);

  const short = `${ctx.name} here in ${ctx.location}. A quick note about ${ctx.offer}. ${ctx.cta}`;

  const standard = joinParagraphs(
    `Hello, this is ${ctx.name} (${ctx.aType} in ${ctx.location}).`,
    pick(
      [
        `We wanted to share an update about ${ctx.offer}. If this is not relevant, you can ignore the message.`,
        `You are receiving this as someone who already knows the business. It is about ${ctx.offer}.`,
      ],
      seed,
      3,
    ),
    ctx.cta,
  );

  const careful = joinParagraphs(
    `A careful message from ${ctx.name}.`,
    `This is not an automated blast from a bought list. Use it only with people who have asked to hear from you.`,
    `The update: ${ctx.offer}.`,
    ctx.cta,
  );

  return [
    {
      id: "short",
      label: "Short message",
      summary: "A few lines for people who already know you.",
      text: short,
    },
    {
      id: "standard",
      label: "Standard message",
      summary: "A clearer WhatsApp note with context.",
      text: standard,
    },
    {
      id: "careful",
      label: "Permission reminder",
      summary: "Includes a prompt to only message people who expect to hear from you.",
      text: careful,
    },
  ];
}
