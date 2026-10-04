import type { Metadata } from 'next';
import { portfolioData } from '@/data';
import { SubPageShell } from '@/components/profile/SubPageShell';
import { HackathonList } from '@/components/profile/HackathonList';
import { HackathonTimeline } from '@/components/profile/HackathonTimeline';

export const metadata: Metadata = {
  title: 'Hackathons',
  description: `Hackathon placements and awards earned by ${portfolioData.personal.name}.`,
};

export default function HackathonsPage() {
  return (
    <SubPageShell title="Hackathons" intro={portfolioData.personal.awards.summary}>
      <h2 className="mb-5 text-[14px] font-medium text-muted">Timeline</h2>
      <HackathonTimeline />

      <h2 className="mb-4 mt-12 text-[14px] font-medium text-muted">Details</h2>
      <HackathonList />
    </SubPageShell>
  );
}
