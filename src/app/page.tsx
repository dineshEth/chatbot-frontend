"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/context/ChatContext';
import { Header } from '@/components/Header';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { TypingIndicator } from '@/components/TypingIndicator';
import { MessageCircle } from 'lucide-react';

export default function Home() {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();

  const handleSend = (message: string) => {
    sendMessage({ prompt: message });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />
      
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4"
      >
        {/* Chat container */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="sync">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl mb-6"
                >
                  <MessageCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Welcome to ChatBot</h2>
                <p className="text-muted text-center max-w-md">
                  Start a conversation with our AI assistant. Ask any question and get intelligent responses powered by Mistral AI.
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {messages.map((message, index) => (
                  <ChatMessage key={message.id} message={message} index={index} />
                ))}
                {isLoading && <TypingIndicator />}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg my-2"
            >
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}
        </div>

        {/* Input area */}
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </motion.main>
    </div>
  );
}
