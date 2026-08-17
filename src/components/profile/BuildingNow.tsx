import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { portfolioData } from '@/data';
import { SheenGroup } from './SheenGroup';

export const BuildingNow = () => (
  <SheenGroup className="peek grid gap-3 sm:grid-cols-2">
    {portfolioData.building.map((item) => {
      const role = 'role' in item ? item.role : undefined;

      return (
        <div
          key={item.name}
          className="peek-item peek-card group relative flex gap-2.5 rounded-xl border border-border bg-background p-3 hover:border-primary/30 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/50"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface font-display text-[17px] font-semibold text-secondary">
            {item.name.charAt(0)}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              {/* Stretched link keeps the whole card clickable without nesting anchors */}
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[17px] font-medium text-primary before:absolute before:inset-0 before:content-['']"
              >
                {item.name}
              </a>
              <ArrowUpRight
                size={17}
                className="hover-arrow mt-0.5 shrink-0 text-muted group-hover:text-primary"
              />
            </div>

            {role && <p className="mt-0.5 text-[14.5px] text-muted">{role}</p>}
            <p className="mt-1 text-[16px] leading-relaxed text-secondary">{item.blurb}</p>

            <a
              href={item.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.name} on GitHub`}
              className="relative z-10 mt-2 inline-flex items-center gap-1 text-[14.5px] text-muted transition-colors hover:text-primary"
            >
              <Github size={15} />
              Repo
            </a>
          </div>
        </div>
      );
    })}
  </SheenGroup>
);
