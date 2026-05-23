import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Props = { dict: Dictionary["gallery"] };

export function Gallery({ dict }: Props) {
  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          label={dict.label}
          title={dict.title}
          intro={dict.note}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {dict.items.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.04}>
              <figure className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass border border-border">
                <Image
                  src={item.src}
                  alt={`${item.title} — ${item.caption}`}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-bg via-bg/70 to-transparent">
                  <figcaption>
                    <p className="text-sm font-medium text-fg">{item.title}</p>
                    <p className="mt-0.5 text-xs text-fg-muted">{item.caption}</p>
                  </figcaption>
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 ring-1 ring-inset ring-transparent group-hover:ring-gold-soft transition"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
