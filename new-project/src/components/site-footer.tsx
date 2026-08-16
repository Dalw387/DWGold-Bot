import Link from "next/link";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { TOOLS } from "@/lib/tools";

const explore = [
  { href: "/guide", label: "How it works" },
  { href: "/tools", label: "All tools" },
  { href: "/operations", label: "House Operations" },
  { href: "/concierge", label: "Concierge" },
  { href: "/proof", label: "Proof ledger" },
  { href: "/pay", label: "Pay £197" },
  { href: "/#pricing", label: "Pricing" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(176,137,79,0.25)] bg-[#fffaf3]">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <Logo compact />
          <p className="mt-4 max-w-md text-sm leading-6 text-stone-600">
            LocalLaunch AI is an early studio. The complimentary rooms draft
            marketing words in your browser. House Operations is £197 one-off
            on Stripe for SEO and ads drafts plus a proof ledger. Ad spend at
            Meta or Google is separate and paid to them.
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
