import { AirportLandingPage, AirportRouteConfig } from "@/components/templates/AirportLandingPage";

const munichConfig: AirportRouteConfig = {
  airportCode: "MUC",
  nameDE: "Flughafen München (MUC)",
  nameEN: "Munich Airport (MUC)",
  fixedPrice: "from 90 €",
  distance: "approx. 85 km",
  duration: "approx. 60–70 min.",
  routeTitleDE: "Flughafentransfer Augsburg ⇄ Flughafen München (MUC)",
  routeTitleEN: "Airport Transfer Augsburg ⇄ Munich Airport (MUC)",
  descriptionDE:
    "Komfortabler, pünktlicher und direkter Transfer von Augsburg zum Flughafen München (Franz Josef Strauß). Transparent gestaffelte Festpreise je nach Personenanzahl.",
  descriptionEN:
    "Comfortable, punctual, and direct private transfer from Augsburg to Munich Airport (MUC). Guaranteed tiered fixed prices.",
  benefitsDE: [],
  benefitsEN: [
    "1 Passenger: €90 | 2 Passengers: €100 | 3 Passengers: €110 | 4 Passengers: €120",
    "Direct door-to-door pickup in Augsburg area",
    "Live flight tracking for punctual return pickups",
    "Free luggage assistance & child seats on request",
    "Convenient card or cash payment directly to driver",
  ],
  priceTiers: [
    { label: "1 Passenger", price: "90 €" },
    { label: "2 Passengers", price: "100 €" },
    { label: "3 Passengers", price: "110 €" },
    { label: "4 Passengers", price: "120 €" },
  ],
  faqsDE: [],
  faqsEN: [
    {
      q: "How much is the transfer from Augsburg to Munich Airport?",
      a: "Prices are tiered: 1 Passenger €90, 2 Passengers €100, 3 Passengers €110, 4 Passengers €120. All rates are guaranteed fixed prices with no hidden charges.",
    },
    {
      q: "How long is the ride from Augsburg to Munich Airport?",
      a: "Travel time is approx. 60 to 70 minutes via A8 / A99 highway.",
    },
  ],
};

export const metadata = {
  title: "Airport Transfer Augsburg ⇄ Munich Airport (MUC) | Fixed Price from €90",
  description:
    "Reliable private transfer from Augsburg to Munich Airport (MUC). 1 Person €90, 2 Persons €100, 3 Persons €110, 4 Persons €120.",
};

export default function EnglishMunichAirportPage() {
  return <AirportLandingPage lang="en" config={munichConfig} />;
}
