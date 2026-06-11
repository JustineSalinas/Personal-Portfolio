'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { Github, Linkedin, Facebook, Mail, FileText, Instagram } from 'lucide-react';

export const Footer = () => {
  const { personal } = portfolioData;

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

          <h2
            className="font-display italic font-light text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
          >
            Let&apos;s work
          </h2>
          <h2
            className="font-display italic font-light text-accent leading-tight mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
          >
            together.
          </h2>
          <p className="text-secondary text-base max-w-sm mx-auto leading-relaxed">
            Open to opportunities and collaborations. Feel free to reach out anytime.
          </p>
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
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              download={(item as any).download}
              className="group p-5 bg-surface/40 border border-border/50 rounded-xl flex items-center gap-4 hover:border-accent/40 hover:bg-accent/[0.03] transition-all hover:-translate-y-0.5"
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
            </a>
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
