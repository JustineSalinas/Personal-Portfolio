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

        {/* Top split row: Bio and Quick Facts */}
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

            {/* Collaboration CTA */}
            <a
              href="#contact"
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

        {/* Hackathon Achievements (Full Width rows) */}
        <div className="pt-16 mt-16 border-t border-border/40 w-full">
          <div className="flex items-center gap-4 mb-8">
            <span className="section-label">02.5 — Hackathons</span>
            <div className="editorial-rule flex-1 max-w-xs" />
          </div>

          <div className="flex flex-col gap-6">
            {/* Card 1: Nexus Hackathon */}
            <div className="group border border-border/60 rounded-xl p-6 bg-accent/[0.03] hover:bg-accent/[0.06] hover:border-accent/40 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/[0.02]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Details */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300">
                      <Trophy size={18} className="group-hover:scale-110 group-hover:rotate-[10deg] transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-lg mb-0.5">1st Runner Up</h4>
                      <p className="text-xs font-mono text-secondary/50 tracking-wider">May 21–23, 2026</p>
                    </div>
                  </div>
                  <div className="space-y-1 pl-14">
                    <p className="text-base text-secondary font-medium leading-relaxed">Hacking the Future of Energy — Nexus Philippines</p>
                    <p className="text-xs text-secondary/40 italic">Ready, Spark, Charge 2026</p>
                  </div>
                </div>

                {/* Images */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {/* Team photo */}
                  <div className="group/img relative rounded-xl overflow-hidden border border-border/40 bg-surface/50 h-48 md:h-56 flex items-center justify-center p-2 hover:border-accent/20 transition-all duration-300">
                    <img
                      src="/projects/solmate-team.png"
                      alt="Nexus Hackathon Team"
                      className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover/img:scale-[1.03]"
                    />
                    <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-mono text-secondary uppercase tracking-wider">
                      Team Photo
                    </div>
                  </div>
                  {/* Award ceremony photo */}
                  <div className="group/img relative rounded-xl overflow-hidden border border-border/40 bg-surface/50 h-48 md:h-56 flex items-center justify-center p-2 hover:border-accent/20 transition-all duration-300">
                    <img
                      src="/projects/solmate-award.png"
                      alt="1st Runner Up Award Presentation"
                      className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover/img:scale-[1.03]"
                    />
                    <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-mono text-secondary uppercase tracking-wider">
                      Award Presentation
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: National AI Hackathon */}
            <div className="group border border-border/60 rounded-xl p-6 bg-accent/[0.03] hover:bg-accent/[0.06] hover:border-accent/40 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/[0.02]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Details */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300">
                      <Trophy size={18} className="group-hover:scale-110 group-hover:rotate-[10deg] transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-lg mb-0.5">Currently Top 5 Finalists (ongoing)</h4>
                      <p className="text-xs font-mono text-secondary/50 tracking-wider">Aug 3–5, 2026</p>
                    </div>
                  </div>
                  <div className="space-y-1 pl-14">
                    <p className="text-base text-secondary font-medium leading-relaxed">National AI Hackathon — @ ICC Iloilo City, Philippines</p>
                    <p className="text-xs text-secondary/40 italic">Building an AI-Ready Future, Together</p>
                  </div>
                </div>

                {/* Images */}
                <div className="lg:col-span-7 w-full">
                  <div className="group/img relative rounded-xl overflow-hidden border border-border/40 bg-surface/50 h-48 md:h-56 flex items-center justify-center p-2 hover:border-accent/20 transition-all duration-300">
                    <img
                      src="/projects/national-team.png"
                      alt="National AI Hackathon Team"
                      className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover/img:scale-[1.03]"
                    />
                    <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-mono text-secondary uppercase tracking-wider">
                      Workspace / Team
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Stellar APAC Hackathon */}
            <div className="group border border-border/60 rounded-xl p-6 bg-accent/[0.03] hover:bg-accent/[0.06] hover:border-accent/40 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/[0.02]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Details */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300">
                      <Trophy size={18} className="group-hover:scale-110 group-hover:rotate-[10deg] transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-lg mb-0.5">Participant in Regional Hackathon</h4>
                      <p className="text-xs font-mono text-secondary/50 tracking-wider">July 2026</p>
                    </div>
                  </div>
                  <div className="space-y-1 pl-14">
                    <p className="text-base text-secondary font-medium leading-relaxed">Stellar APAC Hackathon</p>
                  </div>
                </div>

                {/* Images */}
                <div className="lg:col-span-7 w-full">
                  <div className="group/img relative rounded-xl overflow-hidden border border-border/40 bg-surface/50 h-48 md:h-56 flex items-center justify-center p-2 hover:border-accent/20 transition-all duration-300">
                    <img
                      src="/projects/stellar-team.jpg"
                      alt="Stellar APAC Hackathon Collaboration"
                      className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover/img:scale-[1.03]"
                    />
                    <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-mono text-secondary uppercase tracking-wider">
                      Development & Scoping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
