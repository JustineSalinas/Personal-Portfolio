'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';

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
          <div className="flex gap-16 mb-16">
            <div>
              <p className="text-4xl md:text-5xl font-light text-primary mb-1 font-sans tracking-tight">+{portfolioData.projects.length}</p>
              <p className="text-xs text-secondary uppercase tracking-wider font-medium">Projects built</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-light text-primary mb-1 font-sans tracking-tight">+{portfolioData.experience.length}</p>
              <p className="text-xs text-secondary uppercase tracking-wider font-medium">Roles & Exp</p>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-4">
            <h1 className="text-8xl md:text-[11rem] leading-none font-light text-primary tracking-tighter -ml-2 lg:-ml-4 font-sans">
              Hello
            </h1>
          </div>

          <p className="text-lg md:text-xl text-primary font-medium flex items-center gap-2">
            — It's {portfolioData.personal.initials}.{portfolioData.personal.name.split(' ')[1]} a {portfolioData.personal.titles[0].toLowerCase()}
          </p>

          {/* Scroll Down Indicator */}
          <div className="mt-auto pt-24 lg:pt-32 lg:absolute lg:bottom-12">
            <a href="#about" className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors group">
              Scroll down <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Portrait Area */}
        <div className="relative h-full w-full hidden lg:flex items-end justify-center pt-20">
          <img 
            src="/portrait.png" 
            alt={portfolioData.personal.name}
            className="w-full max-w-[500px] h-auto object-contain object-bottom grayscale transition-all duration-700 hover:grayscale-0"
          />
        </div>
      </div>
    </section>
  );
};

