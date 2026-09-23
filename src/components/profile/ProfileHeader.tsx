'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, FileText, MapPin } from 'lucide-react';
import { portfolioData } from '@/data';
import { LiveStatusBadge } from './LiveStatusBadge';
import { Highlights } from './Highlights';
import { ResumeModal } from './ResumeModal';

const { personal } = portfolioData;

const socials = [
  { href: personal.contact.github, label: 'GitHub', Icon: Github },
  { href: personal.contact.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: `mailto:${personal.contact.email}`, label: 'Email', Icon: Mail },
];

export const ProfileHeader = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div id="top" className="px-7 pt-8">
      {/* Side-by-side, not a full-width banner: a square photo beside the
          name and bio, matching bryllim.com's hero. Sized to roughly match
          the text column's height rather than leaving the photo small and
          the right side visually empty. */}
      <div className="flex gap-5 sm:gap-7">
        <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-xl border border-border bg-surface sm:h-52 sm:w-52">
          <Image
            src="/portrait.png"
            alt={personal.name}
            fill
            // Above the fold and the likely LCP element, so skip lazy loading.
            priority
            sizes="208px"
            className="object-cover"
            style={{ objectPosition: 'center 20%' }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="font-display text-[28px] font-semibold leading-tight tracking-tight text-primary sm:text-[35px]">
            {personal.name}
          </h1>
          {/* Role line carries the professional identity; status and location
              sit under it so the hierarchy reads name → what → where. */}
          <p className="mt-1 text-[17px] font-medium text-secondary">{personal.title}</p>
          <p className="mt-1 font-display text-[16px] italic text-muted">
            Student by day. Founder the rest of it.
          </p>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 text-[15px] text-muted">
            <span>{personal.quickFacts.status}</span>
            <span>•</span>
            {/* icon and place stay on one line so the pin never dangles at a wrap */}
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} className="shrink-0" />
              {personal.location}
            </span>
          </p>
          <LiveStatusBadge />

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="hover-lift flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-secondary hover:border-primary/30 hover:text-primary"
              >
                <Icon size={17} />
              </a>
            ))}
            {/* Opens in place — navigating away to read a resume is friction. */}
            <button
              onClick={() => setIsResumeOpen(true)}
              aria-label="View resume"
              title="View resume"
              className="hover-lift flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-secondary hover:border-primary/30 hover:text-primary"
            >
              <FileText size={17} />
            </button>
          </div>
        </div>
      </div>

      <p className="mt-5 text-[18px] leading-[1.75] text-secondary">
        I build full-stack systems and data-driven AI platforms, with{' '}
        <span className="font-medium text-primary">{personal.projectsBuilt} projects built</span> and a{' '}
        <span className="font-medium text-primary">2x National Hackathon Winner Awardee</span> record. I run{' '}
        <a
          href="https://cdg-official.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="prose-link font-medium"
        >
          Cascade Development Group
        </a>
        , an IT solutions startup in Iloilo, with a strong niche in{' '}
        <span className="font-medium text-primary">technical project management</span> and a focused path in{' '}
        <span className="font-medium text-primary">data engineering and applied AI</span>, from building data pipelines to shipping production AI systems. Open to internships, part-time, and remote roles.
      </p>

      <Highlights />

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
};

