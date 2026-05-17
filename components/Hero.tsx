"use client";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowUpRight, FiMapPin } from "react-icons/fi";

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, delay: i * 0.11, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col px-6 md:px-16 lg:px-24 pt-6 md:pt-10 overflow-hidden">

      {/* Background watermark monogram */}
      <div className="absolute right-[-2%] bottom-[6%] select-none pointer-events-none" aria-hidden>
        <span
          className="font-serif font-bold"
          style={{
            fontSize: "clamp(11rem, 32vw, 28rem)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "rgba(26,23,21,0.028)",
          }}
        >
          YC
        </span>
      </div>

      {/* Top strip — badge + social icons */}
      <motion.div
        custom={0}
        variants={rise}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between mt-4 md:mt-6"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase border border-ember-red/20 text-ember-red bg-ember-red/[0.04]">
            <span className="w-1.5 h-1.5 rounded-full bg-ember-red animate-pulse" />
            Available for hire
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase border border-stone-200 text-stone-500 bg-white">
            <FiMapPin className="w-3 h-3 text-stone-400" /> Ahmedabad, India
          </span>
        </div>
        <div className="flex items-center gap-7">
          {[
            { icon: FiGithub, href: "https://github.com/yashchavda0", label: "GitHub" },
            { icon: FiLinkedin, href: "https://www.linkedin.com/in/yash-chavda-9044b6222", label: "LinkedIn" },
            { icon: FiMail, href: "mailto:yashchavda2004@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-stone-400 hover:text-stone-800 transition-colors duration-200"
            >
              <Icon className="w-[18px] h-[18px]" />
            </a>
          ))}
        </div>
      </motion.div>

      {/* Centre block — index line + name + description + stats */}
      <div className="flex-1 flex flex-col justify-center py-10 md:py-6">

        {/* Index descriptor */}
        <motion.div
          custom={1}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4 mb-8 md:mb-10"
        >
          <span className="font-mono text-[10px] tracking-[4px] uppercase text-stone-400">
            AI Engineer
          </span>
        </motion.div>

        {/* Name — the centrepiece */}
        <motion.h1
          custom={2}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="font-serif font-bold text-stone-900 leading-[0.88] tracking-[-0.03em]"
          style={{ fontSize: "clamp(4.2rem, 13vw, 10.5rem)" }}
        >
          Yash<br />
          Chavda<span className="ember-text">.</span>
        </motion.h1>

        {/* Description row + mini stats */}
        <motion.div
          custom={3}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-16 mt-8 md:mt-10"
        >
          <p className="text-stone-500 text-sm leading-[1.8] max-w-sm">
            Building enterprise AI systems, multi-agent orchestration,
            and production-grade backend infrastructure for B2B clients
            across government and defense sectors.
          </p>

          {/* Stats strip */}
          <div className="flex items-end gap-8 md:gap-10 shrink-0">
            {[
              { num: "10+", label: "Projects" },
              { num: "90%", label: "Table Accuracy" },
              { num: "70%", label: "SQL Saved" },
            ].map(({ num, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="font-serif font-bold text-stone-900 text-2xl md:text-3xl leading-none tracking-tight">
                  {num}
                </span>
                <span className="text-[10px] font-mono text-stone-400 tracking-wide mt-1.5 uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom bar — tag list + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.72 }}
        className="border-t border-stone-200 py-6 md:py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {["AI Systems", "Backend", "LLMs", "Multi-Agent", "Python", "Next.js"].map((tag, i) => (
            <span key={tag} className="flex items-center gap-3">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-stone-300 hidden sm:block" />}
              <span className="text-xs font-mono text-stone-400 tracking-wide">{tag}</span>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-ember-red/20"
            style={{ background: "var(--accent-gradient)" }}
          >
            View My Work
            <FiArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href="/Yash_Chavda_CV.pdf"
            download="Yash_Chavda_CV.pdf"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-medium text-stone-600 border border-stone-300 hover:border-stone-400 hover:text-stone-800 transition-all duration-300"
          >
            <FiDownload className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>
      </motion.div>
    </div>
  );
}
