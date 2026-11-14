"use client";

import { motion } from "framer-motion";
import { useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";

const SkillCloud3D = dynamic(() => import("./SkillCloud3D"), { ssr: false });

/* ─── Data ─── */

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: "Python", level: 90, category: "Languages" },
  { name: "Java", level: 85, category: "Languages" },
  { name: "C++", level: 80, category: "Languages" },
  { name: "C", level: 75, category: "Languages" },
  { name: "React", level: 90, category: "Frameworks" },
  { name: "Next.js", level: 85, category: "Frameworks" },
  { name: "FastAPI", level: 85, category: "Frameworks" },
  { name: "Node.js", level: 85, category: "Frameworks" },
  { name: "Express", level: 80, category: "Frameworks" },
  { name: "PostgreSQL", level: 85, category: "Databases" },
  { name: "Milvus", level: 80, category: "Databases" },
  { name: "MongoDB", level: 75, category: "Databases" },
  { name: "MySQL", level: 80, category: "Databases" },
  { name: "LLMs", level: 85, category: "AI/ML" },
  { name: "RAG", level: 85, category: "AI/ML" },
  { name: "NLP", level: 80, category: "AI/ML" },
  { name: "OCR", level: 80, category: "AI/ML" },
  { name: "Docker", level: 85, category: "Tools" },
  { name: "Linux", level: 80, category: "Tools" },
  { name: "Git", level: 90, category: "Tools" },
  { name: "GraphQL", level: 80, category: "Tools" },
  { name: "DSA", level: 90, category: "Core" },
  { name: "Algorithms", level: 85, category: "Core" },
  { name: "OOP", level: 90, category: "Core" },
  { name: "DBMS", level: 85, category: "Core" },
];

const categoryDefs = [
  { name: "Languages", color: "#dc2626" },
  { name: "Frameworks", color: "#ea580c" },
  { name: "AI/ML", color: "#dc2626" },
  { name: "Databases", color: "#b45309" },
  { name: "Tools", color: "#57534e" },
  { name: "Core", color: "#1a1715" },
];

/* ─── Category Grid view ─── */

function CategoryGrid() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-cream-border">
      {categoryDefs.map(({ name, color }, ci) => {
        const catSkills = skills
          .filter((s) => s.category === name)
          .sort((a, b) => b.level - a.level);

        return (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: ci * 0.07 }}
            className="bg-cream-surface p-5 md:p-7"
          >
            {/* Category label */}
            <p
              className="font-mono text-[9px] tracking-[3px] uppercase mb-4 md:mb-5"
              style={{ color }}
            >
              {name}
            </p>

            {/* Skills — varying serif sizes */}
            <div className="flex flex-col gap-1 md:gap-1.5">
              {catSkills.map((skill) => {
                const size = 0.88 + ((skill.level - 60) / 40) * 0.78;
                const isHov = hovered === skill.name;
                return (
                  <span
                    key={skill.name}
                    onMouseEnter={() => setHovered(skill.name)}
                    onMouseLeave={() => setHovered(null)}
                    className="font-serif font-semibold leading-tight cursor-default select-none transition-all duration-150"
                    style={{
                      fontSize: `${size}rem`,
                      color: isHov ? color : "#292524",
                      opacity: isHov ? 1 : 0.82,
                      letterSpacing: "-0.015em",
                    }}
                    title={`${skill.name} — ${skill.level}%`}
                  >
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Word Cloud view ─── */

function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function WordCloud() {
  const [hovered, setHovered] = useState<string | null>(null);
  const sorted = [...skills].sort((a, b) => b.level - a.level);

  return (
    <div className="p-8 md:p-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 min-h-[280px] md:min-h-[380px]">
      {sorted.map((skill) => {
        const cat = categoryDefs.find((c) => c.name === skill.category);
        const baseColor = cat?.color ?? "#1a1715";
        const size = 0.55 + ((skill.level - 60) / 40) * 2.2;
        const isHov = hovered === skill.name;
        const color = isHov
          ? baseColor
          : hovered
          ? hexAlpha(baseColor, 0.22)
          : hexAlpha(baseColor, 0.65);
        return (
          <span
            key={skill.name}
            onMouseEnter={() => setHovered(skill.name)}
            onMouseLeave={() => setHovered(null)}
            className="font-serif font-semibold leading-tight cursor-default select-none transition-all duration-200"
            style={{
              fontSize: `${size}rem`,
              color,
              letterSpacing: "-0.015em",
            }}
            title={`${skill.name} · ${skill.category}`}
          >
            {skill.name}
          </span>
        );
      })}
    </div>
  );
}

/* ─── Main component ─── */

export default function Skills() {
  const sectionRef = useRef(null);
  const [view, setView] = useState<"cloud" | "3d">("cloud");

  return (
    <div className="py-16 md:py-32 px-6 md:px-16 lg:px-24 border-t border-stone-100" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">

        {/* Section header + toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12"
        >
          <div>
            <p className="section-label mb-4">Skills</p>
            <h2 className="font-serif text-3xl md:text-[2.6rem] font-bold text-stone-900 leading-tight tracking-tight">
              What I build with<span className="ember-text">.</span>
            </h2>
          </div>

          {/* Apple-style segmented toggle */}
          <div className="flex items-center self-start md:self-auto shrink-0 p-1 rounded-full bg-stone-100 border border-stone-200">
            {([['cloud', 'Word Cloud'], ['3d', '3D Orbit']] as const).map(([v, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 ${
                  view === v
                    ? "bg-white text-stone-900 shadow-sm border border-stone-200"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content panel */}
        <div className="rounded-2xl border border-cream-border overflow-hidden">
          {view === 'cloud' ? (
            <WordCloud />
          ) : (
            <Suspense fallback={
              <div className="h-[450px] md:h-[550px] flex items-center justify-center bg-cream-surface">
                <span className="font-mono text-[10px] tracking-[4px] uppercase text-stone-400 animate-pulse">Loading 3D view…</span>
              </div>
            }>
              <SkillCloud3D skills={skills} activeCategory="All" />
            </Suspense>
          )}
        </div>

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-4 md:gap-6 mt-6"
        >
          {categoryDefs.map(({ name, color }) => (
            <span key={name} className="flex items-center gap-1.5 text-xs text-stone-400">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
              {name}
            </span>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
