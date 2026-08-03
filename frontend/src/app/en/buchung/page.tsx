"use client";

import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { BookingContent } from "@/app/buchung/page";

export default function EnglishBookingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <Header lang="en" />
      <main className="flex-1">
        <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading booking form...</div>}>
          <BookingContent lang="en" />
        </Suspense>
      </main>
      <Footer lang="en" />
      <MobileBottomBar lang="en" />
      <CookieBanner lang="en" />
    </div>
  );
}
