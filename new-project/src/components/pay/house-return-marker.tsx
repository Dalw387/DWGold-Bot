"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { hydrateHouseStore, markHouseReturn } from "@/lib/house-membership";

export function HouseReturnMarker() {
  const params = useSearchParams();

  useEffect(() => {
    hydrateHouseStore();
    markHouseReturn(params.get("session_id"));
  }, [params]);

  return (
    <p className="mt-4 text-sm leading-6 text-stone-600">
      This tab is marked as returned from Stripe. We have not verified the
      payment on a server yet, so do not treat this screen as a receipt until
      webhooks are connected. Open House Operations and log only real enquiries.
    </p>
  );
}
