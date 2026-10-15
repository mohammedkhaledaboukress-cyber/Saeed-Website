import { type Locale, t } from "@/lib/i18n";
import { clients, clientsSection, ui } from "@/content/site";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

/* The names are the proof, so they are set as display type. Details sit
 * small beside each name; hovering a row brings its growth figure forward. */
export default function Clients({ locale }: { locale: Locale }) {
  return (
    <section id="clients" className="shell scroll-mt-24 py-28 md:py-40">
      <SectionHead
        locale={locale}
        title={clientsSection.title}
        body={clientsSection.body}
      />

      <ul className="isolate mt-14 md:mt-20">
        {clients.map((c, i) => (
          <Reveal key={c.id} delay={Math.min(i, 4) * 50}>
            <li className="group relative grid grid-cols-1 items-end gap-x-8 gap-y-3 border-t hairline py-7 last:border-b md:grid-cols-12 md:py-8">
              <span
                aria-hidden
                className="absolute inset-y-0 -inset-x-4 -z-10 origin-bottom scale-y-0 rounded-xl bg-raised-2/60 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-y-100 md:-inset-x-6"
              />
              <p className="text-[clamp(2rem,5.2vw,4.25rem)] leading-[1] font-semibold tracking-[-0.04em] text-fg/90 transition-colors duration-500 group-hover:text-fg md:col-span-7 rtl:font-[family-name:var(--font-arabic-display)] rtl:leading-[1.25] rtl:tracking-normal">
                {t(c.name, locale)}
              </p>

              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 md:col-span-5 md:justify-end md:pb-2">
                <p className="text-[0.8125rem] text-muted">{t(c.scope, locale)}</p>
                <p className="num text-[1.0625rem] text-accent">{t(c.growth, locale)}</p>
                <p className="num text-[0.75rem] text-faint">
                  {t(ui.since, locale)} {c.since}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
