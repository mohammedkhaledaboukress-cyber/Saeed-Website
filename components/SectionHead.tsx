import type { L, Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function SectionHead({
  locale,
  eyebrow,
  title,
  body,
  align = "start",
}: {
  locale: Locale;
  eyebrow: L;
  title: L;
  body?: L;
  align?: "start" | "center";
}) {
  return (
    <header
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <Reveal>
        <p className="eyebrow">{t(eyebrow, locale)}</p>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="h2 max-w-3xl">{t(title, locale)}</h2>
      </Reveal>
      {body && (
        <Reveal delay={120}>
          <p className="lede max-w-xl">{t(body, locale)}</p>
        </Reveal>
      )}
    </header>
  );
}
