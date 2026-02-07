'use client';

import { motion } from 'framer-motion';
import { FiAward, FiBookOpen, FiTarget } from 'react-icons/fi';

const education = [
  {
    institution: 'LD College of Engineering',
    degree: 'B.E. in Information Technology',
    period: '2021 - 2025',
    gpa: '8.92',
    highlights: ['AI/ML Minor', 'Dean\'s List'],
    icon: FiBookOpen,
    color: 'teal',
  },
  {
    institution: 'Devasya International Public School',
    degree: 'Higher Secondary Certificate (H.S.C)',
    period: '2019 - 2021',
    percentage: '88.62%',
    highlights: ['Science Stream'],
    icon: FiTarget,
    color: 'terra',
  },
];

const achievements = [
  {
    title: 'Hackathon Winner',
    event: 'Ingenious Hackathon 5.0',
    description: 'Recognized for innovative idea and outstanding UI/UX design',
    icon: '🏆',
  },
  {
    title: 'Full Stack Developer',
    event: 'Professional Experience',
    description: 'Built B2B solutions with NextJS, Python, GraphQL, and PostgreSQL',
    icon: '💼',
  },
  {
    title: 'AI/ML Enthusiast',
    event: 'Continuous Learning',
    description: 'Expanding expertise in data science and machine learning',
    icon: '🤖',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-4">
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
            Education & <span className="text-teal-400">Achievements</span>
          </h2>
          <div className="w-20 h-1 bg-teal-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Education Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3 mb-8"
            >
              <FiBookOpen className="text-teal-400" size={28} />
              <h3 className="text-2xl font-bold text-cream-100">Education</h3>
            </motion.div>

            <div className="space-y-6">
              {education.map((edu, index) => {
                const Icon = edu.icon;
                return (
                  <motion.div
                    key={edu.institution}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-navy-800 rounded-xl p-6 border-2 border-navy-700 hover:border-teal-400/50 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        edu.color === 'teal' ? 'bg-teal-400/10' : 'bg-terra-cotta/10'
                      }`}>
                        <Icon className={edu.color === 'teal' ? 'text-teal-400' : 'text-terra-cotta'} size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-cream-100">{edu.degree}</h4>
                        <p className="text-teal-400 font-medium">{edu.institution}</p>
                        <p className="text-navy-700 text-sm">{edu.period}</p>
                        <div className="mt-3 flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            edu.color === 'teal'
                              ? 'bg-teal-400/20 text-teal-400'
                              : 'bg-terra-cotta/20 text-terra-cotta'
                          }`}>
                            {edu.gpa ? `GPA: ${edu.gpa}` : `${edu.percentage}%`}
                          </span>
                          {edu.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-navy-900 text-cream-100 text-xs rounded-full"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Achievements Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3 mb-8"
            >
              <FiAward className="text-terra-cotta" size={28} />
              <h3 className="text-2xl font-bold text-cream-100">Achievements</h3>
            </motion.div>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-navy-800 rounded-xl p-5 border-2 border-navy-700 hover:border-terra-cotta/50 transition-all duration-300 group hover:scale-[1.02]"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform">
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-cream-100 group-hover:text-teal-400 transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="text-terra-cotta text-sm font-medium">{achievement.event}</p>
                      <p className="text-navy-700 text-sm mt-2">{achievement.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
