import React from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, FileText, MapPin } from 'lucide-react';
import { portfolioData } from '@/data';
import { CoverBanner } from './CoverBanner';

const { personal } = portfolioData;

const socials = [
  { href: personal.contact.github, label: 'GitHub', Icon: Github },
  { href: personal.contact.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: `mailto:${personal.contact.email}`, label: 'Email', Icon: Mail },
  { href: personal.contact.resume, label: 'Resume', Icon: FileText },
];

export const ProfileHeader = () => (
  <div id="top">
    <CoverBanner>Student by day. Founder the rest of it.</CoverBanner>

    <div className="px-7">
      {/* Avatar overlaps the cover. Needs its own stacking context, or the
          positioned cover above paints over the top half of the face. */}
      <div className="relative z-10 -mt-12 mb-4">
        <Image
          src="/portrait.png"
          alt={personal.name}
          width={93}
          height={93}
          // Above the fold and the likely LCP element, so skip lazy loading.
          priority
          className="h-[93px] w-[93px] rounded-full border-4 border-background object-cover shadow-sm"
          style={{ objectPosition: 'center 22%' }}
        />
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-[35px] font-semibold leading-tight tracking-tight text-primary">
            {personal.name}
          </h1>
          {/* Role line carries the professional identity; status and location
              sit under it so the hierarchy reads name → what → where. */}
          <p className="mt-1 text-[17px] font-medium text-secondary">{personal.title}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[15px] text-muted">
            <span>{personal.quickFacts.status}</span>
            <span>•</span>
            {/* icon and place stay on one line so the pin never dangles at a wrap */}
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} className="shrink-0" />
              {personal.location}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-1.5">
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
        </div>
      </div>

      <p className="mt-5 text-[18px] leading-[1.75] text-secondary">
        I build full-stack systems —{' '}
        <span className="font-medium text-primary">{personal.projectsBuilt} projects built</span>,{' '}
        <span className="font-medium text-primary">2x National Hackathon Winner Awardee</span> — and run{' '}
        <a
          href="https://cdg-official.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="prose-link font-medium"
        >
          Cascade Development Group
        </a>
        , an IT solutions startup in Iloilo. I work across{' '}
        <span className="font-medium text-primary">Next.js, TypeScript, Supabase, and Python</span>
        , bringing a strong niche in <span className="font-medium text-primary">technical project management</span> alongside a focused path in <span className="font-medium text-primary">AI systems</span>. Open to internships, part-time, and remote roles.
      </p>
    </div>
  </div>
);
