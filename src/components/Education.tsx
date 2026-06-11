'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';

export const Education = () => {
  const { ref, isVisible } = useIsVisible<HTMLDivElement>();

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
        {/* Vertical amber line */}
        <div className="absolute left-[8px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" aria-hidden="true" />

        <ol className="space-y-9">
          {portfolioData.education.map((edu, index) => (
            <li
              key={index}
              className={cn(
                'relative pl-10 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Amber dot */}
              <span
                className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-background shadow-sm shadow-accent/20"
                aria-hidden="true"
              />

              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-accent/80 uppercase tracking-[0.2em]">
                  {edu.date}
                </span>
                <h3 className="text-sm font-bold text-primary leading-snug">
                  {edu.institution}
                </h3>
                {edu.degree && (
                  <p className="text-xs text-secondary">{edu.degree}</p>
                )}
                <p className="text-[11px] font-mono text-secondary/45 tracking-wide">{edu.level}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
