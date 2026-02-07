'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  FaPython, FaJava, FaReact, FaNodeJs, FaDatabase,
} from 'react-icons/fa';
import { CgCPlusPlus } from 'react-icons/cg';
import { SiNextdotjs, SiExpress, SiMysql, SiPostgresql, SiMongodb, SiGraphql, SiNumpy } from 'react-icons/si';

const skillCategories = [
  {
    title: 'Languages',
    icon: '💻',
    skills: [
      { name: 'Python', level: 90, icon: FaPython, color: '#3776AB' },
      { name: 'Java', level: 85, icon: FaJava, color: '#007396' },
      { name: 'C++', level: 80, icon: CgCPlusPlus, color: '#00599C' },
      { name: 'C', level: 75, icon: 'C', color: '#A8B9CC' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: '🚀',
    skills: [
      { name: 'React.js', level: 90, icon: FaReact, color: '#61DAFB' },
      { name: 'Next.js', level: 85, icon: SiNextdotjs, color: '#000000' },
      { name: 'Node.js', level: 85, icon: FaNodeJs, color: '#339933' },
      { name: 'Express.js', level: 80, icon: SiExpress, color: '#000000' },
      { name: 'NumPy', level: 75, icon: SiNumpy, color: '#013243' },
    ],
  },
  {
    title: 'Databases',
    icon: '🗄️',
    skills: [
      { name: 'PostgreSQL', level: 85, icon: SiPostgresql, color: '#336791' },
      { name: 'MySQL', level: 80, icon: SiMysql, color: '#4479A1' },
      { name: 'MongoDB', level: 75, icon: SiMongodb, color: '#47A248' },
      { name: 'GraphQL', level: 80, icon: SiGraphql, color: '#E10098' },
    ],
  },
  {
    title: 'Core Concepts',
    icon: '📚',
    skills: [
      { name: 'Data Structures', level: 90, icon: 'DS', color: '#64ffda' },
      { name: 'Algorithms', level: 85, icon: 'AL', color: '#e07a5f' },
      { name: 'OOP', level: 90, icon: 'OOP', color: '#64ffda' },
      { name: 'DBMS', level: 85, icon: 'DB', color: '#e07a5f' },
    ],
  },
];

function SkillBar({ skill, index }: { skill: typeof skillCategories[0]['skills'][0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setWidth(skill.level), index * 100);
    }
  }, [isInView, index, skill.level]);

  const Icon = typeof skill.icon === 'string' ? null : skill.icon;

  return (
    <div ref={ref} className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {Icon ? (
            <Icon size={18} style={{ color: skill.color }} />
          ) : (
            <span className="text-xs font-mono font-bold" style={{ color: skill.color }}>{typeof skill.icon === 'string' ? skill.icon : ''}</span>
          )}
          <span className="text-cream-100 text-sm">{skill.name}</span>
        </div>
        <span className="text-teal-400 text-sm font-mono">{skill.level}%</span>
      </div>
      <div className="h-2 bg-navy-900 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${skill.level}%` : 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 px-4 bg-navy-950" ref={ref}>
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
            Technical <span className="text-teal-400">Arsenal</span>
          </h2>
          <div className="w-20 h-1 bg-teal-400 mx-auto rounded-full" />
          <p className="mt-6 text-navy-700 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="bg-navy-800 rounded-2xl p-6 border-2 border-navy-700 hover:border-teal-400/50 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-lg font-bold text-cream-100">{category.title}</h3>
              </div>

              {/* Skill Bars */}
              {category.skills.map((skill, skillIndex) => (
                <SkillBar key={skill.name} skill={skill} index={skillIndex} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-navy-700">
            Always learning and expanding my skill set. Currently exploring{' '}
            <span className="text-teal-400">Machine Learning</span> and{' '}
            <span className="text-terra-cotta">Data Science</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
