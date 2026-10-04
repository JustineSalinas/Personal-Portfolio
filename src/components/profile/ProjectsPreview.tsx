import React from 'react';
import Link from 'next/link';
import { portfolioData } from '@/data';
import { ProjectRow } from './WorkGrid';

type Project = (typeof portfolioData.projects)[number];
const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * One group header + a short preview list ending in "+ N more" when
 * there's overflow — the "Client projects / Personal projects" shape
 * on marwieang.com, split here along the honest distinction we
 * actually have in the data: projects with written case studies vs.
 * everything else.
 */
const Group = ({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: Project[];
}) => {
  if (items.length === 0) return null;
  const visible = items.slice(0, 3);
  const extra = items.length - visible.length;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="text-[14px] font-medium text-muted">{title}</h2>
        <span className="text-[13px] text-muted-2">{pad2(items.length)}</span>
      </div>
      <div className="mt-2 divide-y divide-border">
        {visible.map((p, idx) => (
          <div
            key={p.title}
            // The last visible row fades out like his, telegraphing "more below".
            className={idx === visible.length - 1 && extra > 0 ? 'opacity-60' : undefined}
          >
            <ProjectRow project={p} />
          </div>
        ))}
      </div>
      {extra > 0 && (
        <div className="mt-4 flex justify-center">
          <Link
            href={href}
            className="flex h-9 items-center rounded-full border border-border-strong bg-background px-4 text-[13.5px] font-medium text-primary transition-colors hover:bg-surface"
          >
            + {extra} more
          </Link>
        </div>
      )}
    </div>
  );
};

export const ProjectsPreview = () => {
  const caseStudies = portfolioData.projects.filter((p) => 'caseStudy' in p && p.caseStudy);
  const other = portfolioData.projects.filter((p) => !('caseStudy' in p && p.caseStudy));
  return (
    <div className="flex flex-col gap-10">
      <Group title="Case studies" href="/projects" items={caseStudies} />
      <Group title="Other projects" href="/projects" items={other} />
    </div>
  );
};
