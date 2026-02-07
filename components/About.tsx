'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiCode, FiBriefcase, FiMapPin } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';

const stats = [
  { icon: FiCode, value: 10, label: 'Projects Built', suffix: '+' },
  { icon: FiBriefcase, value: 2, label: 'Years Experience', suffix: '+' },
  { icon: FaTrophy, value: 1, label: 'Hackathon Won', suffix: '' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [counters, setCounters] = useState({ projects: 0, experience: 0, awards: 0 });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      stats.forEach((stat, index) => {
        const target = stat.value;
        const stepValue = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += stepValue;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          setCounters((prev) => {
            const newCounters = { ...prev };
            if (index === 0) newCounters.projects = Math.floor(current);
            if (index === 1) newCounters.experience = Math.floor(current);
            if (index === 2) newCounters.awards = Math.floor(current);
            return newCounters;
          });
        }, stepDuration);
      });
    }
  }, [isInView]);

  return (
    <section id="about" className="py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cream-100 mb-4">
            About <span className="text-teal-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-teal-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Card with Initials */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(100, 255, 218, 0.3)',
                    '0 0 40px rgba(100, 255, 218, 0.5)',
                    '0 0 20px rgba(100, 255, 218, 0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative bg-navy-800 rounded-2xl p-8 border-2 border-teal-400/30">
                {/* YC Initials */}
                <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-navy-700 to-navy-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                  {/* Animated pattern background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `linear-gradient(45deg, #64ffda 25%, transparent 25%, transparent 75%, #64ffda 75%, #64ffda), linear-gradient(45deg, #64ffda 25%, transparent 25%, transparent 75%, #64ffda 75%, #64ffda)`,
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 10px 10px',
                    }} />
                  </div>
                  {/* Initials */}
                  <span className="relative text-6xl md:text-8xl font-bold text-teal-400 font-mono">
                    YC
                  </span>
                </div>
                {/* Location Badge */}
                <div className="mt-6 flex items-center justify-center text-navy-700">
                  <FiMapPin className="mr-2 text-teal-400" />
                  <span>Ahmedabad, India</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-cream-100 mb-6">
              The Person Behind <span className="text-teal-400">the Code</span>
            </h3>
            <p className="text-navy-700 text-lg leading-relaxed mb-6">
              I'm an aspiring software engineer with practical experience in full-stack development,
              well-versed in software development life cycles. I contributed to creating a student portal
              featuring a user-friendly dashboard and dynamic database integration.
            </p>
            <p className="text-navy-700 text-lg leading-relaxed mb-8">
              Currently expanding my skill set in <span className="text-teal-400">Data Science</span> and{' '}
              <span className="text-terra-cotta">Machine Learning</span>, aiming to apply programming
              expertise to develop reliable and scalable applications that make a difference.
            </p>

            {/* Quote */}
            <div className="relative pl-6 border-l-4 border-teal-400 py-4">
              <p className="text-cream-100 text-lg italic font-mono">
                &quot;Code is poetry, and every line is a verse in the story of innovation.&quot;
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-6 mt-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const value = index === 0 ? counters.projects : index === 1 ? counters.experience : counters.awards;
            return (
              <motion.div
                key={stat.label}
                className="bg-navy-800 rounded-xl p-6 text-center border border-navy-700 hover:border-teal-400/50 transition-colors"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-teal-400/10 rounded-full flex items-center justify-center">
                    <Icon className="text-teal-400" size={24} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-cream-100 mb-2">
                  {value}
                  {stat.suffix}
                </div>
                <div className="text-sm text-navy-700">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
