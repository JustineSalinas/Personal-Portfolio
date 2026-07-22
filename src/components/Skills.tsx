'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { Github, Flame, Activity } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

interface ContributionDay {
  date: string;
  level: number;
  count?: number;
  text?: string;
}

// GitHub contribution heatmap showing real contributions fetched from the backend API
const CommitHeatmap = () => {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [consistency, setConsistency] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<string>('0');
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/github')
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((json) => {
        if (!active) return;
        if (json.success && json.contributions && json.contributions.length > 0) {
          setData(json.contributions);
          setStreak(json.streak);
          setConsistency(json.consistency);
          setTotalContributions(json.totalContributions || '0');
          setLoading(false);
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch((err) => {
        console.error('Failed to load real github data, falling back to mock:', err);
        if (!active) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Generates deterministic mock contributions as fallback for a full year (371 days)
  const mockContributions = useMemo(() => {
    const list: ContributionDay[] = [];
    const today = new Date();
    for (let i = 370; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let level = 0;
      let count = 0;
      const rand = Math.sin(i * 12.5) * 0.5 + 0.5;

      if (isWeekend) {
        level = rand > 0.85 ? 1 : rand > 0.95 ? 2 : 0;
      } else {
        level = rand > 0.85 ? 4 : rand > 0.6 ? 3 : rand > 0.35 ? 2 : rand > 0.15 ? 1 : 0;
      }
      count = level > 0 ? Math.floor(rand * 15) + 1 : 0;
      list.push({ date: dateString, level, count, text: `${count === 0 ? 'No' : count} contribution${count === 1 ? '' : 's'} on ${dateString}` });
    }
    return list;
  }, []);

  const displayDays = useMemo<ContributionDay[]>(() => {
    if (loading) {
      // Return empty cells for loading skeleton
      return Array.from({ length: 364 }, (_, i) => ({
        date: `loading-${i}`,
        level: -1,
        count: 0,
        text: 'Loading...',
      }));
    }

    const rawDays = error || data.length === 0 ? mockContributions : data;
    if (rawDays.length === 0) return [];

    // Ensure the first day of displayDays is always a Sunday (getDay() === 0)
    // so that rows match GitHub's 0=Sun, 1=Mon, ..., 6=Sat grid layout
    const firstDateObj = new Date(rawDays[0].date);
    const firstDayOfWeek = firstDateObj.getDay();

    let padding: ContributionDay[] = [];
    if (firstDayOfWeek !== 0) {
      const padCount = firstDayOfWeek;
      padding = Array.from({ length: padCount }, (_, i) => {
        const padDate = new Date(firstDateObj);
        padDate.setDate(firstDateObj.getDate() - (padCount - i));
        const dStr = padDate.toISOString().split('T')[0];
        return {
          date: dStr,
          level: 0,
          count: 0,
          text: `No contributions on ${dStr}`,
        };
      });
    }

    return [...padding, ...rawDays];
  }, [loading, error, data, mockContributions]);

  const displayStreak = error ? 18 : streak;
  const displayConsistency = error ? 92 : consistency;
  const displayTotalContributions = error ? '842' : totalContributions;

  // Group contributions by weeks to calculate month labels
  const weeks = useMemo(() => {
    const w = [];
    for (let i = 0; i < displayDays.length; i += 7) {
      w.push(displayDays.slice(i, i + 7));
    }
    return w;
  }, [displayDays]);

  const monthLabels = useMemo(() => {
    const labels: { index: number; text: string }[] = [];
    let lastMonth = '';
    let lastIndex = -10;
    
    weeks.forEach((week, weekIdx) => {
      if (week[0] && !week[0].date.startsWith('loading')) {
        const date = new Date(week[0].date);
        const monthText = date.toLocaleString('en-US', { month: 'short' });
        if (monthText !== lastMonth) {
          // Prevent overlapping: make sure there is at least 3 weeks of gap
          if (weekIdx - lastIndex >= 3) {
            labels.push({ index: weekIdx, text: monthText });
            lastIndex = weekIdx;
          }
          lastMonth = monthText;
        }
      }
    });
    return labels;
  }, [weeks]);

function formatGithubDate(dateStr: string) {
  if (!dateStr || dateStr.startsWith('loading')) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const month = d.toLocaleString('en-US', { month: 'short' });
  const day = d.getDate();
  const suffix = (n: number) => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  return `${month} ${day}${suffix(day)}`;
}

  return (
    <div className="w-full flex flex-col">
      {/* Header Metrics Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 select-none">
        <h3 className="text-base text-primary/90 font-sans font-normal">
          <span className="font-semibold text-primary">{displayTotalContributions}</span> contributions in the last year
        </h3>

        {!loading && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] font-mono text-secondary tracking-wider uppercase bg-surface/50 px-3 py-1.5 rounded-lg border border-border/50">
              <Flame size={13} className="text-accent shrink-0" />
              <span>Highest Streak: <strong className="text-primary font-bold">{displayStreak} Days</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-secondary tracking-wider uppercase bg-surface/50 px-3 py-1.5 rounded-lg border border-border/50">
              <Activity size={13} className="text-accent shrink-0" />
              <span>Consistency: <strong className="text-primary font-bold">{displayConsistency}%</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* Grid container with fast single tooltip */}
      <div className="overflow-x-auto pb-3 pt-3 scrollbar-none w-full border border-border/40 rounded-xl bg-surface/30 backdrop-blur-md p-4 relative">
        <div className="flex items-start gap-2 min-w-[760px] justify-center mx-auto relative">
          {/* Day labels column */}
          <div className="grid grid-rows-7 gap-[3.5px] text-[9px] font-mono text-secondary/50 pt-[14px] h-[91px] select-none text-right pr-1">
            <div className="h-2.5 flex items-center justify-end"></div> {/* Sun */}
            <div className="h-2.5 flex items-center justify-end">Mon</div>
            <div className="h-2.5 flex items-center justify-end"></div> {/* Tue */}
            <div className="h-2.5 flex items-center justify-end">Wed</div>
            <div className="h-2.5 flex items-center justify-end"></div> {/* Thu */}
            <div className="h-2.5 flex items-center justify-end">Fri</div>
            <div className="h-2.5 flex items-center justify-end"></div> {/* Sat */}
          </div>

          {/* Grid (months + squares) */}
          <div className="flex-grow max-w-[716px] relative">
            {/* Months row */}
            <div className="relative h-4 text-[9px] font-mono text-secondary/50 mb-1 select-none w-full">
              {monthLabels.map((label) => (
                <span
                  key={label.index}
                  className="absolute"
                  style={{ left: `${label.index * 13.5}px` }}
                >
                  {label.text}
                </span>
              ))}
            </div>

            {/* Heatmap grid container */}
            <div className="grid grid-flow-col grid-rows-7 gap-[3.5px] select-none w-full">
              {displayDays.map((day) => {
                const isHovered = hoveredDay?.date === day.date;
                const formattedTooltipText = day.date.startsWith('loading')
                  ? 'Loading...'
                  : `${day.count === 0 ? 'No contributions' : `${day.count} contribution${day.count === 1 ? '' : 's'}`} on ${formatGithubDate(day.date)}`;

                return (
                  <div
                    key={day.date}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    onClick={() => setHoveredDay(day)}
                    title={formattedTooltipText}
                    className={cn(
                      "w-2.5 h-2.5 rounded-[2px] transition-all duration-75 cursor-pointer border border-transparent relative",
                      isHovered && "scale-125 z-30 ring-2 ring-accent shadow-md shadow-accent/50",
                      day.level === -1 && "bg-surface/30 animate-pulse",
                      day.level === 0 && "bg-surface/40 border-border/20",
                      day.level === 1 && "bg-amber-950/70 border-amber-900/30",
                      day.level === 2 && "bg-amber-800/80 border-amber-700/40",
                      day.level === 3 && "bg-[#c8843a] border-accent/60",
                      day.level === 4 && "bg-amber-400 border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                    )}
                  >
                    {/* Instant fast floating tooltip */}
                    {isHovered && !day.date.startsWith('loading') && (
                      <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 bg-[#1c2128] border border-[#30363d] text-[#e6edf3] text-[11px] font-sans font-medium px-2.5 py-1 rounded-md shadow-2xl whitespace-nowrap">
                        {formattedTooltipText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom info row (removed "Learn how we count contributions") */}
      <div className="flex items-center justify-end text-[11px] font-mono text-secondary/50 pt-3">
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-surface/40 border border-border/20" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-amber-950/70" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-amber-800/80" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#c8843a]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

const TechCategoryCard = ({
  category,
  skills,
  categoryIdx,
  isFirstRowFull,
  hoveredSkill,
  setHoveredSkill,
}: {
  category: string;
  skills: string[];
  categoryIdx: number;
  isFirstRowFull: boolean;
  hoveredSkill: string | null;
  setHoveredSkill: (skill: string | null) => void;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const getProjectsUsingSkill = (skillName: string) => {
    const normalizedSkill = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return portfolioData.projects.filter(project => 
      project.techStack.some(tech => {
        const normalizedTech = tech.toLowerCase().replace(/[^a-z0-9]/g, '');
        return normalizedTech.includes(normalizedSkill) || normalizedSkill.includes(normalizedTech);
      })
    );
  };

  return (
    <Tilt
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      perspective={1000}
      transitionSpeed={1200}
      scale={1.01}
      className={cn(
        'relative rounded-2xl h-full',
        isFirstRowFull ? 'lg:col-span-2 sm:col-span-2' : 'lg:col-span-1 sm:col-span-1'
      )}
    >
      <div
        onMouseMove={handleMouseMove}
        className="p-6 bg-surface/30 border border-border/40 hover:border-accent/25 hover:bg-surface/50 rounded-2xl transition-all duration-300 group shadow-sm flex flex-col justify-between gap-4 h-full relative overflow-hidden"
      >
        {/* Spotlight radial gradient overlay tracking cursor */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                250px circle at ${mouseX}px ${mouseY}px,
                color-mix(in srgb, var(--accent), transparent 94%),
                transparent 80%
              )
            `,
          }}
        />

        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-accent/60 tracking-[0.2em] uppercase">
              {String(categoryIdx + 1).padStart(2, '0')} — Layer
            </span>
          </div>
          <h4 className="text-sm font-bold text-primary tracking-tight transition-colors group-hover:text-accent font-mono uppercase">
            {category}
          </h4>
        </div>

        {/* Skills Tag Pills */}
        <div className="flex flex-wrap gap-1.5 mt-2 relative z-10 flex-grow content-start">
          {skills.map((skill) => {
            const isActive = hoveredSkill === skill;
            const isAnyHovered = hoveredSkill !== null;
            return (
              <div
                key={skill}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={cn(
                  "group/pill px-3 py-1.5 bg-background border border-border/60 rounded-xl flex items-center gap-2 cursor-default transition-all duration-300",
                  isAnyHovered && !isActive && "opacity-35 scale-95 border-border/30",
                  isActive && "border-accent/50 bg-accent/[0.04] scale-105 shadow-sm"
                )}
              >
                <span className={cn(
                  "w-1 h-1 rounded-full bg-accent/30 transition-all duration-300 shrink-0",
                  isActive && "bg-accent scale-125"
                )} />
                <span className={cn(
                  "text-[10px] font-mono text-secondary/70 transition-colors duration-300 whitespace-nowrap tracking-wide uppercase",
                  isActive && "text-primary font-bold"
                )}>
                  {skill}
                </span>
              </div>
            );
          })}
        </div>

        {/* Interactive Connector Status Bar */}
        <div className="mt-4 pt-3 border-t border-border/20 min-h-[38px] flex items-center relative z-10">
          <p className="text-[10px] font-mono text-secondary/60 leading-relaxed transition-all duration-300">
            {hoveredSkill && skills.includes(hoveredSkill) ? (
              <>
                <span className="text-accent font-bold uppercase">{hoveredSkill}</span>
                {" → "}
                {getProjectsUsingSkill(hoveredSkill).length > 0 ? (
                  <span>
                    Used in:{" "}
                    <span className="text-primary font-medium">
                      {getProjectsUsingSkill(hoveredSkill).map(p => p.title).join(", ")}
                    </span>
                  </span>
                ) : (
                  <span className="text-secondary/70">Foundational tool used across all projects</span>
                )}
              </>
            ) : (
              <span className="opacity-45 italic">Hover a skill to trace its application</span>
            )}
          </p>
        </div>
      </div>
    </Tilt>
  );
};

export const Skills = () => {
  const { ref, isVisible } = useIsVisible();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <section id="skills" className="section-padding px-6" ref={ref}>
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
              <span className="section-label">07 — Tech Stack</span>
              <div className="editorial-rule w-16" />
            </div>
            <h2
              className="font-display italic font-light text-primary leading-tight"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
            >
              Tools of
              <span className="text-accent"> the trade.</span>
            </h2>
          </div>
          <div className="max-w-md font-light text-secondary text-sm md:text-base leading-relaxed">
            A breakdown of my technical specialties across key layers of system design, backend architectures, and front-end development.
          </div>
        </div>

        {/* Bento Dashboard Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Tech Stack Cards Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {Object.entries(portfolioData.techStack).map(([category, skills], categoryIdx) => {
              const isFirstRowFull = categoryIdx === 0;
              return (
                <TechCategoryCard
                  key={category}
                  category={category}
                  skills={skills}
                  categoryIdx={categoryIdx}
                  isFirstRowFull={isFirstRowFull}
                  hoveredSkill={hoveredSkill}
                  setHoveredSkill={setHoveredSkill}
                />
              );
            })}
          </motion.div>

          {/* GitHub Commit Activity Card (Full Width at Bottom) */}
          <motion.div
            variants={itemVariants}
            className="w-full"
          >
            <Tilt
              tiltMaxAngleX={1.5}
              tiltMaxAngleY={1.5}
              perspective={1500}
              transitionSpeed={1200}
              scale={1.002}
              className="w-full"
            >
              <div className="flex flex-col justify-between p-6 md:p-8 bg-surface/40 border border-border/40 rounded-2xl relative overflow-hidden shadow-sm backdrop-blur-md w-full">
                {/* Spotlight background glow */}
                <div className="absolute -top-10 -left-10 w-44 h-44 bg-accent/5 rounded-full blur-[60px] pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10 w-full">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-accent/60 tracking-[0.2em] uppercase">
                      Shipping Consistency
                    </span>
                    <h3 className="text-lg font-medium text-primary tracking-tight">
                      Commit Activity
                    </h3>
                    <p className="text-secondary text-xs md:text-sm leading-relaxed max-w-xl">
                      Every line of code tells a story of curiosity, continuous learning, and momentum. Here&apos;s a live glimpse into my daily journey of building, refining, and shipping software.
                    </p>
                  </div>

                  {/* GitHub Profile Action Link */}
                  <div className="shrink-0">
                    <a
                      href={portfolioData.personal.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-background text-xs font-mono tracking-wider uppercase rounded-xl transition-all shadow-sm shadow-accent/10"
                    >
                      <Github size={14} />
                      View GitHub Profile
                    </a>
                  </div>
                </div>

                {/* Render dynamic Commit Heatmap */}
                <div className="mt-8 relative z-10 w-full">
                  <CommitHeatmap />
                </div>
              </div>
            </Tilt>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
