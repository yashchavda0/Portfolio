"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfig } from "@/components/ConfigProvider";

const COMMANDS: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  whoami      — About Yash",
    "  skills      — Technical skills",
    "  projects    — Project list",
    "  experience  — Work history",
    "  resume      — Download resume",
    "  contact     — Get in touch",
    "  joke        — Random dev joke",
    "  clear       — Clear terminal",
    "  sudo hire yash — 😉",
  ],
  whoami: [
    "Yash Chavda",
    "Software Engineer — AI Systems, Backend Architecture, LLM Applications",
    "Silver Touch Technologies Ltd. — Ahmedabad",
    "B.E. Information Technology, LD College of Engineering (GPA: 8.92)",
    "github.com/yashchavda0",
  ],
  skills: [
    "Languages:   Python · Java · C++ · C",
    "Frameworks:  React · Next.js · Node.js · FastAPI · Express",
    "Databases:   PostgreSQL · MongoDB · MySQL · Milvus",
    "AI/ML:       LLMs · RAG · NLP · OCR · Multi-Agent Systems",
    "Tools:       Docker · Linux · Git · GraphQL",
  ],
  projects: [
    "1. LLM Multi-Agent Orchestration — Production AI system (Python, FastAPI, Milvus)",
    "2. Imaginify — AI-powered image SaaS (Next.js, Stripe, Cloudinary)",
    "3. Visionary Vest — Creator investment platform (MERN)",
    "4. Document Processing — OCR/NLP pipeline (Python, FastAPI)",
  ],
  experience: [
    "Silver Touch Technologies — Software Engineer (2024–Present)",
    "  • LLM multi-agent orchestration — 40% fewer routing errors",
    "  • NL→SQL via RAG — 70% SQL dependency cut, sub-2s latency",
    "  • Workflow automation engine — 50% config effort reduction",
    "  • OCR/NLP pipeline — 99% tabular accuracy",
    "  • Docker/Linux deployments — 99%+ uptime",
  ],
  resume: [
    "📄 Download Resume:",
    "  /Yash_Chavda_CV.pdf",
    "  Or visit the Contact section for the download link.",
  ],
  contact: [
    "Email:    yashchavda2004@gmail.com",
    "Phone:    +91 70467 83983",
    "GitHub:   github.com/yashchavda0",
    "LinkedIn: linkedin.com/in/yashchavda",
    "Location: Ahmedabad, India",
  ],
};

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A SQL query walks into a bar, sees two tables, and asks: 'Can I JOIN you?'",
  "There are 10 types of people: those who understand binary and those who don't.",
  "!false — It's funny because it's true.",
  "Why did the developer go broke? Because he used up all his cache.",
  "It works on my machine. ¯\\_(ツ)_/¯",
];

interface Line {
  id: number;
  text: string;
  type: "input" | "output" | "error" | "success";
}

export default function EasterEggTerminal() {
  const { flags } = useConfig();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    {
      id: 0,
      text: 'Welcome to Yash\'s terminal! Type "help" for commands.',
      type: "output",
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  // Toggle with triple backtick
  useEffect(() => {
    if (!flags.easterEggTerminal) return;
    let keyBuffer = "";
    let timeout: ReturnType<typeof setTimeout>;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "`") {
        keyBuffer += "`";
        clearTimeout(timeout);
        timeout = setTimeout(() => (keyBuffer = ""), 500);
        if (keyBuffer.length >= 3) {
          setOpen((prev) => !prev);
          keyBuffer = "";
        }
      } else {
        keyBuffer = "";
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      clearTimeout(timeout);
    };
  }, [flags.easterEggTerminal]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  const addLine = useCallback(
    (text: string, type: Line["type"] = "output") => {
      setLines((prev) => [...prev, { id: idRef.current++, text, type }]);
    },
    []
  );

  const processCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      addLine(`$ ${raw}`, "input");

      if (cmd === "clear") {
        setLines([]);
        return;
      }

      if (cmd === "sudo hire yash") {
        addLine("✅ Excellent choice! Sending offer letter...", "success");
        addLine("📧 yashchavda2004@gmail.com", "success");
        return;
      }

      if (cmd === "joke") {
        addLine(JOKES[Math.floor(Math.random() * JOKES.length)]);
        return;
      }

      const result = COMMANDS[cmd];
      if (result) {
        const arr = Array.isArray(result) ? result : [result];
        arr.forEach((line) => addLine(line));
      } else if (cmd) {
        addLine(`Command not found: ${cmd}. Type "help" for available commands.`, "error");
      }
    },
    [addLine]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    processCommand(input);
    setInput("");
  };

  if (!flags.easterEggTerminal) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-[480px] z-[9990] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <button
                  onClick={() => setOpen(false)}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[var(--color-text-muted)] text-xs font-mono ml-2">
                yash@portfolio ~ %
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-neutral-600 hover:text-neutral-400 text-xs"
            >
              ESC
            </button>
          </div>

          {/* Output area */}
          <div
            ref={scrollRef}
            className="h-64 overflow-y-auto p-4 font-mono text-sm space-y-1"
          >
            {lines.map((line) => (
              <div
                key={line.id}
                className={
                  line.type === "input"
                    ? "text-[var(--color-text-secondary)]"
                    : line.type === "error"
                    ? "text-red-400"
                    : line.type === "success"
                    ? "text-green-400"
                    : "text-[var(--color-text-muted)]"
                }
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center border-t border-white/5 px-4 py-2"
          >
            <span className="text-green-400 text-sm font-mono mr-2">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-[var(--color-text-secondary)] text-sm font-mono outline-none placeholder:text-[var(--color-text-muted)]"
              placeholder="Type a command..."
              autoFocus
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
