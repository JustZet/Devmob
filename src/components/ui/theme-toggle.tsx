"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let saved: Theme = "light";
    try {
      const v = localStorage.getItem("theme");
      if (v === "dark" || v === "light") saved = v;
    } catch {
      // ignore
    }
    document.documentElement.classList.toggle("dark", saved === "dark");
    setTheme(saved);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
          : "Toggle theme"
      }
      suppressHydrationWarning
      className="fixed top-4 right-4 z-[60] w-10 h-10 rounded-full bg-card/90 border border-border-strong/60 backdrop-blur-md flex items-center justify-center text-foreground shadow-[0_8px_24px_-8px_hsl(var(--foreground)/0.2)] hover:shadow-[0_12px_28px_-8px_hsl(var(--foreground)/0.25)] hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
    >
      {!mounted ? (
        <span className="w-4 h-4" aria-hidden="true" />
      ) : theme === "dark" ? (
        <Sun className="w-4 h-4" strokeWidth={2.2} />
      ) : (
        <Moon className="w-4 h-4" strokeWidth={2.2} />
      )}
    </button>
  );
}
