"use client";

import { Message } from '@/types';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  index: number;
}

export const ChatMessage = ({ message, index }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const bubbleVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <motion.div
        variants={bubbleVariants}
        className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}
      >
        <div
          className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {/* Avatar */}
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isUser ? 'bg-primary' : 'bg-gradient-to-br from-primary to-secondary'}`}
          >
            {isUser ? (
              <User className="w-5 h-5 text-white" />
            ) : (
              <Bot className="w-5 h-5 text-white" />
            )}
          </div>

          {/* Message content */}
          <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
            <div
              className={`px-4 py-3 rounded-2xl ${isUser ? 'bg-[var(--color-user-bubble)] text-[var(--color-user-text)] rounded-br-sm' : 'bg-[var(--color-assistant-bubble)] text-[var(--color-assistant-text)] rounded-bl-sm'}`}
            >
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
            </div>
            <span className="text-xs text-muted mt-1">
              {format(message.timestamp, 'HH:mm')}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
