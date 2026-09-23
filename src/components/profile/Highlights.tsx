import React from 'react';
import { Building2 } from 'lucide-react';
import { portfolioData } from '@/data';

const { personal, leadership, certifications } = portfolioData;

const stats = [
  { value: personal.projectsBuilt, label: 'Projects Built' },
  { value: '2x', label: 'Hackathon Wins' },
  { value: `${certifications.length}+`, label: 'Certifications' },
];

/**
 * One bordered panel, not two disconnected rows — affiliations as icon
 * chips on top, a divider, then a metrics strip with vertical rules between
 * each number. Real data throughout: affiliations from portfolioData.leadership,
 * counts already used elsewhere on the site (certifications computed live
 * rather than a stale hardcoded figure).
 */
export const Highlights = () => (
  <div className="mt-6 overflow-hidden rounded-xl border border-border bg-surface/30">
    <div className="flex flex-wrap gap-2 p-4">
      {leadership.map((item) => (
        <div
          key={`${item.role}-${item.org}`}
          className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Building2 size={14} />
          </span>
          <div className="min-w-0">
            <p className="text-[13.5px] font-medium leading-tight text-primary">{item.org}</p>
            <p className="text-[11px] uppercase tracking-wide text-muted">{item.role}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="flex divide-x divide-border border-t border-border">
      {stats.map((stat) => (
        <div key={stat.label} className="flex-1 px-4 py-3.5">
          <p className="font-display text-[22px] font-semibold text-primary">{stat.value}</p>
          <p className="text-[12px] uppercase tracking-wide text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
);
