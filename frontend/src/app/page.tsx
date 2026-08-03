import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { getLocalBusinessSchema } from "@/lib/seo";

export const metadata = {
  title: "Flughafentransfer Augsburg | München, Memmingen, Nürnberg & Stuttgart",
  description:
    "Professioneller Flughafentransfer ab Augsburg zum Flughafen München, Memmingen, Nürnberg & Stuttgart. Garantiere Festpreise, pünktlicher Service & 24/7 Buchung.",
  keywords: [
    "Flughafentransfer Augsburg",
    "Fahrdienst Augsburg",
    "Flughafentransfer München Augsburg",
    "Flughafentransfer Memmingen Augsburg",
    "Airport Transfer Augsburg",
  ],
  alternates: {
    canonical: "https://fahrdienst-schwabia.de",
    languages: {
      de: "https://fahrdienst-schwabia.de",
      en: "https://fahrdienst-schwabia.de/en",
    },
  },
  openGraph: {
    title: "Flughafentransfer Augsburg | Fahrdienst Schwabia",
    description:
      "Ihr zuverlässiger Flughafentransfer ab Augsburg nach München, Memmingen, Nürnberg & Stuttgart. Garantiere Festpreise & 24/7 Service.",
    url: "https://fahrdienst-schwabia.de",
    siteName: "Fahrdienst Schwabia",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanHomePage() {
  const schema = getLocalBusinessSchema("de");

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-amber-500 selection:text-white">
      {/* Schema.org LocalBusiness JSON-LD for Google & AI Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Header lang="de" />
      <main className="flex-1">
        <HeroSection lang="de" />
        <ServicesSection lang="de" />
        <WhyChooseUsSection lang="de" />
        <HowItWorksSection lang="de" />
        <ReviewsSection lang="de" />
        <FAQSection lang="de" />
        <CTASection lang="de" />
      </main>
      <Footer lang="de" />
      <MobileBottomBar lang="de" />
      <CookieBanner lang="de" />
    </div>
  );
}
