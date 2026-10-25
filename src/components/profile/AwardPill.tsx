import React from 'react';

/** Green chip for a hackathon that is still in progress. */
export const OngoingPill = () => (
  <span className="inline-flex h-[22px] items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 text-[12px] font-medium text-emerald-700 dark:text-emerald-300">
    <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none" />
    Ongoing
  </span>
);

/** Top-three finishes ("1st", "2nd", "3rd", including runner-up labels) earn the gold treatment. */
export const isPodium = (label: string) => /^(1st|2nd|3rd)\b/i.test(label.trim());

/**
 * Placement chip. Gold for podium finishes (2nd Place, 1st Runner-Up); a
 * neutral outline for other placements (8th Place), so gold stays meaningful.
 */
export const AwardPill = ({ label }: { label: string }) => (
  <span
    className={`inline-flex h-[22px] items-center rounded-full border px-2.5 text-[12px] font-medium ${
      isPodium(label)
        ? 'border-amber-500/35 bg-amber-500/10 text-amber-700 dark:text-amber-300'
        : 'border-border-strong bg-surface text-secondary'
    }`}
  >
    {label}
  </span>
);
