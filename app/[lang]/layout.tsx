import type { Metadata } from "next";
import { Geist, Instrument_Serif, Alexandria, IBM_Plex_Sans_Arabic } from "next/font/google";
import { redirect } from "next/navigation";
import "../globals.css";

import { dirOf, isLocale, locales, defaultLocale, t } from "@/lib/i18n";
import { person, hero } from "@/content/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PreviewNotice from "@/components/PreviewNotice";
import Timeline from "@/components/Timeline";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

/* The accent voice — one italic word per headline, English only. */
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
  variable: "--font-instrument",
});

/* Arabic display face: geometric, confident, built for large sizes. */
const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-alexandria",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-plex-arabic",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;

  const name = t(person.name, locale);
  const role = t(person.role, locale);

  return {
    title: `${name} — ${role}`,
    description: t(hero.body, locale),
    openGraph: {
      title: `${name} — ${role}`,
      description: t(hero.body, locale),
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
    },
    alternates: {
      languages: { ar: "/ar", en: "/en" },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) redirect(`/${defaultLocale}`);

  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      /* Font variables live on <html> so the theme tokens defined on :root
         can resolve them. On <body> they would be out of scope. */
      className={`${geist.variable} ${instrument.variable} ${alexandria.variable} ${plexArabic.variable}`}
      suppressHydrationWarning
    >
      <body
        className="grain antialiased"
      >
        <Timeline />
        <PreviewNotice locale={lang} />
        <Nav locale={lang} />
        <main>{children}</main>
        <Footer locale={lang} />
      </body>
    </html>
  );
}
