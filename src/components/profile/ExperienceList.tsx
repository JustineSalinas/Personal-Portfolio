import React from 'react';
import Image from 'next/image';
import { portfolioData } from '@/data';
import { isSvg } from '@/lib/utils';

/** "PharmaTrack — University of San Agustin, ..." → "PharmaTrack" */
const shortName = (company: string) => company.split('—')[0].trim();
/** Everything after the dash becomes the quiet second line. */
const qualifier = (company: string) => company.split('—').slice(1).join('—').trim();

/**
 * Vertical timeline — a connecting rail with a logo node per entry, each
 * fully expanded rather than click-to-reveal. Matches the always-visible
 * timeline format used on bryllim.com's Experience page, rather than the
 * site's usual peek-and-expand accordion.
 */
export const ExperienceList = () => (
  <div className="relative">
    {/* --border/--secondary are hex-with-alpha tokens, so Tailwind's /opacity
        modifier on them silently resolves to transparent — using the token
        directly (its own alpha is already visible, and it's theme-aware,
        unlike a hardcoded rgba) is what actually renders a line. */}
    <div className="absolute bottom-2 left-[21px] top-2 w-px bg-muted" aria-hidden="true" />

    <div className="space-y-8">
      {portfolioData.experience.map((item) => {
        const name = shortName(item.company);
        const sub = qualifier(item.company);
        const logo = 'logo' in item ? (item.logo as string) : undefined;

        return (
          <div key={`${item.company}-${item.date}`} className="relative flex gap-4 pl-0">
            {logo ? (
              <Image
                src={logo}
                alt={name}
                width={44}
                height={44}
                unoptimized={isSvg(logo)}
                className="relative z-10 h-11 w-11 shrink-0 rounded-lg border border-border bg-surface object-contain p-1.5"
              />
            ) : (
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface font-display text-[17px] font-semibold text-secondary">
                {name.charAt(0)}
              </span>
            )}

            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-[18px] font-medium leading-snug text-primary">{name}</p>
              {sub && <p className="text-[14.5px] text-muted">{sub}</p>}

              <p className="mt-1.5 text-[16px] font-medium text-secondary">{item.role}</p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[13.5px] uppercase tracking-wide text-muted">
                <span>{item.date}</span>
                {item.location && (
                  <>
                    <span>·</span>
                    <span className="normal-case tracking-normal">{item.location}</span>
                  </>
                )}
              </p>

              <ul className="mt-2.5 space-y-2">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-[16px] leading-relaxed text-secondary">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
