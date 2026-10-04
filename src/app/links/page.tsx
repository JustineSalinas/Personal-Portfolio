import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowUpRight,
  Facebook,
  FileText,
  Github,
  Instagram,
  Link as LinkIcon,
  Linkedin,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { SubPageShell } from '@/components/profile/SubPageShell';
import { portfolioData } from '@/data';

export const metadata: Metadata = {
  title: 'Links',
  description: 'Every place to find or reach Adrian Salinas, in one place.',
};

interface Brand {
  Icon: React.ElementType;
  /** Tile background: the brand's own color (Instagram uses its gradient). */
  background: string;
}

const BRANDS: Record<string, Brand> = {
  GitHub: { Icon: Github, background: '#181717' },
  LinkedIn: { Icon: Linkedin, background: '#0A66C2' },
  Facebook: { Icon: Facebook, background: '#1877F2' },
  Instagram: {
    Icon: Instagram,
    background:
      'linear-gradient(45deg, #FEDA75 0%, #FA7E1E 25%, #D62976 50%, #962FBF 75%, #4F5BD5 100%)',
  },
  WhatsApp: { Icon: MessageCircle, background: '#25D366' },
  Email: { Icon: Mail, background: '#EA4335' },
  'Resume (PDF)': { Icon: FileText, background: '#E5252A' },
};

// Links that have a real logo file get the image instead of a glyph.
const LOGOS: Record<string, string> = {
  'Cascade Development Group': '/logos/cdg-fire-logo.png',
};

const LogoTile = ({ name }: { name: string }) => {
  const logo = LOGOS[name];
  if (logo) {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface">
        <Image src={logo} alt="" width={44} height={44} className="h-full w-full object-cover" />
      </span>
    );
  }

  const brand = BRANDS[name];
  const Icon = brand?.Icon ?? LinkIcon;
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
      style={{ background: brand?.background ?? '#6E6E73' }}
    >
      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
};

export default function LinksPage() {
  return (
    <SubPageShell title="Links" intro="Everywhere else to find me.">
      <div className="divide-y divide-border">
        {portfolioData.personal.links.map((link) => {
          const external = !link.url.startsWith('/');
          return (
            <a
              key={link.name}
              href={link.url}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-4 py-4 transition-opacity hover:opacity-80"
            >
              <LogoTile name={link.name} />
              <span className="flex-1 text-[15.5px] font-medium text-primary">{link.name}</span>
              <ArrowUpRight
                size={16}
                className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </a>
          );
        })}
      </div>
    </SubPageShell>
  );
}
