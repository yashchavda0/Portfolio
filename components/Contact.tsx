"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiCopy,
  FiCheck,
  FiDownload,
  FiArrowUpRight,
} from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const contactRows = [
  { icon: FiMail, label: "Email", value: "yashchavda2004@gmail.com", href: "mailto:yashchavda2004@gmail.com", copyable: true },
  { icon: FiPhone, label: "Phone", value: "+91 70467 83983", href: "tel:+917046783983", copyable: false },
  // { icon: FiMapPin, label: "Location", value: "Ahmedabad, India", href: null, copyable: false },
];

const socialRows = [
  { icon: FiGithub, label: "GitHub", value: "yashchavda0", href: "https://github.com/yashchavda0" },
  { icon: FiLinkedin, label: "LinkedIn", value: "Yash Chavda", href: "https://www.linkedin.com/in/yash-chavda-9044b6222/" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("yashchavda2004@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="py-16 md:py-32 px-6 md:px-16 lg:px-24 border-t border-stone-100">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="section-label mb-4"
        >
          Contact
        </motion.p>

        {/* Two-column editorial layout */}
        <div className="grid md:grid-cols-5 gap-12 md:gap-20 mt-2">

          {/* Left: Statement + availability + CTAs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="md:col-span-3 flex flex-col"
          >
            {/* Big decorative arrow */}
            <motion.span
              variants={fadeUp}
              className="font-serif font-bold leading-none select-none mb-6 block"
              style={{
                fontSize: "clamp(3rem, 8vw, 6rem)",
                color: "rgba(220,38,38,0.12)",
                letterSpacing: "-0.04em",
              }}
              aria-hidden
            >
              &#8594;
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-serif font-bold text-stone-900 leading-[0.95] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
            >
              Let&apos;s build<br />
              something<br />
              <span className="ember-text">great.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-stone-500 text-sm leading-relaxed mt-6 max-w-sm"
            >
              I&apos;m looking for full-time opportunities where I can contribute to
              enterprise AI systems, backend architecture, and intelligent
              automation&nbsp;&mdash;&nbsp;while growing alongside the team.
            </motion.p>

            {/* Availability badge */}
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 mt-6 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase border border-ember-red/20 text-ember-red bg-ember-red/[0.04] self-start"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-ember-red animate-pulse" />
              Open to opportunities
            </motion.span>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mt-10">
              <a
                href="mailto:yashchavda2004@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-ember-red/20"
                style={{ background: "var(--accent-gradient)" }}
              >
                <FiMail className="w-3.5 h-3.5" />
                Say Hello
              </a>
              <a
                href="/Yash_Chavda_CV.pdf"
                download="Yash_Chavda_CV.pdf"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-medium text-stone-600 border border-stone-300 hover:border-stone-400 hover:text-stone-800 transition-all duration-300"
              >
                <FiDownload className="w-3.5 h-3.5" />
                Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Contact detail rows */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="md:col-span-2"
          >
            {/* Contact rows */}
            {contactRows.map((row) => {
              const Icon = row.icon;
              const isEmail = row.label === "Email";

              return (
                <motion.div
                  key={row.label}
                  variants={fadeUp}
                  className="border-t border-stone-100 py-4 flex items-center justify-between gap-3"
                >
                  {/* Label + value — clickable for email/phone */}
                  {row.href ? (
                    <a
                      href={row.href}
                      className="flex items-center gap-3 min-w-0 group hover:opacity-80 transition-opacity"
                    >
                      <Icon className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-mono text-[9px] tracking-[3px] uppercase text-stone-400 leading-none mb-1">{row.label}</p>
                        <p className="text-sm text-stone-700 font-medium truncate group-hover:text-ember-red transition-colors">{row.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-mono text-[9px] tracking-[3px] uppercase text-stone-400 leading-none mb-1">{row.label}</p>
                        <p className="text-sm text-stone-700 font-medium truncate">{row.value}</p>
                      </div>
                    </div>
                  )}

                  {/* Copy button for email */}
                  {isEmail && (
                    <button
                      onClick={copyEmail}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono border border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700 transition-all"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                          <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-1 text-green-600">
                            <FiCheck className="w-2.5 h-2.5" /> Copied
                          </motion.span>
                        ) : (
                          <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-1">
                            <FiCopy className="w-2.5 h-2.5" /> Copy
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  )}
                </motion.div>
              );
            })}

            {/* Divider */}
            <div className="border-t border-stone-100 my-2" />

            {/* Social rows */}
            {socialRows.map((row) => {
              const Icon = row.icon;
              return (
                <motion.div
                  key={row.label}
                  variants={fadeUp}
                  className="border-t border-stone-100 py-4 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-mono text-[9px] tracking-[3px] uppercase text-stone-400 leading-none mb-1">{row.label}</p>
                      <p className="text-sm text-stone-700 font-medium truncate">{row.value}</p>
                    </div>
                  </div>
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-[10px] font-mono text-stone-400 hover:text-stone-800 transition-colors"
                  >
                    Open <FiArrowUpRight className="w-3 h-3" />
                  </a>
                </motion.div>
              );
            })}

            {/* Closing mono note */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2.5 mt-6 border-t border-stone-100 pt-4"
            >
              <FiMapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span className="text-sm text-stone-600 font-medium">Ahmedabad, India</span>
              <span className="text-stone-200">&middot;</span>
              <span className="font-mono text-xs text-stone-400">GMT+5:30</span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
