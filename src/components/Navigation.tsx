'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data';
import { useScrollSpy } from '@/lib/hooks';
import {
  Menu,
  X,
  Moon,
  Sun,
  User,
  Briefcase,
  Award,
  Terminal,
  Cpu,
  Mail,
  Github,
  Linkedin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Magnetic } from '@/components/ui/Magnetic';
import { FloatingDock, FloatingDockItem } from '@/components/ui/FloatingDock';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'CDG Agency', href: '#cdg' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <Magnetic intensity={0.15}>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-xl bg-surface border border-border text-secondary hover:text-accent hover:border-accent/40 transition-colors block"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </Magnetic>
  );
};

/** Left vertical scroll rail — desktop (lg+) only */
const LeftScrollRail = ({ activeSection }: { activeSection: string }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start gap-4">
      {navLinks.map((link, i) => {
        const isActive = activeSection === link.href.slice(1);

        return (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="group flex items-center gap-2.5 h-5 cursor-pointer"
            aria-label={link.name}
          >
            {/* Number - vertically centered */}
            <span
              className={cn(
                'text-[11px] font-mono leading-none transition-colors duration-200 w-4 text-right tabular-nums flex items-center justify-end select-none',
                isActive ? 'text-accent font-semibold' : 'text-secondary/40 group-hover:text-secondary/70'
              )}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Dot container - fixed dimensions to keep dot perfectly centered */}
            <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
              <div
                className={cn(
                  'rounded-full transition-all duration-300',
                  isActive
                    ? 'w-2.5 h-2.5 bg-accent shadow-[0_0_10px_2px_hsl(var(--accent)/0.5)]'
                    : 'w-1.5 h-1.5 bg-border/60 group-hover:bg-secondary/70'
                )}
              />
            </div>

            {/* Section label - perfectly aligned baseline */}
            <span
              className={cn(
                'text-[10px] font-mono uppercase tracking-widest leading-none transition-all duration-200 whitespace-nowrap select-none',
                isActive
                  ? 'opacity-100 text-accent font-semibold translate-x-0'
                  : 'opacity-0 group-hover:opacity-75 text-secondary -translate-x-1 group-hover:translate-x-0'
              )}
            >
              {link.name}
            </span>
          </a>
        );
      })}
    </div>
  );
};


export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(navLinks.map((l) => l.href.slice(1)));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 320);
  };

  const dockItems: FloatingDockItem[] = [
    {
      title: 'About',
      icon: <User size={20} />,
      href: '#about',
      active: activeSection === 'about',
    },
    {
      title: 'Projects',
      icon: <Terminal size={20} />,
      href: '#projects',
      active: activeSection === 'projects',
    },
    {
      title: 'Experience',
      icon: <Briefcase size={20} />,
      href: '#experience',
      active: activeSection === 'experience',
    },
    {
      title: 'Certifications',
      icon: <Award size={20} />,
      href: '#certifications',
      active: activeSection === 'certifications',
    },
    {
      title: 'Skills',
      icon: <Cpu size={20} />,
      href: '#skills',
      active: activeSection === 'skills',
    },
    {
      title: 'Contact',
      icon: <Mail size={20} />,
      href: '#contact',
      active: activeSection === 'contact',
    },
    {
      title: 'GitHub',
      icon: <Github size={20} />,
      href: portfolioData.personal.contact.github,
    },
    {
      title: 'LinkedIn',
      icon: <Linkedin size={20} />,
      href: portfolioData.personal.contact.linkedin,
    },
  ];

  return (
    <>
      {/* Left vertical scroll rail — desktop only */}
      <LeftScrollRail activeSection={activeSection} />

      {/* Top navbar */}
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6',
          scrolled || isOpen
            ? 'bg-background/95 backdrop-blur-md border-b border-border/60 py-3'
            : 'bg-background/60 backdrop-blur-sm py-4'
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
          <div className="flex items-center gap-14">
            <a href="#" className="font-display italic text-xl font-light text-primary hover:text-accent transition-colors">
              {portfolioData.personal.initials}
            </a>
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-5">
            <ThemeToggle />
            <Magnetic intensity={0.1}>
              <a
                href={`mailto:${portfolioData.personal.contact.email}`}
                className="text-xs font-mono tracking-wider uppercase text-secondary/70 hover:text-accent border-b border-transparent hover:border-accent/60 transition-all pb-0.5 flex items-center gap-1.5"
              >
                Get In Touch <span className="text-base leading-none">↗</span>
              </a>
            </Magnetic>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button
              className="p-2 rounded-xl bg-surface border border-border text-secondary hover:text-accent hover:border-accent/40 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <div
        className={cn(
          'fixed inset-0 bg-background z-[45] md:hidden transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ paddingTop: '53px' }}
      >
        <div className="flex flex-col px-8 pt-10 gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleMobileNavClick(e, link.href)}
              className={cn(
                'flex items-center gap-4 py-5 border-b border-border/30 last:border-0 transition-colors',
                activeSection === link.href.slice(1) ? 'text-accent' : 'text-primary/80 hover:text-accent'
              )}
            >
              <span className="text-[10px] font-mono text-accent/50 tracking-widest w-6">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display italic text-3xl font-light leading-none">
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Desktop Floating Dock Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <FloatingDock items={dockItems} />
      </div>

      {/* Mobile Floating Dock Navigation */}
      <div className="fixed bottom-6 right-6 z-50 block md:hidden">
        <FloatingDock items={dockItems} />
      </div>
    </>
  );
};
