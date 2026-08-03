"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";

interface FAQSectionProps {
  lang?: Locale;
}

export function FAQSection({ lang = "de" }: FAQSectionProps) {
  const dict = getDictionary(lang);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: dict.faq.q1, a: dict.faq.a1 },
    { q: dict.faq.q2, a: dict.faq.a2 },
    { q: dict.faq.q3, a: dict.faq.a3 },
    { q: dict.faq.q4, a: dict.faq.a4 },
    { q: dict.faq.q5, a: dict.faq.a5 },
  ];

  // FAQ Schema JSON-LD for Structured Data (Google SEO & AI Search)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section id="faq" className="py-20 bg-slate-900 text-white relative">
      {/* FAQ Schema Inject */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-navy-950 px-3 py-1 rounded-full border border-gold-500/30">
            {dict.faq.title.split(" ")[0]}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            {dict.faq.title}
          </h2>
          <p className="text-sm text-slate-300">
            {dict.faq.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-navy-950 border border-navy-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-slate-100 hover:text-gold-400 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-gold-400 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-navy-900 animate-in fade-in-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
