import type { GeneratedPost, GeneratorFormValues } from "@/lib/types";
import { buildContext, hashSeed, joinParagraphs, pick } from "@/lib/copy/engine";

export function generateReferralAsks(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "referral");
  const ctx = buildContext(values, seed);

  return [
    {
      id: "message",
      label: "Ask a happy customer",
      summary: "A private message. Only send it to someone you actually helped.",
      text: joinParagraphs(
        `Hello, this is ${ctx.name} in ${ctx.location}.`,
        pick(
          [
            `If we already helped you with ${ctx.offer}, and you know one person nearby who might need ${ctx.aType}, you are welcome to pass our name on. There is no pressure, and nothing in it for you except helping a neighbour.`,
            `When someone asks you about ${ctx.aType} in ${ctx.location}, you can send them to ${ctx.name}. Only if that feels fair. We would rather a quiet no than an awkward yes.`,
          ],
          seed,
          2,
        ),
        ctx.cta,
      ),
    },
    {
      id: "post",
      label: "Public referral note",
      summary: "A Facebook-style note. Does not invent a waiting list.",
      text: joinParagraphs(
        `${ctx.name} is ${ctx.aType} in ${ctx.location}.`,
        `If we have already helped you, the most useful thing you can do is tell one real person who actually needs ${ctx.offer}. A like does not fill a diary. A name does.`,
        ctx.cta,
      ),
    },
    {
      id: "card",
      label: "After-the-job card",
      summary: "Short line you can put on a receipt, email footer, or printed card.",
      text: `${ctx.name} · ${ctx.location}. If this was useful, send a neighbour who actually needs ${ctx.offer}. ${ctx.cta}`,
    },
  ];
}

export function generateFollowUps(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "follow-up");
  const ctx = buildContext(values, seed);

  return [
    {
      id: "enquiry",
      label: "Follow up an enquiry",
      summary: "For someone who asked, then went quiet. Not a chase.",
      text: joinParagraphs(
        `Hello, this is ${ctx.name} in ${ctx.location}.`,
        `You asked about ${ctx.offer}. This is a quiet follow-up in case you still need ${ctx.aType}. If not, you can ignore this.`,
        `We can confirm current details when you reply. ${ctx.cta}`,
      ),
    },
    {
      id: "visit",
      label: "After a visit or call",
      summary: "Thank-you plus a clear next step. No invented discount.",
      text: joinParagraphs(
        `Thank you for speaking with ${ctx.name}.`,
        `If you want to go further with ${ctx.offer}, reply and we will confirm what is actually available.`,
        ctx.cta,
      ),
    },
    {
      id: "no-sale",
      label: "If they chose someone else",
      summary: "Leave the door open without sulking.",
      text: joinParagraphs(
        `Thank you for considering ${ctx.name} in ${ctx.location}.`,
        `If ${ctx.offer} comes up again, you are welcome to come back. No hard feelings.`,
        `If something was unclear, tell us. We would rather fix the explanation than guess.`,
      ),
    },
  ];
}

export function generateWindowCards(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "window");
  const ctx = buildContext(values, seed);

  return [
    {
      id: "window",
      label: "Window / door card",
      summary: "Large, short lines for a passer-by. Check it is still true.",
      text: joinParagraphs(
        ctx.name.toUpperCase(),
        `${ctx.type} in ${ctx.location}`,
        ctx.offer,
        ctx.cta,
      ),
    },
    {
      id: "flyer",
      label: "A5 flyer body",
      summary: "A small printed note. No fake awards. Add your real phone or URL yourself.",
      text: joinParagraphs(
        `${ctx.name} is ${ctx.aType} in ${ctx.location}.`,
        `This leaflet is about ${ctx.offer}. Confirm details with us before you visit.`,
        ctx.cta,
        "Take this down if the facts change.",
      ),
    },
    {
      id: "table",
      label: "Table tent / counter card",
      summary: "For a till, table, or reception. Add your own QR later if you want.",
      text: joinParagraphs(
        `You are in ${ctx.name}.`,
        `Ask us about ${ctx.offer}.`,
        ctx.cta,
      ),
    },
  ];
}

export function generatePhoneScripts(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "phone");
  const ctx = buildContext(values, seed);

  return [
    {
      id: "answer",
      label: "When you pick up",
      summary: "A calm greeting. Say the real name. Do not promise a quote on the first breath.",
      text: joinParagraphs(
        `"${ctx.name}, ${ctx.location}. How can I help?"`,
        `If they ask about ${ctx.offer}: listen first. Repeat back what they need. Then say what you can confirm today, and what you need to check.`,
        `Close: "${ctx.cta.replace(/\.$/, "")}."`,
      ),
    },
    {
      id: "voicemail",
      label: "Voicemail",
      summary: "Short. Ask them to leave a name, number, and what they need.",
      text: joinParagraphs(
        `You have reached ${ctx.name}, ${ctx.aType} in ${ctx.location}.`,
        `Leave your name, number, and whether this is about ${ctx.offer}. We will come back to you.`,
        "If this is urgent, say so in the message.",
      ),
    },
    {
      id: "missed",
      label: "Missed-call text",
      summary: "For a number that rang off. Only text if they called you.",
      text: `Hello, ${ctx.name} in ${ctx.location} here. We saw a missed call. If you still need ${ctx.offer}, reply with a good time. ${ctx.cta}`,
    },
  ];
}

export function generateNeighbourIntros(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "neighbour");
  const ctx = buildContext(values, seed);

  return [
    {
      id: "shop",
      label: "Note to a nearby business",
      summary: "Introduce yourself. Ask if referrals would ever be useful. No hard sell.",
      text: joinParagraphs(
        `Hello, we are ${ctx.name}, ${ctx.aType} in ${ctx.location}.`,
        pick(
          [
            `We wanted neighbouring businesses to know we are here for ${ctx.offer}. If you ever have someone ask, and we are a genuine fit, you are welcome to send them over. We will do the same in reverse where we can.`,
            `This is an introduction, not a pitch. We handle ${ctx.offer}. If that is never relevant to your customers, ignore this.`,
          ],
          seed,
          3,
        ),
        ctx.cta,
      ),
    },
    {
      id: "community",
      label: "Local group / Nextdoor-style note",
      summary: "For a real local group you already belong to. Not spam.",
      text: joinParagraphs(
        `A short hello from ${ctx.name} in ${ctx.location}.`,
        `We are ${ctx.aType}. If anyone locally needs ${ctx.offer}, we can explain what is actually available. We will not invent prices or results in the comments.`,
        ctx.cta,
      ),
    },
  ];
}

export function generateCustomerPlan(values: GeneratorFormValues): GeneratedPost[] {
  const ctx = buildContext(values, hashSeed(values, "customer-plan"));

  return [
    {
      id: "plan",
      label: "14-day customer-getting plan",
      summary: "Actions that can bring real enquiries. Not a ranking promise.",
      text: [
        `Customer-getting plan for ${ctx.name} (${ctx.type}, ${ctx.location}).`,
        `Offer to talk about: ${ctx.offer}.`,
        "Day 1: Put a public page live that a stranger can read without a login. Paste the homepage draft.",
        "Day 1: Complete or tidy the Google Business Profile: name, town, category, photos you actually took.",
        "Day 2: Post one Facebook neighbourhood update. Ask a real question. Reply to every comment yourself.",
        "Day 3: Send a WhatsApp or email only to people who already know you. Tell them you are taking enquiries.",
        "Day 4: Ask one happy customer, privately, to send one neighbour who actually needs this work.",
        "Day 5: Put a true window card or counter card up. Take it down when it is stale.",
        "Day 6: Follow up anyone who enquired and went quiet. Once. Then stop chasing.",
        "Day 7: Log the week in the proof ledger. If it is zero, that is the result. Change the page or the offer, not the counting rules.",
        "Day 8: Post the Google listing update. Confirm opening facts before you publish.",
        "Day 9: If you use ads, paste the ads drafts into your own account, tight geo around the town you serve, small budget you can afford. Point the ad at the public page, not a login wall.",
        "Day 10: Introduce yourself to one neighbouring business. Offer to swap genuine referrals.",
        "Day 11: Reply to every review you already have, using the calm templates. Do not argue.",
        "Day 12: Publish one explainer post about the work, without slogans.",
        "Day 13: Record a voicemail and a pick-up greeting so the first call sounds like a real business.",
        "Day 14: Count real enquiries, calls, visits, and sales. Plan next week from those numbers, not from likes.",
        `Close every public line with: ${ctx.cta}`,
      ].join("\n\n"),
    },
    {
      id: "daily",
      label: "Daily 20-minute habit",
      summary: "A short loop so the desk does not die after day 14.",
      text: joinParagraphs(
        `Each working day for ${ctx.name}:`,
        "• Answer every enquiry from yesterday before you make new posts.",
        "• Post or send one true update, or follow up one real person.",
        "• Log any actual enquiry in the proof ledger the same day.",
        `Topic this month: ${ctx.offer} in ${ctx.location}.`,
        "Stop when the facts are no longer true. Start again with a new true offer.",
      ),
    },
  ];
}
