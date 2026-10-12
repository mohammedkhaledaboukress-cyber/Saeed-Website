import Link from "next/link";

import { type Locale, t, otherLocale } from "@/lib/i18n";
import { person, ui, contact } from "@/content/site";

export default function Footer({ locale }: { locale: Locale }) {
  const other = otherLocale(locale);

  return (
    <footer className="border-t hairline py-12">
      <div className="shell flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">{t(person.name, locale)}</p>
          <p className="text-[0.8125rem] text-faint">
            {t(person.role, locale)} · {t(person.location, locale)}
          </p>
        </div>

        <div className="flex items-center gap-6 text-[0.8125rem] text-faint">
          <a
            href={`mailto:${contact.email}`}
            className="transition-colors hover:text-fg"
          >
            {t(contact.emailLabel, locale)}
          </a>
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-fg"
          >
            {t(contact.whatsappLabel, locale)}
          </a>
          <Link
            href={`/${other}`}
            hrefLang={other}
            className="transition-colors hover:text-fg"
          >
            {t(ui.langToggle, locale)}
          </Link>
        </div>
      </div>

      <div className="shell mt-10">
        <p className="text-[0.75rem] text-faint">
          © {new Date().getFullYear()} {t(person.name, locale)}.{" "}
          {t(ui.rights, locale)}
        </p>
      </div>
    </footer>
  );
}
