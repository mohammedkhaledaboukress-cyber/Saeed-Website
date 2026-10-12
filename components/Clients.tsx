import { type Locale, t } from "@/lib/i18n";
import { clients, clientsSection, ui } from "@/content/site";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Clients({ locale }: { locale: Locale }) {
  return (
    <section id="clients" className="shell scroll-mt-24 py-24 md:py-36">
      <SectionHead
        locale={locale}
        eyebrow={clientsSection.eyebrow}
        title={clientsSection.title}
        body={clientsSection.body}
      />

      <ul className="mt-12 md:mt-16">
        {clients.map((c, i) => (
          <Reveal key={c.id} delay={Math.min(i, 4) * 60}>
            <li className="group grid grid-cols-1 items-baseline gap-x-6 gap-y-2 border-t hairline py-6 transition-colors duration-500 last:border-b md:grid-cols-12 md:py-7">
              <div className="md:col-span-4">
                <p className="h3">{t(c.name, locale)}</p>
              </div>

              <div className="md:col-span-5">
                <p className="text-[0.8125rem] leading-relaxed text-muted">
                  {t(c.scope, locale)}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="num text-[0.8125rem] text-accent">
                  {t(c.growth, locale)}
                </p>
              </div>

              <div className="md:col-span-1 md:text-end">
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
