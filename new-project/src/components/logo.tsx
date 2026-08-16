import Link from "next/link";

export function BrandMark({
  className = "h-8 w-8",
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
        <linearGradient id="ll-sig" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#326BFF" />
          <stop offset="55%" stopColor="#665CFF" />
          <stop offset="100%" stopColor="#39D9FF" />
        </linearGradient>
      </defs>
      <path
        className="path"
        d="M8 6v20h16"
        fill="none"
        stroke="url(#ll-sig)"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
      <path
        className="path"
        d="M8 16h10l6-8"
        fill="none"
        stroke="url(#ll-sig)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle className="node" cx="8" cy="6" r="2.1" fill="#F5F8FF" />
      <circle className="node" cx="8" cy="16" r="2.1" fill="#39D9FF" />
      <circle className="node" cx="8" cy="26" r="2.1" fill="#F5F8FF" />
      <circle className="node" cx="18" cy="16" r="2.1" fill="#665CFF" />
      <circle className="node" cx="24" cy="26" r="2.1" fill="#F5F8FF" />
      <circle className="node" cx="24" cy="8" r="2.1" fill="#326BFF" />
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
      className="inline-flex items-center gap-3 rounded-lg text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
    >
      <BrandMark animated className="h-8 w-8" />
      <span className="font-display text-[1.2rem] font-medium tracking-[-0.04em]">
        LocalLaunch
        {compact ? null : (
          <span className="ml-2 hidden font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted sm:inline">
            AI Team
          </span>
        )}
      </span>
    </Link>
  );
}
