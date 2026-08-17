'use client';

import React, { useCallback, useEffect, useRef } from 'react';

/**
 * Charcoal cover with a cursor-tracked spotlight.
 *
 * Pointer position is written straight to CSS custom properties on the element
 * rather than React state — a mousemove-driven setState would re-render the
 * whole header on every frame. All the motion lives in CSS from there.
 */
export const CoverBanner = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const move = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    // Coalesce to one write per frame; pointermove can fire far faster.
    if (frame.current !== null) return;
    const { clientX, clientY } = e;

    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${((clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty('--my', `${((clientY - rect.top) / rect.height) * 100}%`);
      el.style.setProperty('--glow', '1');
    });
  }, []);

  const leave = useCallback(() => {
    ref.current?.style.setProperty('--glow', '0');
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    []
  );

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className="cover-banner relative h-52 overflow-hidden sm:h-64"
      style={{ ['--mx' as string]: '50%', ['--my' as string]: '45%', ['--glow' as string]: '0' }}
    >
      {/* charcoal base */}
      <div className="absolute inset-0 bg-[linear-gradient(150deg,#0c0c0e_0%,#141417_45%,#1b1b1f_100%)]" />

      {/* dot matrix, lifted only where the cursor is */}
      <div className="cover-grid absolute inset-0" />

      {/* the spotlight itself */}
      <div className="cover-glow absolute inset-0" />

      {/* vignette keeps the edges heavy so the panel reads as one solid mass */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.55)]" />

      <p className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-8 text-center font-display text-[20px] italic leading-snug text-white/90 sm:text-[24px]">
        {children}
      </p>
    </div>
  );
};
