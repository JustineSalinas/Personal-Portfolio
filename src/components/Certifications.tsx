'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data';
import { useIsVisible } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { ExternalLink, X, Award, ShieldCheck, Calendar, FileCheck, Cpu } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export const Certifications = () => {
  const { ref, isVisible } = useIsVisible<HTMLDivElement>();
  const [selectedCert, setSelectedCert] = useState<typeof portfolioData.certifications[0] | null>(null);

  const hasCertificateImage = (imagePath?: string) => {
    if (!imagePath) return false;
    return imagePath.includes('advanced-scrum') || imagePath.includes('aws-ai-practitioner') || imagePath.includes('ibm-llm') || imagePath.includes('ragcert');
  };

  return (
    <div
      id="certifications"
      ref={ref}
      className={cn(
        'space-y-8 transition-all duration-1000',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      <div className="flex justify-between items-center gap-4 pb-4 border-b border-border/40">
        <div className="flex items-center gap-4 min-w-0">
          <span className="section-label shrink-0">06 — Certifications</span>
        </div>
        <Link
          href="/certifications"
          className="text-xs font-mono text-secondary/60 hover:text-accent transition-colors flex items-center gap-1 group tracking-wider shrink-0 whitespace-nowrap"
        >
          View All
          <span className="group-hover:translate-x-0.5 transition-transform inline-block">›</span>
        </Link>
      </div>

      <div className="space-y-3">
        {portfolioData.certifications.map((cert, index) => {
          return (
            <div
              key={index}
              onClick={() => setSelectedCert(cert)}
              className="group block bg-surface/30 hover:bg-surface border border-border/40 hover:border-accent/25 rounded-2xl p-4 transition-all duration-300 cursor-pointer select-none"
            >
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  {(cert as any).logo || cert.image ? (
                    <img
                      src={(cert as any).logo || cert.image}
                      alt={cert.issuer}
                      className="w-10 h-10 object-contain shrink-0 rounded-lg"
                    />
                  ) : (
                    <Award size={20} className="text-accent shrink-0" />
                  )}
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="text-xs md:text-sm font-bold text-primary transition-colors truncate group-hover:text-accent">
                      {cert.title}
                    </h3>
                    <p className="text-[10px] font-mono text-secondary/55 tracking-wide flex items-center gap-2">
                      {cert.issuer}
                      <span className="text-border">·</span>
                      <span className="text-accent/60">{cert.date}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono text-secondary/40 tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Verify
                  </span>
                  <ExternalLink
                    size={14}
                    className="text-secondary/30 group-hover:text-accent transition-colors flex-shrink-0"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg bg-background border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/70 via-accent/30 to-transparent" />

              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-secondary/40 hover:text-primary hover:bg-surface/80 transition-colors z-20"
                aria-label="Close credentials preview"
              >
                <X size={16} />
              </button>

              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-2.5">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-accent/8 border border-accent/15 text-[8px] font-mono text-accent uppercase tracking-widest font-bold">
                    Verified Credential
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-primary leading-snug">
                    {selectedCert.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2.5 text-xs text-secondary/70">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wide uppercase">
                      <Award size={13} className="text-secondary/50" />
                      <span>{selectedCert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wide uppercase">
                      <Calendar size={13} className="text-secondary/50" />
                      <span>Issued {selectedCert.date}</span>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-[4/3] w-full rounded-2xl border border-border/30 bg-surface/50 overflow-hidden flex items-center justify-center p-4">
                  {hasCertificateImage(selectedCert.image) ? (
                    <img
                      src={selectedCert.image}
                      alt={`Certificate for ${selectedCert.title}`}
                      className="max-w-full max-h-full object-contain rounded shadow-sm"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-accent/5 border border-accent/10 flex items-center justify-center text-accent">
                        <FileCheck size={28} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-primary">Certificate Verification Online</p>
                        <p className="text-[10px] text-secondary/60 max-w-xs font-light">
                          This credential is fully verified on the issuer's secure registry database platform.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {selectedCert.link && (
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setSelectedCert(null)}
                      className="px-5 py-2.5 bg-surface text-secondary hover:text-primary rounded-xl text-xs font-mono tracking-wider uppercase border border-border/60 hover:border-accent/30 transition-all"
                    >
                      Close
                    </button>
                    <a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-background rounded-xl text-xs font-mono tracking-wider uppercase inline-flex items-center gap-1.5 transition-all shadow-sm shadow-accent/20"
                    >
                      Verify Online
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
