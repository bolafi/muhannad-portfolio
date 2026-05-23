import { Sparkles } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Props = { dict: Dictionary["mission"] };

export function Mission({ dict }: Props) {
  return (
    <section id="mission" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading label={dict.label} title={dict.title} />
            <div className="space-y-5 text-[17px] leading-[1.85] text-fg-muted text-pretty max-w-xl">
              {dict.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative glass-strong rounded-2xl p-8 md:p-10 overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-maroon-soft blur-3xl"
                />
                <div
                  aria-hidden
                  className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-gold-faint blur-3xl"
                />

                <div className="relative flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-gold-soft bg-bg-elev/70">
                    <Sparkles size={16} className="text-gold" />
                  </span>
                  <span className="text-[11px] tracking-[0.26em] uppercase text-gold">
                    {dict.badge}
                  </span>
                </div>

                <p className="relative mt-6 font-display text-2xl md:text-3xl text-fg leading-snug text-balance">
                  {dict.statement}
                </p>

                <div className="relative mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {dict.pillars.map((p, i) => (
                    <Reveal key={p.title} delay={0.15 + i * 0.05}>
                      <div className="rounded-xl border border-border bg-bg-elev/60 p-5 h-full">
                        <p className="text-[10px] tracking-[0.26em] uppercase text-gold">
                          {p.title}
                        </p>
                        <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                          {p.text}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
