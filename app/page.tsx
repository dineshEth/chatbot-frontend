'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Heart, Briefcase, DollarSign, Lightbulb, Send, Loader2 } from 'lucide-react';
import { sendMessage } from './lib/api';

interface BotConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  systemPrompt: string;
}

const BOTS: BotConfig[] = [
  {
    id: 'chatbot',
    name: 'Chatbot',
    description: 'General purpose AI assistant for any conversation',
    icon: <Bot className="w-8 h-8" />,
    color: 'var(--primary)',
    systemPrompt: 'You are a helpful AI assistant. Respond in a friendly and informative manner.',
  },
  {
    id: 'lovebot',
    name: 'LoveBot',
    description: 'Relationship and love advice specialist',
    icon: <Heart className="w-8 h-8" />,
    color: '#ff6b9d',
    systemPrompt: 'You are a love and relationship expert. Provide empathetic and wise advice on matters of the heart.',
  },
  {
    id: 'businessbot',
    name: 'BusinessBot',
    description: 'Business strategy and entrepreneurship advisor',
    icon: <Briefcase className="w-8 h-8" />,
    color: '#1e88e5',
    systemPrompt: 'You are a business expert. Provide strategic advice on entrepreneurship, marketing, and business growth.',
  },
  {
    id: 'moneybot',
    name: 'MoneyBot',
    description: 'Financial advice and investment guidance',
    icon: <DollarSign className="w-8 h-8" />,
    color: '#ffc107',
    systemPrompt: 'You are a financial advisor. Provide sound advice on investments, savings, and personal finance.',
  },
  {
    id: 'solutionbot',
    name: 'SolutionBot',
    description: 'Problem-solving and creative thinking partner',
    icon: <Lightbulb className="w-8 h-8" />,
    color: '#4caf50',
    systemPrompt: 'You are a creative problem solver. Help users think through challenges and find innovative solutions.',
  },
];

interface Message {
  role: string;
  content: string;
}

export default function Home() {
  const [selectedBot, setSelectedBot] = useState<BotConfig | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const selectBot = (bot: BotConfig) => {
    setSelectedBot(bot);
    setMessages([]);
  };

  const goBack = () => {
    setSelectedBot(null);
    setMessages([]);
    setInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !selectedBot) return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const fullPrompt = `${selectedBot.systemPrompt}\n\nUser: ${input}`;
      const response = await sendMessage(fullPrompt);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, there was an error processing your request.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedBot) {
    return (
      <main className="min-h-screen p-4 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ color: 'var(--primary)' }}
            >
              Chat with AI
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-accent max-w-2xl mx-auto"
            >
              Choose an AI companion to start your conversation
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {BOTS.map((bot, index) => (
              <motion.button
                key={bot.id}
                onClick={() => selectBot(bot)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, var(--primary-light) 0%, transparent 70%)',
                  }}
                />
                
                <motion.div
                  className="mb-4"
                  style={{ color: bot.color || 'var(--foreground)' }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {bot.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                  {bot.name}
                </h3>
                <p className="text-sm opacity-90" style={{ color: 'var(--foreground)' }}>
                  {bot.description}
                </p>
                
                <motion.div
                  className="absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{ x: 5 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.button>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center mt-12 text-sm text-accent opacity-70"
          >
            Powered by Mistral AI
          </motion.p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 mb-6"
        >
          <motion.button
            onClick={goBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
              color: 'var(--background)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <span
              className="text-2xl"
              style={{ color: selectedBot.color || 'var(--primary)' }}
            >
              {selectedBot.icon}
            </span>
            <div>
              <h1 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                {selectedBot.name}
              </h1>
              <p className="text-sm opacity-70" style={{ color: 'var(--foreground)' }}>
                {selectedBot.description}
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="border border-primary/20 rounded-2xl overflow-hidden mb-6 max-h-[60vh] overflow-y-auto"
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="p-6 space-y-6">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                  }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Bot className="w-8 h-8" style={{ color: 'var(--background)' }} />
                </motion.div>
                <p className="text-accent">
                  Start chatting with {selectedBot.name}...
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <motion.div
                      className={`max-w-[80%] rounded-2xl px-6 py-4 ${msg.role === 'user'
                        ? 'bg-primary text-background rounded-br-sm'
                        : 'bg-accent/30 text-foreground rounded-bl-sm'
                        }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-start"
              >
                <div className="bg-accent/30 rounded-2xl px-6 py-4 rounded-bl-sm">
                  <motion.div className="flex gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="flex gap-3"
        >
          <motion.input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${selectedBot.name}...`}
            disabled={isLoading}
            whileFocus={{ scale: 1.01 }}
            className="flex-1 rounded-full px-6 py-4 bg-background/80 backdrop-blur-sm border border-primary/20 text-foreground placeholder-accent/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
              color: 'var(--background)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            }}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center mt-6 text-xs text-accent/60"
        >
          {selectedBot.name} is powered by Mistral AI. Responses may contain errors.
        </motion.p>
      </div>
    </main>
  );
}
