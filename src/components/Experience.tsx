'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';

export const Experience = () => {
  const { ref, isVisible } = useIsVisible();

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
              for the full-stack work I do today.
            </p>
          </div>
        </div>

        {/* Experience list */}
        <div className="flex flex-col">
          {portfolioData.experience.map((exp, index) => (
            <div
              key={index}
              className={cn(
                'group grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-t border-border/50 transition-colors hover:bg-accent/[0.02] -mx-6 px-6',
                index === portfolioData.experience.length - 1 ? 'border-b' : ''
              )}
            >
              {/* Index number */}
              <div className="hidden md:flex md:col-span-1 items-start pt-0.5">
                <span className="text-[10px] font-mono text-accent/50 tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Company & Date */}
              <div className="md:col-span-4 flex flex-col justify-center">
                <h3 className="text-xl text-primary font-medium tracking-tight mb-1.5">
                  {exp.company}
                </h3>
                <p className="text-sm font-mono text-secondary/50 tracking-wide">
                  {exp.location.split(',')[0]} · {exp.date}
                </p>
              </div>

              {/* Role & Description */}
              <div className="md:col-span-5 flex flex-col justify-center">
                <p className="text-sm font-mono text-accent/80 tracking-wider uppercase mb-2">
                  {exp.role}
                </p>
                <p className="text-secondary text-sm leading-relaxed">
                  {exp.bullets[0]}
                </p>
              </div>

              {/* Tags */}
              <div className="md:col-span-2 flex flex-wrap items-center md:justify-end gap-2">
                <span className="px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-[10px] font-mono text-accent/70 tracking-wider uppercase whitespace-nowrap">
                  {exp.role.includes('Support') ? 'IT Support' : 'Tech'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
