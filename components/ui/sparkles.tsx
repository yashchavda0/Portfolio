"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Sparkles = ({
  className,
  children,
  sparkleCount = 20,
}: {
  className?: string;
  children?: React.ReactNode;
  sparkleCount?: number;
}) => {
  const [sparkles, setSparkles] = useState<
    { id: number; x: string; y: string; size: number; delay: number }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: sparkleCount }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));
    setSparkles(generated);
  }, [sparkleCount]);

  return (
    <span className={cn("relative inline-block", className)}>
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute inline-block rounded-full bg-[var(--color-primary)]"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </span>
  );
};
