import React from 'react';
import { portfolioData } from '@/data';

export const LeadershipList = () => (
  <div className="peek peek-rows rounded-xl border border-border bg-background px-1.5">
    {portfolioData.leadership.map((item) => (
      <div
        key={`${item.role}-${item.org}`}
        className="peek-item flex flex-wrap items-baseline gap-x-2 gap-y-0.5 rounded-lg border-b border-border px-2 py-3 last:border-b-0 hover:bg-surface"
      >
        <span className="text-[17px] font-medium text-primary">{item.role}</span>
        <span className="text-muted">·</span>
        <span className="text-[16px] text-secondary">{item.org}</span>
        <span className="w-full text-[14.5px] text-muted sm:ml-auto sm:w-auto">{item.note}</span>
      </div>
    ))}
  </div>
);
