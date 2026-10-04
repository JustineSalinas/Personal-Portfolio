import type { Metadata } from 'next';
import { portfolioData } from '@/data';
import { SubPageShell } from '@/components/profile/SubPageShell';
import { StackGrid } from '@/components/profile/StackGrid';
import { ToolsPreview } from '@/components/profile/ToolsPreview';

export const metadata: Metadata = {
  title: 'Stack',
  description: `Tools and technologies ${portfolioData.personal.name} works with to build products that solve real problems.`,
};

export default function StackPage() {
  return (
    <SubPageShell
      title="Stack I use"
      intro="Tools and technologies I work with to build products that solve real problems."
    >
      <h2 className="mb-2 text-[14px] font-medium text-muted">Tools I use</h2>
      <ToolsPreview />

      <h2 className="mb-4 mt-12 text-[14px] font-medium text-muted">Technologies</h2>
      <StackGrid />
    </SubPageShell>
  );
}
