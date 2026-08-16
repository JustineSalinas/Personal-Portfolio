import React from 'react';
import { ArrowUpRight, Trophy } from 'lucide-react';
import { portfolioData } from '@/data';

/** Only the entries that carry a competition badge. */
const entries = portfolioData.projects.filter((p) => 'badge' in p && p.badge);

export const HackathonList = () => (
  <div className="peek peek-rows rounded-xl border border-border bg-background px-1.5">
    {entries.map((project) => {
      const href = 'demo' in project ? project.demo : undefined;
      const badge = 'badge' in project ? project.badge : undefined;
      const placement = 'placement' in project ? project.placement : undefined;
      const photos = 'awardImages' in project ? project.awardImages : undefined;

      const inner = (
        <>
          <Trophy size={13} className="mt-[3px] shrink-0 text-muted" />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-[13px] font-medium text-primary">{project.title}</span>
              <span className="text-[11px] text-muted">
                {/* Several badges already carry the year — don't print it twice */}
                {badge?.includes(project.year) ? badge : `${badge} · ${project.year}`}
              </span>
            </span>
            {placement && (
              <span className="mt-0.5 block text-[12px] font-medium text-primary">{placement}</span>
            )}
            <span className="mt-0.5 block text-[12px] leading-relaxed text-secondary">
              {project.role} — {project.oneLiner}
            </span>

            {photos && photos.length > 0 && (
              <span className="mt-2 grid grid-cols-2 gap-1.5">
                {photos.map((src) => (
                  <span
                    key={src}
                    className="block aspect-[16/10] overflow-hidden rounded-lg border border-border bg-surface"
                  >
                    <img
                      src={src}
                      alt={`${project.title} — ${badge}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </span>
                ))}
              </span>
            )}
          </span>
          {href && (
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border text-muted transition-colors group-hover:text-primary group-hover:border-primary/20">
              <ArrowUpRight size={12} />
            </span>
          )}
        </>
      );

      const shell =
        'peek-item group flex gap-2.5 rounded-lg border-b border-border px-2 py-3 last:border-b-0 hover:bg-surface';

      return href ? (
        <a
          key={project.title}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={shell}
        >
          {inner}
        </a>
      ) : (
        <div key={project.title} className={shell}>
          {inner}
        </div>
      );
    })}
  </div>
);
