import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import DiagCanary from "@/components/DiagCanary"; // DIAG_REMOVE_ME

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

const DIAG_SCRIPT = `
(function () {
  try {
    if (window.location.search.indexOf('debug=1') === -1) return;
    var buffered = [];
    var box = null;
    function fmt(msg) {
      var t = new Date().toISOString().split('T')[1].split('Z')[0];
      return '[' + t + '] ' + msg;
    }
    function log(msg) {
      var line = fmt(msg);
      buffered.push(line);
      if (box) {
        box.textContent += line + '\\n';
        box.scrollTop = box.scrollHeight;
      }
    }
    window.__diagLog = log;
    log('DIAG SCRIPT LOADED (pre-hydration).');
    window.addEventListener('error', function (e) {
      log('JS ERROR: ' + e.message + ' @ ' + e.filename + ':' + e.lineno);
    });
    window.addEventListener('unhandledrejection', function (e) {
      log('PROMISE REJECTION: ' + (e.reason && e.reason.message ? e.reason.message : e.reason));
    });
    document.addEventListener('touchend', function (e) {
      var t = e.target;
      var desc = t.tagName + (t.id ? '#' + t.id : '') + (t.className ? '.' + String(t.className).split(' ').slice(0,2).join('.') : '');
      log('touchend on: ' + desc);
    }, true);
    document.addEventListener('click', function (e) {
      var t = e.target;
      var desc = t.tagName + (t.id ? '#' + t.id : '') + (t.className ? '.' + String(t.className).split(' ').slice(0,2).join('.') : '');
      log('click on: ' + desc + (e.defaultPrevented ? ' (default prevented)' : ''));
    }, true);
    function createBoxAndFlush() {
      box = document.createElement('div');
      box.id = '__diag_box';
      box.style.cssText = 'position:fixed;top:0;left:0;right:0;max-height:45vh;overflow:auto;background:rgba(0,0,0,.92);color:#0f0;font:11px/1.4 monospace;padding:8px;z-index:2147483647;white-space:pre-wrap;';
      document.body.appendChild(box);
      box.textContent = buffered.join('\\n') + '\\n';
      log(window.__reactHydrated ? 'CONFIRMED: React hydrated.' : 'WARNING: React did NOT signal hydration yet.');
    }
    window.addEventListener('load', function () {
      setTimeout(createBoxAndFlush, 800);
    });
    setTimeout(function () {
      if (!box) createBoxAndFlush();
    }, 6000);
  } catch (err) {
    console.error('diag init failed', err);
  }
})();
`;

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
        {/* Native Mobile & Tablet Interactions Handler */}
        <Script src="/interactive.js" strategy="afterInteractive" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white"
      >
        {/* TEMPORARY DIAGNOSTIC: visit any page with ?debug=1 on your phone to see a
            live on-screen log of JS errors, hydration status, and tap events.
            Safe to remove once the mobile issue is found — search "DIAG_REMOVE_ME".
            Placed as the first child of <body>, runs synchronously, independent of
            React/hydration, and only creates a visible element well after load
            to avoid disturbing hydration itself. */}
        <script
          id="diag-remove-me"
          dangerouslySetInnerHTML={{ __html: DIAG_SCRIPT }}
        />
        {children}
        <DiagCanary /> {/* DIAG_REMOVE_ME */}
      </body>
    </html>
  );
}
