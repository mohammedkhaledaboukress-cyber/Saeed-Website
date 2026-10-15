"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { type Locale, t } from "@/lib/i18n";
import { work, workSection, ui } from "@/content/site";
import VideoLoop from "./VideoLoop";
import SectionHead from "./SectionHead";
import { useScrollProgress } from "@/lib/useScrollProgress";

type Item = (typeof work)[number];

/* Each clip is a frame on the strip. Height is fixed per breakpoint and the
 * width follows the clip's own aspect ratio, so vertical reels and wide
 * films sit on one baseline like clips on a timeline. */
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
  const btn = useRef<HTMLButtonElement>(null);
  const tc = useRef<HTMLSpanElement>(null);

  /* Skimming: on a mouse, moving across the clip scrubs through it, the way
     an editor skims media in a bin. Touch keeps tap-to-open. */
  const skim = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const b = btn.current;
    const v = b?.querySelector("video");
    if (!b || !v) return;
    const r = b.getBoundingClientRect();
    const f = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
    b.style.setProperty("--x", `${f * 100}%`);
    b.classList.add("skimming");
    if (v.preload !== "auto") v.preload = "auto";
    const d = Number.isFinite(v.duration) ? v.duration : 0;
    if (d) {
      if (!v.paused) v.pause();
      v.currentTime = f * d;
    }
    if (tc.current) {
      const s = f * d;
      tc.current.textContent = `00:${String(Math.floor(s)).padStart(2, "0")}:${String(Math.floor((s % 1) * 25)).padStart(2, "0")}`;
    }
  };
  const endSkim = () => {
    const b = btn.current;
    b?.classList.remove("skimming");
    void b?.querySelector("video")?.play().catch(() => {});
  };

  return (
    <figure className="flex shrink-0 snap-start flex-col gap-4">
      <button
        ref={btn}
        type="button"
        data-clip={item.id}
        onClick={onOpen}
        onPointerMove={skim}
        onPointerLeave={endSkim}
        className="group relative block h-[62svh] max-h-[640px] min-h-[360px] overflow-hidden rounded-lg bg-raised transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] active:scale-[0.99] md:h-[50svh] md:max-h-[560px] md:min-h-[320px] md:rounded-xl"
        style={{ aspectRatio: item.aspect.replace("/", " / ") }}
        aria-label={`${t(item.client, locale)} — ${t(item.format, locale)}`}
      >
        <VideoLoop
          src={item.src}
          poster={item.poster}
          soundOnHover
          className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
        />

        <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

        {/* Skim playhead */}
        <span aria-hidden className="skim-head pointer-events-none absolute inset-y-0 w-px bg-accent">
          <span
            ref={tc}
            dir="ltr"
            className="absolute top-3 -translate-x-1/2 rounded bg-ink/80 px-1.5 py-0.5 font-mono text-[0.625rem] text-fg backdrop-blur"
          />
        </span>

        <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-start">
          <span className="num text-[clamp(1.4rem,2.2vw,2rem)] leading-none text-fg">
            {t(item.result, locale)}
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fg/15 backdrop-blur-md transition-colors duration-300 group-hover:bg-accent">
            <svg viewBox="0 0 24 24" className="ms-0.5 h-3 w-3 fill-fg transition-colors group-hover:fill-ink" aria-hidden>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </span>
      </button>

      <figcaption className="flex flex-col gap-1">
        <p className="font-mono text-[0.625rem] tracking-wider text-faint" dir="ltr">
          {`TC 00:${String(index * 2).padStart(2, "0")}:${String((index * 17) % 60).padStart(2, "0")}:00`}
        </p>
        <p className="text-[0.875rem] font-medium">{t(item.client, locale)}</p>
        <p className="text-[0.75rem] text-faint">
          {t(item.format, locale)} · {t(item.role, locale)}
        </p>
      </figcaption>
    </figure>
  );
}

export default function WorkGrid({ locale }: { locale: Locale }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = work.find((w) => w.id === openId) ?? null;

  /* The clip grows out of its place on the strip into the player and goes
     back on close (View Transitions). Browsers without it just cut. */
  const swap = (id: string | null, update: () => void) => {
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const card = id
      ? document.querySelector<HTMLElement>(`[data-clip="${id}"]`)
      : null;
    if (!doc.startViewTransition || reduced || !card) {
      update();
      return;
    }
    const opening = openId === null;
    // Only one element may carry the name at a time: the card before
    // opening, the player while open.
    if (opening) card.style.setProperty("view-transition-name", "clip");
    const vt = doc.startViewTransition(() => {
      if (opening) card.style.removeProperty("view-transition-name");
      flushSync(update);
      if (!opening) card.style.setProperty("view-transition-name", "clip");
    });
    void vt.finished.finally(() => card.style.removeProperty("view-transition-name"));
  };
  const open = (id: string) => swap(id, () => setOpenId(id));
  const close = () => {
    if (!openId) return;
    const id = openId;
    swap(id, () => setOpenId(null));
  };
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useScrollProgress(section);

  /* Pinning is a wide-screen behaviour. On phones the strip is a native
     swipe with snap points, which is what thumbs already expect. */
  useEffect(() => {
    const el = section.current;
    const tr = track.current;
    if (!el || !tr) return;
    const wide = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      if (!wide.matches || reduced.matches) {
        el.style.removeProperty("--travel");
        el.style.removeProperty("height");
        return;
      }
      const travel = Math.max(tr.scrollWidth - tr.clientWidth, 0);
      el.style.setProperty("--travel", `${travel}px`);
      el.style.height = `${travel + window.innerHeight}px`;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(tr);
    wide.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      wide.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <section ref={section} id="work" className="strip relative scroll-mt-0">
      <div className="flex min-h-[100svh] flex-col justify-center gap-10 py-24 md:sticky md:top-0 md:h-[100svh] md:gap-10 md:overflow-hidden md:pt-16 md:pb-0">
        <div className="strip-head shell">
          <SectionHead
            locale={locale}
            title={workSection.title}
            body={workSection.body}
          />
        </div>

        <div
          ref={track}
          className="strip-track flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:snap-none md:gap-6 md:overflow-visible md:px-[max(calc((100vw-73rem)/2),2.5rem)] [&::-webkit-scrollbar]:hidden"
        >
          {work.map((item, i) => (
            <Card
              key={item.id}
              locale={locale}
              item={item}
              index={i}
              onOpen={() => open(item.id)}
            />
          ))}
        </div>

        <div className="shell hidden md:block">
          <div className="ruler h-3" />
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-xl md:p-10"
          onClick={close}
        >
          <button
            type="button"
            aria-label={t(ui.close, locale)}
            onClick={close}
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
              className="max-h-[78svh] w-auto max-w-full self-center rounded-xl"
              style={{
                aspectRatio: active.aspect.replace("/", " / "),
                viewTransitionName: "clip",
              }}
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
