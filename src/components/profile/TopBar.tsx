import React from 'react';
import { portfolioData } from '@/data';
import { ThemeToggle } from './ThemeToggle';

export const TopBar = () => (
  <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
    <div className="flex items-center justify-between px-7 py-3">
      <a href="#top" className="font-display text-[20px] italic text-primary">
        {portfolioData.personal.initials}
      </a>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {/* Points at the on-page form, not a mailto: — a mail client that
            isn't configured fails silently and the visitor just sees nothing. */}
        <a
          href="#contact"
          className="cta-solid hover-lift group relative overflow-hidden rounded-lg bg-accent px-3 py-1.5 text-[16px] font-medium text-background"
        >
          <span className="relative z-10">Get in touch</span>
        </a>
      </div>
    </div>
  </header>
);
