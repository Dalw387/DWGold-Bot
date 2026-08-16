import type { Metadata } from "next";
import { Suspense } from "react";
import { PlatformGate } from "@/components/access/platform-gate";
import { Container } from "@/components/container";
import { OperationsDesk } from "@/components/operations/operations-desk";

export const metadata: Metadata = {
  title: "House Operations",
  description:
    "Named desks for search, ads, social, leads, appointments, reviews and proof. They draft work. They do not invent results.",
};

export default function OperationsPage() {
  return (
    <PlatformGate>
      <div className="mesh border-b border-border">
        <Container className="py-14 sm:py-20">
          <p className="kicker">House Operations</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Scout, Max, Mia, Sophie, Alex, Charlie, Grace and Quinn
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Eight named desks write in this browser tab: a public homepage,
            local SEO, Facebook/Instagram ads, Google Ads (not AdSense), a week
            of social starting points, a 14-day customer-getting plan, first
            replies, Google review and missed-call packs, and what to log as
            proof. They do not spend your ad budget. Type the business, or run a
            trial, then press Run all desks. Start with Grace if you want the
            two jobs that pay first.
          </p>
          <div className="mt-12">
            <Suspense fallback={<p className="text-sm text-muted">Opening the desk.</p>}>
              <OperationsDesk />
            </Suspense>
          </div>
        </Container>
      </div>
    </PlatformGate>
  );
}
