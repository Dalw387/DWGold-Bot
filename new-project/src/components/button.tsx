import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "inverse";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-[#1c1c1c] focus-visible:outline-accent",
  gold:
    "bg-accent text-paper hover:bg-[#0f2623] focus-visible:outline-accent",
  secondary:
    "border border-ink bg-transparent text-inherit hover:bg-ink hover:text-paper focus-visible:outline-accent",
  inverse:
    "border border-paper bg-transparent text-paper hover:bg-paper hover:text-ink focus-visible:outline-paper",
  ghost:
    "text-muted hover:bg-wash focus-visible:outline-accent",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

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
