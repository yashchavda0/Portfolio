"use client";

import { motion } from "framer-motion";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { LampEffect } from "@/components/ui/lamp-effect";
import { FiGithub } from "react-icons/fi";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { SiNextdotjs, SiStripe, SiCloudinary, SiNodedotjs, SiMongodb, SiExpress, SiFastapi, SiPostgresql, SiPython } from "react-icons/si";
import { FaReact } from "react-icons/fa";

const projects = [
  {
    title: "LLM Multi-Agent Orchestration",
    description:
      "Production AI system with dynamic task routing, NL→SQL, and workflow automation.",
    src: "placeholder",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/yashchavda0",
    tags: ["Python", "FastAPI", "LLMs", "RAG", "Milvus"],
    tagsWithIcons: [
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "LLMs", icon: SiFastapi },
      { name: "RAG", icon: SiFastapi },
    ],
    content: (
      <div className="space-y-3">
        <p>
          Production-grade multi-agent orchestration system powering enterprise AI workflows.
        </p>
        <div className="space-y-2">
          <h4 className="text-[var(--color-text-secondary)] font-medium text-sm">
            Key Features:
          </h4>
          <ul className="space-y-1.5 text-sm">
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              Multi-agent orchestration with dynamic task routing — 40% reduction in incorrect tool usage
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              NL→SQL system using RAG-based schema understanding — 70% less manual SQL, sub-2s latency
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              Workflow automation engine with triggers, hooks, rule-based execution — 50% less manual config
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              Milvus vector search — 40% improvement in semantic retrieval
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Imaginify",
    description:
      "AI-powered image SaaS platform with secure payments and advanced search.",
    src: "placeholder",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/yashchavda0",
    tags: ["Next.js", "React", "Stripe", "Cloudinary"],
    tagsWithIcons: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: FaReact },
      { name: "Stripe", icon: SiStripe },
      { name: "Cloudinary", icon: SiCloudinary },
    ],
    content: (
      <div className="space-y-3">
        <p>
          Built a comprehensive AI image processing platform that transforms how
          users interact with visual content.
        </p>
        <div className="space-y-2">
          <h4 className="text-[var(--color-text-secondary)] font-medium text-sm">
            Key Features:
          </h4>
          <ul className="space-y-1.5 text-sm">
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              AI-powered image processing with multiple transformation modes
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              Secure Stripe payment integration with credit-based system
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              Advanced search with transformation sharing capabilities
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              Full authentication and user management system
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Visionary Vest",
    description:
      "Platform enabling users to invest in content creators and share success.",
    src: "placeholder",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/yashchavda0",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    tagsWithIcons: [
      { name: "React", icon: FaReact },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Express", icon: SiExpress },
    ],
    content: (
      <div className="space-y-3">
        <p>
          An innovative investment platform connecting supporters with content
          creators through a seamless investment experience.
        </p>
        <div className="space-y-2">
          <h4 className="text-[var(--color-text-secondary)] font-medium text-sm">
            Key Features:
          </h4>
          <ul className="space-y-1.5 text-sm">
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              Scalable backend logic with investment workflow orchestration
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              Search functionality with smart filtering across creator profiles
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              Real-time portfolio updates and investment tracking
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              Success-sharing revenue model with transparent analytics
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Document Processing Platform",
    description:
      "Enterprise-grade OCR/NLP pipeline for structured data extraction.",
    src: "placeholder",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/yashchavda0",
    tags: ["Python", "FastAPI", "Docker", "PostgreSQL"],
    tagsWithIcons: [
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Docker", icon: SiPostgresql },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
    content: (
      <div className="space-y-3">
        <p>
          Built an enterprise-grade document intelligence platform with
          on-premise OCR, NLP-based extraction, and schema-driven processing.
        </p>
        <div className="space-y-2">
          <h4 className="text-[var(--color-text-secondary)] font-medium text-sm">
            Key Features:
          </h4>
          <ul className="space-y-1.5 text-sm">
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              Fully Dockerized architecture for consistent deployment
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              NLP extraction achieving 99% tabular accuracy
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              Multi-page reference resolution for inconsistent documents
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--color-secondary)" }}>▸</span>
              Standardized JSON pipelines & REST APIs — 60%+ less manual processing
            </li>
          </ul>
        </div>
      </div>
    ),
  },
];

export default function Projects() {
  return (
    <div className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Lamp Effect Section Header */}
        <LampEffect>
          <motion.h2
            initial={{ opacity: 0.5, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="text-3xl md:text-5xl font-bold text-center mb-2"
          >
            What I&apos;ve{" "}
            <span style={{ color: "var(--color-primary)" }}>Built</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-neutral-500 text-center max-w-md"
          >
            Click any card to explore the details
          </motion.p>
        </LampEffect>

        {/* Project Cards */}
        <div className="-mt-20">
          <ExpandableCard cards={projects} />
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <MovingBorderButton href="https://github.com/yashchavda0">
            <FiGithub className="w-4 h-4" />
            View More on GitHub
          </MovingBorderButton>
        </motion.div>
      </div>
    </div>
  );
}
