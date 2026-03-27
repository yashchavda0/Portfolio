"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { useConfig } from "@/components/ConfigProvider";

/* ─── Skill data ─── */
interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  // Languages
  { name: "Python", level: 90, category: "Languages" },
  { name: "Java", level: 85, category: "Languages" },
  { name: "C++", level: 80, category: "Languages" },
  { name: "C", level: 75, category: "Languages" },
  // Frameworks
  { name: "React", level: 90, category: "Frameworks" },
  { name: "Next.js", level: 85, category: "Frameworks" },
  { name: "FastAPI", level: 85, category: "Frameworks" },
  { name: "Node.js", level: 85, category: "Frameworks" },
  { name: "Express", level: 80, category: "Frameworks" },
  // Databases
  { name: "PostgreSQL", level: 85, category: "Databases" },
  { name: "Milvus", level: 80, category: "Databases" },
  { name: "MongoDB", level: 75, category: "Databases" },
  { name: "MySQL", level: 80, category: "Databases" },
  // AI/ML
  { name: "LLMs", level: 85, category: "AI/ML" },
  { name: "RAG", level: 85, category: "AI/ML" },
  { name: "NLP", level: 80, category: "AI/ML" },
  { name: "OCR", level: 80, category: "AI/ML" },
  // Tools
  { name: "Docker", level: 85, category: "Tools" },
  { name: "Linux", level: 80, category: "Tools" },
  { name: "Git", level: 90, category: "Tools" },
  { name: "GraphQL", level: 80, category: "Tools" },
  // Core
  { name: "DSA", level: 90, category: "Core" },
  { name: "Algorithms", level: 85, category: "Core" },
  { name: "OOP", level: 90, category: "Core" },
  { name: "DBMS", level: 85, category: "Core" },
];

const categories = ["All", "Languages", "Frameworks", "Databases", "AI/ML", "Tools", "Core"];

const categoryColors: Record<string, string> = {
  Languages: "var(--color-primary)",
  Frameworks: "var(--color-secondary)",
  Databases: "var(--color-primary)",
  "AI/ML": "var(--color-secondary)",
  Tools: "var(--color-primary)",
  Core: "var(--color-secondary)",
};

/* ─── Generate constellation positions in a circular layout ─── */
function generatePositions(count: number, width: number, height: number) {
  const positions: { x: number; y: number }[] = [];
  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = Math.min(width, height) * 0.4;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const radiusJitter = maxRadius * (0.7 + Math.random() * 0.3);
    positions.push({
      x: cx + Math.cos(angle) * radiusJitter,
      y: cy + Math.sin(angle) * radiusJitter,
    });
  }
  return positions;
}

/* ─── Constellation (SVG interactive) ─── */
function Constellation({
  filteredSkills,
}: {
  filteredSkills: Skill[];
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 700, h: 500 });
  const [hovered, setHovered] = useState<number | null>(null);
  const mouseX = useMotionValue(size.w / 2);
  const mouseY = useMotionValue(size.h / 2);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const updateSize = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setSize({ w: rect.width, h: Math.max(rect.height, 450) });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const positions = generatePositions(filteredSkills.length, size.w, size.h);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    },
    [mouseX, mouseY]
  );

  /* Build connection lines — connect each node to its 2 nearest neighbours */
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  positions.forEach((p, i) => {
    const dists = positions
      .map((q, j) => ({
        j,
        d: Math.hypot(p.x - q.x, p.y - q.y),
      }))
      .filter((d) => d.j !== i)
      .sort((a, b) => a.d - b.d);
    dists.slice(0, 2).forEach((d) => {
      const key1 = `${Math.min(i, d.j)}-${Math.max(i, d.j)}`;
      if (!lines.find((l) => `${positions.indexOf({ x: l.x1, y: l.y1 })}-${positions.indexOf({ x: l.x2, y: l.y2 })}` === key1)) {
        lines.push({ x1: p.x, y1: p.y, x2: positions[d.j].x, y2: positions[d.j].y });
      }
    });
  });

  return (
    <svg
      ref={svgRef}
      className="w-full h-[450px] md:h-[500px]"
      onMouseMove={handleMouseMove}
    >
      {/* Connection lines */}
      {lines.map((l, i) => (
        <motion.line
          key={`line-${i}`}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="var(--color-primary)"
          strokeOpacity={0.1}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: i * 0.02 }}
        />
      ))}

      {/* Skill nodes */}
      {filteredSkills.map((skill, i) => {
        const pos = positions[i];
        if (!pos) return null;
        const radius = 6 + (skill.level / 100) * 14;
        const isHovered = hovered === i;
        const color = categoryColors[skill.category] || "var(--color-primary)";

        return (
          <g
            key={skill.name}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            {/* Glow */}
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={radius + 8}
              fill={color}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.15 : 0 }}
              transition={{ duration: 0.2 }}
            />
            {/* Main node */}
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={radius}
              fill={color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isHovered ? 1.3 : 1,
                opacity: isHovered ? 1 : 0.7,
              }}
              transition={{
                scale: { type: "spring", stiffness: 300 },
                opacity: { duration: 0.3 },
                default: { duration: 0.6, delay: i * 0.04 },
              }}
            />
            {/* Label */}
            <motion.text
              x={pos.x}
              y={pos.y + radius + 16}
              textAnchor="middle"
              fill="currentColor"
              className="text-[10px] md:text-xs fill-neutral-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
            >
              {skill.name}
            </motion.text>
            {/* Level badge on hover */}
            {isHovered && (
              <motion.text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fill="white"
                className="text-[10px] font-bold"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {skill.level}%
              </motion.text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Grid fallback ─── */
function SkillGrid({ filteredSkills }: { filteredSkills: Skill[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {filteredSkills.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03 }}
          className="relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-4 group hover:border-white/10 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--color-text-secondary)] font-medium">
              {skill.name}
            </span>
            <span
              className="text-xs font-mono"
              style={{ color: categoryColors[skill.category] }}
            >
              {skill.level}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: categoryColors[skill.category] }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.05 }}
            />
          </div>
          <span className="text-[10px] text-[var(--color-text-muted)] mt-1 block">
            {skill.category}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Main component ─── */
export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const { flags } = useConfig();

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="py-24 px-4" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Technical{" "}
            <span style={{ color: "var(--color-primary)" }}>Arsenal</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all border ${
                activeCategory === cat
                  ? "border-white/20 bg-white/10 text-[var(--color-text-primary)]"
                  : "border-white/5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:border-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Constellation or Grid */}
        {flags.skillConstellation ? (
          <Constellation filteredSkills={filteredSkills} />
        ) : (
          <SkillGrid filteredSkills={filteredSkills} />
        )}

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[var(--color-text-muted)] text-sm mt-8"
        >
          Actively building with{" "}
          <span style={{ color: "var(--color-primary)" }}>
            LLMs
          </span>{" "}
          ·{" "}
          <span style={{ color: "var(--color-secondary)" }}>RAG</span>
          {" "}·{" "}
          <span style={{ color: "var(--color-primary)" }}>Vector Databases</span>
          {" "}·{" "}
          <span style={{ color: "var(--color-secondary)" }}>Distributed Systems</span>
        </motion.p>
      </div>
    </div>
  );
}
