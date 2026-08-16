'use client';

import React, { useEffect, useMemo, useState } from 'react';

interface Day {
  date: string;
  level: number;
  count: number;
}

interface Payload {
  success: boolean;
  username: string;
  total: number;
  source: 'graphql' | 'scrape';
  days: Day[];
  longestStreak: number;
  currentStreak: number;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LEVEL_VAR = ['--gh-0', '--gh-1', '--gh-2', '--gh-3', '--gh-4'];

// Sized so a full 53-week year fits the 660px reading column without scrolling.
const CELL = 8;
const GAP = 2;

/** Bucket the flat day list into Sunday-first week columns. */
const toWeeks = (days: Day[]): (Day | null)[][] => {
  if (days.length === 0) return [];
  const weeks: (Day | null)[][] = [];
  // GitHub rows are Sun..Sat; pad the first column if it doesn't start on Sunday.
  let current: (Day | null)[] = Array(new Date(days[0].date + 'T00:00:00Z').getUTCDay()).fill(null);

  for (const day of days) {
    current.push(day);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length > 0) weeks.push([...current, ...Array(7 - current.length).fill(null)]);
  return weeks;
};

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

interface Tip {
  day: Day;
  x: number;
  y: number;
}

export const GithubHeatmap = () => {
  const [data, setData] = useState<Payload | null>(null);
  const [failed, setFailed] = useState(false);
  const [tip, setTip] = useState<Tip | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/github')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((json: Payload) => {
        if (!active) return;
        if (json.success) setData(json);
        else setFailed(true);
      })
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, []);

  const weeks = useMemo(() => toWeeks(data?.days ?? []), [data]);

  // One label per month, positioned at the week where that month first appears.
  const monthLabels = useMemo(() => {
    const labels: { index: number; label: string }[] = [];
    let last = -1;
    weeks.forEach((week, i) => {
      const first = week.find(Boolean);
      if (!first) return;
      const month = new Date(first.date + 'T00:00:00Z').getUTCMonth();
      if (month !== last) {
        labels.push({ index: i, label: MONTHS[month] });
        last = month;
      }
    });
    return labels;
  }, [weeks]);

  if (failed) {
    return (
      <div className="rounded-xl border border-border bg-background p-4">
        <p className="text-[12px] text-secondary">
          GitHub activity is unavailable right now.{' '}
          <a
            href="https://github.com/JustineSalinas"
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            View the profile on GitHub
          </a>
          .
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl border border-border bg-background p-4">
        <div className="h-[104px] animate-pulse rounded-lg bg-surface" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[12.5px] text-primary">
          <span className="font-medium">{data.total.toLocaleString()}</span>{' '}
          <span className="text-secondary">contributions in the last year</span>
        </p>
        <p className="text-[11px] text-muted">
          {data.currentStreak}-day current streak · {data.longestStreak}-day longest
        </p>
      </div>

      {/* Wide content scrolls inside its own container, never the page */}
      {/* scrollbar-none: the year fits at full width, and on narrow screens the
          bar is pure clutter — swipe/drag still scrolls. */}
      <div className="scrollbar-none overflow-x-auto" onMouseLeave={() => setTip(null)}>
        {/* relative: cells are static, so this becomes their offsetParent and
            the tooltip can be positioned from offsetLeft/offsetTop. */}
        <div className="relative inline-block min-w-min">
          {/* Month row */}
          <div className="relative mb-1 ml-[26px] h-3">
            {monthLabels.map(({ index, label }) => (
              <span
                key={`${label}-${index}`}
                className="absolute top-0 text-[9.5px] leading-3 text-muted"
                style={{ left: index * (CELL + GAP) }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex" style={{ gap: GAP }}>
            {/* Weekday gutter — only alternating labels, as GitHub does */}
            <div className="mr-1 flex w-[22px] flex-col" style={{ gap: GAP }}>
              {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((label, i) => (
                <span
                  key={i}
                  className="text-[9px] text-muted"
                  style={{ height: CELL, lineHeight: `${CELL}px` }}
                >
                  {label}
                </span>
              ))}
            </div>

            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                {week.map((day, di) =>
                  day ? (
                    <span
                      key={day.date}
                      onMouseEnter={(e) =>
                        setTip({
                          day,
                          x: e.currentTarget.offsetLeft + CELL / 2,
                          y: e.currentTarget.offsetTop,
                        })
                      }
                      className="cursor-pointer rounded-[2px] ring-1 ring-inset ring-black/[0.04] transition-[ring-color,transform] duration-150 hover:ring-primary/60 dark:ring-white/[0.04]"
                      style={{
                        width: CELL,
                        height: CELL,
                        backgroundColor: `var(${LEVEL_VAR[Math.min(day.level, 4)]})`,
                      }}
                    />
                  ) : (
                    <span key={`${wi}-${di}`} style={{ width: CELL, height: CELL }} />
                  )
                )}
              </div>
            ))}
          </div>

          {tip && (
            <span
              role="tooltip"
              className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-[10.5px] leading-tight text-primary shadow-md"
              style={{ left: tip.x, top: tip.y - 6 }}
            >
              <span className="font-medium">
                {tip.day.count === 0
                  ? 'No contributions'
                  : `${tip.day.count} contribution${tip.day.count === 1 ? '' : 's'}`}
              </span>
              <span className="text-muted"> on {formatDate(tip.day.date)}</span>
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted">
        <span>Less</span>
        {LEVEL_VAR.map((v) => (
          <span
            key={v}
            className="rounded-[2px] ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.04]"
            style={{ width: CELL, height: CELL, backgroundColor: `var(${v})` }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};
