import Link from "next/link";
import { Phone, MessageSquare, Calendar, ShieldCheck } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";

interface CTASectionProps {
  lang?: Locale;
}

export function CTASection({ lang = "de" }: CTASectionProps) {
  const dict = getDictionary(lang);
  const isEn = lang === "en";
  const basePath = isEn ? "/en" : "";

  const whatsappMessage = encodeURIComponent(
    isEn
      ? "Hello Fahrdienst Schwabia, I would like to inquire about an airport transfer from Augsburg."
      : "Hallo Fahrdienst Schwabia, ich möchte mich nach einem Flughafentransfer ab Augsburg erkundigen."
  );

  return (
    <section className="py-20 bg-navy-950 text-white relative overflow-hidden border-t border-navy-800">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8 bg-navy-900 border border-gold-500/30 p-8 sm:p-12 rounded-3xl shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950 border border-gold-500/30 text-xs font-semibold text-gold-400">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          <span>Fahrdienst Schwabia Augsburg</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto">
          {dict.cta.title}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          {dict.cta.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href={`${basePath}/#booking`}
            className="gold-gradient-bg gold-gradient-bg-hover text-navy-950 font-heading font-bold text-sm px-8 py-3.5 rounded-xl shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>{dict.cta.bookBtn}</span>
          </Link>

          <a
            href={`https://wa.me/4915201487887?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{dict.cta.whatsappBtn}</span>
          </a>

          <a
            href="tel:+4915201487887"
            className="px-6 py-3.5 rounded-xl bg-navy-950 border border-gold-500/40 text-gold-400 hover:bg-navy-800 font-bold text-sm shadow-xl transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>{dict.cta.callBtn}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
