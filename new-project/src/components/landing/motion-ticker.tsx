import { tradesWeFit } from "@/lib/desk-team";
import { integrations } from "@/lib/workforce";

export function MotionTicker() {
  const items = [
    "Nano Growth™",
    ...integrations,
    ...tradesWeFit,
    "Every click makes marketing smarter",
    ...integrations,
    ...tradesWeFit,
  ];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black/25 py-4">
      <div className="marquee-track px-6 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-ice/80">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            <span className="h-1 w-1 rounded-full bg-cyan" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
