import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data';
import { Tag } from './Section';

type Project = (typeof portfolioData.projects)[number];

/** Projects carry either a single `image` or an `images` array. */
const coverOf = (p: Project) =>
  ('image' in p && p.image) || ('images' in p && p.images?.[0]) || null;

const VISIBLE_TAGS = 3;

const ProjectCard = ({ project }: { project: Project }) => {
  const cover = coverOf(project);
  const href = 'demo' in project ? project.demo : undefined;
  const badge = 'badge' in project ? project.badge : undefined;
  const overflow = project.techStack.length - VISIBLE_TAGS;

  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-surface">
        {cover ? (
          <Image
            src={cover}
            alt={project.title}
            fill
            // Cards render ~300px wide (two-up in a 660px column). Asking for
            // 640px supersamples that: crisp on 1x and 2x alike, and still ~89%
            // smaller than the source PNG. These are dashboard screenshots, so
            // fine text has to stay legible.
            sizes="(max-width: 640px) 100vw, 640px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-2xl italic text-muted">
            {project.title.charAt(0)}
          </div>
        )}
        {badge && (
          <span className="absolute left-2 top-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-2.5 flex items-start justify-between gap-2">
        <h3 className="text-[13px] font-medium text-primary">{project.title}</h3>
        {href && (
          <ArrowUpRight
            size={13}
            className="mt-0.5 shrink-0 text-muted transition-colors group-hover:text-primary"
          />
        )}
      </div>

      <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-secondary">
        {project.oneLiner}
      </p>

      <div className="mt-2 flex flex-wrap gap-1">
        {project.techStack.slice(0, VISIBLE_TAGS).map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
        {overflow > 0 && <Tag>+{overflow}</Tag>}
      </div>
    </>
  );

  const shell =
    'peek-item group block rounded-xl border border-border bg-background p-2.5 hover:border-primary/25 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/40';

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={shell}>
      {body}
    </a>
  ) : (
    <div className={shell}>{body}</div>
  );
};

export const WorkGrid = () => (
  <div className="peek grid gap-3 sm:grid-cols-2">
    {portfolioData.projects.map((project) => (
      <ProjectCard key={project.title} project={project} />
    ))}
  </div>
);
