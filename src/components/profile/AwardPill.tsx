import React from 'react';

/** Green chip for a hackathon that is still in progress. */
export const OngoingPill = () => (
  <span className="inline-flex h-[22px] items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 text-[12px] font-medium text-emerald-700 dark:text-emerald-300">
    <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none" />
    Ongoing
  </span>
);

/** Gold placement chip for podium finishes (2nd Place, 1st Runner-Up). */
export const AwardPill = ({ label }: { label: string }) => (
  <span className="inline-flex h-[22px] items-center rounded-full border border-amber-500/35 bg-amber-500/10 px-2.5 text-[12px] font-medium text-amber-700 dark:text-amber-300">
    {label}
  </span>
);
