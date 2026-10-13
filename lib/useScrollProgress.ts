"use client";

import { useEffect, type RefObject } from "react";

/** Writes scroll progress through a tall section (0 → 1) to a CSS custom
 *  property on that element, once per frame, without re-rendering React.
 *
 *  0 = the section's top has just reached the top of the viewport.
 *  1 = its bottom has just reached the bottom of the viewport.
 *
 *  Everything that animates reads `var(--p)` in CSS, so the default state
 *  (p = 0) is fully visible and nothing depends on this script running. */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  name = "--p",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    let last = -1;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? Math.min(Math.max(-r.top / travel, 0), 1) : 0;
      if (Math.abs(p - last) > 0.0005) {
        el.style.setProperty(name, p.toFixed(4));
        last = p;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, name]);
}
