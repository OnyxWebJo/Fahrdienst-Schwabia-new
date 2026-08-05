import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { BookingContent } from "@/components/booking/BookingContent";
import { Locale } from "@/lib/i18n";

export default function BookingPage() {
  const lang: Locale = "de";

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col justify-between">
      <Header lang={lang} />
      <main className="flex-1 pb-24 lg:pb-0">
        <Suspense fallback={<div className="text-center py-20 text-slate-400 text-xs">Loading booking form...</div>}>
          <BookingContent lang={lang} />
        </Suspense>
      </main>
      <Footer lang={lang} />
      <MobileBottomBar lang={lang} />
      <CookieBanner lang={lang} />
    </div>
  );
}
