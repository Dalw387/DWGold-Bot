"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { openStudioAgent } from "@/components/agent/studio-agent";
import { Container } from "@/components/container";
import { Button, ButtonLink } from "@/components/button";
import { Logo } from "@/components/logo";
import {
  getAccessSnapshot,
  getServerAccessSnapshot,
  hydrateAccessStore,
  subscribeAccess,
} from "@/lib/access-storage";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";

const publicLinks = [
  { href: "/#team", label: "The desks" },
  { href: "/#start", label: "Start here" },
  { href: "/#what-you-get", label: "Included" },
  { href: "/sample", label: "Sample" },
  { href: "/guide", label: "How it works" },
];

const memberLinks = [
  { href: "/tools", label: "Studio" },
  { href: "/operations", label: "Operations" },
  { href: "/proof", label: "Proof" },
  { href: "/concierge", label: "Concierge" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const access = useSyncExternalStore(
    subscribeAccess,
    getAccessSnapshot,
    getServerAccessSnapshot,
  );

  useEffect(() => {
    hydrateAccessStore();
  }, []);

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

  const links = access.unlocked ? memberLinks : publicLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <Container className="flex h-[4.25rem] items-center justify-between gap-4">
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
                className={`rounded-sm px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  active
                    ? "bg-ink text-paper"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {access.unlocked ? (
            <Button
              type="button"
              variant="ghost"
              className="px-3 py-2"
              onClick={() => openStudioAgent()}
            >
              Assistant
            </Button>
          ) : (
            <ButtonLink href="/pay" variant="gold" className="ml-1 px-4 py-2">
              Pay {HOUSE_PRICE_SHORT}
            </ButtonLink>
          )}
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-card text-foreground md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
        <div id={menuId} className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm px-3 py-3 text-base font-medium text-foreground hover:bg-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {access.unlocked ? (
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
            ) : (
              <ButtonLink
                href="/pay"
                variant="gold"
                className="mt-1"
                onClick={() => setOpen(false)}
              >
                Pay {HOUSE_PRICE_SHORT}
              </ButtonLink>
            )}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
