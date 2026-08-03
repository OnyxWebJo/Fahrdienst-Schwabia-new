import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { CookieBanner } from "@/components/layout/CookieBanner";

export const metadata = {
  title: "AGB | Allgemeine Geschäftsbedingungen | Fahrdienst Schwabia",
  description: "Allgemeine Geschäftsbedingungen für Mietwagen- und Chauffeurfahrten bei Fahrdienst Schwabia Augsburg.",
};

export default function AGBPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <Header lang="de" />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-navy-900 border border-navy-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="border-b border-navy-800 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Rechtliches</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">Allgemeine Geschäftsbedingungen (AGB)</h1>
            <p className="text-xs text-slate-400">Fahrdienst Schwabia — Mietwagen- & Chauffeur-Service Augsburg</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-white">§ 1 Geltungsbereich & Vertragspartner</h2>
              <p>
                Diese Geschäftsbedingungen gelten für alle Beförderungsverträge und Dienstleistungen der Firma Fahrdienst Schwabia, Riedingerstr. 26 E, 86153 Augsburg.
              </p>
            </div>

            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">§ 2 Vertragsabschluss & Festpreise</h2>
              <p>
                Mit der Übermittlung einer Buchungsanfrage (online, per WhatsApp oder telefonisch) gibt der Kunde ein verbindliches Angebot ab. Der Vertrag kommt mit der Buchungsbestätigung durch Fahrdienst Schwabia zustande. Alle vereinbarten Preise sind Festpreise inklusive MwSt. und anfallenden Maut- und Parkgebühren.
              </p>
            </div>

            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">§ 3 Stornierung & Umbuchung</h2>
              <p>
                Stornierungen bis 24 Stunden vor Abholzeitpunkt sind kostenfrei möglich. Bei späteren Stornierungen oder Nichterscheinen des Fahrgasts (No-Show) behält sich der Anbieter das Recht vor, Ausfallgebühren zu berechnen.
              </p>
            </div>

            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">§ 4 Zahlungsbedingungen</h2>
              <p>
                Die Vergütung erfolgt direkt beim Fahrer in bar oder mit gängigen Kredit-/EC-Karten. Für Firmenkunden kann die Zahlung nach vorheriger Vereinbarung per Rechnung erfolgen.
              </p>
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
