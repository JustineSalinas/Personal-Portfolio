import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { HomeFooter } from './HomeFooter';

/**
 * Shared chrome for every sidebar-linked sub-page. Matches the home
 * layout exactly — same fixed sidebar, same 640px reading column —
 * so clicking a sidebar link doesn't feel like landing on a different
 * site. Each page provides its own small label-sized title (same
 * weight as a Section heading on home) and intro.
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
    <Sidebar />
    <div className="mx-auto w-full max-w-[640px] px-6 pb-10 pt-[84px] lg:pl-6 lg:pr-6 lg:pt-10">
      <Link
        href="/"
        className="group inline-flex min-h-8 items-center gap-1.5 text-[14px] font-medium text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        Back
      </Link>

      <h1 className="mt-6 text-[26px] font-medium leading-tight tracking-[-0.01em] text-primary">
        {title}
      </h1>
      {intro && <p className="mt-2 text-[16px] text-muted">{intro}</p>}

      <div className="mt-8">{children}</div>

      <HomeFooter />
    </div>
  </main>
);
