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
];

export function getStoredBookings(): BookingRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load stored bookings", e);
  }
  return [];
}

export async function syncServerBookings(): Promise<BookingRecord[]> {
  if (typeof window === "undefined") return getStoredBookings();
  try {
    const res = await fetch("/api/bookings.php", { cache: "no-store" });
    if (res.ok) {
      const serverData = await res.json();
      if (Array.isArray(serverData)) {
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(serverData));
        window.dispatchEvent(new CustomEvent("bookings-updated", { detail: serverData }));
        return serverData;
      }
    }
  } catch {
    // Fallback quietly to localStorage
  }
  return getStoredBookings();
}

export function saveBooking(newBooking: BookingRecord): BookingRecord[] {
  const current = getStoredBookings();
  const updated = [newBooking, ...current.filter((b) => b.id !== newBooking.id)];
  
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("bookings-updated", { detail: updated }));
    } catch (e) {
      console.error("Failed to save booking to localStorage", e);
    }

    // Persist to server backend
    fetch("/api/bookings.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data)) {
          localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(data));
          window.dispatchEvent(new CustomEvent("bookings-updated", { detail: data }));
        }
      })
      .catch((err) => {
        console.warn("Server sync error", err);
      });
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

    fetch("/api/bookings.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update_status", id, status: newStatus }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data)) {
          localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(data));
          window.dispatchEvent(new CustomEvent("bookings-updated", { detail: data }));
        }
      })
      .catch(() => {});
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

    fetch("/api/bookings.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data)) {
          localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(data));
          window.dispatchEvent(new CustomEvent("bookings-updated", { detail: data }));
        }
      })
      .catch(() => {});
  }
  return updated;
}
