import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data';
import { TopBar } from '@/components/profile/TopBar';
import { CursorAura } from '@/components/profile/CursorAura';
import { Tag } from '@/components/profile/Section';

/**
 * Case studies come from two lists — shipped `projects` and active `building`
 * work — because a written study belongs to the work, not to whichever section
 * happens to display it. Both are normalised to one shape here.
 */
interface Study {
  slug: string;
  title: string;
  year: string;
  role: string;
  tech: string[];
  cover: string | null;
  demo?: string;
  repo?: string;
  placement?: string;
  caseStudy: { summary: string; sections: { heading: string; body: string[] }[] };
}

const fromProjects: Study[] = portfolioData.projects.flatMap((p) =>
  'caseStudy' in p && p.caseStudy && 'slug' in p
    ? [{
        slug: p.slug as string,
        title: p.title,
        year: p.year,
        role: p.role,
        tech: p.techStack,
        cover: ('image' in p && p.image) || ('images' in p && p.images?.[0]) || null,
        demo: 'demo' in p ? p.demo : undefined,
        placement: 'placement' in p ? p.placement : undefined,
        caseStudy: p.caseStudy,
      }]
    : []
);

const fromBuilding: Study[] = portfolioData.building.flatMap((b) =>
  'caseStudy' in b && b.caseStudy && 'slug' in b
    ? [{
        slug: b.slug as string,
        title: b.name,
        year: 'year' in b ? (b.year as string) : '',
        role: 'role' in b ? (b.role as string) : '',
        tech: 'capabilities' in b ? (b.capabilities as string[]) : [],
        cover: null,
        demo: b.demo,
        repo: b.repo,
        caseStudy: b.caseStudy,
      }]
    : []
);

const studies: Study[] = [...fromProjects, ...fromBuilding];

export function generateStaticParams() {
  return studies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = studies.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — case study`,
    description: project.caseStudy.summary,
    openGraph: { title: `${project.title} — case study`, description: project.caseStudy.summary },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = studies.find((p) => p.slug === slug);
  if (!project) notFound();

  const { cover, demo, placement } = project;

  return (
    <main className="relative min-h-screen rail-hatch">
      <CursorAura />
      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[880px] border-x border-border bg-background">
        <TopBar />

        <article className="px-7 py-10">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-1.5 text-[16px] font-medium text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-0.5" />
            Back to work
          </Link>

          <header className="mt-6">
            <p className="text-[15px] text-muted">
              Case study{project.year && ` · ${project.year}`}{project.role && ` · ${project.role}`}
            </p>
            <h1 className="mt-2 font-display text-[35px] font-semibold leading-tight tracking-tight text-primary">
              {project.title}
            </h1>
            <p className="mt-3 text-[18px] leading-[1.75] text-secondary">
              {project.caseStudy.summary}
            </p>

            {placement && (
              <p className="mt-3 text-[16px] font-medium text-primary">{placement}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>

            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift group mt-5 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-[16px] font-medium text-primary hover:border-primary/30 hover:bg-surface"
              >
                Visit the live site
                <ArrowUpRight size={16} className="hover-arrow text-muted" />
              </a>
            )}
          </header>

          {cover && (
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface">
              <Image
                src={cover}
                alt={project.title}
                fill
                sizes="880px"
                priority
                className="object-cover object-top"
              />
            </div>
          )}

          <div className="mt-10 space-y-9">
            {project.caseStudy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-[22px] font-semibold tracking-tight text-primary">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((para, i) => (
                    <p key={i} className="text-[17px] leading-[1.8] text-secondary">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 border-t border-border pt-6">
            <Link
              href="/#contact"
              className="cta-solid hover-lift group relative inline-flex overflow-hidden rounded-lg bg-accent px-4 py-2.5 text-[16px] font-medium text-background"
            >
              <span className="relative z-10">Get in touch</span>
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
