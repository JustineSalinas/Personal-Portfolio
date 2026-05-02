'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

export const About = () => {
  const { ref, isVisible } = useIsVisible();
  const { personal } = portfolioData;

  const highlightTerms = (text: string) => {
    const terms = [
      "Bachelor of Science in Information Technology",
      "software engineering and data science",
      "Next.js, TypeScript",
      "AI/ML integrations",
      "distributed systems",
      "data engineering"
    ];
    
    let segments: (string | JSX.Element)[] = [text];
    
    terms.forEach(term => {
      const newSegments: (string | JSX.Element)[] = [];
      segments.forEach(segment => {
        if (typeof segment === 'string') {
          const parts = segment.split(new RegExp(`(${term})`, 'gi'));
          parts.forEach((part) => {
            if (part.toLowerCase() === term.toLowerCase()) {
              newSegments.push(<strong className="text-primary font-bold">{part}</strong>);
            } else if (part) {
              newSegments.push(part);
            }
          });
        } else {
          newSegments.push(segment);
        }
      });
      segments = newSegments;
    });
    
    // Assign final unique keys to any JSX elements in the array
    return segments.map((seg, idx) => {
      if (React.isValidElement(seg)) {
        return React.cloneElement(seg as React.ReactElement, { key: idx });
      }
      return seg;
    });
  };

  return (
    <section id="about" className="section-padding px-6" ref={ref}>
      <div className={cn(
        "max-w-7xl mx-auto transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Background Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase">
                BACKGROUND
              </span>
              
              <div className="space-y-6">
                {personal.longBio.map((paragraph, i) => (
                  <p key={i} className="text-lg text-secondary leading-relaxed">
                    {highlightTerms(paragraph)}
                  </p>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {personal.tags?.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1.5 border border-border text-[10px] font-bold tracking-widest text-secondary/80 rounded-sm hover:border-accent transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Facts & Contact Column */}
          <div className="lg:col-span-5 space-y-6">
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

            {/* Collaboration Card */}
            <div className="bg-surface/50 border border-border rounded-2xl p-6 flex justify-between items-center group cursor-pointer hover:border-accent transition-all duration-300">
              <div className="space-y-1">
                <h4 className="font-bold text-primary text-lg">Open to collaborations.</h4>
                <p className="text-sm text-secondary">Let's build something meaningful together.</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all duration-300">
                <ArrowUpRight size={20} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
