# Real-Time Features Plan
> Option A: "Ask Yash Anything" AI Chat Widget
> Option B: Live GitHub Activity Feed
> Date: 2026-03-27

---

## OPTION A — "Ask Yash Anything" AI Chat Widget

### What the visitor sees
- A floating `💬` button fixed to the bottom-right of every page
- Clicking it opens a chat panel (like a support chat, but smarter)
- They type any question about you, Claude streams the answer live
- Typing indicator while generating, streamed word-by-word output
- Pre-loaded with your full CV context — can answer anything about skills, projects, availability

### Example interactions
```
Recruiter: "Has Yash worked with LLMs in production?"
Yash AI:   "Yes — at Silver Touch Technologies, Yash engineered a
            multi-agent orchestration system using LLMs with dynamic
            task routing, reducing incorrect tool usage by 40%..."

Recruiter: "What's his notice period?"
Yash AI:   "Yash is currently open to opportunities and available
            to discuss joining timelines. You can reach him directly
            at yashchavda2004@gmail.com."

Recruiter: "Show me his strongest project"
Yash AI:   "His most technically complex work is the LLM Multi-Agent
            Orchestration system — it includes NL→SQL with RAG,
            workflow automation, and Milvus vector search..."
```

---

### Files to create

```
app/api/chat/route.ts              ← Claude streaming API endpoint
components/ChatWidget.tsx          ← Floating button + chat panel UI
components/ui/chat-bubble.tsx      ← Individual message component
app/layout.tsx                     ← Add <ChatWidget /> globally
.env.local                         ← ANTHROPIC_API_KEY
```

---

### API Route — `app/api/chat/route.ts`

**Method:** POST
**Input:** `{ messages: [{role, content}] }`
**Output:** Streaming text (Server-Sent Events)

**System prompt loaded into Claude (pre-baked context):**
```
You are Yash Chavda's portfolio assistant. Answer questions about Yash
concisely and professionally. Never make up information.

About Yash:
- Software Engineer at Silver Touch Technologies Ltd., Ahmedabad
- Specializes in AI systems, backend architecture, LLM-driven applications
- B.E. Information Technology, LD College (GPA: 8.92, AI/ML Minor)

Key Work:
- Built LLM multi-agent orchestration system → 40% fewer routing errors
- Designed NL→SQL via RAG → 70% SQL dependency cut, sub-2s latency
- Workflow automation engine → 50% config effort reduction
- Milvus vector search → 40% semantic retrieval improvement
- OCR/NLP pipeline → 99% tabular accuracy
- Docker/Linux deployments → 99%+ uptime

Skills: Python, FastAPI, Next.js, React, Node.js, PostgreSQL, MongoDB,
        Milvus, GraphQL, Docker, Linux, Git, LLMs, RAG, NLP, OCR

Projects: LLM Multi-Agent System, Document Processing Platform,
          Visionary Vest (MERN), Imaginify (AI image SaaS)

Contact: yashchavda2004@gmail.com | github.com/yashchavda0
Available for: Full-time Software Engineering, Backend, AI/ML roles

Rules:
- Keep answers under 4 sentences unless a list is clearly better
- If asked about salary/compensation, redirect to email
- Always end with a helpful nudge (check projects, contact, etc.)
- Speak as "Yash" in third person — you are his assistant, not him
```

**Packages needed:**
```bash
npm install @anthropic-ai/sdk
```

**`.env.local` key needed:**
```
ANTHROPIC_API_KEY=sk-ant-...
```

---

### Component — `components/ChatWidget.tsx`

**States:**
- `closed` → just the floating `💬` button
- `open` → chat panel slides up from bottom-right
- `loading` → typing indicator (3 pulsing dots)
- `streaming` → live text appearing word by word

**UI Structure:**
```
┌─────────────────────────────┐
│ 🤖 Ask Yash Anything    [×] │  ← header
├─────────────────────────────┤
│                             │
│  [Bot bubble]: Hi! Ask me   │  ← message area (scrollable)
│  anything about Yash —      │
│  skills, projects, or how   │
│  to reach him.              │
│                             │
│  [User bubble]: Has he      │
│  worked with LLMs?          │
│                             │
│  [Bot bubble]: Yes, at      │  ← streaming, cursor blinking
│  Silver Touch he built▌     │
│                             │
├─────────────────────────────┤
│ [input box]      [Send →]   │  ← input area
└─────────────────────────────┘
```

**Visual details:**
- Panel: `w-80 h-96`, dark background matching portfolio theme
- Floating button: primary color glow, subtle pulse animation
- Bot messages: left-aligned, muted background
- User messages: right-aligned, primary color tint
- Streaming cursor: blinking `▌` at end of incomplete message
- Smooth slide-up animation when opening (framer-motion)

**Suggested starter messages shown as chips:**
```
"What's his strongest skill?"
"Tell me about his AI work"
"Is he open to work?"
```

---

### Layout integration — `app/layout.tsx`

Add `<ChatWidget />` inside the root layout so it appears on all pages, above the navigation z-index layer.

---

### Cost estimate
- Claude Haiku (fastest, cheapest): ~$0.0003 per conversation
- For 1000 recruiter conversations/month: ~$0.30
- Recommended model: `claude-haiku-4-5-20251001` for speed

---
---

## OPTION B — Live GitHub Activity Feed

### What the visitor sees
A card in the About section (or a dedicated strip) showing your real GitHub activity:
```
⚡ Live GitHub Activity
🟢 Updating every 30s

  ● pushed 2 commits to portfolio          2 hours ago
  ● opened issue in lm-orchestration       yesterday
  ● starred anthropics/anthropic-sdk       2 days ago
  ● pushed 5 commits to doc-processing     3 days ago
```
A small green pinging dot confirms it's live. Timestamps auto-update.

---

### Files to create

```
app/api/github/route.ts            ← Proxy + cache GitHub API response
components/GitHubFeed.tsx          ← Feed UI component
```

Add `<GitHubFeed />` into `components/About.tsx` as a new BentoGrid card, or as a standalone strip below the grid.

---

### API Route — `app/api/github/route.ts`

**Method:** GET
**What it does:**
1. Fetches `https://api.github.com/users/yashchavda0/events/public`
2. Filters to useful event types: `PushEvent`, `CreateEvent`, `IssuesEvent`, `WatchEvent` (stars), `PullRequestEvent`
3. Formats into clean display objects
4. Caches response for 60 seconds (Next.js `revalidate`) — avoids rate limits
5. Returns last 8 events

**No auth token needed** — GitHub public API allows 60 req/hour unauthenticated. With 60s caching on the server, this effectively becomes unlimited.

**Optional:** Add a `GITHUB_TOKEN` env var to raise limit to 5000 req/hour if needed.

**Response shape:**
```ts
[{
  type: "push",
  repo: "yashchavda0/portfolio",
  message: "pushed 3 commits",
  time: "2 hours ago",
  icon: "⚡",
  url: "https://github.com/yashchavda0/portfolio"
}]
```

**Event type → label mapping:**
| GitHub Event | Display Label | Icon |
|---|---|---|
| PushEvent | pushed N commits to | ⚡ |
| CreateEvent (branch) | created branch in | 🌿 |
| WatchEvent | starred | ⭐ |
| IssuesEvent | opened issue in | 📝 |
| PullRequestEvent | opened PR in | 🔀 |
| ForkEvent | forked | 🍴 |

---

### Component — `components/GitHubFeed.tsx`

**Polling:** `useEffect` with `setInterval` every 30 seconds — fetches `/api/github`, replaces state
**New items:** When new events appear, they slide in from top with a subtle animation
**Timestamps:** Relative time ("2 hours ago") recalculates every minute client-side

**UI Layout (BentoGrid card style):**
```
┌──────────────────────────────────────────────┐
│ ⚡ Live Activity    🟢 ●  github.com/yashchavda0│
├──────────────────────────────────────────────┤
│ ⚡ pushed 3 commits → portfolio     2h ago    │
│ 📝 opened issue → lm-engine         1d ago   │
│ ⭐ starred → anthropic-sdk          2d ago    │
│ ⚡ pushed 5 commits → doc-proc      3d ago    │
│ 🌿 created branch → feature/rag     4d ago    │
└──────────────────────────────────────────────┘
```

**Skeleton loading state:** While first fetch is in progress, show 4 shimmer placeholder bars — no layout shift.

**Empty / error state:** "No recent activity found. View profile →" with GitHub link.

---

### Where it goes

**Option 1 (recommended):** New BentoGrid card in `About.tsx` spanning full width — below the existing 5 cards, full 3-column span. Title: "Live Activity".

**Option 2:** A thin horizontal strip between the About and Experience sections — always visible while scrolling past.

---

### No API keys needed for basic setup
GitHub public API works without authentication. Just the username `yashchavda0` in the URL is enough.

---
---

## Combined Implementation Order

### Step 1 — GitHub Feed (no keys, ship fast)
1. Create `app/api/github/route.ts`
2. Create `components/GitHubFeed.tsx`
3. Add card to `About.tsx` BentoGrid
4. Test with real GitHub data

### Step 2 — AI Chat Widget (needs API key)
1. Add `ANTHROPIC_API_KEY` to `.env.local`
2. Install `@anthropic-ai/sdk`
3. Create `app/api/chat/route.ts`
4. Create `components/ChatWidget.tsx`
5. Register in `app/layout.tsx`
6. Test streaming end-to-end

---

## Summary

| Feature | Keys Needed | Packages | Time to Build | Wow Factor |
|---|---|---|---|---|
| GitHub Feed | None | None | ~1 hour | 🟡 Medium |
| AI Chat Widget | ANTHROPIC_API_KEY | `@anthropic-ai/sdk` | ~2 hours | 🔴 High |
| Both combined | ANTHROPIC_API_KEY | `@anthropic-ai/sdk` | ~3 hours | 🔴 Very High |
