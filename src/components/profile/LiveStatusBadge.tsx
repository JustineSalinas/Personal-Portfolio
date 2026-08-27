'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { portfolioData } from '@/data';

export const LiveStatusBadge = () => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Manila (PHT, UTC+8)
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[13px] font-medium text-emerald-600 dark:text-emerald-400">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </span>
        <span>{portfolioData.personal.availability}</span>
      </div>

      {timeString && (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/80 px-3 py-1 text-[13px] font-mono text-muted">
          <Clock size={13} className="shrink-0 text-secondary" />
          <span>{timeString} PHT</span>
        </div>
      )}
    </div>
  );
};
