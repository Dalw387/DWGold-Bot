import type { Metadata } from "next";
import { FacebookPostGenerator } from "@/components/generator/facebook-post-generator";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Facebook Post Generator",
  description:
    "Create three Facebook post drafts from your business details. Template-based, free, and runs in your browser with no AI API.",
};

export default function FacebookPostGeneratorPage() {
  return (
    <div className="border-b border-slate-200 bg-slate-50">
      <Container className="py-12 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-700">
          Free tool
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Facebook Post Generator
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Add your business details and generate three different Facebook drafts.
          This page does not call an AI service. Review every post before you
          publish, especially prices, times, and anything that could be taken as
          a promise.
        </p>
        <div className="mt-10">
          <FacebookPostGenerator />
        </div>
      </Container>
    </div>
  );
}
