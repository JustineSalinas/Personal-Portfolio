'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ExternalLink, Award } from 'lucide-react';
import Image from 'next/image';

export const Certifications = () => {
  const { ref, isVisible } = useIsVisible();

  return (
    <section id="certifications" className="section-padding px-6" ref={ref}>
      <div className={cn(
        "max-w-7xl mx-auto space-y-12 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="space-y-4">
          <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase block mb-4">
            CERTIFICATIONS
          </span>
          <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-primary leading-tight font-light">
            Professional Credentials
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioData.certifications.map((cert, index) => (
            <div 
              key={index}
              className="group relative bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-500 flex flex-col md:flex-row"
            >
              {/* Image Preview */}
              <div className="relative w-full md:w-1/3 aspect-[4/3] md:aspect-square overflow-hidden bg-accent/5">
                <div className="absolute inset-0 flex items-center justify-center text-accent/20 group-hover:scale-110 transition-transform duration-500">
                  <Award size={64} />
                </div>
                {/* 
                  When the user adds actual images to /public/certs/, 
                  Next.js Image will render them. Using a fallback pattern.
                */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-surface/80" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between flex-1">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-accent uppercase tracking-widest px-2 py-1 bg-accent/10 rounded">
                      {cert.issuer}
                    </span>
                    <span className="text-xs font-medium text-secondary/60">{cert.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300 leading-tight">
                    {cert.title}
                  </h3>
                </div>

                <div className="mt-8 pt-6 border-t border-border/50">
                  <a 
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-primary hover:text-accent transition-colors group/link"
                  >
                    VERIFY CREDENTIAL 
                    <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-accent/5 blur-3xl rounded-full group-hover:bg-accent/10 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
