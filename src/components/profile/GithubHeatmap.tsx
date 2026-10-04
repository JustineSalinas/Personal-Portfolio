'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

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

const LEVEL_VAR = ['--gh-0', '--gh-1', '--gh-2', '--gh-3', '--gh-4'];

const GAP = 3;

const toWeeks = (days: Day[]): (Day | null)[][] => {
  if (days.length === 0) return [];
  const weeks: (Day | null)[][] = [];
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
  above: boolean;
}

const TIP_CLEARANCE = 30;

/**
 * GitHub section modeled on marwieang.com: no bordered card, no
 * month labels, no weekday gutter, no "Less/More" legend. Just the
 * section label on the left, the contributions count linking to the
 * profile on the right, and a clean, airy grid underneath. The
 * tooltip on hover is the only interactive affordance.
 */
export const GithubHeatmap = () => {
  const [data, setData] = useState<Payload | null>(null);
  const [failed, setFailed] = useState(false);
  const [tip, setTip] = useState<Tip | null>(null);
  const tipRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = tipRef.current;
    const track = el?.offsetParent as HTMLElement | null;
    if (!el || !track || !tip) return;

    const half = el.offsetWidth / 2;
    const min = half;
    const max = Math.max(track.offsetWidth - half, min);
    el.style.left = `${Math.min(Math.max(tip.x, min), max)}px`;
  }, [tip]);

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

  const total = data?.total;

  return (
    <section id="github" className="pt-12">
      {/* Section header: label on the left, count + arrow on the right —
          his layout exactly. Falls back to just the username while the
          count is loading. */}
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="text-[14px] font-medium text-muted">GitHub</h2>
        <a
          href="https://github.com/JustineSalinas"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-[14px] font-medium text-muted transition-colors hover:text-primary"
        >
          {total !== undefined
            ? `${total.toLocaleString()} contributions in the last year`
            : '@JustineSalinas'}
          <ArrowUpRight size={13} strokeWidth={1.75} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      {failed ? (
        <p className="text-[15px] text-muted">
          GitHub activity is unavailable right now.
        </p>
      ) : !data ? (
        <div className="h-[115px] animate-pulse rounded-md bg-surface" />
      ) : (
        <div onMouseLeave={() => setTip(null)}>
          <div
            className="relative w-full"
            role="img"
            aria-label={`GitHub contribution graph: ${data.total.toLocaleString()} contributions in the last year, a ${data.currentStreak}-day current streak and a ${data.longestStreak}-day longest streak.`}
          >
            {/* Fluid grid: every week is an equal-width column, so the whole
                year always fits the column instead of overflowing it. Cells
                stay square via aspect-ratio. */}
            <div
              className="grid w-full grid-flow-col grid-rows-7"
              style={{
                gap: GAP,
                gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
              }}
            >
              {weeks.flatMap((week, wi) =>
                week.map((day, di) =>
                  day ? (
                    <span
                      key={day.date}
                      onMouseEnter={(e) => {
                        const cell = e.currentTarget;
                        setTip({
                          day,
                          x: cell.offsetLeft + cell.offsetWidth / 2,
                          y: cell.offsetTop,
                          above: cell.offsetTop >= TIP_CLEARANCE,
                        });
                      }}
                      className="aspect-square w-full rounded-[2px]"
                      style={{ backgroundColor: `var(${LEVEL_VAR[Math.min(day.level, 4)]})` }}
                    />
                  ) : (
                    <span key={`${wi}-${di}`} className="aspect-square w-full" />
                  )
                )
              )}
            </div>

            {tip && (
              <span
                ref={tipRef}
                role="tooltip"
                className={`pointer-events-none absolute z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-[13px] leading-tight text-primary shadow-md ${
                  tip.above ? '-translate-y-full' : ''
                }`}
                style={{ left: tip.x, top: tip.above ? tip.y - 6 : tip.y + 16 }}
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
      )}
    </section>
  );
};
