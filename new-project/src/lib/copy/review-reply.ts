import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { buildContext, hashSeed, joinParagraphs, pick } from "@/lib/copy/engine";

export function generateReviewReplies(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "review-reply");
  const ctx = buildContext(values, seed);

  const thanks = joinParagraphs(
    `Thank you for taking the time to leave a review of ${ctx.name} in ${ctx.location}.`,
    pick(
      [
        `We are glad the experience of ${ctx.offer} was useful. If you need anything further, you are welcome to get in touch.`,
        `It helps other local people when reviews stay honest. Thank you for writing about what actually happened.`,
      ],
      seed,
      2,
    ),
    `This reply does not add extra claims. ${ctx.cta}`,
  );

  const mixed = joinParagraphs(
    `Thank you for the review of ${ctx.name}.`,
    `We are pleased some of it went well, and we take the rest seriously. If something about ${ctx.offer} was unclear or not right, please contact us with the details so we can look at it.`,
    `We would rather put a real issue right than ask anyone to change a review.`,
    ctx.cta,
  );

  const concern = joinParagraphs(
    `Thank you for telling us. We are sorry the visit or enquiry did not meet what you needed.`,
    `Please contact ${ctx.name} directly about ${ctx.offer} so we can understand what happened. Public replies are not the place to argue.`,
    `Anyone reading this: treat one review as one person’s experience, and confirm current details with us before you decide.`,
    ctx.cta,
  );

  return [
    {
      id: "thanks",
      label: "Thank-you reply",
      summary: "For a fair, positive review. Does not invent extra praise.",
      text: thanks,
    },
    {
      id: "mixed",
      label: "Mixed review reply",
      summary: "Thanks the writer and invites a private conversation about what to fix.",
      text: mixed,
    },
    {
      id: "concern",
      label: "Concern reply",
      summary: "A calm public reply when something went wrong. Take the detail offline.",
      text: concern,
    },
  ];
}
