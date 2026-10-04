import React from 'react';
import { hackathons } from '@/lib/hackathons';
import { AwardPill } from './AwardPill';

/**
 * Newest first. Events with a known start date are ordered by it; events that
 * only carry a year have no verifiable position, so they follow the dated
 * ones, shown with a hollow marker instead of a filled one.
 */
const entries = hackathons
  .map((project, index) => ({
    project,
    index,
    start: 'startDate' in project ? project.startDate : undefined,
  }))
  .sort((a, b) => {
    if (a.start && b.start) return b.start.localeCompare(a.start);
    if (a.start) return -1;
    if (b.start) return 1;
    return a.index - b.index;
  });

export const HackathonTimeline = () => (
  <div className="relative">
    <div className="absolute bottom-2 left-[5px] top-2 w-px bg-border-strong" aria-hidden="true" />

    <ol aria-label="Hackathon timeline" className="space-y-7">
      {entries.map(({ project, start }) => {
        const badge = 'badge' in project ? project.badge : undefined;
        const placement = 'placement' in project ? project.placement : undefined;
        const when = 'dates' in project ? project.dates : project.year;
        const award = 'award' in project ? project.award : undefined;

        return (
          <li key={project.title} className="relative pl-8">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-[5px] h-[11px] w-[11px] rounded-full border-2 ${
                start ? 'border-primary bg-primary' : 'border-border-strong bg-background'
              }`}
            />
            <p className="text-[13px] font-medium text-muted">{when}</p>
            <p className="mt-0.5 flex flex-wrap items-center gap-2 text-[16px] font-medium text-primary">
              {project.title}
              {award && <AwardPill label={award} />}
            </p>
            {badge && <p className="text-[13px] uppercase tracking-wide text-muted-2">{badge}</p>}
            {placement && <p className="mt-1 text-[14.5px] text-secondary">{placement}</p>}
          </li>
        );
      })}
    </ol>
  </div>
);
