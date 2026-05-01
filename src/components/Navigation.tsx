'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data';
import { useScrollSpy } from '@/lib/hooks';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-xl bg-surface border border-border text-primary hover:text-accent transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(navLinks.map(l => l.href.slice(1)));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        
        {/* Logo and Links Container */}
        <div className="flex items-center gap-16">
          <a href="#" className="text-2xl font-bold tracking-tighter text-primary">
            {portfolioData.personal.initials}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 4).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  activeSection === link.href.slice(1) ? "text-accent" : "text-secondary"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-6">
          <ThemeToggle />
          <a 
            href={`mailto:${portfolioData.personal.contact.email}`} 
            className="text-sm font-medium border-b border-primary text-primary hover:text-secondary hover:border-secondary transition-colors pb-0.5 flex items-center gap-1"
          >
            Get In Touch <span className="text-lg leading-none mb-1">↗</span>
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button 
            className="text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 top-[60px] bg-background z-40 md:hidden transition-transform duration-300 p-8",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-2xl font-semibold",
                activeSection === link.href.slice(1) ? "text-accent" : "text-secondary"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
