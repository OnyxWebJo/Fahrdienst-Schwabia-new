"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Clock } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";

interface FooterProps {
  lang?: Locale;
}

export function Footer({ lang = "de" }: FooterProps) {
  const dict = getDictionary(lang);
  const isEn = lang === "en";
  const basePath = isEn ? "/en" : "";

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <Link href={basePath || "/"} className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Fahrdienst Schwabia Logo"
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl tracking-tight text-white">
                  Fahrdienst <span className="gold-gradient-text">Schwabia</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">
                  Augsburg Airport Transfer
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              {dict.footer.aboutText}
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Riedingerstr. 26 E, 86153 Augsburg</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{isEn ? "Booking:" : "Buchung:"} +49 15201487887</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{isEn ? "Office:" : "Büro:"} +49 821 24411214</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{isEn ? "24/7 Service & Support" : "24/7 Service & Erreichbarkeit"}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4 border-b border-navy-800 pb-2">
              {dict.footer.navigation}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href={`${basePath}/`} className="hover:text-gold-400 transition-colors">
                  {dict.header.home}
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/#services`} className="hover:text-gold-400 transition-colors">
                  {dict.header.services}
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/#why-us`} className="hover:text-gold-400 transition-colors">
                  {dict.whyUs.title}
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/#about`} className="hover:text-gold-400 transition-colors">
                  {dict.header.about}
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/#contact`} className="hover:text-gold-400 transition-colors">
                  {dict.header.contact}
                </Link>
              </li>
              <li>
                <Link href={isEn ? "/en/buchung" : "/buchung"} className="hover:text-gold-400 transition-colors font-semibold text-gold-400">
                  {dict.header.bookNow}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Airport Routes */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4 border-b border-navy-800 pb-2">
              {dict.footer.airports}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href={`${basePath}/flughafentransfer-augsburg-muenchen-flughafen`}
                  className="hover:text-gold-400 transition-colors block"
                >
                  Augsburg ⇄ {dict.airports.munich}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/flughafentransfer-augsburg-memmingen-flughafen`}
                  className="hover:text-gold-400 transition-colors block"
                >
                  Augsburg ⇄ {dict.airports.memmingen}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/flughafentransfer-augsburg-nuernberg-flughafen`}
                  className="hover:text-gold-400 transition-colors block"
                >
                  Augsburg ⇄ {dict.airports.nuremberg}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/flughafentransfer-augsburg-stuttgart-flughafen`}
                  className="hover:text-gold-400 transition-colors block"
                >
                  Augsburg ⇄ {dict.airports.stuttgart}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Security */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4 border-b border-navy-800 pb-2">
              {dict.footer.legal}
            </h3>
            <ul className="space-y-2.5 text-xs mb-6">
              <li>
                <Link href={isEn ? "/en/imprint" : "/impressum"} className="hover:text-gold-400 transition-colors">
                  {dict.footer.impressum}
                </Link>
              </li>
              <li>
                <Link href={isEn ? "/en/privacy-policy" : "/datenschutz"} className="hover:text-gold-400 transition-colors">
                  {dict.footer.datenschutz}
                </Link>
              </li>
              <li>
                <Link href={isEn ? "/en/terms" : "/agb"} className="hover:text-gold-400 transition-colors">
                  {dict.footer.agb}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("open-cookie-settings"));
                    }
                  }}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  {dict.footer.cookieSettings}
                </button>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-gold-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isEn ? "GDPR Compliant" : "DSGVO / GDPR Konform"}
              </div>
              <p className="text-[10px] leading-snug">
                {isEn
                  ? "Secure data transmission via 256-bit SSL/TLS encryption."
                  : "Sichere Datenübertragung per 256-Bit SSL/TLS-Verschlüsselung."}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-navy-900 text-center md:flex md:justify-between md:items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Fahrdienst Schwabia. {dict.footer.rights}</p>
          <p className="mt-2 md:mt-0 text-[11px]">
            Augsburg Airport Transfer & Chauffeur Services
          </p>
        </div>
      </div>
    </footer>
  );
}
