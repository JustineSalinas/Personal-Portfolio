'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Loader2, 
  Sparkles, 
  RefreshCw, 
  Send, 
  ChevronDown, 
  Bot, 
  User, 
  Building2, 
  Trophy, 
  Code2, 
  GraduationCap, 
  Briefcase, 
  Mail 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface Inquiry {
  category: string;
  icon: React.ReactNode;
  question: string;
  answer: string;
}

const INQUIRIES: Inquiry[] = [
  {
    category: "Overview",
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
    question: "Who is Adrian Salinas & what is his focus?",
    answer: "**Adrian Salinas** is an AI-First Software Engineer, Full-Stack Developer, and IT Solutions Founder based in Iloilo City, Philippines.\n\n• **Status:** 3rd Year IT Student & Founder of CDG\n• **Core Focus:** Building production web apps with Next.js, TypeScript, Supabase, and AI integrations\n• **Philosophy:** Ships high-impact real-world systems over collecting buzzwords."
  },
  {
    category: "Startup",
    icon: <Building2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />,
    question: "Tell me about Cascade Development Group (CDG)",
    answer: "**Cascade Development Group (CDG)** is Adrian's IT solutions startup delivering web development, database architecture, and technical consulting across Visayas.\n\n• **Role:** Founder & Lead AI Engineer\n• **Deliverables:** Custom client applications built with Next.js & Supabase\n• **Live Platform:** [cdg-official.vercel.app](https://cdg-official.vercel.app)\n• **Workflow:** Sprint-based delivery cycles using Notion & GitHub."
  },
  {
    category: "Projects",
    icon: <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
    question: "What are Adrian's top projects & hackathon wins?",
    answer: "Here are Adrian's flagship engineering projects:\n\n• **PharmaTrack:** QR-based attendance tracking platform powering **700+ students** at the Univ. of San Agustin (Next.js 14 + Supabase).\n• **Solmate (E-Ferry):** Real-time IoT telemetry & financial planning dashboard for electric ferries — **1st Runner-Up at Nexus PH Hackathon 2026**.\n• **Commit:** Agile developer workspace & productivity suite.\n• **Famly:** Collaborative family budget & expense tracker."
  },
  {
    category: "Tech Stack",
    icon: <Code2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
    question: "What technologies does Adrian specialize in?",
    answer: "Adrian's primary technical specialties include:\n\n• **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion\n• **Backend & DB:** Node.js, Python, PostgreSQL, Supabase RLS, REST APIs\n• **AI & IoT:** OpenAI APIs, Anthropic APIs, AWS AI Services, ESP32 Sensors & MQTT\n• **Workflows:** Git/GitHub, Vercel, Agile/Scrum & Waterfall PM."
  },
  {
    category: "Credentials",
    icon: <GraduationCap className="w-3.5 h-3.5 text-purple-400 shrink-0" />,
    question: "What certifications does Adrian hold?",
    answer: "Adrian holds industry-recognized credentials in Agile, Cloud AI, and PM:\n\n1. **Advanced Scrum Master** (Agile Enterprise, 2026)\n2. **AWS AI Practitioner** (Udacity / Accenture, 2026)\n3. **Project Management - Waterfall & Agile** (Udemy, 2026)\n4. **Design Thinking Guide for Successful Professionals** (Udemy, 2025)\n5. **Project Management 101 - Dual Certificate** (Udemy, 2025)\n6. **IT Operations Completion Certificate** (InnovaThink Corp, 2024)"
  },
  {
    category: "Career",
    icon: <Briefcase className="w-3.5 h-3.5 text-blue-400 shrink-0" />,
    question: "Is Adrian available for hire or internships?",
    answer: "**Yes, absolutely!** Adrian is actively open to opportunities:\n\n• **Target Roles:** Software Engineering Internships, Part-Time, or Remote Developer roles\n• **Availability:** Immediate\n• **Value:** Ready to contribute end-to-end full-stack capabilities to product teams."
  },
  {
    category: "Contact",
    icon: <Mail className="w-3.5 h-3.5 text-rose-400 shrink-0" />,
    question: "How can I contact or hire Adrian?",
    answer: "You can reach Adrian directly through any of these channels:\n\n• **Email:** [ajsalinas005@gmail.com](mailto:ajsalinas005@gmail.com)\n• **LinkedIn:** [linkedin.com/in/adrian-justin-salinas-a4768b226/](https://www.linkedin.com/in/adrian-justin-salinas-a4768b226/)\n• **GitHub:** [github.com/JustineSalinas](https://github.com/JustineSalinas)\n\nYou can also download his full resume from the header menu on this site!"
  }
];

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showInquiries, setShowInquiries] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isLoading, isOpen]);

  const handleInquiryClick = (inquiry: Inquiry) => {
    if (isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      content: inquiry.question
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const answer = inquiry.answer;
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
      }, 25);
    }, 350);
  };

  const handleResetChat = () => {
    setMessages([]);
    setShowInquiries(true);
  };

  const renderMessageContent = (content: string, role: 'user' | 'assistant') => {
    if (role === 'user') {
      return <p className="font-medium text-xs sm:text-sm">{content}</p>;
    }

    const paragraphs = content.split('\n\n');

    return (
      <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed">
        {paragraphs.map((para, pIdx) => {
          const lines = para.split('\n');
          return (
            <div key={pIdx} className="space-y-1">
              {lines.map((line, lIdx) => {
                // Format bold text **text**
                const parts = line.split(/(\*\*[^*]+\*\*)/g);
                const formattedLine = parts.map((part, partIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={partIdx} className="font-semibold text-primary">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return part;
                });

                if (line.trim().startsWith('•')) {
                  return (
                    <div key={lIdx} className="flex items-start gap-1.5 pl-1 text-secondary/90">
                      <span className="text-accent shrink-0 select-none">•</span>
                      <span>{formattedLine.map((f, i) => i === 0 && typeof f === 'string' ? f.replace(/^•\s*/, '') : f)}</span>
                    </div>
                  );
                }

                if (line.trim().match(/^\d+\./)) {
                  return (
                    <div key={lIdx} className="pl-1 text-secondary/90">
                      {formattedLine}
                    </div>
                  );
                }

                return (
                  <p key={lIdx} className="text-secondary/90">
                    {formattedLine}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" suppressHydrationWarning={true}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-surface/95 border border-border/80 shadow-2xl rounded-2xl w-[calc(100vw-2rem)] sm:w-[420px] mb-4 overflow-hidden flex flex-col backdrop-blur-xl"
            style={{ height: '580px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-surface border-b border-border/60 p-4 flex justify-between items-center relative overflow-hidden shrink-0">
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shadow-sm">
                  <Bot size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono font-bold text-sm text-primary">AJ Portfolio Assistant</h3>
                  </div>
                  <p className="text-[11px] font-mono text-secondary/70">Instant answers about background & projects</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 relative z-10">
                {messages.length > 0 && (
                  <button
                    onClick={handleResetChat}
                    title="Reset conversation"
                    className="p-1.5 text-secondary hover:text-primary hover:bg-surface/80 rounded-lg transition-colors border border-transparent hover:border-border/40"
                  >
                    <RefreshCw size={15} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-secondary hover:text-primary hover:bg-surface/80 rounded-lg transition-colors border border-transparent hover:border-border/40"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-background/50 scrollbar-thin">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center p-4 my-auto min-h-[220px] space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-1 shadow-inner">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="font-mono font-semibold text-primary text-sm">Welcome to AJ's Assistant</h4>
                  <p className="text-xs text-secondary/80 leading-relaxed max-w-[320px]">
                    Select any of the suggested inquiries below to explore Adrian's background, hackathon projects, tech stack, and career availability.
                  </p>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex gap-2.5 max-w-[88%]",
                    m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5 border shadow-xs select-none",
                      m.role === 'user'
                        ? "bg-accent/20 border-accent/40 text-accent font-bold font-mono"
                        : "bg-surface border-border/80 text-accent"
                    )}
                  >
                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 shadow-sm border text-xs sm:text-sm",
                      m.role === 'user'
                        ? "bg-accent text-background border-accent/80 font-medium rounded-tr-xs"
                        : "bg-surface/90 border-border/60 text-primary rounded-tl-xs"
                    )}
                  >
                    {renderMessageContent(m.content, m.role)}
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-2.5 max-w-[88%] mr-auto">
                  <div className="w-7 h-7 rounded-lg bg-surface border border-border/80 text-accent flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <Bot size={14} />
                  </div>
                  <div className="bg-surface/90 border border-border/60 text-secondary rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-2 text-xs font-mono">
                    <Loader2 size={15} className="animate-spin text-accent" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggested Inquiries Footer Drawer */}
            <div className="border-t border-border/60 bg-surface/95 p-3 sm:p-4 flex flex-col gap-2.5 shrink-0">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-mono text-secondary/60 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={11} className="text-accent" />
                  Suggested Inquiries ({INQUIRIES.length})
                </span>

                {messages.length > 0 && (
                  <button
                    onClick={() => setShowInquiries(!showInquiries)}
                    className="text-[10px] font-mono text-accent hover:underline flex items-center gap-0.5"
                  >
                    <span>{showInquiries ? 'Hide' : 'Show'}</span>
                    <ChevronDown size={12} className={cn("transition-transform duration-200", !showInquiries && "rotate-180")} />
                  </button>
                )}
              </div>

              {showInquiries && (
                <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
                  {INQUIRIES.map((inquiry, index) => (
                    <button
                      key={index}
                      onClick={() => handleInquiryClick(inquiry)}
                      disabled={isLoading}
                      className="group text-left text-xs bg-background/90 hover:bg-accent/[0.08] border border-border/70 hover:border-accent/40 text-primary rounded-xl px-3 py-2 transition-all duration-200 disabled:opacity-50 active:scale-[0.98] cursor-pointer flex items-center gap-2 shrink-0 max-w-full"
                    >
                      <div className="w-5 h-5 rounded-md bg-surface/80 border border-border/60 flex items-center justify-center shrink-0 group-hover:border-accent/40 group-hover:bg-accent/10 transition-colors">
                        {inquiry.icon}
                      </div>
                      <span className="font-mono text-[11px] text-secondary group-hover:text-primary transition-colors truncate">
                        {inquiry.question}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-accent hover:bg-accent-hover text-background rounded-full px-5 py-3.5 shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 group font-mono text-xs tracking-wide uppercase border border-accent-hover/50"
      >
        {isOpen ? (
          <>
            <X size={20} />
            <span className="font-bold">Close Chat</span>
          </>
        ) : (
          <>
            <MessageSquare size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="font-bold">Chat with AJ</span>
          </>
        )}
      </button>
    </div>
  );
};

