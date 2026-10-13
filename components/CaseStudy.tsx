import { type Locale, t } from "@/lib/i18n";
import { caseStudy } from "@/content/site";
import Reveal from "./Reveal";
import Rich from "./Rich";

/* The story nobody else can tell, told as a build: each step pins and the
 * next one stacks over it, so the operation visibly assembles as you scroll.
 * Pure CSS sticky — no script, nothing to fail. */
export default function CaseStudy({ locale }: { locale: Locale }) {
  return (
    <section id="system" className="scroll-mt-0 py-28 md:py-40">
      <div className="shell">
        <header className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <Reveal className="md:col-span-7">
            <h2 className="h2 max-w-[15ch]">
              <Rich text={t(caseStudy.title, locale)} />
            </h2>
          </Reveal>
          <Reveal delay={100} className="md:col-span-4 md:col-start-9 md:pb-2">
            <p className="lede">{t(caseStudy.client, locale)}</p>
          </Reveal>
        </header>

        <Reveal delay={60}>
          <p className="mt-16 max-w-[36ch] text-[clamp(1.35rem,2.6vw,2.1rem)] leading-[1.35] tracking-[-0.02em] text-fg/90 md:mt-24 rtl:tracking-normal">
            {t(caseStudy.problem.body, locale)}
          </p>
        </Reveal>

        <ol className="relative mt-16 md:mt-24">
          {caseStudy.steps.map((s, i) => (
            <li
              key={s.n}
              className="sticky mb-6 md:mb-10"
              style={{ top: `calc(5.5rem + ${i * 1.5}rem)` }}
            >
              <div
                className="grid min-h-[44svh] gap-8 rounded-2xl p-7 shadow-[0_-24px_48px_-24px_rgba(0,0,0,0.9)] md:grid-cols-12 md:items-end md:p-12"
                style={{
                  background: `color-mix(in oklab, var(--color-raised-2) ${55 + i * 15}%, var(--color-ink))`,
                }}
              >
                <p className="num font-serif text-[clamp(4rem,10vw,8.5rem)] leading-[0.8] text-accent italic md:col-span-5 rtl:font-[family-name:var(--font-arabic-display)] rtl:not-italic">
                  {s.n}
                </p>
                <div className="flex flex-col gap-3 md:col-span-6 md:col-start-7">
                  <h3 className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-[-0.02em] rtl:tracking-normal">
                    {t(s.title, locale)}
                  </h3>
                  <p className="body max-w-[40ch] text-[1.0625rem]">{t(s.body, locale)}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid border-t hairline md:mt-28 md:grid-cols-3">
          {caseStudy.results.map((r, i) => (
            <Reveal key={i} delay={i * 110}>
              <div className={`flex flex-col gap-4 border-b hairline py-10 md:border-b-0 md:py-12 md:pe-10 ${i > 0 ? "md:border-s md:ps-10" : ""}`}>
                <p className="flex items-baseline gap-4">
                  <span className="num text-[1.5rem] text-faint line-through decoration-1">
                    {t(r.before, locale)}
                  </span>
                  <span className="num text-[clamp(3.5rem,6.5vw,5.5rem)] leading-none text-fg">
                    {t(r.after, locale)}
                  </span>
                </p>
                <p className="text-[0.9375rem] text-muted">{t(r.label, locale)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-xl text-[0.75rem] leading-relaxed text-faint">
          {t(caseStudy.note, locale)}
        </p>
      </div>
    </section>
  );
}
