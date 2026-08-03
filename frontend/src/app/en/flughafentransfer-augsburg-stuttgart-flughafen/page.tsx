import { AirportLandingPage, AirportRouteConfig } from "@/components/templates/AirportLandingPage";

const stuttgartConfig: AirportRouteConfig = {
  airportCode: "STR",
  nameDE: "Flughafen Stuttgart (STR)",
  nameEN: "Stuttgart Airport (STR)",
  fixedPrice: "200 €",
  distance: "approx. 160 km",
  duration: "approx. 100–120 min.",
  routeTitleDE: "Flughafentransfer Augsburg ⇄ Flughafen Stuttgart",
  routeTitleEN: "Airport Transfer Augsburg ⇄ Stuttgart Airport (STR)",
  descriptionDE: "Fahrservice von Augsburg zum Flughafen Stuttgart.",
  descriptionEN:
    "Reliable chauffeur transfer from Augsburg to Stuttgart Airport (STR). Arrive relaxed with guaranteed €200 fixed rate (both ways).",
  benefitsDE: [],
  benefitsEN: [
    "Guaranteed fixed price: 200 € (both ways)",
    "First class sedans & business vans",
    "Punctuality guarantee & professional drivers",
    "Transparent fixed price including all tolls & taxes",
  ],
  priceTiers: [{ label: "Fixed Price (Trip)", price: "200 €" }],
  faqsDE: [],
  faqsEN: [
    {
      q: "How long is the transfer from Augsburg to Stuttgart Airport?",
      a: "Average travel time is approx. 100 to 120 minutes via A8 highway.",
    },
  ],
};

export const metadata = {
  title: "Airport Transfer Augsburg ⇄ Stuttgart Airport (STR) | Fixed Price €200",
  description:
    "Professional airport transfer from Augsburg to Stuttgart Airport (STR). Guaranteed €200 fixed price.",
};

export default function EnglishStuttgartAirportPage() {
  return <AirportLandingPage lang="en" config={stuttgartConfig} />;
}
