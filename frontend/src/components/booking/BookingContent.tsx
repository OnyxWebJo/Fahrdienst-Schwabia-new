"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, ArrowLeft, MessageSquare, Calendar, Clock } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";
import { saveBooking } from "@/lib/bookings";
import { getStoredPricing, calculateTripPrice } from "@/lib/pricing";

export function BookingContent({ lang = "de" }: { lang?: Locale }) {
  const dict = getDictionary(lang);
  const searchParams = useSearchParams();
  const isEn = lang === "en";

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // System Pricing State
  const [currentPricing, setCurrentPricing] = useState(() => getStoredPricing());

  useEffect(() => {
    setCurrentPricing(getStoredPricing());
  }, []);

  const getTodayDate = () => {
    try {
      return new Date().toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  // Form State
  const [tripType, setTripType] = useState<"oneWay" | "roundTrip">(
    (searchParams.get("tripType") as "oneWay" | "roundTrip") || "oneWay"
  );
  const [direction, setDirection] = useState<"toAirport" | "fromAirport">(
    (searchParams.get("direction") as "toAirport" | "fromAirport") || "toAirport"
  );
  const [pickup, setPickup] = useState(searchParams.get("pickup") || "Augsburg");
  const [destination, setDestination] = useState(searchParams.get("destination") || "MUC");
  const [date, setDate] = useState(searchParams.get("date") || getTodayDate());
  const [time, setTime] = useState(searchParams.get("time") || "08:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("12:00");
  const [passengers, setPassengers] = useState(searchParams.get("passengers") || "1");
  const [luggage, setLuggage] = useState("1");
  const [childSeats, setChildSeats] = useState("0");
  const [flightNumber, setFlightNumber] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const destinationNames: Record<string, string> = {
    MUC: dict.airports.munich,
    FMM: dict.airports.memmingen,
    NUE: dict.airports.nuremberg,
    STR: dict.airports.stuttgart,
    AUG: dict.airports.augsburg,
  };

  const getEstimatedPrice = () => {
    const pCount = parseInt(passengers) || 1;
    return calculateTripPrice(destination, pCount, tripType, undefined, currentPricing);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prev) => Math.min(prev + 1, 4));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsent) {
      alert(isEn ? "Please accept the privacy policy." : "Bitte akzeptieren Sie die Datenschutzerklärung.");
      return;
    }

    const generatedId = `FS-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(generatedId);

    const calculatedPrice = getEstimatedPrice();
    const routeName = direction === "toAirport"
      ? `${pickup} ➔ ${destinationNames[destination] || destination}`
      : `${destinationNames[destination] || destination} ➔ ${pickup}`;

    saveBooking({
      id: generatedId,
      name: fullName,
      phone,
      email,
      direction,
      tripType,
      route: routeName,
      pickupAddress: pickup,
      dropoffAddress: destinationNames[destination] || destination,
      date,
      time,
      returnDate: tripType === "roundTrip" ? returnDate : undefined,
      returnTime: tripType === "roundTrip" ? returnTime : undefined,
      price: `${calculatedPrice} €`,
      passengers: Number(passengers) || 1,
      luggage: Number(luggage) || 1,
      childSeats: Number(childSeats) || 0,
      flightNumber,
      notes,
      status: "Neu",
      createdAt: new Date().toISOString(),
    });

    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-navy-900 px-3 py-1 rounded-full border border-gold-500/30">
          {isEn ? "Online Booking" : "Online Buchung"}
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
          {dict.booking.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          {dict.booking.subtitle}
        </p>
      </div>

      {isSubmitted ? (
        /* Success Card */
        <div className="bg-navy-900 border border-emerald-500/40 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            {dict.booking.successTitle}
          </h2>

          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            {dict.booking.successDesc}
          </p>

          <div className="p-4 rounded-2xl bg-navy-950 border border-navy-800 inline-block text-left space-y-1 text-xs">
            <span className="text-slate-400 block">{dict.booking.bookingId}:</span>
            <span className="font-mono font-bold text-gold-400 text-base">
              {bookingId || "FS-928103"}
            </span>
            <span className="block text-slate-300 pt-2">
              {isEn ? "Route" : "Strecke"}: {direction === "toAirport"
                ? `${pickup} ➔ ${destinationNames[destination] || destination}`
                : `${destinationNames[destination] || destination} ➔ ${pickup}`
              }
            </span>
            <span className="block text-gold-400 font-bold">
              {dict.booking.fixedPriceNotice}: {getEstimatedPrice()} €
            </span>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs">
            <a
              href={`https://wa.me/4915201487887?text=${encodeURIComponent(
                isEn
                  ? `Hello Fahrdienst Schwabia, I submitted a booking request for ${
                      direction === "toAirport"
                        ? `${pickup} ➔ ${destinationNames[destination] || destination}`
                        : `${destinationNames[destination] || destination} ➔ ${pickup}`
                    } on ${date} at ${time}. Name: ${fullName}, Tel: ${phone}. Guaranteed Fixed Price: ${getEstimatedPrice()} €.`
                  : `Hallo Fahrdienst Schwabia, ich habe eine Buchungsanfrage gestellt für ${
                      direction === "toAirport"
                        ? `${pickup} ➔ ${destinationNames[destination] || destination}`
                        : `${destinationNames[destination] || destination} ➔ ${pickup}`
                    } am ${date} um ${time} Uhr. Name: ${fullName}, Tel: ${phone}. Festpreis: ${getEstimatedPrice()} €.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isEn ? "Send Details via WhatsApp" : "Details per WhatsApp senden"}</span>
            </a>

            <a
              href="tel:+4915201487887"
              className="px-6 py-3 rounded-xl bg-navy-950 text-gold-400 font-bold border border-gold-500/30 hover:bg-navy-800 transition-all"
            >
              {isEn ? "Questions? Call +49 15201487887" : "Rückfragen? +49 15201487887"}
            </a>

            <a
              href={isEn ? "/en/" : "/"}
              className="px-6 py-3 rounded-xl gold-gradient-bg text-navy-950 font-bold transition-all"
            >
              {isEn ? "Back to Homepage" : "Zurück zur Startseite"}
            </a>
          </div>
        </div>
      ) : (
        /* Multi-Step Wizard Container */
        <div className="bg-navy-900 border border-gold-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* Progress Steps */}
          <div className="grid grid-cols-4 gap-2 border-b border-navy-800 pb-6 mb-8 text-center text-xs">
            <div className={`space-y-1 ${step >= 1 ? "text-gold-400 font-bold" : "text-slate-500"}`}>
              <span className="w-6 h-6 rounded-full inline-flex items-center justify-center bg-navy-950 border border-current mx-auto text-[10px]">
                1
              </span>
              <span className="hidden sm:block">{dict.booking.step1}</span>
            </div>
            <div className={`space-y-1 ${step >= 2 ? "text-gold-400 font-bold" : "text-slate-500"}`}>
              <span className="w-6 h-6 rounded-full inline-flex items-center justify-center bg-navy-950 border border-current mx-auto text-[10px]">
                2
              </span>
              <span className="hidden sm:block">{dict.booking.step2}</span>
            </div>
            <div className={`space-y-1 ${step >= 3 ? "text-gold-400 font-bold" : "text-slate-500"}`}>
              <span className="w-6 h-6 rounded-full inline-flex items-center justify-center bg-navy-950 border border-current mx-auto text-[10px]">
                3
              </span>
              <span className="hidden sm:block">{dict.booking.step3}</span>
            </div>
            <div className={`space-y-1 ${step >= 4 ? "text-gold-400 font-bold" : "text-slate-500"}`}>
              <span className="w-6 h-6 rounded-full inline-flex items-center justify-center bg-navy-950 border border-current mx-auto text-[10px]">
                4
              </span>
              <span className="hidden sm:block">{dict.booking.step4}</span>
            </div>
          </div>

          {/* Step 1: Route & Direction */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    {isEn ? "Trip Type" : "Fahrtart"}
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setTripType("oneWay")}
                      className={`flex-1 py-3 px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all border text-center leading-snug cursor-pointer ${
                        tripType === "oneWay"
                          ? "gold-gradient-bg text-navy-950 border-gold-500 shadow-md"
                          : "bg-navy-950 text-slate-300 border-navy-800"
                      }`}
                    >
                      {dict.booking.oneWay}
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType("roundTrip")}
                      className={`flex-1 py-3 px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all border text-center leading-snug cursor-pointer ${
                        tripType === "roundTrip"
                          ? "gold-gradient-bg text-navy-950 border-gold-500 shadow-md"
                          : "bg-navy-950 text-slate-300 border-navy-800"
                      }`}
                    >
                      {dict.booking.roundTrip}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    {isEn ? "Direction" : "Richtung"}
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setDirection("toAirport")}
                      className={`flex-1 py-3 px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all border text-center leading-snug cursor-pointer ${
                        direction === "toAirport"
                          ? "gold-gradient-bg text-navy-950 border-gold-500 shadow-md"
                          : "bg-navy-950 text-slate-300 border-navy-800"
                      }`}
                    >
                      {isEn ? "To Airport" : "Zum Flughafen"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirection("fromAirport")}
                      className={`flex-1 py-3 px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all border text-center leading-snug cursor-pointer ${
                        direction === "fromAirport"
                          ? "gold-gradient-bg text-navy-950 border-gold-500 shadow-md"
                          : "bg-navy-950 text-slate-300 border-navy-800"
                      }`}
                    >
                      {isEn ? "From Airport" : "Vom Flughafen"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {direction === "toAirport" ? (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        {dict.booking.pickupLocation}
                      </label>
                      <input
                        type="text"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder={isEn ? "Full Address / ZIP in Augsburg" : "Adresse / PLZ in Augsburg"}
                        required
                        className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        {dict.booking.destination}
                      </label>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
                      >
                        <option value="MUC">{dict.airports.munich}</option>
                        <option value="FMM">{dict.airports.memmingen}</option>
                        <option value="NUE">{dict.airports.nuremberg}</option>
                        <option value="STR">{dict.airports.stuttgart}</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        {dict.booking.pickupLocation}
                      </label>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
                      >
                        <option value="MUC">{dict.airports.munich}</option>
                        <option value="FMM">{dict.airports.memmingen}</option>
                        <option value="NUE">{dict.airports.nuremberg}</option>
                        <option value="STR">{dict.airports.stuttgart}</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        {dict.booking.destination}
                      </label>
                      <input
                        type="text"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder={isEn ? "Full Address / ZIP in Augsburg" : "Adresse / PLZ in Augsburg"}
                        required
                        className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end pt-4 border-t border-navy-800">
                <button
                  type="submit"
                  className="gold-gradient-bg text-navy-950 font-bold px-8 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  <span>{isEn ? "Next: Date & Time" : "Weiter: Datum & Zeit"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Date & Time & Passengers */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    {dict.booking.date}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-navy-950 border border-navy-700 text-slate-100 font-semibold rounded-xl p-3 text-xs focus:border-gold-500 [color-scheme:dark]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    {dict.booking.time}
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="w-full bg-navy-950 border border-navy-700 text-slate-100 font-semibold rounded-xl p-3 text-xs focus:border-gold-500 [color-scheme:dark]"
                  />
                </div>
              </div>

              {tripType === "roundTrip" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-navy-800/60">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gold-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold-400" />
                      {dict.booking.returnDate}
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      required
                      className="w-full bg-navy-950 border border-navy-700 text-slate-100 font-semibold rounded-xl p-3 text-xs focus:border-gold-500 [color-scheme:dark]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gold-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      {dict.booking.returnTime}
                    </label>
                    <input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      required
                      className="w-full bg-navy-950 border border-navy-700 text-slate-100 font-semibold rounded-xl p-3 text-xs focus:border-gold-500 [color-scheme:dark]"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {dict.booking.passengers}
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
                  >
                    <option value="1">1 {isEn ? "Passenger" : "Person"}</option>
                    <option value="2">2 {isEn ? "Passengers" : "Personen"}</option>
                    <option value="3">3 {isEn ? "Passengers" : "Personen"}</option>
                    <option value="4">4 {isEn ? "Passengers" : "Personen"}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {dict.booking.luggage}
                  </label>
                  <select
                    value={luggage}
                    onChange={(e) => setLuggage(e.target.value)}
                    className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
                  >
                    <option value="1">1 {isEn ? "Piece" : "Stück"}</option>
                    <option value="2">2 {isEn ? "Suitcases" : "Koffer"}</option>
                    <option value="3">3 {isEn ? "Suitcases" : "Koffer"}</option>
                    <option value="4">4 {isEn ? "Suitcases" : "Koffer"}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {dict.booking.childSeats}
                  </label>
                  <select
                    value={childSeats}
                    onChange={(e) => setChildSeats(e.target.value)}
                    className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
                  >
                    <option value="0">{isEn ? "None" : "Keine"}</option>
                    <option value="1">1 {isEn ? "Child seat (+ €0)" : "Kindersitz (+ 0 €)"}</option>
                    <option value="2">2 {isEn ? "Child seats (+ €0)" : "Kindersitze (+ 0 €)"}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {dict.booking.flightNumber}
                </label>
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  placeholder={isEn ? "e.g. LH 2050 (for automatic delay tracking)" : "z.B. LH 2050 (für automatische Verspätungsanpassung)"}
                  className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
                />
              </div>

              <div className="flex justify-between pt-4 border-t border-navy-800">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-xl bg-navy-950 text-slate-300 border border-navy-800 text-xs font-bold flex items-center gap-2 hover:bg-navy-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{isEn ? "Back" : "Zurück"}</span>
                </button>
                <button
                  type="submit"
                  className="gold-gradient-bg text-navy-950 font-bold px-8 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  <span>{isEn ? "Next: Contact Details" : "Weiter: Kontaktdaten"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Passenger Contact Details */}
          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {dict.booking.fullName} *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isEn ? "e.g. Dr. Markus Weber" : "z.B. Dr. Markus Weber"}
                  required
                  className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {dict.booking.phone} *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+49 171 1234567"
                    required
                    className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {dict.booking.email} *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isEn ? "name@example.com" : "name@beispiel.de"}
                    required
                    className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {dict.booking.notes}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder={isEn ? "Special requests, bulky luggage, pickup details..." : "Besondere Wünsche, Abholadresse Details..."}
                  className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
                />
              </div>

              <div className="flex justify-between pt-4 border-t border-navy-800">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-xl bg-navy-950 text-slate-300 border border-navy-800 text-xs font-bold flex items-center gap-2 hover:bg-navy-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{isEn ? "Back" : "Zurück"}</span>
                </button>
                <button
                  type="submit"
                  className="gold-gradient-bg text-navy-950 font-bold px-8 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  <span>{isEn ? "Next: Summary" : "Weiter: Übersicht"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Summary & Final Submit */}
          {step === 4 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="p-5 rounded-2xl bg-navy-950 border border-navy-800 space-y-3 text-xs">
                <h3 className="font-heading font-bold text-sm text-gold-400 uppercase tracking-wider">
                  {isEn ? "Booking Summary" : "Zusammenfassung Ihrer Fahrt"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                  <div>
                    <span className="text-slate-500 block">{isEn ? "Route:" : "Strecke:"}</span>
                    <strong className="text-white">
                      {direction === "toAirport"
                        ? `${pickup} ➔ ${destinationNames[destination] || destination}`
                        : `${destinationNames[destination] || destination} ➔ ${pickup}`}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{isEn ? "Date & Time:" : "Datum & Zeit:"}</span>
                    <strong className="text-white">{date} {isEn ? "at" : "um"} {time} {isEn ? "" : "Uhr"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{isEn ? "Passenger:" : "Fahrgast:"}</span>
                    <strong className="text-white">{fullName} ({phone})</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{isEn ? "Options:" : "Optionen:"}</span>
                    <strong className="text-white">{passengers} {isEn ? "Person(s)" : "Person(en)"} | {luggage} {isEn ? "Luggage" : "Gepäck"}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-navy-800 flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-bold">{dict.booking.fixedPriceNotice}:</span>
                  <span className="text-xl font-extrabold text-gold-400">{getEstimatedPrice()} €</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    required
                    className="mt-1 accent-amber-500 w-4 h-4 rounded"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed">
                    {dict.booking.privacyConsent}
                  </span>
                </label>

                <p className="text-[11px] text-slate-400">
                  {dict.booking.termsConsent}
                </p>
              </div>

              <div className="flex justify-between pt-4 border-t border-navy-800">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-xl bg-navy-950 text-slate-300 border border-navy-800 text-xs font-bold flex items-center gap-2 hover:bg-navy-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{isEn ? "Back" : "Zurück"}</span>
                </button>
                <button
                  type="submit"
                  className="gold-gradient-bg text-navy-950 font-bold px-8 py-3.5 rounded-xl text-xs flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer"
                >
                  <span>{dict.booking.submit}</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
