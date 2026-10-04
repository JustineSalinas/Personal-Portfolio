import React from 'react';
import Image from 'next/image';
import { portfolioData } from '@/data';
import { isSvg } from '@/lib/utils';

/** Logo tile; shows the org's initial as a placeholder until a logo file is set. */
const LogoTile = ({ logo, org }: { logo?: string; org: string }) =>
  logo ? (
    <Image
      src={logo}
      alt={`${org} logo`}
      width={44}
      height={44}
      unoptimized={isSvg(logo)}
      className="h-11 w-11 shrink-0 rounded-xl border border-border bg-surface object-cover"
    />
  ) : (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-dashed border-border-strong bg-surface text-[16px] font-medium text-muted-2"
    >
      {org.charAt(0)}
    </span>
  );

export const LeadershipList = () => (
  <div className="divide-y divide-border">
    {portfolioData.leadership.map((item) => (
      <div key={`${item.role}-${item.org}`} className="flex items-center gap-4 py-4">
        <LogoTile logo={item.logo} org={item.org} />
        <div className="min-w-0 flex-1">
          <p className="text-[15.5px] font-medium leading-tight text-primary">{item.org}</p>
          <p className="mt-1 text-[14px] text-muted">{item.role}</p>
        </div>
        <p className="hidden max-w-[200px] shrink-0 text-right text-[13px] leading-snug text-muted sm:block">
          {item.note}
        </p>
      </div>
    ))}
  </div>
);
