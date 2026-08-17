import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data';
import { TopBar } from '@/components/profile/TopBar';
import { isSvg } from '@/lib/utils';

export default function CertificationsPage() {
  return (
    <main className="min-h-screen rail-hatch">
      <div className="mx-auto min-h-screen w-full max-w-[880px] border-x border-border bg-background">
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
            All certifications
          </h1>
          <p className="mt-1 text-[17px] text-secondary">
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
                <Image
                  src={cert.logo || cert.image}
                  alt={cert.issuer}
                  width={48}
                  height={48}
                  unoptimized={isSvg(cert.logo || cert.image)}
                  className="h-12 w-12 shrink-0 rounded-lg border border-border bg-surface object-contain p-1"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[17px] font-medium leading-snug text-primary">
                    {cert.title}
                  </span>
                  <span className="mt-0.5 block text-[15px] text-secondary">
                    {cert.issuer} · {cert.date}
                  </span>
                </span>
                <span className="hover-arrow flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-muted group-hover:border-primary/25 group-hover:text-primary">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
