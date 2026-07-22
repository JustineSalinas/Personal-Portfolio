'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Education = () => {
  const { ref, isVisible } = useIsVisible<HTMLDivElement>();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const educationDetails = [
    {
      description: "Focusing on Full-Stack systems, Web Engineering, and Database Architecture. Active student leader managing design and development pipelines for collegiate bodies.",
      courses: ["Data Structures & Algorithms", "Database Management Systems", "Web Development & Engineering", "Software Engineering", "Systems Administration"]
    },
    {
      description: "STEM (Science, Technology, Engineering, and Mathematics) Strand. Developed foundational research skills, logic, and mathematics. Led the student government as President."
    },
    {
      description: "Secondary education covering core science, mathematical reasoning, and early leadership opportunities."
    },
    {
      description: "Completed elementary studies with academic distinctions, laying the groundwork for science and communication."
    }
  ];

  return (
    <div
      id="education"
      ref={ref}
      className={cn(
        'space-y-10 transition-all duration-1000',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      <div className="flex items-center gap-4">
        <span className="section-label">05 — Education</span>
        <div className="editorial-rule flex-1 max-w-xs" />
      </div>

      <div className="relative">
        <div
          className="absolute left-[8px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent"
          aria-hidden="true"
        />

        <ol className="space-y-9">
          {portfolioData.education.map((edu, index) => {
            const achievements = (edu as any).achievements as
              | { role: string; org: string }[]
              | undefined;
            const isExpanded = expandedIndex === index;
            const details = educationDetails[index];

            return (
              <li
                key={index}
                className={cn(
                  'relative pl-10 transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <span
                  className={cn(
                    "absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 bg-background transition-all duration-300 z-10 shadow-sm",
                    isExpanded ? "border-accent scale-125 bg-accent/10 shadow-accent/20" : "border-accent/40 group-hover:border-accent"
                  )}
                  aria-hidden="true"
                />

                <div 
                  onClick={() => toggleExpand(index)}
                  className={cn(
                    "group p-5 bg-surface/30 hover:bg-surface border border-border/40 hover:border-accent/25 rounded-2xl transition-all duration-300 cursor-pointer select-none",
                    isExpanded && "bg-surface border-accent/20 shadow-sm"
                  )}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3.5 min-w-0">
                      {(edu as any).logo && (
                        <img
                          src={(edu as any).logo}
                          alt={edu.institution}
                          className="w-10 h-10 object-contain shrink-0 rounded-lg"
                        />
                      )}
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-accent/80 uppercase tracking-[0.2em]">
                            {edu.date}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-primary leading-snug group-hover:text-accent transition-colors truncate">
                          {edu.institution}
                        </h3>
                        {edu.degree && (
                          <p className="text-xs text-secondary font-medium leading-relaxed">{edu.degree}</p>
                        )}
                        <p className="text-[10px] font-mono text-secondary/45 tracking-wide">
                          {edu.level}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      size={14}
                      className={cn(
                        "text-secondary/40 group-hover:text-accent transition-transform duration-300 mt-1 shrink-0",
                        isExpanded && "rotate-180 text-accent"
                      )}
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border/20 space-y-4">
                          {details && (
                            <p className="text-xs text-secondary/80 leading-relaxed font-light">
                              {details.description}
                            </p>
                          )}

                          {achievements && achievements.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-[9px] font-mono text-accent/60 tracking-[0.15em] uppercase block">
                                Leadership &amp; Honors
                              </span>
                              <div className="flex flex-col gap-1.5">
                                {achievements.map((a, i) => (
                                  <div key={i} className="inline-flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                    <span className="text-xs text-primary/95">{a.role}</span>
                                    <span className="text-[10px] text-secondary/50 font-mono">— {a.org}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {details && details.courses && (
                            <div className="space-y-2">
                              <span className="text-[9px] font-mono text-accent/60 tracking-[0.15em] uppercase block">
                                Key Coursework
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {details.courses.map((course) => (
                                  <span
                                    key={course}
                                    className="px-2 py-1 bg-background border border-border/50 rounded-lg text-[9px] font-mono text-secondary/70 uppercase tracking-wider"
                                  >
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
