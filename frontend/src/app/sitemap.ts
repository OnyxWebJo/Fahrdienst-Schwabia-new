import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fahrdienst-schwabia.de";

  const routes = [
    "",
    "/en",
    "/flughafentransfer-augsburg-muenchen-flughafen",
    "/flughafentransfer-augsburg-memmingen-flughafen",
    "/flughafentransfer-augsburg-nuernberg-flughafen",
    "/flughafentransfer-augsburg-stuttgart-flughafen",
    "/en/flughafentransfer-augsburg-muenchen-flughafen",
    "/en/flughafentransfer-augsburg-memmingen-flughafen",
    "/en/flughafentransfer-augsburg-nuernberg-flughafen",
    "/en/flughafentransfer-augsburg-stuttgart-flughafen",
    "/buchung",
    "/en/buchung",
    "/impressum",
    "/en/imprint",
    "/datenschutz",
    "/en/privacy-policy",
    "/agb",
    "/en/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly",
    priority: route === "" || route === "/en" ? 1.0 : 0.8,
  }));
}
