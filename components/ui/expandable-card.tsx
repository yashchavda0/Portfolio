"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconMaximize, IconCode, IconArrowUpRight } from "@tabler/icons-react";

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
    category?: string;
    stat?: string;
    cardIndex?: number;
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
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[#18181bec] sm:rounded-3xl overflow-hidden border border-white/[0.08] backdrop-blur-xl"
            >
              {/* Expanded modal banner */}
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <div
                  className="w-full h-52 relative overflow-hidden flex flex-col justify-between p-5"
                  style={{
                    background: `linear-gradient(135deg, rgba(var(--color-primary-rgb),0.12) 0%, rgba(var(--color-secondary-rgb),0.06) 100%)`,
                  }}
                >
                  <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: `radial-gradient(circle, rgba(var(--color-primary-rgb),1) 1px, transparent 1px)`,
                    backgroundSize: "18px 18px",
                  }} />
                  <div className="relative z-10 flex items-center justify-between">
                    {active.category && (
                      <span
                        className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{
                          color: "var(--color-primary)",
                          background: `rgba(var(--color-primary-rgb),0.12)`,
                          border: `1px solid rgba(var(--color-primary-rgb),0.3)`,
                        }}
                      >
                        {active.category}
                      </span>
                    )}
                    {active.ctaLink && (
                      <a
                        href={active.ctaLink}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-xs text-white/50 hover:text-white/80 transition-colors"
                      >
                        GitHub <IconArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <div className="relative z-10 flex items-center justify-center gap-4 flex-wrap">
                    {active.tagsWithIcons?.slice(0, 5).map((tag, i) => {
                      const Icon = tag.icon;
                      const isPrimary = i % 2 === 0;
                      return (
                        <div key={tag.name} className="flex flex-col items-center gap-1.5">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{
                              background: isPrimary ? `rgba(var(--color-primary-rgb),0.12)` : `rgba(var(--color-secondary-rgb),0.12)`,
                              border: isPrimary ? `1px solid rgba(var(--color-primary-rgb),0.25)` : `1px solid rgba(var(--color-secondary-rgb),0.25)`,
                              color: isPrimary ? "var(--color-primary)" : "var(--color-secondary)",
                            }}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] text-white/40 font-medium">{tag.name}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-50"
                    style={{ background: `linear-gradient(90deg, transparent, var(--color-primary), var(--color-secondary), transparent)` }}
                  />
                </div>
              </motion.div>
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

      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="p-4 flex flex-col bg-transparent border border-white/[0.06] rounded-2xl cursor-pointer hover:bg-white/[0.03] transition-colors group relative backdrop-blur-[2px]"
            style={{ borderColor: undefined }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(var(--color-primary-rgb),0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}        
          >
            {/* Expand affordance — always visible, brightens on hover */}
            <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] group-hover:bg-white/[0.07] group-hover:border-[var(--color-primary)]/30 transition-all">
              <IconMaximize className="w-3 h-3 text-white/30 group-hover:text-[var(--color-primary)] transition-colors" />
              <span className="text-[10px] text-white/30 group-hover:text-white/60 transition-colors font-medium">Expand</span>
            </div>

            {/* Card Visual Banner */}
            <motion.div layoutId={`image-${card.title}-${id}`}>
              <div
                className="w-full h-44 rounded-xl mb-4 relative overflow-hidden flex flex-col justify-between p-4"
                style={{
                  background: `linear-gradient(135deg, rgba(var(--color-primary-rgb),0.10) 0%, rgba(var(--color-secondary-rgb),0.04) 100%)`,
                  border: `1px solid rgba(var(--color-primary-rgb),0.15)`,
                }}
              >
                {/* Dot grid */}
                <div className="absolute inset-0 opacity-[0.06]" style={{
                  backgroundImage: `radial-gradient(circle, rgba(var(--color-primary-rgb),1) 1px, transparent 1px)`,
                  backgroundSize: "18px 18px",
                }} />
                {/* Top row: category badge */}
                <div className="relative z-10 flex items-center justify-between">
                  {card.category && (
                    <span
                      className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{
                        color: "var(--color-primary)",
                        background: `rgba(var(--color-primary-rgb),0.12)`,
                        border: `1px solid rgba(var(--color-primary-rgb),0.28)`,
                      }}
                    >
                      {card.category}
                    </span>
                  )}
                  {card.stat && (
                    <span className="text-xs font-mono" style={{ color: "var(--color-secondary)", opacity: 0.7 }}>{card.stat}</span>
                  )}
                </div>
                {/* Center: tech icons */}
                <div className="relative z-10 flex items-center justify-center gap-3 flex-wrap">
                  {card.tagsWithIcons?.slice(0, 4).map((tag, i) => {
                    const Icon = tag.icon;
                    const isPrimary = i % 2 === 0;
                    return (
                      <motion.div
                        key={tag.name}
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex flex-col items-center gap-1"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: isPrimary ? `rgba(var(--color-primary-rgb),0.12)` : `rgba(var(--color-secondary-rgb),0.12)`,
                            border: isPrimary ? `1px solid rgba(var(--color-primary-rgb),0.22)` : `1px solid rgba(var(--color-secondary-rgb),0.22)`,
                            color: isPrimary ? "var(--color-primary)" : "var(--color-secondary)",
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] text-white/35 font-medium">{tag.name}</span>
                      </motion.div>
                    );
                  })}
                  {(!card.tagsWithIcons || card.tagsWithIcons.length === 0) && (
                    <div style={{ color: "var(--color-primary)", opacity: 0.35 }}>
                      <IconCode className="w-10 h-10" />
                    </div>
                  )}
                </div>
                {/* Bottom: glow line using both theme colors */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60"
                  style={{ background: `linear-gradient(90deg, transparent, var(--color-primary), var(--color-secondary), transparent)` }}
                />
              </div>
            </motion.div>
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
