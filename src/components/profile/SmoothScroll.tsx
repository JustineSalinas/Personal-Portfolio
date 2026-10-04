'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Momentum scrolling.
 *
 * Deliberately narrow in scope:
 *  - Touch devices keep native scrolling; mobile momentum is already good and
 *    hijacking it costs responsiveness for nothing.
 *  - `prefers-reduced-motion` disables it outright, since smoothed scrolling is
 *    exactly the kind of motion that setting exists to suppress.
 *  - Anchor links are handled here rather than by CSS, because Lenis owns the
 *    scroll position and native `scroll-behavior: smooth` would fight it.
 *  - Inner scroll areas (modals, the sidebar) opt out with `data-lenis-prevent`
 *    so they keep their own native wheel scrolling.
 */
export const SmoothScroll = () => {
  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduced) return;

    const lenis = new Lenis({
      duration: 0.9,
      // Exponential ease-out: quick to respond, settles without floating.
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    // CSS smooth-scroll would compete with Lenis for the scroll position.
    const root = document.documentElement;
    root.classList.remove('scroll-smooth');
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    // Same-page anchors: "#contact" and "/#contact" (when already on the home page).
    const onAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
      const raw = link?.getAttribute('href');
      if (!raw) return;

      const hash = raw.startsWith('#')
        ? raw
        : raw.startsWith('/#') && window.location.pathname === '/'
          ? raw.slice(1)
          : null;
      if (!hash || hash === '#') return;

      const target = hash === '#top' ? 0 : document.querySelector(hash);
      if (target === null) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement | number, { offset: -24, duration: 1.1 });
    };

    document.addEventListener('click', onAnchorClick);
    return () => {
      document.removeEventListener('click', onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      root.style.scrollBehavior = previous;
      root.classList.add('scroll-smooth');
    };
  }, []);

  return null;
};
