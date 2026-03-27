"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {
  FiCode,
  FiMapPin,
  FiZap,
  FiHeart,
} from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiPython,
  SiTypescript,
  SiPostgresql,
  SiFastapi,
  SiMilvus,
  SiDocker,
} from "react-icons/si";

const techItems = [
  { name: "React", icon: <SiReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Python", icon: <SiPython /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "FastAPI", icon: <SiFastapi /> },
  { name: "Milvus", icon: <SiMilvus /> },
  { name: "Docker", icon: <SiDocker /> },
];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, 50);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <div className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            About{" "}
            <span style={{ color: "var(--color-primary)" }}>Me</span>
          </h2>
          <div
            className="w-16 h-0.5 mx-auto rounded-full"
            style={{ background: "var(--color-primary)" }}
          />
        </motion.div>

        <BentoGrid className="md:auto-rows-[14rem]">
          {/* Bio — large card */}
          <BentoGridItem
            className="md:col-span-2"
            title="The Person Behind the Code"
            description={
              <TextGenerateEffect
                words="Software Engineer specializing in AI systems and backend architecture. I build production-grade LLM-driven applications, multi-agent orchestration systems, and scalable data pipelines. Strong focus on performance, reliability, and measurable impact."
                className="text-sm font-normal text-neutral-400"
                duration={0.3}
              />
            }
            icon={<FiCode className="w-4 h-4" style={{ color: "var(--color-primary)" }} />}
          />

          {/* Stats card */}
          <BentoGridItem
            title="By the Numbers"
            description={
              <div className="flex flex-col gap-2.5 mt-2">
                <div className="flex items-center gap-3">
                  <FiCode className="w-4 h-4 text-[var(--color-text-muted)]" />
                  <span className="text-2xl font-bold text-[var(--color-text-primary)]">
                    <CountUp target={10} suffix="+" />
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">Projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiZap className="w-4 h-4 text-[var(--color-text-muted)]" />
                  <span className="text-2xl font-bold text-[var(--color-text-primary)]">
                    <CountUp target={99} suffix="%+" />
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">Uptime</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiZap className="w-4 h-4 text-[var(--color-text-muted)]" />
                  <span className="text-2xl font-bold text-[var(--color-text-primary)]">
                    <CountUp target={70} suffix="%" />
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">SQL Reduced</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaTrophy className="w-4 h-4 text-[var(--color-text-muted)]" />
                  <span className="text-2xl font-bold text-[var(--color-text-primary)]">
                    <CountUp target={1} />
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">Hackathon Won</span>
                </div>
              </div>
            }
          />

          {/* Location card */}
          <BentoGridItem
            title="Based In"
            description={
              <div className="flex items-center gap-2 mt-2">
                <FiMapPin style={{ color: "var(--color-secondary)" }} />
                <span className="text-[var(--color-text-secondary)]">Ahmedabad, India</span>
              </div>
            }
            header={
              <div className="flex-1 rounded-lg bg-gradient-to-br from-white/[0.02] to-white/[0.05] flex items-center justify-center text-4xl">
                🇮🇳
              </div>
            }
          />

          {/* Currently card */}
          <BentoGridItem
            title="Currently"
            description={
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: "var(--color-secondary)" }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ background: "var(--color-secondary)" }}
                    />
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">Open to opportunities</span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  Building at <span className="font-medium text-[var(--color-text-primary)]">Silver Touch Technologies</span>
                </p>
              </div>
            }
            icon={<FiZap className="w-4 h-4" style={{ color: "var(--color-secondary)" }} />}
          />

          {/* Fun / Interests card */}
          <BentoGridItem
            title="When I'm Not Coding"
            description={
              <div className="flex flex-wrap gap-2 mt-2">
                {["Problem Solving", "Chess", "Tech Blogs", "Open Source"].map(
                  (item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs rounded-full bg-white/[0.05] border border-white/[0.08] text-neutral-400"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            }
            icon={<FiHeart className="w-4 h-4" style={{ color: "var(--color-primary)" }} />}
          />
        </BentoGrid>

        {/* Tech Marquee */}
        <div className="mt-12">
          <InfiniteMovingCards
            items={techItems}
            direction="left"
            speed="normal"
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
