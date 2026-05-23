"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";

type Props = {
  dict: Dictionary["hero"];
  person: Dictionary["person"];
};

export function Hero({ dict, person }: Props) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
    >
      <div aria-hidden className="absolute inset-0 -z-10 hero-glow" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-qatari-dots opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-soft bg-bg-elev/60 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[11px] tracking-[0.22em] uppercase text-gold">
                {dict.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="mt-7 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.06] tracking-tight text-fg text-balance"
            >
              {dict.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              className="mt-6 max-w-2xl text-base md:text-lg text-fg-muted text-pretty"
            >
              {dict.subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href={dict.primaryHref}
                className="group inline-flex items-center gap-2 px-5 h-12 rounded-md text-sm font-medium text-white bg-maroon hover:bg-maroon-strong border border-gold-soft transition-colors shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)]"
              >
                {dict.primaryCta}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 flip-rtl"
                />
              </a>
              <a
                href={dict.secondaryHref}
                className="inline-flex items-center gap-2 px-5 h-12 rounded-md text-sm font-medium text-fg border border-border-strong hover:bg-fg/5 transition-colors"
              >
                {dict.secondaryCta}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs tracking-wide text-fg-subtle"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} className="text-gold" />
                {person.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-gold-soft" />
                {person.organization}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-gold-soft" />
                {dict.alignment}
              </span>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative mx-auto max-w-md"
            >
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[22px] border border-gold-faint"
              />
              <div className="relative aspect-[4/5] rounded-[18px] overflow-hidden glass-strong">
                <Image
                  src="/portrait.jpeg"
                  alt={`${person.name} — ${person.title}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 60vw, 90vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/70 to-transparent"
                />

                <CornerOrnament className="top-3 left-3" />
                <CornerOrnament className="top-3 right-3 rotate-90" />
                <CornerOrnament className="bottom-3 left-3 -rotate-90" />
                <CornerOrnament className="bottom-3 right-3 rotate-180" />
              </div>

              <div className="mt-5 glass rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.24em] uppercase text-fg-subtle">
                    {dict.statusLabel}
                  </p>
                  <p className="text-sm text-fg mt-0.5">{dict.statusValue}</p>
                </div>
                <span className="h-2 w-2 rounded-full bg-sage shadow-[0_0_0_4px_rgba(123,168,151,0.15)]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="22"
      height="22"
      viewBox="0 0 22 22"
      className={`absolute text-gold/70 ${className}`}
      fill="none"
    >
      <path
        d="M1 8 V1 H8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="1" cy="1" r="0.8" fill="currentColor" />
    </svg>
  );
}
