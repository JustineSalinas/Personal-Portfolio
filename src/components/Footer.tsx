'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data';
import { Github, Linkedin, Facebook, Mail, FileText, Instagram, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Footer = () => {
  const { personal } = portfolioData;

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Message from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${personal.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  const isValid = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <footer id="contact" className="pt-28 pb-12 px-6 border-t border-border/50 overflow-hidden relative">
      {/* Ambient amber glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-accent/[0.06] blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Big editorial heading */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="editorial-rule flex-1 max-w-[120px]" />
            <span className="section-label">08 — Contact</span>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-accent/50 via-accent/15 to-transparent" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', damping: 20 }}
            className="font-display italic font-light text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
          >
            Let&apos;s work
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, type: 'spring', damping: 20 }}
            className="font-display italic font-light text-accent leading-tight mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
          >
            together.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-secondary text-base max-w-sm mx-auto leading-relaxed"
          >
            Open to opportunities and collaborations. Feel free to reach out anytime.
          </motion.p>
        </div>

        {/* Contact form */}
        <div className="max-w-xl mx-auto mb-14">
          <div className="relative bg-surface/40 border border-border/60 rounded-2xl p-8 overflow-hidden">
            {/* Corner accent lines */}
            <div className="absolute top-0 left-0 w-20 h-0.5 bg-gradient-to-r from-accent/60 to-transparent" />
            <div className="absolute top-0 left-0 w-0.5 h-20 bg-gradient-to-b from-accent/60 to-transparent" />

            <div className="flex items-center gap-3 mb-7">
              <span className="section-label">Send a message</span>
              <div className="editorial-rule flex-1" />
            </div>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <CheckCircle2 size={22} />
                  </div>
                  <p className="font-display italic font-light text-primary text-2xl">Message ready!</p>
                  <p className="text-sm text-secondary">
                    Your mail client opened with the message pre-filled.
                    <br />Just hit send.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="section-label">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder=""
                        required
                        className="bg-transparent border border-border/60 rounded-lg px-4 py-3 text-sm text-primary placeholder:text-secondary/35 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all font-sans"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="section-label">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder=""
                        required
                        className="bg-transparent border border-border/60 rounded-lg px-4 py-3 text-sm text-primary placeholder:text-secondary/35 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="section-label">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder=""
                      required
                      rows={5}
                      className="bg-transparent border border-border/60 rounded-lg px-4 py-3 text-sm text-primary placeholder:text-secondary/35 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isValid}
                    className="mt-1 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-accent text-background rounded-lg font-mono text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-all duration-300 shadow-sm shadow-accent/20 disabled:opacity-40 disabled:cursor-not-allowed group"
                  >
                    <Send size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    Send Message
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-12">
          {[
            {
              href: `mailto:${personal.contact.email}`,
              icon: <Mail size={18} />,
              label: 'Email',
              value: personal.contact.email,
              truncate: true,
            },
            {
              href: personal.contact.linkedin,
              icon: <Linkedin size={18} />,
              label: 'LinkedIn',
              value: 'View Profile ↗',
              external: true,
            },
            {
              href: personal.contact.github,
              icon: <Github size={18} />,
              label: 'GitHub',
              value: 'View Projects ↗',
              external: true,
            },
            {
              href: personal.contact.resume,
              icon: <FileText size={18} />,
              label: 'Resume',
              value: 'Download PDF ↗',
              external: true,
              download: 'Adrian_Salinas_Resume.pdf',
            },
          ].map((item, idx) => (
            <motion.a
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ y: -3, scale: 1.01 }}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              download={(item as any).download}
              className="group p-5 bg-surface/40 border border-border/50 rounded-xl flex items-center gap-4 hover:border-accent/40 hover:bg-accent/[0.03] transition-all cursor-pointer"
            >
              <div className="p-2.5 bg-accent/8 border border-accent/15 rounded-xl flex-shrink-0 text-accent/60 group-hover:text-accent transition-colors">
                {item.icon}
              </div>
              <div className="text-left min-w-0">
                <p className="section-label mb-0.5">{item.label}</p>
                <p
                  className={cn(
                    'text-sm font-medium text-secondary group-hover:text-primary transition-colors',
                    item.truncate ? 'truncate' : ''
                  )}
                >
                  {item.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <a
            href={personal.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-surface/40 border border-border/50 rounded-xl text-secondary/60 hover:text-[#1877F2] hover:border-[#1877F2]/20 transition-all hover:-translate-y-1"
          >
            <Facebook size={18} />
          </a>
          <a
            href={personal.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-surface/40 border border-border/50 rounded-xl text-secondary/60 hover:text-[#E4405F] hover:border-[#E4405F]/20 transition-all hover:-translate-y-1"
          >
            <Instagram size={18} />
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/40 text-center">
          <p className="text-[11px] font-mono text-secondary/35 tracking-wider">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
