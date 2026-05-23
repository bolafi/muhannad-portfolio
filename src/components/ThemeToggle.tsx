"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ label }: { label: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center h-10 w-10 rounded-md border border-border-strong text-fg-muted hover:text-fg hover:bg-fg/5 transition-colors"
    >
      <Sun
        size={16}
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-0 -rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <Moon
        size={16}
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
        }`}
      />
    </button>
  );
}
