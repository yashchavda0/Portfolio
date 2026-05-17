"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { WarmCard } from "@/components/WarmCard";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 10, suffix: "+", label: "Projects Built" },
  { value: 99, suffix: "%", label: "System Uptime" },
  { value: 70, suffix: "%", label: "SQL Optimized" },
  { value: 1, suffix: "st", label: "Hackathon Won" },
];

function CountUp({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(tick);
  }, [target]);

  useEffect(() => {
    if (isInView) {
      animate();
    }
  }, [isInView, animate]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      <span className="text-ember-orange">{suffix}</span>
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <section id="about" className="py-16 md:py-32 px-6 md:px-16 lg:px-24 border-t border-stone-100">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Section Label */}
        <motion.p
          variants={fadeUp}
          className="section-label text-center mb-4"
        >
          ABOUT
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={fadeUp}
          className="font-serif font-semibold tracking-tight text-stone-900 text-xl md:text-4xl text-center leading-snug max-w-2xl mx-auto mb-10 md:mb-14"
        >
          I build scalable backend systems and AI-powered applications with a
          focus on clean architecture
          <span className="text-ember-red">.</span>
        </motion.h2>

        {/* Two-column grid */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          {/* Left column — Bio */}
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <p className="text-sm text-stone-500 leading-relaxed">
              Currently at{" "}
              <span className="text-stone-900 font-medium">
                Silver Touch Technologies
              </span>{" "}
              building enterprise solutions.{" "}
              <span className="text-stone-900 font-medium">
                B.E. in IT from LD College of Engineering
              </span>{" "}
              with an{" "}
              <span className="text-stone-900 font-medium">8.92 GPA</span>, and a{" "}
              <span className="text-stone-900 font-medium">Minor in AI/ML</span>.
            </p>

            {/* Pills */}
            <div className="flex flex-wrap gap-2.5 mt-1">
              <span className="px-3.5 py-1.5 text-xs rounded-full bg-white border border-cream-border text-stone-600">
                Ahmedabad, India
              </span>

            </div>
          </motion.div>

          {/* Right column — 2x2 Stat Cards */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 gap-3.5"
          >
            {stats.map((stat, i) => (
              <WarmCard key={stat.label} className="flex flex-col items-center justify-center text-center p-5">
                <motion.span
                  className="text-2xl font-bold text-stone-900"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 * i }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </motion.span>
                <span className="text-[11px] text-stone-400 mt-1.5">
                  {stat.label}
                </span>
              </WarmCard>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
