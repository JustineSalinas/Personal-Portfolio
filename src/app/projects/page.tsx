import type { Metadata } from 'next';
import { portfolioData } from '@/data';
import { SubPageShell } from '@/components/profile/SubPageShell';
import { WorkGrid } from '@/components/profile/WorkGrid';

export const metadata: Metadata = {
  title: 'Projects',
  description: `${portfolioData.personal.projectsBuilt} projects built by ${portfolioData.personal.name} — full-stack apps, AI systems, and IoT solutions.`,
};

export default function ProjectsPage() {
  return (
    <SubPageShell
      title="Projects"
      intro={`${portfolioData.personal.projectsBuilt} projects built — full-stack apps, AI systems & IoT solutions.`}
    >
      <WorkGrid />
    </SubPageShell>
  );
}
