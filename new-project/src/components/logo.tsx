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
      <path
        className="path"
        d="M8 26 V10 H18"
        fill="none"
        stroke="#AEB9C8"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="path"
        d="M18 10 L25 5"
        fill="none"
        stroke="#AEB9C8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle className="node" cx="8" cy="26" r="1.7" fill="#DCE4EC" />
      <circle className="node" cx="8" cy="10" r="1.9" fill="#36D8FF" />
      <circle className="node" cx="18" cy="10" r="1.7" fill="#AEB9C8" />
      <circle className="node" cx="25" cy="5" r="2.05" fill="#3475FF" />
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
      className="inline-flex items-center gap-3 rounded-lg py-1 text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
    >
      <BrandMark animated className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-semibold tracking-[-0.03em] text-ice">
          LocalLaunch
        </span>
        {compact ? null : (
          <span className="mt-1 hidden text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-titanium sm:block">
            AI workforce
          </span>
        )}
      </span>
    </Link>
  );
}
