'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data';
import { useScrollSpy } from '@/lib/hooks';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Magnetic } from '@/components/ui/Magnetic';

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

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(navLinks.map((l) => l.href.slice(1)));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border/60 py-3'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        <div className="flex items-center gap-14">
          <a href="#" className="font-display italic text-xl font-light text-primary hover:text-accent transition-colors">
            {portfolioData.personal.initials}
          </a>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.slice(0, 5).map((link) => (
              <Magnetic key={link.name} intensity={0.2}>
                <a
                  href={link.href}
                  className={cn(
                    'text-xs font-mono tracking-wider uppercase transition-colors hover:text-accent block py-2',
                    activeSection === link.href.slice(1) ? 'text-accent' : 'text-secondary/70'
                  )}
                >
                  {link.name}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <ThemeToggle />
          <Magnetic intensity={0.1}>
            <a
              href={`mailto:${portfolioData.personal.contact.email}`}
              className="text-xs font-mono tracking-wider uppercase text-secondary/70 hover:text-accent border-b border-transparent hover:border-accent/60 transition-all pb-0.5 flex items-center gap-1.5 block"
            >
              Get In Touch <span className="text-base leading-none">↗</span>
            </a>
          </Magnetic>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button className="text-secondary hover:text-primary transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 top-[56px] bg-background z-40 md:hidden transition-transform duration-300 p-8 border-t border-border/50',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col gap-7">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                'font-display italic text-3xl font-light transition-colors',
                activeSection === link.href.slice(1) ? 'text-accent' : 'text-secondary/60'
              )}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-[10px] font-mono not-italic text-accent/50 mr-3 tracking-widest">
                {String(i + 1).padStart(2, '0')}
              </span>
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
