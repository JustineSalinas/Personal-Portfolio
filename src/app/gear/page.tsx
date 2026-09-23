import type { Metadata } from 'next';
import { portfolioData } from '@/data';
import { SubPageShell } from '@/components/profile/SubPageShell';
import { GearList } from '@/components/profile/GearList';

export const metadata: Metadata = {
  title: 'Gear',
  description: `The hardware ${portfolioData.personal.name} builds with, day to day.`,
};

export default function GearPage() {
  return (
    <SubPageShell title="Gear" intro="The hardware I actually build with, day to day.">
      <GearList />
    </SubPageShell>
  );
}
