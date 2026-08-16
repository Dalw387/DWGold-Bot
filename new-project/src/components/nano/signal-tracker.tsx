"use client";

import { useEffect } from "react";
import { recordSignal, type SignalKind } from "@/lib/nano-growth";

export function SignalTracker({ kind, detail }: { kind: SignalKind; detail?: string }) {
  useEffect(() => {
    recordSignal(kind, detail);
  }, [kind, detail]);
  return null;
}
