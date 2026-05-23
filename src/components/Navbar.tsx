"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Locale } from "@/i18n/config";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";

type Props = {
  dict: Dictionary["nav"];
  person: Dictionary["person"];
  locale: Locale;
};

export function Navbar({ dict, person, locale }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-bg/70 border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between gap-3"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 group min-w-0"
          aria-label="Back to top"
        >
          <span className="relative inline-flex items-center justify-center h-9 w-9 rounded-md border border-gold-soft bg-bg-elev/60">
            <span className="font-display text-gold text-sm">
              {person.initials}
            </span>
            <span className="absolute -inset-px rounded-md ring-1 ring-gold-faint group-hover:ring-gold-soft transition" />
          </span>
          <span className="hidden sm:flex flex-col leading-tight min-w-0">
            <span className="text-sm font-medium text-fg truncate">
              {person.shortName}
            </span>
            <span className="text-[11px] tracking-[0.18em] uppercase text-fg-subtle truncate">
              {person.title}
            </span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {dict.items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="px-3.5 py-2 text-sm text-fg-muted hover:text-fg transition-colors rounded-md hover:bg-fg/5"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle label={dict.toggleTheme} />
          <LocaleSwitcher
            currentLocale={locale}
            label={dict.switchLanguage}
          />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 h-10 rounded-md text-sm font-medium text-white border border-gold-soft bg-maroon hover:bg-maroon-strong transition-colors"
          >
            {dict.cta}
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle label={dict.toggleTheme} />
          <LocaleSwitcher
            currentLocale={locale}
            label={dict.switchLanguage}
          />
          <button
            type="button"
            aria-label={open ? dict.closeMenu : dict.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-border-strong text-fg-muted hover:text-fg hover:bg-fg/5 transition"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 border-t border-border bg-bg/95 backdrop-blur-md">
          <ul className="flex flex-col gap-1">
            {dict.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 text-base text-fg-muted hover:text-fg rounded-md hover:bg-fg/5"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center w-full px-4 h-11 rounded-md text-sm font-medium text-white border border-gold-soft bg-maroon"
              >
                {dict.cta}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
