"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { unlockPlatform } from "@/lib/access-storage";
import { markHouseReturn } from "@/lib/house-membership";

export function HouseReturnMarker() {
  const params = useSearchParams();

  useEffect(() => {
    const sessionId = params.get("session_id");
    unlockPlatform(sessionId);
    markHouseReturn(sessionId);
  }, [params]);

  return (
    <p className="mt-4 text-sm leading-6 text-muted">
      This browser is now unlocked. Open the studio and run the named desks.
      Keep using this same phone or computer. We have not verified the payment
      on a server yet, so do not treat this screen as a tax receipt.
    </p>
  );
}
