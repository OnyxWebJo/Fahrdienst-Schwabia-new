"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plane, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";

interface BookingWidgetProps {
  lang?: Locale;
  preselectedAirport?: string;
}

export function BookingWidget({ lang = "de", preselectedAirport }: BookingWidgetProps) {
  const dict = getDictionary(lang);
  const router = useRouter();
  const isEn = lang === "en";
  const basePath = isEn ? "/en" : "";

  const [tripType, setTripType] = useState<"oneWay" | "roundTrip">("oneWay");
  const [direction, setDirection] = useState<"toAirport" | "fromAirport">("toAirport");
  const [pickup, setPickup] = useState("Augsburg");
  const [destination, setDestination] = useState(preselectedAirport || "MUC");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("08:00");
  const [passengers, setPassengers] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      tripType,
      direction,
      pickup,
      destination,
      date,
      time,
      passengers,
    });
    router.push(`${basePath}/buchung?${params.toString()}`);
  };

  return (
    <div id="booking" className="w-full bg-navy-950/90 border border-gold-500/30 rounded-3xl p-4 sm:p-7 shadow-2xl backdrop-blur-xl" style={{ position: "relative", zIndex: 20 }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-navy-800 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gold-gradient-bg flex items-center justify-center text-navy-950 font-bold shrink-0">
            <Plane className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-white text-sm sm:text-base leading-tight">
              {dict.booking.title}
            </h3>
            <p className="text-[11px] text-slate-400 leading-snug">
              {dict.booking.fixedPriceNotice}
            </p>
          </div>
        </div>

        {/* Direction + Trip Type Selectors */}
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto" style={{ position: "relative", zIndex: 30 }}>
          {/* Direction Selector */}
          <div
            role="group"
            aria-label="Transfer direction"
            className="grid grid-cols-2 bg-navy-900 p-1 rounded-xl border border-navy-800 w-full sm:w-auto"
          >
            <button
              type="button"
              aria-pressed={direction === "toAirport"}
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              onClick={() => setDirection("toAirport")}
              className={`px-3 py-2.5 rounded-lg text-xs font-bold text-center transition-colors ${
                direction === "toAirport"
                  ? "gold-gradient-bg text-navy-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {isEn ? "To Airport" : "Zum Flughafen"}
            </button>
            <button
              type="button"
              aria-pressed={direction === "fromAirport"}
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              onClick={() => setDirection("fromAirport")}
              className={`px-3 py-2.5 rounded-lg text-xs font-bold text-center transition-colors ${
                direction === "fromAirport"
                  ? "gold-gradient-bg text-navy-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {isEn ? "From Airport" : "Vom Flughafen"}
            </button>
          </div>

          {/* Trip Type Selector */}
          <div
            role="group"
            aria-label="Trip type"
            className="grid grid-cols-2 bg-navy-900 p-1 rounded-xl border border-navy-800 w-full sm:w-auto"
          >
            <button
              type="button"
              aria-pressed={tripType === "oneWay"}
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              onClick={() => setTripType("oneWay")}
              className={`px-3 py-2.5 rounded-lg text-xs font-bold text-center transition-colors ${
                tripType === "oneWay"
                  ? "gold-gradient-bg text-navy-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {dict.booking.oneWay}
            </button>
            <button
              type="button"
              aria-pressed={tripType === "roundTrip"}
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              onClick={() => setTripType("roundTrip")}
              className={`px-3 py-2.5 rounded-lg text-xs font-bold text-center transition-colors ${
                tripType === "roundTrip"
                  ? "gold-gradient-bg text-navy-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {dict.booking.roundTrip}
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {direction === "toAirport" ? (
            <>
              {/* Pickup Location */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
                  {dict.booking.pickupLocation}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder={isEn ? "ZIP / Address in Augsburg area" : "PLZ / Adresse in Augsburg"}
                    required
                    className="w-full bg-navy-900 border border-navy-700 text-white rounded-xl px-3.5 py-2.5 text-xs font-medium focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Destination Airport */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
                  {dict.booking.destination}
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-navy-900 border border-navy-700 text-white rounded-xl px-3.5 py-2.5 text-xs font-medium focus:border-gold-500 focus:outline-none transition-colors"
                >
                  <option value="MUC">{dict.airports.munich}</option>
                  <option value="FMM">{dict.airports.memmingen}</option>
                  <option value="NUE">{dict.airports.nuremberg}</option>
                  <option value="STR">{dict.airports.stuttgart}</option>
                  <option value="AUG">{dict.airports.augsburg}</option>
                </select>
              </div>
            </>
          ) : (
            <>
              {/* Pickup Airport */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
                  {dict.booking.pickupLocation}
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-navy-900 border border-navy-700 text-white rounded-xl px-3.5 py-2.5 text-xs font-medium focus:border-gold-500 focus:outline-none transition-colors"
                >
                  <option value="MUC">{dict.airports.munich}</option>
                  <option value="FMM">{dict.airports.memmingen}</option>
                  <option value="NUE">{dict.airports.nuremberg}</option>
                  <option value="STR">{dict.airports.stuttgart}</option>
                  <option value="AUG">{dict.airports.augsburg}</option>
                </select>
              </div>

              {/* Destination Location */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
                  {dict.booking.destination}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder={isEn ? "ZIP / Address in Augsburg area" : "PLZ / Adresse in Augsburg"}
                    required
                    className="w-full bg-navy-900 border border-navy-700 text-white rounded-xl px-3.5 py-2.5 text-xs font-medium focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          {/* Date & Time with high readability [color-scheme:dark] styling */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
              {dict.booking.date} & {dict.booking.time}
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-[60%] bg-navy-900 border border-navy-700 text-white rounded-xl px-2.5 py-2.5 text-xs font-medium focus:border-gold-500 focus:outline-none [color-scheme:dark]"
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-[40%] bg-navy-900 border border-navy-700 text-white rounded-xl px-2 py-2.5 text-xs font-medium focus:border-gold-500 focus:outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Passengers */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
              {dict.booking.passengers}
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full bg-navy-900 border border-navy-700 text-white rounded-xl px-3.5 py-2.5 text-xs font-medium focus:border-gold-500 focus:outline-none"
            >
              <option value="1">1 {isEn ? "Passenger" : "Person"}</option>
              <option value="2">2 {isEn ? "Passengers" : "Personen"}</option>
              <option value="3">3 {isEn ? "Passengers" : "Personen"}</option>
              <option value="4">4 {isEn ? "Passengers" : "Personen"}</option>
              <option value="5">5 {isEn ? "Passengers (Van)" : "Personen (Großraum)"}</option>
              <option value="6">6–8 {isEn ? "Passengers (VIP Van)" : "Personen (VIP Van)"}</option>
            </select>
          </div>
        </div>

        {/* Action Button & Trust Indicators */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-navy-800">
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isEn ? "No advance payment needed" : "Keine Vorabzahlung nötig"}
            </span>
            <span className="flex items-center gap-1 text-gold-400 font-medium hidden sm:flex">
              <ShieldCheck className="w-3.5 h-3.5" />
              {isEn ? "Free cancellation up to 24h" : "Kostenlose Stornierung"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto gold-gradient-bg gold-gradient-bg-hover text-navy-950 font-heading font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg hover:shadow-gold-500/25 flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
          >
            <span>{dict.booking.calculatePrice}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
