'use client';

import React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { portfolioData } from '@/data';
import { useThemeToggle } from './ThemeToggle';

const { personal } = portfolioData;

const dockButton =
  'hover-lift flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-secondary transition-colors hover:bg-surface hover:text-primary active:scale-95';

/**
 * A persistent bottom dock, mounted once in the root layout so it survives
 * navigation between routes (home, case studies, certifications). Sits above
 * the chat bubble on small screens rather than beside it — chat is
 * bottom-right, and the dock's width at five icons wide leaves no safe gap
 * to its left on a phone.
 */
export const FloatingDock = () => {
  const { isDark, mounted, toggle } = useThemeToggle();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-4 lg:bottom-6">
      <nav
        aria-label="Quick links"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-background/90 p-1.5 shadow-xl shadow-black/10 backdrop-blur-md dark:shadow-black/50"
      >
        <Link href="/#top" aria-label="Home" title="Home" className={dockButton}>
          <Home size={17} />
        </Link>
        <a
          href={personal.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
          className={dockButton}
        >
          <Github size={17} />
        </a>
        <a
          href={personal.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className={dockButton}
        >
          <Linkedin size={17} />
        </a>
        <a
          href={`mailto:${personal.contact.email}`}
          aria-label="Email"
          title="Email"
          className={dockButton}
        >
          <Mail size={17} />
        </a>
        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          title="Toggle theme"
          className={dockButton}
        >
          <AnimatePresence initial={false} mode="wait">
            {mounted && (
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                className="flex items-center justify-center"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>
    </div>
  );
};
