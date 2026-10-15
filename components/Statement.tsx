"use client";

import { useRef } from "react";

import { type Locale, t } from "@/lib/i18n";
import { statement } from "@/content/site";
import { useScrollProgress } from "@/lib/useScrollProgress";

/* The headline numbers as one sentence, set very large and pinned. Each word
 * brightens as the reader scrolls through it, so the claim is read at the
 * speed it is made. Words carrying a figure take the accent. With reduced
 * motion, or no script, the whole sentence is simply at full strength. */
export default function Statement({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref);
  const words = t(statement, locale).split(" ");

  return (
    <section ref={ref} className="statement relative" aria-label={t(statement, locale)}>
      <div className="sticky top-0 flex h-[100svh] items-center">
        <p
          aria-hidden
          className="shell text-[clamp(2rem,5.6vw,5rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-balance rtl:font-[family-name:var(--font-arabic-display)] rtl:leading-[1.45] rtl:tracking-normal"
        >
          {words.map((w, i) => (
            <span
              key={i}
              className={`w ${/\d/.test(w) ? "text-accent" : ""}`}
              style={{ "--i": i, "--n": words.length } as React.CSSProperties}
            >
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
