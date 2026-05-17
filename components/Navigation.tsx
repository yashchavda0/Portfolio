"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <>
      {/* Desktop floating pill — appears after scrolling past hero */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="pill-nav"
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex"
            style={{ width: "680px" }}
          >
            <nav className="w-full flex items-center px-5 py-2.5 rounded-2xl bg-[rgba(250,248,245,0.92)] backdrop-blur-xl border border-stone-200/80 shadow-lg shadow-stone-300/20">
              {/* Name — left */}
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, "#hero")}
                className="font-serif font-bold text-stone-900 text-[1.05rem] leading-none tracking-tight hover:opacity-75 transition-opacity select-none"
              >
                Yash Chavda<span className="ember-text">.</span>
              </a>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Links — right */}
              <div className="flex items-center gap-0.5">
                {NAV_LINKS.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="px-4 py-1.5 rounded-full text-[11px] font-mono tracking-[3px] uppercase text-stone-500 hover:text-stone-900 hover:bg-white/80 transition-all duration-200"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile floating circle button — always visible */}
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        style={{ backgroundColor: menuOpen ? "rgba(250,248,245,1)" : "rgba(250,248,245,0.78)" }}
        className="fixed top-5 right-5 z-[60] md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-stone-200/70 backdrop-blur-md shadow-sm transition-colors duration-200"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <div className="flex w-4 flex-col gap-[4.5px]">
          <span className={`block h-[1.5px] bg-stone-800 transition-all duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block h-[1.5px] bg-stone-800 transition-all duration-300 ${menuOpen ? "-translate-y-[0px] -rotate-45" : ""}`} />
        </div>
      </button>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-cream md:hidden"
          >
            <ul className="flex flex-col items-center gap-10">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="font-serif text-4xl font-bold text-stone-900 hover:text-ember-red transition-colors"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
