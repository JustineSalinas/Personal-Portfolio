import type { Metadata } from 'next';
import { portfolioData } from '@/data';
import { SubPageShell } from '@/components/profile/SubPageShell';
import { StackGrid } from '@/components/profile/StackGrid';

export const metadata: Metadata = {
  title: 'Stack',
  description: `Technologies ${portfolioData.personal.name} works with to build products that solve real problems.`,
};

export default function StackPage() {
  return (
    <SubPageShell
      title="Stack I use"
      intro="Technologies I work with to build products that solve real problems."
    >
      <StackGrid />
    </SubPageShell>
  );
}
