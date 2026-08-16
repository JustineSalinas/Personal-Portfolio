import React from 'react';
import { cn } from '@/lib/utils';

/**
 * A titled block in the reading column. The label is deliberately quiet — it
 * orients you without competing with the content underneath it.
 */
export const Section = ({
  id,
  label,
  intro,
  action,
  className,
  children,
}: {
  id?: string;
  label: string;
  intro?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className={cn('pt-12', className)}>
    <div className="flex items-baseline justify-between gap-4 mb-4">
      <h2 className="text-[13px] font-medium text-muted tracking-tight">{label}</h2>
      {action}
    </div>
    {intro && <p className="text-[13px] text-secondary leading-relaxed mb-5 -mt-1">{intro}</p>}
    {children}
  </section>
);

/** Small pill used for tech tags and overflow counters. */
export const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] leading-4 text-secondary whitespace-nowrap">
    {children}
  </span>
);

/** Bordered pill button/link — the site's one interactive shape. */
export const PillLink = ({
  href,
  children,
  external = true,
  className,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className={cn(
      'inline-flex items-center gap-1.5 rounded-lg border border-border bg-background',
      'px-2.5 py-1.5 text-[12px] font-medium text-primary',
      'transition-colors hover:bg-surface hover:border-primary/20',
      className
    )}
  >
    {children}
  </a>
);
