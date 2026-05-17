"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

/* ─── Feature flags ─── */

interface ConfigFlags {
  cursorTrail: boolean;
  encryptedName: boolean;
  skillConstellation: boolean;
  heroParallax: boolean;
  easterEggTerminal: boolean;
  sparkles: boolean;
}

export type ConfigKey = keyof ConfigFlags;

const defaultFlags: ConfigFlags = {
  cursorTrail: true,
  encryptedName: true,
  skillConstellation: true,
  heroParallax: true,
  easterEggTerminal: true,
  sparkles: true,
};

/* ─── Visual config ─── */

export type SerifFont    = "georgia" | "playfair" | "lora" | "cormorant" | "dm-serif" | "instrument" | "new-york" | "sf-pro";
export type AccentScheme = "ember"   | "ocean"    | "forest" | "violet" | "rose";

export interface VisualConfig {
  serifFont:    SerifFont;
  accentScheme: AccentScheme;
}

const defaultVisual: VisualConfig = { serifFont: "georgia", accentScheme: "ember" };

export const ACCENT_SCHEMES: Record<
  AccentScheme,
  { red: string; orange: string; amber: string; name: string; preview: string; gradient: string; gradientShadow: string }
> = {
  ember:  { red: "#dc2626", orange: "#ea580c", amber: "#d97706", name: "Ember",  preview: "#dc2626", gradient: "linear-gradient(135deg, #dc2626, #ea580c)", gradientShadow: "rgba(220,38,38,0.22)"  },
  ocean:  { red: "#0284c7", orange: "#0369a1", amber: "#0891b2", name: "Ocean",  preview: "#0284c7", gradient: "linear-gradient(135deg, #0284c7, #0369a1)", gradientShadow: "rgba(2,132,199,0.22)"  },
  forest: { red: "#16a34a", orange: "#15803d", amber: "#ca8a04", name: "Forest", preview: "#16a34a", gradient: "linear-gradient(135deg, #16a34a, #15803d)", gradientShadow: "rgba(22,163,74,0.22)"  },
  violet: { red: "#7c3aed", orange: "#6d28d9", amber: "#a21caf", name: "Violet", preview: "#7c3aed", gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)", gradientShadow: "rgba(124,58,237,0.22)" },
  rose:   { red: "#e11d48", orange: "#db2777", amber: "#c2410c", name: "Rose",   preview: "#e11d48", gradient: "linear-gradient(135deg, #e11d48, #db2777)", gradientShadow: "rgba(225,29,72,0.22)"  },
};

export const SERIF_FONTS: Record<SerifFont, { family: string; name: string }> = {
  georgia:    { family: "Georgia, 'Times New Roman', serif",                                                      name: "Georgia"          },
  playfair:   { family: "'Playfair Display', Georgia, serif",                                                    name: "Playfair"         },
  lora:       { family: "'Lora', Georgia, serif",                                                               name: "Lora"             },
  cormorant:  { family: "'Cormorant Garamond', 'Cormorant', Georgia, serif",                                    name: "Cormorant"        },
  "dm-serif": { family: "'DM Serif Display', Georgia, serif",                                                   name: "DM Serif"         },
  instrument: { family: "'Instrument Serif', Georgia, serif",                                                   name: "Instrument"       },
  "new-york": { family: "'New York', 'Iowan Old Style', Georgia, serif",                                        name: "New York ・ Apple" },
  "sf-pro":   { family: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",    name: "SF Pro ・ Apple"   },
};

/* ─── CSS injection ─── */

function hexAlpha(hex: string, alpha: number): string {
  return hex + Math.round(alpha * 255).toString(16).padStart(2, "0");
}

function applyVisualConfig(visual: VisualConfig) {
  const scheme = ACCENT_SCHEMES[visual.accentScheme];
  const serif  = SERIF_FONTS[visual.serifFont];
  const root   = document.documentElement;

  root.style.setProperty("--accent-gradient",        scheme.gradient);
  root.style.setProperty("--accent-gradient-shadow", scheme.gradientShadow);
  root.style.setProperty("--serif-font-family",      serif.family);
  root.style.setProperty("--color-primary",          scheme.red);
  root.style.setProperty("--color-secondary",        scheme.orange);

  let el = document.getElementById("site-visual-override") as HTMLStyleElement | null;
  if (!el) { el = document.createElement("style"); el.id = "site-visual-override"; document.head.appendChild(el); }

  const { red: r, orange: o, amber: a } = scheme;
  el.textContent = `
    .font-serif { font-family: ${serif.family} !important; }
    .text-ember-red    { color: ${r} !important; }
    .text-ember-orange { color: ${o} !important; }
    .text-ember-amber  { color: ${a} !important; }
    .bg-ember-red      { background-color: ${r} !important; }
    .bg-ember-orange   { background-color: ${o} !important; }
    .border-ember-red  { border-color: ${r} !important; }
    .border-ember-red\\/20      { border-color: ${hexAlpha(r, 0.20)} !important; }
    .bg-ember-red\\/\\[0\\.04\\] { background-color: ${hexAlpha(r, 0.04)} !important; }
    .bg-ember-red\\/8           { background-color: ${hexAlpha(r, 0.08)} !important; }
    .bg-ember-red\\/10          { background-color: ${hexAlpha(r, 0.10)} !important; }
    .bg-ember-orange\\/8        { background-color: ${hexAlpha(o, 0.08)} !important; }
    .hover\\:text-ember-red:hover    { color: ${r} !important; }
    .hover\\:text-ember-orange:hover { color: ${o} !important; }
    .hover\\:shadow-ember-red\\/20:hover { --tw-shadow-color: ${hexAlpha(r, 0.20)} !important; }
    .ember-text {
      background: ${scheme.gradient} !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-clip: text !important;
    }
    [data-accent-btn] { background: ${scheme.gradient} !important; }
    .bg-ember-red.animate-pulse { background-color: ${r} !important; }
    ::selection     { background: ${r}; color: #faf8f5; }
    *:focus-visible { outline-color: ${r}; }
  `;
}

/* ─── Context ─── */

interface ConfigContextValue {
  flags:           ConfigFlags;
  setFlag:         (key: ConfigKey, value: boolean) => void;
  resetFlags:      () => void;
  visualConfig:    VisualConfig;
  setVisualConfig: (partial: Partial<VisualConfig>) => void;
  resetVisual:     () => void;
}

const ConfigContext = createContext<ConfigContextValue>({
  flags: defaultFlags, setFlag: () => {}, resetFlags: () => {},
  visualConfig: defaultVisual, setVisualConfig: () => {}, resetVisual: () => {},
});

export const useConfig = () => useContext(ConfigContext);

/* ─── Provider ─── */

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [flags,   setFlags]   = useState<ConfigFlags>(defaultFlags);
  const [visual,  setVisual]  = useState<VisualConfig>(defaultVisual);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio-config");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.flags)  setFlags({ ...defaultFlags,  ...parsed.flags });
        if (parsed.visual) setVisual({ ...defaultVisual, ...parsed.visual });
      }
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("portfolio-config", JSON.stringify({ flags, visual }));
    applyVisualConfig(visual);
  }, [flags, visual, mounted]);

  const setFlag         = (key: ConfigKey, value: boolean) => setFlags(p => ({ ...p, [key]: value }));
  const resetFlags      = () => setFlags(defaultFlags);
  const setVisualConfig = (partial: Partial<VisualConfig>) => setVisual(p => ({ ...p, ...partial }));
  const resetVisual     = () => setVisual(defaultVisual);

  return (
    <ConfigContext.Provider value={{ flags, setFlag, resetFlags, visualConfig: visual, setVisualConfig, resetVisual }}>
      {children}
    </ConfigContext.Provider>
  );
}
