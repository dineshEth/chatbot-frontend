"use client";

import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 px-6"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 bg-white/20 rounded-full">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">ChatBot</h1>
            <p className="text-xs opacity-80">Powered by Mistral AI</p>
          </div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="hidden md:block"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        
        <ThemeToggle />
      </div>
    </motion.header>
  );
};
