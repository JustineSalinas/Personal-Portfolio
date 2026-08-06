'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Trophy, FileText, MapPin, Sparkles, X, Download, Briefcase, GraduationCap, Code, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface HackathonItem {
  id: string;
  badge: string;
  badgePill: string;
  placement: string;
  competition: string;
  date: string;
  location: string;
  projectName: string;
  tagline: string;
  shortConcept: string;
  fullConcept: string;
  solution: string;
  myRole: string;
  highlights: string[];
  techStack: string[];
  images: { src: string; caption: string }[];
  github?: string;
  demo?: string;
}

const HACKATHON_DATA: HackathonItem[] = [
  {
    id: 'nexus-solmate',
    badge: '1st Runner-Up',
    badgePill: 'bg-gradient-to-r from-[#1c1d22] via-[#2a2c33] to-[#1c1d22] text-slate-100 border border-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_6px_20px_rgba(0,0,0,0.9)] ring-1 ring-black/80',
    placement: '1st Runner-Up · 17 Teams National',
    competition: 'Nexus Philippines Hackathon 2026',
    date: 'May 21–23, 2026',
    location: 'Philippines',
    projectName: 'SOLMATE — E-Ferry Retrofit',
    tagline: 'Green Fintech & IoT Telemetry Platform for Maritime Electrification',
    shortConcept: 'Electrification & green fintech platform converting vessel IoT telemetry into bankable loan structures and green bonds.',
    fullConcept: 'E-Ferry Retrofit Service by SOLMATE — bridging maritime vessel conversion with institutional capital.',
    solution: 'Green Fintech Platform unlocking institutional ESG capital for maritime vessel electrification. Converts tamper-proof IoT telemetry into bankable loan structures, tokenized green bonds, and automated carbon credit monetization.',
    myRole: 'Developed the web-based financial and telemetry dashboard that bridges the gap between hardware conversion and capital.',
    highlights: [
      'Green Fintech Platform unlocking institutional ESG capital for vessel electrification',
      'Converts tamper-proof IoT telemetry into bankable loan structures',
      'Tokenized green bonds & automated carbon credit monetization'
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Recharts', 'MapLibre GL', 'IoT Telemetry', 'Fintech Analytics'],
    images: [
      { src: '/projects/solmate-team.png', caption: 'Solmate Hackathon Team Photo' },
      { src: '/projects/solmate-award.png', caption: '1st Runner-Up Award Presentation' },
    ],
    demo: 'https://e-ferry.vercel.app',
  },
  {
    id: 'ai-fest-iloilo',
    badge: '2nd Place',
    badgePill: 'bg-gradient-to-r from-[#2b1704] via-[#45280a] to-[#2b1704] text-amber-200 border border-amber-400/50 shadow-[inset_0_1px_1px_rgba(254,240,138,0.35),0_6px_20px_rgba(0,0,0,0.9)] ring-1 ring-black/80',
    placement: '2nd Place · National AI Hackathon 2026',
    competition: 'National AI Hackathon 2026 (Blue Economy Track)',
    date: '2026',
    location: 'Philippines',
    projectName: 'Marine-AI',
    tagline: 'Retrofittable IoT & AI Advisory System for Passenger Boats',
    shortConcept: 'Retrofittable IoT and AI advisory system for traditional diesel fiberglass passenger boats in the Philippines with live waypoint routes & throttle recommendations.',
    fullConcept: 'Marine-AI — A retrofittable IoT and AI advisory system for traditional diesel passenger boats, featuring Speed Optimization, Route Optimization, and Predictive Maintenance.',
    solution: 'Three sensor systems feed three parallel AI modules — Speed Optimization (XGBoost/ONNX), Route Optimization (Gradient Boosted models), and Predictive Maintenance (PCA Autoencoder) — which converge on a single bridge display showing live route tracks, optimal throttle settings, and an auditable CO₂ emissions layer.',
    myRole: 'Developed the AI advisory bridge display, live sensor stream ingestion, and real-time multi-module optimization API.',
    highlights: [
      'Three sensor systems feeding three parallel AI modules (Speed, Route, Maintenance)',
      'Deterministic safety rule table enforcing AI prediction-decision boundaries',
      'Auditable emissions layer generating monthly CO₂-avoided reports'
    ],
    techStack: ['Python', 'ONNX', 'XGBoost', 'NumPy', 'Next.js', 'TypeScript', 'FastAPI', 'IoT'],
    images: [
      { src: '/projects/national-award.jpg', caption: '2nd Place Award Presentation at National AI Hackathon' },
      { src: '/projects/national-team.png', caption: 'Team SOLMATE Workspace' },
    ],
    demo: 'https://solmate-marine-ai.vercel.app',
  },
  {
    id: 'stellar-apac',
    badge: 'Regional Participant',
    badgePill: 'bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-zinc-100 border border-zinc-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_6px_20px_rgba(0,0,0,0.9)] ring-1 ring-black/80',
    placement: 'Participant · APAC Regional',
    competition: 'Stellar APAC Regional Hackathon',
    date: 'July 2026',
    location: 'APAC / Remote',
    projectName: 'SplitRails (Stellar Escrows)',
    tagline: 'Collaborative Expense-Splitting & Smart Escrows on Stellar Network',
    shortConcept: 'On-chain expense-splitting and invoice management platform with Soroban smart-contract escrows and GL exports.',
    fullConcept: 'Collaborative expense-splitting and invoice management platform integrated with smart-contract escrows.',
    solution: 'Built on the Stellar testnet using USDC and Soroban smart contracts. Features transparent on-chain verification, general ledger (GL) export system for accounting tools, real-time activity tracking, and multi-step escrow split creator.',
    myRole: 'Architected and developed the whole backend, complete UI, Stellar Freighter wallet integration, and smart Soroban contracts.',
    highlights: [
      'Architected and developed the entire backend infrastructure and full user interface',
      'Stellar Freighter wallet integration operating on Stellar testnet with USDC',
      'Smart Soroban contract escrow engine with general ledger (GL) export capabilities'
    ],
    techStack: ['Next.js', 'TypeScript', 'Stellar SDK', 'Soroban Smart Contracts', 'Freighter Wallet', 'Recharts'],
    images: [
      { src: '/projects/stellar-team.jpg', caption: 'Stellar APAC Scoping & Architecture' },
    ],
    github: 'https://github.com/JustineSalinas/SplitRails',
    demo: 'https://split-rails.vercel.app',
  },
];

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
  const [selectedHackathon, setSelectedHackathon] = useState<HackathonItem | null>(null);

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

            {/* Professional Clean Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary leading-tight"
            >
              Building systems that <span className="text-accent font-semibold">matter.</span>
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
        <div id="hackathons" className="pt-24 mt-20 border-t border-border/40 w-full space-y-10 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="section-label">02.5 — Hackathons &amp; Competition Engineering</span>
                <div className="editorial-rule w-16" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
                National &amp; Regional Achievements
              </h3>
            </div>
            <span className="text-xs font-mono text-accent/80 bg-accent/5 border border-accent/20 px-3 py-1.5 rounded-full">
              Click any card for full concept &amp; architectural deep dive →
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 pt-6">
            {HACKATHON_DATA.map((hackathon, idx) => (
              <motion.div
                key={hackathon.id}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
                onClick={() => setSelectedHackathon(hackathon)}
                className="group bg-surface hover:bg-surface/90 border border-border hover:border-accent/40 rounded-2xl p-6 pt-7 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-accent/5 cursor-pointer relative space-y-6"
              >
                {/* Centered Metallic Badge Straddling Card Top Border */}
                <div className={cn("absolute -top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono border shadow-2xl font-extrabold tracking-wider uppercase whitespace-nowrap", hackathon.badgePill)}>
                  <Trophy size={13} className="shrink-0 text-current" />
                  <span>{hackathon.badge}</span>
                </div>

                {/* Top Media Header */}
                <div className="relative rounded-xl overflow-hidden bg-background border border-border/60 h-48 md:h-52 flex items-center justify-center group/img">
                  <img
                    src={hackathon.images[0].src}
                    alt={hackathon.images[0].caption}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 transition-opacity" />

                  {/* Date tag at top right - Solid Opacity */}
                  <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md text-[9px] font-mono bg-background text-primary font-bold border border-border shadow-xl">
                    {hackathon.date}
                  </div>

                  {/* Title overlay at bottom of image */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 space-y-0.5 text-center">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest block font-bold">
                      {hackathon.placement}
                    </span>
                    <h4 className="text-lg font-bold text-primary tracking-tight leading-snug drop-shadow-lg">
                      {hackathon.projectName}
                    </h4>
                  </div>
                </div>

                {/* Card Body & Summary */}
                <div className="space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono text-secondary/80 uppercase tracking-wider">
                      {hackathon.competition}
                    </p>
                    <p className="text-xs text-secondary leading-relaxed font-light line-clamp-3">
                      {hackathon.shortConcept}
                    </p>
                  </div>

                  {/* Highlighted Role Tag - Solid Background */}
                  <div className="p-3.5 rounded-xl bg-surface border border-accent/25 space-y-1 shadow-sm">
                    <span className="text-[9.5px] font-mono text-accent uppercase font-bold tracking-wider block">TECHNICAL ROLE &amp; SCOPE:</span>
                    <p className="text-xs text-primary font-medium leading-snug">
                      {hackathon.myRole}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hackathon.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-surface/80 border border-border/40 rounded-lg text-[9.5px] font-mono text-secondary/80 uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                    {hackathon.techStack.length > 4 && (
                      <span className="px-2 py-1 text-[9.5px] font-mono text-secondary/50">
                        +{hackathon.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer / Actions */}
                <div className="pt-4 border-t border-border/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {hackathon.github && (
                      <a
                        href={hackathon.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 bg-surface hover:bg-accent/20 border border-border/60 hover:border-accent/40 rounded-xl text-secondary hover:text-accent transition-colors text-xs flex items-center gap-1.5 font-mono"
                      >
                        <Github size={13} />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>

                  <span className="text-xs font-mono text-accent font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Full Details →
                  </span>
                </div>
              </motion.div>
            ))}
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
      {/* Interactive Hackathon Detail Modal Overlay */}
      <AnimatePresence>
        {selectedHackathon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-background/85 backdrop-blur-md"
            onClick={() => setSelectedHackathon(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border border-border/80 rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start border-b border-border/30 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-accent/10 text-accent border border-accent/20 font-bold">
                      <Trophy size={13} />
                      {selectedHackathon.badge}
                    </span>
                    <span className="text-xs font-mono text-secondary/70">
                      {selectedHackathon.competition} • {selectedHackathon.date}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
                    {selectedHackathon.projectName}
                  </h3>
                  <p className="text-xs md:text-sm font-mono text-accent/90">
                    {selectedHackathon.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedHackathon(null)}
                  className="p-2.5 rounded-xl bg-surface/80 hover:bg-surface text-secondary hover:text-primary transition-colors border border-border/60"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Detailed Content Grid */}
              <div className="space-y-6">
                {/* Concept & Solution */}
                <div className="bg-surface/50 border border-border/50 rounded-2xl p-6 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono uppercase text-accent font-bold tracking-wider">Concept &amp; Product Vision</h4>
                    <p className="text-base text-primary font-semibold">{selectedHackathon.fullConcept}</p>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-border/30">
                    <h4 className="text-xs font-mono uppercase text-accent font-bold tracking-wider">The Solution &amp; Engineering Scope</h4>
                    <p className="text-xs md:text-sm text-secondary leading-relaxed font-light">{selectedHackathon.solution}</p>
                  </div>
                </div>

                {/* Key Technical Highlights */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-accent font-bold tracking-wider">Core System Highlights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedHackathon.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="p-4 bg-surface/60 border border-border/40 rounded-xl space-y-1 flex flex-col justify-between">
                        <span className="text-[10px] font-mono text-accent font-bold">0{hIdx + 1}.</span>
                        <p className="text-xs text-primary font-medium leading-snug">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Role Breakdown */}
                <div className="p-6 bg-accent/5 border border-accent/20 rounded-2xl space-y-2">
                  <h4 className="text-xs font-mono uppercase text-accent font-bold tracking-wider">My Individual Contribution &amp; Implementation</h4>
                  <p className="text-sm md:text-base text-primary font-medium leading-relaxed">{selectedHackathon.myRole}</p>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-secondary/70 tracking-wider">Technologies &amp; Protocols</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedHackathon.techStack.map((tech) => (
                      <span key={tech} className="px-3.5 py-1.5 bg-surface border border-border/60 rounded-xl text-xs font-mono text-secondary">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Media gallery */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-secondary/70 tracking-wider">Hackathon Documentation &amp; Team Gallery</h4>
                  <div className={cn("grid gap-4", selectedHackathon.images.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
                    {selectedHackathon.images.map((img, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden border border-border/50 bg-surface/50 p-2.5 flex flex-col items-center">
                        <img src={img.src} alt={img.caption} className="max-h-72 object-contain rounded-xl" />
                        <span className="text-[11px] font-mono text-secondary/80 mt-2.5 font-medium">{img.caption}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-6 border-t border-border/30 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-3">
                    {selectedHackathon.github && (
                      <a
                        href={selectedHackathon.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-surface hover:bg-surface/80 border border-border text-primary font-mono text-xs rounded-xl font-semibold transition-colors"
                      >
                        <Github size={16} />
                        <span>GitHub Repository</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                    {selectedHackathon.demo && (
                      <a
                        href={selectedHackathon.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-background font-mono text-xs font-bold rounded-xl transition-colors shadow-lg shadow-accent/20"
                      >
                        <span>Live Project Demo</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedHackathon(null)}
                    className="px-5 py-2.5 text-xs font-mono text-secondary hover:text-primary transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
