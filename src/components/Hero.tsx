'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export const Hero = () => {
  const { ref, isVisible } = useIsVisible();

  return (
    <section 
      ref={ref}
      className="min-h-screen relative flex items-center overflow-hidden bg-background pt-20"
    >
      {/* Left Vertical Text */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 text-secondary hidden lg:flex h-full py-32">
        <span className="-rotate-90 whitespace-nowrap text-xs tracking-widest uppercase font-medium mt-auto">
          {portfolioData.personal.titles[0]}
        </span>
        <div className="w-[1px] h-32 bg-border my-4" />
        <span className="-rotate-90 text-xs tracking-widest font-medium mb-auto">
          {new Date().getFullYear()}
        </span>
      </div>

      <div className={cn(
        "max-w-7xl mx-auto w-full grid lg:grid-cols-2 h-full transition-all duration-1000 pl-6 lg:pl-32 pr-6",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        
        {/* Left Content Area */}
        <div className="flex flex-col justify-center h-full pt-12 pb-24 lg:pb-0 z-10 relative">
          
          {/* Stats */}
          <div className="flex gap-16 mb-16 relative">
            <div>
              <p className="text-4xl md:text-5xl font-light text-primary mb-1 font-sans tracking-tight">+6</p>
              <p className="text-xs text-secondary uppercase tracking-wider font-medium">Projects built</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-light text-primary mb-1 font-sans tracking-tight">+{portfolioData.experience.length}</p>
              <p className="text-xs text-secondary uppercase tracking-wider font-medium">Roles & Exp</p>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-4 overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={isVisible ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
              className="text-8xl md:text-[11rem] leading-none font-light text-primary tracking-tighter -ml-2 lg:-ml-4 font-sans"
            >
              Hello
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-primary font-medium flex items-center gap-2"
          >
            — It's {portfolioData.personal.name} a {portfolioData.personal.titles[0].toLowerCase()}
          </motion.p>

          {/* Scroll Down Indicator */}
          <div className="mt-auto pt-24 lg:pt-32 lg:absolute lg:bottom-12">
            <a href="#about" className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors group">
              Scroll down <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Portrait Area */}
        <div className="relative h-full w-full hidden lg:flex items-end justify-center pt-20">
          <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            perspective={1000}
            transitionSpeed={1000}
            scale={1.02}
            className="animate-float relative cursor-pointer"
          >
            {/* Ambient glow behind the card */}
            <div className="absolute inset-0 blur-3xl opacity-10 bg-white rounded-[24px] scale-95 translate-y-4" />
            {/* Floating card */}
            <div className="relative w-[380px] h-[520px] rounded-[24px] overflow-hidden border border-[rgba(255,255,255,0.14)] dark:bg-[#0a0a0a] bg-surface shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              <img
                src="/portrait.png"
                alt={portfolioData.personal.name}
                className="w-full h-full object-cover object-top grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105"
              />
              {/* Subtle bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
};

