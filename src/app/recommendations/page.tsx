import type { Metadata } from 'next';
import { portfolioData } from '@/data';
import { SubPageShell } from '@/components/profile/SubPageShell';
import { Testimonials } from '@/components/profile/Testimonials';

export const metadata: Metadata = {
  title: 'Recommendations',
  description: `What people say about working with ${portfolioData.personal.name}.`,
};

export default function RecommendationsPage() {
  return (
    <SubPageShell title="Recommendations" intro="What people say.">
      <Testimonials />
    </SubPageShell>
  );
}
