import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "inverse";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(100deg,#49E6FF_0%,#5277FF_55%,#8B5CFF_100%)] text-void hover:-translate-y-px hover:shadow-[0_12px_32px_rgb(73_230_255_/_0.28)] focus-visible:outline-cyan",
  gold:
    "bg-[linear-gradient(100deg,#49E6FF_0%,#5277FF_55%,#8B5CFF_100%)] text-void hover:-translate-y-px hover:shadow-[0_12px_32px_rgb(228_71_209_/_0.22)] focus-visible:outline-magenta",
  secondary:
    "border border-cyan/30 bg-void/40 text-ice hover:border-magenta/50 hover:bg-white/4 focus-visible:outline-cyan",
  inverse:
    "border border-white/20 bg-transparent text-ice hover:bg-ice hover:text-void focus-visible:outline-ice",
  ghost:
    "text-slate hover:bg-white/5 hover:text-ice focus-visible:outline-cyan",
};

const base =
  "group btn-shine inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] px-5 py-2.5 text-[0.9375rem] font-semibold tracking-wide transition-[color,background-color,box-shadow,transform,border-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
      →
    </span>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  arrow = false,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; arrow?: boolean }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  arrow = false,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean; children?: ReactNode }) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

export function ButtonAnchor({
  variant = "primary",
  className = "",
  children,
  arrow = false,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; arrow?: boolean }) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </a>
  );
}
