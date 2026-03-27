# Portfolio Content Update — Task Map
> Source: CV (`Yash Chavda_CV.pdf`) vs Current Portfolio
> Branch: `lab` | Date: 2026-03-27
> Goal: Sync CV's stronger framing + new achievements into portfolio while keeping portfolio's best UX details.

---

## Legend
| Impact | Meaning |
|--------|---------|
| 🔴 CRITICAL | Recruiter will form wrong impression without this fix |
| 🟠 HIGH | Directly affects how strong your profile reads |
| 🟡 MEDIUM | Improves completeness and discoverability |
| 🟢 LOW | Polish / consistency |

---

## TASK 1 — Hero.tsx: Rewrite tagline to match CV summary
**File:** `components/Hero.tsx` (line 89–93)
**Impact:** 🔴 CRITICAL

**Current:**
```
Building elegant digital experiences with clean code and creative thinking.
Specializing in full-stack development and AI-powered solutions.
```

**Change to (from CV summary):**
```
Specializing in AI systems, backend architecture, and LLM-driven applications.
I build scalable multi-agent systems, workflow automation platforms, and production-grade deployments.
```

**Reason:**
The CV positions you as an **AI/backend systems engineer** — a strong, specific identity. The current tagline is vague and generic ("elegant experiences, clean code") — it reads like every portfolio. Recruiters scanning for AI/LLM talent need to see this in the first 5 seconds.

---

## TASK 2 — Hero.tsx: Update role flipper words
**File:** `components/Hero.tsx` (lines 12–17)
**Impact:** 🟠 HIGH

**Current roles:**
```js
["Software Engineer", "Full Stack Developer", "AI/ML Enthusiast", "Problem Solver"]
```

**Change to:**
```js
["Software Engineer", "AI Systems Engineer", "Backend Architect", "LLM Developer"]
```

**Reason:**
"AI/ML Enthusiast" sounds like a hobbyist. CV clearly shows you are building **production LLM systems** at work. "Problem Solver" is too generic. The new labels are specific, credible, and match the CV identity. "Backend Architect" is backed by your NL→SQL, multi-agent, and workflow automation work.

---

## TASK 3 — About.tsx: Replace bio text — remove "aspiring"
**File:** `components/About.tsx` (line 94)
**Impact:** 🔴 CRITICAL

**Current:**
```
I'm an aspiring software engineer with hands-on experience in full-stack development.
I thrive on building elegant, scalable applications and exploring the intersections of AI
and modern web technologies. Currently expanding my expertise in Data Science and Machine Learning.
```

**Change to:**
```
Software Engineer specializing in AI systems and backend architecture. I build production-grade
LLM-driven applications, multi-agent orchestration systems, and scalable data pipelines.
Strong focus on performance, reliability, and measurable impact.
```

**Reason:**
"Aspiring" is the single most damaging word in your portfolio — it signals you don't own your expertise. Your CV summary (which recruiters see first on a resume) uses zero such language. The replacement mirrors the CV's confident framing and names the exact domains (LLMs, multi-agent, data pipelines) recruiters are hunting for.

---

## TASK 4 — About.tsx: Add new stats to "By the Numbers" card
**File:** `components/About.tsx` (lines 102–130)
**Impact:** 🟠 HIGH

**Current stats:**
- 10+ Projects
- 2+ Years Exp
- 1 Hackathon Won

**Add / replace with:**
- 10+ Projects (keep)
- 99%+ Uptime (from CV: "Docker/Linux deployments ensuring 99%+ uptime")
- 70% SQL dependency cut (NL→SQL system)
- 1 Hackathon Won (keep)

**Reason:**
"2+ Years Exp" and "1 Hackathon" are weak standalone metrics for someone with real production impact. Replacing one stat with **99%+ Uptime** and **70% SQL reduction** directly uses CV numbers that show system-level thinking — exactly what backend/AI roles care about.

---

## TASK 5 — About.tsx: Add Milvus to tech marquee
**File:** `components/About.tsx` (lines 27–36)
**Impact:** 🟡 MEDIUM

**Current `techItems` includes:** React, Next.js, Python, TypeScript, PostgreSQL, Node.js, Tailwind, Docker
**Add:** FastAPI, Milvus (or replace Tailwind which is not in CV's core stack)

**Reason:**
FastAPI and Milvus are explicitly named in your CV as production tools. Milvus (vector DB) is a niche, impressive skill that differentiates you — especially for AI/ML hiring managers. Tailwind is frontend-only and not mentioned in your CV at all.

---

## TASK 6 — Experience.tsx: Replace achievements list for Silver Touch
**File:** `components/Experience.tsx` (lines 21–30)
**Impact:** 🔴 CRITICAL

**Current achievements (portfolio):**
```
- Built B2B solutions using NextJS, Python, GraphQL, PostgreSQL, and FastAPI
- Designed on-premise OCR pipeline for secure document processing
- Developed NLP-based pipelines achieving 99% tabular accuracy
- Architected schema-driven document processing platform
- Implemented webhook-based APIs for third-party integrations
- Delivered 2-3 POCs for government and defense organizations
- Replaced similarity search with vector database (40% improvement)
- Refactored backend architecture (15-20% performance boost)
```

**Replace with (merging best of both CV + portfolio):**
```
- Engineered LLM-driven multi-agent orchestration system with dynamic task routing — reduced incorrect tool usage by 40%
- Designed Natural Language → SQL system using RAG-based schema understanding — cut SQL dependency by 70% at sub-2s latency
- Built workflow automation engine with triggers, hooks, and rule-based execution — reduced manual configuration effort by 50%
- Developed vector search systems using Milvus — improved semantic retrieval performance by 40%
- Developed NLP/OCR pipelines achieving 99% tabular accuracy for enterprise document processing
- Delivered production B2B AI systems using Next.js, Python, FastAPI, GraphQL, and PostgreSQL
- Deployed systems via Docker and Linux ensuring 99%+ uptime
- Delivered POCs for government and defense organizations (keep — it's unique and impressive)
```

**Reason:**
The CV reveals 4 entirely new high-impact systems (LLM multi-agent, NL→SQL, workflow engine, Milvus vector search) that are **completely absent** from the portfolio. These are your strongest differentiators for AI/backend roles. The old list focused on OCR work, which is good but narrower. Merging both gives the complete, most impressive picture.

---

## TASK 7 — Experience.tsx: Add 3 new metric cards for Silver Touch
**File:** `components/Experience.tsx` (lines 16–20)
**Impact:** 🟠 HIGH

**Current metrics:**
```js
{ label: "Tabular Accuracy", value: 99, suffix: "%", emoji: "🎯" },
{ label: "Query Performance", value: 40, suffix: "%+", emoji: "⚡" },
{ label: "Core Optimization", value: 15, suffix: "-20%", emoji: "📈" },
```

**Replace with (5 metrics, showing stronger CV numbers):**
```js
{ label: "Tabular Accuracy", value: 99, suffix: "%", emoji: "🎯" },
{ label: "SQL Dependency Cut", value: 70, suffix: "%", emoji: "🧠" },
{ label: "Config Effort Reduced", value: 50, suffix: "%", emoji: "⚙️" },
{ label: "Vector Retrieval Boost", value: 40, suffix: "%", emoji: "⚡" },
{ label: "System Uptime", value: 99, suffix: "%+", emoji: "🚀" },
```

**Reason:**
The NL→SQL (70%) and workflow automation (50%) numbers from the CV are larger and more impressive than the current "15-20% optimization" card. Showing 5 metrics instead of 3 also increases the visual density of evidence — recruiters scanning fast will see more proof points.

---

## TASK 8 — Experience.tsx: Update period label for Silver Touch
**File:** `components/Experience.tsx` (line 15)
**Impact:** 🟡 MEDIUM

**Current:** `period: "Present"`
**Change to:** `period: "2024 – Present"`

**Reason:**
"Present" alone gives no context on duration. Adding the start year lets recruiters immediately calculate tenure. Your CV doesn't have dates either but portfolios benefit from this visibility — it removes ambiguity about whether this is a 2-week or 2-year role.

---

## TASK 9 — Projects.tsx: Add new project — LLM Multi-Agent System
**File:** `components/Projects.tsx`
**Impact:** 🔴 CRITICAL

**Action:** Add a 4th project card for the LLM/AI systems work described in the CV.

**New project data:**
```js
{
  title: "LLM Multi-Agent Orchestration",
  description: "Production AI system with dynamic task routing, NL→SQL, and workflow automation.",
  tags: ["Python", "FastAPI", "LLMs", "RAG"],
  content: (
    - Engineered multi-agent orchestration with dynamic task routing — 40% reduction in incorrect tool usage
    - Designed NL→SQL system using RAG-based schema understanding — 70% less manual SQL, sub-2s latency
    - Built workflow automation engine with triggers, hooks, rule-based execution — 50% less manual config
    - Developed Milvus vector search — 40% improvement in semantic retrieval
    - Deployed on Docker/Linux with 99%+ uptime
  )
}
```

**Reason:**
This is your **most technically sophisticated work** and it doesn't exist as a standalone project card. It's buried in Experience achievements. Recruiters scanning Projects often skip Experience. This work demonstrates LLM engineering, RAG architecture, and distributed systems — skills that are in extremely high demand. It deserves its own showcase.

---

## TASK 10 — Projects.tsx: Update Visionary Vest description to match CV
**File:** `components/Projects.tsx` (lines 58–102)
**Impact:** 🟡 MEDIUM

**CV says:**
```
- Platform enabling users to invest in content creators and share in their success.
- Implemented scalable backend logic, search functionality, and investment workflows.
```

**Portfolio currently has** more UX detail (creator discovery, real-time portfolio updates, revenue model) but no backend emphasis.

**Change:** Add a "Backend Highlights" section:
```
▸ Scalable backend logic with investment workflow orchestration
▸ Search functionality with smart filtering across creator profiles
▸ Success-sharing revenue model with real-time portfolio tracking
```

**Reason:**
The CV emphasizes backend scalability for this project, which signals backend engineering skill. The portfolio version focuses on UX features which is weaker for backend/AI roles. Best of both = UX features + backend callouts.

---

## TASK 11 — Projects.tsx: Upgrade Document Processing card with CV metrics
**File:** `components/Projects.tsx` (lines 104–149)
**Impact:** 🟠 HIGH

**CV adds these details missing from portfolio:**
- "Fully Dockerized architecture, enabling hassle-free setup and consistent deployment"
- "Multi-page reference resolution for inconsistent document formats"
- "Standardized JSON pipelines and REST APIs — reducing manual processing by 60%+"

**Add to project content:**
```
▸ Fully Dockerized architecture for consistent deployment across environments
▸ Multi-page reference resolution for inconsistent/fragmented documents
▸ Standardized JSON pipelines and REST APIs — reduced manual processing by 60%+
▸ NLP extraction achieving 99% tabular accuracy
```

**Reason:**
The **60%+ manual processing reduction** is a concrete business metric missing from the portfolio card. Docker deployment and multi-page resolution show production engineering depth. These are not in the current card and come directly from CV.

---

## TASK 12 — Skills.tsx: Add missing skills from CV
**File:** `components/Skills.tsx` (lines 14–36)
**Impact:** 🟠 HIGH

**Skills in CV that are MISSING from portfolio Skills component:**
| Skill | CV Category | Suggested Portfolio Category |
|-------|------------|------------------------------|
| FastAPI | Frameworks | Frameworks |
| Milvus | Databases | Databases |
| LLMs | Core Areas | Core |
| RAG | Core Areas | Core |
| NLP | Core Areas | Core |
| OCR | Core Areas | Core |
| Docker | Tools | Tools (new category) |
| Linux | Tools | Tools (new category) |
| Git | Tools | Tools (new category) |

**Also fix:** GraphQL is in `"Databases"` category — should be `"Tools"` or new `"APIs"` category.

**Reason:**
Your CV's Core Areas section (LLMs, RAG, NLP, OCR, Distributed Systems) is your biggest differentiator but **none of these appear** in the Skills section. A recruiter looking at your skills sees DSA/Algorithms/OOP but misses the AI/ML stack entirely. Docker/Linux/Git are explicitly called out in the CV as production tools and deserve a "Tools" category.

---

## TASK 13 — Skills.tsx: Update footer note
**File:** `components/Skills.tsx` (lines 328–334)
**Impact:** 🟢 LOW

**Current:**
```
Currently exploring Machine Learning & Data Science
```

**Change to:**
```
Actively building with LLMs · RAG · Vector Databases · Distributed Systems
```

**Reason:**
"Currently exploring" is passive and undersells active production work. Your CV shows these are not exploration topics — you are shipping production LLM systems. Replace with active framing that matches what you're actually doing.

---

## TASK 14 — EasterEggTerminal.tsx: Update `whoami`, `skills`, `experience` commands
**File:** `components/EasterEggTerminal.tsx` (lines 19–47)
**Impact:** 🟡 MEDIUM

**`whoami` — add summary line:**
```js
whoami: [
  "Yash Chavda",
  "Software Engineer — AI Systems, Backend Architecture, LLM Applications",
  "Silver Touch Technologies Ltd. — Ahmedabad",
  "B.E. Information Technology, LD College of Engineering (GPA: 8.92)",
  "github.com/yashchavda0",
]
```

**`skills` — add CV's Core Areas:**
```js
skills: [
  "Languages:   Python · Java · C++ · C",
  "Frameworks:  React · Next.js · Node.js · FastAPI · Express",
  "Databases:   PostgreSQL · MongoDB · MySQL · Milvus",
  "AI/ML:       LLMs · RAG · NLP · OCR · Multi-Agent Systems",
  "Tools:       Docker · Linux · Git · GraphQL",
]
```

**`experience` — update with new CV bullets:**
```js
experience: [
  "Silver Touch Technologies — Software Engineer (2024–Present)",
  "  • LLM multi-agent orchestration — 40% fewer routing errors",
  "  • NL→SQL via RAG — 70% SQL dependency cut, sub-2s latency",
  "  • Workflow automation engine — 50% config effort reduction",
  "  • OCR/NLP pipeline — 99% tabular accuracy",
  "  • Docker/Linux deployments — 99%+ uptime",
]
```

**Add `resume` command:**
```js
resume: [
  "📄 Download Resume:",
  "  /Yash_Chavda_CV.pdf  (right-click → Save As)",
  "  Or visit the Contact section for the download link.",
]
```

**Reason:**
The terminal is the most memorable recruiter interaction. When someone types `skills` or `experience` they should see the same strong CV framing, not an outdated list. Adding `resume` command turns a fun easter egg into a **functional conversion point**.

---

## TASK 15 — Add Resume PDF to public folder + download button
**File:** `public/Yash_Chavda_CV.pdf` + `components/Hero.tsx` + `components/Contact.tsx`
**Impact:** 🔴 CRITICAL

**Action:**
1. Copy `Yash Chavda_CV.pdf` → `public/Yash_Chavda_CV.pdf`
2. Add download CTA in Hero (alongside "View My Work"):
   ```jsx
   <a href="/Yash_Chavda_CV.pdf" download="Yash_Chavda_CV.pdf">
     Download Resume
   </a>
   ```
3. Add same link in Contact section

**Reason:**
Every recruiter's first action is "do you have a resume I can download?" There is **no resume download anywhere** in the current portfolio. This is the single highest-impact missing feature. A recruiter who can't grab a PDF will move on.

---

## TASK 16 — Contact.tsx: Fix LinkedIn URL
**File:** `components/Contact.tsx`
**Impact:** 🟠 HIGH

**Current:** Check if LinkedIn URL is `linkedin.com` (generic) vs correct profile URL
**Should be:** `https://linkedin.com/in/yashchavda` (matching Hero.tsx line 129)

**Reason:**
If the LinkedIn link in Contact goes to the generic LinkedIn homepage instead of your profile, every recruiter who clicks it hits a dead end. Verify and fix the URL to point to `linkedin.com/in/yashchavda`.

---

## TASK 17 — Experience.tsx: Add `period` start date for Silver Touch
**File:** `components/Experience.tsx` (line 15)
**Impact:** 🟡 MEDIUM

Already covered in Task 8 — **skip if already done.**

---

## Summary Table

| # | File | Task | Impact | Effort |
|---|------|------|--------|--------|
| 1 | Hero.tsx | Rewrite tagline from CV summary | 🔴 CRITICAL | 5 min |
| 2 | Hero.tsx | Update role flipper (remove "Enthusiast") | 🟠 HIGH | 2 min |
| 3 | About.tsx | Remove "aspiring", use CV bio | 🔴 CRITICAL | 5 min |
| 4 | About.tsx | New stats: 99% uptime, 70% SQL cut | 🟠 HIGH | 10 min |
| 5 | About.tsx | Add FastAPI + Milvus to tech marquee | 🟡 MEDIUM | 5 min |
| 6 | Experience.tsx | Replace Silver Touch achievements (add LLM/NL→SQL/Milvus) | 🔴 CRITICAL | 15 min |
| 7 | Experience.tsx | Add 2 new metric cards (70% SQL, 50% config, 99% uptime) | 🟠 HIGH | 10 min |
| 8 | Experience.tsx | Add start year "2024 – Present" | 🟡 MEDIUM | 2 min |
| 9 | Projects.tsx | Add 4th project: LLM Multi-Agent System | 🔴 CRITICAL | 20 min |
| 10 | Projects.tsx | Update Visionary Vest with backend emphasis | 🟡 MEDIUM | 10 min |
| 11 | Projects.tsx | Upgrade Document Processing with 60% metric + Docker | 🟠 HIGH | 10 min |
| 12 | Skills.tsx | Add FastAPI, Milvus, LLMs, RAG, NLP, OCR, Docker, Linux, Git | 🟠 HIGH | 15 min |
| 13 | Skills.tsx | Update footer note (active not exploring) | 🟢 LOW | 2 min |
| 14 | EasterEggTerminal.tsx | Sync whoami/skills/experience with CV + add `resume` cmd | 🟡 MEDIUM | 10 min |
| 15 | Hero.tsx + Contact.tsx + public/ | Add resume PDF download button | 🔴 CRITICAL | 15 min |
| 16 | Contact.tsx | Verify + fix LinkedIn URL | 🟠 HIGH | 2 min |

---

## Execution Order (recommended)

**Phase 1 — Critical fixes first (recruiter first impression)**
1, 3, 15 → Hero tagline + bio language + resume download

**Phase 2 — Experience upgrade (proof of work)**
6, 7, 8 → Silver Touch achievements + new metrics

**Phase 3 — Projects (showcase)**
9, 11, 10 → New LLM project card + Document Processing metrics

**Phase 4 — Skills alignment**
12, 2, 5 → Skills section + role flipper + tech marquee

**Phase 5 — Polish**
4, 13, 14, 16 → Stats, footer note, terminal, LinkedIn fix

---

## Content Kept From Portfolio (not in CV but too good to drop)
- POC deliveries for government and defense organizations → keep in Experience achievements
- Webhook-based APIs for third-party integrations → keep in Experience
- Visionary Vest UX details (real-time portfolio, revenue model) → merge with CV backend emphasis
- 40% Query Performance metric card → rename to "Vector Retrieval Boost" (matches Milvus)
- EasterEggTerminal `sudo hire yash` → keep, it's perfect
