'use client';

import React, { useState } from 'react';
import { Download, ExternalLink, Printer, Check, Copy } from 'lucide-react';

interface ResumeActionsProps {
  pdfUrl: string;
}

export const ResumeActions: React.FC<ResumeActionsProps> = ({ pdfUrl }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const scrollToPage = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="no-print mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-border/70 py-3.5">
      {/* Quick Jump Buttons */}
      <div className="flex items-center gap-1.5 text-[14px]">
        <span className="mr-1 hidden font-mono text-[13px] text-muted sm:inline-block">Jump to:</span>
        <button
          type="button"
          onClick={() => scrollToPage('page-1')}
          className="hover-lift inline-flex items-center rounded-md border border-border bg-surface px-2.5 py-1 text-[13px] font-medium text-secondary hover:border-primary/40 hover:text-primary transition-colors"
        >
          Page 1
        </button>
        <button
          type="button"
          onClick={() => scrollToPage('page-2')}
          className="hover-lift inline-flex items-center rounded-md border border-border bg-surface px-2.5 py-1 text-[13px] font-medium text-secondary hover:border-primary/40 hover:text-primary transition-colors"
        >
          Page 2
        </button>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleCopyLink}
          className="hover-lift inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-[14px] font-medium text-secondary hover:border-primary/30 hover:text-primary transition-colors"
          title="Copy resume link"
        >
          {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
          <span>{copied ? 'Copied' : 'Share'}</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="hover-lift inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-[14px] font-medium text-primary hover:border-primary/30 hover:bg-surface transition-colors"
          title="Print or save as PDF"
        >
          <Printer size={15} className="text-secondary" />
          <span>Print</span>
        </button>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-lift inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-[14px] font-medium text-primary hover:border-primary/30 hover:bg-surface transition-colors"
          title="Open raw PDF file"
        >
          <ExternalLink size={15} className="text-secondary" />
          <span className="hidden sm:inline">Raw PDF</span>
        </a>

        <a
          href={pdfUrl}
          download
          className="cta-solid hover-lift group relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-accent px-3 py-1.5 text-[14px] font-medium text-background"
          title="Download original PDF"
        >
          <Download size={15} className="relative z-10" />
          <span className="relative z-10">Download PDF</span>
        </a>
      </div>
    </div>
  );
};
