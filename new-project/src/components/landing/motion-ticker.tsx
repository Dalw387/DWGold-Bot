import { tradesWeFit } from "@/lib/desk-team";
import { integrations } from "@/lib/workforce";

const industries = [
  "Roofers",
  "Car dealers",
  "Dentists",
  "Solicitors",
  "Estate agents",
  "Garages",
  "Builders",
  "Clinics",
  "Salons",
  "Accountants",
  "Letting agents",
  "Gyms",
  ...tradesWeFit,
];

const live = [
  "Alex · finding opportunities",
  "Charlie · preparing a first reply",
  "Max · drafting Google Ads",
  "Sophie · writing social posts",
  "Grace · preparing a review ask",
  "Scout · checking local visibility",
  ...integrations,
];

function Track({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3">
      <div className={`${reverse ? "marquee-reverse" : "marquee-track"} px-6 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ice/80`}>
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            <span className={`h-1 w-1 rounded-full ${reverse ? "bg-magenta" : "bg-cyan"}`} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MotionTicker() {
  return (
    <div className="no-print relative overflow-hidden border-y border-cyan/15 bg-black/35">
      <Track items={industries} />
      <div className="border-t border-white/8">
        <Track items={live} reverse />
      </div>
    </div>
  );
}
