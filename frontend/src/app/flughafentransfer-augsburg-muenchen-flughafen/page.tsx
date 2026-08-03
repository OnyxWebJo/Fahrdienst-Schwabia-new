import { AirportLandingPage, AirportRouteConfig } from "@/components/templates/AirportLandingPage";

const munichConfig: AirportRouteConfig = {
  airportCode: "MUC",
  nameDE: "Flughafen München (MUC)",
  nameEN: "Munich Airport (MUC)",
  fixedPrice: "ab 90 €",
  distance: "ca. 85 km",
  duration: "ca. 60–70 Min.",
  routeTitleDE: "Flughafentransfer Augsburg ⇄ Flughafen München (MUC)",
  routeTitleEN: "Airport Transfer Augsburg ⇄ Munich Airport (MUC)",
  descriptionDE:
    "Komfortabler, pünktlicher und direkter Transfer von Augsburg zum Flughafen München (Franz Josef Strauß). Transparent gestaffelte Festpreise je nach Personenanzahl.",
  descriptionEN:
    "Comfortable, punctual, and direct private transfer from Augsburg to Munich Airport (MUC). Tiered fixed pricing based on passenger count.",
  benefitsDE: [
    "1 Person: 90 € | 2 Personen: 100 € | 3 Personen: 110 € | 4 Personen: 120 €",
    "Direkte Abholung an Ihrer Haustür in Augsburg & Umgebung",
    "Live-Flugnummernnachverfolgung für stressfreie Rückfahrten",
    "Kostenloser Gepäckservice & Kindersitze auf Wunsch",
    "Bequeme Bar- oder Kartenzahlung direkt beim Fahrer",
  ],
  benefitsEN: [
    "1 Passenger: 90 € | 2 Passengers: 100 € | 3 Passengers: 110 € | 4 Passengers: 120 €",
    "Direct pickup at your doorstep in Augsburg & area",
    "Live flight tracking for stress-free return pickups",
    "Free luggage assistance & child seats on request",
    "Convenient card or cash payment with your driver",
  ],
  priceTiers: [
    { label: "1 Person", price: "90 €" },
    { label: "2 Personen / Passengers", price: "100 €" },
    { label: "3 Personen / Passengers", price: "110 €" },
    { label: "4 Personen / Passengers", price: "120 €" },
  ],
  faqsDE: [
    {
      q: "Wie viel kostet der Transfer von Augsburg zum Flughafen München?",
      a: "Die Preise sind gestaffelt: 1 Person 90 €, 2 Personen 100 €, 3 Personen 110 €, 4 Personen 120 €. Alle Preise sind Festpreise ohne versteckte Zusatzkosten.",
    },
    {
      q: "Wie lange dauert die Fahrt von Augsburg zum Flughafen München?",
      a: "Die Fahrzeit beträgt je nach Verkehrslage ca. 60 bis 70 Minuten über die Autobahn A8 / A99.",
    },
  ],
  faqsEN: [
    {
      q: "How much is the transfer from Augsburg to Munich Airport?",
      a: "Prices are tiered by passenger count: 1 Person €90, 2 Persons €100, 3 Persons €110, 4 Persons €120. All fares are fixed prices with no hidden fees.",
    },
  ],
};

export const metadata = {
  title: "Flughafentransfer Augsburg ⇄ Flughafen München (MUC) | Ab 90 € Festpreis",
  description:
    "Zuverlässiger Flughafentransfer von Augsburg zum Flughafen München (MUC). 1 Person 90 €, 2 Pers 100 €, 3 Pers 110 €, 4 Pers 120 €. 24/7 pünktlich & komfortabel.",
};

export default function GermanMunichAirportPage() {
  return <AirportLandingPage lang="de" config={munichConfig} />;
}
