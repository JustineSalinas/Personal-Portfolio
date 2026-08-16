import React from 'react';
import { portfolioData } from '@/data';
import { ThemeToggle } from './ThemeToggle';

export const TopBar = () => (
  <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
    <div className="flex items-center justify-between px-5 py-2.5">
      <a href="#top" className="font-display text-[15px] italic text-primary">
        {portfolioData.personal.initials}
      </a>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <a
          href={`mailto:${portfolioData.personal.contact.email}`}
          className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-[12px] font-medium text-primary transition-colors hover:bg-surface hover:border-primary/20"
        >
          Get in touch
        </a>
      </div>
    </div>
  </header>
);
