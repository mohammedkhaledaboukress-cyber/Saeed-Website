import type { L, Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import Reveal from "./Reveal";
import Rich from "./Rich";

/* Headings carry their own weight — no kicker label above them. Title and
   lede sit side by side on wide screens so the section opens asymmetric. */
export default function SectionHead({
  locale,
  title,
  body,
}: {
  locale: Locale;
  eyebrow?: L;
  title: L;
  body?: L;
  align?: "start" | "center";
}) {
  return (
    <header className="grid gap-5 md:grid-cols-12 md:items-end md:gap-10">
      <Reveal className="md:col-span-7">
        <h2 className="h2 max-w-[16ch]">
          <Rich text={t(title, locale)} />
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={100} className="md:col-span-4 md:col-start-9 md:pb-2">
          <p className="lede max-w-[38ch]">{t(body, locale)}</p>
        </Reveal>
      )}
    </header>
  );
}
