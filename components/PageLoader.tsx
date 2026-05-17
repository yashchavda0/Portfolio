"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME_CHARS = "Yash Chavda".split("");

export default function PageLoader() {
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Dismiss once the page has fully loaded (or after 2.4s max)
    const onLoad = () => setDone(true);
    if (document.readyState === "complete") {
      setTimeout(() => setDone(true), 600);
    } else {
      window.addEventListener("load", onLoad);
      const fallback = setTimeout(() => setDone(true), 2400);
      return () => {
        window.removeEventListener("load", onLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#faf8f5]"
        >
          {/* Animated name */}
          <div className="flex items-baseline">
            {NAME_CHARS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.38,
                  delay: 0.08 + i * 0.055,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-serif font-bold text-stone-900 text-4xl md:text-5xl tracking-[-0.02em] inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.08 + NAME_CHARS.length * 0.055,
                duration: 0.3,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="font-serif font-bold text-4xl md:text-5xl inline-block ember-text"
            >
              .
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="mt-7 h-[1.5px] w-44 rounded-full bg-stone-200 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ originX: 0, background: "var(--accent-gradient)" }}
              transition={{ duration: 1.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full rounded-full"
            />
          </div>

          {/* Role label */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="mt-3 font-mono text-[9px] tracking-[5px] uppercase text-stone-400"
          >
            AI Engineer
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
