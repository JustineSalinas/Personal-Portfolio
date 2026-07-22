'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Trophy, FileText, MapPin, Sparkles, X, Download, Briefcase, GraduationCap, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  }),
};

export const About = () => {
  const { ref, isVisible } = useIsVisible();
  const { personal } = portfolioData;
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <section id="about" className="section-padding px-6" ref={ref}>
      <div
        className={cn(
          'max-w-7xl mx-auto transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">02 — Background</span>
          <div className="editorial-rule flex-1 max-w-xs" />
        </div>

        {/* Top split row: Bio and Quick Facts */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Bio column */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full"
            >
              <Sparkles size={13} className="text-accent" />
              <span className="text-[11px] font-mono text-accent uppercase tracking-wider font-semibold">
                Full-Stack &amp; Systems Engineering
              </span>
            </motion.div>

            {/* Big editorial heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display italic font-light text-primary leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
            >
              Building things that{' '}
              <span className="text-accent not-italic">matter.</span>
            </motion.h2>

            <div className="space-y-5 pt-2">
              {personal.longBio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-base md:text-lg text-secondary leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>



            {/* Collaboration CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.01, translateY: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="block bg-surface/40 border border-border/60 rounded-xl p-6 flex justify-between items-center group hover:border-accent/50 transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-primary text-base">Open to collaborations.</h4>
                <p className="text-sm text-secondary">Let&apos;s build something meaningful together.</p>
              </div>
              <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-background transition-all duration-300 flex-shrink-0">
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.a>
          </div>

          {/* Quick Facts column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-surface/60 border border-border/60 backdrop-blur-xl rounded-2xl p-8 space-y-7 relative overflow-hidden shadow-lg shadow-black/10 group hover:border-accent/30 transition-all duration-500"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-32 h-0.5 bg-gradient-to-l from-accent to-transparent" />
              <div className="absolute top-0 right-0 w-0.5 h-32 bg-gradient-to-b from-accent to-transparent" />
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Sparkles size={14} className="text-accent" />
                  <span className="section-label text-accent font-semibold tracking-[0.2em]">QUICK FACTS</span>
                </div>
                <span className="text-[10px] font-mono text-secondary/60 flex items-center gap-1">
                  <MapPin size={11} className="text-accent" />
                  Iloilo City, PH
                </span>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'CURRENT STATUS', value: personal.quickFacts.status },
                  { label: 'PRIMARY FOCUS', value: personal.quickFacts.focus },
                  { label: 'LOOKING FOR', value: personal.quickFacts.lookingFor },
                  { label: 'AVAILABILITY', value: personal.quickFacts.available, isAvailable: true },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * idx + 0.2 }}
                    className="space-y-1 pb-4 border-b border-border/30 last:border-0 last:pb-0"
                  >
                    <span className="text-[9px] font-mono text-secondary/60 tracking-widest uppercase block">{item.label}</span>
                    {item.isAvailable ? (
                      <div className="flex items-center gap-2.5 pt-0.5">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        <p className="text-sm md:text-base text-primary font-medium">{item.value}</p>
                      </div>
                    ) : (
                      <p className="text-sm md:text-base text-primary font-medium leading-snug">{item.value}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Core Tech Stack Pills */}
              <div className="pt-1">
                <span className="text-[9px] font-mono text-accent/70 tracking-widest uppercase block mb-2">PRIMARY TECH STACK</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Tailwind'].map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-surface/80 border border-border/50 rounded-lg text-[10px] font-mono text-secondary uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Quick View Resume & PDF Download */}
              <div className="pt-2 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="inline-flex justify-center items-center gap-2 px-4 py-3 bg-surface hover:bg-surface/80 border border-border/80 text-primary rounded-xl font-mono text-[11px] tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <FileText size={14} className="text-accent" />
                  Quick View
                </button>
                <a
                  href={personal.contact.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Adrian_Salinas_Resume.pdf"
                  className="inline-flex justify-center items-center gap-2 px-4 py-3 bg-accent hover:bg-accent-hover text-background rounded-xl font-mono text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm shadow-accent/20 cursor-pointer"
                >
                  <Download size={14} />
                  Download PDF
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hackathon Achievements */}
        <div className="pt-16 mt-16 border-t border-border/40 w-full">
          <div className="flex items-center gap-4 mb-8">
            <span className="section-label">02.5 — Hackathons</span>
            <div className="editorial-rule flex-1 max-w-xs" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Nexus Hackathon */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
              className="group border border-border/60 rounded-xl p-5 flex flex-col bg-accent/[0.03] hover:bg-accent/[0.06] hover:border-accent/40 transition-colors duration-300 hover:shadow-lg hover:shadow-accent/[0.02] gap-0 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300">
                  <Trophy size={16} className="group-hover:scale-110 group-hover:rotate-[10deg] transition-transform duration-300" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base mb-0.5">1st Runner Up</h4>
                  <p className="text-xs text-secondary leading-snug">Hacking the Future of Energy — Nexus Philippines</p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs text-secondary/50 font-mono">
                    <span className="italic">Ready, Spark, Charge 2026</span>
                    <span>•</span>
                    <span className="tracking-wider">May 21–23, 2026</span>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 pt-3.5 border-t border-border/20 grid grid-cols-2 gap-2 w-full flex-grow">
                <div className="group/img relative rounded-lg overflow-hidden border border-border/40 bg-surface/50 h-48 md:h-56 flex items-center justify-center p-1.5 hover:border-accent/20 transition-all duration-300">
                  <img
                    src="/projects/solmate-team.png"
                    alt="Nexus Hackathon Team"
                    className="max-w-full max-h-full object-contain rounded transition-transform duration-500 group-hover/img:scale-[1.03]"
                  />
                  <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[7px] font-mono text-secondary uppercase tracking-wider">
                    Team Photo
                  </div>
                </div>
                <div className="group/img relative rounded-lg overflow-hidden border border-border/40 bg-surface/50 h-48 md:h-56 flex items-center justify-center p-1.5 hover:border-accent/20 transition-all duration-300">
                  <img
                    src="/projects/solmate-award.png"
                    alt="1st Runner Up Award Presentation"
                    className="max-w-full max-h-full object-contain rounded transition-transform duration-500 group-hover/img:scale-[1.03]"
                  />
                  <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[7px] font-mono text-secondary uppercase tracking-wider">
                    Award Presentation
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: National AI Hackathon */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
              className="group border border-border/60 rounded-xl p-5 flex flex-col bg-accent/[0.03] hover:bg-accent/[0.06] hover:border-accent/40 transition-colors duration-300 hover:shadow-lg hover:shadow-accent/[0.02] gap-0 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300">
                  <Trophy size={16} className="group-hover:scale-110 group-hover:rotate-[10deg] transition-transform duration-300" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base mb-0.5">Currently Top 5 Finalists</h4>
                  <p className="text-xs text-secondary leading-snug">National AI Hackathon — @ ICC Iloilo City</p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs text-secondary/50 font-mono">
                    <span className="italic">Building an AI Future</span>
                    <span>•</span>
                    <span className="tracking-wider">Aug 3–5, 2026</span>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 pt-3.5 border-t border-border/20 w-full flex-grow">
                <div className="group/img relative rounded-lg overflow-hidden border border-border/40 bg-surface/50 h-48 md:h-56 flex items-center justify-center p-1.5 hover:border-accent/20 transition-all duration-300">
                  <img
                    src="/projects/national-team.png"
                    alt="National AI Hackathon Team"
                    className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover/img:scale-[1.03]"
                  />
                  <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[7px] font-mono text-secondary uppercase tracking-wider">
                    Workspace / Team
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Stellar APAC Hackathon */}
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
              className="group border border-border/60 rounded-xl p-5 flex flex-col bg-accent/[0.03] hover:bg-accent/[0.06] hover:border-accent/40 transition-colors duration-300 hover:shadow-lg hover:shadow-accent/[0.02] gap-0 md:col-span-2 lg:col-span-1 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300">
                  <Trophy size={16} className="group-hover:scale-110 group-hover:rotate-[10deg] transition-transform duration-300" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-base mb-0.5">Participant in Regional Hackathon</h4>
                  <p className="text-xs text-secondary leading-snug">Stellar APAC Hackathon</p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs text-secondary/50 font-mono">
                    <span className="tracking-wider">July 2026</span>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 pt-3.5 border-t border-border/20 w-full flex-grow">
                <div className="group/img relative rounded-lg overflow-hidden border border-border/40 bg-surface/50 h-48 md:h-56 flex items-center justify-center p-1.5 hover:border-accent/20 transition-all duration-300">
                  <img
                    src="/projects/stellar-team.jpg"
                    alt="Stellar APAC Hackathon Collaboration"
                    className="max-w-full max-h-full object-contain rounded transition-transform duration-500 group-hover/img:scale-[1.03]"
                  />
                  <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[7px] font-mono text-secondary uppercase tracking-wider">
                    Development &amp; Scoping
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interactive Quick View Resume Modal Overlay */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setShowResumeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-surface border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start border-b border-border/30 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-1">
                    RESUME SUMMARY
                  </span>
                  <h3 className="text-xl font-bold text-primary tracking-tight">{personal.name}</h3>
                  <p className="text-xs text-secondary font-mono">{personal.titles[0]} • {personal.location}</p>
                </div>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="p-2 rounded-lg text-secondary/60 hover:text-primary hover:bg-surface/80 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Summary Statement */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">Professional Summary</h4>
                <p className="text-xs md:text-sm text-secondary leading-relaxed">
                  Full-stack software developer and IT student leader specializing in modern web platforms, database design, and cloud architectures. Track record of shipping production-grade applications and leading engineering initiatives.
                </p>
              </div>

              {/* Core Competencies */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">Core Technical Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['React / Next.js', 'TypeScript', 'Node.js & Express', 'Python & Flask', 'PostgreSQL / SQL', 'TailwindCSS', 'Git & CI/CD', 'REST APIs', 'Agile / Scrum'].map((skill) => (
                    <span key={skill} className="px-2.5 py-1 bg-surface/80 border border-border/50 rounded-lg text-[10px] font-mono text-secondary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Platforms */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">Featured Systems &amp; Platforms</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-3 bg-surface/40 border border-border/30 rounded-xl space-y-0.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-primary">Solmate</span>
                      <span className="text-[9px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded">Award Winner</span>
                    </div>
                    <p className="text-[11px] text-secondary leading-snug">Solar Energy AI Smart Dispatch Platform (1st Runner Up @ Nexus PH)</p>
                  </div>

                  <div className="p-3 bg-surface/40 border border-border/30 rounded-xl space-y-0.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-primary">PharmaTrack</span>
                      <span className="text-[9px] font-mono text-secondary/70 bg-surface px-1.5 py-0.5 rounded">Production</span>
                    </div>
                    <p className="text-[11px] text-secondary leading-snug">Automated Inventory &amp; Pharmacy Management System (Python &amp; Next.js)</p>
                  </div>

                  <div className="p-3 bg-surface/40 border border-border/30 rounded-xl space-y-0.5 sm:col-span-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-primary">SplitRails</span>
                      <span className="text-[9px] font-mono text-secondary/70 bg-surface px-1.5 py-0.5 rounded">Platform</span>
                    </div>
                    <p className="text-[11px] text-secondary leading-snug">High-Performance Deployment Infrastructure &amp; API Gateway</p>
                  </div>
                </div>
              </div>

              {/* Key Education */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">Education &amp; Leadership</h4>
                <div className="p-3 bg-surface/40 border border-border/30 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-bold text-primary">University of San Agustin</span>
                      <p className="text-[11px] text-secondary">Bachelor of Science in Information Technology (BSIT 3rd Year)</p>
                    </div>
                    <span className="font-mono text-accent text-xs">2024 – Present</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-border/20 text-[10px] font-mono text-secondary/80">
                    <span>• CAS Head of Design</span>
                    <span>• ITSA Web Development Lead</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="px-4 py-2 text-xs font-mono text-secondary hover:text-primary transition-colors"
                >
                  Close Preview
                </button>
                <a
                  href={personal.contact.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Adrian_Salinas_Resume.pdf"
                  className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-background rounded-xl text-xs font-mono font-semibold flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Download size={14} /> Download Official PDF
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
