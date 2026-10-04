import React from 'react';
import type { Metadata } from 'next';
import { ArrowUpRight, Github, Linkedin, Mail, Facebook, Instagram } from 'lucide-react';
import { SubPageShell } from '@/components/profile/SubPageShell';
import { portfolioData } from '@/data';

const { contact } = portfolioData.personal;

const socials = [
  { label: 'Email', href: `mailto:${contact.email}`, Icon: Mail },
  { label: 'LinkedIn', href: contact.linkedin, Icon: Linkedin },
  { label: 'GitHub', href: contact.github, Icon: Github },
  { label: 'Facebook', href: contact.facebook, Icon: Facebook },
  { label: 'Instagram', href: contact.instagram, Icon: Instagram },
];

export const metadata: Metadata = {
  title: 'Services',
  description: 'What I build through Cascade Development Group, for teams who need real software shipped.',
};

export default function ServicesPage() {
  return (
    <SubPageShell
      title="Services"
      intro="What I build through Cascade Development Group."
    >
      {/* CDG — the umbrella this work is delivered under. Pinned above the
          offering list so visitors can go straight to the company site. */}
      <a
        href="https://cdg-official.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-4 rounded-xl border border-border bg-surface/40 p-5 transition-colors hover:bg-surface"
      >
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-medium uppercase tracking-wider text-muted-2">
            Delivered through
          </p>
          <p className="mt-1 text-[17px] font-medium text-primary">Cascade Development Group</p>
          <p className="mt-1 text-[14.5px] leading-relaxed text-secondary">
            IT solutions startup in Iloilo. I lead engineering and client delivery across web
            development, databases, and AI systems, with a team working the full lifecycle from
            scoping to deployment.
          </p>
        </div>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>

      <div className="mt-8 divide-y divide-border">
        {portfolioData.personal.services.map((service) => (
          <div key={service.name} className="py-4">
            <p className="text-[15.5px] font-medium text-primary">{service.name}</p>
            <p className="mt-1 text-[14.5px] leading-relaxed text-secondary">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Direct ways to reach me — same list the sidebar/footer uses,
          surfaced here so visitors on this page can start a conversation
          without hunting around. */}
      <div className="mt-12">
        <h2 className="text-[14px] font-medium text-muted">Reach me</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex h-10 items-center gap-2 rounded-full border border-border-strong px-4 text-[14px] font-medium text-primary transition-colors hover:bg-surface"
            >
              <Icon size={14} strokeWidth={1.75} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </SubPageShell>
  );
}
