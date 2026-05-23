import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Leadership } from "@/components/Leadership";
import { Mission } from "@/components/Mission";
import { Values } from "@/components/Values";
import { Achievements } from "@/components/Achievements";
import { Timeline } from "@/components/Timeline";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : defaultLocale) as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar
        dict={dict.nav}
        person={dict.person}
        locale={locale}
      />
      <main className="relative">
        <Hero dict={dict.hero} person={dict.person} />
        <About dict={dict.about} />
        <Leadership dict={dict.leadership} />
        <Mission dict={dict.mission} />
        <Values dict={dict.values} />
        <Achievements dict={dict.achievements} />
        <Timeline dict={dict.timeline} />
        <Gallery dict={dict.gallery} />
        <Contact dict={dict.contact} />
      </main>
      <Footer
        dict={dict.footer}
        person={dict.person}
        contact={dict.contact}
        navItems={dict.nav.items}
      />
    </>
  );
}
