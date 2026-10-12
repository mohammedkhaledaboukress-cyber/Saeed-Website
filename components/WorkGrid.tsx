"use client";

import { useEffect, useState } from "react";

import { type Locale, t } from "@/lib/i18n";
import { work, workSection, ui } from "@/content/site";
import VideoLoop from "./VideoLoop";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

type Item = (typeof work)[number];

function Card({
  locale,
  item,
  onOpen,
  index,
}: {
  locale: Locale;
  item: Item;
  onOpen: () => void;
  index: number;
}) {
  return (
    <Reveal delay={Math.min(index, 5) * 70}>
      <figure className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onOpen}
          className="group relative block w-full overflow-hidden rounded-lg border hairline transition-colors duration-500 hover:border-fg/20 md:rounded-xl"
          style={{ aspectRatio: item.aspect.replace("/", " / ") }}
          aria-label={`${t(item.client, locale)} — ${t(item.format, locale)}`}
        >
          <VideoLoop
            src={item.src}
            poster={item.poster}
            soundOnHover
            className="h-full w-full"
          />

          <span className="num absolute start-3 top-3 rounded-full bg-ink/65 px-2.5 py-1 text-[0.6875rem] text-fg backdrop-blur-md">
            {t(item.result, locale)}
          </span>

          <span className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-[0.6875rem] text-muted backdrop-blur-md">
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-accent" aria-hidden>
                <path d="M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" />
              </svg>
              {t(ui.soundOn, locale)}
            </span>
          </span>
        </button>

        <figcaption className="flex flex-col gap-0.5">
          <p className="text-[0.8125rem] font-medium">
            {t(item.client, locale)}
          </p>
          <p className="text-[0.75rem] text-faint">
            {t(item.format, locale)} · {t(item.role, locale)}
          </p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export default function WorkGrid({ locale }: { locale: Locale }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = work.find((w) => w.id === openId) ?? null;

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const vertical = work.filter((w) => w.aspect === "9/16");
  const wide = work.filter((w) => w.aspect !== "9/16");

  return (
    <section id="work" className="shell scroll-mt-24 py-24 md:py-36">
      <SectionHead
        locale={locale}
        eyebrow={workSection.eyebrow}
        title={workSection.title}
        body={workSection.body}
      />

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-16 md:grid-cols-3 md:gap-x-6">
        {vertical.map((item, i) => (
          <Card
            key={item.id}
            locale={locale}
            item={item}
            index={i}
            onOpen={() => setOpenId(item.id)}
          />
        ))}
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-8 md:mt-14 md:grid-cols-2">
        {wide.map((item, i) => (
          <Card
            key={item.id}
            locale={locale}
            item={item}
            index={i}
            onOpen={() => setOpenId(item.id)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-xl md:p-10"
          onClick={() => setOpenId(null)}
        >
          <button
            type="button"
            aria-label={t(ui.close, locale)}
            onClick={() => setOpenId(null)}
            className="absolute end-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border hairline text-muted transition-colors hover:text-fg"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
          </button>

          <figure
            className="flex max-h-full w-full max-w-5xl flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={active.id}
              src={active.src}
              poster={active.poster}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-[78svh] w-auto self-center rounded-xl border hairline"
              style={{ aspectRatio: active.aspect.replace("/", " / ") }}
            />
            <figcaption className="self-center text-center">
              <p className="text-sm font-medium">{t(active.client, locale)}</p>
              <p className="mt-1 text-[0.75rem] text-faint">
                {t(active.format, locale)} · {t(active.role, locale)} ·{" "}
                {t(active.result, locale)}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
