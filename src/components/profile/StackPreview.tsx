import React from 'react';
import { portfolioData } from '@/data';

/**
 * Two-column rows (category label | comma-joined items) matching
 * marwieang.com's Stack section. The left column stays a fixed width
 * so the right columns line up vertically across rows.
 */
export const StackPreview = () => (
  <div className="divide-y divide-border">
    {Object.entries(portfolioData.techStack).map(([category, items]) => (
      <div key={category} className="grid grid-cols-[160px_1fr] gap-6 py-4">
        <p className="text-[14px] text-muted">{category}</p>
        <p className="text-[15px] text-primary">{items.join(', ')}</p>
      </div>
    ))}
  </div>
);
