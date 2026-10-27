"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavLink } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";

type MobileNavProps = {
  links: NavLink[];
  cta: NavLink;
};

// Disclosure-style menu: a button toggles a panel of links.
// Rendered inside <header> (position: absolute), so the panel anchors to the header.
export function MobileNav({ links, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    // If the window grows to desktop width the menu is hidden, so reset the state.
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <nav aria-label="Mobile" className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center gap-3 px-1 text-sm uppercase tracking-[0.14em] text-paper focus-visible:outline-paper"
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span aria-hidden="true" className="flex w-6 flex-col gap-1.5">
          <span
            className={`h-px bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </span>
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-line bg-cream shadow-lg"
      >
        <ul className="px-5 pt-2 sm:px-8">
          {links.map((link) => (
            <li key={link.href} className="border-b border-line">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-4 font-serif text-2xl text-ink hover:text-taupe-dark"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-5 py-5 sm:px-8">
          <ButtonLink
            href={cta.href}
            onClick={() => setOpen(false)}
            className="w-full !bg-ink !text-paper hover:!bg-taupe-dark"
          >
            {cta.label}
          </ButtonLink>
        </div>
      </div>
    </nav>
  );
}
