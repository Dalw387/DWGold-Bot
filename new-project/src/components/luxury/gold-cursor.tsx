"use client";

import { useEffect, useState } from "react";

export function GoldCursor() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: fine)");

    function onMove(event: PointerEvent) {
      if (motion.matches || !pointer.matches) return;
      setPosition({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  if (!position) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 hidden lg:block"
      style={{
        background: `radial-gradient(28rem circle at ${position.x}px ${position.y}px, rgb(176 137 79 / 0.14), transparent 42%)`,
      }}
    />
  );
}
