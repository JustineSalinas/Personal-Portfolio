import React from 'react';

/** Gold placement chip for podium finishes (2nd Place, 1st Runner-Up). */
export const AwardPill = ({ label }: { label: string }) => (
  <span className="inline-flex h-[22px] items-center rounded-full border border-amber-500/35 bg-amber-500/10 px-2.5 text-[12px] font-medium text-amber-700 dark:text-amber-300">
    {label}
  </span>
);
