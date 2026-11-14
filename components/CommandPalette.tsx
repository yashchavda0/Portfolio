"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, type ThemeKey, themes } from "@/components/ThemeProvider";
import { useConfig, type ConfigKey } from "@/components/ConfigProvider";
import { FiSearch, FiToggleLeft, FiToggleRight } from "react-icons/fi";

interface PaletteItem {
  id: string;
  label: string;
  section: "theme" | "toggle";
  themeKey?: ThemeKey;
}

const paletteItems: PaletteItem[] = [
  // Original Dark Themes
  { id: "t1", label: "Theme: Charcoal + Coral + Sage", section: "theme", themeKey: "charcoal-coral" },
  { id: "t2", label: "Theme: Obsidian + Violet + Amber", section: "theme", themeKey: "obsidian-violet" },
  { id: "t3", label: "Theme: Noir + Cyan + Gold", section: "theme", themeKey: "noir-cyan" },
  { id: "t4", label: "Theme: Midnight + Indigo + Peach", section: "theme", themeKey: "midnight-indigo" },
  // Toggles
  { id: "c1", label: "Toggle: Cursor Trail", section: "toggle" },
  { id: "c2", label: "Toggle: Encrypted Name", section: "toggle" },
  { id: "c3", label: "Toggle: Skill Constellation", section: "toggle" },
  { id: "c4", label: "Toggle: Hero Parallax", section: "toggle" },
  { id: "c5", label: "Toggle: Easter Egg Terminal", section: "toggle" },
  { id: "c6", label: "Toggle: Sparkles", section: "toggle" },
];

const toggleKeyMap: Record<string, ConfigKey> = {
  c1: "cursorTrail",
  c2: "encryptedName",
  c3: "skillConstellation",
  c4: "heroParallax",
  c5: "easterEggTerminal",
  c6: "sparkles",
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();
  const { flags, setFlag } = useConfig();

  // Ctrl+Shift+P
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setOpen((p) => !p);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = paletteItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: PaletteItem) => {
    if (item.section === "theme" && item.themeKey) {
      setTheme(item.themeKey);
    } else if (item.section === "toggle") {
      const key = toggleKeyMap[item.id];
      if (key) setFlag(key, !flags[key]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9995]"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-[9996] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            style={{ background: "rgba(15,15,15,0.98)" }}
          >
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <FiSearch className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search themes & toggles…"
                className="flex-1 bg-transparent text-[var(--color-text-secondary)] text-sm outline-none placeholder:text-[var(--color-text-muted)]"
              />
              <kbd className="text-[10px] text-[var(--color-text-muted)] border border-white/10 rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            {/* Items */}
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="text-[var(--color-text-muted)] text-sm text-center py-6">
                  No results
                </p>
              )}

              {/* Themes */}
              {filtered.some((i) => i.section === "theme") && (
                <div className="mb-1">
                  <p className="text-[10px] uppercase text-[var(--color-text-muted)] px-2 py-1 tracking-wider">
                    Themes
                  </p>
                  {filtered
                    .filter((i) => i.section === "theme")
                    .map((item) => {
                      const isActive = theme === item.themeKey;
                      const t = item.themeKey ? themes[item.themeKey] : null;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                            isActive
                              ? "bg-white/10 text-[var(--color-text-primary)]"
                              : "text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text-secondary)]"
                          }`}
                        >
                          {/* Color swatches */}
                          {t && (
                            <div className="flex gap-1 shrink-0">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ background: t.primary }}
                              />
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ background: t.secondary }}
                              />
                              <div
                                className="w-3 h-3 rounded-full border border-white/20"
                                style={{ background: t.bg }}
                              />
                            </div>
                          )}
                          <span>{item.label}</span>
                          {isActive && (
                            <span className="ml-auto text-[10px] text-green-400">
                              Active
                            </span>
                          )}
                        </button>
                      );
                    })}
                </div>
              )}

              {/* Toggles */}
              {filtered.some((i) => i.section === "toggle") && (
                <div>
                  <p className="text-[10px] uppercase text-[var(--color-text-muted)] px-2 py-1 tracking-wider">
                    Interactions
                  </p>
                  {filtered
                    .filter((i) => i.section === "toggle")
                    .map((item) => {
                      const key = toggleKeyMap[item.id];
                      const isOn = key ? flags[key] : false;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text-secondary)] transition-colors"
                        >
                          {isOn ? (
                            <FiToggleRight className="w-4 h-4 text-green-400" />
                          ) : (
                            <FiToggleLeft className="w-4 h-4 text-[var(--color-text-muted)]" />
                          )}
                          <span>{item.label}</span>
                          <span
                            className={`ml-auto text-[10px] ${
                              isOn ? "text-green-400" : "text-[var(--color-text-muted)]"
                            }`}
                          >
                            {isOn ? "ON" : "OFF"}
                          </span>
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
