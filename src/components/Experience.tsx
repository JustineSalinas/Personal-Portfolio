'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';

export const Experience = () => {
  const { ref, isVisible } = useIsVisible();

  return (
    <section id="experience" className="py-24 px-6 bg-background" ref={ref}>
      <div className={cn(
        "max-w-7xl mx-auto transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase block mb-6">
              EXPERIENCE
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans tracking-tight text-primary leading-tight font-light">
              Explore My Tech Journey
            </h2>
          </div>
          <div className="lg:pt-12 max-w-md">
            <p className="text-secondary text-lg leading-relaxed mb-6 font-light">
              Over the past few years, I've had the opportunity to work in various IT support and technical roles, ensuring system integrity and helping end-users succeed.
            </p>
          </div>
        </div>

        {/* Experience List */}
        <div className="flex flex-col">
          {portfolioData.experience.map((exp, index) => (
            <div 
              key={index} 
              className={cn(
                "group grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-t border-border transition-colors hover:bg-surface/30 -mx-6 px-6",
                index === portfolioData.experience.length - 1 ? "border-b" : ""
              )}
            >
              {/* Left: Company & Date */}
              <div className="md:col-span-5 flex flex-col justify-center">
                <h3 className="text-2xl text-primary mb-2 font-medium tracking-tight">
                  {exp.company}, {exp.location.split(',')[0]}
                </h3>
                <p className="text-secondary text-sm font-light">
                  • {exp.date}
                </p>
              </div>

              {/* Middle: Description */}
              <div className="md:col-span-5 flex flex-col justify-center">
                <p className="text-secondary text-base leading-relaxed font-light pr-4">
                  <strong className="font-medium text-primary block mb-1">{exp.role}</strong>
                  {exp.bullets[0]}
                </p>
              </div>

              {/* Right: Badges */}
              <div className="md:col-span-2 flex flex-wrap items-center md:justify-end gap-2 mt-4 md:mt-0">
                <span className="px-4 py-1.5 rounded-full bg-surface border border-border/50 text-xs font-medium text-primary whitespace-nowrap">
                  {exp.role.includes('Support') ? 'IT Support' : 'Tech'}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-surface border border-border/50 text-xs font-medium text-primary whitespace-nowrap">
                  Hardware
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

