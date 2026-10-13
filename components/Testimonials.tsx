"use client";

import { useEffect, useRef, useState } from "react";

import { type Locale, t } from "@/lib/i18n";
import { testimonials, testimonialsSection } from "@/content/site";
import VideoLoop from "./VideoLoop";
import Rich from "./Rich";
import Reveal from "./Reveal";

const DWELL = 9000;

/* One voice at a time, large. The speakers run along the bottom like clips
 * in a bin; the active one carries a progress bar and the quote advances on
 * its own unless the visitor takes over. */
export default function Testimonials({ locale }: { locale: Locale }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const item = testimonials[i];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!auto || !visible || reduced) return;
    const id = window.setTimeout(() => setI((n) => (n + 1) % testimonials.length), DWELL);
    return () => window.clearTimeout(id);
  }, [i, auto, visible]);

  return (
    <section ref={ref} className="shell py-28 md:py-40" aria-roledescription="carousel">
      <Reveal>
        <h2 className="h2 max-w-[16ch]">
          <Rich text={t(testimonialsSection.title, locale)} />
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-center md:gap-12">
        <div className="md:col-span-4">
          <div className="relative mx-auto aspect-4/5 max-w-[340px] overflow-hidden rounded-2xl bg-raised md:max-w-none">
            {testimonials.map((tm, n) => (
              <div
                key={tm.id}
                className="absolute inset-0 transition-[opacity,filter] duration-700 ease-[var(--ease-out-soft)]"
                style={{ opacity: n === i ? 1 : 0, filter: n === i ? "none" : "blur(10px)" }}
                aria-hidden={n !== i}
              >
                <VideoLoop src={tm.src} poster={tm.poster} soundOnHover className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>

        <figure className="md:col-span-7 md:col-start-6" aria-live="polite">
          <blockquote
            key={item.id}
            className="quote-in text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.3] font-medium tracking-[-0.02em] text-fg rtl:font-[family-name:var(--font-arabic-display)] rtl:leading-[1.6] rtl:tracking-normal"
          >
            <span aria-hidden className="voice me-1 text-[1.4em] leading-none">
              “
            </span>
            {t(item.quote, locale)}
          </blockquote>
          <figcaption className="mt-8">
            <p className="text-[0.9375rem] font-medium">{t(item.name, locale)}</p>
            <p className="mt-1 text-[0.8125rem] text-faint">{t(item.title, locale)}</p>
          </figcaption>
        </figure>
      </div>

      <div className="mt-14 grid grid-cols-3 gap-3 md:mt-20 md:gap-6" role="tablist">
        {testimonials.map((tm, n) => (
          <button
            key={tm.id}
            type="button"
            role="tab"
            aria-selected={n === i}
            onClick={() => {
              setI(n);
              setAuto(false);
            }}
            className="group flex flex-col gap-3 text-start"
          >
            <span className="relative block h-px w-full overflow-hidden bg-fg/15">
              <span
                key={`${n}-${i}-${auto}-${visible}`}
                className={`absolute inset-0 origin-left bg-accent rtl:origin-right ${
                  n === i ? (auto && visible ? "bar-run" : "scale-x-100") : "scale-x-0"
                }`}
                style={{ animationDuration: `${DWELL}ms` }}
              />
            </span>
            <span
              className={`text-[0.8125rem] transition-colors duration-300 ${
                n === i ? "text-fg" : "text-faint group-hover:text-muted"
              }`}
            >
              {t(tm.name, locale)}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
