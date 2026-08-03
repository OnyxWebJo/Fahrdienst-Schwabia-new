import { ShieldCheck, UserCheck, Clock, Car } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";

interface WhyChooseUsSectionProps {
  lang?: Locale;
}

export function WhyChooseUsSection({ lang = "de" }: WhyChooseUsSectionProps) {
  const dict = getDictionary(lang);

  const features = [
    {
      icon: ShieldCheck,
      title: dict.whyUs.feature1Title,
      desc: dict.whyUs.feature1Desc,
    },
    {
      icon: UserCheck,
      title: dict.whyUs.feature2Title,
      desc: dict.whyUs.feature2Desc,
    },
    {
      icon: Clock,
      title: dict.whyUs.feature3Title,
      desc: dict.whyUs.feature3Desc,
    },
    {
      icon: Car,
      title: dict.whyUs.feature4Title,
      desc: dict.whyUs.feature4Desc,
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-navy-950 text-white relative border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-navy-900 px-3 py-1 rounded-full border border-gold-500/30">
            Fahrdienst Schwabia Vorteil
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            {dict.whyUs.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {dict.whyUs.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, index) => {
            const Icon = f.icon;
            return (
              <div
                key={index}
                className="bg-navy-900/80 border border-navy-800 p-6 rounded-3xl hover:border-gold-500/40 transition-all space-y-4 shadow-lg group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center text-navy-950 shadow-md group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white group-hover:text-gold-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
