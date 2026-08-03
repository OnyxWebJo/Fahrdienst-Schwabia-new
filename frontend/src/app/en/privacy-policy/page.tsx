import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { CookieBanner } from "@/components/layout/CookieBanner";

export const metadata = {
  title: "Privacy Policy | Fahrdienst Schwabia Augsburg",
  description: "Privacy Policy pursuant to GDPR for Fahrdienst Schwabia Augsburg.",
};

export default function EnglishPrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <Header lang="en" />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-navy-900 border border-navy-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="border-b border-navy-800 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">GDPR Compliance</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
            <p className="text-xs text-slate-400">Last updated: August 2026</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-white">1. Data Controller</h2>
              <p className="font-semibold text-gold-400">Fahrdienst Schwabia</p>
              <p>Riedingerstr. 26 E, 86153 Augsburg, Germany</p>
              <p>Phone: +49 15201487887 | Email: info@fahrdienst-schwabia.de</p>
            </div>

            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">2. Data Processing for Bookings</h2>
              <p>
                When submitting a transfer booking, we process your name, phone number, email address, pickup/drop-off location, date, time, and flight number exclusively to fulfill your transport contract (Art. 6 (1) (b) GDPR).
              </p>
            </div>

            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">3. Your GDPR Rights</h2>
              <p>You have the right to request access, correction, deletion, or restriction of processing of your personal data at any time.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer lang="en" />
      <MobileBottomBar lang="en" />
      <CookieBanner lang="en" />
    </div>
  );
}
