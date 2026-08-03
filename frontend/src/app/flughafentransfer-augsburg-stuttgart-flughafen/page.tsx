import { AirportLandingPage, AirportRouteConfig } from "@/components/templates/AirportLandingPage";

const stuttgartConfig: AirportRouteConfig = {
  airportCode: "STR",
  nameDE: "Flughafen Stuttgart (STR)",
  nameEN: "Stuttgart Airport (STR)",
  fixedPrice: "200 €",
  distance: "ca. 160 km",
  duration: "ca. 100–120 Min.",
  routeTitleDE: "Flughafentransfer Augsburg ⇄ Flughafen Stuttgart (STR)",
  routeTitleEN: "Airport Transfer Augsburg ⇄ Stuttgart Airport (STR)",
  descriptionDE:
    "Zuverlässiger Chauffeur-Transfer von Augsburg zum Flughafen Stuttgart. Garantierter Festpreis von 200 € für die gesamte Fahrt (beide Richtungen).",
  descriptionEN:
    "Reliable chauffeur transfer from Augsburg to Stuttgart Airport (STR). Arrive relaxed with guaranteed €200 fixed price (both ways).",
  benefitsDE: [
    "Garantierter Festpreis: 200 € (beide Richtungen)",
    "Erstklassige Limousinen & Großraum-Vans",
    "Pünktlichkeitsgarantie & professionelle Chauffeure",
    "Transparent inkl. aller Gebühren & Steuern",
  ],
  benefitsEN: [
    "Guaranteed fixed price: 200 € (both ways)",
    "First class sedans & business vans",
    "Punctuality guarantee & professional drivers",
    "Transparent fixed price including all tolls & taxes",
  ],
  priceTiers: [{ label: "Festpreis / Fixed Price (Trip)", price: "200 €" }],
  faqsDE: [
    {
      q: "Wie viel kostet der Transfer von Augsburg zum Flughafen Stuttgart?",
      a: "Der Festpreis beträgt garantiert 200 € für die gesamte Strecke.",
    },
  ],
  faqsEN: [
    {
      q: "How much is the transfer to Stuttgart Airport?",
      a: "The guaranteed fixed price is €200 for the trip.",
    },
  ],
};

export const metadata = {
  title: "Flughafentransfer Augsburg ⇄ Flughafen Stuttgart (STR) | 200 € Festpreis",
  description:
    "Professioneller Flughafentransfer von Augsburg zum Flughafen Stuttgart (STR). Garantierter 200 € Festpreis.",
};

export default function GermanStuttgartAirportPage() {
  return <AirportLandingPage lang="de" config={stuttgartConfig} />;
}
