"use client";

import { useState } from "react";

import { type Locale, t } from "@/lib/i18n";
import { beforeAfter, beforeAfterSection, ui } from "@/content/site";
import VideoLoop from "./VideoLoop";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

function Comparison({
  locale,
  item,
}: {
  locale: Locale;
  item: (typeof beforeAfter)[number];
}) {
  const [pct, setPct] = useState(50);

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-xl border hairline">
        {/* Raw underneath, finished cut clipped on top. */}
        <VideoLoop
          src={item.before}
          poster={item.poster}
          className="absolute inset-0 h-full w-full"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
        >
          <VideoLoop
            src={item.after}
            poster={item.poster}
            className="h-full w-full"
          />
        </div>

        {/* Divider */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-fg/60"
          style={{ left: `${pct}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-fg/40 bg-ink/70 backdrop-blur-md">
            <svg viewBox="0 0 16 16" className="h-3 w-3 fill-fg" aria-hidden>
              <path d="M6 3L2 8l4 5V3zm4 0v10l4-5-4-5z" />
            </svg>
          </span>
        </div>

        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-ink/70 px-2.5 py-1 text-[0.6875rem] text-muted backdrop-blur-md">
          {t(ui.before, locale)}
        </span>
        <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-ink/70 px-2.5 py-1 text-[0.6875rem] text-accent backdrop-blur-md">
          {t(ui.after, locale)}
        </span>

        {/* The control itself: a real range input, so it works with a mouse,
            a finger, and the keyboard without any extra code. */}
        <input
          type="range"
          min={0}
          max={100}
          value={pct}
          dir="ltr"
          onChange={(e) => setPct(Number(e.target.value))}
          aria-label={`${t(ui.before, locale)} / ${t(ui.after, locale)}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <figcaption className="text-[0.75rem] text-faint">
        {t(item.label, locale)}
      </figcaption>
    </figure>
  );
}

export default function BeforeAfter({ locale }: { locale: Locale }) {
  return (
    <section className="shell py-24 md:py-36">
      <SectionHead
        locale={locale}
        eyebrow={beforeAfterSection.eyebrow}
        title={beforeAfterSection.title}
        body={beforeAfterSection.body}
      />

      <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2">
        {beforeAfter.map((item, i) => (
          <Reveal key={item.id} delay={i * 90}>
            <Comparison locale={locale} item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
