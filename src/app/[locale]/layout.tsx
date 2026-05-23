import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Noto_Naskh_Arabic, Amiri } from "next/font/google";
import "../globals.css";
import { defaultLocale, dir, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const notoArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-arabic",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const siteUrl = "https://example.qa";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;
  const dict = await getDictionary(locale);
  const title = `${dict.person.name} | ${dict.person.title}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description: dict.meta.description,
    keywords: [
      "Tarsheed",
      "KAHRAMAA",
      "Qatar",
      "Sustainability",
      "Energy Efficiency",
      "Conservation",
      "Qatar National Vision 2030",
      "Head of Section",
    ],
    authors: [{ name: dict.person.name }],
    alternates: {
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      type: "profile",
      title,
      description: dict.meta.description,
      siteName: dict.person.name,
      locale: dict.meta.ogLocale,
      url: `${siteUrl}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const direction = dir(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${inter.variable} ${cormorant.variable} ${notoArabic.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
