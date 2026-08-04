import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { ShieldCheck, MapPin, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Impressum | Fahrdienst Schwabia Augsburg",
  description: "Angaben gemäß § 5 DDG (Telemediengesetz) für Fahrdienst Schwabia in Augsburg.",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <Header lang="de" />

      <main className="flex-1 py-16 pb-24 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-navy-900 border border-navy-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="border-b border-navy-800 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Rechtliches</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">Impressum</h1>
            <p className="text-xs text-slate-400">Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {/* Company Info */}
            <div className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-white">Unternehmensangaben</h2>
              <p className="font-semibold text-gold-400">Fahrdienst Schwabia</p>
              <p>Mietwagen- & Chauffeur-Unternehmen nach § 49 PBefG</p>
              <p className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                Riedingerstr. 26 E, 86153 Augsburg, Deutschland
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">Kontakt</h2>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                Buchungshotline: +49 15201487887
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                Büro / Zentrale: +49 821 24411214
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                E-Mail: info@fahrdienst-schwabia.de
              </p>
            </div>

            {/* Vertretungsberechtigte Person */}
            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">Vertretungsberechtigte Person</h2>
              <p>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</p>
              <p className="font-semibold text-slate-200">Fahrdienst Schwabia Inhaber</p>
              <p>Riedingerstr. 26 E, 86153 Augsburg</p>
            </div>

            {/* Genehmigungsbehörde */}
            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">Aufsichtsbehörde / Genehmigung</h2>
              <p>Genehmigung für den Verkehr mit Mietwagen gemäß § 49 PBefG erteilt durch:</p>
              <p className="font-medium text-slate-200">Stadt Augsburg — Ordnungsamt / Verkehrswesen</p>
              <p>An der Blauen Kappe 18, 86152 Augsburg</p>
            </div>

            {/* EU Streitbeilegung */}
            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer lang="de" />
      <MobileBottomBar lang="de" />
      <CookieBanner lang="de" />
    </div>
  );
}
