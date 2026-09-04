'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Mail, FileText, Building2, Send, Loader2, Calendar } from 'lucide-react';
import { portfolioData } from '@/data';
import { PillLink } from './Section';
import { BookingModal } from './BookingModal';

const { personal } = portfolioData;

const links = [
  { href: personal.contact.github, label: 'GitHub', Icon: Github },
  { href: personal.contact.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: `mailto:${personal.contact.email}`, label: 'Mail', Icon: Mail },
  { href: personal.contact.resume, label: 'Resume', Icon: FileText },
  { href: 'https://cdg-official.vercel.app', label: 'CDG', Icon: Building2 },
];

type FormState = { name: string; email: string; message: string; company: string };
type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export const ConnectFooter = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '', company: '' });
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isValid =
    form.name.trim() && form.email.trim() && form.message.trim();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      setForm({ name: '', email: '', message: '', company: '' });
    } catch {
      setSubmitState('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div id="contact">
      <div className="border-t border-border pt-10">
        <h2 className="text-[17px] font-medium text-muted tracking-tight">
          Get in touch
        </h2>
        <p className="mt-1 text-[17px] text-secondary">
          If you&apos;ve read this far, we should probably build something.
        </p>

        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-surface/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-[14.5px] font-semibold text-primary">Fast Track: Book a 15-Min Intro Call</h3>
            </div>
            <p className="mt-0.5 text-[12.5px] text-muted">
              Skip the email queue and pick a time directly on my calendar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsBookingOpen(true)}
            className="hover-lift flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-primary/25 bg-background px-3.5 py-2 text-[13.5px] font-medium text-primary shadow-xs transition-colors hover:border-primary/40 hover:bg-surface"
          >
            <Calendar size={15} />
            <span>Schedule time</span>
          </button>
        </div>

        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <span className="relative bg-background px-3 text-[12px] font-medium uppercase tracking-wider text-muted">
            Or drop a message
          </span>
        </div>

        {submitState === 'success' ? (
          <p
            // The form is replaced on success, so without a live region a
            // screen reader user gets no confirmation the send worked.
            role="status"
            aria-live="polite"
            className="mt-5 rounded-xl border border-border bg-surface px-4 py-3 text-[17px] text-primary"
          >
            Message sent — I&apos;ll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="relative mt-5 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-[14.5px] text-muted">Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-[17px] text-primary outline-none ring-primary/40 transition-colors placeholder:text-muted focus-visible:border-primary/40 focus-visible:ring-2"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[14.5px] text-muted">Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-[17px] text-primary outline-none ring-primary/40 transition-colors placeholder:text-muted focus-visible:border-primary/40 focus-visible:ring-2"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-[14.5px] text-muted">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                maxLength={5000}
                className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-[17px] text-primary outline-none ring-primary/40 transition-colors placeholder:text-muted focus-visible:border-primary/40 focus-visible:ring-2"
                placeholder="What are you building?"
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
              <p role="alert" className="text-[16px] text-secondary">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={!isValid || submitState === 'loading'}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-[16px] font-medium text-primary transition-colors hover:bg-surface hover:border-primary/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitState === 'loading' ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={17} />
                  Send message
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-[17px] font-medium text-muted tracking-tight">
          Let&apos;s connect
        </h2>
        <p className="mt-1 text-[17px] text-secondary">
          Find me across code, work, and everything in between.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {links.map(({ href, label, Icon }) => (
            <PillLink key={label} href={href}>
              <Icon size={17} className="text-secondary transition-colors group-hover:text-primary" />
              {label}
            </PillLink>
          ))}
        </div>
      </div>

      <p className="mt-12 border-t border-border pt-5 text-center text-[15px] text-muted">
        © {new Date().getFullYear()} {personal.name}.
      </p>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};
