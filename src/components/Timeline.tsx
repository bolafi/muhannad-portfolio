import type { Dictionary } from "@/i18n/dictionaries/en";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Props = { dict: Dictionary["timeline"] };

export function Timeline({ dict }: Props) {
  return (
    <section id="journey" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,var(--accent-gold-faint),transparent_60%)]"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading label={dict.label} title={dict.title} />

        <div className="relative mt-4">
          <div
            aria-hidden
            className="absolute start-3 md:start-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-gold-soft to-transparent md:-translate-x-1/2"
          />

          <ol className="space-y-10 md:space-y-14">
            {dict.items.map((item, idx) => {
              const isEnd = idx % 2 === 1;
              return (
                <li key={item.title} className="relative">
                  <div className="md:grid md:grid-cols-2 md:gap-12 items-start">
                    {isEnd ? <div className="hidden md:block" /> : null}

                    <Reveal delay={idx * 0.05}>
                      <div
                        className={`relative ps-10 md:ps-0 ${
                          isEnd ? "md:ps-12" : "md:pe-12 md:text-end"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute top-1 start-0 md:start-auto md:top-2 h-6 w-6 rounded-full bg-bg-elev border border-gold-soft flex items-center justify-center ${
                            isEnd ? "md:-start-3" : "md:-end-3"
                          }`}
                        >
                          <span className="h-2 w-2 rounded-full bg-gold" />
                        </span>

                        <p className="text-[10px] tracking-[0.26em] uppercase text-gold">
                          {item.year}
                        </p>
                        <h3 className="mt-2 font-display text-2xl md:text-3xl text-fg tracking-tight">
                          {item.title}
                        </h3>
                        <p
                          className={`mt-3 text-[15px] leading-relaxed text-fg-muted max-w-md ${
                            !isEnd ? "md:ms-auto" : ""
                          }`}
                        >
                          {item.text}
                        </p>
                      </div>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
