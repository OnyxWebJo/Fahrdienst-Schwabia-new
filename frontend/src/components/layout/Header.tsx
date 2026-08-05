"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ShieldCheck, ChevronDown, Globe } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";

interface HeaderProps {
  lang?: Locale;
}

export function Header({ lang = "de" }: HeaderProps) {
  const dict = getDictionary(lang);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [airportsOpen, setAirportsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isEn = lang === "en";
  const basePath = isEn ? "/en" : "";

  const toggleLanguagePath = () => {
    if (isEn) {
      return pathname.replace(/^\/en/, "") || "/";
    }
    return pathname === "/" ? "/en" : `/en${pathname}`;
  };

  const navLinks = [
    { href: `${basePath}/`, label: dict.header.home },
    { href: `${basePath}/#services`, label: dict.header.services },
    {
      href: `${basePath}/#why-us`,
      label:
        dict.whyUs.title.split(" ")[0] + " " + dict.whyUs.title.split(" ")[1],
    },
    { href: `${basePath}/#about`, label: dict.header.about },
    { href: `${basePath}/#contact`, label: dict.header.contact },
  ];

  const airportRoutes = [
    {
      href: `${basePath}/flughafentransfer-augsburg-muenchen-flughafen`,
      label: dict.airports.munich,
    },
    {
      href: `${basePath}/flughafentransfer-augsburg-memmingen-flughafen`,
      label: dict.airports.memmingen,
    },
    {
      href: `${basePath}/flughafentransfer-augsburg-nuernberg-flughafen`,
      label: dict.airports.nuremberg,
    },
    {
      href: `${basePath}/flughafentransfer-augsburg-stuttgart-flughafen`,
      label: dict.airports.stuttgart,
    },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top Bar — desktop only */}
      <div className="bg-navy-950 text-slate-300 text-xs py-2 px-4 border-b border-navy-800/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gold-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              Festpreisgarantie &amp; 24/7 Service
            </span>
            <span className="text-slate-400">
              Riedingerstr. 26 E, 86153 Augsburg
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+4915201487887"
              className="hover:text-gold-400 transition-colors flex items-center gap-1 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              +49 15201487887
            </a>
            <span className="text-navy-700">|</span>
            <a
              href="tel:+4982124411214"
              className="hover:text-gold-400 transition-colors"
            >
              Büro: +49 821 24411214
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-navy shadow-xl border-b border-gold-500/20 py-2.5"
            : "bg-navy-900 border-b border-navy-800 py-3"
        }`}
      >
        <div className="relative z-[51] max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link
            href={basePath || "/"}
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
          >
            <img
              src="/logo.png"
              alt="Fahrdienst Schwabia Logo"
              className="h-9 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-bold text-sm sm:text-xl tracking-tight text-white flex items-center gap-1">
                Fahrdienst{" "}
                <span className="gold-gradient-text">Schwabia</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 tracking-wider uppercase font-semibold hidden sm:block">
                Augsburg Airport Transfer
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-200 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Airports Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setAirportsOpen(!airportsOpen)}
                className="text-sm font-medium text-slate-200 hover:text-gold-400 transition-colors flex items-center gap-1 py-1"
              >
                {dict.header.airports}
                <ChevronDown className="w-4 h-4 text-gold-400" />
              </button>
              {airportsOpen && (
                <div
                  onMouseLeave={() => setAirportsOpen(false)}
                  className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-navy-900 border border-gold-500/30 shadow-2xl p-2 z-50"
                >
                  {airportRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setAirportsOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-xs font-medium text-slate-200 hover:bg-navy-800 hover:text-gold-400 transition-all"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={toggleLanguagePath()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:text-gold-400 hover:border-gold-500/50 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span>{isEn ? "DE" : "EN"}</span>
            </Link>
            <a
              href="tel:+4915201487887"
              className="p-2.5 rounded-xl bg-navy-800 border border-navy-700 text-gold-400 hover:bg-navy-700 transition-all"
            >
              <Phone className="w-4 h-4" />
            </a>
            <Link
              href={`${basePath}/#booking`}
              className="gold-gradient-bg gold-gradient-bg-hover text-navy-950 font-heading font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-all"
            >
              {dict.header.bookNow}
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <Link
              href={toggleLanguagePath()}
              className="px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs font-bold text-slate-300 hover:border-gold-500/50 transition-all"
            >
              {isEn ? "DE" : "EN"}
            </Link>

            <a
              href="tel:+4915201487887"
              className="p-2 rounded-lg bg-navy-800 border border-navy-700 text-gold-400 flex items-center"
              aria-label="Call"
            >
              <Phone className="w-4 h-4" style={{ pointerEvents: "none" }} />
            </a>

            {/* Burger Button — React state toggle, both onClick and onTouchEnd for touch devices */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              onTouchEnd={(e) => {
                e.preventDefault();
                setMobileMenuOpen((prev) => !prev);
              }}
              style={{ touchAction: "manipulation" }}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-navy-800 border border-navy-700 text-white cursor-pointer select-none"
            >
              {/* Hamburger / X icon drawn with CSS — no SVG component to block pointer events */}
              <span
                style={{ pointerEvents: "none" }}
                className="relative flex flex-col justify-center items-center w-5 h-5 gap-[5px]"
              >
                <span
                  className={`block w-5 h-[2px] bg-current rounded transition-all duration-200 origin-center ${
                    mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-[2px] bg-current rounded transition-all duration-200 ${
                    mobileMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-[2px] bg-current rounded transition-all duration-200 origin-center ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Backdrop: closes mobile menu on outside tap, prevents it blocking content below */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/40"
            style={{ zIndex: 48 }}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden bg-navy-950 border-t border-navy-800 px-4 pt-4 pb-24 space-y-1 animate-in slide-in-from-top-2 overflow-y-auto max-h-[calc(100vh-4.5rem)]"
            style={{ zIndex: 49 }}
          >
            {navLinks.map((link) => {
              const isHash = link.href.includes("#");
              return isHash ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setTimeout(closeMobileMenu, 100);
                  }}
                  className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:bg-navy-800 hover:text-gold-400 active:bg-navy-700 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:bg-navy-800 hover:text-gold-400 active:bg-navy-700 transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-navy-800">
              <span className="block px-4 py-2 text-xs font-bold uppercase text-gold-400 tracking-wider">
                {dict.header.airports}
              </span>
              {airportRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={closeMobileMenu}
                  className="block px-4 py-2.5 text-sm text-slate-300 hover:text-gold-400 hover:bg-navy-800 rounded-xl active:bg-navy-700 transition-colors"
                >
                  {route.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-navy-800">
              <a
                href={`${basePath}/#booking`}
                onClick={() => {
                  setTimeout(closeMobileMenu, 100);
                }}
                className="block w-full text-center gold-gradient-bg text-navy-950 font-bold py-3.5 rounded-xl shadow-md text-sm"
              >
                {dict.header.bookNow}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
