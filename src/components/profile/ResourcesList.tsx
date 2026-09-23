import React from 'react';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data';

/**
 * Learning sources, grouped by category — courses, practice sites, and
 * references used for building software, getting into AI/data engineering,
 * and staying current. Simple link rows rather than image cards, since these
 * are sites and platforms, not physical products.
 */
export const ResourcesList = () => {
  const items = portfolioData.resources;
  if (items.length === 0) return null;

  const byCategory = new Map<string, typeof items>();
  items.forEach((item) => {
    if (!byCategory.has(item.category)) byCategory.set(item.category, []);
    byCategory.get(item.category)!.push(item);
  });

  return (
    <div className="space-y-6">
      {[...byCategory.entries()].map(([category, entries]) => (
        <div key={category}>
          <h2 className="mb-2 text-[13.5px] font-medium uppercase tracking-wide text-muted">
            {category}
          </h2>
          <div className="rounded-xl border border-border bg-background px-3">
            {entries.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 border-b border-border py-3 last:border-b-0 transition-colors hover:bg-surface/50 -mx-3 px-3 rounded-lg"
              >
                <span className="text-[16px] font-medium text-primary">{item.name}</span>
                <ExternalLink
                  size={15}
                  className="hover-arrow shrink-0 text-muted group-hover:text-primary"
                />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
