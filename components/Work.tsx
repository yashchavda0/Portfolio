"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─────────────────────── Data ─────────────────────── */

const currentRoleMetrics = [
  { num: "99%", label: "Tabular Accuracy" },
  { num: "70%", label: "SQL Dependency Cut" },
  { num: "50%", label: "Config Effort Reduced" },
  { num: "40%", label: "Vector Retrieval Boost" },
  { num: "99%+", label: "System Uptime" },
];

const currentRoleAchievements = [
  "Engineered a multi-agent orchestration system with dynamic task routing, reducing incorrect tool usage by 40%",
  "Designed a Natural Language to SQL pipeline using RAG-based schema understanding, cutting SQL dependency by 70% with sub-2s latency",
  "Built a workflow automation engine with triggers, hooks and rule-based execution, reducing manual configuration effort by 50%",
  "Developed vector search systems using Milvus, improving semantic retrieval performance by 40%",
  "Developed NLP/OCR pipelines achieving 99% tabular accuracy for enterprise document processing",
  "Delivered production B2B AI systems using Next.js, Python, FastAPI, GraphQL and PostgreSQL",
  "Deployed systems via Docker and Linux ensuring 99%+ uptime",
  "Delivered POCs for government and defense organizations",
];

const currentRoleTech = ["Python", "Next.js", "FastAPI", "LangChain", "LangGraph", "LlamaIndex", "GraphQL", "PostgreSQL", "Milvus", "Docker"];

const internMetrics = [
  { num: "30%", label: "Manual Tasks Reduced" },
  { num: "3+", label: "Team Collaboration" },
];

const internAchievements = [
  "Developed dynamic dashboard with real-time email notifications",
  "Built Excel-based data extraction and linking systems",
  "Reduced manual follow-ups by 30%",
  "Collaborated using Git with 3+ contributors",
];

const internTech = ["React", "Node.js", "MongoDB", "Express"];

interface Project {
  name: string;
  num: string;
  shortDescription: string;
  longDescription: string;
  featuredMetrics?: { num: string; label: string }[];
  tags: { label: string; color: string }[];
  keyFeatures: string[];
  github?: string;
}

const projects: Project[] = [
  {
    name: "LLM Multi-Agent Orchestration",
    num: "01",
    shortDescription: "Production AI system with dynamic task routing, NL to SQL, and workflow automation.",
    longDescription:
      "A production-grade multi-agent orchestration framework that coordinates specialized LLMs to collaborate on complex enterprise tasks. Features dynamic task routing, RAG-based schema understanding, and a workflow automation engine with triggers and hooks.",
    featuredMetrics: [
      { num: "40%", label: "Better Routing" },
      { num: "70%", label: "SQL Reduced" },
      { num: "50%", label: "Config Saved" },
      { num: "40%", label: "Search Boost" },
    ],
    tags: [
      { label: "Python", color: "bg-ember-red/8 text-ember-red" },
      { label: "LangChain", color: "bg-ember-red/8 text-ember-red" },
      { label: "FastAPI", color: "bg-ember-red/8 text-ember-red" },
      { label: "RAG", color: "bg-ember-red/8 text-ember-red" },
      { label: "Milvus", color: "bg-ember-red/8 text-ember-red" },
    ],
    keyFeatures: [
      "Multi-agent orchestration with dynamic task routing, achieving 40% reduction in incorrect tool usage",
      "NL to SQL pipeline using RAG-based schema understanding, cutting SQL dependency by 70% with sub-2s latency",
      "Workflow automation engine with triggers, hooks and rule-based execution, cutting manual config by 50%",
      "Milvus vector search with 40% improvement in semantic retrieval",
    ],
    github: "https://github.com/yashchavda0",
  },
  {
    name: "Imaginify",
    num: "02",
    shortDescription: "AI-powered image SaaS platform with secure payments and advanced search.",
    longDescription:
      "A full-featured SaaS platform for AI-powered image processing and transformation. Integrates Stripe for credit-based billing, Cloudinary for media management, and offers advanced search with transformation sharing capabilities.",
    tags: [
      { label: "Next.js", color: "bg-ember-orange/8 text-ember-orange" },
      { label: "React", color: "bg-ember-orange/8 text-ember-orange" },
      { label: "Stripe", color: "bg-ember-orange/8 text-ember-orange" },
      { label: "Cloudinary", color: "bg-ember-orange/8 text-ember-orange" },
    ],
    keyFeatures: [
      "AI-powered image processing with multiple transformation modes",
      "Secure Stripe payment integration with credit-based system",
      "Advanced search with transformation sharing capabilities",
      "Full authentication and user management system",
    ],
    github: "https://github.com/yashchavda0",
  },
  {
    name: "Visionary Vest",
    num: "03",
    shortDescription: "Investment platform for real-time portfolio tracking and creator success-sharing.",
    longDescription:
      "A fintech investment platform enabling users to track real-time portfolios, discover creators, and participate in a transparent success-sharing revenue model. Features smart filtering and real-time analytics.",
    tags: [
      { label: "React", color: "bg-ember-amber/8 text-ember-amber" },
      { label: "Node.js", color: "bg-ember-amber/8 text-ember-amber" },
      { label: "MongoDB", color: "bg-ember-amber/8 text-ember-amber" },
      { label: "Express", color: "bg-ember-amber/8 text-ember-amber" },
    ],
    keyFeatures: [
      "Scalable backend logic with investment workflow orchestration",
      "Search functionality with smart filtering across creator profiles",
      "Real-time portfolio updates and investment tracking",
      "Success-sharing revenue model with transparent analytics",
    ],
    github: "https://github.com/yashchavda0",
  },
  {
    name: "Document Processing",
    num: "04",
    shortDescription: "Enterprise OCR/NLP pipeline for structured data extraction at 99% accuracy.",
    longDescription:
      "An enterprise document processing platform with fully Dockerized architecture, NLP extraction achieving 99% tabular accuracy, and multi-page reference resolution. REST APIs reduced manual processing by over 60%.",
    tags: [
      { label: "Python", color: "bg-ember-red/8 text-ember-red" },
      { label: "FastAPI", color: "bg-ember-red/8 text-ember-red" },
      { label: "Docker", color: "bg-ember-red/8 text-ember-red" },
      { label: "PostgreSQL", color: "bg-ember-red/8 text-ember-red" },
    ],
    keyFeatures: [
      "Fully Dockerized architecture for consistent deployment",
      "NLP extraction achieving 99% tabular accuracy",
      "Multi-page reference resolution for inconsistent documents",
      "Standardized JSON pipelines, reducing manual processing by over 60%",
    ],
    github: "https://github.com/yashchavda0",
  },
];

/* ─────────────────────── Detail Modal ─────────────────────── */

function DetailModal({
  open,
  onClose,
  title,
  subtitle,
  github,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  github?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-stone-900/20 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.98 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none px-0 md:px-6"
          >
            <div className="pointer-events-auto w-full md:w-[min(620px,92vw)] max-h-[84vh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-cream border border-cream-border shadow-2xl shadow-stone-300/20">
              <div className="sticky top-0 z-10 bg-cream/96 backdrop-blur-sm border-b border-stone-100 px-6 md:px-8 pt-6 pb-4 flex items-start justify-between gap-4">
                <div>
                  {subtitle && (
                    <p className="font-mono text-[9px] tracking-[3px] uppercase text-stone-400 mb-1.5">{subtitle}</p>
                  )}
                  <h3 className="font-serif font-semibold text-xl md:text-2xl text-stone-900 leading-tight tracking-tight">{title}</h3>
                </div>
                <div className="flex items-center gap-3 shrink-0 mt-1">
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-ember-red hover:text-ember-orange transition-colors"
                    >
                      GitHub <FiExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-all text-[11px]"
                    aria-label="Close"
                  >
                    &#x2715;
                  </button>
                </div>
              </div>
              <div className="px-6 md:px-8 pt-6 pb-12">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────── ExperienceRow ─────────────────────── */

function ExperienceRow({
  badge,
  badgeColor,
  period,
  role,
  company,
  location,
  description,
  metrics,
  achievements,
  tech,
  techColorClass,
  techStyle = "chips",
}: {
  badge: string;
  badgeColor: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  metrics: { num: string; label: string }[];
  achievements: string[];
  tech: string[];
  techColorClass?: string;
  techStyle?: "chips" | "text";
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div variants={fadeUp} className="border-t border-stone-100 py-10 md:py-14">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[10px] tracking-[3px] uppercase text-stone-400">{period}</span>
          <span className="w-px h-3 bg-stone-300 flex-shrink-0" />
          <span className="font-mono text-[10px] tracking-[3px] uppercase" style={{ color: badgeColor }}>{badge}</span>
        </div>

        <h3 className="font-serif font-semibold text-2xl md:text-[2rem] text-stone-900 leading-tight tracking-tight mb-1.5">
          {role}
        </h3>
        <p className="text-sm text-stone-500 mb-6">{company} &middot; {location}</p>
        <p className="text-sm text-stone-500 leading-relaxed max-w-2xl mb-10">{description}</p>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-6 gap-y-5 pb-10 border-b border-stone-100 mb-6">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="font-serif font-bold text-stone-900 text-xl md:text-2xl leading-none mb-1.5">{m.num}</div>
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wide leading-snug">{m.label}</div>
            </div>
          ))}
        </div>

        {techStyle === "text" ? (
          <div className="flex flex-wrap gap-x-5 gap-y-1 mb-6">
            {tech.map((t) => (
              <span key={t} className="text-sm font-semibold tracking-wide" style={{ color: badgeColor }}>
                {t}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mb-6">
            {tech.map((t) => (
              <span key={t} className={`text-xs px-3 py-1.5 rounded-full font-medium tracking-wide ${techColorClass ?? "bg-stone-100 text-stone-600"}`}>
                {t}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2.5 text-xs font-mono text-stone-400 hover:text-stone-800 transition-colors tracking-wide group"
        >
          <span className="w-5 h-px bg-stone-300 group-hover:bg-stone-700 group-hover:w-7 transition-all duration-200" />
          View all contributions
        </button>
      </motion.div>

      <DetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={role}
        subtitle={`${company} \u00b7 ${period}`}
      >
        <ul className="divide-y divide-stone-100">
          {achievements.map((a, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-stone-500 py-3.5">
              <span className="text-ember-red flex-shrink-0 mt-[3px] text-[8px]">&#9654;</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </DetailModal>
    </>
  );
}

/* ─────────────────────── FeaturedProject ─────────────────────── */

function FeaturedProject({ project }: { project: Project }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div variants={fadeUp} className="border-t border-stone-100">
        <div className="py-10 md:py-14 grid md:grid-cols-5 gap-8 md:gap-12">
          <div className="md:col-span-2 flex flex-col">
            <span
              className="font-serif font-bold ember-text leading-none select-none"
              style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
            >
              {project.num}
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-6">
              {project.tags.map((tag) => (
                <span key={tag.label} className="text-sm font-semibold text-ember-red">
                  {tag.label}
                </span>
              ))}
            </div>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-ember-red hover:text-ember-orange transition-colors mt-5"
              >
                View on GitHub <FiExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="md:col-span-3 flex flex-col justify-center">
            <h4 className="font-serif font-semibold text-2xl md:text-3xl text-stone-900 leading-tight tracking-tight">
              {project.name}
            </h4>
            <p className="text-sm text-stone-500 mt-4 leading-relaxed max-w-lg">{project.shortDescription}</p>

            {project.featuredMetrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 mt-8 pt-8 border-t border-stone-100">
                {project.featuredMetrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-serif font-bold text-stone-900 text-xl md:text-2xl leading-none mb-1.5">{m.num}</div>
                    <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wide">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2.5 text-xs font-mono text-stone-400 hover:text-stone-800 transition-colors tracking-wide mt-7 self-start group"
            >
              <span className="w-5 h-px bg-stone-300 group-hover:bg-stone-700 group-hover:w-7 transition-all duration-200" />
              View full details
            </button>
          </div>
        </div>
      </motion.div>

      <DetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={project.name}
        subtitle="Featured Project"
        github={project.github}
      >
        <p className="text-sm text-stone-500 leading-relaxed mb-6">{project.longDescription}</p>
        <p className="font-mono text-[9px] tracking-[3px] uppercase text-stone-400 mb-3">Key Features</p>
        <ul className="divide-y divide-stone-100">
          {project.keyFeatures.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-stone-500 py-3.5">
              <span className="text-ember-red flex-shrink-0 mt-[3px] text-[8px]">&#9654;</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </DetailModal>
    </>
  );
}

/* ─────────────────────── ProjectCard ─────────────────────── */

function ProjectCard({ project, onView }: { project: Project; onView: () => void }) {
  return (
    <button
      onClick={onView}
      className="w-full rounded-2xl border border-cream-border bg-cream-surface hover:border-stone-300 hover:bg-white p-5 md:p-6 text-left transition-all duration-200 group"
    >
      <span className="font-serif font-bold text-2xl ember-text leading-none">{project.num}</span>
      <h4 className="font-serif font-semibold text-lg leading-tight tracking-tight mt-3 text-stone-900 group-hover:text-ember-red transition-colors">
        {project.name}
      </h4>
      <p className="text-xs text-stone-500 mt-2 leading-relaxed">{project.shortDescription}</p>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.tags.map((tag) => (
          <span key={tag.label} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tag.color}`}>
            {tag.label}
          </span>
        ))}
      </div>
      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-stone-400 mt-4 group-hover:text-ember-red transition-colors">
        View details &#x2192;
      </span>
    </button>
  );
}

/* ─────────────────────── Main ─────────────────────── */

export default function Work() {
  const [viewProject, setViewProject] = useState<Project | null>(null);

  return (
    <>
      <section id="work" className="py-16 md:py-32 px-6 md:px-16 lg:px-24 border-t border-stone-100">
        <div className="max-w-5xl mx-auto">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            className="mb-2"
          >
            <p className="section-label mb-4">Experience</p>
            <h2 className="font-serif text-3xl md:text-[2.6rem] font-bold text-stone-900 leading-tight tracking-tight">
              Where I&apos;ve worked &amp; what I&apos;ve built<span className="ember-text">.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
          >
            <ExperienceRow
              badge="Current Role"
              badgeColor="#dc2626"
              period="2025 — Present"
              role="Trainee Software Engineer"
              company="Silver Touch Technologies Ltd."
              location="Ahmedabad, India"
              description="Building enterprise-grade AI systems and scalable backend architectures. Delivered solutions for 3 enterprise clients — including a classified deployment with complete air-gapped network isolation — across government, defense, and commercial sectors."
              metrics={currentRoleMetrics}
              achievements={currentRoleAchievements}
              tech={currentRoleTech}
              techStyle="text"
            />
            <ExperienceRow
              badge="Internship"
              badgeColor="#ea580c"
              period="2023"
              role="MERN Stack Intern"
              company="LD College of Engineering"
              location="Ahmedabad"
              description="Developed dynamic dashboards and data management tools, collaborating with a small team to streamline internal workflows and reduce manual effort by 30%."
              metrics={internMetrics}
              achievements={internAchievements}
              tech={internTech}
              techColorClass="bg-ember-orange/8 text-ember-orange"
            />
          </motion.div>

          <div className="mt-16 md:mt-24">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="section-label mb-0"
            >
              Projects
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
            >
              <FeaturedProject project={projects[0]} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-4"
            >
              {projects.slice(1).map((project) => (
                <motion.div key={project.name} variants={fadeUp}>
                  <ProjectCard
                    project={project}
                    onView={() => setViewProject(project)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      <DetailModal
        open={!!viewProject}
        onClose={() => setViewProject(null)}
        title={viewProject?.name ?? ""}
        subtitle={viewProject ? `Project ${viewProject.num}` : ""}
        github={viewProject?.github}
      >
        {viewProject && (
          <>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {viewProject.tags.map((tag) => (
                <span key={tag.label} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tag.color}`}>
                  {tag.label}
                </span>
              ))}
            </div>
            <p className="text-sm text-stone-500 leading-relaxed mb-6">{viewProject.longDescription}</p>
            <p className="font-mono text-[9px] tracking-[3px] uppercase text-stone-400 mb-3">Key Features</p>
            <ul className="divide-y divide-stone-100">
              {viewProject.keyFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-stone-500 py-3.5">
                  <span className="text-ember-red flex-shrink-0 mt-[3px] text-[8px]">&#9654;</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </DetailModal>
    </>
  );
}
