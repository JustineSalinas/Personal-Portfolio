'use client';

import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Calendar, Loader2, Check, Copy } from 'lucide-react';
import { portfolioData } from '@/data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bookingUrl = portfolioData.personal.contact.calLink || 'https://cal.com/adriansalinas/15min',
}) => {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset loading state when opened
  useEffect(() => {
    if (isOpen) {
      setIframeLoading(true);
    }
  }, [isOpen]);

  const copyBookingLink = async () => {
    try {
      await navigator.clipboard.writeText(bookingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative z-10 flex h-[90vh] max-h-[720px] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5 bg-surface/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-primary">
              <Calendar size={16} />
            </div>
            <div>
              <h2 id="booking-modal-title" className="text-[15px] font-semibold text-primary">
                Schedule a 15-min Call
              </h2>
              <p className="text-[12px] text-muted">
                Pick a convenient time with {portfolioData.personal.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={copyBookingLink}
              title="Copy booking link"
              className="hover-lift flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-[12px] font-medium text-secondary hover:text-primary"
            >
              {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy link'}</span>
            </button>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in new tab"
              className="hover-lift flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-secondary hover:text-primary"
            >
              <ExternalLink size={14} />
            </a>
            <button
              onClick={onClose}
              title="Close modal"
              className="hover-lift flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-secondary hover:text-primary"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Calendar Content / Iframe */}
        <div className="relative flex-1 bg-surface">
          {iframeLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-surface text-secondary">
              <Loader2 size={24} className="animate-spin text-primary" />
              <p className="text-[13px] text-muted">Loading calendar availability...</p>
            </div>
          )}

          <iframe
            src={bookingUrl}
            title="Book a meeting"
            onLoad={() => setIframeLoading(false)}
            className="h-full w-full border-0"
            allow="camera; microphone; autoplay; fullscreen"
          />
        </div>

        {/* Footer fallback info */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-background px-5 py-2.5 text-[12px] text-muted">
          <span>Powered by Cal.com / Calendly</span>
          <span className="flex items-center gap-1.5">
            Having trouble?{' '}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link font-medium underline underline-offset-2"
            >
              Open direct booking page →
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
