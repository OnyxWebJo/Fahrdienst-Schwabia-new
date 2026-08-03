import { AirportLandingPage, AirportRouteConfig } from "@/components/templates/AirportLandingPage";

const nurembergConfig: AirportRouteConfig = {
  airportCode: "NUE",
  nameDE: "Flughafen Nürnberg (NUE)",
  nameEN: "Nuremberg Airport (NUE)",
  fixedPrice: "240 €",
  distance: "ca. 150 km",
  duration: "ca. 90–110 Min.",
  routeTitleDE: "Flughafentransfer Augsburg ⇄ Flughafen Nürnberg (NUE)",
  routeTitleEN: "Airport Transfer Augsburg ⇄ Nuremberg Airport (NUE)",
  descriptionDE:
    "Erstklassiger Chauffeur- und Fahrservice von Augsburg zum Flughafen Nürnberg. Garantierter Festpreis von 240 € für die gesamte Fahrt (beide Richtungen).",
  descriptionEN:
    "First-class private transfer from Augsburg to Nuremberg Airport (NUE). Guaranteed fixed price of €240 for the trip (both ways).",
  benefitsDE: [
    "Garantierter Festpreis: 240 € (beide Richtungen)",
    "Komfortable Fahrzeuge für entspannte Langstreckenfahrten",
    "Kostenloses WLAN & Erfrischungen an Bord",
    "24/7 Abholzeiten flexibel wählbar",
  ],
  benefitsEN: [
    "Guaranteed fixed price: 240 € (both ways)",
    "Comfortable premium vehicles for long distance rides",
    "Free Wi-Fi & refreshments on board",
    "Flexible 24/7 pickup times",
  ],
  priceTiers: [{ label: "Festpreis / Fixed Price (Trip)", price: "240 €" }],
  faqsDE: [
    {
      q: "Wie viel kostet der Transfer von Augsburg nach Nürnberg Flughafen?",
      a: "Der Preis beträgt garantiert 240 € Festpreis ohne versteckte Aufschläge.",
    },
  ],
  faqsEN: [
    {
      q: "How much is the transfer to Nuremberg Airport?",
      a: "The fare is guaranteed €240 fixed price for the trip.",
    },
  ],
};

export const metadata = {
  title: "Flughafentransfer Augsburg ⇄ Flughafen Nürnberg (NUE) | 240 € Festpreis",
  description:
    "Komfortabler Transfer von Augsburg zum Flughafen Nürnberg (NUE). Garantierter 240 € Festpreis.",
};

export default function GermanNurembergAirportPage() {
  return <AirportLandingPage lang="de" config={nurembergConfig} />;
}
