'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Mail,
  Link as LinkIcon,
  Monitor,
  BookOpen,
  Briefcase,
  User,
  LayoutGrid,
  Layers,
  Award,
  Users,
  Users2,
  Trophy,
} from 'lucide-react';
import { portfolioData } from '@/data';
import { hackathons } from '@/lib/hackathons';
import { ContactModal } from './ContactModal';
import { ShipWidget } from './ShipWidget';
import { ThemeToggle } from './ThemeToggle';

const { projects, techStack, certifications, testimonials, leadership, resources, gear, personal } =
  portfolioData;

const stackCount = Object.values(techStack).flat().length;
const hackathonCount = hackathons.length;
const pad2 = (n: number) => String(n).padStart(2, '0');

const GROUPS: {
  label: string;
  links: { href: string; label: string; icon: React.ElementType; count?: string }[];
}[] = [
  {
    label: 'Explore',
    links: [
      { href: '/links', label: 'Links', icon: LinkIcon, count: pad2(personal.links.length) },
      { href: '/gear', label: 'Gear', icon: Monitor, count: pad2(gear.length) },
      { href: '/resources', label: 'Resources', icon: BookOpen, count: pad2(resources.length) },
      { href: '/recommendations', label: 'Recommendations', icon: Users, count: pad2(testimonials.length) },
      { href: '/affiliations', label: 'Affiliations', icon: Users2, count: pad2(leadership.length) },
    ],
  },
  {
    label: 'Work with me',
    links: [
      { href: '/services', label: 'Services', icon: Briefcase, count: pad2(personal.services.length) },
    ],
  },
  {
    label: 'Portfolio',
    links: [
      { href: '/about', label: 'More about me', icon: User },
      { href: '/projects', label: 'Projects', icon: LayoutGrid, count: pad2(projects.length) },
      { href: '/hackathons', label: 'Hackathons', icon: Trophy, count: pad2(hackathonCount) },
      { href: '/stack', label: 'Stack', icon: Layers, count: pad2(stackCount) },
      { href: '/certifications', label: 'Certifications', icon: Award, count: pad2(certifications.length) },
    ],
  },
];

const NavLink = ({
  href,
  label,
  icon: Icon,
  count,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  count?: string;
  onNavigate?: () => void;
}) => (
  <Link
    href={href}
    onClick={onNavigate}
    className="group flex h-11 items-center gap-2.5 rounded-xl px-3 text-[15px] font-medium text-primary transition-colors hover:bg-surface lg:h-10"
  >
    <Icon size={16} className="shrink-0 text-muted" strokeWidth={1.75} />
    <span className="flex-1 truncate">{label}</span>
    {count !== undefined && (
      <span className="text-[12px] font-medium text-muted-2">{count}</span>
    )}
  </Link>
);

const GroupLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="px-3 pb-1.5 pt-3 text-[12px] font-medium text-muted-2">{children}</p>
);

/**
 * Phone and tablet navigation (below `lg`, where the fixed sidebar is
 * hidden): a slim top bar with a menu button that opens a slide-in panel
 * holding the same links, the Contact button, and the theme toggle.
 */
const MobileMenu = ({ onContact }: { onContact: () => void }) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      // Keep Tab / Shift+Tab inside the open menu.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      trigger?.focus();
    };
  }, [open, close]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur lg:hidden">
        <Link href="/" className="text-[15.5px] font-medium text-primary">
          {personal.name}
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary transition-colors hover:bg-surface"
        >
          <Menu size={19} strokeWidth={1.75} />
        </button>
      </header>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 lg:hidden">
          <div onClick={close} className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            ref={panelRef}
            data-lenis-prevent
            className="absolute right-0 top-0 flex h-full w-[86%] max-w-[330px] flex-col overflow-y-auto border-l border-border bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 pb-3 pt-3">
              <span className="text-[15.5px] font-medium text-primary">{personal.name}</span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary transition-colors hover:bg-surface"
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>

            <div className="px-3">
              <button
                type="button"
                onClick={() => {
                  close();
                  onContact();
                }}
                className="flex h-[46px] w-full items-center gap-2 rounded-full px-4 text-[15px] font-medium text-primary shadow-[inset_0_0_0_1px_var(--border),0_1px_2px_rgba(17,17,19,0.06),0_4px_10px_rgba(17,17,19,0.04)] transition-colors hover:bg-surface"
              >
                <Mail size={16} strokeWidth={1.75} />
                Contact
              </button>
            </div>

            <nav aria-label="Section links" className="mt-3 flex-1 px-2 pb-3">
              {GROUPS.map((group) => (
                <div key={group.label}>
                  <GroupLabel>{group.label}</GroupLabel>
                  {group.links.map((l) => (
                    <NavLink key={l.href} {...l} onNavigate={close} />
                  ))}
                </div>
              ))}
            </nav>

            <div className="flex items-center justify-between border-t border-border px-5 py-3 text-[12.5px] text-muted">
              <span>GMT+8</span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <a
                  href={`mailto:${personal.contact.email}`}
                  aria-label="Email"
                  className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-primary"
                >
                  <Mail size={16} strokeWidth={1.75} />
                </a>
                <a
                  href={personal.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-primary"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5a2.5 2.5 0 1 1-.001 5.001A2.5 2.5 0 0 1 4.98 3.5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-1 1.9-2 3.9-2 4.1 0 4.9 2.7 4.9 6.2V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4V9z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/**
 * Fixed sidebar pinned to the left edge of the viewport — its own warm
 * cream card with a thin border and generous rounded corners (26px),
 * floating 12px off every edge, matching marwieang.com's shell exactly.
 * Only visible on `lg` and up; below that, MobileMenu provides the
 * navigation.
 */
export const Sidebar = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <>
    <aside className="fixed left-3 top-3 bottom-3 z-30 hidden w-[260px] flex-col overflow-hidden rounded-[26px] border border-border bg-background shadow-[0_1px_2px_rgba(17,17,19,0.04),0_8px_24px_-12px_rgba(17,17,19,0.08)] lg:flex">
      {/* Header: name + collapse button */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/" className="text-[15.5px] font-medium text-primary">
          {personal.name}
        </Link>
      </div>

      {/* Contact pill: opens the contact popup */}
      <div className="px-3">
        <button
          type="button"
          onClick={() => setContactOpen(true)}
          aria-haspopup="dialog"
          className="flex h-[46px] w-full items-center gap-2 rounded-full px-4 text-[15px] font-medium text-primary shadow-[inset_0_0_0_1px_var(--border),inset_0_1px_0_0_rgba(255,255,255,0.6),0_1px_2px_rgba(17,17,19,0.06),0_4px_10px_rgba(17,17,19,0.04)] transition-colors hover:bg-surface"
        >
          <Mail size={16} strokeWidth={1.75} />
          Contact
        </button>
      </div>

      {/* Nav */}
      <nav
        aria-label="Section links"
        data-lenis-prevent
        className="mt-3 flex-1 overflow-y-auto px-2 pb-3"
      >
        {GROUPS.map((group) => (
          <div key={group.label}>
            <GroupLabel>{group.label}</GroupLabel>
            {group.links.map((l) => (
              <NavLink key={l.href} {...l} />
            ))}
          </div>
        ))}
      </nav>

      {/* Footer rail */}
      <div className="flex items-center justify-between border-t border-border px-5 py-3 text-[12.5px] text-muted">
        <span>GMT+8</span>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href={`mailto:${personal.contact.email}`}
            aria-label="Email"
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-primary"
          >
            <Mail size={14} strokeWidth={1.75} />
          </a>
          <a
            href={personal.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-primary"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 1-.001 5.001A2.5 2.5 0 0 1 4.98 3.5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-1 1.9-2 3.9-2 4.1 0 4.9 2.7 4.9 6.2V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4V9z" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
    <MobileMenu onContact={() => setContactOpen(true)} />
    <ShipWidget />
    {contactOpen && <ContactModal onClose={closeContact} />}
    </>
  );
};
