"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  getNanoSnapshot,
  getServerNanoSnapshot,
  hydrateNano,
  subscribeNano,
} from "@/lib/nano-growth";

const DEFAULT_LEAD =
  "Six named specialists for leads, appointments, reviews, advertising, social and search — working from the same business context.";

function lineForAgents(agents: string[]): string {
  const joined = agents.join(" ");
  if (joined.includes("ai-google-ads-agent") || joined.includes("ai-meta-ads-agent")) {
    return "Your AI advertising team watches every pound you spend — in copy you paste into your own accounts. You still hold the budget. Max and Mia draft. They do not log in.";
  }
  if (joined.includes("ai-appointment-setter") || joined.includes("ai-marketing-for-roofers")) {
    return "Turn enquiries into booked quotes. Charlie writes the first reply and the booking line. You still send it. The enquiry that waits until morning is often already gone.";
  }
  if (joined.includes("ai-lead-generation-agent")) {
    return "Never stop prospecting — starting with neighbours, referrals and follow-ups you already have. Alex writes the 14-day plan. He does not scrape strangers.";
  }
  if (joined.includes("ai-social-media-agent")) {
    return "Always present where neighbours already look. Sophie writes the post and the first reply. You still publish. Conversations become customers.";
  }
  if (joined.includes("ai-search-visibility-agent")) {
    return "Get found by people in your town. Scout writes a public page a stranger can read — so ads and search do not hit a login wall.";
  }
  return DEFAULT_LEAD;
}

export function AdaptiveLead() {
  const nano = useSyncExternalStore(subscribeNano, getNanoSnapshot, getServerNanoSnapshot);

  useEffect(() => {
    hydrateNano();
  }, []);

  return (
    <p className="prose-narrow mt-6 text-lg leading-8 text-slate sm:text-[1.15rem]">{lineForAgents(nano.agents)}</p>
  );
}
