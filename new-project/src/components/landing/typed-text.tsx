"use client";

import { useEffect, useState } from "react";

export function TypedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = Math.max(3, Math.ceil(text.length / 90));
    const id = window.setInterval(() => {
      if (reduced) {
        setShown(text);
        window.clearInterval(id);
        return;
      }
      i += step;
      setShown(text.slice(0, Math.min(i, text.length)));
      if (i >= text.length) window.clearInterval(id);
    }, reduced ? 0 : 16);
    return () => window.clearInterval(id);
  }, [text]);

  const live = shown.length < text.length;
  return (
    <span className={className}>
      {shown}
      {live ? <span className="caret" aria-hidden="true" /> : null}
    </span>
  );
}
