"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}) => {
  return (
    <Component
      className={cn(
        "relative bg-transparent p-[1px] overflow-hidden group",
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full",
          borderClassName
        )}
        style={{
          background:
            "conic-gradient(from var(--angle, 0deg), transparent 60%, var(--color-primary) 80%, transparent 100%)",
          animation: `spin ${duration}ms linear infinite`,
        }}
      />
      <div
        className={cn(
          "relative bg-neutral-900 rounded-full px-6 py-2 text-sm font-medium text-white z-10 flex items-center justify-center gap-2",
          className
        )}
      >
        {children}
      </div>
      <style jsx>{`
        @keyframes spin {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>
    </Component>
  );
};

export const MovingBorderButton = ({
  children,
  className,
  href,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  [key: string]: unknown;
}) => {
  const content = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
    </span>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative inline-flex overflow-hidden rounded-full p-[2px]",
        className
      )}
    >
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--color-primary)_0%,var(--color-secondary)_50%,var(--color-primary)_100%)]" />
      {href ? (
        <a
          href={href}
          className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-950 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-3xl gap-2"
          {...props}
        >
          {content}
        </a>
      ) : (
        <button
          className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-950 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-3xl gap-2"
          {...props}
        >
          {content}
        </button>
      )}
    </motion.div>
  );
};
