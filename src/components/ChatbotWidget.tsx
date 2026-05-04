'use client';

import React, { useState } from 'react';
import { useChat } from 'ai/react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" suppressHydrationWarning={true}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-surface border border-border shadow-2xl rounded-2xl w-80 sm:w-96 mb-4 overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: '70vh' }}
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
                <p className="text-center text-secondary text-sm mt-4">
                  Hi! I'm an AI trained on Adrian's portfolio. Ask me anything!
                </p>
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
                  {m.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-surface border border-border text-primary mr-auto rounded-2xl rounded-bl-sm px-4 py-2 w-fit">
                  <Loader2 size={16} className="animate-spin" />
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-surface flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your question..."
                className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent text-primary"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-accent hover:bg-accent-hover disabled:opacity-50 text-background rounded-full p-2 h-10 w-10 flex items-center justify-center transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
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
