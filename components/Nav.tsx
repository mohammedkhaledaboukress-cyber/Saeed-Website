"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { type Locale, t, otherLocale } from "@/lib/i18n";
import { nav, person, ui, contact } from "@/content/site";

export default function Nav({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const other = otherLocale(locale);
  const wa = `https://wa.me/${contact.whatsapp}`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "border-b hairline bg-ink/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-6 md:h-18">
          <Link
            href={`/${locale}`}
            className="text-[0.9375rem] font-semibold tracking-tight text-fg"
          >
            {t(person.name, locale)}
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[0.8125rem] text-muted transition-colors duration-300 hover:text-fg"
              >
                {t(item.label, locale)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/${other}`}
              hrefLang={other}
              className="rounded-full px-3 py-1.5 text-[0.75rem] text-muted transition-colors duration-300 hover:text-fg"
            >
              {t(ui.langToggle, locale)}
            </Link>

            <a
              href={wa}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden rounded-full border border-accent/35 px-4 py-1.5 text-[0.75rem] text-accent transition-colors duration-300 hover:border-accent/70 hover:bg-accent/10 sm:block"
            >
              {t(contact.whatsappLabel, locale)}
            </a>

            <button
              type="button"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="-me-2 flex h-10 w-10 items-center justify-center md:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-fg transition-transform duration-300 ${
                    menuOpen ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-fg transition-transform duration-300 ${
                    menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl transition-opacity duration-400 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="shell flex h-full flex-col justify-center gap-2">
          {nav.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="border-b hairline py-5 text-2xl font-medium tracking-tight transition-opacity duration-500"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "none" : "translateY(12px)",
                transition: `opacity .5s var(--ease-out-soft) ${i * 60}ms, transform .5s var(--ease-out-soft) ${i * 60}ms`,
              }}
            >
              {t(item.label, locale)}
            </a>
          ))}
          <a
            href={wa}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setMenuOpen(false)}
            className="mt-8 self-start rounded-full border border-accent/40 px-6 py-3 text-sm text-accent"
          >
            {t(contact.whatsappLabel, locale)}
          </a>
        </nav>
      </div>
    </>
  );
}
