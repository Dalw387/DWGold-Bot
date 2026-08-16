import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ProofLedger } from "@/components/proof/proof-ledger";

export const metadata: Metadata = {
  title: "Proof ledger",
  description:
    "Log real enquiries, calls, visits, and sales. LocalLaunch does not invent customer numbers.",
};

export default function ProofPage() {
  return (
    <div className="mesh border-b border-stone-200">
      <Container className="py-14 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
          Proof
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">
          Prove it with a ledger, not a slogan
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
          The goal is more customers for the business. This page only counts what
          you type in. Use it on the DW Gold Trading trial the same way you would
          for a paying client: run the agents, publish what is true, then log
          each real enquiry.
        </p>
        <div className="mt-12">
          <ProofLedger />
        </div>
      </Container>
    </div>
  );
}
