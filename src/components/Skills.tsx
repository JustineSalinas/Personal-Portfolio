'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ArrowRight, X } from 'lucide-react';

const allSkills = Object.entries(portfolioData.techStack).flatMap(([category, skills]) =>
  skills.map((skill) => ({ skill, category }))
);

const PREVIEW_COUNT = 10;

export const Skills = () => {
  const { ref, isVisible } = useIsVisible();
  const [modalOpen, setModalOpen] = useState(false);

  const previewSkills = allSkills.slice(0, PREVIEW_COUNT);
  const remaining = allSkills.length - PREVIEW_COUNT;

  return (
    <section id="skills" className="section-padding px-6" ref={ref}>
      <div
        className={cn(
          'max-w-7xl mx-auto space-y-10 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <span className="section-label shrink-0">07 — Tech Stack</span>
            <div className="editorial-rule w-16 hidden sm:block" />
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-mono text-secondary/55 hover:text-accent transition-colors group tracking-wider shrink-0 whitespace-nowrap"
          >
            View All
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {previewSkills.map(({ skill }) => (
            <div
              key={skill}
              className="group px-4 py-2.5 bg-surface/60 border border-border/50 rounded-xl flex items-center gap-2.5 hover:border-accent/40 hover:bg-accent/[0.04] transition-all cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent/80 transition-colors flex-shrink-0" />
              <span className="text-xs font-mono text-secondary/70 group-hover:text-primary transition-colors whitespace-nowrap tracking-wide">
                {skill}
              </span>
            </div>
          ))}

          {remaining > 0 && (
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2.5 border border-dashed border-accent/25 rounded-xl text-xs font-mono text-accent/60 hover:text-accent hover:border-accent/50 transition-all whitespace-nowrap tracking-wide"
            >
              +{remaining} more
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-background border border-border rounded-2xl overflow-hidden shadow-2xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Amber top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/70 via-accent/30 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/50 flex-shrink-0">
              <div>
                <h3 className="text-sm font-bold text-primary tracking-tight">All Technologies</h3>
                <p className="text-[10px] font-mono text-secondary/45 mt-0.5 tracking-wider">
                  {allSkills.length}{' '}tools &amp; technologies
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-secondary/50 hover:text-primary hover:bg-surface/80 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
              {Object.entries(portfolioData.techStack).map(([category, skills]) => (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="section-label">{category}</span>
                    <div className="editorial-rule flex-1" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <div
                        key={skill}
                        className="px-3.5 py-2 bg-surface/60 border border-border/50 rounded-lg text-xs font-mono text-secondary/70 hover:text-primary hover:border-accent/35 hover:bg-accent/[0.04] transition-all cursor-default whitespace-nowrap tracking-wide"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
