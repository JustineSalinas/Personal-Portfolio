'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const noopSubscribe = () => () => {};

// Same easing used for the accordion reveals elsewhere on the site (e.g.
// ExperienceList), so the brand mark's entrance feels like part of one system.
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Center-out clip-path wipe — the same wipe language the theme toggle uses
// for its View Transitions cross-fade, so the mark's entrance reads as part
// of the same motion system rather than a generic fade-in.
const revealVariants = {
  hidden: { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0, scale: 0.94 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: EASE },
  },
};

// prefers-reduced-motion fallback: a plain fade, no clip-path or scale.
const reducedRevealVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

/**
 * A full-screen "AJ" mark shown once per real page load (hard navigation or
 * refresh) — mounted in the root layout, so a client-side route change
 * between pages does not remount it and does not retrigger it.
 *
 * Rendered visible on the server too, so slow connections see the mark
 * immediately instead of a flash of unstyled content — but that means a
 * visitor with JavaScript disabled would otherwise be stuck looking at a
 * black screen forever, since only client JS ever dismisses it. The
 * <noscript> stylesheet below is the escape hatch for that case.
 */
export const Preloader = () => {
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  // Read synchronously rather than via setState-in-effect (server snapshot
  // assumes motion is fine; the client snapshot resolves the real value
  // before the entrance transition's variants are picked).
  const reducedMotion = useSyncExternalStore(
    noopSubscribe,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const holdMs = reducedMotion ? 380 : 1220;
    const timer = window.setTimeout(() => setExiting(true), holdMs);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  if (gone) return null;

  return (
    <>
      <noscript>
        <style>{'#site-preloader{display:none !important}'}</style>
      </noscript>

      <AnimatePresence
        onExitComplete={() => {
          document.body.style.overflow = '';
          setGone(true);
        }}
      >
        {!exiting && (
          <motion.div
            id="site-preloader"
            key="preloader"
            aria-hidden="true"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-page"
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial="hidden"
                animate="show"
                variants={reducedMotion ? reducedRevealVariants : revealVariants}
                className="font-display text-[15vw] italic leading-none text-primary sm:text-[96px]"
              >
                AJ
              </motion.div>

              {/* A thin accent rule draws in under the mark once the wipe
                  lands, reinforcing this as a "loading" cue rather than just
                  a logo appearing. Skipped under reduced motion. */}
              {!reducedMotion && (
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.45, delay: 0.55, ease: EASE }}
                  style={{ transformOrigin: 'left' }}
                  className="mt-3 h-[2px] w-32 bg-accent sm:w-44"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
