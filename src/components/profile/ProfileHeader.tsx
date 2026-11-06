'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, ArrowDown } from 'lucide-react';
import { portfolioData } from '@/data';
import { ResumeModal } from './ResumeModal';

const { personal } = portfolioData;

/**
 * Hero block: the full portrait beside the name, title, Resume pill and
 * a medium-weight H1 that states what you build, then a bio paragraph
 * that fades at the bottom, a "More about me" link, a divider, a Current
 * focus row, and a wide three-up stats row. No framed cards; the
 * surrounding page is the sheet of paper and these are typographic blocks.
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
      {/* Hero. The whole photo stands tall on the left. Beside it the text spans
          the photo's height: name and title at the top, the headline centered,
          Resume at the bottom. On phones the headline drops below the photo row
          so it keeps a readable width. Named grid areas place the same elements
          differently per breakpoint; the middle row (1fr) absorbs the extra height. */}
      <div className="grid grid-cols-[150px_1fr] gap-x-4 [grid-template-areas:'photo_identity'_'photo_action'_'headline_headline'] [grid-template-rows:auto_1fr_auto] sm:grid-cols-[280px_1fr] sm:gap-x-7 sm:[grid-template-areas:'photo_identity'_'photo_headline'_'photo_action']">
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-border bg-surface [grid-area:photo]">
          {/* The photo is 2:3 and so is this box, so object-cover shows all of it, uncropped.
              Served as-is (already web-sized, quality 92) so the optimizer cannot soften it. */}
          <Image
            src="/aj-hero.webp"
            alt={personal.name}
            fill
            priority
            unoptimized
            sizes="(min-width: 640px) 280px, 150px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 [grid-area:identity]">
          <p className="text-[22px] font-medium leading-tight text-primary sm:text-[26px]">
            {personal.name}
          </p>
          <p className="mt-1 text-[14px] text-muted sm:text-[15px]">{personal.title}</p>
        </div>

        <div className="mt-4 self-start [grid-area:action] sm:mt-0 sm:self-end">
          <button
            onClick={() => setIsResumeOpen(true)}
            className="flex h-11 items-center gap-2 rounded-full border border-border-strong px-5 text-[14px] font-medium text-primary transition-colors hover:bg-surface"
          >
            <FileText size={15} strokeWidth={1.75} />
            Resume
          </button>
        </div>

        <h1 className="mt-6 text-[28px] font-medium leading-[1.2] tracking-[-0.01em] text-primary [grid-area:headline] sm:mt-0 sm:self-center sm:text-[31px]">
          I build full-stack systems and data-driven AI platforms.
        </h1>
      </div>

      {/* Bio, with soft fade at the bottom like his */}
      <div className="relative mt-6">
        <p className="text-[16px] leading-[1.75] text-secondary">
          I design and ship end-to-end software, from database schemas and APIs to the polished
          front-ends they feed. {personal.projectsBuilt} projects built so far, including a
          2x National Hackathon Winner Awardee record. I run{' '}
          <Link href="/about" className="font-medium text-primary underline-offset-4 hover:underline">
            Cascade Development Group
          </Link>
          , an IT solutions startup in Iloilo, with a focused path in applied AI,
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
