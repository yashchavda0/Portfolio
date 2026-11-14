"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeKey = "charcoal-coral" | "obsidian-violet" | "noir-cyan" | "midnight-indigo";

interface ThemeContextValue {
  theme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "noir-cyan",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const themes: Record<ThemeKey, { name: string; primary: string; secondary: string; bg: string }> = {
  "charcoal-coral": {
    name: "Charcoal + Coral + Sage",
    primary: "#f472b6",
    secondary: "#34d399",
    bg: "#111111",
  },
  "obsidian-violet": {
    name: "Obsidian + Violet + Amber",
    primary: "#8b5cf6",
    secondary: "#f59e0b",
    bg: "#0a0a0b",
  },
  "noir-cyan": {
    name: "Noir + Cyan + Gold",
    primary: "#06b6d4",
    secondary: "#eab308",
    bg: "#09090b",
  },
  "midnight-indigo": {
    name: "Midnight + Indigo + Peach",
    primary: "#6366f1",
    secondary: "#fb923c",
    bg: "#030712",
  },
};

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>("noir-cyan");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme") as ThemeKey | null;
    if (stored && themes[stored]) {
      setThemeState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = themes[theme];
    const root = document.documentElement;
    root.style.setProperty("--color-primary", t.primary);
    root.style.setProperty("--color-secondary", t.secondary);
    root.style.setProperty("--color-bg", t.bg);
    root.style.setProperty("--color-primary-rgb", hexToRgb(t.primary));
    root.style.setProperty("--color-secondary-rgb", hexToRgb(t.secondary));
    root.style.setProperty("--color-bg-rgb", hexToRgb(t.bg));
    localStorage.setItem("portfolio-theme", theme);
  }, [theme, mounted]);

  const setTheme = (t: ThemeKey) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
