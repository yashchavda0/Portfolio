"use client";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = (event.clientX - rect.left) / width - 0.5;
    const mouseYVal = (event.clientY - rect.top) / height - 0.5;
    mouseX.set(mouseXVal);
    mouseY.set(mouseYVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative w-full",
        containerClassName
      )}
    >
      <div
        className={cn(
          "rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.05] p-6",
          className
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div style={{ transform: "translateZ(40px)" }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};
