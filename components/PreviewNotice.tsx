"use client";

import { useEffect, useState } from "react";

import { type Locale, t } from "@/lib/i18n";
import { PLACEHOLDER, ui } from "@/content/site";

const KEY = "saeed-preview-dismissed";

/** Visible for as long as content/site.ts has PLACEHOLDER = true, so a
 *  preview build can never be mistaken for the finished site. */
export default function PreviewNotice({ locale }: { locale: Locale }) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!PLACEHOLDER) return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* private mode, blocked storage — show the notice anyway */
    }
    setHidden(dismissed);
  }, []);

  if (!PLACEHOLDER || hidden) return null;

  const dismiss = () => {
    setHidden(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] flex justify-center px-4 pb-4">
      <div className="flex max-w-xl items-start gap-3 rounded-2xl border border-accent/25 bg-raised/90 px-4 py-3 backdrop-blur-xl">
        <span
          aria-hidden
          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
        />
        <p className="text-[0.75rem] leading-relaxed text-muted">
          {t(ui.previewNotice, locale)}
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t(ui.close, locale)}
          className="-me-1 -mt-1 shrink-0 p-1 text-faint transition-colors hover:text-fg"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path
              d="M1 1l10 10M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1.3"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
