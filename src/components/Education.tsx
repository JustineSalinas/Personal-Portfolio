'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { GraduationCap } from 'lucide-react';

export const Education = () => {
  const { ref, isVisible } = useIsVisible();

  return (
    <section id="education" className="section-padding px-6" ref={ref}>
      <div className={cn(
        "max-w-7xl mx-auto space-y-12 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="space-y-4">
          <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase block mb-4">
            EDUCATION
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioData.education.map((edu, index) => (
            <div 
              key={index}
              className="bg-surface border border-border rounded-2xl p-6 flex gap-6 items-start"
            >
              <div className="p-3 bg-accent/10 rounded-xl text-accent">
                <GraduationCap size={24} />
              </div>
              <div className="space-y-1">
                <span className="text-sm font-bold text-accent uppercase tracking-wider">{edu.date}</span>
                <h3 className="text-xl font-bold text-primary leading-tight">{edu.institution}</h3>
                {edu.degree && <p className="text-primary/90 font-medium">{edu.degree}</p>}
                <p className="text-secondary text-sm">{edu.level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
