"use client";

import { motion } from "framer-motion";
import { WobbleCard } from "@/components/ui/wobble-card";
import { Sparkles } from "@/components/ui/sparkles";
import { FiBookOpen, FiAward } from "react-icons/fi";

const education = [
  {
    institution: "LD College of Engineering",
    degree: "B.E. in Information Technology",
    period: "2021 – 2025",
    score: "GPA 8.92",
    highlights: ["AI/ML Minor", "Dean's List"],
  },
  {
    institution: "Devasya International Public School",
    degree: "Higher Secondary Certificate (H.S.C)",
    period: "2019 – 2021",
    score: "88.62%",
    highlights: ["Science Stream"],
  },
];

const achievements = [
  {
    title: "Hackathon Winner",
    event: "Ingenious Hackathon 5.0",
    description: "Recognised for innovative idea and outstanding UI/UX design",
    icon: "🏆",
  },
  {
    title: "Full Stack Developer",
    event: "Professional Experience",
    description:
      "Built B2B solutions with Next.js, Python, GraphQL & PostgreSQL",
    icon: "💼",
  },
  {
    title: "AI/ML Enthusiast",
    event: "Continuous Learning",
    description: "Expanding expertise in data science and machine learning",
    icon: "🤖",
  },
];

export default function Education() {
  return (
    <div className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Education &{" "}
            <span style={{ color: "var(--color-primary)" }}>Achievements</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
            The academic journey and milestones that shaped my career
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* ── Education Column ── */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FiBookOpen
                className="w-5 h-5"
                style={{ color: "var(--color-primary)" }}
              />
              <h3 className="text-xl font-semibold text-[var(--color-text-secondary)]">
                Education
              </h3>
            </div>

            <div className="space-y-5">
              {education.map((edu, i) => (
                <WobbleCard key={edu.institution} containerClassName="min-h-0">
                  <div className="relative p-5 z-10">
                    <h4 className="text-lg font-bold text-[var(--color-text-primary)]">
                      {edu.degree}
                    </h4>
                    <p
                      className="text-sm font-medium mt-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {edu.institution}
                    </p>
                    <p className="text-[var(--color-text-muted)] text-xs mt-0.5">
                      {edu.period}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: "rgba(var(--color-primary-rgb),0.15)",
                          color: "var(--color-primary)",
                        }}
                      >
                        {edu.score}
                      </span>
                      {edu.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2.5 py-0.5 rounded-full text-xs bg-white/5 text-neutral-400"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </WobbleCard>
              ))}
            </div>
          </div>

          {/* ── Achievements Column ── */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FiAward
                className="w-5 h-5"
                style={{ color: "var(--color-secondary)" }}
              />
              <h3 className="text-xl font-semibold text-[var(--color-text-secondary)]">
                Achievements
              </h3>
            </div>

            <div className="space-y-4">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-5 group hover:border-white/10 transition-all"
                >
                  {/* Sparkles on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <Sparkles />
                  </div>

                  <div className="relative z-10 flex items-start gap-4">
                    <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">
                      {a.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-[var(--color-text-primary)] group-hover:text-white transition-colors">
                        {a.title}
                      </h4>
                      <p
                        className="text-xs font-medium mt-0.5"
                        style={{ color: "var(--color-secondary)" }}
                      >
                        {a.event}
                      </p>
                      <p className="text-[var(--color-text-muted)] text-sm mt-1.5">
                        {a.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
