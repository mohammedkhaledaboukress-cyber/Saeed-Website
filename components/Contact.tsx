import { type Locale, t } from "@/lib/i18n";
import { contact } from "@/content/site";
import Reveal from "./Reveal";

export default function Contact({ locale }: { locale: Locale }) {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t hairline py-28 md:py-40"
    >
      <div className="shell flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow">{t(contact.eyebrow, locale)}</p>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="display mt-6">{t(contact.title, locale)}</h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="lede mt-6 max-w-md">{t(contact.body, locale)}</p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full bg-fg px-7 py-3.5 text-[0.875rem] font-medium text-ink transition-transform duration-500 ease-[var(--ease-out-soft)] hover:scale-[1.03]"
            >
              {t(contact.whatsappLabel, locale)}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="rounded-full border hairline px-7 py-3.5 text-[0.875rem] text-muted transition-colors duration-500 hover:border-fg/25 hover:text-fg"
            >
              {t(contact.emailLabel, locale)}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
