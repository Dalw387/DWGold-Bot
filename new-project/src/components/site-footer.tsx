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
  { href: "/#team", label: "The desks" },
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
    <footer className="border-t border-border bg-background">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <Logo compact />
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            LocalLaunch is a {HOUSE_PRICE_SHORT} one-off marketing desk for
            small businesses. Named desks write the work to find customers,
            advertise, reply, book, and ask for reviews. You send it. Agents
            draft. They do not spend ad budget.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-semibold text-foreground">Explore</p>
          <ul className="mt-4 space-y-2">
            {explore.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={access.unlocked ? "Studio rooms" : "Included rooms"}>
          <p className="text-sm font-semibold text-foreground">
            {access.unlocked ? "Studio rooms" : "Included after you pay"}
          </p>
          <ul className="mt-4 space-y-2">
            {TOOLS.map((tool) => (
              <li key={tool.slug}>
                {access.unlocked ? (
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {tool.shortName}
                  </Link>
                ) : (
                  <span className="text-sm text-muted">{tool.shortName}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>LocalLaunch. {HOUSE_PRICE_SHORT} one-off. Pay, then use the desk.</p>
          <p>Review every draft before you publish. Do not add claims you cannot support.</p>
        </Container>
      </div>
    </footer>
  );
}
