import {
  MessageSquare,
  Users,
  Leaf,
  Compass,
  Droplets,
  Flag,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const icons: Record<string, LucideIcon> = {
  MessageSquare,
  Users,
  Leaf,
  Compass,
  Droplets,
  Flag,
};

type Props = { dict: Dictionary["leadership"] };

export function Leadership({ dict }: Props) {
  return (
    <section id="leadership" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--accent-maroon-soft),transparent_60%)]"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          label={dict.label}
          title={dict.title}
          intro={dict.intro}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dict.cards.map((card, idx) => {
            const Icon = icons[card.icon] ?? Compass;
            return (
              <Reveal key={card.title} delay={idx * 0.05}>
                <article className="group relative h-full glass rounded-2xl p-7 transition-all hover:border-gold-soft hover:bg-fg/[0.04]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center justify-center h-11 w-11 rounded-lg bg-maroon-soft border border-maroon-soft text-gold">
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <span className="text-[10px] tracking-[0.26em] uppercase text-fg-faint">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl md:text-2xl text-fg tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {card.description}
                  </p>
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-soft to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
