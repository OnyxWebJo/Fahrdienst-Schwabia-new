export const siteConfig = {
  name: "Fahrdienst Schwabia",
  legalName: "Fahrdienst Schwabia Augsburg",
  url: "https://fahrdienst-schwabia.de",
  logo: "https://fahrdienst-schwabia.de/logo.png",
  phone: "+49 15201487887",
  officePhone: "+49 821 24411214",
  email: "info@fahrdienst-schwabia.de",
  address: {
    street: "Riedingerstr. 26 E",
    city: "Augsburg",
    postalCode: "86153",
    country: "DE",
  },
  geo: {
    latitude: 48.3705,
    longitude: 10.8978,
  },
  priceRange: "€€",
};

export function getLocalBusinessSchema(lang: "de" | "en" = "de") {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: siteConfig.logo,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: siteConfig.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Augsburg" },
      { "@type": "City", name: "Munich" },
      { "@type": "City", name: "Memmingen" },
      { "@type": "City", name: "Nuremberg" },
      { "@type": "City", name: "Stuttgart" },
    ],
    description:
      lang === "en"
        ? "Professional private airport transfer and chauffeur service based in Augsburg, Germany. Serving Munich (MUC), Memmingen (FMM), Nuremberg (NUE), and Stuttgart (STR) airports at guaranteed fixed prices."
        : "Professioneller Flughafentransfer und Chauffeurservice ab Augsburg. Zuverlässige Fahrten zu den Flughäfen München (MUC), Memmingen (FMM), Nürnberg (NUE) und Stuttgart (STR) zu garantierten Festpreisen.",
  };
}

export function getServiceSchema(
  serviceName: string,
  serviceDescription: string,
  price: string,
  lang: "de" | "en" = "de"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone,
    },
    areaServed: {
      "@type": "City",
      name: "Augsburg",
    },
    description: serviceDescription,
    offers: {
      "@type": "Offer",
      price: price.replace(/[^0-9]/g, ""),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFAQPageSchema(lang: "de" | "en" = "de") {
  const isEn = lang === "en";
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isEn
          ? "How much does an airport transfer from Augsburg to Munich Airport cost?"
          : "Wie viel kostet ein Flughafentransfer von Augsburg zum Flughafen München?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isEn
            ? "Fahrdienst Schwabia offers guaranteed fixed prices from Augsburg to Munich Airport (MUC) starting from 90 € for 1 passenger, 100 € for 2 passengers, 110 € for 3 passengers, and 120 € for 4 passengers."
            : "Fahrdienst Schwabia bietet garantierte Festpreise von Augsburg zum Flughafen München (MUC) ab 90 € für 1 Person, 100 € für 2 Personen, 110 € für 3 Personen und 120 € für 4 Personen an.",
        },
      },
      {
        "@type": "Question",
        name: isEn
          ? "Which airports are serviced by Fahrdienst Schwabia?"
          : "Welche Flughäfen werden von Fahrdienst Schwabia angefahren?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isEn
            ? "Fahrdienst Schwabia regularly services Munich Airport (MUC), Memmingen Airport (FMM), Nuremberg Airport (NUE), and Stuttgart Airport (STR), as well as custom regional destinations at 1.50 € per km."
            : "Fahrdienst Schwabia fährt regelmäßig die Flughäfen München (MUC), Memmingen (FMM), Nürnberg (NUE) und Stuttgart (STR) sowie individuelle Ziele zum Kilometersatz von 1,50 € / km an.",
        },
      },
      {
        "@type": "Question",
        name: isEn
          ? "Is flight tracking included in the airport transfer?"
          : "Ist Flug-Tracking beim Flughafentransfer inklusive?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isEn
            ? "Yes, flight status is monitored in real time. If your flight is delayed, pickup times are automatically adjusted at no extra charge."
            : "Ja, der Flugstatus wird in Echtzeit überwacht. Bei Flugverspätungen passt sich die Abholzeit automatisch ohne Aufpreis an.",
        },
      },
    ],
  };
}
