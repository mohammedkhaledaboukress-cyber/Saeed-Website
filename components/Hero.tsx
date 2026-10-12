import { type Locale, t } from "@/lib/i18n";
import { hero, person, reel, contact } from "@/content/site";
import VideoLoop from "./VideoLoop";
import Reveal from "./Reveal";

export default function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden pt-16">
      {/* Dim moving backdrop. Legibility first: the type never fights it. */}
      <div className="absolute inset-0" aria-hidden>
        <VideoLoop
          src={reel.src}
          poster={reel.poster}
          className="h-full w-full opacity-70"
        />
        {/* Three light scrims rather than one heavy one: keeps the footage
            legible as footage while the headline stays at full contrast. */}
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-[radial-gradient(100%_75%_at_50%_40%,transparent_25%,rgba(6,7,10,0.65)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-ink via-ink/85 to-transparent" />
      </div>

      <div className="shell relative z-10 py-20">
        <Reveal>
          <p className="eyebrow">
            {t(hero.eyebrow, locale)} · {t(person.location, locale)}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="display mt-6 max-w-4xl whitespace-pre-line">
            {t(hero.headline, locale)}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="lede mt-7 max-w-xl">{t(hero.body, locale)}</p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#reel"
              className="group flex items-center gap-2.5 rounded-full bg-fg px-6 py-3 text-[0.875rem] font-medium text-ink transition-transform duration-500 ease-[var(--ease-out-soft)] hover:scale-[1.03]"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-ink" aria-hidden>
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
              {t(hero.cta, locale)}
            </a>

            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border hairline px-6 py-3 text-[0.875rem] text-muted transition-colors duration-500 hover:border-fg/25 hover:text-fg"
            >
              {t(hero.ctaSecondary, locale)}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
