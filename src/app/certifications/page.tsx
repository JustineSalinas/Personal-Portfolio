import type { Metadata } from 'next';
import { portfolioData } from '@/data';
import { SubPageShell } from '@/components/profile/SubPageShell';
import { CertificationsList } from '@/components/profile/CertificationsList';

export const metadata: Metadata = {
  title: 'Certifications',
  description: `${portfolioData.certifications.length} certifications and credentials held by ${portfolioData.personal.name}.`,
};

export default function CertificationsPage() {
  return (
    <SubPageShell
      title="Certifications & Credentials"
      intro={`${portfolioData.certifications.length} credentials, grouped by category.`}
    >
      <CertificationsList />
    </SubPageShell>
  );
}
