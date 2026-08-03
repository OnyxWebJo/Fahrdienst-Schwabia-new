import { AirportLandingPage, AirportRouteConfig } from "@/components/templates/AirportLandingPage";

const memmingenConfig: AirportRouteConfig = {
  airportCode: "FMM",
  nameDE: "Flughafen Memmingen (FMM)",
  nameEN: "Memmingen Airport (FMM)",
  fixedPrice: "from 100 €",
  distance: "approx. 90 km",
  duration: "approx. 55–65 min.",
  routeTitleDE: "Flughafentransfer Augsburg ⇄ Flughafen Memmingen",
  routeTitleEN: "Airport Transfer Augsburg ⇄ Memmingen Airport (FMM)",
  descriptionDE: "Schnell und bequem von Augsburg zum Allgäu Airport Memmingen.",
  descriptionEN:
    "Fast and comfortable transfer from Augsburg to Allgäu Airport Memmingen (both ways).",
  benefitsDE: [],
  benefitsEN: [
    "1 Passenger: €100 | 2 Passengers: €120 | 3 Passengers: €130 | 4 Passengers: €140",
    "Direct connection via B17 / A96 highway",
    "Guaranteed punctuality for early morning flights",
    "Spacious vans available for extra luggage",
  ],
  priceTiers: [
    { label: "1 Passenger", price: "100 €" },
    { label: "2 Passengers", price: "120 €" },
    { label: "3 Passengers", price: "130 €" },
    { label: "4 Passengers", price: "140 €" },
  ],
  faqsDE: [],
  faqsEN: [
    {
      q: "How much is the transfer from Augsburg to Memmingen Airport?",
      a: "Rates: 1 Passenger €100, 2 Passengers €120, 3 Passengers €130, 4 Passengers €140.",
    },
  ],
};

export const metadata = {
  title: "Airport Transfer Augsburg ⇄ Memmingen Airport (FMM) | Fixed Price from €100",
  description:
    "Comfortable transfer from Augsburg to Allgäu Airport Memmingen (FMM). 1 Person €100, 2 Persons €120, 3 Persons €130, 4 Persons €140.",
};

export default function EnglishMemmingenAirportPage() {
  return <AirportLandingPage lang="en" config={memmingenConfig} />;
}
