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
  title: "Airport Transfer Augsburg | Munich, Memmingen, Nuremberg & Stuttgart",
  description:
    "Professional private airport transfer from Augsburg to Munich, Memmingen, Nuremberg & Stuttgart Airports. Guaranteed fixed prices, 24/7 service & easy online booking.",
  keywords: [
    "Airport Transfer Augsburg",
    "Private Transfer Augsburg",
    "Augsburg to Munich Airport",
    "Augsburg to Memmingen Airport",
    "Chauffeur Service Augsburg",
  ],
  alternates: {
    canonical: "https://fahrdienst-schwabia.de/en",
    languages: {
      de: "https://fahrdienst-schwabia.de",
      en: "https://fahrdienst-schwabia.de/en",
    },
  },
  openGraph: {
    title: "Airport Transfer Augsburg | Fahrdienst Schwabia",
    description:
      "Reliable airport transfer from Augsburg to Munich, Memmingen, Nuremberg & Stuttgart. Fixed prices & 24/7 service.",
    url: "https://fahrdienst-schwabia.de/en",
    siteName: "Fahrdienst Schwabia",
    locale: "en_US",
    type: "website",
  },
};

export default function EnglishHomePage() {
  const schema = getLocalBusinessSchema("en");

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-amber-500 selection:text-white">
      {/* Schema.org LocalBusiness JSON-LD for Google & AI Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Header lang="en" />
      <main className="flex-1 pb-24 lg:pb-0">
        <HeroSection lang="en" />
        <ServicesSection lang="en" />
        <WhyChooseUsSection lang="en" />
        <HowItWorksSection lang="en" />
        <ReviewsSection lang="en" />
        <FAQSection lang="en" />
        <CTASection lang="en" />
      </main>
      <Footer lang="en" />
      <MobileBottomBar lang="en" />
      <CookieBanner lang="en" />
    </div>
  );
}
