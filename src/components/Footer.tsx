'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

export const Footer = () => {
  const { personal } = portfolioData;

  return (
    <footer id="contact" className="bg-surface/30 pt-24 pb-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
              Let's Connect
            </h2>
            <p className="text-lg text-secondary">
              Open to opportunities and collaborations. Feel free to reach out if you're interested in working together or just want to say hi!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={`mailto:${personal.contact.email}`}
              className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-hover text-background rounded-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Mail size={20} /> Email Me
            </a>
            <a 
              href={personal.contact.resume}
              className="w-full sm:w-auto px-8 py-4 border border-border hover:bg-surface text-primary rounded-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <FileText size={20} /> Download Resume
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4">
            <a href={personal.contact.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-xl text-secondary hover:text-accent transition-all hover:-translate-y-1">
              <Github size={24} />
            </a>
            <a href={personal.contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-xl text-secondary hover:text-accent transition-all hover:-translate-y-1">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        <div className="pt-12 border-t border-border flex justify-center items-center">
          <p className="text-secondary text-sm text-center">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
