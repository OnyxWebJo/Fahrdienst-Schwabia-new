import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { CookieBanner } from "@/components/layout/CookieBanner";

export const metadata = {
  title: "Datenschutzerklärung | Fahrdienst Schwabia Augsburg",
  description: "Datenschutzerklärung nach der DSGVO für Fahrdienst Schwabia Augsburg.",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <Header lang="de" />

      <main className="flex-1 py-16 pb-24 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-navy-900 border border-navy-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="border-b border-navy-800 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">DSGVO / GDPR</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">Datenschutzerklärung</h1>
            <p className="text-xs text-slate-400">Stand: August 2026</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-white">1. Datenschutz auf einen Blick</h2>
              <p>
                Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie über die Erhebung und Verarbeitung personenbezogener Daten bei der Nutzung unserer Website und unserer Chauffeur-Dienstleistungen.
              </p>
            </div>

            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">2. Verantwortliche Stelle</h2>
              <p className="font-semibold text-gold-400">Fahrdienst Schwabia</p>
              <p>Riedingerstr. 26 E, 86153 Augsburg, Deutschland</p>
              <p>Telefon: +49 15201487887 | E-Mail: info@fahrdienst-schwabia.de</p>
            </div>

            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">3. Datenerfassung bei Buchungen</h2>
              <p>
                Wenn Sie über unsere Website oder per WhatsApp einen Flughafentransfer buchen, erheben wir folgende Daten: Name, Telefonnummer, E-Mail-Adresse, Abhol- & Zieladresse, Abholzeitpunkt sowie ggf. Flugnummern. Diese Daten verarbeiten wir ausschließlich zur Erfüllung des Beförderungsvertrags (Art. 6 Abs. 1 lit. b DSGVO).
              </p>
            </div>

            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">4. Ihre Rechte nach DSGVO</h2>
              <p>Sie haben jederzeit das Recht auf:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>Löschung Ihrer Daten ("Recht auf Vergessenwerden", Art. 17 DSGVO)</li>
                <li>Einschränkung der Datenverarbeitung (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              </ul>
            </div>

            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">5. Cookies & Analytics</h2>
              <p>
                Wir setzen technisch notwendige Cookies zur Gewährleistung der Grundfunktionen unserer Website ein. Analyse-Cookies (z. B. Google Analytics 4) werden nur nach Ihrer ausdrücklichen Einwilligung über unseren Cookie-Consent-Banner geladen (Consent Mode v2).
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
