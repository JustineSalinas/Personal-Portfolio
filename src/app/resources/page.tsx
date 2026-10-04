import type { Metadata } from 'next';
import { portfolioData } from '@/data';
import { SubPageShell } from '@/components/profile/SubPageShell';
import { ResourcesList } from '@/components/profile/ResourcesList';

export const metadata: Metadata = {
  title: 'Resources',
  description: `Where ${portfolioData.personal.name} learns: courses, practice sites, and references for building software, AI/data engineering, and staying current.`,
};

export default function ResourcesPage() {
  return (
    <SubPageShell
      title="Resources"
      intro="Where I learn to build software, get into AI engineering, and stay current."
    >
      <ResourcesList />
    </SubPageShell>
  );
}
