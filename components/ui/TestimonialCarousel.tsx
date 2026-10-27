"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Testimonial } from "@/lib/testimonials";
import { Avatar } from "./Avatar";

// Timing: change these two numbers to make the carousel faster or slower.
const AUTOPLAY_MS = 6000; // wait between slides
const SLIDE_MS = 900; // how long one slide takes to glide

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const reduceQuery = "(prefers-reduced-motion: reduce)";
function useReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia(reduceQuery);
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia(reduceQuery).matches,
    () => false,
  );
}

// Looping carousel with one dot per testimonial (3 slides) at every screen size.
// The cards are rendered twice, so after the last slide the track glides forward onto the
// copy and then silently jumps back to the start: it never visibly rewinds.
// Touch swipe / trackpad / mouse-wheel scrolling still works because the track is a normal scroller.
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const count = items.length;
  const trackRef = useRef<HTMLUListElement>(null);
  const frameRef = useRef(0);
  const animatingRef = useRef(false);
  const settleRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const activeRef = useRef(0); // latest active slide, readable inside long-lived listeners

  const [active, setActiveState] = useState(0);
  const [hovered, setHovered] = useState(false); // pointer or keyboard focus inside
  const reduceMotion = useReducedMotion();

  const setActive = useCallback((index: number) => {
    activeRef.current = index;
    setActiveState(index);
  }, []);

  // Distance from the start of one card to the start of the next.
  const getStep = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return track?.clientWidth ?? 1;
    return (track.children[1] as HTMLElement).offsetLeft - (track.children[0] as HTMLElement).offsetLeft;
  }, []);

  // Smoothly scrolls the track to `left` (eased), or jumps there when motion is reduced.
  const animateTo = useCallback(
    (left: number, onDone?: () => void) => {
      const track = trackRef.current;
      if (!track) return;
      cancelAnimationFrame(frameRef.current);

      if (reduceMotion) {
        track.scrollLeft = left;
        onDone?.();
        return;
      }

      const from = track.scrollLeft;
      const start = performance.now();
      animatingRef.current = true;
      track.style.scrollSnapType = "none"; // snapping would fight the animation

      const frame = (now: number) => {
        const progress = Math.min(1, (now - start) / SLIDE_MS);
        track.scrollLeft = from + (left - from) * easeInOut(progress);
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(frame);
        } else {
          animatingRef.current = false;
          track.style.scrollSnapType = "";
          onDone?.();
        }
      };
      frameRef.current = requestAnimationFrame(frame);
    },
    [reduceMotion],
  );

  // Move to the slide `index` (may be `count`, the copy of slide 0, then wrap silently).
  const goTo = useCallback(
    (index: number) => {
      const step = getStep();
      setActive(index % count);
      animateTo(index * step, () => {
        const track = trackRef.current;
        if (track && index >= count) track.scrollLeft = (index - count) * step;
      });
    },
    [animateTo, count, getStep, setActive],
  );

  // Autoplay.
  useEffect(() => {
    if (hovered || reduceMotion) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      goTo(active + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [active, hovered, reduceMotion, goTo]);

  // Keep the dots in sync when the user swipes/scrolls by hand, and silently wrap out of the copy.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (animatingRef.current) return;
      const step = getStep();
      const index = Math.round(track.scrollLeft / step);
      setActive(index % count);
      clearTimeout(settleRef.current);
      settleRef.current = setTimeout(() => {
        if (Math.round(track.scrollLeft / step) >= count) track.scrollLeft -= count * step;
      }, 150);
    };
    // After a resize the card width changes, so re-align to the current slide.
    const observer = new ResizeObserver(() => {
      if (!animatingRef.current) track.scrollLeft = activeRef.current * getStep();
    });

    track.addEventListener("scroll", onScroll, { passive: true });
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", onScroll);
      observer.disconnect();
      clearTimeout(settleRef.current);
    };
  }, [count, getStep, setActive]);

  // Stop any running slide animation when the component unmounts.
  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const slides = [...items, ...items]; // second half = copy used for the seamless wrap

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* px/pb + negative margins leave room for the card shadows, which overflow would clip */}
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-live={!hovered && !reduceMotion ? "off" : "polite"}
        aria-label="Testimonials"
        className="relative -mx-2 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-2 px-2 pb-10 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((item, index) => {
          const isCopy = index >= count;
          return (
            <li
              key={`${item.id}-${isCopy ? "copy" : "main"}`}
              aria-hidden={isCopy || undefined}
              aria-label={isCopy ? undefined : `Testimonial ${index + 1} of ${count}`}
              className="flex shrink-0 basis-full snap-start md:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
            >
              <figure className="flex w-full flex-col rounded-xl bg-paper p-6 shadow-lg shadow-ink/10 sm:p-7">
                <blockquote className="flex-1 text-base leading-relaxed text-ink">
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <Avatar name={item.name} photo={item.photo} />
                  <div>
                    <p className="text-base text-ink">{item.name}</p>
                    <p className="text-sm text-ink-soft">{item.role}</p>
                  </div>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      <div className="flex h-6 items-center justify-center">
        <div role="group" aria-label="Choose testimonial" className="flex items-center">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1} of ${count}`}
              aria-current={index === active ? "true" : undefined}
              className="group flex size-6 items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  index === active ? "size-2.5 bg-ink" : "size-2 bg-ink-soft/40 group-hover:bg-ink-soft"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
