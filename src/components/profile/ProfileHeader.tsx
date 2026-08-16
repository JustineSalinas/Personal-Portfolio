import React from 'react';
import { Github, Linkedin, Mail, FileText, MapPin } from 'lucide-react';
import { portfolioData } from '@/data';

const { personal } = portfolioData;

const socials = [
  { href: personal.contact.github, label: 'GitHub', Icon: Github },
  { href: personal.contact.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: `mailto:${personal.contact.email}`, label: 'Email', Icon: Mail },
  { href: personal.contact.resume, label: 'Resume', Icon: FileText },
];

export const ProfileHeader = () => (
  <div id="top">
    {/*
      Cover is drawn in CSS so there's no stock-photo filler. To use a real
      photo instead, drop it at /public/cover.jpg and swap this div for an <img>.
    */}
    <div className="relative h-40 overflow-hidden sm:h-48">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#191817_0%,#2f2c28_45%,#4d453a_75%,#7a6a4e_100%)]" />
      <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(120%_90%_at_18%_0%,#ffffff_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_9px)]" />
      <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-8 text-center font-display text-[15px] italic leading-snug text-white/90 sm:text-base">
        Ship the system, sweat the details, and let the work make the argument.
      </p>
    </div>

    <div className="px-5">
      {/* Avatar overlaps the cover. Needs its own stacking context, or the
          positioned cover above paints over the top half of the face. */}
      <div className="relative z-10 -mt-9 mb-3">
        <img
          src="/portrait.png"
          alt={personal.name}
          className="h-[70px] w-[70px] rounded-full border-4 border-background object-cover shadow-sm"
          style={{ objectPosition: 'center 22%' }}
        />
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-[26px] font-semibold leading-tight tracking-tight text-primary">
            {personal.name}
          </h1>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[13px] text-secondary">
            <span>{personal.quickFacts.status}</span>
            <span className="text-muted">•</span>
            <span>Founder of CDG</span>
            <span className="text-muted">•</span>
            {/* icon and place stay on one line so the pin never dangles at a wrap */}
            <span className="inline-flex items-center gap-1">
              <MapPin size={11} className="shrink-0" />
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
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-secondary transition-colors hover:text-primary hover:border-primary/20"
            >
              <Icon size={13} />
            </a>
          ))}
        </div>
      </div>

      <p className="mt-5 text-[13.5px] leading-[1.75] text-secondary">
        I build full-stack systems —{' '}
        <span className="font-medium text-primary">{personal.projectsBuilt} projects built</span> —
        and run{' '}
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
        , and integrate AI where it earns its place. Open to internships, part-time,
        and remote roles.
      </p>
    </div>
  </div>
);
