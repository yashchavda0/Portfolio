"use client";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { FlipWords } from "@/components/ui/flip-words";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { useConfig } from "@/components/ConfigProvider";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";

export default function Hero() {
  const { flags } = useConfig();
  const roles = [
    "Software Engineer",
    "Full Stack Developer",
    "AI/ML Enthusiast",
    "Problem Solver",
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spotlights */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="var(--color-primary)"
      />
      <Spotlight
        className="top-10 right-0 md:right-60 md:-top-10"
        fill="var(--color-secondary)"
      />

      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-mono tracking-widest uppercase mb-6"
          style={{ color: "var(--color-primary)" }}
        >
          Hello, my name is
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          {flags.encryptedName ? (
            <EncryptedText
              text="Yash Chavda"
              interval={40}
              className="font-sans"
            />
          ) : (
            "Yash Chavda"
          )}
        </motion.h1>

        {/* Role Flipper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-3xl text-neutral-400 font-light mb-8 h-12 flex items-center justify-center"
        >
          I&apos;m a
          <FlipWords words={roles} className="text-neutral-200 font-medium" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-neutral-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Building elegant digital experiences with clean code and creative
          thinking. Specializing in full-stack development and AI-powered
          solutions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MovingBorderButton href="#projects">
            View My Work
            <FiArrowDown className="w-4 h-4" />
          </MovingBorderButton>
          <a
            href="#contact"
            className="px-6 py-2.5 text-sm font-medium text-neutral-400 hover:text-white border border-white/[0.08] rounded-full hover:border-white/[0.16] transition-all duration-300"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex justify-center gap-6 mt-16"
        >
          {[
            {
              icon: <FiGithub className="w-5 h-5" />,
              href: "https://github.com/yashchavda0",
              label: "GitHub",
            },
            {
              icon: <FiLinkedin className="w-5 h-5" />,
              href: "https://linkedin.com/in/yashchavda",
              label: "LinkedIn",
            },
            {
              icon: <FiMail className="w-5 h-5" />,
              href: "mailto:yashchavda2004@gmail.com",
              label: "Email",
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-[var(--color-primary)] transition-colors duration-300"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-neutral-700 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full"
            style={{ background: "var(--color-primary)" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
