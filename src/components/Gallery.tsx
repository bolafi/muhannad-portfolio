"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Props = { dict: Dictionary["gallery"] };

export function Gallery({ dict }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const activeItem = activeIdx !== null ? dict.items[activeIdx] : null;

  useEffect(() => {
    if (activeIdx === null) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [activeIdx]);

  function closeModal() {
    setVisible(false);
    window.setTimeout(() => setActiveIdx(null), 200);
  }

  useEffect(() => {
    if (activeIdx === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKeyDown);
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [activeIdx]);

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
              <figure
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass border border-border cursor-pointer"
                onClick={() => setActiveIdx(idx)}
              >
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

      {activeItem && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 transition-opacity duration-200 ease-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`relative w-[90vw] h-[80vh] max-w-4xl transition-all duration-200 ease-out ${
              visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-3"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeItem.src}
              alt={`${activeItem.title} — ${activeItem.caption}`}
              fill
              sizes="90vw"
              className="object-contain rounded-2xl"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-2xl">
              <p className="text-sm md:text-base font-medium text-white">
                {activeItem.title}
              </p>
              <p className="mt-0.5 text-xs md:text-sm text-white/70">
                {activeItem.caption}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={closeModal}
              className="absolute -top-10 right-0 md:top-2 md:right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
