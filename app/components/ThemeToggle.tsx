'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-12 h-12 rounded-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
        color: 'var(--background)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 180 : 0 
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)',
        }}
      />
      <motion.span
        className="relative z-10"
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 180 : 0 
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {theme === 'light' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.span>
    </motion.button>
  );
}
