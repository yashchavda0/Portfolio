"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconMaximize, IconCode } from "@tabler/icons-react";

export function ExpandableCard({
  cards,
  className,
}: {
  cards: {
    title: string;
    description: string;
    src?: string;
    ctaText?: string;
    ctaLink?: string;
    content: React.ReactNode;
    tags?: string[];
    tagsWithIcons?: { name: string; icon: React.ComponentType<{ className?: string }> }[];
  }[];
  className?: string;
}) {
  const [active, setActive] = useState<(typeof cards)[number] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[70]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-[80]"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[var(--color-card-bg)] sm:rounded-3xl overflow-hidden border border-white/[0.08]"
            >
              {active.src && (
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <div className="w-full h-60 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center relative overflow-hidden">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: `radial-gradient(circle, var(--color-primary) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                    {/* Tech icon instead of just first letter */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <IconCode className="w-12 h-12 text-[var(--color-primary)]/40" />
                      <span className="text-sm font-semibold text-[var(--color-text-primary)]/20 uppercase tracking-wider">
                        {active.title}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div className="p-6">
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="font-bold text-xl text-[var(--color-text-secondary)]"
                >
                  {active.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${active.description}-${id}`}
                  className="text-[var(--color-text-muted)] mt-2"
                >
                  {active.description}
                </motion.p>
                {active.tagsWithIcons && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {active.tagsWithIcons.map((tag) => {
                      const IconComponent = tag.icon;
                      return (
                        <span
                          key={tag.name}
                          className="px-3 py-1 text-xs rounded-full bg-white/[0.05] border border-white/[0.08] text-[var(--color-text-muted)] inline-flex items-center gap-1.5"
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                          {tag.name}
                        </span>
                      );
                    })}
                  </div>
                )}
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[var(--color-text-muted)] text-sm mt-4 overflow-auto max-h-[40vh] pr-2"
                >
                  {active.content}
                </motion.div>
                {active.ctaLink && (
                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="mt-4 inline-flex px-4 py-2 text-sm rounded-full bg-[var(--color-primary)] text-black font-semibold"
                  >
                    {active.ctaText || "View Project"}
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col bg-white/[0.02] border border-white/[0.05] rounded-xl cursor-pointer hover:bg-white/[0.04] transition-colors group relative"
          >
            {/* Expand Icon */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <IconMaximize className="w-5 h-5 text-[var(--color-primary)]" />
            </div>

            {card.src && (
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <div className="w-full h-40 rounded-lg bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 flex items-center justify-center mb-4 relative overflow-hidden">
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(circle, var(--color-primary) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                  {/* Tech icon instead of just first letter */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <IconCode className="w-10 h-10 text-[var(--color-primary)]/30 group-hover:text-[var(--color-primary)]/50 transition-colors" />
                    <span className="text-xs font-semibold text-[var(--color-text-primary)]/20 group-hover:text-[var(--color-text-primary)]/40 transition-colors uppercase tracking-wider">
                      Project
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
            <motion.h3
              layoutId={`title-${card.title}-${id}`}
              className="font-semibold text-[var(--color-text-secondary)] text-lg"
            >
              {card.title}
            </motion.h3>
            <motion.p
              layoutId={`description-${card.description}-${id}`}
              className="text-neutral-500 text-sm mt-2"
            >
              {card.description}
            </motion.p>
            {card.tagsWithIcons && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {card.tagsWithIcons.slice(0, 4).map((tag) => {
                  const IconComponent = tag.icon;
                  return (
                    <span
                      key={tag.name}
                      className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.05] text-[var(--color-text-muted)] inline-flex items-center gap-1"
                    >
                      <IconComponent className="w-3 h-3" />
                      {tag.name}
                    </span>
                  );
                })}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
}

const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);
