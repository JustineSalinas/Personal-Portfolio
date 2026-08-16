import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data';
import { TopBar } from '@/components/profile/TopBar';

export default function CertificationsPage() {
  return (
    <main className="min-h-screen rail-hatch">
      <div className="mx-auto min-h-screen w-full max-w-[660px] border-x border-border bg-background">
        <TopBar />

        <div className="px-5 py-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-[12px] font-medium text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          <h1 className="mt-6 font-display text-[22px] font-semibold tracking-tight text-primary">
            All certifications
          </h1>
          <p className="mt-1 text-[13px] text-secondary">
            {portfolioData.certifications.length} credentials in AI, cloud, agile, and project
            management.
          </p>

          <div className="mt-6 rounded-xl border border-border bg-background px-3">
            {portfolioData.certifications.map((cert) => (
              <a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 border-b border-border py-3 last:border-b-0"
              >
                <img
                  src={cert.logo || cert.image}
                  alt={cert.issuer}
                  loading="lazy"
                  className="h-9 w-9 shrink-0 rounded-lg border border-border bg-surface object-contain p-1"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium leading-snug text-primary">
                    {cert.title}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] text-secondary">
                    {cert.issuer} · {cert.date}
                  </span>
                </span>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border text-muted transition-colors group-hover:border-primary/20 group-hover:text-primary">
                  <ArrowUpRight size={12} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
