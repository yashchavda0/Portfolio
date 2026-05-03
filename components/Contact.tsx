"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiCopy,
  FiCheck,
  FiDownload,
} from "react-icons/fi";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const contactInfo = [
  {
    icon: FiMail,
    label: "Email",
    value: "yashchavda2004@gmail.com",
    href: "mailto:yashchavda2004@gmail.com",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+91 70467 83983",
    href: "tel:+917046783983",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Ahmedabad, India",
    href: "#",
  },
];

const socialLinks = [
  {
    name: "GitHub",
    icon: FiGithub,
    href: "https://github.com/yashchavda0",
  },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    href: "https://linkedin.com/in/yashchavda",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("yashchavda2004@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let&apos;s{" "}
            <span style={{ color: "var(--color-primary)" }}>Connect</span>
          </h2>
          <div className="max-w-lg mx-auto">
            <TextGenerateEffect
              words="Interested in working together? Let's discuss how we can build something amazing."
              className="text-[var(--color-text-muted)] text-base font-normal"
            />
          </div>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center hover:border-white/10 hover:bg-white/[0.04] transition-all"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors"
                  style={{
                    backgroundColor: "rgba(var(--color-primary-rgb),0.1)",
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <h3 className="text-[var(--color-text-secondary)] font-medium text-sm">
                  {info.label}
                </h3>
                <p className="text-[var(--color-text-muted)] text-xs mt-1 break-all">
                  {info.value}
                </p>
              </motion.a>
            );
          })}
        </div>

        {/* Email Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-white/[0.06] bg-transparent backdrop-blur-[2px] p-5 mb-10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(var(--color-primary-rgb),0.1)",
                }}
              >
                <FiMail
                  className="w-4 h-4"
                  style={{ color: "var(--color-primary)" }}
                />
              </div>
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm font-medium">
                  Quick Copy
                </p>
                <p className="text-[var(--color-text-muted)] text-xs font-mono">
                  yashchavda2004@gmail.com
                </p>
              </div>
            </div>
            <motion.button
              onClick={copyEmail}
              className={`px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all border ${
                copied
                  ? "border-green-500/50 bg-green-500/10 text-green-400"
                  : "border-white/10 bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? <FiCheck className="w-3.5 h-3.5" /> : <FiCopy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Email"}
            </motion.button>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[var(--color-text-muted)] text-sm mb-4">
            Find me on social media
          </p>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center hover:border-white/10 hover:bg-white/[0.04] transition-all group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div
            className="inline-block rounded-2xl p-8 border"
            style={{
              borderColor: "rgba(var(--color-primary-rgb),0.2)",
              background: "rgba(var(--color-primary-rgb),0.03)",
            }}
          >
            <p className="text-2xl md:text-3xl font-bold text-neutral-100 mb-2">
              Open to Opportunities
            </p>
            <p className="text-[var(--color-text-muted)] text-sm mb-4">
              Looking for full-time roles in Software Engineering, AI Systems, Backend Architecture
            </p>
            <a
              href="/Yash_Chavda_CV.pdf"
              download="Yash_Chavda_CV.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-white/[0.08] bg-white/5 hover:bg-white/10 hover:border-white/[0.16] transition-all duration-300"
            >
              <FiDownload className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
