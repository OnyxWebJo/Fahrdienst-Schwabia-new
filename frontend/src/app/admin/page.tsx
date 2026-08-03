"use client";

import { useState, useEffect } from "react";
import {
  Lock,
  Search,
  Download,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  Users,
  Briefcase,
  Baby,
  Plane,
  X,
  Eye,
  LogOut,
  Globe,
  Save,
  MessageSquare,
  FileSpreadsheet,
  Trash2,
} from "lucide-react";
import {
  getStoredBookings,
  updateStoredBookingStatus,
  deleteStoredBooking,
  BookingRecord,
} from "@/lib/bookings";
import {
  getStoredPricing,
  saveStoredPricing,
  SystemPricing,
  defaultPricing,
} from "@/lib/pricing";

export default function AdminDashboardPage() {
  const [adminTab, setAdminTab] = useState<"bookings" | "pricing">("bookings");
  const [adminLang, setAdminLang] = useState<"de" | "en">("de");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Alle");

  // Selected Booking Modal
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  // Editable pricing state
  const [pricing, setPricing] = useState<SystemPricing>(defaultPricing);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // Live Bookings State
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  useEffect(() => {
    setPricing(getStoredPricing());
    setBookings(getStoredBookings());

    const handleBookingsUpdate = () => {
      setBookings(getStoredBookings());
    };

    if (typeof window !== "undefined") {
      window.addEventListener("bookings-updated", handleBookingsUpdate);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("bookings-updated", handleBookingsUpdate);
      }
    };
  }, []);

  const isEn = adminLang === "en";

  const t = {
    title: "Fahrdienst Schwabia Admin",
    subtitle: isEn ? "Super Admin Logged In" : "Super Admin eingeloggt",
    tabBookings: isEn ? "Bookings Overview" : "Buchungsübersicht",
    tabPricing: isEn ? "Edit Prices & Rates" : "Preise & Tarife Bearbeiten",
    logout: isEn ? "Logout" : "Abmelden",
    totalBookings: isEn ? "Total Bookings" : "Buchungen Gesamt",
    newRequests: isEn ? "New Requests" : "Neue Anfragen",
    todayRides: isEn ? "Confirmed Rides" : "Bestätigte Fahrten",
    monthlyRevenue: isEn ? "Completed Revenue" : "Abgeschlossener Umsatz",
    searchPlaceholder: isEn
      ? "Search by ID, Name, Phone..."
      : "Suchen nach ID, Name, Telefon...",
    allStatus: isEn ? "All Statuses" : "Alle Status",
    exportCsv: isEn ? "Export CSV" : "CSV Exportieren",
    colId: "ID",
    colPassenger: isEn ? "Passenger" : "Fahrgast",
    colRoute: isEn ? "Route" : "Strecke",
    colDateTime: isEn ? "Date & Time" : "Datum & Zeit",
    colPrice: isEn ? "Fixed Price" : "Festpreis",
    colStatus: "Status",
    colAction: isEn ? "Actions" : "Aktionen",
    callBtn: isEn ? "Call" : "Anrufen",
    detailsBtn: isEn ? "Details" : "Details",
    invoiceBtn: isEn ? "PDF Invoice" : "Rechnung PDF",
    whatsappBtn: isEn ? "WhatsApp" : "WhatsApp",
    deleteBtn: isEn ? "Delete" : "Löschen",
    usernameLabel: isEn ? "Username" : "Benutzername",
    passwordLabel: isEn ? "Password" : "Passwort",
    loginBtn: isEn ? "Log In" : "Anmelden",
    savePricingBtn: isEn ? "Save Prices" : "Preise Speichern",
    savedMsg: isEn
      ? "Prices updated successfully!"
      : "Preise erfolgreich aktualisiert!",
    invalidCreds: isEn
      ? "Invalid credentials. (Demo: admin / schwabia2026)"
      : "Ungültige Anmeldedaten. (Demozugang: admin / schwabia2026)",
    statusLabels: {
      Neu: isEn ? "New" : "Neu",
      Bestätigt: isEn ? "Confirmed" : "Bestätigt",
      "Fahrer zugewiesen": isEn ? "Driver Assigned" : "Fahrer zugewiesen",
      Abgeschlossen: isEn ? "Completed" : "Abgeschlossen",
      Storniert: isEn ? "Cancelled" : "Storniert",
    },
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "schwabia2026") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError(t.invalidCreds);
    }
  };

  const handleStatusChange = (
    id: string,
    newStatus: BookingRecord["status"]
  ) => {
    const updated = updateStoredBookingStatus(id, newStatus);
    setBookings(updated);
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDeleteBooking = (id: string, name: string) => {
    const confirmMsg = isEn
      ? `Are you sure you want to delete booking ${id} for ${name}?`
      : `Möchten Sie die Buchung ${id} von ${name} wirklich löschen?`;
    if (window.confirm(confirmMsg)) {
      const updated = deleteStoredBooking(id);
      setBookings(updated);
      if (selectedBooking?.id === id) {
        setSelectedBooking(null);
      }
    }
  };

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredPricing(pricing);
    setSaveSuccessMsg(t.savedMsg);
    setTimeout(() => setSaveSuccessMsg(""), 4000);
  };

  // 1-Click Printable PDF Invoice Generator
  const generatePDFInvoice = (booking: BookingRecord) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const invoiceNo = `RE-2026-${booking.id.replace("FS-", "")}`;
    const dateToday = new Date().toLocaleDateString(isEn ? "en-US" : "de-DE");

    const html = `
      <!DOCTYPE html>
      <html lang="${isEn ? "en" : "de"}">
      <head>
        <meta charset="UTF-8">
        <title>Rechnung / Invoice ${invoiceNo} - Fahrdienst Schwabia</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0f172a; margin: 40px; line-height: 1.5; }
          .logo { height: 60px; max-width: 260px; object-fit: contain; }
          .company-details { text-align: right; font-size: 11px; color: #64748b; line-height: 1.5; }
          .title { font-size: 24px; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 4px; letter-spacing: -0.5px; }
          .meta { font-size: 12px; color: #64748b; margin-bottom: 30px; }
          .grid { display: flex; justify-content: space-between; gap: 20px; margin-bottom: 30px; }
          .box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; width: 48%; font-size: 12px; box-sizing: border-box; }
          .box h4 { margin: 0 0 10px 0; color: #0f172a; text-transform: uppercase; font-size: 10px; letter-spacing: 1px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background: #0f172a; color: white; text-align: left; padding: 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
          td { padding: 14px 12px; border-bottom: 1px solid #e2e8f0; font-size: 12px; }
          .total-box { width: 280px; margin-left: auto; background: #f8fafc; border: 1px solid #cbd5e1; padding: 16px; border-radius: 12px; font-size: 12px; }
          .total-row { display: flex; justify-content: space-between; padding: 4px 0; }
          .total-grand { font-size: 15px; font-weight: bold; color: #0f172a; border-top: 2px solid #0f172a; padding-top: 10px; margin-top: 6px; }
          .footer { margin-top: 60px; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 10px; color: #94a3b8; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <img src="/full_logo.png" class="logo" alt="Fahrdienst Schwabia Logo" />
          <div class="company-details">
            <strong>Fahrdienst Schwabia</strong><br>
            Riedingerstr. 26 E, 86153 Augsburg<br>
            Hotline: +49 15201487887 | Tel: +49 821 24411214<br>
            Email: info@fahrdienst-schwabia.de | www.fahrdienst-schwabia.de
          </div>
        </div>

        <div class="title">${isEn ? "INVOICE" : "RECHNUNG"} ${invoiceNo}</div>
        <div class="meta">${isEn ? "Invoice Date" : "Rechnungsdatum"}: ${dateToday} | ${isEn ? "Booking Ref" : "Buchungs-Ref"}: ${booking.id}</div>

        <div class="grid">
          <div class="box">
            <h4>${isEn ? "Customer Information" : "Rechnungsempfänger"}</h4>
            <strong>${booking.name}</strong><br>
            Tel: ${booking.phone}<br>
            Email: ${booking.email}
          </div>
          <div class="box">
            <h4>${isEn ? "Ride Details" : "Fahrtdetails"}</h4>
            <strong>${isEn ? "Route:" : "Strecke:"}</strong> ${booking.route}<br>
            <strong>${isEn ? "Date & Time:" : "Datum & Zeit:"}</strong> ${booking.date} ${isEn ? "at" : "um"} ${booking.time} ${isEn ? "" : "Uhr"}<br>
            ${booking.flightNumber ? `<strong>${isEn ? "Flight No:" : "Flugnummer:"}</strong> ${booking.flightNumber}<br>` : ""}
            <strong>${isEn ? "Passengers:" : "Personen:"}</strong> ${booking.passengers || 1} | <strong>${isEn ? "Luggage:" : "Gepäck:"}</strong> ${booking.luggage || 1}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>${isEn ? "Description" : "Position / Leistung"}</th>
              <th>${isEn ? "Date" : "Fahrtdatum"}</th>
              <th style="text-align: right;">${isEn ? "Amount" : "Betrag"}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>${isEn ? "Airport Transfer Fixed Price" : "Flughafentransfer Festpreis"}</strong><br>
                <span style="font-size: 11px; color: #64748b;">${booking.route}</span>
              </td>
              <td>${booking.date}</td>
              <td style="text-align: right; font-weight: bold;">${booking.price}</td>
            </tr>
          </tbody>
        </table>

        <div class="total-box">
          <div class="total-row">
            <span>${isEn ? "Net Amount (19% VAT):" : "Nettobetrag (19% MwSt.):"}</span>
            <span>${(parseFloat(booking.price) / 1.19).toFixed(2)} €</span>
          </div>
          <div class="total-row">
            <span>${isEn ? "VAT (19%):" : "MwSt. (19%):"}</span>
            <span>${(parseFloat(booking.price) - parseFloat(booking.price) / 1.19).toFixed(2)} €</span>
          </div>
          <div class="total-row total-grand">
            <span>${isEn ? "Total Amount (incl. VAT):" : "Gesamtbetrag (inkl. MwSt.):"}</span>
            <span>${booking.price}</span>
          </div>
        </div>

        <div class="footer">
          Fahrdienst Schwabia • Riedingerstr. 26 E, 86153 Augsburg • USt-IdNr.: DE34920193<br>
          ${isEn ? "Thank you for choosing Fahrdienst Schwabia!" : "Vielen Dank für Ihre Buchung und Ihr Vertrauen in Fahrdienst Schwabia!"}
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  // 1-Click Send WhatsApp Invoice Message
  const sendWhatsAppInvoice = (booking: BookingRecord) => {
    const phoneClean = booking.phone.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      isEn
        ? `Hello ${booking.name},\n\nthank you for booking with Fahrdienst Schwabia! 🚖✈️\n\nHere are your transfer details:\n• Booking ID: ${booking.id}\n• Route: ${booking.route}\n• Date & Time: ${booking.date} at ${booking.time}\n• Passengers: ${booking.passengers || 1}\n• Fixed Price: ${booking.price}\n\nFor questions, call +49 15201487887.\n\nBest regards,\nFahrdienst Schwabia`
        : `Hallo ${booking.name},\n\nvielen Dank für Ihre Buchung bei Fahrdienst Schwabia! 🚖✈️\n\nHier sind die Bestätigungsdetails Ihrer Fahrt:\n• Buchungs-ID: ${booking.id}\n• Strecke: ${booking.route}\n• Datum & Zeit: ${booking.date} um ${booking.time} Uhr\n• Personen: ${booking.passengers || 1}\n• Festpreis: ${booking.price}\n\nBei Fragen erreichen Sie uns jederzeit unter +49 15201487887.\n\nGute Fahrt wünscht Ihr Team von Fahrdienst Schwabia!`
    );
    window.open(`https://wa.me/${phoneClean}?text=${message}`, "_blank");
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "Alle" || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const completedRevenue = bookings
    .filter((b) => b.status === "Abgeschlossen")
    .reduce((sum, b) => sum + (parseInt(b.price.replace(/[^0-9]/g, "")) || 0), 0);

  const exportCSV = () => {
    const headers =
      "ID,Name,Phone,Email,Route,Date,Time,Price,Passengers,Luggage,FlightNumber,Status\n";
    const rows = filteredBookings
      .map(
        (b) =>
          `"${b.id}","${b.name}","${b.phone}","${b.email}","${b.route}","${b.date}","${b.time}","${b.price}","${b.passengers || 1}","${b.luggage || 1}","${b.flightNumber || ""}","${b.status}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings_fahrdienst_schwabia_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
        <div className="bg-navy-900 border border-gold-500/30 p-8 sm:p-10 rounded-3xl max-w-md w-full shadow-2xl space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setAdminLang(isEn ? "de" : "en")}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-700 text-xs font-bold text-slate-300 hover:text-gold-400"
            >
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span>{isEn ? "DE" : "EN"}</span>
            </button>
          </div>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center text-navy-950 mx-auto shadow-lg">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-white">
              Admin Dashboard
            </h1>
            <p className="text-xs text-slate-400">
              Fahrdienst Schwabia Management System
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {t.usernameLabel}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {t.passwordLabel}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-navy-950 border border-navy-700 text-white rounded-xl p-3 text-xs focus:border-gold-500"
              />
            </div>

            <button
              type="submit"
              className="w-full gold-gradient-bg text-navy-950 font-bold py-3 rounded-xl shadow-lg hover:scale-[1.02] transition-all text-xs"
            >
              {t.loginBtn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-navy-900 border-b border-navy-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-auto object-contain"
          />
          <div>
            <h1 className="font-heading font-extrabold text-lg text-white">
              {t.title}
            </h1>
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> {t.subtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setAdminLang(isEn ? "de" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:text-gold-400 hover:border-gold-500/50 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-gold-400" />
            <span>{isEn ? "DE" : "EN"}</span>
          </button>

          {/* Navigation Tabs */}
          <div className="flex bg-navy-950 p-1 rounded-xl border border-navy-800">
            <button
              onClick={() => setAdminTab("bookings")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                adminTab === "bookings"
                  ? "gold-gradient-bg text-navy-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t.tabBookings}
            </button>
            <button
              onClick={() => setAdminTab("pricing")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                adminTab === "pricing"
                  ? "gold-gradient-bg text-navy-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t.tabPricing}
            </button>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-red-950/60 hover:text-red-400 text-slate-300 text-xs font-semibold transition-all border border-navy-700"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.logout}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        {adminTab === "bookings" && (
          <>
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-navy-900 border border-navy-800 p-5 rounded-2xl space-y-1">
                <span className="text-xs text-slate-400 font-medium">
                  {t.totalBookings}
                </span>
                <div className="text-2xl font-extrabold text-white">
                  {bookings.length}
                </div>
              </div>
              <div className="bg-navy-900 border border-navy-800 p-5 rounded-2xl space-y-1">
                <span className="text-xs text-slate-400 font-medium">
                  {t.newRequests}
                </span>
                <div className="text-2xl font-extrabold text-gold-400">
                  {bookings.filter((b) => b.status === "Neu").length}
                </div>
              </div>
              <div className="bg-navy-900 border border-navy-800 p-5 rounded-2xl space-y-1">
                <span className="text-xs text-slate-400 font-medium">
                  {t.todayRides}
                </span>
                <div className="text-2xl font-extrabold text-emerald-400">
                  {bookings.filter((b) => b.status === "Bestätigt").length}
                </div>
              </div>
              <div className="bg-navy-900 border border-navy-800 p-5 rounded-2xl space-y-1">
                <span className="text-xs text-slate-400 font-medium">
                  {t.monthlyRevenue}
                </span>
                <div className="text-2xl font-extrabold text-white">
                  {completedRevenue} €
                </div>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="bg-navy-900 border border-navy-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-[280px]">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-navy-950 border border-navy-700 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 focus:border-gold-500"
                  />
                </div>

                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-navy-950 border border-navy-700 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:border-gold-500"
                  >
                    <option value="Alle">{t.allStatus}</option>
                    <option value="Neu">{t.statusLabels.Neu}</option>
                    <option value="Bestätigt">{t.statusLabels.Bestätigt}</option>
                    <option value="Fahrer zugewiesen">{t.statusLabels["Fahrer zugewiesen"]}</option>
                    <option value="Abgeschlossen">{t.statusLabels.Abgeschlossen}</option>
                    <option value="Storniert">{t.statusLabels.Storniert}</option>
                  </select>
                </div>
              </div>

              <button
                onClick={exportCSV}
                className="flex items-center gap-2 bg-navy-950 border border-gold-500/40 text-gold-400 hover:bg-navy-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{t.exportCsv}</span>
              </button>
            </div>

            {/* Bookings Data Table */}
            <div className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-navy-950 text-slate-400 border-b border-navy-800 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-4">{t.colId}</th>
                      <th className="p-4">{t.colPassenger}</th>
                      <th className="p-4">{t.colRoute}</th>
                      <th className="p-4">{t.colDateTime}</th>
                      <th className="p-4">{t.colPrice}</th>
                      <th className="p-4">{t.colStatus}</th>
                      <th className="p-4 text-right">{t.colAction}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-800/60">
                    {filteredBookings.map((b) => (
                      <tr
                        key={b.id}
                        className="hover:bg-navy-800/40 transition-colors"
                      >
                        <td className="p-4 font-mono font-bold text-gold-400">
                          {b.id}
                        </td>
                        <td className="p-4 space-y-0.5">
                          <div className="font-semibold text-white">
                            {b.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {b.phone}
                          </div>
                        </td>
                        <td className="p-4 font-medium text-slate-200">
                          {b.route}
                        </td>
                        <td className="p-4 space-y-0.5">
                          <div className="text-slate-200">{b.date}</div>
                          <div className="text-[11px] text-slate-400">
                            {b.time} {isEn ? "" : "Uhr"}
                          </div>
                        </td>
                        <td className="p-4 font-bold text-white text-sm">
                          {b.price}
                        </td>
                        <td className="p-4">
                          <select
                            value={b.status}
                            onChange={(e) =>
                              handleStatusChange(
                                b.id,
                                e.target.value as BookingRecord["status"]
                              )
                            }
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border bg-navy-950 focus:outline-none ${
                              b.status === "Neu"
                                ? "text-amber-400 border-amber-500/40"
                                : b.status === "Bestätigt"
                                ? "text-emerald-400 border-emerald-500/40"
                                : b.status === "Fahrer zugewiesen"
                                ? "text-blue-400 border-blue-500/40"
                                : b.status === "Abgeschlossen"
                                ? "text-slate-400 border-slate-700"
                                : "text-red-400 border-red-500/40"
                            }`}
                          >
                            <option value="Neu">{t.statusLabels.Neu}</option>
                            <option value="Bestätigt">{t.statusLabels.Bestätigt}</option>
                            <option value="Fahrer zugewiesen">{t.statusLabels["Fahrer zugewiesen"]}</option>
                            <option value="Abgeschlossen">{t.statusLabels.Abgeschlossen}</option>
                            <option value="Storniert">{t.statusLabels.Storniert}</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View Details Modal CTA */}
                            <button
                              onClick={() => setSelectedBooking(b)}
                              className="p-1.5 rounded-lg bg-navy-950 border border-navy-700 text-slate-300 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                              title={t.detailsBtn}
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {/* Printable PDF Invoice CTA */}
                            <button
                              onClick={() => generatePDFInvoice(b)}
                              className="p-1.5 rounded-lg bg-navy-950 border border-navy-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                              title={t.invoiceBtn}
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>

                            {/* WhatsApp Send Invoice CTA */}
                            <button
                              onClick={() => sendWhatsAppInvoice(b)}
                              className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400 hover:bg-emerald-900 transition-colors"
                              title={t.whatsappBtn}
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Booking CTA */}
                            <button
                              onClick={() => handleDeleteBooking(b.id, b.name)}
                              className="p-1.5 rounded-lg bg-red-950/70 border border-red-800 text-red-400 hover:bg-red-900 transition-colors"
                              title={t.deleteBtn}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Pricing Editor Tab */}
        {adminTab === "pricing" && (
          <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-800 pb-4">
              <div>
                <h2 className="font-heading font-bold text-xl text-white">
                  {isEn ? "Edit Prices & Rates" : "Preise & Tarife Bearbeiten"}
                </h2>
                <p className="text-xs text-slate-400">
                  {isEn
                    ? "Changes take effect instantly for all new bookings."
                    : "Änderungen werden sofort für alle Neubuchungen auf der Website übernommen."}
                </p>
              </div>

              {saveSuccessMsg && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-bold animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSavePricing} className="space-y-8">
              {/* Munich MUC Tiered Pricing */}
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-sm text-gold-400 uppercase tracking-wider">
                  {isEn ? "Munich Airport (MUC) ⇄ Augsburg (Tiered Pricing by Passengers)" : "Flughafen München (MUC) ⇄ Augsburg (Staffelpreise nach Personen)"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(["p1", "p2", "p3", "p4"] as const).map((key, idx) => (
                    <div
                      key={key}
                      className="bg-navy-950 border border-navy-800 p-4 rounded-xl space-y-1"
                    >
                      <label className="text-xs text-slate-300 font-semibold block">
                        {idx + 1} {isEn ? "Passenger(s)" : "Person(en)"}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={pricing.MUC[key]}
                          onChange={(e) =>
                            setPricing({
                              ...pricing,
                              MUC: {
                                ...pricing.MUC,
                                [key]: Number(e.target.value),
                              },
                            })
                          }
                          className="w-full bg-navy-900 border border-navy-700 text-white rounded-lg p-2 text-sm font-bold focus:border-gold-500"
                        />
                        <span className="text-slate-400 text-xs font-bold">
                          €
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memmingen FMM Tiered Pricing */}
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-sm text-gold-400 uppercase tracking-wider">
                  {isEn ? "Memmingen Airport (FMM) ⇄ Augsburg (Tiered Pricing by Passengers)" : "Flughafen Memmingen (FMM) ⇄ Augsburg (Staffelpreise nach Personen)"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(["p1", "p2", "p3", "p4"] as const).map((key, idx) => (
                    <div
                      key={key}
                      className="bg-navy-950 border border-navy-800 p-4 rounded-xl space-y-1"
                    >
                      <label className="text-xs text-slate-300 font-semibold block">
                        {idx + 1} {isEn ? "Passenger(s)" : "Person(en)"}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={pricing.FMM[key]}
                          onChange={(e) =>
                            setPricing({
                              ...pricing,
                              FMM: {
                                ...pricing.FMM,
                                [key]: Number(e.target.value),
                              },
                            })
                          }
                          className="w-full bg-navy-900 border border-navy-700 text-white rounded-lg p-2 text-sm font-bold focus:border-gold-500"
                        />
                        <span className="text-slate-400 text-xs font-bold">
                          €
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed Trips & Per-KM Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-navy-800 pt-6">
                <div className="bg-navy-950 border border-navy-800 p-4 rounded-xl space-y-1">
                  <label className="text-xs text-slate-300 font-semibold block">
                    {isEn ? "Nuremberg (NUE) Flat Rate" : "Nürnberg (NUE) Pauschale"}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={pricing.NUE}
                      onChange={(e) =>
                        setPricing({
                          ...pricing,
                          NUE: Number(e.target.value),
                        })
                      }
                      className="w-full bg-navy-900 border border-navy-700 text-white rounded-lg p-2 text-sm font-bold focus:border-gold-500"
                    />
                    <span className="text-slate-400 text-xs font-bold">€</span>
                  </div>
                </div>

                <div className="bg-navy-950 border border-navy-800 p-4 rounded-xl space-y-1">
                  <label className="text-xs text-slate-300 font-semibold block">
                    {isEn ? "Stuttgart (STR) Flat Rate" : "Stuttgart (STR) Pauschale"}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={pricing.STR}
                      onChange={(e) =>
                        setPricing({
                          ...pricing,
                          STR: Number(e.target.value),
                        })
                      }
                      className="w-full bg-navy-900 border border-navy-700 text-white rounded-lg p-2 text-sm font-bold focus:border-gold-500"
                    />
                    <span className="text-slate-400 text-xs font-bold">€</span>
                  </div>
                </div>

                <div className="bg-navy-950 border border-navy-800 p-4 rounded-xl space-y-1">
                  <label className="text-xs text-slate-300 font-semibold block">
                    {isEn ? "Custom Route Per-KM Rate" : "Individuelle Fahrt pro KM"}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      value={pricing.perKmRate}
                      onChange={(e) =>
                        setPricing({
                          ...pricing,
                          perKmRate: Number(e.target.value),
                        })
                      }
                      className="w-full bg-navy-900 border border-navy-700 text-white rounded-lg p-2 text-sm font-bold focus:border-gold-500"
                    />
                    <span className="text-slate-400 text-xs font-bold">
                      € / km
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 gold-gradient-bg text-navy-950 font-bold px-6 py-3 rounded-xl text-xs shadow-lg hover:scale-105 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.savePricingBtn}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-gold-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-navy-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center text-navy-950 font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-white">
                    {isEn ? "Booking Details" : "Buchungsdetails"} {selectedBooking.id}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {isEn ? "Created on" : "Erstellt am"} {selectedBooking.date}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 rounded-xl bg-navy-950 text-slate-400 hover:text-white border border-navy-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Customer Box */}
              <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> {isEn ? "Passenger Info" : "Fahrgast Informationen"}
                </span>
                <div className="font-semibold text-white text-sm">
                  {selectedBooking.name}
                </div>
                <div className="text-slate-300">Tel: {selectedBooking.phone}</div>
                <div className="text-slate-300">Email: {selectedBooking.email}</div>
              </div>

              {/* Ride Overview Box */}
              <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {isEn ? "Ride Details" : "Fahrtdetails"}
                </span>
                <div className="font-bold text-white text-sm">
                  {selectedBooking.route}
                </div>
                <div className="text-slate-300 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>{selectedBooking.date} {isEn ? "at" : "um"} {selectedBooking.time} {isEn ? "" : "Uhr"}</span>
                </div>
                {selectedBooking.flightNumber && (
                  <div className="text-slate-300 flex items-center gap-2">
                    <Plane className="w-3.5 h-3.5 text-gold-400" />
                    <span>{isEn ? "Flight No:" : "Flugnummer:"} {selectedBooking.flightNumber}</span>
                  </div>
                )}
              </div>

              {/* Capacity & Extra Box */}
              <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {isEn ? "Capacity & Options" : "Kapazität & Optionen"}
                </span>
                <div className="flex items-center gap-4 text-slate-200">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {selectedBooking.passengers || 1} {isEn ? "Person(s)" : "Personen"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    {selectedBooking.luggage || 1} {isEn ? "Luggage" : "Gepäck"}
                  </span>
                </div>
                {selectedBooking.childSeats ? (
                  <div className="text-slate-300 flex items-center gap-1">
                    <Baby className="w-3.5 h-3.5 text-gold-400" />
                    <span>{isEn ? "Child seats:" : "Kindersitze:"} {selectedBooking.childSeats}</span>
                  </div>
                ) : null}
              </div>

              {/* Price & Status Box */}
              <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> {isEn ? "Fixed Price & Status" : "Festpreis & Status"}
                </span>
                <div className="text-2xl font-extrabold text-white">
                  {selectedBooking.price}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-slate-400">Status:</span>
                  <select
                    value={selectedBooking.status}
                    onChange={(e) =>
                      handleStatusChange(
                        selectedBooking.id,
                        e.target.value as BookingRecord["status"]
                      )
                    }
                    className="bg-navy-900 border border-navy-700 text-white font-bold rounded-lg px-2.5 py-1"
                  >
                    <option value="Neu">{t.statusLabels.Neu}</option>
                    <option value="Bestätigt">{t.statusLabels.Bestätigt}</option>
                    <option value="Fahrer zugewiesen">{t.statusLabels["Fahrer zugewiesen"]}</option>
                    <option value="Abgeschlossen">{t.statusLabels.Abgeschlossen}</option>
                    <option value="Storniert">{t.statusLabels.Storniert}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Special Notes Box */}
            {selectedBooking.notes && (
              <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-1 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {isEn ? "Special Notes:" : "Anmerkungen / Sonderwünsche:"}
                </span>
                <p className="text-slate-300 italic">{selectedBooking.notes}</p>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-navy-800">
              <button
                onClick={() => handleDeleteBooking(selectedBooking.id, selectedBooking.name)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/80 border border-red-800 text-red-400 hover:bg-red-900 text-xs font-bold transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.deleteBtn}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => sendWhatsAppInvoice(selectedBooking)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isEn ? "WhatsApp Invoice" : "Per WhatsApp Senden"}</span>
                </button>

                <button
                  onClick={() => generatePDFInvoice(selectedBooking)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 border border-gold-500/40 text-gold-400 hover:bg-navy-800 text-xs font-bold transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>{isEn ? "Print PDF Invoice" : "Rechnung PDF Drucken"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
