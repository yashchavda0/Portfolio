"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryEntry {
  cmd: string;
  out: string;
}

const COMMANDS: Record<string, string> = {
  whoami: "Yash Chavda — Software Engineer | AI Systems | Backend Architect",
  skills:
    "Python, TypeScript, React, Next.js, Node.js, LangChain, OpenAI, PostgreSQL, Docker, AWS",
  projects:
    "LLM Orchestration · Imaginify · Visionary Vest · Document Processing",
  experience:
    "Trainee Software Engineer @ Silver Touch Technologies (2024–Present)",
  resume: "Download: /resume.pdf",
  contact: "Email: yashchavda@email.com | GitHub: @yashchavda0",
  joke: "Why do programmers prefer dark mode? Because light attracts bugs.",
  help: "Commands: whoami, skills, projects, experience, resume, contact, joke, clear, exit",
  "sudo hire yash": "Permission granted. Let's build something together.",
};

function getOutput(input: string): string {
  const trimmed = input.trim().toLowerCase();
  if (trimmed in COMMANDS) return COMMANDS[trimmed];
  return `Command not found: ${input.trim()}. Type 'help' for commands.`;
}

export default function DevConsole() {
  const [open, setOpen] = useState(false);
  const [buffer, setBuffer] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const keyBuffer = useRef("");

  // Hidden trigger: listens for keystrokes, opens on "help" or "console.log()"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open) return;

      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      keyBuffer.current += e.key.toLowerCase();
      // Keep only the last 20 characters
      if (keyBuffer.current.length > 20) {
        keyBuffer.current = keyBuffer.current.slice(-20);
      }

      if (
        keyBuffer.current.endsWith("help") ||
        keyBuffer.current.endsWith("console.log()")
      ) {
        setOpen(true);
        setHistory([]);
        keyBuffer.current = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        setBuffer("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Auto-focus input when console opens or history changes
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open, history]);

  // Auto-scroll output area to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = buffer.trim();
      if (!trimmed) return;

      if (trimmed.toLowerCase() === "exit") {
        setOpen(false);
        setBuffer("");
        return;
      }

      if (trimmed.toLowerCase() === "clear") {
        setHistory([]);
        setBuffer("");
        return;
      }

      const output = getOutput(trimmed);
      setHistory((prev) => [...prev, { cmd: trimmed, out: output }]);
      setBuffer("");
    },
    [buffer]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="dev-console"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none"
        >
          <div className="w-full max-w-3xl pointer-events-auto bg-stone-900 rounded-2xl border border-stone-700 shadow-2xl overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-700">
              {/* Traffic light dots */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setBuffer("");
                  }}
                  className="h-3 w-3 rounded-full bg-red-500 hover:brightness-125 transition-all"
                  aria-label="Close console"
                />
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <span className="font-mono text-xs text-stone-400">
                dev-console
              </span>
            </div>

            {/* Output area */}
            <div
              ref={outputRef}
              className="max-h-48 overflow-y-auto px-4 py-3 space-y-1"
            >
              {history.length === 0 && (
                <p className="font-mono text-xs text-stone-500">
                  Type &quot;help&quot; for available commands.
                </p>
              )}
              {history.map((entry, i) => (
                <div key={i}>
                  <p className="font-mono text-xs text-stone-400">
                    $ {entry.cmd}
                  </p>
                  <p className="font-mono text-xs text-green-400">{entry.out}</p>
                </div>
              ))}
            </div>

            {/* Input line */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-stone-700 px-4 py-3"
            >
              <span className="font-mono text-xs text-stone-500 select-none">
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={buffer}
                onChange={(e) => setBuffer(e.target.value)}
                className="flex-1 bg-transparent font-mono text-xs text-stone-100 outline-none placeholder:text-stone-600"
                placeholder="Type a command..."
                autoFocus
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
