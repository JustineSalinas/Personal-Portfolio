import Link from 'next/link';
import { portfolioData } from '@/data';
import { TopBar } from '@/components/profile/TopBar';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { Section } from '@/components/profile/Section';
import { ExperienceList } from '@/components/profile/ExperienceList';
import { WorkGrid } from '@/components/profile/WorkGrid';
import { BuildingNow } from '@/components/profile/BuildingNow';
import { GithubHeatmap } from '@/components/profile/GithubHeatmap';
import { HackathonList } from '@/components/profile/HackathonList';
import { StackGrid } from '@/components/profile/StackGrid';
import { CredentialsList } from '@/components/profile/CredentialsList';
import { EducationList } from '@/components/profile/EducationList';
import { ConnectFooter } from '@/components/profile/ConnectFooter';

export default function Home() {
  return (
    // The hatched page acts as a rail; everything readable sits in one 660px column.
    <main className="min-h-screen rail-hatch">
      <div className="mx-auto min-h-screen w-full max-w-[660px] border-x border-border bg-background">
        <TopBar />
        <ProfileHeader />

        <div className="px-5 pb-16">
          <Section id="experience" label="Professional Experience">
            <ExperienceList />
          </Section>

          <Section
            id="work"
            label="Proof of Work"
            action={
              <span className="text-[12px] text-secondary">
                <span className="font-medium text-primary">
                  {portfolioData.personal.projectsBuilt}
                </span>{' '}
                projects built
              </span>
            }
          >
            <WorkGrid />
          </Section>

          <Section id="building" label="Currently Building">
            <BuildingNow />
          </Section>

          <Section
            id="github"
            label="GitHub Contributions"
            action={
              <a
                href="https://github.com/JustineSalinas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-medium text-secondary transition-colors hover:text-primary"
              >
                @JustineSalinas →
              </a>
            }
          >
            <GithubHeatmap />
          </Section>

          <Section id="hackathons" label="Hackathons & Awards">
            <HackathonList />
          </Section>

          <Section
            id="stack"
            label="Stack I use"
            intro="Technologies I work with to build products that solve real problems."
          >
            <StackGrid />
          </Section>

          <Section
            id="certifications"
            label="Certifications"
            action={
              <Link
                href="/certifications"
                className="text-[12px] font-medium text-secondary transition-colors hover:text-primary"
              >
                View all →
              </Link>
            }
          >
            <CredentialsList />
          </Section>

          <Section id="education" label="Education">
            <EducationList />
          </Section>

          <div className="pt-16">
            <ConnectFooter />
          </div>
        </div>
      </div>
    </main>
  );
}
