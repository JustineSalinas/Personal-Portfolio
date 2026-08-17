'use client';

import React, { useCallback, useRef, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

/** Not in lib.dom yet — Chromium-only, feature-detected below. */
type ViewTransitionDocument = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

// Short enough to feel instant, long enough to read as a wipe.
const SWITCH_MS = 420;

const noopSubscribe = () => () => {};

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // "Have we hydrated yet?" without setState-in-effect, which triggers a
  // cascading render (react-hooks/set-state-in-effect). The server snapshot is
  // false and the client snapshot true, so the icon only renders post-hydration
  // and next-themes has resolved by then.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  const isDark = mounted && resolvedTheme === 'dark';

  const toggle = useCallback(async () => {
    const next = isDark ? 'light' : 'dark';
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const doc = document as ViewTransitionDocument;
    const button = buttonRef.current;

    if (reduced || !doc.startViewTransition || !button) {
      // Fallback only. The per-element cross-fade touches ~1100 nodes, so it is
      // reserved for browsers without View Transitions — running it alongside
      // the clip-path reveal made the swap visibly janky and the two fought.
      if (!reduced) {
        root.classList.add('theme-switching');
        window.setTimeout(() => root.classList.remove('theme-switching'), SWITCH_MS + 60);
      }
      setTheme(next);
      return;
    }

    // Expand the new theme out of the button itself.
    const { left, top, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Silence every per-element colour transition for the duration of the wipe.
    root.classList.add('theme-instant');

    const transition = doc.startViewTransition(() => {
      // startViewTransition snapshots after this callback, so the DOM has to
      // be updated synchronously here rather than on React's normal schedule.
      flushSync(() => setTheme(next));
    });

    await transition.ready;

    root.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
      },
      {
        duration: SWITCH_MS,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        pseudoElement: '::view-transition-new(root)',
      }
    ).finished.finally(() => root.classList.remove('theme-instant'));
  }, [isDark, setTheme]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border bg-background text-secondary transition-colors hover:border-primary/20 hover:text-primary active:scale-95"
    >
      {/* Rendered only after mount so the icon matches the resolved theme. */}
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
  );
};
