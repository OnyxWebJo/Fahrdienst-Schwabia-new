import { Star, Quote, CheckCircle2 } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";

interface ReviewsSectionProps {
  lang?: Locale;
}

export function ReviewsSection({ lang = "de" }: ReviewsSectionProps) {
  const dict = getDictionary(lang);

  const reviews = [
    {
      name: "Dr. Markus Weber",
      role: "Vielflieger (Augsburg ⇄ Flughafen München)",
      stars: 5,
      text: "Überpünktlich, absolut sauberer Mercedes Van und extrem angenehmer Fahrer. Bei Flugverspätung in der Nacht stand der Fahrer ohne Aufpreis am Terminal. Bester Transferdienst in Augsburg!",
      date: "Vor 2 Wochen",
    },
    {
      name: "Sabine & Thomas K.",
      role: "Familienurlaub (Augsburg ⇄ Memmingen Airport)",
      stars: 5,
      text: "Perfekt organisiert mit 2 Kindersitzen und riesigem Kofferraum. Der Festpreis war unschlagbar und die Fahrt sehr entspannt. Wir buchen jetzt jedes Mal bei Fahrdienst Schwabia.",
      date: "Vor 1 Monat",
    },
    {
      name: "Alexander Becker",
      role: "Business Transfer (Augsburg ⇄ Flughafen Stuttgart)",
      stars: 5,
      text: "Seriöser Auftritt, exzellenter Service und transparente Abrechnung per Firmenrechnung. Kann den Chauffeurservice für Geschäftsreisen uneingeschränkt empfehlen.",
      date: "Vor 3 Wochen",
    },
  ];

  return (
    <section className="py-20 bg-navy-950 text-white relative border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-500/40 text-xs font-bold text-gold-400">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{dict.reviews.ratingText}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            {dict.reviews.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {dict.reviews.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, index) => (
            <div
              key={index}
              className="bg-navy-900 border border-navy-800 p-6 rounded-3xl space-y-4 relative flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(r.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "{r.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-navy-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">{r.name}</h4>
                  <span className="text-[10px] text-slate-400 block">{r.role}</span>
                </div>
                <span className="text-[10px] text-gold-400/80 font-medium">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
