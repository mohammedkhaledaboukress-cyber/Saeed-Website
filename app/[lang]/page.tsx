import { defaultLocale, isLocale } from "@/lib/i18n";

import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Reel from "@/components/Reel";
import WorkGrid from "@/components/WorkGrid";
import CaseStudy from "@/components/CaseStudy";
import BeforeAfter from "@/components/BeforeAfter";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;

  /* The arc: make the claim, prove it with numbers, show the work, tell the
     one story that nobody else can tell, then the offer and the person. */
  return (
    <>
      <Hero locale={locale} />
      <Metrics locale={locale} />
      <Reel locale={locale} />
      <WorkGrid locale={locale} />
      <CaseStudy locale={locale} />
      <BeforeAfter locale={locale} />
      <Clients locale={locale} />
      <Testimonials locale={locale} />
      <Services locale={locale} />
      <About locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
