import { Send, CheckCircle2, Car, Smile } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";

interface HowItWorksSectionProps {
  lang?: Locale;
}

export function HowItWorksSection({ lang = "de" }: HowItWorksSectionProps) {
  const dict = getDictionary(lang);

  const steps = [
    {
      number: "01",
      icon: Send,
      title: dict.howItWorks.step1Title,
      desc: dict.howItWorks.step1Desc,
    },
    {
      number: "02",
      icon: CheckCircle2,
      title: dict.howItWorks.step2Title,
      desc: dict.howItWorks.step2Desc,
    },
    {
      number: "03",
      icon: Car,
      title: dict.howItWorks.step3Title,
      desc: dict.howItWorks.step3Desc,
    },
    {
      number: "04",
      icon: Smile,
      title: dict.howItWorks.step4Title,
      desc: dict.howItWorks.step4Desc,
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-navy-950 px-3 py-1 rounded-full border border-gold-500/30">
            Einfacher Ablauf
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            {dict.howItWorks.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {dict.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={index}
                className="bg-navy-950 border border-navy-800 p-6 rounded-3xl relative space-y-4 shadow-xl hover:border-gold-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center text-navy-950 font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-heading font-extrabold text-3xl text-slate-700">
                    {s.number}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-white">
                  {s.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
