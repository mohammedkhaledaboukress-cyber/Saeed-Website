"use client";

import { useEffect, useRef, useState } from "react";

import { type L, type Locale, t } from "@/lib/i18n";

/* Two drawing sizes so labels stay legible: the SVG scales with its box,
   so a phone gets a narrower canvas rather than shrunken text. */
const SIZES = {
  wide: { W: 800, H: 280, PAD: { top: 28, right: 56, bottom: 36, left: 16 } },
  compact: { W: 380, H: 240, PAD: { top: 28, right: 44, bottom: 34, left: 12 } },
};

/* One series, one job: show output climbing month by month. The line draws
 * itself once on entry; hovering shows a crosshair and the exact value.
 * Values are also available as a table for screen readers. */
export default function OutputChart({
  locale,
  data,
  label,
  monthLabel,
}: {
  locale: Locale;
  data: number[];
  label: L;
  monthLabel: L;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [compact, setCompact] = useState(false);
  const { W, H, PAD } = compact ? SIZES.compact : SIZES.wide;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const on = () => setCompact(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { rootMargin: "100000px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const max = Math.max(...data) * 1.1;
  const x = (i: number) => PAD.left + (i / (data.length - 1)) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - v / max) * (H - PAD.top - PAD.bottom);
  const line = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("");
  const area = `${line}L${x(data.length - 1)},${H - PAD.bottom}L${x(0)},${H - PAD.bottom}Z`;
  const last = data.length - 1;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - PAD.left) / (W - PAD.left - PAD.right)) * (data.length - 1));
    setHover(Math.min(Math.max(i, 0), last));
  };

  return (
    <figure ref={ref} data-drawn={drawn} className="flex flex-col gap-4">
      <figcaption className="text-[0.9375rem] text-muted">{t(label, locale)}</figcaption>
      <div className="relative" dir="ltr">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full touch-none overflow-visible"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={`${t(label, locale)}: ${data[0]} → ${data[last]}`}
        >
          <defs>
            <linearGradient id="out-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.22" />
              <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* baseline only — the grid stays out of the way */}
          <line x1={PAD.left} x2={W - PAD.right} y1={H - PAD.bottom} y2={H - PAD.bottom} stroke="currentColor" className="text-fg/15" />
          {data.map((_, i) => (compact && i % 2 === 1 && i !== data.length - 1) ? null : (
            <text key={i} x={x(i)} y={H - 12} textAnchor="middle" className="fill-faint text-[11px] tabular-nums">
              {i + 1}
            </text>
          ))}

          <path d={area} fill="url(#out-fill)" className="draw-dot" />
          <path d={line} pathLength={1} fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="draw-line" />

          {/* direct labels on the two values that matter */}
          <g className="draw-dot">
            <circle cx={x(0)} cy={y(data[0])} r="4" fill="var(--color-ink)" stroke="var(--color-accent)" strokeWidth="2" />
            <text x={x(0) + 10} y={y(data[0]) - 10} className="fill-muted text-[13px] tabular-nums">{data[0]}</text>
            <circle cx={x(last)} cy={y(data[last])} r="5" fill="var(--color-accent)" stroke="var(--color-ink)" strokeWidth="2" />
            <text x={x(last) + 12} y={y(data[last]) + 6} className="fill-fg text-[22px] font-semibold tabular-nums">{data[last]}</text>
          </g>

          {hover !== null && (
            <g pointerEvents="none">
              <line x1={x(hover)} x2={x(hover)} y1={PAD.top - 8} y2={H - PAD.bottom} stroke="currentColor" className="text-fg/30" strokeDasharray="3 4" />
              <circle cx={x(hover)} cy={y(data[hover])} r="5" fill="var(--color-accent)" stroke="var(--color-ink)" strokeWidth="2" />
            </g>
          )}
          {/* generous invisible hit area */}
          <rect x="0" y="0" width={W} height={H} fill="transparent" />
        </svg>

        {hover !== null && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg bg-raised-2 px-3 py-2 text-[0.8125rem] whitespace-nowrap shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)]"
            style={{ left: `${(x(hover) / W) * 100}%`, top: `${(y(data[hover]) / H) * 100}%`, marginTop: -14 }}
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <span className="text-faint">{t(monthLabel, locale)} {hover + 1} · </span>
            <span className="num font-medium text-fg">{data[hover]}</span>
          </div>
        )}
      </div>

      <table className="sr-only">
        <caption>{t(label, locale)}</caption>
        <tbody>
          {data.map((v, i) => (
            <tr key={i}>
              <th scope="row">{t(monthLabel, locale)} {i + 1}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
