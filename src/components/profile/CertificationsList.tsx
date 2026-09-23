import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data';
import { isSvg } from '@/lib/utils';

// Same prominence order the old dedicated /certifications page used, so
// credentials read AI/cloud first and self-paced course work last.
const preferredOrder = [
  'AI & ML',
  'Cloud & AWS',
  'Hackathons',
  'Internship',
  'Community Leadership',
  'Microcredential',
  'Course Certificate',
  'Agile & Scrum',
  'Project Management',
  'IT Operations',
];

type Cert = (typeof portfolioData.certifications)[number];

// Each credential is grouped under its first-listed category only — a cert
// tagged ["AI & ML", "Cloud & AWS", "Microcredential"] would otherwise print
// three times on a page meant to show everything at a glance.
const groups: { name: string; items: Cert[] }[] = (() => {
  const byCategory = new Map<string, Cert[]>();
  portfolioData.certifications.forEach((cert) => {
    const primary = cert.categories?.[0] ?? 'Other';
    if (!byCategory.has(primary)) byCategory.set(primary, []);
    byCategory.get(primary)!.push(cert);
  });

  const ordered = preferredOrder.filter((c) => byCategory.has(c));
  const rest = [...byCategory.keys()].filter((c) => !preferredOrder.includes(c));

  return [...ordered, ...rest].map((name) => ({ name, items: byCategory.get(name)! }));
})();

export const CertificationsList = () => (
  <div className="space-y-6">
    {groups.map((group) => (
      <div key={group.name}>
        <h2 className="mb-2 text-[13.5px] font-medium uppercase tracking-wide text-muted">
          {group.name}
          <span className="ml-1.5 text-muted/70">{group.items.length}</span>
        </h2>
        <div className="rounded-xl border border-border bg-background px-3">
          {group.items.map((cert) => (
            <a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 border-b border-border py-3 last:border-b-0 transition-colors hover:bg-surface/50 -mx-3 px-3 rounded-lg"
            >
              <Image
                src={cert.logo || cert.image}
                alt={cert.issuer}
                width={40}
                height={40}
                unoptimized={isSvg(cert.logo || cert.image)}
                className="h-10 w-10 shrink-0 rounded-lg border border-border bg-surface object-contain p-1"
              />
              <div className="min-w-0 flex-1">
                <span className="block text-[16px] font-medium leading-snug text-primary">
                  {cert.title}
                </span>
                <span className="text-[14px] text-secondary">
                  {cert.issuer} · {cert.date}
                </span>
              </div>
              <span className="hover-arrow flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border text-muted group-hover:border-primary/25 group-hover:text-primary">
                <ArrowUpRight size={15} />
              </span>
            </a>
          ))}
        </div>
      </div>
    ))}
  </div>
);
