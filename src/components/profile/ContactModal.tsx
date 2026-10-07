'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Send, X } from 'lucide-react';

type FormState = { name: string; email: string; message: string; company: string };
type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-[15px] text-primary outline-none transition-colors placeholder:text-muted-2 focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/30';

/**
 * Mounted only while open (the parent renders it conditionally), so every
 * opening starts with a fresh form. Posts to the existing /api/contact route,
 * including its hidden `company` honeypot field.
 */
export const ContactModal = ({ onClose }: { onClose: () => void }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '', company: '' });
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isValid = form.name.trim() && form.email.trim() && form.message.trim();

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    firstFieldRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      // Keep Tab / Shift+Tab inside the dialog while it is open.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([tabindex="-1"]):not([disabled]), textarea:not([disabled])'
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
      trigger?.focus();
    };
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (submitState === 'error') {
      setSubmitState('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitState === 'loading') return;

    setSubmitState('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setSubmitState('error');
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setSubmitState('success');
    } catch {
      setSubmitState('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        ref={panelRef}
        data-lenis-prevent
        className="relative z-10 w-full max-w-md overflow-hidden rounded-[26px] border border-border bg-background shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 px-6 pb-2 pt-5">
          <div>
            <h2 id="contact-title" className="text-[20px] font-medium text-primary">
              Contact
            </h2>
            <p className="mt-0.5 text-[14px] text-muted">
              Work with me, ask a question, or just say hi.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact form"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface hover:text-primary"
          >
            <X size={15} />
          </button>
        </div>

        {submitState === 'success' ? (
          <div className="px-6 pb-6 pt-4">
            <p
              role="status"
              aria-live="polite"
              className="rounded-xl border border-border bg-surface px-4 py-3 text-[15px] text-primary"
            >
              Message sent. I&apos;ll get back to you soon.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 flex h-10 items-center rounded-full border border-border-strong px-5 text-[14px] font-medium text-primary transition-colors hover:bg-surface"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative space-y-3 px-6 pb-6 pt-3">
            <label className="block">
              <span className="mb-1 block text-[13.5px] text-muted">Name</span>
              <input
                ref={firstFieldRef}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                maxLength={100}
                autoComplete="name"
                placeholder="Your name"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[13.5px] text-muted">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                maxLength={254}
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[13.5px] text-muted">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                maxLength={5000}
                placeholder="Tell me about your project, idea, or question"
                className={`${inputClass} resize-none`}
              />
            </label>

            {/* Honeypot: hidden from people, irresistible to bots. */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute h-0 w-0 overflow-hidden opacity-0"
            />

            {submitState === 'error' && errorMessage && (
              <p role="alert" className="text-[14.5px] text-secondary">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={!isValid || submitState === 'loading'}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitState === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Send message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
