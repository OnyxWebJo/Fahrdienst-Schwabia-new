import { AirportLandingPage, AirportRouteConfig } from "@/components/templates/AirportLandingPage";

const nurembergConfig: AirportRouteConfig = {
  airportCode: "NUE",
  nameDE: "Flughafen Nürnberg (NUE)",
  nameEN: "Nuremberg Airport (NUE)",
  fixedPrice: "240 €",
  distance: "approx. 150 km",
  duration: "approx. 90–110 min.",
  routeTitleDE: "Flughafentransfer Augsburg ⇄ Flughafen Nürnberg",
  routeTitleEN: "Airport Transfer Augsburg ⇄ Nuremberg Airport (NUE)",
  descriptionDE: "Chauffeurservice von Augsburg nach Nürnberg.",
  descriptionEN:
    "First-class private chauffeur service from Augsburg to Nuremberg Airport (NUE). Guaranteed fixed price of €240 for the trip (both ways).",
  benefitsDE: [],
  benefitsEN: [
    "Guaranteed fixed price: 240 € (both ways)",
    "Premium comfortable vehicles for long distance rides",
    "Complimentary Wi-Fi & refreshments on board",
    "Flexible 24/7 pickup times",
  ],
  priceTiers: [{ label: "Fixed Price (Trip)", price: "240 €" }],
  faqsDE: [],
  faqsEN: [
    {
      q: "How long does the ride to Nuremberg Airport take?",
      a: "The journey takes about 90 to 110 minutes via B2 / A9 highway.",
    },
  ],
};

export const metadata = {
  title: "Airport Transfer Augsburg ⇄ Nuremberg Airport (NUE) | Fixed Price €240",
  description:
    "Comfortable transfer from Augsburg to Nuremberg Airport (NUE). Guaranteed €240 fixed price.",
};

export default function EnglishNurembergAirportPage() {
  return <AirportLandingPage lang="en" config={nurembergConfig} />;
}
