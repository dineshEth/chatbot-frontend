"use client";

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export const TypingIndicator = () => {
  const dotVariants = {
    bounce: {
      y: [0, -5, 0],
      opacity: [1, 0.5, 1],
      transition: { duration: 0.6, repeat: Infinity },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex justify-start mb-4"
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
          <Bot className="w-5 h-5 text-white" />
        </div>

        {/* Typing dots */}
        <div className="flex flex-col">
          <div className="px-4 py-3 rounded-2xl bg-[var(--color-assistant-bubble)] rounded-bl-sm">
            <div className="flex gap-1">
              <motion.div
                variants={dotVariants}
                animate="bounce"
                style={{ animationDelay: '0s' }}
                className="w-2 h-2 rounded-full bg-[var(--color-primary)]"
              />
              <motion.div
                variants={dotVariants}
                animate="bounce"
                style={{ animationDelay: '0.2s' }}
                className="w-2 h-2 rounded-full bg-[var(--color-primary)]"
              />
              <motion.div
                variants={dotVariants}
                animate="bounce"
                style={{ animationDelay: '0.4s' }}
                className="w-2 h-2 rounded-full bg-[var(--color-primary)]"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
