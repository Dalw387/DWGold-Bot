"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { openStudioAgent } from "@/components/agent/studio-agent";
import { Container } from "@/components/container";
import { Button, ButtonLink } from "@/components/button";
import { Logo } from "@/components/logo";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

const links = [
  { href: "/guide", label: "How it works" },
  { href: "/tools", label: "Tools" },
  { href: "/operations", label: "Operations" },
  { href: "/proof", label: "Proof" },
  { href: "/#pricing", label: "Pricing" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(176,137,79,0.28)] bg-[#fffaf3]/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active =
              link.href.startsWith("/#")
                ? false
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b0894f] ${
                  active
                    ? "bg-[#12100e] text-[#f6f1e8]"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Button
            type="button"
            variant="ghost"
            className="px-3 py-2"
            onClick={() => openStudioAgent()}
          >
            Assistant
          </Button>
          <ButtonLink href="/pay" variant="gold" className="ml-1 px-4 py-2">
            Pay {HOUSE_PRICE_SHORT}
          </ButtonLink>
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b0894f]"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex flex-col items-center gap-1.5">
            <span
              className={`block h-0.5 w-5 rounded bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 rounded bg-current transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 rounded bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </Container>
      {open ? (
        <div id={menuId} className="border-t border-stone-200 bg-[#fffaf3] md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-stone-800 hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b0894f]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setOpen(false);
                openStudioAgent();
              }}
            >
              Ask the assistant
            </Button>
            <ButtonLink
              href="/pay"
              variant="gold"
              className="mt-1"
              onClick={() => setOpen(false)}
            >
              Pay {HOUSE_PRICE_SHORT}
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
