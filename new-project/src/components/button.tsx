import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "inverse";

const variants: Record<Variant, string> = {
  primary:
    "bg-cobalt text-ice hover:-translate-y-px hover:bg-[#4b84ff] focus-visible:outline-cyan",
  gold:
    "bg-cobalt text-ice hover:-translate-y-px hover:bg-[#4b84ff] focus-visible:outline-cyan",
  secondary:
    "border border-titanium/35 bg-transparent text-ice hover:border-titanium/70 hover:bg-white/4 focus-visible:outline-cobalt",
  inverse:
    "border border-white/20 bg-transparent text-ice hover:bg-ice hover:text-midnight focus-visible:outline-ice",
  ghost:
    "text-slate hover:bg-white/5 hover:text-ice focus-visible:outline-cobalt",
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
