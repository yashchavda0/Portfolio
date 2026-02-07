import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020c1b',
          900: '#0a192f',
          800: '#112240',
          700: '#233554',
        },
        teal: {
          400: '#64ffda',
          300: '#7affea',
        },
        terra: {
          cotta: '#e07a5f',
        },
        cream: {
          100: '#f4f1de',
          200: '#e8e4cc',
        },
        charcoal: '#1e293b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'typewriter': 'typewriter 3.5s steps(40, end)',
        'slide-up': 'slide-up 0.5s ease-out',
        'border-draw': 'border-draw 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(100, 255, 218, 0.3)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(100, 255, 218, 0.6)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'border-draw': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
