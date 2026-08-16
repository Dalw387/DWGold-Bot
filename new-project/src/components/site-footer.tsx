import Link from "next/link";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { TOOLS } from "@/lib/tools";

const explore = [
  { href: "/tools", label: "All tools" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(176,137,79,0.25)] bg-[#fffaf3]">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <Logo compact />
          <p className="mt-4 max-w-md text-sm leading-6 text-stone-600">
            LocalLaunch AI is an early free demo. It drafts marketing words from
            templates in your browser. It does not call a paid AI service, and it
            does not store your details on a server.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-semibold text-stone-900">Explore</p>
          <ul className="mt-4 space-y-2">
            {explore.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-stone-600 hover:text-[#8c6a38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b0894f]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Tools">
          <p className="text-sm font-semibold text-stone-900">Free tools</p>
          <ul className="mt-4 space-y-2">
            {TOOLS.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-sm text-stone-600 hover:text-[#8c6a38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b0894f]"
                >
                  {tool.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-stone-200">
        <Container className="flex flex-col gap-2 py-6 text-xs leading-5 text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>LocalLaunch AI. Early free demo.</p>
          <p>Review every draft before you publish. Do not add claims you cannot support.</p>
        </Container>
      </div>
    </footer>
  );
}
