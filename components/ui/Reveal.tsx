"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Extra wait in ms before this element animates (use for staggering cards). */
  delay?: number;
  className?: string;
};

// Fade + small upward move the first time the element scrolls into view.
//
// The content is fully visible in the server HTML and until JavaScript runs, so nothing is
// ever hidden if JS fails. Only elements that start below the fold are hidden (data-reveal="hidden"),
// then shown once by an IntersectionObserver. The animation CSS lives in globals.css.
// Users who prefer reduced motion never get the hidden state at all.
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already on screen: no flash

    element.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.reveal = "shown";
        observer.disconnect(); // animate once only
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}
