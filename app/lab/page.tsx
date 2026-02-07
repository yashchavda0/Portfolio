"use client";

import { motion } from "framer-motion";
import { useTheme, themes, type ThemeKey } from "@/components/ThemeProvider";
import { useConfig, type ConfigKey } from "@/components/ConfigProvider";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const toggleLabels: { key: ConfigKey; label: string; desc: string }[] = [
  {
    key: "cursorTrail",
    label: "Cursor Trail",
    desc: "Follows your mouse with animated dots",
  },
  {
    key: "encryptedName",
    label: "Encrypted Name",
    desc: "Hero name decrypts on load",
  },
  {
    key: "skillConstellation",
    label: "Skill Constellation",
    desc: "Interactive SVG star-map for skills",
  },
  {
    key: "heroParallax",
    label: "Hero Parallax",
    desc: "Spotlight movement on the hero",
  },
  {
    key: "easterEggTerminal",
    label: "Easter Egg Terminal",
    desc: "Press ``` to open a hidden terminal",
  },
  {
    key: "sparkles",
    label: "Sparkles",
    desc: "Decorative sparkle particles",
  },
];

export default function LabPage() {
  const { theme, setTheme } = useTheme();
  const { flags, setFlag } = useConfig();

  return (
    <div
      className="min-h-screen text-neutral-200 px-4 py-12"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors mb-10"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          The Lab{" "}
          <span style={{ color: "var(--color-primary)" }}>🧪</span>
        </motion.h1>
        <p className="text-neutral-500 mb-10">
          Tweak the portfolio&apos;s appearance and interactions below.
        </p>

        {/* ── Theme Picker ── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Color Palette</h2>
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(themes) as ThemeKey[]).map((key) => {
              const t = themes[key];
              const isActive = theme === key;
              return (
                <motion.button
                  key={key}
                  onClick={() => setTheme(key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative rounded-xl p-4 border transition-all text-left ${
                    isActive
                      ? "border-white/20 bg-white/[0.06]"
                      : "border-white/5 bg-white/[0.02] hover:border-white/10"
                  }`}
                >
                  {/* Swatches */}
                  <div className="flex gap-2 mb-3">
                    <div
                      className="w-6 h-6 rounded-full border border-white/10"
                      style={{ background: t.bg }}
                    />
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ background: t.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ background: t.secondary }}
                    />
                  </div>
                  <p className="text-sm font-medium capitalize text-neutral-200">
                    {key}
                  </p>
                  <p className="text-xs text-neutral-500">{t.name}</p>
                  {isActive && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-400" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* ── Interaction Toggles ── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Interactions</h2>
          <div className="space-y-3">
            {toggleLabels.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-neutral-200">
                    {item.label}
                  </p>
                  <p className="text-xs text-neutral-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => setFlag(item.key, !flags[item.key])}
                  className={`relative w-10 h-6 rounded-full transition-colors ${
                    flags[item.key] ? "bg-green-500" : "bg-white/10"
                  }`}
                >
                  <motion.div
                    className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow"
                    animate={{ x: flags[item.key] ? 16 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        <p className="text-neutral-600 text-xs text-center mt-12">
          You can also press{" "}
          <kbd className="border border-white/10 rounded px-1.5 py-0.5 text-neutral-500">
            Ctrl+Shift+P
          </kbd>{" "}
          anywhere on the site.
        </p>
      </div>
    </div>
  );
}
