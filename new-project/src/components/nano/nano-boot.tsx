"use client";

import { useEffect } from "react";
import { hydrateNano } from "@/lib/nano-growth";

export function NanoBoot() {
  useEffect(() => {
    hydrateNano();
  }, []);
  return null;
}
