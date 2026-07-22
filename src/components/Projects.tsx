'use client';

import React, { useState, useMemo, MouseEvent } from 'react';
import { portfolioData } from '@/data';
import { ArrowUpRight } from 'lucide-react';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';

// Bento Card Component with Mouse Cursor Spotlight Glow
const BentoCard = ({
  project,
  className,
}: {
  project: typeof portfolioData.projects[0];
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const isWide = className?.includes('md:col-span-2');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, y: 12 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative rounded-2xl border border-border/40 bg-surface/40 hover:bg-surface/60 transition-colors p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:border-accent/20 h-full',
        className
      )}
    >
      {/* Spotlight radial gradient overlay tracking cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              color-mix(in srgb, var(--accent), transparent 93%),
              transparent 80%
            )
          `,
        }}
      />

      {/* Content wrapper */}
      <div className={cn('relative z-10 flex flex-col h-full gap-5 w-full', isWide && 'md:flex-row md:items-center')}>
        {/* Project details */}
        <div className={cn('flex flex-col flex-1 justify-between h-full gap-4', isWide && 'md:max-w-[55%] md:pr-4')}>
          <div className="space-y-3.5">
            {/* Upper label and demo link */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-[9px] font-mono text-accent tracking-[0.25em] uppercase">
                {project.oneLiner}
              </span>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-background border border-border text-secondary hover:text-accent hover:border-accent/40 transition-colors cursor-pointer"
                  aria-label={`Open demo for ${project.title}`}
                >
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>

            {/* Title, Badge & Meta */}
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-display italic font-light text-primary flex items-center gap-2.5 flex-wrap">
                {project.title}
                {project.badge && (
                  <span className="px-2.5 py-0.5 text-[8px] tracking-wider uppercase font-bold bg-accent/12 border border-accent/20 text-accent rounded-full not-italic font-mono">
                    {project.badge}
                  </span>
                )}
              </h3>
              {((project as any).year || (project as any).role) && (
                <div className="flex items-center gap-2 font-mono text-[9px] text-secondary/60 tracking-wider uppercase">
                  {(project as any).role && <span>{(project as any).role}</span>}
                  {(project as any).year && (project as any).role && <span className="w-1 h-1 rounded-full bg-secondary/30" />}
                  {(project as any).year && <span>{(project as any).year}</span>}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-secondary text-xs md:text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/20">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-background border border-border/40 rounded-full text-[9px] font-mono text-secondary/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Mockup / Image visualization */}
        {((project as any).image || (project as any).images) && (
          <div
            className={cn(
              'relative w-full rounded-xl overflow-hidden border border-border/30 bg-black/5 dark:bg-white/[0.02] flex items-center justify-center p-2 group-hover:scale-[1.015] transition-all duration-500',
              isWide ? 'h-48 md:h-64 md:flex-1' : 'h-40 md:h-44'
            )}
          >
            {(project as any).images ? (
              <div className="flex h-full w-full gap-2">
                {(project as any).images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex-1 relative rounded-lg overflow-hidden bg-background/50 border border-border/20 p-1 flex items-center justify-center"
                  >
                    <img
                      src={img}
                      alt={`${project.title} view ${idx + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <img
                src={(project as any).image}
                alt={project.title}
                className="max-w-full max-h-full object-contain p-1"
              />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const { ref, isVisible } = useIsVisible();
  const [filter, setFilter] = useState('All');

  const filters = useMemo(() => {
    return ['All', 'Next.js', 'React.js', 'Python', 'TypeScript'];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return portfolioData.projects;
    return portfolioData.projects.filter((p) =>
      p.techStack.some((tech) => tech.includes(filter))
    );
  }, [filter]);

  const getCardSpan = (title: string) => {
    if (title === 'SplitRails' || title === 'Solmate') {
      return 'md:col-span-2';
    }
    return 'md:col-span-1';
  };

  return (
    <section id="projects" className="section-padding px-6" ref={ref}>
      <div
        className={cn(
          'max-w-7xl mx-auto space-y-12 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="section-label">03 — Featured Projects</span>
              <div className="editorial-rule w-20" />
            </div>
            <h2
              className="font-display italic font-light text-primary leading-tight"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
            >
              Work that speaks
              <span className="text-accent"> for itself.</span>
            </h2>
          </div>

          {/* Filtering Tags with Motion layoutId glide pill */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'relative px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-colors duration-200 z-10 cursor-pointer',
                    isActive ? 'text-background font-semibold' : 'text-secondary hover:text-primary'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-accent rounded-full shadow-sm shadow-accent/30 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-full border border-border bg-surface/60 -z-10" />
                  )}
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid with layout spring animation */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project) => (
              <BentoCard
                key={project.title}
                project={project}
                className={getCardSpan(project.title)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
