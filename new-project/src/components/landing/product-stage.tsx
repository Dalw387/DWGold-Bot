import { deskTeam } from "@/lib/desk-team";

export function ProductStage() {
  return (
    <figure className="product-frame rounded-sm p-5 sm:p-6" aria-label="Preview of the LocalLaunch house desk">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#a8a59e]">
            House Operations
          </p>
          <p className="mt-1 font-display text-lg text-[#f7f6f2]">
            Harbour &amp; Hearth · Falmouth
          </p>
        </div>
        <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[#a8a59e]">
          Preview
        </p>
      </div>
      <ul className="mt-5 space-y-0">
        {deskTeam.map((desk, index) => (
          <li
            key={desk.name}
            className={`flex items-center justify-between gap-3 py-2.5 ${
              index === deskTeam.length - 1 ? "" : "border-b border-white/10"
            }`}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#f7f6f2] text-[0.7rem] font-semibold text-[#0c0c0c]">
                {desk.name.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#f7f6f2]">
                  {desk.name}
                </p>
                <p className="truncate text-xs text-[#a8a59e]">{desk.role}</p>
              </div>
            </div>
            <p className="shrink-0 text-[0.65rem] uppercase tracking-[0.12em] text-[#a8a59e]">
              Ready
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-center text-xs leading-5 text-[#a8a59e]">
          They draft. You send. No live phone. No Ads Manager login.
        </p>
      </div>
    </figure>
  );
}
