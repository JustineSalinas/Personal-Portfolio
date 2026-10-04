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
          <h2 className="mb-3 text-[14px] font-medium text-muted">
            {category}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {entries.map((item) => (
              <div
                key={item.name}
                className="hover-lift overflow-hidden rounded-2xl border border-border bg-surface p-1.5"
              >
                {/* Product photos are opaque shots on white, so they sit on
                    their own white plate inside a themed card: the card colors
                    follow the light/dark theme, and the photo never bleeds into
                    the label area. */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 280px"
                    // A pale product shot (white mouse) on a white plate has
                    // near-zero edge contrast; the shadow keeps a visible
                    // silhouette without per-item tuning.
                    className="object-contain p-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
                  />
                </div>
                <div className="px-2.5 pb-2 pt-3">
                  <p className="text-[14.5px] font-medium leading-snug text-primary">
                    {item.name}
                  </p>
                  {item.note && <p className="mt-0.5 text-[13px] text-muted">{item.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
