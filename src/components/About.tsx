'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Trophy } from 'lucide-react';

export const About = () => {
  const { ref, isVisible } = useIsVisible();
  const { personal } = portfolioData;

  return (
    <section id="about" className="section-padding px-6" ref={ref}>
      <div className={cn(
        "max-w-7xl mx-auto transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Background Column */}
          <div className="lg:col-span-7 space-y-8">
            <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase block">
              BACKGROUND
            </span>

            <div className="space-y-5">
              {personal.longBio.map((paragraph, i) => (
                <p key={i} className="text-lg text-secondary leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Hackathon Achievement */}
            <div className="space-y-3 pt-4 border-t border-border/30">
              <span className="text-xs font-bold tracking-[0.2em] text-secondary/60 uppercase block">
                HACKATHON
              </span>
              <div className="bg-surface/30 border border-border/50 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                  <Trophy size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-lg">1st - Runner Up</h4>
                  <p className="text-sm text-secondary">Hacking the Future of Energy - Nexus Philippines</p>
                </div>
              </div>
            </div>

            {/* Collaboration Card — below the bio */}
            <a 
              href={`mailto:${personal.contact.email}`}
              className="bg-surface/50 border border-border rounded-2xl p-6 flex justify-between items-center group hover:border-accent transition-all duration-300 block"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-primary text-lg">Open to collaborations.</h4>
                <p className="text-sm text-secondary">Let&apos;s build something meaningful together.</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all duration-300 flex-shrink-0">
                <ArrowUpRight size={20} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          </div>

          {/* Facts Column */}
          <div className="lg:col-span-5">
            <div className="bg-surface border border-border rounded-2xl p-8 space-y-8">
              <h3 className="text-3xl font-display text-primary">Quick Facts</h3>
              
              <div className="space-y-6">
                {[
                  { label: 'STATUS', value: personal.quickFacts.status },
                  { label: 'FOCUS', value: personal.quickFacts.focus },
                  { label: 'LOOKING FOR', value: personal.quickFacts.lookingFor },
                  { label: 'AVAILABLE', value: personal.quickFacts.available, isAvailable: true }
                ].map((item) => (
                  <div key={item.label} className="space-y-2 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <span className="text-[10px] font-bold text-secondary/50 uppercase tracking-widest">
                      {item.label}
                    </span>
                    {item.isAvailable ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-lg text-primary font-medium">{item.value}</p>
                      </div>
                    ) : (
                      <p className="text-lg text-primary font-medium leading-tight">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a 
                  href={personal.contact.resume}
                  className="w-full inline-flex justify-center items-center px-8 py-4 bg-primary text-background rounded-lg font-mono text-sm tracking-widest hover:bg-accent-hover transition-all duration-300 uppercase shadow-sm"
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
