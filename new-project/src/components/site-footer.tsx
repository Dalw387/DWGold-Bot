import Link from "next/link";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";

const footerLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/tools/facebook-post-generator", label: "Facebook Post Generator" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Logo compact />
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            LocalLaunch AI is an early free demo that helps small businesses draft
            marketing posts. This version uses templates in your browser. It does
            not call a paid AI service, and it does not store your details on a
            server.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-semibold text-slate-900">Explore</p>
          <ul className="mt-4 space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-slate-200">
        <Container className="flex flex-col gap-2 py-6 text-xs leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>LocalLaunch AI. Early free demo.</p>
          <p>Review every draft before you publish. Do not add claims you cannot support.</p>
        </Container>
      </div>
    </footer>
  );
}
