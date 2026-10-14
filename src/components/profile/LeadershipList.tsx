import React from 'react';
import { portfolioData } from '@/data';
import { LogoTile } from './LogoTile';

export const LeadershipList = () => (
  <div className="divide-y divide-border">
    {portfolioData.leadership.map((item) => (
      <div key={`${item.role}-${item.org}`} className="flex items-center gap-4 py-4">
        <LogoTile logo={item.logo} name={item.org} fit="cover" />
        <div className="min-w-0 flex-1">
          <p className="text-[15.5px] font-medium leading-tight text-primary">{item.org}</p>
          <p className="mt-1 text-[14px] text-muted">{item.role}</p>
        </div>
        <p className="hidden max-w-[200px] shrink-0 text-right text-[13px] leading-snug text-muted sm:block">
          {item.note}
        </p>
      </div>
    ))}
  </div>
);
