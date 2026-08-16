import Link from "next/link";

export function BrandMark({
  invert = false,
  className = "h-8 w-8",
}: {
  invert?: boolean;
  className?: string;
}) {
  const square = invert ? "#f7f6f2" : "#0c0c0c";
  const cut = invert ? "#0c0c0c" : "#f7f6f2";

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" fill={square} />
      <path fill={cut} d="M8 6h6.25v13.5H24V26H8V6Z" />
    </svg>
  );
}

export function Logo({
  compact = false,
  invert = false,
}: {
  compact?: boolean;
  invert?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
        invert ? "text-paper" : "text-foreground"
      }`}
    >
      <BrandMark invert={invert} />
      <span className="font-display text-[1.25rem] font-medium tracking-[-0.03em]">
        LocalLaunch
        {compact ? null : (
          <span className="ml-2 hidden font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted sm:inline">
            Desk
          </span>
        )}
      </span>
    </Link>
  );
}
