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
            {portfolioData.certifications.map((cert, index) => {
              const content = (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 min-w-0">
                    {((cert as any).logo || cert.image) && (
                      <img
                        src={(cert as any).logo || cert.image}
                        alt={cert.issuer}
                        className="w-12 h-12 object-contain shrink-0 rounded-lg"
                      />
                    )}
                    <div className="space-y-1 min-w-0">
                      <h3 className={cn(
                        "text-lg md:text-xl font-bold text-primary transition-colors",
                        cert.link && "group-hover:text-accent"
                      )}>
                        {cert.title}
                      </h3>
                      <p className="text-secondary text-sm font-medium tracking-wide">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "flex items-center gap-4",
                    cert.link ? "opacity-0 group-hover:opacity-100 transition-opacity" : "opacity-100"
                  )}>
                    <span className="text-xs font-medium text-secondary/40">{cert.date}</span>
                    {cert.link && <ExternalLink size={18} className="text-accent" />}
                  </div>
                </div>
              );

              if (cert.link) {
                return (
                  <a 
                    key={index}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-surface/40 hover:bg-surface border border-border/50 hover:border-accent/30 rounded-2xl p-6 transition-all duration-300"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div 
                  key={index}
                  className="block bg-surface/40 border border-border/50 rounded-2xl p-6 transition-all duration-300"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer-like spacing */}
      <div className="py-20" />
    </main>
  );
}
