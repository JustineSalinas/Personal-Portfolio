'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data';
import { TopBar } from '@/components/profile/TopBar';
import { CursorAura } from '@/components/profile/CursorAura';
import { isSvg } from '@/lib/utils';

export default function CertificationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories preserving logical order
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    portfolioData.certifications.forEach((cert) => {
      cert.categories?.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });

    // Preferred order for prominent categories
    const preferredOrder = [
      'AI & ML',
      'Cloud & AWS',
      'Hackathon Wins',
      'Community Leadership',
      'Microcredential',
      'Course Certificate',
      'Agile & Scrum',
      'Project Management',
      'IT Operations',
    ];
    const otherCats = Object.keys(counts).filter((c) => !preferredOrder.includes(c));
    const sortedCats = preferredOrder.filter((c) => counts[c] > 0).concat(otherCats);

    return [
      { name: 'All', count: portfolioData.certifications.length },
      ...sortedCats.map((cat) => ({ name: cat, count: counts[cat] })),
    ];
  }, []);

  const filteredCerts = useMemo(() => {
    if (selectedCategory === 'All') return portfolioData.certifications;
    return portfolioData.certifications.filter((cert) =>
      cert.categories?.includes(selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <main className="relative min-h-screen rail-hatch">
      <CursorAura />
      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[880px] border-x border-border bg-background">
        <TopBar />

        <div className="px-7 py-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-[16px] font-medium text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          <h1 className="mt-6 font-display text-[29px] font-semibold tracking-tight text-primary">
            All certifications & credentials
          </h1>
          <p className="mt-1 text-[17px] text-secondary">
            {portfolioData.certifications.length} credentials in AI, cloud, hackathon awards, community leadership, and project management.
          </p>

          {/* Category Filter Bar */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13.5px] font-medium transition-all ${
                    isActive
                      ? 'border-primary/40 bg-primary text-background shadow-sm'
                      : 'border-border bg-surface text-secondary hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[11px] font-semibold ${
                      isActive
                        ? 'bg-background/20 text-background'
                        : 'bg-background text-muted'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Certifications List */}
          <div className="mt-6 rounded-xl border border-border bg-background px-3">
            {filteredCerts.length > 0 ? (
              filteredCerts.map((cert) => (
                <a
                  key={cert.title}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start sm:items-center gap-3 border-b border-border py-3.5 last:border-b-0 transition-colors hover:bg-surface/50 -mx-3 px-3 rounded-lg"
                >
                  <Image
                    src={cert.logo || cert.image}
                    alt={cert.issuer}
                    width={48}
                    height={48}
                    unoptimized={isSvg(cert.logo || cert.image)}
                    className="h-12 w-12 shrink-0 rounded-lg border border-border bg-surface object-contain p-1"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <span className="block text-[17px] font-medium leading-snug text-primary">
                        {cert.title}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[14.5px] text-secondary">
                      <span>
                        {cert.issuer} · {cert.date}
                      </span>
                      {cert.categories && cert.categories.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {cert.categories.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedCategory(c);
                              }}
                              className={`rounded-md border px-2 py-0.5 text-[11px] font-medium transition-colors ${
                                selectedCategory === c
                                  ? 'border-primary/50 bg-primary/10 text-primary font-semibold'
                                  : 'border-border/80 bg-surface text-muted hover:border-primary/30 hover:text-primary'
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="hover-arrow flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-muted group-hover:border-primary/25 group-hover:text-primary self-center">
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              ))
            ) : (
              <div className="py-12 text-center text-secondary">
                <p className="text-[16px]">No certifications found in this category.</p>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="mt-3 text-[14px] font-medium text-primary hover:underline"
                >
                  Show all certifications
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
