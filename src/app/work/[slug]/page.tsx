import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Award, Github } from 'lucide-react';
import { portfolioData } from '@/data';
import { TopBar } from '@/components/profile/TopBar';
import { ContactButton } from '@/components/profile/ContactButton';
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
  certificate?: string;
  placement?: string;
  caseStudy: {
    summary: string;
    sections: { heading: string; body: string[] }[];
    relatedRepos?: {
      heading: string;
      intro: string;
      items: { name: string; url: string; blurb: string }[];
    };
  };
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
        repo: 'repo' in p ? (p.repo as string) : undefined,
        certificate: 'certificate' in p ? (p.certificate as string) : undefined,
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
    title: `${project.title}: case study`,
    description: project.caseStudy.summary,
    openGraph: { title: `${project.title}: case study`, description: project.caseStudy.summary },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = studies.find((p) => p.slug === slug);
  if (!project) notFound();

  const { cover, demo, repo, certificate, placement } = project;

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

            {(demo || repo || certificate) && (
              <div className="mt-5 flex flex-wrap gap-2">
                {demo && (
                  <a
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-lift group inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-[16px] font-medium text-primary hover:border-primary/30 hover:bg-surface"
                  >
                    Visit the live site
                    <ArrowUpRight size={16} className="hover-arrow text-muted" />
                  </a>
                )}
                {repo && (
                  <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-lift group inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-[16px] font-medium text-primary hover:border-primary/30 hover:bg-surface"
                  >
                    <Github size={16} className="text-secondary" />
                    Read the source
                    <ArrowUpRight size={16} className="hover-arrow text-muted" />
                  </a>
                )}
                {certificate && (
                  <a
                    href={certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-lift group inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-[16px] font-medium text-primary hover:border-primary/30 hover:bg-surface"
                  >
                    <Award size={16} className="text-secondary" />
                    View the certificate
                    <ArrowUpRight size={16} className="hover-arrow text-muted" />
                  </a>
                )}
              </div>
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

          {project.caseStudy.relatedRepos && (
            <section className="mt-12">
              <h2 className="font-display text-[22px] font-semibold tracking-tight text-primary">
                {project.caseStudy.relatedRepos.heading}
              </h2>
              <p className="mt-3 text-[17px] leading-[1.8] text-secondary">
                {project.caseStudy.relatedRepos.intro}
              </p>
              <div className="peek peek-rows mt-5 rounded-xl border border-border bg-background px-1.5">
                {project.caseStudy.relatedRepos.items.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="peek-item group flex items-start gap-3 rounded-lg border-b border-border px-3 py-4 last:border-b-0 hover:bg-surface"
                  >
                    <Github size={17} className="mt-1 shrink-0 text-muted group-hover:text-primary" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[15px] font-medium text-primary">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-[16px] leading-relaxed text-secondary">
                        {item.blurb}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="hover-arrow mt-1 shrink-0 text-muted group-hover:text-primary"
                    />
                  </a>
                ))}
              </div>
            </section>
          )}

          <div className="mt-14 border-t border-border pt-6">
            <ContactButton>Get in touch</ContactButton>
          </div>
        </article>
      </div>
    </main>
  );
}
