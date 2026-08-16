import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-700 text-white shadow-sm">
        <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16 3.5c-4.6 0-8.5 3.4-8.5 8.2 0 6.2 8.5 16.8 8.5 16.8s8.5-10.6 8.5-16.8c0-4.8-3.9-8.2-8.5-8.2zm0 11.2a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2z"
          />
        </svg>
      </span>
      <span className="font-display text-[1.15rem] font-semibold tracking-tight text-stone-900">
        LocalLaunch AI
        {compact ? null : (
          <span className="ml-2 hidden rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 align-middle font-sans text-[0.65rem] font-medium uppercase tracking-wider text-indigo-800 sm:inline">
            Free demo
          </span>
        )}
      </span>
    </Link>
  );
}
