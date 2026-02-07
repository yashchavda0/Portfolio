'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin, FiMail, FiCode, FiCpu, FiDatabase } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const roles = ['Software Engineer', 'Full Stack Developer', 'AI/ML Enthusiast'];

const floatingIcons = [
  { icon: FiCode, delay: 0, x: -100, y: -50 },
  { icon: FiCpu, delay: 0.5, x: 100, y: -80 },
  { icon: FiDatabase, delay: 1, x: -80, y: 60 },
  { icon: FiCode, delay: 1.5, x: 120, y: 40 },
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const role = roles[currentRole];

    const typeWriter = () => {
      let i = 0;
      setDisplayText('');

      const type = () => {
        if (i < role.length) {
          setDisplayText(role.slice(0, i + 1));
          i++;
          timeout = setTimeout(type, 100);
        } else {
          timeout = setTimeout(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }, 2000);
        }
      };

      type();
    };

    typeWriter();

    return () => clearTimeout(timeout);
  }, [currentRole]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #64ffda 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating tech icons */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {floatingIcons.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              className="absolute text-teal-400/30"
              style={{
                left: '50%',
                top: '50%',
                x: item.x,
                y: item.y,
              }}
              animate={{
                y: item.y + Math.sin(Date.now() / 1000 + index) * 20,
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: item.delay,
              }}
            >
              <Icon size={40} />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="text-center z-10 max-w-4xl mx-auto"
        style={{ y: y1, opacity }}
      >
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-teal-400 text-lg md:text-xl mb-4 font-mono"
        >
          Hi, my name is
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-cream-100 mb-6"
        >
          Yash Chavda
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-4xl lg:text-5xl text-navy-700 mb-8 h-16 font-mono"
        >
          <span className="text-terra-cotta">{displayText}</span>
          <span className="animate-pulse">|</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-navy-700 max-w-2xl mx-auto mb-12"
        >
          Building intelligence, one line at a time. Crafting scalable applications
          with <span className="text-teal-400">Next.js</span>,{' '}
          <span className="text-teal-400">Python</span>, and{' '}
          <span className="text-teal-400">AI/ML</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={scrollToAbout}
            className="magnetic-btn px-8 py-4 border-2 border-teal-400 text-teal-400 rounded-lg font-medium hover:bg-teal-400/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
          </motion.button>
          <motion.a
            href="https://github.com/yashchavda0"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn px-8 py-4 bg-teal-400 text-navy-900 rounded-lg font-medium hover:bg-teal-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View GitHub
          </motion.a>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center space-x-8"
        >
          <motion.a
            href="https://github.com/yashchavda0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy-700 hover:text-teal-400 transition-colors"
            whileHover={{ scale: 1.2, rotate: 5 }}
          >
            <FiGithub size={28} />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy-700 hover:text-teal-400 transition-colors"
            whileHover={{ scale: 1.2, rotate: 5 }}
          >
            <FiLinkedin size={28} />
          </motion.a>
          <motion.a
            href="mailto:yashchavda2004@gmail.com"
            className="text-navy-700 hover:text-teal-400 transition-colors"
            whileHover={{ scale: 1.2, rotate: 5 }}
          >
            <FiMail size={28} />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={scrollToAbout}
          className="text-teal-400 hover:text-teal-300 transition-colors"
          aria-label="Scroll down"
        >
          <FiArrowDown size={32} />
        </button>
      </motion.div>
    </section>
  );
}
