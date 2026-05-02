'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';


export const Skills = () => {
  const { ref, isVisible } = useIsVisible();

  return (
    <section id="skills" className="section-padding px-6" ref={ref}>
      <div className={cn(
        "max-w-7xl mx-auto space-y-12 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="space-y-4">
          <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase block mb-4">
            TECH STACK
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-8">
          {Object.entries(portfolioData.techStack).map(([category, skills]) => (
            <div key={category} className="space-y-6">
              <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full" />
                {category}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {skills.map((skill) => (
                  <div 
                    key={skill}
                    className="group bg-surface border border-border p-4 rounded-xl flex items-center justify-between hover:border-accent/30 transition-all"
                  >
                    <span className="font-medium text-secondary group-hover:text-primary transition-colors">
                      {skill}
                    </span>
                    <div className="w-1.5 h-1.5 bg-border rounded-full group-hover:bg-accent transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Sidebar/Section */}
        <div className="pt-12">
          <div className="bg-accent/5 border border-accent/20 rounded-2xl p-8">
            <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase block mb-6">
              PROFESSIONAL CERTIFICATIONS
            </span>
            <div className="flex flex-wrap gap-4">
              {portfolioData.certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-secondary">
                  <span className="text-accent text-lg">✓</span>
                  <span className="font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
