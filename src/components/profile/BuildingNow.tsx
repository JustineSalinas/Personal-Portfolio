import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
import { portfolioData } from '@/data';
import { SheenGroup } from './SheenGroup';
import { isSvg } from '@/lib/utils';

export const BuildingNow = () => (
  <SheenGroup className="peek grid gap-3 sm:grid-cols-2">
    {portfolioData.building.map((item) => {
      const role = 'role' in item ? item.role : undefined;
      const logo = 'logo' in item ? item.logo : undefined;
      const study = 'slug' in item && 'caseStudy' in item ? `/work/${item.slug}` : undefined;

      return (
        <div
          key={item.name}
          className="peek-item peek-card group relative flex gap-2.5 rounded-xl border border-border bg-background p-3 hover:border-primary/30 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/50"
        >
          {/* Real mark when we have one; initial tile is the fallback. */}
          {logo ? (
            <Image
              src={logo}
              alt={item.name}
              width={44}
              height={44}
              unoptimized={isSvg(logo)}
              className="h-11 w-11 shrink-0 rounded-lg border border-border bg-surface object-contain p-1.5"
            />
          ) : (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface font-display text-[17px] font-semibold text-secondary">
              {item.name.charAt(0)}
            </span>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              {/* Stretched link keeps the whole card clickable without nesting anchors */}
              {/* A written case study outranks the live site as the primary link. */}
              <a
                href={study ?? item.demo}
                {...(study ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className="text-[17px] font-medium text-primary before:absolute before:inset-0 before:content-['']"
              >
                {item.name}
                {study && (
                  <span className="ml-2 align-middle text-[13px] font-normal text-muted">
                    Case study
                  </span>
                )}
              </a>
              <ArrowUpRight
                size={17}
                className="hover-arrow mt-0.5 shrink-0 text-muted group-hover:text-primary"
              />
            </div>

            {role && <p className="mt-0.5 text-[14.5px] text-muted">{role}</p>}
            <p className="mt-1 text-[16px] leading-relaxed text-secondary">{item.blurb}</p>

            <a
              href={item.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.name} on GitHub`}
              className="relative z-10 mt-2 inline-flex items-center gap-1 text-[14.5px] text-muted transition-colors hover:text-primary"
            >
              <Github size={15} />
              Repo
            </a>
          </div>
        </div>
      );
    })}
  </SheenGroup>
);
