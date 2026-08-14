export function replyTo(message) {
  const q = message.toLowerCase().trim();

  const rules = [
    {
      test: /price|cost|£|pound|month|upfront|fee/,
      text: "There is nothing to pay at the start. Engagements begin from £99 a month, according to the work. I can take you to pricing, or a person can speak with you.",
    },
    {
      test: /what is kiwi|who are you|who is kiwi/,
      text: "Kiwi Vision Media builds digital business systems — websites, AI agents, automation, applications, and the operating layer we call Kiwi Command. Built by AI. Directed by humans.",
    },
    {
      test: /agent|atlas|pulse|helix|meridian|signal|nexus/,
      text: "There are five specialists — Atlas, Pulse, Helix, Meridian, Signal — and Nexus, which keeps them in time. Each has a human boundary. Nothing that represents the business goes out without a person.",
    },
    {
      test: /command|dashboard|portal|login/,
      text: "Kiwi Command is the operating system for the engagement: projects, approvals, invoices, analytics, AI, support, and documents. It is not dumped onto the first screen of the website.",
    },
    {
      test: /website|site|web /,
      text: "We compose websites as products, not templates. If you would like to begin, Build My Site will take one decision at a time and produce a Vision Blueprint.",
    },
    {
      test: /automat/,
      text: "Helix takes the work that should not live in an inbox — follow-ups, diaries, documents — and lets people keep the exceptions.",
    },
    {
      test: /human|real person|someone/,
      text: "Yes. Ask for a person at any time. I will hand you to email until a telephone and WhatsApp number are published by the owner.",
    },
    {
      test: /contact|email|whatsapp|call|phone/,
      text: "Email is info@kiwimediagroup.com. Telephone and WhatsApp will appear here once the owner confirms the number. I will not invent one.",
    },
    {
      test: /watch|video|film/,
      text: "Watch Kiwi is the film library — what we are, how we build, the agents, Command, pricing, and industry explainers. Each important idea can be read, watched, or experienced.",
    },
  ];

  const hit = rules.find((r) => r.test.test(q));
  if (hit) return hit.text;

  if (q.length < 2) {
    return "Ask anything about Kiwi — what we build, how we work, or how to begin.";
  }

  return "I can speak to what Kiwi builds, how the agents work, pricing, and how to begin. If this needs judgement, email info@kiwimediagroup.com and a person will take it.";
}
