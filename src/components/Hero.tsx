'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export const Hero = () => {
  const { ref, isVisible } = useIsVisible();

  return (
    <section
      ref={ref}
      className="min-h-screen relative flex flex-col overflow-hidden bg-background pt-20"
    >
      {/* Left vertical label */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-5 h-full py-32">
        <span className="-rotate-90 whitespace-nowrap text-[9px] tracking-[0.35em] uppercase font-mono text-secondary/40 mt-auto">
          {portfolioData.personal.availability}
        </span>
        <div className="w-px h-16 bg-accent/25 my-2" />
        <span className="-rotate-90 text-[9px] tracking-[0.25em] font-mono text-secondary/30 mb-auto">
          {new Date().getFullYear()}
        </span>
      </div>

      <div
        className={cn(
          'flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full pl-6 lg:pl-32 pr-6 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        {/* Index indicator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-4 mb-10 lg:mb-14"
        >
          <span className="text-[10px] font-mono text-accent tracking-[0.3em]">01 — INTRO</span>
          <div className="h-px w-24 bg-gradient-to-r from-accent/50 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 items-center gap-0">
          {/* Left: Typography */}
          <div className="flex flex-col justify-center pb-24 lg:pb-0 z-10">

            {/* "Hello," — big italic serif */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                initial={{ y: '105%', rotate: 1.5 }}
                animate={isVisible ? { y: 0, rotate: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-display italic font-light leading-[0.86] tracking-tight text-primary"
                style={{ fontSize: 'clamp(4.5rem, 11vw, 10rem)' }}
              >
                Hello,
              </motion.h1>
            </div>

            {/* "I'm Adrian." — accent color */}
            <div className="overflow-hidden mb-9">
              <motion.div
                initial={{ y: '105%' }}
                animate={isVisible ? { y: 0 } : {}}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
                className="font-display italic font-light leading-[0.86] tracking-tight text-accent"
                style={{ fontSize: 'clamp(4.5rem, 11vw, 10rem)' }}
              >
                I&apos;m Adrian.
              </motion.div>
            </div>

            {/* Thin editorial rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
              className="editorial-rule origin-left mb-8 w-full max-w-sm"
            />

            {/* Role + location */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 mb-12"
            >
              <span className="text-base md:text-lg font-sans font-medium text-primary">
                AI-First Software Engineer
              </span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-accent/60" />
              <span className="text-base md:text-lg font-sans text-secondary">
                {portfolioData.personal.location}
              </span>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.78 }}
              className="flex gap-12"
            >
              {[
                { num: '+12', label: 'Projects built' },
                { num: `+${portfolioData.experience.length}`, label: 'Roles & exp' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="font-display italic text-accent leading-none mb-1.5"
                     style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                    {num}
                  </p>
                  <p className="text-[10px] font-mono text-secondary/55 uppercase tracking-[0.2em]">{label}</p>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right: Portrait */}
          <div className="relative hidden lg:flex items-center justify-center h-full min-h-[640px]">
            {/* Warm glow behind portrait */}
            <div className="absolute top-1/2 -translate-y-1/2 right-1/4 w-80 h-80 bg-accent/18 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute top-1/2 -translate-y-1/2 right-1/3 w-48 h-48 bg-amber-500/8 rounded-full blur-[50px] pointer-events-none" />

            <Tilt
              tiltMaxAngleX={4}
              tiltMaxAngleY={4}
              perspective={1100}
              transitionSpeed={1300}
              scale={1.02}
              className="animate-float relative cursor-pointer"
            >
              {/* Card */}
              <div className="relative w-[360px] h-[500px] rounded-[18px] overflow-hidden border border-accent/18 shadow-[0_32px_80px_rgba(200,132,58,0.18),0_0_0_1px_rgba(200,132,58,0.07)]">
                <img
                  src="/portrait.png"
                  alt={portfolioData.personal.name}
                  className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105 sepia-[0.12] hover:sepia-0"
                />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080604]/65 to-transparent pointer-events-none" />

                {/* Name + availability overlay */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-mono text-white/70 tracking-[0.2em] uppercase">
                      {portfolioData.personal.name}
                    </p>
                    <p className="text-[9px] font-mono text-white/60 tracking-wider">
                      Student Founder
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[9px] font-mono text-white/60 tracking-wider uppercase">
                      Available
                    </span>
                  </div>
                </div>

                {/* Corner amber accent line */}
                <div className="absolute top-0 left-0 w-16 h-0.5 bg-gradient-to-r from-accent/70 to-transparent" />
                <div className="absolute top-0 left-0 w-0.5 h-16 bg-gradient-to-b from-accent/70 to-transparent" />
              </div>
            </Tilt>
          </div>
        </div>
      </div>

      {/* Scroll indicator — sits at the bottom of the flex column */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="flex justify-center pb-8 pt-4"
      >
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-1.5 text-[10px] font-mono text-secondary/40 hover:text-accent transition-colors tracking-[0.25em] uppercase group"
        >
          <span>Scroll down</span>
          <span className="inline-block group-hover:translate-y-1 transition-transform text-base leading-none">↓</span>
        </a>
      </motion.div>
    </section>
  );
};
