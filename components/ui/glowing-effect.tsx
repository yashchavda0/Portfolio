"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GlowingBorder = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div className={cn("relative group", containerClassName)}>
      <motion.div
        className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />
      <div
        className={cn(
          "relative rounded-xl bg-neutral-950 border border-white/[0.05]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
