'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiCopy, FiCheck } from 'react-icons/fi';

const contactInfo = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'yashchavda2004@gmail.com',
    href: 'mailto:yashchavda2004@gmail.com',
    color: 'teal',
  },
  {
    icon: FiPhone,
    label: 'Phone',
    value: '+91 70467 83983',
    href: 'tel:+917046783983',
    color: 'terra',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'Ahmedabad, India',
    href: '#',
    color: 'navy',
  },
];

const socialLinks = [
  {
    name: 'GitHub',
    icon: FiGithub,
    href: 'https://github.com/yashchavda0',
    color: '#333',
  },
  {
    name: 'LinkedIn',
    icon: FiLinkedin,
    href: 'https://linkedin.com',
    color: '#0077B5',
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('yashchavda2004@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-navy-950">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cream-100 mb-4">
            Let&apos;s <span className="text-teal-400">Connect</span>
          </h2>
          <div className="w-20 h-1 bg-teal-400 mx-auto rounded-full" />
          <p className="mt-6 text-navy-700 max-w-2xl mx-auto">
            Interested in working together? Let&apos;s discuss how we can build something amazing.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-navy-800 rounded-xl p-6 border-2 border-navy-700 hover:border-teal-400/50 transition-all duration-300 group hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    info.color === 'teal'
                      ? 'bg-teal-400/10 group-hover:bg-teal-400/20'
                      : info.color === 'terra'
                      ? 'bg-terra-cotta/10 group-hover:bg-terra-cotta/20'
                      : 'bg-navy-700 group-hover:bg-navy-600'
                  } transition-colors`}>
                    <Icon className={info.color === 'teal' ? 'text-teal-400' : info.color === 'terra' ? 'text-terra-cotta' : 'text-cream-100'} size={24} />
                  </div>
                  <h3 className="text-cream-100 font-semibold mb-1">{info.label}</h3>
                  <p className="text-navy-700 text-sm break-all">{info.value}</p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Email Copy Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-navy-800 rounded-xl p-6 border-2 border-navy-700 mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-teal-400/10 rounded-xl flex items-center justify-center">
                <FiMail className="text-teal-400" size={24} />
              </div>
              <div>
                <p className="text-cream-100 font-medium">Quick Copy Email</p>
                <p className="text-navy-700 text-sm font-mono">yashchavda2004@gmail.com</p>
              </div>
            </div>
            <motion.button
              onClick={copyEmail}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                copied
                  ? 'bg-green-500/20 text-green-400 border border-green-400'
                  : 'bg-teal-400/10 text-teal-400 border border-teal-400/50 hover:bg-teal-400/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? <FiCheck /> : <FiCopy />}
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-navy-700 mb-6">Find me on social media</p>
          <div className="flex items-center justify-center space-x-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-navy-800 rounded-xl flex items-center justify-center border-2 border-navy-700 hover:border-teal-400/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="text-cream-100 group-hover:text-teal-400 transition-colors" size={24} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-navy-800 rounded-2xl p-8 border-2 border-teal-400/30">
            <p className="text-2xl md:text-3xl font-bold text-cream-100 mb-2">
              Open to Opportunities
            </p>
            <p className="text-navy-700">
              Looking for full-time roles in Software Engineering, Full Stack Development, and AI/ML
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
