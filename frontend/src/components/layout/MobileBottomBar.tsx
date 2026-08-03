"use client";

import Link from "next/link";
import { Phone, MessageSquare, Calendar } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";

interface MobileBottomBarProps {
  lang?: Locale;
}

export function MobileBottomBar({ lang = "de" }: MobileBottomBarProps) {
  const dict = getDictionary(lang);
  const isEn = lang === "en";
  const basePath = isEn ? "/en" : "";

  const whatsappMessage = encodeURIComponent(
    isEn
      ? "Hello Fahrdienst Schwabia, I would like to inquire about an airport transfer from Augsburg."
      : "Hallo Fahrdienst Schwabia, ich möchte mich nach einem Flughafentransfer ab Augsburg erkundigen."
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-navy-950/95 backdrop-blur-md border-t border-navy-800 p-2.5 sm:px-4 lg:hidden shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/4915201487887?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md active:scale-95"
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Phone Call Button */}
        <a
          href="tel:+4915201487887"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-navy-800 hover:bg-navy-700 text-gold-400 border border-gold-500/30 transition-all shadow-md active:scale-95"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">{dict.header.callNow}</span>
        </a>

        {/* Book Now Button */}
        <Link
          href={`${basePath}/#booking`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl gold-gradient-bg text-navy-950 transition-all shadow-md active:scale-95"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">{dict.header.bookNow}</span>
        </Link>
      </div>
    </div>
  );
}
