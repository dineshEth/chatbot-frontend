"use client";

import { useState, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-[var(--color-surface)] border-t border-[var(--color-border)] p-4"
    >
      <div className="max-w-4xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            disabled={isLoading}
            className="w-full pl-10 pr-12 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-[var(--color-foreground)]"
          />
        </div>
        <motion.button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-xl ${(!input.trim() || isLoading) ? 'bg-muted opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-secondary cursor-pointer'}`}
        >
          <Send className={`w-5 h-5 ${(!input.trim() || isLoading) ? 'text-white' : 'text-white'}`} />
        </motion.button>
      </div>
    </motion.div>
  );
};
