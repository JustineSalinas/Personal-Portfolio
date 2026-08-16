import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { portfolioData } from '@/data';

export const BuildingNow = () => (
  <div className="peek grid gap-3 sm:grid-cols-2">
    {portfolioData.building.map((item) => {
      const role = 'role' in item ? item.role : undefined;

      return (
        <div
          key={item.name}
          className="peek-item group relative flex gap-2.5 rounded-xl border border-border bg-background p-3 hover:border-primary/25 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/40"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface font-display text-[13px] font-semibold text-secondary">
            {item.name.charAt(0)}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              {/* Stretched link keeps the whole card clickable without nesting anchors */}
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-medium text-primary before:absolute before:inset-0 before:content-['']"
              >
                {item.name}
              </a>
              <ArrowUpRight
                size={13}
                className="mt-0.5 shrink-0 text-muted transition-colors group-hover:text-primary"
              />
            </div>

            {role && <p className="mt-0.5 text-[11px] text-muted">{role}</p>}
            <p className="mt-1 text-[12px] leading-relaxed text-secondary">{item.blurb}</p>

            <a
              href={item.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.name} on GitHub`}
              className="relative z-10 mt-2 inline-flex items-center gap-1 text-[11px] text-muted transition-colors hover:text-primary"
            >
              <Github size={11} />
              Repo
            </a>
          </div>
        </div>
      );
    })}
  </div>
);
