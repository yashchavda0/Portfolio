'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiBriefcase, FiArrowRight, FiExternalLink } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa';
import { SiNextdotjs, SiPostgresql, SiGraphql, SiFastapi } from 'react-icons/si';

const experiences = [
  {
    title: 'Trainee Software Engineer',
    company: 'Silver Touch Technologies Ltd.',
    location: 'Ahmedabad',
    period: 'Present',
    description: 'Building B2B solutions with cutting-edge tech stack.',
    highlights: [
      { text: 'Tabular Accuracy', value: '99%', icon: 'target' },
      { text: 'Query Performance', value: '+40%', icon: 'zap' },
      { text: 'Core Optimization', value: '15-20%', icon: 'trending-up' },
    ],
    achievements: [
      'Built B2B solutions using NextJS, Python, GraphQL, PostgreSQL, and FastAPI',
      'Designed on-premise OCR pipeline for secure document processing',
      'Developed NLP-based pipelines achieving 99% tabular accuracy',
      'Architected schema-driven document processing platform',
      'Implemented webhook-based APIs for third-party integrations',
      'Delivered 2-3 POCs for government and defense organizations',
      'Replaced similarity search with vector database (40% improvement)',
      'Refactored backend architecture (15-20% performance boost)',
    ],
    tech: [SiNextdotjs, SiPostgresql, SiGraphql, SiFastapi, FaPython],
  },
  {
    title: 'MERN Stack Intern',
    company: 'LD College of Engineering',
    location: 'Ahmedabad',
    period: '2023',
    description: 'Developed dynamic solutions for educational workflows.',
    highlights: [
      { text: 'Manual Tasks Reduced', value: '30%', icon: 'trending-down' },
      { text: 'Team Collaboration', value: '3+', icon: 'users' },
    ],
    achievements: [
      'Developed dynamic dashboard with real-time email notifications',
      'Built Excel-based data extraction and linking systems',
      'Reduced manual follow-ups by 30%',
      'Collaborated using Git with 3+ contributors',
      'Enforced modular, object-oriented coding practices',
    ],
    tech: [FaReact, FaNodeJs, FaDatabase, SiNextdotjs],
  },
];

const iconMap: Record<string, string> = {
  target: '🎯',
  zap: '⚡',
  'trending-up': '📈',
  'trending-down': '📉',
  users: '👥',
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section id="experience" className="py-24 px-4 bg-navy-950" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cream-100 mb-4">
            Experience <span className="text-teal-400">Timeline</span>
          </h2>
          <div className="w-20 h-1 bg-teal-400 mx-auto rounded-full" />
          <p className="mt-6 text-navy-700 max-w-2xl mx-auto">
            My professional journey, highlighting key contributions and impact.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-terra-cotta" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto md:w-1/2'
              }`}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-4 top-6 w-4 h-4 bg-teal-400 rounded-full border-4 border-navy-950 transform -translate-x-1/2 z-10 ${
                index % 2 === 0 ? '' : 'md:left-auto md:right-0 md:translate-x-1/2'
              }`} />

              {/* Experience Card */}
              <div
                className={`ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                }`}
              >
                <motion.div
                  className="bg-navy-800 rounded-2xl p-6 border-2 border-navy-700 hover:border-teal-400/50 transition-all duration-300 cursor-pointer"
                  onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      <h3 className="text-xl font-bold text-cream-100 mb-1">{exp.title}</h3>
                      <p className="text-teal-400 font-medium">{exp.company}</p>
                      <p className="text-navy-700 text-sm mt-1">
                        {exp.location} • {exp.period}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-teal-400"
                    >
                      <FiExternalLink size={20} />
                    </motion.div>
                  </div>

                  <p className="text-navy-700 mb-4">{exp.description}</p>

                  {/* Metric Badges */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {exp.highlights.map((highlight) => (
                      <motion.div
                        key={highlight.text}
                        className="relative group"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-sm group-hover:bg-teal-400/30 transition-all" />
                        <div className="relative bg-navy-900 rounded-full px-4 py-2 border border-teal-400/30 flex items-center space-x-2">
                          <span className="text-lg">{iconMap[highlight.icon]}</span>
                          <span className="text-teal-400 font-bold">{highlight.value}</span>
                          <span className="text-cream-100 text-sm">{highlight.text}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Expandable Achievements */}
                  <motion.div
                    initial={false}
                    animate={{ height: expandedIndex === index ? 'auto' : 0, opacity: expandedIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-navy-700">
                      <h4 className="text-cream-100 font-semibold mb-3">Key Contributions:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start text-navy-700"
                          >
                            <span className="text-teal-400 mr-2 mt-1">→</span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-navy-700">
                    {exp.tech.map((TechIcon, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center text-teal-400 hover:bg-teal-400/10 transition-colors"
                        title={TechIcon.name}
                      >
                        <TechIcon size={18} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
