import { type Locale, t } from "@/lib/i18n";
import { services } from "@/content/site";
import Reveal from "./Reveal";
import Rich from "./Rich";

/* What he does, as a list you read down rather than a grid of tiles, and
 * what he turns down, struck through. Declining work reads as confidence. */
export default function Services({ locale }: { locale: Locale }) {
  return (
    <section className="shell py-28 md:py-40">
      <div className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <Reveal>
            <h2 className="h2 md:sticky md:top-28">
              <Rich text={t(services.title, locale)} />
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-8">
          <ul>
            {services.does.map((s, i) => (
              <Reveal key={i} delay={Math.min(i, 3) * 70}>
                <li className="group grid gap-2 border-t hairline py-8 transition-colors duration-500 md:grid-cols-2 md:gap-10 md:py-10">
                  <h3 className="text-[clamp(1.4rem,2.4vw,2rem)] leading-tight font-semibold tracking-[-0.02em] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-2 rtl:tracking-normal rtl:group-hover:-translate-x-2">
                    {t(s.title, locale)}
                  </h3>
                  <p className="body max-w-[40ch] md:pt-1.5">{t(s.body, locale)}</p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <div className="mt-16 border-t hairline pt-10 md:mt-20">
              <h3 className="text-[0.9375rem] font-medium text-muted">
                {t(services.doesNotTitle, locale)}
              </h3>
              <ul className="mt-6 flex flex-col gap-3">
                {services.doesNot.map((item, i) => (
                  <li
                    key={i}
                    className="text-[clamp(1.1rem,1.8vw,1.45rem)] text-faint line-through decoration-accent/60 decoration-1"
                  >
                    {t(item, locale)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
