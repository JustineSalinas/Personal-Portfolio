'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export const About = () => {
  const { ref, isVisible } = useIsVisible();
  const { personal } = portfolioData;

  return (
    <section id="about" className="section-padding px-6" ref={ref}>
      <div
        className={cn(
          'max-w-7xl mx-auto transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">02 — Background</span>
          <div className="editorial-rule flex-1 max-w-xs" />
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Bio column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Big editorial heading */}
            <h2
              className="font-display italic font-light text-primary leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
            >
              Building things that{' '}
              <span className="text-accent not-italic">matter.</span>
            </h2>

            <div className="space-y-5 pt-2">
              {personal.longBio.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg text-secondary leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>

            {/* Hackathon Achievements */}
            <div className="pt-6 border-t border-border/40">
              <span className="section-label block mb-4">Hackathons</span>
              <div className="flex flex-col gap-3">
                {/* Nexus Hackathon */}
                <div className="border border-border/60 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-accent/[0.03] hover:bg-accent/[0.06] hover:border-accent/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                      <Trophy size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-base mb-0.5">1st Runner Up</h4>
                      <p className="text-sm text-secondary">Hacking the Future of Energy — Nexus Philippines</p>
                      <p className="text-xs text-secondary/50 mt-0.5 italic">Ready, Spark, Charge 2026</p>
                    </div>
                  </div>
                  <div className="sm:text-right text-[10px] font-mono text-secondary/50 pl-13 sm:pl-0 tracking-wider">
                    May 21–23, 2026
                  </div>
                </div>
                {/* Next Hackathon */}
                <div className="border border-border/60 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-accent/[0.03] hover:bg-accent/[0.06] hover:border-accent/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                      <Trophy size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-base mb-0.5">National AI Hackathon</h4>
                      <p className="text-sm text-secondary">Next Hackathon — Philippines · ICC Iloilo City</p>
                      <p className="text-xs text-secondary/50 mt-0.5 italic">Building an AI-Ready Future, Together</p>
                    </div>
                  </div>
                  <div className="sm:text-right text-[10px] font-mono text-secondary/50 pl-13 sm:pl-0 tracking-wider">
                    Aug 3–5, 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Collaboration CTA */}
            <a
              href={`mailto:${personal.contact.email}`}
              className="block bg-surface/40 border border-border rounded-xl p-6 flex justify-between items-center group hover:border-accent/50 transition-all duration-300"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-primary text-base">Open to collaborations.</h4>
                <p className="text-sm text-secondary">Let&apos;s build something meaningful together.</p>
              </div>
              <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-background transition-all duration-300 flex-shrink-0">
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          </div>

          {/* Quick Facts column */}
          <div className="lg:col-span-5">
            <div className="bg-surface/60 border border-border rounded-xl p-8 space-y-8 relative overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-0.5 bg-gradient-to-l from-accent/50 to-transparent" />
              <div className="absolute top-0 right-0 w-0.5 h-24 bg-gradient-to-b from-accent/50 to-transparent" />

              <div className="flex items-center gap-3">
                <span className="section-label">Quick Facts</span>
                <div className="editorial-rule flex-1" />
              </div>

              <div className="space-y-5">
                {[
                  { label: 'STATUS', value: personal.quickFacts.status },
                  { label: 'FOCUS', value: personal.quickFacts.focus },
                  { label: 'LOOKING FOR', value: personal.quickFacts.lookingFor },
                  { label: 'AVAILABLE', value: personal.quickFacts.available, isAvailable: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="space-y-1.5 pb-5 border-b border-border/40 last:border-0 last:pb-0"
                  >
                    <span className="section-label">{item.label}</span>
                    {item.isAvailable ? (
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-base text-primary font-medium">{item.value}</p>
                      </div>
                    ) : (
                      <p className="text-base text-primary font-medium leading-snug">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-1">
                <a
                  href={personal.contact.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Adrian_Salinas_Resume.pdf"
                  className="w-full inline-flex justify-center items-center px-8 py-3.5 bg-accent text-background rounded-lg font-mono text-xs tracking-[0.2em] hover:bg-accent-hover transition-all duration-300 uppercase shadow-sm shadow-accent/20"
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
