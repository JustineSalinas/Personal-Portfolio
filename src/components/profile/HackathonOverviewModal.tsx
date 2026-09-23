'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, Trophy, ExternalLink, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data';
import { Tag } from './Section';

type Project = (typeof portfolioData.projects)[number];

interface HackathonOverviewModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * A condensed overview (problem / solution / details / stack) for hackathon
 * entries that don't have a full written case study. Entries that do (e.g.
 * Marine-AI, the FlyRank capstone) still open this first — it's faster to
 * scan than the full page — and link out to the full case study from here.
 */
export const HackathonOverviewModal: React.FC<HackathonOverviewModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const badge = 'badge' in project ? project.badge : undefined;
  const placement = 'placement' in project ? project.placement : undefined;
  const problem = 'problem' in project ? (project.problem as string) : undefined;
  const solution = 'solution' in project ? (project.solution as string) : undefined;
  const demo = 'demo' in project ? project.demo : undefined;
  const hasCaseStudy = 'slug' in project && 'caseStudy' in project;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hackathon-overview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
    >
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative z-10 flex max-h-[88vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-border bg-surface/50 px-5 py-4">
          <div className="min-w-0">
            {badge && (
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-wide text-muted">
                <Trophy size={13} className="text-primary/70" />
                {badge}
              </span>
            )}
            <h2
              id="hackathon-overview-title"
              className="mt-1 font-display text-[22px] font-semibold tracking-tight text-primary"
            >
              {project.title}
            </h2>
            {placement && (
              <p className="mt-0.5 text-[15px] font-medium text-primary">{placement}</p>
            )}
          </div>
          <button
            onClick={onClose}
            title="Close"
            className="hover-lift flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-secondary hover:text-primary"
          >
            <X size={15} />
          </button>
        </div>

        <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-xl border border-border bg-surface/40 px-4 py-3 text-[14px]">
            <dt className="text-muted">Role</dt>
            <dd className="text-secondary">{project.role}</dd>
            <dt className="text-muted">Year</dt>
            <dd className="text-secondary">{project.year}</dd>
          </dl>

          {problem && (
            <div className="mt-5">
              <h3 className="text-[13px] font-medium uppercase tracking-wide text-muted">
                The problem
              </h3>
              <p className="mt-1.5 text-[16px] leading-relaxed text-secondary">{problem}</p>
            </div>
          )}

          {solution && (
            <div className="mt-5">
              <h3 className="text-[13px] font-medium uppercase tracking-wide text-muted">
                The solution
              </h3>
              <p className="mt-1.5 text-[16px] leading-relaxed text-secondary">{solution}</p>
            </div>
          )}

          <div className="mt-5">
            <h3 className="text-[13px] font-medium uppercase tracking-wide text-muted">
              Stack used
            </h3>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {hasCaseStudy && (
              <Link
                href={`/work/${(project as { slug: string }).slug}`}
                onClick={onClose}
                className="hover-lift group inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[14px] font-medium text-background"
              >
                Read full case study
                <ArrowUpRight size={15} />
              </Link>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift group inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[14px] font-medium text-primary hover:border-primary/30 hover:bg-surface"
              >
                Visit live site
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
