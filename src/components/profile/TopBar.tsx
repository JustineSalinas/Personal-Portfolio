import React from 'react';
import Link from 'next/link';
import { portfolioData } from '@/data';
import { ThemeToggle } from './ThemeToggle';

export const TopBar = () => (
  <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
    <div className="flex items-center justify-between px-7 py-3">
      <Link href="/#top" className="font-display text-[20px] italic text-primary">
        {portfolioData.personal.initials}
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {/* Points at the on-page form, not a mailto: — a mail client that
            isn't configured fails silently and the visitor just sees nothing. */}
        <Link
          href="/#contact"
          className="cta-solid hover-lift group relative overflow-hidden rounded-lg bg-accent px-3 py-1.5 text-[16px] font-medium text-background"
        >
          <span className="relative z-10">Get in touch</span>
        </Link>
      </div>
    </div>
  </header>
);
