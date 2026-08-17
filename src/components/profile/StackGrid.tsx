import React from 'react';
import { portfolioData } from '@/data';

export const StackGrid = () => (
  <div className="peek peek-rows rounded-xl border border-border bg-background px-1.5">
    {Object.entries(portfolioData.techStack).map(([category, items]) => (
      <div
        key={category}
        className="peek-item flex flex-col gap-1.5 rounded-lg border-b border-border px-2 py-3 last:border-b-0 hover:bg-surface sm:flex-row sm:items-start sm:gap-4"
      >
        <span className="shrink-0 text-[15px] text-muted sm:w-32 sm:pt-[3px]">{category}</span>
        <div className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <span
              key={item}
              className="cursor-default rounded-md border border-border bg-surface px-2 py-0.5 text-[15px] text-secondary transition-colors duration-200 hover:border-primary/25 hover:text-primary"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);
