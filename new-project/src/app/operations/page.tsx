import type { Metadata } from "next";
import { Container } from "@/components/container";
import { OperationsDesk } from "@/components/operations/operations-desk";
import { PayButton } from "@/components/pay-button";

export const metadata: Metadata = {
  title: "House Operations",
  description:
    "Browser house agents for local SEO, Facebook ads, Google Ads, social posts, and a proof plan. They draft work. They do not invent results.",
};

export default function OperationsPage() {
  return (
    <div className="mesh border-b border-stone-200">
      <Container className="py-14 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
          House Operations
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">
          Cloud-style agents, running at tab cost
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
          When a business pays for House Operations, this is the desk: SEO,
          social ads, search ads, and a ledger for real enquiries. The agents
          work in the browser so the compute stays as close to free as we can
          keep it. Connecting live ad accounts comes later, and ad spend is never
          “free”.
        </p>
        <div className="mt-8 max-w-md">
          <PayButton>Pay for House Operations</PayButton>
        </div>
        <div className="mt-12">
          <OperationsDesk />
        </div>
      </Container>
    </div>
  );
}
