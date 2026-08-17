'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { portfolioData } from '@/data';
import { cn } from '@/lib/utils';

/** "PharmaTrack — University of San Agustin, ..." → "PharmaTrack" */
const shortName = (company: string) => company.split('—')[0].trim();
/** Everything after the dash becomes the quiet second line. */
const qualifier = (company: string) => company.split('—').slice(1).join('—').trim();

const ExperienceRow = ({ item }: { item: (typeof portfolioData.experience)[number] }) => {
  const [open, setOpen] = useState(false);
  const name = shortName(item.company);
  const sub = qualifier(item.company);

  return (
    <div className="peek-item rounded-lg border-b border-border px-2 last:border-b-0 hover:bg-surface">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center gap-3 py-3 text-left"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface font-display text-[17px] font-semibold text-secondary">
          {name.charAt(0)}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[18px] font-medium leading-snug text-primary">{name}</span>
          <span className="block text-[16px] leading-snug text-secondary">{item.role}</span>
        </span>

        <span className="shrink-0 text-right text-[15px] text-muted">{item.date}</span>
        <ChevronDown
          size={18}
          className={cn(
            'shrink-0 text-muted transition-transform duration-200 group-hover:text-secondary',
            open && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-11 pr-1">
              {sub && <p className="mb-2 text-[15px] text-muted">{sub}</p>}
              <ul className="space-y-2">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-[16.5px] leading-relaxed text-secondary">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-[15px] text-muted">{item.location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ExperienceList = () => (
  <div className="peek peek-rows rounded-xl border border-border bg-background px-1.5">
    {portfolioData.experience.map((item) => (
      <ExperienceRow key={`${item.company}-${item.date}`} item={item} />
    ))}
  </div>
);
