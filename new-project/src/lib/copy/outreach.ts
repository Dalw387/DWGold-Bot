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
        "Day 4: Ask one happy customer, privately, to send one neighbour who actually needs this work. Same day, send the Google review SMS if the job was real — paste your own review link first.",
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

export function generateEnquiryReplies(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "enquiry-reply");
  const ctx = buildContext(values, seed);

  return [
    {
      id: "first",
      label: "First reply to a written enquiry",
      summary: "Answer fast. Repeat what they asked. Do not invent a price.",
      text: joinParagraphs(
        `Hello, this is ${ctx.name} in ${ctx.location}. Thank you for getting in touch.`,
        `You asked about ${ctx.offer}. I have read that. If I have missed a detail, tell me and I will correct it.`,
        pick(
          [
            `I can confirm what is actually available once I know a little more: what you need, roughly when, and the best way to reach you. Then we can decide if ${ctx.aType} is a genuine fit.`,
            `Next step is a short, true conversation — not a brochure. Tell me what you need from ${ctx.offer}, and I will say what we can and cannot do.`,
          ],
          seed,
          4,
        ),
        ctx.cta,
      ),
    },
    {
      id: "price",
      label: "If they ask for a price first",
      summary: "Do not invent a figure. Ask for the facts that change the quote.",
      text: joinParagraphs(
        `Hello from ${ctx.name}.`,
        `I do not want to guess a price for ${ctx.offer} in a first message. The honest version depends on what you actually need.`,
        `Reply with the job, the timing, and any constraint that matters. Then I will confirm a real figure, or tell you if we are not the right ${ctx.type}.`,
        ctx.cta,
      ),
    },
    {
      id: "book",
      label: "If they want to visit or book",
      summary: "Make the next step small and true. No fake ‘last slot today’.",
      text: joinParagraphs(
        `Yes — we can look at a time for ${ctx.offer}.`,
        `Send two windows that work for you. I will confirm what is actually free, or offer the next honest option.`,
        `If you prefer a call first, say so. ${ctx.name}, ${ctx.location}. ${ctx.cta}`,
      ),
    },
  ];
}

export function generateAfterJob(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "after-job");
  const ctx = buildContext(values, seed);

  return [
    {
      id: "thanks",
      label: "Thank-you after the work",
      summary: "Send it the same day. No invented discount for a review.",
      text: joinParagraphs(
        `Thank you for choosing ${ctx.name} in ${ctx.location}.`,
        `I hope ${ctx.offer} was useful. If anything was unclear or not right, reply to this message and we will sort it privately.`,
        `If it was as expected, the most useful next step is simply to come back when you next need ${ctx.aType}. ${ctx.cta}`,
      ),
    },
    {
      id: "review",
      label: "Soft review ask after the job",
      summary: "Easy to refuse. Never pay for a star.",
      text: joinParagraphs(
        `If you are happy to leave an honest review of ${ctx.name}, that helps neighbours decide. If you would rather not, that is fine.`,
        `If something went wrong, please tell us here instead of surprising us in public. We would rather fix it.`,
        ctx.cta,
      ),
    },
    {
      id: "referral",
      label: "Same-day referral line",
      summary: "One neighbour who actually needs the work. Not a broadcast.",
      text: joinParagraphs(
        `If you know one person nearby who actually needs ${ctx.offer}, you are welcome to pass ${ctx.name} on. There is nothing in it for you except helping them.`,
        `If nobody comes to mind, ignore this. ${ctx.cta}`,
      ),
    },
  ];
}

export function generateQuietWeek(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "quiet-week");
  const ctx = buildContext(values, seed);

  return [
    {
      id: "space",
      label: "Honest ‘we have space’ post",
      summary: "Say you can take work. Do not invent a last slot or a rush.",
      text: joinParagraphs(
        `${ctx.name} is ${ctx.aType} in ${ctx.location}.`,
        pick(
          [
            `This week we can take enquiries about ${ctx.offer}. That is the whole update. If you need this work, ask. If you do not, scroll on.`,
            `The diary is not full. If you have been meaning to ask about ${ctx.offer}, this is a fair week to do it. We will not pretend there is a queue.`,
          ],
          seed,
          5,
        ),
        ctx.cta,
      ),
    },
    {
      id: "existing",
      label: "Note to people who already know you",
      summary: "WhatsApp or email for existing customers only. Not a bought list.",
      text: joinParagraphs(
        `Hello from ${ctx.name} in ${ctx.location}.`,
        `If you already use us, this is a quiet note: we can help again with ${ctx.offer}. If a neighbour has been asking you about ${ctx.aType}, you can send them our way.`,
        `No need to reply if nothing is needed. ${ctx.cta}`,
      ),
    },
    {
      id: "actions",
      label: "If the phone is quiet today",
      summary: "A work list. Not a slogan. Do these before you boost a post.",
      text: [
        `Quiet-day list for ${ctx.name} (${ctx.type}, ${ctx.location}).`,
        "1. Answer every unread enquiry before you write a new post.",
        "2. Follow up one person who asked and went quiet. Once.",
        "3. Ask one happy customer, privately, to send one real neighbour.",
        "4. Check the public page still loads without a login, and still matches the offer.",
        "5. Put a true window or counter line up, or take a stale one down.",
        `6. If you run ads, confirm they still point at that public page and still talk about ${ctx.offer}.`,
        "7. Log whatever actually happened in the proof ledger, including zero.",
        "Do not invent scarcity. Do not buy fake reviews. Change the page or the offer if the week stays empty.",
      ].join("\n\n"),
    },
  ];
}

export function generateGoogleReviewDesk(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "google-reviews");
  const ctx = buildContext(values, seed);

  return [
    {
      id: "sms",
      label: "SMS after the job",
      summary: "You send this. We do not text anyone from this site. Paste your Google review link first.",
      text: joinParagraphs(
        `Hi, this is ${ctx.name} in ${ctx.location}. Thank you for using us for ${ctx.offer}.`,
        pick(
          [
            `If you are willing, an honest Google review helps neighbours decide. Paste your review link here before you send: [YOUR GOOGLE REVIEW LINK]. If something was not right, reply to this text instead of surprising us in public.`,
            `A short honest Google review is useful if the work was as expected. Add your Google review link here: [YOUR GOOGLE REVIEW LINK]. No pressure. If we got something wrong, tell us on this thread.`,
          ],
          seed,
          2,
        ),
      ),
    },
    {
      id: "email",
      label: "Email after the job",
      summary: "For customers you already email. Same rule: honest ask, private path if unhappy.",
      text: joinParagraphs(
        `Subject: A quiet ask from ${ctx.name}`,
        `Hello, thank you for choosing ${ctx.name} in ${ctx.location} for ${ctx.offer}.`,
        `If you have a minute, an honest review on Google helps people nearby. Add the link before you send: [YOUR GOOGLE REVIEW LINK].`,
        `If the job was not right, reply to this email. We would rather fix it than collect a star.`,
        ctx.cta,
      ),
    },
    {
      id: "link-howto",
      label: "How to get your Google review link",
      summary: "A checklist. This desk cannot log into Google for you.",
      text: [
        `Google review link for ${ctx.name} (${ctx.location}).`,
        "1. On your phone, open Google Maps and search the exact business name.",
        "2. Open your listing. Use Share, or Ask for reviews in Google Business Profile, and copy the link.",
        "3. Paste that link into the SMS or email above, replacing [YOUR GOOGLE REVIEW LINK].",
        "4. Send only to people you actually helped. One message. No bought list.",
        "We cannot connect to Google from this site. You copy the link. You send the message.",
      ].join("\n\n"),
    },
    {
      id: "policy",
      label: "What Google actually allows",
      summary: "Do not pay for stars. Do not only send happy people to Google.",
      text: joinParagraphs(
        `Rules for ${ctx.name} when asking for reviews:`,
        "Do not pay, discount, or gift anyone for a five-star review.",
        "Do not send only satisfied customers to Google while hiding unhappy ones. That is review gating. Ask honestly. If they were unhappy, invite a private message — but do not block them from Google.",
        "Do not write the review for them. Do not invent jobs that did not happen.",
        `If they would rather not review ${ctx.offer}, that is fine.`,
      ),
    },
  ];
}

export function generateOffHours(values: GeneratorFormValues): GeneratedPost[] {
  const seed = hashSeed(values, "off-hours");
  const ctx = buildContext(values, seed);

  return [
    {
      id: "closed-voicemail",
      label: "Voicemail when you are closed",
      summary: "Record this on your real phone. This site does not answer calls.",
      text: joinParagraphs(
        `You have reached ${ctx.name}, ${ctx.aType} in ${ctx.location}. We are closed right now.`,
        `Leave your name, number, and whether this is about ${ctx.offer}. We will call you back in opening hours.`,
        "If it cannot wait, say so in the message.",
      ),
    },
    {
      id: "missed-now",
      label: "Missed-call text, same day",
      summary: "Send from your phone to the number that just rang. Only if they called you.",
      text: `Hello, ${ctx.name} in ${ctx.location}. We missed your call — we were with a customer. If you still need ${ctx.offer}, reply with a good time and we will come back to you. ${ctx.cta}`,
    },
    {
      id: "morning",
      label: "Morning callback text",
      summary: "For a call that came in overnight. Send it when you open, not at midnight.",
      text: joinParagraphs(
        `Good morning, this is ${ctx.name} in ${ctx.location}.`,
        `We saw a call while we were closed. If you still need ${ctx.offer}, reply here or we can ring you. ${ctx.cta}`,
      ),
    },
    {
      id: "hours-check",
      label: "Hours check for Google",
      summary: "A reminder, not a login. Wrong hours on Google lose the next call.",
      text: [
        `Off-hours checklist for ${ctx.name} in ${ctx.location}.`,
        "1. Open your Google Business Profile. Check the hours are still true.",
        "2. Record the closed voicemail on the number people actually ring.",
        "3. Save the missed-call text in your phone notes so you can send it in under a minute.",
        "4. When you open, return every overnight message before you post on Facebook.",
        `Topic people are ringing about: ${ctx.offer}.`,
        "This desk writes the words. It does not pick up the phone, and it does not send the text for you.",
      ].join("\n\n"),
    },
  ];
}
