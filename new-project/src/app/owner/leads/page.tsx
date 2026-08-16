import type { Metadata } from "next";
import { Suspense } from "react";
import { LeadsDesk } from "@/components/owner/leads-desk";

export const metadata: Metadata = {
  title: "Email list",
  robots: { index: false, follow: false },
};

export default function OwnerLeadsPage() {
  return (
    <div className="mesh border-b border-stone-200">
      <Suspense fallback={<p className="p-8 text-sm text-stone-600">Opening the list.</p>}>
        <LeadsDesk />
      </Suspense>
    </div>
  );
}
