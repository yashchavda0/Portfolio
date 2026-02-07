'use client';

import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-bold text-teal-400 font-mono"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            &lt;YC /&gt;
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollTo(item.href)}
                className="text-cream-100 hover:text-teal-400 transition-colors duration-200 text-sm font-medium"
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="https://github.com/yashchavda0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-100 hover:text-teal-400 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <FiGithub size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-100 hover:text-teal-400 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <FiLinkedin size={20} />
            </motion.a>
            <motion.a
              href="mailto:yashchavda2004@gmail.com"
              className="text-cream-100 hover:text-teal-400 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <FiMail size={20} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cream-100 p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-900/95 backdrop-blur-md border-t border-navy-800"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollTo(item.href)}
                  className="block w-full text-left text-cream-100 hover:text-teal-400 transition-colors py-2 text-lg"
                >
                  {item.name}
                </motion.button>
              ))}
              <div className="flex items-center space-x-6 pt-4 border-t border-navy-800">
                <motion.a
                  href="https://github.com/yashchavda0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-100 hover:text-teal-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiGithub size={24} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-100 hover:text-teal-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiLinkedin size={24} />
                </motion.a>
                <motion.a
                  href="mailto:yashchavda2004@gmail.com"
                  className="text-cream-100 hover:text-teal-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiMail size={24} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
