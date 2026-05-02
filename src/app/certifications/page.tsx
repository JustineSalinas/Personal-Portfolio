'use client';

import React from 'react';
import { portfolioData } from '@/data';
import { cn } from '@/lib/utils';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { SubtleBackground } from '@/components/SubtleBackground';

export default function CertificationsPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <SubtleBackground />
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Navigation */}
        <div className="space-y-6 mb-16">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <span className="text-xl font-bold tracking-[0.3em] text-secondary/60 uppercase block">
            ALL CERTIFICATIONS
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-4">
            {portfolioData.certifications.map((cert, index) => (
              <a 
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-surface/40 hover:bg-surface border border-border/50 hover:border-accent/30 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-secondary font-medium tracking-wide">
                      {cert.issuer}
                    </p>
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-4">
                    <span className="text-xs font-medium text-secondary/40">{cert.date}</span>
                    <ExternalLink size={18} className="text-accent" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer-like spacing */}
      <div className="py-20" />
    </main>
  );
}
