'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Loader2 } from 'lucide-react';
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

const ANSWERS: Record<string, string> = {
  "What is Adrian's background and experience?": 
    "Adrian Salinas is a Full-Stack AI Developer, IT Solutions Founder, and student based in Iloilo City, Philippines. He is currently pursuing his IT degree (2nd Year — GWA 1.85) while leading Cascade Development Group (CDG). He specializes in shipping high-quality Next.js, TypeScript, and Supabase systems.",

  "Tell me about Cascade Development Group (CDG)": 
    "Cascade Development Group (CDG) is Adrian's IT solutions startup delivering web development, database architecture, and technical consulting. He operates CDG solo across the full business lifecycle, architecting and deploying clean, production-ready web apps for clients using Next.js and Supabase.",

  "What projects has Adrian built?": 
    "Adrian has built several major projects:\n\n• PharmaTrack: A QR attendance tracking system supporting 700+ students at the University of San Agustin.\n• Solmate (E-Ferry): A real-time IoT dashboard that won 1st Runner-Up at the Nexus PH Hackathon 2026.\n• Commit: An Agile developer workspace productivity tool.\n• Famly: A collaborative family budget tracker.",

  "What certifications does Adrian hold?": 
    "Adrian holds the following certifications:\n\n1. Advanced Scrum Master (Agile Enterprise, 2026)\n2. AWS AI Practitioner (Udacity - Accenture, 2026)\n3. Project Management - Waterfall & Agile (Udemy, 2026)\n4. Design Thinking Guide for Successful Professionals (Udemy, 2025)\n5. Project Management 101 - Dual Certificate (Udemy, 2025)\n6. Certificate of Completion in IT Operations (InnovaThink Corporation, 2024)",

  "What technologies/skills does Adrian specialize in?": 
    "Adrian's core specialties include:\n\n• Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion\n• Backend & Database: Node.js, Python, PostgreSQL, Supabase\n• Architecture: REST APIs, IoT integrations, AI/ML integrations, and Agile/Scrum workflows.",

  "Is Adrian open to job/internship opportunities?": 
    "Yes, absolutely! Adrian is actively looking for internships, part-time, or remote roles where he can apply his full-stack capabilities. He is available immediately and is open to teams that welcome his status as an IT student.",

  "Tell me about the PharmaTrack project": 
    "PharmaTrack is a QR-based attendance tracking system deployed for the USA Pharmacy Department. It replaced paper attendance for 700+ students, utilizing Next.js 14, Supabase Auth, and PostgreSQL row-level security with tailored student, faculty, and admin dashboards.",

  "Tell me about the Solmate (E-Ferry) project": 
    "Solmate (also known as E-Ferry) is an IoT-powered telemetry and financial planning dashboard built for electric ferries. Deployed as a working MVP in under 3 days, it won 1st Runner-Up at the Nexus Philippines Hackathon 2026.",

  "How can I contact Adrian?": 
    "You can reach Adrian through the following channels:\n\n• Email: ajsalinas005@gmail.com\n• LinkedIn: linkedin.com/in/adrian-justin-salinas-a4768b226/\n• GitHub: github.com/JustineSalinas\n\nYou can also download his resume directly from the header on the main page!"
};

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isLoading, isOpen]);

  const handleInquiryClick = (suggestion: string) => {
    if (isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      content: suggestion
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const answer = ANSWERS[suggestion] || "I don't have information on that question.";
      const botMsgId = String(Date.now() + 1);
      
      const botMsgPlaceholder: ChatMessage = {
        id: botMsgId,
        role: 'assistant',
        content: ''
      };
      
      setMessages(prev => [...prev, botMsgPlaceholder]);

      const words = answer.split(' ');
      let wordIndex = 0;
      let currentText = '';

      const interval = setInterval(() => {
        if (wordIndex < words.length) {
          currentText += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
          setMessages(prev =>
            prev.map(m => (m.id === botMsgId ? { ...m, content: currentText } : m))
          );
          wordIndex++;
        } else {
          clearInterval(interval);
          setIsLoading(false);
        }
      }, 35);
    }, 400);
  };

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
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line",
                    m.role === 'user' 
                      ? "bg-accent text-background ml-auto rounded-br-sm" 
                      : "bg-surface border border-border text-primary mr-auto rounded-bl-sm"
                  )}
                >
                  {m.content}
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
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
                    onClick={() => handleInquiryClick(suggestion)}
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
