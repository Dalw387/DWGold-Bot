import { TOOLS } from "@/lib/tools";

export function ToolsMarquee() {
  const names = [...TOOLS, ...TOOLS].map((tool) => tool.shortName);
  return (
    <div className="no-print overflow-hidden border-y border-[rgba(176,137,79,0.28)] bg-[#12100e] py-4">
      <div className="marquee-track text-xs font-semibold uppercase tracking-[0.22em] text-[#d7c4a1]">
        {names.map((name, index) => (
          <span key={`${name}-${index}`}>{name}</span>
        ))}
      </div>
    </div>
  );
}
