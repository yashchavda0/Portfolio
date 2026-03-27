"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { GlowingBorder } from "@/components/ui/glowing-effect";
import { FiChevronDown } from "react-icons/fi";

const experiences = [
  {
    title: "Trainee Software Engineer",
    company: "Silver Touch Technologies Ltd.",
    location: "Ahmedabad",
    period: "2024 – Present",
    description: "Building production AI systems with cutting-edge tech stack.",
    metrics: [
      { label: "Tabular Accuracy", value: 99, suffix: "%", emoji: "🎯" },
      { label: "SQL Dependency Cut", value: 70, suffix: "%", emoji: "🧠" },
      { label: "Config Effort Reduced", value: 50, suffix: "%", emoji: "⚙️" },
      { label: "Vector Retrieval Boost", value: 40, suffix: "%", emoji: "⚡" },
      { label: "System Uptime", value: 99, suffix: "%+", emoji: "🚀" },
    ],
    achievements: [
      "Engineered LLM-driven multi-agent orchestration system with dynamic task routing — reduced incorrect tool usage by 40%",
      "Designed Natural Language → SQL system using RAG-based schema understanding — cut SQL dependency by 70% at sub-2s latency",
      "Built workflow automation engine with triggers, hooks, and rule-based execution — reduced manual configuration effort by 50%",
      "Developed vector search systems using Milvus — improved semantic retrieval performance by 40%",
      "Developed NLP/OCR pipelines achieving 99% tabular accuracy for enterprise document processing",
      "Delivered production B2B AI systems using Next.js, Python, FastAPI, GraphQL, and PostgreSQL",
      "Deployed systems via Docker and Linux ensuring 99%+ uptime",
      "Delivered POCs for government and defense organizations",
    ],
    tech: ["Next.js", "Python", "FastAPI", "GraphQL", "PostgreSQL", "Milvus"],
  },
  {
    title: "MERN Stack Intern",
    company: "LD College of Engineering",
    location: "Ahmedabad",
    period: "2023",
    description: "Developed dynamic solutions for educational workflows.",
    metrics: [
      { label: "Manual Tasks Reduced", value: 30, suffix: "%", emoji: "📉" },
      { label: "Team Collaboration", value: 3, suffix: "+", emoji: "👥" },
    ],
    achievements: [
      "Developed dynamic dashboard with real-time email notifications",
      "Built Excel-based data extraction and linking systems",
      "Reduced manual follow-ups by 30%",
      "Collaborated using Git with 3+ contributors",
      "Enforced modular, object-oriented coding practices",
    ],
    tech: ["React", "Node.js", "MongoDB", "Express"],
  },
];

function AnimatedMetric({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useState(() => {
    // We'll use useInView below
  });

  // Simple count-up
  const countRef = useRef(false);
  if (isInView && !countRef.current) {
    countRef.current = true;
    let current = 0;
    const step = value / 30;
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, 40);
  }

  return (
    <span ref={ref} className="tabular-nums font-bold text-lg" style={{ color: "var(--color-secondary)" }}>
      {count}
      {suffix}
    </span>
  );
}

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState(0);

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
            Experience{" "}
            <span style={{ color: "var(--color-primary)" }}>Timeline</span>
          </h2>
          <div
            className="w-16 h-0.5 mx-auto rounded-full"
            style={{ background: "var(--color-primary)" }}
          />
        </motion.div>

        <TracingBeam>
          <div className="flex flex-col gap-10 pl-8 md:pl-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlowingBorder className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--color-text-secondary)]">
                        {exp.title}
                      </h3>
                      <p
                        className="font-medium text-sm"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {exp.company}
                      </p>
                      <p className="text-[var(--color-text-muted)] text-xs mt-1">
                        {exp.location} · {exp.period}
                      </p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-neutral-400">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-neutral-400 text-sm mb-5">
                    {exp.description}
                  </p>

                  {/* Metric Cards */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    {exp.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex items-center gap-2 rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2"
                      >
                        <span className="text-base">{metric.emoji}</span>
                        <AnimatedMetric
                          value={metric.value}
                          suffix={metric.suffix}
                        />
                        <span className="text-xs text-[var(--color-text-muted)]">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Expand toggle */}
                  <button
                    onClick={() =>
                      setExpandedIndex(expandedIndex === index ? -1 : index)
                    }
                    className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors mb-3"
                  >
                    <span>
                      {expandedIndex === index
                        ? "Hide details"
                        : "Show contributions"}
                    </span>
                    <motion.span
                      animate={{
                        rotate: expandedIndex === index ? 180 : 0,
                      }}
                    >
                      <FiChevronDown className="w-3 h-3" />
                    </motion.span>
                  </button>

                  {/* Expandable Achievements */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedIndex === index ? "auto" : 0,
                      opacity: expandedIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 pt-3 border-t border-white/[0.05]">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={
                            expandedIndex === index
                              ? { opacity: 1, x: 0 }
                              : {}
                          }
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start text-sm text-neutral-400"
                        >
                          <span
                            className="mr-2 mt-0.5 text-xs"
                            style={{ color: "var(--color-primary)" }}
                          >
                            ▸
                          </span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/[0.05]">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="relative inline-flex overflow-hidden rounded-full p-[1px]"
                      >
                        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--color-primary)_0%,transparent_50%,var(--color-primary)_100%)] opacity-30" />
                        <span className="inline-flex items-center rounded-full bg-[var(--color-card-bg)] px-3 py-1 text-xs text-neutral-300 backdrop-blur-3xl">
                          {tech}
                        </span>
                      </span>
                    ))}
                  </div>
                </GlowingBorder>
              </motion.div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </div>
  );
}
