"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import {
  getAccessSnapshot,
  getServerAccessSnapshot,
  hydrateAccessStore,
  subscribeAccess,
} from "@/lib/access-storage";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { industries, workforceAgents } from "@/lib/workforce";

export function SiteFooter() {
  const access = useSyncExternalStore(
    subscribeAccess,
    getAccessSnapshot,
    getServerAccessSnapshot,
  );

  useEffect(() => {
    hydrateAccessStore();
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-cyan/10 bg-void">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-0 font-display text-[22vw] leading-none text-white/[0.035]"
      >
        LocalLaunch
      </p>
      <Container className="relative py-16 sm:py-20">
        {access.unlocked ? (
          <Link
            href="/operations"
            className="inline-flex text-sm font-semibold text-cyan hover:text-ice"
          >
            Open House Operations →
          </Link>
        ) : (
          <StripePayLink arrow>
            Build my AI team
          </StripePayLink>
        )}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Agents">
            <p className="text-sm font-semibold text-ice">Agents</p>
            <ul className="mt-4 space-y-2">
              {workforceAgents.map((agent) => (
                <li key={agent.slug}>
                  <Link href={`/${agent.slug}`} className="text-sm text-slate hover:text-ice">
                    {agent.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Industries">
            <p className="text-sm font-semibold text-ice">Industries</p>
            <ul className="mt-4 space-y-2">
              {industries.map((item) => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}`} className="text-sm text-slate hover:text-ice">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <p className="text-sm font-semibold text-ice">Company</p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/guide" className="text-sm text-slate hover:text-ice">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/#nano" className="text-sm text-slate hover:text-ice">
                  Nano Growth
                </Link>
              </li>
              <li>
                <Link href="/audit" className="text-sm text-slate hover:text-ice">
                  AI marketing score
                </Link>
              </li>
              <li>
                <Link href="/sample" className="text-sm text-slate hover:text-ice">
                  Sample
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-sm text-slate hover:text-ice">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/pay" className="text-sm text-slate hover:text-ice">
                  Pay {HOUSE_PRICE_SHORT}
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <Logo compact />
            <p className="mt-4 text-sm leading-6 text-slate">
              LocalLaunch is the AI marketing workforce for small and mid-sized
              businesses. {HOUSE_PRICE_SHORT} once. Agents draft. You send.
            </p>
          </div>
        </div>
      </Container>
      <div className="relative border-t border-white/8">
        <Container className="flex flex-col gap-2 py-6 text-xs leading-5 text-slate sm:flex-row sm:justify-between">
          <p>LocalLaunch. {HOUSE_PRICE_SHORT} one-off. Pay, then use the desk.</p>
          <p>Review every draft before you publish.</p>
        </Container>
      </div>
    </footer>
  );
}
