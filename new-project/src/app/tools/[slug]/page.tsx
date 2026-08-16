import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlatformGate } from "@/components/access/platform-gate";
import { ToolStudio } from "@/components/tools/tool-studio";
import { getTool, TOOLS } from "@/lib/tools";

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tools/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return { title: "Tool" };
  return {
    title: tool.name,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: PageProps<"/tools/[slug]">) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  return (
    <PlatformGate>
      <ToolStudio tool={tool} />
    </PlatformGate>
  );
}
