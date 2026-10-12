import { type Locale, t } from "@/lib/i18n";
import { services } from "@/content/site";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Services({ locale }: { locale: Locale }) {
  return (
    <section className="shell py-24 md:py-36">
      <SectionHead
        locale={locale}
        eyebrow={services.eyebrow}
        title={services.title}
      />

      <div className="mt-12 grid gap-x-16 gap-y-14 md:mt-16 lg:grid-cols-[1.6fr_1fr]">
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {services.does.map((s, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="flex flex-col gap-2.5 border-t hairline pt-5">
                <h3 className="h3">{t(s.title, locale)}</h3>
                <p className="text-[0.8125rem] leading-relaxed text-muted">
                  {t(s.body, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Declining work reads as confidence, and filters bad leads. */}
        <Reveal delay={140}>
          <div className="rounded-xl border hairline bg-raised/50 p-7">
            <h3 className="h3">{t(services.doesNotTitle, locale)}</h3>
            <ul className="mt-5 flex flex-col gap-4">
              {services.doesNot.map((item, i) => (
                <li key={i} className="flex gap-3 text-[0.8125rem] text-muted">
                  <span
                    aria-hidden
                    className="mt-2 h-px w-3 shrink-0 bg-faint"
                  />
                  {t(item, locale)}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
