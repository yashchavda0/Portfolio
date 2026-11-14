# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio with an Apple-inspired light theme — warm cream base, ember accents, serif typography, interactive skill cloud, smooth scroll, and two toggleable modes (Apple Pro + Studio Grade).

**Architecture:** Next.js 14 single-page app with 5 sections (Hero, About, Work, Skills, Contact). Lenis handles smooth scroll. GSAP ScrollTrigger drives scroll animations. 21st.dev components supplement the UI. React Three Fiber powers the Studio Grade 3D skill visualization. Old dark theme and Aceternity-style components are fully replaced.

**Tech Stack:** Next.js 14, Tailwind CSS 3.4, Framer Motion 11, Lenis, GSAP + ScrollTrigger, React Three Fiber (Studio mode), 21st.dev components, TypeScript

**Design Spec:** `docs/superpowers/specs/2026-05-09-portfolio-redesign-design.md`

---

## File Structure

### New files to create
```
app/
  globals.css                   (rewrite — new light color system)
  layout.tsx                    (modify — new fonts, remove dark class)
  page.tsx                      (modify — 5 sections instead of 7)
components/
  ClientLayout.tsx              (modify — remove old providers, add Lenis)
  Navigation.tsx                (rewrite — minimal top bar)
  Hero.tsx                      (rewrite — light serif hero)
  About.tsx                     (rewrite — merged with Education)
  Work.tsx                      (new — merged Experience + Projects)
  Skills.tsx                    (rewrite — interactive skill cloud)
  Contact.tsx                   (rewrite — minimal centered)
  Footer.tsx                    (new — simple footer)
  SpotlightSearch.tsx           (new — Cmd+K overlay)
  DevConsole.tsx                (new — hidden terminal)
  HeroGlow.tsx                  (new — mouse-reactive glow)
  WarmCard.tsx                  (new — reusable card component)
  SkillCloud.tsx                (new — physics-based skill cloud)
  SkillCloud3D.tsx              (new — R3F orbital, Studio mode)
  SmoothScroll.tsx              (new — Lenis wrapper)
tailwind.config.ts              (modify — new colors, fonts, animations)
```

### Files to delete
```
components/ThemeProvider.tsx
components/ConfigProvider.tsx
components/CursorTrail.tsx
components/ScrollProgress.tsx
components/CommandPalette.tsx
components/EasterEggTerminal.tsx
components/Education.tsx
components/Experience.tsx
components/Projects.tsx
components/ui/spotlight.tsx
components/ui/flip-words.tsx
components/ui/encrypted-text.tsx
components/ui/text-generate-effect.tsx
components/ui/tracing-beam.tsx
components/ui/floating-dock.tsx
components/ui/moving-border.tsx
components/ui/lamp-effect.tsx
components/ui/bento-grid.tsx
components/ui/infinite-moving-cards.tsx
components/ui/expandable-card.tsx
components/ui/glowing-effect.tsx
components/ui/sparkles.tsx
components/ui/wobble-card.tsx
```

---

## Phase 1: Foundation

### Task 1: Install new dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Lenis and GSAP**

Run:
```bash
npm install lenis gsap @gsap/react
```

- [ ] **Step 2: Install React Three Fiber (Studio mode)**

Run:
```bash
npm install @react-three/fiber @react-three/drei three
npm install -D @types/three
```

- [ ] **Step 3: Remove unused dependencies**

Run:
```bash
npm uninstall simplex-noise @tabler/icons-react
```

- [ ] **Step 4: Verify install**

Run: `npm ls lenis gsap @react-three/fiber`
Expected: All three listed without errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install Lenis, GSAP, R3F; remove simplex-noise, tabler icons"
```

---

### Task 2: New color system and global styles

**Files:**
- Rewrite: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Rewrite globals.css with light theme**

Replace entire contents of `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-stone-200;
  }

  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-cream text-stone-900 antialiased;
    font-family: var(--font-inter), system-ui, sans-serif;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #faf8f5;
  }

  ::-webkit-scrollbar-thumb {
    background: #d6d3cd;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a8a29e;
  }
}

::selection {
  background: #dc2626;
  color: #fff;
}

*:focus-visible {
  outline: 2px solid #dc2626;
  outline-offset: 2px;
}

@keyframes scroll {
  to {
    transform: translate(calc(-50% - 0.5rem));
  }
}
```

- [ ] **Step 2: Update tailwind.config.ts**

Replace entire contents of `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#faf8f5",
        "cream-surface": "#f2efe9",
        "cream-border": "#e8e4de",
        ember: {
          red: "#dc2626",
          orange: "#ea580c",
          amber: "#d97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-georgia)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "Fira Code", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds (may have type errors from deleted components — that's fine for now).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "feat: new light color system — warm cream base with ember accents"
```

---

### Task 3: Update root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add Georgia serif font, remove dark class**

Replace entire contents of `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Yash Chavda | Software Engineer",
  description:
    "Portfolio of Yash Chavda — Software Engineer specializing in scalable backend systems, AI/ML, and clean architecture.",
  keywords: [
    "Software Engineer",
    "Full Stack",
    "AI/ML",
    "Next.js",
    "React",
    "Portfolio",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} font-sans`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: update root layout — remove dark class, clean fonts"
```

---

### Task 4: Create Lenis smooth scroll provider

**Files:**
- Create: `components/SmoothScroll.tsx`

- [ ] **Step 1: Create SmoothScroll component**

```tsx
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/SmoothScroll.tsx
git commit -m "feat: add Lenis smooth scroll wrapper"
```

---

### Task 5: Create WarmCard reusable component

**Files:**
- Create: `components/WarmCard.tsx`

- [ ] **Step 1: Create WarmCard component**

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WarmCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function WarmCard({ children, className, hover = true }: WarmCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl bg-white border border-cream-border p-6",
        hover && "transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(26,23,21,0.06)]",
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/WarmCard.tsx
git commit -m "feat: add WarmCard reusable component"
```

---

### Task 6: Create HeroGlow component

**Files:**
- Create: `components/HeroGlow.tsx`

- [ ] **Step 1: Create mouse-reactive hero glow**

```tsx
"use client";

import { useEffect, useRef } from "react";

export function HeroGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(220, 38, 38, 0.06), transparent 40%)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/HeroGlow.tsx
git commit -m "feat: add mouse-reactive hero glow component"
```

---

### Task 7: Update ClientLayout — wire everything together

**Files:**
- Rewrite: `components/ClientLayout.tsx`

- [ ] **Step 1: Rewrite ClientLayout**

Replace entire contents of `components/ClientLayout.tsx` with:

```tsx
"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import HeroGlow from "@/components/HeroGlow";
import SpotlightSearch from "@/components/SpotlightSearch";
import DevConsole from "@/components/DevConsole";
import Footer from "@/components/Footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <HeroGlow />
      <Navigation />
      <SpotlightSearch />
      <DevConsole />
      <main className="relative">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
```

Note: This will fail to compile until we create Navigation, SpotlightSearch, DevConsole, and Footer. We'll create them in the next tasks.

- [ ] **Step 2: Commit**

```bash
git add components/ClientLayout.tsx
git commit -m "feat: rewrite ClientLayout with new providers"
```

---

## Phase 2: Navigation & Shell

### Task 8: Create minimal Navigation

**Files:**
- Rewrite: `components/Navigation.tsx`

- [ ] **Step 1: Create new minimal navigation**

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream/80 backdrop-blur-md border-b border-cream-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-lg font-bold text-stone-900 font-serif tracking-tight"
          >
            YC
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="text-xs text-stone-400 hover:text-stone-900 transition-colors tracking-wide uppercase"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-stone-900 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-stone-900 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-stone-900 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-cream/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="text-2xl font-serif text-stone-900"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Navigation.tsx
git commit -m "feat: new minimal navigation with mobile menu"
```

---

### Task 9: Create Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create footer**

```tsx
export default function Footer() {
  return (
    <footer className="py-8 text-center border-t border-cream-border">
      <p className="text-sm text-stone-400">
        Designed & Built by{" "}
        <span className="text-ember-red">Yash Chavda</span> ©{" "}
        {new Date().getFullYear()}
      </p>
      <p className="text-xs text-stone-300 mt-2">
        Press{" "}
        <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-cream-surface border border-cream-border font-mono">
          ⌘K
        </kbd>{" "}
        to search
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add simple footer"
```

---

## Phase 3: Section Components

### Task 10: Rewrite Hero

**Files:**
- Rewrite: `components/Hero.tsx`

- [ ] **Step 1: Create new Hero component**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!nameRef.current) return;
    const chars = nameRef.current.querySelectorAll(".char");
    chars.forEach((char, i) => {
      (char as HTMLElement).style.transitionDelay = `${i * 40}ms`;
      requestAnimationFrame(() => {
        (char as HTMLElement).style.opacity = "1";
        (char as HTMLElement).style.transform = "translateY(0)";
      });
    });
  }, []);

  const name = "Yash Chavda";

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-gradient-to-r from-ember-red/5 to-ember-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[200px] rounded-full bg-ember-amber/5 blur-3xl pointer-events-none" />

      <div className="relative text-center">
        <h1
          ref={nameRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-serif tracking-[-0.04em] text-stone-900 leading-none"
        >
          {name.split("").map((char, i) => (
            <span
              key={i}
              className={`char inline-block opacity-0 translate-y-4 transition-all duration-500 ${
                char === "." ? "text-ember-red" : ""
              }`}
            >
              {char === " " ? " " : char}
            </span>
          ))}
          <span className="text-ember-red">.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-5 text-base sm:text-lg text-stone-500 max-w-md mx-auto leading-relaxed"
        >
          Software Engineer crafting
          <br />
          intelligent systems with{" "}
          <span className="text-ember-red font-medium">clean architecture</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-7 flex gap-3 justify-center"
        >
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-ember-red to-ember-orange text-white text-sm font-medium hover:shadow-lg hover:shadow-ember-red/20 transition-shadow"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-2.5 rounded-full border border-cream-border text-stone-500 text-sm hover:border-stone-400 hover:text-stone-700 transition-colors"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[3px] text-stone-300">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-stone-300 to-transparent" />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Run dev server and verify hero renders**

Run: `npm run dev`
Expected: Light cream background, large serif "Yash Chavda." with red period, ember gradient CTA button.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: rewrite Hero — light serif design with character reveal"
```

---

### Task 11: Rewrite About (merged with Education)

**Files:**
- Rewrite: `components/About.tsx`

- [ ] **Step 1: Create new About component**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { WarmCard } from "@/components/WarmCard";

const stats = [
  { value: 10, suffix: "+", label: "Projects Built" },
  { value: 99, suffix: "%", label: "System Uptime" },
  { value: 70, suffix: "%", label: "SQL Optimized" },
  { value: 1, suffix: "st", label: "Hackathon Won" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number, startTime?: number) => {
      const s = startTime ?? timestamp;
      const progress = Math.min((timestamp - s) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame((t) => step(t, s));
    };
    requestAnimationFrame((t) => step(t));
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      <span className="text-ember-orange">{suffix}</span>
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[3px] text-stone-300 mb-4">About</p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-semibold font-serif tracking-tight text-stone-900 leading-snug mb-8"
        >
          I build scalable backend systems and AI-powered
          applications with a focus on clean architecture
          <span className="text-ember-red">.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-sm text-stone-500 leading-relaxed">
              Currently at <span className="text-stone-900 font-medium">Silver Touch Technologies</span> building
              enterprise solutions. B.E. in IT from{" "}
              <span className="text-stone-900 font-medium">LD College of Engineering</span> with
              an 8.92 GPA. Open to new opportunities.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-[11px] px-3 py-1 rounded-full bg-white border border-cream-border text-stone-500">
                Ahmedabad, India
              </span>
              <span className="text-[11px] px-3 py-1 rounded-full bg-ember-red/5 border border-ember-red/10 text-ember-red">
                Open to Opportunities
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            {stats.map((stat) => (
              <WarmCard key={stat.label} className="p-4" hover={false}>
                <p className="text-2xl font-bold text-stone-900">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[11px] text-stone-400 mt-1">{stat.label}</p>
              </WarmCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/About.tsx
git commit -m "feat: rewrite About — merged with Education, counter animations"
```

---

### Task 12: Create Work section (merged Experience + Projects)

**Files:**
- Create: `components/Work.tsx`

- [ ] **Step 1: Create Work component**

```tsx
"use client";

import { motion } from "framer-motion";
import { WarmCard } from "@/components/WarmCard";

const experience = {
  title: "Trainee Software Engineer",
  company: "Silver Touch Technologies",
  period: "2024 — Present",
  location: "Ahmedabad, India",
  description:
    "Building enterprise solutions with scalable backend architectures and AI integrations. Reduced SQL query complexity by 70% and maintained 99%+ system uptime.",
};

const projects = [
  {
    id: "llm",
    initials: "AI",
    name: "LLM Multi-Agent Orchestration",
    description:
      "Multi-agent system for intelligent document processing and analysis using LangChain.",
    tags: ["Python", "LangChain", "FastAPI"],
    gradient: "from-ember-red to-ember-orange",
    tagBg: "bg-ember-red/6",
    tagColor: "text-ember-red",
  },
  {
    id: "imaginify",
    initials: "SaaS",
    name: "Imaginify",
    description:
      "AI-powered SaaS platform for creative image generation and editing.",
    tags: ["Next.js", "TypeScript", "OpenAI"],
    gradient: "from-ember-orange to-ember-amber",
    tagBg: "bg-ember-orange/6",
    tagColor: "text-ember-orange",
  },
  {
    id: "visionary",
    initials: "Fin",
    name: "Visionary Vest",
    description:
      "Fintech dashboard for real-time portfolio tracking and analytics.",
    tags: ["React", "Node.js", "PostgreSQL"],
    gradient: "from-ember-amber to-ember-orange",
    tagBg: "bg-ember-amber/6",
    tagColor: "text-ember-amber",
  },
  {
    id: "docs",
    initials: "Doc",
    name: "Document Processing Platform",
    description:
      "Enterprise document processing with AI-powered extraction and classification.",
    tags: ["Python", "AWS", "Docker"],
    gradient: "from-stone-800 to-stone-600",
    tagBg: "bg-stone-100",
    tagColor: "text-stone-600",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Work() {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[3px] text-stone-300 mb-4">
          Selected Work
        </p>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <WarmCard className="p-7 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-ember-red/3 blur-3xl" />
            <p className="text-[10px] uppercase tracking-[2px] text-ember-red mb-1">
              Current Role
            </p>
            <h3 className="text-xl font-semibold font-serif text-stone-900 tracking-tight">
              {experience.title}
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              {experience.company} · {experience.period}
            </p>
            <p className="text-sm text-stone-500 mt-3 leading-relaxed max-w-lg">
              {experience.description}
            </p>
          </WarmCard>
        </motion.div>

        {/* Projects */}
        <p className="text-[10px] uppercase tracking-[2px] text-ember-orange mb-5">
          Projects
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-3"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <WarmCard className="p-6 h-full">
                <div
                  className={`w-9 h-9 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4`}
                >
                  <span className="text-white text-xs font-bold">
                    {project.initials}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-stone-900">
                  {project.name}
                </h4>
                <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] px-2 py-0.5 rounded-full ${project.tagBg} ${project.tagColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </WarmCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Work.tsx
git commit -m "feat: create Work section — merged Experience + Projects"
```

---

### Task 13: Rewrite Skills — Interactive Skill Cloud

**Files:**
- Rewrite: `components/Skills.tsx`
- Create: `components/SkillCloud.tsx`

- [ ] **Step 1: Create SkillCloud physics component**

```tsx
"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface Skill {
  name: string;
  category: string;
  proficiency: number; // 0-1
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const categoryColors: Record<string, string> = {
  languages: "text-ember-red",
  frameworks: "text-ember-orange",
  databases: "text-ember-amber",
  "ai/ml": "text-ember-red",
  tools: "text-stone-900",
};

const categoryBg: Record<string, string> = {
  languages: "bg-ember-red/5 border-ember-red/10",
  frameworks: "bg-ember-orange/5 border-ember-orange/10",
  databases: "bg-ember-amber/5 border-ember-amber/10",
  "ai/ml": "bg-ember-red/5 border-ember-red/10",
  tools: "bg-stone-50 border-stone-200",
};

const skillsData = [
  { name: "Python", category: "languages", proficiency: 0.95 },
  { name: "TypeScript", category: "languages", proficiency: 0.85 },
  { name: "JavaScript", category: "languages", proficiency: 0.8 },
  { name: "SQL", category: "languages", proficiency: 0.75 },
  { name: "Next.js", category: "frameworks", proficiency: 0.88 },
  { name: "React", category: "frameworks", proficiency: 0.82 },
  { name: "Node.js", category: "frameworks", proficiency: 0.8 },
  { name: "FastAPI", category: "frameworks", proficiency: 0.85 },
  { name: "Express", category: "frameworks", proficiency: 0.7 },
  { name: "PostgreSQL", category: "databases", proficiency: 0.78 },
  { name: "MongoDB", category: "databases", proficiency: 0.72 },
  { name: "Redis", category: "databases", proficiency: 0.6 },
  { name: "LangChain", category: "ai/ml", proficiency: 0.88 },
  { name: "OpenAI", category: "ai/ml", proficiency: 0.85 },
  { name: "LLM Orchestration", category: "ai/ml", proficiency: 0.82 },
  { name: "Prompt Engineering", category: "ai/ml", proficiency: 0.78 },
  { name: "Docker", category: "tools", proficiency: 0.72 },
  { name: "AWS", category: "tools", proficiency: 0.7 },
  { name: "Git", category: "tools", proficiency: 0.85 },
  { name: "CI/CD", category: "tools", proficiency: 0.65 },
  { name: "GraphQL", category: "tools", proficiency: 0.68 },
];

function generateSkills(): Skill[] {
  return skillsData.map((s) => ({
    ...s,
    x: Math.random() * 600 - 300,
    y: Math.random() * 300 - 150,
    vx: 0,
    vy: 0,
  }));
}

interface SkillCloudProps {
  activeCategory: string;
}

export default function SkillCloud({ activeCategory }: SkillCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<Skill[]>(generateSkills());
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [renderKey, setRenderKey] = useState(0);
  const inView = useInView(containerRef, { once: true });

  // Spring physics simulation
  const animate = useCallback(() => {
    const skills = skillsRef.current;
    const centerX = 0;
    const centerY = 0;
    const damping = 0.85;
    const springStrength = 0.02;

    skills.forEach((skill) => {
      // Pull toward center with offset based on index
      const dx = centerX - skill.x;
      const dy = centerY - skill.y;
      skill.vx += dx * springStrength;
      skill.vy += dy * springStrength;
      skill.vx *= damping;
      skill.vy *= damping;
      skill.x += skill.vx;
      skill.y += skill.vy;
    });

    // Repulsion between close skills
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        const dx = skills[j].x - skills[i].x;
        const dy = skills[j].y - skills[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = 60 + (skills[i].proficiency + skills[j].proficiency) * 30;
        if (dist < minDist && dist > 0) {
          const force = (minDist - dist) * 0.01;
          skills[i].vx -= (dx / dist) * force;
          skills[i].vy -= (dy / dist) * force;
          skills[j].vx += (dx / dist) * force;
          skills[j].vy += (dy / dist) * force;
        }
      }
    }

    setRenderKey((k) => k + 1);
    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [inView, animate]);

  const getFontSize = (proficiency: number) =>
    `${12 + proficiency * 14}px`;

  const getFontWeight = (proficiency: number) =>
    proficiency > 0.8 ? 600 : proficiency > 0.7 ? 500 : 400;

  return (
    <div ref={containerRef} className="relative w-full h-[350px] overflow-hidden">
      {skillsRef.current.map((skill) => {
        const isActive =
          activeCategory === "all" || skill.category === activeCategory;
        return (
          <motion.button
            key={skill.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: inView ? (isActive ? 1 : 0.15) : 0,
              scale: inView ? 1 : 0,
            }}
            transition={{
              duration: 0.4,
              delay: Math.random() * 0.5,
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${skill.x}px), calc(-50% + ${skill.y}px))`,
              fontSize: getFontSize(skill.proficiency),
              fontWeight: getFontWeight(skill.proficiency),
              cursor: "pointer",
              transition: "opacity 0.3s",
            }}
            className={`inline-block px-3 py-1.5 rounded-full border ${categoryBg[skill.category]} ${categoryColors[skill.category]} whitespace-nowrap`}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {skill.name}
            {hoveredSkill === skill.name && (
              <span className="ml-1.5 text-[10px] font-normal opacity-60">
                {Math.round(skill.proficiency * 100)}%
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Create Skills section wrapper**

Replace entire contents of `components/Skills.tsx` with:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SkillCloud from "@/components/SkillCloud";

const categories = [
  { id: "all", label: "All" },
  { id: "languages", label: "Languages" },
  { id: "frameworks", label: "Frameworks" },
  { id: "databases", label: "Databases" },
  { id: "ai/ml", label: "AI/ML" },
  { id: "tools", label: "Tools" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[3px] text-stone-300 mb-4">
          Skills
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-semibold font-serif tracking-tight text-stone-900 mb-6"
        >
          Technologies I work with<span className="text-ember-red">.</span>
        </motion.h2>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-[11px] px-4 py-1.5 rounded-full transition-all ${
                activeCategory === cat.id
                  ? "bg-stone-900 text-white"
                  : "border border-cream-border text-stone-400 hover:border-stone-400 hover:text-stone-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill Cloud */}
        <SkillCloud activeCategory={activeCategory} />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run dev server and verify skill cloud**

Run: `npm run dev`
Expected: Skills float in organic layout, category filter dims non-matching skills, hover shows proficiency %.

- [ ] **Step 4: Commit**

```bash
git add components/Skills.tsx components/SkillCloud.tsx
git commit -m "feat: interactive skill cloud with physics-based layout and category filter"
```

---

### Task 14: Rewrite Contact

**Files:**
- Rewrite: `components/Contact.tsx`

- [ ] **Step 1: Create minimal Contact**

```tsx
"use client";

import { motion } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com/yashchavda0" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yashchavda" },
  { label: "Resume", href: "/resume.pdf" },
];

export default function Contact() {
  const copyEmail = () => {
    navigator.clipboard.writeText("yashchavda@email.com");
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      {/* Warm amber glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-48 rounded-full bg-ember-amber/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto text-center relative"
      >
        <p className="text-[11px] uppercase tracking-[3px] text-stone-300 mb-4">
          Contact
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold font-serif tracking-tight text-stone-900 mb-2">
          Let&apos;s build something<span className="text-ember-red">.</span>
        </h2>
        <p className="text-sm text-stone-400 mb-7">
          Open to opportunities. Drop me a line.
        </p>

        <button
          onClick={copyEmail}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-ember-red to-ember-orange text-white text-sm font-medium hover:shadow-lg hover:shadow-ember-red/20 transition-shadow"
        >
          yashchavda@email.com
        </button>

        <div className="flex gap-5 justify-center mt-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-stone-300 hover:text-stone-700 transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: rewrite Contact — minimal centered with email copy"
```

---

### Task 15: Assemble page.tsx

**Files:**
- Rewrite: `app/page.tsx`

- [ ] **Step 1: Update page to use new 5-section structure**

Replace entire contents of `app/page.tsx` with:

```tsx
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative">
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="work">
        <Work />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Run dev server and verify full page**

Run: `npm run dev`
Expected: All 5 sections render in light cream theme. Navigation works. Hero character reveal plays. About counters animate on scroll. Skill cloud is interactive.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble page with 5 redesigned sections"
```

---

## Phase 4: Interactive Features

### Task 16: Create Spotlight Search (Cmd+K)

**Files:**
- Create: `components/SpotlightSearch.tsx`

- [ ] **Step 1: Create Spotlight component**

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const searchItems = [
  { label: "About", section: "#about", category: "Section" },
  { label: "Work", section: "#work", category: "Section" },
  { label: "Skills", section: "#skills", category: "Section" },
  { label: "Contact", section: "#contact", category: "Section" },
  { label: "Python", category: "Skill", query: "languages" },
  { label: "TypeScript", category: "Skill", query: "languages" },
  { label: "React", category: "Skill", query: "frameworks" },
  { label: "Next.js", category: "Skill", query: "frameworks" },
  { label: "LangChain", category: "Skill", query: "ai/ml" },
  { label: "LLM Orchestration", category: "Project", section: "#work" },
  { label: "Imaginify", category: "Project", section: "#work" },
  { label: "Resume", category: "Link", href: "/resume.pdf" },
  { label: "GitHub", category: "Link", href: "https://github.com/yashchavda0" },
];

export default function SpotlightSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const filtered = searchItems.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (item: (typeof searchItems)[0]) => {
    setOpen(false);
    if (item.href) {
      window.open(item.href, "_blank");
      return;
    }
    if (item.section) {
      document.querySelector(item.section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-lg"
          >
            <div className="bg-white rounded-2xl border border-cream-border shadow-2xl shadow-stone-900/10 overflow-hidden">
              <div className="flex items-center px-4 border-b border-cream-border">
                <svg
                  className="w-4 h-4 text-stone-300 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sections, skills, projects..."
                  className="w-full py-4 text-sm text-stone-900 placeholder-stone-300 bg-transparent outline-none"
                />
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-cream-surface border border-cream-border text-stone-400 ml-2 flex-shrink-0">
                  ESC
                </kbd>
              </div>

              {filtered.length > 0 && (
                <ul className="max-h-64 overflow-y-auto py-2">
                  {filtered.map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={() => navigate(item)}
                        className="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-cream-surface transition-colors"
                      >
                        <span className="text-sm text-stone-700">{item.label}</span>
                        <span className="text-[10px] text-stone-300 uppercase tracking-wider">
                          {item.category}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {filtered.length === 0 && (
                <p className="py-8 text-center text-sm text-stone-300">
                  No results found.
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/SpotlightSearch.tsx
git commit -m "feat: add Spotlight Search (Cmd+K)"
```

---

### Task 17: Create Hidden Dev Console

**Files:**
- Create: `components/DevConsole.tsx`

- [ ] **Step 1: Create DevConsole component**

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const commands: Record<string, string> = {
  whoami: "Yash Chavda — Software Engineer | AI Systems | Backend Architect",
  skills:
    "Python, TypeScript, React, Next.js, Node.js, LangChain, OpenAI, PostgreSQL, Docker, AWS",
  projects:
    "LLM Orchestration · Imaginify · Visionary Vest · Document Processing",
  experience:
    "Trainee Software Engineer @ Silver Touch Technologies (2024–Present)",
  resume: "Download: /resume.pdf",
  contact: "Email: yashchavda@email.com | GitHub: @yashchavda0",
  joke: "Why do programmers prefer dark mode? Because light attracts bugs. 🪲",
  help: "Commands: whoami, skills, projects, experience, resume, contact, joke, clear, exit",
  "sudo hire yash": "🎉 Permission granted. Let's build something together.",
};

export default function DevConsole() {
  const [open, setOpen] = useState(false);
  const [buffer, setBuffer] = useState("");
  const [history, setHistory] = useState<{ cmd: string; out: string }[]>([]);
  const [typed, setTyped] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for typing "help" anywhere on page
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (open) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Backspace") {
        setTyped((t) => t.slice(0, -1));
        return;
      }
      if (e.key.length === 1) {
        setTyped((t) => {
          const next = t + e.key;
          if (next.endsWith("help") || next.endsWith("console.log()")) {
            setOpen(true);
            setHistory([]);
            setBuffer("");
            return "";
          }
          return next.slice(-20);
        });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const execute = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "clear") {
      setHistory([]);
      setBuffer("");
      return;
    }
    if (trimmed === "exit") {
      setOpen(false);
      setBuffer("");
      return;
    }
    const out = commands[trimmed] ?? `Command not found: ${cmd}. Type "help" for commands.`;
    setHistory((h) => [...h, { cmd, out }]);
    setBuffer("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="max-w-3xl mx-auto p-4">
            <div className="bg-stone-900 rounded-2xl border border-stone-700 overflow-hidden shadow-2xl">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-stone-700">
                <button
                  onClick={() => setOpen(false)}
                  className="w-2.5 h-2.5 rounded-full bg-ember-red"
                />
                <div className="w-2.5 h-2.5 rounded-full bg-ember-amber" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-[10px] text-stone-500 ml-2 font-mono">
                  dev-console
                </span>
              </div>

              {/* Output */}
              <div className="p-4 font-mono text-xs max-h-48 overflow-y-auto">
                {history.map((entry, i) => (
                  <div key={i} className="mb-2">
                    <p className="text-stone-500">
                      $ <span className="text-stone-300">{entry.cmd}</span>
                    </p>
                    <p className="text-stone-400 mt-0.5">{entry.out}</p>
                  </div>
                ))}

                {/* Input line */}
                <div className="flex items-center">
                  <span className="text-stone-500">$ </span>
                  <input
                    ref={inputRef}
                    value={buffer}
                    onChange={(e) => setBuffer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") execute(buffer);
                      if (e.key === "Escape") setOpen(false);
                    }}
                    className="flex-1 bg-transparent text-stone-300 outline-none ml-1"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/DevConsole.tsx
git commit -m "feat: add hidden developer console with command system"
```

---

## Phase 5: Studio Grade Mode (Optional)

### Task 18: Create 3D Skill Cloud for Studio mode

**Files:**
- Create: `components/SkillCloud3D.tsx`

- [ ] **Step 1: Create R3F orbital skill visualization**

```tsx
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface SkillOrbProps {
  position: [number, number, number];
  name: string;
  color: string;
  size: number;
  speed: number;
}

function SkillOrb({ position, name, color, size, speed }: SkillOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const angle = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    angle.current += delta * speed;
    meshRef.current.position.x = Math.cos(angle.current) * position[0];
    meshRef.current.position.z = Math.sin(angle.current) * position[2];
    meshRef.current.position.y = position[1] + Math.sin(angle.current * 2) * 0.2;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      <Text
        position={[
          Math.cos(angle.current) * position[0],
          position[1] + size + 0.15,
          Math.sin(angle.current) * position[2],
        ]}
        fontSize={0.12}
        color="#57534e"
        anchorX="center"
        anchorY="bottom"
      >
        {name}
      </Text>
    </group>
  );
}

const skills = [
  { name: "Python", category: "languages", proficiency: 0.95 },
  { name: "TypeScript", category: "frameworks", proficiency: 0.85 },
  { name: "React", category: "frameworks", proficiency: 0.82 },
  { name: "Next.js", category: "frameworks", proficiency: 0.88 },
  { name: "LangChain", category: "ai/ml", proficiency: 0.88 },
  { name: "Node.js", category: "frameworks", proficiency: 0.8 },
  { name: "PostgreSQL", category: "databases", proficiency: 0.78 },
  { name: "Docker", category: "tools", proficiency: 0.72 },
  { name: "FastAPI", category: "frameworks", proficiency: 0.85 },
  { name: "OpenAI", category: "ai/ml", proficiency: 0.85 },
];

const categoryToColor: Record<string, string> = {
  languages: "#dc2626",
  frameworks: "#ea580c",
  databases: "#d97706",
  "ai/ml": "#dc2626",
  tools: "#57534e",
};

export default function SkillCloud3D() {
  const orbs = useMemo(
    () =>
      skills.map((skill, i) => ({
        ...skill,
        orbit: 1.5 + (i % 3) * 0.8,
        y: -0.5 + (Math.random() - 0.5) * 1,
        speed: 0.1 + Math.random() * 0.15,
        size: 0.08 + skill.proficiency * 0.12,
        color: categoryToColor[skill.category],
      })),
    []
  );

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-cream-surface border border-cream-border">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
        {orbs.map((orb) => (
          <SkillOrb
            key={orb.name}
            position={[orb.orbit, orb.y, orb.orbit]}
            name={orb.name}
            color={orb.color}
            size={orb.size}
            speed={orb.speed}
          />
        ))}
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/SkillCloud3D.tsx
git commit -m "feat: add 3D skill orbital visualization for Studio mode"
```

---

## Phase 6: Cleanup

### Task 19: Delete old components

**Files:**
- Delete all files listed in "Files to delete" section above

- [ ] **Step 1: Delete old layout/feature components**

```bash
rm components/ThemeProvider.tsx
rm components/ConfigProvider.tsx
rm components/CursorTrail.tsx
rm components/ScrollProgress.tsx
rm components/CommandPalette.tsx
rm components/EasterEggTerminal.tsx
rm components/Education.tsx
rm components/Experience.tsx
rm components/Projects.tsx
```

- [ ] **Step 2: Delete old Aceternity UI components**

```bash
rm components/ui/spotlight.tsx
rm components/ui/flip-words.tsx
rm components/ui/encrypted-text.tsx
rm components/ui/text-generate-effect.tsx
rm components/ui/tracing-beam.tsx
rm components/ui/floating-dock.tsx
rm components/ui/moving-border.tsx
rm components/ui/lamp-effect.tsx
rm components/ui/bento-grid.tsx
rm components/ui/infinite-moving-cards.tsx
rm components/ui/expandable-card.tsx
rm components/ui/glowing-effect.tsx
rm components/ui/sparkles.tsx
rm components/ui/wobble-card.tsx
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove old dark theme components and Aceternity UI"
```

---

### Task 20: Final verification

- [ ] **Step 1: Run dev server**

Run: `npm run dev`

- [ ] **Step 2: Manual checklist — verify each:**
- [ ] Light cream background (#faf8f5)
- [ ] Serif headline in Hero with character reveal
- [ ] Hero mouse-reactive ember glow
- [ ] Navigation minimal top bar, frosted on scroll
- [ ] About section with counter animations
- [ ] Work section with experience card + project grid
- [ ] Skill cloud with physics, category filter works
- [ ] Contact section with email copy
- [ ] Cmd+K Spotlight search works
- [ ] Type "help" anywhere → Dev Console opens
- [ ] Smooth scrolling (Lenis)
- [ ] Mobile responsive
- [ ] No console errors

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio redesign — Apple-inspired light theme"
```
