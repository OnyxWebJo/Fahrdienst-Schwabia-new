import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { BookingWidget } from "@/components/sections/BookingWidget";
import { ShieldCheck, Clock, Navigation, CheckCircle2, Plane, HelpCircle } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";

export interface AirportRouteConfig {
  airportCode: string;
  nameDE: string;
  nameEN: string;
  fixedPrice: string;
  distance: string;
  duration: string;
  routeTitleDE: string;
  routeTitleEN: string;
  descriptionDE: string;
  descriptionEN: string;
  benefitsDE: string[];
  benefitsEN: string[];
  faqsDE: { q: string; a: string }[];
  faqsEN: { q: string; a: string }[];
  priceTiers?: { label: string; price: string }[];
}

interface AirportLandingPageProps {
  lang?: Locale;
  config: AirportRouteConfig;
}

export function AirportLandingPage({ lang = "de", config }: AirportLandingPageProps) {
  const dict = getDictionary(lang);
  const isEn = lang === "en";

  const title = isEn ? config.routeTitleEN : config.routeTitleDE;
  const description = isEn ? config.descriptionEN : config.descriptionDE;
  const benefits = isEn ? config.benefitsEN : config.benefitsDE;
  const faqs = isEn ? config.faqsEN : config.faqsDE;

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-amber-500 selection:text-white">
      <Header lang={lang} />

      <main className="flex-1">
        {/* Route Hero Section */}
        <section className="relative pt-10 pb-16 bg-navy-950 border-b border-navy-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-xs font-bold text-gold-400">
                <Plane className="w-4 h-4 text-gold-400" />
                <span>Augsburg ⇄ {isEn ? config.nameEN : config.nameDE}</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                {title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300">
                {description}
              </p>

              {/* Route Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 text-gold-400">
                  <ShieldCheck className="w-4 h-4" />
                  {isEn ? `Fixed price ${config.fixedPrice}` : `Festpreis ${config.fixedPrice}`}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gold-500" />
                  {config.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-gold-500" />
                  {config.distance}
                </span>
              </div>
            </div>

            {/* Pre-filled Booking Form Widget */}
            <div className="max-w-4xl mx-auto">
              <BookingWidget lang={lang} preselectedAirport={config.airportCode} />
            </div>
          </div>
        </section>

        {/* Benefits & Price Details */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-navy-950 px-3 py-1 rounded-full border border-gold-500/30">
                  {isEn ? "Transparency & Quality" : "Transparenz & Komfort"}
                </span>

                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  {isEn ? "Why Book This Route With Us?" : "Warum diesen Transfer bei uns buchen?"}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isEn
                    ? `Enjoy a direct, comfortable journey from Augsburg to ${config.nameEN}. No stress with public transport, luggage changes, or parking fees at the airport.`
                    : `Genießen Sie eine direkte, bequeme Fahrt von Augsburg zum ${config.nameDE}. Keinen Stress mit Umsteigen, Gepäckschleppen oder teuren Parkgebühren am Flughafen.`}
                </p>

                <div className="space-y-3">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown Card */}
              <div className="bg-navy-950 border border-gold-500/30 p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">
                      {isEn ? "Route Fare" : "Streckenpreis"}
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-white">Augsburg ⇄ {config.airportCode}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">{isEn ? "Guaranteed Price" : "Garantierter Festpreis"}</span>
                    <span className="font-heading font-black text-3xl text-gold-400">{config.fixedPrice}</span>
                  </div>
                </div>

                {/* Tiered Price Table if available */}
                {config.priceTiers && config.priceTiers.length > 0 && (
                  <div className="space-y-2 bg-navy-900 p-4 rounded-2xl border border-navy-800 text-xs">
                    <span className="font-bold text-slate-200 block mb-2">{isEn ? "Passengers Rate Table:" : "Preise nach Personenanzahl:"}</span>
                    {config.priceTiers.map((tier, tIdx) => (
                      <div key={tIdx} className="flex justify-between border-b border-navy-950 pb-1.5 last:border-0 text-slate-300">
                        <span>{tier.label}:</span>
                        <span className="font-bold text-gold-400">{tier.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center justify-between">
                    <span>{isEn ? "VAT & Toll Fees Included" : "Inklusive MwSt. & Straßengebühren"}</span>
                    <span className="text-emerald-400 font-bold">{isEn ? "Included" : "Inklusive"}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>{isEn ? "Flight Tracking & Waiting Time" : "Flug-Tracking & Wartezeit"}</span>
                    <span className="text-emerald-400 font-bold">{isEn ? "Free" : "Kostenlos"}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>{isEn ? "Luggage & Child Seats" : "Gepäcktransport & Kindersitz"}</span>
                    <span className="text-emerald-400 font-bold">{isEn ? "Free" : "Kostenlos"}</span>
                  </li>
                </ul>

                <Link
                  href="#booking"
                  className="w-full text-center block gold-gradient-bg text-navy-950 font-heading font-bold text-sm py-3.5 rounded-xl shadow-lg hover:scale-105 transition-all"
                >
                  {isEn ? "Book This Transfer Now" : "Jetzt diesen Transfer buchen"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Airport Specific FAQs */}
        <section className="py-16 bg-navy-950 text-white border-t border-navy-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-3">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                {isEn ? `FAQ for ${config.nameEN} Transfers` : `Häufige Fragen zum Transfer ${config.nameDE}`}
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-navy-900 border border-navy-800 p-5 rounded-2xl space-y-2">
                  <h4 className="font-bold text-sm text-gold-400 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 shrink-0 text-gold-400" />
                    {faq.q}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <MobileBottomBar lang={lang} />
      <CookieBanner lang={lang} />
    </div>
  );
}
