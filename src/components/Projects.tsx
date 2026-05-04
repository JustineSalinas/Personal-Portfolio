'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { portfolioData } from '@/data';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export const Projects = () => {
  const { ref, isVisible } = useIsVisible();
  const [filter, setFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract unique tech stacks for filters
  const filters = useMemo(() => {
    return ['All', 'Next.js', 'React.js', 'Python', 'TypeScript'];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return portfolioData.projects;
    return portfolioData.projects.filter(p => 
      p.techStack.some(tech => tech.includes(filter))
    );
  }, [filter]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  return (
    <section id="projects" className="section-padding px-6" ref={ref}>
      <div className={cn(
        "max-w-7xl mx-auto space-y-12 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase block mb-4">
              FEATURED PROJECTS
            </span>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                  filter === f 
                    ? "bg-accent text-background" 
                    : "bg-surface border border-border text-secondary hover:text-primary hover:border-accent/50"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="relative group/slider">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20 flex items-center justify-center">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-surface/80 backdrop-blur-md border border-border/50 text-secondary hover:text-accent hover:border-accent/50 transition-all shadow-xl group/btn"
              aria-label="Previous Project"
            >
              <ChevronLeft size={24} className="group-hover/btn:-translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20 flex items-center justify-center">
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-surface/80 backdrop-blur-md border border-border/50 text-secondary hover:text-accent hover:border-accent/50 transition-all shadow-xl group/btn"
              aria-label="Next Project"
            >
              <ChevronRight size={24} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Slider Container */}
          <div className="overflow-visible px-4">
            <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredProjects.map((project, index) => {
                  const isCenter = index === currentIndex;
                  const isLeft = index === (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
                  const isRight = index === (currentIndex + 1) % filteredProjects.length;

                  if (!isCenter && !isLeft && !isRight) return null;

                  return (
                    <motion.div
                      key={project.title}
                      initial={{ 
                        opacity: 0, 
                        scale: 0.8,
                        x: isLeft ? -300 : isRight ? 300 : 0,
                        zIndex: 0
                      }}
                      animate={{ 
                        opacity: isCenter ? 1 : 0.4, 
                        scale: isCenter ? 1 : 0.8,
                        x: isCenter ? 0 : isLeft ? -400 : 400,
                        zIndex: isCenter ? 10 : 5,
                        filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.8,
                        x: isLeft ? -300 : isRight ? 300 : 0,
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        opacity: { duration: 0.2 }
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={handleDragEnd}
                      className="absolute w-full max-w-2xl cursor-grab active:cursor-grabbing"
                    >
                      <Tilt 
                        tiltMaxAngleX={isCenter ? 2 : 0} 
                        tiltMaxAngleY={isCenter ? 2 : 0} 
                        perspective={1000} 
                        transitionSpeed={1500} 
                        scale={isCenter ? 1.02 : 1}
                        className="h-full"
                      >
                        <div className={cn(
                          "h-full group bg-surface border border-border/50 rounded-3xl p-8 md:p-12 transition-all duration-500 relative overflow-hidden flex flex-col shadow-2xl",
                          isCenter ? "border-accent/30 shadow-accent/5" : "opacity-50 grayscale-[0.5]"
                        )}>
                          {/* Background Glow */}
                          {isCenter && (
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
                          )}
                          
                          <div className="space-y-6 relative z-10 h-full flex flex-col">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">
                                  {project.oneLiner}
                                </span>
                                <h3 className="text-3xl md:text-4xl font-bold text-primary group-hover:text-accent transition-colors">
                                  {project.title}
                                </h3>
                              </div>
                              <div className="flex gap-4">
                                {project.github && (
                                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background/50 border border-border/50 text-secondary hover:text-primary transition-all">
                                    <Github size={22} />
                                  </a>
                                )}
                                {project.demo && (
                                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background/50 border border-border/50 text-secondary hover:text-primary transition-all">
                                    <ExternalLink size={22} />
                                  </a>
                                )}
                              </div>
                            </div>

                            <p className="text-secondary text-lg leading-relaxed flex-grow">
                              {project.description}
                            </p>

                            <div className="flex flex-wrap gap-3 pt-6 border-t border-border/50">
                              {project.techStack.map((tech) => (
                                <span 
                                  key={tech}
                                  className="px-4 py-1.5 bg-background border border-border/50 rounded-full text-xs font-semibold text-secondary/80"
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

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {filteredProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "h-2 transition-all duration-300 rounded-full",
                  i === currentIndex 
                    ? "w-8 bg-accent" 
                    : "w-2 bg-secondary/20 hover:bg-secondary/40"
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
