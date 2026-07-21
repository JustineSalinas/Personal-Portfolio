'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Experience = () => {
  const { ref, isVisible } = useIsVisible();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="experience" className="section-padding px-6" ref={ref}>
      <div
        className={cn(
          'max-w-7xl mx-auto transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-label">04 — Experience</span>
              <div className="editorial-rule w-16" />
            </div>
            <h2
              className="font-display italic font-light text-primary leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
            >
              My tech
              <br />
              <span className="text-accent">journey.</span>
            </h2>
          </div>
          <div className="lg:pt-16 max-w-md">
            <p className="text-secondary text-base md:text-lg leading-relaxed font-light">
              Hands-on IT roles across hardware, networking, and systems — building the foundation
              for the full-stack work I do today. Click any card to expand accomplishments.
            </p>
          </div>
        </div>

        {/* Experience list */}
        <div className="flex flex-col">
          {portfolioData.experience.map((exp, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={index}
                onClick={() => toggleExpand(index)}
                className={cn(
                  'group grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-t border-border/50 transition-all duration-300 -mx-6 px-6 cursor-pointer select-none',
                  isExpanded ? 'bg-surface/60 border-accent/25' : 'hover:bg-accent/[0.02]',
                  index === portfolioData.experience.length - 1 ? 'border-b' : ''
                )}
              >
                {/* Index number */}
                <div className="hidden md:flex md:col-span-1 items-start pt-1.5">
                  <span className="text-[10px] font-mono text-accent/50 tracking-widest">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Company & Date */}
                <div className="md:col-span-4 flex flex-col justify-start pt-1">
                  <h3 className="text-lg text-primary font-medium tracking-tight mb-1">
                    {exp.company}
                  </h3>
                  <p className="text-xs font-mono text-secondary/50 tracking-wide">
                    {exp.location.split(',')[0]} · {exp.date}
                  </p>
                </div>

                {/* Role & Description */}
                <div className="md:col-span-5 flex flex-col justify-start pt-1">
                  <p className="text-[11px] font-mono text-accent/80 tracking-wider uppercase mb-1.5 font-semibold">
                    {exp.role}
                  </p>
                  
                  {/* First bullet (always visible as a preview) */}
                  <p className="text-secondary text-xs md:text-sm leading-relaxed">
                    {exp.bullets[0]}
                  </p>

                  {/* Expanded Accomplishments bullets */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-2.5 border-l-2 border-accent/20 pl-4 py-1">
                          {exp.bullets.slice(1).map((bullet, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 + 0.1 }}
                              className="text-secondary text-xs md:text-sm leading-relaxed flex items-start gap-2"
                            >
                              <span className="text-accent/60 mt-1.5 shrink-0 block w-1 h-1 rounded-full bg-accent" />
                              <span>{bullet}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Role Category Tag & Chevron toggle icon */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4 pt-1 md:pt-0">
                  <span className="px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-[9px] font-mono text-accent/70 tracking-wider uppercase whitespace-nowrap">
                    {exp.role.includes('Support') || exp.role.includes('Assistant') ? 'IT Ops' : 'Software'}
                  </span>

                  <ChevronDown
                    size={16}
                    className={cn(
                      'text-secondary/50 group-hover:text-accent transition-transform duration-300',
                      isExpanded ? 'rotate-180 text-accent' : ''
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
