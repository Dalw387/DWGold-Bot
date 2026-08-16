"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { StripePayLink } from "@/components/pay/stripe-pay-link";
import {
  getAccessSnapshot,
  getServerAccessSnapshot,
  hydrateAccessStore,
  subscribeAccess,
} from "@/lib/access-storage";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

export function StickyPayBar() {
  const pathname = usePathname();
  const access = useSyncExternalStore(
    subscribeAccess,
    getAccessSnapshot,
    getServerAccessSnapshot,
  );

  useEffect(() => {
    hydrateAccessStore();
  }, []);

  if (access.unlocked) return null;
  if (pathname.startsWith("/pay") || pathname.startsWith("/owner")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cyan/20 bg-void/90 backdrop-blur-xl md:hidden">
      <div className="header-hairline header-hairline-top" aria-hidden="true" />
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="text-sm leading-5 text-ice">
          {HOUSE_PRICE_SHORT} once. Unlock the team.
        </p>
        <StripePayLink className="shrink-0 px-4 py-2" arrow>Pay</StripePayLink>
      </div>
    </div>
  );
}
