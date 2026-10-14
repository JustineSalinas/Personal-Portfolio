import React from 'react';
import { portfolioData } from '@/data';
import { LogoTile } from './LogoTile';

const shortName = (company: string) => company.split('|')[0].trim();

/**
 * Experience in a flat typographic form: role bold + a " · Company" subtitle
 * on the same line, date in muted gray floated right, bulleted highlights
 * beneath, and a joined tech list at the bottom. The home page shows it
 * type-only; pass `showLogos` for the full Experience page, which adds a logo
 * tile (or a placeholder until the logo file exists) beside each role.
 */
export const ExperienceList = ({
  limit,
  showLogos = false,
}: { limit?: number; showLogos?: boolean } = {}) => {
  const items = limit ? portfolioData.experience.slice(0, limit) : portfolioData.experience;

  return (
    <div className="flex flex-col gap-10">
      {items.map((item) => {
        const name = shortName(item.company);
        const logo = 'logo' in item ? (item.logo as string | undefined) : undefined;
        const tech = 'techStack' in item ? (item.techStack as string[] | undefined) : undefined;
        return (
          <div key={`${item.company}-${item.date}`} className={showLogos ? 'flex gap-4' : undefined}>
            {showLogos && <LogoTile logo={logo} name={name} />}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-[16px] text-primary">
                  <span className="font-medium">{item.role}</span>
                  <span className="text-muted"> · {name}</span>
                </p>
                <p className="text-[14px] text-muted">{item.date}</p>
              </div>
              <ul className="mt-3 space-y-1.5">
                {item.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-[15px] leading-[1.65] text-secondary"
                  >
                    <span className="mt-[10px] h-[3px] w-[3px] shrink-0 rounded-full bg-muted" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {tech && tech.length > 0 && (
                <p className="mt-3 text-[14px] text-muted">{tech.join(' · ')}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
