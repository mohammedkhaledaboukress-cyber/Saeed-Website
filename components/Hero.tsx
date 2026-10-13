"use client";

import { useRef, useState } from "react";

import { type Locale, t } from "@/lib/i18n";
import { hero, person, reel, ui } from "@/content/site";
import { useScrollProgress } from "@/lib/useScrollProgress";
import Rich from "./Rich";

/* The one authored moment on the page.
 *
 * The showreel opens as a letterboxed window under the headline — a frame
 * on an edit timeline. Scrolling pushes in: the headline racks out of focus,
 * the window opens to full bleed, and the monitor overlay (REC, timecode,
 * sound) fades up. It is pinned for a little over one extra screen, then
 * the page carries on. Every value is driven by `--p` in CSS, so at rest
 * (p = 0, or with no script at all) the composition is complete. */
export default function Hero({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false);
  useScrollProgress(ref);

  const toggleSound = () => {
    const v = video.current;
    if (!v) return;
    if (sound) {
      v.muted = true;
      setSound(false);
      return;
    }
    v.muted = false;
    v.volume = 0.85;
    v.currentTime = 0;
    void v.play().then(
      () => setSound(true),
      () => {
        v.muted = true;
      },
    );
  };

  return (
    <section ref={ref} className="hero relative" aria-label={t(person.name, locale)}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Footage window */}
        <div className="hero-frame absolute inset-0 bg-raised">
          <video
            ref={video}
            src={reel.src}
            poster={reel.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            className="hero-video h-full w-full object-cover"
          />
          <div className="hero-shade absolute inset-0" />

          {/* Monitor overlay — appears once the window is open */}
          <div className="pointer-events-none absolute inset-0">
            <div className="shell flex h-full flex-col justify-between pt-24 pb-8 md:pb-10">
              <div className="hud-late flex items-center justify-between text-[0.6875rem] text-fg/80">
                <span className="flex items-center gap-2 font-mono tracking-wider">
                  <span className="rec-dot h-2 w-2 rounded-full bg-[#ff453a]" />
                  REC
                </span>
                <span className="font-mono tracking-wider" dir="ltr">
                  {t(reel.duration, "en")} · 25 FPS
                </span>
              </div>

              <div className="flex items-end justify-between gap-6">
                <p className="hud-late h2 max-w-[14ch]">
                  <Rich text={t(reel.title, locale)} />
                </p>
                <button
                  type="button"
                  onClick={toggleSound}
                  className="pointer-events-auto flex shrink-0 items-center gap-2.5 rounded-full bg-fg py-2.5 ps-3 pe-5 text-[0.8125rem] font-medium text-ink transition-transform duration-300 ease-[var(--ease-out-soft)] hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink">
                    {sound ? (
                      <svg viewBox="0 0 24 24" className="h-3 w-3 fill-fg" aria-hidden>
                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="ms-0.5 h-3 w-3 fill-fg rtl:ms-0 rtl:me-0.5" aria-hidden>
                        <path d="M8 5.5v13l11-6.5z" />
                      </svg>
                    )}
                  </span>
                  {sound ? t(ui.mute, locale) : t(hero.cta, locale)}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Headline — sits above the window, racks out on scroll */}
        <div className="hero-copy absolute inset-x-0 top-0">
          <div className="shell grid gap-6 pt-28 md:grid-cols-12 md:items-end md:gap-10 md:pt-32">
            <h1 className="display whitespace-pre-line md:col-span-8">
              <Rich text={t(hero.headline, locale)} />
            </h1>
            <div className="flex flex-col gap-5 md:col-span-4 md:pb-3">
              <p className="lede max-w-[34ch]">{t(hero.body, locale)}</p>
              <p className="text-[0.75rem] text-faint">
                {t(person.role, locale)} · {t(person.location, locale)}
              </p>
            </div>
          </div>
        </div>

        <div className="hero-cue pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
          <span className="cue-line block h-8 w-px bg-fg/40" />
        </div>
      </div>
    </section>
  );
}
