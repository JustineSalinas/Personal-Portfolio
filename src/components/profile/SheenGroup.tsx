'use client';

import React, { useCallback, useRef } from 'react';

/**
 * Delegated pointer tracking for a collection of `.peek-item` cards.
 *
 * One listener on the container writes `--cx` / `--cy` to whichever card the
 * cursor is over, so `.peek-card::after` can render a sheen that follows it —
 * the same language as the cover spotlight. Delegation keeps this to a single
 * handler no matter how many cards there are, and writing CSS variables avoids
 * re-rendering React on every frame.
 */
export const SheenGroup = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const frame = useRef<number | null>(null);

  const move = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (frame.current !== null) return;
    const target = e.target as HTMLElement;
    const { clientX, clientY } = e;

    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const card = target.closest<HTMLElement>('.peek-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--cx', `${clientX - rect.left}px`);
      card.style.setProperty('--cy', `${clientY - rect.top}px`);
    });
  }, []);

  return (
    <div className={className} onPointerMove={move}>
      {children}
    </div>
  );
};
