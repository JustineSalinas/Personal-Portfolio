'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { Github, Linkedin, Facebook, Mail, FileText, Instagram } from 'lucide-react';

export const Footer = () => {
  const { personal } = portfolioData;

  return (
    <footer
      id="contact"
      className="pt-24 pb-12 px-6 border-t border-border overflow-hidden"
    >
      <div className="max-w-3xl mx-auto space-y-14 text-center">

        {/* Heading */}
        <div className="space-y-5">
          <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase block">
            CONTACT ME
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-primary tracking-tight">
            Let&apos;s work together
          </h2>
          <p className="text-lg text-secondary max-w-sm mx-auto">
            Open to opportunities and collaborations. Feel free to reach out anytime.
          </p>
        </div>

        {/* Contact cards grid */}
        <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
          {/* Email */}
          <a
            href={`mailto:${personal.contact.email}`}
            className="group p-5 bg-white dark:bg-black border border-black/10 dark:border-[rgba(255,255,255,0.14)] rounded-[18px] flex items-center gap-4 hover:border-black/20 dark:hover:border-[rgba(255,255,255,0.28)] transition-all hover:-translate-y-0.5"
          >
            <div className="p-2.5 bg-black/5 dark:bg-white/5 rounded-xl flex-shrink-0">
              <Mail size={20} className="text-secondary group-hover:text-primary transition-colors" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-[10px] font-semibold text-secondary/60 uppercase tracking-widest mb-0.5">
                Email
              </p>
              <p className="text-sm font-medium text-secondary group-hover:text-primary transition-colors truncate">
                {personal.contact.email}
              </p>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={personal.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 bg-white dark:bg-black border border-black/10 dark:border-[rgba(255,255,255,0.14)] rounded-[18px] flex items-center gap-4 hover:border-black/20 dark:hover:border-[rgba(255,255,255,0.28)] transition-all hover:-translate-y-0.5"
          >
            <div className="p-2.5 bg-black/5 dark:bg-white/5 rounded-xl flex-shrink-0">
              <Linkedin size={20} className="text-secondary group-hover:text-primary transition-colors" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-semibold text-secondary/60 uppercase tracking-widest mb-0.5">
                LinkedIn
              </p>
              <p className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                View Profile ↗
              </p>
            </div>
          </a>

          {/* GitHub */}
          <a
            href={personal.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 bg-white dark:bg-black border border-black/10 dark:border-[rgba(255,255,255,0.14)] rounded-[18px] flex items-center gap-4 hover:border-black/20 dark:hover:border-[rgba(255,255,255,0.28)] transition-all hover:-translate-y-0.5"
          >
            <div className="p-2.5 bg-black/5 dark:bg-white/5 rounded-xl flex-shrink-0">
              <Github size={20} className="text-secondary group-hover:text-primary transition-colors" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-semibold text-secondary/60 uppercase tracking-widest mb-0.5">
                GitHub
              </p>
              <p className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                View Projects ↗
              </p>
            </div>
          </a>

          {/* Resume */}
          <a
            href={personal.contact.resume}
            className="group p-5 bg-white dark:bg-black border border-black/10 dark:border-[rgba(255,255,255,0.14)] rounded-[18px] flex items-center gap-4 hover:border-black/20 dark:hover:border-[rgba(255,255,255,0.28)] transition-all hover:-translate-y-0.5"
          >
            <div className="p-2.5 bg-black/5 dark:bg-white/5 rounded-xl flex-shrink-0">
              <FileText size={20} className="text-secondary group-hover:text-primary transition-colors" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-semibold text-secondary/60 uppercase tracking-widest mb-0.5">
                Resume
              </p>
              <p className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                Download PDF ↗
              </p>
            </div>
          </a>
        </div>

        {/* Social icon row */}
        <div className="flex items-center justify-center gap-3">
          <a
            href={personal.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white dark:bg-black border border-black/10 dark:border-[rgba(255,255,255,0.14)] rounded-xl text-secondary hover:text-[#1877F2] hover:border-[#1877F2]/20 transition-all hover:-translate-y-1"
          >
            <Facebook size={20} />
          </a>
          <a
            href={personal.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white dark:bg-black border border-black/10 dark:border-[rgba(255,255,255,0.14)] rounded-xl text-secondary hover:text-[#E4405F] hover:border-[#E4405F]/20 transition-all hover:-translate-y-1"
          >
            <Instagram size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border">
          <p className="text-secondary text-sm text-center">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
