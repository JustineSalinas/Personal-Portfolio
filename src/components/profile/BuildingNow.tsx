import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data';
import { isSvg } from '@/lib/utils';

/**
 * Work in progress, as list rows in the same shape as the Projects list: logo
 * (or an initial) tile, name, role, and a two-line blurb. A written case
 * study outranks the live site as the row's link.
 */
export const BuildingNow = () => (
  <div className="divide-y divide-border">
    {portfolioData.building.map((item) => {
      const role = 'role' in item ? item.role : undefined;
      const logo = 'logo' in item ? item.logo : undefined;
      const study = 'slug' in item && 'caseStudy' in item ? `/work/${item.slug}` : undefined;

      return (
        <a
          key={item.name}
          href={study ?? item.demo}
          {...(study ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          className="group flex items-start gap-4 py-4 transition-opacity hover:opacity-80"
        >
          {logo ? (
            <Image
              src={logo}
              alt=""
              width={44}
              height={44}
              unoptimized={isSvg(logo)}
              className="h-11 w-11 shrink-0 rounded-lg border border-border bg-surface object-contain p-1.5"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-[15px] font-medium text-muted"
            >
              {item.name.charAt(0)}
            </span>
          )}

          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-[15.5px] font-medium leading-tight text-primary">
              <span className="truncate">{item.name}</span>
              {study && (
                <span className="flex h-[20px] shrink-0 items-center rounded-full border border-border-strong px-2 text-[11px] font-medium text-muted">
                  Case study
                </span>
              )}
            </p>
            {role && <p className="mt-1 text-[13px] text-muted">{role}</p>}
            <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-secondary">{item.blurb}</p>
          </div>

          <ArrowUpRight
            size={16}
            className="hover-arrow mt-1 shrink-0 text-muted group-hover:text-primary"
          />
        </a>
      );
    })}
  </div>
);
