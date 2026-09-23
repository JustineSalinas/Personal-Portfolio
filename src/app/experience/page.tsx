import type { Metadata } from 'next';
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
      <ExperienceList />

      <h2 className="mt-10 mb-4 text-[17px] font-medium tracking-tight text-muted">
        Hackathons & Awards
      </h2>
      <p className="mb-5 -mt-3 text-[17px] leading-relaxed text-secondary">
        {portfolioData.personal.awards.summary}
      </p>
      <HackathonList />

      <h2 className="mt-10 mb-4 text-[17px] font-medium tracking-tight text-muted">
        Education
      </h2>
      <EducationList />
    </SubPageShell>
  );
}
