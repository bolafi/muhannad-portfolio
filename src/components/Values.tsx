import {
  ShieldCheck,
  Flag,
  Leaf,
  Lightbulb,
  Compass,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const icons: Record<string, LucideIcon> = {
  ShieldCheck,
  Flag,
  Leaf,
  Lightbulb,
  Compass,
  HeartHandshake,
};

type Props = { dict: Dictionary["values"] };

export function Values({ dict }: Props) {
  return (
    <section id="values" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          label={dict.label}
          title={dict.title}
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {dict.items.map((item, idx) => {
            const Icon = icons[item.icon] ?? Compass;
            return (
              <Reveal key={item.title} delay={idx * 0.04}>
                <div className="group relative h-full bg-bg-elev/80 p-8 md:p-10 transition-colors hover:bg-bg-elev-2/50">
                  <Icon
                    size={22}
                    strokeWidth={1.6}
                    className="text-gold transition-transform group-hover:-translate-y-0.5"
                  />
                  <h3 className="mt-5 font-display text-xl md:text-2xl text-fg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
