import React from 'react';
import { portfolioData } from '@/data';

const { personal } = portfolioData;

const social = [
  { href: `mailto:${personal.contact.email}`, label: 'Email' },
  { href: personal.contact.linkedin, label: 'LinkedIn' },
  { href: personal.contact.github, label: 'GitHub' },
  { href: personal.contact.facebook, label: 'Facebook' },
  { href: personal.contact.instagram, label: 'Instagram' },
];

/**
 * Thin bottom footer: "© year Name" on the left, space-separated
 * social links on the right. The explicit `#contact` anchor keeps
 * the sidebar's Contact button working while the on-page form is in
 * flight.
 */
export const HomeFooter = () => (
  <footer id="contact" className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border py-6">
    <p className="text-[13.5px] text-muted">© {new Date().getFullYear()} {personal.name}</p>
    <nav aria-label="Social" className="flex flex-wrap items-center gap-4">
      {social.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target={s.href.startsWith('http') ? '_blank' : undefined}
          rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="inline-flex min-h-8 items-center text-[13.5px] text-muted hover:text-primary"
        >
          {s.label}
        </a>
      ))}
    </nav>
  </footer>
);
