import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data';
import { isSvg } from '@/lib/utils';

/** The four most recent; the rest live on /certifications. */
const featured = portfolioData.certifications.slice(0, 4);

export const CredentialsList = () => (
  <div className="peek peek-rows rounded-xl border border-border bg-background px-1.5">
    {featured.map((cert) => (
      <a
        key={cert.title}
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        className="peek-item group flex items-center gap-2.5 rounded-lg border-b border-border px-2 py-3 last:border-b-0 hover:bg-surface"
      >
        <Image
          src={cert.logo || cert.image}
          alt={cert.issuer}
          width={32}
          height={32}
          unoptimized={isSvg(cert.logo || cert.image)}
          className="h-8 w-8 shrink-0 rounded-lg border border-border bg-surface object-contain p-1"
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-medium text-primary">{cert.title}</span>
          <span className="block text-[11.5px] text-secondary">
            {cert.issuer} · {cert.date}
          </span>
        </span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border text-muted transition-colors group-hover:text-primary group-hover:border-primary/20">
          <ArrowUpRight size={12} />
        </span>
      </a>
    ))}
  </div>
);
