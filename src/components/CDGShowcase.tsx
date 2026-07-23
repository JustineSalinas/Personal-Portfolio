'use client';

import React from 'react';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { 
  ExternalLink, 
  Sparkles, 
  Code2, 
  Palette, 
  BrainCircuit, 
  Rocket, 
  ShieldCheck, 
  Layers, 
  ArrowUpRight,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export const CDGShowcase = () => {
  const { ref, isVisible } = useIsVisible<HTMLDivElement>();

  const services = [
    {
      icon: <Code2 className="w-5 h-5 text-accent" />,
      title: "Full-Stack Web Engineering",
      description: "Modern, high-performance web applications built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS.",
      tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"]
    },
    {
      icon: <Palette className="w-5 h-5 text-sky-400" />,
      title: "UI/UX Design & Systems Prototyping",
      description: "User-centered interface design, high-fidelity Figma wireframes, design systems, and responsive interactive prototypes.",
      tags: ["Figma", "UI/UX Design", "Wireframing", "Design Systems"]
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-purple-400" />,
      title: "AI Integration & Automation",
      description: "Embedding LLM workflows, custom AI chatbots, OpenAI/Anthropic APIs, and automated data pipelines into client platforms.",
      tags: ["OpenAI", "Anthropic", "AI Agents", "Automations"]
    },
    {
      icon: <Rocket className="w-5 h-5 text-emerald-400" />,
      title: "Rapid MVP & Tech Consulting",
      description: "0-to-1 product development for startups and enterprises with transparent Notion sprint tracking and clean code delivery.",
      tags: ["Sprint Delivery", "Notion Workflows", "System Design"]
    }
  ];

  const highlights = [
    { metric: "100%", label: "Production Delivery Rate" },
    { metric: "700+", label: "Active Users Served" },
    { metric: "Sprint", label: "Agile Development Cycle" },
    { metric: "End-to-End", label: "Scoping to Cloud Deployment" }
  ];

  return (
    <section id="cdg" className="section-padding px-6" ref={ref}>
      <div
        className={cn(
          'max-w-7xl mx-auto space-y-12 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/40 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="section-label">01.5 — IT Agency & Startup</span>
              <div className="editorial-rule w-16" />
            </div>

            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
              {/* CDG Fire Flame Logo Emblem */}
              <motion.div 
                whileHover={{ scale: 1.08, rotate: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface/80 border border-accent/30 p-2 flex items-center justify-center shrink-0 shadow-lg shadow-accent/10 relative overflow-hidden group/logo"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity" />
                <img
                  src="/logos/cdg-fire-logo.png"
                  alt="Cascade Development Group Fire Logo"
                  className="w-full h-full object-contain relative z-10"
                />
              </motion.div>

              <h2
                className="font-display italic font-light text-primary leading-tight"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)' }}
              >
                Cascade Development <span className="whitespace-nowrap">Group <span className="text-accent not-italic font-bold font-mono text-xl md:text-2xl inline-block ml-1.5">(CDG)</span></span>
              </h2>
            </div>
          </div>

          <div className="max-w-md font-light text-secondary text-sm md:text-base leading-relaxed md:pb-1">
            Full-stack web engineering, database architecture, and AI integrations — built on clean engineering and client-first delivery.
          </div>
        </div>

        {/* Agency Hero Spotlight Card */}
        <Tilt
          tiltMaxAngleX={2}
          tiltMaxAngleY={2}
          perspective={1200}
          transitionSpeed={1000}
          className="w-full"
        >
          <div className="relative rounded-3xl border border-accent/30 bg-gradient-to-br from-surface/80 via-surface/40 to-surface/20 p-8 md:p-10 shadow-2xl backdrop-blur-xl overflow-hidden group">
            {/* Background Glow Elements */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/10 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-48 h-0.5 bg-gradient-to-l from-accent via-accent/50 to-transparent" />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column - Copy & Value Prop */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ACCEPTING NEW CLIENT PROJECTS
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                    <Globe size={12} />
                    cdg-official.vercel.app
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                    Custom Software & Web Solutions Built for Scale
                  </h3>
                  <p className="text-sm md:text-base text-secondary leading-relaxed font-light">
                    Founded by Adrian Salinas, <strong className="text-primary font-semibold">Cascade Development Group (CDG)</strong> delivers modern full-stack web applications, custom software, and database architecture across Visayas and remote clients. We bridge technical execution with business intuition.
                  </p>
                </div>

                {/* Performance Highlights Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="p-3 bg-surface/50 border border-border/40 rounded-xl space-y-1">
                      <span className="text-base md:text-lg font-bold font-mono text-accent block leading-none">{item.metric}</span>
                      <span className="text-[10px] font-mono text-secondary/70 uppercase tracking-wider block">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href="https://cdg-official.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-background font-mono text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:scale-105 active:scale-95"
                  >
                    <span>Visit CDG Official Agency</span>
                    <ArrowUpRight size={16} />
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface hover:bg-surface/80 text-primary border border-border/80 hover:border-accent/40 font-mono text-xs tracking-wider uppercase rounded-xl transition-all duration-300"
                  >
                    <span>Inquire for Services</span>
                  </a>
                </div>
              </div>

              {/* Right Column - Interactive Agency Badge Card */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="bg-background/80 border border-border/70 rounded-2xl p-6 space-y-5 shadow-xl relative overflow-hidden group/box hover:border-accent/40 transition-colors">
                  <div className="flex justify-between items-start">
                    {/* White CDG Brand Logo */}
                    <div className="h-12 px-3 py-1.5 rounded-xl bg-surface border border-border/60 flex items-center justify-center shrink-0 shadow-sm">
                      <img
                        src="/logos/white-cdg-logo.png"
                        alt="White CDG Logo"
                        className="h-full object-contain"
                      />
                    </div>
                    <span className="text-[9px] font-mono text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded-md uppercase font-bold">
                      Agency Hub
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-primary text-base">CDG Digital Office</h4>
                    <p className="text-xs text-secondary leading-snug">Explore active projects, client capabilities, and service tiers on our live web platform.</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border/30">
                    {[
                      'Production Web Applications',
                      'Database Schema & API Architecture',
                      'AI Integration & Process Automation'
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-secondary">
                        <CheckCircle2 size={13} className="text-accent shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://cdg-official.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-xs font-mono text-accent hover:underline pt-2 font-medium"
                  >
                    cdg-official.vercel.app ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Tilt>

        {/* Core Services Bento Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-accent/80 uppercase tracking-[0.2em]">
              CDG Service Capabilities
            </span>
            <span className="text-xs text-secondary/60 font-mono">04 Core Offerings</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-surface/30 hover:bg-surface/60 border border-border/40 hover:border-accent/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-sm"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-background border border-border/60 flex items-center justify-center shadow-xs group-hover:border-accent/40 transition-colors">
                    {service.icon}
                  </div>
                  <h4 className="text-sm font-bold text-primary group-hover:text-accent transition-colors font-mono uppercase tracking-tight">
                    {service.title}
                  </h4>
                  <p className="text-xs text-secondary leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-3 border-t border-border/20">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-background/80 border border-border/50 rounded-md text-[9px] font-mono text-secondary/70 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
