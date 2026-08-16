"use client";

import { useEffect, useRef } from "react";
import { recordSignal, type SignalKind } from "@/lib/nano-growth";

export function ViewportSignal({ kind, detail }: { kind: SignalKind; detail?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const sent = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !sent.current) {
          sent.current = true;
          recordSignal(kind, detail);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [detail, kind]);

  return <span ref={ref} className="sr-only" aria-hidden="true" />;
}
