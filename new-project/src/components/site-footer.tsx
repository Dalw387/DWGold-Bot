"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import {
  getAccessSnapshot,
  getServerAccessSnapshot,
  hydrateAccessStore,
  subscribeAccess,
} from "@/lib/access-storage";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { TOOLS } from "@/lib/tools";

const publicExplore = [
  { href: "/#value", label: "Why £197" },
  { href: "/#what-you-get", label: "Included" },
  { href: "/sample", label: "Sample" },
  { href: "/guide", label: "How it works" },
  { href: "/#email", label: "Email list" },
  { href: "/pay", label: `Pay ${HOUSE_PRICE_SHORT}` },
];

const memberExplore = [
  { href: "/tools", label: "Studio" },
  { href: "/operations", label: "House Operations" },
  { href: "/concierge", label: "Concierge" },
  { href: "/proof", label: "Proof ledger" },
  { href: "/guide", label: "How it works" },
];

export function SiteFooter() {
  const access = useSyncExternalStore(
    subscribeAccess,
    getAccessSnapshot,
    getServerAccessSnapshot,
  );

  useEffect(() => {
    hydrateAccessStore();
  }, []);

  const explore = access.unlocked ? memberExplore : publicExplore;

  return (
    <footer className="border-t border-[rgba(30,58,52,0.25)] bg-[#f4f3ef]">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <Logo compact />
          <p className="mt-4 max-w-md text-sm leading-6 text-stone-600">
            LocalLaunch AI is a {HOUSE_PRICE_SHORT} one-off marketing desk for
            small businesses. Read the offer, pay on Stripe, then use the
            platform in this browser. Agents draft. They do not spend ad budget.
            Ad spend at Meta or Google is separate.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-semibold text-stone-900">Explore</p>
          <ul className="mt-4 space-y-2">
            {explore.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-stone-600 hover:text-[#4d5c57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a34]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={access.unlocked ? "Studio rooms" : "Included rooms"}>
          <p className="text-sm font-semibold text-stone-900">
            {access.unlocked ? "Studio rooms" : "Included after you pay"}
          </p>
          <ul className="mt-4 space-y-2">
            {TOOLS.map((tool) => (
              <li key={tool.slug}>
                {access.unlocked ? (
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-stone-600 hover:text-[#4d5c57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a34]"
                  >
                    {tool.shortName}
                  </Link>
                ) : (
                  <span className="text-sm text-stone-600">{tool.shortName}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-stone-200">
        <Container className="flex flex-col gap-2 py-6 text-xs leading-5 text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>LocalLaunch AI. {HOUSE_PRICE_SHORT} one-off. Pay, then use the desk.</p>
          <p>Review every draft before you publish. Do not add claims you cannot support.</p>
        </Container>
      </div>
    </footer>
  );
}
