'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export interface Slide {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

const INTERVAL_MS = 5000;
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

const subscribeReducedMotion = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

export const PhotoCarousel = ({ slides }: { slides: Slide[] }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
  const last = slides.length - 1;
  const go = (i: number) => setIndex(i < 0 ? last : i > last ? 0 : i);
  const current = slides[index];

  const playing = !paused && !hovering && !reducedMotion;

  // Re-arms on every slide change, so a manual click restarts the full interval.
  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setIndex((i) => (i >= last ? 0 : i + 1)), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [playing, index, last]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Photos of Adrian"
      className="mt-10"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(index - 1);
        if (e.key === 'ArrowRight') go(index + 1);
      }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={s.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={i !== index}
              className="relative h-[540px] w-full shrink-0 overflow-hidden"
            >
              {/* Soft blurred copy behind the photo, so a portrait shot never
                  sits in empty gray bars. Decorative, so hidden from screen readers. */}
              <Image
                src={s.src}
                alt=""
                aria-hidden="true"
                fill
                sizes="150px"
                className="scale-125 object-cover opacity-60 blur-2xl"
              />
              {/* object-contain: the whole photo is always visible, never cropped or zoomed. */}
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 640px) 592px, 100vw"
                className="object-contain"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-primary shadow-sm backdrop-blur transition-colors hover:bg-background"
        >
          <ChevronLeft size={18} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-primary shadow-sm backdrop-blur transition-colors hover:bg-background"
        >
          <ChevronRight size={18} strokeWidth={1.75} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-6">
        <div aria-live={playing ? 'off' : 'polite'} className="min-w-0">
          <p className="text-[15px] font-medium text-primary">{current.title}</p>
          <p className="mt-0.5 text-[14px] text-muted">{current.caption}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose photo">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show photo ${i + 1}: ${s.title}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-5 bg-primary' : 'w-1.5 bg-border-strong hover:bg-muted'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-primary"
          >
            {paused ? <Play size={13} strokeWidth={1.75} /> : <Pause size={13} strokeWidth={1.75} />}
          </button>
        </div>
      </div>
    </section>
  );
};
