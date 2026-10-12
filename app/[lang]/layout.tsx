import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { redirect } from "next/navigation";
import "../globals.css";

import { dirOf, isLocale, locales, defaultLocale, t } from "@/lib/i18n";
import { person, hero } from "@/content/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PreviewNotice from "@/components/PreviewNotice";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
    <html lang={lang} dir={dirOf(lang)} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plexArabic.variable} grain antialiased`}
      >
        <PreviewNotice locale={lang} />
        <Nav locale={lang} />
        <main>{children}</main>
        <Footer locale={lang} />
      </body>
    </html>
  );
}
