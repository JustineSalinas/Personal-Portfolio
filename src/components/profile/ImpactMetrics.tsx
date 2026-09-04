'use client';

import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/data';
import { SheenGroup } from './SheenGroup';
import { FolderGit2, Trophy, Award, Users, LucideIcon } from 'lucide-react';

const icons: LucideIcon[] = [FolderGit2, Trophy, Award, Users];

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const AnimatedNumber: React.FC<CounterProps> = ({ end, suffix = '', duration = 1400 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease-out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOutProgress * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export const ImpactMetrics = () => {
  const metrics = portfolioData.personal.metrics;
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="mt-8">
      <SheenGroup className="peek grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {metrics.map((metric, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div
              key={metric.label}
              className="peek-item peek-card group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface/40 p-3.5 transition-all hover:border-primary/30 hover:bg-surface/80"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-[26px] font-semibold tracking-tight text-primary">
                  <AnimatedNumber end={metric.value} suffix={metric.suffix} />
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/80 bg-background text-muted transition-colors group-hover:text-primary">
                  <Icon size={14} />
                </div>
              </div>

              <div className="mt-2.5">
                <h4 className="text-[13px] font-medium leading-tight text-primary">
                  {metric.label}
                </h4>
                <p className="mt-1 text-[11px] leading-snug text-muted line-clamp-2">
                  {metric.description}
                </p>
              </div>
            </div>
          );
        })}
      </SheenGroup>
    </div>
  );
};
