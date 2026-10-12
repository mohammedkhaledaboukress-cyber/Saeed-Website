import { type Locale, t } from "@/lib/i18n";
import { caseStudy } from "@/content/site";
import Reveal from "./Reveal";

export default function CaseStudy({ locale }: { locale: Locale }) {
  return (
    <section
      id="system"
      className="scroll-mt-24 border-y hairline bg-raised/40 py-24 md:py-36"
    >
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{t(caseStudy.eyebrow, locale)}</p>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="h2 mt-5 max-w-3xl">{t(caseStudy.title, locale)}</h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="lede mt-6 max-w-xl">{t(caseStudy.client, locale)}</p>
        </Reveal>

        {/* The problem */}
        <Reveal delay={180}>
          <div className="mt-14 max-w-2xl border-s-2 border-accent/40 ps-6 md:mt-20">
            <p className="eyebrow">{t(caseStudy.problem.label, locale)}</p>
            <p className="body mt-3 text-fg/80">
              {t(caseStudy.problem.body, locale)}
            </p>
          </div>
        </Reveal>

        {/* What he built */}
        <div className="mt-14 grid gap-x-10 gap-y-10 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {caseStudy.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="flex flex-col gap-3 border-t hairline pt-5">
                <p className="num text-[0.75rem] text-accent">{s.n}</p>
                <h3 className="h3">{t(s.title, locale)}</h3>
                <p className="text-[0.8125rem] leading-relaxed text-muted">
                  {t(s.body, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Results */}
        <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-3">
          {caseStudy.results.map((r, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="rounded-xl border hairline bg-ink/40 p-6 md:p-7">
                <div className="flex items-baseline gap-3">
                  <span className="num text-xl text-faint line-through decoration-faint/60">
                    {t(r.before, locale)}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 shrink-0 fill-faint rtl:rotate-180"
                    aria-hidden
                  >
                    <path d="M13 5l7 7-7 7v-5H4v-4h9z" />
                  </svg>
                  <span className="num text-4xl text-accent md:text-5xl">
                    {t(r.after, locale)}
                  </span>
                </div>
                <p className="mt-4 text-[0.8125rem] text-muted">
                  {t(r.label, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 max-w-xl text-[0.75rem] leading-relaxed text-faint">
            {t(caseStudy.note, locale)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
