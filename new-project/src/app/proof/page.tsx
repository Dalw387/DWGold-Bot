import type { Metadata } from "next";
import { PlatformGate } from "@/components/access/platform-gate";
import { Container } from "@/components/container";
import { ProofLedger } from "@/components/proof/proof-ledger";

export const metadata: Metadata = {
  title: "Proof ledger",
  description:
    "Log real enquiries, calls, visits, and sales. LocalLaunch does not invent customer numbers.",
};

export default function ProofPage() {
  return (
    <PlatformGate>
      <div className="mesh border-b border-stone-200">
        <Container className="py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4d5c57]">
            Proof
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">
            Prove it with a ledger, not a slogan
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
            This page only counts what you type in. Run the agents, publish what
            is true, then log each real enquiry. Zero is allowed.
          </p>
          <div className="mt-12">
            <ProofLedger />
          </div>
        </Container>
      </div>
    </PlatformGate>
  );
}
