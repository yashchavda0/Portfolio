'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiExternalLink, FiGithub, FiImage, FiTrendingUp, FiUsers } from 'react-icons/fi';

const projects = [
  {
    title: 'Imaginify',
    description: 'AI-powered image SaaS platform excelling in image processing with secure payment and advanced search capabilities. Shares transformation details and enables credit purchases via Stripe.',
    longDescription: 'Built a comprehensive AI image processing platform that transforms how users interact with visual content. Features include secure Stripe payments, advanced search, and transformation sharing.',
    features: ['AI Image Processing', 'Stripe Payments', 'Advanced Search', 'Credit System'],
    gradient: 'from-purple-500 to-pink-500',
    icon: FiImage,
    tech: ['Next.js', 'React', 'Stripe', 'Cloudinary'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Visionary Vest',
    description: 'Platform enabling users to invest in content creators and share in their success. Implemented user search and seamless investment functionality.',
    longDescription: 'Created an innovative investment platform connecting supporters with content creators. Features include user discovery, investment tracking, and success sharing mechanisms.',
    features: ['Creator Discovery', 'Investment System', 'User Search', 'Success Sharing'],
    gradient: 'from-blue-500 to-cyan-500',
    icon: FiTrendingUp,
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Document Processing Platform',
    description: 'API-driven document processing platform using on-premise OCR and NLP models to extract structured data with schema-based field extraction.',
    longDescription: 'Built enterprise-grade document intelligence platform with on-premise OCR, NLP-based extraction, and schema-driven processing for government and defense use cases.',
    features: ['OCR Pipeline', 'NLP Extraction', 'REST API', 'On-Premise'],
    gradient: 'from-green-500 to-emerald-500',
    icon: FiUsers,
    tech: ['Python', 'FastAPI', 'OCR', 'PostgreSQL'],
    github: '#',
    demo: '#',
  },
];

// Project Card Component with 3D Tilt Effect
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x - rect.width / 2);
    mouseY.set(y - rect.height / 2);
  };

  const rotateX = useTransform(mouseY, [-200, 200], [5, -5]);
  const rotateY = useTransform(mouseX, [-200, 200], [-5, 5]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ rotateX, rotateY }}
      className="perspective-1000"
    >
      <motion.div
        className="bg-navy-800 rounded-2xl overflow-hidden border-2 border-navy-700 hover:border-teal-400/50 transition-all duration-300 h-full"
        whileHover={{ y: -8 }}
      >
        {/* Visual Header with Creative Placeholder */}
        <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          {/* Abstract Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }} />
          </div>
          {/* Code snippet decoration */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm rounded-lg p-3 font-mono text-xs text-white/80 overflow-hidden">
            <div className="flex">
              <span className="text-green-400">const</span>
              <span className="text-blue-400 ml-1">project</span>
              <span className="text-white ml-1">=</span>
              <span className="text-yellow-400 ml-1">&quot;{project.title.toLowerCase()}&quot;</span>
            </div>
          </div>
          {/* Icon */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <project.icon size={24} className="text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-cream-100 mb-2">{project.title}</h3>
          <p className="text-navy-700 text-sm mb-4 line-clamp-2">{project.description}</p>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.features.map((feature, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-navy-900 text-teal-400 text-xs rounded-full border border-teal-400/20"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-navy-900 text-terra-cotta text-xs rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center space-x-4 pt-4 border-t border-navy-700">
            <motion.a
              href={project.github}
              className="flex items-center text-teal-400 hover:text-teal-300 transition-colors text-sm"
              whileHover={{ x: 3 }}
            >
              <FiGithub className="mr-1" />
              Code
            </motion.a>
            <motion.a
              href={project.demo}
              className="flex items-center text-teal-400 hover:text-teal-300 transition-colors text-sm"
              whileHover={{ x: 3 }}
            >
              <FiExternalLink className="mr-1" />
              Live Demo
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4">
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
            What I&apos;ve <span className="text-teal-400">Built</span>
          </h2>
          <div className="w-20 h-1 bg-teal-400 mx-auto rounded-full" />
          <p className="mt-6 text-navy-700 max-w-2xl mx-auto">
            A showcase of my projects, each crafted with care and attention to detail.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/yashchavda0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border-2 border-teal-400 text-teal-400 rounded-lg hover:bg-teal-400/10 transition-colors"
          >
            <FiGithub className="mr-2" />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
