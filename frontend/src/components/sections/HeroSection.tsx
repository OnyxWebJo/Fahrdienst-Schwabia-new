import { Phone, MessageSquare, ShieldCheck, Star } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";
import { BookingWidget } from "./BookingWidget";

interface HeroSectionProps {
  lang?: Locale;
}

export function HeroSection({ lang = "de" }: HeroSectionProps) {
  const dict = getDictionary(lang);
  const isEn = lang === "en";

  const whatsappMessage = encodeURIComponent(
    isEn
      ? "Hello Fahrdienst Schwabia, I would like to inquire about an airport transfer from Augsburg."
      : "Hallo Fahrdienst Schwabia, ich möchte mich nach einem Flughafentransfer ab Augsburg erkundigen."
  );

  return (
    <section className="relative bg-navy-950 text-white pt-8 sm:pt-10 pb-16 sm:pb-20 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Background Image: Luxury Mercedes Chauffeur Car with Airplane Overhead */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <img
          src="/hero-bg.jpg"
          alt="Luxury Chauffeur Car with Airplane Sunset Sky"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.7] contrast-105"
        />

        {/* Dark Navy Gradient Overlay for High Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/75 to-navy-950/95 pointer-events-none" />
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/20 via-navy-900/10 to-transparent blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Header Trust Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-950/90 border border-gold-500/40 text-[11px] sm:text-xs font-semibold text-gold-400 shadow-xl backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
            <span>{dict.hero.badge}</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              4.9 Google Rating
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-8 sm:mb-10">
          <h1 className="font-heading text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-md">
            {dict.hero.title.split("Augsburg")[0]}
            <span className="gold-gradient-text">Augsburg</span>
          </h1>

          <p className="text-xs sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium">
            {dict.hero.subtitle}
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/4915201487887?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-xl hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{dict.hero.whatsappBtn}</span>
            </a>

            <a
              href="tel:+4915201487887"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-navy-950/90 border border-gold-500/40 text-gold-400 hover:bg-navy-900 text-xs sm:text-sm font-bold shadow-xl transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>{dict.hero.phoneBtn}</span>
            </a>
          </div>
        </div>

        {/* Embedded Booking Form Widget */}
        <div className="max-w-5xl mx-auto">
          <BookingWidget lang={lang} />
        </div>

        {/* Trust Badges Footer Bar */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-center border-t border-navy-800/80 pt-6 sm:pt-8">
          <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 backdrop-blur-md">
            <span className="block text-gold-400 font-bold text-sm sm:text-base">
              {isEn ? "Fixed Rates" : "Festpreis"}
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-300">
              {isEn ? "No Hidden Charges" : "Keine versteckten Kosten"}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 backdrop-blur-md">
            <span className="block text-gold-400 font-bold text-sm sm:text-base">
              {isEn ? "Flight Tracking" : "Flug-Tracking"}
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-300">
              {isEn ? "Automatic Adjustment" : "Automatische Anpassung"}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 backdrop-blur-md">
            <span className="block text-gold-400 font-bold text-sm sm:text-base">
              {isEn ? "24/7 Service" : "24/7 Service"}
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-300">
              {isEn ? "Around the Clock" : "Rund um die Uhr"}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 backdrop-blur-md">
            <span className="block text-gold-400 font-bold text-sm sm:text-base">
              {isEn ? "Modern Vans" : "Moderne Vans"}
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-300">
              {isEn ? "Clean & Comfortable" : "Gepflegt & Bequem"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
