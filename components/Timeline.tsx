"use client";

import { useEffect, useRef } from "react";

/* The page as an edit timeline: a playhead across the top of the window and
 * a running timecode in the corner, both tied to scroll. The timecode maps
 * the full page to a four-minute cut at 25 fps — the unit an editor reads.
 * Written straight to the DOM once per frame; React never re-renders. */
const LENGTH_SECONDS = 4 * 60;
const FPS = 25;

const pad = (n: number) => String(n).padStart(2, "0");

export default function Timeline() {
  const tc = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const root = document.documentElement;

    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      root.style.setProperty("--page", p.toFixed(4));
      if (tc.current) {
        const total = Math.round(p * LENGTH_SECONDS * FPS);
        const f = total % FPS;
        const s = Math.floor(total / FPS);
        tc.current.textContent = `00:${pad(Math.floor(s / 60))}:${pad(s % 60)}:${pad(f)}`;
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
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
      >
        <div className="playhead h-full w-full bg-accent" />
      </div>
      <div
        aria-hidden
        dir="ltr"
        className="pointer-events-none fixed start-6 bottom-6 z-[60] hidden items-center gap-2 rounded-md bg-ink/60 px-2.5 py-1.5 font-mono text-[0.6875rem] tracking-wider text-muted backdrop-blur-md lg:flex"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span ref={tc}>00:00:00:00</span>
      </div>
    </>
  );
}
