import { Check } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Props = { dict: Dictionary["achievements"] };

export function Achievements({ dict }: Props) {
  return (
    <section id="achievements" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          label={dict.label}
          title={dict.title}
          intro={dict.note}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {dict.items.map((item, idx) => (
            <Reveal key={item} delay={idx * 0.04}>
              <div className="group flex items-start gap-4 glass rounded-xl p-5 md:p-6 hover:border-gold-soft transition-colors">
                <span className="mt-0.5 inline-flex items-center justify-center h-8 w-8 rounded-md bg-maroon-soft border border-maroon-soft">
                  <Check size={16} strokeWidth={2} className="text-gold" />
                </span>
                <div>
                  <p className="text-[10px] tracking-[0.26em] uppercase text-fg-faint">
                    {dict.highlightLabel} · 0{idx + 1}
                  </p>
                  <p className="mt-1.5 text-base md:text-lg text-fg">{item}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
