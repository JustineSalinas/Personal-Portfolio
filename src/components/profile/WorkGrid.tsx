import React from 'react';
import Image from 'next/image';
import { portfolioData } from '@/data';

type Project = (typeof portfolioData.projects)[number];

const coverOf = (p: Project) =>
  ('image' in p && p.image) || ('images' in p && p.images?.[0]) || null;

/**
 * One project row — thumbnail + title (with inline tag) + one-liner,
 * with a right-aligned category/tech tag. Clicking opens the case
 * study if present, otherwise the live demo. No borders between rows:
 * the parent decides whether to add dividers.
 */
export const ProjectRow = ({ project }: { project: Project }) => {
  const cover = coverOf(project);
  const study = 'slug' in project && 'caseStudy' in project ? `/work/${project.slug}` : undefined;
  const href = study ?? ('demo' in project ? project.demo : undefined);
  const external = !study;
  const tag =
    ('badge' in project ? (project.badge as string | undefined) : undefined) ??
    project.techStack[0];

  const body = (
    <>
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
        {cover ? (
          <Image src={cover} alt="" fill sizes="44px" className="object-cover object-top" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[15px] font-medium text-muted">
            {project.title.charAt(0)}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-[15.5px] font-medium leading-tight text-primary">
          <span className="truncate">{project.title}</span>
          {study && (
            <span className="flex h-[20px] shrink-0 items-center rounded-full border border-border-strong px-2 text-[11px] font-medium text-muted">
              Case study
            </span>
          )}
        </p>
        <p className="mt-1 line-clamp-1 text-[14px] text-muted">{project.oneLiner}</p>
      </div>
      {tag && (
        <span className="hidden shrink-0 text-[13px] text-muted sm:block">{tag}</span>
      )}
    </>
  );

  const shell = 'group flex items-center gap-4 py-4 transition-opacity hover:opacity-80';

  return href ? (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={shell}
    >
      {body}
    </a>
  ) : (
    <div className={shell}>{body}</div>
  );
};

/** Full list used on the Projects page. */
export const WorkGrid = ({ limit }: { limit?: number } = {}) => {
  const projects = limit ? portfolioData.projects.slice(0, limit) : portfolioData.projects;
  return (
    <div className="divide-y divide-border">
      {projects.map((p) => (
        <ProjectRow key={p.title} project={p} />
      ))}
    </div>
  );
};
