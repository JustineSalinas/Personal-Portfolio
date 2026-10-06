'use client';

import React, { useState } from 'react';
import { Rocket } from 'lucide-react';

/**
 * Fixed to the lowest right corner of the viewport. The starting number is a
 * decorative count (it is not tracked anywhere); pressing Ship adds one to
 * what this visitor sees, for this page view only.
 */
export const ShipWidget = () => {
  const [count, setCount] = useState(() => new Date().getDate() * 17);
  const [launches, setLaunches] = useState(0);

  const ship = () => {
    setCount((c) => c + 1);
    setLaunches((n) => n + 1);
  };

  return (
    <div className="fixed bottom-4 right-4 z-30 hidden items-center gap-3 rounded-full border border-border bg-background py-1.5 pl-4 pr-1.5 shadow-[0_1px_2px_rgba(17,17,19,0.06),0_8px_24px_-12px_rgba(17,17,19,0.12)] lg:flex">
      <div className="leading-tight">
        <p className="text-[12px] font-medium text-muted-2">Ships this month</p>
        <p
          aria-live="polite"
          className="text-[15px] font-medium tabular-nums text-primary"
        >
          {count.toLocaleString()}
        </p>
      </div>
      <button
        type="button"
        onClick={ship}
        className="relative flex h-9 items-center gap-1.5 rounded-full bg-primary px-3.5 text-[14px] font-medium text-background transition-transform hover:-translate-y-[1px] active:translate-y-0"
      >
        {/* Remounting on each click (new key) restarts the CSS animation. */}
        <span
          key={`rocket-${launches}`}
          className={`inline-flex ${launches > 0 ? 'animate-rocket-launch' : ''}`}
        >
          <Rocket size={14} strokeWidth={1.75} />
        </span>
        {launches > 0 && (
          <span
            key={`trail-${launches}`}
            aria-hidden="true"
            className="pointer-events-none absolute left-[14px] top-[22px]"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="animate-ship-trail absolute h-1.5 w-1.5 rounded-full bg-amber-400"
                style={{ animationDelay: `${i * 90}ms`, left: i * 3, top: i * -2 }}
              />
            ))}
          </span>
        )}
        Ship
      </button>
    </div>
  );
};
