'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { portfolioData } from '@/data';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export const Projects = () => {
  const { ref, isVisible } = useIsVisible();
  const [filter, setFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filters = useMemo(() => {
    return ['All', 'Next.js', 'React.js', 'Python', 'TypeScript'];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return portfolioData.projects;
    return portfolioData.projects.filter((p) =>
      p.techStack.some((tech) => tech.includes(filter))
    );
  }, [filter]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) nextSlide();
    else if (info.offset.x > 50) prevSlide();
  };

  return (
    <section id="projects" className="section-padding px-6" ref={ref}>
      <div
        className={cn(
          'max-w-7xl mx-auto space-y-12 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        {/* Header */}
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

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all uppercase',
                  filter === f
                    ? 'bg-accent text-background shadow-sm shadow-accent/30'
                    : 'bg-surface border border-border text-secondary hover:text-primary hover:border-accent/40'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="relative group/slider" ref={containerRef}>
          {/* Left arrow */}
          <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-surface/80 backdrop-blur-md border border-border/60 text-secondary hover:text-accent hover:border-accent/40 transition-all shadow-xl group/btn"
              aria-label="Previous project"
            >
              <ChevronLeft size={22} className="group-hover/btn:-translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Right arrow */}
          <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20">
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-surface/80 backdrop-blur-md border border-border/60 text-secondary hover:text-accent hover:border-accent/40 transition-all shadow-xl group/btn"
              aria-label="Next project"
            >
              <ChevronRight size={22} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Slider */}
          <div className="overflow-x-hidden px-4">
            <div className="relative h-[600px] sm:h-[580px] md:h-[660px] flex items-center justify-center">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredProjects.map((project, index) => {
                  const isCenter = index === currentIndex;
                  const isLeft = index === (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
                  const isRight = index === (currentIndex + 1) % filteredProjects.length;

                  if (!isCenter && !isLeft && !isRight) return null;

                  return (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, scale: 0.82, x: isLeft ? -300 : 300, zIndex: 0 }}
                      animate={{
                        opacity: isCenter ? 1 : 0.35,
                        scale: isCenter ? 1 : 0.82,
                        x: isCenter ? 0 : isLeft ? -400 : 400,
                        zIndex: isCenter ? 10 : 5,
                      }}
                      exit={{ opacity: 0, scale: 0.82, x: isLeft ? -300 : 300 }}
                      transition={{ type: 'spring', stiffness: 290, damping: 28, opacity: { duration: 0.2 } }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={handleDragEnd}
                      className="absolute w-full max-w-2xl cursor-grab active:cursor-grabbing touch-pan-y"
                    >
                      <Tilt
                        tiltMaxAngleX={isCenter ? 2 : 0}
                        tiltMaxAngleY={isCenter ? 2 : 0}
                        perspective={1100}
                        transitionSpeed={1600}
                        scale={isCenter ? 1.01 : 1}
                        className="h-full"
                      >
                        <div
                          className={cn(
                            'h-full group bg-surface border rounded-2xl p-5 md:p-8 lg:p-10 transition-all duration-500 relative overflow-hidden flex flex-col shadow-2xl',
                            isCenter
                              ? 'border-accent/25 shadow-accent/8'
                              : 'border-border/40 opacity-50'
                          )}
                        >
                          {/* Amber glow — center only */}
                          {isCenter && (
                            <div className="absolute -top-20 -right-20 w-56 h-56 bg-accent/12 rounded-full blur-[70px] pointer-events-none" />
                          )}
                          {isCenter && (
                            <div className="absolute top-0 left-0 w-32 h-0.5 bg-gradient-to-r from-accent/60 to-transparent" />
                          )}

                          <div className="space-y-5 relative z-10 h-full flex flex-col">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-mono text-accent/80 uppercase tracking-[0.2em]">
                                  {project.oneLiner}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-display italic font-light text-primary group-hover:text-accent transition-colors flex items-center gap-3 flex-wrap">
                                  {project.title}
                                  {(project as any).badge && (
                                    <span className="px-2.5 py-0.5 text-[9px] tracking-wider uppercase font-bold bg-accent/12 border border-accent/25 text-accent rounded-full not-italic font-mono transition-all duration-300 hover:bg-accent/20 hover:border-accent/45 hover:scale-[1.03] cursor-default">
                                      {(project as any).badge}
                                    </span>
                                  )}
                                </h3>
                                {((project as any).year || (project as any).role) && (
                                  <div className="flex items-center gap-2 pt-0.5">
                                    {(project as any).role && (
                                      <span className="text-[10px] font-mono text-secondary/60 tracking-wide">
                                        {(project as any).role}
                                      </span>
                                    )}
                                    {(project as any).year && (project as any).role && (
                                      <span className="w-1 h-1 rounded-full bg-secondary/30" />
                                    )}
                                    {(project as any).year && (
                                      <span className="text-[10px] font-mono text-secondary/60 tracking-wide">
                                        {(project as any).year}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-3">
                                {project.demo && (
                                  <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-background/50 border border-border/50 text-secondary hover:text-accent hover:border-accent/40 transition-all"
                                  >
                                    <ExternalLink size={18} />
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Images */}
                            {((project as any).image || (project as any).images) && (
                              <div className="relative w-full rounded-xl overflow-hidden border border-border/30 bg-black/20 h-32 sm:h-40 md:h-[240px] flex-shrink-0 group/img">
                                {(project as any).images ? (
                                  <div className="flex h-full w-full gap-2 p-2">
                                    {(project as any).images.map((img: string, idx: number) => (
                                      <div
                                        key={idx}
                                        className="flex-1 relative rounded-lg overflow-hidden bg-background/50 border border-border/20"
                                      >
                                        <img
                                          src={img}
                                          alt={`${project.title} view ${idx + 1}`}
                                          className="w-full h-full object-contain p-1 transition-transform duration-700 group-hover/img:scale-105"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="w-full h-full p-2">
                                    <img
                                      src={(project as any).image}
                                      alt={project.title}
                                      className="w-full h-full object-contain rounded-lg transition-transform duration-700 group-hover/img:scale-105"
                                    />
                                  </div>
                                )}
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none rounded-xl" />
                              </div>
                            )}

                            <p className="text-secondary text-sm md:text-base leading-relaxed flex-grow">
                              {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-5 border-t border-border/40">
                              {project.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3.5 py-1.5 bg-background border border-border/50 rounded-full text-[10px] font-mono text-secondary/70 tracking-wide"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Tilt>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2.5 mt-8">
            {filteredProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  'h-1.5 transition-all duration-300 rounded-full',
                  i === currentIndex ? 'w-8 bg-accent' : 'w-1.5 bg-secondary/20 hover:bg-secondary/40'
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
