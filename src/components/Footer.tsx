'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { Github, Linkedin, Facebook, Mail, FileText } from 'lucide-react';
import { IsometricBoard } from './IsometricBoard';

export const Footer = () => {
  const { personal } = portfolioData;

  return (
    <footer id="contact" className="bg-surface/30 pt-24 pb-12 px-6 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto relative">
          
          {/* Left Content Area */}
          <div className="text-center lg:text-left space-y-8 z-10 relative">
            <div className="space-y-4">
              <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase block mb-4">
                LET'S CONNECT
              </span>
              <p className="text-lg text-secondary max-w-md mx-auto lg:mx-0">
                Open to opportunities and collaborations. Feel free to reach out if you're interested in working together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
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

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
              <a href={personal.contact.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-xl text-secondary hover:text-accent transition-all hover:-translate-y-1">
                <Github size={24} />
              </a>
              <a href={personal.contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-xl text-secondary hover:text-accent transition-all hover:-translate-y-1">
                <Linkedin size={24} />
              </a>
              <a href={personal.contact.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-xl text-secondary hover:text-accent transition-all hover:-translate-y-1">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Right Animation Area */}
          <div className="relative flex justify-center items-center h-[400px]">
            <div className="absolute inset-0 scale-[1.2] lg:scale-[1.5] flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-500">
              <IsometricBoard />
            </div>
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
