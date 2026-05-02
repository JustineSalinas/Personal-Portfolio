'use client';

import React, { useState, useMemo } from 'react';
import { portfolioData } from '@/data';
import { Github, ExternalLink } from 'lucide-react';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export const Projects = () => {
  const { ref, isVisible } = useIsVisible();
  const [filter, setFilter] = useState('All');

  // Extract unique tech stacks for filters
  const filters = useMemo(() => {
    const allTechs = portfolioData.projects.flatMap(p => p.techStack);
    const uniqueTechs = Array.from(new Set(allTechs));
    // Limit filters to most common or just take a few
    return ['All', 'Next.js', 'React.js', 'Python', 'TypeScript'];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return portfolioData.projects;
    return portfolioData.projects.filter(p => 
      p.techStack.some(tech => tech.includes(filter))
    );
  }, [filter]);

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

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  index === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : "",
                  index === 3 || index === 4 ? "md:col-span-1 lg:col-span-1" : ""
                )}
              >
                <Tilt 
                  tiltMaxAngleX={2} 
                  tiltMaxAngleY={2} 
                  perspective={1000} 
                  transitionSpeed={1500} 
                  scale={1.01}
                  className="h-full"
                >
                  <div className="h-full group bg-surface border border-border/50 hover:border-border hover:shadow-lg rounded-2xl p-8 transition-all duration-300 relative overflow-hidden flex flex-col">
                    
                    <div className="space-y-4 relative z-10 h-full flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex gap-4">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                              <Github size={20} />
                            </a>
                          )}
                          {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                              <ExternalLink size={20} />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-primary text-sm font-semibold uppercase tracking-wider">
                        {project.oneLiner}
                      </p>

                      <p className="text-secondary leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-4 mt-auto">
                        {project.techStack.map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 bg-background border border-border rounded-full text-xs font-medium text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
