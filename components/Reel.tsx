"use client";

import { useRef, useState } from "react";

import { type Locale, t } from "@/lib/i18n";
import { reel, ui } from "@/content/site";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Reel({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.volume = 0.8;
    v.currentTime = 0;
    void v.play().then(
      () => setPlaying(true),
      () => {
        // Sound was blocked. Play silently rather than doing nothing.
        v.muted = true;
        void v.play().then(() => setPlaying(true));
      },
    );
  };

  return (
    <section id="reel" className="shell scroll-mt-24 py-24 md:py-36">
      <SectionHead
        locale={locale}
        eyebrow={reel.eyebrow}
        title={reel.title}
        body={reel.body}
      />

      <Reveal delay={160} className="mt-12 md:mt-16">
        <div className="relative aspect-video overflow-hidden rounded-xl border hairline bg-raised md:rounded-2xl">
          <video
            ref={ref}
            src={reel.src}
            poster={reel.poster}
            playsInline
            preload="metadata"
            controls={playing}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            className="h-full w-full"
          />

          {!playing && (
            <button
              type="button"
              onClick={start}
              aria-label={t(ui.play, locale)}
              className="absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors duration-500 hover:bg-ink/10"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-fg/25 bg-ink/40 backdrop-blur-md transition-transform duration-500 ease-[var(--ease-out-soft)] hover:scale-105 md:h-20 md:w-20">
                <svg
                  viewBox="0 0 24 24"
                  className="ms-0.5 h-5 w-5 fill-fg md:h-6 md:w-6"
                  aria-hidden
                >
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>

              <span className="num absolute bottom-4 end-4 rounded-full bg-ink/60 px-2.5 py-1 text-[0.6875rem] text-muted backdrop-blur-md">
                {t(reel.duration, locale)}
              </span>
            </button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
