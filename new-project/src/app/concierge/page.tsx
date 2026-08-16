import type { Metadata } from "next";
import { PlatformGate } from "@/components/access/platform-gate";
import { StudioAgent } from "@/components/agent/studio-agent";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "House concierge",
  description:
    "Talk to the LocalLaunch house concierge. It fills the studio, points you to SEO and ads agents, and stays honest about proof.",
};

export default function ConciergePage() {
  return (
    <PlatformGate>
      <div className="ink-hero border-b border-[rgba(176,137,79,0.25)]">
        <Container className="grid items-start gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d7c4a1]">
              Concierge
            </p>
            <h1 className="font-display mt-4 text-4xl font-medium tracking-tight text-[#f6f1e8] sm:text-5xl">
              Tell it the business. It fills the desk.
            </h1>
            <p className="mt-5 text-base leading-7 text-[#e8dcc8]">
              Ask for SEO, ads, a campaign pack, or House Operations. It runs
              from templates in this browser. Check every line before you
              publish.
            </p>
          </div>
          <StudioAgent variant="page" />
        </Container>
      </div>
    </PlatformGate>
  );
}
