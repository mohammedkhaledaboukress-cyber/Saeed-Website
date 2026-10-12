import { type Locale, t } from "@/lib/i18n";
import { testimonials, testimonialsSection } from "@/content/site";
import VideoLoop from "./VideoLoop";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Testimonials({ locale }: { locale: Locale }) {
  return (
    <section className="shell py-24 md:py-36">
      <SectionHead
        locale={locale}
        eyebrow={testimonialsSection.eyebrow}
        title={testimonialsSection.title}
      />

      <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3">
        {testimonials.map((item, i) => (
          <Reveal key={item.id} delay={i * 90}>
            <figure className="flex flex-col gap-5">
              <div className="overflow-hidden rounded-xl border hairline">
                <VideoLoop
                  src={item.src}
                  poster={item.poster}
                  soundOnHover
                  className="aspect-4/5 w-full"
                />
              </div>

              <blockquote className="text-[0.9375rem] leading-relaxed text-fg/85">
                {t(item.quote, locale)}
              </blockquote>

              <figcaption className="mt-auto">
                <p className="text-[0.8125rem] font-medium">
                  {t(item.name, locale)}
                </p>
                <p className="mt-0.5 text-[0.75rem] text-faint">
                  {t(item.title, locale)}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
