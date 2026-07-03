'use client';

import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport } from 'ai';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const SUGGESTIONS = [
  "What is Adrian's background and experience?",
  "Tell me about Cascade Development Group (CDG)",
  "What projects has Adrian built?",
  "What certifications does Adrian hold?",
  "What technologies/skills does Adrian specialize in?",
  "Is Adrian open to job/internship opportunities?",
  "Tell me about the PharmaTrack project",
  "Tell me about the Solmate (E-Ferry) project",
  "How can I contact Adrian?"
];

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, status } = useChat({ transport: new TextStreamChatTransport({ api: '/api/chat' }) });
  const isLoading = status === 'streaming' || status === 'submitted';
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isLoading, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" suppressHydrationWarning={true}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-surface border border-border shadow-2xl rounded-2xl w-80 sm:w-96 mb-4 overflow-hidden flex flex-col"
            style={{ height: '520px', maxHeight: '75vh' }}
          >
            {/* Header */}
            <div className="bg-accent text-background p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold">AJ Assistant</h3>
                <p className="text-xs opacity-80">Ask me about Adrian's portfolio</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.length === 0 && (
                <div className="text-center text-secondary text-sm mt-4 space-y-2">
                  <p className="font-medium text-primary">Hi! I'm Adrian's AI assistant.</p>
                  <p className="text-xs">Click on any of the suggested questions below to learn more about my work!</p>
                </div>
              )}
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                    m.role === 'user' 
                      ? "bg-accent text-background ml-auto rounded-br-sm" 
                      : "bg-surface border border-border text-primary mr-auto rounded-bl-sm"
                  )}
                >
                  {m.parts.filter(p => p.type === 'text').map(p => p.text).join('')}
                </div>
              ))}
              {isLoading && (
                <div className="bg-surface border border-border text-primary mr-auto rounded-2xl rounded-bl-sm px-4 py-2 w-fit">
                  <Loader2 size={16} className="animate-spin" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Questions Area */}
            <div className="p-3 border-t border-border bg-surface flex flex-col gap-2 max-h-[190px] overflow-y-auto">
              <span className="text-[10px] font-mono text-secondary/60 uppercase tracking-wider px-1">
                Suggested Inquiries
              </span>
              <div className="flex flex-col gap-1.5">
                {SUGGESTIONS.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage({ text: suggestion })}
                    disabled={isLoading}
                    className="text-left text-xs bg-background hover:bg-border/30 border border-border/80 hover:border-accent/40 text-primary rounded-xl px-4 py-2.5 transition-all duration-200 disabled:opacity-50 active:scale-[0.98] cursor-pointer"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-accent hover:bg-accent-hover text-background rounded-full px-6 py-4 shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center gap-2 group"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
            <span className="font-bold">Chat with AJ</span>
          </>
        )}
      </button>
    </div>
  );
};
