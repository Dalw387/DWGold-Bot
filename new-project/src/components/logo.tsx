import Link from "next/link";

export function BrandMark({
  className = "h-10 w-10",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${className} ${animated ? "logo-draw" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ll-mark" x1="6" y1="28" x2="27" y2="5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#49E6FF" />
          <stop offset="48%" stopColor="#8B5CFF" />
          <stop offset="100%" stopColor="#E447D1" />
        </linearGradient>
      </defs>
      <path
        className="path"
        d="M7 26 V9 H18"
        fill="none"
        stroke="url(#ll-mark)"
        strokeWidth="2.05"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        className="path"
        d="M14 24 H26 V8"
        fill="none"
        stroke="url(#ll-mark)"
        strokeWidth="2.05"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        className="path"
        d="M18 9 L26 8"
        fill="none"
        stroke="#49E6FF"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <circle className="node" cx="7" cy="26" r="1.55" fill="#49E6FF" />
      <circle className="node" cx="7" cy="9" r="1.7" fill="#49E6FF" />
      <circle className="node" cx="18" cy="9" r="1.55" fill="#8B5CFF" />
      <circle className="node" cx="14" cy="24" r="1.4" fill="#E447D1" />
      <circle className="node" cx="26" cy="24" r="1.4" fill="#E447D1" />
      <circle className="node" cx="26" cy="8" r="2" fill="#FF4DB8" />
    </svg>
  );
}

export function Logo({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3.5 rounded-lg py-1 text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
    >
      <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-cyan/25 bg-void/70 shadow-[0_0_24px_rgb(73_230_255_/_0.18)] transition group-hover:border-magenta/40 group-hover:shadow-[0_0_28px_rgb(228_71_209_/_0.28)]">
        <BrandMark animated className="h-8 w-8 shrink-0" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.22rem] font-semibold tracking-[-0.04em] text-ice">
          LocalLaunch
        </span>
        {compact ? null : (
          <span className="mt-1.5 hidden text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cyan sm:block">
            AI workforce
          </span>
        )}
      </span>
    </Link>
  );
}
