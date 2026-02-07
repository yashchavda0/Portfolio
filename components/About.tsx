"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {
  FiCode,
  FiBriefcase,
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
  SiNodedotjs,
  SiTailwindcss,
  SiDocker,
} from "react-icons/si";

const techItems = [
  { name: "React", icon: <SiReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Python", icon: <SiPython /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
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
                words="I'm an aspiring software engineer with hands-on experience in full-stack development. I thrive on building elegant, scalable applications and exploring the intersections of AI and modern web technologies. Currently expanding my expertise in Data Science and Machine Learning."
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
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-3">
                  <FiCode className="w-4 h-4 text-neutral-500" />
                  <span className="text-2xl font-bold text-white">
                    <CountUp target={10} suffix="+" />
                  </span>
                  <span className="text-xs text-neutral-500">Projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiBriefcase className="w-4 h-4 text-neutral-500" />
                  <span className="text-2xl font-bold text-white">
                    <CountUp target={2} suffix="+" />
                  </span>
                  <span className="text-xs text-neutral-500">Years Exp</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaTrophy className="w-4 h-4 text-neutral-500" />
                  <span className="text-2xl font-bold text-white">
                    <CountUp target={1} />
                  </span>
                  <span className="text-xs text-neutral-500">Hackathon Won</span>
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
                <span className="text-neutral-300">Ahmedabad, India</span>
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
                  <span className="text-xs text-neutral-400">Open to opportunities</span>
                </div>
                <p className="text-neutral-300 text-sm">
                  Building at <span className="font-medium text-white">Silver Touch Technologies</span>
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
