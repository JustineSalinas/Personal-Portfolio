import type { Metadata } from 'next';
import Link from 'next/link';
import { portfolioData } from '@/data';
import { SubPageShell } from '@/components/profile/SubPageShell';
import { ExperienceList } from '@/components/profile/ExperienceList';
import { HackathonList } from '@/components/profile/HackathonList';
import { EducationList } from '@/components/profile/EducationList';

export const metadata: Metadata = {
  title: 'Experience',
  description: `Professional experience, hackathons, awards, and education for ${portfolioData.personal.name}.`,
};

export default function ExperiencePage() {
  return (
    <SubPageShell title="Experience" intro="Professional experience, hackathons, and awards.">
      <ExperienceList showLogos />

      <h2 className="mb-2 mt-14 text-[14px] font-medium text-muted">Hackathons & Awards</h2>
      <p className="mb-5 text-[16px] leading-relaxed text-secondary">
        {portfolioData.personal.awards.summary}
      </p>
      <HackathonList />
      <Link
        href="/hackathons"
        className="mt-4 inline-flex min-h-8 items-center text-[14px] font-medium text-muted transition-colors hover:text-primary"
      >
        See the timeline →
      </Link>

      <h2 className="mb-4 mt-14 text-[14px] font-medium text-muted">Education</h2>
      <EducationList />
    </SubPageShell>
  );
}
