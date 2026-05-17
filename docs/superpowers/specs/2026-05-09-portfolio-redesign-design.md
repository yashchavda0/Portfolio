# Portfolio Redesign — Apple-Inspired Light Theme

**Date:** 2026-05-09
**Status:** Design Approved
**Approach:** Apple Pro (default) + Studio Grade (toggleable)

---

## Design Philosophy

Apple.com-inspired: space, typography, and scroll storytelling. Warm cream base with ember accents. Serif headlines for editorial sophistication. Light background makes it stand out from the sea of dark developer portfolios.

---

## Visual Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Background Base | `#faf8f5` | Page background — warm cream, never pure white |
| Background Surface | `#f2efe9` | Card/section backgrounds |
| Background Border | `#e8e4de` | Borders, dividers |
| Text Primary | `#1a1715` | Headlines, strong text |
| Text Secondary | `#57534e` | Body text |


| Text Muted | `#a8a29e` | Labels, captions |
| Accent Red | `#dc2626` | Primary accent, CTAs, highlights |
| Accent Orange | `#ea580c` | Secondary accent, gradients |
| Accent Amber | `#d97706` | Tertiary accent, gradients |
| Ember Gradient | `linear-gradient(135deg, #dc2626, #ea580c)` | Primary CTA, hero period, skill highlights |
| Ember Gradient Warm | `linear-gradient(135deg, #ea580c, #d97706)` | Secondary highlights |

### Typography

- **Headlines:** Georgia (serif) — loaded via `next/font/google`. Tight letter-spacing (-0.04em). Sizes: Hero 56-72px, Section 28-36px.
- **Body:** Inter (sans-serif) — already in project. Sizes: Body 14-15px, Small 12-13px.
- **Mono:** Fira Code — already in project. Used in terminal/code editor elements.

### Effects

1. **Mouse-reactive warm glow** — soft ember gradient follows cursor on hero
2. **Scroll-linked text reveals** — characters/words fade in on scroll (GSAP ScrollTrigger)
3. **Parallax depth** — sections shift at different scroll speeds
4. **Ambient warm orbs** — slow-moving radial gradients for depth
5. **Hover scale + warm shadow** — cards lift and cast warm shadow on hover

---

## Tech Stack

### Existing (keep)
- Next.js 14 (App Router)
- Tailwind CSS 3.4
- Framer Motion 11 (component-level animations)
- TypeScript
- `clsx` + `tailwind-merge` (`cn()` utility)

### New additions
- **Lenis** — buttery smooth scroll (the #1 Apple.com feel factor)
- **GSAP + ScrollTrigger** — scroll-driven animations, pinning, text reveals
- **21st.dev components** — Heroes, Backgrounds, Texts, Scroll Areas, Shaders, Cards, CTAs, Navigation Menus
- **React Three Fiber** (Studio Grade mode only) — 3D skill cloud visualization

### Removed
- All custom Aceternity-style UI components (spotlight, flip-words, encrypted-text, tracing-beam, floating-dock, moving-border, lamp-effect, bento-grid, infinite-moving-cards, expandable-card, glowing-effect, sparkles, wobble-card)
- `simplex-noise` dependency
- `@tabler/icons-react` (replaced by lighter approach)
- ThemeProvider (4 themes → single light theme, theme switcher stays in `/lab` only)

---

## Page Structure

### Navigation

- **Style:** Minimal top bar. "YC" logo left, section links right (About, Work, Skills, Contact).
- **Behavior:** Links are subtle gray, current section highlighted. Smooth scroll to section.
- **On scroll:** Background gains a subtle cream-white frosted glass effect (`backdrop-blur`).
- **Mobile:** Hamburger menu with slide-in.

### Section 1: Hero

**Layout:** Full viewport, centered content.

**Content:**
- Name: "Yash Chavda." — serif, 56-72px. The period is ember red.
- Tagline: "Software Engineer crafting intelligent systems with clean architecture."
- Two CTAs: "View My Work" (ember gradient pill) + "Get In Touch" (outlined pill)
- Scroll indicator at bottom

**Effects:**
- Mouse-reactive warm glow follows cursor
- Ambient ember/orange glow orbs in background
- Name characters reveal one by one on load (GSAP SplitText)
- 21st.dev: Background component (subtle grain/noise texture)

**Studio Grade mode:**
- Subtle WebGL gradient mesh in background (21st.dev Shader)

### Section 2: About

**Layout:** Two-column. Left: bio paragraph + location/status pills. Right: 2x2 stat cards.

**Content:**
- Section label: "ABOUT"
- Headline: "I build scalable backend systems and AI-powered applications with a focus on clean architecture."
- Bio paragraph with education, current role, open status
- Location pill + "Open to Opportunities" pill (ember tint)
- Stats: 10+ Projects, 99% Uptime, 70% SQL Optimized, 1st Hackathon Won

**Effects:**
- Words fade in line by line on scroll (GSAP ScrollTrigger)
- Stat numbers animate from 0 on scroll into view
- Warm glow behind section

**21st.dev:** Text (animated reveals) + Numbers (counters) + Scroll Area

### Section 3: Work (Experience + Projects)

**Layout:** Experience card on top, then project grid below.

**Content:**
- Section label: "SELECTED WORK"
- Current role card: company, title, dates, brief description
- Sub-label: "PROJECTS"
- 2x2 project cards: each with icon monogram, name, description, tech tags (ember-tinted pills)

**Projects:**
1. LLM Multi-Agent Orchestration (Python, LangChain, FastAPI)
2. Imaginify (Next.js, TypeScript, OpenAI)
3. Visionary Vest (React, Node.js, PostgreSQL)
4. Document Processing Platform (Python, AWS, Docker)

**Effects:**
- Cards have warm shadow on hover, subtle lift
- GSAP ScrollTrigger: experience card fades in, then project cards stagger in
- Tech tag pills have ember-tinted backgrounds

**21st.dev:** Cards + Features + Scroll Area

**Studio Grade mode:**
- Project cards have 3D perspective tilt on hover

### Section 4: Skills

**Layout:** Interactive Skill Cloud.

**Content:**
- Section label: "SKILLS"
- Headline: "Technologies I work with." (serif)
- Filter category pills: All, Languages, Frameworks, Databases, AI/ML, Tools
- Skill cloud: skills floating at different sizes based on proficiency

**Skill Cloud behavior:**
- Skills are positioned in a organic, scattered layout
- Font size = proficiency level (Python 22px bold, Redis 10px light)
- Color = category (red for languages, orange for frameworks, amber for AI/ML, black for tools)
- Skills drop in with spring physics on scroll
- On hover: skill gently pushes neighbors away (physics-based repulsion)
- Clicking a skill shows a tooltip with proficiency bar and related projects
- Category filter: clicking a category dims/fades non-matching skills

**Skills data:**
- Languages: Python, TypeScript, JavaScript, SQL
- Frameworks: Next.js, React, Node.js, FastAPI, Express
- Databases: PostgreSQL, MongoDB, Redis
- AI/ML: LangChain, OpenAI, LLM Orchestration, Prompt Engineering
- Tools: Docker, AWS, Git, CI/CD, GraphQL

**21st.dev:** Background + Text animations for headline

**Studio Grade mode:**
- 3D orbital visualization with React Three Fiber — skills as floating spheres orbiting a center hub. Size = proficiency. Color = category.

### Section 5: Contact

**Layout:** Centered, minimal.

**Content:**
- Section label: "CONTACT"
- Headline: "Let's build something." (serif)
- Subtitle: "Open to opportunities. Drop me a line."
- CTA: Email pill (ember gradient) — click to copy
- Social links: GitHub, LinkedIn, Resume — simple text, gray, hover → dark

**Effects:**
- Warm amber glow orb behind section (bottom center)
- Headline fades in on scroll

**21st.dev:** Call to Action component

---

## Interactive Features

### Cmd/Ctrl+K — Spotlight Search
- Opens a macOS Spotlight-style search overlay
- Search sections, skills, projects
- Results navigate to the section or show skill details
- Clean design: cream background, search input, categorized results

### Hidden Developer Console
- Triggered by typing `help` or `console.log()` anywhere on the page
- Opens a minimal terminal window at the bottom
- Commands: `whoami`, `skills`, `projects`, `experience`, `resume`, `contact`, `clear`, `exit`
- Styled as a clean code editor with ember syntax highlighting

### Smooth Scroll — Lenis
- Buttery smooth scrolling throughout
- Integrated with GSAP ScrollTrigger for coordinated scroll animations

### Mouse-Reactive Hero Glow
- On the hero section, a soft ember gradient follows the mouse
- Subtle, warm, creates depth

---

## Two Modes (Toggleable via /lab)

### Apple Pro (Default)
- All of the above
- Clean, premium, restrained

### Studio Grade
- Everything in Apple Pro, plus:
- React Three Fiber 3D skill orbital visualization
- 21st.dev Shader components for hero/project backgrounds
- 3D perspective tilt on project cards
- Enhanced particle effects on skill cloud

Toggle: `/lab` page gets a "Studio Mode" toggle switch

---

## File Structure Changes

### New files
```
components/
  ui/
    smooth-scroll.tsx         (Lenis wrapper)
    gsap-provider.tsx          (GSAP context provider)
    spotlight-search.tsx       (Cmd+K overlay)
    dev-console.tsx            (hidden terminal)
    skill-cloud.tsx            (physics-based skill cloud)
    skill-cloud-3d.tsx         (R3F version, Studio mode)
    scroll-text-reveal.tsx     (GSAP text animation)
    hero-glow.tsx              (mouse-reactive gradient)
    warm-card.tsx              (reusable card with warm shadow)
```

### Modified files
```
app/globals.css               (new color system, remove dark theme)
app/layout.tsx                (new font loading, remove ThemeProvider)
app/page.tsx                  (new section order, remove Education/Experience standalone)
components/ClientLayout.tsx   (remove ThemeProvider, add Lenis, GSAP)
components/Navigation.tsx     (new minimal nav)
components/Hero.tsx           (complete redesign)
components/About.tsx          (merge education, new layout)
components/Projects.tsx       (rename to Work, merge experience)
components/Skills.tsx         (skill cloud)
components/Contact.tsx        (minimal redesign)
```

### Deleted files
```
components/ThemeProvider.tsx
components/ConfigProvider.tsx (simplify — keep only studio mode toggle)
components/CursorTrail.tsx
components/ScrollProgress.tsx (replace with simpler scroll indicator)
components/CommandPalette.tsx (replace with Spotlight Search)
components/EasterEggTerminal.tsx (replace with Dev Console)
components/Education.tsx (merged into About)
components/Experience.tsx (merged into Work)
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

## New Dependencies

```json
{
  "lenis": "^1.1.x",
  "gsap": "^3.12.x"
}
```

21st.dev components are copy-paste style (like shadcn/ui). No npm package needed — components are added directly to the project. Install via `npx 21st add <component>` CLI or Magic MCP server.

---

## Implementation Order

1. Setup: new color system in globals.css + tailwind.config, install Lenis + GSAP
2. Navigation: new minimal nav component
3. Hero: complete redesign with new visual system
4. About: merged section with new layout
5. Work: merged experience + projects
6. Skills: interactive skill cloud
7. Contact: minimal redesign
8. Interactive features: Spotlight Search, Dev Console
9. Studio Grade mode: R3F skill orbital, Shader backgrounds
10. Cleanup: remove old components, dependencies
