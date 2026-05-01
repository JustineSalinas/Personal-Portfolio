'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';

export const About = () => {
  const { ref, isVisible } = useIsVisible();
  const { personal } = portfolioData;

  return (
    <section id="about" className="section-padding px-6" ref={ref}>
      <div className={cn(
        "max-w-7xl mx-auto space-y-12 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-primary">About Me</h2>
          <div className="h-1.5 w-20 bg-accent rounded-full" />
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3 space-y-6">
            {personal.longBio.map((paragraph, i) => (
              <p key={i} className="text-lg text-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="md:col-span-2">
            <div className="bg-surface border border-border rounded-2xl p-8 space-y-6 sticky top-24">
              <h3 className="text-xl font-bold text-primary">Quick Facts</h3>
              
              <div className="space-y-4">
                {Object.entries(personal.quickFacts).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <span className="text-sm font-bold text-accent uppercase tracking-wider">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <p className="text-lg text-primary font-medium">{value}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <a 
                  href={personal.contact.resume}
                  className="w-full inline-flex justify-center items-center px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
