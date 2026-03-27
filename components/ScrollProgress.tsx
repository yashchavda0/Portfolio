"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(s.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Side dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="relative group"
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: activeSection === section.id ? 10 : 6,
                height: activeSection === section.id ? 10 : 6,
                backgroundColor:
                  activeSection === section.id
                    ? "var(--color-primary)"
                    : "rgba(255,255,255,0.15)",
              }}
            />
            <span
              className="absolute right-5 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-bg)",
              }}
            >
              {section.label}
            </span>
          </motion.button>
        ))}
      </div>
    </>
  );
}
