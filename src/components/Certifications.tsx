'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const Certifications = () => {
  const { ref, isVisible } = useIsVisible();

  return (
    <section id="certifications" className="section-padding px-6" ref={ref}>
      <div className={cn(
        "max-w-7xl mx-auto transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-border/50">
              <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase">
                RECENT CERTIFICATIONS
              </span>
              <Link 
                href="/certifications" 
                className="text-sm font-medium text-secondary hover:text-accent transition-colors flex items-center gap-1 group"
              >
                View All <span className="group-hover:translate-x-1 transition-transform inline-block">›</span>
              </Link>
            </div>

            {/* List */}
            <div className="space-y-4">
              {portfolioData.certifications.map((cert, index) => (
                <a 
                  key={index}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-surface/40 hover:bg-surface border border-border/50 hover:border-accent/30 rounded-2xl p-6 transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-secondary font-medium tracking-wide">
                        {cert.issuer}
                      </p>
                    </div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={18} className="text-accent" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
