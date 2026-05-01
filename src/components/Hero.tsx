'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { Github, Mail, ArrowRight } from 'lucide-react';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';

export const Hero = () => {
  const { ref, isVisible } = useIsVisible();

  return (
    <section 
      ref={ref}
      className="min-h-screen flex items-center pt-20 px-6"
    >
      <div className={cn(
        "max-w-7xl mx-auto grid md:grid-cols-5 gap-12 items-center transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        {/* Mobile: Photo first */}
        <div className="md:col-span-2 md:order-2 flex justify-center md:justify-end">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-surface rounded-2xl overflow-hidden border border-border">
              {/* Photo Placeholder */}
              <div className="w-full h-full bg-surface flex items-center justify-center text-secondary">
                <span className="text-4xl font-bold">AJS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 md:order-1 space-y-6">
          <div className="space-y-2">
            <span className="text-accent text-sm font-bold tracking-widest uppercase">
              {portfolioData.personal.availability}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-primary leading-tight">
              {portfolioData.personal.name}
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-medium">
              {portfolioData.personal.titles.join(' / ')}
            </p>
          </div>

          <div className="flex items-center gap-2 text-secondary">
            <span>📍</span>
            <span>{portfolioData.personal.location}</span>
          </div>

          <p className="text-lg text-secondary max-w-xl">
            {portfolioData.personal.bio}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              View Projects <ArrowRight size={18} />
            </a>
            <a 
              href={`mailto:${portfolioData.personal.contact.email}`}
              className="px-8 py-4 border border-border hover:bg-surface text-primary rounded-lg font-semibold transition-all hover:scale-[1.02]"
            >
              Send Email
            </a>
            <a 
              href={portfolioData.personal.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-border hover:bg-surface text-primary rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Github size={18} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
