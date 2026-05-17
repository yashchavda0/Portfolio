"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WarmCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function WarmCard({ children, className, hover = true }: WarmCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl bg-white border border-cream-border p-6",
        hover && "transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(26,23,21,0.06)]",
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
