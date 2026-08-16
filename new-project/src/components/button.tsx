import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "inverse";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#191919] text-[#f4f3ef] hover:bg-[#2a2a28] focus-visible:outline-[#1e3a34]",
  gold:
    "bg-[#1e3a34] text-[#f4f3ef] hover:bg-[#162e29] focus-visible:outline-[#1e3a34]",
  secondary:
    "border border-[#191919] bg-transparent text-inherit hover:bg-[#191919] hover:text-[#f4f3ef] focus-visible:outline-[#1e3a34]",
  inverse:
    "border border-[#f4f3ef] bg-transparent text-[#f4f3ef] hover:bg-[#f4f3ef] hover:text-[#191919] focus-visible:outline-[#f4f3ef]",
  ghost:
    "text-[#3a3936] hover:bg-[#eceae4] focus-visible:outline-[#1e3a34]",
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
