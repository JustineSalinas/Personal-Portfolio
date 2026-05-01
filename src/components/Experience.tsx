'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';

export const Experience = () => {
  const { ref, isVisible } = useIsVisible();

  return (
    <section id="experience" className="section-padding px-6" ref={ref}>
      <div className={cn(
        "max-w-7xl mx-auto space-y-12 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-primary">Work Experience</h2>
          <div className="h-1.5 w-20 bg-accent rounded-full" />
        </div>

        <div className="relative border-l border-border ml-4 md:ml-6 space-y-12">
          {portfolioData.experience.map((exp, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              {/* Dot */}
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-accent rounded-full border-4 border-background ring-4 ring-accent/20" />
              
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
                    <p className="text-accent font-semibold">{exp.company}</p>
                  </div>
                  <div className="text-sm md:text-right">
                    <p className="text-primary font-medium">{exp.date}</p>
                    <p className="text-secondary">{exp.location}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3 text-secondary leading-relaxed">
                      <span className="text-accent mt-1.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
