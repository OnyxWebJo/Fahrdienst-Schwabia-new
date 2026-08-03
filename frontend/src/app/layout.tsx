import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// ✅ PROPER Next.js App Router viewport — generates a single <meta viewport> in static HTML
// Do NOT also add <meta name="viewport"> manually in <head> — that causes duplicate tags
// and React hydration failures (no event handlers attached on real mobile devices).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Flughafentransfer Augsburg | Fahrdienst Schwabia",
  description:
    "Ihr zuverlässiger Flughafentransfer ab Augsburg nach München, Memmingen, Nürnberg & Stuttgart. Festpreise, 24/7 Service & bequeme Online-Buchung.",
  keywords: [
    "Flughafentransfer Augsburg",
    "Fahrdienst Augsburg",
    "Flughafentransfer München",
    "Airport Transfer Augsburg",
    "Chauffeurservice Augsburg",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YH0GQWZKYX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YH0GQWZKYX', { page_path: window.location.pathname });
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
