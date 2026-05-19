'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ArrowRight, X } from 'lucide-react';

const allSkills = Object.entries(portfolioData.techStack).flatMap(
  ([category, skills]) => skills.map((skill) => ({ skill, category }))
);

const PREVIEW_COUNT = 8;

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
        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase">
            TECH STACK
          </span>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary transition-colors group"
          >
            View All
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>

        {/* Preview pill grid */}
        <div className="flex flex-wrap gap-3">
          {previewSkills.map(({ skill }) => (
            <div
              key={skill}
              className="group px-4 py-2.5 bg-white dark:bg-black border border-black/10 dark:border-[rgba(255,255,255,0.14)] rounded-xl flex items-center gap-2.5 hover:border-black/20 dark:hover:border-[rgba(255,255,255,0.28)] transition-all cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary/40 group-hover:bg-secondary/80 transition-colors flex-shrink-0" />
              <span className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                {skill}
              </span>
            </div>
          ))}

          {remaining > 0 && (
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2.5 border border-dashed border-black/10 dark:border-[rgba(255,255,255,0.14)] rounded-xl text-sm font-medium text-secondary hover:text-primary hover:border-black/20 dark:hover:border-[rgba(255,255,255,0.28)] transition-all"
            >
              +{remaining} more
            </button>
          )}
        </div>
      </div>

      {/* View All Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#050505] border border-[rgba(255,255,255,0.14)] rounded-2xl p-8 space-y-8 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white/95 tracking-tight">
                  All Technologies
                </h3>
                <p className="text-sm text-white/50 mt-0.5">
                  {allSkills.length} tools &amp; technologies
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-white/50 hover:text-white/90 hover:bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-7">
              {Object.entries(portfolioData.techStack).map(
                ([category, skills]) => (
                  <div key={category} className="space-y-3">
                    <span className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
                      {category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className="px-3.5 py-2 bg-black border border-[rgba(255,255,255,0.14)] rounded-xl text-sm font-medium text-white/55 hover:text-white/90 hover:border-[rgba(255,255,255,0.28)] transition-all cursor-default"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
