import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TopBar } from './TopBar';

/**
 * Shared chrome for the seven dedicated pages linked from the sidebar
 * (Projects, Experience, Stack, Certifications, Recommendations,
 * Affiliations, Resources) — same 880px column, back link, and heading
 * treatment as the rest of the site, so a click from the sidebar doesn't
 * feel like it left for a different site.
 */
export const SubPageShell = ({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) => (
  <main className="relative min-h-screen bg-page">
    <div className="relative z-10 mx-auto min-h-screen w-full max-w-[880px] border-x border-border bg-background">
      <TopBar />

      <div className="px-7 py-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-[16px] font-medium text-secondary transition-colors hover:text-primary"
        >
          <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-0.5" />
          Back to home
        </Link>

        <h1 className="mt-6 font-display text-[29px] font-semibold tracking-tight text-primary">
          {title}
        </h1>
        {intro && <p className="mt-1 text-[17px] text-secondary">{intro}</p>}

        <div className="mt-6">{children}</div>
      </div>
    </div>
  </main>
);
