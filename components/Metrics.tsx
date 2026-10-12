"use client";

import { useEffect, useRef, useState } from "react";

import { type Locale, t } from "@/lib/i18n";
import { metrics } from "@/content/site";

function useCountUp(target: number, run: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setValue(target);
      return;
    }

    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast then settles, never overshoots
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(target * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run]);

  return value;
}

function Metric({
  locale,
  item,
  run,
}: {
  locale: Locale;
  item: (typeof metrics)[number];
  run: boolean;
}) {
  const value = useCountUp(item.value, run);
  const shown = item.value % 1 === 0 ? Math.round(value) : value.toFixed(1);

  return (
    <div className="flex flex-col gap-2 border-t hairline pt-5">
      <p className="num text-4xl text-accent md:text-5xl">
        {shown}
        {t(item.suffix, locale)}
      </p>
      <p className="text-[0.8125rem] leading-snug text-muted">
        {t(item.label, locale)}
      </p>
    </div>
  );
}

export default function Metrics({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setRun(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="shell py-16 md:py-20">
      <div
        ref={ref}
        className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10"
      >
        {metrics.map((m, i) => (
          <Metric key={i} locale={locale} item={m} run={run} />
        ))}
      </div>
    </section>
  );
}
