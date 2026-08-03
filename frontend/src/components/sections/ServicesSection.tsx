import Link from "next/link";
import { Plane, Clock, Navigation, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";

interface ServicesSectionProps {
  lang?: Locale;
}

export function ServicesSection({ lang = "de" }: ServicesSectionProps) {
  const dict = getDictionary(lang);
  const isEn = lang === "en";
  const basePath = isEn ? "/en" : "";

  const services = [
    {
      id: "munich",
      title: dict.airports.munich,
      price: isEn ? "from 90 €" : "ab 90 €",
      duration: "ca. 60–70 Min.",
      distance: "ca. 85 km",
      desc: isEn
        ? "1 Person 90€ | 2 Persons 100€ | 3 Persons 110€ | 4 Persons 120€"
        : "1 Person 90 € | 2 Personen 100 € | 3 Personen 110 € | 4 Personen 120 €",
      href: `${basePath}/flughafentransfer-augsburg-muenchen-flughafen`,
    },
    {
      id: "memmingen",
      title: dict.airports.memmingen,
      price: isEn ? "from 100 €" : "ab 100 €",
      duration: "ca. 55–65 Min.",
      distance: "ca. 90 km",
      desc: isEn
        ? "1 Person 100€ | 2 Persons 120€ | 3 Persons 130€ | 4 Persons 140€"
        : "1 Person 100 € | 2 Personen 120 € | 3 Personen 130 € | 4 Personen 140 €",
      href: `${basePath}/flughafentransfer-augsburg-memmingen-flughafen`,
    },
    {
      id: "nuremberg",
      title: dict.airports.nuremberg,
      price: "240 €",
      duration: "ca. 90–110 Min.",
      distance: "ca. 150 km",
      desc: isEn ? "Fixed rate for trip (both ways)" : "Garantierter Festpreis (beide Richtungen)",
      href: `${basePath}/flughafentransfer-augsburg-nuernberg-flughafen`,
    },
    {
      id: "stuttgart",
      title: dict.airports.stuttgart,
      price: "200 €",
      duration: "ca. 100–120 Min.",
      distance: "ca. 160 km",
      desc: isEn ? "Fixed rate for trip (both ways)" : "Garantierter Festpreis (beide Richtungen)",
      href: `${basePath}/flughafentransfer-augsburg-stuttgart-flughafen`,
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-navy-950 px-3 py-1 rounded-full border border-gold-500/30">
            {dict.header.services}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            {dict.services.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {dict.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-navy-950 border border-navy-800 rounded-3xl p-6 sm:p-8 hover:border-gold-500/50 transition-all group flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center text-navy-950 shadow-md group-hover:scale-110 transition-transform">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
                      {dict.services.fixedPriceFrom}
                    </span>
                    <span className="font-heading font-extrabold text-2xl text-gold-400">
                      {s.price}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-gold-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed font-mono">
                    {s.desc}
                  </p>
                </div>

                <div className="flex items-center gap-6 pt-2 text-xs text-slate-400 border-t border-navy-900">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gold-500" />
                    {s.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-gold-500" />
                    {s.distance}
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-navy-900 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {isEn ? "Fixed Price Guarantee" : "Festpreisgarantie"}
                </span>

                <Link
                  href={s.href}
                  className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-gold-300 group-hover:translate-x-1 transition-all"
                >
                  <span>{dict.services.bookRoute}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Destination Banner (1,50 € / km) */}
        <div className="bg-navy-950 border border-gold-500/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl gold-gradient-bg flex items-center justify-center text-navy-950 shrink-0 shadow-lg">
              <MapPin className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                {isEn ? "Individual Trips & Other Destinations" : "Individuelle Fahrten & Andere Ziele"}
              </span>
              <h3 className="font-heading font-extrabold text-xl text-white">
                {isEn ? "Any Other Destination: 1.50 € / km" : "Jedes andere Ziel: 1,50 € pro Kilometer"}
              </h3>
              <p className="text-xs text-slate-300">
                {isEn
                  ? "Fair, transparent kilometer pricing for long distance, hotel transfers, business travel & city trips."
                  : "Faire, transparente Kilometerabrechnung für Fernfahrten, Hoteltransfers, Geschäftsreisen & Städtereisen."}
              </p>
            </div>
          </div>

          <Link
            href={isEn ? "/en/buchung" : "/buchung"}
            className="w-full md:w-auto gold-gradient-bg gold-gradient-bg-hover text-navy-950 font-heading font-bold text-xs px-8 py-3.5 rounded-xl shadow-lg whitespace-nowrap text-center hover:scale-105 transition-all"
          >
            {isEn ? "Request Custom Route" : "Individuelle Fahrt Anfragen"}
          </Link>
        </div>
      </div>
    </section>
  );
}
