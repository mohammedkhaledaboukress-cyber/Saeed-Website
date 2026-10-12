import Image from "next/image";

import { type Locale, t } from "@/lib/i18n";
import { about, person } from "@/content/site";
import Reveal from "./Reveal";

export default function About({ locale }: { locale: Locale }) {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t hairline py-24 md:py-36"
    >
      <div className="shell grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="relative aspect-4/5 overflow-hidden rounded-xl border hairline bg-raised">
            <Image
              src={about.portrait}
              alt={t(person.name, locale)}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">{t(about.eyebrow, locale)}</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="h2 mt-5">{t(about.title, locale)}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede mt-6">{t(about.bio, locale)}</p>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 text-[0.8125rem] text-faint">
              {t(person.role, locale)} · {t(person.location, locale)}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
