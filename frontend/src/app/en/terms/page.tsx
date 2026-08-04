import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { CookieBanner } from "@/components/layout/CookieBanner";

export const metadata = {
  title: "Terms & Conditions | Fahrdienst Schwabia Augsburg",
  description: "Terms and conditions for airport transfer & chauffeur services by Fahrdienst Schwabia.",
};

export default function EnglishTermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <Header lang="en" />

      <main className="flex-1 py-16 pb-24 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-navy-900 border border-navy-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="border-b border-navy-800 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Legal Agreement</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">Terms & Conditions</h1>
            <p className="text-xs text-slate-400">Fahrdienst Schwabia — Airport Transfer Services</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-white">1. Scope & Contracting Party</h2>
              <p>These terms apply to all transport services provided by Fahrdienst Schwabia, Augsburg.</p>
            </div>

            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">2. Booking & Fixed Pricing</h2>
              <p>All agreed fares are guaranteed fixed prices including all applicable taxes, toll fees, and airport charges.</p>
            </div>

            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">3. Cancellations</h2>
              <p>Cancellations up to 24 hours prior to pickup time are free of charge.</p>
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
