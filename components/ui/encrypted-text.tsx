"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const EncryptedText = ({
  text,
  interval = 50,
  className,
}: {
  text: string;
  interval?: number;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isDecrypting, setIsDecrypting] = useState(true);
  const iterationRef = useRef(0);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  useEffect(() => {
    if (!isDecrypting) return;
    iterationRef.current = 0;

    const timer = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterationRef.current) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iterationRef.current += 1 / 3;

      if (iterationRef.current >= text.length) {
        clearInterval(timer);
        setDisplayText(text);
        setIsDecrypting(false);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [text, interval, isDecrypting, chars]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("font-mono inline-block", className)}
    >
      {displayText}
    </motion.span>
  );
};
