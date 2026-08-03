"use client";

import { useState, useEffect } from "react";
import { Cookie, Shield, Check, X } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";

interface CookieBannerProps {
  lang?: Locale;
}

export function CookieBanner({ lang = "de" }: CookieBannerProps) {
  const dict = getDictionary(lang);
  const [isVisible, setIsVisible] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [consent, setConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already saved cookie preferences
    const savedConsent = localStorage.getItem("schwabia_cookie_consent");
    if (!savedConsent) {
      setIsVisible(true);
    }

    // Listen for custom event from footer to re-open settings
    const handleOpenSettings = () => {
      setShowSettingsModal(true);
      setIsVisible(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => window.removeEventListener("open-cookie-settings", handleOpenSettings);
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem("schwabia_cookie_consent", JSON.stringify(fullConsent));
    setConsent(fullConsent);
    setIsVisible(false);
    setShowSettingsModal(false);
  };

  const handleNecessaryOnly = () => {
    const minConsent = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem("schwabia_cookie_consent", JSON.stringify(minConsent));
    setConsent(minConsent);
    setIsVisible(false);
    setShowSettingsModal(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem("schwabia_cookie_consent", JSON.stringify(consent));
    setIsVisible(false);
    setShowSettingsModal(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Banner */}
      {!showSettingsModal && (
        <div className="fixed bottom-16 sm:bottom-20 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 bg-navy-950 border border-gold-500/30 p-5 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 rounded-xl gold-gradient-bg text-navy-950 shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-sm">
                {dict.cookie.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                {dict.cookie.text}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            <button
              onClick={handleAcceptAll}
              className="w-full gold-gradient-bg text-navy-950 font-bold py-2 px-3 rounded-xl text-xs shadow hover:scale-105 transition-all text-center"
            >
              {dict.cookie.acceptAll}
            </button>
            <button
              onClick={handleNecessaryOnly}
              className="w-full bg-navy-900 border border-navy-700 text-slate-200 font-semibold py-2 px-3 rounded-xl text-xs hover:bg-navy-800 transition-all text-center"
            >
              {dict.cookie.necessaryOnly}
            </button>
            <button
              onClick={() => setShowSettingsModal(true)}
              className="w-full bg-navy-900 text-gold-400 font-medium py-2 px-3 rounded-xl text-xs hover:underline text-center"
            >
              {dict.cookie.settings}
            </button>
          </div>
        </div>
      )}

      {/* Cookie Preferences Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-950 border border-gold-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold-400" />
                <h3 className="font-heading font-bold text-white text-base">
                  {dict.cookie.title}
                </h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">
                    {dict.cookie.necessary}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Essentiell für Sprache, Sicherheit & Buchungsfunktion.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full">
                  Immer aktiv
                </span>
              </div>

              {/* Analytics Cookies */}
              <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">
                    {dict.cookie.analytics}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Hilft uns, Besucherzahlen & Performance zu analysieren.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) =>
                    setConsent({ ...consent, analytics: e.target.checked })
                  }
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </div>

              {/* Marketing Cookies */}
              <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">
                    {dict.cookie.marketing}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Für personalisierte Angebote & Kampagnenauswertung.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) =>
                    setConsent({ ...consent, marketing: e.target.checked })
                  }
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-end">
              <button
                onClick={handleNecessaryOnly}
                className="py-2.5 px-4 rounded-xl bg-navy-900 text-slate-300 font-semibold text-xs border border-navy-700 hover:bg-navy-800"
              >
                {dict.cookie.necessaryOnly}
              </button>
              <button
                onClick={handleSaveCustom}
                className="py-2.5 px-4 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs shadow hover:scale-105"
              >
                {dict.cookie.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
