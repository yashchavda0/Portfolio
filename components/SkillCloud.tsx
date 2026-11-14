"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

interface Skill {
  name: string;
  category: string;
  proficiency: number;
}

const skills: Skill[] = [
  { name: "Python", category: "languages", proficiency: 0.95 },
  { name: "TypeScript", category: "languages", proficiency: 0.85 },
  { name: "JavaScript", category: "languages", proficiency: 0.8 },
  { name: "SQL", category: "languages", proficiency: 0.75 },
  { name: "Next.js", category: "frameworks", proficiency: 0.88 },
  { name: "React", category: "frameworks", proficiency: 0.82 },
  { name: "Node.js", category: "frameworks", proficiency: 0.8 },
  { name: "FastAPI", category: "frameworks", proficiency: 0.85 },
  { name: "Express", category: "frameworks", proficiency: 0.7 },
  { name: "PostgreSQL", category: "databases", proficiency: 0.78 },
  { name: "MongoDB", category: "databases", proficiency: 0.72 },
  { name: "Redis", category: "databases", proficiency: 0.6 },
  { name: "LangChain", category: "ai/ml", proficiency: 0.88 },
  { name: "OpenAI", category: "ai/ml", proficiency: 0.85 },
  { name: "LLM Orchestration", category: "ai/ml", proficiency: 0.82 },
  { name: "Prompt Engineering", category: "ai/ml", proficiency: 0.78 },
  { name: "Docker", category: "tools", proficiency: 0.72 },
  { name: "AWS", category: "tools", proficiency: 0.7 },
  { name: "Git", category: "tools", proficiency: 0.85 },
  { name: "CI/CD", category: "tools", proficiency: 0.65 },
  { name: "GraphQL", category: "tools", proficiency: 0.68 },
];

const categoryColorMap: Record<string, { text: string; bg: string; border: string }> = {
  languages: { text: "text-ember-red", bg: "bg-ember-red/5", border: "border-ember-red/10" },
  frameworks: { text: "text-ember-orange", bg: "bg-ember-orange/5", border: "border-ember-orange/10" },
  databases: { text: "text-ember-amber", bg: "bg-ember-amber/5", border: "border-ember-amber/10" },
  "ai/ml": { text: "text-ember-red", bg: "bg-ember-red/5", border: "border-ember-red/10" },
  tools: { text: "text-stone-900", bg: "bg-stone-900/5", border: "border-stone-900/10" },
};

function getFontWeight(proficiency: number): number {
  if (proficiency > 0.8) return 600;
  if (proficiency > 0.7) return 500;
  return 400;
}

// Pre-compute fixed target positions using a golden angle spiral
// so skills spread evenly across the container
function computeTargets(count: number, radiusX: number, radiusY: number) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const angle = i * goldenAngle;
    const r = Math.sqrt(i / count) * 0.85 + 0.15;
    return {
      x: Math.cos(angle) * r * radiusX,
      y: Math.sin(angle) * r * radiusY,
    };
  });
}

interface SkillCloudProps {
  activeCategory: string;
}

export default function SkillCloud({ activeCategory }: SkillCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(containerRef, { once: true });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const animFrameRef = useRef<number>(0);
  const physicsRef = useRef(
    skills.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }))
  );

  const tick = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.offsetWidth;
    const h = container.offsetHeight;
    const centerX = w / 2;
    const centerY = h / 2;
    const radiusX = w * 0.38;
    const radiusY = h * 0.38;

    const targets = computeTargets(skills.length, radiusX, radiusY);
    const phys = physicsRef.current;
    const minDist = 75;

    for (let i = 0; i < phys.length; i++) {
      const s = phys[i];

      // Spring toward target
      const dx = targets[i].x - s.x;
      const dy = targets[i].y - s.y;
      s.vx += dx * 0.04;
      s.vy += dy * 0.04;

      // Repel neighbors
      for (let j = i + 1; j < phys.length; j++) {
        const o = phys[j];
        const rx = s.x - o.x;
        const ry = s.y - o.y;
        const dist = Math.sqrt(rx * rx + ry * ry);
        if (dist < minDist && dist > 0.1) {
          const force = (minDist - dist) * 0.03;
          const nx = rx / dist;
          const ny = ry / dist;
          s.vx += nx * force;
          s.vy += ny * force;
          o.vx -= nx * force;
          o.vy -= ny * force;
        }
      }

      s.vx *= 0.88;
      s.vy *= 0.88;
      s.x += s.vx;
      s.y += s.vy;

      // Apply to DOM directly — no React re-render
      const el = itemRefs.current[i];
      if (el) {
        el.style.transform = `translate(${centerX + s.x}px, ${centerY + s.y}px) translate(-50%, -50%)`;
      }
    }

    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!isInView) return;

    // Initialize with random offsets so they spring into place
    physicsRef.current.forEach((p) => {
      p.x = (Math.random() - 0.5) * 40;
      p.y = (Math.random() - 0.5) * 40;
      p.vx = 0;
      p.vy = 0;
    });

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isInView, tick]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: 420 }}
    >
      {skills.map((skill, i) => {
        const colors = categoryColorMap[skill.category] || categoryColorMap.tools;
        const fontSize = 12 + skill.proficiency * 14;
        const fontWeight = getFontWeight(skill.proficiency);
        const isDimmed = activeCategory !== "all" && skill.category !== activeCategory;
        const isHovered = hoveredSkill === skill.name;

        return (
          <motion.div
            key={skill.name}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="absolute top-0 left-0 cursor-default select-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView
                ? { opacity: isDimmed ? 0.15 : 1, scale: 1 }
                : { opacity: 0, scale: 0 }
            }
            transition={{
              scale: { duration: 0.5, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] },
              opacity: { duration: 0.4, delay: i * 0.04 },
            }}
            style={{ zIndex: isHovered ? 10 : 1 }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <span
              className={`
                inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border
                transition-colors duration-200 whitespace-nowrap
                ${colors.bg} ${colors.border}
              `}
              style={{ fontSize, fontWeight }}
            >
              <span className={colors.text}>{skill.name}</span>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  className="text-[10px] font-medium text-stone-400 tabular-nums whitespace-nowrap"
                >
                  {Math.round(skill.proficiency * 100)}%
                </motion.span>
              )}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
