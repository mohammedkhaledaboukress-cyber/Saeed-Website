import { type Locale, t } from "@/lib/i18n";
import { metrics } from "@/content/site";

/* The headline numbers, run as a credit roll instead of a row of stat
 * tiles. Two copies of the line sit side by side so the loop is seamless;
 * the second is hidden from assistive tech. Pauses on hover; stands still
 * under reduced motion. */
export default function Credits({ locale }: { locale: Locale }) {
  const line = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-baseline gap-14 pe-14 md:gap-20 md:pe-20"
    >
      {metrics.map((m, i) => (
        <li key={i} className="flex items-baseline gap-4 whitespace-nowrap md:gap-5">
          <span className="num text-[clamp(3rem,8vw,6.5rem)] leading-none text-fg">
            {m.value}
            <span className="text-accent">{t(m.suffix, locale)}</span>
          </span>
          <span className="max-w-[9ch] text-[0.875rem] leading-snug whitespace-normal text-muted md:text-[1rem]">
            {t(m.label, locale)}
          </span>
          <span aria-hidden className="ms-10 h-2 w-2 self-center rounded-full bg-accent/70 md:ms-14" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="credits relative overflow-hidden border-y hairline py-10 md:py-14">
      <div className="credits-track flex w-max">
        {line(false)}
        {line(true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-ink to-transparent rtl:bg-gradient-to-l md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-16 bg-gradient-to-l from-ink to-transparent rtl:bg-gradient-to-r md:w-40" />
    </section>
  );
}
