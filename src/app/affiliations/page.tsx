import type { Metadata } from 'next';
import { portfolioData } from '@/data';
import { SubPageShell } from '@/components/profile/SubPageShell';
import { LeadershipList } from '@/components/profile/LeadershipList';

export const metadata: Metadata = {
  title: 'Affiliations',
  description: `Current leadership roles and community affiliations held by ${portfolioData.personal.name}.`,
};

export default function AffiliationsPage() {
  return (
    <SubPageShell title="Affiliations" intro="Current leadership & community roles.">
      <LeadershipList />
    </SubPageShell>
  );
}
