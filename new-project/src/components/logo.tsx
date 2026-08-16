import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-[0.7rem] font-bold tracking-wide text-white shadow-sm">
        LL
      </span>
      <span className="text-[1.05rem] font-semibold tracking-tight text-slate-900">
        LocalLaunch AI
        {compact ? null : (
          <span className="ml-2 hidden rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-indigo-700 sm:inline">
            Free demo
          </span>
        )}
      </span>
    </Link>
  );
}
