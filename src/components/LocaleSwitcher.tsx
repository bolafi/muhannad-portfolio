"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { locales, type Locale } from "@/i18n/config";

export function LocaleSwitcher({
  currentLocale,
  label,
}: {
  currentLocale: Locale;
  label: string;
}) {
  const pathname = usePathname();

  const switchTo: Locale = currentLocale === "en" ? "ar" : "en";

  const switchedPath = (() => {
    if (!pathname) return `/${switchTo}`;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${switchTo}`;
    if ((locales as readonly string[]).includes(segments[0])) {
      segments[0] = switchTo;
    } else {
      segments.unshift(switchTo);
    }
    return "/" + segments.join("/");
  })();

  return (
    <Link
      href={switchedPath}
      aria-label={`Switch language to ${label}`}
      title={label}
      className="inline-flex items-center gap-2 h-10 px-3 rounded-md border border-border-strong text-fg-muted hover:text-fg hover:bg-fg/5 transition-colors text-xs font-medium tracking-wider uppercase"
    >
      <Languages size={14} />
      <span>{label}</span>
    </Link>
  );
}
