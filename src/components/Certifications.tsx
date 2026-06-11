'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const Certifications = () => {
  const { ref, isVisible } = useIsVisible<HTMLDivElement>();

  return (
    <div
      id="certifications"
      ref={ref}
      className={cn(
        'space-y-8 transition-all duration-1000',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      <div className="flex justify-between items-center pb-4 border-b border-border/40">
        <div className="flex items-center gap-4">
          <span className="section-label">06 — Certifications</span>
        </div>
        <Link
          href="/certifications"
          className="text-xs font-mono text-secondary/60 hover:text-accent transition-colors flex items-center gap-1 group tracking-wider"
        >
          View All
          <span className="group-hover:translate-x-0.5 transition-transform inline-block">›</span>
        </Link>
      </div>

      <div className="space-y-2.5">
        {portfolioData.certifications.map((cert, index) => (
          <a
            key={index}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-surface/30 hover:bg-surface border border-border/40 hover:border-accent/30 rounded-xl p-4 transition-all duration-300"
          >
            <div className="flex justify-between items-center gap-4">
              <div className="space-y-0.5 min-w-0">
                <h3 className="text-sm font-bold text-primary group-hover:text-accent transition-colors truncate">
                  {cert.title}
                </h3>
                <p className="text-[11px] font-mono text-secondary/55 tracking-wide flex items-center gap-2">
                  {cert.issuer}
                  <span className="text-border">·</span>
                  <span className="text-accent/60">{cert.date}</span>
                </p>
              </div>
              <ExternalLink
                size={14}
                className="text-secondary/30 group-hover:text-accent transition-colors flex-shrink-0"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
