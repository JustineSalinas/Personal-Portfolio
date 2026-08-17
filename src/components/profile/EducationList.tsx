import React from 'react';
import Image from 'next/image';
import { portfolioData } from '@/data';
import { isSvg } from '@/lib/utils';

export const EducationList = () => (
  <div className="peek peek-rows rounded-xl border border-border bg-background px-1.5">
    {portfolioData.education.map((item) => {
      const achievements = 'achievements' in item ? item.achievements : undefined;

      return (
        <div
          key={`${item.institution}-${item.date}`}
          className="peek-item flex gap-2.5 rounded-lg border-b border-border px-2 py-3 last:border-b-0 hover:bg-surface"
        >
          <Image
            src={item.logo}
            alt={item.institution}
            width={43}
            height={43}
            unoptimized={isSvg(item.logo)}
            className="h-11 w-11 shrink-0 rounded-lg border border-border bg-surface object-contain p-0.5"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-[17px] font-medium text-primary">{item.institution}</p>
              <span className="text-[15px] text-muted">{item.date}</span>
            </div>
            <p className="mt-0.5 text-[16px] text-secondary">
              {'degree' in item && item.degree ? item.degree : item.level}
            </p>

            {achievements && achievements.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                {achievements.map((a) => (
                  <span
                    key={`${a.role}-${a.org}`}
                    className="rounded-md border border-border bg-surface px-1.5 py-0.5 text-[14px] text-secondary"
                  >
                    {a.role} · {a.org}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>
);
