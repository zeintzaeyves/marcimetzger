import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "light" | "sand" | "dark" | "outline" | "ghost-light";

const base = "inline-flex items-center justify-center text-center font-medium transition-colors duration-300";

const variants: Record<Variant, string> = {
  // White pill (header CTA, hero button)
  light:
    "rounded-full bg-paper px-6 py-3 text-base text-ink hover:bg-cream-deep focus-visible:outline-paper sm:px-8",
  // Black pill / outlined pill (About section)
  dark: "rounded-full bg-ink px-5 py-3 text-sm text-paper hover:bg-taupe-dark",
  outline: "rounded-full border border-ink px-8 py-3 text-sm text-ink hover:bg-ink hover:text-paper",
  // Transparent pill with a thin white border (secondary CTA on dark photos)
  "ghost-light":
    "rounded-full border border-paper/80 px-6 py-3 text-base text-paper hover:bg-paper/10 focus-visible:outline-paper sm:px-8",
  // Taupe rectangle (search button)
  sand: "rounded-md bg-sand px-6 py-3.5 text-sm uppercase tracking-[0.08em] text-ink hover:bg-taupe hover:text-paper",
};

export function buttonClasses(variant: Variant = "light", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

type ButtonLinkProps = { variant?: Variant } & ComponentPropsWithoutRef<typeof Link>;

// A link that looks like a button (navigation). Real <button>s use buttonClasses().
export function ButtonLink({ variant = "light", className = "", ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
