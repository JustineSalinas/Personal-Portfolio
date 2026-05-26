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
        'space-y-12 transition-all duration-1000',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      {/* Section heading */}
      <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase block">
        EDUCATION
      </span>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[9px] top-2 bottom-2 w-px bg-border"
          aria-hidden="true"
        />

        <ol className="space-y-10">
          {portfolioData.education.map((edu, index) => (
            <li
              key={index}
              className={cn(
                'relative pl-10 transition-all duration-700',
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Dot */}
              <span
                className="absolute left-0 top-1 w-[18px] h-[18px] rounded-full border-2 border-accent bg-background"
                aria-hidden="true"
              />

              {/* Content */}
              <div className="space-y-0.5">
                <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                  {edu.date}
                </span>
                <h3 className="text-base font-bold text-primary leading-snug">
                  {edu.institution}
                </h3>
                {edu.degree && (
                  <p className="text-sm text-secondary/80">{edu.degree}</p>
                )}
                <p className="text-xs text-secondary/50">{edu.level}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
