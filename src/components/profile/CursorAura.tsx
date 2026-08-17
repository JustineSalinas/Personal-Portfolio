'use client';

import React, { useEffect, useRef } from 'react';

/**
 * A large soft light that trails the pointer across the page.
 *
 * It sits behind the reading column, so it is only ever visible in the rails —
 * it can never sit behind body text and undo the contrast work. Position is
 * eased toward the cursor rather than snapped, which is what makes it read as
 * a light gliding rather than a div teleporting.
 *
 * The rAF loop only runs while the light is still catching up and stops once it
 * settles, so an idle page costs nothing.
 */
export const CursorAura = () => {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const running = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Touch devices have no cursor to follow; leave the rails plain.
    if (window.matchMedia('(hover: none)').matches) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = () => {
      const c = current.current;
      const t = target.current;
      // Ease toward the pointer; 0.12 is slow enough to trail visibly.
      c.x += (t.x - c.x) * 0.12;
      c.y += (t.y - c.y) * 0.12;

      el.style.setProperty('--ax', `${c.x}px`);
      el.style.setProperty('--ay', `${c.y}px`);

      if (Math.hypot(t.x - c.x, t.y - c.y) > 0.5) {
        requestAnimationFrame(tick);
      } else {
        running.current = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      el.style.setProperty('--aura-opacity', '1');

      if (reduced) {
        current.current = { ...target.current };
        el.style.setProperty('--ax', `${e.clientX}px`);
        el.style.setProperty('--ay', `${e.clientY}px`);
        return;
      }

      if (!running.current) {
        running.current = true;
        requestAnimationFrame(tick);
      }
    };

    const onLeave = () => el.style.setProperty('--aura-opacity', '0');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor-aura" aria-hidden="true" />;
};
