import Link from "next/link";

export function BrandMark({
  invert = false,
  className = "h-8 w-8",
}: {
  invert?: boolean;
  className?: string;
}) {
  const square = invert ? "#f4f3ef" : "#191919";
  const cut = invert ? "#191919" : "#f4f3ef";

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
      className={`inline-flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1e3a34] ${
        invert ? "text-[#f4f3ef]" : "text-[#191919]"
      }`}
    >
      <BrandMark invert={invert} />
      <span className="font-display text-[1.2rem] font-medium tracking-[-0.02em]">
        LocalLaunch
        {compact ? null : (
          <span className="ml-2 hidden font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#5f5c56] sm:inline">
            Desk
          </span>
        )}
      </span>
    </Link>
  );
}
