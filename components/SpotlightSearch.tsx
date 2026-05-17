"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchItem {
  label: string;
  category: "Section" | "Skill" | "Project" | "Link";
  section?: string;
  href?: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  // Sections
  { label: "About", category: "Section", section: "#about" },
  { label: "Work", category: "Section", section: "#work" },
  { label: "Skills", category: "Section", section: "#skills" },
  { label: "Contact", category: "Section", section: "#contact" },
  // Skills
  { label: "Python", category: "Skill", section: "#skills" },
  { label: "TypeScript", category: "Skill", section: "#skills" },
  { label: "React", category: "Skill", section: "#skills" },
  { label: "Next.js", category: "Skill", section: "#skills" },
  { label: "LangChain", category: "Skill", section: "#skills" },
  // Projects
  { label: "LLM Orchestration", category: "Project", section: "#work" },
  { label: "Imaginify", category: "Project", section: "#work" },
  // Links
  { label: "Resume", category: "Link", href: "/resume.pdf" },
  { label: "GitHub", category: "Link", href: "https://github.com/yashchavda0" },
];

export default function SpotlightSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd/Ctrl+K toggles open, Escape closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus input when overlay opens
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  // Filter items by query matching label or category (case-insensitive)
  const filtered = query.trim()
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_ITEMS;

  // Navigate to section or external link
  const handleSelect = useCallback((item: SearchItem) => {
    setOpen(false);
    setQuery("");

    if (item.section) {
      document.querySelector(item.section)?.scrollIntoView({ behavior: "smooth" });
    } else if (item.href) {
      window.open(item.href, "_blank");
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="spotlight-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-stone-900/20 backdrop-blur-sm"
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
          />

          {/* Modal */}
          <motion.div
            key="spotlight-modal"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[20%] left-1/2 z-50 -translate-x-1/2 max-w-lg w-full px-4"
          >
            <div className="bg-white rounded-2xl border border-cream-border shadow-2xl shadow-stone-900/10 overflow-hidden">
              {/* Search input row */}
              <div className="flex items-center gap-3 px-4 border-b border-cream-border">
                {/* Magnifying glass icon */}
                <svg
                  className="h-4 w-4 shrink-0 text-stone-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sections, skills, projects..."
                  className="flex-1 py-4 text-sm text-stone-900 placeholder:text-stone-400 bg-transparent border-none outline-none"
                />

                {/* ESC badge */}
                <kbd className="hidden sm:inline-flex items-center rounded-md border border-cream-border bg-cream-surface px-1.5 py-0.5 font-mono text-[10px] text-stone-400">
                  ESC
                </kbd>
              </div>

              {/* Results list */}
              <div className="max-h-64 overflow-y-auto py-2">
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <button
                      key={`${item.label}-${item.category}`}
                      type="button"
                      onClick={() => handleSelect(item)}
                      className="flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors duration-150 hover:bg-cream-surface"
                    >
                      <span className="text-sm text-stone-900">{item.label}</span>
                      <span className="inline-flex items-center rounded-full border border-cream-border bg-cream-surface px-2 py-0.5 text-[10px] uppercase tracking-wider text-stone-400">
                        {item.category}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-stone-400">
                    No results found.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
