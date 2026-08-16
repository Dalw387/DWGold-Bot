import { TOOLS } from "@/lib/tools";

export function ToolsMarquee() {
  const names = [...TOOLS, ...TOOLS].map((tool) => tool.shortName);
  return (
    <div className="no-print overflow-hidden border-y border-[rgba(30,58,52,0.28)] bg-[#191919] py-4">
      <div className="marquee-track text-xs font-semibold uppercase tracking-[0.22em] text-[#b4b0a8]">
        {names.map((name, index) => (
          <span key={`${name}-${index}`}>{name}</span>
        ))}
      </div>
    </div>
  );
}
