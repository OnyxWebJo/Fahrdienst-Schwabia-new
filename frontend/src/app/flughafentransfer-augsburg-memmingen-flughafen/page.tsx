import { AirportLandingPage, AirportRouteConfig } from "@/components/templates/AirportLandingPage";

const memmingenConfig: AirportRouteConfig = {
  airportCode: "FMM",
  nameDE: "Flughafen Memmingen (FMM)",
  nameEN: "Memmingen Airport (FMM)",
  fixedPrice: "ab 100 €",
  distance: "ca. 90 km",
  duration: "ca. 55–65 Min.",
  routeTitleDE: "Flughafentransfer Augsburg ⇄ Flughafen Memmingen",
  routeTitleEN: "Airport Transfer Augsburg ⇄ Memmingen Airport (FMM)",
  descriptionDE: "Schnell und bequem von Augsburg zum Allgäu Airport Memmingen (beide Richtungen).",
  descriptionEN:
    "Fast and comfortable transfer from Augsburg to Allgäu Airport Memmingen (both ways).",
  benefitsDE: [
    "1 Person: 100 € | 2 Personen: 120 € | 3 Personen: 130 € | 4 Personen: 140 €",
    "Direkte Anbindung über B17 / A96",
    "Pünktlichkeit garantiert für Frühmorgens-Flüge",
    "Geräumige Minivans für viel Gepäck vorhanden",
  ],
  benefitsEN: [
    "1 Passenger: €100 | 2 Passengers: €120 | 3 Passengers: €130 | 4 Passengers: €140",
    "Direct connection via B17 / A96 highway",
    "Guaranteed punctuality for early flights",
    "Spacious vans available for extra luggage",
  ],
  priceTiers: [
    { label: "1 Person / Passenger", price: "100 €" },
    { label: "2 Personen / Passengers", price: "120 €" },
    { label: "3 Personen / Passengers", price: "130 €" },
    { label: "4 Personen / Passengers", price: "140 €" },
  ],
  faqsDE: [
    {
      q: "Wie hoch sind die Preise von Augsburg zum Flughafen Memmingen?",
      a: "Die Preise betragen: 1 Person 100 €, 2 Personen 120 €, 3 Personen 130 €, 4 Personen 140 €. Es sind Festpreise für beide Richtungen.",
    },
  ],
  faqsEN: [
    {
      q: "How much is the transfer from Augsburg to Memmingen Airport?",
      a: "The rates are: 1 Person €100, 2 Persons €120, 3 Persons €130, 4 Persons €140. Guaranteed fixed price for both ways.",
    },
  ],
};

export const metadata = {
  title: "Flughafentransfer Augsburg ⇄ Flughafen Memmingen (FMM) | Ab 100 € Festpreis",
  description:
    "Komfortabler Transfer von Augsburg zum Allgäu Airport Memmingen. 1 Pers 100 €, 2 Pers 120 €, 3 Pers 130 €, 4 Pers 140 €.",
};

export default function GermanMemmingenAirportPage() {
  return <AirportLandingPage lang="de" config={memmingenConfig} />;
}
