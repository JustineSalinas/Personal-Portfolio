'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, ArrowDown } from 'lucide-react';
import { portfolioData } from '@/data';
import { ResumeModal } from './ResumeModal';

const { personal } = portfolioData;

/**
 * Hero block modeled directly on marwieang.com: small identity row
 * (avatar + name + title + Resume pill) → a medium-weight H1 that
 * states what you build → bio paragraph that fades at the bottom → a
 * "↓ More about me" link, a divider, a Current niche row, and a wide
 * three-up stats row. No framed cards here; the surrounding card is
 * the sheet of paper, these are typographic blocks on it.
 */
export const ProfileHeader = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const stats: { value: string; label: string }[] = [
    { value: personal.projectsBuilt, label: 'Projects built' },
    { value: '2x', label: 'National hackathon wins' },
    { value: '1+ yr', label: 'Shipping software' },
  ];

  return (
    <div id="top">
      {/* Identity row */}
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border bg-surface">
          <Image
            src="/portrait.png"
            alt={personal.name}
            fill
            priority
            sizes="56px"
            className="object-cover"
            style={{ objectPosition: 'center 20%' }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-medium leading-tight text-primary">{personal.name}</p>
          <p className="text-[14px] text-muted">{personal.title}</p>
        </div>
        <button
          onClick={() => setIsResumeOpen(true)}
          className="flex h-11 items-center gap-2 rounded-full border border-border-strong px-5 text-[14px] font-medium text-primary transition-colors hover:bg-surface"
        >
          <FileText size={15} strokeWidth={1.75} />
          Resume
        </button>
      </div>

      {/* H1 statement */}
      <h1 className="mt-10 text-[34px] font-medium leading-[1.25] tracking-[-0.01em] text-primary">
        I build full-stack systems and data-driven AI platforms.
      </h1>

      {/* Bio, with soft fade at the bottom like his */}
      <div className="relative mt-6">
        <p className="text-[16px] leading-[1.75] text-secondary">
          I design and ship end-to-end software, from database schemas and APIs to the polished
          front-ends they feed. {personal.projectsBuilt} projects built so far, including a
          2x National Hackathon Winner Awardee record. I run{' '}
          <Link href="/about" className="font-medium text-primary underline-offset-4 hover:underline">
            Cascade Development Group
          </Link>
          , an IT solutions startup in Iloilo, with a focused path in data engineering and applied AI,
          from building data pipelines to shipping production AI systems. Open to internships,
          part-time, and remote roles.
        </p>
        {/* Bottom fade — matches his "excerpt with More about me ↓" treatment. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background"
        />
      </div>

      <Link
        href="/about"
        className="group mt-2 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-primary transition-colors hover:text-muted"
      >
        <ArrowDown size={14} strokeWidth={1.75} className="transition-transform group-hover:translate-y-0.5" />
        More about me
      </Link>

      {/* Divider */}
      <div className="mt-8 border-t border-border" />

      {/* Current niche */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-[14px] text-muted">Current focus</span>
        <span className="flex h-8 items-center gap-2 rounded-full bg-primary px-3.5 text-[14px] font-medium text-background">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          AI engineering
        </span>
        <span className="flex h-8 items-center rounded-full border border-border-strong px-3.5 text-[14px] font-medium text-secondary">
          Technical PM
        </span>
      </div>

      <div className="mt-8 border-t border-border" />

      {/* Big three-up stats */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-[30px] font-medium leading-tight text-primary">{s.value}</p>
            <p className="mt-1 text-[14px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
};
