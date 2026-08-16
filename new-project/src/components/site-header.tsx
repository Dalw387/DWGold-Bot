"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { openStudioAgent } from "@/components/agent/studio-agent";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { Logo } from "@/components/logo";
import {
  getAccessSnapshot,
  getServerAccessSnapshot,
  hydrateAccessStore,
  subscribeAccess,
} from "@/lib/access-storage";
import { openBuildTeam } from "@/lib/sales";

const publicLinks = [
  { href: "/#control", label: "Control Centre" },
  { href: "/#agents", label: "AI Team" },
  { href: "/#solutions", label: "Industries" },
  { href: "/audit", label: "Score" },
  { href: "/#pricing", label: "Pricing" },
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
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#050611]/70 backdrop-blur-2xl">
      <Container className="flex h-20 items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Logo />
          <p className="hidden items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-scout xl:flex">
            <span className="status-dot" />
            Live workforce
          </p>
        </div>
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active =
              link.href.startsWith("/#")
                ? false
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-[0.82rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                  active ? "text-ice" : "text-titanium hover:text-ice"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {access.unlocked ? (
            <Button type="button" variant="ghost" className="px-3 py-2" onClick={() => openStudioAgent()}>
              Assistant
            </Button>
          ) : (
            <Button type="button" variant="gold" className="ml-2 px-4 py-2" arrow onClick={() => openBuildTeam()}>
              Build My AI Team
            </Button>
          )}
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/12 bg-elevated text-ice lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex flex-col items-center gap-1.5">
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </Container>
      {open ? (
        <div id={menuId} className="border-t border-white/8 bg-void lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-ice hover:bg-white/5"
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
              <Button
                type="button"
                variant="gold"
                className="mt-1"
                arrow
                onClick={() => {
                  setOpen(false);
                  openBuildTeam();
                }}
              >
                Build My AI Team
              </Button>
            )}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
