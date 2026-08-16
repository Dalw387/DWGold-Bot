import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { buildContext, hashSeed, joinParagraphs } from "@/lib/copy/engine";

export function generateNotices(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "notice");
  const ctx = buildContext(values, seed);

  const windowNotice = joinParagraphs(
    ctx.name.toUpperCase(),
    `${ctx.aType} in ${ctx.location}`.replace(/^./, (letter) => letter.toUpperCase()),
    ctx.offer,
    ctx.cta,
    "Please check with us if this notice might be out of date.",
  );

  const facebook = joinParagraphs(
    `Notice from ${ctx.name} in ${ctx.location}.`,
    ctx.offer,
    "This is an information notice. If times, dates, or access have changed since you last checked, contact us before you travel.",
    ctx.cta,
  );

  const email = joinParagraphs(
    `Subject: Update from ${ctx.name}`,
    `Hello,`,
    `This is a notice from ${ctx.name}, ${ctx.aType} in ${ctx.location}.`,
    ctx.offer,
    ctx.cta,
    `If you received this in error, you can ignore it.`,
  );

  return [
    {
      id: "window",
      label: "Window notice",
      summary: "Short copy you can print or tape in a window. Check it is still true.",
      text: windowNotice,
    },
    {
      id: "facebook",
      label: "Facebook notice",
      summary: "A public-facing version of the same facts.",
      text: facebook,
    },
    {
      id: "email",
      label: "Email notice",
      summary: "A simple email you can send to people who already expect updates.",
      text: email,
    },
  ];
}
