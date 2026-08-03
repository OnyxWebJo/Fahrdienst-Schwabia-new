export interface RoutePricing {
  p1: number;
  p2: number;
  p3: number;
  p4: number;
}

export interface SystemPricing {
  MUC: RoutePricing;
  FMM: RoutePricing;
  NUE: number;
  STR: number;
  perKmRate: number;
}

// Initial Default Pricing per User Request
export const defaultPricing: SystemPricing = {
  MUC: {
    p1: 90,
    p2: 100,
    p3: 110,
    p4: 120,
  },
  FMM: {
    p1: 100,
    p2: 120,
    p3: 130,
    p4: 140,
  },
  NUE: 240,
  STR: 200,
  perKmRate: 1.5,
};

const PRICING_STORAGE_KEY = "schwabia_pricing_rates_v1";

export function getStoredPricing(): SystemPricing {
  if (typeof window === "undefined") return defaultPricing;
  try {
    const saved = localStorage.getItem(PRICING_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load stored pricing", e);
  }
  return defaultPricing;
}

export function saveStoredPricing(newPricing: SystemPricing) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(newPricing));
    window.dispatchEvent(new CustomEvent("pricing-updated", { detail: newPricing }));
  } catch (e) {
    console.error("Failed to save pricing", e);
  }
}

export function calculateTripPrice(
  destinationCode: string,
  passengersCount: number,
  tripType: "oneWay" | "roundTrip" = "oneWay",
  customDistanceKm?: number,
  currentPricing: SystemPricing = defaultPricing
): number {
  let basePrice = 100;
  const pCount = Math.min(Math.max(passengersCount, 1), 4);

  if (destinationCode === "MUC") {
    if (pCount === 1) basePrice = currentPricing.MUC.p1;
    else if (pCount === 2) basePrice = currentPricing.MUC.p2;
    else if (pCount === 3) basePrice = currentPricing.MUC.p3;
    else basePrice = currentPricing.MUC.p4;
  } else if (destinationCode === "FMM") {
    if (pCount === 1) basePrice = currentPricing.FMM.p1;
    else if (pCount === 2) basePrice = currentPricing.FMM.p2;
    else if (pCount === 3) basePrice = currentPricing.FMM.p3;
    else basePrice = currentPricing.FMM.p4;
  } else if (destinationCode === "NUE") {
    basePrice = currentPricing.NUE;
  } else if (destinationCode === "STR") {
    basePrice = currentPricing.STR;
  } else if (destinationCode === "CUSTOM" && customDistanceKm) {
    basePrice = Math.round(customDistanceKm * currentPricing.perKmRate);
  }

  const multiplier = tripType === "roundTrip" ? 2 : 1;
  return basePrice * multiplier;
}
