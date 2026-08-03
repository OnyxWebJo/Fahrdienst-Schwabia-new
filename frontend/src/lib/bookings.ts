export interface BookingRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  direction: "toAirport" | "fromAirport";
  tripType: "oneWay" | "roundTrip";
  route: string;
  pickupAddress: string;
  dropoffAddress: string;
  date: string;
  time: string;
  returnDate?: string;
  returnTime?: string;
  price: string;
  passengers: number;
  luggage: number;
  childSeats: number;
  flightNumber?: string;
  notes?: string;
  status: "Neu" | "Bestätigt" | "Fahrer zugewiesen" | "Abgeschlossen" | "Storniert";
  createdAt: string;
}

const BOOKINGS_STORAGE_KEY = "schwabia_customer_bookings_v2";

export const defaultBookings: BookingRecord[] = [
  {
    id: "FS-928103",
    name: "Dr. Markus Weber",
    phone: "+49 171 9283741",
    email: "m.weber@beispiel.de",
    direction: "toAirport",
    tripType: "oneWay",
    route: "Augsburg ➔ Flughafen München (MUC)",
    pickupAddress: "Maximilianstraße 12, 86150 Augsburg",
    dropoffAddress: "Flughafen München Terminal 2",
    date: "2026-08-05",
    time: "06:30",
    price: "90 €",
    passengers: 2,
    luggage: 2,
    childSeats: 0,
    flightNumber: "LH 2050",
    notes: "Abholung an der Haustür, pünktlich wegen Frühflug.",
    status: "Bestätigt",
    createdAt: new Date().toISOString(),
  },
  {
    id: "FS-401923",
    name: "Sabine Krauss",
    phone: "+49 152 8374619",
    email: "s.krauss@beispiel.de",
    direction: "fromAirport",
    tripType: "oneWay",
    route: "Flughafen Memmingen (FMM) ➔ Augsburg",
    pickupAddress: "Flughafen Memmingen Ankunftsgate",
    dropoffAddress: "Gögginger Str. 45, 86159 Augsburg",
    date: "2026-08-05",
    time: "09:15",
    price: "100 €",
    passengers: 1,
    luggage: 1,
    childSeats: 0,
    flightNumber: "FR 3218",
    notes: "Flug kommt um 09:00 Uhr an.",
    status: "Neu",
    createdAt: new Date().toISOString(),
  },
  {
    id: "FS-109283",
    name: "Alexander Becker",
    phone: "+49 176 1092837",
    email: "a.becker@beispiel.de",
    direction: "toAirport",
    tripType: "roundTrip",
    route: "Augsburg ➔ Flughafen Stuttgart (STR)",
    pickupAddress: "Haunstetter Str. 88, 86161 Augsburg",
    dropoffAddress: "Flughafen Stuttgart Abflug E",
    date: "2026-08-06",
    time: "14:00",
    returnDate: "2026-08-13",
    returnTime: "18:30",
    price: "400 €",
    passengers: 3,
    luggage: 4,
    childSeats: 1,
    flightNumber: "EW 2014",
    notes: "Sperrgepäck: 1x Skitasche.",
    status: "Fahrer zugewiesen",
    createdAt: new Date().toISOString(),
  },
  {
    id: "FS-771239",
    name: "Michael Huber",
    phone: "+49 170 3394812",
    email: "m.huber@beispiel.de",
    direction: "fromAirport",
    tripType: "oneWay",
    route: "Flughafen Nürnberg (NUE) ➔ Augsburg",
    pickupAddress: "Flughafen Nürnberg Ankunft",
    dropoffAddress: "Ulmer Str. 110, 86156 Augsburg",
    date: "2026-08-04",
    time: "11:00",
    price: "240 €",
    passengers: 4,
    luggage: 4,
    childSeats: 0,
    flightNumber: "EW 7891",
    notes: "",
    status: "Abgeschlossen",
    createdAt: new Date().toISOString(),
  },
];

export function getStoredBookings(): BookingRecord[] {
  if (typeof window === "undefined") return defaultBookings;
  try {
    const saved = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load stored bookings", e);
  }
  return defaultBookings;
}

export function saveBooking(newBooking: BookingRecord): BookingRecord[] {
  const current = getStoredBookings();
  const updated = [newBooking, ...current];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("bookings-updated", { detail: updated }));
    } catch (e) {
      console.error("Failed to save booking", e);
    }
  }
  return updated;
}

export function updateStoredBookingStatus(
  id: string,
  newStatus: BookingRecord["status"]
): BookingRecord[] {
  const current = getStoredBookings();
  const updated = current.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("bookings-updated", { detail: updated }));
    } catch (e) {
      console.error("Failed to update booking status", e);
    }
  }
  return updated;
}

export function deleteStoredBooking(id: string): BookingRecord[] {
  const current = getStoredBookings();
  const updated = current.filter((b) => b.id !== id);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("bookings-updated", { detail: updated }));
    } catch (e) {
      console.error("Failed to delete booking", e);
    }
  }
  return updated;
}
