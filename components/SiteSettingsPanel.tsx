"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiRefreshCw } from "react-icons/fi";
import { useConfig, ACCENT_SCHEMES, SERIF_FONTS, AccentScheme, SerifFont } from "./ConfigProvider";

const FLAG_LABELS: Record<string, string> = {
  cursorTrail: "Cursor Trail",
  encryptedName: "Encrypted Name",
  skillConstellation: "Skill Constellation",
  heroParallax: "Hero Parallax",
  easterEggTerminal: "Easter Egg Terminal",
  sparkles: "Sparkles",
};

export default function SiteSettingsPanel() {
  const [open, setOpen] = useState(false);
  const { flags, setFlag, resetFlags, visualConfig, setVisualConfig, resetVisual } = useConfig();

  // Secret trigger: Ctrl+Shift+P
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="sp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[9990] bg-stone-900/15 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.aside
            key="sp-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[9991] w-[300px] bg-cream border-l border-cream-border shadow-2xl shadow-stone-300/25 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-cream/95 backdrop-blur-md border-b border-cream-border px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] tracking-[4px] uppercase text-stone-300">Private</p>
                <h2 className="font-serif font-bold text-stone-900 text-xl leading-tight mt-0.5">Site Config</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
                aria-label="Close settings"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="px-5 py-6 space-y-8">

              {/* ── Accent Color ── */}
              <section>
                <p className="font-mono text-[9px] tracking-[4px] uppercase text-stone-400 mb-3">Accent Color</p>
                <div className="flex gap-2.5 flex-wrap">
                  {(Object.entries(ACCENT_SCHEMES) as [AccentScheme, typeof ACCENT_SCHEMES[AccentScheme]][]).map(
                    ([key, s]) => (
                      <button
                        key={key}
                        onClick={() => setVisualConfig({ accentScheme: key })}
                        title={s.name}
                        className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                          visualConfig.accentScheme === key
                            ? "border-stone-900 scale-110 shadow-md"
                            : "border-transparent hover:scale-105"
                        }`}
                        style={{ background: s.gradient }}
                      />
                    )
                  )}
                </div>
                <p className="mt-2 text-[11px] text-stone-400 font-mono">
                  {ACCENT_SCHEMES[visualConfig.accentScheme].name}
                </p>
              </section>

              {/* ── Heading Font ── */}
              <section>
                <p className="font-mono text-[9px] tracking-[4px] uppercase text-stone-400 mb-3">Heading Font</p>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(SERIF_FONTS) as [SerifFont, typeof SERIF_FONTS[SerifFont]][]).map(([key, font]) => (
                    <button
                      key={key}
                      onClick={() => setVisualConfig({ serifFont: key })}
                      className={`px-3 py-3 rounded-xl border text-left transition-all duration-200 ${
                        visualConfig.serifFont === key
                          ? "border-stone-800 bg-white shadow-sm"
                          : "border-stone-200 hover:border-stone-300 bg-cream-surface"
                      }`}
                    >
                      <span
                        className="block text-xl font-bold leading-none text-stone-900"
                        style={{ fontFamily: font.family }}
                      >
                        Yash.
                      </span>
                      <span className="block text-[9px] font-mono text-stone-400 mt-1.5 tracking-wide uppercase leading-tight">
                        {font.name}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {/* ── Feature Flags ── */}
              <section>
                <p className="font-mono text-[9px] tracking-[4px] uppercase text-stone-400 mb-3">Feature Flags</p>
                <div className="space-y-0">
                  {(Object.keys(flags) as (keyof typeof flags)[]).map((key) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-2.5 border-b border-stone-100 last:border-0"
                    >
                      <span className="text-sm text-stone-600">{FLAG_LABELS[key] ?? key}</span>
                      <button
                        onClick={() => setFlag(key, !flags[key])}
                        className={`relative w-9 h-5 rounded-full transition-colors duration-200 shrink-0 ${
                          flags[key] ? "bg-stone-800" : "bg-stone-200"
                        }`}
                        aria-label={`Toggle ${key}`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                            flags[key] ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Reset ── */}
              <button
                onClick={() => { resetFlags(); resetVisual(); }}
                className="w-full py-2.5 rounded-xl border border-stone-200 text-sm text-stone-500 hover:text-stone-900 hover:border-stone-400 transition-all font-mono tracking-wider flex items-center justify-center gap-2"
              >
                <FiRefreshCw className="w-3.5 h-3.5" />
                Reset to defaults
              </button>

              <p className="text-center font-mono text-[9px] tracking-[3px] uppercase text-stone-300 pb-2">
                Ctrl + Shift + P
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
