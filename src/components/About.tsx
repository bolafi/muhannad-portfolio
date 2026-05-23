import type { Dictionary } from "@/i18n/dictionaries/en";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Props = { dict: Dictionary["about"] };

export function About({ dict }: Props) {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading label={dict.label} title={dict.title} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="space-y-6 text-[17px] leading-[1.85] text-fg-muted text-pretty">
              {dict.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-10 hairline-gold h-px w-full" />
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-6 font-display text-xl md:text-2xl text-gold italic">
                &ldquo;{dict.quote}&rdquo;
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-2">
                <dl className="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-xl">
                  {dict.highlights.map((h) => (
                    <div key={h.label} className="p-5 md:p-6">
                      <dt className="text-[10px] tracking-[0.26em] uppercase text-fg-subtle">
                        {h.label}
                      </dt>
                      <dd className="mt-2 text-base md:text-lg font-medium text-fg">
                        {h.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 glass rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-sage" />
                  <span className="text-xs tracking-[0.22em] uppercase text-fg-subtle">
                    {dict.alignmentEyebrow}
                  </span>
                </div>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                  {dict.alignmentBody}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
