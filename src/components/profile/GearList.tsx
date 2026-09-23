import React from 'react';
import Image from 'next/image';
import { portfolioData } from '@/data';

/**
 * Renders nothing until there is real gear to list — same rule as
 * Testimonials: no placeholder content while portfolioData.gear is empty.
 *
 * Card-grid-with-photo layout (not the tag-pill rows used elsewhere on the
 * site) — the point of a gear page is showing what the thing looks like.
 */
export const GearList = () => {
  const items = portfolioData.gear;
  if (items.length === 0) return null;

  const byCategory = new Map<string, typeof items>();
  items.forEach((item) => {
    if (!byCategory.has(item.category)) byCategory.set(item.category, []);
    byCategory.get(item.category)!.push(item);
  });

  return (
    <div className="space-y-8">
      {[...byCategory.entries()].map(([category, entries]) => (
        <div key={category}>
          <h2 className="mb-3 text-[13px] font-medium uppercase tracking-wider text-muted">
            {category}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {entries.map((item) => (
              <div
                key={item.name}
                className="hover-lift overflow-hidden rounded-xl border border-border bg-white"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 280px"
                    // A pale product shot (white mouse, white headset) on a
                    // white card has near-zero edge contrast — the shadow
                    // gives every photo a visible silhouette regardless of
                    // its own color, without needing per-item tuning.
                    className="object-contain p-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
                  />
                </div>
                <div className="border-t border-border bg-background px-3 py-2.5">
                  <p className="text-[14.5px] font-medium leading-snug text-primary">
                    {item.name}
                  </p>
                  {item.note && <p className="text-[13px] text-secondary">{item.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
