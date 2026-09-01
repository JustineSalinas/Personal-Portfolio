import React from 'react';
import { portfolioData } from '@/data';

/**
 * Renders nothing until there are real quotes to show — an empty or
 * placeholder testimonials block reads worse than no testimonials at all.
 */
export const Testimonials = () => {
  const items = portfolioData.testimonials;
  if (items.length === 0) return null;

  return (
    <div className="peek peek-rows rounded-xl border border-border bg-background px-1.5">
      {items.map((item) => (
        <figure
          key={`${item.name}-${item.quote.slice(0, 24)}`}
          className="peek-item rounded-lg border-b border-border px-3 py-5 last:border-b-0 hover:bg-surface"
        >
          <blockquote className="font-display text-[19px] italic leading-relaxed text-primary">
            &ldquo;{item.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-3 text-[15px] text-secondary">
            <span className="font-medium text-primary">{item.name}</span>
            <span className="text-muted"> · </span>
            {item.role}
            {item.org && <span className="block text-[14.5px] text-muted">{item.org}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
};
