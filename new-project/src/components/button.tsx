import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "inverse";

const variants: Record<Variant, string> = {
  primary:
    "bg-cobalt text-ice shadow-[0_0_0_1px_rgb(139_92_255_/_0.45),0_12px_40px_rgb(77_111_255_/_0.38)] hover:-translate-y-px hover:bg-[#5b7cff] hover:shadow-[0_0_0_1px_rgb(77_240_255_/_0.35),0_18px_50px_rgb(255_90_217_/_0.28)] focus-visible:outline-cyan",
  gold:
    "bg-cobalt text-ice shadow-[0_0_0_1px_rgb(139_92_255_/_0.45),0_12px_40px_rgb(77_111_255_/_0.38)] hover:-translate-y-px hover:bg-[#5b7cff] focus-visible:outline-cyan",
  secondary:
    "border border-white/15 bg-white/3 text-ice hover:border-cobalt/50 hover:bg-white/6 focus-visible:outline-cobalt",
  inverse:
    "border border-white/20 bg-transparent text-ice hover:bg-ice hover:text-midnight focus-visible:outline-ice",
  ghost:
    "text-slate hover:bg-white/5 hover:text-ice focus-visible:outline-cobalt",
};

const base =
  "group btn-shine inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold tracking-wide transition-[color,background-color,box-shadow,transform,border-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">
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
