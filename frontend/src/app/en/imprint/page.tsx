import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Imprint | Fahrdienst Schwabia Augsburg",
  description: "Legal company details pursuant to German law (§ 5 DDG) for Fahrdienst Schwabia.",
};

export default function EnglishImprintPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <Header lang="en" />

      <main className="flex-1 py-16 pb-24 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-navy-900 border border-navy-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="border-b border-navy-800 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Legal Info</span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">Imprint</h1>
            <p className="text-xs text-slate-400">Information pursuant to § 5 Telemedia Act (DDG)</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-white">Company Details</h2>
              <p className="font-semibold text-gold-400">Fahrdienst Schwabia</p>
              <p>Chauffeur & Private Transfer Service pursuant to § 49 PBefG</p>
              <p className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                Riedingerstr. 26 E, 86153 Augsburg, Germany
              </p>
            </div>

            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">Contact</h2>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                Booking Hotline: +49 15201487887
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                Office HQ: +49 821 24411214
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                Email: info@fahrdienst-schwabia.de
              </p>
            </div>

            <div className="space-y-2 border-t border-navy-800 pt-4">
              <h2 className="font-heading font-bold text-lg text-white">Supervisory Authority</h2>
              <p>Licensed for commercial passenger transport by:</p>
              <p className="font-medium text-slate-200">City of Augsburg — Regulatory Office (Ordnungsamt)</p>
              <p>An der Blauen Kappe 18, 86152 Augsburg, Germany</p>
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
