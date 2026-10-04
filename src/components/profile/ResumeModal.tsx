'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, Download, ExternalLink, FileText, ZoomIn, ZoomOut } from 'lucide-react';
import { portfolioData } from '@/data';

const { personal } = portfolioData;
const FILE = personal.contact.resumeFile ?? '/ajsalinas-resume.pdf';

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;
/** Widest the document column ever gets at 100%, matching Tailwind's max-w-2xl. */
const MAX_BASE_WIDTH = 42 * 16;
/** Rendered width below which this resume's body text stops being legible. */
const LEGIBLE_WIDTH = 780;
/** Panels narrower than this are phone-sized and open zoomed to fit legible text. */
const FIT_ON_OPEN_BELOW = 600;

const PAGES = [
  { src: '/resume-page-1.webp', label: 'Page 1: Summary, Education & Experience' },
  { src: '/resume-page-2.webp', label: 'Page 2: Projects, Skills & Certifications' },
];

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);
  // Width the document occupies at 100%. Measured rather than assumed, so a
  // zoom step is the same proportional change on a phone as on a desktop.
  const [baseWidth, setBaseWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const didFit = useRef(false);

  const clamp = (v: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v));

  useEffect(() => {
    if (!isOpen) {
      didFit.current = false;
      return;
    }
    const measure = () => {
      const el = scrollRef.current;
      if (!el) return;
      const s = getComputedStyle(el);
      const inner = el.clientWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight);
      const base = Math.min(inner, MAX_BASE_WIDTH);
      setBaseWidth(base);
      // On a phone the page would open too small to read, so open it fitted to
      // legible text instead and let the reader pan.
      if (!didFit.current) {
        didFit.current = true;
        setZoom(base < FIT_ON_OPEN_BELOW ? clamp(LEGIBLE_WIDTH / base) : 1);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [isOpen]);

  // Escape to close, trap Tab inside the dialog, and lock the page behind it.
  useEffect(() => {
    if (!isOpen) return;

    // Nothing moves focus into the dialog on its own — without this a
    // keyboard user tabbing after opening it just keeps walking the (visually
    // covered) page behind it and can never reach the dialog's own controls.
    triggerRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
    >
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        ref={panelRef}
        className="relative z-10 flex h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border bg-surface/50 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-primary">
              <FileText size={16} />
            </div>
            <div>
              <h2 id="resume-modal-title" className="text-[15px] font-semibold text-primary">
                Resume
              </h2>
              {/* Wraps to three lines on a phone and doubles the header height. */}
              <p className="hidden text-[12px] text-muted sm:block">
                {personal.name} · 2 pages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex h-8 items-center rounded-lg border border-border bg-background">
              <button
                onClick={() => setZoom((z) => clamp(z - ZOOM_STEP))}
                disabled={zoom <= MIN_ZOOM}
                aria-label="Zoom out"
                title="Zoom out"
                className="flex h-8 w-8 items-center justify-center rounded-l-lg text-secondary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ZoomOut size={14} />
              </button>
              <button
                onClick={() => setZoom(1)}
                title="Reset zoom"
                className="w-11 text-center font-mono text-[11px] tabular-nums text-muted hover:text-primary"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={() => setZoom((z) => clamp(z + ZOOM_STEP))}
                disabled={zoom >= MAX_ZOOM}
                aria-label="Zoom in"
                title="Zoom in"
                className="flex h-8 w-8 items-center justify-center rounded-r-lg text-secondary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ZoomIn size={14} />
              </button>
            </div>
            <a
              href={FILE}
              target="_blank"
              rel="noopener noreferrer"
              title="Open the raw PDF"
              className="hover-lift hidden h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-secondary hover:text-primary sm:flex"
            >
              <ExternalLink size={14} />
            </a>
            <a
              href={FILE}
              download
              title="Download PDF"
              className="hover-lift flex h-8 items-center gap-1.5 rounded-lg bg-accent px-2.5 text-[12px] font-medium text-background"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              title="Close"
              className="hover-lift flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-secondary hover:text-primary"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          data-lenis-prevent
          className="flex-1 overflow-auto overscroll-contain bg-surface px-4 py-5 sm:px-6"
        >
          {/* Zooming past the panel width overflows right and pans horizontally;
              `mx-auto` resolves to 0 once there is no free space, so nothing clips. */}
          <div
            className="mx-auto space-y-6"
            style={{ width: baseWidth ? baseWidth * zoom : '100%' }}
          >
            {PAGES.map((page, i) => (
              <figure key={page.src}>
                <figcaption className="mb-2 font-mono text-[12px] text-muted">
                  {page.label}
                </figcaption>
                <div className="overflow-hidden rounded-xl border border-border bg-white shadow-lg shadow-black/10 dark:shadow-black/50">
                  <Image
                    src={page.src}
                    alt={`${personal.name} resume, ${page.label}`}
                    width={2125}
                    height={2750}
                    priority={i === 0}
                    className="block h-auto w-full select-none"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
