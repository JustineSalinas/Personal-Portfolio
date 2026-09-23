import React from 'react';
import Link from 'next/link';

const LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/stack', label: 'Stack' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/recommendations', label: 'Recommendations' },
  { href: '/affiliations', label: 'Affiliations' },
  { href: '/resources', label: 'Resources' },
  { href: '/gear', label: 'Gear' },
];

/**
 * Desktop-only section nav, sitting in the left rail beside the reading
 * column. Hidden below `lg` — there's no spare width for it on tablet or
 * phone, where the sticky TopBar remains the only navigation.
 */
export const Sidebar = () => (
  <nav
    aria-label="Section links"
    className="sticky top-24 hidden h-fit w-40 shrink-0 flex-col gap-2.5 self-start pt-1 lg:flex"
  >
    {LINKS.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className="text-[14.5px] text-secondary transition-colors hover:text-primary"
      >
        {label}
      </Link>
    ))}
  </nav>
);
