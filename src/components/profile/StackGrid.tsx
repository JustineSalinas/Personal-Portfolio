import React from 'react';
import Image from 'next/image';
import { portfolioData } from '@/data';
import { isSvg } from '@/lib/utils';

/**
 * Real brand marks (Simple Icons, MIT-licensed) keyed by the exact label used
 * in `portfolioData.techStack`. Items with no verifiable official mark —
 * "Prompt Engineering", "RAG (...)", "XGBoost" (no wordmark exists), and the
 * combined "Gemini/Claude API" label — intentionally have none and fall back
 * to a plain text pill rather than guessing at a logo.
 */
const STACK_LOGOS: Record<string, string> = {
  'HTML5': '/logos/stack/html5.svg',
  'CSS3': '/logos/stack/css3.svg',
  'TypeScript': '/logos/stack/typescript.svg',
  'React': '/logos/stack/react.svg',
  'Next.js': '/logos/stack/nextdotjs.svg',
  'Tailwind CSS': '/logos/stack/tailwindcss.svg',
  'Node.js': '/logos/stack/nodedotjs.svg',
  'Express': '/logos/stack/express.svg',
  'Python': '/logos/stack/python.svg',
  'Java': '/logos/stack/java.svg',
  'Supabase': '/logos/stack/supabase.svg',
  'PostgreSQL': '/logos/stack/postgresql.svg',
  'MySQL': '/logos/stack/mysql.svg',
  'Firebase': '/logos/stack/firebase.svg',
  'Clerk': '/logos/stack/clerk.svg',
  'Supabase Auth': '/logos/stack/supabase.svg',
  'Cursor IDE': '/logos/stack/cursor.svg',
  'Claude Code (AI-Assisted Architecture)': '/logos/stack/claude.svg',
  'ONNX': '/logos/stack/onnx.svg',
  'Git': '/logos/stack/git.svg',
  'GitHub': '/logos/stack/github.svg',
  'Figma': '/logos/stack/figma.svg',
  'Notion': '/logos/stack/notion.svg',
  'Vercel': '/logos/stack/vercel.svg',
};

export const StackGrid = () => (
  <div className="peek peek-rows rounded-xl border border-border bg-background px-1.5">
    {Object.entries(portfolioData.techStack).map(([category, items]) => (
      <div
        key={category}
        className="peek-item flex flex-col gap-1.5 rounded-lg border-b border-border px-2 py-3 last:border-b-0 hover:bg-surface sm:flex-row sm:items-start sm:gap-4"
      >
        <span className="shrink-0 text-[15px] text-muted sm:w-32 sm:pt-[3px]">{category}</span>
        <div className="flex flex-wrap gap-1.5">
          {items.map((item) => {
            const logo = STACK_LOGOS[item];
            return (
              <span
                key={item}
                className="inline-flex cursor-default items-center gap-1.5 rounded-md border border-border bg-surface py-0.5 pl-1.5 pr-2 text-[15px] text-secondary transition-colors duration-200 hover:border-primary/25 hover:text-primary"
              >
                {logo && (
                  // Fixed dark chip, independent of theme, so brand marks that
                  // ship white (Next.js, Vercel, GitHub...) stay visible in
                  // light mode too rather than vanishing against a light pill.
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-neutral-900">
                    <Image
                      src={logo}
                      alt=""
                      width={12}
                      height={12}
                      unoptimized={isSvg(logo)}
                      className="h-3 w-3 object-contain"
                    />
                  </span>
                )}
                {item}
              </span>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);
