import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#12100e] text-[#f6f1e8] shadow-sm hover:bg-[#1d1915] focus-visible:outline-[#b0894f]",
  gold:
    "bg-[#b0894f] text-[#12100e] shadow-sm hover:bg-[#c49b5e] focus-visible:outline-[#b0894f]",
  secondary:
    "border border-[rgba(176,137,79,0.45)] bg-transparent text-inherit hover:border-[#b0894f] focus-visible:outline-[#b0894f]",
  ghost:
    "text-stone-700 hover:bg-stone-100 focus-visible:outline-[#b0894f]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function ButtonAnchor({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
