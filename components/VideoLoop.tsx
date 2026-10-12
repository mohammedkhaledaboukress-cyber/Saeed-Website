"use client";

import { useEffect, useRef } from "react";

/** A silent autoplay loop that only plays while it is on screen.
 *
 *  With eight or more clips on one page, letting them all decode at once is
 *  what makes a video-heavy site feel cheap — it drains battery and stalls
 *  scrolling. Each instance observes itself and pauses the moment it leaves
 *  the viewport. */
export default function VideoLoop({
  src,
  poster,
  soundOnHover = false,
  className = "",
  children,
}: {
  src: string;
  poster?: string;
  soundOnHover?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: leave the poster frame up, never autoplay.
    if (reduced || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          v.play().catch(() => {
            /* blocked autoplay — poster stays, nothing breaks */
          });
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 },
    );

    io.observe(v);
    return () => io.disconnect();
  }, []);

  const unmute = () => {
    const v = ref.current;
    if (!v || !soundOnHover) return;
    v.volume = 0.55;
    v.muted = false;
  };

  const mute = () => {
    const v = ref.current;
    if (v) v.muted = true;
  };

  return (
    <div
      className={`group relative overflow-hidden bg-raised ${className}`}
      onMouseEnter={unmute}
      onMouseLeave={mute}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
        aria-hidden
        /* No opacity gate here on purpose. The poster frame IS the loading
           state, and it lives on this element — hiding the video until
           `loadeddata` would blank the poster too, leaving an empty box
           whenever a file is slow, blocked, or fails outright. */
      />
      {children}
    </div>
  );
}
